import {DrawFlags, MessageMode, Otc} from "../constants/const";
import {Log} from "../log";
import {g_map, Map} from "../map";
import {Position} from "../position";
import {g_game} from "../game";
import {Creature} from "../creature";
import {Point} from "../structures/point";
import {Tile} from "../tile";
import {Size} from "../structures/size";
import {LightView} from "../lightview";
import {Timer} from "../structures/timer";
import {clamp, toInt} from "../constants/helpers";


export class MapView {
    public static readonly MAX_TILE_DRAWS = 32 * 32 * 7;

    m_lockedFirstVisibleFloor: number = -1;
    m_cachedFirstVisibleFloor: number = 7;
    m_cachedLastVisibleFloor: number = 7;
    m_tileSize: number = 0;
    m_updateTilesPos: number = 0;
    m_drawDimension: Size = new Size();
    m_visibleDimension: Size = new Size();
    m_optimizedSize: Size = new Size();
    m_virtualCenterOffset: Point = new Point();
    m_visibleCenterOffset: Point = new Point();
    m_moveOffset: Point = new Point();
    m_customCameraPosition: Position = new Position();
    m_mustUpdateVisibleTilesCache: boolean = true;
    m_mustDrawVisibleTilesCache: boolean = true;
    m_mustCleanFramebuffer: boolean = true;
    m_multifloor: boolean = true;
    m_animated: boolean = true;
    m_autoViewMode: boolean = true;
    m_drawTexts: boolean = true;
    m_drawNames: boolean = true;
    m_drawHealthBars: boolean = true;
    m_drawLights: boolean = false;
    m_drawManaBar: boolean = true;
    m_smooth: boolean = true;

    m_follow: boolean = true;
    m_cachedVisibleTiles: Tile[] = [];
    m_cachedFloorVisibleCreatures: Creature[] = [];
    m_followingCreature: Creature;
    m_drawFlags: DrawFlags = 0;
    m_lightView: LightView = new LightView();
    m_minimumAmbientLight: number = 0.0;
    m_fadeTimer: Timer = new Timer();
    m_fadeInTime: number = 0.0;
    m_fadeOutTime: number = 0.0;
    m_shaderSwitchDone: boolean = true;



    constructor() {
    }

    init() {
        this.m_optimizedSize = new Size(g_map.getAwareRange().horizontal(), g_map.getAwareRange().vertical()).mul(Otc.TILE_PIXELS);
        this.setVisibleDimension(new Size(15, 11));
    }

