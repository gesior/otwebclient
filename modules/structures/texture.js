"use strict";
exports.__esModule = true;
var Texture = /** @class */ (function () {
    function Texture(image, buildMipmaps, compress) {
        if (buildMipmaps === void 0) { buildMipmaps = false; }
        if (compress === void 0) { compress = false; }
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
    }
    return Texture;
}());
exports.Texture = Texture;
