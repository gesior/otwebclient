webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Otc;
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
})(Otc = exports.Otc || (exports.Otc = {}));
var DrawFlags;
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
})(DrawFlags = exports.DrawFlags || (exports.DrawFlags = {}));
var DatOpts;
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
})(DatOpts = exports.DatOpts || (exports.DatOpts = {}));
var InventorySlot;
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
})(InventorySlot = exports.InventorySlot || (exports.InventorySlot = {}));
var Statistic;
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
})(Statistic = exports.Statistic || (exports.Statistic = {}));
var Skill;
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
})(Skill = exports.Skill || (exports.Skill = {}));
var Direction;
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
})(Direction = exports.Direction || (exports.Direction = {}));
var FluidsColor;
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidTransparent"] = 0] = "FluidTransparent";
    FluidsColor[FluidsColor["FluidBlue"] = 1] = "FluidBlue";
    FluidsColor[FluidsColor["FluidRed"] = 2] = "FluidRed";
    FluidsColor[FluidsColor["FluidBrown"] = 3] = "FluidBrown";
    FluidsColor[FluidsColor["FluidGreen"] = 4] = "FluidGreen";
    FluidsColor[FluidsColor["FluidYellow"] = 5] = "FluidYellow";
    FluidsColor[FluidsColor["FluidWhite"] = 6] = "FluidWhite";
    FluidsColor[FluidsColor["FluidPurple"] = 7] = "FluidPurple";
})(FluidsColor = exports.FluidsColor || (exports.FluidsColor = {}));
var FluidsType;
(function (FluidsType) {
    FluidsType[FluidsType["FluidNone"] = 0] = "FluidNone";
    FluidsType[FluidsType["FluidWater"] = 1] = "FluidWater";
    FluidsType[FluidsType["FluidMana"] = 2] = "FluidMana";
    FluidsType[FluidsType["FluidBeer"] = 3] = "FluidBeer";
    FluidsType[FluidsType["FluidOil"] = 4] = "FluidOil";
    FluidsType[FluidsType["FluidBlood"] = 5] = "FluidBlood";
    FluidsType[FluidsType["FluidSlime"] = 6] = "FluidSlime";
    FluidsType[FluidsType["FluidMud"] = 7] = "FluidMud";
    FluidsType[FluidsType["FluidLemonade"] = 8] = "FluidLemonade";
    FluidsType[FluidsType["FluidMilk"] = 9] = "FluidMilk";
    FluidsType[FluidsType["FluidWine"] = 10] = "FluidWine";
    FluidsType[FluidsType["FluidHealth"] = 11] = "FluidHealth";
    FluidsType[FluidsType["FluidUrine"] = 12] = "FluidUrine";
    FluidsType[FluidsType["FluidRum"] = 13] = "FluidRum";
    FluidsType[FluidsType["FluidFruidJuice"] = 14] = "FluidFruidJuice";
    FluidsType[FluidsType["FluidCoconutMilk"] = 15] = "FluidCoconutMilk";
    FluidsType[FluidsType["FluidTea"] = 16] = "FluidTea";
    FluidsType[FluidsType["FluidMead"] = 17] = "FluidMead";
})(FluidsType = exports.FluidsType || (exports.FluidsType = {}));
var FightModes;
(function (FightModes) {
    FightModes[FightModes["FightOffensive"] = 1] = "FightOffensive";
    FightModes[FightModes["FightBalanced"] = 2] = "FightBalanced";
    FightModes[FightModes["FightDefensive"] = 3] = "FightDefensive";
})(FightModes = exports.FightModes || (exports.FightModes = {}));
var ChaseModes;
(function (ChaseModes) {
    ChaseModes[ChaseModes["DontChase"] = 0] = "DontChase";
    ChaseModes[ChaseModes["ChaseOpponent"] = 1] = "ChaseOpponent";
})(ChaseModes = exports.ChaseModes || (exports.ChaseModes = {}));
var PVPModes;
(function (PVPModes) {
    PVPModes[PVPModes["WhiteDove"] = 0] = "WhiteDove";
    PVPModes[PVPModes["WhiteHand"] = 1] = "WhiteHand";
    PVPModes[PVPModes["YellowHand"] = 2] = "YellowHand";
    PVPModes[PVPModes["RedFist"] = 3] = "RedFist";
})(PVPModes = exports.PVPModes || (exports.PVPModes = {}));
var PlayerSkulls;
(function (PlayerSkulls) {
    PlayerSkulls[PlayerSkulls["SkullNone"] = 0] = "SkullNone";
    PlayerSkulls[PlayerSkulls["SkullYellow"] = 1] = "SkullYellow";
    PlayerSkulls[PlayerSkulls["SkullGreen"] = 2] = "SkullGreen";
    PlayerSkulls[PlayerSkulls["SkullWhite"] = 3] = "SkullWhite";
    PlayerSkulls[PlayerSkulls["SkullRed"] = 4] = "SkullRed";
    PlayerSkulls[PlayerSkulls["SkullBlack"] = 5] = "SkullBlack";
    PlayerSkulls[PlayerSkulls["SkullOrange"] = 6] = "SkullOrange";
})(PlayerSkulls = exports.PlayerSkulls || (exports.PlayerSkulls = {}));
;
var PlayerShields;
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
})(PlayerShields = exports.PlayerShields || (exports.PlayerShields = {}));
var PlayerEmblems;
(function (PlayerEmblems) {
    PlayerEmblems[PlayerEmblems["EmblemNone"] = 0] = "EmblemNone";
    PlayerEmblems[PlayerEmblems["EmblemGreen"] = 1] = "EmblemGreen";
    PlayerEmblems[PlayerEmblems["EmblemRed"] = 2] = "EmblemRed";
    PlayerEmblems[PlayerEmblems["EmblemBlue"] = 3] = "EmblemBlue";
    PlayerEmblems[PlayerEmblems["EmblemMember"] = 4] = "EmblemMember";
    PlayerEmblems[PlayerEmblems["EmblemOther"] = 5] = "EmblemOther";
})(PlayerEmblems = exports.PlayerEmblems || (exports.PlayerEmblems = {}));
var CreatureIcons;
(function (CreatureIcons) {
    CreatureIcons[CreatureIcons["NpcIconNone"] = 0] = "NpcIconNone";
    CreatureIcons[CreatureIcons["NpcIconChat"] = 1] = "NpcIconChat";
    CreatureIcons[CreatureIcons["NpcIconTrade"] = 2] = "NpcIconTrade";
    CreatureIcons[CreatureIcons["NpcIconQuest"] = 3] = "NpcIconQuest";
    CreatureIcons[CreatureIcons["NpcIconTradeQuest"] = 4] = "NpcIconTradeQuest";
})(CreatureIcons = exports.CreatureIcons || (exports.CreatureIcons = {}));
var PlayerStates;
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
})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));
var MessageMode;
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
})(MessageMode = exports.MessageMode || (exports.MessageMode = {}));
var GameFeature;
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
})(GameFeature = exports.GameFeature || (exports.GameFeature = {}));
var PathFindResult;
(function (PathFindResult) {
    PathFindResult[PathFindResult["PathFindResultOk"] = 0] = "PathFindResultOk";
    PathFindResult[PathFindResult["PathFindResultSamePosition"] = 1] = "PathFindResultSamePosition";
    PathFindResult[PathFindResult["PathFindResultImpossible"] = 2] = "PathFindResultImpossible";
    PathFindResult[PathFindResult["PathFindResultTooFar"] = 3] = "PathFindResultTooFar";
    PathFindResult[PathFindResult["PathFindResultNoWay"] = 4] = "PathFindResultNoWay";
})(PathFindResult = exports.PathFindResult || (exports.PathFindResult = {}));
var PathFindFlags;
(function (PathFindFlags) {
    PathFindFlags[PathFindFlags["PathFindAllowNotSeenTiles"] = 1] = "PathFindAllowNotSeenTiles";
    PathFindFlags[PathFindFlags["PathFindAllowCreatures"] = 2] = "PathFindAllowCreatures";
    PathFindFlags[PathFindFlags["PathFindAllowNonPathable"] = 4] = "PathFindAllowNonPathable";
    PathFindFlags[PathFindFlags["PathFindAllowNonWalkable"] = 8] = "PathFindAllowNonWalkable";
})(PathFindFlags = exports.PathFindFlags || (exports.PathFindFlags = {}));
var AutomapFlags;
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
})(AutomapFlags = exports.AutomapFlags || (exports.AutomapFlags = {}));
var VipState;
(function (VipState) {
    VipState[VipState["VipStateOffline"] = 0] = "VipStateOffline";
    VipState[VipState["VipStateOnline"] = 1] = "VipStateOnline";
    VipState[VipState["VipStatePending"] = 2] = "VipStatePending";
})(VipState = exports.VipState || (exports.VipState = {}));
var SpeedFormula;
(function (SpeedFormula) {
    SpeedFormula[SpeedFormula["SpeedFormulaA"] = 0] = "SpeedFormulaA";
    SpeedFormula[SpeedFormula["SpeedFormulaB"] = 1] = "SpeedFormulaB";
    SpeedFormula[SpeedFormula["SpeedFormulaC"] = 2] = "SpeedFormulaC";
    SpeedFormula[SpeedFormula["LastSpeedFormula"] = 3] = "LastSpeedFormula";
})(SpeedFormula = exports.SpeedFormula || (exports.SpeedFormula = {}));
var Blessings;
(function (Blessings) {
    Blessings[Blessings["BlessingNone"] = 0] = "BlessingNone";
    Blessings[Blessings["BlessingAdventurer"] = 1] = "BlessingAdventurer";
    Blessings[Blessings["BlessingSpiritualShielding"] = 2] = "BlessingSpiritualShielding";
    Blessings[Blessings["BlessingEmbraceOfTibia"] = 4] = "BlessingEmbraceOfTibia";
    Blessings[Blessings["BlessingFireOfSuns"] = 8] = "BlessingFireOfSuns";
    Blessings[Blessings["BlessingWisdomOfSolitude"] = 16] = "BlessingWisdomOfSolitude";
    Blessings[Blessings["BlessingSparkOfPhoenix"] = 32] = "BlessingSparkOfPhoenix";
})(Blessings = exports.Blessings || (exports.Blessings = {}));
var DeathType;
(function (DeathType) {
    DeathType[DeathType["DeathRegular"] = 0] = "DeathRegular";
    DeathType[DeathType["DeathBlessed"] = 1] = "DeathBlessed";
})(DeathType = exports.DeathType || (exports.DeathType = {}));
var StoreProductTypes;
(function (StoreProductTypes) {
    StoreProductTypes[StoreProductTypes["ProductTypeOther"] = 0] = "ProductTypeOther";
    StoreProductTypes[StoreProductTypes["ProductTypeNameChange"] = 1] = "ProductTypeNameChange";
})(StoreProductTypes = exports.StoreProductTypes || (exports.StoreProductTypes = {}));
var StoreErrorTypes;
(function (StoreErrorTypes) {
    StoreErrorTypes[StoreErrorTypes["StoreNoError"] = -1] = "StoreNoError";
    StoreErrorTypes[StoreErrorTypes["StorePurchaseError"] = 0] = "StorePurchaseError";
    StoreErrorTypes[StoreErrorTypes["StoreNetworkError"] = 1] = "StoreNetworkError";
    StoreErrorTypes[StoreErrorTypes["StoreHistoryError"] = 2] = "StoreHistoryError";
    StoreErrorTypes[StoreErrorTypes["StoreTransferError"] = 3] = "StoreTransferError";
    StoreErrorTypes[StoreErrorTypes["StoreInformation"] = 4] = "StoreInformation";
})(StoreErrorTypes = exports.StoreErrorTypes || (exports.StoreErrorTypes = {}));
var StoreStates;
(function (StoreStates) {
    StoreStates[StoreStates["StateNone"] = 0] = "StateNone";
    StoreStates[StoreStates["StateNew"] = 1] = "StateNew";
    StoreStates[StoreStates["StateSale"] = 2] = "StateSale";
    StoreStates[StoreStates["StateTimed"] = 3] = "StateTimed";
})(StoreStates = exports.StoreStates || (exports.StoreStates = {}));
var FrameGroupType;
(function (FrameGroupType) {
    FrameGroupType[FrameGroupType["FrameGroupDefault"] = 0] = "FrameGroupDefault";
    FrameGroupType[FrameGroupType["FrameGroupIdle"] = 0] = "FrameGroupIdle";
    FrameGroupType[FrameGroupType["FrameGroupMoving"] = 1] = "FrameGroupMoving";
})(FrameGroupType = exports.FrameGroupType || (exports.FrameGroupType = {}));
var ThingCategory;
(function (ThingCategory) {
    ThingCategory[ThingCategory["ThingCategoryItem"] = 0] = "ThingCategoryItem";
    ThingCategory[ThingCategory["ThingCategoryCreature"] = 1] = "ThingCategoryCreature";
    ThingCategory[ThingCategory["ThingCategoryEffect"] = 2] = "ThingCategoryEffect";
    ThingCategory[ThingCategory["ThingCategoryMissile"] = 3] = "ThingCategoryMissile";
    ThingCategory[ThingCategory["ThingInvalidCategory"] = 4] = "ThingInvalidCategory";
    ThingCategory[ThingCategory["ThingLastCategory"] = 4] = "ThingLastCategory";
})(ThingCategory = exports.ThingCategory || (exports.ThingCategory = {}));
var ThingAttr;
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
})(ThingAttr = exports.ThingAttr || (exports.ThingAttr = {}));
var SpriteMask;
(function (SpriteMask) {
    SpriteMask[SpriteMask["SpriteMaskRed"] = 1] = "SpriteMaskRed";
    SpriteMask[SpriteMask["SpriteMaskGreen"] = 2] = "SpriteMaskGreen";
    SpriteMask[SpriteMask["SpriteMaskBlue"] = 3] = "SpriteMaskBlue";
    SpriteMask[SpriteMask["SpriteMaskYellow"] = 4] = "SpriteMaskYellow";
})(SpriteMask = exports.SpriteMask || (exports.SpriteMask = {}));
var AnimationPhase;
(function (AnimationPhase) {
    AnimationPhase[AnimationPhase["AnimPhaseAutomatic"] = -1] = "AnimPhaseAutomatic";
    AnimationPhase[AnimationPhase["AnimPhaseRandom"] = 254] = "AnimPhaseRandom";
    AnimationPhase[AnimationPhase["AnimPhaseAsync"] = 255] = "AnimPhaseAsync";
})(AnimationPhase = exports.AnimationPhase || (exports.AnimationPhase = {}));
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["AnimDirForward"] = 0] = "AnimDirForward";
    AnimationDirection[AnimationDirection["AnimDirBackward"] = 1] = "AnimDirBackward";
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var log = function log() {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.log.apply(this, v);
    $('#status').text(v.join(','));
};
exports.log = log;
var error = function error() {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.error.apply(this, v);
    console.log.apply(this, [new Error().stack]);
    $('#status').text(v.join(','));
};
exports.error = error;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var UnjustifiedPoints = function () {
    function UnjustifiedPoints() {}
    return UnjustifiedPoints;
}();
exports.UnjustifiedPoints = UnjustifiedPoints;
var AwareRange = function () {
    function AwareRange() {
        this.top = 6;
        this.right = 9;
        this.bottom = 7;
        this.left = 8;
    }
    AwareRange.prototype.horizontal = function () {
        return this.left + this.right + 1;
    };
    AwareRange.prototype.vertical = function () {
        return this.top + this.bottom + 1;
    };
    return AwareRange;
}();
exports.AwareRange = AwareRange;
var MarketData = function () {
    function MarketData() {}
    return MarketData;
}();
exports.MarketData = MarketData;
var Light = function () {
    function Light() {
        this.intensity = 0;
        this.color = 215;
    }
    return Light;
}();
exports.Light = Light;
var g_clock = function () {
    function g_clock() {}
    g_clock.millis = function () {
        return +new Date();
    };
    return g_clock;
}();
exports.g_clock = g_clock;
var Timer = function () {
    function Timer() {
        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }
    Timer.prototype.restart = function () {
        this.m_startTicks = g_clock.millis();
        this.m_stopped = false;
    };
    Timer.prototype.stop = function () {
        this.m_stopped = true;
    };
    Timer.prototype.startTicks = function () {
        return this.m_startTicks;
    };
    Timer.prototype.ticksElapsed = function () {
        return g_clock.millis() - this.m_startTicks;
    };
    Timer.prototype.timeElapsed = function () {
        return this.ticksElapsed() / 1000;
    };
    Timer.prototype.running = function () {
        return !this.m_stopped;
    };
    return Timer;
}();
exports.Timer = Timer;
var Point = function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    Point.prototype.sub = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    Point.prototype.mul = function (ratio) {
        return new Point(this.x * ratio, this.y * ratio);
    };
    return Point;
}();
exports.Point = Point;
var Rect = function () {
    function Rect(p1, p2) {}
    return Rect;
}();
exports.Rect = Rect;
var Texture = function () {
    function Texture(image, buildMipmaps, compress) {
        if (buildMipmaps === void 0) {
            buildMipmaps = false;
        }
        if (compress === void 0) {
            compress = false;
        }
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
    }
    return Texture;
}();
exports.Texture = Texture;
var Size = function () {
    function Size(wd, ht) {
        if (wd === void 0) {
            wd = -1;
        }
        if (ht === void 0) {
            ht = -1;
        }
        this.wd = wd;
        this.ht = ht;
    }
    Size.prototype.add = function (size) {
        return new Size(this.wd + size.wd, this.ht + size.ht);
    };
    Size.prototype.sub = function (size) {
        return new Size(this.wd - size.wd, this.ht - size.ht);
    };
    Size.prototype.mul = function (ratio) {
        return new Size(this.wd * ratio, this.ht * ratio);
    };
    Size.prototype.isNull = function () {
        return this.wd == 0 && this.ht == 0;
    };
    Size.prototype.isEmpty = function () {
        return this.wd < 1 || this.ht < 1;
    };
    Size.prototype.isValid = function () {
        return this.wd >= 0 && this.ht >= 0;
    };
    Size.prototype.width = function () {
        return this.wd;
    };
    Size.prototype.height = function () {
        return this.ht;
    };
    Size.prototype.resize = function (w, h) {
        this.wd = w;
        this.ht = h;
    };
    Size.prototype.setWidth = function (w) {
        this.wd = w;
    };
    Size.prototype.setHeight = function (h) {
        this.ht = h;
    };
    Size.prototype.ratio = function () {
        return this.wd / this.ht;
    };
    Size.prototype.area = function () {
        return this.wd * this.ht;
    };
    return Size;
}();
exports.Size = Size;
var ThingTypeAttribs = function () {
    function ThingTypeAttribs() {
        this.attribs = {};
    }
    ThingTypeAttribs.prototype.has = function (attr) {
        return this.attribs.hasOwnProperty(attr.toString());
    };
    ThingTypeAttribs.prototype.get = function (attr) {
        return this.attribs[attr];
    };
    ThingTypeAttribs.prototype.set = function (attr, value) {
        this.attribs[attr] = value;
    };
    ThingTypeAttribs.prototype.remove = function (attr) {
        delete this.attribs[attr];
    };
    return ThingTypeAttribs;
}();
exports.ThingTypeAttribs = ThingTypeAttribs;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var localplayer_1 = __webpack_require__(12);
var const_1 = __webpack_require__(0);
var thingtypemanager_1 = __webpack_require__(18);
var protocolgame_1 = __webpack_require__(14);
var log_1 = __webpack_require__(2);
var map_1 = __webpack_require__(13);
var container_1 = __webpack_require__(11);
var Game = function () {
    function Game() {}
    Game.prototype.setUnjustifiedPoints = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Game.prototype.processEnterGame = function () {
        throw new Error("Method not implemented.");
    };
    Game.prototype.getContainer = function (containerId) {
        return new container_1.Container();
    };
    Game.prototype.processGameStart = function () {
        log_1.error('Method not implemented.');
    };
    Object.defineProperty(Game.prototype, "g_things", {
        get: function get() {
            return new thingtypemanager_1.ThingTypeManager();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "g_map", {
        get: function get() {
            return new map_1.Map();
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.getClientVersion = function () {
        return 3;
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
    Game.prototype.getFeature = function (feature) {
        switch (feature) {
            case const_1.GameFeature.GameChallengeOnLogin:
                return true;
        }
        return false;
    };
    Game.prototype.getLocalPlayer = function () {
        return new localplayer_1.LocalPlayer();
    };
    Game.prototype.login = function (accountName, accountPassword, characterName) {
        this.m_protocolGame = new protocolgame_1.ProtocolGame(this);
        this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
    };
    Game.prototype.setExpertPvpMode = function (expertModeEnabled) {};
    Game.prototype.setServerBeat = function (serverBeat) {};
    Game.prototype.setCanReportBugs = function (canReportBugs) {};
    Game.prototype.processLogin = function () {};
    Game.prototype.processPendingGame = function () {};
    Game.prototype.setOpenPvpSituations = function (openPvpSituations) {};
    Game.prototype.processPlayerHelpers = function (helpers) {};
    Game.prototype.processGMActions = function (actions) {};
    Game.prototype.processUpdateNeeded = function (signature) {};
    Game.prototype.processLoginError = function (error) {};
    Game.prototype.processLoginAdvice = function (message) {};
    Game.prototype.processLoginWait = function (message, time) {};
    Game.prototype.processLoginToken = function (unknown) {};
    Game.prototype.processPingBack = function () {};
    Game.prototype.processDeath = function (deathType, penality) {};
    Game.prototype.processOpenContainer = function (containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex) {};
    Game.prototype.processCloseContainer = function (containerId) {};
    Game.prototype.processContainerAddItem = function (containerId, item, slot) {};
    Game.prototype.processContainerUpdateItem = function (containerId, slot, item) {};
    Game.prototype.processContainerRemoveItem = function (containerId, slot, lastItem) {};
    Game.prototype.processInventoryChange = function (slot, item) {};
    Game.prototype.processOpenNpcTrade = function (items) {};
    Game.prototype.processPlayerGoods = function (money, goods) {};
    Game.prototype.formatCreatureName = function (string) {
        return string;
    };
    Game.prototype.processCloseNpcTrade = function () {};
    Game.prototype.processOwnTrade = function (name, items) {};
    Game.prototype.processCounterTrade = function (name, items) {};
    Game.prototype.processCloseTrade = function () {};
    return Game;
}();
exports.Game = Game;
var g_game = new Game();
exports.g_game = g_game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Color = function () {
    function Color() {}
    Color.from8bit = function (arg0) {
        throw new Error("Method not implemented.");
    };
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
exports.Color = Color;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = __webpack_require__(20);
var Creature = function (_super) {
    __extends(Creature, _super);
    function Creature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Creature.prototype.addTimedSquare = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.hideStaticSquare = function () {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.showStaticSquare = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Creature.prototype.setType = function (type) {};
    Creature.prototype.allowAppearWalk = function () {};
    Creature.prototype.setHealthPercent = function (healthPercent) {};
    Creature.prototype.setLight = function (light) {};
    Creature.prototype.setOutfit = function (outfit) {};
    Creature.prototype.setSpeed = function (speed) {};
    Creature.prototype.setBaseSpeed = function (baseSpeed) {};
    Creature.prototype.setSkull = function (skull) {};
    Creature.prototype.setShield = function (shield) {};
    Creature.prototype.setPassable = function (v) {};
    return Creature;
}(thing_1.Thing);
exports.Creature = Creature;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(2);
var color_1 = __webpack_require__(5);
var structures_1 = __webpack_require__(3);
var Image = function () {
    function Image(size) {
        if (size instanceof structures_1.Size) {} else if (typeof size == 'number') {}
    }
    Image.prototype.blit = function (point, image) {};
    Image.prototype.overwriteMask = function (color, insideColor, outsideColor) {
        if (insideColor === void 0) {
            insideColor = color_1.Color.white;
        }
        if (outsideColor === void 0) {
            outsideColor = color_1.Color.alpha;
        }
    };
    Image.load = function (path) {
        log_1.error('load image', path);
        return null;
    };
    Image.prototype.setId = function (id) {};
    return Image;
}();
exports.Image = Image;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
__webpack_require__(8);
var const_1 = __webpack_require__(0);
var game_1 = __webpack_require__(4);
var x = const_1.Otc.MAX_AUTOWALK_DIST;
$(function () {
    var game = new game_1.Game();
    game.login('', '', '');
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = __webpack_require__(0);
var Animator = function () {
    function Animator() {
        this.m_animationPhases = 0;
        this.m_startPhase = 0;
        this.m_loopCount = 0;
        this.m_async = false;
        this.m_phaseDurations = [];
        this.m_currentDuration = 0;
        this.m_currentDirection = const_1.AnimationDirection.AnimDirForward;
        this.m_currentLoop = 0;
        this.m_lastPhaseTicks = 0;
        this.m_isComplete = false;
        this.m_phase = 0;
    }
    Animator.prototype.unserialize = function (animationPhases, fin) {
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
    };
    return Animator;
}();
exports.Animator = Animator;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Container = function () {
    function Container() {}
    Container.prototype.setId = function (id) {};
    return Container;
}();
exports.Container = Container;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __webpack_require__(15);
var LocalPlayer = function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalPlayer.prototype.setBlessings = function (blessings) {};
    return LocalPlayer;
}(player_1.Player);
exports.LocalPlayer = LocalPlayer;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var structures_1 = __webpack_require__(3);
var creature_1 = __webpack_require__(6);
var tile_1 = __webpack_require__(19);
var Map = function () {
    function Map() {
        this.m_awareRange = new structures_1.AwareRange();
        this.tmpCreature = new creature_1.Creature();
    }
    Map.prototype.getTile = function (position) {
        return new tile_1.Tile();
    };
    Map.prototype.setAwareRange = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Map.prototype.getCreatureById = function (id) {
        return this.tmpCreature;
    };
    Map.prototype.getAwareRange = function () {
        return this.m_awareRange;
    };
    Map.prototype.getCentralPosition = function () {
        return this.m_centralPosition;
    };
    Map.prototype.setCentralPosition = function (pos) {
        this.m_centralPosition = pos;
    };
    Map.prototype.cleanTile = function (tilePos) {};
    Map.prototype.addThing = function (thing, position, stackPos) {
        if (stackPos === void 0) {
            stackPos = -1;
        }
    };
    Map.prototype.removeThing = function (thing) {
        return false;
    };
    Map.prototype.setLight = function (light) {};
    Map.prototype.getThing = function (pos, stackpos) {};
    Map.prototype.removeCreatureById = function (removeId) {};
    return Map;
}();
exports.Map = Map;
var g_map = new Map();
exports.g_map = g_map;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (1879:21)\n\n\u001b[0m \u001b[90m 1877 | \u001b[39m                        creatureType \u001b[33m=\u001b[39m proto_1\u001b[33m.\u001b[39m\u001b[33mProto\u001b[39m\u001b[33m.\u001b[39m\u001b[33mCreatureTypeNpc\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 1878 | \u001b[39m                }\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 1879 | \u001b[39m                std\u001b[33m:\u001b[39m \u001b[33m:\u001b[39m string\u001b[33m;\u001b[39m\n \u001b[90m      | \u001b[39m                     \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 1880 | \u001b[39m                name \u001b[33m=\u001b[39m game_1\u001b[33m.\u001b[39mg_game\u001b[33m.\u001b[39mformatCreatureName(msg\u001b[33m.\u001b[39mgetString())\u001b[33m;\u001b[39m\n \u001b[90m 1881 | \u001b[39m                \u001b[36mif\u001b[39m (id \u001b[33m==\u001b[39m m_localPlayer\u001b[33m.\u001b[39mgetId())\n \u001b[90m 1882 | \u001b[39m                    creature \u001b[33m=\u001b[39m m_localPlayer\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var creature_1 = __webpack_require__(6);
var Player = function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(creature_1.Creature);
exports.Player = Player;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __webpack_require__(7);
var SpriteManager = function () {
    function SpriteManager() {
        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
    }
    SpriteManager.prototype.getSpriteImage = function (id) {
        return new image_1.Image(0);
    };
    return SpriteManager;
}();
exports.SpriteManager = SpriteManager;
var g_sprites = new SpriteManager();
exports.g_sprites = g_sprites;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = __webpack_require__(0);
var structures_1 = __webpack_require__(3);
var game_1 = __webpack_require__(4);
var log_1 = __webpack_require__(2);
var animator_1 = __webpack_require__(10);
var image_1 = __webpack_require__(7);
var color_1 = __webpack_require__(5);
var spritemanager_1 = __webpack_require__(16);
var ThingType = function () {
    function ThingType() {
        this.m_attribs = new structures_1.ThingTypeAttribs();
    }
    ThingType.prototype.unserialize = function (clientId, category, fin) {
        this.m_null = false;
        this.m_id = clientId;
        this.m_category = category;
        var count = 0,
            attr = -1;
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
                if (attr == 16) attr = const_1.ThingAttr.ThingAttrNoMoveAnimation;else if (attr > 16) attr -= 1;
            } else if (game_1.g_game.getClientVersion() >= 860) {
                /* Default attribute values follow
                 * the format of 8.6-9.86.
                 * Therefore no changes here.
                 */
            } else if (game_1.g_game.getClientVersion() >= 780) {
                /* In 7.80-8.54 all attributes from 8 and higher were
                 * incremented by 1 to make space for 8 as
                 * "Item Charges" flag.
                 */
                if (attr == 8) {
                    this.m_attribs.set(const_1.ThingAttr.ThingAttrChargeable, true);
                    continue;
                } else if (attr > 8) attr -= 1;
            } else if (game_1.g_game.getClientVersion() >= 755) {
                /* In 7.55-7.72 attributes 23 is "Floor Change". */
                if (attr == 23) attr = const_1.ThingAttr.ThingAttrFloorChange;
            } else if (game_1.g_game.getClientVersion() >= 740) {
                /* In 7.4-7.5 attribute "Ground Border" did not exist
                 * attributes 1-15 have to be adjusted.
                 * Several other changes in the format.
                 */
                if (attr > 0 && attr <= 15) attr += 1;else if (attr == 16) attr = const_1.ThingAttr.ThingAttrLight;else if (attr == 17) attr = const_1.ThingAttr.ThingAttrFloorChange;else if (attr == 18) attr = const_1.ThingAttr.ThingAttrFullGround;else if (attr == 19) attr = const_1.ThingAttr.ThingAttrElevation;else if (attr == 20) attr = const_1.ThingAttr.ThingAttrDisplacement;else if (attr == 22) attr = const_1.ThingAttr.ThingAttrMinimapColor;else if (attr == 23) attr = const_1.ThingAttr.ThingAttrRotateable;else if (attr == 24) attr = const_1.ThingAttr.ThingAttrLyingCorpse;else if (attr == 25) attr = const_1.ThingAttr.ThingAttrHangable;else if (attr == 26) attr = const_1.ThingAttr.ThingAttrHookSouth;else if (attr == 27) attr = const_1.ThingAttr.ThingAttrHookEast;else if (attr == 28) attr = const_1.ThingAttr.ThingAttrAnimateAlways;
                /* "Multi Use" and "Force Use" are swapped */
                if (attr == const_1.ThingAttr.ThingAttrMultiUse) attr = const_1.ThingAttr.ThingAttrForceUse;else if (attr == const_1.ThingAttr.ThingAttrForceUse) attr = const_1.ThingAttr.ThingAttrMultiUse;
            }
            switch (attr) {
                case const_1.ThingAttr.ThingAttrDisplacement:
                    {
                        if (game_1.g_game.getClientVersion() >= 755) {
                            this.m_displacement.x = fin.getU16();
                            this.m_displacement.y = fin.getU16();
                        } else {
                            this.m_displacement.x = 8;
                            this.m_displacement.y = 8;
                        }
                        this.m_attribs.set(attr, true);
                        break;
                    }
                case const_1.ThingAttr.ThingAttrLight:
                    {
                        var light = new structures_1.Light();
                        light.intensity = fin.getU16();
                        light.color = fin.getU16();
                        this.m_attribs.set(attr, light);
                        break;
                    }
                case const_1.ThingAttr.ThingAttrMarket:
                    {
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
                case const_1.ThingAttr.ThingAttrElevation:
                    {
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
        if (!done) log_1.error("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);
        var hasFrameGroups = category == const_1.ThingCategory.ThingCategoryCreature && game_1.g_game.getFeature(const_1.GameFeature.GameIdleAnimations);
        var groupCount = hasFrameGroups ? fin.getU8() : 1;
        this.m_animationPhases = 0;
        var totalSpritesCount = 0;
        for (var i = 0; i < groupCount; ++i) {
            var frameGroupType = const_1.FrameGroupType.FrameGroupDefault;
            if (hasFrameGroups) frameGroupType = fin.getU8();
            var width = fin.getU8();
            var height = fin.getU8();
            this.m_size = new structures_1.Size(width, height);
            if (width > 1 || height > 1) {
                this.m_realSize = fin.getU8();
                this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
            } else this.m_exactSize = 32;
            this.m_layers = fin.getU8();
            this.m_numPatternX = fin.getU8();
            this.m_numPatternY = fin.getU8();
            if (game_1.g_game.getClientVersion() >= 755) this.m_numPatternZ = fin.getU8();else this.m_numPatternZ = 1;
            var groupAnimationsPhases = fin.getU8();
            this.m_animationPhases += groupAnimationsPhases;
            if (groupAnimationsPhases > 1 && game_1.g_game.getFeature(const_1.GameFeature.GameEnhancedAnimations)) {
                this.m_animator = new animator_1.Animator();
                this.m_animator.unserialize(groupAnimationsPhases, fin);
            }
            var totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;
            if (totalSpritesCount + totalSprites > 4096) log_1.error("a thing type has more than 4096 sprites");
            //this.m_spritesIndex.resize((totalSpritesCount + totalSprites));
            for (var i_1 = totalSpritesCount; i_1 < totalSpritesCount + totalSprites; i_1++) {
                this.m_spritesIndex[i_1] = game_1.g_game.getFeature(const_1.GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
            }totalSpritesCount += totalSprites;
        }
        /*
                this.m_textures.resize(m_animationPhases);
                this.m_texturesFramesRects.resize(m_animationPhases);
                this.m_texturesFramesOriginRects.resize(m_animationPhases);
                this.m_texturesFramesOffsets.resize(m_animationPhases);
        */
    };
    ThingType.prototype.draw = function (dest, scaleFactor, layer, xPattern, yPattern, zPattern, animationPhase, lightView) {
        if (lightView === void 0) {
            lightView = null;
        }
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
        if (layer === void 0) {
            layer = 0;
        }
        if (xPattern === void 0) {
            xPattern = 0;
        }
        if (yPattern === void 0) {
            yPattern = 0;
        }
        if (zPattern === void 0) {
            zPattern = 0;
        }
        if (animationPhase === void 0) {
            animationPhase = 0;
        }
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
        if (v == true) this.m_attribs.remove(const_1.ThingAttr.ThingAttrNotPathable);else this.m_attribs.set(const_1.ThingAttr.ThingAttrNotPathable, true);
    };
    ThingType.prototype.getTexture = function (animationPhase) {
        var animationPhaseTexture = this.m_textures[animationPhase];
        if (!animationPhaseTexture) {
            var useCustomImage = false;
            if (animationPhase == 0 && !(this.m_customImage.length == 0)) useCustomImage = true;
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
            if (useCustomImage) fullImage = image_1.Image.load(this.m_customImage);else fullImage = new image_1.Image(textureSize.mul(const_1.Otc.TILE_PIXELS));
            /*
                    m_texturesFramesRects[animationPhase].resize(indexSize);
                    m_texturesFramesOriginRects[animationPhase].resize(indexSize);
                    m_texturesFramesOffsets[animationPhase].resize(indexSize);
            */
            for (var z = 0; z < this.m_numPatternZ; ++z) {
                for (var y = 0; y < this.m_numPatternY; ++y) {
                    for (var x = 0; x < this.m_numPatternX; ++x) {
                        for (var l = 0; l < numLayers; ++l) {
                            var spriteMask = this.m_category == const_1.ThingCategory.ThingCategoryCreature && l > 0;
                            var frameIndex = this.getTextureIndex(l % textureLayers, x, y, z);
                            var framePos = new structures_1.Point(frameIndex % (textureSize.width() / this.m_size.width()) * this.m_size.width() * const_1.Otc.TILE_PIXELS, frameIndex / (textureSize.width() / this.m_size.width()) * this.m_size.height() * const_1.Otc.TILE_PIXELS);
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
                            var drawRect = new structures_1.Rect(framePos.add(new structures_1.Point(this.m_size.width(), this.m_size.height())).mul(const_1.Otc.TILE_PIXELS).sub(new structures_1.Point(1, 1)), framePos);
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
        var index = (((((a % this.m_animationPhases * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x) * this.m_layers + l) * this.m_size.height() + h) * this.m_size.width() + w;
        if (index < this.m_spritesIndex.length) {
            throw new Error('index < this.m_spritesIndex.length');
        }
        return index;
    };
    ThingType.prototype.getTextureIndex = function (l, x, y, z) {
        return ((l * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x;
    };
    return ThingType;
}();
ThingType.maskColors = [color_1.Color.red, color_1.Color.green, color_1.Color.blue, color_1.Color.yellow];
exports.ThingType = ThingType;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var thingtype_1 = __webpack_require__(17);
var const_1 = __webpack_require__(0);
var log_1 = __webpack_require__(2);
var nullThingType = new thingtype_1.ThingType();
var ThingTypeManager = function () {
    function ThingTypeManager() {
        this.m_nullThingType = new thingtype_1.ThingType();
        this.m_thingTypes = null;
        this.m_thingTypes = [];
        for (var i = const_1.ThingCategory.ThingCategoryItem; i < const_1.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }
    ThingTypeManager.prototype.isValidDatId = function (id, category) {
        return true;
    };
    ThingTypeManager.prototype.getThingType = function (id, category) {
        if (category >= const_1.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            log_1.error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    };
    ThingTypeManager.prototype.rawGetThingType = function (id, category) {
        return this.getThingType(id, category);
    };
    ThingTypeManager.prototype.getNullThingType = function () {
        return nullThingType;
    };
    ThingTypeManager.prototype.getContentRevision = function () {
        throw new Error("Method not implemented.");
    };
    return ThingTypeManager;
}();
exports.ThingTypeManager = ThingTypeManager;
var g_things = new ThingTypeManager();
exports.g_things = g_things;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Tile = function () {
    function Tile() {}
    Tile.prototype.getThingStackPos = function (thing) {
        return 0;
    };
    return Tile;
}();
exports.Tile = Tile;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = __webpack_require__(13);
var game_1 = __webpack_require__(4);
var log_1 = __webpack_require__(2);
var thingtypemanager_1 = __webpack_require__(18);
var Thing = function () {
    function Thing() {}
    Thing.prototype.draw = function (dest, scaleFactor, animate, lightView) {
        if (lightView === void 0) {
            lightView = null;
        }
    };
    Thing.prototype.setId = function (id) {};
    Thing.prototype.setPosition = function (position) {
        if (this.m_position == position) return;
        var oldPos = this.m_position;
        this.m_position = position;
        this.onPositionChange(this.m_position, oldPos);
    };
    Thing.prototype.getId = function () {
        return 0;
    };
    Thing.prototype.getPosition = function () {
        return this.m_position;
    };
    Thing.prototype.getStackPriority = function () {
        if (this.isGround()) return 0;else if (this.isGroundBorder()) return 1;else if (this.isOnBottom()) return 2;else if (this.isOnTop()) return 3;else if (this.isCreature()) return 4;else return 5;
    };
    Thing.prototype.getTile = function () {
        return map_1.g_map.getTile(this.m_position);
    };
    Thing.prototype.getParentContainer = function () {
        if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
            var containerId = this.m_position.y ^ 0x40;
            return game_1.g_game.getContainer(containerId);
        }
        return null;
    };
    Thing.prototype.getStackPos = function () {
        if (this.m_position.x == 65535 && this.isItem()) return this.m_position.z;else {
            var tile = this.getTile();
            if (tile) return tile.getThingStackPos(this);else log_1.error("got a thing with invalid stackpos");
        }
        return -1;
    };
    Thing.prototype.isItem = function () {
        return false;
    };
    Thing.prototype.isEffect = function () {
        return false;
    };
    Thing.prototype.isMissile = function () {
        return false;
    };
    Thing.prototype.isCreature = function () {
        return false;
    };
    Thing.prototype.isNpc = function () {
        return false;
    };
    Thing.prototype.isMonster = function () {
        return false;
    };
    Thing.prototype.isPlayer = function () {
        return false;
    };
    Thing.prototype.isLocalPlayer = function () {
        return false;
    };
    Thing.prototype.isAnimatedText = function () {
        return false;
    };
    Thing.prototype.isStaticText = function () {
        return false;
    };
    // type shortcuts
    Thing.prototype.getThingType = function () {
        return thingtypemanager_1.g_things.getNullThingType();
    };
    Thing.prototype.rawGetThingType = function () {
        return thingtypemanager_1.g_things.getNullThingType();
    };
    Thing.prototype.getSize = function () {
        return this.rawGetThingType().getSize();
    };
    Thing.prototype.getWidth = function () {
        return this.rawGetThingType().getWidth();
    };
    Thing.prototype.getHeight = function () {
        return this.rawGetThingType().getHeight();
    };
    Thing.prototype.getDisplacement = function () {
        return this.rawGetThingType().getDisplacement();
    };
    Thing.prototype.getDisplacementX = function () {
        return this.rawGetThingType().getDisplacementX();
    };
    Thing.prototype.getDisplacementY = function () {
        return this.rawGetThingType().getDisplacementY();
    };
    Thing.prototype.getExactSize = function (layer, xPattern, yPattern, zPattern, animationPhase) {
        return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
    };
    Thing.prototype.getLayers = function () {
        return this.rawGetThingType().getLayers();
    };
    Thing.prototype.getNumPatternX = function () {
        return this.rawGetThingType().getNumPatternX();
    };
    Thing.prototype.getNumPatternY = function () {
        return this.rawGetThingType().getNumPatternY();
    };
    Thing.prototype.getNumPatternZ = function () {
        return this.rawGetThingType().getNumPatternZ();
    };
    Thing.prototype.getAnimationPhases = function () {
        return this.rawGetThingType().getAnimationPhases();
    };
    Thing.prototype.getAnimator = function () {
        return this.rawGetThingType().getAnimator();
    };
    Thing.prototype.getGroundSpeed = function () {
        return this.rawGetThingType().getGroundSpeed();
    };
    Thing.prototype.getMaxTextLength = function () {
        return this.rawGetThingType().getMaxTextLength();
    };
    Thing.prototype.getLight = function () {
        return this.rawGetThingType().getLight();
    };
    Thing.prototype.getMinimapColor = function () {
        return this.rawGetThingType().getMinimapColor();
    };
    Thing.prototype.getLensHelp = function () {
        return this.rawGetThingType().getLensHelp();
    };
    Thing.prototype.getClothSlot = function () {
        return this.rawGetThingType().getClothSlot();
    };
    Thing.prototype.getElevation = function () {
        return this.rawGetThingType().getElevation();
    };
    Thing.prototype.isGround = function () {
        return this.rawGetThingType().isGround();
    };
    Thing.prototype.isGroundBorder = function () {
        return this.rawGetThingType().isGroundBorder();
    };
    Thing.prototype.isOnBottom = function () {
        return this.rawGetThingType().isOnBottom();
    };
    Thing.prototype.isOnTop = function () {
        return this.rawGetThingType().isOnTop();
    };
    Thing.prototype.isContainer = function () {
        return this.rawGetThingType().isContainer();
    };
    Thing.prototype.isStackable = function () {
        return this.rawGetThingType().isStackable();
    };
    Thing.prototype.isForceUse = function () {
        return this.rawGetThingType().isForceUse();
    };
    Thing.prototype.isMultiUse = function () {
        return this.rawGetThingType().isMultiUse();
    };
    Thing.prototype.isWritable = function () {
        return this.rawGetThingType().isWritable();
    };
    Thing.prototype.isChargeable = function () {
        return this.rawGetThingType().isChargeable();
    };
    Thing.prototype.isWritableOnce = function () {
        return this.rawGetThingType().isWritableOnce();
    };
    Thing.prototype.isFluidContainer = function () {
        return this.rawGetThingType().isFluidContainer();
    };
    Thing.prototype.isSplash = function () {
        return this.rawGetThingType().isSplash();
    };
    Thing.prototype.isNotWalkable = function () {
        return this.rawGetThingType().isNotWalkable();
    };
    Thing.prototype.isNotMoveable = function () {
        return this.rawGetThingType().isNotMoveable();
    };
    Thing.prototype.blockProjectile = function () {
        return this.rawGetThingType().blockProjectile();
    };
    Thing.prototype.isNotPathable = function () {
        return this.rawGetThingType().isNotPathable();
    };
    Thing.prototype.isPickupable = function () {
        return this.rawGetThingType().isPickupable();
    };
    Thing.prototype.isHangable = function () {
        return this.rawGetThingType().isHangable();
    };
    Thing.prototype.isHookSouth = function () {
        return this.rawGetThingType().isHookSouth();
    };
    Thing.prototype.isHookEast = function () {
        return this.rawGetThingType().isHookEast();
    };
    Thing.prototype.isRotateable = function () {
        return this.rawGetThingType().isRotateable();
    };
    Thing.prototype.hasLight = function () {
        return this.rawGetThingType().hasLight();
    };
    Thing.prototype.isDontHide = function () {
        return this.rawGetThingType().isDontHide();
    };
    Thing.prototype.isTranslucent = function () {
        return this.rawGetThingType().isTranslucent();
    };
    Thing.prototype.hasDisplacement = function () {
        return this.rawGetThingType().hasDisplacement();
    };
    Thing.prototype.hasElevation = function () {
        return this.rawGetThingType().hasElevation();
    };
    Thing.prototype.isLyingCorpse = function () {
        return this.rawGetThingType().isLyingCorpse();
    };
    Thing.prototype.isAnimateAlways = function () {
        return this.rawGetThingType().isAnimateAlways();
    };
    Thing.prototype.hasMiniMapColor = function () {
        return this.rawGetThingType().hasMiniMapColor();
    };
    Thing.prototype.hasLensHelp = function () {
        return this.rawGetThingType().hasLensHelp();
    };
    Thing.prototype.isFullGround = function () {
        return this.rawGetThingType().isFullGround();
    };
    Thing.prototype.isIgnoreLook = function () {
        return this.rawGetThingType().isIgnoreLook();
    };
    Thing.prototype.isCloth = function () {
        return this.rawGetThingType().isCloth();
    };
    Thing.prototype.isMarketable = function () {
        return this.rawGetThingType().isMarketable();
    };
    Thing.prototype.isUsable = function () {
        return this.rawGetThingType().isUsable();
    };
    Thing.prototype.isWrapable = function () {
        return this.rawGetThingType().isWrapable();
    };
    Thing.prototype.isUnwrapable = function () {
        return this.rawGetThingType().isUnwrapable();
    };
    Thing.prototype.isTopEffect = function () {
        return this.rawGetThingType().isTopEffect();
    };
    Thing.prototype.getMarketData = function () {
        return this.rawGetThingType().getMarketData();
    };
    Thing.prototype.onPositionChange = function (newPos, oldPos) {};
    Thing.prototype.onAppear = function () {};
    Thing.prototype.onDisappear = function () {};
    return Thing;
}();
exports.Thing = Thing;

/***/ })
],[9]);