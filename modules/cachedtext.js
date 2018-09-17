import { Size } from "./structures/size";
export class CachedText {
    constructor() {
        this.m_text = null;
        this.m_textSize = null;
        this.m_textMustRecache = true;
        this.m_font = null;
        this.m_align = null;
    }
    draw(rect) {
    }
    wrapText(maxWidth) {
        if (this.m_font) {
            // update new line positions
            //this.m_text = this.m_font.wrapText(m_text, maxWidth);
            this.update();
        }
    }
    setFont(font) {
        this.m_font = font;
        this.update();
    }
    setText(text) {
        this.m_text = text;
        this.update();
    }
    setAlign(align) {
        this.m_align = align;
        this.update();
    }
    getTextSize() {
        return this.m_textSize;
    }
    getText() {
        return this.m_text;
    }
    getFont() {
        return this.m_font;
    }
    getAlign() {
        return this.m_align;
    }
    update() {
        if (this.m_font)
            this.m_textSize = new Size();
        /* todo */ //m_font->calculateTextRectSize(m_text);
        this.m_textMustRecache = true;
    }
}
CachedText.ALIGN_LEFT = 'left';
CachedText.ALIGN_RIGHT = 'right';
//# sourceMappingURL=cachedtext.js.map