import {Position} from "../position";

export abstract class BinaryDataReader {
    private data: DataView;
    private offset: number;
    private size: number;

    constructor(msg: DataView) {
        this.data = msg;
        this.offset = 0;
        this.size = this.data.byteLength;
    }

    getU8(): number {
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

    get8(): number {
        if (this.offset + 1 > this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt8(this.offset);
        this.offset += 1;
        return v;
    }

    get16(): number {
        if (this.offset + 2 > this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt16(this.offset);
        this.offset += 2;
        return v;
    }

    get32(): number {
        if (this.offset + 4 > this.size)
            throw new Error("Koniec pliku");

        let v = this.data.getInt32(this.offset);
        this.offset += 4;
        return v;
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

    getBytes(bytesCount: number): ArrayBuffer {
        if (bytesCount == -1)
            bytesCount = this.size - this.offset;

        if (this.offset + bytesCount > this.size)
            throw new Error("Koniec pakietu");

        var bytes = this.data.buffer.slice(this.offset, this.offset + bytesCount);
        this.offset += bytesCount;
        return bytes;
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

    peekU32(): number {
        const v = this.getU32();
        this.offset -= 4;
        return v;
    }

    peekU64(): number {
        const v = this.getU64();
        this.offset -= 8;
        return v;
    }

    skipBytes(bytesCount) {
        if (this.offset + bytesCount > this.size)
            throw new Error("Koniec pakietu");

        this.offset += bytesCount;
    }

    skip(bytesCount) {
        this.skipBytes(bytesCount);
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
}