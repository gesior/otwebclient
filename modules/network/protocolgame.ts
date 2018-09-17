import {Protocol} from "./protocol";
import {LocalPlayer} from "../localplayer";
import {g_game, Game} from "../game";
import {DeathType, Direction, GameFeature, MessageMode, Otc, Skill, ThingCategory} from "../constants/const";
import {log, error, Log} from "../log";
import {Proto} from "../constants/proto";
import {InputMessage} from "./inputmessage";
import {Outfit} from "../outfit";
import {Thing} from "../thing";
import {Position} from "../position";
import {Creature} from "../creature";
import {Item} from "../item";
import {StaticText} from "../statictext";
import {g_things} from "../thingtypemanager";
import {g_map} from "../map";
import {Effect} from "../effect";
import {AnimatedText} from "../animatedtext";
import {Missile} from "../missile";
import {Color} from "../color";
import {Player} from "../player";
import {Light} from "../structures/light";
import {UnjustifiedPoints} from "../structures/unjustifiedpoints";
import {Npc} from "../structures/npc";
import {Monster} from "../structures/monster";
import {AwareRange} from "../structures/awarerange";
import {Movie} from "./movie";

export class ProtocolGame extends Protocol {
    private m_firstRecv: boolean;
    private m_accountName: string;
    private m_accountPassword: string;
    private m_authenticatorToken: string;
    private m_sessionKey: string;
    private m_characterName: string;
    private m_localPlayer: LocalPlayer;
    private m_gameInitialized: boolean;
    private m_mapKnown: boolean;

    private m_movieData: Movie;

    constructor(game: Game) {
        super();
        this.m_gameInitialized = false;
        this.m_mapKnown = false;

    }

    login(accountName: string, accountPassword: string, host: string, port: number, characterName: string, authenticatorToken: string, sessionKey: string) {
        this.m_firstRecv = false;
        this.m_accountName = accountName;
        this.m_accountPassword = accountPassword;
        this.m_authenticatorToken = authenticatorToken;
        this.m_sessionKey = sessionKey;
        this.m_characterName = characterName;

        this.connect(host, port);
    }

    watch(m_movieData: Movie) {
        var i  =0;
        Log.debug('start', +new Date());
        this.m_localPlayer = g_game.getLocalPlayer();

        this.m_movieData = m_movieData;
        var first = 0;
        while (this.m_movieData.getUnreadSize() >= 10) {
            let timestamp = this.m_movieData.getU64();
            let s = this.m_movieData.getReadPos();
            if(this.m_movieData.getUnreadSize() >= 10) {
                var next = this.m_movieData.peekU64();
                //console.log('com', timestamp, next);
                if (next - timestamp < 5000 && next - timestamp >= 0) {
                    continue;
                }
            }
            i++;
            this.m_movieData.setReadPos(s);
            let packetLength = this.m_movieData.getU16();
            let packetData = this.m_movieData.getBytes(packetLength);
            if (first === 0)
                first = timestamp;

            var inputMessage = new InputMessage(new DataView(packetData));
            try {
                this.parseMessage(inputMessage);
            } catch (e) {
                // debug client, stop movie
                break;
            }
        }
        Log.debug('end', +new Date());
        console.error('loaded packets', i);
    }

    onRecv(inputMessage: InputMessage) {
        Log.debug("Game onRecv", inputMessage);
        /*todo checksum, msgsize etc. why is it wrong*/
        if (this.m_firstRecv) {
            this.m_firstRecv = false;

        }
        if (g_game.getFeature(GameFeature.GameMessageSizeCheck)) {
            let size = inputMessage.getU16();
            if (size != inputMessage.getUnreadSize()) {

                Log.error("invalid message size", size, inputMessage.getUnreadSize(), inputMessage);
                return;
            }
        }
        this.parseMessage(inputMessage);
    }

    onError(evt: Event) {
        g_game.processConnectionError();
        this.disconnect();
    }

