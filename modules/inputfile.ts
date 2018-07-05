import {log} from './log';

export class InputFile {
    private data: DataView;
    private offset: number;
    private size: number;

    constructor(msg: DataView) {
        this.data = msg
        this.offset = 0;
        this.size = msg.byteLength;
    }


    getU8(): number {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");

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

    get8(): number {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt8(this.offset);
        this.offset += 1;
        return v;
    }

    get16(): number {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt16(this.offset);
        this.offset += 2;
        return v;
    }

    get32(): number {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt32(this.offset);
        this.offset += 4;
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

    peekU8(): number {
        const v = this.getU8();
        this.offset -= 1;
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