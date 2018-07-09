import {Thing} from "./thing";
import {Outfit} from "./outfit";
import {Direction} from "./constants/const";
import {Light} from "./structures/light";

export class Creature extends Thing {
    m_id: number = 0;
    m_name: string;
    m_known: boolean = false;

    constructor() {
        super();
    }
    getId() {
        return this.m_id;
    }

    setId(id: number) {
        this.m_id = id;
    }

    getName() {
        return this.m_name;
    }

    setName(name: string) {
        this.m_name = name;
    }

    isCreature() {
        return true;
    }

    setKnown(v: boolean) {
        this.m_known = v;
    }
    isKnown() {
        return this.m_known;
    }

    addTimedSquare(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    hideStaticSquare(): any {
        throw new Error("Method not implemented.");
    }

    showStaticSquare(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    setType(type: number) {

    }

    allowAppearWalk() {

    }

    setHealthPercent(healthPercent: number) {

    }

    setLight(light: Light) {

    }

    setOutfit(outfit: Outfit) {

    }

    setSpeed(speed: number) {

    }

    setBaseSpeed(baseSpeed: number) {

    }

    setSkull(skull: number) {

    }

    setShield(shield: number) {

    }

    setPassable(v: boolean) {

    }

    setEmblem(emblem: number) {

    }

    setIcon(icon: number) {

    }

    setDirection(direction: Direction) {

    }

    turn(direction: Direction) {

    }
}