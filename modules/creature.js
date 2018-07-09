import { Thing } from "./thing";
export class Creature extends Thing {
    constructor() {
        super();
        this.m_id = 0;
        this.m_known = false;
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
    setKnown(v) {
        this.m_known = v;
    }
    isKnown() {
        return this.m_known;
    }
    addTimedSquare(arg0) {
        throw new Error("Method not implemented.");
    }
    hideStaticSquare() {
        throw new Error("Method not implemented.");
    }
    showStaticSquare(arg0) {
        throw new Error("Method not implemented.");
    }
    setType(type) {
    }
    allowAppearWalk() {
    }
    setHealthPercent(healthPercent) {
    }
    setLight(light) {
    }
    setOutfit(outfit) {
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
    }
    turn(direction) {
    }
}
//# sourceMappingURL=creature.js.map