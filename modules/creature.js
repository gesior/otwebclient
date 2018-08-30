import { Thing } from "./thing";
import { Outfit } from "./outfit";
import { CreatureIcons, Direction, PlayerEmblems, PlayerShields, PlayerSkulls, ThingCategory } from "./constants/const";
import { Color } from "./color";
import { CachedText } from "./cachedtext";
import { Timer } from "./structures/timer";
import { Point } from "./structures/point";
import { Proto } from "./constants/proto";
import { g_clock } from "./structures/g_clock";
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
        //std::array<double, Otc::LastSpeedFormula> m_speedFormula;
        // walk related
        this.m_walkAnimationPhase = 0;
        this.m_walkedPixels = 0;
        this.m_footStep = 0;
        this.m_walkTimer = new Timer();
        this.m_footTimer = new Timer();
        this.m_walking = false;
        this.m_allowAppearWalk = false;
        this.m_footStepDrawn = false;
        //ScheduledEventPtr m_walkUpdateEvent;
        //ScheduledEventPtr m_walkFinishAnimEvent;
        //EventPtr m_disappearEvent;
        this.m_walkOffset = new Point();
        this.m_walkTurnDirection = Direction.InvalidDirection;
        this.m_lastStepDirection = Direction.InvalidDirection;
    }
    draw(dest, scaleFactor, animate, lightView = null) {
        if (!this.canBeSeen())
            return;
        let animationOffset = animate ? this.m_walkOffset : new Point(0, 0);
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
    internalDrawOutfit(dest, scaleFactor, animateWalk, animateIdle, direction, lightView = null) {
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
                console.log('pp', dest, datType);
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