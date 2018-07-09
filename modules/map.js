import { Creature } from "./creature";
import { Tile } from "./tile";
import { AwareRange } from "./structures/awarerange";
export class Map {
    constructor() {
        this.m_awareRange = new AwareRange();
    }
    getTile(position) {
        return new Tile();
    }
    setAwareRange(arg0) {
        throw new Error("Method not implemented.");
    }
    getCreatureById(id) {
        return new Creature();
    }
    getAwareRange() {
        return this.m_awareRange;
    }
    getCentralPosition() {
        return this.m_centralPosition;
    }
    setCentralPosition(pos) {
        this.m_centralPosition = pos;
    }
    cleanTile(tilePos) {
    }
    addThing(thing, position, stackPos = -1) {
    }
    removeThing(thing) {
        return true;
    }
    setLight(light) {
    }
    getThing(pos, stackpos) {
        return new Creature();
    }
    removeCreatureById(removeId) {
    }
    addCreature(creature) {
    }
}
let g_map = new Map();
export { g_map };
//# sourceMappingURL=map.js.map