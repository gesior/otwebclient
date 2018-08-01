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
var rect_1 = require("./structures/rect");
var point_1 = require("./structures/point");
var color_1 = require("./color");
var const_1 = require("./constants/const");
var cachedtext_1 = require("./cachedtext");
var g_clock_1 = require("./structures/g_clock");
var map_1 = require("./map");
var log_1 = require("./log");
var StaticText = /** @class */ (function (_super) {
    __extends(StaticText, _super);
    function StaticText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_yell = false;
        /*std::deque<std::pair<std::string, ticks_t>>*/
        _this.m_messages = [];
        _this.m_cachedText = new cachedtext_1.CachedText();
        _this.m_updateEvent = null;
        return _this;
    }
    StaticText.prototype.drawText = function (dest, parentRect) {
        var textSize = this.m_cachedText.getTextSize();
        var rect = new rect_1.Rect(dest.sub(new point_1.Point(textSize.width() / 2, textSize.height())).add(new point_1.Point(20, 5)), textSize);
        var boundRect = rect.clone();
        boundRect.bind(parentRect);
        //g_painter->setColor(m_color);
        this.m_cachedText.draw(boundRect);
    };
    StaticText.prototype.getName = function () {
        return this.m_name;
    };
    StaticText.prototype.getMessageMode = function () {
        return this.m_mode;
    };
    StaticText.prototype.getFirstMessage = function () {
        return this.m_messages[0][0];
    };
    StaticText.prototype.isYell = function () {
        return this.m_mode == const_1.MessageMode.MessageYell || this.m_mode == const_1.MessageMode.MessageMonsterYell || this.m_mode == const_1.MessageMode.MessageBarkLoud;
    };
    StaticText.prototype.setText = function (text) {
        this.m_cachedText.setText(text);
    };
    StaticText.prototype.setFont = function (fontName) {
        this.m_cachedText.setFont(fontName);
    };
    StaticText.prototype.addMessage = function (name, mode, text) {
        if (this.m_messages.length == 0) {
            this.m_name = name;
            this.m_mode = mode;
        }
        else if (this.m_name != name || this.m_mode != mode) {
            return false;
        }
        else if (this.m_messages.length > 10) {
            this.m_messages.shift();
            clearTimeout(this.m_updateEvent);
            this.m_updateEvent = null;
        }
        var delay = Math.max(const_1.Otc.STATIC_DURATION_PER_CHARACTER * text.length, const_1.Otc.MIN_STATIC_TEXT_DURATION);
        if (this.isYell())
            delay *= 2;
        this.m_messages.push([text, g_clock_1.g_clock.millis() + delay]);
        this.compose();
        if (!this.m_updateEvent)
            this.scheduleUpdate();
        return true;
    };
    StaticText.prototype.asStaticText = function () {
        return this;
    };
    StaticText.prototype.isStaticText = function () {
        return true;
    };
    StaticText.prototype.setColor = function (color) {
        this.m_color = color;
    };
    StaticText.prototype.getColor = function () {
        return this.m_color;
    };
    StaticText.prototype.update = function () {
        this.m_messages.shift();
        if (this.m_messages.length == 0) {
            // schedule removal
            var self_1 = this.asStaticText();
            setTimeout(function (self) {
                map_1.g_map.removeThing(self);
            }, 0, self_1);
        }
        else {
            this.compose();
            this.scheduleUpdate();
        }
    };
    StaticText.prototype.scheduleUpdate = function () {
        var delay = Math.max(this.m_messages[0][1] - g_clock_1.g_clock.millis(), 0);
        var self = this.asStaticText();
        this.m_updateEvent = setTimeout(function (self) {
            self.m_updateEvent = null;
            self.update();
        }, delay, self);
    };
    StaticText.prototype.compose = function () {
        //TODO: this could be moved to lua
        var text;
        if (this.m_mode == const_1.MessageMode.MessageSay) {
            text += this.m_name;
            text += " says:\n";
            this.m_color = new color_1.Color(239, 239, 0);
        }
        else if (this.m_mode == const_1.MessageMode.MessageWhisper) {
            text += this.m_name;
            text += " whispers:\n";
            this.m_color = new color_1.Color(239, 239, 0);
        }
        else if (this.m_mode == const_1.MessageMode.MessageYell) {
            text += this.m_name;
            text += " yells:\n";
            this.m_color = new color_1.Color(239, 239, 0);
        }
        else if (this.m_mode == const_1.MessageMode.MessageMonsterSay || this.m_mode == const_1.MessageMode.MessageMonsterYell || this.m_mode == const_1.MessageMode.MessageSpell
            || this.m_mode == const_1.MessageMode.MessageBarkLow || this.m_mode == const_1.MessageMode.MessageBarkLoud) {
            this.m_color = new color_1.Color(254, 101, 0);
        }
        else if (this.m_mode == const_1.MessageMode.MessageNpcFrom || this.m_mode == const_1.MessageMode.MessageNpcFromStartBlock) {
            text += this.m_name;
            text += " says:\n";
            this.m_color = new color_1.Color(95, 247, 247);
        }
        else {
            log_1.Log.error("Unknown speak type: %d", this.m_mode);
        }
        for (var i = 0; i < this.m_messages.length; ++i) {
            text += this.m_messages[i][0];
            if (i < this.m_messages.length - 1)
                text += "\n";
        }
        this.m_cachedText.setText(text);
        this.m_cachedText.wrapText(275);
    };
    return StaticText;
}(thing_1.Thing));
exports.StaticText = StaticText;
