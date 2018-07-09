import {Creature} from "./creature";
import {Tile} from "./tile";
import {Position} from "./position";
import {Thing} from "./thing";
import {AwareRange} from "./structures/awarerange";
import {Light} from "./structures/light";

export class Map {
    m_tiles
    m_centralPosition: Position;
    m_awareRange: AwareRange = new AwareRange();

    getTile(position: Position): Tile {
        return new Tile();
    }

    setAwareRange(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    getCreatureById(id: number): Creature {
        return new Creature();
    }


    getAwareRange() {
        return this.m_awareRange;
    }

    getCentralPosition() {
        return this.m_centralPosition;
    }
    setCentralPosition(pos: Position) {
        this.m_centralPosition = pos;
    }

    cleanTile(tilePos: Position) {
        
    }

    addThing(thing: Thing, position: Position, stackPos: number = -1) {

    }

    removeThing(thing: Thing) {
        return true;
    }

    setLight(light: Light) {

    }

    getThing(pos: Position, stackpos: number): Thing {
        return new Creature();
    }

    removeCreatureById(removeId: number) {
        
    }

    addCreature(creature: any) {
        
    }
}

let g_map = new Map();
export {g_map}