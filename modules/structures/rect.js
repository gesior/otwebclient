"use strict";
exports.__esModule = true;
var point_1 = require("./point");
var size_1 = require("./size");
var Rect = /** @class */ (function () {
    function Rect() {
        //TRect() : x1(0), y1(0), x2(-1), y2(-1) { }
        //TRect(T x, T y, T width, T height) : x1(x), y1(y), x2(x+width-1), y2(y+height-1) { }
        //TRect(const & topLeft, const & bottomRight) : x1(topLeft.x), y1(topLeft.y), x2(bottomRight.x), y2(bottomRight.y) { }
        //TRect(const TRect<T>& other) : x1(other.x1), y1(other.y1), x2(other.x2), y2(other.y2) { }
        //TRect(T x, T y, const TSize<T>& size) : x1(x), y1(y), x2(x+size.width()-1), y2(y+size.height()-1) { }
        //TRect(const & topLeft, const TSize<T>& size) : x1(topLeft.x), y1(topLeft.y), x2(x1+size.width()-1), y2(y1+size.height()-1) { }
        //TRect(const & topLeft, int width, int height) : x1(topLeft.x), y1(topLeft.y), x2(x1+width-1), y2(y1+height-1) { }
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        if (args.length == 0) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = -1;
            this.y2 = -1;
            return;
        }
        else if (args.length == 1) {
            if (args[0] instanceof Rect) {
                var other = args[0];
                this.x1 = other.x1;
                this.y1 = other.y1;
                this.x2 = other.x2;
                this.y2 = other.y2;
                return;
            }
        }
        else if (args.length == 2) {
            if (args[0] instanceof point_1.Point && args[1] instanceof point_1.Point) {
                var topLeft = args[0];
                var bottomRight = args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = bottomRight.x;
                this.y2 = bottomRight.y;
                return;
            }
            else if (args[0] instanceof point_1.Point && args[1] instanceof size_1.Size) {
                var topLeft = args[0];
                var size = args[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        }
        else if (args.length == 3) {
            if (args[0] instanceof point_1.Point && typeof args[1] == 'number' && typeof args[2] == 'number') {
                var topLeft = args[0];
                var width = args[1];
                var height = args[2];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            }
            else if (typeof args[0] == 'number' && typeof args[1] == 'number' && args[2] instanceof size_1.Size) {
                var x = args[0];
                var y = args[1];
                var size = args[2];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        }
        else if (args.length == 4) {
            if (typeof args[0] == 'number' && typeof args[1] == 'number' &&
                typeof args[2] == 'number' && typeof args[3] == 'number') {
                var x = args[0];
                var y = args[1];
                var width = args[2];
                var height = args[3];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            }
        }
        throw new Error('Invalid constructor parameters.');
    }
    Rect.prototype.equals = function (otherRect) {
        return this.x1 == otherRect.x1 && this.y1 == otherRect.y1 && this.x2 == otherRect.x2 && this.y2 == otherRect.y2;
    };
    Rect.prototype.clone = function () {
        return new Rect(this);
    };
    Rect.prototype.isNull = function () {
        return this.x2 == this.x1 - 1 && this.y2 == this.y1 - 1;
    };
    Rect.prototype.isEmpty = function () {
        return this.x1 > this.x2 || this.y1 > this.y2;
    };
    Rect.prototype.isValid = function () {
        return this.x1 <= this.x2 && this.y1 <= this.y2;
    };
    Rect.prototype.left = function () {
        return this.x1;
    };
    Rect.prototype.top = function () {
        return this.y1;
    };
    Rect.prototype.right = function () {
        return this.x2;
    };
    Rect.prototype.bottom = function () {
        return this.y2;
    };
    Rect.prototype.horizontalCenter = function () {
        return this.x1 + (this.x2 - this.x1) / 2;
    };
    Rect.prototype.verticalCenter = function () {
        return this.y1 + (this.y2 - this.y1) / 2;
    };
    Rect.prototype.x = function () {
        return this.x1;
    };
    Rect.prototype.y = function () {
        return this.y1;
    };
    Rect.prototype.topLeft = function () {
        return new point_1.Point(this.x1, this.y1);
    };
    Rect.prototype.bottomRight = function () {
        return new point_1.Point(this.x2, this.y2);
    };
    Rect.prototype.topRight = function () {
        return new point_1.Point(this.x2, this.y1);
    };
    Rect.prototype.bottomLeft = function () {
        return new point_1.Point(this.x1, this.y2);
    };
    Rect.prototype.topCenter = function () {
        return new point_1.Point((this.x1 + this.x2) / 2, this.y1);
    };
    Rect.prototype.bottomCenter = function () {
        return new point_1.Point((this.x1 + this.x2) / 2, this.y2);
    };
    Rect.prototype.centerLeft = function () {
        return new point_1.Point(this.x1, (this.y1 + this.y2) / 2);
    };
    Rect.prototype.centerRight = function () {
        return new point_1.Point(this.x2, (this.y1 + this.y2) / 2);
    };
    Rect.prototype.center = function () {
        return new point_1.Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
    };
    Rect.prototype.width = function () {
        return this.x2 - this.x1 + 1;
    };
    Rect.prototype.height = function () {
        return this.y2 - this.y1 + 1;
    };
    Rect.prototype.size = function () {
        return new size_1.Size(this.width(), this.height());
    };
    Rect.prototype.reset = function () {
        this.x1 = this.y1 = 0;
        this.x2 = this.y2 = -1;
    };
    Rect.prototype.clear = function () {
        this.x2 = this.x1 - 1;
        this.y2 = this.y1 - 1;
    };
    Rect.prototype.setLeft = function (pos) {
        this.x1 = pos;
    };
    Rect.prototype.setTop = function (pos) {
        this.y1 = pos;
    };
    Rect.prototype.setRight = function (pos) {
        this.x2 = pos;
    };
    Rect.prototype.setBottom = function (pos) {
        this.y2 = pos;
    };
    Rect.prototype.setX = function (x) {
        this.x1 = x;
    };
    Rect.prototype.setY = function (y) {
        this.y1 = y;
    };
    Rect.prototype.setTopLeft = function (p) {
        this.x1 = p.x;
        this.y1 = p.y;
    };
    Rect.prototype.setBottomRight = function (p) {
        this.x2 = p.x;
        this.y2 = p.y;
    };
    Rect.prototype.setTopRight = function (p) {
        this.x2 = p.x;
        this.y1 = p.y;
    };
    Rect.prototype.setBottomLeft = function (p) {
        this.x1 = p.x;
        this.y2 = p.y;
    };
    Rect.prototype.setWidth = function (width) {
        this.x2 = this.x1 + width - 1;
    };
    Rect.prototype.setHeight = function (height) {
        this.y2 = this.y1 + height - 1;
    };
    Rect.prototype.setSize = function (size) {
        this.x2 = this.x1 + size.width() - 1;
        this.y2 = this.y1 + size.height() - 1;
    };
    Rect.prototype.setRect = function (x, y, width, height) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = (x + width - 1);
        this.y2 = (y + height - 1);
    };
    Rect.prototype.setCoords = function (left, top, right, bottom) {
        this.x1 = left;
        this.y1 = top;
        this.x2 = right;
        this.y2 = bottom;
    };
    Rect.prototype.moveLeft = function (pos) {
        this.x2 += (pos - this.x1);
        this.x1 = pos;
    };
    Rect.prototype.moveTop = function (pos) {
        this.y2 += (pos - this.y1);
        this.y1 = pos;
    };
    Rect.prototype.moveRight = function (pos) {
        this.x1 += (pos - this.x2);
        this.x2 = pos;
    };
    Rect.prototype.moveBottom = function (pos) {
        this.y1 += (pos - this.y2);
        this.y2 = pos;
    };
    Rect.prototype.bind = function (r) {
        if (this.isNull() || r.isNull())
            return;
        if (this.right() > r.right())
            this.moveRight(r.right());
        if (this.bottom() > r.bottom())
            this.moveBottom(r.bottom());
        if (this.left() < r.left())
            this.moveLeft(r.left());
        if (this.top() < r.top())
            this.moveTop(r.top());
    };
    return Rect;
}());
exports.Rect = Rect;
