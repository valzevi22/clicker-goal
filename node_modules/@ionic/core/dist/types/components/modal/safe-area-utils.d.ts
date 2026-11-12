type SafeAreaValue = '0px' | 'inherit';
/**
 * Configuration for safe-area CSS custom properties.
 * Each direction can inherit the root safe-area value or be zeroed out.
 */
export interface SafeAreaConfig {
    top: SafeAreaValue;
    bottom: SafeAreaValue;
    left: SafeAreaValue;
    right: SafeAreaValue;
}
/**
 * Indicates whether the modal spans the viewport on each axis.
 *
 * `vertical` means the modal reaches both the top and bottom edges.
 * `horizontal` means the modal reaches both the left and right edges.
 */
export interface ModalCoveredAxes {
    vertical: boolean;
    horizontal: boolean;
}
/**
 * Context information about the modal used to determine safe-area behavior.
 */
export interface ModalSafeAreaContext {
    isSheetModal: boolean;
    isCardModal: boolean;
    presentingElement?: HTMLElement;
    breakpoints?: number[];
    currentBreakpoint?: number;
    /**
     * Only used by `getInitialSafeAreaConfig()` to predict safe-area
     * requirements before the modal is presented. Callers that only use
     * the context for non-initial paths can omit this.
     */
    coveredAxes?: ModalCoveredAxes;
}
/**
 * Resolves the current root --ion-safe-area-top value to pixels.
 * Uses a temporary element because getComputedStyle on :root returns
 * the declared value of custom properties (e.g. "env(safe-area-inset-top)")
 * rather than a resolved number.
 *
 * Results are cached for the current frame to avoid repeated reflows.
 */
export declare const getRootSafeAreaTop: () => number;
/**
 * Calls back when the resolved root `--ion-safe-area-top` changes. The value
 * the caller already applied is passed as the baseline, so a change between
 * that read and the observer starting is still reported.
 */
export declare const onRootSafeAreaTopChange: (callback: (safeAreaTop: number) => void) => (() => void);
/**
 * Determines which viewport axes the modal spans so safe-area requirements
 * can be predicted independently for each axis.
 *
 * A modal that spans an axis reaches both edges on that axis and needs the
 * corresponding safe-area insets. A modal that does not span an axis reaches
 * neither edge on that axis.
 *
 * When both `--width` and `--height` are `fullscreen`, coverage can be
 * determined directly. Otherwise, coverage is based on the rendered wrapper,
 * including cases where content sizing or `--max-height` causes the modal
 * to reach the viewport.
 */
export declare const getModalCoveredAxes: (hostEl: HTMLElement) => ModalCoveredAxes;
/**
 * Returns the initial safe-area configuration based on modal type.
 * This is called before animation starts and uses configuration-based prediction.
 *
 * @param context - Modal context information
 * @returns SafeAreaConfig with initial safe-area values
 */
export declare const getInitialSafeAreaConfig: (context: ModalSafeAreaContext) => SafeAreaConfig;
/**
 * Returns safe-area configuration based on actual modal position.
 * Detects which edges the modal overlaps with and only applies safe-area to those edges.
 *
 * Note: On Android edge-to-edge (API 36+), getBoundingClientRect() may report
 * inconsistent values. Sheet and card modals avoid this by using configuration-based
 * prediction instead. Regular modals use coordinate detection which works reliably
 * on web and iOS; Android edge-to-edge may need a configuration-based fallback
 * once a reliable detection mechanism is available.
 *
 * @param wrapperEl - The modal wrapper element to measure
 * @returns SafeAreaConfig based on position
 */
export declare const getPositionBasedSafeAreaConfig: (wrapperEl: HTMLElement) => SafeAreaConfig;
/**
 * Applies safe-area CSS custom property overrides to the modal host element.
 *
 * @param hostEl - The modal host element (ion-modal)
 * @param config - Safe-area configuration to apply
 */
export declare const applySafeAreaOverrides: (hostEl: HTMLElement, config: SafeAreaConfig) => void;
/**
 * Clears safe-area CSS custom property overrides from the modal host element.
 *
 * @param hostEl - The modal host element (ion-modal)
 */
export declare const clearSafeAreaOverrides: (hostEl: HTMLElement) => void;
export {};
