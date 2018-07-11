import {log} from '../log';
import {Position} from "../position";

export class InputMessage {
    private data: DataView;
    private offset: number;
    private size: number;

    constructor(msg: DataView) {
        this.data = msg;// new DataView(msg.buffer.slice(0));
        this.offset = 0;
        this.size = this.data.byteLength;
    }

    getU8(): number {
        //log('InputMessage.getU8', this.offset, this.size);
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");

        let v = this.data.getUint8(this.offset);
        this.offset += 1;
        return v;
    }

    getU16(): number {
        return this.getU8() + this.getU8() * 256;
    }

    getU32(): number {
        return this.getU16() + this.getU16() * 256 * 256;
    }

    getU64(): number {
        return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
    }

    getDouble() {
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");

        let v = this.data.getFloat64(this.offset);
        this.offset += 8;
        return v;
    }

    getString(): string {
        const length = this.getU16();
        let text = '';
        for (let i = 0; i < length; i++) {
            text += String.fromCharCode(this.getU8());
        }
        return text;
    }

    getPosition(): Position {
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

    peekU8(): number {
        const v = this.getU8();
        this.offset -= 1;
        return v;
    }

    peekU16(): number {
        const v = this.getU16();
        this.offset -= 2;
        return v;
    }

    getUnreadSize(): number {
        return this.size - this.offset;
    }

    getReadPos(): number {
        return this.offset;
    }

    setReadPos(offset: number) {
        this.offset = offset;
    }

    validateChecksum(): boolean {
        return true;
    }
}