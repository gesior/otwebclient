export enum Otc {
    TILE_PIXELS = 32,
    MAX_ELEVATION = 24,

    SEA_FLOOR = 7,
    UNDERGROUND_FLOOR = Otc.SEA_FLOOR + 1,
    MAX_Z = 15,
    AWARE_UNDEGROUND_FLOOR_RANGE = 2,

    INVISIBLE_TICKS_PER_FRAME = 500,
    ITEM_TICKS_PER_FRAME = 500,
    ANIMATED_TEXT_DURATION = 1000,
    STATIC_DURATION_PER_CHARACTER = 60,
    MIN_STATIC_TEXT_DURATION = 3000,
    MAX_STATIC_TEXT_WIDTH = 200,
    MAX_AUTOWALK_STEPS_RETRY = 10,
    MAX_AUTOWALK_DIST = 127
}


export enum DrawFlags {
    DrawGround = 1,
    DrawGroundBorders = 2,
    DrawOnBottom = 4,
    DrawOnTop = 8,
    DrawItems = 16,
    DrawCreatures = 32,
    DrawEffects = 64,
    DrawMissiles = 128,
    DrawCreaturesInformation = 256,
    DrawStaticTexts = 512,
    DrawAnimatedTexts = 1024,
    DrawAnimations = 2048,
    DrawBars = 4096,
    DrawNames = 8192,
    DrawLights = 16384,
    DrawManaBar = 32768,
    DrawWalls = DrawOnBottom | DrawOnTop,
    DrawEverything = DrawGround | DrawGroundBorders | DrawWalls | DrawItems |
        DrawCreatures | DrawEffects | DrawMissiles | DrawCreaturesInformation |
        DrawStaticTexts | DrawAnimatedTexts | DrawAnimations | DrawBars | DrawNames |
        DrawLights | DrawManaBar
}

export enum DatOpts {
    DatGround = 0,
    DatGroundClip,
    DatOnBottom,
    DatOnTop,
    DatContainer,
    DatStackable,
    DatForceUse,
    DatMultiUse,
    DatWritable,
    DatWritableOnce,
    DatFluidContainer,
    DatSplash,
    DatBlockWalk,
    DatNotMoveable,
    DatBlockProjectile,
    DatBlockPathFind,
    DatPickupable,
    DatHangable,
    DatHookSouth,
    DatHookEast,
    DatRotable,
    DatLight,
    DatDontHide,
    DatTranslucent,
    DatDisplacement,
    DatElevation,
    DatLyingCorpse,
    DatAnimateAlways,
    DatMinimapColor,
    DatLensHelp,
    DatFullGround,
    DatIgnoreLook,
    DatCloth,
    DatAnimation, // lastest tibia
    DatLastOpt = 255
}

export enum InventorySlot {
    InventorySlotHead = 1,
    InventorySlotNecklace,
    InventorySlotBackpack,
    InventorySlotArmor,
    InventorySlotRight,
    InventorySlotLeft,
    InventorySlotLegs,
    InventorySlotFeet,
    InventorySlotRing,
    InventorySlotAmmo,
    InventorySlotPurse,
    InventorySlotExt1,
    InventorySlotExt2,
    InventorySlotExt3,
    InventorySlotExt4,
    LastInventorySlot
}

export enum Statistic {
    Health = 0,
    MaxHealth,
    FreeCapacity,
    Experience,
    Level,
    LevelPercent,
    Mana,
    MaxMana,
    MagicLevel,
    MagicLevelPercent,
    Soul,
    Stamina,
    LastStatistic
}

export enum Skill {
    Fist = 0,
    Club,
    Sword,
    Axe,
    Distance,
    Shielding,
    Fishing,
    CriticalChance,
    CriticalDamage,
    LifeLeechChance,
    LifeLeechAmount,
    ManaLeechChance,
    ManaLeechAmount,
    LastSkill
}

export enum Direction {
    North = 0,
    East,
    South,
    West,
    NorthEast,
    SouthEast,
    SouthWest,
    NorthWest,
    InvalidDirection
}

export enum FluidsColor {
    FluidTransparent = 0,
    FluidBlue,
    FluidRed,
    FluidBrown,
    FluidGreen,
    FluidYellow,
    FluidWhite,
    FluidPurple
}

