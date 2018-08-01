"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var thing_1 = require("./thing");
var thingtypemanager_1 = require("./thingtypemanager");
var const_1 = require("./constants/const");
var timer_1 = require("./structures/timer");
var Effect = /** @class */ (function (_super) {
    __extends(Effect, _super);
    function Effect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_animationTimer = new timer_1.Timer();
        return _this;
    }
    Effect.prototype.isEffect = function () {
        return true;
    };
    Effect.prototype.drawEffect = function (dest, scaleFactor, animate, offsetX, offsetY, lightView) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (lightView === void 0) { lightView = null; }
        if (this.m_id == 0)
            return;
        var animationPhase = 0;
        if (animate)
            animationPhase = Math.min((this.m_animationTimer.ticksElapsed() / this.m_phaseDuration), this.getAnimationPhases() - 1);
        var xPattern = offsetX % this.getNumPatternX();
        if (xPattern < 0)
            xPattern += this.getNumPatternX();
        var yPattern = offsetY % this.getNumPatternY();
        if (yPattern < 0)
            yPattern += this.getNumPatternY();
        this.rawGetThingType().draw(dest, scaleFactor, 0, xPattern, yPattern, 0, animationPhase, lightView);
    };
    Effect.prototype.getId = function () {
        return this.m_id;
    };
    Effect.prototype.setId = function (id) {
        if (!thingtypemanager_1.g_things.isValidDatId(id, const_1.ThingCategory.ThingCategoryEffect))
            id = 0;
        this.m_id = id;
    };
    Effect.prototype.asEffect = function () {
        return this;
    };
    Effect.prototype.getThingType = function () {
        return thingtypemanager_1.g_things.getThingType(this.m_id, const_1.ThingCategory.ThingCategoryEffect);
    };
    Effect.prototype.rawGetThingType = function () {
        return thingtypemanager_1.g_things.rawGetThingType(this.m_id, const_1.ThingCategory.ThingCategoryEffect);
    };
    Effect.prototype.onAppear = function () {
        this.m_animationTimer.restart();
        this.m_phaseDuration = Effect.EFFECT_TICKS_PER_FRAME;
        // hack to fix some animation phases duration, currently there is no better solution
        if (this.m_id == 33)
            this.m_phaseDuration <<= 2;
        //g_dispatcher.scheduleEvent([this]() { g_map.removeThing(this); }, this.m_phaseDuration * this.getAnimationPhases());
    };
    Effect.EFFECT_TICKS_PER_FRAME = 75;
    return Effect;
}(thing_1.Thing));
exports.Effect = Effect;
