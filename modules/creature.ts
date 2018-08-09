import {Thing} from "./thing";
import {Outfit} from "./outfit";
import {Direction} from "./constants/const";
import {Light} from "./structures/light";
import {Texture} from "./structures/texture";
import {Color} from "./color";
import {CachedText} from "./cachedtext";
import {Timer} from "./structures/timer";
import {Tile} from "./tile";
import {Point} from "./structures/point";
import {LightView} from "./lightview";

export class Creature extends Thing {
    m_id: number = 0;
    m_name: string;
    m_healthPercent: number;
    m_direction: Direction;
    m_outfit: Outfit;

    m_light: Light;
    m_speed: number;
    m_baseSpeed: number;
    m_skull: number;
    m_shield: number;
    m_emblem: number;
    m_type: number;
    m_icon: number;
    m_skullTexture: Texture;
    m_shieldTexture: Texture;
    m_emblemTexture: Texture;
    m_typeTexture: Texture;
    m_iconTexture: Texture;
    m_showShieldTexture: boolean = true;
    m_shieldBlink: boolean = false;
    m_passable: boolean = false;
    m_timedSquareColor: Color;
    m_staticSquareColor: Color;
    m_showTimedSquare: boolean = false;
    m_showStaticSquare: boolean = false;
    m_removed: boolean = true;
    m_nameCache: CachedText = new CachedText()
    m_informationColor: Color = new Color();
    m_outfitColor: Color = new Color();
    //ScheduledEventPtr m_outfitColorUpdateEvent;
    m_outfitColorTimer: Timer = new Timer();

    //std::array<double, Otc::LastSpeedFormula> m_speedFormula;

    // walk related
    m_walkAnimationPhase: number;
    m_walkedPixels: number;
    m_footStep: number;
    m_walkTimer: Timer = new Timer();
    m_footTimer: Timer = new Timer();
    m_walkingTile: Tile;
    m_walking: boolean = false;
    m_allowAppearWalk: boolean = false;
    m_footStepDrawn: boolean = false;
    //ScheduledEventPtr m_walkUpdateEvent;
    //ScheduledEventPtr m_walkFinishAnimEvent;
    //EventPtr m_disappearEvent;
    m_walkOffset: Point;
    m_walkTurnDirection: Direction = Direction.InvalidDirection;
    m_lastStepDirection: Direction = Direction.InvalidDirection;
    m_lastStepFromPosition: Position;
    m_lastStepToPosition: Position;
    m_oldPosition: Position;

    constructor() {
        super();
        this.m_outfit = new Outfit();
    }

    draw(dest: Point, scaleFactor: number, animate: boolean, lightView: LightView = null) {
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

    addTimedSquare(arg0: any): any {
        // throw new Error("Method not implemented.");
    }

    hideStaticSquare(): any {
        //throw new Error("Method not implemented.");
    }

    showStaticSquare(arg0: any): any {
        // throw new Error("Method not implemented.");
    }

    setType(type: number) {
        this.m_type = type;
    }

    allowAppearWalk() {

    }

    setHealthPercent(healthPercent: number) {
        this.m_healthPercent = healthPercent;
    }

    setLight(light: Light) {

    }

    setOutfit(outfit: Outfit) {
        this.m_outfit = outfit;
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
        this.m_direction = direction;
    }

    turn(direction: Direction) {
        if (!this.m_walking)
            this.setDirection(direction);
        else
            this.m_walkTurnDirection = direction;
    }

    isWalking(): boolean {
        return this.m_walking;
    }
}