    followCreature(creature: Creature) {
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

    transformPositionTo2D(position: Position, relativePosition: Position): Point {
        return new Point(
            (this.m_virtualCenterOffset.x + (position.x - relativePosition.x) - (relativePosition.z - position.z)) * this.m_tileSize,
            (this.m_virtualCenterOffset.y + (position.y - relativePosition.y) - (relativePosition.z - position.z)) * this.m_tileSize
        );
    }

    draw() {
        console.error('draw mapview_1', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);
        if(this.m_mustUpdateVisibleTilesCache || this.m_updateTilesPos > 0) {
            console.error('draw mapview_1', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);
            this.updateVisibleTilesCache(this.m_mustUpdateVisibleTilesCache ? 0 : this.m_updateTilesPos);
        }

        console.error('draw mapview_2', this.m_mustUpdateVisibleTilesCache, this.m_updateTilesPos, this.m_cachedVisibleTiles);

        let scaleFactor = this.m_tileSize / Otc.TILE_PIXELS;
        let cameraPosition = this.getCameraPosition();

        let drawFlags = 0;
        drawFlags = DrawFlags.DrawAnimations;

        drawFlags |= DrawFlags.DrawGround | DrawFlags.DrawGroundBorders | DrawFlags.DrawWalls |
            DrawFlags.DrawItems | DrawFlags.DrawCreatures | DrawFlags.DrawEffects | DrawFlags.DrawMissiles;


        let tileIterator = 0;

        for(let z=this.m_cachedLastVisibleFloor;z>=this.m_cachedFirstVisibleFloor;--z) {

            while(tileIterator != this.m_cachedVisibleTiles.length) {
                let tile = this.m_cachedVisibleTiles[tileIterator];
                let tilePos = tile.getPosition();
                if(tilePos.z != z)
                    break;
                else
                    ++tileIterator;

                if (g_map.isCovered(tilePos, this.m_cachedFirstVisibleFloor))
                    tile.draw(this.transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags);
                else
                    tile.draw(this.transformPositionTo2D(tilePos, cameraPosition), scaleFactor, drawFlags, this.m_lightView);
            }

            if(drawFlags & DrawFlags.DrawMissiles) {
                for(let missile of g_map.getFloorMissiles(z)) {
                    missile.draw(this.transformPositionTo2D(missile.getPosition(), cameraPosition), scaleFactor, (drawFlags & DrawFlags.DrawAnimations) > 0, this.m_lightView);
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


    updateVisibleTilesCache(start: Number): void {
        console.log('updateVisibleTilesCache', start)
        if (start == 0) {
            this.m_cachedFirstVisibleFloor = this.calcFirstVisibleFloor();
            this.m_cachedLastVisibleFloor = this.calcLastVisibleFloor();
            /*
                assert(m_cachedFirstVisibleFloor >= 0 && m_cachedLastVisibleFloor >= 0 &&
                    m_cachedFirstVisibleFloor <= Otc::MAX_Z && m_cachedLastVisibleFloor <= Otc::MAX_Z);
            */
            //console.log('floors1', this.m_cachedFirstVisibleFloor, this.m_cachedLastVisibleFloor)
            if (this.m_cachedLastVisibleFloor < this.m_cachedFirstVisibleFloor)
                this.m_cachedLastVisibleFloor = this.m_cachedFirstVisibleFloor;

            //console.log('floors2', this.m_cachedFirstVisibleFloor, this.m_cachedLastVisibleFloor)
            this.m_cachedFloorVisibleCreatures.length = 0;
            this.m_cachedVisibleTiles.length = 0;

            this.m_mustCleanFramebuffer = true;
            this.m_mustDrawVisibleTilesCache = true;
            this.m_mustUpdateVisibleTilesCache = false;
            this.m_updateTilesPos = 0;
        } else
            this.m_mustCleanFramebuffer = false;

        // there is no tile to render on invalid positions
        let cameraPosition: Position = this.getCameraPosition();
        if (!cameraPosition.isValid())
            return;

        //console.log('cam', cameraPosition)
        let stop: boolean = false;

        // clear current visible tiles cache
        this.m_cachedVisibleTiles.length = 0;
        this.m_mustDrawVisibleTilesCache = true;
        this.m_updateTilesPos = 0;

        // cache visible tiles in draw order
        // draw from last floor (the lower) to first floor (the higher)
        for (let iz = this.m_cachedLastVisibleFloor; iz >= this.m_cachedFirstVisibleFloor && !stop; --iz) {
            const numDiagonals = this.m_drawDimension.width() + this.m_drawDimension.height() - 1;
            //console.log('check z', iz, numDiagonals)
            // loop through / diagonals beginning at top left and going to top right
            for (let diagonal = 0; diagonal < numDiagonals && !stop; ++diagonal) {
                //console.log('check diagonal', iz, diagonal)
                // loop current diagonal tiles
                let advance = Math.max(diagonal - this.m_drawDimension.height(), 0);
                //console.log('check diagonal', iz, diagonal, advance)
                for (let iy = diagonal - advance, ix = advance; iy >= 0 && ix < this.m_drawDimension.width() && !stop; --iy, ++ix) {
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
                    let tilePos: Position = cameraPosition.translated(ix - this.m_virtualCenterOffset.x, iy - this.m_virtualCenterOffset.y);
                    //console.log('tilePos', tilePos)
                    // adjust tilePos to the wanted floor
                    tilePos.coveredUp(cameraPosition.z - iz);
                    let tile = g_map.getTile(tilePos);
                    if (tile) {
                        // skip tiles that have nothing
                        if (!tile.isDrawable())
                            continue;
                        // skip tiles that are completely behind another tile
                        if (g_map.isCompletelyCovered(tilePos, this.m_cachedFirstVisibleFloor))
                            continue;
                        this.m_cachedVisibleTiles.push(tile);
                    }
                    this.m_updateTilesPos++;
                }
            }

        }

        if (!stop) {
            this.m_updateTilesPos = 0;
        }

        if (start == 0)
            this.m_cachedFloorVisibleCreatures = g_map.getSightSpectators(cameraPosition, false);
    }

    calcFirstVisibleFloor(): number
    {
        let z = 7;
        // return forced first visible floor
        if(this.m_lockedFirstVisibleFloor != -1) {
            z = this.m_lockedFirstVisibleFloor;
        } else {
            let cameraPosition = this.getCameraPosition().clone();

            // this could happens if the player is not known yet
            if(cameraPosition.isValid()) {
                // avoid rendering multifloors in far views
                if(!this.m_multifloor) {
                    z = cameraPosition.z;
                } else {
                    // if nothing is limiting the view, the first visible floor is 0
                    let firstFloor = 0;

                    // limits to underground floors while under sea level
                    if(cameraPosition.z > Otc.SEA_FLOOR)
                        firstFloor = Math.max(cameraPosition.z - Otc.AWARE_UNDEGROUND_FLOOR_RANGE, Otc.UNDERGROUND_FLOOR);

                    // loop in 3x3 tiles around the camera
                    for(let ix = -1; ix <= 1 && firstFloor < cameraPosition.z; ++ix) {
                        for(let iy = -1; iy <= 1 && firstFloor < cameraPosition.z; ++iy) {
                            let pos = cameraPosition.translated(ix, iy);

                            // process tiles that we can look through, e.g. windows, doors
                            if((ix == 0 && iy == 0) || ((Math.abs(ix) != Math.abs(iy)) && g_map.isLookPossible(pos))) {
                                let upperPos = pos.clone();
                                let coveredPos = pos.clone();

                                while(coveredPos.coveredUp() && upperPos.up() && upperPos.z >= firstFloor) {
                                    // check tiles physically above
                                    let tile = g_map.getTile(upperPos);
                                    if(tile && tile.limitsFloorsView(!g_map.isLookPossible(pos))) {
                                        firstFloor = upperPos.z + 1;
                                        break;
                                    }

                                    // check tiles geometrically above
                                    tile = g_map.getTile(coveredPos);
                                    if(tile && tile.limitsFloorsView(g_map.isLookPossible(pos))) {
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
        z = clamp(z, 0, Otc.MAX_Z);
        return z;
    }

    calcLastVisibleFloor()
    {
        if(!this.m_multifloor)
            return this.calcFirstVisibleFloor();

        let z = 7;

        let cameraPosition = this.getCameraPosition().clone();
        // this could happens if the player is not known yet
        if(cameraPosition.isValid()) {
            // view only underground floors when below sea level
            if(cameraPosition.z > Otc.SEA_FLOOR)
            z = cameraPosition.z + Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
            else
                z = Otc.SEA_FLOOR;
        }

        if(this.m_lockedFirstVisibleFloor != -1)
            z = Math.max(this.m_lockedFirstVisibleFloor, z);

        // just ensure the that the floor is in the valid range
        z = clamp(z, 0, Otc.MAX_Z);
        return z;
    }

    updateGeometry(visibleDimension: Size, optimizedSize: Size): void {
        let tileSize = Otc.TILE_PIXELS;

        let drawDimension = visibleDimension.add(new Size(3, 3));
        let virtualCenterOffset = (new Size(toInt(drawDimension.width() / 2), toInt(drawDimension.height() / 2))).sub(new Size(1, 1)).toPoint();
        let visibleCenterOffset = virtualCenterOffset.clone();

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

    onTileUpdate(position: Position) {
        this.requestVisibleTilesCacheUpdate();
    }

    onMapCenterChange(position: Position) {
        this.requestVisibleTilesCacheUpdate();
    }

    lockFirstVisibleFloor(firstVisibleFloor: number) {
        this.m_lockedFirstVisibleFloor = firstVisibleFloor;
        this.requestVisibleTilesCacheUpdate();
    }

    unlockFirstVisibleFloor() {
        this.m_lockedFirstVisibleFloor = -1;
        this.requestVisibleTilesCacheUpdate();
    }

    setVisibleDimension(visibleDimension: Size) {
        if (visibleDimension.equals(this.m_visibleDimension))
            return;

        if (visibleDimension.width() % 2 != 1 || visibleDimension.height() % 2 != 1) {
            Log.error("visible dimension must be odd");
            return;
        }

        if (visibleDimension.height() < 3 || visibleDimension.width() < 3) {
            Log.error("reach max zoom in");
            return;
        }

        this.updateGeometry(visibleDimension, this.m_optimizedSize);
    }


    requestVisibleTilesCacheUpdate() {
        this.m_mustUpdateVisibleTilesCache = true;
    }
}

let g_mapview = new MapView();
export {g_mapview}