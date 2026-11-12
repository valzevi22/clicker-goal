import type { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class Backdrop implements ComponentInterface {
    /**
     * If `true`, the backdrop will be visible.
     * This property controls whether or not the backdrop's
     * default background is shown. It does not control whether
     * or not the backdrop blocks interaction, and it does not
     * override a custom background set on `ion-backdrop`.
     */
    visible: boolean;
    /**
     * If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event.
     */
    tappable: boolean;
    /**
     * If `true`, the backdrop will stop propagation on tap.
     */
    stopPropagation: boolean;
    /**
     * Emitted when the backdrop is tapped.
     */
    ionBackdropTap: EventEmitter<void>;
    protected onMouseDown(ev: TouchEvent): void;
    private emitTap;
    render(): any;
}
