import { Thing } from "./thing";
import { g_things } from "./thingtypemanager";
import { FluidsColor, GameFeature, Otc, ThingCategory } from "./constants/const";
import { g_game } from "./game";
import { g_clock } from "./structures/g_clock";
import { toInt } from "./constants/helpers";
export class Item extends Thing {
    constructor(clientId = 0) {
        super();
        this.m_clientId = 0;
        this.m_countOrSubType = -1;
        this.m_async = true;
        this.m_phase = 0;
        this.m_lastPhase = 0;
        this.m_clientId = clientId;
    }
    draw(dest, scaleFactor, animate, lightView = null) {
    }
    calculateAnimationPhase(animate) {
        if (this.getAnimationPhases() > 1) {
            if (animate) {
                if (this.getAnimator() != null)
                    return toInt(this.getAnimator().getPhase());
                if (this.m_async)
                    return toInt((g_clock.millis() % (Otc.ITEM_TICKS_PER_FRAME * this.getAnimationPhases())) / Otc.ITEM_TICKS_PER_FRAME);
                else {
                    if (g_clock.millis() - this.m_lastPhase >= Otc.ITEM_TICKS_PER_FRAME) {
                        this.m_phase = (this.m_phase + 1) % this.getAnimationPhases();
                        this.m_lastPhase = g_clock.millis();
                    }
                    return toInt(this.m_phase);
                }
            }
            else
                return toInt(this.getAnimationPhases() - 1);
        }
        return 0;
    }
    calculatePatterns(pattern) {
        // Avoid crashes with invalid items
        if (!this.isValid())
            return;
        if (this.isStackable() && this.getNumPatternX() == 4 && this.getNumPatternY() == 2) {
            if (this.m_countOrSubType <= 0) {
                pattern.x = 0;
                pattern.y = 0;
            }
            else if (this.m_countOrSubType < 5) {
                pattern.x = this.m_countOrSubType - 1;
                pattern.y = 0;
            }
            else if (this.m_countOrSubType < 10) {
                pattern.x = 0;
                pattern.y = 1;
            }
            else if (this.m_countOrSubType < 25) {
                pattern.x = 1;
                pattern.y = 1;
            }
            else if (this.m_countOrSubType < 50) {
                pattern.x = 2;
                pattern.y = 1;
            }
            else {
                pattern.x = 3;
                pattern.y = 1;
            }
        }
        else if (this.isHangable()) {
            let tile = this.getTile();
            if (tile) {
                if (tile.mustHookSouth())
                    pattern.x = this.getNumPatternX() >= 2 ? 1 : 0;
                else if (tile.mustHookEast())
                    pattern.x = this.getNumPatternX() >= 3 ? 2 : 0;
            }
        }
        else if (this.isSplash() || this.isFluidContainer()) {
            let color = FluidsColor.FluidTransparent;
            if (g_game.getFeature(GameFeature.GameNewFluids)) {
                switch (this.m_countOrSubType) {
                    case FluidsColor.FluidNone:
                        color = FluidsColor.FluidTransparent;
                        break;
                    case FluidsColor.FluidWater:
                        color = FluidsColor.FluidBlue;
                        break;
                    case FluidsColor.FluidMana:
                        color = FluidsColor.FluidPurple;
                        break;
                    case FluidsColor.FluidBeer:
                        color = FluidsColor.FluidBrown;
                        break;
                    case FluidsColor.FluidOil:
                        color = FluidsColor.FluidBrown;
                        break;
                    case FluidsColor.FluidBlood:
                        color = FluidsColor.FluidRed;
                        break;
                    case FluidsColor.FluidSlime:
                        color = FluidsColor.FluidGreen;
                        break;
                    case FluidsColor.FluidMud:
                        color = FluidsColor.FluidBrown;
                        break;
                    case FluidsColor.FluidLemonade:
                        color = FluidsColor.FluidYellow;
                        break;
                    case FluidsColor.FluidMilk:
                        color = FluidsColor.FluidWhite;
                        break;
                    case FluidsColor.FluidWine:
                        color = FluidsColor.FluidPurple;
                        break;
                    case FluidsColor.FluidHealth:
                        color = FluidsColor.FluidRed;
                        break;
                    case FluidsColor.FluidUrine:
                        color = FluidsColor.FluidYellow;
                        break;
                    case FluidsColor.FluidRum:
                        color = FluidsColor.FluidBrown;
                        break;
                    case FluidsColor.FluidFruidJuice:
                        color = FluidsColor.FluidYellow;
                        break;
                    case FluidsColor.FluidCoconutMilk:
                        color = FluidsColor.FluidWhite;
                        break;
                    case FluidsColor.FluidTea:
                        color = FluidsColor.FluidBrown;
                        break;
                    case FluidsColor.FluidMead:
                        color = FluidsColor.FluidBrown;
                        break;
                    default:
                        color = FluidsColor.FluidTransparent;
                        break;
                }
            }
            else
                color = this.m_countOrSubType;
            pattern.x = (color % 4) % this.getNumPatternX();
            pattern.y = (color / 4) % this.getNumPatternY();
        }
        else {
            pattern.x = this.m_position.x % this.getNumPatternX();
            pattern.y = this.m_position.y % this.getNumPatternY();
            pattern.z = this.m_position.z % this.getNumPatternZ();
        }
    }
    isItem() {
        return true;
    }
    getId() {
        return this.m_clientId;
    }
    setId(id) {
        this.m_clientId = id;
    }
    isValid() {
        return g_things.isValidDatId(this.m_clientId, ThingCategory.ThingCategoryItem);
    }
    setCountOrSubType(count) {
        this.m_countOrSubType = count;
    }
    getThingType() {
        return g_things.getThingType(this.m_clientId, ThingCategory.ThingCategoryItem);
    }
    rawGetThingType() {
        return this.getThingType();
    }
}
//# sourceMappingURL=item.js.map