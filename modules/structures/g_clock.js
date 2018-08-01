"use strict";
exports.__esModule = true;
var g_clock = /** @class */ (function () {
    function g_clock() {
    }
    g_clock.millis = function () {
        return +new Date();
    };
    return g_clock;
}());
exports.g_clock = g_clock;
