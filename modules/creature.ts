import {Thing} from "./thing";
import {Outfit} from "./outfit";
import {
    CreatureIcons,
    Direction,
    Otc,
    PlayerEmblems,
    PlayerShields,
    PlayerSkulls,
    ThingCategory
} from "./constants/const";
import {Light} from "./structures/light";
import {Color} from "./color";
import {CachedText} from "./cachedtext";
import {Timer} from "./structures/timer";
import {Tile} from "./tile";
import {Point} from "./structures/point";
import {LightView} from "./lightview";
import {Proto} from "./constants/proto";
import {g_clock} from "./structures/g_clock";
import {ThingType} from "./thingtype";
import {g_things} from "./thingtypemanager";

export class Creature extends Thing {
    m_id: number = 0;
    m_name: string;
    m_healthPercent: number = 100;
    m_direction: Direction = Direction.South;
    m_outfit = new Outfit();

    m_light: Light;
    m_speed: number = 200;
    m_baseSpeed: number;
    m_skull: PlayerSkulls = PlayerSkulls.SkullNone;
    m_shield: PlayerShields = PlayerShields.ShieldNone;
    m_emblem: PlayerEmblems = PlayerEmblems.EmblemNone;
    m_type: Proto = Proto.CreatureTypeUnknown;
    m_icon: CreatureIcons = CreatureIcons.NpcIconNone;
    m_showShieldTexture: boolean = true;
    m_shieldBlink: boolean = false;
    m_passable: boolean = false;
    m_showTimedSquare: boolean = false;
    m_showStaticSquare: boolean = false;
    m_removed: boolean = true;
    m_nameCache: CachedText = new CachedText();
    m_informationColor: Color = new Color(96, 96, 96);
    m_outfitColor: Color = new Color(255, 255, 255);
    //ScheduledEventPtr m_outfitColorUpdateEvent;
    m_outfitColorTimer: Timer = new Timer();

    // walk related
    m_walkAnimationPhase: number = 0;
    m_walkedPixels: number = 0;
    m_footStep: number = 0;
    m_walkTimer: Timer = new Timer();
    m_footTimer: Timer = new Timer();
    m_walkingTile: Tile;
    m_walking: boolean = false;
    m_allowAppearWalk: boolean = false;
    m_footStepDrawn: boolean = false;
    m_walkOffset: Point = new Point();
    m_walkTurnDirection: Direction = Direction.InvalidDirection;
    m_lastStepDirection: Direction = Direction.InvalidDirection;

    constructor() {
        super();
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

    canBeSeen(): boolean {
        return !this.isInvisible() || this.isPlayer();
    }

    isInvisible() {
        return this.m_outfit.getCategory() == ThingCategory.ThingCategoryEffect && this.m_outfit.getAuxId() == 13;
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


    getThingType(): ThingType {
        return g_things.getThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }

    rawGetThingType(): ThingType {
        return g_things.rawGetThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }
}