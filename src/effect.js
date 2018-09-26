import { Thing } from "./thing";
import { g_things } from "./thingtypemanager";
import { ThingCategory } from "./constants/const";
import { Timer } from "./structures/timer";
export class Effect extends Thing {
    constructor() {
        super(...arguments);
        this.m_animationTimer = new Timer();
    }
    isEffect() {
        return true;
    }
    getId() {
        return this.m_id;
    }
    setId(id) {
        if (!g_things.isValidDatId(id, ThingCategory.ThingCategoryEffect))
            id = 0;
        this.m_id = id;
    }
    asEffect() {
        return this;
    }
    getThingType() {
        return g_things.getThingType(this.m_id, ThingCategory.ThingCategoryEffect);
    }
    rawGetThingType() {
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
Effect.EFFECT_TICKS_PER_FRAME = 75;
//# sourceMappingURL=effect.js.map