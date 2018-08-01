"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.equals = function (otherPoint) {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
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
