import { FrameGroupType, GameFeature, ThingAttr, ThingCategory } from "./constants/const";
import { g_game } from "./game";
import { error } from "./log";
import { Animator } from "./animator";
import { Color } from "./color";
import { ThingTypeAttribs } from "./structures/thingtypeattribs";
import { Size } from "./structures/size";
import { Point } from "./structures/point";
import { MarketData } from "./structures/marketdata";
import { Light } from "./structures/light";
;
export class ThingType {
    constructor() {
        this.m_id = 0;
        this.m_null = true;
        this.m_attribs = new ThingTypeAttribs();
        this.m_size = new Size();
        this.m_displacement = new Point();
        this.m_animator = null;
        this.m_animationPhases = 0;
        this.m_exactSize = 0;
        this.m_realSize = 0;
        this.m_numPatternX = 0;
        this.m_numPatternY = 0;
        this.m_numPatternZ = 0;
        this.m_layers = 0;
        this.m_elevation = 0;
        this.m_opacity = 1.0;
        this.m_spritesIndex = [];
    }
    unserialize(clientId, category, fin) {
        this.m_null = false;
        this.m_id = clientId;
        this.m_category = category;
        //console.log('load', clientId, fin.getReadPos(), fin.data.buffer.slice(fin.getReadPos()));
        let count = 0;
        let attr = -1;
        let done = false;
        for (let i = 0; i < ThingAttr.ThingLastAttr; ++i) {
            count++;
            attr = fin.getU8();
            if (attr == ThingAttr.ThingLastAttr) {
                done = true;
                break;
            }
            if (g_game.getClientVersion() >= 1000) {
                /* In 10.10+ all attributes from 16 and up were
                 * incremented by 1 to make space for 16 as
                 * "No Movement Animation" flag.
                 */
                if (attr == 16)
                    attr = ThingAttr.ThingAttrNoMoveAnimation;
                else if (attr > 16)
                    attr -= 1;
            }
            else if (g_game.getClientVersion() >= 860) {
                /* Default attribute values follow
                 * the format of 8.6-9.86.
                 * Therefore no changes here.
                 */
            }
            else if (g_game.getClientVersion() >= 780) {
                /* In 7.80-8.54 all attributes from 8 and higher were
                 * incremented by 1 to make space for 8 as
                 * "Item Charges" flag.
                 */
                if (attr == 8) {
                    this.m_attribs.set(ThingAttr.ThingAttrChargeable, true);
                    continue;
                }
                else if (attr > 8)
                    attr -= 1;
            }
            else if (g_game.getClientVersion() >= 755) {
                /* In 7.55-7.72 attributes 23 is "Floor Change". */
                if (attr == 23)
                    attr = ThingAttr.ThingAttrFloorChange;
            }
            else if (g_game.getClientVersion() >= 740) {
                /* In 7.4-7.5 attribute "Ground Border" did not exist
                 * attributes 1-15 have to be adjusted.
                 * Several other changes in the format.
                 */
                if (attr > 0 && attr <= 15)
                    attr += 1;
                else if (attr == 16)
                    attr = ThingAttr.ThingAttrLight;
                else if (attr == 17)
                    attr = ThingAttr.ThingAttrFloorChange;
                else if (attr == 18)
                    attr = ThingAttr.ThingAttrFullGround;
                else if (attr == 19)
                    attr = ThingAttr.ThingAttrElevation;
                else if (attr == 20)
                    attr = ThingAttr.ThingAttrDisplacement;
                else if (attr == 22)
                    attr = ThingAttr.ThingAttrMinimapColor;
                else if (attr == 23)
                    attr = ThingAttr.ThingAttrRotateable;
                else if (attr == 24)
                    attr = ThingAttr.ThingAttrLyingCorpse;
                else if (attr == 25)
                    attr = ThingAttr.ThingAttrHangable;
                else if (attr == 26)
                    attr = ThingAttr.ThingAttrHookSouth;
                else if (attr == 27)
                    attr = ThingAttr.ThingAttrHookEast;
                else if (attr == 28)
                    attr = ThingAttr.ThingAttrAnimateAlways;
                /* "Multi Use" and "Force Use" are swapped */
                if (attr == ThingAttr.ThingAttrMultiUse)
                    attr = ThingAttr.ThingAttrForceUse;
                else if (attr == ThingAttr.ThingAttrForceUse)
                    attr = ThingAttr.ThingAttrMultiUse;
            }
            switch (attr) {
                case ThingAttr.ThingAttrDisplacement: {
                    this.m_displacement = new Point(0, 0);
                    if (g_game.getClientVersion() >= 755) {
                        this.m_displacement.x = fin.getU16();
                        this.m_displacement.y = fin.getU16();
                    }
                    else {
                        this.m_displacement.x = 8;
                        this.m_displacement.y = 8;
                    }
                    this.m_attribs.set(attr, true);
                    break;
                }
                case ThingAttr.ThingAttrLight: {
                    let light = new Light();
                    light.intensity = fin.getU16();
                    light.color = fin.getU16();
                    this.m_attribs.set(attr, light);
                    break;
                }
                case ThingAttr.ThingAttrMarket: {
                    let market = new MarketData();
                    market.category = fin.getU16();
                    market.tradeAs = fin.getU16();
                    market.showAs = fin.getU16();
                    market.name = fin.getString();
                    market.restrictVocation = fin.getU16();
                    market.requiredLevel = fin.getU16();
                    this.m_attribs.set(attr, market);
                    break;
                }
                case ThingAttr.ThingAttrElevation: {
                    this.m_elevation = fin.getU16();
                    this.m_attribs.set(attr, this.m_elevation);
                    break;
                }
                case ThingAttr.ThingAttrUsable:
                case ThingAttr.ThingAttrGround:
                case ThingAttr.ThingAttrWritable:
                case ThingAttr.ThingAttrWritableOnce:
                case ThingAttr.ThingAttrMinimapColor:
                case ThingAttr.ThingAttrCloth:
                case ThingAttr.ThingAttrLensHelp:
                    this.m_attribs.set(attr, fin.getU16());
                    break;
                default:
                    this.m_attribs.set(attr, true);
                    break;
            }
        }
        if (!done)
            error("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);
        let hasFrameGroups = (category == ThingCategory.ThingCategoryCreature && g_game.getFeature(GameFeature.GameIdleAnimations));
        let groupCount = hasFrameGroups ? fin.getU8() : 1;
        this.m_animationPhases = 0;
        let totalSpritesCount = 0;
        for (let i = 0; i < groupCount; ++i) {
            let frameGroupType = FrameGroupType.FrameGroupDefault;
            if (hasFrameGroups)
                frameGroupType = fin.getU8();
            let width = fin.getU8();
            let height = fin.getU8();
            this.m_size = new Size(width, height);
            if (width > 1 || height > 1) {
                this.m_realSize = fin.getU8();
                this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
            }
            else
                this.m_exactSize = 32;
            this.m_layers = fin.getU8();
            this.m_numPatternX = fin.getU8();
            this.m_numPatternY = fin.getU8();
            if (g_game.getClientVersion() >= 755)
                this.m_numPatternZ = fin.getU8();
            else
                this.m_numPatternZ = 1;
            let groupAnimationsPhases = fin.getU8();
            this.m_animationPhases += groupAnimationsPhases;
            if (groupAnimationsPhases > 1 && g_game.getFeature(GameFeature.GameEnhancedAnimations)) {
                this.m_animator = new Animator();
                this.m_animator.unserialize(groupAnimationsPhases, fin);
            }
            let totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;
            if ((totalSpritesCount + totalSprites) > 4096)
                error("a thing type has more than 4096 sprites", totalSprites, totalSpritesCount, this.m_size.area(), this.m_layers, this.m_numPatternX, this.m_numPatternY, this.m_numPatternZ, groupAnimationsPhases);
            this.m_spritesIndex = [];
            for (let i = totalSpritesCount; i < (totalSpritesCount + totalSprites); i++)
                this.m_spritesIndex[i] = g_game.getFeature(GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
            totalSpritesCount += totalSprites;
        }
    }
    getId() {
        return this.m_id;
    }
    getCategory() {
        return this.m_category;
    }
    isNull() {
        return this.m_null;
    }
    hasAttr(attr) {
        return this.m_attribs.has(attr);
    }
    getSize() {
        return this.m_size;
    }
    getWidth() {
        return this.m_size.width();
    }
    getHeight() {
        return this.m_size.height();
    }
    getExactSize(layer = 0, xPattern = 0, yPattern = 0, zPattern = 0, animationPhase = 0) {
        /* todo */
        return 0;
    }
    getRealSize() {
        return this.m_realSize;
    }
    getLayers() {
        return this.m_layers;
    }
    getNumPatternX() {
        return this.m_numPatternX;
    }
    getNumPatternY() {
        return this.m_numPatternY;
    }
    getNumPatternZ() {
        return this.m_numPatternZ;
    }
    getAnimationPhases() {
        return this.m_animationPhases;
    }
    getAnimator() {
        return this.m_animator;
    }
    getDisplacement() {
        return this.m_displacement;
    }
    getDisplacementX() {
        return this.getDisplacement().x;
    }
    getDisplacementY() {
        return this.getDisplacement().y;
    }
    getElevation() {
        return this.m_elevation;
    }
    getGroundSpeed() {
        return this.m_attribs.get(ThingAttr.ThingAttrGround);
    }
    getMaxTextLength() {
        return this.m_attribs.has(ThingAttr.ThingAttrWritableOnce) ? this.m_attribs.get(ThingAttr.ThingAttrWritableOnce) : this.m_attribs.get(ThingAttr.ThingAttrWritable);
    }
    getLight() {
        return this.m_attribs.get(ThingAttr.ThingAttrLight);
    }
    getMinimapColor() {
        return this.m_attribs.get(ThingAttr.ThingAttrMinimapColor);
    }
    getLensHelp() {
        return this.m_attribs.get(ThingAttr.ThingAttrLensHelp);
    }
    getClothSlot() {
        return this.m_attribs.get(ThingAttr.ThingAttrCloth);
    }
    getMarketData() {
        return this.m_attribs.get(ThingAttr.ThingAttrMarket);
    }
    isGround() {
        return this.m_attribs.has(ThingAttr.ThingAttrGround);
    }
    isGroundBorder() {
        return this.m_attribs.has(ThingAttr.ThingAttrGroundBorder);
    }
    isOnBottom() {
        return this.m_attribs.has(ThingAttr.ThingAttrOnBottom);
    }
    isOnTop() {
        return this.m_attribs.has(ThingAttr.ThingAttrOnTop);
    }
    isContainer() {
        return this.m_attribs.has(ThingAttr.ThingAttrContainer);
    }
    isStackable() {
        return this.m_attribs.has(ThingAttr.ThingAttrStackable);
    }
    isForceUse() {
        return this.m_attribs.has(ThingAttr.ThingAttrForceUse);
    }
    isMultiUse() {
        return this.m_attribs.has(ThingAttr.ThingAttrMultiUse);
    }
    isWritable() {
        return this.m_attribs.has(ThingAttr.ThingAttrWritable);
    }
    isChargeable() {
        return this.m_attribs.has(ThingAttr.ThingAttrChargeable);
    }
    isWritableOnce() {
        return this.m_attribs.has(ThingAttr.ThingAttrWritableOnce);
    }
    isFluidContainer() {
        return this.m_attribs.has(ThingAttr.ThingAttrFluidContainer);
    }
    isSplash() {
        return this.m_attribs.has(ThingAttr.ThingAttrSplash);
    }
    isNotWalkable() {
        return this.m_attribs.has(ThingAttr.ThingAttrNotWalkable);
    }
    isNotMoveable() {
        return this.m_attribs.has(ThingAttr.ThingAttrNotMoveable);
    }
    blockProjectile() {
        return this.m_attribs.has(ThingAttr.ThingAttrBlockProjectile);
    }
    isNotPathable() {
        return this.m_attribs.has(ThingAttr.ThingAttrNotPathable);
    }
    isPickupable() {
        return this.m_attribs.has(ThingAttr.ThingAttrPickupable);
    }
    isHangable() {
        return this.m_attribs.has(ThingAttr.ThingAttrHangable);
    }
    isHookSouth() {
        return this.m_attribs.has(ThingAttr.ThingAttrHookSouth);
    }
    isHookEast() {
        return this.m_attribs.has(ThingAttr.ThingAttrHookEast);
    }
    isRotateable() {
        return this.m_attribs.has(ThingAttr.ThingAttrRotateable);
    }
    hasLight() {
        return this.m_attribs.has(ThingAttr.ThingAttrLight);
    }
    isDontHide() {
        return this.m_attribs.has(ThingAttr.ThingAttrDontHide);
    }
    isTranslucent() {
        return this.m_attribs.has(ThingAttr.ThingAttrTranslucent);
    }
    hasDisplacement() {
        return this.m_attribs.has(ThingAttr.ThingAttrDisplacement);
    }
    hasElevation() {
        return this.m_attribs.has(ThingAttr.ThingAttrElevation);
    }
    isLyingCorpse() {
        return this.m_attribs.has(ThingAttr.ThingAttrLyingCorpse);
    }
    isAnimateAlways() {
        return this.m_attribs.has(ThingAttr.ThingAttrAnimateAlways);
    }
    hasMiniMapColor() {
        return this.m_attribs.has(ThingAttr.ThingAttrMinimapColor);
    }
    hasLensHelp() {
        return this.m_attribs.has(ThingAttr.ThingAttrLensHelp);
    }
    isFullGround() {
        return this.m_attribs.has(ThingAttr.ThingAttrFullGround);
    }
    isIgnoreLook() {
        return this.m_attribs.has(ThingAttr.ThingAttrLook);
    }
    isCloth() {
        return this.m_attribs.has(ThingAttr.ThingAttrCloth);
    }
    isMarketable() {
        return this.m_attribs.has(ThingAttr.ThingAttrMarket);
    }
    isUsable() {
        return this.m_attribs.has(ThingAttr.ThingAttrUsable);
    }
    isWrapable() {
        return this.m_attribs.has(ThingAttr.ThingAttrWrapable);
    }
    isUnwrapable() {
        return this.m_attribs.has(ThingAttr.ThingAttrUnwrapable);
    }
    isTopEffect() {
        return this.m_attribs.has(ThingAttr.ThingAttrTopEffect);
    }
    getSprites() {
        return this.m_spritesIndex;
    }
    // additional
    getOpacity() {
        return this.m_opacity;
    }
    isNotPreWalkable() {
        return this.m_attribs.has(ThingAttr.ThingAttrNotPreWalkable);
    }
    setPathable(v) {
        if (v == true)
            this.m_attribs.remove(ThingAttr.ThingAttrNotPathable);
        else
            this.m_attribs.set(ThingAttr.ThingAttrNotPathable, true);
    }
}
ThingType.maskColors = [Color.red, Color.green, Color.blue, Color.yellow];
//# sourceMappingURL=thingtype.js.map