export enum FluidsType {
    FluidNone = 0,
    FluidWater,
    FluidMana,
    FluidBeer,
    FluidOil,
    FluidBlood,
    FluidSlime,
    FluidMud,
    FluidLemonade,
    FluidMilk,
    FluidWine,
    FluidHealth,
    FluidUrine,
    FluidRum,
    FluidFruidJuice,
    FluidCoconutMilk,
    FluidTea,
    FluidMead
}

export enum FightModes {
    FightOffensive = 1,
    FightBalanced = 2,
    FightDefensive = 3
}

export enum ChaseModes {
    DontChase = 0,
    ChaseOpponent = 1
}

export enum PVPModes {
    WhiteDove = 0,
    WhiteHand = 1,
    YellowHand = 2,
    RedFist = 3
}

export enum PlayerSkulls {
    SkullNone = 0,
    SkullYellow,
    SkullGreen,
    SkullWhite,
    SkullRed,
    SkullBlack,
    SkullOrange
};

export enum PlayerShields {
    ShieldNone = 0,
    ShieldWhiteYellow, // 1 party leader
    ShieldWhiteBlue, // 2 party member
    ShieldBlue, // 3 party member sexp off
    ShieldYellow, // 4 party leader sexp off
    ShieldBlueSharedExp, // 5 party member sexp on
    ShieldYellowSharedExp, // 6 // party leader sexp on
    ShieldBlueNoSharedExpBlink, // 7 party member sexp inactive guilty
    ShieldYellowNoSharedExpBlink, // 8 // party leader sexp inactive guilty
    ShieldBlueNoSharedExp, // 9 party member sexp inactive innocent
    ShieldYellowNoSharedExp, // 10 party leader sexp inactive innocent
    ShieldGray // 11 member of another party
}

export enum PlayerEmblems {
    EmblemNone = 0,
    EmblemGreen,
    EmblemRed,
    EmblemBlue,
    EmblemMember,
    EmblemOther
}

export enum CreatureIcons {
    NpcIconNone = 0,
    NpcIconChat,
    NpcIconTrade,
    NpcIconQuest,
    NpcIconTradeQuest
}

export enum PlayerStates {
    IconNone = 0,
    IconPoison = 1,
    IconBurn = 2,
    IconEnergy = 4,
    IconDrunk = 8,
    IconManaShield = 16,
    IconParalyze = 32,
    IconHaste = 64,
    IconSwords = 128,
    IconDrowning = 256,
    IconFreezing = 512,
    IconDazzled = 1024,
    IconCursed = 2048,
    IconPartyBuff = 4096,
    IconPzBlock = 8192,
    IconPz = 16384,
    IconBleeding = 32768,
    IconHungry = 65536
}

export enum MessageMode {
    MessageNone = 0,
    MessageSay = 1,
    MessageWhisper = 2,
    MessageYell = 3,
    MessagePrivateFrom = 4,
    MessagePrivateTo = 5,
    MessageChannelManagement = 6,
    MessageChannel = 7,
    MessageChannelHighlight = 8,
    MessageSpell = 9,
    MessageNpcFrom = 10,
    MessageNpcTo = 11,
    MessageGamemasterBroadcast = 12,
    MessageGamemasterChannel = 13,
    MessageGamemasterPrivateFrom = 14,
    MessageGamemasterPrivateTo = 15,
    MessageLogin = 16,
    MessageWarning = 17,
    MessageGame = 18,
    MessageFailure = 19,
    MessageLook = 20,
    MessageDamageDealed = 21,
    MessageDamageReceived = 22,
    MessageHeal = 23,
    MessageExp = 24,
    MessageDamageOthers = 25,
    MessageHealOthers = 26,
    MessageExpOthers = 27,
    MessageStatus = 28,
    MessageLoot = 29,
    MessageTradeNpc = 30,
    MessageGuild = 31,
    MessagePartyManagement = 32,
    MessageParty = 33,
    MessageBarkLow = 34,
    MessageBarkLoud = 35,
    MessageReport = 36,
    MessageHotkeyUse = 37,
    MessageTutorialHint = 38,
    MessageThankyou = 39,
    MessageMarket = 40,
    MessageMana = 41,
    MessageBeyondLast = 42,

