import {Size} from "./structures/size";
import {Rect} from "./structures/rect";

export class CachedText {
    static ALIGN_LEFT = 'left';
    static ALIGN_RIGHT = 'right';

    m_text: string = null;
    m_textSize: Size = null;
    m_textMustRecache: boolean = true;

    m_textCachedScreenCoords: Rect;
    m_font: string = null;
    m_align: string = null;

    draw(rect: Rect) {

    }

    wrapText(maxWidth: number) {

        if (this.m_font) {
            // update new line positions
            //this.m_text = this.m_font.wrapText(m_text, maxWidth);
            this.update();
        }
    }

    setFont(font: string) {
        this.m_font = font;
        this.update();
    }

    setText(text: string) {
        this.m_text = text;
        this.update();
    }

    setAlign(align: string) {
        this.m_align = align;
        this.update();
    }

    getTextSize(): Size {
        return this.m_textSize;
    }

    getText(): string {
        return this.m_text;
    }

    getFont(): string {
        return this.m_font;
    }

    getAlign(): string {
        return this.m_align;
    }

    update() {

        if (this.m_font)
            this.m_textSize = new Size();
        /* todo *///m_font->calculateTextRectSize(m_text);
        this.m_textMustRecache = true;
    }
}
