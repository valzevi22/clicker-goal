/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { r as raf, w as win } from './helpers-p94IkmEA.js';
import { i as isRTL } from './dir-Dj4J3LkD.js';

/**
 * A utility to calculate the size of an outline notch
 * width relative to the content passed. This is used in
 * components such as `ion-select` with `fill="outline"`
 * where we need to pass slotted HTML content. This is not
 * needed when rendering plaintext content because we can
 * render the plaintext again hidden with `opacity: 0` inside
 * of the notch. As a result we can rely on the intrinsic size
 * of the element to correctly compute the notch width. We
 * cannot do this with slotted content because we cannot project
 * it into 2 places at once.
 *
 * @internal
 * @param el: The host element
 * @param getNotchSpacerEl: A function that returns a reference to the notch spacer element inside of the component template.
 * @param getLabelSlot: A function that returns a reference to the slotted content.
 */
const createNotchController = (el, getNotchSpacerEl, getLabelSlot) => {
    let notchVisibilityIO;
    const needsExplicitNotchWidth = () => {
        const notchSpacerEl = getNotchSpacerEl();
        if (
        /**
         * If the notch is not being used
         * then we do not need to set the notch width.
         */
        notchSpacerEl === undefined ||
            /**
             * If either the label property is being
             * used or the label slot is not defined,
             * then we do not need to estimate the notch width.
             */
            el.label !== undefined ||
            getLabelSlot() === null) {
            return false;
        }
        return true;
    };
    const calculateNotchWidth = () => {
        if (needsExplicitNotchWidth()) {
            /**
             * Run this the frame after
             * the browser has re-painted the host element.
             * Otherwise, the label element may have a width
             * of 0 and the IntersectionObserver will be used.
             */
            raf(() => {
                setNotchWidth();
            });
        }
    };
    /**
     * When using a label prop we can render
     * the label value inside of the notch and
     * let the browser calculate the size of the notch.
     * However, we cannot render the label slot in multiple
     * places so we need to manually calculate the notch dimension
     * based on the size of the slotted content.
     *
     * This function should only be used to set the notch width
     * on slotted label content. The notch width for label prop
     * content is automatically calculated based on the
     * intrinsic size of the label text.
     */
    const setNotchWidth = () => {
        const notchSpacerEl = getNotchSpacerEl();
        if (notchSpacerEl === undefined) {
            return;
        }
        if (!needsExplicitNotchWidth()) {
            notchSpacerEl.style.removeProperty('width');
            return;
        }
        const width = getLabelSlot().scrollWidth;
        if (
        /**
         * If the computed width of the label is 0
         * and notchSpacerEl's offsetParent is null
         * then that means the element is hidden.
         * As a result, we need to wait for the element
         * to become visible before setting the notch width.
         *
         * We do not check el.offsetParent because
         * that can be null if the host element has
         * position: fixed applied to it.
         * notchSpacerEl does not have position: fixed.
         */
        width === 0 &&
            notchSpacerEl.offsetParent === null &&
            win !== undefined &&
            'IntersectionObserver' in win) {
            /**
             * If there is an IO already attached
             * then that will update the notch
             * once the element becomes visible.
             * As a result, there is no need to create
             * another one.
             */
            if (notchVisibilityIO !== undefined) {
                return;
            }
            const io = (notchVisibilityIO = new IntersectionObserver((ev) => {
                /**
                 * If the element is visible then we
                 * can try setting the notch width again.
                 */
                if (ev[0].intersectionRatio === 1) {
                    setNotchWidth();
                    io.disconnect();
                    notchVisibilityIO = undefined;
                }
            }, 
            /**
             * Set the root to be the host element
             * This causes the IO callback
             * to be fired in WebKit as soon as the element
             * is visible. If we used the default root value
             * then WebKit would only fire the IO callback
             * after any animations (such as a modal transition)
             * finished, and there would potentially be a flicker.
             */
            { threshold: 0.01, root: el }));
            io.observe(notchSpacerEl);
            return;
        }
        /**
         * If the element is visible then we can set the notch width.
         * The notch is only visible when the label is scaled,
         * which is why we multiply the width by 0.75 as this is
         * the same amount the label element is scaled by in the host CSS.
         * (See $form-control-label-stacked-scale in ionic.globals.scss).
         */
        notchSpacerEl.style.setProperty('width', `${width * 0.75}px`);
    };
    const destroy = () => {
        if (notchVisibilityIO) {
            notchVisibilityIO.disconnect();
            notchVisibilityIO = undefined;
        }
    };
    return {
        calculateNotchWidth,
        destroy,
    };
};

