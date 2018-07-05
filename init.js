"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
require("jqueryui");
var const_1 = require("./modules/constants/const");
var game_1 = require("./modules/game");
var x = const_1.Otc.MAX_AUTOWALK_DIST;
$(function () {
    var game = new game_1.Game();
    game.login('', '', '');
});
//# sourceMappingURL=init.js.map