import { Thing } from "./thing";
import { Outfit } from "./outfit";
import { Direction } from "./constants/const";
import { Color } from "./color";
import { CachedText } from "./cachedtext";
import { Timer } from "./structures/timer";
export class Creature extends Thing {
    constructor() {
        super();
        this.m_id = 0;
        this.m_showShieldTexture = true;
        this.m_shieldBlink = false;
        this.m_passable = false;
        this.m_showTimedSquare = false;
        this.m_showStaticSquare = false;
        this.m_removed = true;
        this.m_nameCache = new CachedText();
        this.m_informationColor = new Color();
        this.m_outfitColor = new Color();
        //ScheduledEventPtr m_outfitColorUpdateEvent;
        this.m_outfitColorTimer = new Timer();
        this.m_walkTimer = new Timer();
        this.m_footTimer = new Timer();
        this.m_walking = false;
        this.m_allowAppearWalk = false;
        this.m_footStepDrawn = false;
        this.m_walkTurnDirection = Direction.InvalidDirection;
        this.m_lastStepDirection = Direction.InvalidDirection;
        this.m_outfit = new Outfit();
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
}
//# sourceMappingURL=creature.js.map