/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

var animation = require('./animation-UiXhXV49.js');
var index = require('./index-DNBYnlrc.js');
var ios_transition = require('./ios.transition-CN092Fh6.js');
var md_transition = require('./md.transition-B6961Ny9.js');
var cubicBezier = require('./cubic-bezier-DAjy1V-e.js');
var index$1 = require('./index-DRPqwSvU.js');
var ionicGlobal = require('./ionic-global-48ceLiJ6.js');
var helpers = require('./helpers-BrETKUUX.js');
var index$2 = require('./index-BiQyIvoc.js');
var index$3 = require('./index-B4ONUQRp.js');
var config = require('./config-CjUbvdPW.js');
var theme = require('./theme-Bw0rpaNN.js');
var index$4 = require('./index-BTc0Jnhx.js');
var hardwareBackButton = require('./overlays-BbVQG3UT.js');
require('./dir-Bma_9Lqh.js');
require('./gesture-controller-CeJslptU.js');
require('./framework-delegate-hNMKEiQC.js');

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

exports.createAnimation = animation.createAnimation;
exports.LIFECYCLE_DID_ENTER = index.LIFECYCLE_DID_ENTER;
exports.LIFECYCLE_DID_LEAVE = index.LIFECYCLE_DID_LEAVE;
exports.LIFECYCLE_WILL_ENTER = index.LIFECYCLE_WILL_ENTER;
exports.LIFECYCLE_WILL_LEAVE = index.LIFECYCLE_WILL_LEAVE;
exports.LIFECYCLE_WILL_UNLOAD = index.LIFECYCLE_WILL_UNLOAD;
exports.getIonPageElement = index.getIonPageElement;
exports.iosTransitionAnimation = ios_transition.iosTransitionAnimation;
exports.mdTransitionAnimation = md_transition.mdTransitionAnimation;
exports.getTimeGivenProgression = cubicBezier.getTimeGivenProgression;
exports.createGesture = index$1.createGesture;
exports.getPlatforms = ionicGlobal.getPlatforms;
exports.initialize = ionicGlobal.initialize;
exports.isPlatform = ionicGlobal.isPlatform;
exports.componentOnReady = helpers.componentOnReady;
Object.defineProperty(exports, "LogLevel", {
    enumerable: true,
    get: function () { return index$2.LogLevel; }
});
exports.printIonError = index$2.printIonError;
exports.printIonWarning = index$2.printIonWarning;
exports.IonicSafeString = index$3.IonicSafeString;
exports.getMode = config.getMode;
exports.setupConfig = config.setupConfig;
exports.openURL = theme.openURL;
exports.menuController = index$4.menuController;
exports.actionSheetController = hardwareBackButton.actionSheetController;
exports.alertController = hardwareBackButton.alertController;
exports.loadingController = hardwareBackButton.loadingController;
exports.modalController = hardwareBackButton.modalController;
exports.popoverController = hardwareBackButton.popoverController;
exports.toastController = hardwareBackButton.toastController;
exports.IonicSlides = IonicSlides;
