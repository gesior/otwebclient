import {Thing} from "./thing";
import {Outfit} from "./outfit";
import {
    CreatureIcons,
    Direction,
    GameFeature,
    PlayerEmblems,
    PlayerShields,
    PlayerSkulls, SpeedFormula,
    ThingCategory
} from "./constants/const";
import {Light} from "./structures/light";
import {Texture} from "./structures/texture";
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
import {Position} from "./position";
import {ScheduledEvent} from "./eventdispatcher";
import {g_game} from "./game";
import {g_map} from "./map";

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
    m_nameCache: CachedText = new CachedText();
    m_informationColor: Color = new Color(96, 96, 96);
    m_outfitColor: Color = new Color(255, 255, 255);
    //ScheduledEventPtr m_outfitColorUpdateEvent;
    m_outfitColorTimer: Timer = new Timer();

    m_speedFormula : number[] = [];

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
    //ScheduledEventPtr m_walkUpdateEvent;
    m_walkFinishAnimEvent : ScheduledEvent;
    //EventPtr m_disappearEvent;
    m_walkOffset: Point = new Point();
    m_walkTurnDirection: Direction = Direction.InvalidDirection;
    m_lastStepDirection: Direction = Direction.InvalidDirection;
    m_lastStepFromPosition: Position = new Position();
    m_lastStepToPosition: Position = new Position();
    m_oldPosition: Position = new Position();

    constructor() {
        super();
        for (let i = 0; i < SpeedFormula.LastSpeedFormula; ++i) {
            this.m_speedFormula.push(-1);
        }
    }

    draw(dest: Point, scaleFactor: number, animate: boolean, lightView: LightView = null) {

        if (!this.canBeSeen())
            return;

        let animationOffset: Point = animate ? this.m_walkOffset : new Point(0, 0);
        /*
                if(m_showTimedSquare && animate) {
                    g_painter.setColor(m_timedSquareColor);
                    g_painter.drawBoundingRect(Rect(dest + (animationOffset - getDisplacement() + 2)*scaleFactor, Size(28, 28)*scaleFactor), std::max<int>((int)(2*scaleFactor), 1));
                    g_painter.setColor(Color::white);
                }

                if(m_showStaticSquare && animate) {
                    g_painter.setColor(m_staticSquareColor);
                    g_painter.drawBoundingRect(Rect(dest + (animationOffset - getDisplacement())*scaleFactor, Size(Otc::TILE_PIXELS, Otc::TILE_PIXELS)*scaleFactor), std::max<int>((int)(2*scaleFactor), 1));
                    g_painter.setColor(Color::white);
                }
        */
        this.internalDrawOutfit(dest.add(animationOffset).mul(scaleFactor), scaleFactor, animate, animate, this.m_direction);
      ///  console.log('direct', this.m_name, this.m_direction);
        this.m_footStepDrawn = true;
        /*
                if(lightView) {
                    Light light = rawGetThingType().getLight();
                    if(m_light.intensity != light.intensity || m_light.color != light.color)
                        light = m_light;

                    // local player always have a minimum light in complete darkness
                    if(isLocalPlayer() && (g_map.getLight().intensity < 64 || m_position.z > Otc::SEA_FLOOR)) {
                        light.intensity = std::max<uint8>(light.intensity, 3);
                        if(light.color == 0 || light.color > 215)
                            light.color = 215;
                    }

                    if(light.intensity > 0)
                        lightView.addLightSource(dest + (animationOffset + Point(16,16)) * scaleFactor, scaleFactor, light);
                }
                */
    }

    internalDrawOutfit(dest: Point, scaleFactor: number, animateWalk: boolean, animateIdle: boolean, direction: Direction, lightView: LightView = null) {
        //g_painter.setColor(m_outfitColor);

        // outfit is a real creature
        if (this.m_outfit.getCategory() == ThingCategory.ThingCategoryCreature) {
            let animationPhase = animateWalk ? this.m_walkAnimationPhase : 0;

            if (this.isAnimateAlways() && animateIdle) {
                let ticksPerFrame = 1000 / this.getAnimationPhases();
                animationPhase = (g_clock.millis() % (ticksPerFrame * this.getAnimationPhases())) / ticksPerFrame;
            }

            // xPattern => creature direction
            let xPattern;
            if (direction == Direction.NorthEast || direction == Direction.SouthEast)
                xPattern = Direction.East;
            else if (direction == Direction.NorthWest || direction == Direction.SouthWest)
                xPattern = Direction.West;
            else
                xPattern = direction;

            let zPattern = 0;
            if (this.m_outfit.getMount() != 0) {
                let datType = g_things.rawGetThingType(this.m_outfit.getMount(), ThingCategory.ThingCategoryCreature);
                dest = dest.sub(datType.getDisplacement().mul(scaleFactor));
                datType.draw(dest, scaleFactor, 0, xPattern, 0, 0, animationPhase, lightView);
                dest = dest.add(this.getDisplacement().mul(scaleFactor));
                zPattern = Math.min(1, this.getNumPatternZ() - 1);
            }

            // yPattern => creature addon
            for (let yPattern = 0; yPattern < this.getNumPatternY(); yPattern++) {

                // continue if we dont have this addon
                if (yPattern > 0 && !(this.m_outfit.getAddons() & (1 << (yPattern - 1))))
                    continue;

                let datType = this.rawGetThingType();
                //console.log('pp', dest, datType);
                datType.draw(dest, scaleFactor, 0, xPattern, yPattern, zPattern, animationPhase, yPattern == 0 ? lightView : null);

                if (this.getLayers() > 1) {
                    /*
                    Color oldColor = g_painter.getColor();
                    Painter::CompositionMode oldComposition = g_painter.getCompositionMode();
                    g_painter.setCompositionMode(Painter::CompositionMode_Multiply);
                    g_painter.setColor(m_outfit.getHeadColor());
                    datType.draw(dest, scaleFactor, SpriteMaskYellow, xPattern, yPattern, zPattern, animationPhase);
                    g_painter.setColor(m_outfit.getBodyColor());
                    datType.draw(dest, scaleFactor, SpriteMaskRed, xPattern, yPattern, zPattern, animationPhase);
                    g_painter.setColor(m_outfit.getLegsColor());
                    datType.draw(dest, scaleFactor, SpriteMaskGreen, xPattern, yPattern, zPattern, animationPhase);
                    g_painter.setColor(m_outfit.getFeetColor());
                    datType.draw(dest, scaleFactor, SpriteMaskBlue, xPattern, yPattern, zPattern, animationPhase);
                    g_painter.setColor(oldColor);
                    g_painter.setCompositionMode(oldComposition);
                    */
                }
            }
            // outfit is a creature imitating an item or the invisible effect
        }
        /*
        else  {
            ThingType *type = g_things.rawGetThingType(m_outfit.getAuxId(), m_outfit.getCategory());

            int animationPhase = 0;
            int animationPhases = type.getAnimationPhases();
            int animateTicks = Otc::ITEM_TICKS_PER_FRAME;

            // when creature is an effect we cant render the first and last animation phase,
            // instead we should loop in the phases between
            if(m_outfit.getCategory() == ThingCategoryEffect) {
                animationPhases = std::max<int>(1, animationPhases-2);
                animateTicks = Otc::INVISIBLE_TICKS_PER_FRAME;
            }

            if(animationPhases > 1) {
                if(animateIdle)
                    animationPhase = (g_clock.millis() % (animateTicks * animationPhases)) / animateTicks;
                else
                    animationPhase = animationPhases-1;
            }

            if(m_outfit.getCategory() == ThingCategoryEffect)
                animationPhase = std::min<int>(animationPhase+1, animationPhases);

            type.draw(dest - (getDisplacement() * scaleFactor), scaleFactor, 0, 0, 0, 0, animationPhase, lightView);
        }
        */

//g_painter.resetColor();
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

    hasSpeedFormula(): boolean
    {
        return this.m_speedFormula[SpeedFormula.SpeedFormulaA] != -1 && this.m_speedFormula[SpeedFormula.SpeedFormulaB] != -1
    && this.m_speedFormula[SpeedFormula.SpeedFormulaC] != -1;
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

    isWalking(): boolean {
        return this.m_walking;
    }

    turn(direction: Direction) {
        ///  console.log('turn', this.m_name, direction)
        if (!this.m_walking)
            this.setDirection(direction);
        else
            this.m_walkTurnDirection = direction;
    }

    onAppear()
    {
        /*
        // cancel any disappear event
        if(m_disappearEvent) {
            m_disappearEvent->cancel();
            m_disappearEvent = nullptr;
        }
        */

        // creature appeared the first time or wasn't seen for a long time
        if(this.m_removed) {
            this.stopWalk();
            this.m_removed = false;
            //callLuaField("onAppear");
            // walk
        } else if(!this.m_oldPosition.equals(this.m_position) && this.m_oldPosition.isInRange(this.m_position,1,1) && this.m_allowAppearWalk) {
            this.m_allowAppearWalk = false;
            this.walk(this.m_oldPosition, this.m_position);
            //callLuaField("onWalk", m_oldPosition, m_position);
            // teleport
        } else if(this.m_oldPosition != this.m_position) {
            this.stopWalk();
            //callLuaField("onDisappear");
            //callLuaField("onAppear");
        } // else turn
    }

    getStepDuration(ignoreDiagonal: boolean, dir: Direction) : number
{
    let speed = this.m_speed;
    if(speed < 1)
    return 0;

    if(g_game.getFeature(GameFeature.GameNewSpeedLaw))
    speed *= 2;

    let groundSpeed = 0;
    let tilePos = new Position();
/*
    if(dir == Direction.InvalidDirection)
    tilePos = this.m_lastStepToPosition;
    else
    tilePos = this.m_position.translatedToDirection(dir);
*/
    if(!tilePos.isValid())
    tilePos = this.m_position;
    const tile = g_map.getTile(tilePos);
    if(tile) {
        groundSpeed = tile.getGroundSpeed();
        if(groundSpeed == 0)
            groundSpeed = 150;
    }

    let interval = 1000;
    if(groundSpeed > 0 && speed > 0)
    interval = 1000 * groundSpeed;

    if(g_game.getFeature(GameFeature.GameNewSpeedLaw) && this.hasSpeedFormula()) {
    let formulatedSpeed = 1;
    if(speed > -this.m_speedFormula[SpeedFormula.SpeedFormulaB]) {
    formulatedSpeed = Math.max(1, Math.floor((this.m_speedFormula[SpeedFormula.SpeedFormulaA] * Math.log((speed / 2)
+ this.m_speedFormula[SpeedFormula.SpeedFormulaB]) + this.m_speedFormula[SpeedFormula.SpeedFormulaC]) + 0.5));
}
interval = Math.floor(interval / formulatedSpeed);
}
else
interval /= speed;

if(g_game.getClientVersion() >= 900)
    interval = (interval / g_game.getServerBeat()) * g_game.getServerBeat();

let factor = 3;
if(g_game.getClientVersion() <= 810)
    factor = 2;

interval = Math.max(interval, g_game.getServerBeat());

if(!ignoreDiagonal && (this.m_lastStepDirection == Direction.NorthWest || this.m_lastStepDirection == Direction.NorthEast ||
this.m_lastStepDirection == Direction.SouthWest || this.m_lastStepDirection == Direction.SouthEast))
interval *= factor;

return interval;
}


    walk(oldPos: Position, newPos: Position)
    {
        if(oldPos == newPos)
            return;

        // get walk direction
        this.m_lastStepDirection = oldPos.getDirectionFromPosition(newPos);
        this.m_lastStepFromPosition = oldPos;
        this.m_lastStepToPosition = newPos;

        // set current walking direction
        this.setDirection(this.m_lastStepDirection);

        // starts counting walk
        this.m_walking = true;
        this.m_walkTimer.restart();
        this.m_walkedPixels = 0;

        if(this.m_walkFinishAnimEvent) {
            this.m_walkFinishAnimEvent.cancel();
            this.m_walkFinishAnimEvent = null;
        }

        // no direction need to be changed when the walk ends
        this.m_walkTurnDirection = Direction.InvalidDirection;

        // starts updating walk
        //this.nextWalkUpdate();
    }

    stopWalk()
    {
        if(!this.m_walking)
            return;

        // stops the walk right away
        //this.terminateWalk();
    }
    getThingType(): ThingType {
        return g_things.getThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }

    rawGetThingType(): ThingType {
        return g_things.rawGetThingType(this.m_outfit.getId(), ThingCategory.ThingCategoryCreature);
    }
}
