"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = require("./map");
var game_1 = require("./game");
var log_1 = require("./log");
var thingtypemanager_1 = require("./thingtypemanager");
var Thing = /** @class */ (function () {
    function Thing() {
    }
    Thing.prototype.draw = function (dest, scaleFactor, animate, lightView) {
        if (lightView === void 0) { lightView = null; }
    };
    Thing.prototype.setId = function (id) {
    };
    Thing.prototype.setPosition = function (position) {
        if (this.m_position == position)
            return;
        var oldPos = this.m_position;
        this.m_position = position;
        this.onPositionChange(this.m_position, oldPos);
    };
    Thing.prototype.getId = function () {
        return 0;
    };
    Thing.prototype.getPosition = function () {
        return this.m_position;
    };
    Thing.prototype.getStackPriority = function () {
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
        else // common items
            return 5;
    };
    Thing.prototype.getTile = function () {
        return map_1.g_map.getTile(this.m_position);
    };
    Thing.prototype.getParentContainer = function () {
        if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
            var containerId = this.m_position.y ^ 0x40;
            return game_1.g_game.getContainer(containerId);
        }
        return null;
    };
    Thing.prototype.getStackPos = function () {
        if (this.m_position.x == 65535 && this.isItem()) // is inside a container
            return this.m_position.z;
        else {
            var tile = this.getTile();
            if (tile)
                return tile.getThingStackPos(this);
            else
                log_1.error("got a thing with invalid stackpos");
        }
        return -1;
    };
    Thing.prototype.isItem = function () {
        return false;
    };
    Thing.prototype.isEffect = function () {
        return false;
    };
    Thing.prototype.isMissile = function () {
        return false;
    };
    Thing.prototype.isCreature = function () {
        return false;
    };
    Thing.prototype.isNpc = function () {
        return false;
    };
    Thing.prototype.isMonster = function () {
        return false;
    };
    Thing.prototype.isPlayer = function () {
        return false;
    };
    Thing.prototype.isLocalPlayer = function () {
        return false;
    };
    Thing.prototype.isAnimatedText = function () {
        return false;
    };
    Thing.prototype.isStaticText = function () {
        return false;
    };
    // type shortcuts
    Thing.prototype.getThingType = function () {
        return thingtypemanager_1.g_things.getNullThingType();
    };
    Thing.prototype.rawGetThingType = function () {
        return thingtypemanager_1.g_things.getNullThingType();
    };
    Thing.prototype.getSize = function () {
        return this.rawGetThingType().getSize();
    };
    Thing.prototype.getWidth = function () {
        return this.rawGetThingType().getWidth();
    };
    Thing.prototype.getHeight = function () {
        return this.rawGetThingType().getHeight();
    };
    Thing.prototype.getDisplacement = function () {
        return this.rawGetThingType().getDisplacement();
    };
    Thing.prototype.getDisplacementX = function () {
        return this.rawGetThingType().getDisplacementX();
    };
    Thing.prototype.getDisplacementY = function () {
        return this.rawGetThingType().getDisplacementY();
    };
    Thing.prototype.getExactSize = function (layer, xPattern, yPattern, zPattern, animationPhase) {
        return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
    };
    Thing.prototype.getLayers = function () {
        return this.rawGetThingType().getLayers();
    };
    Thing.prototype.getNumPatternX = function () {
        return this.rawGetThingType().getNumPatternX();
    };
    Thing.prototype.getNumPatternY = function () {
        return this.rawGetThingType().getNumPatternY();
    };
    Thing.prototype.getNumPatternZ = function () {
        return this.rawGetThingType().getNumPatternZ();
    };
    Thing.prototype.getAnimationPhases = function () {
        return this.rawGetThingType().getAnimationPhases();
    };
    Thing.prototype.getAnimator = function () {
        return this.rawGetThingType().getAnimator();
    };
    Thing.prototype.getGroundSpeed = function () {
        return this.rawGetThingType().getGroundSpeed();
    };
    Thing.prototype.getMaxTextLength = function () {
        return this.rawGetThingType().getMaxTextLength();
    };
    Thing.prototype.getLight = function () {
        return this.rawGetThingType().getLight();
    };
    Thing.prototype.getMinimapColor = function () {
        return this.rawGetThingType().getMinimapColor();
    };
    Thing.prototype.getLensHelp = function () {
        return this.rawGetThingType().getLensHelp();
    };
    Thing.prototype.getClothSlot = function () {
        return this.rawGetThingType().getClothSlot();
    };
    Thing.prototype.getElevation = function () {
        return this.rawGetThingType().getElevation();
    };
    Thing.prototype.isGround = function () {
        return this.rawGetThingType().isGround();
    };
    Thing.prototype.isGroundBorder = function () {
        return this.rawGetThingType().isGroundBorder();
    };
    Thing.prototype.isOnBottom = function () {
        return this.rawGetThingType().isOnBottom();
    };
    Thing.prototype.isOnTop = function () {
        return this.rawGetThingType().isOnTop();
    };
    Thing.prototype.isContainer = function () {
        return this.rawGetThingType().isContainer();
    };
    Thing.prototype.isStackable = function () {
        return this.rawGetThingType().isStackable();
    };
    Thing.prototype.isForceUse = function () {
        return this.rawGetThingType().isForceUse();
    };
    Thing.prototype.isMultiUse = function () {
        return this.rawGetThingType().isMultiUse();
    };
    Thing.prototype.isWritable = function () {
        return this.rawGetThingType().isWritable();
    };
    Thing.prototype.isChargeable = function () {
        return this.rawGetThingType().isChargeable();
    };
    Thing.prototype.isWritableOnce = function () {
        return this.rawGetThingType().isWritableOnce();
    };
    Thing.prototype.isFluidContainer = function () {
        return this.rawGetThingType().isFluidContainer();
    };
    Thing.prototype.isSplash = function () {
        return this.rawGetThingType().isSplash();
    };
    Thing.prototype.isNotWalkable = function () {
        return this.rawGetThingType().isNotWalkable();
    };
    Thing.prototype.isNotMoveable = function () {
        return this.rawGetThingType().isNotMoveable();
    };
    Thing.prototype.blockProjectile = function () {
        return this.rawGetThingType().blockProjectile();
    };
    Thing.prototype.isNotPathable = function () {
        return this.rawGetThingType().isNotPathable();
    };
    Thing.prototype.isPickupable = function () {
        return this.rawGetThingType().isPickupable();
    };
    Thing.prototype.isHangable = function () {
        return this.rawGetThingType().isHangable();
    };
    Thing.prototype.isHookSouth = function () {
        return this.rawGetThingType().isHookSouth();
    };
    Thing.prototype.isHookEast = function () {
        return this.rawGetThingType().isHookEast();
    };
    Thing.prototype.isRotateable = function () {
        return this.rawGetThingType().isRotateable();
    };
    Thing.prototype.hasLight = function () {
        return this.rawGetThingType().hasLight();
    };
    Thing.prototype.isDontHide = function () {
        return this.rawGetThingType().isDontHide();
    };
    Thing.prototype.isTranslucent = function () {
        return this.rawGetThingType().isTranslucent();
    };
    Thing.prototype.hasDisplacement = function () {
        return this.rawGetThingType().hasDisplacement();
    };
    Thing.prototype.hasElevation = function () {
        return this.rawGetThingType().hasElevation();
    };
    Thing.prototype.isLyingCorpse = function () {
        return this.rawGetThingType().isLyingCorpse();
    };
    Thing.prototype.isAnimateAlways = function () {
        return this.rawGetThingType().isAnimateAlways();
    };
    Thing.prototype.hasMiniMapColor = function () {
        return this.rawGetThingType().hasMiniMapColor();
    };
    Thing.prototype.hasLensHelp = function () {
        return this.rawGetThingType().hasLensHelp();
    };
    Thing.prototype.isFullGround = function () {
        return this.rawGetThingType().isFullGround();
    };
    Thing.prototype.isIgnoreLook = function () {
        return this.rawGetThingType().isIgnoreLook();
    };
    Thing.prototype.isCloth = function () {
        return this.rawGetThingType().isCloth();
    };
    Thing.prototype.isMarketable = function () {
        return this.rawGetThingType().isMarketable();
    };
    Thing.prototype.isUsable = function () {
        return this.rawGetThingType().isUsable();
    };
    Thing.prototype.isWrapable = function () {
        return this.rawGetThingType().isWrapable();
    };
    Thing.prototype.isUnwrapable = function () {
        return this.rawGetThingType().isUnwrapable();
    };
    Thing.prototype.isTopEffect = function () {
        return this.rawGetThingType().isTopEffect();
    };
    Thing.prototype.getMarketData = function () {
        return this.rawGetThingType().getMarketData();
    };
    Thing.prototype.onPositionChange = function (newPos, oldPos) {
    };
    Thing.prototype.onAppear = function () {
    };
    Thing.prototype.onDisappear = function () {
    };
    return Thing;
}());
exports.Thing = Thing;
//# sourceMappingURL=thing.js.map