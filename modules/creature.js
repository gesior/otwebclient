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
Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = require("./thing");
var Creature = /** @class */ (function (_super) {
    __extends(Creature, _super);
    function Creature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Creature.prototype.addTimedSquare = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.hideStaticSquare = function () {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.showStaticSquare = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.setType = function (type) {
    };
    Creature.prototype.allowAppearWalk = function () {
    };
    Creature.prototype.setHealthPercent = function (healthPercent) {
    };
    Creature.prototype.setLight = function (light) {
    };
    Creature.prototype.setOutfit = function (outfit) {
    };
    Creature.prototype.setSpeed = function (speed) {
    };
    Creature.prototype.setBaseSpeed = function (baseSpeed) {
    };
    Creature.prototype.setSkull = function (skull) {
    };
    Creature.prototype.setShield = function (shield) {
    };
    Creature.prototype.setPassable = function (v) {
    };
    return Creature;
}(thing_1.Thing));
exports.Creature = Creature;
//# sourceMappingURL=creature.js.map