"use strict";
exports.__esModule = true;
var image_1 = require("./image");
var SpriteManager = /** @class */ (function () {
    function SpriteManager() {
        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
    }
    SpriteManager.prototype.getSpriteImage = function (id) { return new image_1.Image(0); };
    return SpriteManager;
}());
exports.SpriteManager = SpriteManager;
var g_sprites = new SpriteManager();
exports.g_sprites = g_sprites;
