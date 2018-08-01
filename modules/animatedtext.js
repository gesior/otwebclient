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
var timer_1 = require("./structures/timer");
var color_1 = require("./color");
var cachedtext_1 = require("./cachedtext");
var const_1 = require("./constants/const");
var AnimatedText = /** @class */ (function (_super) {
    __extends(AnimatedText, _super);
    function AnimatedText() {
        var _this = _super.call(this) || this;
        _this.m_color = new color_1.Color();
        _this.m_animationTimer = new timer_1.Timer();
        _this.m_cachedText.setFont("verdana-11px-rounded");
        _this.m_cachedText.setAlign(cachedtext_1.CachedText.ALIGN_LEFT);
        return _this;
    }
    AnimatedText.prototype.drawText = function (dest, visibleRect) {
        /* todo */
        /*
        static float tf = Otc::ANIMATED_TEXT_DURATION;
        static float tftf = Otc::ANIMATED_TEXT_DURATION * Otc::ANIMATED_TEXT_DURATION;

        Point p = dest;
        Size textSize = m_cachedText.getTextSize();
        float t = m_animationTimer.ticksElapsed();
        p.x += (24 - textSize.width() / 2);

        if(g_game.getFeature(Otc::GameDiagonalAnimatedText)) {
            p.x -= (4 * t / tf) + (8 * t * t / tftf);
        }

        p.y += 8 + (-48 * t) / tf;
        p += m_offset;
        Rect rect(p, textSize);

        if(visibleRect.contains(rect)) {
            float t0 = tf / 1.2;
            if(t > t0) {
                Color color = m_color;
                color.setAlpha((float)(1 - (t - t0) / (tf - t0)));
                g_painter.setColor(color);
            }
            else
                g_painter.setColor(m_color);
            m_cachedText.draw(rect);
        }
        */
    };
    AnimatedText.prototype.setColor = function (color) {
        this.m_color = color_1.Color.from8bit(color);
    };
    AnimatedText.prototype.setText = function (text) {
        //m_cachedText.setText(text);
    };
    AnimatedText.prototype.setOffset = function (offset) {
        this.m_offset = offset;
    };
    AnimatedText.prototype.getColor = function () {
        return this.m_color;
    };
    AnimatedText.prototype.getCachedText = function () {
        return this.m_cachedText;
    };
    AnimatedText.prototype.getOffset = function () {
        return this.m_offset;
    };
    AnimatedText.prototype.getTimer = function () {
        return this.m_animationTimer;
    };
    AnimatedText.prototype.merge = function (other) {
        if (other.getColor() != this.m_color)
            return false;
        if (other.getCachedText().getFont() != this.m_cachedText.getFont())
            return false;
        if (this.m_animationTimer.ticksElapsed() > const_1.Otc.ANIMATED_TEXT_DURATION / 2.5)
            return false;
        var number = parseInt(this.m_cachedText.getText());
        var otherNumber = parseInt(other.getCachedText().getText());
        if (!isNaN(number) && !isNaN(otherNumber)) {
            this.m_cachedText.setText((number + otherNumber).toString());
            return true;
        }
        return false;
    };
    AnimatedText.prototype.asAnimatedText = function () {
        return this;
    };
    AnimatedText.prototype.isAnimatedText = function () {
        return true;
    };
    AnimatedText.prototype.onAppear = function () {
        this.m_animationTimer.restart();
        // schedule removal
        //auto self = asAnimatedText();
        //g_dispatcher.scheduleEvent([self]() { g_map.removeThing(self); }, Otc::ANIMATED_TEXT_DURATION);
    };
    return AnimatedText;
}(thing_1.Thing));
exports.AnimatedText = AnimatedText;
