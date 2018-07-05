import {Point, Timer} from "./structures";
import {Thing} from "./thing";
import {LightView} from "./lightview";
import {ThingType} from "./thingtype";
import {g_things} from "./thingtypemanager";
import {ThingCategory} from "./constants/const";

export class Effect extends Thing {
    public static readonly EFFECT_TICKS_PER_FRAME = 75

    m_animationTimer: Timer = new Timer();
    m_phaseDuration: number;
    m_id: number;

    drawEffect(dest: Point, scaleFactor, animate: boolean, offsetX: number = 0, offsetY: number = 0, lightView: LightView = null) {
        if (this.m_id == 0)
            return;

        let animationPhase = 0;
        if (animate)
            animationPhase = Math.min((this.m_animationTimer.ticksElapsed() / this.m_phaseDuration), this.getAnimationPhases() - 1);

        let xPattern = offsetX % this.getNumPatternX();
        if (xPattern < 0)
            xPattern += this.getNumPatternX();

        let yPattern = offsetY % this.getNumPatternY();
        if (yPattern < 0)
            yPattern += this.getNumPatternY();

        this.rawGetThingType().draw(dest, scaleFactor, 0, xPattern, yPattern, 0, animationPhase, lightView);
    }

    setId(id: number) {
        if (!g_things.isValidDatId(id, ThingCategory.ThingCategoryEffect))
            id = 0;
        this.m_id = id;
    }

    getId(): number {
        return this.m_id;
    }

    asEffect(): Effect {
        return this;
    }

    isEffect() {
        return true;
    }

    getThingType(): ThingType {
        return g_things.getThingType(this.m_id, ThingCategory.ThingCategoryEffect);
    }

    rawGetThingType(): ThingType {
        return g_things.rawGetThingType(this.m_id, ThingCategory.ThingCategoryEffect);
    }


    onAppear() {
        this.m_animationTimer.restart();
        this.m_phaseDuration = Effect.EFFECT_TICKS_PER_FRAME;

        // hack to fix some animation phases duration, currently there is no better solution
        if (this.m_id == 33)
            this.m_phaseDuration <<= 2;

        //g_dispatcher.scheduleEvent([this]() { g_map.removeThing(this); }, this.m_phaseDuration * this.getAnimationPhases());
    }
}