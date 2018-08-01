"use strict";
exports.__esModule = true;
var const_1 = require("./constants/const");
var Position = /** @class */ (function () {
    function Position(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Position.prototype.equals = function (otherPosition) {
        return this.x == otherPosition.x && this.y == otherPosition.y && this.z == otherPosition.z;
    };
    Position.prototype.clone = function () {
        return new Position(this.x, this.y, this.z);
    };
    Position.prototype.isMapPosition = function () {
        return (this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= const_1.Otc.MAX_Z);
    };
    Position.prototype.isValid = function () {
        return !(this.x == 65535 && this.y == 65535 && this.z == 255);
    };
    Position.prototype.distance = function (pos) {
        return Math.sqrt(Math.pow((pos.x - this.x), 2) + Math.pow((pos.y - this.y), 2));
    };
    Position.prototype.translate = function (dx, dy, dz) {
        if (dz === void 0) { dz = 0; }
        this.x += dx;
        this.y += dy;
        this.z += dz;
    };
    Position.prototype.translated = function (dx, dy, dz) {
        if (dz === void 0) { dz = 0; }
        return new Position(this.x + dx, this.y + dy, this.z + dz);
    };
    Position.prototype.isInRange = function (pos, xRange, yRange) {
        return Math.abs(this.x - pos.x) <= xRange && Math.abs(this.y - pos.y) <= yRange && this.z == pos.z;
    };
    /*
        isInRange(pos: Position, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number): boolean {
            return (pos.x >= this.x - minXRange && pos.x <= this.x + maxXRange && pos.y >= this.y - minYRange && pos.y <= this.y + maxYRange && pos.z == this.z);
        }
    */
    Position.prototype.up = function (n) {
        if (n === void 0) { n = 1; }
        var nz = this.z - n;
        if (nz >= 0 && nz <= const_1.Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    };
    Position.prototype.down = function (n) {
        if (n === void 0) { n = 1; }
        var nz = this.z + n;
        if (nz >= 0 && nz <= const_1.Otc.MAX_Z) {
            this.z = nz;
            return true;
        }
        return false;
    };
    Position.prototype.coveredUp = function (n) {
        if (n === void 0) { n = 1; }
        var nx = this.x + n, ny = this.y + n, nz = this.z - n;
        if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= const_1.Otc.MAX_Z) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
            return true;
        }
        return false;
    };
    Position.prototype.coveredDown = function (n) {
        if (n === void 0) { n = 1; }
        var nx = this.x - n, ny = this.y - n, nz = this.z + n;
        if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= const_1.Otc.MAX_Z) {
            this.x = nx;
            this.y = ny;
            this.z = nz;
            return true;
        }
        return false;
    };
    return Position;
}());
exports.Position = Position;
