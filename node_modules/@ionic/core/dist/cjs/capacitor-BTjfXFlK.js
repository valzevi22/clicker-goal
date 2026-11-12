/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

var helpers = require('./helpers-BrETKUUX.js');

const getCapacitor = () => {
    if (helpers.win !== undefined) {
        return helpers.win.Capacitor;
    }
    return undefined;
};

exports.getCapacitor = getCapacitor;
