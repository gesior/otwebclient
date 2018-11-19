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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Creature = exports.Creature = function (_Thing) {
    _inherits(Creature, _Thing);

    function Creature() {
        _classCallCheck(this, Creature);

        return _possibleConstructorReturn(this, (Creature.__proto__ || Object.getPrototypeOf(Creature)).apply(this, arguments));
    }

    _createClass(Creature, [{
        key: "addTimedSquare",
        value: function addTimedSquare(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "hideStaticSquare",
        value: function hideStaticSquare() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "showStaticSquare",
        value: function showStaticSquare(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "setType",
        value: function setType(type) {}
    }, {
        key: "allowAppearWalk",
        value: function allowAppearWalk() {}
    }, {
        key: "setHealthPercent",
        value: function setHealthPercent(healthPercent) {}
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "setOutfit",
        value: function setOutfit(outfit) {}
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
    }]);

    return Creature;
}(_thing.Thing);

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
var FluidsType = exports.FluidsType = undefined;
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
})(FluidsType || (exports.FluidsType = FluidsType = {}));
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

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

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

  return Player;
}(_creature.Creature);

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

var _structures = __webpack_require__(573);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = exports.Image = function () {
    _createClass(Image, [{
        key: "blit",
        value: function blit(point, image) {}
    }, {
        key: "overwriteMask",
        value: function overwriteMask(color) {
            var insideColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _color.Color.white;
            var outsideColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _color.Color.alpha;
        }
    }]);

    function Image(size) {
        _classCallCheck(this, Image);

        if (size instanceof _structures.Size) {} else if (typeof size == 'number') {}
    }

    _createClass(Image, [{
        key: "setId",
        value: function setId(id) {}
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteManager = exports.SpriteManager = function () {
    function SpriteManager() {
        _classCallCheck(this, SpriteManager);

        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
    }

    _createClass(SpriteManager, [{
        key: "getSpriteImage",
        value: function getSpriteImage(id) {
            return new _image.Image(0);
        }
    }]);

    return SpriteManager;
}();

var g_sprites = new SpriteManager();
exports.g_sprites = g_sprites;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.error = exports.log = undefined;

var _jquery = __webpack_require__(572);

var $ = _interopRequireWildcard(_jquery);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var log = function log() {
    for (var _len = arguments.length, v = Array(_len), _key = 0; _key < _len; _key++) {
        v[_key] = arguments[_key];
    }

    console.log.apply(this, v);
    $('#status').text(v.join(','));
};
var error = function error() {
    for (var _len2 = arguments.length, v = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        v[_key2] = arguments[_key2];
    }

    console.error.apply(this, v);
    console.log.apply(this, [new Error().stack]);
    $('#status').text(v.join(','));
};
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

var _log = __webpack_require__(20);

var _map = __webpack_require__(55);

var _container = __webpack_require__(465);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: "setUnjustifiedPoints",
        value: function setUnjustifiedPoints(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "processEnterGame",
        value: function processEnterGame() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getContainer",
        value: function getContainer(containerId) {
            return new _container.Container();
        }
    }, {
        key: "processGameStart",
        value: function processGameStart() {
            (0, _log.error)('Method not implemented.');
        }
    }, {
        key: "getClientVersion",
        value: function getClientVersion() {
            return 3;
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
        key: "getFeature",
        value: function getFeature(feature) {
            switch (feature) {
                case _const.GameFeature.GameChallengeOnLogin:
                    return true;
            }
            return false;
        }
    }, {
        key: "getLocalPlayer",
        value: function getLocalPlayer() {
            return new _localplayer.LocalPlayer();
        }
    }, {
        key: "login",
        value: function login(accountName, accountPassword, characterName) {
            this.m_protocolGame = new _protocolgame.ProtocolGame(this);
            this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
        }
    }, {
        key: "setExpertPvpMode",
        value: function setExpertPvpMode(expertModeEnabled) {}
    }, {
        key: "setServerBeat",
        value: function setServerBeat(serverBeat) {}
    }, {
        key: "setCanReportBugs",
        value: function setCanReportBugs(canReportBugs) {}
    }, {
        key: "processLogin",
        value: function processLogin() {}
    }, {
        key: "processPendingGame",
        value: function processPendingGame() {}
    }, {
        key: "setOpenPvpSituations",
        value: function setOpenPvpSituations(openPvpSituations) {}
    }, {
        key: "processPlayerHelpers",
        value: function processPlayerHelpers(helpers) {}
    }, {
        key: "processGMActions",
        value: function processGMActions(actions) {}
    }, {
        key: "processUpdateNeeded",
        value: function processUpdateNeeded(signature) {}
    }, {
        key: "processLoginError",
        value: function processLoginError(error) {}
    }, {
        key: "processLoginAdvice",
        value: function processLoginAdvice(message) {}
    }, {
        key: "processLoginWait",
        value: function processLoginWait(message, time) {}
    }, {
        key: "processLoginToken",
        value: function processLoginToken(unknown) {}
    }, {
        key: "processPingBack",
        value: function processPingBack() {}
    }, {
        key: "processDeath",
        value: function processDeath(deathType, penality) {}
    }, {
        key: "processOpenContainer",
        value: function processOpenContainer(containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex) {}
    }, {
        key: "processCloseContainer",
        value: function processCloseContainer(containerId) {}
    }, {
        key: "processContainerAddItem",
        value: function processContainerAddItem(containerId, item, slot) {}
    }, {
        key: "processContainerUpdateItem",
        value: function processContainerUpdateItem(containerId, slot, item) {}
    }, {
        key: "processContainerRemoveItem",
        value: function processContainerRemoveItem(containerId, slot, lastItem) {}
    }, {
        key: "processInventoryChange",
        value: function processInventoryChange(slot, item) {}
    }, {
        key: "processOpenNpcTrade",
        value: function processOpenNpcTrade(items) {}
    }, {
        key: "processPlayerGoods",
        value: function processPlayerGoods(money, goods) {}
    }, {
        key: "formatCreatureName",
        value: function formatCreatureName(string) {
            return string;
        }
    }, {
        key: "processCloseNpcTrade",
        value: function processCloseNpcTrade() {}
    }, {
        key: "processOwnTrade",
        value: function processOwnTrade(name, items) {}
    }, {
        key: "processCounterTrade",
        value: function processCounterTrade(name, items) {}
    }, {
        key: "processCloseTrade",
        value: function processCloseTrade() {}
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

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(572);

var $ = _interopRequireWildcard(_jquery);

__webpack_require__(574);

var _const = __webpack_require__(13);

var _game = __webpack_require__(38);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var x = _const.Otc.MAX_AUTOWALK_DIST;
$(function () {
    var game = new _game.Game();
    game.login('', '', '');
});

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

        return _possibleConstructorReturn(this, (LocalPlayer.__proto__ || Object.getPrototypeOf(LocalPlayer)).apply(this, arguments));
    }

    _createClass(LocalPlayer, [{
        key: 'setBlessings',
        value: function setBlessings(blessings) {}
    }]);

    return LocalPlayer;
}(_player.Player);

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = exports.Tile = function () {
    function Tile() {
        _classCallCheck(this, Tile);
    }

    _createClass(Tile, [{
        key: "getThingStackPos",
        value: function getThingStackPos(thing) {
            return 0;
        }
    }]);

    return Tile;
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

var _structures = __webpack_require__(573);

var _game = __webpack_require__(38);

var _log = __webpack_require__(20);

var _animator = __webpack_require__(450);

var _image = __webpack_require__(182);

var _color = __webpack_require__(57);

var _spritemanager = __webpack_require__(183);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThingType = exports.ThingType = function () {
    function ThingType() {
        _classCallCheck(this, ThingType);

        this.m_attribs = new _structures.ThingTypeAttribs();
    }

    _createClass(ThingType, [{
        key: "unserialize",
        value: function unserialize(clientId, category, fin) {
            this.m_null = false;
            this.m_id = clientId;
            this.m_category = category;
            var count = 0,
                attr = -1;
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
                            var light = new _structures.Light();
                            light.intensity = fin.getU16();
                            light.color = fin.getU16();
                            this.m_attribs.set(attr, light);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrMarket:
                        {
                            var market = new _structures.MarketData();
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
            for (var _i = 0; _i < groupCount; ++_i) {
                var frameGroupType = _const.FrameGroupType.FrameGroupDefault;
                if (hasFrameGroups) frameGroupType = fin.getU8();
                var width = fin.getU8();
                var height = fin.getU8();
                this.m_size = new _structures.Size(width, height);
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
                if (totalSpritesCount + totalSprites > 4096) (0, _log.error)("a thing type has more than 4096 sprites");
                //this.m_spritesIndex.resize((totalSpritesCount + totalSprites));
                for (var _i2 = totalSpritesCount; _i2 < totalSpritesCount + totalSprites; _i2++) {
                    this.m_spritesIndex[_i2] = _game.g_game.getFeature(_const.GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
                }totalSpritesCount += totalSprites;
            }
            /*
                    this.m_textures.resize(m_animationPhases);
                    this.m_texturesFramesRects.resize(m_animationPhases);
                    this.m_texturesFramesOriginRects.resize(m_animationPhases);
                    this.m_texturesFramesOffsets.resize(m_animationPhases);
            */
        }
    }, {
        key: "draw",
        value: function draw(dest, scaleFactor, layer, xPattern, yPattern, zPattern, animationPhase) {
            /*todo*/

            var lightView = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
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
                if (animationPhase == 0 && !(this.m_customImage.length == 0)) useCustomImage = true;
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
                var fullImage = void 0;
                if (useCustomImage) fullImage = _image.Image.load(this.m_customImage);else fullImage = new _image.Image(textureSize.mul(_const.Otc.TILE_PIXELS));
                /*
                        m_texturesFramesRects[animationPhase].resize(indexSize);
                        m_texturesFramesOriginRects[animationPhase].resize(indexSize);
                        m_texturesFramesOffsets[animationPhase].resize(indexSize);
                */
                for (var z = 0; z < this.m_numPatternZ; ++z) {
                    for (var y = 0; y < this.m_numPatternY; ++y) {
                        for (var x = 0; x < this.m_numPatternX; ++x) {
                            for (var l = 0; l < numLayers; ++l) {
                                var spriteMask = this.m_category == _const.ThingCategory.ThingCategoryCreature && l > 0;
                                var frameIndex = this.getTextureIndex(l % textureLayers, x, y, z);
                                var framePos = new _structures.Point(frameIndex % (textureSize.width() / this.m_size.width()) * this.m_size.width() * _const.Otc.TILE_PIXELS, frameIndex / (textureSize.width() / this.m_size.width()) * this.m_size.height() * _const.Otc.TILE_PIXELS);
                                if (!useCustomImage) {
                                    for (var h = 0; h < this.m_size.height(); ++h) {
                                        for (var w = 0; w < this.m_size.width(); ++w) {
                                            var spriteIndex = this.getSpriteIndex(w, h, spriteMask ? 1 : l, x, y, z, animationPhase);
                                            var spriteImage = _spritemanager.g_sprites.getSpriteImage(this.m_spritesIndex[spriteIndex]);
                                            if (spriteImage) {
                                                if (spriteMask) {
                                                    spriteImage.overwriteMask(ThingType.maskColors[l - 1]);
                                                }
                                                var spritePos = new _structures.Point((this.m_size.width() - w - 1) * _const.Otc.TILE_PIXELS, (this.m_size.height() - h - 1) * _const.Otc.TILE_PIXELS);
                                                fullImage.blit(framePos.add(spritePos), spriteImage);
                                            }
                                        }
                                    }
                                }
                                var drawRect = new _structures.Rect(framePos.add(new _structures.Point(this.m_size.width(), this.m_size.height())).mul(_const.Otc.TILE_PIXELS).sub(new _structures.Point(1, 1)), framePos);
                                for (var _x7 = framePos.x; _x7 < framePos.x + this.m_size.width() * _const.Otc.TILE_PIXELS; ++_x7) {
                                    for (var _y = framePos.y; _y < framePos.y + this.m_size.height() * _const.Otc.TILE_PIXELS; ++_y) {
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
                animationPhaseTexture = new _structures.Texture(fullImage, true);
                //animationPhaseTexture->setSmooth(true);
            }
            return animationPhaseTexture;
        }
    }, {
        key: "getBestTextureDimension",
        value: function getBestTextureDimension(w, h, count) {
            /*todo*/
            return new _structures.Size(w, h);
        }
    }, {
        key: "getSpriteIndex",
        value: function getSpriteIndex(w, h, l, x, y, z, a) {
            var index = (((((a % this.m_animationPhases * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x) * this.m_layers + l) * this.m_size.height() + h) * this.m_size.width() + w;
            if (index < this.m_spritesIndex.length) {
                throw new Error('index < this.m_spritesIndex.length');
            }
            return index;
        }
    }, {
        key: "getTextureIndex",
        value: function getTextureIndex(l, x, y, z) {
            return ((l * this.m_numPatternZ + z) * this.m_numPatternY + y) * this.m_numPatternX + x;
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
    }]);

    return Animator;
}();

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (1116:12)\n\n\u001b[0m \u001b[90m 1114 | \u001b[39m        let premium \u001b[33m=\u001b[39m msg\u001b[33m.\u001b[39mgetU8()\u001b[33m;\u001b[39m \u001b[90m// premium\u001b[39m\n \u001b[90m 1115 | \u001b[39m        \u001b[36mif\u001b[39m (g_game\u001b[33m.\u001b[39mgetFeature(\u001b[33mGameFeature\u001b[39m\u001b[33m.\u001b[39m\u001b[33mGamePremiumExpiration\u001b[39m))\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 1116 | \u001b[39m            let premiumEx \u001b[33m=\u001b[39m msg\u001b[33m.\u001b[39mgetU32()\u001b[33m;\u001b[39m \u001b[90m// premium expiration used for premium advertisement\u001b[39m\n \u001b[90m      | \u001b[39m            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 1117 | \u001b[39m        let vocation \u001b[33m=\u001b[39m msg\u001b[33m.\u001b[39mgetU8()\u001b[33m;\u001b[39m \u001b[90m// vocation\u001b[39m\n \u001b[90m 1118 | \u001b[39m        let spellCount \u001b[33m=\u001b[39m msg\u001b[33m.\u001b[39mgetU16()\u001b[33m;\u001b[39m\n \u001b[90m 1119 | \u001b[39m        let spells\u001b[33m;\u001b[39m\u001b[0m\n");

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
            return _thingtypemanager.g_things.getNullThingType();
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

var _structures = __webpack_require__(573);

var _creature = __webpack_require__(124);

var _tile = __webpack_require__(447);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = exports.Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.m_awareRange = new _structures.AwareRange();
        this.tmpCreature = new _creature.Creature();
    }

    _createClass(Map, [{
        key: "getTile",
        value: function getTile(position) {
            return new _tile.Tile();
        }
    }, {
        key: "setAwareRange",
        value: function setAwareRange(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getCreatureById",
        value: function getCreatureById(id) {
            return this.tmpCreature;
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
        value: function setCentralPosition(pos) {
            this.m_centralPosition = pos;
        }
    }, {
        key: "cleanTile",
        value: function cleanTile(tilePos) {}
    }, {
        key: "addThing",
        value: function addThing(thing, position) {
            var stackPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        }
    }, {
        key: "removeThing",
        value: function removeThing(thing) {
            return false;
        }
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "getThing",
        value: function getThing(pos, stackpos) {}
    }, {
        key: "removeCreatureById",
        value: function removeCreatureById(removeId) {}
    }]);

    return Map;
}();

var g_map = new Map();
exports.g_map = g_map;

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
    function Color() {
        _classCallCheck(this, Color);
    }

    _createClass(Color, null, [{
        key: "from8bit",
        value: function from8bit(arg0) {
            throw new Error("Method not implemented.");
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

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnjustifiedPoints = exports.UnjustifiedPoints = function UnjustifiedPoints() {
    _classCallCheck(this, UnjustifiedPoints);
};

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

var MarketData = exports.MarketData = function MarketData() {
    _classCallCheck(this, MarketData);
};

var Light = exports.Light = function Light() {
    _classCallCheck(this, Light);

    this.intensity = 0;
    this.color = 215;
};

var g_clock = exports.g_clock = function () {
    function g_clock() {
        _classCallCheck(this, g_clock);
    }

    _createClass(g_clock, null, [{
        key: "millis",
        value: function millis() {
            return +new Date();
        }
    }]);

    return g_clock;
}();

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
            this.m_startTicks = g_clock.millis();
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
            return g_clock.millis() - this.m_startTicks;
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

var Point = exports.Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
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

var Rect = exports.Rect = function Rect(p1, p2) {
    _classCallCheck(this, Rect);
};

var Texture = exports.Texture = function Texture(image) {
    var buildMipmaps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var compress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Texture);

    this.m_id = 0;
    this.m_time = 0;
    this.m_hasMipmaps = false;
    this.m_smooth = false;
    this.m_upsideDown = false;
    this.m_repeat = false;
};

var Size = exports.Size = function () {
    function Size() {
        var wd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
        var ht = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, Size);

        this.wd = wd;
        this.ht = ht;
    }

    _createClass(Size, [{
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
    }]);

    return Size;
}();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nullThingType = new _thingtype.ThingType();

var ThingTypeManager = exports.ThingTypeManager = function () {
    function ThingTypeManager() {
        _classCallCheck(this, ThingTypeManager);

        this.m_nullThingType = new _thingtype.ThingType();
        this.m_thingTypes = null;
        this.m_thingTypes = [];
        for (var i = _const.ThingCategory.ThingCategoryItem; i < _const.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }

    _createClass(ThingTypeManager, [{
        key: "isValidDatId",
        value: function isValidDatId(id, category) {
            return true;
        }
    }, {
        key: "getThingType",
        value: function getThingType(id, category) {
            if (category >= _const.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
                (0, _log.error)("invalid thing type client id %d in category %d", id, category);
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
        key: "getNullThingType",
        value: function getNullThingType() {
            return nullThingType;
        }
    }, {
        key: "getContentRevision",
        value: function getContentRevision() {
            throw new Error("Method not implemented.");
        }
    }]);

    return ThingTypeManager;
}();

var g_things = new ThingTypeManager();
exports.g_things = g_things;

/***/ })

},[241]);