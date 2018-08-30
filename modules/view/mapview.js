import { DrawFlags, Otc } from "../constants/const";
import { g_map } from "../map";
import { Position } from "../position";
import { Point } from "../structures/point";
export class MapView {
    constructor() {
        this.m_customCameraPosition = new Position();
        this.m_follow = true;
        this.m_tileSize = 32;
        this.m_virtualCenterOffset = new Point(0, 0);
    }
    init() {
    }
    followCreature(creature) {
        this.m_follow = true;
        this.m_followingCreature = creature;
    }
    isFollowingCreature() {
        return this.m_followingCreature && this.m_follow;
    }
    getCameraPosition() {
        if (this.isFollowingCreature())
            return this.m_followingCreature.getPosition();
        return this.m_customCameraPosition;
    }
    transformPositionTo2D(position, relativePosition) {
        return new Point((this.m_virtualCenterOffset.x + (position.x - relativePosition.x) - (relativePosition.z - position.z)) * this.m_tileSize, (this.m_virtualCenterOffset.y + (position.y - relativePosition.y) - (relativePosition.z - position.z)) * this.m_tileSize);
    }
    draw() {
        /*
        const awareRange = g_map.getAwareRange();
        for (let y = 0; y < awareRange.vertical(); ++y) {
            for (let x = 0; x < awareRange.horizontal(); ++x) {
                let tileContainer = this.getTile(x,y,0);
                let tile = g_game.getLocalPlayer().getTile();
                var text = '';//'<img src="http://inditex.localhost/prv/imgup/mynet/X_datain_854/' + tile.getGround().rawGetThingType().getSprites()[0] + '.png">';
                var things = tile.m_things;
                for (const thing of things) {
                    if (!thing.isItem())
                        continue;
                    const sprite = thing.rawGetThingType().getSprites()[0];
                    console.error(thing.rawGetThingType())
                    text = text + '<img src="http://inditex.localhost/prv/imgup/mynet/X_datain_854/' + sprite + '.png">';
                }
                var creatures = tile.getCreatures();
                for (const creature of creatures) {

                    text = text + '<img src="http://outfit-images.ots.me/idleOutfits1092/outfit.php?id=' + creature.m_outfit.m_id
                        +'&addons=' + creature.m_outfit.m_addons
                        + '&head=' + creature.m_outfit.m_head
                        + '&body=' + creature.m_outfit.m_body
                        + '&legs=' + creature.m_outfit.m_legs
                        + '&feet=' + creature.m_outfit.m_feet
                        + '&mount=' + creature.m_outfit.m_mount
                        + '&direction=' + creature.m_direction
                        + '">';
                }
                tileContainer.innerHTML = text;

            }
        }
        */
        /*
                // update visible tiles cache when needed
                if(m_mustUpdateVisibleTilesCache || m_updateTilesPos > 0)
                    updateVisibleTilesCache(m_mustUpdateVisibleTilesCache ? 0 : m_updateTilesPos);
        */
        let scaleFactor = this.m_tileSize / Otc.TILE_PIXELS;
        let cameraPosition = this.getCameraPosition();
        let drawFlags = 0;
        drawFlags = DrawFlags.DrawAnimations;
        drawFlags |= DrawFlags.DrawGround | DrawFlags.DrawGroundBorders | DrawFlags.DrawWalls |
            DrawFlags.DrawItems | DrawFlags.DrawCreatures | DrawFlags.DrawEffects | DrawFlags.DrawMissiles;
        for (let z = cameraPosition.z; z >= cameraPosition.z; --z) {
            /*
            if (g_map.isCovered(tilePos, m_cachedFirstVisibleFloor))
                tile.draw(transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags);
            else
                tile.draw(transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags, m_lightView.get());
            */
            const awareRange = g_map.getAwareRange();
            for (let y = cameraPosition.y - awareRange.top; y <= cameraPosition.y + awareRange.bottom; ++y) {
                for (let x = cameraPosition.x - awareRange.left; x <= cameraPosition.x + awareRange.right; ++x) {
                    let tilePos = new Position(x, y, z); //cameraPosition.translated(x, y, 0);
                    //tilePos.z = z;
                    let tile = g_map.getTile(tilePos);
                    //console.error('draw', cameraPosition.x, cameraPosition.y, tilePos.x, tilePos.y, tilePos.z, tile);
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
            /*
                        if(drawFlags & DrawFlags.DrawMissiles) {
                            for(let missile of g_map.getFloorMissiles(z)) {
                                missile->draw(transformPositionTo2D(missile->getPosition(), cameraPosition), scaleFactor, drawFlags & DrawFlags.DrawAnimations, m_lightView.get());
                            }
                        }
            */
        }
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
        if (!cameraPosition.isValid())
            return;
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
    clear() {
    }
    getTileId(x, y, z) {
        return 'tile-' + x + '-' + y;
    }
    getTile(x, y, z) {
        return document.getElementById(this.getTileId(x, y, z));
    }
}
let g_mapview = new MapView();
export { g_mapview };
//# sourceMappingURL=mapview.js.map