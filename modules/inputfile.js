export class InputFile {
    constructor(msg) {
        this.data = msg;
        this.offset = 0;
        this.size = msg.byteLength;
    }
    getU8() {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
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
    get8() {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        let v = this.data.getInt8(this.offset);
        this.offset += 1;
        return v;
    }
    get16() {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        let v = this.data.getInt16(this.offset);
        this.offset += 2;
        return v;
    }
    get32() {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        let v = this.data.getInt32(this.offset);
        this.offset += 4;
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
    peekU8() {
        const v = this.getU8();
        this.offset -= 1;
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
//# sourceMappingURL=inputfile.js.map