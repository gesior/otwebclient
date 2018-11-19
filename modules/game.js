"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localplayer_1 = require("./localplayer");
var const_1 = require("./constants/const");
var thingtypemanager_1 = require("./thingtypemanager");
var protocolgame_1 = require("./network/protocolgame");
var log_1 = require("./log");
var map_1 = require("./map");
var container_1 = require("./container");
var Game = (function () {
    function Game() {
    }
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
    Game.prototype.setExpertPvpMode = function (expertModeEnabled) {
    };
    Game.prototype.setServerBeat = function (serverBeat) {
    };
    Game.prototype.setCanReportBugs = function (canReportBugs) {
    };
    Game.prototype.processLogin = function () {
    };
    Game.prototype.processPendingGame = function () {
    };
    Game.prototype.setOpenPvpSituations = function (openPvpSituations) {
    };
    Game.prototype.processPlayerHelpers = function (helpers) {
    };
    Game.prototype.processGMActions = function (actions) {
    };
    Game.prototype.processUpdateNeeded = function (signature) {
    };
    Game.prototype.processLoginError = function (error) {
    };
    Game.prototype.processLoginAdvice = function (message) {
    };
    Game.prototype.processLoginWait = function (message, time) {
    };
    Game.prototype.processLoginToken = function (unknown) {
    };
    Game.prototype.processPingBack = function () {
    };
    Game.prototype.processDeath = function (deathType, penality) {
    };
    Game.prototype.processOpenContainer = function (containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex) {
    };
    Game.prototype.processCloseContainer = function (containerId) {
    };
    Game.prototype.processContainerAddItem = function (containerId, item, slot) {
    };
    Game.prototype.processContainerUpdateItem = function (containerId, slot, item) {
    };
    Game.prototype.processContainerRemoveItem = function (containerId, slot, lastItem) {
    };
    Game.prototype.processInventoryChange = function (slot, item) {
    };
    Game.prototype.processOpenNpcTrade = function (items) {
    };
    Game.prototype.processPlayerGoods = function (money, goods) {
    };
    Game.prototype.formatCreatureName = function (string) {
        return string;
    };
    Game.prototype.processCloseNpcTrade = function () {
    };
    Game.prototype.processOwnTrade = function (name, items) {
    };
    Game.prototype.processCounterTrade = function (name, items) {
    };
    Game.prototype.processCloseTrade = function () {
    };
    return Game;
}());
exports.Game = Game;
var g_game = new Game();
exports.g_game = g_game;
//# sourceMappingURL=game.js.map