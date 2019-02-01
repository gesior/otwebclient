import {Creature} from "./creature";
import {Tile} from "./tile";
import {Position} from "./position";
import {Thing} from "./thing";
import {AwareRange} from "./structures/awarerange";
import {Light} from "./structures/light";
import {TileBlock} from "./tileblock";
import {Missile} from "./missile";
import {MessageMode, Otc} from "./constants/const";
import {AnimatedText} from "./animatedtext";
import {StaticText} from "./statictext";
import {Color} from "./color";
import {Point} from "./structures/point";
import {toInt} from "./constants/helpers";
import {Log} from "./log";


export class Map {
    m_tileBlocks: TileBlock[][] = [];
    m_knownCreatures: Creature[] = [];
    m_floorMissiles: Missile[][] = [];
    m_animatedTexts: AnimatedText[] = [];
    m_staticTexts: StaticText[] = [];
// std::vector<MapViewPtr> m_mapViews;
//std::unordered_map<Position, std::string, PositionHasher> m_waypoints;

    m_animationFlags: number = 0;
    m_zoneFlags: number = 0;
    m_zoneColors: Color[] = [];
    m_zoneOpacity: number = 0.0;

    m_light: Light = new Light();
    m_centralPosition: Position = new Position();


    m_attribs: number[] = [];
    m_awareRange: AwareRange = new AwareRange();


    constructor() {
        for (let z = 0; z <= Otc.MAX_Z + 1; ++z) {
            this.m_tileBlocks[z] = [];
            this.m_floorMissiles[z] = [];
        }
    }

    refresh() {

    }

    createTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;

        let block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (!block) {
            block = new TileBlock();
            this.m_tileBlocks[pos.z][this.getBlockIndex(pos)] = block
        }
        return block.create(pos);
    }

    getTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;
        let it = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
        if (it)
            return it.get(pos);
        return null;
    }

    getOrCreateTile(pos: Position): Tile {
        if (!pos.isMapPosition())
            return null;

        let tile = this.getTile(pos);
        if (!tile) {
            tile = this.createTile(pos);
        }
        return tile;
    }


    setAwareRange(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    getCreatureById(id: number): Creature {
        //console.log('known creatures', g_map.m_knownCreatures);
        if (!g_map.m_knownCreatures[id]) {
            //Log.error('known creatures failed', id);//, g_map.m_knownCreatures);
            for (var crea in g_map.m_knownCreatures) {
               //Log.log('failed', crea);
            }
            //throw new Error('getCreatureById ' + id);
            return null;
        }
        return g_map.m_knownCreatures[id];
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

    cleanTile(pos: Position) {

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

    addThing(thing: Thing, pos: Position, stackPos: number = -1) {

        if (!thing)
            return;

        if (thing.isItem() || thing.isCreature() || thing.isEffect()) {
            let tile = this.getOrCreateTile(pos);
            if (tile)
                tile.addThing(thing, stackPos);
        } else {
            if (thing.isMissile()) {
                this.m_floorMissiles[pos.z].push(<Missile> thing);
            } else if (thing.isAnimatedText()) {
                // this code will stack animated texts of the same color
                let animatedText = <AnimatedText> thing;
                let prevAnimatedText: AnimatedText;
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
            } else if (thing.isStaticText()) {
                let staticText = <StaticText> thing;
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

    removeThing(thing: Thing) {
        if (!thing)
            return false;

        let ret = false;
        if (thing.isMissile()) {
            let missile = <Missile> thing;
            let z = missile.getPosition().z;
            let it = this.m_floorMissiles[z].indexOf(missile);
            if (it > -1) {
                this.m_floorMissiles.splice(it, 1);
                ret = true;
            }
        } else if (thing.isAnimatedText()) {
            let animatedText = <AnimatedText> thing;
            let it = this.m_animatedTexts.indexOf(animatedText);
            if (it > -1) {
                this.m_animatedTexts.splice(it, 1);
                ret = true;
            }
        } else if (thing.isStaticText()) {
            let staticText = <StaticText> thing;
            let it = this.m_staticTexts.indexOf(staticText);
            if (it > -1) {
                this.m_staticTexts.splice(it, 1);
                ret = true;
            }
        } else {
            let tile = thing.getTile();
            if (tile)
                ret = tile.removeThing(thing);
        }

        //notificateTileUpdate(thing.getPosition());
        return ret;
    }

    removeThingByPos(pos: Position, stackPos: number) {
        let tile = this.getTile(pos);
        if (tile)
            return this.removeThing(tile.getThing(stackPos));
        return false;
    }

    setLight(light: Light) {

    }

    getThing(pos: Position, stackpos: number): Thing {
        let tile = this.getTile(pos);
        //Log.debug('Map.getThing', pos, tile.getThing(stackpos));
        if (tile)
            return tile.getThing(stackpos);
        return null;
    }

    addCreature(creature: Creature) {
        //Log.log('add creature', creature.getId(), creature.getName());
        this.m_knownCreatures[creature.getId()] = creature;
    }

    removeCreatureById(id: number) {
        if (id == 0)
            return;

        //Log.log('remove creature', this.m_knownCreatures.length, id);
        if (this.m_knownCreatures[id]) {
            //Log.log('remove creature', this.m_knownCreatures.length, id, this.m_knownCreatures[id].getName());
            //this.m_knownCreatures.splice(id, 1);
        }
    }

    removeUnawareThings() {
        /* todo */
    }

    getBlockIndex(pos: Position): number {
        return (toInt(pos.y / TileBlock.BLOCK_SIZE) * toInt(65536 / TileBlock.BLOCK_SIZE)) + toInt(pos.x / TileBlock.BLOCK_SIZE);
    }

}

let g_map = new Map();
export {g_map}