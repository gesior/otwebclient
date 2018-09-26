import { g_game } from "./game";
import { g_map } from "./map";
import { Otc, Tilestate } from "./constants/const";
let cc = 0;
export class Tile {
    constructor(position) {
        this.m_drawElevation = 0;
        this.m_minimapColor = 0;
        this.m_flags = 0;
        this.m_walkingCreatures = [];
        this.m_effects = [];
        this.m_things = [];
        this.m_position = position;
    }
    draw(dest, scaleFactor, drawFlags, lightView = null) {
    }
    clean() {
        while (this.m_things.length > 0)
            this.removeThing(this.m_things.pop());
    }
    addWalkingCreature(creature) {
        this.m_walkingCreatures.push(creature);
    }
    removeWalkingCreature(creature) {
        let index = this.m_walkingCreatures.indexOf(creature);
        if (index > -1) {
            this.m_walkingCreatures.splice(index, 1);
        }
    }
    addThing(thing, stackPos) {
        if (!thing)
            return;
        if (thing.isEffect()) {
            if (thing.isTopEffect())
                this.m_effects.unshift(thing);
            else
                this.m_effects.push(thing);
        }
        else {
            /*
            if (thing.isCreature())
                console.log('tile.addThing', thing, stackPos, this.m_things);
            */
            // priority                                    854
            // 0 - ground,                        -.      -.
            // 1 - ground borders                 -.      -.
            // 2 - bottom (walls),                -.      -.
            // 3 - on top (doors)                 -.      -.
            // 4 - creatures, from top to bottom  <--      -.
            // 5 - items, from top to bottom      <--      <--
            if (stackPos < 0 || stackPos == 255) {
                let priority = thing.getStackPriority();
                // -1 or 255 => auto detect position
                // -2        => append
                let append;
                if (stackPos == -2)
                    append = true;
                else {
                    append = (priority <= 3);
                    // newer protocols does not store creatures in reverse order
                    if (g_game.getClientVersion() >= 854 && priority == 4)
                        append = !append;
                }
                for (stackPos = 0; stackPos < this.m_things.length; ++stackPos) {
                    let otherPriority = this.m_things[stackPos].getStackPriority();
                    //console.log('prior', stackPos, priority, otherPriority);
                    if ((append && otherPriority > priority) || (!append && otherPriority >= priority))
                        break;
                }
            }
            else if (stackPos > this.m_things.length)
                stackPos = this.m_things.length;
            //this.m_things.insert(this.m_things.begin() + stackPos, thing);
            this.m_things.splice(stackPos, 0, thing);
            //this.m_things[stackPos] = thing;
            if (this.m_things.length > Tile.MAX_THINGS)
                this.removeThing(this.m_things[Tile.MAX_THINGS]);
            /*
            // check stack priorities
            // this code exists to find stackpos bugs faster
            int lastPriority = 0;
            for(const ThingPtr& thing :this.m_things) {
                int priority = thing.getStackPriority();
                assert(lastPriority <= priority);
                lastPriority = priority;
            }
            */
        }
        thing.setPosition(this.m_position);
        thing.onAppear();
        if (thing.isTranslucent())
            this.checkTranslucentLight();
    }
    removeThing(thing) {
        if (!thing)
            return false;
        let removed = false;
        if (thing.isEffect()) {
            let index = this.m_effects.indexOf(thing);
            if (index > -1) {
                this.m_effects.splice(index, 1);
                removed = true;
            }
        }
        else {
            let index = this.m_things.indexOf(thing);
            if (index > -1) {
                this.m_things.splice(index, 1);
                removed = true;
            }
        }
        thing.onDisappear();
        if (thing.isTranslucent())
            this.checkTranslucentLight();
        return removed;
    }
    getThing(stackPos) {
        if (stackPos >= 0 && stackPos < this.m_things.length) {
            //Log.debug('tile thing: ', this.m_things[stackPos]);
            return this.m_things[stackPos];
        }
        return null;
    }
    getEffect(id) {
        for (let effect of this.m_effects)
            if (effect.getId() == id)
                return effect;
        return null;
    }
    hasThing(thing) {
        return this.m_things.indexOf(thing) > -1;
    }
    getThingStackPos(thing) {
        /*
        for(let stackpos = 0; stackpos < this.m_things.length; ++stackpos)
        if(thing == this.m_things[stackpos])
            return stackpos;
         */
        return this.m_things.indexOf(thing);
    }
    getTopThing() {
        if (this.isEmpty())
            return null;
        for (let thing of this.m_things)
            if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature())
                return thing;
        return this.m_things[this.m_things.length - 1];
    }
    getTopLookThing() {
        if (this.isEmpty())
            return null;
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (!thing.isIgnoreLook() && (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()))
                return thing;
        }
        return this.m_things[0];
    }
    getTopUseThing() {
        if (this.isEmpty())
            return null;
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (thing.isForceUse() || (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature() && !thing.isSplash()))
                return thing;
        }
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (!thing.isGround() && !thing.isGroundBorder() && !thing.isCreature() && !thing.isSplash())
                return thing;
        }
        return this.m_things[0];
    }
    getTopCreature() {
        let creature;
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (thing.isLocalPlayer()) // return local player if there is no other creature
                creature = thing;
            else if (thing.isCreature() && !thing.isLocalPlayer())
                return thing;
        }
        if (!creature && this.m_walkingCreatures.length > 0)
            creature = this.m_walkingCreatures[this.m_walkingCreatures.length - 1];
        // check for walking creatures in tiles around
        if (!creature) {
            for (let xi = -1; xi <= 1; ++xi) {
                for (let yi = -1; yi <= 1; ++yi) {
                    let pos = this.m_position.translated(xi, yi);
                    if (pos == this.m_position)
                        continue;
                    let tile = g_map.getTile(pos);
                    if (tile) {
                        for (let c of tile.getCreatures()) {
                            /* todo */
                            //if(c.isWalking() && c.getLastStepFromPosition() == this.m_position && c.getStepProgress() < 0.75) {
                            creature = c;
                            //}
                        }
                    }
                }
            }
        }
        return creature;
    }
    getTopMoveThing() {
        if (this.isEmpty())
            return null;
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature()) {
                if (i > 0 && thing.isNotMoveable())
                    return this.m_things[i - 1];
                return thing;
            }
        }
        for (let thing of this.m_things) {
            if (thing.isCreature())
                return thing;
        }
        return this.m_things[0];
    }
    getTopMultiUseThing() {
        if (this.isEmpty())
            return null;
        let topCreature = this.getTopCreature();
        if (topCreature)
            return topCreature;
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (thing.isForceUse())
                return thing;
        }
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()) {
                if (i > 0 && thing.isSplash())
                    return this.m_things[i - 1];
                return thing;
            }
        }
        for (let i = 0; i < this.m_things.length; ++i) {
            let thing = this.m_things[i];
            if (!thing.isGround() && !thing.isOnTop())
                return thing;
        }
        return this.m_things[0];
    }
    getPosition() {
        return this.m_position;
    }
    getDrawElevation() {
        return this.m_drawElevation;
    }
    getItems() {
        let items = [];
        for (let thing of this.m_things) {
            if (thing.isItem())
                items.push(thing);
        }
        return items;
    }
    getCreatures() {
        let creatures = [];
        for (let thing of this.m_things) {
            if (thing.isCreature())
                creatures.push(thing);
        }
        return creatures;
    }
    getWalkingCreatures() {
        return this.m_walkingCreatures;
    }
    getThings() {
        return this.m_things;
    }
    getGround() {
        let firstObject = this.getThing(0);
        if (!firstObject)
            return null;
        if (firstObject.isGround() && firstObject.isItem())
            return firstObject;
        return null;
    }
    getGroundSpeed() {
        let groundSpeed = 100;
        let ground = this.getGround();
        if (ground)
            groundSpeed = ground.getGroundSpeed();
        return groundSpeed;
    }
    getMinimapColorByte() {
        let color = 255; // alpha
        if (this.m_minimapColor != 0)
            return this.m_minimapColor;
        for (let thing of this.m_things) {
            if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop())
                break;
            let c = thing.getMinimapColor();
            if (c != 0)
                color = c;
        }
        return color;
    }
    getThingCount() {
        return this.m_things.length + this.m_effects.length;
    }
    isPathable() {
        for (let thing of this.m_things)
            if (thing.isNotPathable())
                return false;
        return true;
    }
    isWalkable(ignoreCreatures = false) {
        if (!this.getGround())
            return false;
        for (let thing of this.m_things) {
            if (thing.isNotWalkable())
                return false;
            if (!ignoreCreatures) {
                if (thing.isCreature()) {
                    let creature = thing;
                    /* todo */
                    //if(!creature.isPassable() && creature.canBeSeen())
                    return false;
                }
            }
        }
        return true;
    }
    isFullGround() {
        let ground = this.getGround();
        if (ground && ground.isFullGround())
            return true;
        return false;
    }
    isFullyOpaque() {
        let firstObject = this.getThing(0);
        return firstObject && firstObject.isFullGround();
    }
    isSingleDimension() {
        if (this.m_walkingCreatures.length > 0)
            return false;
        for (let thing of this.m_things)
            if (thing.getHeight() != 1 || thing.getWidth() != 1)
                return false;
        return true;
    }
    isLookPossible() {
        for (let thing of this.m_things)
            if (thing.blockProjectile())
                return false;
        return true;
    }
    isClickable() {
        let hasGround = false;
        let hasOnBottom = false;
        let hasIgnoreLook = false;
        for (let thing of this.m_things) {
            if (thing.isGround())
                hasGround = true;
            if (thing.isOnBottom())
                hasOnBottom = true;
            if ((hasGround || hasOnBottom) && !hasIgnoreLook)
                return true;
        }
        return false;
    }
    isEmpty() {
        return this.m_things.length == 0;
    }
    isDrawable() {
        return this.m_things.length > 0 || this.m_walkingCreatures.length > 0 || this.m_effects.length > 0;
    }
    hasTranslucentLight() {
        return (this.m_flags & Tilestate.TILESTATE_TRANSLUECENT_LIGHT) > 0;
    }
    mustHookSouth() {
        for (let thing of this.m_things)
            if (thing.isHookSouth())
                return true;
        return false;
    }
    mustHookEast() {
        for (let thing of this.m_things)
            if (thing.isHookEast())
                return true;
        return false;
    }
    hasCreature() {
        for (let thing of this.m_things)
            if (thing.isCreature())
                return true;
        return false;
    }
    limitsFloorsView(isFreeView = false) {
        // ground and walls limits the view
        let firstThing = this.getThing(0);
        if (isFreeView) {
            if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || firstThing.isOnBottom()))
                return true;
        }
        else if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || (firstThing.isOnBottom() && firstThing.blockProjectile())))
            return true;
        return false;
    }
    canErase() {
        return this.m_walkingCreatures.length == 0 && this.m_effects.length == 0 && this.m_things.length == 0 && this.m_flags == 0 && this.m_minimapColor == 0;
    }
    getElevation() {
        let elevation = 0;
        for (let thing of this.m_things)
            if (thing.getElevation() > 0)
                elevation++;
        return elevation;
    }
    hasElevation(elevation = 1) {
        return this.getElevation() >= elevation;
    }
    overwriteMinimapColor(color) {
        this.m_minimapColor = color;
    }
    remFlag(flag) {
        this.m_flags &= ~flag;
    }
    setFlag(flag) {
        this.m_flags |= flag;
    }
    setFlags(flags) {
        this.m_flags = flags;
    }
    hasFlag(flag) {
        return (this.m_flags & flag) == flag;
    }
    getFlags() {
        return this.m_flags;
    }
    checkTranslucentLight() {
        if (this.m_position.z != Otc.SEA_FLOOR)
            return;
        let downPos = this.m_position.clone();
        if (!downPos.down())
            return;
        let tile = g_map.getOrCreateTile(downPos);
        if (!tile)
            return;
        let translucent = false;
        for (let thing of this.m_things) {
            if (thing.isTranslucent() || thing.hasLensHelp()) {
                translucent = true;
                break;
            }
        }
        if (translucent)
            tile.m_flags |= Tilestate.TILESTATE_TRANSLUECENT_LIGHT;
        else
            tile.m_flags &= ~Tilestate.TILESTATE_TRANSLUECENT_LIGHT;
    }
}
Tile.MAX_THINGS = 10;
//# sourceMappingURL=tile.js.map