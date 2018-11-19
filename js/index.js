webpackJsonp([0],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Creature = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

var _outfit = __webpack_require__(186);

var _const = __webpack_require__(13);

var _color = __webpack_require__(57);

var _cachedtext = __webpack_require__(129);

var _timer = __webpack_require__(92);

var _point = __webpack_require__(42);

var _proto = __webpack_require__(187);

var _g_clock = __webpack_require__(93);

var _thingtypemanager = __webpack_require__(63);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Creature = exports.Creature = function (_Thing) {
    _inherits(Creature, _Thing);

    function Creature() {
        _classCallCheck(this, Creature);

        var _this = _possibleConstructorReturn(this, (Creature.__proto__ || Object.getPrototypeOf(Creature)).call(this));

        _this.m_id = 0;
        _this.m_healthPercent = 100;
        _this.m_direction = _const.Direction.South;
        _this.m_outfit = new _outfit.Outfit();
        _this.m_speed = 200;
        _this.m_skull = _const.PlayerSkulls.SkullNone;
        _this.m_shield = _const.PlayerShields.ShieldNone;
        _this.m_emblem = _const.PlayerEmblems.EmblemNone;
        _this.m_type = _proto.Proto.CreatureTypeUnknown;
        _this.m_icon = _const.CreatureIcons.NpcIconNone;
        _this.m_showShieldTexture = true;
        _this.m_shieldBlink = false;
        _this.m_passable = false;
        _this.m_showTimedSquare = false;
        _this.m_showStaticSquare = false;
        _this.m_removed = true;
        _this.m_nameCache = new _cachedtext.CachedText();
        _this.m_informationColor = new _color.Color(96, 96, 96);
        _this.m_outfitColor = new _color.Color(255, 255, 255);
        //ScheduledEventPtr m_outfitColorUpdateEvent;
        _this.m_outfitColorTimer = new _timer.Timer();
        //std::array<double, Otc::LastSpeedFormula> m_speedFormula;
        // walk related
        _this.m_walkAnimationPhase = 0;
        _this.m_walkedPixels = 0;
        _this.m_footStep = 0;
        _this.m_walkTimer = new _timer.Timer();
        _this.m_footTimer = new _timer.Timer();
        _this.m_walking = false;
        _this.m_allowAppearWalk = false;
        _this.m_footStepDrawn = false;
        //ScheduledEventPtr m_walkUpdateEvent;
        //ScheduledEventPtr m_walkFinishAnimEvent;
        //EventPtr m_disappearEvent;
        _this.m_walkOffset = new _point.Point();
        _this.m_walkTurnDirection = _const.Direction.InvalidDirection;
        _this.m_lastStepDirection = _const.Direction.InvalidDirection;
        return _this;
    }

    _createClass(Creature, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (!this.canBeSeen()) return;
            var animationOffset = animate ? this.m_walkOffset : new _point.Point(0, 0);
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
    }, {
        key: "internalDrawOutfit",
        value: function internalDrawOutfit(dest, scaleFactor, animateWalk, animateIdle, direction) {
            var lightView = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

            //g_painter.setColor(m_outfitColor);
            // outfit is a real creature
            if (this.m_outfit.getCategory() == _const.ThingCategory.ThingCategoryCreature) {
                var animationPhase = animateWalk ? this.m_walkAnimationPhase : 0;
                if (this.isAnimateAlways() && animateIdle) {
                    var ticksPerFrame = 1000 / this.getAnimationPhases();
                    animationPhase = _g_clock.g_clock.millis() % (ticksPerFrame * this.getAnimationPhases()) / ticksPerFrame;
                }
                // xPattern => creature direction
                var xPattern = void 0;
                if (direction == _const.Direction.NorthEast || direction == _const.Direction.SouthEast) xPattern = _const.Direction.East;else if (direction == _const.Direction.NorthWest || direction == _const.Direction.SouthWest) xPattern = _const.Direction.West;else xPattern = direction;
                var zPattern = 0;
                if (this.m_outfit.getMount() != 0) {
                    var datType = _thingtypemanager.g_things.rawGetThingType(this.m_outfit.getMount(), _const.ThingCategory.ThingCategoryCreature);
                    dest = dest.sub(datType.getDisplacement().mul(scaleFactor));
                    datType.draw(dest, scaleFactor, 0, xPattern, 0, 0, animationPhase, lightView);
                    dest = dest.add(this.getDisplacement().mul(scaleFactor));
                    zPattern = Math.min(1, this.getNumPatternZ() - 1);
                }
                // yPattern => creature addon
                for (var yPattern = 0; yPattern < this.getNumPatternY(); yPattern++) {
                    // continue if we dont have this addon
                    if (yPattern > 0 && !(this.m_outfit.getAddons() & 1 << yPattern - 1)) continue;
                    var _datType = this.rawGetThingType();
                    //console.log('pp', dest, datType);
                    _datType.draw(dest, scaleFactor, 0, xPattern, yPattern, zPattern, animationPhase, yPattern == 0 ? lightView : null);
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
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.m_name;
        }
    }, {
        key: "setName",
        value: function setName(name) {
            this.m_name = name;
        }
    }, {
        key: "isCreature",
        value: function isCreature() {
            return true;
        }
    }, {
        key: "canBeSeen",
        value: function canBeSeen() {
            return !this.isInvisible() || this.isPlayer();
        }
    }, {
        key: "isInvisible",
        value: function isInvisible() {
            return this.m_outfit.getCategory() == _const.ThingCategory.ThingCategoryEffect && this.m_outfit.getAuxId() == 13;
        }
    }, {
        key: "addTimedSquare",
        value: function addTimedSquare(arg0) {
            // throw new Error("Method not implemented.");
        }
    }, {
        key: "hideStaticSquare",
        value: function hideStaticSquare() {
            //throw new Error("Method not implemented.");
        }
    }, {
        key: "showStaticSquare",
        value: function showStaticSquare(arg0) {
            // throw new Error("Method not implemented.");
        }
    }, {
        key: "setType",
        value: function setType(type) {
            this.m_type = type;
        }
    }, {
        key: "allowAppearWalk",
        value: function allowAppearWalk() {}
    }, {
        key: "setHealthPercent",
        value: function setHealthPercent(healthPercent) {
            this.m_healthPercent = healthPercent;
        }
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "setOutfit",
        value: function setOutfit(outfit) {
            this.m_outfit = outfit;
        }
    }, {
        key: "setSpeed",
        value: function setSpeed(speed) {}
    }, {
        key: "setBaseSpeed",
        value: function setBaseSpeed(baseSpeed) {}
    }, {
        key: "setSkull",
        value: function setSkull(skull) {}
    }, {
        key: "setShield",
        value: function setShield(shield) {}
    }, {
        key: "setPassable",
        value: function setPassable(v) {}
    }, {
        key: "setEmblem",
        value: function setEmblem(emblem) {}
    }, {
        key: "setIcon",
        value: function setIcon(icon) {}
    }, {
        key: "setDirection",
        value: function setDirection(direction) {
            this.m_direction = direction;
        }
    }, {
        key: "turn",
        value: function turn(direction) {
            if (!this.m_walking) this.setDirection(direction);else this.m_walkTurnDirection = direction;
        }
    }, {
        key: "isWalking",
        value: function isWalking() {
            return this.m_walking;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_outfit.getId(), _const.ThingCategory.ThingCategoryCreature);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return _thingtypemanager.g_things.rawGetThingType(this.m_outfit.getId(), _const.ThingCategory.ThingCategoryCreature);
        }
    }]);

    return Creature;
}(_thing.Thing);

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = exports.Light = function Light() {
    _classCallCheck(this, Light);

    this.intensity = 0;
    this.color = 215;
};

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_mapview = exports.MapView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(13);

var _log = __webpack_require__(20);

var _map = __webpack_require__(55);

var _position = __webpack_require__(69);

var _point = __webpack_require__(42);

var _size = __webpack_require__(70);

var _lightview = __webpack_require__(448);

var _timer = __webpack_require__(92);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapView = exports.MapView = function () {
    function MapView() {
        _classCallCheck(this, MapView);

        this.m_lockedFirstVisibleFloor = -1;
        this.m_cachedFirstVisibleFloor = 7;
        this.m_cachedLastVisibleFloor = 7;
        this.m_tileSize = 0;
        this.m_updateTilesPos = 0;
        this.m_drawDimension = new _size.Size();
        this.m_visibleDimension = new _size.Size();
        this.m_optimizedSize = new _size.Size();
        this.m_virtualCenterOffset = new _point.Point();
        this.m_visibleCenterOffset = new _point.Point();
        this.m_moveOffset = new _point.Point();
        this.m_customCameraPosition = new _position.Position();
        this.m_mustUpdateVisibleTilesCache = true;
        this.m_mustDrawVisibleTilesCache = true;
        this.m_mustCleanFramebuffer = true;
        this.m_multifloor = true;
        this.m_animated = true;
        this.m_autoViewMode = true;
        this.m_drawTexts = true;
        this.m_drawNames = true;
        this.m_drawHealthBars = true;
        this.m_drawLights = false;
        this.m_drawManaBar = true;
        this.m_smooth = true;
        this.m_follow = true;
        this.m_cachedVisibleTiles = [];
        this.m_cachedFloorVisibleCreatures = [];
        this.m_drawFlags = 0;
        this.m_lightView = new _lightview.LightView();
        this.m_minimumAmbientLight = 0.0;
        this.m_fadeTimer = new _timer.Timer();
        this.m_fadeInTime = 0.0;
        this.m_fadeOutTime = 0.0;
        this.m_shaderSwitchDone = true;
    }

    _createClass(MapView, [{
        key: "init",
        value: function init() {
            this.m_optimizedSize = new _size.Size(_map.g_map.getAwareRange().horizontal(), _map.g_map.getAwareRange().vertical()).mul(_const.Otc.TILE_PIXELS);
            this.setVisibleDimension(new _size.Size(15, 11));
        }
    }, {
        key: "followCreature",
        value: function followCreature(creature) {
            this.m_follow = true;
            this.m_followingCreature = creature;
        }
    }, {
        key: "isFollowingCreature",
        value: function isFollowingCreature() {
            return this.m_followingCreature && this.m_follow;
        }
    }, {
        key: "getCameraPosition",
        value: function getCameraPosition() {
            if (this.isFollowingCreature()) return this.m_followingCreature.getPosition();
            return this.m_customCameraPosition;
        }
    }, {
        key: "transformPositionTo2D",
        value: function transformPositionTo2D(position, relativePosition) {
            return new _point.Point((this.m_virtualCenterOffset.x + (position.x - relativePosition.x) - (relativePosition.z - position.z)) * this.m_tileSize, (this.m_virtualCenterOffset.y + (position.y - relativePosition.y) - (relativePosition.z - position.z)) * this.m_tileSize);
        }
    }, {
        key: "draw",
        value: function draw() {
            console.error('draw mapview_1', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);
            if (this.m_mustUpdateVisibleTilesCache || this.m_updateTilesPos > 0) {
                console.error('draw mapview_1', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);
                this.updateVisibleTilesCache(this.m_mustUpdateVisibleTilesCache ? 0 : this.m_updateTilesPos);
            }
            console.error('draw mapview_2', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);
            var scaleFactor = this.m_tileSize / _const.Otc.TILE_PIXELS;
            var cameraPosition = this.getCameraPosition();
            var drawFlags = 0;
            drawFlags = _const.DrawFlags.DrawAnimations;
            drawFlags |= _const.DrawFlags.DrawGround | _const.DrawFlags.DrawGroundBorders | _const.DrawFlags.DrawWalls | _const.DrawFlags.DrawItems | _const.DrawFlags.DrawCreatures | _const.DrawFlags.DrawEffects | _const.DrawFlags.DrawMissiles;
            var tileIterator = 0;
            for (var z = this.m_cachedLastVisibleFloor; z >= this.m_cachedFirstVisibleFloor; --z) {
                while (tileIterator != this.m_cachedVisibleTiles.length) {
                    var tile = this.m_cachedVisibleTiles[tileIterator];
                    var tilePos = tile.getPosition();
                    if (tilePos.z != z) break;else ++tileIterator;
                    if (_map.g_map.isCovered(tilePos, this.m_cachedFirstVisibleFloor)) tile.draw(this.transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags);else tile.draw(this.transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags, this.m_lightView);
                }
                if (drawFlags & _const.DrawFlags.DrawMissiles) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _map.g_map.getFloorMissiles(z)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var missile = _step.value;

                            missile.draw(this.transformPositionTo2D(missile.getPosition(), cameraPosition), scaleFactor, (drawFlags & _const.DrawFlags.DrawAnimations) > 0, this.m_lightView);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
            /*
            if (g_map.isCovered(tilePos, m_cachedFirstVisibleFloor))
                tile.draw(transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags);
            else
                tile.draw(transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags, m_lightView.get());
            */
            /*
                    for (let z = cameraPosition.z; z >= cameraPosition.z; --z) {
            
                        const awareRange = g_map.getAwareRange();
                        for (let y = cameraPosition.y - awareRange.top; y <= cameraPosition.y + awareRange.bottom; ++y) {
                            for (let x = cameraPosition.x - awareRange.left; x <= cameraPosition.x + awareRange.right; ++x) {
                                let tilePos = new Position(x, y, z);//cameraPosition.translated(x, y, 0);
                                //tilePos.z = z;
                                let tile = g_map.getTile(tilePos);
                                console.error('draw', cameraPosition.x, cameraPosition.y, tilePos.x, tilePos.y, tilePos.z, tile);
            
                                if (tile) {
                                    let tilePos = tile.getPosition();
                                    let pos = this.transformPositionTo2D(tilePos, cameraPosition);
                                    //console.error('draw', tilePos.x, tilePos.y, tilePos.z, cameraPosition.x, cameraPosition.y, scaleFactor);
                                    tile.draw(pos.add(new Point(0, 0)), scaleFactor, drawFlags);
                                    //tile.draw(new Point(), scaleFactor, drawFlags);
                                    //return;
                                }
                            }
                        }
                    }
            */
            /*
                        if(drawFlags & DrawFlags.DrawMissiles) {
                            for(let missile of g_map.getFloorMissiles(z)) {
                                missile->draw(transformPositionTo2D(missile->getPosition(), cameraPosition), scaleFactor, drawFlags & DrawFlags.DrawAnimations, m_lightView.get());
                            }
                        }
            */
            /*
            float fadeOpacity = 1.0f;
            if(!m_shaderSwitchDone && m_fadeOutTime > 0) {
                fadeOpacity = 1.0f - (m_fadeTimer.timeElapsed() / m_fadeOutTime);
                if(fadeOpacity < 0.0f) {
                    m_shader = m_nextShader;
                    m_nextShader = nullptr;
                    m_shaderSwitchDone = true;
                    m_fadeTimer.restart();
                }
            }
             if(m_shaderSwitchDone && m_shader && m_fadeInTime > 0)
                fadeOpacity = std::min<float>(m_fadeTimer.timeElapsed() / m_fadeInTime, 1.0f);
             Rect srcRect = calcFramebufferSource(rect.size());
            Point drawOffset = srcRect.topLeft();
             if(m_shader && g_painter->hasShaders() && g_graphics.shouldUseShaders() && m_viewMode == NEAR_VIEW) {
                Rect framebufferRect = Rect(0,0, m_drawDimension * m_tileSize);
                Point center = srcRect.center();
                Point globalCoord = Point(cameraPosition.x - m_drawDimension.width()/2, -(cameraPosition.y - m_drawDimension.height()/2)) * m_tileSize;
                m_shader->bind();
                m_shader->setUniformValue(ShaderManager::MAP_CENTER_COORD, center.x / (float)framebufferRect.width(), 1.0f - center.y / (float)framebufferRect.height());
                m_shader->setUniformValue(ShaderManager::MAP_GLOBAL_COORD, globalCoord.x / (float)framebufferRect.height(), globalCoord.y / (float)framebufferRect.height());
                m_shader->setUniformValue(ShaderManager::MAP_ZOOM, scaleFactor);
                g_painter->setShaderProgram(m_shader);
            }
             g_painter->setColor(Color::white);
            g_painter->setOpacity(fadeOpacity);
            glDisable(GL_BLEND);
            #if 0
            // debug source area
                g_painter->saveAndResetState();
            m_framebuffer->bind();
            g_painter->setColor(Color::green);
            g_painter->drawBoundingRect(srcRect, 2);
            m_framebuffer->release();
            g_painter->restoreSavedState();
            m_framebuffer->draw(rect);
            #else
            m_framebuffer->draw(rect, srcRect);
            #endif
            g_painter->resetShaderProgram();
            g_painter->resetOpacity();
            glEnable(GL_BLEND);
            */
            // this could happen if the player position is not known yet
            if (!cameraPosition.isValid()) return;
            /*
                    float horizontalStretchFactor = rect.width() / (float)srcRect.width();
                    float verticalStretchFactor = rect.height() / (float)srcRect.height();
                     // avoid drawing texts on map in far zoom outs
                    for(const CreaturePtr& creature : m_cachedFloorVisibleCreatures) {
                        if(!creature->canBeSeen())
                        continue;
                         PointF jumpOffset = creature->getJumpOffset() * scaleFactor;
                        Point creatureOffset = Point(16 - creature->getDisplacementX(), - creature->getDisplacementY() - 2);
                        Position pos = creature->getPosition();
                        Point p = transformPositionTo2D(pos, cameraPosition) - drawOffset;
                        p += (creature->getDrawOffset() + creatureOffset) * scaleFactor - Point(stdext::round(jumpOffset.x), stdext::round(jumpOffset.y));
                        p.x = p.x * horizontalStretchFactor;
                        p.y = p.y * verticalStretchFactor;
                        p += rect.topLeft();
                         int flags = 0;
                        if(m_drawNames){ flags = DrawFlags.DrawNames; }
                        if(m_drawHealthBars) { flags |= DrawFlags.DrawBars; }
                        if(m_drawManaBar) { flags |= DrawFlags.DrawManaBar; }
                        creature->drawInformation(p, g_map.isCovered(pos, m_cachedFirstVisibleFloor), rect, flags);
                    }
                     // lights are drawn after names and before texts
                    if(m_drawLights)
                        m_lightView->draw(rect, srcRect);
                     if(m_viewMode == NEAR_VIEW && m_drawTexts) {
                        for(const StaticTextPtr& staticText : g_map.getStaticTexts()) {
                            Position pos = staticText->getPosition();
                             // ony draw static texts from current camera floor, unless yells
                            //if(pos.z != cameraPosition.z && !staticText->isYell())
                            //    continue;
                             if(pos.z != cameraPosition.z && staticText->getMessageMode() == Otc::MessageNone)
                            continue;
                             Point p = transformPositionTo2D(pos, cameraPosition) - drawOffset;
                            p.x = p.x * horizontalStretchFactor;
                            p.y = p.y * verticalStretchFactor;
                            p += rect.topLeft();
                            staticText->drawText(p, rect);
                        }
                         for(const AnimatedTextPtr& animatedText : g_map.getAnimatedTexts()) {
                            Position pos = animatedText->getPosition();
                             if(pos.z != cameraPosition.z)
                                continue;
                             Point p = transformPositionTo2D(pos, cameraPosition) - drawOffset;
                            p.x = p.x * horizontalStretchFactor;
                            p.y = p.y * verticalStretchFactor;
                            p += rect.topLeft();
                            animatedText->drawText(p, rect);
                        }
                    }
                    */
        }
    }, {
        key: "clear",
        value: function clear() {}
    }, {
        key: "updateVisibleTilesCache",
        value: function updateVisibleTilesCache(start) {
            console.log('updateVisibleTilesCache', start);
            if (start == 0) {
                this.m_cachedFirstVisibleFloor = this.calcFirstVisibleFloor();
                this.m_cachedLastVisibleFloor = this.calcLastVisibleFloor();
                /*
                    assert(m_cachedFirstVisibleFloor >= 0 && m_cachedLastVisibleFloor >= 0 &&
                        m_cachedFirstVisibleFloor <= Otc::MAX_Z && m_cachedLastVisibleFloor <= Otc::MAX_Z);
                */
                //console.log('floors1', this.m_cachedFirstVisibleFloor, this.m_cachedLastVisibleFloor)
                if (this.m_cachedLastVisibleFloor < this.m_cachedFirstVisibleFloor) this.m_cachedLastVisibleFloor = this.m_cachedFirstVisibleFloor;
                //console.log('floors2', this.m_cachedFirstVisibleFloor, this.m_cachedLastVisibleFloor)
                this.m_cachedFloorVisibleCreatures.length = 0;
                this.m_cachedVisibleTiles.length = 0;
                this.m_mustCleanFramebuffer = true;
                this.m_mustDrawVisibleTilesCache = true;
                this.m_mustUpdateVisibleTilesCache = false;
                this.m_updateTilesPos = 0;
            } else this.m_mustCleanFramebuffer = false;
            // there is no tile to render on invalid positions
            var cameraPosition = this.getCameraPosition();
            if (!cameraPosition.isValid()) return;
            //console.log('cam', cameraPosition)
            var stop = false;
            // clear current visible tiles cache
            this.m_cachedVisibleTiles.length = 0;
            this.m_mustDrawVisibleTilesCache = true;
            this.m_updateTilesPos = 0;
            // cache visible tiles in draw order
            // draw from last floor (the lower) to first floor (the higher)
            for (var iz = this.m_cachedLastVisibleFloor; iz >= this.m_cachedFirstVisibleFloor && !stop; --iz) {
                var numDiagonals = this.m_drawDimension.width() + this.m_drawDimension.height() - 1;
                //console.log('check z', iz, numDiagonals)
                // loop through / diagonals beginning at top left and going to top right
                for (var diagonal = 0; diagonal < numDiagonals && !stop; ++diagonal) {
                    //console.log('check diagonal', iz, diagonal)
                    // loop current diagonal tiles
                    var advance = Math.max(diagonal - this.m_drawDimension.height(), 0);
                    //console.log('check diagonal', iz, diagonal, advance)
                    for (var iy = diagonal - advance, ix = advance; iy >= 0 && ix < this.m_drawDimension.width() && !stop; --iy, ++ix) {
                        // only start really looking tiles in the desired start
                        if (this.m_updateTilesPos < start) {
                            this.m_updateTilesPos++;
                            continue;
                        }
                        // avoid rendering too much tiles at once
                        if (this.m_cachedVisibleTiles.length > MapView.MAX_TILE_DRAWS) {
                            stop = true;
                            break;
                        }
                        // position on current floor
                        //TODO: check position limits
                        var tilePos = cameraPosition.translated(ix - this.m_virtualCenterOffset.x, iy - this.m_virtualCenterOffset.y);
                        //console.log('tilePos', tilePos)
                        // adjust tilePos to the wanted floor
                        tilePos.coveredUp(cameraPosition.z - iz);
                        var tile = _map.g_map.getTile(tilePos);
                        if (tile) {
                            // skip tiles that have nothing
                            if (!tile.isDrawable()) continue;
                            // skip tiles that are completely behind another tile
                            if (_map.g_map.isCompletelyCovered(tilePos, this.m_cachedFirstVisibleFloor)) continue;
                            this.m_cachedVisibleTiles.push(tile);
                        }
                        this.m_updateTilesPos++;
                    }
                }
            }
            if (!stop) {
                this.m_updateTilesPos = 0;
            }
            if (start == 0) this.m_cachedFloorVisibleCreatures = _map.g_map.getSightSpectators(cameraPosition, false);
        }
    }, {
        key: "calcFirstVisibleFloor",
        value: function calcFirstVisibleFloor() {
            var z = 7;
            // return forced first visible floor
            if (this.m_lockedFirstVisibleFloor != -1) {
                z = this.m_lockedFirstVisibleFloor;
            } else {
                var cameraPosition = this.getCameraPosition().clone();
                // this could happens if the player is not known yet
                if (cameraPosition.isValid()) {
                    // avoid rendering multifloors in far views
                    if (!this.m_multifloor) {
                        z = cameraPosition.z;
                    } else {
                        // if nothing is limiting the view, the first visible floor is 0
                        var firstFloor = 0;
                        // limits to underground floors while under sea level
                        if (cameraPosition.z > _const.Otc.SEA_FLOOR) firstFloor = Math.max(cameraPosition.z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, _const.Otc.UNDERGROUND_FLOOR);
                        // loop in 3x3 tiles around the camera
                        for (var ix = -1; ix <= 1 && firstFloor < cameraPosition.z; ++ix) {
                            for (var iy = -1; iy <= 1 && firstFloor < cameraPosition.z; ++iy) {
                                var pos = cameraPosition.translated(ix, iy);
                                // process tiles that we can look through, e.g. windows, doors
                                if (ix == 0 && iy == 0 || Math.abs(ix) != Math.abs(iy) && _map.g_map.isLookPossible(pos)) {
                                    var upperPos = pos.clone();
                                    var coveredPos = pos.clone();
                                    while (coveredPos.coveredUp() && upperPos.up() && upperPos.z >= firstFloor) {
                                        // check tiles physically above
                                        var tile = _map.g_map.getTile(upperPos);
                                        if (tile && tile.limitsFloorsView(!_map.g_map.isLookPossible(pos))) {
                                            firstFloor = upperPos.z + 1;
                                            break;
                                        }
                                        // check tiles geometrically above
                                        tile = _map.g_map.getTile(coveredPos);
                                        if (tile && tile.limitsFloorsView(_map.g_map.isLookPossible(pos))) {
                                            firstFloor = coveredPos.z + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        z = firstFloor;
                    }
                }
            }
            // just ensure the that the floor is in the valid range
            z = (0, _helpers.clamp)(z, 0, _const.Otc.MAX_Z);
            return z;
        }
    }, {
        key: "calcLastVisibleFloor",
        value: function calcLastVisibleFloor() {
            if (!this.m_multifloor) return this.calcFirstVisibleFloor();
            var z = 7;
            var cameraPosition = this.getCameraPosition().clone();
            // this could happens if the player is not known yet
            if (cameraPosition.isValid()) {
                // view only underground floors when below sea level
                if (cameraPosition.z > _const.Otc.SEA_FLOOR) z = cameraPosition.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE;else z = _const.Otc.SEA_FLOOR;
            }
            if (this.m_lockedFirstVisibleFloor != -1) z = Math.max(this.m_lockedFirstVisibleFloor, z);
            // just ensure the that the floor is in the valid range
            z = (0, _helpers.clamp)(z, 0, _const.Otc.MAX_Z);
            return z;
        }
    }, {
        key: "updateGeometry",
        value: function updateGeometry(visibleDimension, optimizedSize) {
            var tileSize = _const.Otc.TILE_PIXELS;
            var drawDimension = visibleDimension.add(new _size.Size(3, 3));
            var virtualCenterOffset = new _size.Size((0, _helpers.toInt)(drawDimension.width() / 2), (0, _helpers.toInt)(drawDimension.height() / 2)).sub(new _size.Size(1, 1)).toPoint();
            var visibleCenterOffset = virtualCenterOffset.clone();
            this.m_multifloor = true;
            this.m_visibleDimension = visibleDimension;
            this.m_drawDimension = drawDimension;
            this.m_tileSize = tileSize;
            this.m_virtualCenterOffset = virtualCenterOffset;
            this.m_visibleCenterOffset = visibleCenterOffset;
            this.m_optimizedSize = optimizedSize;
            console.log('calc', visibleDimension, drawDimension, tileSize, virtualCenterOffset, visibleCenterOffset, optimizedSize);
            this.requestVisibleTilesCacheUpdate();
        }
    }, {
        key: "onTileUpdate",
        value: function onTileUpdate(position) {
            this.requestVisibleTilesCacheUpdate();
        }
    }, {
        key: "onMapCenterChange",
        value: function onMapCenterChange(position) {
            this.requestVisibleTilesCacheUpdate();
        }
    }, {
        key: "lockFirstVisibleFloor",
        value: function lockFirstVisibleFloor(firstVisibleFloor) {
            this.m_lockedFirstVisibleFloor = firstVisibleFloor;
            this.requestVisibleTilesCacheUpdate();
        }
    }, {
        key: "unlockFirstVisibleFloor",
        value: function unlockFirstVisibleFloor() {
            this.m_lockedFirstVisibleFloor = -1;
            this.requestVisibleTilesCacheUpdate();
        }
    }, {
        key: "setVisibleDimension",
        value: function setVisibleDimension(visibleDimension) {
            if (visibleDimension.equals(this.m_visibleDimension)) return;
            if (visibleDimension.width() % 2 != 1 || visibleDimension.height() % 2 != 1) {
                _log.Log.error("visible dimension must be odd");
                return;
            }
            if (visibleDimension.height() < 3 || visibleDimension.width() < 3) {
                _log.Log.error("reach max zoom in");
                return;
            }
            this.updateGeometry(visibleDimension, this.m_optimizedSize);
        }
    }, {
        key: "requestVisibleTilesCacheUpdate",
        value: function requestVisibleTilesCacheUpdate() {
            this.m_mustUpdateVisibleTilesCache = true;
        }
    }]);

    return MapView;
}();

MapView.MAX_TILE_DRAWS = 32 * 32 * 7;
var g_mapview = new MapView();
exports.g_mapview = g_mapview;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_resources = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputfile = __webpack_require__(451);

var _log = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Resources = function () {
    function Resources() {
        _classCallCheck(this, Resources);
    }

    _createClass(Resources, [{
        key: "openFile",
        value: function openFile(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var get, response, uInt8Array;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                get = function get(url) {
                                    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                                                            var xhr = new XMLHttpRequest();
                                                            xhr.responseType = 'arraybuffer';
                                                            xhr.onload = function (e) {
                                                                if (this.status >= 200 && this.status < 300) resolve(this.response);else reject('Response status: ' + this.status);
                                                            };
                                                            xhr.onerror = function (e) {
                                                                reject(e);
                                                            };
                                                            xhr.open('GET', url, true); //Async
                                                            xhr.send();
                                                        }));

                                                    case 1:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));
                                };

                                _context2.prev = 1;
                                _context2.next = 4;
                                return get(file);

                            case 4:
                                response = _context2.sent;

                                console.log('r', response);
                                uInt8Array = new Uint8Array(response);
                                return _context2.abrupt("return", new _inputfile.InputFile(new DataView(uInt8Array.buffer)));

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2["catch"](1);

                                _log.Log.debug('failed to openFile', _context2.t0);
                                throw _context2.t0;

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 10]]);
            }));
        }
    }]);

    return Resources;
}();

var g_resources = new Resources();
exports.g_resources = g_resources;
/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://inditex.localhost/Kasteria.dat', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
  // var byte3 = uInt8Array[4]; // byte at offset 4
console.log(uInt8Array);
};

xhr.send();
 */

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryDataReader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _position = __webpack_require__(69);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryDataReader = exports.BinaryDataReader = function () {
    function BinaryDataReader(msg) {
        _classCallCheck(this, BinaryDataReader);

        this.data = msg;
        this.offset = 0;
        this.size = this.data.byteLength;
    }

    _createClass(BinaryDataReader, [{
        key: "getU8",
        value: function getU8() {
            if (this.offset === this.size) throw new Error("Koniec pakietu");
            var v = this.data.getUint8(this.offset);
            this.offset += 1;
            return v;
        }
    }, {
        key: "getU16",
        value: function getU16() {
            return this.getU8() + this.getU8() * 256;
        }
    }, {
        key: "getU32",
        value: function getU32() {
            return this.getU16() + this.getU16() * 256 * 256;
        }
    }, {
        key: "getU64",
        value: function getU64() {
            return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
        }
    }, {
        key: "get8",
        value: function get8() {
            if (this.offset + 1 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt8(this.offset);
            this.offset += 1;
            return v;
        }
    }, {
        key: "get16",
        value: function get16() {
            if (this.offset + 2 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt16(this.offset);
            this.offset += 2;
            return v;
        }
    }, {
        key: "get32",
        value: function get32() {
            if (this.offset + 4 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt32(this.offset);
            this.offset += 4;
            return v;
        }
    }, {
        key: "getDouble",
        value: function getDouble() {
            if (this.offset === this.size) throw new Error("Koniec pakietu");
            var v = this.data.getFloat64(this.offset);
            this.offset += 8;
            return v;
        }
    }, {
        key: "getString",
        value: function getString() {
            var length = this.getU16();
            var text = '';
            for (var i = 0; i < length; i++) {
                text += String.fromCharCode(this.getU8());
            }
            return text;
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return new _position.Position(this.getU16(), this.getU16(), this.getU8());
        }
    }, {
        key: "getBytes",
        value: function getBytes(bytesCount) {
            if (bytesCount == -1) bytesCount = this.size - this.offset;
            if (this.offset + bytesCount > this.size) throw new Error("Koniec pakietu");
            var bytes = this.data.buffer.slice(this.offset, this.offset + bytesCount);
            this.offset += bytesCount;
            return bytes;
        }
    }, {
        key: "peekU8",
        value: function peekU8() {
            var v = this.getU8();
            this.offset -= 1;
            return v;
        }
    }, {
        key: "peekU16",
        value: function peekU16() {
            var v = this.getU16();
            this.offset -= 2;
            return v;
        }
    }, {
        key: "peekU32",
        value: function peekU32() {
            var v = this.getU32();
            this.offset -= 4;
            return v;
        }
    }, {
        key: "peekU64",
        value: function peekU64() {
            var v = this.getU64();
            this.offset -= 8;
            return v;
        }
    }, {
        key: "skipBytes",
        value: function skipBytes(bytesCount) {
            if (this.offset + bytesCount > this.size) throw new Error("Koniec pakietu");
            this.offset += bytesCount;
        }
    }, {
        key: "skip",
        value: function skip(bytesCount) {
            this.skipBytes(bytesCount);
        }
    }, {
        key: "getUnreadSize",
        value: function getUnreadSize() {
            return this.size - this.offset;
        }
    }, {
        key: "getReadPos",
        value: function getReadPos() {
            return this.offset;
        }
    }, {
        key: "setReadPos",
        value: function setReadPos(offset) {
            this.offset = offset;
        }
    }, {
        key: "tell",
        value: function tell() {
            return this.getReadPos();
        }
    }, {
        key: "seek",
        value: function seek(offset) {
            this.setReadPos(offset);
        }
    }]);

    return BinaryDataReader;
}();

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CachedText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _size = __webpack_require__(70);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CachedText = exports.CachedText = function () {
    function CachedText() {
        _classCallCheck(this, CachedText);

        this.m_text = null;
        this.m_textSize = null;
        this.m_textMustRecache = true;
        this.m_font = null;
        this.m_align = null;
    }

    _createClass(CachedText, [{
        key: 'draw',
        value: function draw(rect) {
            if (!this.m_font) return;
            if (this.m_textMustRecache || this.m_textCachedScreenCoords != rect) {
                this.m_textMustRecache = false;
                this.m_textCachedScreenCoords = rect;
                //m_textCoordsBuffer.clear();
                //m_font->calculateDrawTextCoords(m_textCoordsBuffer, m_text, rect, Fw::AlignCenter);
            }
            //if(m_font->getTexture())
            //    g_painter->drawTextureCoords(m_textCoordsBuffer, m_font->getTexture());
        }
    }, {
        key: 'wrapText',
        value: function wrapText(maxWidth) {
            if (this.m_font) {
                // update new line positions
                //this.m_text = this.m_font.wrapText(m_text, maxWidth);
                this.update();
            }
        }
    }, {
        key: 'setFont',
        value: function setFont(font) {
            this.m_font = font;
            this.update();
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.m_text = text;
            this.update();
        }
    }, {
        key: 'setAlign',
        value: function setAlign(align) {
            this.m_align = align;
            this.update();
        }
    }, {
        key: 'getTextSize',
        value: function getTextSize() {
            return this.m_textSize;
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.m_text;
        }
    }, {
        key: 'getFont',
        value: function getFont() {
            return this.m_font;
        }
    }, {
        key: 'getAlign',
        value: function getAlign() {
            return this.m_align;
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.m_font) this.m_textSize = new _size.Size();
            /* todo */ //m_font->calculateTextRectSize(m_text);
            this.m_textMustRecache = true;
        }
    }]);

    return CachedText;
}();

CachedText.ALIGN_LEFT = 'left';
CachedText.ALIGN_RIGHT = 'right';

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Otc = exports.Otc = undefined;
(function (Otc) {
    Otc[Otc["TILE_PIXELS"] = 32] = "TILE_PIXELS";
    Otc[Otc["MAX_ELEVATION"] = 24] = "MAX_ELEVATION";
    Otc[Otc["SEA_FLOOR"] = 7] = "SEA_FLOOR";
    Otc[Otc["UNDERGROUND_FLOOR"] = 8] = "UNDERGROUND_FLOOR";
    Otc[Otc["MAX_Z"] = 15] = "MAX_Z";
    Otc[Otc["AWARE_UNDEGROUND_FLOOR_RANGE"] = 2] = "AWARE_UNDEGROUND_FLOOR_RANGE";
    Otc[Otc["INVISIBLE_TICKS_PER_FRAME"] = 500] = "INVISIBLE_TICKS_PER_FRAME";
    Otc[Otc["ITEM_TICKS_PER_FRAME"] = 500] = "ITEM_TICKS_PER_FRAME";
    Otc[Otc["ANIMATED_TEXT_DURATION"] = 1000] = "ANIMATED_TEXT_DURATION";
    Otc[Otc["STATIC_DURATION_PER_CHARACTER"] = 60] = "STATIC_DURATION_PER_CHARACTER";
    Otc[Otc["MIN_STATIC_TEXT_DURATION"] = 3000] = "MIN_STATIC_TEXT_DURATION";
    Otc[Otc["MAX_STATIC_TEXT_WIDTH"] = 200] = "MAX_STATIC_TEXT_WIDTH";
    Otc[Otc["MAX_AUTOWALK_STEPS_RETRY"] = 10] = "MAX_AUTOWALK_STEPS_RETRY";
    Otc[Otc["MAX_AUTOWALK_DIST"] = 127] = "MAX_AUTOWALK_DIST";
})(Otc || (exports.Otc = Otc = {}));
var DrawFlags = exports.DrawFlags = undefined;
(function (DrawFlags) {
    DrawFlags[DrawFlags["DrawGround"] = 1] = "DrawGround";
    DrawFlags[DrawFlags["DrawGroundBorders"] = 2] = "DrawGroundBorders";
    DrawFlags[DrawFlags["DrawOnBottom"] = 4] = "DrawOnBottom";
    DrawFlags[DrawFlags["DrawOnTop"] = 8] = "DrawOnTop";
    DrawFlags[DrawFlags["DrawItems"] = 16] = "DrawItems";
    DrawFlags[DrawFlags["DrawCreatures"] = 32] = "DrawCreatures";
    DrawFlags[DrawFlags["DrawEffects"] = 64] = "DrawEffects";
    DrawFlags[DrawFlags["DrawMissiles"] = 128] = "DrawMissiles";
    DrawFlags[DrawFlags["DrawCreaturesInformation"] = 256] = "DrawCreaturesInformation";
    DrawFlags[DrawFlags["DrawStaticTexts"] = 512] = "DrawStaticTexts";
    DrawFlags[DrawFlags["DrawAnimatedTexts"] = 1024] = "DrawAnimatedTexts";
    DrawFlags[DrawFlags["DrawAnimations"] = 2048] = "DrawAnimations";
    DrawFlags[DrawFlags["DrawBars"] = 4096] = "DrawBars";
    DrawFlags[DrawFlags["DrawNames"] = 8192] = "DrawNames";
    DrawFlags[DrawFlags["DrawLights"] = 16384] = "DrawLights";
    DrawFlags[DrawFlags["DrawManaBar"] = 32768] = "DrawManaBar";
    DrawFlags[DrawFlags["DrawWalls"] = 12] = "DrawWalls";
    DrawFlags[DrawFlags["DrawEverything"] = 65535] = "DrawEverything";
})(DrawFlags || (exports.DrawFlags = DrawFlags = {}));
var DatOpts = exports.DatOpts = undefined;
(function (DatOpts) {
    DatOpts[DatOpts["DatGround"] = 0] = "DatGround";
    DatOpts[DatOpts["DatGroundClip"] = 1] = "DatGroundClip";
    DatOpts[DatOpts["DatOnBottom"] = 2] = "DatOnBottom";
    DatOpts[DatOpts["DatOnTop"] = 3] = "DatOnTop";
    DatOpts[DatOpts["DatContainer"] = 4] = "DatContainer";
    DatOpts[DatOpts["DatStackable"] = 5] = "DatStackable";
    DatOpts[DatOpts["DatForceUse"] = 6] = "DatForceUse";
    DatOpts[DatOpts["DatMultiUse"] = 7] = "DatMultiUse";
    DatOpts[DatOpts["DatWritable"] = 8] = "DatWritable";
    DatOpts[DatOpts["DatWritableOnce"] = 9] = "DatWritableOnce";
    DatOpts[DatOpts["DatFluidContainer"] = 10] = "DatFluidContainer";
    DatOpts[DatOpts["DatSplash"] = 11] = "DatSplash";
    DatOpts[DatOpts["DatBlockWalk"] = 12] = "DatBlockWalk";
    DatOpts[DatOpts["DatNotMoveable"] = 13] = "DatNotMoveable";
    DatOpts[DatOpts["DatBlockProjectile"] = 14] = "DatBlockProjectile";
    DatOpts[DatOpts["DatBlockPathFind"] = 15] = "DatBlockPathFind";
    DatOpts[DatOpts["DatPickupable"] = 16] = "DatPickupable";
    DatOpts[DatOpts["DatHangable"] = 17] = "DatHangable";
    DatOpts[DatOpts["DatHookSouth"] = 18] = "DatHookSouth";
    DatOpts[DatOpts["DatHookEast"] = 19] = "DatHookEast";
    DatOpts[DatOpts["DatRotable"] = 20] = "DatRotable";
    DatOpts[DatOpts["DatLight"] = 21] = "DatLight";
    DatOpts[DatOpts["DatDontHide"] = 22] = "DatDontHide";
    DatOpts[DatOpts["DatTranslucent"] = 23] = "DatTranslucent";
    DatOpts[DatOpts["DatDisplacement"] = 24] = "DatDisplacement";
    DatOpts[DatOpts["DatElevation"] = 25] = "DatElevation";
    DatOpts[DatOpts["DatLyingCorpse"] = 26] = "DatLyingCorpse";
    DatOpts[DatOpts["DatAnimateAlways"] = 27] = "DatAnimateAlways";
    DatOpts[DatOpts["DatMinimapColor"] = 28] = "DatMinimapColor";
    DatOpts[DatOpts["DatLensHelp"] = 29] = "DatLensHelp";
    DatOpts[DatOpts["DatFullGround"] = 30] = "DatFullGround";
    DatOpts[DatOpts["DatIgnoreLook"] = 31] = "DatIgnoreLook";
    DatOpts[DatOpts["DatCloth"] = 32] = "DatCloth";
    DatOpts[DatOpts["DatAnimation"] = 33] = "DatAnimation";
    DatOpts[DatOpts["DatLastOpt"] = 255] = "DatLastOpt";
})(DatOpts || (exports.DatOpts = DatOpts = {}));
var InventorySlot = exports.InventorySlot = undefined;
(function (InventorySlot) {
    InventorySlot[InventorySlot["InventorySlotHead"] = 1] = "InventorySlotHead";
    InventorySlot[InventorySlot["InventorySlotNecklace"] = 2] = "InventorySlotNecklace";
    InventorySlot[InventorySlot["InventorySlotBackpack"] = 3] = "InventorySlotBackpack";
    InventorySlot[InventorySlot["InventorySlotArmor"] = 4] = "InventorySlotArmor";
    InventorySlot[InventorySlot["InventorySlotRight"] = 5] = "InventorySlotRight";
    InventorySlot[InventorySlot["InventorySlotLeft"] = 6] = "InventorySlotLeft";
    InventorySlot[InventorySlot["InventorySlotLegs"] = 7] = "InventorySlotLegs";
    InventorySlot[InventorySlot["InventorySlotFeet"] = 8] = "InventorySlotFeet";
    InventorySlot[InventorySlot["InventorySlotRing"] = 9] = "InventorySlotRing";
    InventorySlot[InventorySlot["InventorySlotAmmo"] = 10] = "InventorySlotAmmo";
    InventorySlot[InventorySlot["InventorySlotPurse"] = 11] = "InventorySlotPurse";
    InventorySlot[InventorySlot["InventorySlotExt1"] = 12] = "InventorySlotExt1";
    InventorySlot[InventorySlot["InventorySlotExt2"] = 13] = "InventorySlotExt2";
    InventorySlot[InventorySlot["InventorySlotExt3"] = 14] = "InventorySlotExt3";
    InventorySlot[InventorySlot["InventorySlotExt4"] = 15] = "InventorySlotExt4";
    InventorySlot[InventorySlot["LastInventorySlot"] = 16] = "LastInventorySlot";
})(InventorySlot || (exports.InventorySlot = InventorySlot = {}));
var Statistic = exports.Statistic = undefined;
(function (Statistic) {
    Statistic[Statistic["Health"] = 0] = "Health";
    Statistic[Statistic["MaxHealth"] = 1] = "MaxHealth";
    Statistic[Statistic["FreeCapacity"] = 2] = "FreeCapacity";
    Statistic[Statistic["Experience"] = 3] = "Experience";
    Statistic[Statistic["Level"] = 4] = "Level";
    Statistic[Statistic["LevelPercent"] = 5] = "LevelPercent";
    Statistic[Statistic["Mana"] = 6] = "Mana";
    Statistic[Statistic["MaxMana"] = 7] = "MaxMana";
    Statistic[Statistic["MagicLevel"] = 8] = "MagicLevel";
    Statistic[Statistic["MagicLevelPercent"] = 9] = "MagicLevelPercent";
    Statistic[Statistic["Soul"] = 10] = "Soul";
    Statistic[Statistic["Stamina"] = 11] = "Stamina";
    Statistic[Statistic["LastStatistic"] = 12] = "LastStatistic";
})(Statistic || (exports.Statistic = Statistic = {}));
var Skill = exports.Skill = undefined;
(function (Skill) {
    Skill[Skill["Fist"] = 0] = "Fist";
    Skill[Skill["Club"] = 1] = "Club";
    Skill[Skill["Sword"] = 2] = "Sword";
    Skill[Skill["Axe"] = 3] = "Axe";
    Skill[Skill["Distance"] = 4] = "Distance";
    Skill[Skill["Shielding"] = 5] = "Shielding";
    Skill[Skill["Fishing"] = 6] = "Fishing";
    Skill[Skill["CriticalChance"] = 7] = "CriticalChance";
    Skill[Skill["CriticalDamage"] = 8] = "CriticalDamage";
    Skill[Skill["LifeLeechChance"] = 9] = "LifeLeechChance";
    Skill[Skill["LifeLeechAmount"] = 10] = "LifeLeechAmount";
    Skill[Skill["ManaLeechChance"] = 11] = "ManaLeechChance";
    Skill[Skill["ManaLeechAmount"] = 12] = "ManaLeechAmount";
    Skill[Skill["LastSkill"] = 13] = "LastSkill";
})(Skill || (exports.Skill = Skill = {}));
var Direction = exports.Direction = undefined;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
    Direction[Direction["NorthEast"] = 4] = "NorthEast";
    Direction[Direction["SouthEast"] = 5] = "SouthEast";
    Direction[Direction["SouthWest"] = 6] = "SouthWest";
    Direction[Direction["NorthWest"] = 7] = "NorthWest";
    Direction[Direction["InvalidDirection"] = 8] = "InvalidDirection";
})(Direction || (exports.Direction = Direction = {}));
var FluidsColor = exports.FluidsColor = undefined;
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidTransparent"] = 0] = "FluidTransparent";
    FluidsColor[FluidsColor["FluidBlue"] = 1] = "FluidBlue";
    FluidsColor[FluidsColor["FluidRed"] = 2] = "FluidRed";
    FluidsColor[FluidsColor["FluidBrown"] = 3] = "FluidBrown";
    FluidsColor[FluidsColor["FluidGreen"] = 4] = "FluidGreen";
    FluidsColor[FluidsColor["FluidYellow"] = 5] = "FluidYellow";
    FluidsColor[FluidsColor["FluidWhite"] = 6] = "FluidWhite";
    FluidsColor[FluidsColor["FluidPurple"] = 7] = "FluidPurple";
})(FluidsColor || (exports.FluidsColor = FluidsColor = {}));
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidNone"] = 0] = "FluidNone";
    FluidsColor[FluidsColor["FluidWater"] = 1] = "FluidWater";
    FluidsColor[FluidsColor["FluidMana"] = 2] = "FluidMana";
    FluidsColor[FluidsColor["FluidBeer"] = 3] = "FluidBeer";
    FluidsColor[FluidsColor["FluidOil"] = 4] = "FluidOil";
    FluidsColor[FluidsColor["FluidBlood"] = 5] = "FluidBlood";
    FluidsColor[FluidsColor["FluidSlime"] = 6] = "FluidSlime";
    FluidsColor[FluidsColor["FluidMud"] = 7] = "FluidMud";
    FluidsColor[FluidsColor["FluidLemonade"] = 8] = "FluidLemonade";
    FluidsColor[FluidsColor["FluidMilk"] = 9] = "FluidMilk";
    FluidsColor[FluidsColor["FluidWine"] = 10] = "FluidWine";
    FluidsColor[FluidsColor["FluidHealth"] = 11] = "FluidHealth";
    FluidsColor[FluidsColor["FluidUrine"] = 12] = "FluidUrine";
    FluidsColor[FluidsColor["FluidRum"] = 13] = "FluidRum";
    FluidsColor[FluidsColor["FluidFruidJuice"] = 14] = "FluidFruidJuice";
    FluidsColor[FluidsColor["FluidCoconutMilk"] = 15] = "FluidCoconutMilk";
    FluidsColor[FluidsColor["FluidTea"] = 16] = "FluidTea";
    FluidsColor[FluidsColor["FluidMead"] = 17] = "FluidMead";
})(FluidsColor || (exports.FluidsColor = FluidsColor = {}));
var FightModes = exports.FightModes = undefined;
(function (FightModes) {
    FightModes[FightModes["FightOffensive"] = 1] = "FightOffensive";
    FightModes[FightModes["FightBalanced"] = 2] = "FightBalanced";
    FightModes[FightModes["FightDefensive"] = 3] = "FightDefensive";
})(FightModes || (exports.FightModes = FightModes = {}));
var ChaseModes = exports.ChaseModes = undefined;
(function (ChaseModes) {
    ChaseModes[ChaseModes["DontChase"] = 0] = "DontChase";
    ChaseModes[ChaseModes["ChaseOpponent"] = 1] = "ChaseOpponent";
})(ChaseModes || (exports.ChaseModes = ChaseModes = {}));
var PVPModes = exports.PVPModes = undefined;
(function (PVPModes) {
    PVPModes[PVPModes["WhiteDove"] = 0] = "WhiteDove";
    PVPModes[PVPModes["WhiteHand"] = 1] = "WhiteHand";
    PVPModes[PVPModes["YellowHand"] = 2] = "YellowHand";
    PVPModes[PVPModes["RedFist"] = 3] = "RedFist";
})(PVPModes || (exports.PVPModes = PVPModes = {}));
var PlayerSkulls = exports.PlayerSkulls = undefined;
(function (PlayerSkulls) {
    PlayerSkulls[PlayerSkulls["SkullNone"] = 0] = "SkullNone";
    PlayerSkulls[PlayerSkulls["SkullYellow"] = 1] = "SkullYellow";
    PlayerSkulls[PlayerSkulls["SkullGreen"] = 2] = "SkullGreen";
    PlayerSkulls[PlayerSkulls["SkullWhite"] = 3] = "SkullWhite";
    PlayerSkulls[PlayerSkulls["SkullRed"] = 4] = "SkullRed";
    PlayerSkulls[PlayerSkulls["SkullBlack"] = 5] = "SkullBlack";
    PlayerSkulls[PlayerSkulls["SkullOrange"] = 6] = "SkullOrange";
})(PlayerSkulls || (exports.PlayerSkulls = PlayerSkulls = {}));
;
var PlayerShields = exports.PlayerShields = undefined;
(function (PlayerShields) {
    PlayerShields[PlayerShields["ShieldNone"] = 0] = "ShieldNone";
    PlayerShields[PlayerShields["ShieldWhiteYellow"] = 1] = "ShieldWhiteYellow";
    PlayerShields[PlayerShields["ShieldWhiteBlue"] = 2] = "ShieldWhiteBlue";
    PlayerShields[PlayerShields["ShieldBlue"] = 3] = "ShieldBlue";
    PlayerShields[PlayerShields["ShieldYellow"] = 4] = "ShieldYellow";
    PlayerShields[PlayerShields["ShieldBlueSharedExp"] = 5] = "ShieldBlueSharedExp";
    PlayerShields[PlayerShields["ShieldYellowSharedExp"] = 6] = "ShieldYellowSharedExp";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExpBlink"] = 7] = "ShieldBlueNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExpBlink"] = 8] = "ShieldYellowNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExp"] = 9] = "ShieldBlueNoSharedExp";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExp"] = 10] = "ShieldYellowNoSharedExp";
    PlayerShields[PlayerShields["ShieldGray"] = 11] = "ShieldGray"; // 11 member of another party
})(PlayerShields || (exports.PlayerShields = PlayerShields = {}));
var PlayerEmblems = exports.PlayerEmblems = undefined;
(function (PlayerEmblems) {
    PlayerEmblems[PlayerEmblems["EmblemNone"] = 0] = "EmblemNone";
    PlayerEmblems[PlayerEmblems["EmblemGreen"] = 1] = "EmblemGreen";
    PlayerEmblems[PlayerEmblems["EmblemRed"] = 2] = "EmblemRed";
    PlayerEmblems[PlayerEmblems["EmblemBlue"] = 3] = "EmblemBlue";
    PlayerEmblems[PlayerEmblems["EmblemMember"] = 4] = "EmblemMember";
    PlayerEmblems[PlayerEmblems["EmblemOther"] = 5] = "EmblemOther";
})(PlayerEmblems || (exports.PlayerEmblems = PlayerEmblems = {}));
var CreatureIcons = exports.CreatureIcons = undefined;
(function (CreatureIcons) {
    CreatureIcons[CreatureIcons["NpcIconNone"] = 0] = "NpcIconNone";
    CreatureIcons[CreatureIcons["NpcIconChat"] = 1] = "NpcIconChat";
    CreatureIcons[CreatureIcons["NpcIconTrade"] = 2] = "NpcIconTrade";
    CreatureIcons[CreatureIcons["NpcIconQuest"] = 3] = "NpcIconQuest";
    CreatureIcons[CreatureIcons["NpcIconTradeQuest"] = 4] = "NpcIconTradeQuest";
})(CreatureIcons || (exports.CreatureIcons = CreatureIcons = {}));
var PlayerStates = exports.PlayerStates = undefined;
(function (PlayerStates) {
    PlayerStates[PlayerStates["IconNone"] = 0] = "IconNone";
    PlayerStates[PlayerStates["IconPoison"] = 1] = "IconPoison";
    PlayerStates[PlayerStates["IconBurn"] = 2] = "IconBurn";
    PlayerStates[PlayerStates["IconEnergy"] = 4] = "IconEnergy";
    PlayerStates[PlayerStates["IconDrunk"] = 8] = "IconDrunk";
    PlayerStates[PlayerStates["IconManaShield"] = 16] = "IconManaShield";
    PlayerStates[PlayerStates["IconParalyze"] = 32] = "IconParalyze";
    PlayerStates[PlayerStates["IconHaste"] = 64] = "IconHaste";
    PlayerStates[PlayerStates["IconSwords"] = 128] = "IconSwords";
    PlayerStates[PlayerStates["IconDrowning"] = 256] = "IconDrowning";
    PlayerStates[PlayerStates["IconFreezing"] = 512] = "IconFreezing";
    PlayerStates[PlayerStates["IconDazzled"] = 1024] = "IconDazzled";
    PlayerStates[PlayerStates["IconCursed"] = 2048] = "IconCursed";
    PlayerStates[PlayerStates["IconPartyBuff"] = 4096] = "IconPartyBuff";
    PlayerStates[PlayerStates["IconPzBlock"] = 8192] = "IconPzBlock";
    PlayerStates[PlayerStates["IconPz"] = 16384] = "IconPz";
    PlayerStates[PlayerStates["IconBleeding"] = 32768] = "IconBleeding";
    PlayerStates[PlayerStates["IconHungry"] = 65536] = "IconHungry";
})(PlayerStates || (exports.PlayerStates = PlayerStates = {}));
var MessageMode = exports.MessageMode = undefined;
(function (MessageMode) {
    MessageMode[MessageMode["MessageNone"] = 0] = "MessageNone";
    MessageMode[MessageMode["MessageSay"] = 1] = "MessageSay";
    MessageMode[MessageMode["MessageWhisper"] = 2] = "MessageWhisper";
    MessageMode[MessageMode["MessageYell"] = 3] = "MessageYell";
    MessageMode[MessageMode["MessagePrivateFrom"] = 4] = "MessagePrivateFrom";
    MessageMode[MessageMode["MessagePrivateTo"] = 5] = "MessagePrivateTo";
    MessageMode[MessageMode["MessageChannelManagement"] = 6] = "MessageChannelManagement";
    MessageMode[MessageMode["MessageChannel"] = 7] = "MessageChannel";
    MessageMode[MessageMode["MessageChannelHighlight"] = 8] = "MessageChannelHighlight";
    MessageMode[MessageMode["MessageSpell"] = 9] = "MessageSpell";
    MessageMode[MessageMode["MessageNpcFrom"] = 10] = "MessageNpcFrom";
    MessageMode[MessageMode["MessageNpcTo"] = 11] = "MessageNpcTo";
    MessageMode[MessageMode["MessageGamemasterBroadcast"] = 12] = "MessageGamemasterBroadcast";
    MessageMode[MessageMode["MessageGamemasterChannel"] = 13] = "MessageGamemasterChannel";
    MessageMode[MessageMode["MessageGamemasterPrivateFrom"] = 14] = "MessageGamemasterPrivateFrom";
    MessageMode[MessageMode["MessageGamemasterPrivateTo"] = 15] = "MessageGamemasterPrivateTo";
    MessageMode[MessageMode["MessageLogin"] = 16] = "MessageLogin";
    MessageMode[MessageMode["MessageWarning"] = 17] = "MessageWarning";
    MessageMode[MessageMode["MessageGame"] = 18] = "MessageGame";
    MessageMode[MessageMode["MessageFailure"] = 19] = "MessageFailure";
    MessageMode[MessageMode["MessageLook"] = 20] = "MessageLook";
    MessageMode[MessageMode["MessageDamageDealed"] = 21] = "MessageDamageDealed";
    MessageMode[MessageMode["MessageDamageReceived"] = 22] = "MessageDamageReceived";
    MessageMode[MessageMode["MessageHeal"] = 23] = "MessageHeal";
    MessageMode[MessageMode["MessageExp"] = 24] = "MessageExp";
    MessageMode[MessageMode["MessageDamageOthers"] = 25] = "MessageDamageOthers";
    MessageMode[MessageMode["MessageHealOthers"] = 26] = "MessageHealOthers";
    MessageMode[MessageMode["MessageExpOthers"] = 27] = "MessageExpOthers";
    MessageMode[MessageMode["MessageStatus"] = 28] = "MessageStatus";
    MessageMode[MessageMode["MessageLoot"] = 29] = "MessageLoot";
    MessageMode[MessageMode["MessageTradeNpc"] = 30] = "MessageTradeNpc";
    MessageMode[MessageMode["MessageGuild"] = 31] = "MessageGuild";
    MessageMode[MessageMode["MessagePartyManagement"] = 32] = "MessagePartyManagement";
    MessageMode[MessageMode["MessageParty"] = 33] = "MessageParty";
    MessageMode[MessageMode["MessageBarkLow"] = 34] = "MessageBarkLow";
    MessageMode[MessageMode["MessageBarkLoud"] = 35] = "MessageBarkLoud";
    MessageMode[MessageMode["MessageReport"] = 36] = "MessageReport";
    MessageMode[MessageMode["MessageHotkeyUse"] = 37] = "MessageHotkeyUse";
    MessageMode[MessageMode["MessageTutorialHint"] = 38] = "MessageTutorialHint";
    MessageMode[MessageMode["MessageThankyou"] = 39] = "MessageThankyou";
    MessageMode[MessageMode["MessageMarket"] = 40] = "MessageMarket";
    MessageMode[MessageMode["MessageMana"] = 41] = "MessageMana";
    MessageMode[MessageMode["MessageBeyondLast"] = 42] = "MessageBeyondLast";
    // deprecated
    MessageMode[MessageMode["MessageMonsterYell"] = 43] = "MessageMonsterYell";
    MessageMode[MessageMode["MessageMonsterSay"] = 44] = "MessageMonsterSay";
    MessageMode[MessageMode["MessageRed"] = 45] = "MessageRed";
    MessageMode[MessageMode["MessageBlue"] = 46] = "MessageBlue";
    MessageMode[MessageMode["MessageRVRChannel"] = 47] = "MessageRVRChannel";
    MessageMode[MessageMode["MessageRVRAnswer"] = 48] = "MessageRVRAnswer";
    MessageMode[MessageMode["MessageRVRContinue"] = 49] = "MessageRVRContinue";
    MessageMode[MessageMode["MessageGameHighlight"] = 50] = "MessageGameHighlight";
    MessageMode[MessageMode["MessageNpcFromStartBlock"] = 51] = "MessageNpcFromStartBlock";
    MessageMode[MessageMode["LastMessage"] = 52] = "LastMessage";
    MessageMode[MessageMode["MessageInvalid"] = 255] = "MessageInvalid";
})(MessageMode || (exports.MessageMode = MessageMode = {}));
var GameFeature = exports.GameFeature = undefined;
(function (GameFeature) {
    GameFeature[GameFeature["GameProtocolChecksum"] = 1] = "GameProtocolChecksum";
    GameFeature[GameFeature["GameAccountNames"] = 2] = "GameAccountNames";
    GameFeature[GameFeature["GameChallengeOnLogin"] = 3] = "GameChallengeOnLogin";
    GameFeature[GameFeature["GamePenalityOnDeath"] = 4] = "GamePenalityOnDeath";
    GameFeature[GameFeature["GameNameOnNpcTrade"] = 5] = "GameNameOnNpcTrade";
    GameFeature[GameFeature["GameDoubleFreeCapacity"] = 6] = "GameDoubleFreeCapacity";
    GameFeature[GameFeature["GameDoubleExperience"] = 7] = "GameDoubleExperience";
    GameFeature[GameFeature["GameTotalCapacity"] = 8] = "GameTotalCapacity";
    GameFeature[GameFeature["GameSkillsBase"] = 9] = "GameSkillsBase";
    GameFeature[GameFeature["GamePlayerRegenerationTime"] = 10] = "GamePlayerRegenerationTime";
    GameFeature[GameFeature["GameChannelPlayerList"] = 11] = "GameChannelPlayerList";
    GameFeature[GameFeature["GamePlayerMounts"] = 12] = "GamePlayerMounts";
    GameFeature[GameFeature["GameEnvironmentEffect"] = 13] = "GameEnvironmentEffect";
    GameFeature[GameFeature["GameCreatureEmblems"] = 14] = "GameCreatureEmblems";
    GameFeature[GameFeature["GameItemAnimationPhase"] = 15] = "GameItemAnimationPhase";
    GameFeature[GameFeature["GameMagicEffectU16"] = 16] = "GameMagicEffectU16";
    GameFeature[GameFeature["GamePlayerMarket"] = 17] = "GamePlayerMarket";
    GameFeature[GameFeature["GameSpritesU32"] = 18] = "GameSpritesU32";
    // 19 unused
    GameFeature[GameFeature["GameOfflineTrainingTime"] = 20] = "GameOfflineTrainingTime";
    GameFeature[GameFeature["GamePurseSlot"] = 21] = "GamePurseSlot";
    GameFeature[GameFeature["GameFormatCreatureName"] = 22] = "GameFormatCreatureName";
    GameFeature[GameFeature["GameSpellList"] = 23] = "GameSpellList";
    GameFeature[GameFeature["GameClientPing"] = 24] = "GameClientPing";
    GameFeature[GameFeature["GameExtendedClientPing"] = 25] = "GameExtendedClientPing";
    GameFeature[GameFeature["GameDoubleHealth"] = 28] = "GameDoubleHealth";
    GameFeature[GameFeature["GameDoubleSkills"] = 29] = "GameDoubleSkills";
    GameFeature[GameFeature["GameChangeMapAwareRange"] = 30] = "GameChangeMapAwareRange";
    GameFeature[GameFeature["GameMapMovePosition"] = 31] = "GameMapMovePosition";
    GameFeature[GameFeature["GameAttackSeq"] = 32] = "GameAttackSeq";
    GameFeature[GameFeature["GameBlueNpcNameColor"] = 33] = "GameBlueNpcNameColor";
    GameFeature[GameFeature["GameDiagonalAnimatedText"] = 34] = "GameDiagonalAnimatedText";
    GameFeature[GameFeature["GameLoginPending"] = 35] = "GameLoginPending";
    GameFeature[GameFeature["GameNewSpeedLaw"] = 36] = "GameNewSpeedLaw";
    GameFeature[GameFeature["GameForceFirstAutoWalkStep"] = 37] = "GameForceFirstAutoWalkStep";
    GameFeature[GameFeature["GameMinimapRemove"] = 38] = "GameMinimapRemove";
    GameFeature[GameFeature["GameDoubleShopSellAmount"] = 39] = "GameDoubleShopSellAmount";
    GameFeature[GameFeature["GameContainerPagination"] = 40] = "GameContainerPagination";
    GameFeature[GameFeature["GameThingMarks"] = 41] = "GameThingMarks";
    GameFeature[GameFeature["GameLooktypeU16"] = 42] = "GameLooktypeU16";
    GameFeature[GameFeature["GamePlayerStamina"] = 43] = "GamePlayerStamina";
    GameFeature[GameFeature["GamePlayerAddons"] = 44] = "GamePlayerAddons";
    GameFeature[GameFeature["GameMessageStatements"] = 45] = "GameMessageStatements";
    GameFeature[GameFeature["GameMessageLevel"] = 46] = "GameMessageLevel";
    GameFeature[GameFeature["GameNewFluids"] = 47] = "GameNewFluids";
    GameFeature[GameFeature["GamePlayerStateU16"] = 48] = "GamePlayerStateU16";
    GameFeature[GameFeature["GameNewOutfitProtocol"] = 49] = "GameNewOutfitProtocol";
    GameFeature[GameFeature["GamePVPMode"] = 50] = "GamePVPMode";
    GameFeature[GameFeature["GameWritableDate"] = 51] = "GameWritableDate";
    GameFeature[GameFeature["GameAdditionalVipInfo"] = 52] = "GameAdditionalVipInfo";
    GameFeature[GameFeature["GameBaseSkillU16"] = 53] = "GameBaseSkillU16";
    GameFeature[GameFeature["GameCreatureIcons"] = 54] = "GameCreatureIcons";
    GameFeature[GameFeature["GameHideNpcNames"] = 55] = "GameHideNpcNames";
    GameFeature[GameFeature["GameSpritesAlphaChannel"] = 56] = "GameSpritesAlphaChannel";
    GameFeature[GameFeature["GamePremiumExpiration"] = 57] = "GamePremiumExpiration";
    GameFeature[GameFeature["GameBrowseField"] = 58] = "GameBrowseField";
    GameFeature[GameFeature["GameEnhancedAnimations"] = 59] = "GameEnhancedAnimations";
    GameFeature[GameFeature["GameOGLInformation"] = 60] = "GameOGLInformation";
    GameFeature[GameFeature["GameMessageSizeCheck"] = 61] = "GameMessageSizeCheck";
    GameFeature[GameFeature["GamePreviewState"] = 62] = "GamePreviewState";
    GameFeature[GameFeature["GameLoginPacketEncryption"] = 63] = "GameLoginPacketEncryption";
    GameFeature[GameFeature["GameClientVersion"] = 64] = "GameClientVersion";
    GameFeature[GameFeature["GameContentRevision"] = 65] = "GameContentRevision";
    GameFeature[GameFeature["GameExperienceBonus"] = 66] = "GameExperienceBonus";
    GameFeature[GameFeature["GameAuthenticator"] = 67] = "GameAuthenticator";
    GameFeature[GameFeature["GameUnjustifiedPoints"] = 68] = "GameUnjustifiedPoints";
    GameFeature[GameFeature["GameSessionKey"] = 69] = "GameSessionKey";
    GameFeature[GameFeature["GameDeathType"] = 70] = "GameDeathType";
    GameFeature[GameFeature["GameIdleAnimations"] = 71] = "GameIdleAnimations";
    GameFeature[GameFeature["GameKeepUnawareTiles"] = 72] = "GameKeepUnawareTiles";
    GameFeature[GameFeature["GameIngameStore"] = 73] = "GameIngameStore";
    GameFeature[GameFeature["GameIngameStoreHighlights"] = 74] = "GameIngameStoreHighlights";
    GameFeature[GameFeature["GameIngameStoreServiceType"] = 75] = "GameIngameStoreServiceType";
    GameFeature[GameFeature["GameAdditionalSkills"] = 76] = "GameAdditionalSkills";
    GameFeature[GameFeature["LastGameFeature"] = 101] = "LastGameFeature";
})(GameFeature || (exports.GameFeature = GameFeature = {}));
var PathFindResult = exports.PathFindResult = undefined;
(function (PathFindResult) {
    PathFindResult[PathFindResult["PathFindResultOk"] = 0] = "PathFindResultOk";
    PathFindResult[PathFindResult["PathFindResultSamePosition"] = 1] = "PathFindResultSamePosition";
    PathFindResult[PathFindResult["PathFindResultImpossible"] = 2] = "PathFindResultImpossible";
    PathFindResult[PathFindResult["PathFindResultTooFar"] = 3] = "PathFindResultTooFar";
    PathFindResult[PathFindResult["PathFindResultNoWay"] = 4] = "PathFindResultNoWay";
})(PathFindResult || (exports.PathFindResult = PathFindResult = {}));
var PathFindFlags = exports.PathFindFlags = undefined;
(function (PathFindFlags) {
    PathFindFlags[PathFindFlags["PathFindAllowNotSeenTiles"] = 1] = "PathFindAllowNotSeenTiles";
    PathFindFlags[PathFindFlags["PathFindAllowCreatures"] = 2] = "PathFindAllowCreatures";
    PathFindFlags[PathFindFlags["PathFindAllowNonPathable"] = 4] = "PathFindAllowNonPathable";
    PathFindFlags[PathFindFlags["PathFindAllowNonWalkable"] = 8] = "PathFindAllowNonWalkable";
})(PathFindFlags || (exports.PathFindFlags = PathFindFlags = {}));
var AutomapFlags = exports.AutomapFlags = undefined;
(function (AutomapFlags) {
    AutomapFlags[AutomapFlags["MapMarkTick"] = 0] = "MapMarkTick";
    AutomapFlags[AutomapFlags["MapMarkQuestion"] = 1] = "MapMarkQuestion";
    AutomapFlags[AutomapFlags["MapMarkExclamation"] = 2] = "MapMarkExclamation";
    AutomapFlags[AutomapFlags["MapMarkStar"] = 3] = "MapMarkStar";
    AutomapFlags[AutomapFlags["MapMarkCross"] = 4] = "MapMarkCross";
    AutomapFlags[AutomapFlags["MapMarkTemple"] = 5] = "MapMarkTemple";
    AutomapFlags[AutomapFlags["MapMarkKiss"] = 6] = "MapMarkKiss";
    AutomapFlags[AutomapFlags["MapMarkShovel"] = 7] = "MapMarkShovel";
    AutomapFlags[AutomapFlags["MapMarkSword"] = 8] = "MapMarkSword";
    AutomapFlags[AutomapFlags["MapMarkFlag"] = 9] = "MapMarkFlag";
    AutomapFlags[AutomapFlags["MapMarkLock"] = 10] = "MapMarkLock";
    AutomapFlags[AutomapFlags["MapMarkBag"] = 11] = "MapMarkBag";
    AutomapFlags[AutomapFlags["MapMarkSkull"] = 12] = "MapMarkSkull";
    AutomapFlags[AutomapFlags["MapMarkDollar"] = 13] = "MapMarkDollar";
    AutomapFlags[AutomapFlags["MapMarkRedNorth"] = 14] = "MapMarkRedNorth";
    AutomapFlags[AutomapFlags["MapMarkRedSouth"] = 15] = "MapMarkRedSouth";
    AutomapFlags[AutomapFlags["MapMarkRedEast"] = 16] = "MapMarkRedEast";
    AutomapFlags[AutomapFlags["MapMarkRedWest"] = 17] = "MapMarkRedWest";
    AutomapFlags[AutomapFlags["MapMarkGreenNorth"] = 18] = "MapMarkGreenNorth";
    AutomapFlags[AutomapFlags["MapMarkGreenSouth"] = 19] = "MapMarkGreenSouth";
})(AutomapFlags || (exports.AutomapFlags = AutomapFlags = {}));
var VipState = exports.VipState = undefined;
(function (VipState) {
    VipState[VipState["VipStateOffline"] = 0] = "VipStateOffline";
    VipState[VipState["VipStateOnline"] = 1] = "VipStateOnline";
    VipState[VipState["VipStatePending"] = 2] = "VipStatePending";
})(VipState || (exports.VipState = VipState = {}));
var SpeedFormula = exports.SpeedFormula = undefined;
(function (SpeedFormula) {
    SpeedFormula[SpeedFormula["SpeedFormulaA"] = 0] = "SpeedFormulaA";
    SpeedFormula[SpeedFormula["SpeedFormulaB"] = 1] = "SpeedFormulaB";
    SpeedFormula[SpeedFormula["SpeedFormulaC"] = 2] = "SpeedFormulaC";
    SpeedFormula[SpeedFormula["LastSpeedFormula"] = 3] = "LastSpeedFormula";
})(SpeedFormula || (exports.SpeedFormula = SpeedFormula = {}));
var Blessings = exports.Blessings = undefined;
(function (Blessings) {
    Blessings[Blessings["BlessingNone"] = 0] = "BlessingNone";
    Blessings[Blessings["BlessingAdventurer"] = 1] = "BlessingAdventurer";
    Blessings[Blessings["BlessingSpiritualShielding"] = 2] = "BlessingSpiritualShielding";
    Blessings[Blessings["BlessingEmbraceOfTibia"] = 4] = "BlessingEmbraceOfTibia";
    Blessings[Blessings["BlessingFireOfSuns"] = 8] = "BlessingFireOfSuns";
    Blessings[Blessings["BlessingWisdomOfSolitude"] = 16] = "BlessingWisdomOfSolitude";
    Blessings[Blessings["BlessingSparkOfPhoenix"] = 32] = "BlessingSparkOfPhoenix";
})(Blessings || (exports.Blessings = Blessings = {}));
var DeathType = exports.DeathType = undefined;
(function (DeathType) {
    DeathType[DeathType["DeathRegular"] = 0] = "DeathRegular";
    DeathType[DeathType["DeathBlessed"] = 1] = "DeathBlessed";
})(DeathType || (exports.DeathType = DeathType = {}));
var StoreProductTypes = exports.StoreProductTypes = undefined;
(function (StoreProductTypes) {
    StoreProductTypes[StoreProductTypes["ProductTypeOther"] = 0] = "ProductTypeOther";
    StoreProductTypes[StoreProductTypes["ProductTypeNameChange"] = 1] = "ProductTypeNameChange";
})(StoreProductTypes || (exports.StoreProductTypes = StoreProductTypes = {}));
var StoreErrorTypes = exports.StoreErrorTypes = undefined;
(function (StoreErrorTypes) {
    StoreErrorTypes[StoreErrorTypes["StoreNoError"] = -1] = "StoreNoError";
    StoreErrorTypes[StoreErrorTypes["StorePurchaseError"] = 0] = "StorePurchaseError";
    StoreErrorTypes[StoreErrorTypes["StoreNetworkError"] = 1] = "StoreNetworkError";
    StoreErrorTypes[StoreErrorTypes["StoreHistoryError"] = 2] = "StoreHistoryError";
    StoreErrorTypes[StoreErrorTypes["StoreTransferError"] = 3] = "StoreTransferError";
    StoreErrorTypes[StoreErrorTypes["StoreInformation"] = 4] = "StoreInformation";
})(StoreErrorTypes || (exports.StoreErrorTypes = StoreErrorTypes = {}));
var StoreStates = exports.StoreStates = undefined;
(function (StoreStates) {
    StoreStates[StoreStates["StateNone"] = 0] = "StateNone";
    StoreStates[StoreStates["StateNew"] = 1] = "StateNew";
    StoreStates[StoreStates["StateSale"] = 2] = "StateSale";
    StoreStates[StoreStates["StateTimed"] = 3] = "StateTimed";
})(StoreStates || (exports.StoreStates = StoreStates = {}));
var FrameGroupType = exports.FrameGroupType = undefined;
(function (FrameGroupType) {
    FrameGroupType[FrameGroupType["FrameGroupDefault"] = 0] = "FrameGroupDefault";
    FrameGroupType[FrameGroupType["FrameGroupIdle"] = 0] = "FrameGroupIdle";
    FrameGroupType[FrameGroupType["FrameGroupMoving"] = 1] = "FrameGroupMoving";
})(FrameGroupType || (exports.FrameGroupType = FrameGroupType = {}));
var ThingCategory = exports.ThingCategory = undefined;
(function (ThingCategory) {
    ThingCategory[ThingCategory["ThingCategoryItem"] = 0] = "ThingCategoryItem";
    ThingCategory[ThingCategory["ThingCategoryCreature"] = 1] = "ThingCategoryCreature";
    ThingCategory[ThingCategory["ThingCategoryEffect"] = 2] = "ThingCategoryEffect";
    ThingCategory[ThingCategory["ThingCategoryMissile"] = 3] = "ThingCategoryMissile";
    ThingCategory[ThingCategory["ThingInvalidCategory"] = 4] = "ThingInvalidCategory";
    ThingCategory[ThingCategory["ThingLastCategory"] = 4] = "ThingLastCategory";
})(ThingCategory || (exports.ThingCategory = ThingCategory = {}));
var ThingAttr = exports.ThingAttr = undefined;
(function (ThingAttr) {
    ThingAttr[ThingAttr["ThingAttrGround"] = 0] = "ThingAttrGround";
    ThingAttr[ThingAttr["ThingAttrGroundBorder"] = 1] = "ThingAttrGroundBorder";
    ThingAttr[ThingAttr["ThingAttrOnBottom"] = 2] = "ThingAttrOnBottom";
    ThingAttr[ThingAttr["ThingAttrOnTop"] = 3] = "ThingAttrOnTop";
    ThingAttr[ThingAttr["ThingAttrContainer"] = 4] = "ThingAttrContainer";
    ThingAttr[ThingAttr["ThingAttrStackable"] = 5] = "ThingAttrStackable";
    ThingAttr[ThingAttr["ThingAttrForceUse"] = 6] = "ThingAttrForceUse";
    ThingAttr[ThingAttr["ThingAttrMultiUse"] = 7] = "ThingAttrMultiUse";
    ThingAttr[ThingAttr["ThingAttrWritable"] = 8] = "ThingAttrWritable";
    ThingAttr[ThingAttr["ThingAttrWritableOnce"] = 9] = "ThingAttrWritableOnce";
    ThingAttr[ThingAttr["ThingAttrFluidContainer"] = 10] = "ThingAttrFluidContainer";
    ThingAttr[ThingAttr["ThingAttrSplash"] = 11] = "ThingAttrSplash";
    ThingAttr[ThingAttr["ThingAttrNotWalkable"] = 12] = "ThingAttrNotWalkable";
    ThingAttr[ThingAttr["ThingAttrNotMoveable"] = 13] = "ThingAttrNotMoveable";
    ThingAttr[ThingAttr["ThingAttrBlockProjectile"] = 14] = "ThingAttrBlockProjectile";
    ThingAttr[ThingAttr["ThingAttrNotPathable"] = 15] = "ThingAttrNotPathable";
    ThingAttr[ThingAttr["ThingAttrPickupable"] = 16] = "ThingAttrPickupable";
    ThingAttr[ThingAttr["ThingAttrHangable"] = 17] = "ThingAttrHangable";
    ThingAttr[ThingAttr["ThingAttrHookSouth"] = 18] = "ThingAttrHookSouth";
    ThingAttr[ThingAttr["ThingAttrHookEast"] = 19] = "ThingAttrHookEast";
    ThingAttr[ThingAttr["ThingAttrRotateable"] = 20] = "ThingAttrRotateable";
    ThingAttr[ThingAttr["ThingAttrLight"] = 21] = "ThingAttrLight";
    ThingAttr[ThingAttr["ThingAttrDontHide"] = 22] = "ThingAttrDontHide";
    ThingAttr[ThingAttr["ThingAttrTranslucent"] = 23] = "ThingAttrTranslucent";
    ThingAttr[ThingAttr["ThingAttrDisplacement"] = 24] = "ThingAttrDisplacement";
    ThingAttr[ThingAttr["ThingAttrElevation"] = 25] = "ThingAttrElevation";
    ThingAttr[ThingAttr["ThingAttrLyingCorpse"] = 26] = "ThingAttrLyingCorpse";
    ThingAttr[ThingAttr["ThingAttrAnimateAlways"] = 27] = "ThingAttrAnimateAlways";
    ThingAttr[ThingAttr["ThingAttrMinimapColor"] = 28] = "ThingAttrMinimapColor";
    ThingAttr[ThingAttr["ThingAttrLensHelp"] = 29] = "ThingAttrLensHelp";
    ThingAttr[ThingAttr["ThingAttrFullGround"] = 30] = "ThingAttrFullGround";
    ThingAttr[ThingAttr["ThingAttrLook"] = 31] = "ThingAttrLook";
    ThingAttr[ThingAttr["ThingAttrCloth"] = 32] = "ThingAttrCloth";
    ThingAttr[ThingAttr["ThingAttrMarket"] = 33] = "ThingAttrMarket";
    ThingAttr[ThingAttr["ThingAttrUsable"] = 34] = "ThingAttrUsable";
    ThingAttr[ThingAttr["ThingAttrWrapable"] = 35] = "ThingAttrWrapable";
    ThingAttr[ThingAttr["ThingAttrUnwrapable"] = 36] = "ThingAttrUnwrapable";
    ThingAttr[ThingAttr["ThingAttrTopEffect"] = 37] = "ThingAttrTopEffect";
    // additional
    ThingAttr[ThingAttr["ThingAttrOpacity"] = 100] = "ThingAttrOpacity";
    ThingAttr[ThingAttr["ThingAttrNotPreWalkable"] = 101] = "ThingAttrNotPreWalkable";
    ThingAttr[ThingAttr["ThingAttrFloorChange"] = 252] = "ThingAttrFloorChange";
    ThingAttr[ThingAttr["ThingAttrNoMoveAnimation"] = 253] = "ThingAttrNoMoveAnimation";
    ThingAttr[ThingAttr["ThingAttrChargeable"] = 254] = "ThingAttrChargeable";
    ThingAttr[ThingAttr["ThingLastAttr"] = 255] = "ThingLastAttr";
})(ThingAttr || (exports.ThingAttr = ThingAttr = {}));
var SpriteMask = exports.SpriteMask = undefined;
(function (SpriteMask) {
    SpriteMask[SpriteMask["SpriteMaskRed"] = 1] = "SpriteMaskRed";
    SpriteMask[SpriteMask["SpriteMaskGreen"] = 2] = "SpriteMaskGreen";
    SpriteMask[SpriteMask["SpriteMaskBlue"] = 3] = "SpriteMaskBlue";
    SpriteMask[SpriteMask["SpriteMaskYellow"] = 4] = "SpriteMaskYellow";
})(SpriteMask || (exports.SpriteMask = SpriteMask = {}));
var AnimationPhase = exports.AnimationPhase = undefined;
(function (AnimationPhase) {
    AnimationPhase[AnimationPhase["AnimPhaseAutomatic"] = -1] = "AnimPhaseAutomatic";
    AnimationPhase[AnimationPhase["AnimPhaseRandom"] = 254] = "AnimPhaseRandom";
    AnimationPhase[AnimationPhase["AnimPhaseAsync"] = 255] = "AnimPhaseAsync";
})(AnimationPhase || (exports.AnimationPhase = AnimationPhase = {}));
var AnimationDirection = exports.AnimationDirection = undefined;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["AnimDirForward"] = 0] = "AnimDirForward";
    AnimationDirection[AnimationDirection["AnimDirBackward"] = 1] = "AnimDirBackward";
})(AnimationDirection || (exports.AnimationDirection = AnimationDirection = {}));
var Tilestate = exports.Tilestate = undefined;
(function (Tilestate) {
    Tilestate[Tilestate["TILESTATE_NONE"] = 0] = "TILESTATE_NONE";
    Tilestate[Tilestate["TILESTATE_PROTECTIONZONE"] = 1] = "TILESTATE_PROTECTIONZONE";
    Tilestate[Tilestate["TILESTATE_TRASHED"] = 2] = "TILESTATE_TRASHED";
    Tilestate[Tilestate["TILESTATE_OPTIONALZONE"] = 4] = "TILESTATE_OPTIONALZONE";
    Tilestate[Tilestate["TILESTATE_NOLOGOUT"] = 8] = "TILESTATE_NOLOGOUT";
    Tilestate[Tilestate["TILESTATE_HARDCOREZONE"] = 16] = "TILESTATE_HARDCOREZONE";
    Tilestate[Tilestate["TILESTATE_REFRESH"] = 32] = "TILESTATE_REFRESH";
    // internal usage
    Tilestate[Tilestate["TILESTATE_HOUSE"] = 64] = "TILESTATE_HOUSE";
    Tilestate[Tilestate["TILESTATE_TELEPORT"] = 131072] = "TILESTATE_TELEPORT";
    Tilestate[Tilestate["TILESTATE_MAGICFIELD"] = 262144] = "TILESTATE_MAGICFIELD";
    Tilestate[Tilestate["TILESTATE_MAILBOX"] = 524288] = "TILESTATE_MAILBOX";
    Tilestate[Tilestate["TILESTATE_TRASHHOLDER"] = 1048576] = "TILESTATE_TRASHHOLDER";
    Tilestate[Tilestate["TILESTATE_BED"] = 2097152] = "TILESTATE_BED";
    Tilestate[Tilestate["TILESTATE_DEPOT"] = 4194304] = "TILESTATE_DEPOT";
    Tilestate[Tilestate["TILESTATE_TRANSLUECENT_LIGHT"] = 8388608] = "TILESTATE_TRANSLUECENT_LIGHT";
    Tilestate[Tilestate["TILESTATE_LAST"] = 16777216] = "TILESTATE_LAST";
})(Tilestate || (exports.Tilestate = Tilestate = {}));

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(124);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Creature) {
    _inherits(Player, _Creature);

    function Player() {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
    }

    _createClass(Player, [{
        key: 'isPlayer',
        value: function isPlayer() {
            return true;
        }
    }]);

    return Player;
}(_creature.Creature);

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AwareRange = exports.AwareRange = function () {
    function AwareRange() {
        _classCallCheck(this, AwareRange);

        this.top = 6;
        this.right = 9;
        this.bottom = 7;
        this.left = 8;
    }

    _createClass(AwareRange, [{
        key: "horizontal",
        value: function horizontal() {
            return this.left + this.right + 1;
        }
    }, {
        key: "vertical",
        value: function vertical() {
            return this.top + this.bottom + 1;
        }
    }]);

    return AwareRange;
}();

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Image = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = __webpack_require__(20);

var _color = __webpack_require__(57);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = exports.Image = function () {
    function Image(size) {
        var bpp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var pixels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Image);

        this.m_pixels = [];
        this.m_size = size;
        this.m_bpp = bpp;
        if (pixels) {
            this.m_pixels = pixels.slice();
        } else {
            this.m_pixels = [];
            var bytes = size.area() * bpp;
            for (var i = 0; i < bytes; ++i) {
                this.m_pixels.push(0);
            }
        }
    }

    _createClass(Image, [{
        key: "blit",
        value: function blit(dest, other) {
            //this.m_pixels = other.m_pixels;
            //this.m_size = other.m_size;
            //console.error('blit', dest, other);
            var otherPixels = other.getPixelData();
            //console.log('blit1', other.getPixelCount(), otherPixels)
            for (var p = 0; p < other.getPixelCount(); ++p) {
                var x = (0, _helpers.toInt)(p % other.getWidth());
                var y = (0, _helpers.toInt)(p / other.getWidth());
                var pos = ((dest.y + y) * (0, _helpers.toInt)(this.m_size.width()) + (dest.x + x)) * 4;
                if (otherPixels[p * 4 + 3] != 0) {
                    this.m_pixels[pos + 0] = otherPixels[p * 4 + 0];
                    this.m_pixels[pos + 1] = otherPixels[p * 4 + 1];
                    this.m_pixels[pos + 2] = otherPixels[p * 4 + 2];
                    this.m_pixels[pos + 3] = otherPixels[p * 4 + 3];
                }
            }
            //console.log('blit2',this.getPixelCount(), this.m_pixels);
            //this.m_pixels[0] = this.m_pixels[0] + 1;
        }
    }, {
        key: "overwriteMask",
        value: function overwriteMask(color) {
            var insideColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _color.Color.white;
            var outsideColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _color.Color.alpha;
        }
    }, {
        key: "setId",
        value: function setId(id) {}
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.m_size.width();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.m_size.height();
        }
    }, {
        key: "getPixel",
        value: function getPixel(x, y) {
            return this.m_pixels.slice((y * this.m_size.width() + x) * this.m_bpp, 4);
        }
    }, {
        key: "getPixelCount",
        value: function getPixelCount() {
            return this.m_size.area();
        }
    }, {
        key: "getPixels",
        value: function getPixels() {
            return this.m_pixels;
        }
    }, {
        key: "getPixelData",
        value: function getPixelData() {
            return this.getPixels();
        }
    }], [{
        key: "load",
        value: function load(path) {
            (0, _log.error)('load image', path);
            return null;
        }
    }]);

    return Image;
}();

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_sprites = exports.SpriteManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _image = __webpack_require__(182);

var _resources = __webpack_require__(127);

var _log = __webpack_require__(20);

var _game = __webpack_require__(38);

var _const = __webpack_require__(13);

var _size = __webpack_require__(70);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var SpriteManager = exports.SpriteManager = function () {
    function SpriteManager() {
        _classCallCheck(this, SpriteManager);

        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
        this.m_spriteCache = [];
    }

    _createClass(SpriteManager, [{
        key: "loadSpr",
        value: function loadSpr(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.m_spritesCount = 0;
                                this.m_signature = 0;
                                this.m_loaded = false;
                                _context.prev = 3;

                                console.log(new Date().getTime(), 'spr');
                                _context.next = 7;
                                return _resources.g_resources.openFile(file);

                            case 7:
                                this.m_spritesFile = _context.sent;

                                this.m_signature = this.m_spritesFile.getU32();
                                this.m_spritesCount = _game.g_game.getFeature(_const.GameFeature.GameSpritesU32) ? this.m_spritesFile.getU32() : this.m_spritesFile.getU16();
                                this.m_spritesOffset = this.m_spritesFile.tell();
                                this.m_loaded = true;
                                console.log(new Date().getTime(), 'spr');
                                return _context.abrupt("return", true);

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context["catch"](3);

                                _log.Log.error("Failed to load sprites from '%s': %s", file, _context.t0);
                                return _context.abrupt("return", false);

                            case 20:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 16]]);
            }));
        }
    }, {
        key: "getSpritesCount",
        value: function getSpritesCount() {
            return this.m_spritesCount;
        }
    }, {
        key: "getSpriteImage",
        value: function getSpriteImage(id) {
            try {
                if (id == 0 || !this.m_spritesFile) return null;
                this.m_spritesFile.seek((id - 1) * 4 + this.m_spritesOffset);
                var spriteAddress = this.m_spritesFile.getU32();
                // no sprite? return an empty texture
                if (spriteAddress == 0) return null;
                if (this.m_spriteCache[spriteAddress]) {
                    return this.m_spriteCache[spriteAddress];
                }
                this.m_spritesFile.seek(spriteAddress);
                // skip color key
                this.m_spritesFile.getU8();
                this.m_spritesFile.getU8();
                this.m_spritesFile.getU8();
                var pixelDataSize = this.m_spritesFile.getU16();
                var image = new _image.Image(new _size.Size(SpriteManager.SPRITE_SIZE, SpriteManager.SPRITE_SIZE));
                var pixels = image.getPixelData();
                var writePos = 0;
                var read = 0;
                var useAlpha = _game.g_game.getFeature(_const.GameFeature.GameSpritesAlphaChannel);
                var channels = useAlpha ? 4 : 3;
                // decompress pixels
                while (read < pixelDataSize && writePos < SpriteManager.SPRITE_DATA_SIZE) {
                    var transparentPixels = this.m_spritesFile.getU16();
                    var coloredPixels = this.m_spritesFile.getU16();
                    for (var i = 0; i < transparentPixels && writePos < SpriteManager.SPRITE_DATA_SIZE; i++) {
                        pixels[writePos + 0] = 0x00;
                        pixels[writePos + 1] = 0x00;
                        pixels[writePos + 2] = 0x00;
                        pixels[writePos + 3] = 0x00;
                        writePos += 4;
                    }
                    for (var _i = 0; _i < coloredPixels && writePos < SpriteManager.SPRITE_DATA_SIZE; _i++) {
                        pixels[writePos + 0] = this.m_spritesFile.getU8();
                        pixels[writePos + 1] = this.m_spritesFile.getU8();
                        pixels[writePos + 2] = this.m_spritesFile.getU8();
                        pixels[writePos + 3] = useAlpha ? this.m_spritesFile.getU8() : 0xFF;
                        writePos += 4;
                    }
                    read += 4 + channels * coloredPixels;
                }
                // fill remaining pixels with alpha
                while (writePos < SpriteManager.SPRITE_DATA_SIZE) {
                    pixels[writePos + 0] = 0x00;
                    pixels[writePos + 1] = 0x00;
                    pixels[writePos + 2] = 0x00;
                    pixels[writePos + 3] = 0x00;
                    writePos += 4;
                }
                this.m_spriteCache[spriteAddress] = image;
                return image;
            } catch (e) {
                _log.Log.error("Failed to get sprite id %d: %s", id, e);
                return null;
            }
        }
    }]);

    return SpriteManager;
}();

SpriteManager.SPRITE_SIZE = 32;
SpriteManager.SPRITE_DATA_SIZE = SpriteManager.SPRITE_SIZE * SpriteManager.SPRITE_SIZE * 4;
var g_sprites = new SpriteManager();
exports.g_sprites = g_sprites;

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Painter = function () {
    function Painter() {
        _classCallCheck(this, Painter);

        this.app = new PIXI.Application(800, 600, { transparent: true });
        document.body.appendChild(this.app.view);
        this.app.stage.interactive = true;
        //this.container = new PIXI.particles.ParticleContainer();
        //this.app.stage.addChild(this.container);
        this.app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
        function onPointerMove(eventData) {}
    }

    _createClass(Painter, [{
        key: 'drawTexturedRect',
        value: function drawTexturedRect(dest, texture, src) {
            if (dest.isEmpty() || src.isEmpty()) {
                console.log('empty', dest.width(), dest.height(), src);
                throw new Error('empty');
                //return;
            }
            var pixiTexture = texture.getPixiTexture(src);
            var pixiSprite = new PIXI.Sprite(pixiTexture);
            pixiSprite.position.x = dest.left() + 40;
            pixiSprite.position.y = dest.top() + 30;
            pixiSprite.width = pixiTexture.width;
            pixiSprite.height = pixiTexture.height;
            if (pixiSprite.width != pixiTexture.width || pixiSprite.height != pixiTexture.height) console.log('addchild', dest, src, pixiSprite.width, pixiSprite.height, pixiTexture.width, pixiTexture.height);
            this.app.stage.addChild(pixiSprite);
            // const awareRange = g_map.getAwareRange();
            // var painterview = document.getElementById('painterview');
            // let image : Image = texture.tmp_img;
            // var el = <HTMLCanvasElement> document.getElementById("myCanvas");
            // var $ctx = el.getContext('2d');
            // var id = $ctx.createImageData(1,1);
            // for (let i = 0; i < image.getPixelCount(); ++i) {
            //
            //     let x = i % image.getWidth();
            //     let y = toInt(i / image.getWidth());
            //     let pos = ((y) * image.getWidth() + (x)) * 4;
            //     let r = image.m_pixels[pos];
            //     let g = image.m_pixels[pos+1];
            //     let b = image.m_pixels[pos+2];
            //     let a = image.m_pixels[pos+3];
            //
            //     //a=128;
            //     $ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';
            //     $ctx.fillRect(dest.x + x + 260, dest.y + y+270, 1, 1);
            // }
        }
    }]);

    return Painter;
}();

var g_painter = new Painter();
exports.g_painter = g_painter;

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(42);

var _size2 = __webpack_require__(70);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = exports.Rect = function () {
    function Rect() {
        _classCallCheck(this, Rect);

        //TRect() : x1(0), y1(0), x2(-1), y2(-1) { }
        //TRect(T x, T y, T width, T height) : x1(x), y1(y), x2(x+width-1), y2(y+height-1) { }
        //TRect(const & topLeft, const & bottomRight) : x1(topLeft.x), y1(topLeft.y), x2(bottomRight.x), y2(bottomRight.y) { }
        //TRect(const TRect<T>& other) : x1(other.x1), y1(other.y1), x2(other.x2), y2(other.y2) { }
        //TRect(T x, T y, const TSize<T>& size) : x1(x), y1(y), x2(x+size.width()-1), y2(y+size.height()-1) { }
        //TRect(const & topLeft, const TSize<T>& size) : x1(topLeft.x), y1(topLeft.y), x2(x1+size.width()-1), y2(y1+size.height()-1) { }
        //TRect(const & topLeft, int width, int height) : x1(topLeft.x), y1(topLeft.y), x2(x1+width-1), y2(y1+height-1) { }
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        if (arguments.length == 0) {
            this.x1 = 0;
            this.y1 = 0;
            this.x2 = -1;
            this.y2 = -1;
            return;
        } else if (arguments.length == 1) {
            if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof Rect) {
                var other = arguments.length <= 0 ? undefined : arguments[0];
                this.x1 = other.x1;
                this.y1 = other.y1;
                this.x2 = other.x2;
                this.y2 = other.y2;
                return;
            }
        } else if (arguments.length == 2) {
            if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof _point.Point && (arguments.length <= 1 ? undefined : arguments[1]) instanceof _point.Point) {
                var topLeft = arguments.length <= 0 ? undefined : arguments[0];
                var bottomRight = arguments.length <= 1 ? undefined : arguments[1];
                this.x1 = topLeft.x;
                this.y1 = topLeft.y;
                this.x2 = bottomRight.x;
                this.y2 = bottomRight.y;
                return;
            } else if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof _point.Point && (arguments.length <= 1 ? undefined : arguments[1]) instanceof _size2.Size) {
                var _topLeft = arguments.length <= 0 ? undefined : arguments[0];
                var size = arguments.length <= 1 ? undefined : arguments[1];
                this.x1 = _topLeft.x;
                this.y1 = _topLeft.y;
                this.x2 = this.x1 + size.width() - 1;
                this.y2 = this.y1 + size.height() - 1;
                return;
            }
        } else if (arguments.length == 3) {
            if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof _point.Point && typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) == 'number') {
                var _topLeft2 = arguments.length <= 0 ? undefined : arguments[0];
                var width = arguments.length <= 1 ? undefined : arguments[1];
                var height = arguments.length <= 2 ? undefined : arguments[2];
                this.x1 = _topLeft2.x;
                this.y1 = _topLeft2.y;
                this.x2 = this.x1 + width - 1;
                this.y2 = this.y1 + height - 1;
                return;
            } else if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number' && typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'number' && (arguments.length <= 2 ? undefined : arguments[2]) instanceof _size2.Size) {
                var x = arguments.length <= 0 ? undefined : arguments[0];
                var y = arguments.length <= 1 ? undefined : arguments[1];
                var _size = arguments.length <= 2 ? undefined : arguments[2];
                this.x1 = x;
                this.y1 = y;
                this.x2 = this.x1 + _size.width() - 1;
                this.y2 = this.y1 + _size.height() - 1;
                return;
            }
        } else if (arguments.length == 4) {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number' && typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) == 'number' && typeof (arguments.length <= 3 ? undefined : arguments[3]) == 'number') {
                var _x = arguments.length <= 0 ? undefined : arguments[0];
                var _y = arguments.length <= 1 ? undefined : arguments[1];
                var _width = arguments.length <= 2 ? undefined : arguments[2];
                var _height = arguments.length <= 3 ? undefined : arguments[3];
                this.x1 = _x;
                this.y1 = _y;
                this.x2 = this.x1 + _width - 1;
                this.y2 = this.y1 + _height - 1;
                return;
            }
        }
        throw new Error('Invalid constructor parameters.');
    }

    _createClass(Rect, [{
        key: "equals",
        value: function equals(otherRect) {
            return this.x1 == otherRect.x1 && this.y1 == otherRect.y1 && this.x2 == otherRect.x2 && this.y2 == otherRect.y2;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Rect(this);
        }
    }, {
        key: "isNull",
        value: function isNull() {
            return this.x2 == this.x1 - 1 && this.y2 == this.y1 - 1;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.x1 > this.x2 || this.y1 > this.y2;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return this.x1 <= this.x2 && this.y1 <= this.y2;
        }
    }, {
        key: "left",
        value: function left() {
            return this.x1;
        }
    }, {
        key: "top",
        value: function top() {
            return this.y1;
        }
    }, {
        key: "right",
        value: function right() {
            return this.x2;
        }
    }, {
        key: "bottom",
        value: function bottom() {
            return this.y2;
        }
    }, {
        key: "horizontalCenter",
        value: function horizontalCenter() {
            return this.x1 + (this.x2 - this.x1) / 2;
        }
    }, {
        key: "verticalCenter",
        value: function verticalCenter() {
            return this.y1 + (this.y2 - this.y1) / 2;
        }
    }, {
        key: "x",
        value: function x() {
            return this.x1;
        }
    }, {
        key: "y",
        value: function y() {
            return this.y1;
        }
    }, {
        key: "topLeft",
        value: function topLeft() {
            return new _point.Point(this.x1, this.y1);
        }
    }, {
        key: "bottomRight",
        value: function bottomRight() {
            return new _point.Point(this.x2, this.y2);
        }
    }, {
        key: "topRight",
        value: function topRight() {
            return new _point.Point(this.x2, this.y1);
        }
    }, {
        key: "bottomLeft",
        value: function bottomLeft() {
            return new _point.Point(this.x1, this.y2);
        }
    }, {
        key: "topCenter",
        value: function topCenter() {
            return new _point.Point((this.x1 + this.x2) / 2, this.y1);
        }
    }, {
        key: "bottomCenter",
        value: function bottomCenter() {
            return new _point.Point((this.x1 + this.x2) / 2, this.y2);
        }
    }, {
        key: "centerLeft",
        value: function centerLeft() {
            return new _point.Point(this.x1, (this.y1 + this.y2) / 2);
        }
    }, {
        key: "centerRight",
        value: function centerRight() {
            return new _point.Point(this.x2, (this.y1 + this.y2) / 2);
        }
    }, {
        key: "center",
        value: function center() {
            return new _point.Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
        }
    }, {
        key: "width",
        value: function width() {
            return this.x2 - this.x1 + 1;
        }
    }, {
        key: "height",
        value: function height() {
            return this.y2 - this.y1 + 1;
        }
    }, {
        key: "size",
        value: function size() {
            return new _size2.Size(this.width(), this.height());
        }
    }, {
        key: "reset",
        value: function reset() {
            this.x1 = this.y1 = 0;
            this.x2 = this.y2 = -1;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.x2 = this.x1 - 1;
            this.y2 = this.y1 - 1;
        }
    }, {
        key: "setLeft",
        value: function setLeft(pos) {
            this.x1 = pos;
        }
    }, {
        key: "setTop",
        value: function setTop(pos) {
            this.y1 = pos;
        }
    }, {
        key: "setRight",
        value: function setRight(pos) {
            this.x2 = pos;
        }
    }, {
        key: "setBottom",
        value: function setBottom(pos) {
            this.y2 = pos;
        }
    }, {
        key: "setX",
        value: function setX(x) {
            this.x1 = x;
        }
    }, {
        key: "setY",
        value: function setY(y) {
            this.y1 = y;
        }
    }, {
        key: "setTopLeft",
        value: function setTopLeft(p) {
            this.x1 = p.x;
            this.y1 = p.y;
        }
    }, {
        key: "setBottomRight",
        value: function setBottomRight(p) {
            this.x2 = p.x;
            this.y2 = p.y;
        }
    }, {
        key: "setTopRight",
        value: function setTopRight(p) {
            this.x2 = p.x;
            this.y1 = p.y;
        }
    }, {
        key: "setBottomLeft",
        value: function setBottomLeft(p) {
            this.x1 = p.x;
            this.y2 = p.y;
        }
    }, {
        key: "setWidth",
        value: function setWidth(width) {
            this.x2 = this.x1 + width - 1;
        }
    }, {
        key: "setHeight",
        value: function setHeight(height) {
            this.y2 = this.y1 + height - 1;
        }
    }, {
        key: "setSize",
        value: function setSize(size) {
            this.x2 = this.x1 + size.width() - 1;
            this.y2 = this.y1 + size.height() - 1;
        }
    }, {
        key: "setRect",
        value: function setRect(x, y, width, height) {
            this.x1 = x;
            this.y1 = y;
            this.x2 = x + width - 1;
            this.y2 = y + height - 1;
        }
    }, {
        key: "setCoords",
        value: function setCoords(left, top, right, bottom) {
            this.x1 = left;
            this.y1 = top;
            this.x2 = right;
            this.y2 = bottom;
        }
    }, {
        key: "moveLeft",
        value: function moveLeft(pos) {
            this.x2 += pos - this.x1;
            this.x1 = pos;
        }
    }, {
        key: "moveTop",
        value: function moveTop(pos) {
            this.y2 += pos - this.y1;
            this.y1 = pos;
        }
    }, {
        key: "moveRight",
        value: function moveRight(pos) {
            this.x1 += pos - this.x2;
            this.x2 = pos;
        }
    }, {
        key: "moveBottom",
        value: function moveBottom(pos) {
            this.y1 += pos - this.y2;
            this.y2 = pos;
        }
    }, {
        key: "bind",
        value: function bind(r) {
            if (this.isNull() || r.isNull()) return;
            if (this.right() > r.right()) this.moveRight(r.right());
            if (this.bottom() > r.bottom()) this.moveBottom(r.bottom());
            if (this.left() < r.left()) this.moveLeft(r.left());
            if (this.top() < r.top()) this.moveTop(r.top());
        }
    }, {
        key: "hash",
        value: function hash() {
            return this.left() + '_' + this.top() + '_' + this.right() + '_' + this.bottom();
        }
    }]);

    return Rect;
}();

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Outfit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(13);

var _color = __webpack_require__(57);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Outfit = exports.Outfit = function () {
    function Outfit() {
        _classCallCheck(this, Outfit);

        this.m_category = _const.ThingCategory.ThingCategoryCreature;
        this.m_id = 128;
        this.m_auxId = 0;
        this.resetClothes();
    }

    _createClass(Outfit, [{
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "getAuxId",
        value: function getAuxId() {
            return this.m_auxId;
        }
    }, {
        key: "getHead",
        value: function getHead() {
            return this.m_head;
        }
    }, {
        key: "getBody",
        value: function getBody() {
            return this.m_body;
        }
    }, {
        key: "getLegs",
        value: function getLegs() {
            return this.m_legs;
        }
    }, {
        key: "getFeet",
        value: function getFeet() {
            return this.m_feet;
        }
    }, {
        key: "getAddons",
        value: function getAddons() {
            return this.m_addons;
        }
    }, {
        key: "getMount",
        value: function getMount() {
            return this.m_mount;
        }
    }, {
        key: "getCategory",
        value: function getCategory() {
            return this.m_category;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "setAuxId",
        value: function setAuxId(id) {
            this.m_auxId = id;
        }
    }, {
        key: "setHead",
        value: function setHead(head) {
            this.m_head = head;
            this.m_headColor = Outfit.getColor(head);
        }
    }, {
        key: "setBody",
        value: function setBody(body) {
            this.m_body = body;
            this.m_bodyColor = Outfit.getColor(body);
        }
    }, {
        key: "setLegs",
        value: function setLegs(legs) {
            this.m_legs = legs;
            this.m_legsColor = Outfit.getColor(legs);
        }
    }, {
        key: "setFeet",
        value: function setFeet(feet) {
            this.m_feet = feet;
            this.m_feetColor = Outfit.getColor(feet);
        }
    }, {
        key: "setAddons",
        value: function setAddons(addons) {
            this.m_addons = addons;
        }
    }, {
        key: "setMount",
        value: function setMount(mount) {
            this.m_mount = mount;
        }
    }, {
        key: "setCategory",
        value: function setCategory(category) {
            this.m_category = category;
        }
    }, {
        key: "resetClothes",
        value: function resetClothes() {
            this.setHead(0);
            this.setBody(0);
            this.setLegs(0);
            this.setFeet(0);
            this.setMount(0);
        }
    }], [{
        key: "getColor",
        value: function getColor(color) {
            if (color >= Outfit.HSI_H_STEPS * Outfit.HSI_SI_VALUES) color = 0;
            var loc1 = 0,
                loc2 = 0,
                loc3 = 0;
            if (color % Outfit.HSI_H_STEPS != 0) {
                loc1 = color % Outfit.HSI_H_STEPS / 18.0;
                loc2 = 1;
                loc3 = 1;
                switch (Math.floor(color / Outfit.HSI_H_STEPS)) {
                    case 0:
                        loc2 = 0.25;
                        loc3 = 1.00;
                        break;
                    case 1:
                        loc2 = 0.25;
                        loc3 = 0.75;
                        break;
                    case 2:
                        loc2 = 0.50;
                        loc3 = 0.75;
                        break;
                    case 3:
                        loc2 = 0.667;
                        loc3 = 0.75;
                        break;
                    case 4:
                        loc2 = 1.00;
                        loc3 = 1.00;
                        break;
                    case 5:
                        loc2 = 1.00;
                        loc3 = 0.75;
                        break;
                    case 6:
                        loc2 = 1.00;
                        loc3 = 0.50;
                        break;
                }
            } else {
                loc1 = 0;
                loc2 = 0;
                loc3 = 1 - color / Outfit.HSI_H_STEPS / Outfit.HSI_SI_VALUES;
            }
            if (loc3 == 0) return new _color.Color(0, 0, 0);
            if (loc2 == 0) {
                var loc7 = Math.floor(loc3 * 255);
                return new _color.Color(loc7, loc7, loc7);
            }
            var red = 0,
                green = 0,
                blue = 0;
            if (loc1 < 1.0 / 6.0) {
                red = loc3;
                blue = loc3 * (1 - loc2);
                green = blue + (loc3 - blue) * 6 * loc1;
            } else if (loc1 < 2.0 / 6.0) {
                green = loc3;
                blue = loc3 * (1 - loc2);
                red = green - (loc3 - blue) * (6 * loc1 - 1);
            } else if (loc1 < 3.0 / 6.0) {
                green = loc3;
                red = loc3 * (1 - loc2);
                blue = red + (loc3 - red) * (6 * loc1 - 2);
            } else if (loc1 < 4.0 / 6.0) {
                blue = loc3;
                red = loc3 * (1 - loc2);
                green = blue - (loc3 - red) * (6 * loc1 - 3);
            } else if (loc1 < 5.0 / 6.0) {
                blue = loc3;
                green = loc3 * (1 - loc2);
                red = green + (loc3 - green) * (6 * loc1 - 4);
            } else {
                red = loc3;
                green = loc3 * (1 - loc2);
                blue = red - (loc3 - green) * (6 * loc1 - 5);
            }
            return new _color.Color(Math.floor(red * 255), Math.floor(green * 255), Math.floor(blue * 255));
        }
    }]);

    return Outfit;
}();

Outfit.HSI_SI_VALUES = 7;
Outfit.HSI_H_STEPS = 19;

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Proto;
(function (Proto) {
    Proto[Proto["LoginServerError"] = 10] = "LoginServerError";
    Proto[Proto["LoginServerMotd"] = 20] = "LoginServerMotd";
    Proto[Proto["LoginServerUpdateNeeded"] = 30] = "LoginServerUpdateNeeded";
    Proto[Proto["LoginServerCharacterList"] = 100] = "LoginServerCharacterList";
    Proto[Proto["StaticText"] = 96] = "StaticText";
    Proto[Proto["UnknownCreature"] = 97] = "UnknownCreature";
    Proto[Proto["OutdatedCreature"] = 98] = "OutdatedCreature";
    Proto[Proto["Creature"] = 99] = "Creature";
    Proto[Proto["GameServerLoginOrPendingState"] = 10] = "GameServerLoginOrPendingState";
    Proto[Proto["GameServerGMActions"] = 11] = "GameServerGMActions";
    Proto[Proto["GameServerEnterGame"] = 15] = "GameServerEnterGame";
    Proto[Proto["GameServerUpdateNeeded"] = 17] = "GameServerUpdateNeeded";
    Proto[Proto["GameServerLoginError"] = 20] = "GameServerLoginError";
    Proto[Proto["GameServerLoginAdvice"] = 21] = "GameServerLoginAdvice";
    Proto[Proto["GameServerLoginWait"] = 22] = "GameServerLoginWait";
    Proto[Proto["GameServerLoginSuccess"] = 23] = "GameServerLoginSuccess";
    Proto[Proto["GameServerLoginToken"] = 24] = "GameServerLoginToken";
    Proto[Proto["GameServerStoreButtonIndicators"] = 25] = "GameServerStoreButtonIndicators";
    Proto[Proto["GameServerPingBack"] = 29] = "GameServerPingBack";
    Proto[Proto["GameServerPing"] = 30] = "GameServerPing";
    Proto[Proto["GameServerChallenge"] = 31] = "GameServerChallenge";
    Proto[Proto["GameServerDeath"] = 40] = "GameServerDeath";
    Proto[Proto["GameServerFirstGameOpcode"] = 50] = "GameServerFirstGameOpcode";
    Proto[Proto["GameServerExtendedOpcode"] = 50] = "GameServerExtendedOpcode";
    Proto[Proto["GameServerChangeMapAwareRange"] = 51] = "GameServerChangeMapAwareRange";
    Proto[Proto["GameServerFullMap"] = 100] = "GameServerFullMap";
    Proto[Proto["GameServerMapTopRow"] = 101] = "GameServerMapTopRow";
    Proto[Proto["GameServerMapRightRow"] = 102] = "GameServerMapRightRow";
    Proto[Proto["GameServerMapBottomRow"] = 103] = "GameServerMapBottomRow";
    Proto[Proto["GameServerMapLeftRow"] = 104] = "GameServerMapLeftRow";
    Proto[Proto["GameServerUpdateTile"] = 105] = "GameServerUpdateTile";
    Proto[Proto["GameServerCreateOnMap"] = 106] = "GameServerCreateOnMap";
    Proto[Proto["GameServerChangeOnMap"] = 107] = "GameServerChangeOnMap";
    Proto[Proto["GameServerDeleteOnMap"] = 108] = "GameServerDeleteOnMap";
    Proto[Proto["GameServerMoveCreature"] = 109] = "GameServerMoveCreature";
    Proto[Proto["GameServerOpenContainer"] = 110] = "GameServerOpenContainer";
    Proto[Proto["GameServerCloseContainer"] = 111] = "GameServerCloseContainer";
    Proto[Proto["GameServerCreateContainer"] = 112] = "GameServerCreateContainer";
    Proto[Proto["GameServerChangeInContainer"] = 113] = "GameServerChangeInContainer";
    Proto[Proto["GameServerDeleteInContainer"] = 114] = "GameServerDeleteInContainer";
    Proto[Proto["GameServerSetInventory"] = 120] = "GameServerSetInventory";
    Proto[Proto["GameServerDeleteInventory"] = 121] = "GameServerDeleteInventory";
    Proto[Proto["GameServerOpenNpcTrade"] = 122] = "GameServerOpenNpcTrade";
    Proto[Proto["GameServerPlayerGoods"] = 123] = "GameServerPlayerGoods";
    Proto[Proto["GameServerCloseNpcTrade"] = 124] = "GameServerCloseNpcTrade";
    Proto[Proto["GameServerOwnTrade"] = 125] = "GameServerOwnTrade";
    Proto[Proto["GameServerCounterTrade"] = 126] = "GameServerCounterTrade";
    Proto[Proto["GameServerCloseTrade"] = 127] = "GameServerCloseTrade";
    Proto[Proto["GameServerAmbient"] = 130] = "GameServerAmbient";
    Proto[Proto["GameServerGraphicalEffect"] = 131] = "GameServerGraphicalEffect";
    Proto[Proto["GameServerTextEffect"] = 132] = "GameServerTextEffect";
    Proto[Proto["GameServerMissleEffect"] = 133] = "GameServerMissleEffect";
    Proto[Proto["GameServerMarkCreature"] = 134] = "GameServerMarkCreature";
    Proto[Proto["GameServerTrappers"] = 135] = "GameServerTrappers";
    Proto[Proto["GameServerCreatureHealth"] = 140] = "GameServerCreatureHealth";
    Proto[Proto["GameServerCreatureLight"] = 141] = "GameServerCreatureLight";
    Proto[Proto["GameServerCreatureOutfit"] = 142] = "GameServerCreatureOutfit";
    Proto[Proto["GameServerCreatureSpeed"] = 143] = "GameServerCreatureSpeed";
    Proto[Proto["GameServerCreatureSkull"] = 144] = "GameServerCreatureSkull";
    Proto[Proto["GameServerCreatureParty"] = 145] = "GameServerCreatureParty";
    Proto[Proto["GameServerCreatureUnpass"] = 146] = "GameServerCreatureUnpass";
    Proto[Proto["GameServerCreatureMarks"] = 147] = "GameServerCreatureMarks";
    Proto[Proto["GameServerPlayerHelpers"] = 148] = "GameServerPlayerHelpers";
    Proto[Proto["GameServerCreatureType"] = 149] = "GameServerCreatureType";
    Proto[Proto["GameServerEditText"] = 150] = "GameServerEditText";
    Proto[Proto["GameServerEditList"] = 151] = "GameServerEditList";
    Proto[Proto["GameServerBlessings"] = 156] = "GameServerBlessings";
    Proto[Proto["GameServerPreset"] = 157] = "GameServerPreset";
    Proto[Proto["GameServerPremiumTrigger"] = 158] = "GameServerPremiumTrigger";
    Proto[Proto["GameServerPlayerDataBasic"] = 159] = "GameServerPlayerDataBasic";
    Proto[Proto["GameServerPlayerData"] = 160] = "GameServerPlayerData";
    Proto[Proto["GameServerPlayerSkills"] = 161] = "GameServerPlayerSkills";
    Proto[Proto["GameServerPlayerState"] = 162] = "GameServerPlayerState";
    Proto[Proto["GameServerClearTarget"] = 163] = "GameServerClearTarget";
    Proto[Proto["GameServerPlayerModes"] = 167] = "GameServerPlayerModes";
    Proto[Proto["GameServerSpellDelay"] = 164] = "GameServerSpellDelay";
    Proto[Proto["GameServerSpellGroupDelay"] = 165] = "GameServerSpellGroupDelay";
    Proto[Proto["GameServerMultiUseDelay"] = 166] = "GameServerMultiUseDelay";
    Proto[Proto["GameServerSetStoreDeepLink"] = 168] = "GameServerSetStoreDeepLink";
    Proto[Proto["GameServerTalk"] = 170] = "GameServerTalk";
    Proto[Proto["GameServerChannels"] = 171] = "GameServerChannels";
    Proto[Proto["GameServerOpenChannel"] = 172] = "GameServerOpenChannel";
    Proto[Proto["GameServerOpenPrivateChannel"] = 173] = "GameServerOpenPrivateChannel";
    Proto[Proto["GameServerRuleViolationChannel"] = 174] = "GameServerRuleViolationChannel";
    Proto[Proto["GameServerRuleViolationRemove"] = 175] = "GameServerRuleViolationRemove";
    Proto[Proto["GameServerRuleViolationCancel"] = 176] = "GameServerRuleViolationCancel";
    Proto[Proto["GameServerRuleViolationLock"] = 177] = "GameServerRuleViolationLock";
    Proto[Proto["GameServerOpenOwnChannel"] = 178] = "GameServerOpenOwnChannel";
    Proto[Proto["GameServerCloseChannel"] = 179] = "GameServerCloseChannel";
    Proto[Proto["GameServerTextMessage"] = 180] = "GameServerTextMessage";
    Proto[Proto["GameServerCancelWalk"] = 181] = "GameServerCancelWalk";
    Proto[Proto["GameServerWalkWait"] = 182] = "GameServerWalkWait";
    Proto[Proto["GameServerUnjustifiedStats"] = 183] = "GameServerUnjustifiedStats";
    Proto[Proto["GameServerPvpSituations"] = 184] = "GameServerPvpSituations";
    Proto[Proto["GameServerFloorChangeUp"] = 190] = "GameServerFloorChangeUp";
    Proto[Proto["GameServerFloorChangeDown"] = 191] = "GameServerFloorChangeDown";
    Proto[Proto["GameServerChooseOutfit"] = 200] = "GameServerChooseOutfit";
    Proto[Proto["GameServerVipAdd"] = 210] = "GameServerVipAdd";
    Proto[Proto["GameServerVipState"] = 211] = "GameServerVipState";
    Proto[Proto["GameServerVipLogout"] = 212] = "GameServerVipLogout";
    Proto[Proto["GameServerTutorialHint"] = 220] = "GameServerTutorialHint";
    Proto[Proto["GameServerAutomapFlag"] = 221] = "GameServerAutomapFlag";
    Proto[Proto["GameServerCoinBalance"] = 223] = "GameServerCoinBalance";
    Proto[Proto["GameServerStoreError"] = 224] = "GameServerStoreError";
    Proto[Proto["GameServerRequestPurchaseData"] = 225] = "GameServerRequestPurchaseData";
    Proto[Proto["GameServerQuestLog"] = 240] = "GameServerQuestLog";
    Proto[Proto["GameServerQuestLine"] = 241] = "GameServerQuestLine";
    Proto[Proto["GameServerCoinBalanceUpdating"] = 242] = "GameServerCoinBalanceUpdating";
    Proto[Proto["GameServerChannelEvent"] = 243] = "GameServerChannelEvent";
    Proto[Proto["GameServerItemInfo"] = 244] = "GameServerItemInfo";
    Proto[Proto["GameServerPlayerInventory"] = 245] = "GameServerPlayerInventory";
    Proto[Proto["GameServerMarketEnter"] = 246] = "GameServerMarketEnter";
    Proto[Proto["GameServerMarketLeave"] = 247] = "GameServerMarketLeave";
    Proto[Proto["GameServerMarketDetail"] = 248] = "GameServerMarketDetail";
    Proto[Proto["GameServerMarketBrowse"] = 249] = "GameServerMarketBrowse";
    Proto[Proto["GameServerModalDialog"] = 250] = "GameServerModalDialog";
    Proto[Proto["GameServerStore"] = 251] = "GameServerStore";
    Proto[Proto["GameServerStoreOffers"] = 252] = "GameServerStoreOffers";
    Proto[Proto["GameServerStoreTransactionHistory"] = 253] = "GameServerStoreTransactionHistory";
    Proto[Proto["GameServerStoreCompletePurchase"] = 254] = "GameServerStoreCompletePurchase";
    Proto[Proto["ClientEnterAccount"] = 1] = "ClientEnterAccount";
    Proto[Proto["ClientPendingGame"] = 10] = "ClientPendingGame";
    Proto[Proto["ClientEnterGame"] = 15] = "ClientEnterGame";
    Proto[Proto["ClientLeaveGame"] = 20] = "ClientLeaveGame";
    Proto[Proto["ClientPing"] = 29] = "ClientPing";
    Proto[Proto["ClientPingBack"] = 30] = "ClientPingBack";
    Proto[Proto["ClientFirstGameOpcode"] = 50] = "ClientFirstGameOpcode";
    Proto[Proto["ClientExtendedOpcode"] = 50] = "ClientExtendedOpcode";
    Proto[Proto["ClientChangeMapAwareRange"] = 51] = "ClientChangeMapAwareRange";
    Proto[Proto["ClientAutoWalk"] = 100] = "ClientAutoWalk";
    Proto[Proto["ClientWalkNorth"] = 101] = "ClientWalkNorth";
    Proto[Proto["ClientWalkEast"] = 102] = "ClientWalkEast";
    Proto[Proto["ClientWalkSouth"] = 103] = "ClientWalkSouth";
    Proto[Proto["ClientWalkWest"] = 104] = "ClientWalkWest";
    Proto[Proto["ClientStop"] = 105] = "ClientStop";
    Proto[Proto["ClientWalkNorthEast"] = 106] = "ClientWalkNorthEast";
    Proto[Proto["ClientWalkSouthEast"] = 107] = "ClientWalkSouthEast";
    Proto[Proto["ClientWalkSouthWest"] = 108] = "ClientWalkSouthWest";
    Proto[Proto["ClientWalkNorthWest"] = 109] = "ClientWalkNorthWest";
    Proto[Proto["ClientTurnNorth"] = 111] = "ClientTurnNorth";
    Proto[Proto["ClientTurnEast"] = 112] = "ClientTurnEast";
    Proto[Proto["ClientTurnSouth"] = 113] = "ClientTurnSouth";
    Proto[Proto["ClientTurnWest"] = 114] = "ClientTurnWest";
    Proto[Proto["ClientEquipItem"] = 119] = "ClientEquipItem";
    Proto[Proto["ClientMove"] = 120] = "ClientMove";
    Proto[Proto["ClientInspectNpcTrade"] = 121] = "ClientInspectNpcTrade";
    Proto[Proto["ClientBuyItem"] = 122] = "ClientBuyItem";
    Proto[Proto["ClientSellItem"] = 123] = "ClientSellItem";
    Proto[Proto["ClientCloseNpcTrade"] = 124] = "ClientCloseNpcTrade";
    Proto[Proto["ClientRequestTrade"] = 125] = "ClientRequestTrade";
    Proto[Proto["ClientInspectTrade"] = 126] = "ClientInspectTrade";
    Proto[Proto["ClientAcceptTrade"] = 127] = "ClientAcceptTrade";
    Proto[Proto["ClientRejectTrade"] = 128] = "ClientRejectTrade";
    Proto[Proto["ClientUseItem"] = 130] = "ClientUseItem";
    Proto[Proto["ClientUseItemWith"] = 131] = "ClientUseItemWith";
    Proto[Proto["ClientUseOnCreature"] = 132] = "ClientUseOnCreature";
    Proto[Proto["ClientRotateItem"] = 133] = "ClientRotateItem";
    Proto[Proto["ClientCloseContainer"] = 135] = "ClientCloseContainer";
    Proto[Proto["ClientUpContainer"] = 136] = "ClientUpContainer";
    Proto[Proto["ClientEditText"] = 137] = "ClientEditText";
    Proto[Proto["ClientEditList"] = 138] = "ClientEditList";
    Proto[Proto["ClientLook"] = 140] = "ClientLook";
    Proto[Proto["ClientLookCreature"] = 141] = "ClientLookCreature";
    Proto[Proto["ClientTalk"] = 150] = "ClientTalk";
    Proto[Proto["ClientRequestChannels"] = 151] = "ClientRequestChannels";
    Proto[Proto["ClientJoinChannel"] = 152] = "ClientJoinChannel";
    Proto[Proto["ClientLeaveChannel"] = 153] = "ClientLeaveChannel";
    Proto[Proto["ClientOpenPrivateChannel"] = 154] = "ClientOpenPrivateChannel";
    Proto[Proto["ClientOpenRuleViolation"] = 155] = "ClientOpenRuleViolation";
    Proto[Proto["ClientCloseRuleViolation"] = 156] = "ClientCloseRuleViolation";
    Proto[Proto["ClientCancelRuleViolation"] = 157] = "ClientCancelRuleViolation";
    Proto[Proto["ClientCloseNpcChannel"] = 158] = "ClientCloseNpcChannel";
    Proto[Proto["ClientChangeFightModes"] = 160] = "ClientChangeFightModes";
    Proto[Proto["ClientAttack"] = 161] = "ClientAttack";
    Proto[Proto["ClientFollow"] = 162] = "ClientFollow";
    Proto[Proto["ClientInviteToParty"] = 163] = "ClientInviteToParty";
    Proto[Proto["ClientJoinParty"] = 164] = "ClientJoinParty";
    Proto[Proto["ClientRevokeInvitation"] = 165] = "ClientRevokeInvitation";
    Proto[Proto["ClientPassLeadership"] = 166] = "ClientPassLeadership";
    Proto[Proto["ClientLeaveParty"] = 167] = "ClientLeaveParty";
    Proto[Proto["ClientShareExperience"] = 168] = "ClientShareExperience";
    Proto[Proto["ClientDisbandParty"] = 169] = "ClientDisbandParty";
    Proto[Proto["ClientOpenOwnChannel"] = 170] = "ClientOpenOwnChannel";
    Proto[Proto["ClientInviteToOwnChannel"] = 171] = "ClientInviteToOwnChannel";
    Proto[Proto["ClientExcludeFromOwnChannel"] = 172] = "ClientExcludeFromOwnChannel";
    Proto[Proto["ClientCancelAttackAndFollow"] = 190] = "ClientCancelAttackAndFollow";
    Proto[Proto["ClientUpdateTile"] = 201] = "ClientUpdateTile";
    Proto[Proto["ClientRefreshContainer"] = 202] = "ClientRefreshContainer";
    Proto[Proto["ClientBrowseField"] = 203] = "ClientBrowseField";
    Proto[Proto["ClientSeekInContainer"] = 204] = "ClientSeekInContainer";
    Proto[Proto["ClientRequestOutfit"] = 210] = "ClientRequestOutfit";
    Proto[Proto["ClientChangeOutfit"] = 211] = "ClientChangeOutfit";
    Proto[Proto["ClientMount"] = 212] = "ClientMount";
    Proto[Proto["ClientAddVip"] = 220] = "ClientAddVip";
    Proto[Proto["ClientRemoveVip"] = 221] = "ClientRemoveVip";
    Proto[Proto["ClientEditVip"] = 222] = "ClientEditVip";
    Proto[Proto["ClientBugReport"] = 230] = "ClientBugReport";
    Proto[Proto["ClientRuleViolation"] = 231] = "ClientRuleViolation";
    Proto[Proto["ClientDebugReport"] = 232] = "ClientDebugReport";
    Proto[Proto["ClientTransferCoins"] = 239] = "ClientTransferCoins";
    Proto[Proto["ClientRequestQuestLog"] = 240] = "ClientRequestQuestLog";
    Proto[Proto["ClientRequestQuestLine"] = 241] = "ClientRequestQuestLine";
    Proto[Proto["ClientNewRuleViolation"] = 242] = "ClientNewRuleViolation";
    Proto[Proto["ClientRequestItemInfo"] = 243] = "ClientRequestItemInfo";
    Proto[Proto["ClientMarketLeave"] = 244] = "ClientMarketLeave";
    Proto[Proto["ClientMarketBrowse"] = 245] = "ClientMarketBrowse";
    Proto[Proto["ClientMarketCreate"] = 246] = "ClientMarketCreate";
    Proto[Proto["ClientMarketCancel"] = 247] = "ClientMarketCancel";
    Proto[Proto["ClientMarketAccept"] = 248] = "ClientMarketAccept";
    Proto[Proto["ClientAnswerModalDialog"] = 249] = "ClientAnswerModalDialog";
    Proto[Proto["ClientOpenStore"] = 250] = "ClientOpenStore";
    Proto[Proto["ClientRequestStoreOffers"] = 251] = "ClientRequestStoreOffers";
    Proto[Proto["ClientBuyStoreOffer"] = 252] = "ClientBuyStoreOffer";
    Proto[Proto["ClientOpenTransactionHistory"] = 253] = "ClientOpenTransactionHistory";
    Proto[Proto["ClientRequestTransactionHistory"] = 254] = "ClientRequestTransactionHistory";
    Proto[Proto["CreatureTypePlayer"] = 0] = "CreatureTypePlayer";
    Proto[Proto["CreatureTypeMonster"] = 1] = "CreatureTypeMonster";
    Proto[Proto["CreatureTypeNpc"] = 2] = "CreatureTypeNpc";
    Proto[Proto["CreatureTypeSummonOwn"] = 3] = "CreatureTypeSummonOwn";
    Proto[Proto["CreatureTypeSummonOther"] = 4] = "CreatureTypeSummonOther";
    Proto[Proto["CreatureTypeUnknown"] = 255] = "CreatureTypeUnknown";
    Proto[Proto["PlayerStartId"] = 268435456] = "PlayerStartId";
    Proto[Proto["PlayerEndId"] = 1073741824] = "PlayerEndId";
    Proto[Proto["MonsterStartId"] = 1073741824] = "MonsterStartId";
    Proto[Proto["MonsterEndId"] = 2147483648] = "MonsterEndId";
    Proto[Proto["NpcStartId"] = 2147483648] = "NpcStartId";
    Proto[Proto["NpcEndId"] = 4294967295] = "NpcEndId";
})(Proto || (exports.Proto = Proto = {}));
exports.Proto = Proto;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binarydatareader = __webpack_require__(128);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputMessage = exports.InputMessage = function (_BinaryDataReader) {
    _inherits(InputMessage, _BinaryDataReader);

    function InputMessage() {
        _classCallCheck(this, InputMessage);

        return _possibleConstructorReturn(this, (InputMessage.__proto__ || Object.getPrototypeOf(InputMessage)).apply(this, arguments));
    }

    _createClass(InputMessage, [{
        key: "validateChecksum",
        value: function validateChecksum() {
            return true;
        }
    }]);

    return InputMessage;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaticText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

var _rect = __webpack_require__(185);

var _point = __webpack_require__(42);

var _color = __webpack_require__(57);

var _const = __webpack_require__(13);

var _cachedtext = __webpack_require__(129);

var _g_clock = __webpack_require__(93);

var _map = __webpack_require__(55);

var _log = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticText = exports.StaticText = function (_Thing) {
    _inherits(StaticText, _Thing);

    function StaticText() {
        _classCallCheck(this, StaticText);

        var _this = _possibleConstructorReturn(this, (StaticText.__proto__ || Object.getPrototypeOf(StaticText)).apply(this, arguments));

        _this.m_yell = false;
        /*std::deque<std::pair<std::string, ticks_t>>*/
        _this.m_messages = [];
        _this.m_cachedText = new _cachedtext.CachedText();
        _this.m_updateEvent = null;
        return _this;
    }

    _createClass(StaticText, [{
        key: "drawText",
        value: function drawText(dest, parentRect) {
            var textSize = this.m_cachedText.getTextSize();
            var rect = new _rect.Rect(dest.sub(new _point.Point(textSize.width() / 2, textSize.height())).add(new _point.Point(20, 5)), textSize);
            var boundRect = rect.clone();
            boundRect.bind(parentRect);
            //g_painter->setColor(m_color);
            this.m_cachedText.draw(boundRect);
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.m_name;
        }
    }, {
        key: "getMessageMode",
        value: function getMessageMode() {
            return this.m_mode;
        }
    }, {
        key: "getFirstMessage",
        value: function getFirstMessage() {
            return this.m_messages[0][0];
        }
    }, {
        key: "isYell",
        value: function isYell() {
            return this.m_mode == _const.MessageMode.MessageYell || this.m_mode == _const.MessageMode.MessageMonsterYell || this.m_mode == _const.MessageMode.MessageBarkLoud;
        }
    }, {
        key: "setText",
        value: function setText(text) {
            this.m_cachedText.setText(text);
        }
    }, {
        key: "setFont",
        value: function setFont(fontName) {
            this.m_cachedText.setFont(fontName);
        }
    }, {
        key: "addMessage",
        value: function addMessage(name, mode, text) {
            if (this.m_messages.length == 0) {
                this.m_name = name;
                this.m_mode = mode;
            } else if (this.m_name != name || this.m_mode != mode) {
                return false;
            } else if (this.m_messages.length > 10) {
                this.m_messages.shift();
                clearTimeout(this.m_updateEvent);
                this.m_updateEvent = null;
            }
            var delay = Math.max(_const.Otc.STATIC_DURATION_PER_CHARACTER * text.length, _const.Otc.MIN_STATIC_TEXT_DURATION);
            if (this.isYell()) delay *= 2;
            this.m_messages.push([text, _g_clock.g_clock.millis() + delay]);
            this.compose();
            if (!this.m_updateEvent) this.scheduleUpdate();
            return true;
        }
    }, {
        key: "asStaticText",
        value: function asStaticText() {
            return this;
        }
    }, {
        key: "isStaticText",
        value: function isStaticText() {
            return true;
        }
    }, {
        key: "setColor",
        value: function setColor(color) {
            this.m_color = color;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this.m_color;
        }
    }, {
        key: "update",
        value: function update() {
            this.m_messages.shift();
            if (this.m_messages.length == 0) {
                // schedule removal
                var self = this.asStaticText();
                setTimeout(function (self) {
                    _map.g_map.removeThing(self);
                }, 0, self);
            } else {
                this.compose();
                this.scheduleUpdate();
            }
        }
    }, {
        key: "scheduleUpdate",
        value: function scheduleUpdate() {
            var delay = Math.max(this.m_messages[0][1] - _g_clock.g_clock.millis(), 0);
            var self = this.asStaticText();
            this.m_updateEvent = setTimeout(function (self) {
                self.m_updateEvent = null;
                self.update();
            }, delay, self);
        }
    }, {
        key: "compose",
        value: function compose() {
            //TODO: this could be moved to lua
            var text = void 0;
            if (this.m_mode == _const.MessageMode.MessageSay) {
                text += this.m_name;
                text += " says:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageWhisper) {
                text += this.m_name;
                text += " whispers:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageYell) {
                text += this.m_name;
                text += " yells:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageMonsterSay || this.m_mode == _const.MessageMode.MessageMonsterYell || this.m_mode == _const.MessageMode.MessageSpell || this.m_mode == _const.MessageMode.MessageBarkLow || this.m_mode == _const.MessageMode.MessageBarkLoud) {
                this.m_color = new _color.Color(254, 101, 0);
            } else if (this.m_mode == _const.MessageMode.MessageNpcFrom || this.m_mode == _const.MessageMode.MessageNpcFromStartBlock) {
                text += this.m_name;
                text += " says:\n";
                this.m_color = new _color.Color(95, 247, 247);
            } else {
                _log.Log.error("Unknown speak type: %d", this.m_mode);
            }
            for (var i = 0; i < this.m_messages.length; ++i) {
                text += this.m_messages[i][0];
                if (i < this.m_messages.length - 1) text += "\n";
            }
            this.m_cachedText.setText(text);
            this.m_cachedText.wrapText(275);
        }
    }]);

    return StaticText;
}(_thing.Thing);

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = function log() {
    for (var _len = arguments.length, v = Array(_len), _key = 0; _key < _len; _key++) {
        v[_key] = arguments[_key];
    }

    console.log.apply(this, v);
    //$('#status').text(v.join(','));
};
var error = function error() {
    for (var _len2 = arguments.length, v = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        v[_key2] = arguments[_key2];
    }

    console.error.apply(this, v);
    //$('#status').text(v.join(','));
};

var Log = exports.Log = function () {
    function Log() {
        _classCallCheck(this, Log);
    }

    _createClass(Log, null, [{
        key: "log",
        value: function log() {
            for (var _len3 = arguments.length, v = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                v[_key3] = arguments[_key3];
            }

            console.log.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }, {
        key: "debug",
        value: function debug() {
            for (var _len4 = arguments.length, v = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                v[_key4] = arguments[_key4];
            }

            console.log.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }, {
        key: "error",
        value: function error() {
            for (var _len5 = arguments.length, v = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                v[_key5] = arguments[_key5];
            }

            console.error.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }]);

    return Log;
}();

exports.log = log;
exports.error = error;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(242);
module.exports = __webpack_require__(444);


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_game = exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _localplayer = __webpack_require__(445);

var _const = __webpack_require__(13);

var _thingtypemanager = __webpack_require__(63);

var _protocolgame = __webpack_require__(455);

var _map = __webpack_require__(55);

var _container = __webpack_require__(465);

var _chatbox = __webpack_require__(466);

var _spritemanager = __webpack_require__(183);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.m_clientVersion = 0;
        this.messageModesMap = {};
        this.m_features = [];
        this.m_localPlayer = new _localplayer.LocalPlayer();
    }

    _createClass(Game, [{
        key: "processCloseChannel",
        value: function processCloseChannel(channelId) {
            _chatbox.g_chat.removeTab(channelId);
        }
    }, {
        key: "processOpenChannel",
        value: function processOpenChannel(channelId, name) {
            _chatbox.g_chat.addChannel(name, channelId);
        }
    }, {
        key: "processOpenOwnPrivateChannel",
        value: function processOpenOwnPrivateChannel(channelId, name) {
            _chatbox.g_chat.addChannel(name, channelId);
        }
    }, {
        key: "processTalk",
        value: function processTalk(name, level, mode, message, channelId, creaturePos) {
            //console.log('Game.processTalk', name, level, mode, message, channelId, creaturePos);
            _chatbox.g_chat.handleMessage(name, level, mode, message, channelId, creaturePos);
        }
    }, {
        key: "setClientVersion",
        value: function setClientVersion(version) {
            this.m_clientVersion = version;
            this.updateMessageModesMap(version);
            this.updateFeatures(version);
        }
    }, {
        key: "loadDatFile",
        value: function loadDatFile(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _thingtypemanager.g_things.loadDat(file);

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "loadSprFile",
        value: function loadSprFile(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _spritemanager.g_sprites.loadSpr(file);

                            case 2:
                                return _context2.abrupt("return", _context2.sent);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "updateMessageModesMap",
        value: function updateMessageModesMap(version) {
            this.messageModesMap = {};
            if (version >= 1094) {
                this.messageModesMap[_const.MessageMode.MessageMana] = 43;
            }
            if (version >= 1055) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 4;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 5;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 8;
                this.messageModesMap[_const.MessageMode.MessageSpell] = 9;
                this.messageModesMap[_const.MessageMode.MessageNpcFromStartBlock] = 10;
                this.messageModesMap[_const.MessageMode.MessageNpcFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 12;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 13;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 14;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 15;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 16;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 17;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 18; // Admin
                this.messageModesMap[_const.MessageMode.MessageGame] = 19;
                this.messageModesMap[_const.MessageMode.MessageGameHighlight] = 20;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 21;
                this.messageModesMap[_const.MessageMode.MessageLook] = 22;
                this.messageModesMap[_const.MessageMode.MessageDamageDealed] = 23;
                this.messageModesMap[_const.MessageMode.MessageDamageReceived] = 24;
                this.messageModesMap[_const.MessageMode.MessageHeal] = 25;
                this.messageModesMap[_const.MessageMode.MessageExp] = 26;
                this.messageModesMap[_const.MessageMode.MessageDamageOthers] = 27;
                this.messageModesMap[_const.MessageMode.MessageHealOthers] = 28;
                this.messageModesMap[_const.MessageMode.MessageExpOthers] = 29;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 30;
                this.messageModesMap[_const.MessageMode.MessageLoot] = 31;
                this.messageModesMap[_const.MessageMode.MessageTradeNpc] = 32;
                this.messageModesMap[_const.MessageMode.MessageGuild] = 33;
                this.messageModesMap[_const.MessageMode.MessagePartyManagement] = 34;
                this.messageModesMap[_const.MessageMode.MessageParty] = 35;
                this.messageModesMap[_const.MessageMode.MessageBarkLow] = 36;
                this.messageModesMap[_const.MessageMode.MessageBarkLoud] = 37;
                this.messageModesMap[_const.MessageMode.MessageReport] = 38;
                this.messageModesMap[_const.MessageMode.MessageHotkeyUse] = 39;
                this.messageModesMap[_const.MessageMode.MessageTutorialHint] = 40;
                this.messageModesMap[_const.MessageMode.MessageThankyou] = 41;
                this.messageModesMap[_const.MessageMode.MessageMarket] = 42;
            } else if (version >= 1036) {
                for (var i = _const.MessageMode.MessageNone; i <= _const.MessageMode.MessageBeyondLast; ++i) {
                    if (i >= _const.MessageMode.MessageNpcTo) this.messageModesMap[i] = i + 1;else this.messageModesMap[i] = i;
                }
            } else if (version >= 900) {
                for (var _i = _const.MessageMode.MessageNone; _i <= _const.MessageMode.MessageBeyondLast; ++_i) {
                    this.messageModesMap[_i] = _i;
                }
            } else if (version >= 861) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageNpcFrom] = 5;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 6;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 8;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 9;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 10;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 11;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 12;
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 13;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 14;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 15;
                this.messageModesMap[_const.MessageMode.MessageGame] = 16;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 17;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 18;
                this.messageModesMap[_const.MessageMode.MessageLook] = 19;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 20;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 21;
                this.messageModesMap[_const.MessageMode.MessageRed] = 22;
            } else if (version >= 840) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageNpcFromStartBlock] = 5;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 6;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 8;
                this.messageModesMap[_const.MessageMode.MessageRVRChannel] = 9;
                this.messageModesMap[_const.MessageMode.MessageRVRAnswer] = 10;
                this.messageModesMap[_const.MessageMode.MessageRVRContinue] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 12;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 13;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 14;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 14;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 15;
                // 16, 17 ??
                this.messageModesMap[_const.MessageMode.MessageRed] = 18;
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 19;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 20;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 21;
                this.messageModesMap[_const.MessageMode.MessageGame] = 22;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 23;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 24;
                this.messageModesMap[_const.MessageMode.MessageLook] = 25;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 26;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 27;
            } else if (version >= 760) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 4;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 5;
                this.messageModesMap[_const.MessageMode.MessageRVRChannel] = 6;
                this.messageModesMap[_const.MessageMode.MessageRVRAnswer] = 7;
                this.messageModesMap[_const.MessageMode.MessageRVRContinue] = 8;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 9;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 10;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 11;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 12;
                // 13, 14, 15 ??
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 16;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 17;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 18;
                this.messageModesMap[_const.MessageMode.MessageGame] = 19;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 20;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 21;
                this.messageModesMap[_const.MessageMode.MessageLook] = 22;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 23;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 24;
                this.messageModesMap[_const.MessageMode.MessageRed] = 25;
            }
        }
    }, {
        key: "updateFeatures",
        value: function updateFeatures(version) {
            this.m_features = [];
            this.enableFeature(_const.GameFeature.GameFormatCreatureName);
            if (version >= 770) {
                this.enableFeature(_const.GameFeature.GameLooktypeU16);
                this.enableFeature(_const.GameFeature.GameMessageStatements);
                this.enableFeature(_const.GameFeature.GameLoginPacketEncryption);
            }
            if (version >= 780) {
                this.enableFeature(_const.GameFeature.GamePlayerAddons);
                this.enableFeature(_const.GameFeature.GamePlayerStamina);
                this.enableFeature(_const.GameFeature.GameNewFluids);
                this.enableFeature(_const.GameFeature.GameMessageLevel);
                this.enableFeature(_const.GameFeature.GamePlayerStateU16);
                this.enableFeature(_const.GameFeature.GameNewOutfitProtocol);
            }
            if (version >= 790) {
                this.enableFeature(_const.GameFeature.GameWritableDate);
            }
            if (version >= 840) {
                this.enableFeature(_const.GameFeature.GameProtocolChecksum);
                this.enableFeature(_const.GameFeature.GameAccountNames);
                this.enableFeature(_const.GameFeature.GameDoubleFreeCapacity);
            }
            if (version >= 841) {
                this.enableFeature(_const.GameFeature.GameChallengeOnLogin);
                this.enableFeature(_const.GameFeature.GameMessageSizeCheck);
            }
            if (version >= 854) {
                this.enableFeature(_const.GameFeature.GameCreatureEmblems);
            }
            if (version >= 860) {
                this.enableFeature(_const.GameFeature.GameAttackSeq);
            }
            if (version >= 862) {
                this.enableFeature(_const.GameFeature.GamePenalityOnDeath);
            }
            if (version >= 870) {
                this.enableFeature(_const.GameFeature.GameDoubleExperience);
                this.enableFeature(_const.GameFeature.GamePlayerMounts);
                this.enableFeature(_const.GameFeature.GameSpellList);
            }
            if (version >= 910) {
                this.enableFeature(_const.GameFeature.GameNameOnNpcTrade);
                this.enableFeature(_const.GameFeature.GameTotalCapacity);
                this.enableFeature(_const.GameFeature.GameSkillsBase);
                this.enableFeature(_const.GameFeature.GamePlayerRegenerationTime);
                this.enableFeature(_const.GameFeature.GameChannelPlayerList);
                this.enableFeature(_const.GameFeature.GameEnvironmentEffect);
                this.enableFeature(_const.GameFeature.GameItemAnimationPhase);
            }
            if (version >= 940) {
                this.enableFeature(_const.GameFeature.GamePlayerMarket);
            }
            if (version >= 953) {
                this.enableFeature(_const.GameFeature.GamePurseSlot);
                this.enableFeature(_const.GameFeature.GameClientPing);
            }
            if (version >= 960) {
                this.enableFeature(_const.GameFeature.GameSpritesU32);
                this.enableFeature(_const.GameFeature.GameOfflineTrainingTime);
            }
            if (version >= 963) {
                this.enableFeature(_const.GameFeature.GameAdditionalVipInfo);
            }
            if (version >= 980) {
                this.enableFeature(_const.GameFeature.GamePreviewState);
                this.enableFeature(_const.GameFeature.GameClientVersion);
            }
            if (version >= 981) {
                this.enableFeature(_const.GameFeature.GameLoginPending);
                this.enableFeature(_const.GameFeature.GameNewSpeedLaw);
            }
            if (version >= 984) {
                this.enableFeature(_const.GameFeature.GameContainerPagination);
                this.enableFeature(_const.GameFeature.GameBrowseField);
            }
            if (version >= 1000) {
                this.enableFeature(_const.GameFeature.GameThingMarks);
                this.enableFeature(_const.GameFeature.GamePVPMode);
            }
            if (version >= 1035) {
                this.enableFeature(_const.GameFeature.GameDoubleSkills);
                this.enableFeature(_const.GameFeature.GameBaseSkillU16);
            }
            if (version >= 1036) {
                this.enableFeature(_const.GameFeature.GameCreatureIcons);
                this.enableFeature(_const.GameFeature.GameHideNpcNames);
            }
            if (version >= 1038) {
                this.enableFeature(_const.GameFeature.GamePremiumExpiration);
            }
            if (version >= 1050) {
                this.enableFeature(_const.GameFeature.GameEnhancedAnimations);
            }
            if (version >= 1053) {
                this.enableFeature(_const.GameFeature.GameUnjustifiedPoints);
            }
            if (version >= 1054) {
                this.enableFeature(_const.GameFeature.GameExperienceBonus);
            }
            if (version >= 1055) {
                this.enableFeature(_const.GameFeature.GameDeathType);
            }
            if (version >= 1057) {
                this.enableFeature(_const.GameFeature.GameIdleAnimations);
            }
            if (version >= 1061) {
                this.enableFeature(_const.GameFeature.GameOGLInformation);
            }
            if (version >= 1071) {
                this.enableFeature(_const.GameFeature.GameContentRevision);
            }
            if (version >= 1072) {
                this.enableFeature(_const.GameFeature.GameAuthenticator);
            }
            if (version >= 1074) {
                this.enableFeature(_const.GameFeature.GameSessionKey);
            }
            if (version >= 1080) {
                this.enableFeature(_const.GameFeature.GameIngameStore);
            }
            if (version >= 1092) {
                this.enableFeature(_const.GameFeature.GameIngameStoreServiceType);
            }
            if (version >= 1093) {
                this.enableFeature(_const.GameFeature.GameIngameStoreHighlights);
            }
            if (version >= 1094) {
                this.enableFeature(_const.GameFeature.GameAdditionalSkills);
            }
        }
    }, {
        key: "enableFeature",
        value: function enableFeature(feature) {
            this.m_features[feature] = true;
        }
    }, {
        key: "disableFeature",
        value: function disableFeature(feature) {
            this.m_features[feature] = false;
        }
    }, {
        key: "getFeature",
        value: function getFeature(feature) {
            return this.m_features[feature] == true;
        }
    }, {
        key: "translateMessageModeFromServer",
        value: function translateMessageModeFromServer(mode) {
            for (var i in this.messageModesMap) {
                if (this.messageModesMap[i] == mode) {
                    return parseInt(i);
                }
            }
            return _const.MessageMode.MessageInvalid;
        }
    }, {
        key: "getContainer",
        value: function getContainer(containerId) {
            return new _container.Container();
        }
    }, {
        key: "getClientVersion",
        value: function getClientVersion() {
            return this.m_clientVersion;
        }
    }, {
        key: "getProtocolVersion",
        value: function getProtocolVersion() {
            return 10009;
        }
    }, {
        key: "getOs",
        value: function getOs() {
            return 3;
        }
    }, {
        key: "processConnectionError",
        value: function processConnectionError() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getLocalPlayer",
        value: function getLocalPlayer() {
            return this.m_localPlayer;
        }
    }, {
        key: "login",
        value: function login(accountName, accountPassword, characterName) {
            this.m_protocolGame = new _protocolgame.ProtocolGame(this);
            this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
        }
    }, {
        key: "watchMovie",
        value: function watchMovie(movie) {
            this.m_protocolGame = new _protocolgame.ProtocolGame(this);
            this.m_protocolGame.watch(movie);
        }
    }, {
        key: "formatCreatureName",
        value: function formatCreatureName(string) {
            return string;
        }
    }, {
        key: "g_things",
        get: function get() {
            return new _thingtypemanager.ThingTypeManager();
        }
    }, {
        key: "g_map",
        get: function get() {
            return new _map.Map();
        }
    }]);

    return Game;
}();

var g_game = new Game();
exports.g_game = g_game;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = function () {
    function Point() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "equals",
        value: function equals(otherPoint) {
            return this.x == otherPoint.x && this.y == otherPoint.y;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Point(this.x, this.y);
        }
    }, {
        key: "add",
        value: function add(point) {
            return new Point(this.x + point.x, this.y + point.y);
        }
    }, {
        key: "sub",
        value: function sub(point) {
            return new Point(this.x - point.x, this.y - point.y);
        }
    }, {
        key: "mul",
        value: function mul(ratio) {
            return new Point(this.x * ratio, this.y * ratio);
        }
    }]);

    return Point;
}();

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _const = __webpack_require__(13);

var _game = __webpack_require__(38);

var _resources = __webpack_require__(127);

var _movie = __webpack_require__(468);

var _mapview = __webpack_require__(126);

__webpack_require__(469);

var _log = __webpack_require__(20);

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var x = _const.Otc.MAX_AUTOWALK_DIST;
//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');

//console.log('pixi', PIXI);
function test() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var movieData, movie;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _game.g_game.setClientVersion(854);
                        _context.next = 3;
                        return _game.g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');

                    case 3:
                        _context.next = 5;
                        return _game.g_game.loadSprFile('http://inditex.localhost/Kasteria.spr');

                    case 5:
                        _context.next = 7;
                        return _resources.g_resources.openFile('http://inditex.localhost/small.ukcam');

                    case 7:
                        movieData = _context.sent;

                        //movieData.setReadPos(8);
                        movie = new _movie.Movie(new DataView(movieData.getBytes(-1)));

                        _mapview.g_mapview.init();
                        _mapview.g_mapview.clear();
                        _game.g_game.watchMovie(movie);
                        _log.Log.debug('qwestart1', +new Date());
                        _mapview.g_mapview.draw();
                        _log.Log.debug('qwestart2', +new Date());
                        _mapview.g_mapview.draw();
                        _log.Log.debug('qweend', +new Date());
                        //g_game.login('', '', 'GOD Spider Local');

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
test();

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(180);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalPlayer = exports.LocalPlayer = function (_Player) {
    _inherits(LocalPlayer, _Player);

    function LocalPlayer() {
        _classCallCheck(this, LocalPlayer);

        var _this = _possibleConstructorReturn(this, (LocalPlayer.__proto__ || Object.getPrototypeOf(LocalPlayer)).apply(this, arguments));

        _this.m_known = false;
        return _this;
    }

    _createClass(LocalPlayer, [{
        key: 'isLocalPlayer',
        value: function isLocalPlayer() {
            return true;
        }
    }, {
        key: 'setBlessings',
        value: function setBlessings(blessings) {}
    }, {
        key: 'setKnown',
        value: function setKnown(v) {
            this.m_known = v;
        }
    }, {
        key: 'isKnown',
        value: function isKnown() {
            return this.m_known;
        }
    }]);

    return LocalPlayer;
}(_player.Player);

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileBlock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = __webpack_require__(447);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileBlock = exports.TileBlock = function () {
    function TileBlock() {
        _classCallCheck(this, TileBlock);

        this.m_tiles = [];
    }

    _createClass(TileBlock, [{
        key: "create",
        value: function create(pos) {
            var tile = new _tile.Tile(pos);
            this.m_tiles[this.getTileIndex(pos)] = tile;
            return tile;
        }
    }, {
        key: "getOrCreate",
        value: function getOrCreate(pos) {
            var tile = this.get(pos);
            if (!tile) tile = this.create(pos);
            return tile;
        }
    }, {
        key: "get",
        value: function get(pos) {
            return this.m_tiles[this.getTileIndex(pos)];
        }
    }, {
        key: "remove",
        value: function remove(pos) {
            this.m_tiles[this.getTileIndex(pos)] = null;
        }
    }, {
        key: "getTileIndex",
        value: function getTileIndex(pos) {
            return (0, _helpers.toInt)(pos.y % TileBlock.BLOCK_SIZE) * TileBlock.BLOCK_SIZE + (0, _helpers.toInt)(pos.x % TileBlock.BLOCK_SIZE);
        }
    }, {
        key: "getTiles",
        value: function getTiles() {
            return this.m_tiles;
        }
    }]);

    return TileBlock;
}();

TileBlock.BLOCK_SIZE = 32;

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(38);

var _map = __webpack_require__(55);

var _const = __webpack_require__(13);

var _point = __webpack_require__(42);

var _log = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cc = 0;

var Tile = exports.Tile = function () {
    function Tile(position) {
        _classCallCheck(this, Tile);

        this.m_drawElevation = 0;
        this.m_minimapColor = 0;
        this.m_flags = 0;
        this.m_walkingCreatures = [];
        this.m_effects = [];
        this.m_things = [];
        this.m_position = position;
    }

    _createClass(Tile, [{
        key: "draw",
        value: function draw(dest, scaleFactor, drawFlags) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var animate = (drawFlags & _const.DrawFlags.DrawAnimations) > 0;
            //console.log('pp', this.m_position, dest, cc++);
            // first bottom items
            if (drawFlags & (_const.DrawFlags.DrawGround | _const.DrawFlags.DrawGroundBorders | _const.DrawFlags.DrawOnBottom)) {
                this.m_drawElevation = 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.m_things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var thing = _step.value;

                        if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom()) break;
                        var toPos = dest.sub(new _point.Point(this.m_drawElevation * scaleFactor, this.m_drawElevation * scaleFactor));
                        //console.log('topos', toPos);
                        thing.draw(toPos, scaleFactor, animate, lightView);
                        this.m_drawElevation += thing.getElevation();
                        if (this.m_drawElevation > _const.Otc.MAX_ELEVATION) this.m_drawElevation = _const.Otc.MAX_ELEVATION;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            var redrawPreviousTopW = 0;
            var redrawPreviousTopH = 0;
            // now common items in reverse order
            if (drawFlags & _const.DrawFlags.DrawItems) {
                for (var it = this.m_things.length - 1; it >= 0; --it) {
                    var _thing = this.m_things[it];
                    if (_thing.isOnTop() || _thing.isOnBottom() || _thing.isGroundBorder() || _thing.isGround() || _thing.isCreature()) break;
                    _thing.draw(dest.sub(new _point.Point(this.m_drawElevation * scaleFactor, this.m_drawElevation * scaleFactor)), scaleFactor, animate, lightView);
                    if (_thing.isLyingCorpse()) {
                        redrawPreviousTopW = Math.max(_thing.getWidth(), redrawPreviousTopW);
                        redrawPreviousTopH = Math.max(_thing.getHeight(), redrawPreviousTopH);
                    }
                    this.m_drawElevation += _thing.getElevation();
                    if (this.m_drawElevation > _const.Otc.MAX_ELEVATION) this.m_drawElevation = _const.Otc.MAX_ELEVATION;
                }
            }
            // after we render 2x2 lying corpses, we must redraw previous creatures/ontop above them
            /*
                    if (redrawPreviousTopH > 0 || redrawPreviousTopW > 0) {
                        let topRedrawFlags = drawFlags & (DrawFlags.DrawCreatures | DrawFlags.DrawEffects | DrawFlags.DrawOnTop | DrawFlags.DrawAnimations);
                        if (topRedrawFlags) {
                            for (let x = -redrawPreviousTopW; x <= 0; ++x) {
                                for (let y = -redrawPreviousTopH; y <= 0; ++y) {
                                    if (x == 0 && y == 0)
                                        continue;
                                    let tile = g_map.getTile(this.m_position.translated(x, y));
                                    if (tile)
                                        tile.draw(dest.add(new Point(x * Otc.TILE_PIXELS * scaleFactor, y * Otc.TILE_PIXELS * scaleFactor)), scaleFactor, topRedrawFlags);
                                }
                            }
                        }
                    }
            */
            // creatures
            if (drawFlags & _const.DrawFlags.DrawCreatures) {
                if (animate) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.m_walkingCreatures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var creature = _step2.value;

                            creature.draw(new _point.Point(dest.x + ((creature.getPosition().x - this.m_position.x) * _const.Otc.TILE_PIXELS - this.m_drawElevation) * scaleFactor, dest.y + ((creature.getPosition().y - this.m_position.y) * _const.Otc.TILE_PIXELS - this.m_drawElevation) * scaleFactor), scaleFactor, animate, lightView);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
                for (var _it = this.m_things.length - 1; _it >= 0; --_it) {
                    var _thing2 = this.m_things[_it];
                    //console.log(this.m_things, this.m_position, it);
                    if (!_thing2.isCreature()) continue;
                    var _creature = _thing2;
                    if (_creature && (!_creature.isWalking() || !animate)) {
                        //console.log('pp1', dest);
                        _creature.draw(dest.sub(new _point.Point(this.m_drawElevation * scaleFactor, this.m_drawElevation * scaleFactor)), scaleFactor, animate, lightView);
                    }
                }
            }
            /*
                    // effects
                    for(const EffectPtr& effect : m_effects)
                    effect->drawEffect(dest - m_drawElevation*scaleFactor, scaleFactor, animate, m_position.x - g_map.getCentralPosition().x, m_position.y - g_map.getCentralPosition().y, lightView);
            */
            // top items
            if (drawFlags & _const.DrawFlags.DrawOnTop) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.m_things[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _thing3 = _step3.value;

                        if (_thing3.isOnTop()) {
                            _thing3.draw(dest, scaleFactor, animate, lightView);
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
            /*
            // draw translucent light (for tiles beneath holes)
            if(hasTranslucentLight() && lightView) {
                Light light;
                light.intensity = 1;
                lightView->addLightSource(dest + Point(16,16) * scaleFactor, scaleFactor, light);
            }
            */
        }
    }, {
        key: "clean",
        value: function clean() {
            while (this.m_things.length > 0) {
                this.removeThing(this.m_things.pop());
            }
        }
    }, {
        key: "addWalkingCreature",
        value: function addWalkingCreature(creature) {
            this.m_walkingCreatures.push(creature);
        }
    }, {
        key: "removeWalkingCreature",
        value: function removeWalkingCreature(creature) {
            var index = this.m_walkingCreatures.indexOf(creature);
            if (index > -1) {
                this.m_walkingCreatures.splice(index, 1);
            }
        }
    }, {
        key: "addThing",
        value: function addThing(thing, stackPos) {
            if (!thing) return;
            if (thing.isEffect()) {
                if (thing.isTopEffect()) this.m_effects.unshift(thing);else this.m_effects.push(thing);
            } else {
                /*
                            if (thing.isCreature())
                                console.log('tile.addThing', thing, stackPos, this.m_things);
                */
                //if (this.m_position.x == 32047 && this.m_position.y == 31181 && this.m_position.z == 13)
                //if (thing.isItem() && thing.getId() == 2869)
                //    Log.log('testthing add', new Date(g_game.m_protocolGame.m_lastPacketTime).toISOString(), this.m_position.x, this.m_position.y, this.m_position.z, thing, stackPos, this.m_things);
                // priority                                    854
                // 0 - ground,                        -.      -.
                // 1 - ground borders                 -.      -.
                // 2 - bottom (walls),                -.      -.
                // 3 - on top (doors)                 -.      -.
                // 4 - creatures, from top to bottom  <--      -.
                // 5 - items, from top to bottom      <--      <--
                if (stackPos < 0 || stackPos == 255) {
                    var priority = thing.getStackPriority();
                    // -1 or 255 => auto detect position
                    // -2        => append
                    var append = void 0;
                    if (stackPos == -2) append = true;else {
                        append = priority <= 3;
                        // newer protocols does not store creatures in reverse order
                        if (_game.g_game.getClientVersion() >= 854 && priority == 4) append = !append;
                    }
                    for (stackPos = 0; stackPos < this.m_things.length; ++stackPos) {
                        var otherPriority = this.m_things[stackPos].getStackPriority();
                        //console.log('prior', stackPos, priority, otherPriority);
                        if (append && otherPriority > priority || !append && otherPriority >= priority) break;
                    }
                } else if (stackPos > this.m_things.length) stackPos = this.m_things.length;
                //this.m_things.insert(this.m_things.begin() + stackPos, thing);
                this.m_things.splice(stackPos, 0, thing);
                //this.m_things[stackPos] = thing;
                if (this.m_things.length > Tile.MAX_THINGS) this.removeThing(this.m_things[Tile.MAX_THINGS]);
                /*
                // check stack priorities
                // this code exists to find stackpos bugs faster
                int lastPriority = 0;
                for(const ThingPtr& thing :this.m_things) {
                    int priority = thing.getStackPriority();
                    assert(lastPriority <= priority);
                    lastPriority = priority;
                }
                */
            }
            thing.setPosition(this.m_position);
            thing.onAppear();
            if (thing.isTranslucent()) this.checkTranslucentLight();
        }
    }, {
        key: "removeThing",
        value: function removeThing(thing) {
            if (!thing) return false;
            var removed = false;
            if (thing.isEffect()) {
                var index = this.m_effects.indexOf(thing);
                if (index > -1) {
                    this.m_effects.splice(index, 1);
                    removed = true;
                }
            } else {
                //if (this.m_position.x == 32047 && this.m_position.y == 31181 && this.m_position.z == 13)
                if (thing.isItem() && thing.getId() == 2869) _log.Log.log('testthing rem', new Date(_game.g_game.m_protocolGame.m_lastPacketTime).toISOString(), this.m_position.x, this.m_position.y, this.m_position.z, thing, this.m_things);
                var _index = this.m_things.indexOf(thing);
                if (_index > -1) {
                    this.m_things.splice(_index, 1);
                    removed = true;
                }
            }
            thing.onDisappear();
            if (thing.isTranslucent()) this.checkTranslucentLight();
            return removed;
        }
    }, {
        key: "getThing",
        value: function getThing(stackPos) {
            if (stackPos >= 0 && stackPos < this.m_things.length) {
                //Log.debug('tile thing: ', this.m_things[stackPos]);
                return this.m_things[stackPos];
            }
            return null;
        }
    }, {
        key: "getEffect",
        value: function getEffect(id) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.m_effects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var effect = _step4.value;

                    if (effect.getId() == id) return effect;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return null;
        }
    }, {
        key: "hasThing",
        value: function hasThing(thing) {
            return this.m_things.indexOf(thing) > -1;
        }
    }, {
        key: "getThingStackPos",
        value: function getThingStackPos(thing) {
            /*
            for(let stackpos = 0; stackpos < this.m_things.length; ++stackpos)
            if(thing == this.m_things[stackpos])
                return stackpos;
             */
            return this.m_things.indexOf(thing);
        }
    }, {
        key: "getTopThing",
        value: function getTopThing() {
            if (this.isEmpty()) return null;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.m_things[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var thing = _step5.value;

                    if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature()) return thing;
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return this.m_things[this.m_things.length - 1];
        }
    }, {
        key: "getTopLookThing",
        value: function getTopLookThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (!thing.isIgnoreLook() && !thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()) return thing;
            }
            return this.m_things[0];
        }
    }, {
        key: "getTopUseThing",
        value: function getTopUseThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isForceUse() || !thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature() && !thing.isSplash()) return thing;
            }
            for (var _i = 0; _i < this.m_things.length; ++_i) {
                var _thing4 = this.m_things[_i];
                if (!_thing4.isGround() && !_thing4.isGroundBorder() && !_thing4.isCreature() && !_thing4.isSplash()) return _thing4;
            }
            return this.m_things[0];
        }
    }, {
        key: "getTopCreature",
        value: function getTopCreature() {
            var creature = void 0;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isLocalPlayer()) creature = thing;else if (thing.isCreature() && !thing.isLocalPlayer()) return thing;
            }
            if (!creature && this.m_walkingCreatures.length > 0) creature = this.m_walkingCreatures[this.m_walkingCreatures.length - 1];
            // check for walking creatures in tiles around
            if (!creature) {
                for (var xi = -1; xi <= 1; ++xi) {
                    for (var yi = -1; yi <= 1; ++yi) {
                        var pos = this.m_position.translated(xi, yi);
                        if (pos == this.m_position) continue;
                        var tile = _map.g_map.getTile(pos);
                        if (tile) {
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = tile.getCreatures()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var c = _step6.value;

                                    /* todo */
                                    //if(c.isWalking() && c.getLastStepFromPosition() == this.m_position && c.getStepProgress() < 0.75) {
                                    creature = c;
                                    //}
                                }
                            } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                        _iterator6.return();
                                    }
                                } finally {
                                    if (_didIteratorError6) {
                                        throw _iteratorError6;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return creature;
        }
    }, {
        key: "getTopMoveThing",
        value: function getTopMoveThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature()) {
                    if (i > 0 && thing.isNotMoveable()) return this.m_things[i - 1];
                    return thing;
                }
            }
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.m_things[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _thing5 = _step7.value;

                    if (_thing5.isCreature()) return _thing5;
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return this.m_things[0];
        }
    }, {
        key: "getTopMultiUseThing",
        value: function getTopMultiUseThing() {
            if (this.isEmpty()) return null;
            var topCreature = this.getTopCreature();
            if (topCreature) return topCreature;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isForceUse()) return thing;
            }
            for (var _i2 = 0; _i2 < this.m_things.length; ++_i2) {
                var _thing6 = this.m_things[_i2];
                if (!_thing6.isGround() && !_thing6.isGroundBorder() && !_thing6.isOnBottom() && !_thing6.isOnTop()) {
                    if (_i2 > 0 && _thing6.isSplash()) return this.m_things[_i2 - 1];
                    return _thing6;
                }
            }
            for (var _i3 = 0; _i3 < this.m_things.length; ++_i3) {
                var _thing7 = this.m_things[_i3];
                if (!_thing7.isGround() && !_thing7.isOnTop()) return _thing7;
            }
            return this.m_things[0];
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return this.m_position;
        }
    }, {
        key: "getDrawElevation",
        value: function getDrawElevation() {
            return this.m_drawElevation;
        }
    }, {
        key: "getItems",
        value: function getItems() {
            var items = [];
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.m_things[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var thing = _step8.value;

                    if (thing.isItem()) items.push(thing);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return items;
        }
    }, {
        key: "getCreatures",
        value: function getCreatures() {
            var creatures = [];
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.m_things[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var thing = _step9.value;

                    if (thing.isCreature()) creatures.push(thing);
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return creatures;
        }
    }, {
        key: "getWalkingCreatures",
        value: function getWalkingCreatures() {
            return this.m_walkingCreatures;
        }
    }, {
        key: "getThings",
        value: function getThings() {
            return this.m_things;
        }
    }, {
        key: "getGround",
        value: function getGround() {
            var firstObject = this.getThing(0);
            if (!firstObject) return null;
            if (firstObject.isGround() && firstObject.isItem()) return firstObject;
            return null;
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            var groundSpeed = 100;
            var ground = this.getGround();
            if (ground) groundSpeed = ground.getGroundSpeed();
            return groundSpeed;
        }
    }, {
        key: "getMinimapColorByte",
        value: function getMinimapColorByte() {
            var color = 255; // alpha
            if (this.m_minimapColor != 0) return this.m_minimapColor;
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.m_things[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var thing = _step10.value;

                    if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()) break;
                    var c = thing.getMinimapColor();
                    if (c != 0) color = c;
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return color;
        }
    }, {
        key: "getThingCount",
        value: function getThingCount() {
            return this.m_things.length + this.m_effects.length;
        }
    }, {
        key: "isPathable",
        value: function isPathable() {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = this.m_things[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var thing = _step11.value;

                    if (thing.isNotPathable()) return false;
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isWalkable",
        value: function isWalkable() {
            var ignoreCreatures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!this.getGround()) return false;
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = this.m_things[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var thing = _step12.value;

                    if (thing.isNotWalkable()) return false;
                    if (!ignoreCreatures) {
                        if (thing.isCreature()) {
                            var creature = thing;
                            /* todo */
                            //if(!creature.isPassable() && creature.canBeSeen())
                            return false;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            var ground = this.getGround();
            if (ground && ground.isFullGround()) return true;
            return false;
        }
    }, {
        key: "isFullyOpaque",
        value: function isFullyOpaque() {
            var firstObject = this.getThing(0);
            return firstObject && firstObject.isFullGround();
        }
    }, {
        key: "isSingleDimension",
        value: function isSingleDimension() {
            if (this.m_walkingCreatures.length > 0) return false;
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.m_things[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var thing = _step13.value;

                    if (thing.getHeight() != 1 || thing.getWidth() != 1) return false;
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isLookPossible",
        value: function isLookPossible() {
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = this.m_things[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var thing = _step14.value;

                    if (thing.blockProjectile()) return false;
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isClickable",
        value: function isClickable() {
            var hasGround = false;
            var hasOnBottom = false;
            var hasIgnoreLook = false;
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.m_things[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var thing = _step15.value;

                    if (thing.isGround()) hasGround = true;
                    if (thing.isOnBottom()) hasOnBottom = true;
                    if ((hasGround || hasOnBottom) && !hasIgnoreLook) return true;
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return false;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.m_things.length == 0;
        }
    }, {
        key: "isDrawable",
        value: function isDrawable() {
            return this.m_things.length > 0 || this.m_walkingCreatures.length > 0 || this.m_effects.length > 0;
        }
    }, {
        key: "hasTranslucentLight",
        value: function hasTranslucentLight() {
            return (this.m_flags & _const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT) > 0;
        }
    }, {
        key: "mustHookSouth",
        value: function mustHookSouth() {
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = this.m_things[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var thing = _step16.value;

                    if (thing.isHookSouth()) return true;
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            return false;
        }
    }, {
        key: "mustHookEast",
        value: function mustHookEast() {
            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = this.m_things[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var thing = _step17.value;

                    if (thing.isHookEast()) return true;
                }
            } catch (err) {
                _didIteratorError17 = true;
                _iteratorError17 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
                        _iterator17.return();
                    }
                } finally {
                    if (_didIteratorError17) {
                        throw _iteratorError17;
                    }
                }
            }

            return false;
        }
    }, {
        key: "hasCreature",
        value: function hasCreature() {
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
                for (var _iterator18 = this.m_things[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                    var thing = _step18.value;

                    if (thing.isCreature()) return true;
                }
            } catch (err) {
                _didIteratorError18 = true;
                _iteratorError18 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
                        _iterator18.return();
                    }
                } finally {
                    if (_didIteratorError18) {
                        throw _iteratorError18;
                    }
                }
            }

            return false;
        }
    }, {
        key: "limitsFloorsView",
        value: function limitsFloorsView() {
            var isFreeView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // ground and walls limits the view
            var firstThing = this.getThing(0);
            if (isFreeView) {
                if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || firstThing.isOnBottom())) return true;
            } else if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || firstThing.isOnBottom() && firstThing.blockProjectile())) return true;
            return false;
        }
    }, {
        key: "canErase",
        value: function canErase() {
            return this.m_walkingCreatures.length == 0 && this.m_effects.length == 0 && this.m_things.length == 0 && this.m_flags == 0 && this.m_minimapColor == 0;
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            var elevation = 0;
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                for (var _iterator19 = this.m_things[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    var thing = _step19.value;

                    if (thing.getElevation() > 0) elevation++;
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
                        _iterator19.return();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
                    }
                }
            }

            return elevation;
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            var elevation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return this.getElevation() >= elevation;
        }
    }, {
        key: "overwriteMinimapColor",
        value: function overwriteMinimapColor(color) {
            this.m_minimapColor = color;
        }
    }, {
        key: "remFlag",
        value: function remFlag(flag) {
            this.m_flags &= ~flag;
        }
    }, {
        key: "setFlag",
        value: function setFlag(flag) {
            this.m_flags |= flag;
        }
    }, {
        key: "setFlags",
        value: function setFlags(flags) {
            this.m_flags = flags;
        }
    }, {
        key: "hasFlag",
        value: function hasFlag(flag) {
            return (this.m_flags & flag) == flag;
        }
    }, {
        key: "getFlags",
        value: function getFlags() {
            return this.m_flags;
        }
    }, {
        key: "checkTranslucentLight",
        value: function checkTranslucentLight() {
            if (this.m_position.z != _const.Otc.SEA_FLOOR) return;
            var downPos = this.m_position.clone();
            if (!downPos.down()) return;
            var tile = _map.g_map.getOrCreateTile(downPos);
            if (!tile) return;
            var translucent = false;
            var _iteratorNormalCompletion20 = true;
            var _didIteratorError20 = false;
            var _iteratorError20 = undefined;

            try {
                for (var _iterator20 = this.m_things[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                    var thing = _step20.value;

                    if (thing.isTranslucent() || thing.hasLensHelp()) {
                        translucent = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError20 = true;
                _iteratorError20 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion20 && _iterator20.return) {
                        _iterator20.return();
                    }
                } finally {
                    if (_didIteratorError20) {
                        throw _iteratorError20;
                    }
                }
            }

            if (translucent) tile.m_flags |= _const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT;else tile.m_flags &= ~_const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT;
        }
    }]);

    return Tile;
}();

Tile.MAX_THINGS = 10;

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightView = exports.LightView = function () {
    function LightView() {
        _classCallCheck(this, LightView);
    }

    _createClass(LightView, [{
        key: "setId",
        value: function setId(id) {}
    }]);

    return LightView;
}();

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ThingType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(13);

var _game = __webpack_require__(38);

var _log = __webpack_require__(20);

var _animator = __webpack_require__(450);

var _image = __webpack_require__(182);

var _color = __webpack_require__(57);

var _spritemanager = __webpack_require__(183);

var _thingtypeattribs = __webpack_require__(452);

var _size = __webpack_require__(70);

var _point = __webpack_require__(42);

var _texture = __webpack_require__(453);

var _rect = __webpack_require__(185);

var _marketdata = __webpack_require__(454);

var _light = __webpack_require__(125);

var _painter = __webpack_require__(184);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThingType = exports.ThingType = function () {
    function ThingType() {
        _classCallCheck(this, ThingType);

        this.m_id = 0;
        this.m_null = true;
        this.m_attribs = new _thingtypeattribs.ThingTypeAttribs();
        this.m_size = new _size.Size();
        this.m_displacement = new _point.Point();
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
        this.m_textures = [];
        this.m_texturesFramesRects = [];
        this.m_texturesFramesOriginRects = [];
        this.m_texturesFramesOffsets = [];
    }

    _createClass(ThingType, [{
        key: "unserialize",
        value: function unserialize(clientId, category, fin) {
            this.m_null = false;
            this.m_id = clientId;
            this.m_category = category;
            //console.log('load', clientId, fin.getReadPos(), fin.data.buffer.slice(fin.getReadPos()));
            var count = 0;
            var attr = -1;
            var done = false;
            for (var i = 0; i < _const.ThingAttr.ThingLastAttr; ++i) {
                count++;
                attr = fin.getU8();
                if (attr == _const.ThingAttr.ThingLastAttr) {
                    done = true;
                    break;
                }
                if (_game.g_game.getClientVersion() >= 1000) {
                    /* In 10.10+ all attributes from 16 and up were
                     * incremented by 1 to make space for 16 as
                     * "No Movement Animation" flag.
                     */
                    if (attr == 16) attr = _const.ThingAttr.ThingAttrNoMoveAnimation;else if (attr > 16) attr -= 1;
                } else if (_game.g_game.getClientVersion() >= 860) {
                    /* Default attribute values follow
                     * the format of 8.6-9.86.
                     * Therefore no changes here.
                     */
                } else if (_game.g_game.getClientVersion() >= 780) {
                    /* In 7.80-8.54 all attributes from 8 and higher were
                     * incremented by 1 to make space for 8 as
                     * "Item Charges" flag.
                     */
                    if (attr == 8) {
                        this.m_attribs.set(_const.ThingAttr.ThingAttrChargeable, true);
                        continue;
                    } else if (attr > 8) attr -= 1;
                } else if (_game.g_game.getClientVersion() >= 755) {
                    /* In 7.55-7.72 attributes 23 is "Floor Change". */
                    if (attr == 23) attr = _const.ThingAttr.ThingAttrFloorChange;
                } else if (_game.g_game.getClientVersion() >= 740) {
                    /* In 7.4-7.5 attribute "Ground Border" did not exist
                     * attributes 1-15 have to be adjusted.
                     * Several other changes in the format.
                     */
                    if (attr > 0 && attr <= 15) attr += 1;else if (attr == 16) attr = _const.ThingAttr.ThingAttrLight;else if (attr == 17) attr = _const.ThingAttr.ThingAttrFloorChange;else if (attr == 18) attr = _const.ThingAttr.ThingAttrFullGround;else if (attr == 19) attr = _const.ThingAttr.ThingAttrElevation;else if (attr == 20) attr = _const.ThingAttr.ThingAttrDisplacement;else if (attr == 22) attr = _const.ThingAttr.ThingAttrMinimapColor;else if (attr == 23) attr = _const.ThingAttr.ThingAttrRotateable;else if (attr == 24) attr = _const.ThingAttr.ThingAttrLyingCorpse;else if (attr == 25) attr = _const.ThingAttr.ThingAttrHangable;else if (attr == 26) attr = _const.ThingAttr.ThingAttrHookSouth;else if (attr == 27) attr = _const.ThingAttr.ThingAttrHookEast;else if (attr == 28) attr = _const.ThingAttr.ThingAttrAnimateAlways;
                    /* "Multi Use" and "Force Use" are swapped */
                    if (attr == _const.ThingAttr.ThingAttrMultiUse) attr = _const.ThingAttr.ThingAttrForceUse;else if (attr == _const.ThingAttr.ThingAttrForceUse) attr = _const.ThingAttr.ThingAttrMultiUse;
                }
                switch (attr) {
                    case _const.ThingAttr.ThingAttrDisplacement:
                        {
                            this.m_displacement = new _point.Point(0, 0);
                            if (_game.g_game.getClientVersion() >= 755) {
                                this.m_displacement.x = fin.getU16();
                                this.m_displacement.y = fin.getU16();
                            } else {
                                this.m_displacement.x = 8;
                                this.m_displacement.y = 8;
                            }
                            this.m_attribs.set(attr, true);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrLight:
                        {
                            var light = new _light.Light();
                            light.intensity = fin.getU16();
                            light.color = fin.getU16();
                            this.m_attribs.set(attr, light);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrMarket:
                        {
                            var market = new _marketdata.MarketData();
                            market.category = fin.getU16();
                            market.tradeAs = fin.getU16();
                            market.showAs = fin.getU16();
                            market.name = fin.getString();
                            market.restrictVocation = fin.getU16();
                            market.requiredLevel = fin.getU16();
                            this.m_attribs.set(attr, market);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrElevation:
                        {
                            this.m_elevation = fin.getU16();
                            this.m_attribs.set(attr, this.m_elevation);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrUsable:
                    case _const.ThingAttr.ThingAttrGround:
                    case _const.ThingAttr.ThingAttrWritable:
                    case _const.ThingAttr.ThingAttrWritableOnce:
                    case _const.ThingAttr.ThingAttrMinimapColor:
                    case _const.ThingAttr.ThingAttrCloth:
                    case _const.ThingAttr.ThingAttrLensHelp:
                        this.m_attribs.set(attr, fin.getU16());
                        break;
                    default:
                        this.m_attribs.set(attr, true);
                        break;
                }
            }
            if (!done) (0, _log.error)("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);
            var hasFrameGroups = category == _const.ThingCategory.ThingCategoryCreature && _game.g_game.getFeature(_const.GameFeature.GameIdleAnimations);
            var groupCount = hasFrameGroups ? fin.getU8() : 1;
            this.m_animationPhases = 0;
            var totalSpritesCount = 0;
            //console.log(this.m_attribs.attribs);
            for (var _i = 0; _i < groupCount; ++_i) {
                var frameGroupType = _const.FrameGroupType.FrameGroupDefault;
                if (hasFrameGroups) frameGroupType = fin.getU8();
                var width = fin.getU8();
                var height = fin.getU8();
                this.m_size = new _size.Size(width, height);
                if (width > 1 || height > 1) {
                    this.m_realSize = fin.getU8();
                    this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
                } else this.m_exactSize = 32;
                this.m_layers = fin.getU8();
                this.m_numPatternX = fin.getU8();
                this.m_numPatternY = fin.getU8();
                if (_game.g_game.getClientVersion() >= 755) this.m_numPatternZ = fin.getU8();else this.m_numPatternZ = 1;
                var groupAnimationsPhases = fin.getU8();
                this.m_animationPhases += groupAnimationsPhases;
                if (groupAnimationsPhases > 1 && _game.g_game.getFeature(_const.GameFeature.GameEnhancedAnimations)) {
                    this.m_animator = new _animator.Animator();
                    this.m_animator.unserialize(groupAnimationsPhases, fin);
                }
                var totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;
                if (totalSpritesCount + totalSprites > 4096) (0, _log.error)("a thing type has more than 4096 sprites", totalSprites, totalSpritesCount, this.m_size.area(), this.m_layers, this.m_numPatternX, this.m_numPatternY, this.m_numPatternZ, groupAnimationsPhases);
                //this.m_spritesIndex.resize((totalSpritesCount + totalSprites));
                this.m_spritesIndex = [];
                for (var _i2 = totalSpritesCount; _i2 < totalSpritesCount + totalSprites; _i2++) {
                    this.m_spritesIndex[_i2] = _game.g_game.getFeature(_const.GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
                }
                //console.log('spr', this.m_spritesIndex);
                totalSpritesCount += totalSprites;
            }
            /*
                    this.m_textures.resize(m_animationPhases);
                    this.m_texturesFramesRects.resize(m_animationPhases);
                    this.m_texturesFramesOriginRects.resize(m_animationPhases);
                    this.m_texturesFramesOffsets.resize(m_animationPhases);
            */
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "getCategory",
        value: function getCategory() {
            return this.m_category;
        }
    }, {
        key: "isNull",
        value: function isNull() {
            return this.m_null;
        }
    }, {
        key: "hasAttr",
        value: function hasAttr(attr) {
            return this.m_attribs.has(attr);
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this.m_size;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.m_size.width();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.m_size.height();
        }
    }, {
        key: "getExactSize",
        value: function getExactSize() {
            var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var xPattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var yPattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var zPattern = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var animationPhase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            /* todo */
            return 0;
        }
    }, {
        key: "getRealSize",
        value: function getRealSize() {
            return this.m_realSize;
        }
    }, {
        key: "getLayers",
        value: function getLayers() {
            return this.m_layers;
        }
    }, {
        key: "getNumPatternX",
        value: function getNumPatternX() {
            return this.m_numPatternX;
        }
    }, {
        key: "getNumPatternY",
        value: function getNumPatternY() {
            return this.m_numPatternY;
        }
    }, {
        key: "getNumPatternZ",
        value: function getNumPatternZ() {
            return this.m_numPatternZ;
        }
    }, {
        key: "getAnimationPhases",
        value: function getAnimationPhases() {
            return this.m_animationPhases;
        }
    }, {
        key: "getAnimator",
        value: function getAnimator() {
            return this.m_animator;
        }
    }, {
        key: "getDisplacement",
        value: function getDisplacement() {
            return this.m_displacement;
        }
    }, {
        key: "getDisplacementX",
        value: function getDisplacementX() {
            return this.getDisplacement().x;
        }
    }, {
        key: "getDisplacementY",
        value: function getDisplacementY() {
            return this.getDisplacement().y;
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            return this.m_elevation;
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrGround);
        }
    }, {
        key: "getMaxTextLength",
        value: function getMaxTextLength() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritableOnce) ? this.m_attribs.get(_const.ThingAttr.ThingAttrWritableOnce) : this.m_attribs.get(_const.ThingAttr.ThingAttrWritable);
        }
    }, {
        key: "getLight",
        value: function getLight() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrLight);
        }
    }, {
        key: "getMinimapColor",
        value: function getMinimapColor() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrMinimapColor);
        }
    }, {
        key: "getLensHelp",
        value: function getLensHelp() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrLensHelp);
        }
    }, {
        key: "getClothSlot",
        value: function getClothSlot() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrCloth);
        }
    }, {
        key: "getMarketData",
        value: function getMarketData() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrMarket);
        }
    }, {
        key: "isGround",
        value: function isGround() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrGround);
        }
    }, {
        key: "isGroundBorder",
        value: function isGroundBorder() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrGroundBorder);
        }
    }, {
        key: "isOnBottom",
        value: function isOnBottom() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrOnBottom);
        }
    }, {
        key: "isOnTop",
        value: function isOnTop() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrOnTop);
        }
    }, {
        key: "isContainer",
        value: function isContainer() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrContainer);
        }
    }, {
        key: "isStackable",
        value: function isStackable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrStackable);
        }
    }, {
        key: "isForceUse",
        value: function isForceUse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrForceUse);
        }
    }, {
        key: "isMultiUse",
        value: function isMultiUse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMultiUse);
        }
    }, {
        key: "isWritable",
        value: function isWritable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritable);
        }
    }, {
        key: "isChargeable",
        value: function isChargeable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrChargeable);
        }
    }, {
        key: "isWritableOnce",
        value: function isWritableOnce() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritableOnce);
        }
    }, {
        key: "isFluidContainer",
        value: function isFluidContainer() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrFluidContainer);
        }
    }, {
        key: "isSplash",
        value: function isSplash() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrSplash);
        }
    }, {
        key: "isNotWalkable",
        value: function isNotWalkable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotWalkable);
        }
    }, {
        key: "isNotMoveable",
        value: function isNotMoveable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotMoveable);
        }
    }, {
        key: "blockProjectile",
        value: function blockProjectile() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrBlockProjectile);
        }
    }, {
        key: "isNotPathable",
        value: function isNotPathable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotPathable);
        }
    }, {
        key: "isPickupable",
        value: function isPickupable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrPickupable);
        }
    }, {
        key: "isHangable",
        value: function isHangable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHangable);
        }
    }, {
        key: "isHookSouth",
        value: function isHookSouth() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHookSouth);
        }
    }, {
        key: "isHookEast",
        value: function isHookEast() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHookEast);
        }
    }, {
        key: "isRotateable",
        value: function isRotateable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrRotateable);
        }
    }, {
        key: "hasLight",
        value: function hasLight() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLight);
        }
    }, {
        key: "isDontHide",
        value: function isDontHide() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrDontHide);
        }
    }, {
        key: "isTranslucent",
        value: function isTranslucent() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrTranslucent);
        }
    }, {
        key: "hasDisplacement",
        value: function hasDisplacement() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrDisplacement);
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrElevation);
        }
    }, {
        key: "isLyingCorpse",
        value: function isLyingCorpse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLyingCorpse);
        }
    }, {
        key: "isAnimateAlways",
        value: function isAnimateAlways() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrAnimateAlways);
        }
    }, {
        key: "hasMiniMapColor",
        value: function hasMiniMapColor() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMinimapColor);
        }
    }, {
        key: "hasLensHelp",
        value: function hasLensHelp() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLensHelp);
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrFullGround);
        }
    }, {
        key: "isIgnoreLook",
        value: function isIgnoreLook() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLook);
        }
    }, {
        key: "isCloth",
        value: function isCloth() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrCloth);
        }
    }, {
        key: "isMarketable",
        value: function isMarketable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMarket);
        }
    }, {
        key: "isUsable",
        value: function isUsable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrUsable);
        }
    }, {
        key: "isWrapable",
        value: function isWrapable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWrapable);
        }
    }, {
        key: "isUnwrapable",
        value: function isUnwrapable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrUnwrapable);
        }
    }, {
        key: "isTopEffect",
        value: function isTopEffect() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrTopEffect);
        }
    }, {
        key: "getSprites",
        value: function getSprites() {
            return this.m_spritesIndex;
        }
        // additional

    }, {
        key: "getOpacity",
        value: function getOpacity() {
            return this.m_opacity;
        }
    }, {
        key: "isNotPreWalkable",
        value: function isNotPreWalkable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotPreWalkable);
        }
    }, {
        key: "setPathable",
        value: function setPathable(v) {
            if (v == true) this.m_attribs.remove(_const.ThingAttr.ThingAttrNotPathable);else this.m_attribs.set(_const.ThingAttr.ThingAttrNotPathable, true);
        }
    }, {
        key: "getTexture",
        value: function getTexture(animationPhase) {
            var animationPhaseTexture = this.m_textures[animationPhase];
            if (!animationPhaseTexture) {
                var useCustomImage = false;
                if (animationPhase == 0 && this.m_customImage) useCustomImage = true;
                // we don't need layers in common items, they will be pre-drawn
                var textureLayers = 1;
                var numLayers = this.m_layers;
                if (this.m_category == _const.ThingCategory.ThingCategoryCreature && numLayers >= 2) {
                    // 5 layers: outfit base, red mask, green mask, blue mask, yellow mask
                    textureLayers = 5;
                    numLayers = 5;
                }
                var indexSize = textureLayers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ;
                var textureSize = this.getBestTextureDimension(this.m_size.width(), this.m_size.height(), indexSize);
                //console.log('dim', textureSize, this);
                var fullImage = void 0;
                if (useCustomImage) fullImage = _image.Image.load(this.m_customImage);else fullImage = new _image.Image(textureSize.mul(_const.Otc.TILE_PIXELS));
                //console.log('fi', fullImage.getWidth(), fullImage.getHeight())
                this.m_texturesFramesRects[animationPhase] = [];
                this.m_texturesFramesOriginRects[animationPhase] = [];
                this.m_texturesFramesOffsets[animationPhase] = [];
                for (var z = 0; z < this.m_numPatternZ; ++z) {
                    for (var y = 0; y < this.m_numPatternY; ++y) {
                        for (var x = 0; x < this.m_numPatternX; ++x) {
                            for (var l = 0; l < numLayers; ++l) {
                                var spriteMask = this.m_category == _const.ThingCategory.ThingCategoryCreature && l > 0;
                                var frameIndex = this.getTextureIndex(l % textureLayers, x, y, z);
                                var framePos = new _point.Point((0, _helpers.toInt)(frameIndex % (0, _helpers.toInt)(textureSize.width() / this.m_size.width()) * this.m_size.width()) * _const.Otc.TILE_PIXELS, (0, _helpers.toInt)(frameIndex / (0, _helpers.toInt)(textureSize.width() / this.m_size.width()) * this.m_size.height()) * _const.Otc.TILE_PIXELS);
                                //console.log('blitx', framePos);
                                if (!useCustomImage) {
                                    for (var h = 0; h < this.m_size.height(); ++h) {
                                        for (var w = 0; w < this.m_size.width(); ++w) {
                                            var spriteIndex = this.getSpriteIndex(w, h, spriteMask ? 1 : l, x, y, z, animationPhase);
                                            var spriteImage = _spritemanager.g_sprites.getSpriteImage(this.m_spritesIndex[spriteIndex]);
                                            if (spriteImage) {
                                                if (spriteMask) {
                                                    spriteImage.overwriteMask(ThingType.maskColors[l - 1]);
                                                }
                                                var spritePos = new _point.Point((this.m_size.width() - w - 1) * _const.Otc.TILE_PIXELS, (this.m_size.height() - h - 1) * _const.Otc.TILE_PIXELS);
                                                fullImage.blit(framePos.add(spritePos), spriteImage);
                                            } else {
                                                //console.error(this.m_spritesIndex, spriteIndex);
                                            }
                                        }
                                    }
                                }
                                var drawRect = new _rect.Rect(framePos.add(new _point.Point(this.m_size.width(), this.m_size.height())).mul(_const.Otc.TILE_PIXELS).sub(new _point.Point(1, 1)), framePos);
                                for (var _x6 = framePos.x; _x6 < framePos.x + this.m_size.width() * _const.Otc.TILE_PIXELS; ++_x6) {
                                    for (var _y = framePos.y; _y < framePos.y + this.m_size.height() * _const.Otc.TILE_PIXELS; ++_y) {
                                        var p = fullImage.getPixel(_x6, _y);
                                        if (p[3] != 0x00) {
                                            drawRect.setTop(Math.min(_y, drawRect.top()));
                                            drawRect.setLeft(Math.min(_x6, drawRect.left()));
                                            drawRect.setBottom(Math.max(_y, drawRect.bottom()));
                                            drawRect.setRight(Math.max(_x6, drawRect.right()));
                                        }
                                    }
                                }
                                //console.log('blit', drawRect);
                                this.m_texturesFramesRects[animationPhase][frameIndex] = drawRect;
                                this.m_texturesFramesOriginRects[animationPhase][frameIndex] = new _rect.Rect(framePos, new _size.Size(this.m_size.width(), this.m_size.height()).mul(_const.Otc.TILE_PIXELS));
                                this.m_texturesFramesOffsets[animationPhase][frameIndex] = drawRect.topLeft().sub(framePos);
                            }
                        }
                    }
                }
                animationPhaseTexture = new _texture.Texture(fullImage, true);
                //animationPhaseTexture->setSmooth(true);
                //console.log(this.m_id, animationPhase, animationPhaseTexture);
                this.m_textures[animationPhase] = animationPhaseTexture;
            }
            return animationPhaseTexture;
        }
    }, {
        key: "getBestTextureDimension",
        value: function getBestTextureDimension(w, h, count) {
            var MAX = 32;
            var k = 1;
            while (k < w) {
                k <<= 1;
            }w = k;
            k = 1;
            while (k < h) {
                k <<= 1;
            }h = k;
            var numSprites = w * h * count;
            /*
            assert(numSprites <= MAX*MAX);
            assert(w <= MAX);
            assert(h <= MAX);
            */
            var bestDimension = new _size.Size(MAX, MAX);
            for (var i = w; i <= MAX; i <<= 1) {
                for (var j = h; j <= MAX; j <<= 1) {
                    var candidateDimension = new _size.Size(i, j);
                    if (candidateDimension.area() < numSprites) continue;
                    if (candidateDimension.area() < bestDimension.area() || candidateDimension.area() == bestDimension.area() && candidateDimension.width() + candidateDimension.height() < bestDimension.width() + bestDimension.height()) bestDimension = candidateDimension;
                }
            }
            //console.log('dim', this.m_id, bestDimension);
            return bestDimension;
            //return new Size(w, h);
        }
    }, {
        key: "getSpriteIndex",
        value: function getSpriteIndex(w, h, l, x, y, z, a) {
            var index = (((((a % this.m_animationPhases * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x) * this.m_layers + l) * this.m_size.height() + h) * this.m_size.width() + w;
            if (!(index < this.m_spritesIndex.length)) {
                throw new Error('index < this.m_spritesIndex.length');
            }
            return index;
        }
    }, {
        key: "getTextureIndex",
        value: function getTextureIndex(l, x, y, z) {
            return ((l * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x;
        }
    }, {
        key: "draw",
        value: function draw(dest, scaleFactor, layer, xPattern, yPattern, zPattern, animationPhase) {
            var lightView = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

            //console.log('draw thingtype', this.m_null, this.m_id, animationPhase, this.m_animationPhases);
            if (this.m_null) return;
            if (animationPhase >= this.m_animationPhases) return;
            var texture = this.getTexture(animationPhase); // texture might not exists, neither its rects.
            if (!texture) return;
            var frameIndex = this.getTextureIndex(layer, xPattern, yPattern, zPattern);
            if (frameIndex >= this.m_texturesFramesRects[animationPhase].length) return;
            var textureOffset = new _point.Point();
            var textureRect = new _rect.Rect();
            if (scaleFactor != 1.0) {
                textureRect = this.m_texturesFramesOriginRects[animationPhase][frameIndex];
            } else {
                textureOffset = this.m_texturesFramesOffsets[animationPhase][frameIndex];
                textureRect = this.m_texturesFramesRects[animationPhase][frameIndex];
            }
            var screenRect = new _rect.Rect(dest.add(textureOffset.sub(this.m_displacement).sub(this.m_size.toPoint().sub(new _point.Point(1, 1)).mul(32))).mul(scaleFactor), textureRect.size().mul(scaleFactor));
            //if (dest.x == 0 && dest.y == 0)
            //console.log('sr', dest, this.m_id, texture, frameIndex, screenRect, textureOffset, this.m_displacement, this.m_size.toPoint(), this.m_texturesFramesRects[animationPhase]);
            /*
                    let useOpacity = m_opacity < 1.0f;
                     if(useOpacity)
                        g_painter->setColor(Color(1.0f,1.0f,1.0f,m_opacity));
             */
            //g_painter.drawTexturedRect(dest, texture);
            _painter.g_painter.drawTexturedRect(screenRect, texture, textureRect);
            //throw new Error('aa');
            /*
                    if(useOpacity)
                        g_painter->setColor(Color::white);
                     if(lightView && hasLight()) {
                        Light light = getLight();
                        if(light.intensity > 0)
                            lightView->addLightSource(screenRect.center(), scaleFactor, light);
                    }
                    */
        }
    }]);

    return ThingType;
}();

ThingType.maskColors = [_color.Color.red, _color.Color.green, _color.Color.blue, _color.Color.yellow];

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Animator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animator = exports.Animator = function () {
    function Animator() {
        _classCallCheck(this, Animator);

        this.m_animationPhases = 0;
        this.m_startPhase = 0;
        this.m_loopCount = 0;
        this.m_async = false;
        this.m_phaseDurations = [];
        this.m_currentDuration = 0;
        this.m_currentDirection = _const.AnimationDirection.AnimDirForward;
        this.m_currentLoop = 0;
        this.m_lastPhaseTicks = 0;
        this.m_isComplete = false;
        this.m_phase = 0;
    }

    _createClass(Animator, [{
        key: "unserialize",
        value: function unserialize(animationPhases, fin) {
            this.m_animationPhases = animationPhases;
            this.m_async = fin.getU8() == 0;
            this.m_loopCount = fin.get32();
            this.m_startPhase = fin.get8();
            for (var i = 0; i < this.m_animationPhases; ++i) {
                var minimum = fin.getU32();
                var maximum = fin.getU32();
                this.m_phaseDurations.push([minimum, maximum]);
            }
            /*
            m_phase = getStartPhase();
             assert(m_animationPhases == (int)m_phaseDurations.size());
            assert(m_startPhase >= -1 && m_startPhase < m_animationPhases);
            */
        }
    }, {
        key: "getPhase",
        value: function getPhase() {
            return this.m_phase;
        }
    }]);

    return Animator;
}();

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputFile = undefined;

var _binarydatareader = __webpack_require__(128);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputFile = exports.InputFile = function (_BinaryDataReader) {
  _inherits(InputFile, _BinaryDataReader);

  function InputFile() {
    _classCallCheck(this, InputFile);

    return _possibleConstructorReturn(this, (InputFile.__proto__ || Object.getPrototypeOf(InputFile)).apply(this, arguments));
  }

  return InputFile;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThingTypeAttribs = exports.ThingTypeAttribs = function () {
    function ThingTypeAttribs() {
        _classCallCheck(this, ThingTypeAttribs);

        this.attribs = {};
    }

    _createClass(ThingTypeAttribs, [{
        key: "has",
        value: function has(attr) {
            return this.attribs.hasOwnProperty(attr.toString());
        }
    }, {
        key: "get",
        value: function get(attr) {
            return this.attribs[attr];
        }
    }, {
        key: "set",
        value: function set(attr, value) {
            //console.log(attr, value);
            this.attribs[attr] = value;
        }
    }, {
        key: "remove",
        value: function remove(attr) {
            delete this.attribs[attr];
        }
    }]);

    return ThingTypeAttribs;
}();

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Texture = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _painter = __webpack_require__(184);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var x = 0;
var y = 0;
var z = 0;

var Texture = exports.Texture = function () {
    function Texture(image) {
        var buildMipmaps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var compress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, Texture);

        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
        this.m_texture = [];
        console.log('texture load', x++);
        this.m_image = image;
    }

    _createClass(Texture, [{
        key: "getPixiTexture",
        value: function getPixiTexture(src) {
            var hash = src.hash();
            var textureCache = this.m_texture[hash];
            if (textureCache) {
                console.log('getPixiTexture CACHE', +new Date(), y++);
                return textureCache;
            }
            console.log('getPixiTexture LOAD', z++);
            var graphics = new PIXI.Graphics();
            console.log('kkk', src.left(), src.top(), src.right(), src.bottom(), src.height(), src.width());
            graphics.width = src.width();
            graphics.height = src.height();
            graphics.beginFill(0, 0);
            graphics.drawRect(0, 0, graphics.width, graphics.height);
            graphics.endFill();
            //this.m_image.getPixelData();
            var other = this.m_image;
            for (var p = 0; p < other.getPixelCount(); ++p) {
                var _x3 = (0, _helpers.toInt)(p % other.getWidth());
                var _y = (0, _helpers.toInt)(p / other.getWidth());
                if (_x3 >= src.left() && _x3 <= src.right()) {
                    if (_y >= src.top() && _y <= src.bottom()) {
                        if (other.m_pixels[p * 4 + 3] != 0) {
                            graphics.beginFill(other.m_pixels[p * 4] * 256 * 256 + other.m_pixels[p * 4 + 1] * 256 + other.m_pixels[p * 4 + 2], 1);
                            graphics.drawRect(_x3 - src.left(), _y - src.top(), 1, 1);
                            graphics.endFill();
                        }
                    }
                }
            }
            /*
                    let graphics = new PIXI.Graphics();
                    graphics.width = this.m_image.m_size.width();
                    graphics.height = this.m_image.m_size.height();
            
                    graphics.beginFill(0, 0);
                    graphics.drawRect(0,0, graphics.width,graphics.height);
                    graphics.endFill();
                    //this.m_image.getPixelData();
                    let other = this.m_image;
                    for (let p = 0; p < other.getPixelCount(); ++p) {
                        let x = toInt(p % other.getWidth());
                        let y = toInt(p / other.getWidth());
            
                        if (other.m_pixels[p * 4 + 3] != 0) {
                            graphics.beginFill(other.m_pixels[p * 4] * 256  * 256 + other.m_pixels[p * 4 + 1] * 256 + other.m_pixels[p * 4 + 2], 1);
                            graphics.drawRect(x, y, 1, 1);
                            graphics.endFill();
                        }
                    }
                    */
            this.m_texture[hash] = _painter.g_painter.app.renderer.generateTexture(graphics);
            return this.m_texture[hash];
            //return PIXI.Texture.fromImage('/prv/webclient/fronttypescript/favicon.png');
        }
    }]);

    return Texture;
}();

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarketData = exports.MarketData = function MarketData() {
  _classCallCheck(this, MarketData);
};

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProtocolGame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _protocol = __webpack_require__(456);

var _game = __webpack_require__(38);

var _const = __webpack_require__(13);

var _log = __webpack_require__(20);

var _outputmessage = __webpack_require__(457);

var _proto = __webpack_require__(187);

var _inputmessage = __webpack_require__(188);

var _outfit = __webpack_require__(186);

var _thing = __webpack_require__(54);

var _position = __webpack_require__(69);

var _item = __webpack_require__(459);

var _statictext = __webpack_require__(189);

var _thingtypemanager = __webpack_require__(63);

var _map = __webpack_require__(55);

var _effect = __webpack_require__(460);

var _animatedtext = __webpack_require__(461);

var _missile = __webpack_require__(462);

var _color2 = __webpack_require__(57);

var _player = __webpack_require__(180);

var _light = __webpack_require__(125);

var _npc = __webpack_require__(463);

var _monster = __webpack_require__(464);

var _awarerange = __webpack_require__(181);

var _mapview = __webpack_require__(126);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProtocolGame = exports.ProtocolGame = function (_Protocol) {
    _inherits(ProtocolGame, _Protocol);

    function ProtocolGame(game) {
        _classCallCheck(this, ProtocolGame);

        var _this = _possibleConstructorReturn(this, (ProtocolGame.__proto__ || Object.getPrototypeOf(ProtocolGame)).call(this));

        _this.m_gameInitialized = false;
        _this.m_mapKnown = false;
        return _this;
    }

    _createClass(ProtocolGame, [{
        key: "login",
        value: function login(accountName, accountPassword, host, port, characterName, authenticatorToken, sessionKey) {
            this.m_firstRecv = false;
            this.m_accountName = accountName;
            this.m_accountPassword = accountPassword;
            this.m_authenticatorToken = authenticatorToken;
            this.m_sessionKey = sessionKey;
            this.m_characterName = characterName;
            this.connect(host, port);
        }
    }, {
        key: "watch",
        value: function watch(m_movieData) {
            var i = 0;
            this.m_localPlayer = _game.g_game.getLocalPlayer();
            _mapview.g_mapview.followCreature(_game.g_game.getLocalPlayer());
            this.m_movieData = m_movieData;
            var first = 0;
            while (this.m_movieData.getUnreadSize() >= 10) {
                var timestamp = this.m_movieData.getU64();
                var s = this.m_movieData.getReadPos();
                if (this.m_movieData.getUnreadSize() >= 10) {
                    var next = this.m_movieData.peekU64();
                    //console.log('com', timestamp, next);
                    if (next - timestamp < 5000 && next - timestamp >= 0) {
                        continue;
                    }
                }
                this.m_movieData.setReadPos(s);
                var packetLength = this.m_movieData.getU16();
                var packetData = this.m_movieData.getBytes(packetLength);
                if (first === 0) first = timestamp;
                this.m_lastPacketTime = timestamp;
                var inputMessage = new _inputmessage.InputMessage(new DataView(packetData));
                this.parseMessage(inputMessage);
                if (++i >= 120) break;
            }
            console.error('loaded packets', i);
        }
    }, {
        key: "onConnect",
        value: function onConnect() {
            this.m_firstRecv = true;
            _get(ProtocolGame.prototype.__proto__ || Object.getPrototypeOf(ProtocolGame.prototype), "onConnect", this).call(this, null);
            this.m_localPlayer = _game.g_game.getLocalPlayer();
            if (_game.g_game.getFeature(_const.GameFeature.GameProtocolChecksum)) this.enableChecksum();
            if (!_game.g_game.getFeature(_const.GameFeature.GameChallengeOnLogin)) this.sendLoginPacket(0, 0);
        }
    }, {
        key: "onRecv",
        value: function onRecv(inputMessage) {
            _log.Log.debug("Game onRecv", inputMessage);
            /*todo checksum, msgsize etc. why is it wrong*/
            if (this.m_firstRecv) {
                this.m_firstRecv = false;
            }
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageSizeCheck)) {
                var size = inputMessage.getU16();
                if (size != inputMessage.getUnreadSize()) {
                    _log.Log.error("invalid message size", size, inputMessage.getUnreadSize(), inputMessage);
                    return;
                }
            }
            this.parseMessage(inputMessage);
        }
    }, {
        key: "onError",
        value: function onError(evt) {
            _game.g_game.processConnectionError();
            this.disconnect();
        }
    }, {
        key: "sendLoginPacket",
        value: function sendLoginPacket(challengeTimestamp, challengeRandom) {
            var msg = new _outputmessage.OutputMessage();
            msg.addU8(_proto.Proto.ClientPendingGame);
            msg.addU16(_game.g_game.getOs());
            msg.addU16(_game.g_game.getProtocolVersion());
            msg.addU8(0); // is GM
            msg.addString(this.m_accountName);
            msg.addString(this.m_characterName);
            msg.addString(this.m_accountPassword);
            msg.addU8(0); // RSA start
            msg.addU32(challengeTimestamp);
            msg.addU8(challengeRandom);
            if (_game.g_game.getFeature(_const.GameFeature.GameProtocolChecksum)) this.enableChecksum();
            this.send(msg);
            if (_game.g_game.getFeature(_const.GameFeature.GameLoginPacketEncryption)) this.enableXteaEncryption();
        }
    }, {
        key: "parseMessage",
        value: function parseMessage(msg) {
            var opcode = -1;
            var prevOpcode = -1;
            try {
                while (msg.getUnreadSize() > 0) {
                    opcode = msg.getU8();
                    //Log.debug('opcode', prevOpcode, opcode);
                    if (!_game.g_game.getFeature(_const.GameFeature.GameLoginPending)) {
                        if (!this.m_gameInitialized && opcode > _proto.Proto.GameServerFirstGameOpcode) {
                            //g_game.processGameStart();
                            this.m_gameInitialized = true;
                        }
                    }
                    /*
                    // try to parse in lua first
                    int readPos = msg.getReadPos();
                    if(callLuaField<bool>("onOpcode", opcode, msg))
                        continue;
                    else
                        msg.setReadPos(readPos); // restore read pos
                    */
                    switch (opcode) {
                        case _proto.Proto.GameServerLoginOrPendingState:
                            /*
                            if(g_game.getFeature(GameFeature.GameLoginPending))
                                this.parsePendingGame(msg);
                            else
                            */
                            this.parseLogin(msg);
                            break;
                        case _proto.Proto.GameServerGMActions:
                            this.parseGMActions(msg);
                            break;
                        case _proto.Proto.GameServerUpdateNeeded:
                            this.parseUpdateNeeded(msg);
                            break;
                        case _proto.Proto.GameServerLoginError:
                            this.parseLoginError(msg);
                            break;
                        case _proto.Proto.GameServerLoginAdvice:
                            this.parseLoginAdvice(msg);
                            break;
                        case _proto.Proto.GameServerLoginWait:
                            this.parseLoginWait(msg);
                            break;
                        case _proto.Proto.GameServerLoginToken:
                            this.parseLoginToken(msg);
                            break;
                        case _proto.Proto.GameServerPing:
                        case _proto.Proto.GameServerPingBack:
                            if (opcode == _proto.Proto.GameServerPing && _game.g_game.getFeature(_const.GameFeature.GameClientPing) || opcode == _proto.Proto.GameServerPingBack && !_game.g_game.getFeature(_const.GameFeature.GameClientPing)) this.parsePingBack(msg);else this.parsePing(msg);
                            break;
                        case _proto.Proto.GameServerChallenge:
                            this.parseChallenge(msg);
                            break;
                        case _proto.Proto.GameServerDeath:
                            this.parseDeath(msg);
                            break;
                        case _proto.Proto.GameServerFullMap:
                            this.parseMapDescription(msg);
                            break;
                        case _proto.Proto.GameServerMapTopRow:
                            this.parseMapMoveNorth(msg);
                            break;
                        case _proto.Proto.GameServerMapRightRow:
                            this.parseMapMoveEast(msg);
                            break;
                        case _proto.Proto.GameServerMapBottomRow:
                            this.parseMapMoveSouth(msg);
                            break;
                        case _proto.Proto.GameServerMapLeftRow:
                            this.parseMapMoveWest(msg);
                            break;
                        case _proto.Proto.GameServerUpdateTile:
                            this.parseUpdateTile(msg);
                            break;
                        case _proto.Proto.GameServerCreateOnMap:
                            this.parseTileAddThing(msg);
                            break;
                        case _proto.Proto.GameServerChangeOnMap:
                            this.parseTileTransformThing(msg);
                            break;
                        case _proto.Proto.GameServerDeleteOnMap:
                            this.parseTileRemoveThing(msg);
                            break;
                        case _proto.Proto.GameServerMoveCreature:
                            this.parseCreatureMove(msg);
                            break;
                        case _proto.Proto.GameServerOpenContainer:
                            this.parseOpenContainer(msg);
                            break;
                        case _proto.Proto.GameServerCloseContainer:
                            this.parseCloseContainer(msg);
                            break;
                        case _proto.Proto.GameServerCreateContainer:
                            this.parseContainerAddItem(msg);
                            break;
                        case _proto.Proto.GameServerChangeInContainer:
                            this.parseContainerUpdateItem(msg);
                            break;
                        case _proto.Proto.GameServerDeleteInContainer:
                            this.parseContainerRemoveItem(msg);
                            break;
                        case _proto.Proto.GameServerSetInventory:
                            this.parseAddInventoryItem(msg);
                            break;
                        case _proto.Proto.GameServerDeleteInventory:
                            this.parseRemoveInventoryItem(msg);
                            break;
                        case _proto.Proto.GameServerOpenNpcTrade:
                            this.parseOpenNpcTrade(msg);
                            break;
                        case _proto.Proto.GameServerPlayerGoods:
                            this.parsePlayerGoods(msg);
                            break;
                        case _proto.Proto.GameServerCloseNpcTrade:
                            this.parseCloseNpcTrade(msg);
                            break;
                        case _proto.Proto.GameServerOwnTrade:
                            this.parseOwnTrade(msg);
                            break;
                        case _proto.Proto.GameServerCounterTrade:
                            this.parseCounterTrade(msg);
                            break;
                        case _proto.Proto.GameServerCloseTrade:
                            this.parseCloseTrade(msg);
                            break;
                        case _proto.Proto.GameServerAmbient:
                            this.parseWorldLight(msg);
                            break;
                        case _proto.Proto.GameServerGraphicalEffect:
                            this.parseMagicEffect(msg);
                            break;
                        case _proto.Proto.GameServerTextEffect:
                            this.parseAnimatedText(msg);
                            break;
                        case _proto.Proto.GameServerMissleEffect:
                            this.parseDistanceMissile(msg);
                            break;
                        case _proto.Proto.GameServerMarkCreature:
                            this.parseCreatureMark(msg);
                            break;
                        case _proto.Proto.GameServerTrappers:
                            this.parseTrappers(msg);
                            break;
                        case _proto.Proto.GameServerCreatureHealth:
                            this.parseCreatureHealth(msg);
                            break;
                        case _proto.Proto.GameServerCreatureLight:
                            this.parseCreatureLight(msg);
                            break;
                        case _proto.Proto.GameServerCreatureOutfit:
                            this.parseCreatureOutfit(msg);
                            break;
                        case _proto.Proto.GameServerCreatureSpeed:
                            this.parseCreatureSpeed(msg);
                            break;
                        case _proto.Proto.GameServerCreatureSkull:
                            this.parseCreatureSkulls(msg);
                            break;
                        case _proto.Proto.GameServerCreatureParty:
                            this.parseCreatureShields(msg);
                            break;
                        case _proto.Proto.GameServerCreatureUnpass:
                            this.parseCreatureUnpass(msg);
                            break;
                        case _proto.Proto.GameServerEditText:
                            this.parseEditText(msg);
                            break;
                        case _proto.Proto.GameServerEditList:
                            this.parseEditList(msg);
                            break;
                        // PROTOCOL>=1038
                        case _proto.Proto.GameServerPremiumTrigger:
                            this.parsePremiumTrigger(msg);
                            break;
                        case _proto.Proto.GameServerPlayerData:
                            this.parsePlayerStats(msg);
                            break;
                        case _proto.Proto.GameServerPlayerSkills:
                            this.parsePlayerSkills(msg);
                            break;
                        case _proto.Proto.GameServerPlayerState:
                            this.parsePlayerState(msg);
                            break;
                        case _proto.Proto.GameServerClearTarget:
                            this.parsePlayerCancelAttack(msg);
                            break;
                        case _proto.Proto.GameServerPlayerModes:
                            this.parsePlayerModes(msg);
                            break;
                        case _proto.Proto.GameServerTalk:
                            this.parseTalk(msg);
                            break;
                        case _proto.Proto.GameServerChannels:
                            this.parseChannelList(msg);
                            break;
                        case _proto.Proto.GameServerOpenChannel:
                            this.parseOpenChannel(msg);
                            break;
                        case _proto.Proto.GameServerOpenPrivateChannel:
                            this.parseOpenPrivateChannel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationChannel:
                            this.parseRuleViolationChannel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationRemove:
                            this.parseRuleViolationRemove(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationCancel:
                            this.parseRuleViolationCancel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationLock:
                            this.parseRuleViolationLock(msg);
                            break;
                        case _proto.Proto.GameServerOpenOwnChannel:
                            this.parseOpenOwnPrivateChannel(msg);
                            break;
                        case _proto.Proto.GameServerCloseChannel:
                            this.parseCloseChannel(msg);
                            break;
                        case _proto.Proto.GameServerTextMessage:
                            this.parseTextMessage(msg);
                            break;
                        case _proto.Proto.GameServerCancelWalk:
                            this.parseCancelWalk(msg);
                            break;
                        case _proto.Proto.GameServerWalkWait:
                            this.parseWalkWait(msg);
                            break;
                        case _proto.Proto.GameServerFloorChangeUp:
                            this.parseFloorChangeUp(msg);
                            break;
                        case _proto.Proto.GameServerFloorChangeDown:
                            this.parseFloorChangeDown(msg);
                            break;
                        case _proto.Proto.GameServerChooseOutfit:
                            this.parseOpenOutfitWindow(msg);
                            break;
                        case _proto.Proto.GameServerVipAdd:
                            this.parseVipAdd(msg);
                            break;
                        case _proto.Proto.GameServerVipState:
                            this.parseVipState(msg);
                            break;
                        case _proto.Proto.GameServerVipLogout:
                            this.parseVipLogout(msg);
                            break;
                        case _proto.Proto.GameServerTutorialHint:
                            this.parseTutorialHint(msg);
                            break;
                        case _proto.Proto.GameServerAutomapFlag:
                            this.parseAutomapFlag(msg);
                            break;
                        case _proto.Proto.GameServerQuestLog:
                            this.parseQuestLog(msg);
                            break;
                        case _proto.Proto.GameServerQuestLine:
                            this.parseQuestLine(msg);
                            break;
                        // PROTOCOL>=870
                        case _proto.Proto.GameServerSpellDelay:
                            this.parseSpellCooldown(msg);
                            break;
                        case _proto.Proto.GameServerSpellGroupDelay:
                            this.parseSpellGroupCooldown(msg);
                            break;
                        case _proto.Proto.GameServerMultiUseDelay:
                            this.parseMultiUseCooldown(msg);
                            break;
                        // PROTOCOL>=910
                        case _proto.Proto.GameServerChannelEvent:
                            this.parseChannelEvent(msg);
                            break;
                        case _proto.Proto.GameServerItemInfo:
                            this.parseItemInfo(msg);
                            break;
                        case _proto.Proto.GameServerPlayerInventory:
                            this.parsePlayerInventory(msg);
                            break;
                        // PROTOCOL>=950
                        case _proto.Proto.GameServerPlayerDataBasic:
                            this.parsePlayerInfo(msg);
                            break;
                        // PROTOCOL>=970
                        case _proto.Proto.GameServerModalDialog:
                            this.parseModalDialog(msg);
                            break;
                        // PROTOCOL>=980
                        case _proto.Proto.GameServerLoginSuccess:
                            this.parseLogin(msg);
                            break;
                        case _proto.Proto.GameServerEnterGame:
                            this.parseEnterGame(msg);
                            break;
                        case _proto.Proto.GameServerPlayerHelpers:
                            this.parsePlayerHelpers(msg);
                            break;
                        // PROTOCOL>=1000
                        case _proto.Proto.GameServerCreatureMarks:
                            this.parseCreaturesMark(msg);
                            break;
                        case _proto.Proto.GameServerCreatureType:
                            this.parseCreatureType(msg);
                            break;
                        // PROTOCOL>=1055
                        case _proto.Proto.GameServerBlessings:
                            this.parseBlessings(msg);
                            break;
                        case _proto.Proto.GameServerUnjustifiedStats:
                            this.parseUnjustifiedStats(msg);
                            break;
                        case _proto.Proto.GameServerPvpSituations:
                            this.parsePvpSituations(msg);
                            break;
                        case _proto.Proto.GameServerPreset:
                            this.parsePreset(msg);
                            break;
                        // PROTOCOL>=1080
                        case _proto.Proto.GameServerCoinBalanceUpdating:
                            this.parseCoinBalanceUpdating(msg);
                            break;
                        case _proto.Proto.GameServerCoinBalance:
                            this.parseCoinBalance(msg);
                            break;
                        case _proto.Proto.GameServerRequestPurchaseData:
                            this.parseRequestPurchaseData(msg);
                            break;
                        case _proto.Proto.GameServerStoreCompletePurchase:
                            this.parseCompleteStorePurchase(msg);
                            break;
                        case _proto.Proto.GameServerStoreOffers:
                            this.parseStoreOffers(msg);
                            break;
                        case _proto.Proto.GameServerStoreTransactionHistory:
                            this.parseStoreTransactionHistory(msg);
                            break;
                        case _proto.Proto.GameServerStoreError:
                            this.parseStoreError(msg);
                            break;
                        case _proto.Proto.GameServerStore:
                            this.parseStore(msg);
                            break;
                        // PROTOCOL>=1097
                        case _proto.Proto.GameServerStoreButtonIndicators:
                            this.parseStoreButtonIndicators(msg);
                            break;
                        case _proto.Proto.GameServerSetStoreDeepLink:
                            this.parseSetStoreDeepLink(msg);
                            break;
                        // otclient ONLY
                        case _proto.Proto.GameServerExtendedOpcode:
                            this.parseExtendedOpcode(msg);
                            break;
                        case _proto.Proto.GameServerChangeMapAwareRange:
                            this.parseChangeMapAwareRange(msg);
                            break;
                        case 55:
                            this.parseBotPackage(msg);
                            return;
                        default:
                            _log.Log.error("unhandled opcode %d", opcode, msg);
                            throw new Error('opcode');
                    }
                    prevOpcode = opcode;
                }
            } catch (e) {
                _log.Log.error("ProtocolGame parse message exception (%d bytes unread, last opcode is %d, prev opcode is %d): %s", msg.getUnreadSize(), opcode, prevOpcode, e);
                throw new Error('parser');
            }
        }
    }, {
        key: "sendPingBack",
        value: function sendPingBack() {
            //console.log('sendPingBack');
            //console.log(g_map.m_floorMissiles);
            console.log(_map.g_map.m_tileBlocks, _map.g_map.m_knownCreatures, this.m_localPlayer);
            if (this.m_localPlayer && this.m_localPlayer.isKnown()) {
                var pos = this.m_localPlayer.getPosition();
                for (var y = pos.y - 7; y <= pos.y + 7; y++) {
                    var row = [];
                    for (var x = pos.x - 7; x <= pos.x + 7; x++) {
                        if (_map.g_map.getTile(new _position.Position(x, y, 7))) row.push(_map.g_map.getTile(new _position.Position(x, y, 7)).getItems());else row.push([]);
                    }
                    //console.log(row);
                }
                //console.log()
            }
            var msg = new _outputmessage.OutputMessage();
            msg.addU8(_proto.Proto.ClientPingBack);
            this.send(msg);
        }
    }, {
        key: "parseLogin",
        value: function parseLogin(msg) {
            var playerId = msg.getU32();
            var serverBeat = msg.getU16();
            var canReportBugs = msg.getU8();
            if (_game.g_game.getClientVersion() >= 1054) msg.getU8(); // can change pvp frame option
            if (_game.g_game.getClientVersion() >= 1058) {
                var expertModeEnabled = msg.getU8();
                //g_game.setExpertPvpMode(expertModeEnabled);
            }
            if (_game.g_game.getFeature(_const.GameFeature.GameIngameStore)) {
                // URL to ingame store images
                msg.getString();
                // premium coin package size
                // e.g you can only buy packs of 25, 50, 75, .. coins in the market
                msg.getU16();
            }
            this.m_localPlayer.setId(playerId);
            _log.Log.error('local pid', playerId);
            //g_game.setServerBeat(serverBeat);
            //g_game.setCanReportBugs(canReportBugs);
            //g_game.processLogin();
        }
    }, {
        key: "parsePendingGame",
        value: function parsePendingGame(msg) {
            //set player to pending game state
            //g_game.processPendingGame();
        }
    }, {
        key: "parseEnterGame",
        value: function parseEnterGame(msg) {
            //set player to entered game state
            //g_game.processEnterGame();
            if (!this.m_gameInitialized) {
                //g_game.processGameStart();
                this.m_gameInitialized = true;
            }
        }
    }, {
        key: "parseStoreButtonIndicators",
        value: function parseStoreButtonIndicators(msg) {
            msg.getU8(); // unknown
            msg.getU8(); // unknown
        }
    }, {
        key: "parseSetStoreDeepLink",
        value: function parseSetStoreDeepLink(msg) {
            var currentlyFeaturedServiceType = msg.getU8();
        }
    }, {
        key: "parseBlessings",
        value: function parseBlessings(msg) {
            var blessings = msg.getU16();
            this.m_localPlayer.setBlessings(blessings);
        }
    }, {
        key: "parsePreset",
        value: function parsePreset(msg) {
            var preset = msg.getU32();
        }
    }, {
        key: "parseRequestPurchaseData",
        value: function parseRequestPurchaseData(msg) {
            var transactionId = msg.getU32();
            var productType = msg.getU8();
        }
    }, {
        key: "parseStore",
        value: function parseStore(msg) {
            this.parseCoinBalance(msg);
            // Parse all categories
            var count = msg.getU16();
            for (var i = 0; i < count; i++) {
                var category = msg.getString();
                var description = msg.getString();
                var highlightState = 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights)) highlightState = msg.getU8();
                var icons = [];
                var iconCount = msg.getU8();
                for (var _i = 0; _i < iconCount; _i++) {
                    var icon = msg.getString();
                    icons.push(icon);
                }
                // If this is a valid category name then
                // the category we just parsed is a child of that
                var parentCategory = msg.getString();
            }
        }
    }, {
        key: "parseCoinBalance",
        value: function parseCoinBalance(msg) {
            var update = msg.getU8() == 1;
            var coins = -1;
            var transferableCoins = -1;
            if (update) {
                // amount of coins that can be used to buy prodcuts
                // in the ingame store
                coins = msg.getU32();
                // amount of coins that can be sold in market
                // or be transfered to another player
                transferableCoins = msg.getU32();
            }
        }
    }, {
        key: "parseCoinBalanceUpdating",
        value: function parseCoinBalanceUpdating(msg) {
            // coin balance can be updating and might not be accurate
            var isUpdating = msg.getU8() == 1;
        }
    }, {
        key: "parseCompleteStorePurchase",
        value: function parseCompleteStorePurchase(msg) {
            // not used
            msg.getU8();
            var message = msg.getString();
            var coins = msg.getU32();
            var transferableCoins = msg.getU32();
            _log.Log.debug("Purchase Complete: %s", message);
        }
    }, {
        key: "parseStoreTransactionHistory",
        value: function parseStoreTransactionHistory(msg) {
            var currentPage = void 0;
            if (_game.g_game.getClientVersion() <= 1096) {
                currentPage = msg.getU16();
                var hasNextPage = msg.getU8() == 1;
            } else {
                currentPage = msg.getU32();
                var pageCount = msg.getU32();
            }
            var entries = msg.getU8();
            for (var i = 0; i < entries; i++) {
                var time = msg.getU16();
                var productType = msg.getU8();
                var coinChange = msg.getU32();
                var productName = msg.getString();
                _log.Log.debug("Time %i, type %i, change %i, product name %s", time, productType, coinChange, productName);
            }
        }
    }, {
        key: "parseStoreOffers",
        value: function parseStoreOffers(msg) {
            var categoryName = msg.getString();
            var offers = msg.getU16();
            for (var i = 0; i < offers; i++) {
                var offerId = msg.getU32();
                var offerName = msg.getString();
                var offerDescription = msg.getString();
                var price = msg.getU32();
                var highlightState = msg.getU8();
                if (highlightState == 2 && _game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights) && _game.g_game.getClientVersion() >= 1097) {
                    var saleValidUntilTimestamp = msg.getU32();
                    var basePrice = msg.getU32();
                }
                var disabledState = msg.getU8();
                var disabledReason = "";
                if (_game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights) && disabledState == 1) {
                    disabledReason = msg.getString();
                }
                var icons = msg.getU8();
                for (var j = 0; j < icons; j++) {
                    var icon = msg.getString();
                }
                var subOffers = msg.getU16();
                for (var _j = 0; _j < subOffers; _j++) {
                    var name = msg.getString();
                    var description = msg.getString();
                    var subIcons = msg.getU8();
                    for (var k = 0; k < subIcons; k++) {
                        var _icon = msg.getString();
                    }
                    var serviceType = msg.getString();
                }
            }
        }
    }, {
        key: "parseStoreError",
        value: function parseStoreError(msg) {
            var errorType = msg.getU8();
            var message = msg.getString();
            _log.Log.error("Store Error: %s [%i]", message, errorType);
        }
    }, {
        key: "parseUnjustifiedStats",
        value: function parseUnjustifiedStats(msg) {
            var unjustifiedPoints = void 0;
            unjustifiedPoints.killsDay = msg.getU8();
            unjustifiedPoints.killsDayRemaining = msg.getU8();
            unjustifiedPoints.killsWeek = msg.getU8();
            unjustifiedPoints.killsWeekRemaining = msg.getU8();
            unjustifiedPoints.killsMonth = msg.getU8();
            unjustifiedPoints.killsMonthRemaining = msg.getU8();
            unjustifiedPoints.skullTime = msg.getU8();
            //g_game.setUnjustifiedPoints(unjustifiedPoints);
        }
    }, {
        key: "parsePvpSituations",
        value: function parsePvpSituations(msg) {
            var openPvpSituations = msg.getU8();
            //g_game.setOpenPvpSituations(openPvpSituations);
        }
    }, {
        key: "parsePlayerHelpers",
        value: function parsePlayerHelpers(msg) {
            var id = msg.getU32();
            var helpers = msg.getU16();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) {
                //g_game.processPlayerHelpers(helpers);
            } else _log.Log.error("could not get creature with id %d", id);
        }
    }, {
        key: "parseGMActions",
        value: function parseGMActions(msg) {
            var actions = [];
            var numViolationReasons = void 0;
            if (_game.g_game.getClientVersion() >= 850) numViolationReasons = 20;else if (_game.g_game.getClientVersion() >= 840) numViolationReasons = 23;else numViolationReasons = 32;
            for (var i = 0; i < numViolationReasons; ++i) {
                actions.push(msg.getU8());
            }_log.Log.debug(numViolationReasons, actions);
            //g_game.processGMActions(actions);
        }
    }, {
        key: "parseUpdateNeeded",
        value: function parseUpdateNeeded(msg) {
            var signature = msg.getString();
            //g_game.processUpdateNeeded(signature);
        }
    }, {
        key: "parseLoginError",
        value: function parseLoginError(msg) {
            var error = msg.getString();
            _log.Log.error('login error', error);
            //g_game.processLoginError(error);
        }
    }, {
        key: "parseLoginAdvice",
        value: function parseLoginAdvice(msg) {
            var message = msg.getString();
            //g_game.processLoginAdvice(message);
        }
    }, {
        key: "parseLoginWait",
        value: function parseLoginWait(msg) {
            var message = msg.getString();
            var time = msg.getU8();
            //g_game.processLoginWait(message, time);
        }
    }, {
        key: "parseLoginToken",
        value: function parseLoginToken(msg) {
            var unknown = msg.getU8() == 0;
            //g_game.processLoginToken(unknown);
        }
    }, {
        key: "parsePing",
        value: function parsePing(msg) {
            //this.sendPingBack();
        }
    }, {
        key: "parsePingBack",
        value: function parsePingBack(msg) {
            //g_game.processPingBack();
        }
    }, {
        key: "parseChallenge",
        value: function parseChallenge(msg) {
            var timestamp = msg.getU32();
            var random = msg.getU8();
            this.sendLoginPacket(timestamp, random);
        }
    }, {
        key: "parseDeath",
        value: function parseDeath(msg) {
            var penality = 100;
            var deathType = _const.DeathType.DeathRegular;
            if (_game.g_game.getFeature(_const.GameFeature.GameDeathType)) deathType = msg.getU8();
            if (_game.g_game.getFeature(_const.GameFeature.GamePenalityOnDeath) && deathType == _const.DeathType.DeathRegular) penality = msg.getU8();
            //g_game.processDeath(deathType, penality);
        }
    }, {
        key: "parseMapDescription",
        value: function parseMapDescription(msg) {
            var pos = this.getPosition(msg);
            if (!this.m_mapKnown) this.m_localPlayer.setPosition(pos);
            _map.g_map.setCentralPosition(pos);
            _log.Log.debug(this.m_localPlayer, _map.g_map.getCentralPosition());
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), range.vertical());
            if (!this.m_mapKnown) {
                this.m_mapKnown = true;
            }
            //g_dispatcher.addEvent([] { g_lua.callGlobalField("g_game", "onMapDescription"); });
        }
    }, {
        key: "parseMapMoveNorth",
        value: function parseMapMoveNorth(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.y--;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), 1);
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveEast",
        value: function parseMapMoveEast(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.x++;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x + range.right, pos.y - range.top, pos.z, 1, range.vertical());
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveSouth",
        value: function parseMapMoveSouth(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.y++;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y + range.bottom, pos.z, range.horizontal(), 1);
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveWest",
        value: function parseMapMoveWest(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.x--;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, 1, range.vertical());
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseUpdateTile",
        value: function parseUpdateTile(msg) {
            var tilePos = this.getPosition(msg);
            this.setTileDescription(msg, tilePos);
        }
    }, {
        key: "parseTileAddThing",
        value: function parseTileAddThing(msg) {
            var pos = this.getPosition(msg);
            var stackPos = -1;
            if (_game.g_game.getClientVersion() >= 841) stackPos = msg.getU8();
            var thing = this.getThing(msg);
            _map.g_map.addThing(thing, pos, stackPos);
        }
    }, {
        key: "parseTileTransformThing",
        value: function parseTileTransformThing(msg) {
            var thing = this.getMappedThing(msg);
            var newThing = this.getThing(msg);
            if (!thing) {
                _log.Log.error("no thing");
                return;
            }
            var pos = thing.getPosition();
            var stackpos = thing.getStackPos();
            if (!_map.g_map.removeThing(thing)) {
                _log.Log.error("unable to remove thing");
                return;
            }
            _map.g_map.addThing(newThing, pos, stackpos);
        }
    }, {
        key: "parseTileRemoveThing",
        value: function parseTileRemoveThing(msg) {
            var thing = this.getMappedThing(msg);
            if (!thing) {
                _log.Log.error("no thing");
                return;
            }
            if (!_map.g_map.removeThing(thing)) _log.Log.error("unable to remove thing");
        }
    }, {
        key: "parseCreatureMove",
        value: function parseCreatureMove(msg) {
            var thing = this.getMappedThing(msg);
            var newPos = this.getPosition(msg);
            if (!thing || !thing.isCreature()) {
                _log.Log.error("no creature found to move", thing);
                return;
            }
            if (!_map.g_map.removeThing(thing)) {
                _log.Log.error("unable to remove creature");
                return;
            }
            var creature = thing;
            creature.allowAppearWalk();
            //Log.debug('creature move', creature, g_map.getTile(newPos).m_things);
            _map.g_map.addThing(thing, newPos, -1);
        }
    }, {
        key: "parseOpenContainer",
        value: function parseOpenContainer(msg) {
            var containerId = msg.getU8();
            var containerItem = this.getItem(msg);
            var name = msg.getString();
            var capacity = msg.getU8();
            var hasParent = msg.getU8() != 0;
            var isUnlocked = true;
            var hasPages = false;
            var containerSize = 0;
            var firstIndex = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                isUnlocked = msg.getU8() != 0; // drag and drop
                hasPages = msg.getU8() != 0; // pagination
                containerSize = msg.getU16(); // container size
                firstIndex = msg.getU16(); // first index
            }
            var itemCount = msg.getU8();
            var items = [];
            for (var i = 0; i < itemCount; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processOpenContainer(containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex);
        }
    }, {
        key: "parseCloseContainer",
        value: function parseCloseContainer(msg) {
            var containerId = msg.getU8();
            //g_game.processCloseContainer(containerId);
        }
    }, {
        key: "parseContainerAddItem",
        value: function parseContainerAddItem(msg) {
            var containerId = msg.getU8();
            var slot = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16(); // slot
            }
            var item = this.getItem(msg);
            //g_game.processContainerAddItem(containerId, item, slot);
        }
    }, {
        key: "parseContainerUpdateItem",
        value: function parseContainerUpdateItem(msg) {
            var containerId = msg.getU8();
            var slot = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16();
            } else {
                slot = msg.getU8();
            }
            var item = this.getItem(msg);
            //g_game.processContainerUpdateItem(containerId, slot, item);
        }
    }, {
        key: "parseContainerRemoveItem",
        value: function parseContainerRemoveItem(msg) {
            var containerId = msg.getU8();
            var slot = void 0;
            var lastItem = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16();
                var itemId = msg.getU16();
                if (itemId != 0) lastItem = this.getItem(msg, itemId);
            } else {
                slot = msg.getU8();
            }
            //g_game.processContainerRemoveItem(containerId, slot, lastItem);
        }
    }, {
        key: "parseAddInventoryItem",
        value: function parseAddInventoryItem(msg) {
            var slot = msg.getU8();
            var item = this.getItem(msg);
            //g_game.processInventoryChange(slot, item);
        }
    }, {
        key: "parseRemoveInventoryItem",
        value: function parseRemoveInventoryItem(msg) {
            var slot = msg.getU8();
            //g_game.processInventoryChange(slot, new Item());
        }
    }, {
        key: "parseOpenNpcTrade",
        value: function parseOpenNpcTrade(msg) {
            var items = [];
            var npcName = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameNameOnNpcTrade)) npcName = msg.getString();
            var listCount = void 0;
            if (_game.g_game.getClientVersion() >= 900) listCount = msg.getU16();else listCount = msg.getU8();
            for (var i = 0; i < listCount; ++i) {
                var itemId = msg.getU16();
                var count = msg.getU8();
                var item = new _item.Item(itemId);
                item.setCountOrSubType(count);
                var name = msg.getString();
                var weight = msg.getU32();
                var buyPrice = msg.getU32();
                var sellPrice = msg.getU32();
                items.push([item, name, weight, buyPrice, sellPrice]);
            }
            //g_game.processOpenNpcTrade(items);
        }
    }, {
        key: "parsePlayerGoods",
        value: function parsePlayerGoods(msg) {
            var goods = [];
            var money = void 0;
            if (_game.g_game.getClientVersion() >= 973) money = msg.getU64();else money = msg.getU32();
            var size = msg.getU8();
            for (var i = 0; i < size; i++) {
                var itemId = msg.getU16();
                var amount = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameDoubleShopSellAmount)) amount = msg.getU16();else amount = msg.getU8();
                goods.push([new _item.Item(itemId), amount]);
            }
            //g_game.processPlayerGoods(money, goods);
        }
    }, {
        key: "parseCloseNpcTrade",
        value: function parseCloseNpcTrade(msg) {
            //g_game.processCloseNpcTrade();
        }
    }, {
        key: "parseOwnTrade",
        value: function parseOwnTrade(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            var count = msg.getU8();
            var items = [];
            for (var i = 0; i < count; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processOwnTrade(name, items);
        }
    }, {
        key: "parseCounterTrade",
        value: function parseCounterTrade(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            var count = msg.getU8();
            var items = [];
            for (var i = 0; i < count; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processCounterTrade(name, items);
        }
    }, {
        key: "parseCloseTrade",
        value: function parseCloseTrade(msg) {
            //g_game.processCloseTrade();
        }
    }, {
        key: "parseWorldLight",
        value: function parseWorldLight(msg) {
            var light = new _light.Light();
            light.intensity = msg.getU8();
            light.color = msg.getU8();
            _map.g_map.setLight(light);
        }
    }, {
        key: "parseMagicEffect",
        value: function parseMagicEffect(msg) {
            var pos = this.getPosition(msg);
            var effectId = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMagicEffectU16)) effectId = msg.getU16();else effectId = msg.getU8();
            if (!_thingtypemanager.g_things.isValidDatId(effectId, _const.ThingCategory.ThingCategoryEffect)) {
                _log.Log.error("invalid effect id %d", effectId);
                return;
            }
            var effect = new _effect.Effect();
            effect.setId(effectId);
            _map.g_map.addThing(effect, pos);
        }
    }, {
        key: "parseAnimatedText",
        value: function parseAnimatedText(msg) {
            var position = this.getPosition(msg);
            var color = msg.getU8();
            var text = msg.getString();
            var animatedText = new _animatedtext.AnimatedText();
            animatedText.setColor(color);
            animatedText.setText(text);
            _map.g_map.addThing(animatedText, position);
        }
    }, {
        key: "parseDistanceMissile",
        value: function parseDistanceMissile(msg) {
            var fromPos = this.getPosition(msg);
            var toPos = this.getPosition(msg);
            var shotId = msg.getU8();
            if (!_thingtypemanager.g_things.isValidDatId(shotId, _const.ThingCategory.ThingCategoryMissile)) {
                _log.Log.error("invalid missile id %d", shotId);
                return;
            }
            var missile = new _missile.Missile();
            missile.setId(shotId);
            missile.setPath(fromPos, toPos);
            _map.g_map.addThing(missile, fromPos);
        }
    }, {
        key: "parseCreatureMark",
        value: function parseCreatureMark(msg) {
            var id = msg.getU32();
            var color = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.addTimedSquare(color);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseTrappers",
        value: function parseTrappers(msg) {
            var numTrappers = msg.getU8();
            if (numTrappers > 8) _log.Log.error("too many trappers");
            for (var i = 0; i < numTrappers; ++i) {
                var id = msg.getU32();
                var creature = _map.g_map.getCreatureById(id);
                if (creature) {
                    //TODO: set creature as trapper
                } else _log.Log.error("could not get creature");
            }
        }
    }, {
        key: "parseCreatureHealth",
        value: function parseCreatureHealth(msg) {
            var id = msg.getU32();
            var healthPercent = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setHealthPercent(healthPercent);
            // some servers has a bug in get spectators and sends unknown creatures updates
            // so this code is disabled
            /*
            else
                g_logger.traceError("could not get creature");
            */
        }
    }, {
        key: "parseCreatureLight",
        value: function parseCreatureLight(msg) {
            var id = msg.getU32();
            var light = new _light.Light();
            light.intensity = msg.getU8();
            light.color = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setLight(light);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureOutfit",
        value: function parseCreatureOutfit(msg) {
            var id = msg.getU32();
            var outfit = this.getOutfit(msg);
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setOutfit(outfit);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureSpeed",
        value: function parseCreatureSpeed(msg) {
            var id = msg.getU32();
            var baseSpeed = -1;
            if (_game.g_game.getClientVersion() >= 1059) baseSpeed = msg.getU16();
            var speed = msg.getU16();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) {
                creature.setSpeed(speed);
                if (baseSpeed != -1) creature.setBaseSpeed(baseSpeed);
            }
            // some servers has a bug in get spectators and sends unknown creatures updates
            // so this code is disabled
            /*
            else
                g_logger.traceError("could not get creature");
            */
        }
    }, {
        key: "parseCreatureSkulls",
        value: function parseCreatureSkulls(msg) {
            var id = msg.getU32();
            var skull = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setSkull(skull);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureShields",
        value: function parseCreatureShields(msg) {
            var id = msg.getU32();
            var shield = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setShield(shield);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureUnpass",
        value: function parseCreatureUnpass(msg) {
            var id = msg.getU32();
            var unpass = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setPassable(!unpass);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseEditText",
        value: function parseEditText(msg) {
            var id = msg.getU32();
            var itemId = void 0;
            if (_game.g_game.getClientVersion() >= 1010) {
                // TODO: processEditText with ItemPtr as parameter
                var item = this.getItem(msg);
                itemId = item.getId();
            } else itemId = msg.getU16();
            var maxLength = msg.getU16();
            var text = msg.getString();
            var writer = msg.getString();
            var date = "";
            if (_game.g_game.getFeature(_const.GameFeature.GameWritableDate)) date = msg.getString();
            //g_game.processEditText(id, itemId, maxLength, text, writer, date);
        }
    }, {
        key: "parseEditList",
        value: function parseEditList(msg) {
            var doorId = msg.getU8();
            var id = msg.getU32();
            var text = msg.getString();
            //g_game.processEditList(id, doorId, text);
        }
    }, {
        key: "parsePremiumTrigger",
        value: function parsePremiumTrigger(msg) {
            var triggerCount = msg.getU8();
            var triggers = void 0;
            for (var i = 0; i < triggerCount; ++i) {
                triggers.push_back(msg.getU8());
            }
            if (_game.g_game.getClientVersion() <= 1096) {
                var something = msg.getU8() == 1;
            }
        }
    }, {
        key: "parsePlayerInfo",
        value: function parsePlayerInfo(msg) {
            var premium = msg.getU8(); // premium
            if (_game.g_game.getFeature(_const.GameFeature.GamePremiumExpiration)) {
                var premiumEx = msg.getU32(); // premium expiration used for premium advertisement
            }
            var vocation = msg.getU8(); // vocation
            var spellCount = msg.getU16();
            var spells = void 0;
            for (var i = 0; i < spellCount; ++i) {
                spells.push(msg.getU8());
            } // spell id
            //m_localPlayer.setPremium(premium);
            //m_localPlayer.setVocation(vocation);
            //m_localPlayer.setSpells(spells);
        }
    }, {
        key: "parsePlayerStats",
        value: function parsePlayerStats(msg) {
            var health = void 0;
            var maxHealth = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleHealth)) {
                health = msg.getU32();
                maxHealth = msg.getU32();
            } else {
                health = msg.getU16();
                maxHealth = msg.getU16();
            }
            var freeCapacity = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleFreeCapacity)) freeCapacity = msg.getU32() / 100.0;else freeCapacity = msg.getU16() / 100.0;
            var totalCapacity = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameTotalCapacity)) totalCapacity = msg.getU32() / 100.0;
            var experience = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleExperience)) experience = msg.getU64();else experience = msg.getU32();
            var level = msg.getU16();
            var levelPercent = msg.getU8();
            if (_game.g_game.getFeature(_const.GameFeature.GameExperienceBonus)) {
                if (_game.g_game.getClientVersion() <= 1096) {
                    var experienceBonus = msg.getDouble();
                } else {
                    var baseXpGain = msg.getU16();
                    var voucherAddend = msg.getU16();
                    var grindingAddend = msg.getU16();
                    var storeBoostAddend = msg.getU16();
                    var huntingBoostFactor = msg.getU16();
                }
            }
            var mana = void 0;
            var maxMana = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleHealth)) {
                mana = msg.getU32();
                maxMana = msg.getU32();
            } else {
                mana = msg.getU16();
                maxMana = msg.getU16();
            }
            var magicLevel = msg.getU8();
            var baseMagicLevel = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) baseMagicLevel = msg.getU8();else baseMagicLevel = magicLevel;
            var magicLevelPercent = msg.getU8();
            var soul = msg.getU8();
            var stamina = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerStamina)) stamina = msg.getU16();
            var baseSpeed = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) baseSpeed = msg.getU16();
            var regeneration = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerRegenerationTime)) regeneration = msg.getU16();
            var training = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameOfflineTrainingTime)) {
                training = msg.getU16();
                if (_game.g_game.getClientVersion() >= 1097) {
                    var remainingStoreXpBoostSeconds = msg.getU16();
                    var canBuyMoreStoreXpBoosts = msg.getU8();
                }
            }
            /*
                m_localPlayer.setHealth(health, maxHealth);
                m_localPlayer.setFreeCapacity(freeCapacity);
                m_localPlayer.setTotalCapacity(totalCapacity);
                m_localPlayer.setExperience(experience);
                m_localPlayer.setLevel(level, levelPercent);
                m_localPlayer.setMana(mana, maxMana);
                m_localPlayer.setMagicLevel(magicLevel, magicLevelPercent);
                m_localPlayer.setBaseMagicLevel(baseMagicLevel);
                m_localPlayer.setStamina(stamina);
                m_localPlayer.setSoul(soul);
                m_localPlayer.setBaseSpeed(baseSpeed);
                m_localPlayer.setRegenerationTime(regeneration);
                m_localPlayer.setOfflineTrainingTime(training);
                */
        }
    }, {
        key: "parsePlayerSkills",
        value: function parsePlayerSkills(msg) {
            var lastSkill = _const.Skill.Fishing + 1;
            if (_game.g_game.getFeature(_const.GameFeature.GameAdditionalSkills)) lastSkill = _const.Skill.LastSkill;
            for (var skill = 0; skill < lastSkill; skill++) {
                var level = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameDoubleSkills)) level = msg.getU16();else level = msg.getU8();
                var baseLevel = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) {
                    if (_game.g_game.getFeature(_const.GameFeature.GameBaseSkillU16)) baseLevel = msg.getU16();else baseLevel = msg.getU8();
                } else baseLevel = level;
                var levelPercent = 0;
                // Critical, Life Leech and Mana Leech have no level percent
                if (skill <= _const.Skill.Fishing) levelPercent = msg.getU8();
                /*
                    m_localPlayer.setSkill(skill, level, levelPercent);
                    m_localPlayer.setBaseSkill(skill, baseLevel);
                    */
            }
        }
    }, {
        key: "parsePlayerState",
        value: function parsePlayerState(msg) {
            var states = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerStateU16)) states = msg.getU16();else states = msg.getU8();
            //m_localPlayer.setStates(states);
        }
    }, {
        key: "parsePlayerCancelAttack",
        value: function parsePlayerCancelAttack(msg) {
            var seq = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameAttackSeq)) seq = msg.getU32();
            //g_game.processAttackCancel(seq);
        }
    }, {
        key: "parsePlayerModes",
        value: function parsePlayerModes(msg) {
            var fightMode = msg.getU8();
            var chaseMode = msg.getU8();
            var safeMode = msg.getU8();
            var pvpMode = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePVPMode)) pvpMode = msg.getU8();
            //g_game.processPlayerModes((Otc::FightModes)fightMode, (Otc::ChaseModes)chaseMode, safeMode, (Otc::PVPModes)pvpMode);
        }
    }, {
        key: "parseSpellCooldown",
        value: function parseSpellCooldown(msg) {
            var spellId = msg.getU8();
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onSpellCooldown", spellId, delay);
        }
    }, {
        key: "parseSpellGroupCooldown",
        value: function parseSpellGroupCooldown(msg) {
            var groupId = msg.getU8();
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onSpellGroupCooldown", groupId, delay);
        }
    }, {
        key: "parseMultiUseCooldown",
        value: function parseMultiUseCooldown(msg) {
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onMultiUseCooldown", delay);
        }
    }, {
        key: "parseTalk",
        value: function parseTalk(msg) {
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageStatements)) msg.getU32(); // channel statement guid
            var name = _game.g_game.formatCreatureName(msg.getString());
            var level = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageLevel)) level = msg.getU16();
            var mode = _game.g_game.translateMessageModeFromServer(msg.getU8());
            var channelId = 0;
            var pos = void 0;
            switch (mode) {
                case _const.MessageMode.MessageSay:
                case _const.MessageMode.MessageWhisper:
                case _const.MessageMode.MessageYell:
                case _const.MessageMode.MessageMonsterSay:
                case _const.MessageMode.MessageMonsterYell:
                case _const.MessageMode.MessageNpcTo:
                case _const.MessageMode.MessageBarkLow:
                case _const.MessageMode.MessageBarkLoud:
                case _const.MessageMode.MessageSpell:
                case _const.MessageMode.MessageNpcFromStartBlock:
                    pos = this.getPosition(msg);
                    break;
                case _const.MessageMode.MessageChannel:
                case _const.MessageMode.MessageChannelManagement:
                case _const.MessageMode.MessageChannelHighlight:
                case _const.MessageMode.MessageGamemasterChannel:
                    channelId = msg.getU16();
                    break;
                case _const.MessageMode.MessageNpcFrom:
                case _const.MessageMode.MessagePrivateFrom:
                case _const.MessageMode.MessageGamemasterBroadcast:
                case _const.MessageMode.MessageGamemasterPrivateFrom:
                case _const.MessageMode.MessageRVRAnswer:
                case _const.MessageMode.MessageRVRContinue:
                    break;
                case _const.MessageMode.MessageRVRChannel:
                    msg.getU32();
                    break;
                default:
                    _log.Log.error("unknown message mode %d", mode);
                    break;
            }
            var text = msg.getString();
            _game.g_game.processTalk(name, level, mode, text, channelId, pos);
        }
    }, {
        key: "parseChannelList",
        value: function parseChannelList(msg) {
            var count = msg.getU8();
            var channelList = [];
            for (var i = 0; i < count; i++) {
                var id = msg.getU16();
                var name = msg.getString();
                channelList.push([id, name]);
            }
            //g_game.processChannelList(channelList);
        }
    }, {
        key: "parseOpenChannel",
        value: function parseOpenChannel(msg) {
            var channelId = msg.getU16();
            var name = msg.getString();
            if (_game.g_game.getFeature(_const.GameFeature.GameChannelPlayerList)) {
                var joinedPlayers = msg.getU16();
                for (var i = 0; i < joinedPlayers; ++i) {
                    _game.g_game.formatCreatureName(msg.getString());
                } // player name
                var invitedPlayers = msg.getU16();
                for (var _i2 = 0; _i2 < invitedPlayers; ++_i2) {
                    _game.g_game.formatCreatureName(msg.getString());
                } // player name
            }
            console.error('open channel', channelId, name);
            _game.g_game.processOpenChannel(channelId, name);
        }
    }, {
        key: "parseOpenPrivateChannel",
        value: function parseOpenPrivateChannel(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            //g_game.processOpenPrivateChannel(name);
        }
    }, {
        key: "parseOpenOwnPrivateChannel",
        value: function parseOpenOwnPrivateChannel(msg) {
            var channelId = msg.getU16();
            var name = msg.getString();
            _game.g_game.processOpenOwnPrivateChannel(channelId, name);
        }
    }, {
        key: "parseCloseChannel",
        value: function parseCloseChannel(msg) {
            var channelId = msg.getU16();
            _game.g_game.processCloseChannel(channelId);
        }
    }, {
        key: "parseRuleViolationChannel",
        value: function parseRuleViolationChannel(msg) {
            var channelId = msg.getU16();
            console.log('g_game.processRuleViolationChannel', channelId);
            //g_game.processRuleViolationChannel(channelId);
        }
    }, {
        key: "parseRuleViolationRemove",
        value: function parseRuleViolationRemove(msg) {
            var name = msg.getString();
            console.log('g_game.processRuleViolationRemove', name);
            //g_game.processRuleViolationRemove(name);
        }
    }, {
        key: "parseRuleViolationCancel",
        value: function parseRuleViolationCancel(msg) {
            var name = msg.getString();
            console.log('g_game.processRuleViolationCancel', name);
            //g_game.processRuleViolationCancel(name);
        }
    }, {
        key: "parseRuleViolationLock",
        value: function parseRuleViolationLock(msg) {
            console.log('g_game.processRuleViolationLock');
            //g_game.processRuleViolationLock();
        }
    }, {
        key: "parseTextMessage",
        value: function parseTextMessage(msg) {
            var code = msg.getU8();
            var mode = _game.g_game.translateMessageModeFromServer(code);
            var text = void 0;
            switch (mode) {
                case _const.MessageMode.MessageChannelManagement:
                    {
                        var channel = msg.getU16();
                        text = msg.getString();
                        break;
                    }
                case _const.MessageMode.MessageGuild:
                case _const.MessageMode.MessagePartyManagement:
                case _const.MessageMode.MessageParty:
                    {
                        var _channel = msg.getU16();
                        text = msg.getString();
                        break;
                    }
                case _const.MessageMode.MessageDamageDealed:
                case _const.MessageMode.MessageDamageReceived:
                case _const.MessageMode.MessageDamageOthers:
                    {
                        var pos = this.getPosition(msg);
                        var value = [];
                        var color = [];
                        // physical damage
                        value[0] = msg.getU32();
                        color[0] = msg.getU8();
                        // magic damage
                        value[1] = msg.getU32();
                        color[1] = msg.getU8();
                        text = msg.getString();
                        for (var i = 0; i < 2; ++i) {
                            if (value[i] == 0) continue;
                            var animatedText = new _animatedtext.AnimatedText();
                            animatedText.setColor(color[i]);
                            animatedText.setText(value[i]);
                            _map.g_map.addThing(animatedText, pos);
                        }
                        break;
                    }
                case _const.MessageMode.MessageHeal:
                case _const.MessageMode.MessageMana:
                case _const.MessageMode.MessageExp:
                case _const.MessageMode.MessageHealOthers:
                case _const.MessageMode.MessageExpOthers:
                    {
                        var _pos = this.getPosition(msg);
                        var _value = msg.getU32();
                        var _color = msg.getU8();
                        text = msg.getString();
                        var _animatedText = new _animatedtext.AnimatedText();
                        _animatedText.setColor(_color);
                        _animatedText.setText(_value.toString());
                        _map.g_map.addThing(_animatedText, _pos);
                        break;
                    }
                case _const.MessageMode.MessageInvalid:
                    _log.Log.error("unknown message mode %d", mode);
                    break;
                default:
                    text = msg.getString();
                    break;
            }
            //g_game.processTextMessage(mode, text);
        }
    }, {
        key: "parseCancelWalk",
        value: function parseCancelWalk(msg) {
            var direction = msg.getU8();
            //g_game.processWalkCancel(direction);
        }
    }, {
        key: "parseWalkWait",
        value: function parseWalkWait(msg) {
            var millis = msg.getU16();
            //m_localPlayer.lockWalk(millis);
        }
    }, {
        key: "parseFloorChangeUp",
        value: function parseFloorChangeUp(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            var range = _map.g_map.getAwareRange();
            pos.z--;
            var skip = 0;
            if (pos.z == _const.Otc.SEA_FLOOR) for (var i = _const.Otc.SEA_FLOOR - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; i >= 0; i--) {
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), 8 - i, skip);
            } else if (pos.z > _const.Otc.SEA_FLOOR) skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), 3, skip);
            pos.x++;
            pos.y++;
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseFloorChangeDown",
        value: function parseFloorChangeDown(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            var range = _map.g_map.getAwareRange();
            pos.z++;
            var skip = 0;
            if (pos.z == _const.Otc.UNDERGROUND_FLOOR) {
                var j = void 0,
                    i = void 0;
                for (i = pos.z, j = -1; i <= pos.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; ++i, --j) {
                    skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), j, skip);
                }
            } else if (pos.z > _const.Otc.UNDERGROUND_FLOOR && pos.z < _const.Otc.MAX_Z - 1) skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), -3, skip);
            pos.x--;
            pos.y--;
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseOpenOutfitWindow",
        value: function parseOpenOutfitWindow(msg) {
            var currentOutfit = this.getOutfit(msg);
            var outfitList = [];
            if (_game.g_game.getFeature(_const.GameFeature.GameNewOutfitProtocol)) {
                var outfitCount = msg.getU8();
                for (var i = 0; i < outfitCount; i++) {
                    var outfitId = msg.getU16();
                    var outfitName = msg.getString();
                    var outfitAddons = msg.getU8();
                    outfitList.push([outfitId, outfitName, outfitAddons]);
                }
            } else {
                var outfitStart = void 0,
                    outfitEnd = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameLooktypeU16)) {
                    outfitStart = msg.getU16();
                    outfitEnd = msg.getU16();
                } else {
                    outfitStart = msg.getU8();
                    outfitEnd = msg.getU8();
                }
                for (var _i3 = outfitStart; _i3 <= outfitEnd; _i3++) {
                    outfitList.push([_i3, "", 0]);
                }
            }
            var mountList = [];
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerMounts)) {
                var mountCount = msg.getU8();
                for (var _i4 = 0; _i4 < mountCount; ++_i4) {
                    var mountId = msg.getU16(); // mount type
                    var mountName = msg.getString(); // mount name
                    mountList.push([mountId, mountName]);
                }
            }
            //g_game.processOpenOutfitWindow(currentOutfit, outfitList, mountList);
        }
    }, {
        key: "parseVipAdd",
        value: function parseVipAdd(msg) {
            var id = void 0,
                iconId = 0,
                status = void 0;
            var name = void 0,
                desc = "";
            var notifyLogin = false;
            id = msg.getU32();
            name = _game.g_game.formatCreatureName(msg.getString());
            if (_game.g_game.getFeature(_const.GameFeature.GameAdditionalVipInfo)) {
                desc = msg.getString();
                iconId = msg.getU32();
                notifyLogin = msg.getU8() > 0;
            }
            status = msg.getU8();
            //g_game.processVipAdd(id, name, status, desc, iconId, notifyLogin);
        }
    }, {
        key: "parseVipState",
        value: function parseVipState(msg) {
            var id = msg.getU32();
            if (_game.g_game.getFeature(_const.GameFeature.GameLoginPending)) {
                var status = msg.getU8();
                //g_game.processVipStateChange(id, status);
            } else {
                    //g_game.processVipStateChange(id, 1);
                }
        }
    }, {
        key: "parseVipLogout",
        value: function parseVipLogout(msg) {
            var id = msg.getU32();
            //g_game.processVipStateChange(id, 0);
        }
    }, {
        key: "parseTutorialHint",
        value: function parseTutorialHint(msg) {
            var id = msg.getU8();
            //g_game.processTutorialHint(id);
        }
    }, {
        key: "parseAutomapFlag",
        value: function parseAutomapFlag(msg) {
            var pos = this.getPosition(msg);
            var icon = msg.getU8();
            var description = msg.getString();
            var remove = false;
            if (_game.g_game.getFeature(_const.GameFeature.GameMinimapRemove)) remove = msg.getU8() != 0;
            if (!remove) {
                //g_game.processAddAutomapFlag(pos, icon, description);
            } else {
                    //g_game.processRemoveAutomapFlag(pos, icon, description);
                }
        }
    }, {
        key: "parseQuestLog",
        value: function parseQuestLog(msg) {
            var questList = [];
            var questsCount = msg.getU16();
            for (var i = 0; i < questsCount; i++) {
                var id = msg.getU16();
                var name = msg.getString();
                var completed = msg.getU8();
                questList.push([id, name, completed]);
            }
            //g_game.processQuestLog(questList);
        }
    }, {
        key: "parseQuestLine",
        value: function parseQuestLine(msg) {
            var questMissions = [];
            var questId = msg.getU16();
            var missionCount = msg.getU8();
            for (var i = 0; i < missionCount; i++) {
                var missionName = msg.getString();
                var missionDescrition = msg.getString();
                questMissions.push([missionName, missionDescrition]);
            }
            //g_game.processQuestLine(questId, questMissions);
        }
    }, {
        key: "parseChannelEvent",
        value: function parseChannelEvent(msg) {
            msg.getU16(); // channel id
            _game.g_game.formatCreatureName(msg.getString()); // player name
            msg.getU8(); // event type
        }
    }, {
        key: "parseItemInfo",
        value: function parseItemInfo(msg) {
            var list = [];
            var size = msg.getU8();
            for (var i = 0; i < size; ++i) {
                var item = new _item.Item();
                item.setId(msg.getU16());
                item.setCountOrSubType(msg.getU8());
                var desc = msg.getString();
                list.push([item, desc]);
            }
            //g_lua.callGlobalField("g_game", "onItemInfo", list);
        }
    }, {
        key: "parsePlayerInventory",
        value: function parsePlayerInventory(msg) {
            msg.getU8(); // subtype
            /*
            let size = msg.getU16();
            for (let i = 0; i < size; ++i) {
                msg.getU16(); // id
                msg.getU8(); // subtype
                msg.getU16(); // count
            }
            */
        }
    }, {
        key: "parseModalDialog",
        value: function parseModalDialog(msg) {
            var id = msg.getU32();
            var title = msg.getString();
            var message = msg.getString();
            var sizeButtons = msg.getU8();
            var buttonList = [];
            for (var i = 0; i < sizeButtons; ++i) {
                var value = msg.getString();
                var _id = msg.getU8();
                buttonList.push([_id, value]);
            }
            var sizeChoices = msg.getU8();
            var choiceList = void 0;
            for (var _i5 = 0; _i5 < sizeChoices; ++_i5) {
                var _value2 = msg.getString();
                var _id2 = msg.getU8();
                choiceList.push_back([_id2, _value2]);
            }
            var enterButton = void 0,
                escapeButton = void 0;
            if (_game.g_game.getClientVersion() > 970) {
                escapeButton = msg.getU8();
                enterButton = msg.getU8();
            } else {
                enterButton = msg.getU8();
                escapeButton = msg.getU8();
            }
            var priority = msg.getU8() == 0x01;
            //g_game.processModalDialog(id, title, message, buttonList, enterButton, escapeButton, choiceList, priority);
        }
    }, {
        key: "parseExtendedOpcode",
        value: function parseExtendedOpcode(msg) {
            var opcode = msg.getU8();
            var buffer = msg.getString();
            /*
                if(opcode == 0)
                    m_enableSendExtendedOpcode = true;
                else if(opcode == 2)
                    parsePingBack(msg);
                else {
                    callLuaField("onExtendedOpcode", opcode, buffer);
                }
            */
        }
    }, {
        key: "parseBotPackage",
        value: function parseBotPackage(msg) {
            var actionType = msg.getU8();
            var attackedCreatureId = msg.getU32();
            var mouseRightClickX = msg.getU32();
            var mouseRightClickY = msg.getU32();
            var mouseX = msg.getU32();
            var mouseY = msg.getU32();
            var gameX = msg.getU32();
            var gameY = msg.getU32();
            var gameW = msg.getU32();
            var gameH = msg.getU32();
            var isForeground = msg.getU8();
            var modulesCount = msg.getU16();
            var isHotkey = msg.getU8();
            var targetDiffX = 100;
            var targetDiffY = 100;
            if (attackedCreatureId) {
                targetDiffX = msg.getU32();
                targetDiffY = msg.getU32();
            }
            if (actionType == 6) {
                _log.Log.log("botpackage throw", new Date(this.m_lastPacketTime).toISOString(), _game.g_game.getLocalPlayer().getPosition(), mouseRightClickX, mouseRightClickY, mouseX, mouseY, gameX, gameY, gameW, gameH, isForeground, modulesCount, isHotkey);
            }
        }
    }, {
        key: "parseChangeMapAwareRange",
        value: function parseChangeMapAwareRange(msg) {
            var xrange = msg.getU8();
            var yrange = msg.getU8();
            var range = new _awarerange.AwareRange();
            range.left = xrange / 2 - (xrange + 1) % 2;
            range.right = xrange / 2;
            range.top = yrange / 2 - (yrange + 1) % 2;
            range.bottom = yrange / 2;
            _map.g_map.setAwareRange(range);
            //g_lua.callGlobalField("g_game", "onMapChangeAwareRange", xrange, yrange);
        }
    }, {
        key: "parseCreaturesMark",
        value: function parseCreaturesMark(msg) {
            var len = void 0;
            if (_game.g_game.getClientVersion() >= 1035) {
                len = 1;
            } else {
                len = msg.getU8();
            }
            for (var i = 0; i < len; ++i) {
                var id = msg.getU32();
                var isPermanent = msg.getU8() != 1;
                var markType = msg.getU8();
                var creature = _map.g_map.getCreatureById(id);
                if (creature) {
                    if (isPermanent) {
                        if (markType == 0xff) creature.hideStaticSquare();else creature.showStaticSquare(_color2.Color.from8bit(markType));
                    } else creature.addTimedSquare(markType);
                } else _log.Log.error("could not get creature");
            }
        }
    }, {
        key: "parseCreatureType",
        value: function parseCreatureType(msg) {
            var id = msg.getU32();
            var type = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setType(type);else _log.Log.error("could not get creature");
        }
    }, {
        key: "setMapDescription",
        value: function setMapDescription(msg, x, y, z, width, height) {
            var startz = void 0;
            var endz = void 0;
            var zstep = void 0;
            if (z > _const.Otc.SEA_FLOOR) {
                startz = z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
                endz = Math.min(z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, _const.Otc.MAX_Z);
                zstep = 1;
            } else {
                startz = _const.Otc.SEA_FLOOR;
                endz = 0;
                zstep = -1;
            }
            var skip = 0;
            for (var nz = startz; nz != endz + zstep; nz += zstep) {
                skip = this.setFloorDescription(msg, x, y, nz, width, height, z - nz, skip);
            }
        }
    }, {
        key: "setFloorDescription",
        value: function setFloorDescription(msg, x, y, z, width, height, offset, skip) {
            //Log.debug('setFloorDescription', x, y, z, width, height, offset, skip);
            for (var nx = 0; nx < width; nx++) {
                for (var ny = 0; ny < height; ny++) {
                    var tilePos = new _position.Position(x + nx + offset, y + ny + offset, z);
                    if (skip == 0) skip = this.setTileDescription(msg, tilePos);else {
                        //Log.debug('setFloorDescription - clean', tilePos);
                        _map.g_map.cleanTile(tilePos);
                        skip--;
                    }
                }
            }
            return skip;
        }
    }, {
        key: "setTileDescription",
        value: function setTileDescription(msg, position) {
            //Log.debug('setTileDescription', position);
            _map.g_map.cleanTile(position);
            var gotEffect = false;
            for (var stackPos = 0; stackPos < 256; stackPos++) {
                if (msg.peekU16() >= 0xff00) {
                    //Log.debug('setTileDescription SKIP', position, stackPos, msg.peekU16() & 0xff);
                    return msg.getU16() & 0xff;
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameEnvironmentEffect) && !gotEffect) {
                    msg.getU16(); // environment effect
                    gotEffect = true;
                    continue;
                }
                if (stackPos > 10) _log.Log.error("too many things, pos=%s, stackpos=%d", position, stackPos);
                var thing = this.getThing(msg);
                _map.g_map.addThing(thing, position, stackPos);
            }
            return 0;
        }
    }, {
        key: "getOutfit",
        value: function getOutfit(msg) {
            var outfit = new _outfit.Outfit();
            var lookType = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameLooktypeU16)) lookType = msg.getU16();else lookType = msg.getU8();
            if (lookType != 0) {
                outfit.setCategory(_const.ThingCategory.ThingCategoryCreature);
                var head = msg.getU8();
                var body = msg.getU8();
                var legs = msg.getU8();
                var feet = msg.getU8();
                var addons = 0;
                if (_game.g_game.getFeature(_const.GameFeature.GamePlayerAddons)) addons = msg.getU8();
                if (!_thingtypemanager.g_things.isValidDatId(lookType, _const.ThingCategory.ThingCategoryCreature)) {
                    _log.Log.error("invalid outfit looktype %d", lookType);
                    lookType = 0;
                }
                outfit.setId(lookType);
                outfit.setHead(head);
                outfit.setBody(body);
                outfit.setLegs(legs);
                outfit.setFeet(feet);
                outfit.setAddons(addons);
            } else {
                var lookTypeEx = msg.getU16();
                if (lookTypeEx == 0) {
                    outfit.setCategory(_const.ThingCategory.ThingCategoryEffect);
                    outfit.setAuxId(13); // invisible effect id
                } else {
                    if (!_thingtypemanager.g_things.isValidDatId(lookTypeEx, _const.ThingCategory.ThingCategoryItem)) {
                        _log.Log.error("invalid outfit looktypeex %d", lookTypeEx);
                        lookTypeEx = 0;
                    }
                    outfit.setCategory(_const.ThingCategory.ThingCategoryItem);
                    outfit.setAuxId(lookTypeEx);
                }
            }
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerMounts)) {
                var mount = msg.getU16();
                outfit.setMount(mount);
            }
            return outfit;
        }
    }, {
        key: "getThing",
        value: function getThing(msg) {
            var thing = new _thing.Thing();
            //Log.debug('getThing', msg.peekU16());
            var id = msg.getU16();
            if (id == 0) _log.Log.error("invalid thing id");else if (id == _proto.Proto.UnknownCreature || id == _proto.Proto.OutdatedCreature || id == _proto.Proto.Creature) thing = this.getCreature(msg, id);else if (id == _proto.Proto.StaticText) thing = this.getStaticText(msg, id);else thing = this.getItem(msg, id);
            return thing;
        }
    }, {
        key: "getMappedThing",
        value: function getMappedThing(msg) {
            var thing = void 0;
            var x = msg.getU16();
            if (x != 0xffff) {
                var pos = new _position.Position();
                pos.x = x;
                pos.y = msg.getU16();
                pos.z = msg.getU8();
                var stackpos = msg.getU8();
                thing = _map.g_map.getThing(pos, stackpos);
                if (!thing) {
                    _log.Log.error("no thing at pos:%s, stackpos:%d", pos, stackpos, _map.g_map.getTile(pos));
                    throw new Error('no thing');
                }
            } else {
                var id = msg.getU32();
                thing = _map.g_map.getCreatureById(id);
                if (!thing) _log.Log.error("no creature with id %u", id);
            }
            return thing;
        }
    }, {
        key: "getCreature",
        value: function getCreature(msg, type) {
            //Log.debug('getCreature', type, msg);
            if (type == 0) type = msg.getU16();
            var creature = void 0;
            var known = type != _proto.Proto.UnknownCreature;
            if (type == _proto.Proto.OutdatedCreature || type == _proto.Proto.UnknownCreature) {
                if (known) {
                    var id = msg.getU32();
                    creature = _map.g_map.getCreatureById(id);
                    if (!creature) _log.Log.error("server said that a creature is known, but it's not");
                } else {
                    var removeId = msg.getU32();
                    _map.g_map.removeCreatureById(removeId);
                    var _id3 = msg.getU32();
                    var _creatureType = void 0;
                    if (_game.g_game.getClientVersion() >= 910) _creatureType = msg.getU8();else {
                        if (_id3 >= _proto.Proto.PlayerStartId && _id3 < _proto.Proto.PlayerEndId) _creatureType = _proto.Proto.CreatureTypePlayer;else if (_id3 >= _proto.Proto.MonsterStartId && _id3 < _proto.Proto.MonsterEndId) _creatureType = _proto.Proto.CreatureTypeMonster;else _creatureType = _proto.Proto.CreatureTypeNpc;
                    }
                    var name = _game.g_game.formatCreatureName(msg.getString());
                    if (_id3 == this.m_localPlayer.getId()) creature = this.m_localPlayer;else if (_creatureType == _proto.Proto.CreatureTypePlayer) {
                        // fixes a bug server side bug where GameInit is not sent and local player id is unknown
                        if (this.m_localPlayer.getId() == 0 && name == this.m_localPlayer.getName()) creature = this.m_localPlayer;else creature = new _player.Player();
                    } else if (_creatureType == _proto.Proto.CreatureTypeMonster) creature = new _monster.Monster();else if (_creatureType == _proto.Proto.CreatureTypeNpc) creature = new _npc.Npc();else _log.Log.error("creature type is invalid");
                    if (creature) {
                        creature.setId(_id3);
                        creature.setName(name);
                        _map.g_map.addCreature(creature);
                    }
                }
                var healthPercent = msg.getU8();
                var direction = msg.getU8();
                var outfit = this.getOutfit(msg);
                var light = new _light.Light();
                light.intensity = msg.getU8();
                light.color = msg.getU8();
                var speed = msg.getU16();
                var skull = msg.getU8();
                var shield = msg.getU8();
                // emblem is sent only when the creature is not known
                var emblem = -1;
                var creatureType = -1;
                var icon = -1;
                var unpass = true;
                var mark = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameCreatureEmblems) && !known) emblem = msg.getU8();
                if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                    creatureType = msg.getU8();
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameCreatureIcons)) {
                    icon = msg.getU8();
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                    mark = msg.getU8(); // mark
                    msg.getU16(); // helpers
                    if (creature) {
                        if (mark == 0xff) creature.hideStaticSquare();else creature.showStaticSquare(_color2.Color.from8bit(mark));
                    }
                }
                if (_game.g_game.getClientVersion() >= 854) unpass = msg.getU8() > 0;
                if (creature) {
                    creature.setHealthPercent(healthPercent);
                    creature.setDirection(direction);
                    creature.setOutfit(outfit);
                    creature.setSpeed(speed);
                    creature.setSkull(skull);
                    creature.setShield(shield);
                    creature.setPassable(!unpass);
                    creature.setLight(light);
                    if (emblem != -1) creature.setEmblem(emblem);
                    if (creatureType != -1) creature.setType(creatureType);
                    if (icon != -1) creature.setIcon(icon);
                    if (creature == this.m_localPlayer && !this.m_localPlayer.isKnown()) this.m_localPlayer.setKnown(true);
                }
            } else if (type == _proto.Proto.Creature) {
                var _id4 = msg.getU32();
                creature = _map.g_map.getCreatureById(_id4);
                if (!creature) _log.Log.error("invalid creature");
                var _direction = msg.getU8();
                if (creature) creature.turn(_direction);
                if (_game.g_game.getClientVersion() >= 953) {
                    var _unpass = msg.getU8();
                    if (creature) creature.setPassable(!_unpass);
                }
            } else {
                _log.Log.error("invalid creature opcode");
            }
            return creature;
        }
    }, {
        key: "getItem",
        value: function getItem(msg) {
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (id == 0) id = msg.getU16();
            //Log.debug('getItem', id);
            var item = new _item.Item(id);
            if (item.getId() == 0) _log.Log.error("unable to create item with invalid id %d", id);
            if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                msg.getU8(); // mark
            }
            if (item.isStackable() || item.isFluidContainer() || item.isSplash() || item.isChargeable()) item.setCountOrSubType(msg.getU8());
            if (_game.g_game.getFeature(_const.GameFeature.GameItemAnimationPhase)) {
                if (item.getAnimationPhases() > 1) {
                    // 0x00 => automatic phase
                    // 0xFE => random phase
                    // 0xFF => async phase
                    msg.getU8();
                    //item.setPhase(msg.getU8());
                }
            }
            return item;
        }
    }, {
        key: "getStaticText",
        value: function getStaticText(msg, id) {
            var colorByte = msg.getU8();
            var color = _color2.Color.from8bit(colorByte);
            var fontName = msg.getString();
            var text = msg.getString();
            var staticText = new _statictext.StaticText();
            /*
            staticText.setText(text);
            staticText.setFont(fontName);
            staticText.setColor(color);
            */
            return staticText;
        }
    }, {
        key: "getPosition",
        value: function getPosition(msg) {
            var x = msg.getU16();
            var y = msg.getU16();
            var z = msg.getU8();
            return new _position.Position(x, y, z);
        }
    }, {
        key: "getLocalPlayer",
        value: function getLocalPlayer() {
            return this.m_localPlayer;
        }
    }]);

    return ProtocolGame;
}(_protocol.Protocol);

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Protocol = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputmessage = __webpack_require__(188);

var _log = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Protocol = exports.Protocol = function () {
    function Protocol() {
        _classCallCheck(this, Protocol);

        this.m_xteaEncryptionEnabled = false;
        this.m_checksumEnabled = null;
        this.m_connection = null;
        this.m_xteaKey = [];
    }

    _createClass(Protocol, [{
        key: "connect",
        value: function connect(host, port) {
            var serverUrl = "ws://" + host + ":" + port;
            this.m_connection = new WebSocket(serverUrl);
            this.m_connection.binaryType = 'arraybuffer';
            var protocol = this;
            this.m_connection.onopen = function (evt) {
                console.log('m_connectiononopen', evt);
                protocol.onConnect(evt);
            };
            this.m_connection.onerror = function (evt) {
                console.log('m_connectiononerror', evt);
                protocol.onError(evt);
            };
            this.m_connection.onclose = function (evt) {
                console.log('m_connectiononclose', evt);
                protocol.onClose(evt);
            };
            this.m_connection.onmessage = function (evt) {
                console.log('m_connectiononmessage', evt);
                protocol.internalRecvData(evt);
            };
        }
    }, {
        key: "onConnect",
        value: function onConnect(evt) {
            (0, _log.log)("onConnect", evt);
        }
    }, {
        key: "onRecv",
        value: function onRecv(inputMessage) {
            (0, _log.log)("onRecv", inputMessage);
        }
    }, {
        key: "onError",
        value: function onError(evt) {
            (0, _log.log)("onError", evt);
            this.disconnect();
        }
    }, {
        key: "onClose",
        value: function onClose(evt) {
            (0, _log.log)("onClose", evt);
            this.disconnect();
        }
    }, {
        key: "send",
        value: function send(outputMessage) {
            if (this.m_xteaEncryptionEnabled) this.xteaEncrypt(outputMessage);
            if (this.m_checksumEnabled) outputMessage.writeChecksum();
            outputMessage.writeMessageSize();
            if (this.m_connection) this.m_connection.send(outputMessage.getBuffer());
        }
    }, {
        key: "internalRecvData",
        value: function internalRecvData(evt) {
            if (!this.isConnected()) {
                (0, _log.error)("received data while disconnected");
                return;
            }
            var inputMessage = new _inputmessage.InputMessage(new DataView(evt.data));
            if (this.m_checksumEnabled && !inputMessage.validateChecksum()) {
                (0, _log.error)("got a network message with invalid checksum");
                return;
            }
            if (this.m_checksumEnabled) {
                // size(2) + checksum(4)
                inputMessage.skip(6);
            }
            if (this.m_xteaEncryptionEnabled) {
                if (!this.xteaDecrypt(inputMessage)) {
                    (0, _log.error)("failed to decrypt message");
                    return;
                }
            }
            this.onRecv(inputMessage);
        }
    }, {
        key: "isConnected",
        value: function isConnected() {
            return this.m_connection && this.m_connection.readyState == WebSocket.OPEN;
        }
    }, {
        key: "isConnecting",
        value: function isConnecting() {
            return this.m_connection && this.m_connection.readyState == WebSocket.CONNECTING;
        }
    }, {
        key: "disconnect",
        value: function disconnect() {
            if (this.m_connection) {
                this.m_connection.close();
                this.m_connection = null;
            }
        }
    }, {
        key: "enableXteaEncryption",
        value: function enableXteaEncryption() {
            this.m_xteaEncryptionEnabled = true;
        }
    }, {
        key: "enableChecksum",
        value: function enableChecksum() {
            this.m_checksumEnabled = true;
        }
    }, {
        key: "xteaEncrypt",
        value: function xteaEncrypt(outputMessage) {
            return true;
        }
    }, {
        key: "xteaDecrypt",
        value: function xteaDecrypt(inputMessage) {
            return true;
        }
    }, {
        key: "generateXteaKey",
        value: function generateXteaKey() {
            throw new Error('unimplemented');
        }
    }, {
        key: "getXteaKey",
        value: function getXteaKey() {
            throw new Error('unimplemented');
        }
    }, {
        key: "setXteaKey",
        value: function setXteaKey() {
            throw new Error('unimplemented');
        }
    }]);

    return Protocol;
}();

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OutputMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jspack = __webpack_require__(458);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OutputMessage = exports.OutputMessage = function () {
    function OutputMessage() {
        _classCallCheck(this, OutputMessage);

        this.data = [];
    }

    _createClass(OutputMessage, [{
        key: 'addU8',
        value: function addU8(v) {
            v = v % 256;
            this.data = this.data.concat(OutputMessage.packer.Pack('B', [v]));
        }
    }, {
        key: 'addU16',
        value: function addU16(v) {
            v = v % (256 * 256);
            this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v]));
        }
    }, {
        key: 'addU32',
        value: function addU32(v) {
            v = v % (256 * 256 * 256 * 256);
            this.data = this.data.concat(OutputMessage.packer.Pack('<I', [v]));
        }
    }, {
        key: 'addU64',
        value: function addU64(v) {
            throw new Error('unimplemented');
        }
    }, {
        key: 'addString',
        value: function addString(v) {
            this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v.length]));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    this.data = this.data.concat(OutputMessage.packer.Pack('s', [c]));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'writeChecksum',
        value: function writeChecksum() {
            //error('writeChecksum not implemented');
        }
    }, {
        key: 'writeMessageSize',
        value: function writeMessageSize() {
            this.data = OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
        }
    }, {
        key: 'getBuffer',
        value: function getBuffer() {
            return new Uint8Array(this.data).buffer; //OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
        }
    }]);

    return OutputMessage;
}();

OutputMessage.packer = new _jspack.JSPack();

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*!
 *  Copyright © 2008 Fair Oaks Labs, Inc.
 *  All rights reserved.
 */
// Utility object:  Encode/Decode C-style binary primitives to/from octet arrays
function JSPack() {
    // Module-level (private) variables
    var el,
        bBE = false,
        m = this;
    // Raw byte arrays
    m._DeArray = function (a, p, l) {
        return [a.slice(p, p + l)];
    };
    m._EnArray = function (a, p, l, v) {
        for (var i = 0; i < l; a[p + i] = v[i] ? v[i] : 0, i++) {}
    };
    // ASCII characters
    m._DeChar = function (a, p) {
        return String.fromCharCode(a[p]);
    };
    m._EnChar = function (a, p, v) {
        a[p] = v.charCodeAt(0);
    };
    // Little-endian (un)signed N-byte integers
    m._DeInt = function (a, p) {
        var lsb = bBE ? el.len - 1 : 0,
            nsb = bBE ? -1 : 1,
            stop = lsb + nsb * el.len,
            rv,
            i,
            f;
        for (rv = 0, i = lsb, f = 1; i != stop; rv += a[p + i] * f, i += nsb, f *= 256) {}
        if (el.bSigned && rv & Math.pow(2, el.len * 8 - 1)) {
            rv -= Math.pow(2, el.len * 8);
        }
        return rv;
    };
    m._EnInt = function (a, p, v) {
        var lsb = bBE ? el.len - 1 : 0,
            nsb = bBE ? -1 : 1,
            stop = lsb + nsb * el.len,
            i;
        v = v < el.min ? el.min : v > el.max ? el.max : v;
        for (i = lsb; i != stop; a[p + i] = v & 0xff, i += nsb, v >>= 8) {}
    };
    // ASCII character strings
    m._DeString = function (a, p, l) {
        for (var rv = new Array(l), i = 0; i < l; rv[i] = String.fromCharCode(a[p + i]), i++) {}
        return rv.join('');
    };
    m._EnString = function (a, p, l, v) {
        for (var t, i = 0; i < l; a[p + i] = (t = v.charCodeAt(i)) ? t : 0, i++) {}
    };
    // Little-endian N-bit IEEE 754 floating point
    m._De754 = function (a, p) {
        var s, e, m, i, d, nBits, mLen, eLen, eBias, eMax;
        mLen = el.mLen, eLen = el.len * 8 - el.mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1;
        i = bBE ? 0 : el.len - 1;
        d = bBE ? 1 : -1;
        s = a[p + i];
        i += d;
        nBits = -7;
        for (e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = e * 256 + a[p + i], i += d, nBits -= 8) {}
        for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = m * 256 + a[p + i], i += d, nBits -= 8) {}
        switch (e) {
            case 0:
                // Zero, or denormalized number
                e = 1 - eBias;
                break;
            case eMax:
                // NaN, or +/-Infinity
                return m ? NaN : (s ? -1 : 1) * Infinity;
            default:
                // Normalized number
                m = m + Math.pow(2, mLen);
                e = e - eBias;
                break;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    m._En754 = function (a, p, v) {
        var s, e, m, i, d, c, mLen, eLen, eBias, eMax;
        mLen = el.mLen, eLen = el.len * 8 - el.mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1;
        s = v < 0 ? 1 : 0;
        v = Math.abs(v);
        if (isNaN(v) || v == Infinity) {
            m = isNaN(v) ? 1 : 0;
            e = eMax;
        } else {
            e = Math.floor(Math.log(v) / Math.LN2); // Calculate log2 of the value
            if (v * (c = Math.pow(2, -e)) < 1) {
                e--;
                c *= 2;
            } // Math.log() isn't 100% reliable
            // Round by adding 1/2 the significand's LSD
            if (e + eBias >= 1) {
                v += el.rt / c;
            } // Normalized:  mLen significand digits
            else {
                    v += el.rt * Math.pow(2, 1 - eBias);
                } // Denormalized:  <= mLen significand digits
            if (v * c >= 2) {
                e++;
                c /= 2;
            } // Rounding can increment the exponent
            if (e + eBias >= eMax) {
                // Overflow
                m = 0;
                e = eMax;
            } else if (e + eBias >= 1) {
                // Normalized - term order matters, as Math.pow(2, 52-e) and v*Math.pow(2, 52) can overflow
                m = (v * c - 1) * Math.pow(2, mLen);
                e = e + eBias;
            } else {
                // Denormalized - also catches the '0' case, somewhat by chance
                m = v * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                e = 0;
            }
        }
        for (i = bBE ? el.len - 1 : 0, d = bBE ? -1 : 1; mLen >= 8; a[p + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
        for (e = e << mLen | m, eLen += mLen; eLen > 0; a[p + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
        a[p + i - d] |= s * 128;
    };
    // Class data
    m._sPattern = '(\\d+)?([AxcbBhHsfdiIlL])';
    m._lenLut = {
        'A': 1,
        'x': 1,
        'c': 1,
        'b': 1,
        'B': 1,
        'h': 2,
        'H': 2,
        's': 1,
        'f': 4,
        'd': 8,
        'i': 4,
        'I': 4,
        'l': 4,
        'L': 4
    };
    m._elLut = {
        'A': { en: m._EnArray, de: m._DeArray },
        's': { en: m._EnString, de: m._DeString },
        'c': { en: m._EnChar, de: m._DeChar },
        'b': { en: m._EnInt, de: m._DeInt, len: 1, bSigned: true, min: -Math.pow(2, 7), max: Math.pow(2, 7) - 1 },
        'B': { en: m._EnInt, de: m._DeInt, len: 1, bSigned: false, min: 0, max: Math.pow(2, 8) - 1 },
        'h': { en: m._EnInt, de: m._DeInt, len: 2, bSigned: true, min: -Math.pow(2, 15), max: Math.pow(2, 15) - 1 },
        'H': { en: m._EnInt, de: m._DeInt, len: 2, bSigned: false, min: 0, max: Math.pow(2, 16) - 1 },
        'i': { en: m._EnInt, de: m._DeInt, len: 4, bSigned: true, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
        'I': { en: m._EnInt, de: m._DeInt, len: 4, bSigned: false, min: 0, max: Math.pow(2, 32) - 1 },
        'l': { en: m._EnInt, de: m._DeInt, len: 4, bSigned: true, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
        'L': { en: m._EnInt, de: m._DeInt, len: 4, bSigned: false, min: 0, max: Math.pow(2, 32) - 1 },
        'f': { en: m._En754, de: m._De754, len: 4, mLen: 23, rt: Math.pow(2, -24) - Math.pow(2, -77) },
        'd': { en: m._En754, de: m._De754, len: 8, mLen: 52, rt: 0 }
    };
    // Unpack a series of n elements of size s from array a at offset p with fxn
    m._UnpackSeries = function (n, s, a, p) {
        for (var fxn = el.de, rv = [], i = 0; i < n; rv.push(fxn(a, p + i * s)), i++) {}
        return rv;
    };
    // Pack a series of n elements of size s from array v at offset i to array a at offset p with fxn
    m._PackSeries = function (n, s, a, p, v, i) {
        for (var fxn = el.en, o = 0; o < n; fxn(a, p + o * s, v[i + o]), o++) {}
    };
    // Unpack the octet array a, beginning at offset p, according to the fmt string
    m.Unpack = function (fmt, a, p) {
        // Set the private bBE flag based on the format string - assume big-endianness
        bBE = fmt.charAt(0) != '<';
        p = p ? p : 0;
        var re = new RegExp(this._sPattern, 'g'),
            m,
            n,
            s,
            rv = [];
        while (m = re.exec(fmt)) {
            n = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
            s = this._lenLut[m[2]];
            if (p + n * s > a.length) {
                return undefined;
            }
            switch (m[2]) {
                case 'A':
                case 's':
                    rv.push(this._elLut[m[2]].de(a, p, n));
                    break;
                case 'c':
                case 'b':
                case 'B':
                case 'h':
                case 'H':
                case 'i':
                case 'I':
                case 'l':
                case 'L':
                case 'f':
                case 'd':
                    el = this._elLut[m[2]];
                    rv.push(this._UnpackSeries(n, s, a, p));
                    break;
            }
            p += n * s;
        }
        return Array.prototype.concat.apply([], rv);
    };
    // Pack the supplied values into the octet array a, beginning at offset p, according to the fmt string
    m.PackTo = function (fmt, a, p, values) {
        // Set the private bBE flag based on the format string - assume big-endianness
        bBE = fmt.charAt(0) != '<';
        var re = new RegExp(this._sPattern, 'g'),
            m,
            n,
            s,
            i = 0,
            j;
        while (m = re.exec(fmt)) {
            n = m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1]);
            s = this._lenLut[m[2]];
            if (p + n * s > a.length) {
                return false;
            }
            switch (m[2]) {
                case 'A':
                case 's':
                    if (i + 1 > values.length) {
                        return false;
                    }
                    this._elLut[m[2]].en(a, p, n, values[i]);
                    i += 1;
                    break;
                case 'c':
                case 'b':
                case 'B':
                case 'h':
                case 'H':
                case 'i':
                case 'I':
                case 'l':
                case 'L':
                case 'f':
                case 'd':
                    el = this._elLut[m[2]];
                    if (i + n > values.length) {
                        return false;
                    }
                    this._PackSeries(n, s, a, p, values, i);
                    i += n;
                    break;
                case 'x':
                    for (j = 0; j < n; j++) {
                        a[p + j] = 0;
                    }
                    break;
            }
            p += n * s;
        }
        return a;
    };
    // Pack the supplied values into a new octet array, according to the fmt string
    m.Pack = function (fmt, values) {
        return this.PackTo(fmt, new Array(this.CalcLength(fmt)), 0, values);
    };
    // Determine the number of bytes represented by the format string
    m.CalcLength = function (fmt) {
        var re = new RegExp(this._sPattern, 'g'),
            m,
            sum = 0;
        while (m = re.exec(fmt)) {
            sum += (m[1] == undefined || m[1] == '' ? 1 : parseInt(m[1])) * this._lenLut[m[2]];
        }
        return sum;
    };
}
;
exports.JSPack = JSPack;

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

var _thingtypemanager = __webpack_require__(63);

var _const = __webpack_require__(13);

var _position = __webpack_require__(69);

var _game = __webpack_require__(38);

var _g_clock = __webpack_require__(93);

var _helpers = __webpack_require__(56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = exports.Item = function (_Thing) {
    _inherits(Item, _Thing);

    function Item() {
        var clientId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

        _this.m_clientId = 0;
        _this.m_countOrSubType = -1;
        _this.m_async = true;
        _this.m_phase = 0;
        _this.m_lastPhase = 0;
        _this.m_clientId = clientId;
        return _this;
    }

    _createClass(Item, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (this.m_clientId == 0) return;
            // determine animation phase
            var animationPhase = this.calculateAnimationPhase(animate);
            // determine x,y,z patterns
            var pattern = new _position.Position();
            this.calculatePatterns(pattern);
            //console.log('draw item', this.m_clientId, dest, scaleFactor, 0, pattern.x, pattern.y, pattern.z, animationPhase);
            this.rawGetThingType().draw(dest, scaleFactor, 0, pattern.x, pattern.y, pattern.z, animationPhase, lightView);
        }
    }, {
        key: "calculateAnimationPhase",
        value: function calculateAnimationPhase(animate) {
            if (this.getAnimationPhases() > 1) {
                if (animate) {
                    if (this.getAnimator() != null) return (0, _helpers.toInt)(this.getAnimator().getPhase());
                    if (this.m_async) return (0, _helpers.toInt)(_g_clock.g_clock.millis() % (_const.Otc.ITEM_TICKS_PER_FRAME * this.getAnimationPhases()) / _const.Otc.ITEM_TICKS_PER_FRAME);else {
                        if (_g_clock.g_clock.millis() - this.m_lastPhase >= _const.Otc.ITEM_TICKS_PER_FRAME) {
                            this.m_phase = (this.m_phase + 1) % this.getAnimationPhases();
                            this.m_lastPhase = _g_clock.g_clock.millis();
                        }
                        return (0, _helpers.toInt)(this.m_phase);
                    }
                } else return (0, _helpers.toInt)(this.getAnimationPhases() - 1);
            }
            return 0;
        }
    }, {
        key: "calculatePatterns",
        value: function calculatePatterns(pattern) {
            // Avoid crashes with invalid items
            if (!this.isValid()) return;
            if (this.isStackable() && this.getNumPatternX() == 4 && this.getNumPatternY() == 2) {
                if (this.m_countOrSubType <= 0) {
                    pattern.x = 0;
                    pattern.y = 0;
                } else if (this.m_countOrSubType < 5) {
                    pattern.x = this.m_countOrSubType - 1;
                    pattern.y = 0;
                } else if (this.m_countOrSubType < 10) {
                    pattern.x = 0;
                    pattern.y = 1;
                } else if (this.m_countOrSubType < 25) {
                    pattern.x = 1;
                    pattern.y = 1;
                } else if (this.m_countOrSubType < 50) {
                    pattern.x = 2;
                    pattern.y = 1;
                } else {
                    pattern.x = 3;
                    pattern.y = 1;
                }
            } else if (this.isHangable()) {
                var tile = this.getTile();
                if (tile) {
                    if (tile.mustHookSouth()) pattern.x = this.getNumPatternX() >= 2 ? 1 : 0;else if (tile.mustHookEast()) pattern.x = this.getNumPatternX() >= 3 ? 2 : 0;
                }
            } else if (this.isSplash() || this.isFluidContainer()) {
                var color = _const.FluidsColor.FluidTransparent;
                if (_game.g_game.getFeature(_const.GameFeature.GameNewFluids)) {
                    switch (this.m_countOrSubType) {
                        case _const.FluidsColor.FluidNone:
                            color = _const.FluidsColor.FluidTransparent;
                            break;
                        case _const.FluidsColor.FluidWater:
                            color = _const.FluidsColor.FluidBlue;
                            break;
                        case _const.FluidsColor.FluidMana:
                            color = _const.FluidsColor.FluidPurple;
                            break;
                        case _const.FluidsColor.FluidBeer:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidOil:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidBlood:
                            color = _const.FluidsColor.FluidRed;
                            break;
                        case _const.FluidsColor.FluidSlime:
                            color = _const.FluidsColor.FluidGreen;
                            break;
                        case _const.FluidsColor.FluidMud:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidLemonade:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidMilk:
                            color = _const.FluidsColor.FluidWhite;
                            break;
                        case _const.FluidsColor.FluidWine:
                            color = _const.FluidsColor.FluidPurple;
                            break;
                        case _const.FluidsColor.FluidHealth:
                            color = _const.FluidsColor.FluidRed;
                            break;
                        case _const.FluidsColor.FluidUrine:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidRum:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidFruidJuice:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidCoconutMilk:
                            color = _const.FluidsColor.FluidWhite;
                            break;
                        case _const.FluidsColor.FluidTea:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidMead:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        default:
                            color = _const.FluidsColor.FluidTransparent;
                            break;
                    }
                } else color = this.m_countOrSubType;
                pattern.x = color % 4 % this.getNumPatternX();
                pattern.y = color / 4 % this.getNumPatternY();
            } else {
                pattern.x = this.m_position.x % this.getNumPatternX();
                pattern.y = this.m_position.y % this.getNumPatternY();
                pattern.z = this.m_position.z % this.getNumPatternZ();
            }
        }
    }, {
        key: "isItem",
        value: function isItem() {
            return true;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_clientId;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_clientId = id;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return _thingtypemanager.g_things.isValidDatId(this.m_clientId, _const.ThingCategory.ThingCategoryItem);
        }
    }, {
        key: "setCountOrSubType",
        value: function setCountOrSubType(count) {
            this.m_countOrSubType = count;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_clientId, _const.ThingCategory.ThingCategoryItem);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return this.getThingType();
        }
    }]);

    return Item;
}(_thing.Thing);

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Effect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

var _thingtypemanager = __webpack_require__(63);

var _const = __webpack_require__(13);

var _timer = __webpack_require__(92);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effect = exports.Effect = function (_Thing) {
    _inherits(Effect, _Thing);

    function Effect() {
        _classCallCheck(this, Effect);

        var _this = _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).apply(this, arguments));

        _this.m_animationTimer = new _timer.Timer();
        return _this;
    }

    _createClass(Effect, [{
        key: "isEffect",
        value: function isEffect() {
            return true;
        }
    }, {
        key: "drawEffect",
        value: function drawEffect(dest, scaleFactor, animate) {
            var offsetX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var offsetY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var lightView = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

            if (this.m_id == 0) return;
            var animationPhase = 0;
            if (animate) animationPhase = Math.min(this.m_animationTimer.ticksElapsed() / this.m_phaseDuration, this.getAnimationPhases() - 1);
            var xPattern = offsetX % this.getNumPatternX();
            if (xPattern < 0) xPattern += this.getNumPatternX();
            var yPattern = offsetY % this.getNumPatternY();
            if (yPattern < 0) yPattern += this.getNumPatternY();
            this.rawGetThingType().draw(dest, scaleFactor, 0, xPattern, yPattern, 0, animationPhase, lightView);
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            if (!_thingtypemanager.g_things.isValidDatId(id, _const.ThingCategory.ThingCategoryEffect)) id = 0;
            this.m_id = id;
        }
    }, {
        key: "asEffect",
        value: function asEffect() {
            return this;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_id, _const.ThingCategory.ThingCategoryEffect);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return _thingtypemanager.g_things.rawGetThingType(this.m_id, _const.ThingCategory.ThingCategoryEffect);
        }
    }, {
        key: "onAppear",
        value: function onAppear() {
            this.m_animationTimer.restart();
            this.m_phaseDuration = Effect.EFFECT_TICKS_PER_FRAME;
            // hack to fix some animation phases duration, currently there is no better solution
            if (this.m_id == 33) this.m_phaseDuration <<= 2;
            //g_dispatcher.scheduleEvent([this]() { g_map.removeThing(this); }, this.m_phaseDuration * this.getAnimationPhases());
        }
    }]);

    return Effect;
}(_thing.Thing);

Effect.EFFECT_TICKS_PER_FRAME = 75;

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimatedText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

var _timer = __webpack_require__(92);

var _color = __webpack_require__(57);

var _cachedtext = __webpack_require__(129);

var _const = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedText = exports.AnimatedText = function (_Thing) {
    _inherits(AnimatedText, _Thing);

    function AnimatedText() {
        _classCallCheck(this, AnimatedText);

        var _this = _possibleConstructorReturn(this, (AnimatedText.__proto__ || Object.getPrototypeOf(AnimatedText)).call(this));

        _this.m_color = new _color.Color();
        _this.m_animationTimer = new _timer.Timer();
        _this.m_cachedText = new _cachedtext.CachedText();
        _this.m_cachedText.setFont("verdana-11px-rounded");
        _this.m_cachedText.setAlign(_cachedtext.CachedText.ALIGN_LEFT);
        return _this;
    }

    _createClass(AnimatedText, [{
        key: "drawText",
        value: function drawText(dest, visibleRect) {
            /* todo */
            /*
            static float tf = Otc::ANIMATED_TEXT_DURATION;
            static float tftf = Otc::ANIMATED_TEXT_DURATION * Otc::ANIMATED_TEXT_DURATION;
             Point p = dest;
            Size textSize = m_cachedText.getTextSize();
            float t = m_animationTimer.ticksElapsed();
            p.x += (24 - textSize.width() / 2);
             if(g_game.getFeature(Otc::GameDiagonalAnimatedText)) {
                p.x -= (4 * t / tf) + (8 * t * t / tftf);
            }
             p.y += 8 + (-48 * t) / tf;
            p += m_offset;
            Rect rect(p, textSize);
             if(visibleRect.contains(rect)) {
                float t0 = tf / 1.2;
                if(t > t0) {
                    Color color = m_color;
                    color.setAlpha((float)(1 - (t - t0) / (tf - t0)));
                    g_painter.setColor(color);
                }
                else
                    g_painter.setColor(m_color);
                m_cachedText.draw(rect);
            }
            */
        }
    }, {
        key: "setColor",
        value: function setColor(color) {
            this.m_color = _color.Color.from8bit(color);
        }
    }, {
        key: "setText",
        value: function setText(text) {
            //m_cachedText.setText(text);
        }
    }, {
        key: "setOffset",
        value: function setOffset(offset) {
            this.m_offset = offset;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this.m_color;
        }
    }, {
        key: "getCachedText",
        value: function getCachedText() {
            return this.m_cachedText;
        }
    }, {
        key: "getOffset",
        value: function getOffset() {
            return this.m_offset;
        }
    }, {
        key: "getTimer",
        value: function getTimer() {
            return this.m_animationTimer;
        }
    }, {
        key: "merge",
        value: function merge(other) {
            if (other.getColor() != this.m_color) return false;
            if (other.getCachedText().getFont() != this.m_cachedText.getFont()) return false;
            if (this.m_animationTimer.ticksElapsed() > _const.Otc.ANIMATED_TEXT_DURATION / 2.5) return false;
            var number = parseInt(this.m_cachedText.getText());
            var otherNumber = parseInt(other.getCachedText().getText());
            if (!isNaN(number) && !isNaN(otherNumber)) {
                this.m_cachedText.setText((number + otherNumber).toString());
                return true;
            }
            return false;
        }
    }, {
        key: "asAnimatedText",
        value: function asAnimatedText() {
            return this;
        }
    }, {
        key: "isAnimatedText",
        value: function isAnimatedText() {
            return true;
        }
    }, {
        key: "onAppear",
        value: function onAppear() {
            this.m_animationTimer.restart();
            // schedule removal
            //auto self = asAnimatedText();
            //g_dispatcher.scheduleEvent([self]() { g_map.removeThing(self); }, Otc::ANIMATED_TEXT_DURATION);
        }
    }]);

    return AnimatedText;
}(_thing.Thing);

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Missile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(54);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Missile = exports.Missile = function (_Thing) {
    _inherits(Missile, _Thing);

    function Missile() {
        _classCallCheck(this, Missile);

        return _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).apply(this, arguments));
    }

    _createClass(Missile, [{
        key: "isMissile",
        value: function isMissile() {
            return true;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "setPath",
        value: function setPath(fromPos, toPos) {}
    }]);

    return Missile;
}(_thing.Thing);

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Npc = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(124);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Npc = exports.Npc = function (_Creature) {
    _inherits(Npc, _Creature);

    function Npc() {
        _classCallCheck(this, Npc);

        return _possibleConstructorReturn(this, (Npc.__proto__ || Object.getPrototypeOf(Npc)).apply(this, arguments));
    }

    _createClass(Npc, [{
        key: "isNpc",
        value: function isNpc() {
            return true;
        }
    }]);

    return Npc;
}(_creature.Creature);

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Monster = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(124);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster = exports.Monster = function (_Creature) {
    _inherits(Monster, _Creature);

    function Monster() {
        _classCallCheck(this, Monster);

        return _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).apply(this, arguments));
    }

    _createClass(Monster, [{
        key: "isMonster",
        value: function isMonster() {
            return true;
        }
    }]);

    return Monster;
}(_creature.Creature);

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = exports.Container = function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, [{
        key: "setId",
        value: function setId(id) {}
    }]);

    return Container;
}();

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_chat = exports.Chatbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpeakTypes;

var _chatboxtab = __webpack_require__(467);

var _const = __webpack_require__(13);

var _log = __webpack_require__(20);

var _game = __webpack_require__(38);

var _statictext = __webpack_require__(189);

var _map = __webpack_require__(55);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpeakTypesSettings = {
    none: {},
    say: { speakType: _const.MessageMode.MessageSay, color: '#FFFF00' },
    whisper: { speakType: _const.MessageMode.MessageWhisper, color: '#FFFF00' },
    yell: { speakType: _const.MessageMode.MessageYell, color: '#FFFF00' },
    broadcast: { speakType: _const.MessageMode.MessageGamemasterBroadcast, color: '#F55E5E' },
    private: { speakType: _const.MessageMode.MessagePrivateTo, color: '#5FF7F7', private: true },
    privateRed: { speakType: _const.MessageMode.MessageGamemasterPrivateTo, color: '#F55E5E', private: true },
    privatePlayerToPlayer: { speakType: _const.MessageMode.MessagePrivateTo, color: '#9F9DFD', private: true },
    privatePlayerToNpc: { speakType: _const.MessageMode.MessageNpcTo, color: '#9F9DFD', private: true, npcChat: true },
    privateNpcToPlayer: { speakType: _const.MessageMode.MessageNpcFrom, color: '#5FF7F7', private: true, npcChat: true },
    channelYellow: { speakType: _const.MessageMode.MessageChannel, color: '#FFFF00' },
    channelWhite: { speakType: _const.MessageMode.MessageChannelManagement, color: '#FFFFFF' },
    channelRed: { speakType: _const.MessageMode.MessageGamemasterChannel, color: '#F55E5E' },
    channelOrange: { speakType: _const.MessageMode.MessageChannelHighlight, color: '#FE6500' },
    monsterSay: { speakType: _const.MessageMode.MessageMonsterSay, color: '#FE6500', hideInConsole: true },
    monsterYell: { speakType: _const.MessageMode.MessageMonsterYell, color: '#FE6500', hideInConsole: true },
    rvrAnswerFrom: { speakType: _const.MessageMode.MessageRVRAnswer, color: '#FE6500' },
    rvrAnswerTo: { speakType: _const.MessageMode.MessageRVRAnswer, color: '#FE6500' },
    rvrContinue: { speakType: _const.MessageMode.MessageRVRContinue, color: '#FFFF00' }
};
var SpeakTypes = (_SpeakTypes = {}, _defineProperty(_SpeakTypes, _const.MessageMode.MessageSay, SpeakTypesSettings.say), _defineProperty(_SpeakTypes, _const.MessageMode.MessageWhisper, SpeakTypesSettings.whisper), _defineProperty(_SpeakTypes, _const.MessageMode.MessageYell, SpeakTypesSettings.yell), _defineProperty(_SpeakTypes, _const.MessageMode.MessageGamemasterBroadcast, SpeakTypesSettings.broadcast), _defineProperty(_SpeakTypes, _const.MessageMode.MessagePrivateFrom, SpeakTypesSettings.private), _defineProperty(_SpeakTypes, _const.MessageMode.MessageGamemasterPrivateFrom, SpeakTypesSettings.privateRed), _defineProperty(_SpeakTypes, _const.MessageMode.MessageNpcTo, SpeakTypesSettings.privatePlayerToNpc), _defineProperty(_SpeakTypes, _const.MessageMode.MessageNpcFrom, SpeakTypesSettings.privateNpcToPlayer), _defineProperty(_SpeakTypes, _const.MessageMode.MessageChannel, SpeakTypesSettings.channelYellow), _defineProperty(_SpeakTypes, _const.MessageMode.MessageChannelManagement, SpeakTypesSettings.channelWhite), _defineProperty(_SpeakTypes, _const.MessageMode.MessageGamemasterChannel, SpeakTypesSettings.channelRed), _defineProperty(_SpeakTypes, _const.MessageMode.MessageChannelHighlight, SpeakTypesSettings.channelOrange), _defineProperty(_SpeakTypes, _const.MessageMode.MessageMonsterSay, SpeakTypesSettings.monsterSay), _defineProperty(_SpeakTypes, _const.MessageMode.MessageMonsterYell, SpeakTypesSettings.monsterYell), _defineProperty(_SpeakTypes, _const.MessageMode.MessageRVRChannel, SpeakTypesSettings.channelWhite), _defineProperty(_SpeakTypes, _const.MessageMode.MessageRVRContinue, SpeakTypesSettings.rvrContinue), _defineProperty(_SpeakTypes, _const.MessageMode.MessageRVRAnswer, SpeakTypesSettings.rvrAnswerFrom), _defineProperty(_SpeakTypes, _const.MessageMode.MessageNpcFromStartBlock, SpeakTypesSettings.privateNpcToPlayer), _defineProperty(_SpeakTypes, _const.MessageMode.MessageSpell, SpeakTypesSettings.none), _defineProperty(_SpeakTypes, _const.MessageMode.MessageBarkLow, SpeakTypesSettings.none), _defineProperty(_SpeakTypes, _const.MessageMode.MessageBarkLoud, SpeakTypesSettings.none), _SpeakTypes);

var Chatbox = exports.Chatbox = function () {
    function Chatbox() {
        _classCallCheck(this, Chatbox);

        this.consolePanel = null;
        this.consoleContentPanel = null;
        this.consoleTabBar = null;
        this.consoleTextEdit = null;
        this.channels = [];
        this.channelsWindow = null;
        this.communicationWindow = null;
        this.ownPrivateName = null;
        this.messageHistory = {};
        this.currentMessageIndex = 0;
        this.ignoreNpcMessages = false;
        this.defaultTab = null;
        this.serverTab = null;
        this.violationsChannelId = null;
        this.violationWindow = null;
        this.violationReportTab = null;
        this.ignoredChannels = {};
        this.filters = {};
        this.tabs = [];
    }

    _createClass(Chatbox, [{
        key: "addTab",
        value: function addTab(name) {
            var focus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var tab = this.getTab(name);
            if (tab) {
                focus = true;
            } else {
                tab = new _chatboxtab.ChatboxTab(name);
            }
            if (focus) {
                this.selectTab(tab);
            }
            this.tabs[name] = tab;
            return tab;
        }
    }, {
        key: "selectTab",
        value: function selectTab(tab) {
            /* todo */
        }
    }, {
        key: "removeTab",
        value: function removeTab(tab) {
            console.error('close tab', tab);
            /*
            if type(tab) == 'string' then
            tab = consoleTabBar:getTab(tab)
            end
             if tab == defaultTab or tab == serverTab then
            return
            end
             if tab == violationReportTab then
            g_game.cancelRuleViolation()
            violationReportTab = nil
            elseif tab.violationChatName then
            g_game.closeRuleViolation(tab.violationChatName)
            elseif tab.channelId then
            -- notificate the server that we are leaving the channel
            for k, v in pairs(channels) do
                if (k == tab.channelId) then channels[k] = nil end
            end
            g_game.leaveChannel(tab.channelId)
            elseif tab:getText() == "NPCs" then
            g_game.closeNpcChannel()
            end
             consoleTabBar:removeTab(tab)
            */
        }
    }, {
        key: "addChannel",
        value: function addChannel(name, id) {
            //console.log('add chanel', name, id);
            this.channels[id] = name;
            var tab = this.addTab(name, true);
            tab.channelId = id;
            return tab;
        }
    }, {
        key: "addPrivateChannel",
        value: function addPrivateChannel(receiver) {
            this.channels[receiver] = receiver;
            return this.addTab(receiver, false);
        }
    }, {
        key: "getTab",
        value: function getTab(name) {
            return this.tabs[name];
        }
    }, {
        key: "addPrivateText",
        value: function addPrivateText(text, speaktype, name, isPrivateCommand, creatureName) {
            var focus = false;
            if (speaktype.npcChat) {
                name = 'NPCs';
                focus = true;
            }
            var privateTab = this.getTab(name);
            if (!privateTab) {
                privateTab = this.addTab(name, focus);
                this.channels[name] = name;
                privateTab.npcChat = speaktype.npcChat;
            } else if (focus) {
                this.selectTab(privateTab);
            }
            this.addTabText(text, speaktype, privateTab, creatureName);
        }
    }, {
        key: "addText",
        value: function addText(text, speaktype, tabName, creatureName) {
            var tab = this.getTab(tabName);
            if (tab) {
                this.addTabText(text, speaktype, tab, creatureName);
            } else {
                console.error('no tab', tabName, this.tabs);
            }
        }
    }, {
        key: "addTabText",
        value: function addTabText(text, speaktype, tab, creatureName) {
            tab.addText(text, speaktype, creatureName);
        }
        /*
        function addTabText(text, speaktype, tab, creatureName)
          if not tab or tab.locked or not text or #text == 0 then return end
        
          if modules.client_options.getOption('showTimestampsInConsole') then
            text = os.date('%H:%M') .. ' ' .. text
          end
        
          local panel = consoleTabBar:getTabPanel(tab)
          local consoleBuffer = panel:getChildById('consoleBuffer')
          local label = g_ui.createWidget('ConsoleLabel', consoleBuffer)
          label:setId('consoleLabel' .. consoleBuffer:getChildCount())
          label:setText(text)
          label:setColor(speaktype.color)
          consoleTabBar:blinkTab(tab)
        
          -- Overlay for consoleBuffer which shows highlighted words only
        
          if speaktype.npcChat and (g_game.getCharacterName() ~= creatureName or g_game.getCharacterName() == 'Account Manager') then
            local highlightData = getHighlightedText(text)
            if #highlightData > 0 then
              local labelHighlight = g_ui.createWidget('ConsolePhantomLabel', label)
              labelHighlight:fill('parent')
        
              labelHighlight:setId('consoleLabelHighlight' .. consoleBuffer:getChildCount())
              labelHighlight:setColor("#1f9ffe")
        
              -- Remove the curly braces
              for i = 1, #highlightData / 3 do
                local dataBlock = { _start = highlightData[(i-1)*3+1], _end = highlightData[(i-1)*3+2], words = highlightData[(i-1)*3+3] }
                text = text:gsub("%{(.-)%}", dataBlock.words, 1)
        
                -- Recalculate positions as braces are removed
                highlightData[(i-1)*3+1] = dataBlock._start - ((i-1) * 2)
                highlightData[(i-1)*3+2] = dataBlock._end - (1 + (i-1) * 2)
              end
              label:setText(text)
        
              -- Calculate the positions of the highlighted text and fill with string.char(127) [Width: 1]
              local drawText = label:getDrawText()
              local tmpText = ""
              for i = 1, #highlightData / 3 do
                local dataBlock = { _start = highlightData[(i-1)*3+1], _end = highlightData[(i-1)*3+2], words = highlightData[(i-1)*3+3] }
                local lastBlockEnd = (highlightData[(i-2)*3+2] or 1)
        
                for letter = lastBlockEnd, dataBlock._start-1 do
                  local tmpChar = string.byte(drawText:sub(letter, letter))
                  local fillChar = (tmpChar == 10 or tmpChar == 32) and string.char(tmpChar) or string.char(127)
        
                  tmpText = tmpText .. string.rep(fillChar, letterWidth[tmpChar])
                end
                tmpText = tmpText .. dataBlock.words
              end
        
              -- Fill the highlight label to the same size as default label
              local finalBlockEnd = (highlightData[(#highlightData/3-1)*3+2] or 1)
              for letter = finalBlockEnd, drawText:len() do
                  local tmpChar = string.byte(drawText:sub(letter, letter))
                  local fillChar = (tmpChar == 10 or tmpChar == 32) and string.char(tmpChar) or string.char(127)
        
                  tmpText = tmpText .. string.rep(fillChar, letterWidth[tmpChar])
              end
        
              labelHighlight:setText(tmpText)
            end
          end
        
          label.name = creatureName
          consoleBuffer.onMouseRelease = function(self, mousePos, mouseButton)
            processMessageMenu(mousePos, mouseButton, nil, nil, nil, tab)
          end
          label.onMouseRelease = function(self, mousePos, mouseButton)
            processMessageMenu(mousePos, mouseButton, creatureName, text, self, tab)
          end
          label.onMousePress = function(self, mousePos, button)
            if button == MouseLeftButton then clearSelection(consoleBuffer) end
          end
          label.onDragEnter = function(self, mousePos)
            clearSelection(consoleBuffer)
            return true
          end
          label.onDragLeave = function(self, droppedWidget, mousePos)
            local text = {}
            for selectionChild = consoleBuffer.selection.first, consoleBuffer.selection.last do
              local label = self:getParent():getChildByIndex(selectionChild)
              table.insert(text, label:getSelection())
            end
            consoleBuffer.selectionText = table.concat(text, '\n')
            return true
          end
          label.onDragMove = function(self, mousePos, mouseMoved)
            local parent = self:getParent()
            local parentRect = parent:getPaddingRect()
            local selfIndex = parent:getChildIndex(self)
            local child = parent:getChildByPos(mousePos)
        
            -- find bonding children
            if not child then
              if mousePos.y < self:getY() then
                for index = selfIndex - 1, 1, -1 do
                  local label = parent:getChildByIndex(index)
                  if label:getY() + label:getHeight() > parentRect.y then
                    if (mousePos.y >= label:getY() and mousePos.y <= label:getY() + label:getHeight()) or index == 1 then
                      child = label
                      break
                    end
                  else
                    child = parent:getChildByIndex(index + 1)
                    break
                  end
                end
              elseif mousePos.y > self:getY() + self:getHeight() then
                for index = selfIndex + 1, parent:getChildCount(), 1 do
                  local label = parent:getChildByIndex(index)
                  if label:getY() < parentRect.y + parentRect.height then
                    if (mousePos.y >= label:getY() and mousePos.y <= label:getY() + label:getHeight()) or index == parent:getChildCount() then
                      child = label
                      break
                    end
                  else
                    child = parent:getChildByIndex(index - 1)
                    break
                  end
                end
              else
                child = self
              end
            end
        
            if not child then return false end
        
            local childIndex = parent:getChildIndex(child)
        
            -- remove old selection
            clearSelection(consoleBuffer)
        
            -- update self selection
            local textBegin = self:getTextPos(self:getLastClickPosition())
            local textPos = self:getTextPos(mousePos)
            self:setSelection(textBegin, textPos)
        
            consoleBuffer.selection = { first = math.min(selfIndex, childIndex), last = math.max(selfIndex, childIndex) }
        
            -- update siblings selection
            if child ~= self then
              for selectionChild = consoleBuffer.selection.first + 1, consoleBuffer.selection.last - 1 do
                parent:getChildByIndex(selectionChild):selectAll()
              end
        
              local textPos = child:getTextPos(mousePos)
              if childIndex > selfIndex then
                child:setSelection(0, textPos)
              else
                child:setSelection(string.len(child:getText()), textPos)
              end
            end
        
            return true
          end
        
          if consoleBuffer:getChildCount() > MAX_LINES then
            local child = consoleBuffer:getFirstChild()
            clearSelection(consoleBuffer)
            child:destroy()
          end
        end
         */

    }, {
        key: "displayBroadcastMessage",
        value: function displayBroadcastMessage(text) {
            this.getTab(this.defaultTab).addText(text, SpeakTypes[_const.MessageMode.MessageGamemasterPrivateFrom], '');
        }
    }, {
        key: "handleMessage",
        value: function handleMessage(name, level, mode, message, channelId, creaturePos) {
            if (mode == _const.MessageMode.MessageGamemasterBroadcast) {
                this.displayBroadcastMessage(name + ': ' + message);
                return;
            }
            var isNpcMode = mode == _const.MessageMode.MessageNpcFromStartBlock || mode == _const.MessageMode.MessageNpcFrom;
            if (this.ignoreNpcMessages && isNpcMode) {
                return;
            }
            var speaktype = SpeakTypes[mode];
            if (!speaktype) {
                _log.Log.error('unhandled onTalk message mode ' + mode + ': ' + message);
                return;
            }
            var localPlayer = _game.g_game.getLocalPlayer();
            if (mode == _const.MessageMode.MessageRVRChannel) {
                channelId = this.violationsChannelId;
            }
            if (mode == _const.MessageMode.MessageSay || mode == _const.MessageMode.MessageWhisper || mode == _const.MessageMode.MessageYell || mode == _const.MessageMode.MessageSpell || mode == _const.MessageMode.MessageMonsterSay || mode == _const.MessageMode.MessageMonsterYell || mode == _const.MessageMode.MessageNpcFrom || mode == _const.MessageMode.MessageBarkLow || mode == _const.MessageMode.MessageBarkLoud || mode == _const.MessageMode.MessageNpcFromStartBlock && creaturePos) {
                var staticText = new _statictext.StaticText();
                var staticMessage = message;
                if (isNpcMode) {
                    var highlightData = staticMessage; //getHighlightedText(staticMessage)
                    if (highlightData.length > 0) {
                        for (var i = 1; highlightData.length / 3; i++) {
                            var dataBlock = {
                                _start: highlightData[(i - 1) * 3 + 1],
                                _end: highlightData[(i - 1) * 3 + 2],
                                words: highlightData[(i - 1) * 3 + 3]
                            };
                            //staticMessage = staticMessage:gsub("{"..dataBlock.words.."}", dataBlock.words)
                        }
                    }
                    staticText.setColor(speaktype.color);
                }
                staticText.addMessage(name, mode, staticMessage);
                _map.g_map.addThing(staticText, creaturePos, -1);
            }
            var defaultMessage = mode <= 3 && true || false;
            if (speaktype == SpeakTypesSettings.none) {
                return;
            }
            if (speaktype.hideInConsole) {
                return;
            }
            var composedMessage = message; //applyMessagePrefixies(name, level, message)
            if (mode == _const.MessageMode.MessageRVRAnswer) {
                this.addTabText(composedMessage, speaktype, this.violationReportTab, name);
            } else if (mode == _const.MessageMode.MessageRVRContinue) {
                this.addText(composedMessage, speaktype, name + '\'...', name);
            } else if (speaktype.private) {
                this.addPrivateText(composedMessage, speaktype, name, false, name);
                if (speaktype != SpeakTypesSettings.privateNpcToPlayer) {
                    //modules.game_textmessage.displayPrivateMessage(name+':\n'+message);
                }
            } else {
                var channel = this.defaultTab;
                if (!defaultMessage) {
                    channel = this.channels[channelId];
                }
                if (channel) {
                    this.addText(composedMessage, speaktype, channel, name);
                } else {
                    _log.Log.debug('message in channel id ' + channelId + ' which is unknown, this is a server bug, relogin if you want to see messages in this channel');
                }
            }
        }
    }]);

    return Chatbox;
}();

var g_chat = new Chatbox();
g_chat.addTab('Default', true);
g_chat.addTab('Server Log');
g_chat.defaultTab = 'Default';
g_chat.serverTab = 'Server Log';
exports.g_chat = g_chat;

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatboxTab = exports.ChatboxTab = function () {
    function ChatboxTab(name) {
        _classCallCheck(this, ChatboxTab);

        this.name = name;
        this.channelId = -1;
        var div = document.getElementById('chatbox');
        var content = document.createElement('div');
        content.setAttribute('id', 'chatboxtab-' + this.name);
        div.appendChild(content);
        this.addText('------------------------------------' + this.name, 0, '');
    }

    _createClass(ChatboxTab, [{
        key: 'addText',
        value: function addText(text, speaktype, creatureName) {
            /*
            var div = document.getElementById('chatboxtab-' + this.name);
            var content = document.createElement('div');
            content.innerText = creatureName + ', ' + text;
            div.appendChild(content);
             console.log('tab', this.name, text, speaktype, creatureName);
            */
        }
    }]);

    return ChatboxTab;
}();

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = undefined;

var _binarydatareader = __webpack_require__(128);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = exports.Movie = function (_BinaryDataReader) {
  _inherits(Movie, _BinaryDataReader);

  function Movie() {
    _classCallCheck(this, Movie);

    return _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).apply(this, arguments));
  }

  return Movie;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Thing = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(55);

var _game = __webpack_require__(38);

var _log = __webpack_require__(20);

var _thingtypemanager = __webpack_require__(63);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thing = exports.Thing = function () {
    function Thing() {
        _classCallCheck(this, Thing);
    }

    _createClass(Thing, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            throw new Error('Unimplemented!');
        }
    }, {
        key: "setId",
        value: function setId(id) {}
    }, {
        key: "setPosition",
        value: function setPosition(position) {
            if (this.m_position == position) return;
            var oldPos = this.m_position;
            this.m_position = position;
            this.onPositionChange(this.m_position, oldPos);
        }
    }, {
        key: "getId",
        value: function getId() {
            return 0;
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return this.m_position;
        }
    }, {
        key: "getStackPriority",
        value: function getStackPriority() {
            if (this.isGround()) return 0;else if (this.isGroundBorder()) return 1;else if (this.isOnBottom()) return 2;else if (this.isOnTop()) return 3;else if (this.isCreature()) return 4;else return 5;
        }
    }, {
        key: "getTile",
        value: function getTile() {
            return _map.g_map.getTile(this.m_position);
        }
    }, {
        key: "getParentContainer",
        value: function getParentContainer() {
            if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
                var containerId = this.m_position.y ^ 0x40;
                return _game.g_game.getContainer(containerId);
            }
            return null;
        }
    }, {
        key: "getStackPos",
        value: function getStackPos() {
            if (this.m_position.x == 65535 && this.isItem()) return this.m_position.z;else {
                var tile = this.getTile();
                if (tile) return tile.getThingStackPos(this);else (0, _log.error)("got a thing with invalid stackpos");
            }
            return -1;
        }
    }, {
        key: "isItem",
        value: function isItem() {
            return false;
        }
    }, {
        key: "isEffect",
        value: function isEffect() {
            return false;
        }
    }, {
        key: "isMissile",
        value: function isMissile() {
            return false;
        }
    }, {
        key: "isCreature",
        value: function isCreature() {
            return false;
        }
    }, {
        key: "isNpc",
        value: function isNpc() {
            return false;
        }
    }, {
        key: "isMonster",
        value: function isMonster() {
            return false;
        }
    }, {
        key: "isPlayer",
        value: function isPlayer() {
            return false;
        }
    }, {
        key: "isLocalPlayer",
        value: function isLocalPlayer() {
            return false;
        }
    }, {
        key: "isAnimatedText",
        value: function isAnimatedText() {
            return false;
        }
    }, {
        key: "isStaticText",
        value: function isStaticText() {
            return false;
        }
        // type shortcuts

    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getNullThingType();
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return this.getThingType();
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this.rawGetThingType().getSize();
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.rawGetThingType().getWidth();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.rawGetThingType().getHeight();
        }
    }, {
        key: "getDisplacement",
        value: function getDisplacement() {
            return this.rawGetThingType().getDisplacement();
        }
    }, {
        key: "getDisplacementX",
        value: function getDisplacementX() {
            return this.rawGetThingType().getDisplacementX();
        }
    }, {
        key: "getDisplacementY",
        value: function getDisplacementY() {
            return this.rawGetThingType().getDisplacementY();
        }
    }, {
        key: "getExactSize",
        value: function getExactSize(layer, xPattern, yPattern, zPattern, animationPhase) {
            return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
        }
    }, {
        key: "getLayers",
        value: function getLayers() {
            return this.rawGetThingType().getLayers();
        }
    }, {
        key: "getNumPatternX",
        value: function getNumPatternX() {
            return this.rawGetThingType().getNumPatternX();
        }
    }, {
        key: "getNumPatternY",
        value: function getNumPatternY() {
            return this.rawGetThingType().getNumPatternY();
        }
    }, {
        key: "getNumPatternZ",
        value: function getNumPatternZ() {
            return this.rawGetThingType().getNumPatternZ();
        }
    }, {
        key: "getAnimationPhases",
        value: function getAnimationPhases() {
            return this.rawGetThingType().getAnimationPhases();
        }
    }, {
        key: "getAnimator",
        value: function getAnimator() {
            return this.rawGetThingType().getAnimator();
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            return this.rawGetThingType().getGroundSpeed();
        }
    }, {
        key: "getMaxTextLength",
        value: function getMaxTextLength() {
            return this.rawGetThingType().getMaxTextLength();
        }
    }, {
        key: "getLight",
        value: function getLight() {
            return this.rawGetThingType().getLight();
        }
    }, {
        key: "getMinimapColor",
        value: function getMinimapColor() {
            return this.rawGetThingType().getMinimapColor();
        }
    }, {
        key: "getLensHelp",
        value: function getLensHelp() {
            return this.rawGetThingType().getLensHelp();
        }
    }, {
        key: "getClothSlot",
        value: function getClothSlot() {
            return this.rawGetThingType().getClothSlot();
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            return this.rawGetThingType().getElevation();
        }
    }, {
        key: "isGround",
        value: function isGround() {
            return this.rawGetThingType().isGround();
        }
    }, {
        key: "isGroundBorder",
        value: function isGroundBorder() {
            return this.rawGetThingType().isGroundBorder();
        }
    }, {
        key: "isOnBottom",
        value: function isOnBottom() {
            return this.rawGetThingType().isOnBottom();
        }
    }, {
        key: "isOnTop",
        value: function isOnTop() {
            return this.rawGetThingType().isOnTop();
        }
    }, {
        key: "isContainer",
        value: function isContainer() {
            return this.rawGetThingType().isContainer();
        }
    }, {
        key: "isStackable",
        value: function isStackable() {
            return this.rawGetThingType().isStackable();
        }
    }, {
        key: "isForceUse",
        value: function isForceUse() {
            return this.rawGetThingType().isForceUse();
        }
    }, {
        key: "isMultiUse",
        value: function isMultiUse() {
            return this.rawGetThingType().isMultiUse();
        }
    }, {
        key: "isWritable",
        value: function isWritable() {
            return this.rawGetThingType().isWritable();
        }
    }, {
        key: "isChargeable",
        value: function isChargeable() {
            return this.rawGetThingType().isChargeable();
        }
    }, {
        key: "isWritableOnce",
        value: function isWritableOnce() {
            return this.rawGetThingType().isWritableOnce();
        }
    }, {
        key: "isFluidContainer",
        value: function isFluidContainer() {
            return this.rawGetThingType().isFluidContainer();
        }
    }, {
        key: "isSplash",
        value: function isSplash() {
            return this.rawGetThingType().isSplash();
        }
    }, {
        key: "isNotWalkable",
        value: function isNotWalkable() {
            return this.rawGetThingType().isNotWalkable();
        }
    }, {
        key: "isNotMoveable",
        value: function isNotMoveable() {
            return this.rawGetThingType().isNotMoveable();
        }
    }, {
        key: "blockProjectile",
        value: function blockProjectile() {
            return this.rawGetThingType().blockProjectile();
        }
    }, {
        key: "isNotPathable",
        value: function isNotPathable() {
            return this.rawGetThingType().isNotPathable();
        }
    }, {
        key: "isPickupable",
        value: function isPickupable() {
            return this.rawGetThingType().isPickupable();
        }
    }, {
        key: "isHangable",
        value: function isHangable() {
            return this.rawGetThingType().isHangable();
        }
    }, {
        key: "isHookSouth",
        value: function isHookSouth() {
            return this.rawGetThingType().isHookSouth();
        }
    }, {
        key: "isHookEast",
        value: function isHookEast() {
            return this.rawGetThingType().isHookEast();
        }
    }, {
        key: "isRotateable",
        value: function isRotateable() {
            return this.rawGetThingType().isRotateable();
        }
    }, {
        key: "hasLight",
        value: function hasLight() {
            return this.rawGetThingType().hasLight();
        }
    }, {
        key: "isDontHide",
        value: function isDontHide() {
            return this.rawGetThingType().isDontHide();
        }
    }, {
        key: "isTranslucent",
        value: function isTranslucent() {
            return this.rawGetThingType().isTranslucent();
        }
    }, {
        key: "hasDisplacement",
        value: function hasDisplacement() {
            return this.rawGetThingType().hasDisplacement();
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            return this.rawGetThingType().hasElevation();
        }
    }, {
        key: "isLyingCorpse",
        value: function isLyingCorpse() {
            return this.rawGetThingType().isLyingCorpse();
        }
    }, {
        key: "isAnimateAlways",
        value: function isAnimateAlways() {
            return this.rawGetThingType().isAnimateAlways();
        }
    }, {
        key: "hasMiniMapColor",
        value: function hasMiniMapColor() {
            return this.rawGetThingType().hasMiniMapColor();
        }
    }, {
        key: "hasLensHelp",
        value: function hasLensHelp() {
            return this.rawGetThingType().hasLensHelp();
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            return this.rawGetThingType().isFullGround();
        }
    }, {
        key: "isIgnoreLook",
        value: function isIgnoreLook() {
            return this.rawGetThingType().isIgnoreLook();
        }
    }, {
        key: "isCloth",
        value: function isCloth() {
            return this.rawGetThingType().isCloth();
        }
    }, {
        key: "isMarketable",
        value: function isMarketable() {
            return this.rawGetThingType().isMarketable();
        }
    }, {
        key: "isUsable",
        value: function isUsable() {
            return this.rawGetThingType().isUsable();
        }
    }, {
        key: "isWrapable",
        value: function isWrapable() {
            return this.rawGetThingType().isWrapable();
        }
    }, {
        key: "isUnwrapable",
        value: function isUnwrapable() {
            return this.rawGetThingType().isUnwrapable();
        }
    }, {
        key: "isTopEffect",
        value: function isTopEffect() {
            return this.rawGetThingType().isTopEffect();
        }
    }, {
        key: "getMarketData",
        value: function getMarketData() {
            return this.rawGetThingType().getMarketData();
        }
    }, {
        key: "onPositionChange",
        value: function onPositionChange(newPos, oldPos) {}
    }, {
        key: "onAppear",
        value: function onAppear() {}
    }, {
        key: "onDisappear",
        value: function onDisappear() {}
    }]);

    return Thing;
}();

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_map = exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _position = __webpack_require__(69);

var _awarerange = __webpack_require__(181);

var _light = __webpack_require__(125);

var _tileblock = __webpack_require__(446);

var _const = __webpack_require__(13);

var _point = __webpack_require__(42);

var _helpers = __webpack_require__(56);

var _mapview = __webpack_require__(126);

var _game = __webpack_require__(38);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = exports.Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.m_tileBlocks = [];
        this.m_knownCreatures = [];
        this.m_floorMissiles = [];
        this.m_animatedTexts = [];
        this.m_staticTexts = [];
        // std::vector<MapViewPtr> m_mapViews;
        //std::unordered_map<Position, std::string, PositionHasher> m_waypoints;
        this.m_animationFlags = 0;
        this.m_zoneFlags = 0;
        this.m_zoneColors = [];
        this.m_zoneOpacity = 0.0;
        this.m_light = new _light.Light();
        this.m_centralPosition = new _position.Position();
        this.m_attribs = [];
        this.m_awareRange = new _awarerange.AwareRange();
        for (var z = 0; z <= _const.Otc.MAX_Z + 1; ++z) {
            this.m_tileBlocks[z] = [];
            this.m_floorMissiles[z] = [];
        }
    }

    _createClass(Map, [{
        key: "createTile",
        value: function createTile(pos) {
            if (!pos.isMapPosition()) return null;
            var block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (!block) {
                block = new _tileblock.TileBlock();
                this.m_tileBlocks[pos.z][this.getBlockIndex(pos)] = block;
            }
            return block.create(pos);
        }
    }, {
        key: "getTile",
        value: function getTile(pos) {
            if (!pos.isMapPosition()) return null;
            var it = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (it) return it.get(pos);
            return null;
        }
    }, {
        key: "getOrCreateTile",
        value: function getOrCreateTile(pos) {
            if (!pos.isMapPosition()) return null;
            var tile = this.getTile(pos);
            if (!tile) {
                tile = this.createTile(pos);
            }
            return tile;
        }
    }, {
        key: "setAwareRange",
        value: function setAwareRange(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getCreatureById",
        value: function getCreatureById(id) {
            //console.log('known creatures', g_map.m_knownCreatures);
            if (!g_map.m_knownCreatures[id]) {
                console.log('known creatures failed', id, g_map.m_knownCreatures);
                throw new Error('get ' + id);
            }
            return g_map.m_knownCreatures[id];
        }
    }, {
        key: "getAwareRange",
        value: function getAwareRange() {
            return this.m_awareRange;
        }
    }, {
        key: "getCentralPosition",
        value: function getCentralPosition() {
            return this.m_centralPosition;
        }
    }, {
        key: "setCentralPosition",
        value: function setCentralPosition(centralPosition) {
            if (this.m_centralPosition.equals(centralPosition)) return;
            this.m_centralPosition = centralPosition;
            this.removeUnawareThings();
            // this fixes local player position when the local player is removed from the map,
            // the local player is removed from the map when there are too many creatures on his tile,
            // so there is no enough stackpos to the server send him
            /*
            g_dispatcher.addEvent([this] {
                LocalPlayerPtr localPlayer = g_game.getLocalPlayer();
                if(!localPlayer || localPlayer->getPosition() == m_centralPosition)
                return;
                TilePtr tile = localPlayer->getTile();
                if(tile && tile->hasThing(localPlayer))
                return;
                 Position oldPos = localPlayer->getPosition();
                Position pos = m_centralPosition;
                if(oldPos != pos) {
                    if(!localPlayer->isRemoved())
                    localPlayer->onDisappear();
                    localPlayer->setPosition(pos);
                    localPlayer->onAppear();
                    g_logger.debug("forced player position update");
                }
            });
            */
            _mapview.g_mapview.onMapCenterChange(centralPosition);
        }
    }, {
        key: "cleanTile",
        value: function cleanTile(pos) {
            if (!pos.isMapPosition()) return;
            var block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (block) {
                var tile = block.get(pos);
                if (tile) {
                    tile.clean();
                    if (tile.canErase()) block.remove(pos);
                    //notificateTileUpdate(pos);
                }
            }
            for (var i = 0; i < this.m_staticTexts.length;) {
                var staticText = this.m_staticTexts[i];
                if (staticText.getPosition().equals(pos) && staticText.getMessageMode() == _const.MessageMode.MessageNone) this.m_staticTexts.splice(i, 1);else ++i;
            }
        }
    }, {
        key: "addThing",
        value: function addThing(thing, pos) {
            var stackPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

            if (!thing) return;
            if (thing.isItem() || thing.isCreature() || thing.isEffect()) {
                var tile = this.getOrCreateTile(pos);
                if (tile) tile.addThing(thing, stackPos);
            } else {
                if (thing.isMissile()) {
                    this.m_floorMissiles[pos.z].push(thing);
                } else if (thing.isAnimatedText()) {
                    // this code will stack animated texts of the same color
                    var animatedText = thing;
                    var prevAnimatedText = void 0;
                    var merged = false;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.m_animatedTexts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var other = _step.value;

                            if (other.getPosition() == pos) {
                                prevAnimatedText = other;
                                if (other.merge(animatedText)) {
                                    merged = true;
                                    break;
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (!merged) {
                        if (prevAnimatedText) {
                            var offset = prevAnimatedText.getOffset();
                            var t = prevAnimatedText.getTimer().ticksElapsed();
                            if (t < _const.Otc.ANIMATED_TEXT_DURATION / 4.0) {
                                var y = 12 - 48 * t / _const.Otc.ANIMATED_TEXT_DURATION;
                                offset.add(new _point.Point(0, y));
                            }
                            offset.y = Math.min(offset.y, 12);
                            animatedText.setOffset(offset);
                        }
                        this.m_animatedTexts.push(animatedText);
                    }
                } else if (thing.isStaticText()) {
                    var staticText = thing;
                    var mustAdd = true;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.m_staticTexts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _other = _step2.value;

                            // try to combine messages
                            if (_other.getPosition() == pos && _other.addMessage(staticText.getName(), staticText.getMessageMode(), staticText.getFirstMessage())) {
                                mustAdd = false;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (mustAdd) this.m_staticTexts.push(staticText);else return;
                }
                thing.setPosition(pos);
                thing.onAppear();
            }
            //notificateTileUpdate(pos);
        }
    }, {
        key: "removeThing",
        value: function removeThing(thing) {
            if (!thing) return false;
            var ret = false;
            if (thing.isMissile()) {
                var missile = thing;
                var z = missile.getPosition().z;
                var it = this.m_floorMissiles[z].indexOf(missile);
                if (it > -1) {
                    this.m_floorMissiles.splice(it, 1);
                    ret = true;
                }
            } else if (thing.isAnimatedText()) {
                var animatedText = thing;
                var _it = this.m_animatedTexts.indexOf(animatedText);
                if (_it > -1) {
                    this.m_animatedTexts.splice(_it, 1);
                    ret = true;
                }
            } else if (thing.isStaticText()) {
                var staticText = thing;
                var _it2 = this.m_staticTexts.indexOf(staticText);
                if (_it2 > -1) {
                    this.m_staticTexts.splice(_it2, 1);
                    ret = true;
                }
            } else {
                var tile = thing.getTile();
                if (tile) ret = tile.removeThing(thing);
            }
            //notificateTileUpdate(thing.getPosition());
            return ret;
        }
    }, {
        key: "removeThingByPos",
        value: function removeThingByPos(pos, stackPos) {
            var tile = this.getTile(pos);
            if (tile) return this.removeThing(tile.getThing(stackPos));
            return false;
        }
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "getThing",
        value: function getThing(pos, stackpos) {
            var tile = this.getTile(pos);
            //Log.debug('Map.getThing', pos, tile.getThing(stackpos));
            if (tile) return tile.getThing(stackpos);
            return null;
        }
    }, {
        key: "addCreature",
        value: function addCreature(creature) {
            this.m_knownCreatures[creature.getId()] = creature;
        }
    }, {
        key: "removeCreatureById",
        value: function removeCreatureById(id) {
            if (id == 0) return;
            if (this.m_knownCreatures[id]) {
                this.m_knownCreatures.splice(id, 1);
            }
        }
    }, {
        key: "getSightSpectators",
        value: function getSightSpectators(centerPos, multiFloor) {
            return this.getSpectatorsInRangeEx(centerPos, multiFloor, this.m_awareRange.left - 1, this.m_awareRange.right - 2, this.m_awareRange.top - 1, this.m_awareRange.bottom - 2);
        }
    }, {
        key: "getSpectators",
        value: function getSpectators(centerPos, multiFloor) {
            return this.getSpectatorsInRangeEx(centerPos, multiFloor, this.m_awareRange.left, this.m_awareRange.right, this.m_awareRange.top, this.m_awareRange.bottom);
        }
    }, {
        key: "getSpectatorsInRange",
        value: function getSpectatorsInRange(centerPos, multiFloor, xRange, yRange) {
            return this.getSpectatorsInRangeEx(centerPos, multiFloor, xRange, xRange, yRange, yRange);
        }
    }, {
        key: "getSpectatorsInRangeEx",
        value: function getSpectatorsInRangeEx(centerPos, multiFloor, minXRange, maxXRange, minYRange, maxYRange) {
            var minZRange = 0;
            var maxZRange = 0;
            var creatures = [];
            if (multiFloor) {
                minZRange = 0;
                maxZRange = _const.Otc.MAX_Z;
            }
            //TODO: optimize
            //TODO: get creatures from other floors corretly
            //TODO: delivery creatures in distance order
            for (var iz = -minZRange; iz <= maxZRange; ++iz) {
                for (var iy = -minYRange; iy <= maxYRange; ++iy) {
                    for (var ix = -minXRange; ix <= maxXRange; ++ix) {
                        var tile = this.getTile(centerPos.translated(ix, iy, iz));
                        if (!tile) continue;
                        var tileCreatures = tile.getCreatures();
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = tileCreatures[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var creature = _step3.value;

                                creatures.push(creature);
                            }
                            // TODO: WEB - REVERSE?
                            //creatures.insert(creatures.end(), tileCreatures.rbegin(), tileCreatures.rend());
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                }
            }
            return creatures;
        }
    }, {
        key: "isLookPossible",
        value: function isLookPossible(position) {
            var tile = this.getTile(position);
            return tile && tile.isLookPossible();
        }
    }, {
        key: "isCovered",
        value: function isCovered(pos, firstFloor) {
            // check for tiles on top of the postion
            var tilePos = pos.clone();
            while (tilePos.coveredUp() && tilePos.z >= firstFloor) {
                var tile = this.getTile(tilePos);
                // the below tile is covered when the above tile has a full ground
                if (tile && tile.isFullGround()) return true;
            }
            return false;
        }
    }, {
        key: "isCompletelyCovered",
        value: function isCompletelyCovered(pos, firstFloor) {
            var checkTile = this.getTile(pos);
            var tilePos = pos.clone();
            while (tilePos.coveredUp() && tilePos.z >= firstFloor) {
                var covered = true;
                var done = false;
                // check in 2x2 range tiles that has no transparent pixels
                for (var x = 0; x < 2 && !done; ++x) {
                    for (var y = 0; y < 2 && !done; ++y) {
                        var tile = this.getTile(tilePos.translated(-x, -y));
                        if (!tile || !tile.isFullyOpaque()) {
                            covered = false;
                            done = true;
                        } else if (x == 0 && y == 0 && (!checkTile || checkTile.isSingleDimension())) {
                            done = true;
                        }
                    }
                }
                if (covered) return true;
            }
            return false;
        }
    }, {
        key: "getFirstAwareFloor",
        value: function getFirstAwareFloor() {
            if (this.m_centralPosition.z > _const.Otc.SEA_FLOOR) return this.m_centralPosition.z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE;else return 0;
        }
    }, {
        key: "getLastAwareFloor",
        value: function getLastAwareFloor() {
            if (this.m_centralPosition.z > _const.Otc.SEA_FLOOR) return Math.min(this.m_centralPosition.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, _const.Otc.MAX_Z);else return _const.Otc.SEA_FLOOR;
        }
    }, {
        key: "getFloorMissiles",
        value: function getFloorMissiles(z) {
            return this.m_floorMissiles[z];
        }
    }, {
        key: "isAwareOfPosition",
        value: function isAwareOfPosition(pos) {
            if (pos.z < this.getFirstAwareFloor() || pos.z > this.getLastAwareFloor()) return false;
            var groundedPos = pos.clone();
            while (groundedPos.z != this.m_centralPosition.z) {
                if (groundedPos.z > this.m_centralPosition.z) {
                    if (groundedPos.x == 65535 || groundedPos.y == 65535) break;
                    groundedPos.coveredUp();
                } else {
                    if (groundedPos.x == 0 || groundedPos.y == 0) break;
                    groundedPos.coveredDown();
                }
            }
            return this.m_centralPosition.isInRange(groundedPos, this.m_awareRange.left, this.m_awareRange.right, this.m_awareRange.top, this.m_awareRange.bottom);
        }
    }, {
        key: "removeUnawareThings",
        value: function removeUnawareThings() {
            // remove creatures from tiles that we are not aware of anymore
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.m_knownCreatures[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var creature = _step4.value;

                    if (!this.isAwareOfPosition(creature.getPosition())) this.removeThing(creature);
                }
                // remove static texts from tiles that we are not aware anymore
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            for (var i = 0; i < this.m_staticTexts.length;) {
                var staticText = this.m_staticTexts[i];
                if (staticText.getMessageMode() == _const.MessageMode.MessageNone && !this.isAwareOfPosition(staticText.getPosition())) this.m_staticTexts.splice(i, 1);else ++i;
            }
            if (!_game.g_game.getFeature(_const.GameFeature.GameKeepUnawareTiles)) {
                // remove tiles that we are not aware anymore
                for (var z = 0; z <= _const.Otc.MAX_Z; ++z) {
                    var tileBlocks = this.m_tileBlocks[z];
                    for (var _i = 0; _i < tileBlocks.length;) {
                        var block = tileBlocks[_i];
                        var blockEmpty = true;
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = block.getTiles()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var tile = _step5.value;

                                /*
                                if(!tile)
                                    continue;
                                */
                                var pos = tile.getPosition();
                                if (!this.isAwareOfPosition(pos)) block.remove(pos);else blockEmpty = false;
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        if (blockEmpty) tileBlocks.splice(_i, 1);else ++_i;
                    }
                }
            }
        }
    }, {
        key: "getBlockIndex",
        value: function getBlockIndex(pos) {
            return (0, _helpers.toInt)(pos.y / _tileblock.TileBlock.BLOCK_SIZE) * (0, _helpers.toInt)(65536 / _tileblock.TileBlock.BLOCK_SIZE) + (0, _helpers.toInt)(pos.x / _tileblock.TileBlock.BLOCK_SIZE);
        }
    }]);

    return Map;
}();

var g_map = new Map();
exports.g_map = g_map;

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var toInt = function toInt(int) {
    return parseInt(int.toString());
};
var clamp = function clamp(number, lower, upper) {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
};
exports.toInt = toInt;
exports.clamp = clamp;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = exports.Color = function () {
    //Color() : m_r(1.0f), m_g(1.0f), m_b(1.0f), m_a(1.0f) { }
    //Color(uint32 rgba) { setRGBA(rgba); }
    function Color() {
        _classCallCheck(this, Color);

        if (arguments.length == 0) {
            this.m_r = 1;
            this.m_g = 1;
            this.m_b = 1;
            this.m_a = 1;
            return;
        } else if (arguments.length == 1) {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number') {
                this.setRGBA(arguments.length <= 0 ? undefined : arguments[0]);
                return;
            }
        } else if (arguments.length == 3) {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number' && typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) == 'number') {
                var r = (arguments.length <= 0 ? undefined : arguments[0]) / 255;
                var g = (arguments.length <= 1 ? undefined : arguments[1]) / 255;
                var b = (arguments.length <= 2 ? undefined : arguments[2]) / 255;
                this.m_r = r;
                this.m_g = g;
                this.m_b = b;
                this.m_a = 1;
                return;
            }
        }
        throw new Error('Unhandled constructor');
    }

    _createClass(Color, [{
        key: 'equals',
        value: function equals(otherColor) {
            return this.m_r == otherColor.m_r && this.m_g == otherColor.m_g && this.m_b == otherColor.m_b && this.m_a == otherColor.m_a;
        }
    }, {
        key: 'clone',
        value: function clone() {
            var color = new Color();
            color.m_r = this.m_r;
            color.m_g = this.m_g;
            color.m_b = this.m_b;
            color.m_a = this.m_a;
            return color;
        }
    }, {
        key: 'a',
        value: function a() {
            return this.m_a * 255.0;
        }
    }, {
        key: 'b',
        value: function b() {
            return this.m_b * 255.0;
        }
    }, {
        key: 'g',
        value: function g() {
            return this.m_g * 255.0;
        }
    }, {
        key: 'r',
        value: function r() {
            return this.m_r * 255.0;
        }
    }, {
        key: 'aF',
        value: function aF() {
            return this.m_a;
        }
    }, {
        key: 'bF',
        value: function bF() {
            return this.m_b;
        }
    }, {
        key: 'gF',
        value: function gF() {
            return this.m_g;
        }
    }, {
        key: 'rF',
        value: function rF() {
            return this.m_r;
        }
    }, {
        key: 'rgba',
        value: function rgba() {
            return this.a() | this.b() << 8 | this.g() << 16 | this.r() << 24;
        }
    }, {
        key: 'setRGBA',
        value: function setRGBA(r) {
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 255;

            if (g == -1) {
                var rgba = r;
                this.setRGBA(rgba >> 0 & 0xff, rgba >> 8 & 0xff, rgba >> 16 & 0xff, rgba >> 24 & 0xff);
            } else {
                this.m_r = r / 255;
                this.m_g = g / 255;
                this.m_b = b / 255;
                this.m_a = a / 255;
            }
        }
    }], [{
        key: 'from8bit',
        value: function from8bit(color) {
            if (color >= 216 || color <= 0) return new Color(0, 0, 0);
            var r = parseInt((color / 36).toString()) % 6 * 51;
            var g = parseInt((color / 6).toString()) % 6 * 51;
            var b = color % 6 * 51;
            return new Color(r, g, b);
        }
    }]);

    return Color;
}();

Color.alpha = 0x00000000;
Color.white = 0xffffffff;
Color.black = 0xff000000;
Color.red = 0xff0000ff;
Color.darkRed = 0xff000080;
Color.green = 0xff00ff00;
Color.darkGreen = 0xff008000;
Color.blue = 0xffff0000;
Color.darkBlue = 0xff800000;
Color.pink = 0xffff00ff;
Color.darkPink = 0xff800080;
Color.yellow = 0xff00ffff;
Color.darkYellow = 0xff008080;
Color.teal = 0xffffff00;
Color.darkTeal = 0xff808000;
Color.gray = 0xffa0a0a0;
Color.darkGray = 0xff808080;
Color.lightGray = 0xffc0c0c0;
Color.orange = 0xff008cff;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_things = exports.ThingTypeManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thingtype = __webpack_require__(449);

var _const = __webpack_require__(13);

var _log = __webpack_require__(20);

var _resources = __webpack_require__(127);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var nullThingType = new _thingtype.ThingType();

var ThingTypeManager = exports.ThingTypeManager = function () {
    function ThingTypeManager() {
        _classCallCheck(this, ThingTypeManager);

        this.m_nullThingType = new _thingtype.ThingType();
        this.m_thingTypes = null;
        this.m_datLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        this.m_thingTypes = [];
        for (var i = _const.ThingCategory.ThingCategoryItem; i < _const.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }

    _createClass(ThingTypeManager, [{
        key: "getThingType",
        value: function getThingType(id, category) {
            if (category >= _const.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
                _log.Log.error("invalid thing type client id %d in category %d", id, category);
                return this.m_nullThingType;
            }
            return this.m_thingTypes[category][id];
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType(id, category) {
            return this.getThingType(id, category);
        }
    }, {
        key: "isValidDatId",
        value: function isValidDatId(id, category) {
            return true;
        }
    }, {
        key: "getNullThingType",
        value: function getNullThingType() {
            return nullThingType;
        }
    }, {
        key: "getContentRevision",
        value: function getContentRevision() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "loadDat",
        value: function loadDat(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var fin, category, count, thingCount, _category, firstId, id, type;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.m_datLoaded = false;
                                this.m_datSignature = 0;
                                this.m_contentRevision = 0;
                                _context.prev = 3;

                                console.log(new Date().getTime(), this.m_thingTypes);
                                _context.next = 7;
                                return _resources.g_resources.openFile(file);

                            case 7:
                                fin = _context.sent;

                                this.m_datSignature = fin.getU32();
                                this.m_contentRevision = this.m_datSignature & 0xFFFF;
                                for (category = _const.ThingCategory.ThingCategoryItem; category < _const.ThingCategory.ThingLastCategory; ++category) {
                                    count = fin.getU16() + 1;

                                    this.m_thingTypes[category] = [];
                                    for (thingCount = 0; thingCount < count; ++thingCount) {
                                        this.m_thingTypes[category][thingCount] = nullThingType;
                                    }
                                }
                                for (_category = 0; _category < _const.ThingCategory.ThingLastCategory; ++_category) {
                                    firstId = 1;

                                    if (_category == _const.ThingCategory.ThingCategoryItem) firstId = 100;
                                    for (id = firstId; id < this.m_thingTypes[_category].length; ++id) {
                                        type = new _thingtype.ThingType();

                                        type.unserialize(id, _category, fin);
                                        this.m_thingTypes[_category][id] = type;
                                    }
                                }
                                this.m_datLoaded = true;
                                console.log(new Date().getTime(), this.m_thingTypes);
                                //g_lua.callGlobalField("g_things", "onLoadDat", file);
                                return _context.abrupt("return", true);

                            case 17:
                                _context.prev = 17;
                                _context.t0 = _context["catch"](3);

                                _log.Log.error("Failed to read dat '%s': %s'", file, _context.t0);
                                return _context.abrupt("return", false);

                            case 21:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 17]]);
            }));
        }
    }]);

    return ThingTypeManager;
}();

var g_things = new ThingTypeManager();
exports.g_things = g_things;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Position = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = exports.Position = function () {
    function Position() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Position);

        this.x = x;
        this.y = y;
        this.z = z;
    }

    _createClass(Position, [{
        key: "equals",
        value: function equals(otherPosition) {
            return this.x == otherPosition.x && this.y == otherPosition.y && this.z == otherPosition.z;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Position(this.x, this.y, this.z);
        }
    }, {
        key: "isMapPosition",
        value: function isMapPosition() {
            return this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= _const.Otc.MAX_Z;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return !(this.x == 65535 && this.y == 65535 && this.z == 255);
        }
    }, {
        key: "distance",
        value: function distance(pos) {
            return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2));
        }
    }, {
        key: "translate",
        value: function translate(dx, dy) {
            var dz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.x += dx;
            this.y += dy;
            this.z += dz;
        }
    }, {
        key: "translated",
        value: function translated(dx, dy) {
            var dz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return new Position(this.x + dx, this.y + dy, this.z + dz);
        }
        // isInRange(pos: Position, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number

    }, {
        key: "isInRange",
        value: function isInRange(pos, xRange, yRange) {
            var minYRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var maxYRange = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

            if (minYRange !== null && maxYRange !== null) return pos.x >= this.x - xRange && pos.x <= this.x + yRange && pos.y >= this.y - minYRange && pos.y <= this.y + maxYRange && pos.z == this.z;else return Math.abs(this.x - pos.x) <= xRange && Math.abs(this.y - pos.y) <= yRange && this.z == pos.z;
        }
    }, {
        key: "up",
        value: function up() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nz = this.z - n;
            if (nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "down",
        value: function down() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nz = this.z + n;
            if (nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "coveredUp",
        value: function coveredUp() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nx = this.x + n,
                ny = this.y + n,
                nz = this.z - n;
            if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.x = nx;
                this.y = ny;
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "coveredDown",
        value: function coveredDown() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nx = this.x - n,
                ny = this.y - n,
                nz = this.z + n;
            if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.x = nx;
                this.y = ny;
                this.z = nz;
                return true;
            }
            return false;
        }
    }]);

    return Position;
}();

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Size = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(42);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size = exports.Size = function () {
    function Size() {
        var wd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
        var ht = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, Size);

        this.wd = wd;
        this.ht = ht;
    }

    _createClass(Size, [{
        key: "equals",
        value: function equals(otherSize) {
            return this.wd == otherSize.wd && this.ht == otherSize.ht;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Size(this.wd, this.ht);
        }
    }, {
        key: "add",
        value: function add(size) {
            return new Size(this.wd + size.wd, this.ht + size.ht);
        }
    }, {
        key: "sub",
        value: function sub(size) {
            return new Size(this.wd - size.wd, this.ht - size.ht);
        }
    }, {
        key: "mul",
        value: function mul(ratio) {
            return new Size(this.wd * ratio, this.ht * ratio);
        }
    }, {
        key: "isNull",
        value: function isNull() {
            return this.wd == 0 && this.ht == 0;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.wd < 1 || this.ht < 1;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return this.wd >= 0 && this.ht >= 0;
        }
    }, {
        key: "width",
        value: function width() {
            return this.wd;
        }
    }, {
        key: "height",
        value: function height() {
            return this.ht;
        }
    }, {
        key: "resize",
        value: function resize(w, h) {
            this.wd = w;
            this.ht = h;
        }
    }, {
        key: "setWidth",
        value: function setWidth(w) {
            this.wd = w;
        }
    }, {
        key: "setHeight",
        value: function setHeight(h) {
            this.ht = h;
        }
    }, {
        key: "ratio",
        value: function ratio() {
            return this.wd / this.ht;
        }
    }, {
        key: "area",
        value: function area() {
            return this.wd * this.ht;
        }
    }, {
        key: "toPoint",
        value: function toPoint() {
            return new _point.Point(this.wd, this.ht);
        }
    }]);

    return Size;
}();

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _g_clock = __webpack_require__(93);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
    function Timer() {
        _classCallCheck(this, Timer);

        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }

    _createClass(Timer, [{
        key: "restart",
        value: function restart() {
            this.m_startTicks = _g_clock.g_clock.millis();
            this.m_stopped = false;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.m_stopped = true;
        }
    }, {
        key: "startTicks",
        value: function startTicks() {
            return this.m_startTicks;
        }
    }, {
        key: "ticksElapsed",
        value: function ticksElapsed() {
            return _g_clock.g_clock.millis() - this.m_startTicks;
        }
    }, {
        key: "timeElapsed",
        value: function timeElapsed() {
            return this.ticksElapsed() / 1000;
        }
    }, {
        key: "running",
        value: function running() {
            return !this.m_stopped;
        }
    }]);

    return Timer;
}();

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
    function Clock() {
        _classCallCheck(this, Clock);
    }

    _createClass(Clock, [{
        key: "millis",
        value: function millis() {
            return +new Date();
        }
    }]);

    return Clock;
}();

var g_clock = new Clock();
exports.g_clock = g_clock;

/***/ })

},[241]);