    parseMessage(msg: InputMessage) {
        let opcode: number = -1;
        let prevOpcode: number = -1;

        try {
            while (msg.getUnreadSize() > 0) {
                opcode = msg.getU8();
                //Log.debug('opcode', prevOpcode, opcode);

                if (!g_game.getFeature(GameFeature.GameLoginPending)) {
                    if (!this.m_gameInitialized && opcode > Proto.GameServerFirstGameOpcode) {
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
                    case Proto.GameServerLoginOrPendingState:
                        /*
                        if(g_game.getFeature(GameFeature.GameLoginPending))
                            this.parsePendingGame(msg);
                        else
                        */
                        this.parseLogin(msg);
                        break;

                    case Proto.GameServerGMActions:
                        this.parseGMActions(msg);
                        break;
                    case Proto.GameServerUpdateNeeded:
                        this.parseUpdateNeeded(msg);
                        break;
                    case Proto.GameServerLoginError:
                        this.parseLoginError(msg);
                        break;
                    case Proto.GameServerLoginAdvice:
                        this.parseLoginAdvice(msg);
                        break;
                    case Proto.GameServerLoginWait:
                        this.parseLoginWait(msg);
                        break;
                    case Proto.GameServerLoginToken:
                        this.parseLoginToken(msg);
                        break;
                    case Proto.GameServerPing:
                    case Proto.GameServerPingBack:
                        if ((opcode == Proto.GameServerPing && g_game.getFeature(GameFeature.GameClientPing)) ||
                            (opcode == Proto.GameServerPingBack && !g_game.getFeature(GameFeature.GameClientPing)))
                            this.parsePingBack(msg);
                        else
                            this.parsePing(msg);
                        break;
                    case Proto.GameServerChallenge:
                        this.parseChallenge(msg);
                        break;
                    case Proto.GameServerDeath:
                        this.parseDeath(msg);
                        break;
                    case Proto.GameServerFullMap:
                        this.parseMapDescription(msg);
                        break;
                    case Proto.GameServerMapTopRow:
                        this.parseMapMoveNorth(msg);
                        break;
                    case Proto.GameServerMapRightRow:
                        this.parseMapMoveEast(msg);
                        break;
                    case Proto.GameServerMapBottomRow:
                        this.parseMapMoveSouth(msg);
                        break;
                    case Proto.GameServerMapLeftRow:
                        this.parseMapMoveWest(msg);
                        break;
                    case Proto.GameServerUpdateTile:
                        this.parseUpdateTile(msg);
                        break;
                    case Proto.GameServerCreateOnMap:
                        this.parseTileAddThing(msg);
                        break;
                    case Proto.GameServerChangeOnMap:
                        this.parseTileTransformThing(msg);
                        break;
                    case Proto.GameServerDeleteOnMap:
                        this.parseTileRemoveThing(msg);
                        break;
                    case Proto.GameServerMoveCreature:
                        this.parseCreatureMove(msg);
                        break;
                    case Proto.GameServerOpenContainer:
                        this.parseOpenContainer(msg);
                        break;
                    case Proto.GameServerCloseContainer:
                        this.parseCloseContainer(msg);
                        break;
                    case Proto.GameServerCreateContainer:
                        this.parseContainerAddItem(msg);
                        break;
                    case Proto.GameServerChangeInContainer:
                        this.parseContainerUpdateItem(msg);
                        break;
                    case Proto.GameServerDeleteInContainer:
                        this.parseContainerRemoveItem(msg);
                        break;
                    case Proto.GameServerSetInventory:
                        this.parseAddInventoryItem(msg);
                        break;
                    case Proto.GameServerDeleteInventory:
                        this.parseRemoveInventoryItem(msg);
                        break;
                    case Proto.GameServerOpenNpcTrade:
                        this.parseOpenNpcTrade(msg);
                        break;
                    case Proto.GameServerPlayerGoods:
                        this.parsePlayerGoods(msg);
                        break;
                    case Proto.GameServerCloseNpcTrade:
                        this.parseCloseNpcTrade(msg);
                        break;
                    case Proto.GameServerOwnTrade:
                        this.parseOwnTrade(msg);
                        break;
                    case Proto.GameServerCounterTrade:
                        this.parseCounterTrade(msg);
                        break;
                    case Proto.GameServerCloseTrade:
                        this.parseCloseTrade(msg);
                        break;
                    case Proto.GameServerAmbient:
                        this.parseWorldLight(msg);
                        break;
                    case Proto.GameServerGraphicalEffect:
                        this.parseMagicEffect(msg);
                        break;
                    case Proto.GameServerTextEffect:
                        this.parseAnimatedText(msg);
                        break;
                    case Proto.GameServerMissleEffect:
                        this.parseDistanceMissile(msg);
                        break;
                    case Proto.GameServerMarkCreature:
                        this.parseCreatureMark(msg);
                        break;
                    case Proto.GameServerTrappers:
                        this.parseTrappers(msg);
                        break;
                    case Proto.GameServerCreatureHealth:
                        this.parseCreatureHealth(msg);
                        break;
                    case Proto.GameServerCreatureLight:
                        this.parseCreatureLight(msg);
                        break;
                    case Proto.GameServerCreatureOutfit:
                        this.parseCreatureOutfit(msg);
                        break;
                    case Proto.GameServerCreatureSpeed:
                        this.parseCreatureSpeed(msg);
                        break;
                    case Proto.GameServerCreatureSkull:
                        this.parseCreatureSkulls(msg);
                        break;
                    case Proto.GameServerCreatureParty:
                        this.parseCreatureShields(msg);
                        break;
                    case Proto.GameServerCreatureUnpass:
                        this.parseCreatureUnpass(msg);
                        break;
                    case Proto.GameServerEditText:
                        this.parseEditText(msg);
                        break;
                    case Proto.GameServerEditList:
                        this.parseEditList(msg);
                        break;
                    // PROTOCOL>=1038
                    case Proto.GameServerPremiumTrigger:
                        this.parsePremiumTrigger(msg);
                        break;
                    case Proto.GameServerPlayerData:
                        this.parsePlayerStats(msg);
                        break;
                    case Proto.GameServerPlayerSkills:
                        this.parsePlayerSkills(msg);
                        break;
                    case Proto.GameServerPlayerState:
                        this.parsePlayerState(msg);
                        break;
                    case Proto.GameServerClearTarget:
                        this.parsePlayerCancelAttack(msg);
                        break;
                    case Proto.GameServerPlayerModes:
                        this.parsePlayerModes(msg);
                        break;
                    case Proto.GameServerTalk:
                        this.parseTalk(msg);
                        break;
                    case Proto.GameServerChannels:
                        this.parseChannelList(msg);
                        break;
                    case Proto.GameServerOpenChannel:
                        this.parseOpenChannel(msg);
                        break;
                    case Proto.GameServerOpenPrivateChannel:
                        this.parseOpenPrivateChannel(msg);
                        break;
                    case Proto.GameServerRuleViolationChannel:
                        this.parseRuleViolationChannel(msg);
                        break;
                    case Proto.GameServerRuleViolationRemove:
                        this.parseRuleViolationRemove(msg);
                        break;
                    case Proto.GameServerRuleViolationCancel:
                        this.parseRuleViolationCancel(msg);
                        break;
                    case Proto.GameServerRuleViolationLock:
                        this.parseRuleViolationLock(msg);
                        break;
                    case Proto.GameServerOpenOwnChannel:
                        this.parseOpenOwnPrivateChannel(msg);
                        break;
                    case Proto.GameServerCloseChannel:
                        this.parseCloseChannel(msg);
                        break;
                    case Proto.GameServerTextMessage:
                        this.parseTextMessage(msg);
                        break;
                    case Proto.GameServerCancelWalk:
                        this.parseCancelWalk(msg);
                        break;
                    case Proto.GameServerWalkWait:
                        this.parseWalkWait(msg);
                        break;
                    case Proto.GameServerFloorChangeUp:
                        this.parseFloorChangeUp(msg);
                        break;
                    case Proto.GameServerFloorChangeDown:
                        this.parseFloorChangeDown(msg);
                        break;
                    case Proto.GameServerChooseOutfit:
                        this.parseOpenOutfitWindow(msg);
                        break;
                    case Proto.GameServerVipAdd:
                        this.parseVipAdd(msg);
                        break;
                    case Proto.GameServerVipState:
                        this.parseVipState(msg);
                        break;
                    case Proto.GameServerVipLogout:
                        this.parseVipLogout(msg);
                        break;
                    case Proto.GameServerTutorialHint:
                        this.parseTutorialHint(msg);
                        break;
                    case Proto.GameServerAutomapFlag:
                        this.parseAutomapFlag(msg);
                        break;
                    case Proto.GameServerQuestLog:
                        this.parseQuestLog(msg);
                        break;
                    case Proto.GameServerQuestLine:
                        this.parseQuestLine(msg);
                        break;
                    // PROTOCOL>=870
                    case Proto.GameServerSpellDelay:
                        this.parseSpellCooldown(msg);
                        break;
                    case Proto.GameServerSpellGroupDelay:
                        this.parseSpellGroupCooldown(msg);
                        break;
                    case Proto.GameServerMultiUseDelay:
                        this.parseMultiUseCooldown(msg);
                        break;
                    // PROTOCOL>=910
                    case Proto.GameServerChannelEvent:
                        this.parseChannelEvent(msg);
                        break;
                    case Proto.GameServerItemInfo:
                        this.parseItemInfo(msg);
                        break;
                    case Proto.GameServerPlayerInventory:
                        this.parsePlayerInventory(msg);
                        break;
                    // PROTOCOL>=950
                    case Proto.GameServerPlayerDataBasic:
                        this.parsePlayerInfo(msg);
                        break;
                    // PROTOCOL>=970
                    case Proto.GameServerModalDialog:
                        this.parseModalDialog(msg);
                        break;
                    // PROTOCOL>=980
                    case Proto.GameServerLoginSuccess:
                        this.parseLogin(msg);
                        break;
                    case Proto.GameServerEnterGame:
                        this.parseEnterGame(msg);
                        break;
                    case Proto.GameServerPlayerHelpers:
                        this.parsePlayerHelpers(msg);
                        break;
                    // PROTOCOL>=1000
                    case Proto.GameServerCreatureMarks:
                        this.parseCreaturesMark(msg);
                        break;
                    case Proto.GameServerCreatureType:
                        this.parseCreatureType(msg);
                        break;
                    // PROTOCOL>=1055
                    case Proto.GameServerBlessings:
                        this.parseBlessings(msg);
                        break;
                    case Proto.GameServerUnjustifiedStats:
                        this.parseUnjustifiedStats(msg);
                        break;
                    case Proto.GameServerPvpSituations:
                        this.parsePvpSituations(msg);
                        break;
                    case Proto.GameServerPreset:
                        this.parsePreset(msg);
                        break;
                    // PROTOCOL>=1080
                    case Proto.GameServerCoinBalanceUpdating:
                        this.parseCoinBalanceUpdating(msg);
                        break;
                    case Proto.GameServerCoinBalance:
                        this.parseCoinBalance(msg);
                        break;
                    case Proto.GameServerRequestPurchaseData:
                        this.parseRequestPurchaseData(msg);
                        break;
                    case Proto.GameServerStoreCompletePurchase:
                        this.parseCompleteStorePurchase(msg);
                        break;
                    case Proto.GameServerStoreOffers:
                        this.parseStoreOffers(msg);
                        break;
                    case Proto.GameServerStoreTransactionHistory:
                        this.parseStoreTransactionHistory(msg);
                        break;
                    case Proto.GameServerStoreError:
                        this.parseStoreError(msg);
                        break;
                    case Proto.GameServerStore:
                        this.parseStore(msg);
                        break;
                    // PROTOCOL>=1097
                    case Proto.GameServerStoreButtonIndicators:
                        this.parseStoreButtonIndicators(msg);
                        break;
                    case Proto.GameServerSetStoreDeepLink:
                        this.parseSetStoreDeepLink(msg);
                        break;
                    // otclient ONLY
                    case Proto.GameServerExtendedOpcode:
                        this.parseExtendedOpcode(msg);
                        break;
                    case Proto.GameServerChangeMapAwareRange:
                        this.parseChangeMapAwareRange(msg);
                        break;

                    case 55:
                        return;
                    default:
                        Log.error("unhandled opcode %d", opcode, msg);
                        throw new Error('opcode');
                }
                prevOpcode = opcode;
            }
        }
        catch (e) {
            Log.error("ProtocolGame parse message exception (%d bytes unread, last opcode is %d, prev opcode is %d): %s",
                msg.getUnreadSize(), opcode, prevOpcode, e);
            throw new Error('parser');
        }
    }

    parseLogin(msg: InputMessage) {
        let playerId = msg.getU32();
        let serverBeat = msg.getU16();

        let canReportBugs = msg.getU8();

        if (g_game.getClientVersion() >= 1054)
            msg.getU8(); // can change pvp frame option

        if (g_game.getClientVersion() >= 1058) {
            let expertModeEnabled = msg.getU8();
            //g_game.setExpertPvpMode(expertModeEnabled);
        }

        if (g_game.getFeature(GameFeature.GameIngameStore)) {
            // URL to ingame store images
            msg.getString();

            // premium coin package size
            // e.g you can only buy packs of 25, 50, 75, .. coins in the market
            msg.getU16();
        }

        this.m_localPlayer.setId(playerId);
        Log.error('local pid', playerId)
//g_game.setServerBeat(serverBeat);
//g_game.setCanReportBugs(canReportBugs);

//g_game.processLogin();
    }

    parsePendingGame(msg: InputMessage) {
        //set player to pending game state
        //g_game.processPendingGame();
    }

    parseEnterGame(msg: InputMessage) {
        //set player to entered game state
        //g_game.processEnterGame();

        if (!this.m_gameInitialized) {
            //g_game.processGameStart();
            this.m_gameInitialized = true;
        }
    }

    parseStoreButtonIndicators(msg: InputMessage) {
        msg.getU8(); // unknown
        msg.getU8(); // unknown
    }

    parseSetStoreDeepLink(msg: InputMessage) {
        let currentlyFeaturedServiceType = msg.getU8();
    }

    parseBlessings(msg: InputMessage) {
        let blessings = msg.getU16();
        this.m_localPlayer.setBlessings(blessings);
    }

    parsePreset(msg: InputMessage) {
        let preset = msg.getU32();
    }

    parseRequestPurchaseData(msg: InputMessage) {
        let transactionId = msg.getU32();
        let productType = msg.getU8();
    }

    parseStore(msg: InputMessage) {
        this.parseCoinBalance(msg);

        // Parse all categories
        let count = msg.getU16();
        for (let i = 0; i < count; i++) {
            let category = msg.getString();
            let description = msg.getString();

            let highlightState = 0;
            if (g_game.getFeature(GameFeature.GameIngameStoreHighlights))
                highlightState = msg.getU8();

            let icons = [];
            let iconCount = msg.getU8();
            for (let i = 0; i < iconCount; i++) {
                let icon = msg.getString();
                icons.push(icon);
            }

            // If this is a valid category name then
            // the category we just parsed is a child of that
            let parentCategory = msg.getString();
        }
    }

    parseCoinBalance(msg: InputMessage) {
        let update = msg.getU8() == 1;
        let coins = -1;
        let transferableCoins = -1;
        if (update) {
            // amount of coins that can be used to buy prodcuts
            // in the ingame store
            coins = msg.getU32();

            // amount of coins that can be sold in market
            // or be transfered to another player
            transferableCoins = msg.getU32();
        }
    }

    parseCoinBalanceUpdating(msg: InputMessage) {
        // coin balance can be updating and might not be accurate
        let isUpdating = msg.getU8() == 1;
    }

    parseCompleteStorePurchase(msg: InputMessage) {
        // not used
        msg.getU8();

        let message = msg.getString();
        let coins = msg.getU32();
        let transferableCoins = msg.getU32();

        Log.debug("Purchase Complete: %s", message);
    }

    parseStoreTransactionHistory(msg: InputMessage) {
        let currentPage;
        if (g_game.getClientVersion() <= 1096) {
            currentPage = msg.getU16();
            let hasNextPage = msg.getU8() == 1;
        } else {
            currentPage = msg.getU32();
            let pageCount = msg.getU32();
        }

        let entries = msg.getU8();
        for (let i = 0; i < entries; i++) {
            let time = msg.getU16();
            let productType = msg.getU8();
            let coinChange = msg.getU32();
            let productName = msg.getString();
            Log.debug("Time %i, type %i, change %i, product name %s", time, productType, coinChange, productName);
        }
    }

    parseStoreOffers(msg: InputMessage) {
        let categoryName = msg.getString();

        let offers = msg.getU16();
        for (let i = 0; i < offers; i++) {
            let offerId = msg.getU32();
            let offerName = msg.getString();
            let offerDescription = msg.getString();

            let price = msg.getU32();
            let highlightState = msg.getU8();
            if (highlightState == 2 && g_game.getFeature(GameFeature.GameIngameStoreHighlights) && g_game.getClientVersion() >= 1097) {
                let saleValidUntilTimestamp = msg.getU32();
                let basePrice = msg.getU32();
            }

            let disabledState = msg.getU8();
            let disabledReason = "";
            if (g_game.getFeature(GameFeature.GameIngameStoreHighlights) && disabledState == 1) {
                disabledReason = msg.getString();
            }

            let icons = msg.getU8();
            for (let j = 0; j < icons; j++) {
                let icon = msg.getString();
            }

            let subOffers = msg.getU16();
            for (let j = 0; j < subOffers; j++) {
                let name = msg.getString();
                let description = msg.getString();

                let subIcons = msg.getU8();
                for (let k = 0; k < subIcons; k++) {
                    let icon = msg.getString();
                }
                let serviceType = msg.getString();
            }
        }
    }

    parseStoreError(msg: InputMessage) {
        let errorType = msg.getU8();
        let message = msg.getString();
        Log.error("Store Error: %s [%i]", message, errorType);
    }

    parseUnjustifiedStats(msg: InputMessage) {
        let unjustifiedPoints: UnjustifiedPoints;
        unjustifiedPoints.killsDay = msg.getU8();
        unjustifiedPoints.killsDayRemaining = msg.getU8();
        unjustifiedPoints.killsWeek = msg.getU8();
        unjustifiedPoints.killsWeekRemaining = msg.getU8();
        unjustifiedPoints.killsMonth = msg.getU8();
        unjustifiedPoints.killsMonthRemaining = msg.getU8();
        unjustifiedPoints.skullTime = msg.getU8();

        //g_game.setUnjustifiedPoints(unjustifiedPoints);
    }

    parsePvpSituations(msg: InputMessage) {
        let openPvpSituations = msg.getU8();

        //g_game.setOpenPvpSituations(openPvpSituations);
    }

    parsePlayerHelpers(msg: InputMessage) {
        let id = msg.getU32();
        let helpers = msg.getU16();

        let creature = g_map.getCreatureById(id);
        if (creature) {

            //g_game.processPlayerHelpers(helpers);
        }
        else
            Log.error("could not get creature with id %d", id);
    }

    parseGMActions(msg: InputMessage) {
        let actions: number[] = [];

        let numViolationReasons;

        if (g_game.getClientVersion() >= 850)
            numViolationReasons = 20;
        else if (g_game.getClientVersion() >= 840)
            numViolationReasons = 23;
        else
            numViolationReasons = 32;

        for (let i = 0; i < numViolationReasons; ++i)
            actions.push(msg.getU8());
        Log.debug(numViolationReasons, actions);
        //g_game.processGMActions(actions);
    }

    parseUpdateNeeded(msg: InputMessage) {
        let signature = msg.getString();
        //g_game.processUpdateNeeded(signature);
    }

    parseLoginError(msg: InputMessage) {
        let error = msg.getString();

        Log.error('login error', error)
        //g_game.processLoginError(error);
    }

    parseLoginAdvice(msg: InputMessage) {
        let message = msg.getString();

        //g_game.processLoginAdvice(message);
    }

    parseLoginWait(msg: InputMessage) {
        let message = msg.getString();
        let time = msg.getU8();

        //g_game.processLoginWait(message, time);
    }

    parseLoginToken(msg: InputMessage) {
        let unknown = (msg.getU8() == 0);
        //g_game.processLoginToken(unknown);
    }

    parsePing(msg: InputMessage): void {
        //this.sendPingBack();
    }

    parsePingBack(msg: InputMessage) {
        //g_game.processPingBack();
    }

    parseChallenge(msg: InputMessage): void {
        let timestamp = msg.getU32();
        let random = msg.getU8();

    }

    parseDeath(msg: InputMessage) {
        let penality = 100;
        let deathType = DeathType.DeathRegular;

        if (g_game.getFeature(GameFeature.GameDeathType))
            deathType = msg.getU8();

        if (g_game.getFeature(GameFeature.GamePenalityOnDeath) && deathType == DeathType.DeathRegular)
            penality = msg.getU8();

        //g_game.processDeath(deathType, penality);
    }

    parseMapDescription(msg: InputMessage) {
        let pos = this.getPosition(msg);
        if (!this.m_mapKnown)
            this.m_localPlayer.setPosition(pos);

        g_map.setCentralPosition(pos);

        //Log.debug(this.m_localPlayer, g_map.getCentralPosition());
        let range = g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), range.vertical());

