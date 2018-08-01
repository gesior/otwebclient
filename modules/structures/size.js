"use strict";
exports.__esModule = true;
var Size = /** @class */ (function () {
    function Size(wd, ht) {
        if (wd === void 0) { wd = -1; }
        if (ht === void 0) { ht = -1; }
        this.wd = wd;
        this.ht = ht;
    }
    Size.prototype.equals = function (otherSize) {
        return this.wd == otherSize.wd && this.ht == otherSize.ht;
    };
    Size.prototype.clone = function () {
        return new Size(this.wd, this.ht);
    };
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
