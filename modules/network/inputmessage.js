import { log } from '../log';
import { Position } from "../position";
export class InputMessage {
    constructor(msg) {
        this.data = new DataView(msg.buffer.slice(0));
        this.offset = 0;
        this.size = this.data.byteLength;
    }
    getU8() {
        //log('InputMessage.getU8', this.offset, this.size);
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");
        let v = this.data.getUint8(this.offset);
        this.offset += 1;
        return v;
    }
    getU16() {
        return this.getU8() + this.getU8() * 256;
    }
    getU32() {
        return this.getU16() + this.getU16() * 256 * 256;
    }
    getU64() {
        return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
    }
    getDouble() {
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");
        let v = this.data.getFloat64(this.offset);
        this.offset += 8;
        return v;
    }
    getString() {
        const length = this.getU16();
        let text = '';
        for (let i = 0; i < length; i++) {
            text += String.fromCharCode(this.getU8());
        }
        return text;
    }
    getPosition() {
        return new Position(this.getU16(), this.getU16(), this.getU8());
    }
    skipBytes(byteCount) {
        log('InputMessage.skipBytes', this.offset, this.size);
        if (this.offset + byteCount > this.size)
            throw new Error("Koniec pakietu");
        this.offset += byteCount;
    }
    skip(bytes) {
        this.skipBytes(bytes);
    }
    peekU8() {
        const v = this.getU8();
        this.offset -= 1;
        return v;
    }
    peekU16() {
        const v = this.getU16();
        this.offset -= 2;
        return v;
    }
    getUnreadSize() {
        return this.size - this.offset;
    }
    getReadPos() {
        return this.offset;
    }
    setReadPos(offset) {
        this.offset = offset;
    }
    validateChecksum() {
        return true;
    }
}
//# sourceMappingURL=inputmessage.js.map