/**
 * Applied to the host while the label is being repositioned. The
 * component stylesheets style this class, so it must stay in sync with
 * the `skip-label-transition` selector in those files. Renaming it here
 * requires renaming it there too.
 */
const SKIP_LABEL_TRANSITION_CLASS = 'skip-label-transition';
/**
 * Set on the host as an inline style. The component stylesheets declare
 * this property and read it with `var()`, so it must stay in sync with
 * the `--internal-start-container-adjustment` references in those files.
 * Renaming it here requires renaming it there too.
 */
const START_CONTAINER_ADJUSTMENT_VAR = '--internal-start-container-adjustment';
/**
 * Set on the host as an inline style. The component stylesheets declare
 * this property and read it with `var()`, so it must stay in sync with
 * the `--internal-start-end-container-width` references in those files.
 * Renaming it here requires renaming it there too.
 */
const START_END_CONTAINER_WIDTH_VAR = '--internal-start-end-container-width';
/**
 * A utility to measure the start and end containers of form components
 * (input, textarea, select) with `fill="outline"` and write the results
 * to the host. The start container width offsets floating/stacked labels
 * so they line up with the outline border. The combined start and end
 * container width lets the floating label size itself to the full width
 * of the outline while still being positioned relative to the control.
 *
 * Measurement is deferred with raf() to avoid forcing layout during
 * component updates, and a ResizeObserver watches for dynamic width
 * changes (e.g., when web fonts load or async content changes).
 *
 * @internal
 * @param el - The host element (ion-input, ion-textarea, or ion-select).
 * @param getStartContainer - A callback that returns the start container element.
 * @param getEndContainer - A callback that returns the end container element.
 * @param shouldMeasure - A callback that determines whether the containers should be measured.
 */
