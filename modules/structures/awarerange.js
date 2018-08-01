"use strict";
exports.__esModule = true;
var AwareRange = /** @class */ (function () {
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
