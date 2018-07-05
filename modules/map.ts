import {AwareRange, Light} from "./structures";
import {Creature} from "./creature";
import {Tile} from "./tile";
import {Position} from "./position";
import {Thing} from "./thing";

export class Map {
    m_centralPosition: Position;
    m_awareRange: AwareRange = new AwareRange();
    tmpCreature = new Creature();

    getTile(position: Position): Tile {
        return new Tile();
    }

    setAwareRange(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    getCreatureById(id: number): Creature {
        return this.tmpCreature;
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
        return false;
    }

    setLight(light: Light) {

    }

    getThing(pos: Position, stackpos: number) {

    }

    removeCreatureById(removeId: number) {
        
    }
}

let g_map = new Map();
export {g_map}