const createStartEndContainerController = (el, getStartContainer, getEndContainer, shouldMeasure) => {
    let resizeObserver;
    let observedStartContainer;
    let observedEndContainer;
    let measurementRaf;
    let transitionRaf;
    let appliedAdjustment;
    let appliedStartEndWidth;
    /*
     * Round to one decimal place so fractional widths produce a stable
     * label offset and width when a container is added, removed, or resized.
     */
    const roundWidth = (width) => Math.round(width * 10) / 10;
    const measureContainers = () => {
        const startContainer = getStartContainer();
        if (!startContainer || !shouldMeasure()) {
            return { adjustment: '', startEndWidth: '' };
        }
        const startContainerWidth = roundWidth(startContainer.getBoundingClientRect().width);
        const endContainerWidth = roundWidth(getEndContainer()?.getBoundingClientRect().width ?? 0);
        const sign = isRTL(el) ? '' : '-';
        return {
            adjustment: startContainerWidth ? `${sign}${startContainerWidth}px` : '0px',
            startEndWidth: `${roundWidth(startContainerWidth + endContainerWidth)}px`,
        };
    };
    const scheduleMeasurement = () => {
        // Return if there is already a measurement queued to avoid a flicker
        if (measurementRaf !== undefined) {
            return;
        }
        /*
         * Defer the measurement until the next animation frame so layout
         * is measured after the current update has been applied.
         */
        measurementRaf = raf(() => {
            measurementRaf = undefined;
            const { adjustment, startEndWidth } = measureContainers();
            /*
             * The width only changes how much of the label fits, so it can
             * animate. The transition is not suppressed here because the end
             * container can change size while the label is floating, such as
             * when async content loads, and that should not cut the float short.
             */
            if (startEndWidth !== appliedStartEndWidth) {
                el.style.setProperty(START_END_CONTAINER_WIDTH_VAR, startEndWidth);
                appliedStartEndWidth = startEndWidth;
            }
            // Only suppress the label transition when the label has to move
            if (adjustment !== appliedAdjustment) {
                // Discard a removal queued by an earlier change
                if (transitionRaf !== undefined) {
                    cancelAnimationFrame(transitionRaf);
                }
                el.classList.add(SKIP_LABEL_TRANSITION_CLASS);
                el.style.setProperty(START_CONTAINER_ADJUSTMENT_VAR, adjustment);
                appliedAdjustment = adjustment;
                // Re-enable the transition once the new offset has been painted
                transitionRaf = raf(() => {
                    transitionRaf = undefined;
                    el.classList.remove(SKIP_LABEL_TRANSITION_CLASS);
                });
            }
            setupResizeObserver();
        });
    };
    const disconnectResizeObserver = () => {
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = undefined;
            observedStartContainer = undefined;
            observedEndContainer = undefined;
        }
    };
    const setupResizeObserver = () => {
        const startContainer = getStartContainer();
        const endContainer = getEndContainer();
        // Stop watching once the measurements no longer apply
        if (!startContainer || !shouldMeasure()) {
            disconnectResizeObserver();
            return;
        }
        // Return when prerendering or already watching these containers
        if (typeof ResizeObserver !== 'function' ||
            (resizeObserver && observedStartContainer === startContainer && observedEndContainer === endContainer)) {
            return;
        }
        disconnectResizeObserver();
        resizeObserver = new ResizeObserver(() => {
            scheduleMeasurement();
        });
        observedStartContainer = startContainer;
        resizeObserver.observe(startContainer);
        if (endContainer) {
            observedEndContainer = endContainer;
            resizeObserver.observe(endContainer);
        }
    };
    const calculateContainerWidths = () => {
        scheduleMeasurement();
    };
    const destroy = () => {
        disconnectResizeObserver();
        if (measurementRaf !== undefined) {
            cancelAnimationFrame(measurementRaf);
            measurementRaf = undefined;
        }
        // Tearing down mid-toggle would leave the transition disabled
        if (transitionRaf !== undefined) {
            cancelAnimationFrame(transitionRaf);
            transitionRaf = undefined;
            el.classList.remove(SKIP_LABEL_TRANSITION_CLASS);
        }
        // Re-apply from scratch if the element is connected again
        appliedAdjustment = undefined;
        appliedStartEndWidth = undefined;
    };
    return {
        calculateContainerWidths,
        destroy,
    };
};

/**
 * The content slotted into a form control's start or end slot that a click
 * started on, or `null` when the click did not start on slotted content.
 *
 * The slotted element is compared against the host in case the form control
 * itself is slotted into, for example, an item. Without that check a control
 * carrying slot="start"/"end" would treat every click on itself as a slotted
 * click.
 */
const getSlottedClickContent = (ev, el) => {
    const slotted = ev.target.closest('[slot="start"], [slot="end"]');
    return slotted !== null && slotted !== el && el.contains(slotted) ? slotted : null;
};
/**
 * Whether a click started on content slotted into a form control's start or
 * end slot.
 */
const isSlottedClick = (ev, el) => getSlottedClickContent(ev, el) !== null;
/**
 * A utility for form components that wrap their content in a <label>, such as
 * ion-input, ion-textarea and ion-select.
 *
 * Clicking slotted content also clicks that label, and the browser follows it
 * with a click on the label's control. That second click would be emitted from
 * the host as a duplicate, so the slotted click is remembered and the click
 * that follows it is suppressed.
 *
 * Browsers skip the forwarding when the click lands on interactive content,
 * such as a slotted button, so the slotted click is remembered for a frame
 * rather than until a forwarded click that may never arrive.
 *
 * @internal
 * @param el - The host element.
 * @param getNativeInput - A callback returning the native form control the
 * label points at, for components that have one. Those components emit the
 * click from the host rather than the control, so the control's click is
 * always stopped and re-dispatched from the host. Omit it for components whose
 * label has no `for` attribute, such as ion-select, where the browser forwards
 * to an internal control that already re-bubbles targeting the host.
 */
