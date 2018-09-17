import { Thing } from "./thing";
import { Outfit } from "./outfit";
import { CreatureIcons, Direction, PlayerEmblems, PlayerShields, PlayerSkulls, ThingCategory } from "./constants/const";
import { Color } from "./color";
import { CachedText } from "./cachedtext";
import { Timer } from "./structures/timer";
import { Point } from "./structures/point";
import { Proto } from "./constants/proto";
import { g_things } from "./thingtypemanager";
export class Creature extends Thing {
    constructor() {
        super();
        this.m_id = 0;
        this.m_healthPercent = 100;
        this.m_direction = Direction.South;
        this.m_outfit = new Outfit();
        this.m_speed = 200;
        this.m_skull = PlayerSkulls.SkullNone;
        this.m_shield = PlayerShields.ShieldNone;
        this.m_emblem = PlayerEmblems.EmblemNone;
        this.m_type = Proto.CreatureTypeUnknown;
        this.m_icon = CreatureIcons.NpcIconNone;
        this.m_showShieldTexture = true;
        this.m_shieldBlink = false;
        this.m_passable = false;
        this.m_showTimedSquare = false;
        this.m_showStaticSquare = false;
        this.m_removed = true;
        this.m_nameCache = new CachedText();
        this.m_informationColor = new Color(96, 96, 96);
        this.m_outfitColor = new Color(255, 255, 255);
        //ScheduledEventPtr m_outfitColorUpdateEvent;
        this.m_outfitColorTimer = new Timer();
        // walk related
        this.m_walkAnimationPhase = 0;
        this.m_walkedPixels = 0;
        this.m_footStep = 0;
        this.m_walkTimer = new Timer();
        this.m_footTimer = new Timer();
        this.m_walking = false;
        this.m_allowAppearWalk = false;
        this.m_footStepDrawn = false;
        this.m_walkOffset = new Point();
        this.m_walkTurnDirection = Direction.InvalidDirection;
        this.m_lastStepDirection = Direction.InvalidDirection;
    }
    draw(dest, scaleFactor, animate, lightView = null) {
    }
    getId() {
        return this.m_id;
    }
    setId(id) {
        this.m_id = id;
    }
    getName() {
        return this.m_name;
    }
    setName(name) {
        this.m_name = name;
    }
    isCreature() {
        return true;
    }
    canBeSeen() {
        return !this.isInvisible() || this.isPlayer();
    }
    isInvisible() {
        return this.m_outfit.getCategory() == ThingCategory.ThingCategoryEffect && this.m_outfit.getAuxId() == 13;
    }
    addTimedSquare(arg0) {
        // throw new Error("Method not implemented.");
    }
    hideStaticSquare() {
        //throw new Error("Method not implemented.");
    }
    showStaticSquare(arg0) {
        // throw new Error("Method not implemented.");
    }
    setType(type) {
        this.m_type = type;
    }
    allowAppearWalk() {
    }
    setHealthPercent(healthPercent) {
        this.m_healthPercent = healthPercent;
    }
    setLight(light) {
    }
    setOutfit(outfit) {
        this.m_outfit = outfit;
    }
    setSpeed(speed) {
    }
    setBaseSpeed(baseSpeed) {
    }
    setSkull(skull) {
    }
    setShield(shield) {
    }
    setPassable(v) {
    }
    setEmblem(emblem) {
    }
    setIcon(icon) {
    }
    setDirection(direction) {
        this.m_direction = direction;
    }
    turn(direction) {
        if (!this.m_walking)
            this.setDirection(direction);
        else
            this.m_walkTurnDirection = direction;
    }
    isWalking() {
        return this.m_walking;
    }
    getThingType() {
        return g_things.getThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }
    rawGetThingType() {
        return g_things.rawGetThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }
}
//# sourceMappingURL=creature.js.map