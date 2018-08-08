import { Tile } from "./tile";
import { toInt } from "./constants/helpers";
export class TileBlock {
    constructor() {
        this.m_tiles = [];
    }
    create(pos) {
        let tile = new Tile(pos);
        this.m_tiles[this.getTileIndex(pos)] = tile;
        return tile;
    }
    getOrCreate(pos) {
        let tile = this.get(pos);
        if (!tile)
            tile = this.create(pos);
        return tile;
    }
    get(pos) {
        return this.m_tiles[this.getTileIndex(pos)];
    }
    remove(pos) {
        this.m_tiles[this.getTileIndex(pos)] = null;
    }
    getTileIndex(pos) {
        return (toInt(pos.y % TileBlock.BLOCK_SIZE) * TileBlock.BLOCK_SIZE) + toInt(pos.x % TileBlock.BLOCK_SIZE);
    }
    getTiles() {
        return this.m_tiles;
    }
}
TileBlock.BLOCK_SIZE = 32;
//# sourceMappingURL=tileblock.js.map