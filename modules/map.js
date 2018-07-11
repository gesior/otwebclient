import { Creature } from "./creature";
import { Position } from "./position";
import { AwareRange } from "./structures/awarerange";
import { Light } from "./structures/light";
import { TileBlock } from "./tileblock";
import { MessageMode, Otc } from "./constants/const";
import { Point } from "./structures/point";
import { toInt } from "./constants/helpers";
export class Map {
    constructor() {
        this.m_tileBlocks = [];
        this.m_knownCreatures = [];
        this.m_floorMissiles = [];
        this.m_animatedTexts = [];
        this.m_staticTexts = [];
        // std::vector<MapViewPtr> m_mapViews;
        //std::unordered_map<Position, std::string, PositionHasher> m_waypoints;
        this.m_animationFlags = 0;
        this.m_zoneFlags = 0;
        this.m_zoneColors = [];
        this.m_zoneOpacity = 0.0;
        this.m_light = new Light();
        this.m_centralPosition = new Position();
        this.m_attribs = [];
        this.m_awareRange = new AwareRange();
        for (let z = 0; z <= Otc.MAX_Z + 1; ++z) {
            this.m_tileBlocks[z] = [];
            this.m_floorMissiles[z] = [];
        }
    }
    createTile(pos) {
        if (!pos.isMapPosition())
            return null;
        let block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (!block) {
            block = new TileBlock();
            this.m_tileBlocks[pos.z][this.getBlockIndex(pos)] = block;
        }
        return block.create(pos);
    }
    getTile(pos) {
        if (!pos.isMapPosition())
            return null;
        let it = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (it)
            return it.get(pos);
        return null;
    }
    getOrCreateTile(pos) {
        if (!pos.isMapPosition())
            return null;
        let tile = this.getTile(pos);
        if (!tile) {
            tile = this.createTile(pos);
        }
        return tile;
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
    cleanTile(pos) {
        if (!pos.isMapPosition())
            return;
        let block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (block) {
            let tile = block.get(pos);
            if (tile) {
                tile.clean();
                if (tile.canErase())
                    block.remove(pos);
                //notificateTileUpdate(pos);
            }
        }
        for (let i = 0; i < this.m_staticTexts.length;) {
            let staticText = this.m_staticTexts[i];
            if (staticText.getPosition().equals(pos) && staticText.getMessageMode() == MessageMode.MessageNone)
                this.m_staticTexts.splice(i, 1);
            else
                ++i;
        }
    }
    addThing(thing, pos, stackPos = -1) {
        if (!thing)
            return;
        if (thing.isItem() || thing.isCreature() || thing.isEffect()) {
            let tile = this.getOrCreateTile(pos);
            if (tile)
                tile.addThing(thing, stackPos);
        }
        else {
            if (thing.isMissile()) {
                this.m_floorMissiles[pos.z].push(thing);
            }
            else if (thing.isAnimatedText()) {
                // this code will stack animated texts of the same color
                let animatedText = thing;
                let prevAnimatedText;
                let merged = false;
                for (let other of this.m_animatedTexts) {
                    if (other.getPosition() == pos) {
                        prevAnimatedText = other;
                        if (other.merge(animatedText)) {
                            merged = true;
                            break;
                        }
                    }
                }
                if (!merged) {
                    if (prevAnimatedText) {
                        let offset = prevAnimatedText.getOffset();
                        let t = prevAnimatedText.getTimer().ticksElapsed();
                        if (t < Otc.ANIMATED_TEXT_DURATION / 4.0) { // didnt move 12 pixels
                            let y = 12 - 48 * t / Otc.ANIMATED_TEXT_DURATION;
                            offset.add(new Point(0, y));
                        }
                        offset.y = Math.min(offset.y, 12);
                        animatedText.setOffset(offset);
                    }
                    this.m_animatedTexts.push(animatedText);
                }
            }
            else if (thing.isStaticText()) {
                let staticText = thing;
                let mustAdd = true;
                for (let other of this.m_staticTexts) {
                    // try to combine messages
                    if (other.getPosition() == pos && other.addMessage(staticText.getName(), staticText.getMessageMode(), staticText.getFirstMessage())) {
                        mustAdd = false;
                        break;
                    }
                }
                if (mustAdd)
                    this.m_staticTexts.push(staticText);
                else
                    return;
            }
            thing.setPosition(pos);
            thing.onAppear();
        }
        //notificateTileUpdate(pos);
    }
    removeThing(thing) {
        if (!thing)
            return false;
        let ret = false;
        if (thing.isMissile()) {
            let missile = thing;
            let z = missile.getPosition().z;
            let it = this.m_floorMissiles[z].indexOf(missile);
            if (it > -1) {
                this.m_floorMissiles.splice(it, 1);
                ret = true;
            }
        }
        else if (thing.isAnimatedText()) {
            let animatedText = thing;
            let it = this.m_animatedTexts.indexOf(animatedText);
            if (it > -1) {
                this.m_animatedTexts.splice(it, 1);
                ret = true;
            }
        }
        else if (thing.isStaticText()) {
            let staticText = thing;
            let it = this.m_staticTexts.indexOf(staticText);
            if (it > -1) {
                this.m_staticTexts.splice(it, 1);
                ret = true;
            }
        }
        else {
            let tile = thing.getTile();
            if (tile)
                ret = tile.removeThing(thing);
        }
        //notificateTileUpdate(thing.getPosition());
        return ret;
    }
    removeThingByPos(pos, stackPos) {
        let tile = this.getTile(pos);
        if (tile)
            return this.removeThing(tile.getThing(stackPos));
        return false;
    }
    setLight(light) {
    }
    getThing(pos, stackpos) {
        let tile = this.getTile(pos);
        if (tile)
            return tile.getThing(stackpos);
        return null;
    }
    removeCreatureById(removeId) {
    }
    addCreature(creature) {
    }
    removeUnawareThings() {
        /* todo */
    }
    getBlockIndex(pos) { return (toInt(pos.y / TileBlock.BLOCK_SIZE) * toInt(65536 / TileBlock.BLOCK_SIZE)) + toInt(pos.x / TileBlock.BLOCK_SIZE); }
}
let g_map = new Map();
export { g_map };
//# sourceMappingURL=map.js.map