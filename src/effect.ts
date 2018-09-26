import {Thing} from "./thing";
import {LightView} from "./lightview";
import {ThingType} from "./thingtype";
import {g_things} from "./thingtypemanager";
import {ThingCategory} from "./constants/const";
import {Timer} from "./structures/timer";
import {Point} from "./structures/point";

export class Effect extends Thing {
    public static readonly EFFECT_TICKS_PER_FRAME = 75;

    m_animationTimer: Timer = new Timer();
    m_phaseDuration: number;
    m_id: number;

    isEffect() {
        return true;
    }

    getId(): number {
        return this.m_id;
    }

    setId(id: number) {
        if (!g_things.isValidDatId(id, ThingCategory.ThingCategoryEffect))
            id = 0;
        this.m_id = id;
    }

    asEffect(): Effect {
        return this;
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