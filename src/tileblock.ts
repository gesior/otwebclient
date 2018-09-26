import {Tile} from "./tile";
import {Position} from "./position";
import {toInt} from "./constants/helpers";

export class TileBlock {
    m_tiles: Tile[] = [];
    static BLOCK_SIZE = 32;

    constructor() {
    }

    create(pos: Position): Tile {
        let tile = new Tile(pos);

        this.m_tiles[this.getTileIndex(pos)] = tile;
        return tile;
    }

    getOrCreate(pos: Position): Tile {
        let tile = this.get(pos);
        if (!tile)
            tile = this.create(pos);
        return tile;
    }

    get(pos: Position): Tile {
        return this.m_tiles[this.getTileIndex(pos)];
    }

    remove(pos: Position) {
        this.m_tiles[this.getTileIndex(pos)] = null;
    }

    getTileIndex(pos: Position): number {
        return (toInt(pos.y % TileBlock.BLOCK_SIZE) * TileBlock.BLOCK_SIZE) + toInt(pos.x % TileBlock.BLOCK_SIZE);
    }

    getTiles(): Tile[] {
        return this.m_tiles;
    }

}