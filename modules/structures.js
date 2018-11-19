"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnjustifiedPoints = (function () {
    function UnjustifiedPoints() {
    }
    return UnjustifiedPoints;
}());
exports.UnjustifiedPoints = UnjustifiedPoints;
var AwareRange = (function () {
    function AwareRange() {
        this.top = 6;
        this.right = 9;
        this.bottom = 7;
        this.left = 8;
    }
    AwareRange.prototype.horizontal = function () {
        return this.left + this.right + 1;
    };
    AwareRange.prototype.vertical = function () {
        return this.top + this.bottom + 1;
    };
    return AwareRange;
}());
exports.AwareRange = AwareRange;
var MarketData = (function () {
    function MarketData() {
    }
    return MarketData;
}());
exports.MarketData = MarketData;
var Light = (function () {
    function Light() {
        this.intensity = 0;
        this.color = 215;
    }
    return Light;
}());
exports.Light = Light;
var g_clock = (function () {
    function g_clock() {
    }
    g_clock.millis = function () {
        return +new Date();
    };
    return g_clock;
}());
exports.g_clock = g_clock;
var Timer = (function () {
    function Timer() {
        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }
    Timer.prototype.restart = function () {
        this.m_startTicks = g_clock.millis();
        this.m_stopped = false;
    };
    Timer.prototype.stop = function () {
        this.m_stopped = true;
    };
    Timer.prototype.startTicks = function () {
        return this.m_startTicks;
    };
    Timer.prototype.ticksElapsed = function () {
        return g_clock.millis() - this.m_startTicks;
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
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    Point.prototype.sub = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    Point.prototype.mul = function (ratio) {
        return new Point(this.x * ratio, this.y * ratio);
    };
    return Point;
}());
exports.Point = Point;
var Rect = (function () {
    function Rect(p1, p2) {
    }
    return Rect;
}());
exports.Rect = Rect;
var Texture = (function () {
    function Texture(image, buildMipmaps, compress) {
        if (buildMipmaps === void 0) { buildMipmaps = false; }
        if (compress === void 0) { compress = false; }
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
    }
    return Texture;
}());
exports.Texture = Texture;
var Size = (function () {
    function Size(wd, ht) {
        if (wd === void 0) { wd = -1; }
        if (ht === void 0) { ht = -1; }
        this.wd = wd;
        this.ht = ht;
    }
    Size.prototype.add = function (size) {
        return new Size(this.wd + size.wd, this.ht + size.ht);
    };
    Size.prototype.sub = function (size) {
        return new Size(this.wd - size.wd, this.ht - size.ht);
    };
    Size.prototype.mul = function (ratio) {
        return new Size(this.wd * ratio, this.ht * ratio);
    };
    Size.prototype.isNull = function () {
        return this.wd == 0 && this.ht == 0;
    };
    Size.prototype.isEmpty = function () {
        return this.wd < 1 || this.ht < 1;
    };
    Size.prototype.isValid = function () {
        return this.wd >= 0 && this.ht >= 0;
    };
    Size.prototype.width = function () {
        return this.wd;
    };
    Size.prototype.height = function () {
        return this.ht;
    };
    Size.prototype.resize = function (w, h) {
        this.wd = w;
        this.ht = h;
    };
    Size.prototype.setWidth = function (w) {
        this.wd = w;
    };
    Size.prototype.setHeight = function (h) {
        this.ht = h;
    };
    Size.prototype.ratio = function () {
        return this.wd / this.ht;
    };
    Size.prototype.area = function () {
        return this.wd * this.ht;
    };
    return Size;
}());
exports.Size = Size;
var ThingTypeAttribs = (function () {
    function ThingTypeAttribs() {
        this.attribs = {};
    }
    ThingTypeAttribs.prototype.has = function (attr) {
        return this.attribs.hasOwnProperty(attr.toString());
    };
    ThingTypeAttribs.prototype.get = function (attr) {
        return this.attribs[attr];
    };
    ThingTypeAttribs.prototype.set = function (attr, value) {
        this.attribs[attr] = value;
    };
    ThingTypeAttribs.prototype.remove = function (attr) {
        delete this.attribs[attr];
    };
    return ThingTypeAttribs;
}());
exports.ThingTypeAttribs = ThingTypeAttribs;
//# sourceMappingURL=structures.js.map