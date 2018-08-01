"use strict";
exports.__esModule = true;
var tile_1 = require("./tile");
var helpers_1 = require("./constants/helpers");
var TileBlock = /** @class */ (function () {
    function TileBlock() {
        this.m_tiles = [];
    }
    TileBlock.prototype.create = function (pos) {
        var tile = new tile_1.Tile(pos);
        this.m_tiles[this.getTileIndex(pos)] = tile;
        return tile;
    };
    TileBlock.prototype.getOrCreate = function (pos) {
        var tile = this.get(pos);
        if (!tile)
            tile = this.create(pos);
        return tile;
    };
    TileBlock.prototype.get = function (pos) {
        return this.m_tiles[this.getTileIndex(pos)];
    };
    TileBlock.prototype.remove = function (pos) {
        this.m_tiles[this.getTileIndex(pos)] = null;
    };
    TileBlock.prototype.getTileIndex = function (pos) {
        return (helpers_1.toInt(pos.y % TileBlock.BLOCK_SIZE) * TileBlock.BLOCK_SIZE) + helpers_1.toInt(pos.x % TileBlock.BLOCK_SIZE);
    };
    TileBlock.prototype.getTiles = function () {
        return this.m_tiles;
    };
    TileBlock.BLOCK_SIZE = 32;
    return TileBlock;
}());
exports.TileBlock = TileBlock;