        if (!this.m_mapKnown) {
            this.m_mapKnown = true;
        }

        //g_dispatcher.addEvent([] { g_lua.callGlobalField("g_game", "onMapDescription"); });
    }

    parseMapMoveNorth(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        pos.y--;

        let range = g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), 1);
        g_map.setCentralPosition(pos);
    }

    parseMapMoveEast(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        pos.x++;

        let range = g_map.getAwareRange();
        this.setMapDescription(msg, pos.x + range.right, pos.y - range.top, pos.z, 1, range.vertical());
        g_map.setCentralPosition(pos);
    }

    parseMapMoveSouth(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        pos.y++;

        let range = g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y + range.bottom, pos.z, range.horizontal(), 1);
        g_map.setCentralPosition(pos);
    }

    parseMapMoveWest(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        pos.x--;

        let range = g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, 1, range.vertical());
        g_map.setCentralPosition(pos);
    }

    parseUpdateTile(msg: InputMessage) {
        let tilePos = this.getPosition(msg);
        this.setTileDescription(msg, tilePos);
    }

    parseTileAddThing(msg: InputMessage) {
        let pos = this.getPosition(msg);
        let stackPos = -1;

        if (g_game.getClientVersion() >= 841)
            stackPos = msg.getU8();

        let thing = this.getThing(msg);
        g_map.addThing(thing, pos, stackPos);
    }

    parseTileTransformThing(msg: InputMessage) {
        let thing = this.getMappedThing(msg);
        let newThing = this.getThing(msg);

        if (!thing) {
            Log.error("no thing");
            return;
        }

        let pos = thing.getPosition();
        let stackpos = thing.getStackPos();

        if (!g_map.removeThing(thing)) {
            Log.error("unable to remove thing");
            return;
        }

        g_map.addThing(newThing, pos, stackpos);
    }

    parseTileRemoveThing(msg: InputMessage) {
        let thing = this.getMappedThing(msg);
        if (!thing) {
            Log.error("no thing");
            return;
        }

        if (!g_map.removeThing(thing))
            Log.error("unable to remove thing");
    }

    parseCreatureMove(msg: InputMessage) {
        let thing = this.getMappedThing(msg);
        let newPos = this.getPosition(msg);

        if (!thing || !thing.isCreature()) {
            Log.error("no creature found to move", thing);
            return;
        }

        if (!g_map.removeThing(thing)) {
            Log.error("unable to remove creature");
            return;
        }

        let creature = <Creature> thing;
        creature.allowAppearWalk();

        //Log.debug('creature move', creature, g_map.getTile(newPos).m_things);
        g_map.addThing(thing, newPos, -1);
    }

    parseOpenContainer(msg: InputMessage) {
        let containerId = msg.getU8();
        let containerItem = this.getItem(msg);
        let name = msg.getString();
        let capacity = msg.getU8();
        let hasParent = (msg.getU8() != 0);

        let isUnlocked = true;
        let hasPages = false;
        let containerSize = 0;
        let firstIndex = 0;

        if (g_game.getFeature(GameFeature.GameContainerPagination)) {
            isUnlocked = (msg.getU8() != 0); // drag and drop
            hasPages = (msg.getU8() != 0); // pagination
            containerSize = msg.getU16(); // container size
            firstIndex = msg.getU16(); // first index
        }

        let itemCount = msg.getU8();

        let items: Item[] = [];
        for (let i = 0; i < itemCount; i++)
            items[i] = this.getItem(msg);

        //g_game.processOpenContainer(containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex);
    }

    parseCloseContainer(msg: InputMessage) {
        let containerId = msg.getU8();
        //g_game.processCloseContainer(containerId);
    }

    parseContainerAddItem(msg: InputMessage) {
        let containerId = msg.getU8();
        let slot = 0;
        if (g_game.getFeature(GameFeature.GameContainerPagination)) {
            slot = msg.getU16(); // slot
        }
        let item = this.getItem(msg);
        //g_game.processContainerAddItem(containerId, item, slot);
    }

    parseContainerUpdateItem(msg: InputMessage) {
        let containerId = msg.getU8();
        let slot;
        if (g_game.getFeature(GameFeature.GameContainerPagination)) {
            slot = msg.getU16();
        } else {
            slot = msg.getU8();
        }
        let item = this.getItem(msg);
        //g_game.processContainerUpdateItem(containerId, slot, item);
    }

    parseContainerRemoveItem(msg: InputMessage) {
        let containerId = msg.getU8();
        let slot;
        let lastItem;
        if (g_game.getFeature(GameFeature.GameContainerPagination)) {
            slot = msg.getU16();

            let itemId = msg.getU16();
            if (itemId != 0)
                lastItem = this.getItem(msg, itemId);
        } else {
            slot = msg.getU8();
        }
        //g_game.processContainerRemoveItem(containerId, slot, lastItem);
    }

    parseAddInventoryItem(msg: InputMessage) {
        let slot = msg.getU8();
        let item = this.getItem(msg);
        //g_game.processInventoryChange(slot, item);
    }

    parseRemoveInventoryItem(msg: InputMessage) {
        let slot = msg.getU8();
        //g_game.processInventoryChange(slot, new Item());
    }

    parseOpenNpcTrade(msg: InputMessage) {
        let items = [];
        let npcName;

        if (g_game.getFeature(GameFeature.GameNameOnNpcTrade))
            npcName = msg.getString();

        let listCount;

        if (g_game.getClientVersion() >= 900)
            listCount = msg.getU16();
        else
            listCount = msg.getU8();

        for (let i = 0; i < listCount; ++i) {
            let itemId = msg.getU16();
            let count = msg.getU8();

            let item = new Item(itemId);
            item.setCountOrSubType(count);

            let name = msg.getString();
            let weight = msg.getU32();
            let buyPrice = msg.getU32();
            let sellPrice = msg.getU32();
            items.push([item, name, weight, buyPrice, sellPrice]);
        }

        //g_game.processOpenNpcTrade(items);
    }

    parsePlayerGoods(msg: InputMessage) {
        let goods = [];

        let money;
        if (g_game.getClientVersion() >= 973)
            money = msg.getU64();
        else
            money = msg.getU32();

        let size = msg.getU8();
        for (let i = 0; i < size; i++) {
            let itemId = msg.getU16();
            let amount;

            if (g_game.getFeature(GameFeature.GameDoubleShopSellAmount))
                amount = msg.getU16();
            else
                amount = msg.getU8();

            goods.push([new Item(itemId), amount]);
        }

        //g_game.processPlayerGoods(money, goods);
    }

    parseCloseNpcTrade(msg: InputMessage) {
        //g_game.processCloseNpcTrade();
    }

    parseOwnTrade(msg: InputMessage) {
        let name = g_game.formatCreatureName(msg.getString());
        let count = msg.getU8();

        let items: Item[] = [];
        for (let i = 0; i < count; i++)
            items[i] = this.getItem(msg);

        //g_game.processOwnTrade(name, items);
    }

    parseCounterTrade(msg: InputMessage) {
        let name = g_game.formatCreatureName(msg.getString());
        let count = msg.getU8();

        let items: Item[] = [];
        for (let i = 0; i < count; i++)
            items[i] = this.getItem(msg);

        //g_game.processCounterTrade(name, items);
    }

    parseCloseTrade(msg: InputMessage) {
        //g_game.processCloseTrade();
    }

    parseWorldLight(msg: InputMessage) {
        let light = new Light();
        light.intensity = msg.getU8();
        light.color = msg.getU8();

        g_map.setLight(light);
    }

    parseMagicEffect(msg: InputMessage) {
        let pos = this.getPosition(msg);
        let effectId;
        if (g_game.getFeature(GameFeature.GameMagicEffectU16))
            effectId = msg.getU16();
        else
            effectId = msg.getU8();

        if (!g_things.isValidDatId(effectId, ThingCategory.ThingCategoryEffect)) {
            Log.error("invalid effect id %d", effectId);
            return;
        }

        let effect = new Effect();
        effect.setId(effectId);
        g_map.addThing(effect, pos);
    }

    parseAnimatedText(msg: InputMessage) {
        let position: Position = this.getPosition(msg);
        let color = msg.getU8();
        let text = msg.getString();

        let animatedText = new AnimatedText();
        animatedText.setColor(color);
        animatedText.setText(text);
        g_map.addThing(animatedText, position);
    }

    parseDistanceMissile(msg: InputMessage) {
        let fromPos = this.getPosition(msg);
        let toPos = this.getPosition(msg);
        let shotId = msg.getU8();

        if (!g_things.isValidDatId(shotId, ThingCategory.ThingCategoryMissile)) {
            Log.error("invalid missile id %d", shotId);
            return;
        }

        let missile = new Missile();
        missile.setId(shotId);
        missile.setPath(fromPos, toPos);
        g_map.addThing(missile, fromPos);
    }

    parseCreatureMark(msg: InputMessage) {
        let id = msg.getU32();
        let color = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.addTimedSquare(color);
        else
            Log.error("could not get creature");
    }

    parseTrappers(msg: InputMessage) {
        let numTrappers = msg.getU8();

        if (numTrappers > 8)
            Log.error("too many trappers");

        for (let i = 0; i < numTrappers; ++i) {
            let id = msg.getU32();
            let creature = g_map.getCreatureById(id);
            if (creature) {
                //TODO: set creature as trapper
            } else
                Log.error("could not get creature");
        }
    }

    parseCreatureHealth(msg: InputMessage) {
        let id = msg.getU32();
        let healthPercent = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setHealthPercent(healthPercent);
    }

    parseCreatureLight(msg: InputMessage) {
        let id = msg.getU32();

        let light = new Light();
        light.intensity = msg.getU8();
        light.color = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setLight(light);
        else
            Log.error("could not get creature");
    }

    parseCreatureOutfit(msg: InputMessage) {
        let id = msg.getU32();
        let outfit = this.getOutfit(msg);

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setOutfit(outfit);
        else
            Log.error("could not get creature");
    }

    parseCreatureSpeed(msg: InputMessage) {
        let id = msg.getU32();

        let baseSpeed = -1;
        if (g_game.getClientVersion() >= 1059)
            baseSpeed = msg.getU16();

        let speed = msg.getU16();

        let creature = g_map.getCreatureById(id);
        if (creature) {
            creature.setSpeed(speed);
            if (baseSpeed != -1)
                creature.setBaseSpeed(baseSpeed);
        }
    }

    parseCreatureSkulls(msg: InputMessage) {
        let id = msg.getU32();
        let skull = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setSkull(skull);
        else
            Log.error("could not get creature");
    }

    parseCreatureShields(msg: InputMessage) {
        let id = msg.getU32();
        let shield = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setShield(shield);
        else
            Log.error("could not get creature");
    }

    parseCreatureUnpass(msg: InputMessage) {
        let id = msg.getU32();
        let unpass = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setPassable(!unpass);
        else
            Log.error("could not get creature");
    }

    parseEditText(msg: InputMessage) {
        let id = msg.getU32();

        let itemId;
        if (g_game.getClientVersion() >= 1010) {
            // TODO: processEditText with ItemPtr as parameter
            let item = this.getItem(msg);
            itemId = item.getId();
        } else
            itemId = msg.getU16();

        let maxLength = msg.getU16();
        let text = msg.getString();

        let writer = msg.getString();
        let date = "";
        if (g_game.getFeature(GameFeature.GameWritableDate))
            date = msg.getString();

        //g_game.processEditText(id, itemId, maxLength, text, writer, date);
    }

    parseEditList(msg: InputMessage) {
        let doorId = msg.getU8();
        let id = msg.getU32();
        let text = msg.getString();

        //g_game.processEditList(id, doorId, text);
    }

    parsePremiumTrigger(msg: InputMessage) {
        let triggerCount = msg.getU8();
        let triggers;
        for (let i = 0; i < triggerCount; ++i) {
            triggers.push_back(msg.getU8());
        }

        if (g_game.getClientVersion() <= 1096) {
            let something = msg.getU8() == 1;
        }
    }

    parsePlayerInfo(msg: InputMessage) {
        let premium = msg.getU8(); // premium
        if (g_game.getFeature(GameFeature.GamePremiumExpiration)) {
            let premiumEx = msg.getU32(); // premium expiration used for premium advertisement
        }
        let vocation = msg.getU8(); // vocation

        let spellCount = msg.getU16();
        let spells;
        for (let i = 0; i < spellCount; ++i)
            spells.push(msg.getU8()); // spell id

        //m_localPlayer.setPremium(premium);
        //m_localPlayer.setVocation(vocation);
        //m_localPlayer.setSpells(spells);
    }

    parsePlayerStats(msg: InputMessage) {
        let health;
        let maxHealth;

        if (g_game.getFeature(GameFeature.GameDoubleHealth)) {
            health = msg.getU32();
            maxHealth = msg.getU32();
        } else {
            health = msg.getU16();
            maxHealth = msg.getU16();
        }

        let freeCapacity;
        if (g_game.getFeature(GameFeature.GameDoubleFreeCapacity))
            freeCapacity = msg.getU32() / 100.0;
        else
            freeCapacity = msg.getU16() / 100.0;

        let totalCapacity = 0;
        if (g_game.getFeature(GameFeature.GameTotalCapacity))
            totalCapacity = msg.getU32() / 100.0;

        let experience;
        if (g_game.getFeature(GameFeature.GameDoubleExperience))
            experience = msg.getU64();
        else
            experience = msg.getU32();

        let level = msg.getU16();
        let levelPercent = msg.getU8();

        if (g_game.getFeature(GameFeature.GameExperienceBonus)) {
            if (g_game.getClientVersion() <= 1096) {
                let experienceBonus = msg.getDouble();
            } else {
                let baseXpGain = msg.getU16();
                let voucherAddend = msg.getU16();
                let grindingAddend = msg.getU16();
                let storeBoostAddend = msg.getU16();
                let huntingBoostFactor = msg.getU16();
            }
        }

        let mana;
        let maxMana;

        if (g_game.getFeature(GameFeature.GameDoubleHealth)) {
            mana = msg.getU32();
            maxMana = msg.getU32();
        } else {
            mana = msg.getU16();
            maxMana = msg.getU16();
        }

        let magicLevel = msg.getU8();

        let baseMagicLevel;
        if (g_game.getFeature(GameFeature.GameSkillsBase))
            baseMagicLevel = msg.getU8();
        else
            baseMagicLevel = magicLevel;

        let magicLevelPercent = msg.getU8();
        let soul = msg.getU8();
        let stamina = 0;
        if (g_game.getFeature(GameFeature.GamePlayerStamina))
            stamina = msg.getU16();

        let baseSpeed = 0;
        if (g_game.getFeature(GameFeature.GameSkillsBase))
            baseSpeed = msg.getU16();

        let regeneration = 0;
        if (g_game.getFeature(GameFeature.GamePlayerRegenerationTime))
            regeneration = msg.getU16();

        let training = 0;
        if (g_game.getFeature(GameFeature.GameOfflineTrainingTime)) {
            training = msg.getU16();
            if (g_game.getClientVersion() >= 1097) {
                let remainingStoreXpBoostSeconds = msg.getU16();
                let canBuyMoreStoreXpBoosts = msg.getU8();
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

    parsePlayerSkills(msg: InputMessage) {
        let lastSkill = Skill.Fishing + 1;
        if (g_game.getFeature(GameFeature.GameAdditionalSkills))
            lastSkill = Skill.LastSkill;

        for (let skill: Skill = 0; skill < lastSkill; skill++) {
            let level;

            if (g_game.getFeature(GameFeature.GameDoubleSkills))
                level = msg.getU16();
            else
                level = msg.getU8();

            let baseLevel;
            if (g_game.getFeature(GameFeature.GameSkillsBase))
                if (g_game.getFeature(GameFeature.GameBaseSkillU16))
                    baseLevel = msg.getU16();
                else
                    baseLevel = msg.getU8();
            else
                baseLevel = level;

            let levelPercent = 0;
            // Critical, Life Leech and Mana Leech have no level percent
            if (skill <= Skill.Fishing)
                levelPercent = msg.getU8();
            /*
                m_localPlayer.setSkill(skill, level, levelPercent);
                m_localPlayer.setBaseSkill(skill, baseLevel);
                */
        }
    }

    parsePlayerState(msg: InputMessage) {
        let states;
        if (g_game.getFeature(GameFeature.GamePlayerStateU16))
            states = msg.getU16();
        else
            states = msg.getU8();

        //m_localPlayer.setStates(states);
    }

    parsePlayerCancelAttack(msg: InputMessage) {
        let seq = 0;
        if (g_game.getFeature(GameFeature.GameAttackSeq))
            seq = msg.getU32();

        //g_game.processAttackCancel(seq);
    }


    parsePlayerModes(msg: InputMessage) {
        let fightMode = msg.getU8();
        let chaseMode = msg.getU8();
        let safeMode = msg.getU8();

        let pvpMode = 0;
        if (g_game.getFeature(GameFeature.GamePVPMode))
            pvpMode = msg.getU8();

        //g_game.processPlayerModes((Otc::FightModes)fightMode, (Otc::ChaseModes)chaseMode, safeMode, (Otc::PVPModes)pvpMode);
    }

    parseSpellCooldown(msg: InputMessage) {
        let spellId = msg.getU8();
        let delay = msg.getU32();

        //g_lua.callGlobalField("g_game", "onSpellCooldown", spellId, delay);
    }

    parseSpellGroupCooldown(msg: InputMessage) {
        let groupId = msg.getU8();
        let delay = msg.getU32();

        //g_lua.callGlobalField("g_game", "onSpellGroupCooldown", groupId, delay);
    }

    parseMultiUseCooldown(msg: InputMessage) {
        let delay = msg.getU32();

        //g_lua.callGlobalField("g_game", "onMultiUseCooldown", delay);
    }

    parseTalk(msg: InputMessage) {
        if (g_game.getFeature(GameFeature.GameMessageStatements))
            msg.getU32(); // channel statement guid

        let name = g_game.formatCreatureName(msg.getString());

        let level = 0;
        if (g_game.getFeature(GameFeature.GameMessageLevel))
            level = msg.getU16();

        let mode: MessageMode = g_game.translateMessageModeFromServer(msg.getU8());
        let channelId = 0;
        let pos: Position;

        switch (mode) {
            case MessageMode.MessageSay:
            case MessageMode.MessageWhisper:
            case MessageMode.MessageYell:
            case MessageMode.MessageMonsterSay:
            case MessageMode.MessageMonsterYell:
            case MessageMode.MessageNpcTo:
            case MessageMode.MessageBarkLow:
            case MessageMode.MessageBarkLoud:
            case MessageMode.MessageSpell:
            case MessageMode.MessageNpcFromStartBlock:
                pos = this.getPosition(msg);
                break;
            case MessageMode.MessageChannel:
            case MessageMode.MessageChannelManagement:
            case MessageMode.MessageChannelHighlight:
            case MessageMode.MessageGamemasterChannel:
                channelId = msg.getU16();
                break;
            case MessageMode.MessageNpcFrom:
            case MessageMode.MessagePrivateFrom:
            case MessageMode.MessageGamemasterBroadcast:
            case MessageMode.MessageGamemasterPrivateFrom:
            case MessageMode.MessageRVRAnswer:
            case MessageMode.MessageRVRContinue:
                break;
            case MessageMode.MessageRVRChannel:
                msg.getU32();
                break;
            default:
                Log.error("unknown message mode %d", mode);
                break;
        }

        let text = msg.getString();

        g_game.processTalk(name, level, mode, text, channelId, pos);
    }

    parseChannelList(msg: InputMessage) {
        let count = msg.getU8();
        let channelList = [];
        for (let i = 0; i < count; i++) {
            let id = msg.getU16();
            let name = msg.getString();
            channelList.push([id, name]);
        }

        //g_game.processChannelList(channelList);
    }

    parseOpenChannel(msg: InputMessage) {
        let channelId: number = msg.getU16();
        let name: string = msg.getString();

        if (g_game.getFeature(GameFeature.GameChannelPlayerList)) {
            let joinedPlayers = msg.getU16();
            for (let i = 0; i < joinedPlayers; ++i)
                g_game.formatCreatureName(msg.getString()); // player name
            let invitedPlayers = msg.getU16();
            for (let i = 0; i < invitedPlayers; ++i)
                g_game.formatCreatureName(msg.getString()); // player name
        }

        g_game.processOpenChannel(channelId, name);
    }

    parseOpenPrivateChannel(msg: InputMessage) {
        let name = g_game.formatCreatureName(msg.getString());

        //g_game.processOpenPrivateChannel(name);
    }

    parseOpenOwnPrivateChannel(msg: InputMessage) {
        let channelId = msg.getU16();
        let name = msg.getString();

        g_game.processOpenOwnPrivateChannel(channelId, name);
    }

    parseCloseChannel(msg: InputMessage) {
        let channelId = msg.getU16();

        g_game.processCloseChannel(channelId);
    }

    parseRuleViolationChannel(msg: InputMessage) {
        let channelId = msg.getU16();

        console.log('g_game.processRuleViolationChannel', channelId);
        //g_game.processRuleViolationChannel(channelId);
    }

    parseRuleViolationRemove(msg: InputMessage) {
        let name = msg.getString();

        console.log('g_game.processRuleViolationRemove', name);
        //g_game.processRuleViolationRemove(name);
    }

    parseRuleViolationCancel(msg: InputMessage) {
        let name = msg.getString();

        console.log('g_game.processRuleViolationCancel', name);
        //g_game.processRuleViolationCancel(name);
    }

    parseRuleViolationLock(msg: InputMessage) {
        console.log('g_game.processRuleViolationLock');
        //g_game.processRuleViolationLock();
    }

    parseTextMessage(msg: InputMessage) {
        let code = msg.getU8();
        let mode: MessageMode = g_game.translateMessageModeFromServer(code);
        let text;

        switch (mode) {
            case MessageMode.MessageChannelManagement: {
                let channel = msg.getU16();
                text = msg.getString();
                break;
            }
            case MessageMode.MessageGuild:
            case MessageMode.MessagePartyManagement:
            case MessageMode.MessageParty: {
                let channel = msg.getU16();
                text = msg.getString();
                break;
            }
            case MessageMode.MessageDamageDealed:
            case MessageMode.MessageDamageReceived:
            case MessageMode.MessageDamageOthers: {
                let pos: Position = this.getPosition(msg);
                let value = [];
                let color = [];

                // physical damage
                value[0] = msg.getU32();
                color[0] = msg.getU8();

                // magic damage
                value[1] = msg.getU32();
                color[1] = msg.getU8();
                text = msg.getString();

                for (let i = 0; i < 2; ++i) {
                    if (value[i] == 0)
                        continue;
                    let animatedText = new AnimatedText;
                    animatedText.setColor(color[i]);
                    animatedText.setText(value[i]);
                    g_map.addThing(animatedText, pos);
                }
                break;
            }
            case MessageMode.MessageHeal:
            case MessageMode.MessageMana:
            case MessageMode.MessageExp:
            case MessageMode.MessageHealOthers:
            case MessageMode.MessageExpOthers: {
                let pos = this.getPosition(msg);
                let value = msg.getU32();
                let color = msg.getU8();
                text = msg.getString();

                let animatedText = new AnimatedText;
                animatedText.setColor(color);
                animatedText.setText(value.toString());
                g_map.addThing(animatedText, pos);
                break;
            }
            case MessageMode.MessageInvalid:
                Log.error("unknown message mode %d", mode);
                break;
            default:
                text = msg.getString();
                break;
        }

        //g_game.processTextMessage(mode, text);
    }

    parseCancelWalk(msg: InputMessage) {
        let direction: Direction = msg.getU8();

        //g_game.processWalkCancel(direction);
    }

    parseWalkWait(msg: InputMessage) {
        let millis = msg.getU16();
        //m_localPlayer.lockWalk(millis);
    }

    parseFloorChangeUp(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        let range = g_map.getAwareRange();
        pos.z--;

        let skip = 0;
        if (pos.z == Otc.SEA_FLOOR)
            for (let i = Otc.SEA_FLOOR - Otc.AWARE_UNDEGROUND_FLOOR_RANGE; i >= 0; i--)
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), 8 - i, skip);
        else if (pos.z > Otc.SEA_FLOOR)
            skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z - Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), 3, skip);

        pos.x++;
        pos.y++;
        g_map.setCentralPosition(pos);
    }

    parseFloorChangeDown(msg: InputMessage) {
        let pos: Position;
        if (g_game.getFeature(GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = g_map.getCentralPosition();
        let range = g_map.getAwareRange();
        pos.z++;

        let skip = 0;
        if (pos.z == Otc.UNDERGROUND_FLOOR) {
            let j, i;
            for (i = pos.z, j = -1; i <= pos.z + Otc.AWARE_UNDEGROUND_FLOOR_RANGE; ++i, --j)
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), j, skip);
        }
        else if (pos.z > Otc.UNDERGROUND_FLOOR && pos.z < Otc.MAX_Z - 1)
            skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z + Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), -3, skip);

        pos.x--;
        pos.y--;
        g_map.setCentralPosition(pos);
    }

    parseOpenOutfitWindow(msg: InputMessage) {
        let currentOutfit = this.getOutfit(msg);
        let outfitList = [];

        if (g_game.getFeature(GameFeature.GameNewOutfitProtocol)) {
            let outfitCount = msg.getU8();
            for (let i = 0; i < outfitCount; i++) {
                let outfitId = msg.getU16();
                let outfitName = msg.getString();
                let outfitAddons = msg.getU8();

                outfitList.push([outfitId, outfitName, outfitAddons]);
            }
        } else {
            let outfitStart, outfitEnd;
            if (g_game.getFeature(GameFeature.GameLooktypeU16)) {
                outfitStart = msg.getU16();
                outfitEnd = msg.getU16();
            } else {
                outfitStart = msg.getU8();
                outfitEnd = msg.getU8();
            }

            for (let i = outfitStart; i <= outfitEnd; i++)
                outfitList.push([i, "", 0]);
        }

        let mountList = [];
        if (g_game.getFeature(GameFeature.GamePlayerMounts)) {
            let mountCount = msg.getU8();
            for (let i = 0; i < mountCount; ++i) {
                let mountId = msg.getU16(); // mount type
                let mountName = msg.getString(); // mount name

                mountList.push([mountId, mountName]);
            }
        }

        //g_game.processOpenOutfitWindow(currentOutfit, outfitList, mountList);
    }

    parseVipAdd(msg: InputMessage) {
        let id, iconId = 0, status;
        let name, desc = "";
        let notifyLogin = false;

        id = msg.getU32();
        name = g_game.formatCreatureName(msg.getString());
        if (g_game.getFeature(GameFeature.GameAdditionalVipInfo)) {
            desc = msg.getString();
            iconId = msg.getU32();
            notifyLogin = msg.getU8() > 0;
        }
        status = msg.getU8();

        //g_game.processVipAdd(id, name, status, desc, iconId, notifyLogin);
    }

    parseVipState(msg: InputMessage) {
        let id = msg.getU32();
        if (g_game.getFeature(GameFeature.GameLoginPending)) {
            let status = msg.getU8();
            //g_game.processVipStateChange(id, status);
        }
        else {
            //g_game.processVipStateChange(id, 1);
        }
    }

    parseVipLogout(msg: InputMessage) {
        let id = msg.getU32();
        //g_game.processVipStateChange(id, 0);
    }

    parseTutorialHint(msg: InputMessage) {
        let id = msg.getU8();
        //g_game.processTutorialHint(id);
    }

    parseAutomapFlag(msg: InputMessage) {
        let pos = this.getPosition(msg);
        let icon = msg.getU8();
        let description = msg.getString();

        let remove = false;
        if (g_game.getFeature(GameFeature.GameMinimapRemove))
            remove = msg.getU8() != 0;

        if (!remove) {
            //g_game.processAddAutomapFlag(pos, icon, description);
        }
        else {
            //g_game.processRemoveAutomapFlag(pos, icon, description);
        }
    }

    parseQuestLog(msg: InputMessage) {
        let questList = [];
        let questsCount = msg.getU16();
        for (let i = 0; i < questsCount; i++) {
            let id = msg.getU16();
            let name = msg.getString();
            let completed = msg.getU8();
            questList.push([id, name, completed]);
        }

        //g_game.processQuestLog(questList);
    }

    parseQuestLine(msg: InputMessage) {
        let questMissions = [];
        let questId = msg.getU16();
        let missionCount = msg.getU8();
        for (let i = 0; i < missionCount; i++) {
            let missionName = msg.getString();
            let missionDescrition = msg.getString();
            questMissions.push([missionName, missionDescrition]);
        }

        //g_game.processQuestLine(questId, questMissions);
    }

    parseChannelEvent(msg: InputMessage) {
        msg.getU16(); // channel id
        g_game.formatCreatureName(msg.getString()); // player name
        msg.getU8(); // event type
    }

    parseItemInfo(msg: InputMessage) {
        let list = [];
        let size = msg.getU8();
        for (let i = 0; i < size; ++i) {
            let item = new Item();
            item.setId(msg.getU16());
            item.setCountOrSubType(msg.getU8());

            let desc = msg.getString();
            list.push([item, desc]);
        }

        //g_lua.callGlobalField("g_game", "onItemInfo", list);
    }

    parsePlayerInventory(msg: InputMessage) {
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

    parseModalDialog(msg: InputMessage) {
        let id = msg.getU32();
        let title = msg.getString();
        let message = msg.getString();

        let sizeButtons = msg.getU8();
        let buttonList = [];
        for (let i = 0; i < sizeButtons; ++i) {
            let value = msg.getString();
            let id = msg.getU8();
            buttonList.push([id, value]);
        }

        let sizeChoices = msg.getU8();
        let choiceList;
        for (let i = 0; i < sizeChoices; ++i) {
            let value = msg.getString();
            let id = msg.getU8();
            choiceList.push_back([id, value]);
        }

        let enterButton, escapeButton;
        if (g_game.getClientVersion() > 970) {
            escapeButton = msg.getU8();
            enterButton = msg.getU8();
        }
        else {
            enterButton = msg.getU8();
            escapeButton = msg.getU8();
        }

        let priority = msg.getU8() == 0x01;

        //g_game.processModalDialog(id, title, message, buttonList, enterButton, escapeButton, choiceList, priority);
    }

    parseExtendedOpcode(msg: InputMessage) {
        let opcode = msg.getU8();
        let buffer = msg.getString();
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

    parseChangeMapAwareRange(msg: InputMessage) {
        let xrange = msg.getU8();
        let yrange = msg.getU8();

        let range = new AwareRange();
        range.left = xrange / 2 - ((xrange + 1) % 2);
        range.right = xrange / 2;
        range.top = yrange / 2 - ((yrange + 1) % 2);
        range.bottom = yrange / 2;

        g_map.setAwareRange(range);
        //g_lua.callGlobalField("g_game", "onMapChangeAwareRange", xrange, yrange);
    }

    parseCreaturesMark(msg: InputMessage) {
        let len;
        if (g_game.getClientVersion() >= 1035) {
            len = 1;
        } else {
            len = msg.getU8();
        }

        for (let i = 0; i < len; ++i) {
            let id = msg.getU32();
            let isPermanent = msg.getU8() != 1;
            let markType = msg.getU8();

            let creature = g_map.getCreatureById(id);
            if (creature) {
                if (isPermanent) {
                    if (markType == 0xff)
                        creature.hideStaticSquare();
                    else
                        creature.showStaticSquare(Color.from8bit(markType));
                } else
                    creature.addTimedSquare(markType);
            } else
                Log.error("could not get creature");
        }
    }

    parseCreatureType(msg: InputMessage) {
        let id = msg.getU32();
        let type = msg.getU8();

        let creature = g_map.getCreatureById(id);
        if (creature)
            creature.setType(type);
        else
            Log.error("could not get creature");
    }

    setMapDescription(msg: InputMessage, x: number, y: number, z: number, width: number, height: number) {
        let startz;
        let endz;
        let zstep;

        if (z > Otc.SEA_FLOOR) {
            startz = z - Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
            endz = Math.min(z + Otc.AWARE_UNDEGROUND_FLOOR_RANGE, Otc.MAX_Z);
            zstep = 1;
        }
        else {
            startz = Otc.SEA_FLOOR;
            endz = 0;
            zstep = -1;
        }

        let skip = 0;
        for (let nz = startz; nz != endz + zstep; nz += zstep)
            skip = this.setFloorDescription(msg, x, y, nz, width, height, z - nz, skip);
    }


    setFloorDescription(msg: InputMessage, x: number, y: number, z: number, width: number, height: number, offset: number, skip: number): number {
        for (let nx = 0; nx < width; nx++) {
            for (let ny = 0; ny < height; ny++) {
                let tilePos = new Position(x + nx + offset, y + ny + offset, z);
                if (skip == 0)
                    skip = this.setTileDescription(msg, tilePos);
                else {
                    //Log.debug('setFloorDescription - clean', tilePos);
                    g_map.cleanTile(tilePos);
                    skip--;
                }
            }
        }
        return skip;
    }

    setTileDescription(msg: InputMessage, position: Position): number {
        g_map.cleanTile(position);

        let gotEffect = false;
        for (let stackPos = 0; stackPos < 256; stackPos++) {
            if (msg.peekU16() >= 0xff00) {
                //Log.debug('setTileDescription SKIP', position, stackPos, msg.peekU16() & 0xff);
                return msg.getU16() & 0xff;
            }

            if (g_game.getFeature(GameFeature.GameEnvironmentEffect) && !gotEffect) {
                msg.getU16(); // environment effect
                gotEffect = true;
                continue;
            }

            if (stackPos > 10)
                Log.error("too many things, pos=%s, stackpos=%d", position, stackPos);

            let thing = this.getThing(msg);
            g_map.addThing(thing, position, stackPos);
        }

        return 0;
    }

    getOutfit(msg: InputMessage): Outfit {
        let outfit = new Outfit();

        let lookType: number;
        if (g_game.getFeature(GameFeature.GameLooktypeU16))
            lookType = msg.getU16();
        else
            lookType = msg.getU8();

        if (lookType != 0) {
            outfit.setCategory(ThingCategory.ThingCategoryCreature);
            let head = msg.getU8();
            let body = msg.getU8();
            let legs = msg.getU8();
            let feet = msg.getU8();
            let addons = 0;
            if (g_game.getFeature(GameFeature.GamePlayerAddons))
                addons = msg.getU8();

            if (!g_things.isValidDatId(lookType, ThingCategory.ThingCategoryCreature)) {
                Log.error("invalid outfit looktype %d", lookType);
                lookType = 0;
            }

            outfit.setId(lookType);
            outfit.setHead(head);
            outfit.setBody(body);
            outfit.setLegs(legs);
            outfit.setFeet(feet);
            outfit.setAddons(addons);
        }
        else {
            let lookTypeEx = msg.getU16();
            if (lookTypeEx == 0) {
                outfit.setCategory(ThingCategory.ThingCategoryEffect);
                outfit.setAuxId(13); // invisible effect id
            }
            else {
                if (!g_things.isValidDatId(lookTypeEx, ThingCategory.ThingCategoryItem)) {
                    Log.error("invalid outfit looktypeex %d", lookTypeEx);
                    lookTypeEx = 0;
                }
                outfit.setCategory(ThingCategory.ThingCategoryItem);
                outfit.setAuxId(lookTypeEx);
            }
        }

        if (g_game.getFeature(GameFeature.GamePlayerMounts)) {
            let mount = msg.getU16();
            outfit.setMount(mount);
        }

        return outfit;
    }

    getThing(msg: InputMessage): Thing {
        let thing = new Thing();

        let id = msg.getU16();

        if (id == 0)
            Log.error("invalid thing id");
        else if (id == Proto.UnknownCreature || id == Proto.OutdatedCreature || id == Proto.Creature)
            thing = this.getCreature(msg, id);
        else if (id == Proto.StaticText) // otclient only
            thing = this.getStaticText(msg, id);
        else // item
            thing = this.getItem(msg, id);

        return thing;
    }

    getMappedThing(msg: InputMessage): Thing {
        let thing;
        let x = msg.getU16();

        if (x != 0xffff) {
            let pos = new Position();
            pos.x = x;
            pos.y = msg.getU16();
            pos.z = msg.getU8();
            let stackpos = msg.getU8();
            thing = g_map.getThing(pos, stackpos);
            if (!thing) {
                Log.error("no thing at pos:%s, stackpos:%d", pos, stackpos, g_map.getTile(pos));
                throw new Error('no thing');
            }
        } else {
            let id = msg.getU32();
            thing = g_map.getCreatureById(id);
            if (!thing)
                Log.error("no creature with id %u", id);
        }

        return thing;
    }

    getCreature(msg: InputMessage, type: number): Creature {
        //Log.debug('getCreature', type, msg);
        if (type == 0)
            type = msg.getU16();

        let creature: Creature;
        let known = (type != Proto.UnknownCreature);
        if (type == Proto.OutdatedCreature || type == Proto.UnknownCreature) {
            if (known) {
                let id = msg.getU32();
                creature = g_map.getCreatureById(id);
                if (!creature)
                    Log.error("server said that a creature is known, but it's not");
            } else {
                let removeId = msg.getU32();
                g_map.removeCreatureById(removeId);

                let id = msg.getU32();

                let creatureType;
                if (g_game.getClientVersion() >= 910)
                    creatureType = msg.getU8();
                else {
                    if (id >= Proto.PlayerStartId && id < Proto.PlayerEndId)
                        creatureType = Proto.CreatureTypePlayer;
                    else if (id >= Proto.MonsterStartId && id < Proto.MonsterEndId)
                        creatureType = Proto.CreatureTypeMonster;
                    else
                        creatureType = Proto.CreatureTypeNpc;
                }

                let name = g_game.formatCreatureName(msg.getString());

                if (id == this.m_localPlayer.getId())
                    creature = this.m_localPlayer;
                else if (creatureType == Proto.CreatureTypePlayer) {
                    // fixes a bug server side bug where GameInit is not sent and local player id is unknown
                    if (this.m_localPlayer.getId() == 0 && name == this.m_localPlayer.getName())
                        creature = this.m_localPlayer;
                    else
                        creature = new Player();
                }
                else if (creatureType == Proto.CreatureTypeMonster)
                    creature = new Monster();
                else if (creatureType == Proto.CreatureTypeNpc)
                    creature = new Npc();
                else
                    Log.error("creature type is invalid");

                if (creature) {
                    creature.setId(id);
                    creature.setName(name);

                    g_map.addCreature(creature);
                }
            }

            let healthPercent = msg.getU8();
            let direction: Direction = msg.getU8();
            let outfit: Outfit = this.getOutfit(msg);

            let light = new Light();
            light.intensity = msg.getU8();
            light.color = msg.getU8();

            let speed = msg.getU16();
            let skull = msg.getU8();
            let shield = msg.getU8();

            // emblem is sent only when the creature is not known
            let emblem = -1;
            let creatureType = -1;
            let icon = -1;
            let unpass = true;
            let mark;

            if (g_game.getFeature(GameFeature.GameCreatureEmblems) && !known)
                emblem = msg.getU8();

            if (g_game.getFeature(GameFeature.GameThingMarks)) {
                creatureType = msg.getU8();
            }

            if (g_game.getFeature(GameFeature.GameCreatureIcons)) {
                icon = msg.getU8();
            }

            if (g_game.getFeature(GameFeature.GameThingMarks)) {
                mark = msg.getU8(); // mark
                msg.getU16(); // helpers

                if (creature) {
                    if (mark == 0xff)
                        creature.hideStaticSquare();
                    else
                        creature.showStaticSquare(Color.from8bit(mark));
                }
            }

            if (g_game.getClientVersion() >= 854)
                unpass = msg.getU8() > 0;

            if (creature) {
                creature.setHealthPercent(healthPercent);
                creature.setDirection(direction);
                creature.setOutfit(outfit);
                creature.setSpeed(speed);
                creature.setSkull(skull);
                creature.setShield(shield);
                creature.setPassable(!unpass);
                creature.setLight(light);

                if (emblem != -1)
                    creature.setEmblem(emblem);

                if (creatureType != -1)
                    creature.setType(creatureType);

                if (icon != -1)
                    creature.setIcon(icon);

                if (creature == this.m_localPlayer && !this.m_localPlayer.isKnown())
                    this.m_localPlayer.setKnown(true);
            }
        } else if (type == Proto.Creature) {
            let id = msg.getU32();
            creature = g_map.getCreatureById(id);

            if (!creature)
                Log.error("invalid creature");

            let direction: Direction = msg.getU8();
            if (creature)
                creature.turn(direction);

            if (g_game.getClientVersion() >= 953) {
                let unpass = msg.getU8();

                if (creature)
                    creature.setPassable(!unpass);
            }

        } else {
            Log.error("invalid creature opcode");
        }

        return creature;
    }

    getItem(msg: InputMessage, id: number = 0): Item {
        if (id == 0)
            id = msg.getU16();

        //Log.debug('getItem', id);
        let item = new Item(id);
        if (item.getId() == 0)
            Log.error("unable to create item with invalid id %d", id);

        if (g_game.getFeature(GameFeature.GameThingMarks)) {
            msg.getU8(); // mark
        }

        if (item.isStackable() || item.isFluidContainer() || item.isSplash() || item.isChargeable())
            item.setCountOrSubType(msg.getU8());

        if (g_game.getFeature(GameFeature.GameItemAnimationPhase)) {
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

    getStaticText(msg: InputMessage, id: number): StaticText {
        let colorByte = msg.getU8();
        let color: Color = Color.from8bit(colorByte);
        let fontName = msg.getString();
        let text = msg.getString();
        let staticText: StaticText = new StaticText();
        /*
        staticText.setText(text);
        staticText.setFont(fontName);
        staticText.setColor(color);
        */
        return staticText;
    }

    getPosition(msg: InputMessage): Position {
        let x = msg.getU16();
        let y = msg.getU16();
        let z = msg.getU8();

        return new Position(x, y, z);
    }

    getLocalPlayer(): LocalPlayer {
        return this.m_localPlayer;
    }
}