    // deprecated
    MessageMonsterYell = 43,
    MessageMonsterSay = 44,
    MessageRed = 45,
    MessageBlue = 46,
    MessageRVRChannel = 47,
    MessageRVRAnswer = 48,
    MessageRVRContinue = 49,
    MessageGameHighlight = 50,
    MessageNpcFromStartBlock = 51,
    LastMessage = 52,
    MessageInvalid = 255
}

export enum GameFeature {
    GameProtocolChecksum = 1,
    GameAccountNames = 2,
    GameChallengeOnLogin = 3,
    GamePenalityOnDeath = 4,
    GameNameOnNpcTrade = 5,
    GameDoubleFreeCapacity = 6,
    GameDoubleExperience = 7,
    GameTotalCapacity = 8,
    GameSkillsBase = 9,
    GamePlayerRegenerationTime = 10,
    GameChannelPlayerList = 11,
    GamePlayerMounts = 12,
    GameEnvironmentEffect = 13,
    GameCreatureEmblems = 14,
    GameItemAnimationPhase = 15,
    GameMagicEffectU16 = 16,
    GamePlayerMarket = 17,
    GameSpritesU32 = 18,
    // 19 unused
    GameOfflineTrainingTime = 20,
    GamePurseSlot = 21,
    GameFormatCreatureName = 22,
    GameSpellList = 23,
    GameClientPing = 24,
    GameExtendedClientPing = 25,
    GameDoubleHealth = 28,
    GameDoubleSkills = 29,
    GameChangeMapAwareRange = 30,
    GameMapMovePosition = 31,
    GameAttackSeq = 32,
    GameBlueNpcNameColor = 33,
    GameDiagonalAnimatedText = 34,
    GameLoginPending = 35,
    GameNewSpeedLaw = 36,
    GameForceFirstAutoWalkStep = 37,
    GameMinimapRemove = 38,
    GameDoubleShopSellAmount = 39,
    GameContainerPagination = 40,
    GameThingMarks = 41,
    GameLooktypeU16 = 42,
    GamePlayerStamina = 43,
    GamePlayerAddons = 44,
    GameMessageStatements = 45,
    GameMessageLevel = 46,
    GameNewFluids = 47,
    GamePlayerStateU16 = 48,
    GameNewOutfitProtocol = 49,
    GamePVPMode = 50,
    GameWritableDate = 51,
    GameAdditionalVipInfo = 52,
    GameBaseSkillU16 = 53,
    GameCreatureIcons = 54,
    GameHideNpcNames = 55,
    GameSpritesAlphaChannel = 56,
    GamePremiumExpiration = 57,
    GameBrowseField = 58,
    GameEnhancedAnimations = 59,
    GameOGLInformation = 60,
    GameMessageSizeCheck = 61,
    GamePreviewState = 62,
    GameLoginPacketEncryption = 63,
    GameClientVersion = 64,
    GameContentRevision = 65,
    GameExperienceBonus = 66,
    GameAuthenticator = 67,
    GameUnjustifiedPoints = 68,
    GameSessionKey = 69,
    GameDeathType = 70,
    GameIdleAnimations = 71,
    GameKeepUnawareTiles = 72,
    GameIngameStore = 73,
    GameIngameStoreHighlights = 74,
    GameIngameStoreServiceType = 75,
    GameAdditionalSkills = 76,

    LastGameFeature = 101
}

export enum PathFindResult {
    PathFindResultOk = 0,
    PathFindResultSamePosition,
    PathFindResultImpossible,
    PathFindResultTooFar,
    PathFindResultNoWay
}

export enum PathFindFlags {
    PathFindAllowNotSeenTiles = 1,
    PathFindAllowCreatures = 2,
    PathFindAllowNonPathable = 4,
    PathFindAllowNonWalkable = 8
}

export enum AutomapFlags {
    MapMarkTick = 0,
    MapMarkQuestion,
    MapMarkExclamation,
    MapMarkStar,
    MapMarkCross,
    MapMarkTemple,
    MapMarkKiss,
    MapMarkShovel,
    MapMarkSword,
    MapMarkFlag,
    MapMarkLock,
    MapMarkBag,
    MapMarkSkull,
    MapMarkDollar,
    MapMarkRedNorth,
    MapMarkRedSouth,
    MapMarkRedEast,
    MapMarkRedWest,
    MapMarkGreenNorth,
    MapMarkGreenSouth
}

