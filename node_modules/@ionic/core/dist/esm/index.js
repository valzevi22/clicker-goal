/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
export { c as createAnimation } from './animation-C_V9lXzL.js';
export { a as LIFECYCLE_DID_ENTER, c as LIFECYCLE_DID_LEAVE, L as LIFECYCLE_WILL_ENTER, b as LIFECYCLE_WILL_LEAVE, d as LIFECYCLE_WILL_UNLOAD, g as getIonPageElement } from './index-vgPixHgF.js';
export { iosTransitionAnimation } from './ios.transition-CW92wRDL.js';
export { mdTransitionAnimation } from './md.transition-yhfkYX1P.js';
export { g as getTimeGivenProgression } from './cubic-bezier-hHmYLOfE.js';
export { createGesture } from './index-BmLuEdV7.js';
export { g as getPlatforms, i as initialize, a as isPlatform } from './ionic-global-Cep6oYzK.js';
export { c as componentOnReady } from './helpers-p94IkmEA.js';
export { L as LogLevel, c as printIonError, a as printIonWarning } from './index-BpRUsN_W.js';
export { I as IonicSafeString } from './index-CK8uF0iB.js';
export { g as getMode, s as setupConfig } from './config-DWCzVL3Y.js';
export { o as openURL } from './theme-byZM6qHV.js';
export { m as menuController } from './index-txcXIB3P.js';
export { b as actionSheetController, a as alertController, l as loadingController, m as modalController, p as popoverController, t as toastController } from './overlays-BBgMM61s.js';
import './dir-Dj4J3LkD.js';
import './gesture-controller-B_gJaBk0.js';
import './framework-delegate-CW5_kWfc.js';

const IonicSlides = (opts) => {
    const { swiper, extendParams } = opts;
    const slidesParams = {
        effect: undefined,
        direction: 'horizontal',
        initialSlide: 0,
        loop: false,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,
        slidesPerColumn: 1,
        slidesPerColumnFill: 'column',
        slidesPerGroup: 1,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        touchEventsTarget: 'container',
        freeMode: false,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: false,
        freeModeMinimumVelocity: 0.02,
        autoHeight: false,
        setWrapperSize: false,
        zoom: {
            maxRatio: 3,
            minRatio: 1,
            toggle: false,
        },
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        touchStartPreventDefault: false,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        threshold: 0,
        touchMoveStopPropagation: true,
        touchReleaseOnEdges: false,
        iOSEdgeSwipeDetection: false,
        iOSEdgeSwipeThreshold: 20,
        resistance: true,
        resistanceRatio: 0.85,
        watchSlidesProgress: false,
        watchSlidesVisibility: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loopAdditionalSlides: 0,
        noSwiping: true,
        runCallbacksOnInit: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        flipEffect: {
            slideShadows: true,
            limitRotation: true,
        },
        cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        fadeEffect: {
            crossFade: false,
        },
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
        },
    };
    if (swiper.pagination) {
        slidesParams.pagination = {
            type: 'bullets',
            clickable: false,
            hideOnClick: false,
        };
    }
    if (swiper.scrollbar) {
        slidesParams.scrollbar = {
            hide: true,
        };
    }
    extendParams(slidesParams);
};

export { IonicSlides };
