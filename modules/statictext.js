import { Thing } from "./thing";
import { Rect } from "./structures/rect";
import { Point } from "./structures/point";
import { Color } from "./color";
import { MessageMode, Otc } from "./constants/const";
import { g_clock } from "./structures/g_clock";
import { g_map } from "./map";
import { Log } from "./log";
export class StaticText extends Thing {
    constructor() {
        super(...arguments);
        this.m_yell = false;
        /*std::deque<std::pair<std::string, ticks_t>>*/
        this.m_messages = [];
        this.m_updateEvent = null;
    }
    drawText(dest, parentRect) {
        let textSize = this.m_cachedText.getTextSize();
        let rect = new Rect(dest.sub(new Point(textSize.width() / 2, textSize.height())).add(new Point(20, 5)), textSize);
        let boundRect = rect.clone();
        boundRect.bind(parentRect);
        //g_painter->setColor(m_color);
        this.m_cachedText.draw(boundRect);
    }
    getName() {
        return this.m_name;
    }
    getMessageMode() {
        return this.m_mode;
    }
    getFirstMessage() {
        return this.m_messages[0][0];
    }
    isYell() {
        return this.m_mode == MessageMode.MessageYell || this.m_mode == MessageMode.MessageMonsterYell || this.m_mode == MessageMode.MessageBarkLoud;
    }
    setText(text) {
        this.m_cachedText.setText(text);
    }
    setFont(fontName) {
        this.m_cachedText.setFont(fontName);
    }
    addMessage(name, mode, text) {
        if (this.m_messages.length == 0) {
            this.m_name = name;
            this.m_mode = mode;
        }
        else if (this.m_name != name || this.m_mode != mode) {
            return false;
        }
        else if (this.m_messages.length > 10) {
            this.m_messages.shift();
            clearTimeout(this.m_updateEvent);
            this.m_updateEvent = null;
        }
        let delay = Math.max(Otc.STATIC_DURATION_PER_CHARACTER * text.length, Otc.MIN_STATIC_TEXT_DURATION);
        if (this.isYell())
            delay *= 2;
        this.m_messages.push([text, g_clock.millis() + delay]);
        this.compose();
        if (!this.m_updateEvent)
            this.scheduleUpdate();
        return true;
    }
    asStaticText() {
        return this;
    }
    isStaticText() {
        return true;
    }
    setColor(color) {
        this.m_color = color;
    }
    getColor() {
        return this.m_color;
    }
    update() {
        this.m_messages.shift();
        if (this.m_messages.length == 0) {
            // schedule removal
            let self = this.asStaticText();
            setTimeout((self) => {
                g_map.removeThing(self);
            }, 0, self);
        }
        else {
            this.compose();
            this.scheduleUpdate();
        }
    }
    scheduleUpdate() {
        let delay = Math.max(this.m_messages[0][1] - g_clock.millis(), 0);
        let self = this.asStaticText();
        this.m_updateEvent = setTimeout((self) => {
            self.m_updateEvent = null;
            self.update();
        }, delay, self);
    }
    compose() {
        //TODO: this could be moved to lua
        let text;
        if (this.m_mode == MessageMode.MessageSay) {
            text += this.m_name;
            text += " says:\n";
            this.m_color = new Color(239, 239, 0);
        }
        else if (this.m_mode == MessageMode.MessageWhisper) {
            text += this.m_name;
            text += " whispers:\n";
            this.m_color = new Color(239, 239, 0);
        }
        else if (this.m_mode == MessageMode.MessageYell) {
            text += this.m_name;
            text += " yells:\n";
            this.m_color = new Color(239, 239, 0);
        }
        else if (this.m_mode == MessageMode.MessageMonsterSay || this.m_mode == MessageMode.MessageMonsterYell || this.m_mode == MessageMode.MessageSpell
            || this.m_mode == MessageMode.MessageBarkLow || this.m_mode == MessageMode.MessageBarkLoud) {
            this.m_color = new Color(254, 101, 0);
        }
        else if (this.m_mode == MessageMode.MessageNpcFrom || this.m_mode == MessageMode.MessageNpcFromStartBlock) {
            text += this.m_name;
            text += " says:\n";
            this.m_color = new Color(95, 247, 247);
        }
        else {
            Log.error("Unknown speak type: %d", this.m_mode);
        }
        for (let i = 0; i < this.m_messages.length; ++i) {
            text += this.m_messages[i][0];
            if (i < this.m_messages.length - 1)
                text += "\n";
        }
        this.m_cachedText.setText(text);
        this.m_cachedText.wrapText(275);
    }
}
//# sourceMappingURL=statictext.js.map