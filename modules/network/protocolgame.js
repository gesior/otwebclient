"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var protocol_1 = require("./protocol");
var game_1 = require("../game");
var const_1 = require("../constants/const");
var log_1 = require("../log");
var outputmessage_1 = require("./outputmessage");
var proto_1 = require("../constants/proto");
var outfit_1 = require("../outfit");
var thing_1 = require("../thing");
var position_1 = require("../position");
var item_1 = require("../item");
var statictext_1 = require("../statictext");
var structures_1 = require("../structures");
var thingtypemanager_1 = require("../thingtypemanager");
var map_1 = require("../map");
var effect_1 = require("../effect");
var animatedtext_1 = require("../animatedtext");
var missile_1 = require("../missile");
var color_1 = require("../color");
var player_1 = require("../player");
var ProtocolGame = /** @class */ (function (_super) {
    __extends(ProtocolGame, _super);
    function ProtocolGame(game) {
        var _this = _super.call(this) || this;
        _this.m_localPlayer = null;
        _this.m_gameInitialized = false;
        _this.m_mapKnown = false;
        return _this;
    }
    ProtocolGame.prototype.login = function (accountName, accountPassword, host, port, characterName, authenticatorToken, sessionKey) {
        this.m_firstRecv = false;
        this.m_accountName = accountName;
        this.m_accountPassword = accountPassword;
        this.m_authenticatorToken = authenticatorToken;
        this.m_sessionKey = sessionKey;
        this.m_characterName = characterName;
        this.connect(host, port);
    };
    ProtocolGame.prototype.onConnect = function () {
        this.m_firstRecv = true;
        _super.prototype.onConnect.call(this, null);
        this.m_localPlayer = game_1.g_game.getLocalPlayer();
        if (game_1.g_game.getFeature(const_1.GameFeature.GameProtocolChecksum))
            this.enableChecksum();
        if (!game_1.g_game.getFeature(const_1.GameFeature.GameChallengeOnLogin))
            this.sendLoginPacket(0, 0);
    };
    ProtocolGame.prototype.onRecv = function (inputMessage) {
        log_1.log("Game onRecv", inputMessage);
        if (this.m_firstRecv) {
            this.m_firstRecv = false;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameMessageSizeCheck)) {
                var size = inputMessage.getU16();
                if (size != inputMessage.getUnreadSize()) {
                    log_1.error("invalid message size");
                    return;
                }
            }
        }
        this.parseMessage(inputMessage);
    };
    ProtocolGame.prototype.onError = function (evt) {
        game_1.g_game.processConnectionError();
        this.disconnect();
    };
    ProtocolGame.prototype.sendLoginPacket = function (challengeTimestamp, challengeRandom) {
        var msg = new outputmessage_1.OutputMessage();
        msg.addU8(proto_1.Proto.ClientPendingGame);
        msg.addU16(game_1.g_game.getOs());
        msg.addU16(game_1.g_game.getProtocolVersion());
        msg.addU8(1);
        msg.addString('1311');
        msg.addString('GOD Gesior');
        msg.addString('npass123');
        msg.addU8(0); // RSA start
        msg.addU32(challengeTimestamp);
        msg.addU8(challengeRandom);
        if (game_1.g_game.getFeature(const_1.GameFeature.GameProtocolChecksum))
            this.enableChecksum();
        this.send(msg);
        if (game_1.g_game.getFeature(const_1.GameFeature.GameLoginPacketEncryption))
            this.enableXteaEncryption();
    };
    ProtocolGame.prototype.parseMessage = function (msg) {
        var opcode = -1;
        var prevOpcode = -1;
        try {
            while (msg.getUnreadSize() > 0) {
                opcode = msg.getU8();
                if (!game_1.g_game.getFeature(const_1.GameFeature.GameLoginPending)) {
                    if (!this.m_gameInitialized && opcode > proto_1.Proto.GameServerFirstGameOpcode) {
                        game_1.g_game.processGameStart();
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
                    case proto_1.Proto.GameServerLoginOrPendingState:
                        /*
                        if(g_game.getFeature(GameFeature.GameLoginPending))
                            this.parsePendingGame(msg);
                        else
                        */
                        this.parseLogin(msg);
                        break;
                    case proto_1.Proto.GameServerGMActions:
                        this.parseGMActions(msg);
                        break;
                    case proto_1.Proto.GameServerUpdateNeeded:
                        this.parseUpdateNeeded(msg);
                        break;
                    case proto_1.Proto.GameServerLoginError:
                        this.parseLoginError(msg);
                        break;
                    case proto_1.Proto.GameServerLoginAdvice:
                        this.parseLoginAdvice(msg);
                        break;
                    case proto_1.Proto.GameServerLoginWait:
                        this.parseLoginWait(msg);
                        break;
                    case proto_1.Proto.GameServerLoginToken:
                        this.parseLoginToken(msg);
                        break;
                    case proto_1.Proto.GameServerPing:
                    case proto_1.Proto.GameServerPingBack:
                        if ((opcode == proto_1.Proto.GameServerPing && game_1.g_game.getFeature(const_1.GameFeature.GameClientPing)) ||
                            (opcode == proto_1.Proto.GameServerPingBack && !game_1.g_game.getFeature(const_1.GameFeature.GameClientPing)))
                            this.parsePingBack(msg);
                        else
                            this.parsePing(msg);
                        break;
                    case proto_1.Proto.GameServerChallenge:
                        this.parseChallenge(msg);
                        break;
                    case proto_1.Proto.GameServerDeath:
                        this.parseDeath(msg);
                        break;
                    case proto_1.Proto.GameServerFullMap:
                        this.parseMapDescription(msg);
                        break;
                    case proto_1.Proto.GameServerMapTopRow:
                        this.parseMapMoveNorth(msg);
                        break;
                    case proto_1.Proto.GameServerMapRightRow:
                        this.parseMapMoveEast(msg);
                        break;
                    case proto_1.Proto.GameServerMapBottomRow:
                        this.parseMapMoveSouth(msg);
                        break;
                    case proto_1.Proto.GameServerMapLeftRow:
                        this.parseMapMoveWest(msg);
                        break;
                    case proto_1.Proto.GameServerUpdateTile:
                        this.parseUpdateTile(msg);
                        break;
                    case proto_1.Proto.GameServerCreateOnMap:
                        this.parseTileAddThing(msg);
                        break;
                    case proto_1.Proto.GameServerChangeOnMap:
                        this.parseTileTransformThing(msg);
                        break;
                    case proto_1.Proto.GameServerDeleteOnMap:
                        this.parseTileRemoveThing(msg);
                        break;
                    case proto_1.Proto.GameServerMoveCreature:
                        this.parseCreatureMove(msg);
                        break;
                    case proto_1.Proto.GameServerOpenContainer:
                        this.parseOpenContainer(msg);
                        break;
                    case proto_1.Proto.GameServerCloseContainer:
                        this.parseCloseContainer(msg);
                        break;
                    case proto_1.Proto.GameServerCreateContainer:
                        this.parseContainerAddItem(msg);
                        break;
                    case proto_1.Proto.GameServerChangeInContainer:
                        this.parseContainerUpdateItem(msg);
                        break;
                    case proto_1.Proto.GameServerDeleteInContainer:
                        this.parseContainerRemoveItem(msg);
                        break;
                    case proto_1.Proto.GameServerSetInventory:
                        this.parseAddInventoryItem(msg);
                        break;
                    case proto_1.Proto.GameServerDeleteInventory:
                        this.parseRemoveInventoryItem(msg);
                        break;
                    case proto_1.Proto.GameServerOpenNpcTrade:
                        this.parseOpenNpcTrade(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerGoods:
                        this.parsePlayerGoods(msg);
                        break;
                    case proto_1.Proto.GameServerCloseNpcTrade:
                        this.parseCloseNpcTrade(msg);
                        break;
                    case proto_1.Proto.GameServerOwnTrade:
                        this.parseOwnTrade(msg);
                        break;
                    case proto_1.Proto.GameServerCounterTrade:
                        this.parseCounterTrade(msg);
                        break;
                    case proto_1.Proto.GameServerCloseTrade:
                        this.parseCloseTrade(msg);
                        break;
                    case proto_1.Proto.GameServerAmbient:
                        this.parseWorldLight(msg);
                        break;
                    case proto_1.Proto.GameServerGraphicalEffect:
                        this.parseMagicEffect(msg);
                        break;
                    case proto_1.Proto.GameServerTextEffect:
                        this.parseAnimatedText(msg);
                        break;
                    case proto_1.Proto.GameServerMissleEffect:
                        this.parseDistanceMissile(msg);
                        break;
                    case proto_1.Proto.GameServerMarkCreature:
                        this.parseCreatureMark(msg);
                        break;
                    case proto_1.Proto.GameServerTrappers:
                        this.parseTrappers(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureHealth:
                        this.parseCreatureHealth(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureLight:
                        this.parseCreatureLight(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureOutfit:
                        this.parseCreatureOutfit(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureSpeed:
                        this.parseCreatureSpeed(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureSkull:
                        this.parseCreatureSkulls(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureParty:
                        this.parseCreatureShields(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureUnpass:
                        this.parseCreatureUnpass(msg);
                        break;
                    case proto_1.Proto.GameServerEditText:
                        this.parseEditText(msg);
                        break;
                    case proto_1.Proto.GameServerEditList:
                        this.parseEditList(msg);
                        break;
                    // PROTOCOL>=1038
                    case proto_1.Proto.GameServerPremiumTrigger:
                        this.parsePremiumTrigger(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerData:
                        this.parsePlayerStats(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerSkills:
                        this.parsePlayerSkills(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerState:
                        this.parsePlayerState(msg);
                        break;
                    case proto_1.Proto.GameServerClearTarget:
                        this.parsePlayerCancelAttack(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerModes:
                        this.parsePlayerModes(msg);
                        break;
                    case proto_1.Proto.GameServerTalk:
                        this.parseTalk(msg);
                        break;
                    case proto_1.Proto.GameServerChannels:
                        this.parseChannelList(msg);
                        break;
                    case proto_1.Proto.GameServerOpenChannel:
                        this.parseOpenChannel(msg);
                        break;
                    case proto_1.Proto.GameServerOpenPrivateChannel:
                        this.parseOpenPrivateChannel(msg);
                        break;
                    case proto_1.Proto.GameServerRuleViolationChannel:
                        this.parseRuleViolationChannel(msg);
                        break;
                    case proto_1.Proto.GameServerRuleViolationRemove:
                        this.parseRuleViolationRemove(msg);
                        break;
                    case proto_1.Proto.GameServerRuleViolationCancel:
                        this.parseRuleViolationCancel(msg);
                        break;
                    case proto_1.Proto.GameServerRuleViolationLock:
                        this.parseRuleViolationLock(msg);
                        break;
                    case proto_1.Proto.GameServerOpenOwnChannel:
                        this.parseOpenOwnPrivateChannel(msg);
                        break;
                    case proto_1.Proto.GameServerCloseChannel:
                        this.parseCloseChannel(msg);
                        break;
                    case proto_1.Proto.GameServerTextMessage:
                        this.parseTextMessage(msg);
                        break;
                    case proto_1.Proto.GameServerCancelWalk:
                        this.parseCancelWalk(msg);
                        break;
                    case proto_1.Proto.GameServerWalkWait:
                        this.parseWalkWait(msg);
                        break;
                    case proto_1.Proto.GameServerFloorChangeUp:
                        this.parseFloorChangeUp(msg);
                        break;
                    case proto_1.Proto.GameServerFloorChangeDown:
                        this.parseFloorChangeDown(msg);
                        break;
                    case proto_1.Proto.GameServerChooseOutfit:
                        this.parseOpenOutfitWindow(msg);
                        break;
                    case proto_1.Proto.GameServerVipAdd:
                        this.parseVipAdd(msg);
                        break;
                    case proto_1.Proto.GameServerVipState:
                        this.parseVipState(msg);
                        break;
                    case proto_1.Proto.GameServerVipLogout:
                        this.parseVipLogout(msg);
                        break;
                    case proto_1.Proto.GameServerTutorialHint:
                        this.parseTutorialHint(msg);
                        break;
                    case proto_1.Proto.GameServerAutomapFlag:
                        this.parseAutomapFlag(msg);
                        break;
                    case proto_1.Proto.GameServerQuestLog:
                        this.parseQuestLog(msg);
                        break;
                    case proto_1.Proto.GameServerQuestLine:
                        this.parseQuestLine(msg);
                        break;
                    // PROTOCOL>=870
                    case proto_1.Proto.GameServerSpellDelay:
                        this.parseSpellCooldown(msg);
                        break;
                    case proto_1.Proto.GameServerSpellGroupDelay:
                        this.parseSpellGroupCooldown(msg);
                        break;
                    case proto_1.Proto.GameServerMultiUseDelay:
                        this.parseMultiUseCooldown(msg);
                        break;
                    // PROTOCOL>=910
                    case proto_1.Proto.GameServerChannelEvent:
                        this.parseChannelEvent(msg);
                        break;
                    case proto_1.Proto.GameServerItemInfo:
                        this.parseItemInfo(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerInventory:
                        this.parsePlayerInventory(msg);
                        break;
                    // PROTOCOL>=950
                    case proto_1.Proto.GameServerPlayerDataBasic:
                        this.parsePlayerInfo(msg);
                        break;
                    // PROTOCOL>=970
                    case proto_1.Proto.GameServerModalDialog:
                        this.parseModalDialog(msg);
                        break;
                    // PROTOCOL>=980
                    case proto_1.Proto.GameServerLoginSuccess:
                        this.parseLogin(msg);
                        break;
                    case proto_1.Proto.GameServerEnterGame:
                        this.parseEnterGame(msg);
                        break;
                    case proto_1.Proto.GameServerPlayerHelpers:
                        this.parsePlayerHelpers(msg);
                        break;
                    // PROTOCOL>=1000
                    case proto_1.Proto.GameServerCreatureMarks:
                        this.parseCreaturesMark(msg);
                        break;
                    case proto_1.Proto.GameServerCreatureType:
                        this.parseCreatureType(msg);
                        break;
                    // PROTOCOL>=1055
                    case proto_1.Proto.GameServerBlessings:
                        this.parseBlessings(msg);
                        break;
                    case proto_1.Proto.GameServerUnjustifiedStats:
                        this.parseUnjustifiedStats(msg);
                        break;
                    case proto_1.Proto.GameServerPvpSituations:
                        this.parsePvpSituations(msg);
                        break;
                    case proto_1.Proto.GameServerPreset:
                        this.parsePreset(msg);
                        break;
                    // PROTOCOL>=1080
                    case proto_1.Proto.GameServerCoinBalanceUpdating:
                        this.parseCoinBalanceUpdating(msg);
                        break;
                    case proto_1.Proto.GameServerCoinBalance:
                        this.parseCoinBalance(msg);
                        break;
                    case proto_1.Proto.GameServerRequestPurchaseData:
                        this.parseRequestPurchaseData(msg);
                        break;
                    case proto_1.Proto.GameServerStoreCompletePurchase:
                        this.parseCompleteStorePurchase(msg);
                        break;
                    case proto_1.Proto.GameServerStoreOffers:
                        this.parseStoreOffers(msg);
                        break;
                    case proto_1.Proto.GameServerStoreTransactionHistory:
                        this.parseStoreTransactionHistory(msg);
                        break;
                    case proto_1.Proto.GameServerStoreError:
                        this.parseStoreError(msg);
                        break;
                    case proto_1.Proto.GameServerStore:
                        this.parseStore(msg);
                        break;
                    // PROTOCOL>=1097
                    case proto_1.Proto.GameServerStoreButtonIndicators:
                        this.parseStoreButtonIndicators(msg);
                        break;
                    case proto_1.Proto.GameServerSetStoreDeepLink:
                        this.parseSetStoreDeepLink(msg);
                        break;
                    // otclient ONLY
                    case proto_1.Proto.GameServerExtendedOpcode:
                        this.parseExtendedOpcode(msg);
                        break;
                    case proto_1.Proto.GameServerChangeMapAwareRange:
                        this.parseChangeMapAwareRange(msg);
                        break;
                    default:
                        log_1.error("unhandled opcode %d", opcode);
                        break;
                }
                prevOpcode = opcode;
            }
        }
        catch (e) {
            log_1.error("ProtocolGame parse message exception (%d bytes unread, last opcode is %d, prev opcode is %d): %s", msg.getUnreadSize(), opcode, prevOpcode, e);
        }
    };
    ProtocolGame.prototype.sendPingBack = function () {
        console.log('sendPingBack');
        var msg = new outputmessage_1.OutputMessage();
        msg.addU8(proto_1.Proto.ClientPingBack);
        this.send(msg);
    };
    ProtocolGame.prototype.parseLogin = function (msg) {
        var playerId = msg.getU32();
        var serverBeat = msg.getU16();
        var canReportBugs = msg.getU8();
        if (game_1.g_game.getClientVersion() >= 1054)
            msg.getU8(); // can change pvp frame option
        if (game_1.g_game.getClientVersion() >= 1058) {
            var expertModeEnabled = msg.getU8();
            game_1.g_game.setExpertPvpMode(expertModeEnabled);
        }
        if (game_1.g_game.getFeature(const_1.GameFeature.GameIngameStore)) {
            // URL to ingame store images
            msg.getString();
            // premium coin package size
            // e.g you can only buy packs of 25, 50, 75, .. coins in the market
            msg.getU16();
        }
        this.m_localPlayer.setId(playerId);
        game_1.g_game.setServerBeat(serverBeat);
        game_1.g_game.setCanReportBugs(canReportBugs);
        game_1.g_game.processLogin();
    };
    ProtocolGame.prototype.parsePendingGame = function (msg) {
        //set player to pending game state
        game_1.g_game.processPendingGame();
    };
    ProtocolGame.prototype.parseEnterGame = function (msg) {
        //set player to entered game state
        game_1.g_game.processEnterGame();
        if (!this.m_gameInitialized) {
            game_1.g_game.processGameStart();
            this.m_gameInitialized = true;
        }
    };
    ProtocolGame.prototype.parseStoreButtonIndicators = function (msg) {
        msg.getU8(); // unknown
        msg.getU8(); // unknown
    };
    ProtocolGame.prototype.parseSetStoreDeepLink = function (msg) {
        var currentlyFeaturedServiceType = msg.getU8();
    };
    ProtocolGame.prototype.parseBlessings = function (msg) {
        var blessings = msg.getU16();
        this.m_localPlayer.setBlessings(blessings);
    };
    ProtocolGame.prototype.parsePreset = function (msg) {
        var preset = msg.getU32();
    };
    ProtocolGame.prototype.parseRequestPurchaseData = function (msg) {
        var transactionId = msg.getU32();
        var productType = msg.getU8();
    };
    ProtocolGame.prototype.parseStore = function (msg) {
        this.parseCoinBalance(msg);
        // Parse all categories
        var count = msg.getU16();
        for (var i = 0; i < count; i++) {
            var category = msg.getString();
            var description = msg.getString();
            var highlightState = 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameIngameStoreHighlights))
                highlightState = msg.getU8();
            var icons = [];
            var iconCount = msg.getU8();
            for (var i_1 = 0; i_1 < iconCount; i_1++) {
                var icon = msg.getString();
                icons.push(icon);
            }
            // If this is a valid category name then
            // the category we just parsed is a child of that
            var parentCategory = msg.getString();
        }
    };
    ProtocolGame.prototype.parseCoinBalance = function (msg) {
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
    };
    ProtocolGame.prototype.parseCoinBalanceUpdating = function (msg) {
        // coin balance can be updating and might not be accurate
        var isUpdating = msg.getU8() == 1;
    };
    ProtocolGame.prototype.parseCompleteStorePurchase = function (msg) {
        // not used
        msg.getU8();
        var message = msg.getString();
        var coins = msg.getU32();
        var transferableCoins = msg.getU32();
        log_1.log("Purchase Complete: %s", message);
    };
    ProtocolGame.prototype.parseStoreTransactionHistory = function (msg) {
        var currentPage;
        if (game_1.g_game.getClientVersion() <= 1096) {
            currentPage = msg.getU16();
            var hasNextPage = msg.getU8() == 1;
        }
        else {
            currentPage = msg.getU32();
            var pageCount = msg.getU32();
        }
        var entries = msg.getU8();
        for (var i = 0; i < entries; i++) {
            var time = msg.getU16();
            var productType = msg.getU8();
            var coinChange = msg.getU32();
            var productName = msg.getString();
            log_1.log("Time %i, type %i, change %i, product name %s", time, productType, coinChange, productName);
        }
    };
    ProtocolGame.prototype.parseStoreOffers = function (msg) {
        var categoryName = msg.getString();
        var offers = msg.getU16();
        for (var i = 0; i < offers; i++) {
            var offerId = msg.getU32();
            var offerName = msg.getString();
            var offerDescription = msg.getString();
            var price = msg.getU32();
            var highlightState = msg.getU8();
            if (highlightState == 2 && game_1.g_game.getFeature(const_1.GameFeature.GameIngameStoreHighlights) && game_1.g_game.getClientVersion() >= 1097) {
                var saleValidUntilTimestamp = msg.getU32();
                var basePrice = msg.getU32();
            }
            var disabledState = msg.getU8();
            var disabledReason = "";
            if (game_1.g_game.getFeature(const_1.GameFeature.GameIngameStoreHighlights) && disabledState == 1) {
                disabledReason = msg.getString();
            }
            var icons = msg.getU8();
            for (var j = 0; j < icons; j++) {
                var icon = msg.getString();
            }
            var subOffers = msg.getU16();
            for (var j = 0; j < subOffers; j++) {
                var name_1 = msg.getString();
                var description = msg.getString();
                var subIcons = msg.getU8();
                for (var k = 0; k < subIcons; k++) {
                    var icon = msg.getString();
                }
                var serviceType = msg.getString();
            }
        }
    };
    ProtocolGame.prototype.parseStoreError = function (msg) {
        var errorType = msg.getU8();
        var message = msg.getString();
        log_1.error("Store Error: %s [%i]", message, errorType);
    };
    ProtocolGame.prototype.parseUnjustifiedStats = function (msg) {
        var unjustifiedPoints;
        unjustifiedPoints.killsDay = msg.getU8();
        unjustifiedPoints.killsDayRemaining = msg.getU8();
        unjustifiedPoints.killsWeek = msg.getU8();
        unjustifiedPoints.killsWeekRemaining = msg.getU8();
        unjustifiedPoints.killsMonth = msg.getU8();
        unjustifiedPoints.killsMonthRemaining = msg.getU8();
        unjustifiedPoints.skullTime = msg.getU8();
        game_1.g_game.setUnjustifiedPoints(unjustifiedPoints);
    };
    ProtocolGame.prototype.parsePvpSituations = function (msg) {
        var openPvpSituations = msg.getU8();
        game_1.g_game.setOpenPvpSituations(openPvpSituations);
    };
    ProtocolGame.prototype.parsePlayerHelpers = function (msg) {
        var id = msg.getU32();
        var helpers = msg.getU16();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            game_1.g_game.processPlayerHelpers(helpers);
        else
            log_1.error("could not get creature with id %d", id);
    };
    ProtocolGame.prototype.parseGMActions = function (msg) {
        var actions;
        var numViolationReasons;
        if (game_1.g_game.getClientVersion() >= 850)
            numViolationReasons = 20;
        else if (game_1.g_game.getClientVersion() >= 840)
            numViolationReasons = 23;
        else
            numViolationReasons = 32;
        for (var i = 0; i < numViolationReasons; ++i)
            actions.push(msg.getU8());
        game_1.g_game.processGMActions(actions);
    };
    ProtocolGame.prototype.parseUpdateNeeded = function (msg) {
        var signature = msg.getString();
        game_1.g_game.processUpdateNeeded(signature);
    };
    ProtocolGame.prototype.parseLoginError = function (msg) {
        var error = msg.getString();
        game_1.g_game.processLoginError(error);
    };
    ProtocolGame.prototype.parseLoginAdvice = function (msg) {
        var message = msg.getString();
        game_1.g_game.processLoginAdvice(message);
    };
    ProtocolGame.prototype.parseLoginWait = function (msg) {
        var message = msg.getString();
        var time = msg.getU8();
        game_1.g_game.processLoginWait(message, time);
    };
    ProtocolGame.prototype.parseLoginToken = function (msg) {
        var unknown = (msg.getU8() == 0);
        game_1.g_game.processLoginToken(unknown);
    };
    ProtocolGame.prototype.parsePing = function (msg) {
        this.sendPingBack();
    };
    ProtocolGame.prototype.parsePingBack = function (msg) {
        game_1.g_game.processPingBack();
    };
    ProtocolGame.prototype.parseChallenge = function (msg) {
        var timestamp = msg.getU32();
        var random = msg.getU8();
        this.sendLoginPacket(timestamp, random);
    };
    ProtocolGame.prototype.parseDeath = function (msg) {
        var penality = 100;
        var deathType = const_1.DeathType.DeathRegular;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameDeathType))
            deathType = msg.getU8();
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePenalityOnDeath) && deathType == const_1.DeathType.DeathRegular)
            penality = msg.getU8();
        game_1.g_game.processDeath(deathType, penality);
    };
    ProtocolGame.prototype.parseMapDescription = function (msg) {
        var pos = this.getPosition(msg);
        if (!this.m_mapKnown)
            this.m_localPlayer.setPosition(pos);
        map_1.g_map.setCentralPosition(pos);
        var range = map_1.g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), range.vertical());
        if (!this.m_mapKnown) {
            this.m_mapKnown = true;
        }
        //g_dispatcher.addEvent([] { g_lua.callGlobalField("g_game", "onMapDescription"); });
    };
    ProtocolGame.prototype.parseMapMoveNorth = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        pos.y--;
        var range = map_1.g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), 1);
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseMapMoveEast = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        pos.x++;
        var range = map_1.g_map.getAwareRange();
        this.setMapDescription(msg, pos.x + range.right, pos.y - range.top, pos.z, 1, range.vertical());
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseMapMoveSouth = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        pos.y++;
        var range = map_1.g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y + range.bottom, pos.z, range.horizontal(), 1);
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseMapMoveWest = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        pos.x--;
        var range = map_1.g_map.getAwareRange();
        this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, 1, range.vertical());
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseUpdateTile = function (msg) {
        var tilePos = this.getPosition(msg);
        this.setTileDescription(msg, tilePos);
    };
    ProtocolGame.prototype.parseTileAddThing = function (msg) {
        var pos = this.getPosition(msg);
        var stackPos = -1;
        if (game_1.g_game.getClientVersion() >= 841)
            stackPos = msg.getU8();
        var thing = this.getThing(msg);
        map_1.g_map.addThing(thing, pos, stackPos);
    };
    ProtocolGame.prototype.parseTileTransformThing = function (msg) {
        var thing = this.getMappedThing(msg);
        var newThing = this.getThing(msg);
        if (!thing) {
            log_1.error("no thing");
            return;
        }
        var pos = thing.getPosition();
        var stackpos = thing.getStackPos();
        if (!map_1.g_map.removeThing(thing)) {
            log_1.error("unable to remove thing");
            return;
        }
        map_1.g_map.addThing(newThing, pos, stackpos);
    };
    ProtocolGame.prototype.parseTileRemoveThing = function (msg) {
        var thing = this.getMappedThing(msg);
        if (!thing) {
            log_1.error("no thing");
            return;
        }
        if (!map_1.g_map.removeThing(thing))
            log_1.error("unable to remove thing");
    };
    ProtocolGame.prototype.parseCreatureMove = function (msg) {
        var thing = this.getMappedThing(msg);
        var newPos = this.getPosition(msg);
        if (!thing || !thing.isCreature()) {
            log_1.error("no creature found to move");
            return;
        }
        if (!map_1.g_map.removeThing(thing)) {
            log_1.error("unable to remove creature");
            return;
        }
        var creature = thing;
        creature.allowAppearWalk();
        map_1.g_map.addThing(thing, newPos, -1);
    };
    ProtocolGame.prototype.parseOpenContainer = function (msg) {
        var containerId = msg.getU8();
        var containerItem = this.getItem(msg);
        var name = msg.getString();
        var capacity = msg.getU8();
        var hasParent = (msg.getU8() != 0);
        var isUnlocked = true;
        var hasPages = false;
        var containerSize = 0;
        var firstIndex = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameContainerPagination)) {
            isUnlocked = (msg.getU8() != 0); // drag and drop
            hasPages = (msg.getU8() != 0); // pagination
            containerSize = msg.getU16(); // container size
            firstIndex = msg.getU16(); // first index
        }
        var itemCount = msg.getU8();
        var items = [];
        for (var i = 0; i < itemCount; i++)
            items[i] = this.getItem(msg);
        game_1.g_game.processOpenContainer(containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex);
    };
    ProtocolGame.prototype.parseCloseContainer = function (msg) {
        var containerId = msg.getU8();
        game_1.g_game.processCloseContainer(containerId);
    };
    ProtocolGame.prototype.parseContainerAddItem = function (msg) {
        var containerId = msg.getU8();
        var slot = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameContainerPagination)) {
            slot = msg.getU16(); // slot
        }
        var item = this.getItem(msg);
        game_1.g_game.processContainerAddItem(containerId, item, slot);
    };
    ProtocolGame.prototype.parseContainerUpdateItem = function (msg) {
        var containerId = msg.getU8();
        var slot;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameContainerPagination)) {
            slot = msg.getU16();
        }
        else {
            slot = msg.getU8();
        }
        var item = this.getItem(msg);
        game_1.g_game.processContainerUpdateItem(containerId, slot, item);
    };
    ProtocolGame.prototype.parseContainerRemoveItem = function (msg) {
        var containerId = msg.getU8();
        var slot;
        var lastItem;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameContainerPagination)) {
            slot = msg.getU16();
            var itemId = msg.getU16();
            if (itemId != 0)
                lastItem = this.getItem(msg, itemId);
        }
        else {
            slot = msg.getU8();
        }
        game_1.g_game.processContainerRemoveItem(containerId, slot, lastItem);
    };
    ProtocolGame.prototype.parseAddInventoryItem = function (msg) {
        var slot = msg.getU8();
        var item = this.getItem(msg);
        game_1.g_game.processInventoryChange(slot, item);
    };
    ProtocolGame.prototype.parseRemoveInventoryItem = function (msg) {
        var slot = msg.getU8();
        game_1.g_game.processInventoryChange(slot, new item_1.Item());
    };
    ProtocolGame.prototype.parseOpenNpcTrade = function (msg) {
        var items = [];
        var npcName;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameNameOnNpcTrade))
            npcName = msg.getString();
        var listCount;
        if (game_1.g_game.getClientVersion() >= 900)
            listCount = msg.getU16();
        else
            listCount = msg.getU8();
        for (var i = 0; i < listCount; ++i) {
            var itemId = msg.getU16();
            var count = msg.getU8();
            var item = new item_1.Item(itemId);
            item.setCountOrSubType(count);
            var name_2 = msg.getString();
            var weight = msg.getU32();
            var buyPrice = msg.getU32();
            var sellPrice = msg.getU32();
            items.push([item, name_2, weight, buyPrice, sellPrice]);
        }
        game_1.g_game.processOpenNpcTrade(items);
    };
    ProtocolGame.prototype.parsePlayerGoods = function (msg) {
        var goods = [];
        var money;
        if (game_1.g_game.getClientVersion() >= 973)
            money = msg.getU64();
        else
            money = msg.getU32();
        var size = msg.getU8();
        for (var i = 0; i < size; i++) {
            var itemId = msg.getU16();
            var amount = void 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleShopSellAmount))
                amount = msg.getU16();
            else
                amount = msg.getU8();
            goods.push([new item_1.Item(itemId), amount]);
        }
        game_1.g_game.processPlayerGoods(money, goods);
    };
    ProtocolGame.prototype.parseCloseNpcTrade = function (msg) {
        game_1.g_game.processCloseNpcTrade();
    };
    ProtocolGame.prototype.parseOwnTrade = function (msg) {
        var name = game_1.g_game.formatCreatureName(msg.getString());
        var count = msg.getU8();
        var items = [];
        for (var i = 0; i < count; i++)
            items[i] = this.getItem(msg);
        game_1.g_game.processOwnTrade(name, items);
    };
    ProtocolGame.prototype.parseCounterTrade = function (msg) {
        var name = game_1.g_game.formatCreatureName(msg.getString());
        var count = msg.getU8();
        var items = [];
        for (var i = 0; i < count; i++)
            items[i] = this.getItem(msg);
        game_1.g_game.processCounterTrade(name, items);
    };
    ProtocolGame.prototype.parseCloseTrade = function (msg) {
        game_1.g_game.processCloseTrade();
    };
    ProtocolGame.prototype.parseWorldLight = function (msg) {
        var light = new structures_1.Light();
        light.intensity = msg.getU8();
        light.color = msg.getU8();
        map_1.g_map.setLight(light);
    };
    ProtocolGame.prototype.parseMagicEffect = function (msg) {
        var pos = this.getPosition(msg);
        var effectId;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMagicEffectU16))
            effectId = msg.getU16();
        else
            effectId = msg.getU8();
        if (!thingtypemanager_1.g_things.isValidDatId(effectId, const_1.ThingCategory.ThingCategoryEffect)) {
            log_1.error("invalid effect id %d", effectId);
            return;
        }
        var effect = new effect_1.Effect();
        effect.setId(effectId);
        map_1.g_map.addThing(effect, pos);
    };
    ProtocolGame.prototype.parseAnimatedText = function (msg) {
        var position = this.getPosition(msg);
        var color = msg.getU8();
        var text = msg.getString();
        var animatedText = new animatedtext_1.AnimatedText();
        animatedText.setColor(color);
        animatedText.setText(text);
        map_1.g_map.addThing(animatedText, position);
    };
    ProtocolGame.prototype.parseDistanceMissile = function (msg) {
        var fromPos = this.getPosition(msg);
        var toPos = this.getPosition(msg);
        var shotId = msg.getU8();
        if (!thingtypemanager_1.g_things.isValidDatId(shotId, const_1.ThingCategory.ThingCategoryMissile)) {
            log_1.error("invalid missile id %d", shotId);
            return;
        }
        var missile = new missile_1.Missile();
        missile.setId(shotId);
        missile.setPath(fromPos, toPos);
        map_1.g_map.addThing(missile, fromPos);
    };
    ProtocolGame.prototype.parseCreatureMark = function (msg) {
        var id = msg.getU32();
        var color = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.addTimedSquare(color);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseTrappers = function (msg) {
        var numTrappers = msg.getU8();
        if (numTrappers > 8)
            log_1.error("too many trappers");
        for (var i = 0; i < numTrappers; ++i) {
            var id = msg.getU32();
            var creature = map_1.g_map.getCreatureById(id);
            if (creature) {
                //TODO: set creature as trapper
            }
            else
                log_1.error("could not get creature");
        }
    };
    ProtocolGame.prototype.parseCreatureHealth = function (msg) {
        var id = msg.getU32();
        var healthPercent = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setHealthPercent(healthPercent);
        // some servers has a bug in get spectators and sends unknown creatures updates
        // so this code is disabled
        /*
        else
            g_logger.traceError("could not get creature");
        */
    };
    ProtocolGame.prototype.parseCreatureLight = function (msg) {
        var id = msg.getU32();
        var light = new structures_1.Light();
        light.intensity = msg.getU8();
        light.color = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setLight(light);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseCreatureOutfit = function (msg) {
        var id = msg.getU32();
        var outfit = this.getOutfit(msg);
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setOutfit(outfit);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseCreatureSpeed = function (msg) {
        var id = msg.getU32();
        var baseSpeed = -1;
        if (game_1.g_game.getClientVersion() >= 1059)
            baseSpeed = msg.getU16();
        var speed = msg.getU16();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature) {
            creature.setSpeed(speed);
            if (baseSpeed != -1)
                creature.setBaseSpeed(baseSpeed);
        }
        // some servers has a bug in get spectators and sends unknown creatures updates
        // so this code is disabled
        /*
        else
            g_logger.traceError("could not get creature");
        */
    };
    ProtocolGame.prototype.parseCreatureSkulls = function (msg) {
        var id = msg.getU32();
        var skull = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setSkull(skull);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseCreatureShields = function (msg) {
        var id = msg.getU32();
        var shield = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setShield(shield);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseCreatureUnpass = function (msg) {
        var id = msg.getU32();
        var unpass = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setPassable(!unpass);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.parseEditText = function (msg) {
        var id = msg.getU32();
        var itemId;
        if (game_1.g_game.getClientVersion() >= 1010) {
            // TODO: processEditText with ItemPtr as parameter
            var item = this.getItem(msg);
            itemId = item.getId();
        }
        else
            itemId = msg.getU16();
        var maxLength = msg.getU16();
        var text = msg.getString();
        var writer = msg.getString();
        var date = "";
        if (game_1.g_game.getFeature(const_1.GameFeature.GameWritableDate))
            date = msg.getString();
        //g_game.processEditText(id, itemId, maxLength, text, writer, date);
    };
    ProtocolGame.prototype.parseEditList = function (msg) {
        var doorId = msg.getU8();
        var id = msg.getU32();
        var text = msg.getString();
        //g_game.processEditList(id, doorId, text);
    };
    ProtocolGame.prototype.parsePremiumTrigger = function (msg) {
        var triggerCount = msg.getU8();
        var triggers;
        for (var i = 0; i < triggerCount; ++i) {
            triggers.push_back(msg.getU8());
        }
        if (game_1.g_game.getClientVersion() <= 1096) {
            var something = msg.getU8() == 1;
        }
    };
    ProtocolGame.prototype.parsePlayerInfo = function (msg) {
        var premium = msg.getU8(); // premium
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePremiumExpiration))
            var premiumEx = msg.getU32(); // premium expiration used for premium advertisement
        var vocation = msg.getU8(); // vocation
        var spellCount = msg.getU16();
        var spells;
        for (var i = 0; i < spellCount; ++i)
            spells.push(msg.getU8()); // spell id
        //m_localPlayer.setPremium(premium);
        //m_localPlayer.setVocation(vocation);
        //m_localPlayer.setSpells(spells);
    };
    ProtocolGame.prototype.parsePlayerStats = function (msg) {
        var health;
        var maxHealth;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleHealth)) {
            health = msg.getU32();
            maxHealth = msg.getU32();
        }
        else {
            health = msg.getU16();
            maxHealth = msg.getU16();
        }
        var freeCapacity;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleFreeCapacity))
            freeCapacity = msg.getU32() / 100.0;
        else
            freeCapacity = msg.getU16() / 100.0;
        var totalCapacity = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameTotalCapacity))
            totalCapacity = msg.getU32() / 100.0;
        var experience;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleExperience))
            experience = msg.getU64();
        else
            experience = msg.getU32();
        var level = msg.getU16();
        var levelPercent = msg.getU8();
        if (game_1.g_game.getFeature(const_1.GameFeature.GameExperienceBonus)) {
            if (game_1.g_game.getClientVersion() <= 1096) {
                var experienceBonus = msg.getDouble();
            }
            else {
                var baseXpGain = msg.getU16();
                var voucherAddend = msg.getU16();
                var grindingAddend = msg.getU16();
                var storeBoostAddend = msg.getU16();
                var huntingBoostFactor = msg.getU16();
            }
        }
        var mana;
        var maxMana;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleHealth)) {
            mana = msg.getU32();
            maxMana = msg.getU32();
        }
        else {
            mana = msg.getU16();
            maxMana = msg.getU16();
        }
        var magicLevel = msg.getU8();
        var baseMagicLevel;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameSkillsBase))
            baseMagicLevel = msg.getU8();
        else
            baseMagicLevel = magicLevel;
        var magicLevelPercent = msg.getU8();
        var soul = msg.getU8();
        var stamina = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerStamina))
            stamina = msg.getU16();
        var baseSpeed = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameSkillsBase))
            baseSpeed = msg.getU16();
        var regeneration = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerRegenerationTime))
            regeneration = msg.getU16();
        var training = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameOfflineTrainingTime)) {
            training = msg.getU16();
            if (game_1.g_game.getClientVersion() >= 1097) {
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
    };
    ProtocolGame.prototype.parsePlayerSkills = function (msg) {
        var lastSkill = const_1.Skill.Fishing + 1;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameAdditionalSkills))
            lastSkill = const_1.Skill.LastSkill;
        for (var skill = 0; skill < lastSkill; skill++) {
            var level = void 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameDoubleSkills))
                level = msg.getU16();
            else
                level = msg.getU8();
            var baseLevel = void 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameSkillsBase))
                if (game_1.g_game.getFeature(const_1.GameFeature.GameBaseSkillU16))
                    baseLevel = msg.getU16();
                else
                    baseLevel = msg.getU8();
            else
                baseLevel = level;
            var levelPercent = 0;
            // Critical, Life Leech and Mana Leech have no level percent
            if (skill <= const_1.Skill.Fishing)
                levelPercent = msg.getU8();
            /*
                m_localPlayer.setSkill(skill, level, levelPercent);
                m_localPlayer.setBaseSkill(skill, baseLevel);
                */
        }
    };
    ProtocolGame.prototype.parsePlayerState = function (msg) {
        var states;
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerStateU16))
            states = msg.getU16();
        else
            states = msg.getU8();
        //m_localPlayer.setStates(states);
    };
    ProtocolGame.prototype.parsePlayerCancelAttack = function (msg) {
        var seq = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameAttackSeq))
            seq = msg.getU32();
        //g_game.processAttackCancel(seq);
    };
    ProtocolGame.prototype.parsePlayerModes = function (msg) {
        var fightMode = msg.getU8();
        var chaseMode = msg.getU8();
        var safeMode = msg.getU8();
        var pvpMode = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePVPMode))
            pvpMode = msg.getU8();
        //g_game.processPlayerModes((Otc::FightModes)fightMode, (Otc::ChaseModes)chaseMode, safeMode, (Otc::PVPModes)pvpMode);
    };
    ProtocolGame.prototype.parseSpellCooldown = function (msg) {
        var spellId = msg.getU8();
        var delay = msg.getU32();
        //g_lua.callGlobalField("g_game", "onSpellCooldown", spellId, delay);
    };
    ProtocolGame.prototype.parseSpellGroupCooldown = function (msg) {
        var groupId = msg.getU8();
        var delay = msg.getU32();
        //g_lua.callGlobalField("g_game", "onSpellGroupCooldown", groupId, delay);
    };
    ProtocolGame.prototype.parseMultiUseCooldown = function (msg) {
        var delay = msg.getU32();
        //g_lua.callGlobalField("g_game", "onMultiUseCooldown", delay);
    };
    ProtocolGame.prototype.parseTalk = function (msg) {
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMessageStatements))
            msg.getU32(); // channel statement guid
        var name = game_1.g_game.formatCreatureName(msg.getString());
        var level = 0;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMessageLevel))
            level = msg.getU16();
        var mode = proto_1.Proto.translateMessageModeFromServer(msg.getU8());
        var channelId = 0;
        var pos;
        switch (mode) {
            case const_1.MessageMode.MessageSay:
            case const_1.MessageMode.MessageWhisper:
            case const_1.MessageMode.MessageYell:
            case const_1.MessageMode.MessageMonsterSay:
            case const_1.MessageMode.MessageMonsterYell:
            case const_1.MessageMode.MessageNpcTo:
            case const_1.MessageMode.MessageBarkLow:
            case const_1.MessageMode.MessageBarkLoud:
            case const_1.MessageMode.MessageSpell:
            case const_1.MessageMode.MessageNpcFromStartBlock:
                pos = this.getPosition(msg);
                break;
            case const_1.MessageMode.MessageChannel:
            case const_1.MessageMode.MessageChannelManagement:
            case const_1.MessageMode.MessageChannelHighlight:
            case const_1.MessageMode.MessageGamemasterChannel:
                channelId = msg.getU16();
                break;
            case const_1.MessageMode.MessageNpcFrom:
            case const_1.MessageMode.MessagePrivateFrom:
            case const_1.MessageMode.MessageGamemasterBroadcast:
            case const_1.MessageMode.MessageGamemasterPrivateFrom:
            case const_1.MessageMode.MessageRVRAnswer:
            case const_1.MessageMode.MessageRVRContinue:
                break;
            case const_1.MessageMode.MessageRVRChannel:
                msg.getU32();
                break;
            default:
                log_1.error("unknown message mode %d", mode);
                break;
        }
        var text = msg.getString();
        //g_game.processTalk(name, level, mode, text, channelId, pos);
    };
    ProtocolGame.prototype.parseChannelList = function (msg) {
        var count = msg.getU8();
        var channelList = [];
        for (var i = 0; i < count; i++) {
            var id = msg.getU16();
            var name_3 = msg.getString();
            channelList.push([id, name_3]);
        }
        //g_game.processChannelList(channelList);
    };
    ProtocolGame.prototype.parseOpenChannel = function (msg) {
        var channelId = msg.getU16();
        var name = msg.getString();
        if (game_1.g_game.getFeature(const_1.GameFeature.GameChannelPlayerList)) {
            var joinedPlayers = msg.getU16();
            for (var i = 0; i < joinedPlayers; ++i)
                game_1.g_game.formatCreatureName(msg.getString()); // player name
            var invitedPlayers = msg.getU16();
            for (var i = 0; i < invitedPlayers; ++i)
                game_1.g_game.formatCreatureName(msg.getString()); // player name
        }
        //g_game.processOpenChannel(channelId, name);
    };
    ProtocolGame.prototype.parseOpenPrivateChannel = function (msg) {
        var name = game_1.g_game.formatCreatureName(msg.getString());
        //g_game.processOpenPrivateChannel(name);
    };
    ProtocolGame.prototype.parseOpenOwnPrivateChannel = function (msg) {
        var channelId = msg.getU16();
        var name = msg.getString();
        //g_game.processOpenOwnPrivateChannel(channelId, name);
    };
    ProtocolGame.prototype.parseCloseChannel = function (msg) {
        var channelId = msg.getU16();
        //g_game.processCloseChannel(channelId);
    };
    ProtocolGame.prototype.parseRuleViolationChannel = function (msg) {
        var channelId = msg.getU16();
        //g_game.processRuleViolationChannel(channelId);
    };
    ProtocolGame.prototype.parseRuleViolationRemove = function (msg) {
        var name = msg.getString();
        //g_game.processRuleViolationRemove(name);
    };
    ProtocolGame.prototype.parseRuleViolationCancel = function (msg) {
        var name = msg.getString();
        //g_game.processRuleViolationCancel(name);
    };
    ProtocolGame.prototype.parseRuleViolationLock = function (msg) {
        //g_game.processRuleViolationLock();
    };
    ProtocolGame.prototype.parseTextMessage = function (msg) {
        var code = msg.getU8();
        var mode = proto_1.Proto.translateMessageModeFromServer(code);
        var text;
        switch (mode) {
            case const_1.MessageMode.MessageChannelManagement: {
                var channel = msg.getU16();
                text = msg.getString();
                break;
            }
            case const_1.MessageMode.MessageGuild:
            case const_1.MessageMode.MessagePartyManagement:
            case const_1.MessageMode.MessageParty: {
                var channel = msg.getU16();
                text = msg.getString();
                break;
            }
            case const_1.MessageMode.MessageDamageDealed:
            case const_1.MessageMode.MessageDamageReceived:
            case const_1.MessageMode.MessageDamageOthers: {
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
                    if (value[i] == 0)
                        continue;
                    var animatedText = new animatedtext_1.AnimatedText;
                    animatedText.setColor(color[i]);
                    animatedText.setText(value[i]);
                    map_1.g_map.addThing(animatedText, pos);
                }
                break;
            }
            case const_1.MessageMode.MessageHeal:
            case const_1.MessageMode.MessageMana:
            case const_1.MessageMode.MessageExp:
            case const_1.MessageMode.MessageHealOthers:
            case const_1.MessageMode.MessageExpOthers: {
                var pos = this.getPosition(msg);
                var value = msg.getU32();
                var color = msg.getU8();
                text = msg.getString();
                var animatedText = new animatedtext_1.AnimatedText;
                animatedText.setColor(color);
                animatedText.setText(value.toString());
                map_1.g_map.addThing(animatedText, pos);
                break;
            }
            case const_1.MessageMode.MessageInvalid:
                log_1.error("unknown message mode %d", mode);
                break;
            default:
                text = msg.getString();
                break;
        }
        //g_game.processTextMessage(mode, text);
    };
    ProtocolGame.prototype.parseCancelWalk = function (msg) {
        var direction = msg.getU8();
        //g_game.processWalkCancel(direction);
    };
    ProtocolGame.prototype.parseWalkWait = function (msg) {
        var millis = msg.getU16();
        //m_localPlayer.lockWalk(millis);
    };
    ProtocolGame.prototype.parseFloorChangeUp = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        var range = map_1.g_map.getAwareRange();
        pos.z--;
        var skip = 0;
        if (pos.z == const_1.Otc.SEA_FLOOR)
            for (var i = const_1.Otc.SEA_FLOOR - const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; i >= 0; i--)
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), 8 - i, skip);
        else if (pos.z > const_1.Otc.SEA_FLOOR)
            skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z - const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), 3, skip);
        pos.x++;
        pos.y++;
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseFloorChangeDown = function (msg) {
        var pos;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMapMovePosition))
            pos = this.getPosition(msg);
        else
            pos = map_1.g_map.getCentralPosition();
        var range = map_1.g_map.getAwareRange();
        pos.z++;
        var skip = 0;
        if (pos.z == const_1.Otc.UNDERGROUND_FLOOR) {
            var j = void 0, i = void 0;
            for (i = pos.z, j = -1; i <= pos.z + const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; ++i, --j)
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), j, skip);
        }
        else if (pos.z > const_1.Otc.UNDERGROUND_FLOOR && pos.z < const_1.Otc.MAX_Z - 1)
            skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z + const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), -3, skip);
        pos.x--;
        pos.y--;
        map_1.g_map.setCentralPosition(pos);
    };
    ProtocolGame.prototype.parseOpenOutfitWindow = function (msg) {
        var currentOutfit = this.getOutfit(msg);
        var outfitList = [];
        if (game_1.g_game.getFeature(const_1.GameFeature.GameNewOutfitProtocol)) {
            var outfitCount = msg.getU8();
            for (var i = 0; i < outfitCount; i++) {
                var outfitId = msg.getU16();
                var outfitName = msg.getString();
                var outfitAddons = msg.getU8();
                outfitList.push([outfitId, outfitName, outfitAddons]);
            }
        }
        else {
            var outfitStart = void 0, outfitEnd = void 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameLooktypeU16)) {
                outfitStart = msg.getU16();
                outfitEnd = msg.getU16();
            }
            else {
                outfitStart = msg.getU8();
                outfitEnd = msg.getU8();
            }
            for (var i = outfitStart; i <= outfitEnd; i++)
                outfitList.push([i, "", 0]);
        }
        var mountList = [];
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerMounts)) {
            var mountCount = msg.getU8();
            for (var i = 0; i < mountCount; ++i) {
                var mountId = msg.getU16(); // mount type
                var mountName = msg.getString(); // mount name
                mountList.push([mountId, mountName]);
            }
        }
        //g_game.processOpenOutfitWindow(currentOutfit, outfitList, mountList);
    };
    ProtocolGame.prototype.parseVipAdd = function (msg) {
        var id, iconId = 0, status;
        var name, desc = "";
        var notifyLogin = false;
        id = msg.getU32();
        name = game_1.g_game.formatCreatureName(msg.getString());
        if (game_1.g_game.getFeature(const_1.GameFeature.GameAdditionalVipInfo)) {
            desc = msg.getString();
            iconId = msg.getU32();
            notifyLogin = msg.getU8() > 0;
        }
        status = msg.getU8();
        //g_game.processVipAdd(id, name, status, desc, iconId, notifyLogin);
    };
    ProtocolGame.prototype.parseVipState = function (msg) {
        var id = msg.getU32();
        if (game_1.g_game.getFeature(const_1.GameFeature.GameLoginPending)) {
            var status_1 = msg.getU8();
            //g_game.processVipStateChange(id, status);
        }
        else {
            //g_game.processVipStateChange(id, 1);
        }
    };
    ProtocolGame.prototype.parseVipLogout = function (msg) {
        var id = msg.getU32();
        //g_game.processVipStateChange(id, 0);
    };
    ProtocolGame.prototype.parseTutorialHint = function (msg) {
        var id = msg.getU8();
        //g_game.processTutorialHint(id);
    };
    ProtocolGame.prototype.parseAutomapFlag = function (msg) {
        var pos = this.getPosition(msg);
        var icon = msg.getU8();
        var description = msg.getString();
        var remove = false;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameMinimapRemove))
            remove = msg.getU8() != 0;
        if (!remove) {
            //g_game.processAddAutomapFlag(pos, icon, description);
        }
        else {
            //g_game.processRemoveAutomapFlag(pos, icon, description);
        }
    };
    ProtocolGame.prototype.parseQuestLog = function (msg) {
        var questList = [];
        var questsCount = msg.getU16();
        for (var i = 0; i < questsCount; i++) {
            var id = msg.getU16();
            var name_4 = msg.getString();
            var completed = msg.getU8();
            questList.push([id, name_4, completed]);
        }
        //g_game.processQuestLog(questList);
    };
    ProtocolGame.prototype.parseQuestLine = function (msg) {
        var questMissions = [];
        var questId = msg.getU16();
        var missionCount = msg.getU8();
        for (var i = 0; i < missionCount; i++) {
            var missionName = msg.getString();
            var missionDescrition = msg.getString();
            questMissions.push([missionName, missionDescrition]);
        }
        //g_game.processQuestLine(questId, questMissions);
    };
    ProtocolGame.prototype.parseChannelEvent = function (msg) {
        msg.getU16(); // channel id
        game_1.g_game.formatCreatureName(msg.getString()); // player name
        msg.getU8(); // event type
    };
    ProtocolGame.prototype.parseItemInfo = function (msg) {
        var list = [];
        var size = msg.getU8();
        for (var i = 0; i < size; ++i) {
            var item = new item_1.Item();
            item.setId(msg.getU16());
            item.setCountOrSubType(msg.getU8());
            var desc = msg.getString();
            list.push([item, desc]);
        }
        //g_lua.callGlobalField("g_game", "onItemInfo", list);
    };
    ProtocolGame.prototype.parsePlayerInventory = function (msg) {
        var size = msg.getU16();
        for (var i = 0; i < size; ++i) {
            msg.getU16(); // id
            msg.getU8(); // subtype
            msg.getU16(); // count
        }
    };
    ProtocolGame.prototype.parseModalDialog = function (msg) {
        var id = msg.getU32();
        var title = msg.getString();
        var message = msg.getString();
        var sizeButtons = msg.getU8();
        var buttonList = [];
        for (var i = 0; i < sizeButtons; ++i) {
            var value = msg.getString();
            var id_1 = msg.getU8();
            buttonList.push([id_1, value]);
        }
        var sizeChoices = msg.getU8();
        var choiceList;
        for (var i = 0; i < sizeChoices; ++i) {
            var value = msg.getString();
            var id_2 = msg.getU8();
            choiceList.push_back([id_2, value]);
        }
        var enterButton, escapeButton;
        if (game_1.g_game.getClientVersion() > 970) {
            escapeButton = msg.getU8();
            enterButton = msg.getU8();
        }
        else {
            enterButton = msg.getU8();
            escapeButton = msg.getU8();
        }
        var priority = msg.getU8() == 0x01;
        //g_game.processModalDialog(id, title, message, buttonList, enterButton, escapeButton, choiceList, priority);
    };
    ProtocolGame.prototype.parseExtendedOpcode = function (msg) {
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
    };
    ProtocolGame.prototype.parseChangeMapAwareRange = function (msg) {
        var xrange = msg.getU8();
        var yrange = msg.getU8();
        var range = new structures_1.AwareRange();
        range.left = xrange / 2 - ((xrange + 1) % 2);
        range.right = xrange / 2;
        range.top = yrange / 2 - ((yrange + 1) % 2);
        range.bottom = yrange / 2;
        map_1.g_map.setAwareRange(range);
        //g_lua.callGlobalField("g_game", "onMapChangeAwareRange", xrange, yrange);
    };
    ProtocolGame.prototype.parseCreaturesMark = function (msg) {
        var len;
        if (game_1.g_game.getClientVersion() >= 1035) {
            len = 1;
        }
        else {
            len = msg.getU8();
        }
        for (var i = 0; i < len; ++i) {
            var id = msg.getU32();
            var isPermanent = msg.getU8() != 1;
            var markType = msg.getU8();
            var creature = map_1.g_map.getCreatureById(id);
            if (creature) {
                if (isPermanent) {
                    if (markType == 0xff)
                        creature.hideStaticSquare();
                    else
                        creature.showStaticSquare(color_1.Color.from8bit(markType));
                }
                else
                    creature.addTimedSquare(markType);
            }
            else
                log_1.error("could not get creature");
        }
    };
    ProtocolGame.prototype.parseCreatureType = function (msg) {
        var id = msg.getU32();
        var type = msg.getU8();
        var creature = map_1.g_map.getCreatureById(id);
        if (creature)
            creature.setType(type);
        else
            log_1.error("could not get creature");
    };
    ProtocolGame.prototype.setMapDescription = function (msg, x, y, z, width, height) {
        var startz;
        var endz;
        var zstep;
        if (z > const_1.Otc.SEA_FLOOR) {
            startz = z - const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
            endz = Math.min(z + const_1.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, const_1.Otc.MAX_Z);
            zstep = 1;
        }
        else {
            startz = const_1.Otc.SEA_FLOOR;
            endz = 0;
            zstep = -1;
        }
        var skip = 0;
        for (var nz = startz; nz != endz + zstep; nz += zstep)
            skip = this.setFloorDescription(msg, x, y, nz, width, height, z - nz, skip);
    };
    ProtocolGame.prototype.setFloorDescription = function (msg, x, y, z, width, height, offset, skip) {
        for (var nx = 0; nx < width; nx++) {
            for (var ny = 0; ny < height; ny++) {
                var tilePos = new position_1.Position(x + nx + offset, y + ny + offset, z);
                if (skip == 0)
                    skip = this.setTileDescription(msg, tilePos);
                else {
                    map_1.g_map.cleanTile(tilePos);
                    skip--;
                }
            }
        }
        return skip;
    };
    ProtocolGame.prototype.setTileDescription = function (msg, position) {
        map_1.g_map.cleanTile(position);
        var gotEffect = false;
        for (var stackPos = 0; stackPos < 256; stackPos++) {
            if (msg.peekU16() >= 0xff00)
                return msg.getU16() & 0xff;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameEnvironmentEffect) && !gotEffect) {
                msg.getU16(); // environment effect
                gotEffect = true;
                continue;
            }
            if (stackPos > 10)
                log_1.error("too many things, pos=%s, stackpos=%d", position, stackPos);
            var thing = this.getThing(msg);
            map_1.g_map.addThing(thing, position, stackPos);
        }
        return 0;
    };
    ProtocolGame.prototype.getOutfit = function (msg) {
        var outfit = new outfit_1.Outfit();
        var lookType;
        if (game_1.g_game.getFeature(const_1.GameFeature.GameLooktypeU16))
            lookType = msg.getU16();
        else
            lookType = msg.getU8();
        if (lookType != 0) {
            outfit.setCategory(const_1.ThingCategory.ThingCategoryCreature);
            var head = msg.getU8();
            var body = msg.getU8();
            var legs = msg.getU8();
            var feet = msg.getU8();
            var addons = 0;
            if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerAddons))
                addons = msg.getU8();
            if (!thingtypemanager_1.g_things.isValidDatId(lookType, const_1.ThingCategory.ThingCategoryCreature)) {
                log_1.error("invalid outfit looktype %d", lookType);
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
            var lookTypeEx = msg.getU16();
            if (lookTypeEx == 0) {
                outfit.setCategory(const_1.ThingCategory.ThingCategoryEffect);
                outfit.setAuxId(13); // invisible effect id
            }
            else {
                if (!thingtypemanager_1.g_things.isValidDatId(lookTypeEx, const_1.ThingCategory.ThingCategoryItem)) {
                    log_1.error("invalid outfit looktypeex %d", lookTypeEx);
                    lookTypeEx = 0;
                }
                outfit.setCategory(const_1.ThingCategory.ThingCategoryItem);
                outfit.setAuxId(lookTypeEx);
            }
        }
        if (game_1.g_game.getFeature(const_1.GameFeature.GamePlayerMounts)) {
            var mount = msg.getU16();
            outfit.setMount(mount);
        }
        return outfit;
    };
    ProtocolGame.prototype.getThing = function (msg) {
        var thing = new thing_1.Thing();
        var id = msg.getU16();
        if (id == 0)
            log_1.error("invalid thing id");
        else if (id == proto_1.Proto.UnknownCreature || id == proto_1.Proto.OutdatedCreature || id == proto_1.Proto.Creature)
            thing = this.getCreature(msg, id);
        else if (id == proto_1.Proto.StaticText) // otclient only
            thing = this.getStaticText(msg, id);
        else // item
            thing = this.getItem(msg, id);
        return thing;
    };
    ProtocolGame.prototype.getMappedThing = function (msg) {
        var thing;
        var x = msg.getU16();
        if (x != 0xffff) {
            var pos = new position_1.Position();
            pos.x = x;
            pos.y = msg.getU16();
            pos.z = msg.getU8();
            var stackpos = msg.getU8();
            thing = map_1.g_map.getThing(pos, stackpos);
            if (!thing)
                log_1.error("no thing at pos:%s, stackpos:%d", pos, stackpos);
        }
        else {
            var id = msg.getU32();
            thing = map_1.g_map.getCreatureById(id);
            if (!thing)
                log_1.error("no creature with id %u", id);
        }
        return thing;
    };
    ProtocolGame.prototype.getCreature = function (msg, type) {
        if (type == 0)
            type = msg.getU16();
        var creature;
        var known = (type != proto_1.Proto.UnknownCreature);
        if (type == proto_1.Proto.OutdatedCreature || type == proto_1.Proto.UnknownCreature) {
            if (known) {
                var id = msg.getU32();
                creature = map_1.g_map.getCreatureById(id);
                if (!creature)
                    log_1.error("server said that a creature is known, but it's not");
            }
            else {
                var removeId = msg.getU32();
                map_1.g_map.removeCreatureById(removeId);
                var id = msg.getU32();
                var creatureType = void 0;
                if (game_1.g_game.getClientVersion() >= 910)
                    creatureType = msg.getU8();
                else {
                    if (id >= proto_1.Proto.PlayerStartId && id < proto_1.Proto.PlayerEndId)
                        creatureType = proto_1.Proto.CreatureTypePlayer;
                    else if (id >= proto_1.Proto.MonsterStartId && id < proto_1.Proto.MonsterEndId)
                        creatureType = proto_1.Proto.CreatureTypeMonster;
                    else
                        creatureType = proto_1.Proto.CreatureTypeNpc;
                }
                std: : string;
                name = game_1.g_game.formatCreatureName(msg.getString());
                if (id == m_localPlayer.getId())
                    creature = m_localPlayer;
                else if (creatureType == proto_1.Proto.CreatureTypePlayer) {
                    // fixes a bug server side bug where GameInit is not sent and local player id is unknown
                    if (m_localPlayer.getId() == 0 && name == m_localPlayer.getName())
                        creature = m_localPlayer;
                    else
                        creature = PlayerPtr(new player_1.Player);
                }
                else if (creatureType == proto_1.Proto.CreatureTypeMonster)
                    creature = MonsterPtr(new Monster);
                else if (creatureType == proto_1.Proto.CreatureTypeNpc)
                    creature = NpcPtr(new Npc);
                else
                    g_logger.traceError("creature type is invalid");
                if (creature) {
                    creature.setId(id);
                    creature.setName(name);
                    map_1.g_map.addCreature(creature);
                }
            }
            int;
            healthPercent = msg.getU8();
            Otc: : const_1.Direction;
            direction = function (Otc, Direction) { return msg; };
            getU8();
            outfit_1.Outfit;
            outfit = getOutfit(msg);
            structures_1.Light;
            light;
            light.intensity = msg.getU8();
            light.color = msg.getU8();
            int;
            speed = msg.getU16();
            int;
            skull = msg.getU8();
            int;
            shield = msg.getU8();
            // emblem is sent only when the creature is not known
            int8;
            emblem = -1;
            int8;
            creatureType = -1;
            int8;
            icon = -1;
            bool;
            unpass = true;
            uint8;
            mark;
            if (game_1.g_game.getFeature(const_1.GameFeature.GameCreatureEmblems) && !known)
                emblem = msg.getU8();
            if (game_1.g_game.getFeature(const_1.GameFeature.GameThingMarks)) {
                creatureType = msg.getU8();
            }
            if (game_1.g_game.getFeature(const_1.GameFeature.GameCreatureIcons)) {
                icon = msg.getU8();
            }
            if (game_1.g_game.getFeature(const_1.GameFeature.GameThingMarks)) {
                mark = msg.getU8(); // mark
                msg.getU16(); // helpers
                if (creature) {
                    if (mark == 0xff)
                        creature.hideStaticSquare();
                    else
                        creature.showStaticSquare(color_1.Color, from8bit(mark));
                }
            }
            if (game_1.g_game.getClientVersion() >= 854)
                unpass = msg.getU8();
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
                if (creature == m_localPlayer && !m_localPlayer.isKnown())
                    m_localPlayer.setKnown(true);
            }
        }
        else if (type == proto_1.Proto.Creature) {
            uint;
            id = msg.getU32();
            creature = map_1.g_map.getCreatureById(id);
            if (!creature)
                g_logger.traceError("invalid creature");
            Otc: : const_1.Direction;
            direction = function (Otc, Direction) { return msg; };
            getU8();
            if (creature)
                creature.turn(direction);
            if (game_1.g_game.getClientVersion() >= 953) {
                bool;
                unpass = msg.getU8();
                if (creature)
                    creature.setPassable(!unpass);
            }
        }
        else {
            stdext: : throw_exception("invalid creature opcode");
        }
        return creature;
    };
    ProtocolGame.prototype.getItem = function (msg, id) {
        if (id === void 0) { id = 0; }
        if (id == 0)
            id = msg.getU16();
        ItemPtr;
        item = item_1.Item;
        create(id);
        if (item.getId() == 0)
            stdext: : throw_exception(stdext, format("unable to create item with invalid id %d", id));
        if (game_1.g_game.getFeature(const_1.GameFeature.GameThingMarks)) {
            msg.getU8(); // mark
        }
        if (item.isStackable() || item.isFluidContainer() || item.isSplash() || item.isChargeable())
            item.setCountOrSubType(msg.getU8());
        if (game_1.g_game.getFeature(const_1.GameFeature.GameItemAnimationPhase)) {
            if (item.getAnimationPhases() > 1) {
                // 0x00 => automatic phase
                // 0xFE => random phase
                // 0xFF => async phase
                msg.getU8();
                //item.setPhase(msg.getU8());
            }
        }
        return item;
    };
    ProtocolGame.prototype.getStaticText = function (msg, id) {
        int;
        colorByte = msg.getU8();
        color_1.Color;
        color = color_1.Color;
        from8bit(colorByte);
        std: : string;
        fontName = msg.getString();
        std: : string;
        text = msg.getString();
        staticText: statictext_1.StaticText = StaticTextPtr(new statictext_1.StaticText);
        staticText.setText(text);
        staticText.setFont(fontName);
        staticText.setColor(color);
        return staticText;
    };
    ProtocolGame.prototype.getPosition = function (msg) {
        var x = msg.getU16();
        var y = msg.getU16();
        var z = msg.getU8();
        return position_1.Position(x, y, z);
    };
    return ProtocolGame;
}(protocol_1.Protocol));
exports.ProtocolGame = ProtocolGame;
//# sourceMappingURL=protocolgame.js.map