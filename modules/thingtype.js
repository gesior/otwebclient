"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./constants/const");
var structures_1 = require("./structures");
var game_1 = require("./game");
var log_1 = require("./log");
var animator_1 = require("./animator");
var image_1 = require("./image");
var color_1 = require("./color");
var spritemanager_1 = require("./spritemanager");
var ThingType = /** @class */ (function () {
    function ThingType() {
        this.m_attribs = new structures_1.ThingTypeAttribs();
    }
    ThingType.prototype.unserialize = function (clientId, category, fin) {
        this.m_null = false;
        this.m_id = clientId;
        this.m_category = category;
        var count = 0, attr = -1;
        var done = false;
        for (var i = 0; i < const_1.ThingAttr.ThingLastAttr; ++i) {
            count++;
            attr = fin.getU8();
            if (attr == const_1.ThingAttr.ThingLastAttr) {
                done = true;
                break;
            }
            if (game_1.g_game.getClientVersion() >= 1000) {
                /* In 10.10+ all attributes from 16 and up were
                 * incremented by 1 to make space for 16 as
                 * "No Movement Animation" flag.
                 */
                if (attr == 16)
                    attr = const_1.ThingAttr.ThingAttrNoMoveAnimation;
                else if (attr > 16)
                    attr -= 1;
            }
            else if (game_1.g_game.getClientVersion() >= 860) {
                /* Default attribute values follow
                 * the format of 8.6-9.86.
                 * Therefore no changes here.
                 */
            }
            else if (game_1.g_game.getClientVersion() >= 780) {
                /* In 7.80-8.54 all attributes from 8 and higher were
                 * incremented by 1 to make space for 8 as
                 * "Item Charges" flag.
                 */
                if (attr == 8) {
                    this.m_attribs.set(const_1.ThingAttr.ThingAttrChargeable, true);
                    continue;
                }
                else if (attr > 8)
                    attr -= 1;
            }
            else if (game_1.g_game.getClientVersion() >= 755) {
                /* In 7.55-7.72 attributes 23 is "Floor Change". */
                if (attr == 23)
                    attr = const_1.ThingAttr.ThingAttrFloorChange;
            }
            else if (game_1.g_game.getClientVersion() >= 740) {
                /* In 7.4-7.5 attribute "Ground Border" did not exist
                 * attributes 1-15 have to be adjusted.
                 * Several other changes in the format.
                 */
                if (attr > 0 && attr <= 15)
                    attr += 1;
                else if (attr == 16)
                    attr = const_1.ThingAttr.ThingAttrLight;
                else if (attr == 17)
                    attr = const_1.ThingAttr.ThingAttrFloorChange;
                else if (attr == 18)
                    attr = const_1.ThingAttr.ThingAttrFullGround;
                else if (attr == 19)
                    attr = const_1.ThingAttr.ThingAttrElevation;
                else if (attr == 20)
                    attr = const_1.ThingAttr.ThingAttrDisplacement;
                else if (attr == 22)
                    attr = const_1.ThingAttr.ThingAttrMinimapColor;
                else if (attr == 23)
                    attr = const_1.ThingAttr.ThingAttrRotateable;
                else if (attr == 24)
                    attr = const_1.ThingAttr.ThingAttrLyingCorpse;
                else if (attr == 25)
                    attr = const_1.ThingAttr.ThingAttrHangable;
                else if (attr == 26)
                    attr = const_1.ThingAttr.ThingAttrHookSouth;
                else if (attr == 27)
                    attr = const_1.ThingAttr.ThingAttrHookEast;
                else if (attr == 28)
                    attr = const_1.ThingAttr.ThingAttrAnimateAlways;
                /* "Multi Use" and "Force Use" are swapped */
                if (attr == const_1.ThingAttr.ThingAttrMultiUse)
                    attr = const_1.ThingAttr.ThingAttrForceUse;
                else if (attr == const_1.ThingAttr.ThingAttrForceUse)
                    attr = const_1.ThingAttr.ThingAttrMultiUse;
            }
            switch (attr) {
                case const_1.ThingAttr.ThingAttrDisplacement: {
                    if (game_1.g_game.getClientVersion() >= 755) {
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
                case const_1.ThingAttr.ThingAttrLight: {
                    var light = new structures_1.Light();
                    light.intensity = fin.getU16();
                    light.color = fin.getU16();
                    this.m_attribs.set(attr, light);
                    break;
                }
                case const_1.ThingAttr.ThingAttrMarket: {
                    var market = new structures_1.MarketData();
                    market.category = fin.getU16();
                    market.tradeAs = fin.getU16();
                    market.showAs = fin.getU16();
                    market.name = fin.getString();
                    market.restrictVocation = fin.getU16();
                    market.requiredLevel = fin.getU16();
                    this.m_attribs.set(attr, market);
                    break;
                }
                case const_1.ThingAttr.ThingAttrElevation: {
                    this.m_elevation = fin.getU16();
                    this.m_attribs.set(attr, this.m_elevation);
                    break;
                }
                case const_1.ThingAttr.ThingAttrUsable:
                case const_1.ThingAttr.ThingAttrGround:
                case const_1.ThingAttr.ThingAttrWritable:
                case const_1.ThingAttr.ThingAttrWritableOnce:
                case const_1.ThingAttr.ThingAttrMinimapColor:
                case const_1.ThingAttr.ThingAttrCloth:
                case const_1.ThingAttr.ThingAttrLensHelp:
                    this.m_attribs.set(attr, fin.getU16());
                    break;
                default:
                    this.m_attribs.set(attr, true);
                    break;
            }
        }
        if (!done)
            log_1.error("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);
        var hasFrameGroups = (category == const_1.ThingCategory.ThingCategoryCreature && game_1.g_game.getFeature(const_1.GameFeature.GameIdleAnimations));
        var groupCount = hasFrameGroups ? fin.getU8() : 1;
        this.m_animationPhases = 0;
        var totalSpritesCount = 0;
        for (var i = 0; i < groupCount; ++i) {
            var frameGroupType = const_1.FrameGroupType.FrameGroupDefault;
            if (hasFrameGroups)
                frameGroupType = fin.getU8();
            var width = fin.getU8();
            var height = fin.getU8();
            this.m_size = new structures_1.Size(width, height);
            if (width > 1 || height > 1) {
                this.m_realSize = fin.getU8();
                this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
            }
            else
                this.m_exactSize = 32;
            this.m_layers = fin.getU8();
            this.m_numPatternX = fin.getU8();
            this.m_numPatternY = fin.getU8();
            if (game_1.g_game.getClientVersion() >= 755)
                this.m_numPatternZ = fin.getU8();
            else
                this.m_numPatternZ = 1;
            var groupAnimationsPhases = fin.getU8();
            this.m_animationPhases += groupAnimationsPhases;
            if (groupAnimationsPhases > 1 && game_1.g_game.getFeature(const_1.GameFeature.GameEnhancedAnimations)) {
                this.m_animator = new animator_1.Animator();
                this.m_animator.unserialize(groupAnimationsPhases, fin);
            }
            var totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;
            if ((totalSpritesCount + totalSprites) > 4096)
                log_1.error("a thing type has more than 4096 sprites");
            //this.m_spritesIndex.resize((totalSpritesCount + totalSprites));
            for (var i_1 = totalSpritesCount; i_1 < (totalSpritesCount + totalSprites); i_1++)
                this.m_spritesIndex[i_1] = game_1.g_game.getFeature(const_1.GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
            totalSpritesCount += totalSprites;
        }
        /*
                this.m_textures.resize(m_animationPhases);
                this.m_texturesFramesRects.resize(m_animationPhases);
                this.m_texturesFramesOriginRects.resize(m_animationPhases);
                this.m_texturesFramesOffsets.resize(m_animationPhases);
        */
    };
    ThingType.prototype.draw = function (dest, scaleFactor, layer, xPattern, yPattern, zPattern, animationPhase, lightView) {
        if (lightView === void 0) { lightView = null; }
        /*todo*/
    };
    ThingType.prototype.getId = function () {
        return this.m_id;
    };
    ThingType.prototype.getCategory = function () {
        return this.m_category;
    };
    ThingType.prototype.isNull = function () {
        return this.m_null;
    };
    ThingType.prototype.hasAttr = function (attr) {
        return this.m_attribs.has(attr);
    };
    ThingType.prototype.getSize = function () {
        return this.m_size;
    };
    ThingType.prototype.getWidth = function () {
        return this.m_size.width();
    };
    ThingType.prototype.getHeight = function () {
        return this.m_size.height();
    };
    ThingType.prototype.getExactSize = function (layer, xPattern, yPattern, zPattern, animationPhase) {
        if (layer === void 0) { layer = 0; }
        if (xPattern === void 0) { xPattern = 0; }
        if (yPattern === void 0) { yPattern = 0; }
        if (zPattern === void 0) { zPattern = 0; }
        if (animationPhase === void 0) { animationPhase = 0; }
        /* todo */
        return 0;
    };
    ThingType.prototype.getRealSize = function () {
        return this.m_realSize;
    };
    ThingType.prototype.getLayers = function () {
        return this.m_layers;
    };
    ThingType.prototype.getNumPatternX = function () {
        return this.m_numPatternX;
    };
    ThingType.prototype.getNumPatternY = function () {
        return this.m_numPatternY;
    };
    ThingType.prototype.getNumPatternZ = function () {
        return this.m_numPatternZ;
    };
    ThingType.prototype.getAnimationPhases = function () {
        return this.m_animationPhases;
    };
    ThingType.prototype.getAnimator = function () {
        return this.m_animator;
    };
    ThingType.prototype.getDisplacement = function () {
        return this.m_displacement;
    };
    ThingType.prototype.getDisplacementX = function () {
        return this.getDisplacement().x;
    };
    ThingType.prototype.getDisplacementY = function () {
        return this.getDisplacement().y;
    };
    ThingType.prototype.getElevation = function () {
        return this.m_elevation;
    };
    ThingType.prototype.getGroundSpeed = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrGround);
    };
    ThingType.prototype.getMaxTextLength = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrWritableOnce) ? this.m_attribs.get(const_1.ThingAttr.ThingAttrWritableOnce) : this.m_attribs.get(const_1.ThingAttr.ThingAttrWritable);
    };
    ThingType.prototype.getLight = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrLight);
    };
    ThingType.prototype.getMinimapColor = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrMinimapColor);
    };
    ThingType.prototype.getLensHelp = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrLensHelp);
    };
    ThingType.prototype.getClothSlot = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrCloth);
    };
    ThingType.prototype.getMarketData = function () {
        return this.m_attribs.get(const_1.ThingAttr.ThingAttrMarket);
    };
    ThingType.prototype.isGround = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrGround);
    };
    ThingType.prototype.isGroundBorder = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrGroundBorder);
    };
    ThingType.prototype.isOnBottom = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrOnBottom);
    };
    ThingType.prototype.isOnTop = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrOnTop);
    };
    ThingType.prototype.isContainer = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrContainer);
    };
    ThingType.prototype.isStackable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrStackable);
    };
    ThingType.prototype.isForceUse = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrForceUse);
    };
    ThingType.prototype.isMultiUse = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrMultiUse);
    };
    ThingType.prototype.isWritable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrWritable);
    };
    ThingType.prototype.isChargeable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrChargeable);
    };
    ThingType.prototype.isWritableOnce = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrWritableOnce);
    };
    ThingType.prototype.isFluidContainer = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrFluidContainer);
    };
    ThingType.prototype.isSplash = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrSplash);
    };
    ThingType.prototype.isNotWalkable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrNotWalkable);
    };
    ThingType.prototype.isNotMoveable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrNotMoveable);
    };
    ThingType.prototype.blockProjectile = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrBlockProjectile);
    };
    ThingType.prototype.isNotPathable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrNotPathable);
    };
    ThingType.prototype.isPickupable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrPickupable);
    };
    ThingType.prototype.isHangable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrHangable);
    };
    ThingType.prototype.isHookSouth = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrHookSouth);
    };
    ThingType.prototype.isHookEast = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrHookEast);
    };
    ThingType.prototype.isRotateable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrRotateable);
    };
    ThingType.prototype.hasLight = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrLight);
    };
    ThingType.prototype.isDontHide = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrDontHide);
    };
    ThingType.prototype.isTranslucent = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrTranslucent);
    };
    ThingType.prototype.hasDisplacement = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrDisplacement);
    };
    ThingType.prototype.hasElevation = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrElevation);
    };
    ThingType.prototype.isLyingCorpse = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrLyingCorpse);
    };
    ThingType.prototype.isAnimateAlways = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrAnimateAlways);
    };
    ThingType.prototype.hasMiniMapColor = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrMinimapColor);
    };
    ThingType.prototype.hasLensHelp = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrLensHelp);
    };
    ThingType.prototype.isFullGround = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrFullGround);
    };
    ThingType.prototype.isIgnoreLook = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrLook);
    };
    ThingType.prototype.isCloth = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrCloth);
    };
    ThingType.prototype.isMarketable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrMarket);
    };
    ThingType.prototype.isUsable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrUsable);
    };
    ThingType.prototype.isWrapable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrWrapable);
    };
    ThingType.prototype.isUnwrapable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrUnwrapable);
    };
    ThingType.prototype.isTopEffect = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrTopEffect);
    };
    ThingType.prototype.getSprites = function () {
        return this.m_spritesIndex;
    };
    // additional
    ThingType.prototype.getOpacity = function () {
        return this.m_opacity;
    };
    ThingType.prototype.isNotPreWalkable = function () {
        return this.m_attribs.has(const_1.ThingAttr.ThingAttrNotPreWalkable);
    };
    ThingType.prototype.setPathable = function (v) {
        if (v == true)
            this.m_attribs.remove(const_1.ThingAttr.ThingAttrNotPathable);
        else
            this.m_attribs.set(const_1.ThingAttr.ThingAttrNotPathable, true);
    };
    ThingType.prototype.getTexture = function (animationPhase) {
        var animationPhaseTexture = this.m_textures[animationPhase];
        if (!animationPhaseTexture) {
            var useCustomImage = false;
            if (animationPhase == 0 && !(this.m_customImage.length == 0))
                useCustomImage = true;
            // we don't need layers in common items, they will be pre-drawn
            var textureLayers = 1;
            var numLayers = this.m_layers;
            if (this.m_category == const_1.ThingCategory.ThingCategoryCreature && numLayers >= 2) {
                // 5 layers: outfit base, red mask, green mask, blue mask, yellow mask
                textureLayers = 5;
                numLayers = 5;
            }
            var indexSize = textureLayers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ;
            var textureSize = this.getBestTextureDimension(this.m_size.width(), this.m_size.height(), indexSize);
            var fullImage = void 0;
            if (useCustomImage)
                fullImage = image_1.Image.load(this.m_customImage);
            else
                fullImage = new image_1.Image(textureSize.mul(const_1.Otc.TILE_PIXELS));
            /*
                    m_texturesFramesRects[animationPhase].resize(indexSize);
                    m_texturesFramesOriginRects[animationPhase].resize(indexSize);
                    m_texturesFramesOffsets[animationPhase].resize(indexSize);
            */
            for (var z = 0; z < this.m_numPatternZ; ++z) {
                for (var y = 0; y < this.m_numPatternY; ++y) {
                    for (var x = 0; x < this.m_numPatternX; ++x) {
                        for (var l = 0; l < numLayers; ++l) {
                            var spriteMask = (this.m_category == const_1.ThingCategory.ThingCategoryCreature && l > 0);
                            var frameIndex = this.getTextureIndex(l % textureLayers, x, y, z);
                            var framePos = new structures_1.Point((frameIndex % (textureSize.width() / this.m_size.width()) * this.m_size.width()) * const_1.Otc.TILE_PIXELS, (frameIndex / (textureSize.width() / this.m_size.width()) * this.m_size.height()) * const_1.Otc.TILE_PIXELS);
                            if (!useCustomImage) {
                                for (var h = 0; h < this.m_size.height(); ++h) {
                                    for (var w = 0; w < this.m_size.width(); ++w) {
                                        var spriteIndex = this.getSpriteIndex(w, h, spriteMask ? 1 : l, x, y, z, animationPhase);
                                        var spriteImage = spritemanager_1.g_sprites.getSpriteImage(this.m_spritesIndex[spriteIndex]);
                                        if (spriteImage) {
                                            if (spriteMask) {
                                                spriteImage.overwriteMask(ThingType.maskColors[l - 1]);
                                            }
                                            var spritePos = new structures_1.Point((this.m_size.width() - w - 1) * const_1.Otc.TILE_PIXELS, (this.m_size.height() - h - 1) * const_1.Otc.TILE_PIXELS);
                                            fullImage.blit(framePos.add(spritePos), spriteImage);
                                        }
                                    }
                                }
                            }
                            var drawRect = new structures_1.Rect(framePos.add(new structures_1.Point(this.m_size.width(), this.m_size.height()))
                                .mul(const_1.Otc.TILE_PIXELS)
                                .sub(new structures_1.Point(1, 1)), framePos);
                            for (var x_1 = framePos.x; x_1 < framePos.x + this.m_size.width() * const_1.Otc.TILE_PIXELS; ++x_1) {
                                for (var y_1 = framePos.y; y_1 < framePos.y + this.m_size.height() * const_1.Otc.TILE_PIXELS; ++y_1) {
                                    /*
                                    uint8 *p = fullImage->getPixel(x,y);
                                    if(p[3] != 0x00) {
                                        drawRect.setTop   (std::min<int>(y, (int)drawRect.top()));
                                        drawRect.setLeft  (std::min<int>(x, (int)drawRect.left()));
                                        drawRect.setBottom(std::max<int>(y, (int)drawRect.bottom()));
                                        drawRect.setRight (std::max<int>(x, (int)drawRect.right()));
                                    }
                                    */
                                }
                            }
                            /*
                                                    m_texturesFramesRects[animationPhase][frameIndex] = drawRect;
                                                    m_texturesFramesOriginRects[animationPhase][frameIndex] = Rect(framePos, Size(m_size.width(), m_size.height()) * Otc::TILE_PIXELS);
                                                    m_texturesFramesOffsets[animationPhase][frameIndex] = drawRect.topLeft() - framePos;
                                                    */
                        }
                    }
                }
            }
            animationPhaseTexture = new structures_1.Texture(fullImage, true);
            //animationPhaseTexture->setSmooth(true);
        }
        return animationPhaseTexture;
    };
    ThingType.prototype.getBestTextureDimension = function (w, h, count) {
        /*todo*/
        return new structures_1.Size(w, h);
    };
    ThingType.prototype.getSpriteIndex = function (w, h, l, x, y, z, a) {
        var index = ((((((a % this.m_animationPhases)
            * this.m_numPatternZ + z)
            * this.m_numPatternY + y)
            * this.m_numPatternX + x)
            * this.m_layers + l)
            * this.m_size.height() + h)
            * this.m_size.width() + w;
        if (index < this.m_spritesIndex.length) {
            throw new Error('index < this.m_spritesIndex.length');
        }
        return index;
    };
    ThingType.prototype.getTextureIndex = function (l, x, y, z) {
        return ((l * this.m_numPatternZ + z)
            * this.m_numPatternY + y)
            * this.m_numPatternX + x;
    };
    ThingType.maskColors = [color_1.Color.red, color_1.Color.green, color_1.Color.blue, color_1.Color.yellow];
    return ThingType;
}());
exports.ThingType = ThingType;
//# sourceMappingURL=thingtype.js.map