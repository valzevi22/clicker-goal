/**
 * Applied to the host while the label is being repositioned. The
 * component stylesheets style this class, so it must stay in sync with
 * the `skip-label-transition` selector in those files. Renaming it here
 * requires renaming it there too.
 */
export declare const SKIP_LABEL_TRANSITION_CLASS = "skip-label-transition";
/**
 * Set on the host as an inline style. The component stylesheets declare
 * this property and read it with `var()`, so it must stay in sync with
 * the `--internal-start-container-adjustment` references in those files.
 * Renaming it here requires renaming it there too.
 */
export declare const START_CONTAINER_ADJUSTMENT_VAR = "--internal-start-container-adjustment";
/**
 * Set on the host as an inline style. The component stylesheets declare
 * this property and read it with `var()`, so it must stay in sync with
 * the `--internal-start-end-container-width` references in those files.
 * Renaming it here requires renaming it there too.
 */
export declare const START_END_CONTAINER_WIDTH_VAR = "--internal-start-end-container-width";
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
export declare const createStartEndContainerController: (el: HTMLElement, getStartContainer: () => HTMLElement | undefined, getEndContainer: () => HTMLElement | undefined, shouldMeasure: () => boolean) => StartEndContainerController;
export type StartEndContainerController = {
    calculateContainerWidths: () => void;
    destroy: () => void;
};
