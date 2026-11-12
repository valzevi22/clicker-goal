/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { w as win } from './helpers-p94IkmEA.js';

const getCapacitor = () => {
    if (win !== undefined) {
        return win.Capacitor;
    }
    return undefined;
};

export { getCapacitor as g };
