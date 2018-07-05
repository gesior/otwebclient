import {Light, MarketData, Point, Size} from "./structures";
import {LightView} from "./lightview";
import {Tile} from "./tile";
import {Container} from "./container";
import {ThingType} from "./thingtype";
import {g_map} from "./map";
import {g_game} from "./game";
import {Position} from "./position";
import {error} from "./log";
import {g_things} from "./thingtypemanager";
import {Animator} from "./animator";


export class Thing {

    m_position: Position;
    m_datId: number;

    draw(dest: Point, scaleFactor: number, animate: boolean, lightView: LightView = null) {
    }

    setId(id: number) {
    }

    setPosition(position: Position) {
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
        else // common items
            return 5;
    }

    getTile(): Tile {
        return g_map.getTile(this.m_position);
    }

    getParentContainer(): Container {
        if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
            let containerId = this.m_position.y ^ 0x40;
            return g_game.getContainer(containerId);
        }
        return null;
    }

    getStackPos(): number {
        if (this.m_position.x == 65535 && this.isItem()) // is inside a container
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
    getThingType(): ThingType {
        return g_things.getNullThingType();
    }

    rawGetThingType(): ThingType {
        return g_things.getNullThingType();
    }

    getSize(): Size {
        return this.rawGetThingType().getSize();
    }

    getWidth(): number {
        return this.rawGetThingType().getWidth();
    }

    getHeight(): number {
        return this.rawGetThingType().getHeight();
    }

    getDisplacement(): Point {
        return this.rawGetThingType().getDisplacement();
    }

    getDisplacementX(): number {
        return this.rawGetThingType().getDisplacementX();
    }

    getDisplacementY(): number {
        return this.rawGetThingType().getDisplacementY();
    }

    getExactSize(layer: number, xPattern: number, yPattern: number, zPattern: number, animationPhase: number): number {
        return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
    }

    getLayers(): number {
        return this.rawGetThingType().getLayers();
    }

    getNumPatternX(): number {
        return this.rawGetThingType().getNumPatternX();
    }

    getNumPatternY(): number {
        return this.rawGetThingType().getNumPatternY();
    }

    getNumPatternZ(): number {
        return this.rawGetThingType().getNumPatternZ();
    }

    getAnimationPhases(): number {
        return this.rawGetThingType().getAnimationPhases();
    }

    getAnimator(): Animator {
        return this.rawGetThingType().getAnimator();
    }

    getGroundSpeed(): number {
        return this.rawGetThingType().getGroundSpeed();
    }

    getMaxTextLength(): number {
        return this.rawGetThingType().getMaxTextLength();
    }

    getLight(): Light {
        return this.rawGetThingType().getLight();
    }

    getMinimapColor(): number {
        return this.rawGetThingType().getMinimapColor();
    }

    getLensHelp(): number {
        return this.rawGetThingType().getLensHelp();
    }

    getClothSlot(): number {
        return this.rawGetThingType().getClothSlot();
    }

    getElevation(): number {
        return this.rawGetThingType().getElevation();
    }

    isGround(): boolean {
        return this.rawGetThingType().isGround();
    }

    isGroundBorder(): boolean {
        return this.rawGetThingType().isGroundBorder();
    }

    isOnBottom(): boolean {
        return this.rawGetThingType().isOnBottom();
    }

    isOnTop(): boolean {
        return this.rawGetThingType().isOnTop();
    }

    isContainer(): boolean {
        return this.rawGetThingType().isContainer();
    }

    isStackable(): boolean {
        return this.rawGetThingType().isStackable();
    }

    isForceUse(): boolean {
        return this.rawGetThingType().isForceUse();
    }

    isMultiUse(): boolean {
        return this.rawGetThingType().isMultiUse();
    }

    isWritable(): boolean {
        return this.rawGetThingType().isWritable();
    }

    isChargeable(): boolean {
        return this.rawGetThingType().isChargeable();
    }

    isWritableOnce(): boolean {
        return this.rawGetThingType().isWritableOnce();
    }

    isFluidContainer(): boolean {
        return this.rawGetThingType().isFluidContainer();
    }

    isSplash(): boolean {
        return this.rawGetThingType().isSplash();
    }

    isNotWalkable(): boolean {
        return this.rawGetThingType().isNotWalkable();
    }

    isNotMoveable(): boolean {
        return this.rawGetThingType().isNotMoveable();
    }

    blockProjectile(): boolean {
        return this.rawGetThingType().blockProjectile();
    }

    isNotPathable(): boolean {
        return this.rawGetThingType().isNotPathable();
    }

    isPickupable(): boolean {
        return this.rawGetThingType().isPickupable();
    }

    isHangable(): boolean {
        return this.rawGetThingType().isHangable();
    }

    isHookSouth(): boolean {
        return this.rawGetThingType().isHookSouth();
    }

    isHookEast(): boolean {
        return this.rawGetThingType().isHookEast();
    }

    isRotateable(): boolean {
        return this.rawGetThingType().isRotateable();
    }

    hasLight(): boolean {
        return this.rawGetThingType().hasLight();
    }

    isDontHide(): boolean {
        return this.rawGetThingType().isDontHide();
    }

    isTranslucent(): boolean {
        return this.rawGetThingType().isTranslucent();
    }

    hasDisplacement(): boolean {
        return this.rawGetThingType().hasDisplacement();
    }

    hasElevation(): boolean {
        return this.rawGetThingType().hasElevation();
    }

    isLyingCorpse(): boolean {
        return this.rawGetThingType().isLyingCorpse();
    }

    isAnimateAlways(): boolean {
        return this.rawGetThingType().isAnimateAlways();
    }

    hasMiniMapColor(): boolean {
        return this.rawGetThingType().hasMiniMapColor();
    }

    hasLensHelp(): boolean {
        return this.rawGetThingType().hasLensHelp();
    }

    isFullGround(): boolean {
        return this.rawGetThingType().isFullGround();
    }

    isIgnoreLook(): boolean {
        return this.rawGetThingType().isIgnoreLook();
    }

    isCloth(): boolean {
        return this.rawGetThingType().isCloth();
    }

    isMarketable(): boolean {
        return this.rawGetThingType().isMarketable();
    }

    isUsable(): boolean {
        return this.rawGetThingType().isUsable();
    }

    isWrapable(): boolean {
        return this.rawGetThingType().isWrapable();
    }

    isUnwrapable(): boolean {
        return this.rawGetThingType().isUnwrapable();
    }

    isTopEffect(): boolean {
        return this.rawGetThingType().isTopEffect();
    }

    getMarketData(): MarketData {
        return this.rawGetThingType().getMarketData();
    }

    onPositionChange(newPos: Position, oldPos: Position) {
    }

    onAppear() {
    }

    onDisappear() {
    }

}