const createClickController = (el, getNativeInput) => {
    let hasSlottedClick = false;
    const handleClickCapture = (ev) => {
        if (isSlottedClick(ev, el)) {
            hasSlottedClick = true;
            raf(() => (hasSlottedClick = false));
            return;
        }
        if (getNativeInput === undefined) {
            if (hasSlottedClick) {
                ev.stopPropagation();
                hasSlottedClick = false;
            }
            return;
        }
        const nativeInput = getNativeInput();
        if (nativeInput !== undefined && ev.target === nativeInput) {
            ev.stopPropagation();
            if (!hasSlottedClick) {
                el.click();
            }
            hasSlottedClick = false;
        }
    };
    return { handleClickCapture };
};

/**
 * Used to update a scoped component that uses emulated slots. This fires when
 * content is passed into the slot or when the content inside of a slot changes.
 * This is not needed for components using native slots in the Shadow DOM.
 * @internal
 * @param el The host element to observe
 * @param slotName mutationCallback will fire when nodes on these slot(s) change
 * @param mutationCallback The callback to fire whenever the slotted content changes
 */
const createSlotMutationController = (el, slotName, mutationCallback) => {
    let hostMutationObserver;
    let slottedContentMutationObserver;
    if (win !== undefined && 'MutationObserver' in win) {
        const slots = Array.isArray(slotName) ? slotName : [slotName];
        hostMutationObserver = new MutationObserver((entries) => {
            for (const entry of entries) {
                for (const node of entry.addedNodes) {
                    /**
                     * Check to see if the added node
                     *  is our slotted content.
                     */
                    if (node.nodeType === Node.ELEMENT_NODE && slots.includes(node.slot)) {
                        /**
                         * If so, we want to watch the slotted
                         * content itself for changes. This lets us
                         * detect when content inside of the slot changes.
                         */
                        mutationCallback();
                        /**
                         * Adding the listener in an raf
                         * waits until Stencil moves the slotted element
                         * into the correct place in the event that
                         * slotted content is being added.
                         */
                        raf(() => watchForSlotChange(node));
                        return;
                    }
                }
            }
        });
        hostMutationObserver.observe(el, {
            childList: true,
            /**
             * This fixes an issue with the `ion-input` and
             * `ion-textarea` not re-rendering in some cases
             * when using the label slot functionality.
             *
             * HTML element patches in Stencil that are enabled
             * by the `experimentalSlotFixes` flag in Stencil v4
             * result in DOM manipulations that won't trigger
             * the current mutation observer configuration and
             * callback.
             */
            subtree: true,
        });
    }
    /**
     * Listen for changes inside of the slotted content.
     * We can listen for subtree changes here to be
     * informed of text within the slotted content
     * changing. Doing this on the host is possible
     * but it is much more expensive to do because
     * it also listens for changes to the internals
     * of the component.
     */
    const watchForSlotChange = (slottedEl) => {
        if (slottedContentMutationObserver) {
            slottedContentMutationObserver.disconnect();
            slottedContentMutationObserver = undefined;
        }
        slottedContentMutationObserver = new MutationObserver((entries) => {
            mutationCallback();
            for (const entry of entries) {
                for (const node of entry.removedNodes) {
                    /**
                     * If the element was removed then we
                     * need to destroy the MutationObserver
                     * so the element can be garbage collected.
                     */
                    if (node.nodeType === Node.ELEMENT_NODE && node.slot === slotName) {
                        destroySlottedContentObserver();
                    }
                }
            }
        });
        /**
         * Listen for changes inside of the element
         * as well as anything deep in the tree.
         * We listen on the parentElement so that we can
         * detect when slotted element itself is removed.
         */
        slottedContentMutationObserver.observe(slottedEl.parentElement ?? slottedEl, { subtree: true, childList: true });
    };
    const destroy = () => {
        if (hostMutationObserver) {
            hostMutationObserver.disconnect();
            hostMutationObserver = undefined;
        }
        destroySlottedContentObserver();
    };
    const destroySlottedContentObserver = () => {
        if (slottedContentMutationObserver) {
            slottedContentMutationObserver.disconnect();
            slottedContentMutationObserver = undefined;
        }
    };
    return {
        destroy,
    };
};

export { createNotchController as a, createStartEndContainerController as b, createSlotMutationController as c, createClickController as d, getSlottedClickContent as g };
