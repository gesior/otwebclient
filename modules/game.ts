import {LocalPlayer} from "./localplayer";
import {DeathType, GameFeature, MessageMode} from "./constants/const";
import {g_things, ThingTypeManager} from "./thingtypemanager";
import {ProtocolGame} from "./network/protocolgame";
import {error} from "./log";
import {Map} from "./map";
import {Container} from "./container";
import {Item} from "./item";
import {g_chat} from "./view/chatbox";
import {Position} from "./position";
import {Movie} from "./network/movie";
import {g_sprites} from "./spritemanager";
import {g_painter} from "./painter";
import {g_mapview} from "./view/mapview";

export class Game {
    processCloseChannel(channelId: number): any {
        g_chat.removeTab(channelId);
    }

    processOpenChannel(channelId: number, name: string) {
        g_chat.addChannel(name, channelId);
    }

    processOpenOwnPrivateChannel(channelId: number, name: string) {
        g_chat.addChannel(name, channelId);
    }
    processTalk(name: string, level: number, mode: MessageMode, message: string, channelId: number, creaturePos: Position) {
        //console.log('Game.processTalk', name, level, mode, message, channelId, creaturePos);
        g_chat.handleMessage(name, level, mode, message, channelId, creaturePos);
    }

    loadMovie(movie: Movie) {
        this.m_protocolGame = new ProtocolGame(this);
        this.m_protocolGame.loadMovie(movie);
    }

    updateView(deltaTime: number) {
    }

    updateMovie(deltaTime: number) {
        this.m_protocolGame.updateMovie(deltaTime * 5);
    }
    m_clientVersion = 0;
    messageModesMap = {};
    m_features: boolean[] = [];
    m_protocolGame: ProtocolGame;
    m_localPlayer = new LocalPlayer();

    setClientVersion(version: number) {
        this.m_clientVersion = version;
        this.updateMessageModesMap(version);
        this.updateFeatures(version);
    }

    async loadDatFile(file: string) {
        return await g_things.loadDat(file);
    }

    async loadSprFile(file: string) {
        return await g_sprites.loadSpr(file);
    }

