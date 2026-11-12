/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

var index = require('./index-BiQyIvoc.js');
var ionicGlobal = require('./ionic-global-48ceLiJ6.js');

const backdropIosCss = () => `:host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}`;

const backdropMdCss = () => `:host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}`;

const Backdrop = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ionBackdropTap = index.createEvent(this, "ionBackdropTap", 7);
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
        const mode = ionicGlobal.getIonMode(this);
        return (index.h(index.Host, { key: '14141148f4a22371b8ad7cb9dcdc32398ec109aa', "aria-hidden": "true", class: {
                [mode]: true,
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            } }));
    }
};
Backdrop.style = {
    ios: backdropIosCss(),
    md: backdropMdCss()
};

exports.ion_backdrop = Backdrop;
