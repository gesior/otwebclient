import { g_map } from "./map";
import { g_game } from "./game";
import { error } from "./log";
import { g_things } from "./thingtypemanager";
export class Thing {
    draw(dest, scaleFactor, animate, lightView = null) {
    }
    setId(id) {
    }
    setPosition(position) {
        if (this.m_position == position)
            return;
        let oldPos = this.m_position;
        this.m_position = position;
        this.onPositionChange(this.m_position, oldPos);
    }
    getId() {
        return 0;
    }
    getPosition() {
        return this.m_position;
    }
    getStackPriority() {
        if (this.isGround())
            return 0;
        else if (this.isGroundBorder())
            return 1;
        else if (this.isOnBottom())
            return 2;
        else if (this.isOnTop())
            return 3;
        else if (this.isCreature())
            return 4;
        else
            return 5;
    }
    getTile() {
        return g_map.getTile(this.m_position);
    }
    getParentContainer() {
        if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
            let containerId = this.m_position.y ^ 0x40;
            return g_game.getContainer(containerId);
        }
        return null;
    }
    getStackPos() {
        if (this.m_position.x == 65535 && this.isItem())
            return this.m_position.z;
        else {
            let tile = this.getTile();
            if (tile)
                return tile.getThingStackPos(this);
            else
                error("got a thing with invalid stackpos");
        }
        return -1;
    }
    isItem() {
        return false;
    }
    isEffect() {
        return false;
    }
    isMissile() {
        return false;
    }
    isCreature() {
        return false;
    }
    isNpc() {
        return false;
    }
    isMonster() {
        return false;
    }
    isPlayer() {
        return false;
    }
    isLocalPlayer() {
        return false;
    }
    isAnimatedText() {
        return false;
    }
    isStaticText() {
        return false;
    }
    // type shortcuts
    getThingType() {
        return g_things.getNullThingType();
    }
    rawGetThingType() {
        return this.getThingType();
    }
    getSize() {
        return this.rawGetThingType().getSize();
    }
    getWidth() {
        return this.rawGetThingType().getWidth();
    }
    getHeight() {
        return this.rawGetThingType().getHeight();
    }
    getDisplacement() {
        return this.rawGetThingType().getDisplacement();
    }
    getDisplacementX() {
        return this.rawGetThingType().getDisplacementX();
    }
    getDisplacementY() {
        return this.rawGetThingType().getDisplacementY();
    }
    getExactSize(layer, xPattern, yPattern, zPattern, animationPhase) {
        return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
    }
    getLayers() {
        return this.rawGetThingType().getLayers();
    }
    getNumPatternX() {
        return this.rawGetThingType().getNumPatternX();
    }
    getNumPatternY() {
        return this.rawGetThingType().getNumPatternY();
    }
    getNumPatternZ() {
        return this.rawGetThingType().getNumPatternZ();
    }
    getAnimationPhases() {
        return this.rawGetThingType().getAnimationPhases();
    }
    getAnimator() {
        return this.rawGetThingType().getAnimator();
    }
    getGroundSpeed() {
        return this.rawGetThingType().getGroundSpeed();
    }
    getMaxTextLength() {
        return this.rawGetThingType().getMaxTextLength();
    }
    getLight() {
        return this.rawGetThingType().getLight();
    }
    getMinimapColor() {
        return this.rawGetThingType().getMinimapColor();
    }
    getLensHelp() {
        return this.rawGetThingType().getLensHelp();
    }
    getClothSlot() {
        return this.rawGetThingType().getClothSlot();
    }
    getElevation() {
        return this.rawGetThingType().getElevation();
    }
    isGround() {
        return this.rawGetThingType().isGround();
    }
    isGroundBorder() {
        return this.rawGetThingType().isGroundBorder();
    }
    isOnBottom() {
        return this.rawGetThingType().isOnBottom();
    }
    isOnTop() {
        return this.rawGetThingType().isOnTop();
    }
    isContainer() {
        return this.rawGetThingType().isContainer();
    }
    isStackable() {
        return this.rawGetThingType().isStackable();
    }
    isForceUse() {
        return this.rawGetThingType().isForceUse();
    }
    isMultiUse() {
        return this.rawGetThingType().isMultiUse();
    }
    isWritable() {
        return this.rawGetThingType().isWritable();
    }
    isChargeable() {
        return this.rawGetThingType().isChargeable();
    }
    isWritableOnce() {
        return this.rawGetThingType().isWritableOnce();
    }
    isFluidContainer() {
        return this.rawGetThingType().isFluidContainer();
    }
    isSplash() {
        return this.rawGetThingType().isSplash();
    }
    isNotWalkable() {
        return this.rawGetThingType().isNotWalkable();
    }
    isNotMoveable() {
        return this.rawGetThingType().isNotMoveable();
    }
    blockProjectile() {
        return this.rawGetThingType().blockProjectile();
    }
    isNotPathable() {
        return this.rawGetThingType().isNotPathable();
    }
    isPickupable() {
        return this.rawGetThingType().isPickupable();
    }
    isHangable() {
        return this.rawGetThingType().isHangable();
    }
    isHookSouth() {
        return this.rawGetThingType().isHookSouth();
    }
    isHookEast() {
        return this.rawGetThingType().isHookEast();
    }
    isRotateable() {
        return this.rawGetThingType().isRotateable();
    }
    hasLight() {
        return this.rawGetThingType().hasLight();
    }
    isDontHide() {
        return this.rawGetThingType().isDontHide();
    }
    isTranslucent() {
        return this.rawGetThingType().isTranslucent();
    }
    hasDisplacement() {
        return this.rawGetThingType().hasDisplacement();
    }
    hasElevation() {
        return this.rawGetThingType().hasElevation();
    }
    isLyingCorpse() {
        return this.rawGetThingType().isLyingCorpse();
    }
    isAnimateAlways() {
        return this.rawGetThingType().isAnimateAlways();
    }
    hasMiniMapColor() {
        return this.rawGetThingType().hasMiniMapColor();
    }
    hasLensHelp() {
        return this.rawGetThingType().hasLensHelp();
    }
    isFullGround() {
        return this.rawGetThingType().isFullGround();
    }
    isIgnoreLook() {
        return this.rawGetThingType().isIgnoreLook();
    }
    isCloth() {
        return this.rawGetThingType().isCloth();
    }
    isMarketable() {
        return this.rawGetThingType().isMarketable();
    }
    isUsable() {
        return this.rawGetThingType().isUsable();
    }
    isWrapable() {
        return this.rawGetThingType().isWrapable();
    }
    isUnwrapable() {
        return this.rawGetThingType().isUnwrapable();
    }
    isTopEffect() {
        return this.rawGetThingType().isTopEffect();
    }
    getMarketData() {
        return this.rawGetThingType().getMarketData();
    }
    onPositionChange(newPos, oldPos) {
    }
    onAppear() {
    }
    onDisappear() {
    }
}
//# sourceMappingURL=thing.js.map