    updateMessageModesMap(version: number) {
        this.messageModesMap = {};

        if (version >= 1094) {
            this.messageModesMap[MessageMode.MessageMana] = 43;
        }

        if (version >= 1055) { // might be 1054
            this.messageModesMap[MessageMode.MessageNone] = 0;
            this.messageModesMap[MessageMode.MessageSay] = 1;
            this.messageModesMap[MessageMode.MessageWhisper] = 2;
            this.messageModesMap[MessageMode.MessageYell] = 3;
            this.messageModesMap[MessageMode.MessagePrivateFrom] = 4;
            this.messageModesMap[MessageMode.MessagePrivateTo] = 5;
            this.messageModesMap[MessageMode.MessageChannelManagement] = 6;
            this.messageModesMap[MessageMode.MessageChannel] = 7;
            this.messageModesMap[MessageMode.MessageChannelHighlight] = 8;
            this.messageModesMap[MessageMode.MessageSpell] = 9;
            this.messageModesMap[MessageMode.MessageNpcFromStartBlock] = 10;
            this.messageModesMap[MessageMode.MessageNpcFrom] = 11;
            this.messageModesMap[MessageMode.MessageNpcTo] = 12;
            this.messageModesMap[MessageMode.MessageGamemasterBroadcast] = 13;
            this.messageModesMap[MessageMode.MessageGamemasterChannel] = 14;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateFrom] = 15;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateTo] = 16;
            this.messageModesMap[MessageMode.MessageLogin] = 17;
            this.messageModesMap[MessageMode.MessageWarning] = 18; // Admin
            this.messageModesMap[MessageMode.MessageGame] = 19;
            this.messageModesMap[MessageMode.MessageGameHighlight] = 20;
            this.messageModesMap[MessageMode.MessageFailure] = 21;
            this.messageModesMap[MessageMode.MessageLook] = 22;
            this.messageModesMap[MessageMode.MessageDamageDealed] = 23;
            this.messageModesMap[MessageMode.MessageDamageReceived] = 24;
            this.messageModesMap[MessageMode.MessageHeal] = 25;
            this.messageModesMap[MessageMode.MessageExp] = 26;
            this.messageModesMap[MessageMode.MessageDamageOthers] = 27;
            this.messageModesMap[MessageMode.MessageHealOthers] = 28;
            this.messageModesMap[MessageMode.MessageExpOthers] = 29;
            this.messageModesMap[MessageMode.MessageStatus] = 30;
            this.messageModesMap[MessageMode.MessageLoot] = 31;
            this.messageModesMap[MessageMode.MessageTradeNpc] = 32;
            this.messageModesMap[MessageMode.MessageGuild] = 33;
            this.messageModesMap[MessageMode.MessagePartyManagement] = 34;
            this.messageModesMap[MessageMode.MessageParty] = 35;
            this.messageModesMap[MessageMode.MessageBarkLow] = 36;
            this.messageModesMap[MessageMode.MessageBarkLoud] = 37;
            this.messageModesMap[MessageMode.MessageReport] = 38;
            this.messageModesMap[MessageMode.MessageHotkeyUse] = 39;
            this.messageModesMap[MessageMode.MessageTutorialHint] = 40;
            this.messageModesMap[MessageMode.MessageThankyou] = 41;
            this.messageModesMap[MessageMode.MessageMarket] = 42;
        } else if (version >= 1036) {
            for (let i = MessageMode.MessageNone; i <= MessageMode.MessageBeyondLast; ++i) {
                if (i >= MessageMode.MessageNpcTo)
                    this.messageModesMap[i] = i + 1;
                else
                    this.messageModesMap[i] = i;
            }
        } else if (version >= 900) {
            for (let i = MessageMode.MessageNone; i <= MessageMode.MessageBeyondLast; ++i)
                this.messageModesMap[i] = i;
        } else if (version >= 861) {
            this.messageModesMap[MessageMode.MessageNone] = 0;
            this.messageModesMap[MessageMode.MessageSay] = 1;
            this.messageModesMap[MessageMode.MessageWhisper] = 2;
            this.messageModesMap[MessageMode.MessageYell] = 3;
            this.messageModesMap[MessageMode.MessageNpcTo] = 4;
            this.messageModesMap[MessageMode.MessageNpcFrom] = 5;
            this.messageModesMap[MessageMode.MessagePrivateFrom] = 6;
            this.messageModesMap[MessageMode.MessagePrivateTo] = 6;
            this.messageModesMap[MessageMode.MessageChannel] = 7;
            this.messageModesMap[MessageMode.MessageChannelManagement] = 8;
            this.messageModesMap[MessageMode.MessageGamemasterBroadcast] = 9;
            this.messageModesMap[MessageMode.MessageGamemasterChannel] = 10;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateFrom] = 11;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateTo] = 11;
            this.messageModesMap[MessageMode.MessageChannelHighlight] = 12;
            this.messageModesMap[MessageMode.MessageMonsterSay] = 13;
            this.messageModesMap[MessageMode.MessageMonsterYell] = 14;
            this.messageModesMap[MessageMode.MessageWarning] = 15;
            this.messageModesMap[MessageMode.MessageGame] = 16;
            this.messageModesMap[MessageMode.MessageLogin] = 17;
            this.messageModesMap[MessageMode.MessageStatus] = 18;
            this.messageModesMap[MessageMode.MessageLook] = 19;
            this.messageModesMap[MessageMode.MessageFailure] = 20;
            this.messageModesMap[MessageMode.MessageBlue] = 21;
            this.messageModesMap[MessageMode.MessageRed] = 22;
        } else if (version >= 840) {
            this.messageModesMap[MessageMode.MessageNone] = 0;
            this.messageModesMap[MessageMode.MessageSay] = 1;
            this.messageModesMap[MessageMode.MessageWhisper] = 2;
            this.messageModesMap[MessageMode.MessageYell] = 3;
            this.messageModesMap[MessageMode.MessageNpcTo] = 4;
            this.messageModesMap[MessageMode.MessageNpcFromStartBlock] = 5;
            this.messageModesMap[MessageMode.MessagePrivateFrom] = 6;
            this.messageModesMap[MessageMode.MessagePrivateTo] = 6;
            this.messageModesMap[MessageMode.MessageChannel] = 7;
            this.messageModesMap[MessageMode.MessageChannelManagement] = 8;
            this.messageModesMap[MessageMode.MessageRVRChannel] = 9;
            this.messageModesMap[MessageMode.MessageRVRAnswer] = 10;
            this.messageModesMap[MessageMode.MessageRVRContinue] = 11;
            this.messageModesMap[MessageMode.MessageGamemasterBroadcast] = 12;
            this.messageModesMap[MessageMode.MessageGamemasterChannel] = 13;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateFrom] = 14;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateTo] = 14;
            this.messageModesMap[MessageMode.MessageChannelHighlight] = 15;
            // 16, 17 ??
            this.messageModesMap[MessageMode.MessageRed] = 18;
            this.messageModesMap[MessageMode.MessageMonsterSay] = 19;
            this.messageModesMap[MessageMode.MessageMonsterYell] = 20;
            this.messageModesMap[MessageMode.MessageWarning] = 21;
            this.messageModesMap[MessageMode.MessageGame] = 22;
            this.messageModesMap[MessageMode.MessageLogin] = 23;
            this.messageModesMap[MessageMode.MessageStatus] = 24;
            this.messageModesMap[MessageMode.MessageLook] = 25;
            this.messageModesMap[MessageMode.MessageFailure] = 26;
            this.messageModesMap[MessageMode.MessageBlue] = 27;
        } else if (version >= 760) {
            this.messageModesMap[MessageMode.MessageNone] = 0;
            this.messageModesMap[MessageMode.MessageSay] = 1;
            this.messageModesMap[MessageMode.MessageWhisper] = 2;
            this.messageModesMap[MessageMode.MessageYell] = 3;
            this.messageModesMap[MessageMode.MessagePrivateFrom] = 4;
            this.messageModesMap[MessageMode.MessagePrivateTo] = 4;
            this.messageModesMap[MessageMode.MessageChannel] = 5;
            this.messageModesMap[MessageMode.MessageRVRChannel] = 6;
            this.messageModesMap[MessageMode.MessageRVRAnswer] = 7;
            this.messageModesMap[MessageMode.MessageRVRContinue] = 8;
            this.messageModesMap[MessageMode.MessageGamemasterBroadcast] = 9;
            this.messageModesMap[MessageMode.MessageGamemasterChannel] = 10;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateFrom] = 11;
            this.messageModesMap[MessageMode.MessageGamemasterPrivateTo] = 11;
            this.messageModesMap[MessageMode.MessageChannelHighlight] = 12;
            // 13, 14, 15 ??
            this.messageModesMap[MessageMode.MessageMonsterSay] = 16;
            this.messageModesMap[MessageMode.MessageMonsterYell] = 17;
            this.messageModesMap[MessageMode.MessageWarning] = 18;
            this.messageModesMap[MessageMode.MessageGame] = 19;
            this.messageModesMap[MessageMode.MessageLogin] = 20;
            this.messageModesMap[MessageMode.MessageStatus] = 21;
            this.messageModesMap[MessageMode.MessageLook] = 22;
            this.messageModesMap[MessageMode.MessageFailure] = 23;
            this.messageModesMap[MessageMode.MessageBlue] = 24;
            this.messageModesMap[MessageMode.MessageRed] = 25;
        }
    }

    updateFeatures(version: number) {
        this.m_features = [];
        this.enableFeature(GameFeature.GameFormatCreatureName);

        if(version >= 770) {
            this.enableFeature(GameFeature.GameLooktypeU16);
            this.enableFeature(GameFeature.GameMessageStatements);
            this.enableFeature(GameFeature.GameLoginPacketEncryption);
        }

        if(version >= 780) {
            this.enableFeature(GameFeature.GamePlayerAddons);
            this.enableFeature(GameFeature.GamePlayerStamina);
            this.enableFeature(GameFeature.GameNewFluids);
            this.enableFeature(GameFeature.GameMessageLevel);
            this.enableFeature(GameFeature.GamePlayerStateU16);
            this.enableFeature(GameFeature.GameNewOutfitProtocol);
        }

        if(version >= 790) {
            this.enableFeature(GameFeature.GameWritableDate);
        }

        if(version >= 840) {
            this.enableFeature(GameFeature.GameProtocolChecksum);
            this.enableFeature(GameFeature.GameAccountNames);
            this.enableFeature(GameFeature.GameDoubleFreeCapacity);
        }

        if(version >= 841) {
            this.enableFeature(GameFeature.GameChallengeOnLogin);
            this.enableFeature(GameFeature.GameMessageSizeCheck);
        }

        if(version >= 854) {
            this.enableFeature(GameFeature.GameCreatureEmblems);
        }

        if(version >= 860) {
            this.enableFeature(GameFeature.GameAttackSeq);
        }

        if(version >= 862) {
            this.enableFeature(GameFeature.GamePenalityOnDeath);
        }

        if(version >= 870) {
            this.enableFeature(GameFeature.GameDoubleExperience);
            this.enableFeature(GameFeature.GamePlayerMounts);
            this.enableFeature(GameFeature.GameSpellList);
        }

        if(version >= 910) {
            this.enableFeature(GameFeature.GameNameOnNpcTrade);
            this.enableFeature(GameFeature.GameTotalCapacity);
            this.enableFeature(GameFeature.GameSkillsBase);
            this.enableFeature(GameFeature.GamePlayerRegenerationTime);
            this.enableFeature(GameFeature.GameChannelPlayerList);
            this.enableFeature(GameFeature.GameEnvironmentEffect);
            this.enableFeature(GameFeature.GameItemAnimationPhase);
        }

        if(version >= 940) {
            this.enableFeature(GameFeature.GamePlayerMarket);
        }

        if(version >= 953) {
            this.enableFeature(GameFeature.GamePurseSlot);
            this.enableFeature(GameFeature.GameClientPing);
        }

        if(version >= 960) {
            this.enableFeature(GameFeature.GameSpritesU32);
            this.enableFeature(GameFeature.GameOfflineTrainingTime);
        }

        if(version >= 963) {
            this.enableFeature(GameFeature.GameAdditionalVipInfo);
        }

        if(version >= 980) {
            this.enableFeature(GameFeature.GamePreviewState);
            this.enableFeature(GameFeature.GameClientVersion);
        }

        if(version >= 981) {
            this.enableFeature(GameFeature.GameLoginPending);
            this.enableFeature(GameFeature.GameNewSpeedLaw);
        }

        if(version >= 984) {
            this.enableFeature(GameFeature.GameContainerPagination);
            this.enableFeature(GameFeature.GameBrowseField);
        }

        if(version >= 1000) {
            this.enableFeature(GameFeature.GameThingMarks);
            this.enableFeature(GameFeature.GamePVPMode);
        }

        if(version >= 1035) {
            this.enableFeature(GameFeature.GameDoubleSkills);
            this.enableFeature(GameFeature.GameBaseSkillU16);
        }

        if(version >= 1036) {
            this.enableFeature(GameFeature.GameCreatureIcons);
            this.enableFeature(GameFeature.GameHideNpcNames);
        }

        if(version >= 1038) {
            this.enableFeature(GameFeature.GamePremiumExpiration);
        }

        if(version >= 1050) {
            this.enableFeature(GameFeature.GameEnhancedAnimations);
        }

        if(version >= 1053) {
            this.enableFeature(GameFeature.GameUnjustifiedPoints);
        }

        if(version >= 1054) {
            this.enableFeature(GameFeature.GameExperienceBonus);
        }

        if(version >= 1055) {
            this.enableFeature(GameFeature.GameDeathType);
        }

        if(version >= 1057) {
            this.enableFeature(GameFeature.GameIdleAnimations);
        }

        if(version >= 1061) {
            this.enableFeature(GameFeature.GameOGLInformation);
        }

        if(version >= 1071) {
            this.enableFeature(GameFeature.GameContentRevision);
        }

        if(version >= 1072) {
            this.enableFeature(GameFeature.GameAuthenticator);
        }

        if(version >= 1074) {
            this.enableFeature(GameFeature.GameSessionKey);
        }

        if(version >= 1080) {
            this.enableFeature(GameFeature.GameIngameStore);
        }

        if(version >= 1092) {
            this.enableFeature(GameFeature.GameIngameStoreServiceType);
        }

        if(version >= 1093) {
            this.enableFeature(GameFeature.GameIngameStoreHighlights);
        }

        if(version >= 1094) {
            this.enableFeature(GameFeature.GameAdditionalSkills);
        }
    }


    enableFeature(feature: GameFeature) {
        this.m_features[feature] = true;
    }
    disableFeature(feature: GameFeature) {
        this.m_features[feature] = false;
    }

    getFeature(feature: GameFeature): boolean {
        return this.m_features[feature] == true;
    }

    translateMessageModeFromServer(mode: number): MessageMode {
        for(let i in this.messageModesMap) {
            if (this.messageModesMap[i] == mode) {
                return parseInt(i);
            }
        }
        return MessageMode.MessageInvalid;
    }

    getContainer(containerId: number): Container {
        return new Container();
    }

    get g_things(): ThingTypeManager {
        return new ThingTypeManager();
    }

    get g_map(): Map {
        return new Map();
    }

    getClientVersion(): number {
        return this.m_clientVersion;
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

    getLocalPlayer(): LocalPlayer {
        return this.m_localPlayer;
    }

    login(accountName: string, accountPassword: string, characterName: string) {
        this.m_protocolGame = new ProtocolGame(this);
        this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
    }

    formatCreatureName(string: string): string {
        return string;
    }
}

let g_game = new Game();
export {g_game}