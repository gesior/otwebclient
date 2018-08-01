"use strict";
exports.__esModule = true;
var size_1 = require("./structures/size");
var CachedText = /** @class */ (function () {
    function CachedText() {
        this.m_text = null;
        this.m_textSize = null;
        this.m_textMustRecache = true;
        this.m_font = null;
        this.m_align = null;
    }
    CachedText.prototype.draw = function (rect) {
        if (!this.m_font)
            return;
        if (this.m_textMustRecache || this.m_textCachedScreenCoords != rect) {
            this.m_textMustRecache = false;
            this.m_textCachedScreenCoords = rect;
            //m_textCoordsBuffer.clear();
            //m_font->calculateDrawTextCoords(m_textCoordsBuffer, m_text, rect, Fw::AlignCenter);
        }
        //if(m_font->getTexture())
        //    g_painter->drawTextureCoords(m_textCoordsBuffer, m_font->getTexture());
    };
    CachedText.prototype.wrapText = function (maxWidth) {
        if (this.m_font) {
            // update new line positions
            //this.m_text = this.m_font.wrapText(m_text, maxWidth);
            this.update();
        }
    };
    CachedText.prototype.setFont = function (font) {
        this.m_font = font;
        this.update();
    };
    CachedText.prototype.setText = function (text) {
        this.m_text = text;
        this.update();
    };
    CachedText.prototype.setAlign = function (align) {
        this.m_align = align;
        this.update();
    };
    CachedText.prototype.getTextSize = function () {
        return this.m_textSize;
    };
    CachedText.prototype.getText = function () {
        return this.m_text;
    };
    CachedText.prototype.getFont = function () {
        return this.m_font;
    };
    CachedText.prototype.getAlign = function () {
        return this.m_align;
    };
    CachedText.prototype.update = function () {
        if (this.m_font)
            this.m_textSize = new size_1.Size();
        /* todo */ //m_font->calculateTextRectSize(m_text);
        this.m_textMustRecache = true;
    };
    CachedText.ALIGN_LEFT = 'left';
    CachedText.ALIGN_RIGHT = 'right';
    return CachedText;
}());
exports.CachedText = CachedText;