export enum VipState {
    VipStateOffline = 0,
    VipStateOnline = 1,
    VipStatePending = 2
}

export enum SpeedFormula {
    SpeedFormulaA = 0,
    SpeedFormulaB,
    SpeedFormulaC,
    LastSpeedFormula
}

export enum Blessings {
    BlessingNone = 0,
    BlessingAdventurer = 1,
    BlessingSpiritualShielding = 1 << 1,
    BlessingEmbraceOfTibia = 1 << 2,
    BlessingFireOfSuns = 1 << 3,
    BlessingWisdomOfSolitude = 1 << 4,
    BlessingSparkOfPhoenix = 1 << 5
}

export enum DeathType {
    DeathRegular = 0,
    DeathBlessed = 1
}

export enum StoreProductTypes {
    ProductTypeOther = 0,
    ProductTypeNameChange = 1
}

export enum StoreErrorTypes {
    StoreNoError = -1,
    StorePurchaseError = 0,
    StoreNetworkError = 1,
    StoreHistoryError = 2,
    StoreTransferError = 3,
    StoreInformation = 4
}

export enum StoreStates {
    StateNone = 0,
    StateNew = 1,
    StateSale = 2,
    StateTimed = 3
}

export enum FrameGroupType {
    FrameGroupDefault = 0,
    FrameGroupIdle = FrameGroupDefault,
    FrameGroupMoving
}

export enum ThingCategory {
    ThingCategoryItem = 0,
    ThingCategoryCreature,
    ThingCategoryEffect,
    ThingCategoryMissile,
    ThingInvalidCategory,
    ThingLastCategory = ThingInvalidCategory
}

export enum ThingAttr {
    ThingAttrGround = 0,
    ThingAttrGroundBorder = 1,
    ThingAttrOnBottom = 2,
    ThingAttrOnTop = 3,
    ThingAttrContainer = 4,
    ThingAttrStackable = 5,
    ThingAttrForceUse = 6,
    ThingAttrMultiUse = 7,
    ThingAttrWritable = 8,
    ThingAttrWritableOnce = 9,
    ThingAttrFluidContainer = 10,
    ThingAttrSplash = 11,
    ThingAttrNotWalkable = 12,
    ThingAttrNotMoveable = 13,
    ThingAttrBlockProjectile = 14,
    ThingAttrNotPathable = 15,
    ThingAttrPickupable = 16,
    ThingAttrHangable = 17,
    ThingAttrHookSouth = 18,
    ThingAttrHookEast = 19,
    ThingAttrRotateable = 20,
    ThingAttrLight = 21,
    ThingAttrDontHide = 22,
    ThingAttrTranslucent = 23,
    ThingAttrDisplacement = 24,
    ThingAttrElevation = 25,
    ThingAttrLyingCorpse = 26,
    ThingAttrAnimateAlways = 27,
    ThingAttrMinimapColor = 28,
    ThingAttrLensHelp = 29,
    ThingAttrFullGround = 30,
    ThingAttrLook = 31,
    ThingAttrCloth = 32,
    ThingAttrMarket = 33,
    ThingAttrUsable = 34,
    ThingAttrWrapable = 35,
    ThingAttrUnwrapable = 36,
    ThingAttrTopEffect = 37,

    // additional
    ThingAttrOpacity = 100,
    ThingAttrNotPreWalkable = 101,

    ThingAttrFloorChange = 252,
    ThingAttrNoMoveAnimation = 253, // 10.10: real value is 16, but we need to do this for backwards compatibility
    ThingAttrChargeable = 254, // deprecated
    ThingLastAttr = 255
}

export enum SpriteMask {
    SpriteMaskRed = 1,
    SpriteMaskGreen,
    SpriteMaskBlue,
    SpriteMaskYellow
}


export enum AnimationPhase {
    AnimPhaseAutomatic = -1,
    AnimPhaseRandom = 254,
    AnimPhaseAsync = 255,
}

export enum AnimationDirection {
    AnimDirForward = 0,
    AnimDirBackward = 1
}