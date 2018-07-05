import {LocalPlayer} from "./localplayer";
import {DeathType, GameFeature} from "./constants/const";
import {ThingTypeManager} from "./thingtypemanager";
import {ProtocolGame} from "./network/protocolgame";
import {error} from "./log";
import {Map} from "./map";
import {Container} from "./container";
import {Item} from "./item";

export class Game {

    setUnjustifiedPoints(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    processEnterGame(): any {
        throw new Error("Method not implemented.");
    }

    getContainer(containerId: number): Container {
        return new Container();
    }

    private m_protocolGame: ProtocolGame;
    processGameStart(): any {
        error('Method not implemented.')
    }

    get g_things(): ThingTypeManager {
        return new ThingTypeManager();
    }

    get g_map(): Map {
        return new Map();
    }

    getClientVersion(): number {
        return 3;
    }

    getProtocolVersion(): number {
        return 10009;
    }

    getOs(): number {
        return 3;
    }

    processConnectionError(): void {
        throw new Error("Method not implemented.");
    }

    getFeature(feature: GameFeature): boolean {
        switch(feature) {
            case GameFeature.GameChallengeOnLogin:
                return true;
        }
        return false;
    }

    getLocalPlayer(): LocalPlayer {
        return new LocalPlayer();
    }

    login(accountName: string, accountPassword: string, characterName: string) {
        this.m_protocolGame = new ProtocolGame(this);
        this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
    }

    setExpertPvpMode(expertModeEnabled: number) {

    }

    setServerBeat(serverBeat: number) {

    }

    setCanReportBugs(canReportBugs: number) {

    }

    processLogin() {

    }

    processPendingGame() {

    }

    setOpenPvpSituations(openPvpSituations: number) {

    }

    processPlayerHelpers(helpers: number) {

    }

    processGMActions(actions: number[]) {

    }

    processUpdateNeeded(signature: string) {

    }

    processLoginError(error: string) {

    }

    processLoginAdvice(message: string) {

    }

    processLoginWait(message: string, time: number) {

    }

    processLoginToken(unknown: boolean) {

    }

    processPingBack() {

    }

    processDeath(deathType: DeathType, penality: number) {

    }

    processOpenContainer(containerId: number, containerItem: any, name: string, capacity: number, hasParent: boolean, items: Item[], isUnlocked: boolean, hasPages: boolean, containerSize: number, firstIndex: number) {
        
    }

    processCloseContainer(containerId: number) {
        
    }

    processContainerAddItem(containerId: number, item: any, slot: number) {
        
    }

    processContainerUpdateItem(containerId: number, slot: any, item: any) {
        
    }

    processContainerRemoveItem(containerId: number, slot: any, lastItem: any) {
        
    }

    processInventoryChange(slot: number, item: any) {
        
    }

    processOpenNpcTrade(items: any[]) {

    }

    processPlayerGoods(money: any, goods: any[]) {

    }

    formatCreatureName(string: string): string {
        return string;
    }

    processCloseNpcTrade() {

    }

    processOwnTrade(name: any, items: Item[]) {

    }

    processCounterTrade(name: any, items: Item[]) {

    }

    processCloseTrade() {

    }
}

let g_game = new Game();
export {g_game}