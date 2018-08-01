"use strict";
exports.__esModule = true;
var g_clock_1 = require("./g_clock");
var Timer = /** @class */ (function () {
    function Timer() {
        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }
    Timer.prototype.restart = function () {
        this.m_startTicks = g_clock_1.g_clock.millis();
        this.m_stopped = false;
    };
    Timer.prototype.stop = function () {
        this.m_stopped = true;
    };
    Timer.prototype.startTicks = function () {
        return this.m_startTicks;
    };
    Timer.prototype.ticksElapsed = function () {
        return g_clock_1.g_clock.millis() - this.m_startTicks;
    };
    Timer.prototype.timeElapsed = function () {
        return this.ticksElapsed() / 1000;
    };
    Timer.prototype.running = function () {
        return !this.m_stopped;
    };
    return Timer;
}());
exports.Timer = Timer;
