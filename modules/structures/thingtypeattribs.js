"use strict";
exports.__esModule = true;
var ThingTypeAttribs = /** @class */ (function () {
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
        //console.log(attr, value);
        this.attribs[attr] = value;
    };
    ThingTypeAttribs.prototype.remove = function (attr) {
        delete this.attribs[attr];
    };
    return ThingTypeAttribs;
}());
exports.ThingTypeAttribs = ThingTypeAttribs;
