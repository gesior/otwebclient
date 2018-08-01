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
exports.__esModule = true;
var player_1 = require("./player");
var LocalPlayer = /** @class */ (function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_known = false;
        return _this;
    }
    LocalPlayer.prototype.isLocalPlayer = function () {
        return true;
    };
    LocalPlayer.prototype.setBlessings = function (blessings) {
    };
    LocalPlayer.prototype.setKnown = function (v) {
        this.m_known = v;
    };
    LocalPlayer.prototype.isKnown = function () {
        return this.m_known;
    };
    return LocalPlayer;
}(player_1.Player));
exports.LocalPlayer = LocalPlayer;
