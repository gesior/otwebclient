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
var player_1 = require("./player");
var LocalPlayer = (function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalPlayer.prototype.setBlessings = function (blessings) {
    };
    return LocalPlayer;
}(player_1.Player));
exports.LocalPlayer = LocalPlayer;
//# sourceMappingURL=localplayer.js.map