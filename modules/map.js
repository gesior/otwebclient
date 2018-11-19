"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var structures_1 = require("./structures");
var creature_1 = require("./creature");
var tile_1 = require("./tile");
var Map = (function () {
    function Map() {
        this.m_awareRange = new structures_1.AwareRange();
        this.tmpCreature = new creature_1.Creature();
    }
    Map.prototype.getTile = function (position) {
        return new tile_1.Tile();
    };
    Map.prototype.setAwareRange = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Map.prototype.getCreatureById = function (id) {
        return this.tmpCreature;
    };
    Map.prototype.getAwareRange = function () {
        return this.m_awareRange;
    };
    Map.prototype.getCentralPosition = function () {
        return this.m_centralPosition;
    };
    Map.prototype.setCentralPosition = function (pos) {
        this.m_centralPosition = pos;
    };
    Map.prototype.cleanTile = function (tilePos) {
    };
    Map.prototype.addThing = function (thing, position, stackPos) {
        if (stackPos === void 0) { stackPos = -1; }
    };
    Map.prototype.removeThing = function (thing) {
        return false;
    };
    Map.prototype.setLight = function (light) {
    };
    Map.prototype.getThing = function (pos, stackpos) {
    };
    Map.prototype.removeCreatureById = function (removeId) {
    };
    return Map;
}());
exports.Map = Map;
var g_map = new Map();
exports.g_map = g_map;
//# sourceMappingURL=map.js.map