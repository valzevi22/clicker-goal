/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Backdrop {
    constructor() {
        /**
         * If `true`, the backdrop will be visible.
         * This property controls whether or not the backdrop's
         * default background is shown. It does not control whether
         * or not the backdrop blocks interaction, and it does not
         * override a custom background set on `ion-backdrop`.
         */
        this.visible = true;
        /**
         * If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event.
         */
        this.tappable = true;
        /**
         * If `true`, the backdrop will stop propagation on tap.
         */
        this.stopPropagation = true;
    }
    onMouseDown(ev) {
        this.emitTap(ev);
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '14141148f4a22371b8ad7cb9dcdc32398ec109aa', "aria-hidden": "true", class: {
                [mode]: true,
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            } }));
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["backdrop.ios.scss"],
            "md": ["backdrop.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["backdrop.ios.css"],
            "md": ["backdrop.md.css"]
        };
    }
    static get properties() {
        return {
            "visible": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will be visible.\nThis property controls whether or not the backdrop's\ndefault background is shown. It does not control whether\nor not the backdrop blocks interaction, and it does not\noverride a custom background set on `ion-backdrop`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "visible",
                "defaultValue": "true"
            },
            "tappable": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "tappable",
                "defaultValue": "true"
            },
            "stopPropagation": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the backdrop will stop propagation on tap."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "stop-propagation",
                "defaultValue": "true"
            }
        };
    }
    static get events() {
        return [{
                "method": "ionBackdropTap",
                "name": "ionBackdropTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the backdrop is tapped."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onMouseDown",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
