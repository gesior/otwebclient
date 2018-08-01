"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var localplayer_1 = require("./localplayer");
var const_1 = require("./constants/const");
var thingtypemanager_1 = require("./thingtypemanager");
var protocolgame_1 = require("./network/protocolgame");
var map_1 = require("./map");
var container_1 = require("./container");
var chatbox_1 = require("./view/chatbox");
var Game = /** @class */ (function () {
    function Game() {
        this.m_clientVersion = 0;
        this.messageModesMap = {};
        this.m_features = [];
    }
    Game.prototype.processCloseChannel = function (channelId) {
        chatbox_1.g_chat.removeTab(channelId);
    };
    Game.prototype.processOpenChannel = function (channelId, name) {
        chatbox_1.g_chat.addChannel(name, channelId);
    };
    Game.prototype.processOpenOwnPrivateChannel = function (channelId, name) {
        chatbox_1.g_chat.addChannel(name, channelId);
    };
    Game.prototype.processTalk = function (name, level, mode, message, channelId, creaturePos) {
        console.log('Game.processTalk', name, level, mode, message, channelId, creaturePos);
        chatbox_1.g_chat.handleMessage(name, level, mode, message, channelId, creaturePos);
    };
    Game.prototype.setClientVersion = function (version) {
        this.m_clientVersion = version;
        this.updateMessageModesMap(version);
        this.updateFeatures(version);
    };
    Game.prototype.loadDatFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, thingtypemanager_1.g_things.loadDat(file)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Game.prototype.updateMessageModesMap = function (version) {
        this.messageModesMap = {};
        if (version >= 1094) {
            this.messageModesMap[const_1.MessageMode.MessageMana] = 43;
        }
        if (version >= 1055) { // might be 1054
            this.messageModesMap[const_1.MessageMode.MessageNone] = 0;
            this.messageModesMap[const_1.MessageMode.MessageSay] = 1;
            this.messageModesMap[const_1.MessageMode.MessageWhisper] = 2;
            this.messageModesMap[const_1.MessageMode.MessageYell] = 3;
            this.messageModesMap[const_1.MessageMode.MessagePrivateFrom] = 4;
            this.messageModesMap[const_1.MessageMode.MessagePrivateTo] = 5;
            this.messageModesMap[const_1.MessageMode.MessageChannelManagement] = 6;
            this.messageModesMap[const_1.MessageMode.MessageChannel] = 7;
            this.messageModesMap[const_1.MessageMode.MessageChannelHighlight] = 8;
            this.messageModesMap[const_1.MessageMode.MessageSpell] = 9;
            this.messageModesMap[const_1.MessageMode.MessageNpcFromStartBlock] = 10;
            this.messageModesMap[const_1.MessageMode.MessageNpcFrom] = 11;
            this.messageModesMap[const_1.MessageMode.MessageNpcTo] = 12;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterBroadcast] = 13;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterChannel] = 14;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateFrom] = 15;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateTo] = 16;
            this.messageModesMap[const_1.MessageMode.MessageLogin] = 17;
            this.messageModesMap[const_1.MessageMode.MessageWarning] = 18; // Admin
            this.messageModesMap[const_1.MessageMode.MessageGame] = 19;
            this.messageModesMap[const_1.MessageMode.MessageGameHighlight] = 20;
            this.messageModesMap[const_1.MessageMode.MessageFailure] = 21;
            this.messageModesMap[const_1.MessageMode.MessageLook] = 22;
            this.messageModesMap[const_1.MessageMode.MessageDamageDealed] = 23;
            this.messageModesMap[const_1.MessageMode.MessageDamageReceived] = 24;
            this.messageModesMap[const_1.MessageMode.MessageHeal] = 25;
            this.messageModesMap[const_1.MessageMode.MessageExp] = 26;
            this.messageModesMap[const_1.MessageMode.MessageDamageOthers] = 27;
            this.messageModesMap[const_1.MessageMode.MessageHealOthers] = 28;
            this.messageModesMap[const_1.MessageMode.MessageExpOthers] = 29;
            this.messageModesMap[const_1.MessageMode.MessageStatus] = 30;
            this.messageModesMap[const_1.MessageMode.MessageLoot] = 31;
            this.messageModesMap[const_1.MessageMode.MessageTradeNpc] = 32;
            this.messageModesMap[const_1.MessageMode.MessageGuild] = 33;
            this.messageModesMap[const_1.MessageMode.MessagePartyManagement] = 34;
            this.messageModesMap[const_1.MessageMode.MessageParty] = 35;
            this.messageModesMap[const_1.MessageMode.MessageBarkLow] = 36;
            this.messageModesMap[const_1.MessageMode.MessageBarkLoud] = 37;
            this.messageModesMap[const_1.MessageMode.MessageReport] = 38;
            this.messageModesMap[const_1.MessageMode.MessageHotkeyUse] = 39;
            this.messageModesMap[const_1.MessageMode.MessageTutorialHint] = 40;
            this.messageModesMap[const_1.MessageMode.MessageThankyou] = 41;
            this.messageModesMap[const_1.MessageMode.MessageMarket] = 42;
        }
        else if (version >= 1036) {
            for (var i = const_1.MessageMode.MessageNone; i <= const_1.MessageMode.MessageBeyondLast; ++i) {
                if (i >= const_1.MessageMode.MessageNpcTo)
                    this.messageModesMap[i] = i + 1;
                else
                    this.messageModesMap[i] = i;
            }
        }
        else if (version >= 900) {
            for (var i = const_1.MessageMode.MessageNone; i <= const_1.MessageMode.MessageBeyondLast; ++i)
                this.messageModesMap[i] = i;
        }
        else if (version >= 861) {
            this.messageModesMap[const_1.MessageMode.MessageNone] = 0;
            this.messageModesMap[const_1.MessageMode.MessageSay] = 1;
            this.messageModesMap[const_1.MessageMode.MessageWhisper] = 2;
            this.messageModesMap[const_1.MessageMode.MessageYell] = 3;
            this.messageModesMap[const_1.MessageMode.MessageNpcTo] = 4;
            this.messageModesMap[const_1.MessageMode.MessageNpcFrom] = 5;
            this.messageModesMap[const_1.MessageMode.MessagePrivateFrom] = 6;
            this.messageModesMap[const_1.MessageMode.MessagePrivateTo] = 6;
            this.messageModesMap[const_1.MessageMode.MessageChannel] = 7;
            this.messageModesMap[const_1.MessageMode.MessageChannelManagement] = 8;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterBroadcast] = 9;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterChannel] = 10;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateFrom] = 11;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateTo] = 11;
            this.messageModesMap[const_1.MessageMode.MessageChannelHighlight] = 12;
            this.messageModesMap[const_1.MessageMode.MessageMonsterSay] = 13;
            this.messageModesMap[const_1.MessageMode.MessageMonsterYell] = 14;
            this.messageModesMap[const_1.MessageMode.MessageWarning] = 15;
            this.messageModesMap[const_1.MessageMode.MessageGame] = 16;
            this.messageModesMap[const_1.MessageMode.MessageLogin] = 17;
            this.messageModesMap[const_1.MessageMode.MessageStatus] = 18;
            this.messageModesMap[const_1.MessageMode.MessageLook] = 19;
            this.messageModesMap[const_1.MessageMode.MessageFailure] = 20;
            this.messageModesMap[const_1.MessageMode.MessageBlue] = 21;
            this.messageModesMap[const_1.MessageMode.MessageRed] = 22;
        }
        else if (version >= 840) {
            this.messageModesMap[const_1.MessageMode.MessageNone] = 0;
            this.messageModesMap[const_1.MessageMode.MessageSay] = 1;
            this.messageModesMap[const_1.MessageMode.MessageWhisper] = 2;
            this.messageModesMap[const_1.MessageMode.MessageYell] = 3;
            this.messageModesMap[const_1.MessageMode.MessageNpcTo] = 4;
            this.messageModesMap[const_1.MessageMode.MessageNpcFromStartBlock] = 5;
            this.messageModesMap[const_1.MessageMode.MessagePrivateFrom] = 6;
            this.messageModesMap[const_1.MessageMode.MessagePrivateTo] = 6;
            this.messageModesMap[const_1.MessageMode.MessageChannel] = 7;
            this.messageModesMap[const_1.MessageMode.MessageChannelManagement] = 8;
            this.messageModesMap[const_1.MessageMode.MessageRVRChannel] = 9;
            this.messageModesMap[const_1.MessageMode.MessageRVRAnswer] = 10;
            this.messageModesMap[const_1.MessageMode.MessageRVRContinue] = 11;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterBroadcast] = 12;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterChannel] = 13;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateFrom] = 14;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateTo] = 14;
            this.messageModesMap[const_1.MessageMode.MessageChannelHighlight] = 15;
            // 16, 17 ??
            this.messageModesMap[const_1.MessageMode.MessageRed] = 18;
            this.messageModesMap[const_1.MessageMode.MessageMonsterSay] = 19;
            this.messageModesMap[const_1.MessageMode.MessageMonsterYell] = 20;
            this.messageModesMap[const_1.MessageMode.MessageWarning] = 21;
            this.messageModesMap[const_1.MessageMode.MessageGame] = 22;
            this.messageModesMap[const_1.MessageMode.MessageLogin] = 23;
            this.messageModesMap[const_1.MessageMode.MessageStatus] = 24;
            this.messageModesMap[const_1.MessageMode.MessageLook] = 25;
            this.messageModesMap[const_1.MessageMode.MessageFailure] = 26;
            this.messageModesMap[const_1.MessageMode.MessageBlue] = 27;
        }
        else if (version >= 760) {
            this.messageModesMap[const_1.MessageMode.MessageNone] = 0;
            this.messageModesMap[const_1.MessageMode.MessageSay] = 1;
            this.messageModesMap[const_1.MessageMode.MessageWhisper] = 2;
            this.messageModesMap[const_1.MessageMode.MessageYell] = 3;
            this.messageModesMap[const_1.MessageMode.MessagePrivateFrom] = 4;
            this.messageModesMap[const_1.MessageMode.MessagePrivateTo] = 4;
            this.messageModesMap[const_1.MessageMode.MessageChannel] = 5;
            this.messageModesMap[const_1.MessageMode.MessageRVRChannel] = 6;
            this.messageModesMap[const_1.MessageMode.MessageRVRAnswer] = 7;
            this.messageModesMap[const_1.MessageMode.MessageRVRContinue] = 8;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterBroadcast] = 9;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterChannel] = 10;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateFrom] = 11;
            this.messageModesMap[const_1.MessageMode.MessageGamemasterPrivateTo] = 11;
            this.messageModesMap[const_1.MessageMode.MessageChannelHighlight] = 12;
            // 13, 14, 15 ??
            this.messageModesMap[const_1.MessageMode.MessageMonsterSay] = 16;
            this.messageModesMap[const_1.MessageMode.MessageMonsterYell] = 17;
            this.messageModesMap[const_1.MessageMode.MessageWarning] = 18;
            this.messageModesMap[const_1.MessageMode.MessageGame] = 19;
            this.messageModesMap[const_1.MessageMode.MessageLogin] = 20;
            this.messageModesMap[const_1.MessageMode.MessageStatus] = 21;
            this.messageModesMap[const_1.MessageMode.MessageLook] = 22;
            this.messageModesMap[const_1.MessageMode.MessageFailure] = 23;
            this.messageModesMap[const_1.MessageMode.MessageBlue] = 24;
            this.messageModesMap[const_1.MessageMode.MessageRed] = 25;
        }
    };
    Game.prototype.updateFeatures = function (version) {
        this.m_features = [];
        this.enableFeature(const_1.GameFeature.GameFormatCreatureName);
        if (version >= 770) {
            this.enableFeature(const_1.GameFeature.GameLooktypeU16);
            this.enableFeature(const_1.GameFeature.GameMessageStatements);
            this.enableFeature(const_1.GameFeature.GameLoginPacketEncryption);
        }
        if (version >= 780) {
            this.enableFeature(const_1.GameFeature.GamePlayerAddons);
            this.enableFeature(const_1.GameFeature.GamePlayerStamina);
            this.enableFeature(const_1.GameFeature.GameNewFluids);
            this.enableFeature(const_1.GameFeature.GameMessageLevel);
            this.enableFeature(const_1.GameFeature.GamePlayerStateU16);
            this.enableFeature(const_1.GameFeature.GameNewOutfitProtocol);
        }
        if (version >= 790) {
            this.enableFeature(const_1.GameFeature.GameWritableDate);
        }
        if (version >= 840) {
            this.enableFeature(const_1.GameFeature.GameProtocolChecksum);
            this.enableFeature(const_1.GameFeature.GameAccountNames);
            this.enableFeature(const_1.GameFeature.GameDoubleFreeCapacity);
        }
        if (version >= 841) {
            this.enableFeature(const_1.GameFeature.GameChallengeOnLogin);
            this.enableFeature(const_1.GameFeature.GameMessageSizeCheck);
        }
        if (version >= 854) {
            this.enableFeature(const_1.GameFeature.GameCreatureEmblems);
        }
        if (version >= 860) {
            this.enableFeature(const_1.GameFeature.GameAttackSeq);
        }
        if (version >= 862) {
            this.enableFeature(const_1.GameFeature.GamePenalityOnDeath);
        }
        if (version >= 870) {
            this.enableFeature(const_1.GameFeature.GameDoubleExperience);
            this.enableFeature(const_1.GameFeature.GamePlayerMounts);
            this.enableFeature(const_1.GameFeature.GameSpellList);
        }
        if (version >= 910) {
            this.enableFeature(const_1.GameFeature.GameNameOnNpcTrade);
            this.enableFeature(const_1.GameFeature.GameTotalCapacity);
            this.enableFeature(const_1.GameFeature.GameSkillsBase);
            this.enableFeature(const_1.GameFeature.GamePlayerRegenerationTime);
            this.enableFeature(const_1.GameFeature.GameChannelPlayerList);
            this.enableFeature(const_1.GameFeature.GameEnvironmentEffect);
            this.enableFeature(const_1.GameFeature.GameItemAnimationPhase);
        }
        if (version >= 940) {
            this.enableFeature(const_1.GameFeature.GamePlayerMarket);
        }
        if (version >= 953) {
            this.enableFeature(const_1.GameFeature.GamePurseSlot);
            this.enableFeature(const_1.GameFeature.GameClientPing);
        }
        if (version >= 960) {
            this.enableFeature(const_1.GameFeature.GameSpritesU32);
            this.enableFeature(const_1.GameFeature.GameOfflineTrainingTime);
        }
        if (version >= 963) {
            this.enableFeature(const_1.GameFeature.GameAdditionalVipInfo);
        }
        if (version >= 980) {
            this.enableFeature(const_1.GameFeature.GamePreviewState);
            this.enableFeature(const_1.GameFeature.GameClientVersion);
        }
        if (version >= 981) {
            this.enableFeature(const_1.GameFeature.GameLoginPending);
            this.enableFeature(const_1.GameFeature.GameNewSpeedLaw);
        }
        if (version >= 984) {
            this.enableFeature(const_1.GameFeature.GameContainerPagination);
            this.enableFeature(const_1.GameFeature.GameBrowseField);
        }
        if (version >= 1000) {
            this.enableFeature(const_1.GameFeature.GameThingMarks);
            this.enableFeature(const_1.GameFeature.GamePVPMode);
        }
        if (version >= 1035) {
            this.enableFeature(const_1.GameFeature.GameDoubleSkills);
            this.enableFeature(const_1.GameFeature.GameBaseSkillU16);
        }
        if (version >= 1036) {
            this.enableFeature(const_1.GameFeature.GameCreatureIcons);
            this.enableFeature(const_1.GameFeature.GameHideNpcNames);
        }
        if (version >= 1038) {
            this.enableFeature(const_1.GameFeature.GamePremiumExpiration);
        }
        if (version >= 1050) {
            this.enableFeature(const_1.GameFeature.GameEnhancedAnimations);
        }
        if (version >= 1053) {
            this.enableFeature(const_1.GameFeature.GameUnjustifiedPoints);
        }
        if (version >= 1054) {
            this.enableFeature(const_1.GameFeature.GameExperienceBonus);
        }
        if (version >= 1055) {
            this.enableFeature(const_1.GameFeature.GameDeathType);
        }
        if (version >= 1057) {
            this.enableFeature(const_1.GameFeature.GameIdleAnimations);
        }
        if (version >= 1061) {
            this.enableFeature(const_1.GameFeature.GameOGLInformation);
        }
        if (version >= 1071) {
            this.enableFeature(const_1.GameFeature.GameContentRevision);
        }
        if (version >= 1072) {
            this.enableFeature(const_1.GameFeature.GameAuthenticator);
        }
        if (version >= 1074) {
            this.enableFeature(const_1.GameFeature.GameSessionKey);
        }
        if (version >= 1080) {
            this.enableFeature(const_1.GameFeature.GameIngameStore);
        }
        if (version >= 1092) {
            this.enableFeature(const_1.GameFeature.GameIngameStoreServiceType);
        }
        if (version >= 1093) {
            this.enableFeature(const_1.GameFeature.GameIngameStoreHighlights);
        }
        if (version >= 1094) {
            this.enableFeature(const_1.GameFeature.GameAdditionalSkills);
        }
    };
    Game.prototype.enableFeature = function (feature) {
        this.m_features[feature] = true;
    };
    Game.prototype.disableFeature = function (feature) {
        this.m_features[feature] = false;
    };
    Game.prototype.getFeature = function (feature) {
        return this.m_features[feature] == true;
    };
    Game.prototype.translateMessageModeFromServer = function (mode) {
        for (var i in this.messageModesMap) {
            if (this.messageModesMap[i] == mode) {
                return parseInt(i);
            }
        }
        return const_1.MessageMode.MessageInvalid;
    };
    Game.prototype.getContainer = function (containerId) {
        return new container_1.Container();
    };
    Object.defineProperty(Game.prototype, "g_things", {
        get: function () {
            return new thingtypemanager_1.ThingTypeManager();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "g_map", {
        get: function () {
            return new map_1.Map();
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.getClientVersion = function () {
        return this.m_clientVersion;
    };
    Game.prototype.getProtocolVersion = function () {
        return 10009;
    };
    Game.prototype.getOs = function () {
        return 3;
    };
    Game.prototype.processConnectionError = function () {
        throw new Error("Method not implemented.");
    };
    Game.prototype.getLocalPlayer = function () {
        return new localplayer_1.LocalPlayer();
    };
    Game.prototype.login = function (accountName, accountPassword, characterName) {
        this.m_protocolGame = new protocolgame_1.ProtocolGame(this);
        this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
    };
    Game.prototype.formatCreatureName = function (string) {
        return string;
    };
    return Game;
}());
exports.Game = Game;
var g_game = new Game();
exports.g_game = g_game;
