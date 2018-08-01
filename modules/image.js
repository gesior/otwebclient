"use strict";
exports.__esModule = true;
var log_1 = require("./log");
var color_1 = require("./color");
var size_1 = require("./structures/size");
var Image = /** @class */ (function () {
    function Image(size) {
        if (size instanceof size_1.Size) {
        }
        else if (typeof size == 'number') {
        }
    }
    Image.prototype.blit = function (point, image) {
    };
    Image.prototype.overwriteMask = function (color, insideColor, outsideColor) {
        if (insideColor === void 0) { insideColor = color_1.Color.white; }
        if (outsideColor === void 0) { outsideColor = color_1.Color.alpha; }
    };
    Image.load = function (path) {
        log_1.error('load image', path);
        return null;
    };
    Image.prototype.setId = function (id) {
    };
    return Image;
}());
exports.Image = Image;
