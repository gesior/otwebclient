"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputFile = /** @class */ (function () {
    function InputFile(msg) {
        this.data = msg;
        this.offset = 0;
        this.size = msg.byteLength;
    }
    InputFile.prototype.getU8 = function () {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        var v = this.data.getUint8(this.offset);
        this.offset += 1;
        return v;
    };
    InputFile.prototype.getU16 = function () {
        return this.getU8() + this.getU8() * 256;
    };
    InputFile.prototype.getU32 = function () {
        return this.getU16() + this.getU16() * 256 * 256;
    };
    InputFile.prototype.getU64 = function () {
        return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
    };
    InputFile.prototype.get8 = function () {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        var v = this.data.getInt8(this.offset);
        this.offset += 1;
        return v;
    };
    InputFile.prototype.get16 = function () {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        var v = this.data.getInt16(this.offset);
        this.offset += 2;
        return v;
    };
    InputFile.prototype.get32 = function () {
        if (this.offset === this.size)
            throw new Error("Koniec pliku");
        var v = this.data.getInt32(this.offset);
        this.offset += 4;
        return v;
    };
    InputFile.prototype.getString = function () {
        var length = this.getU16();
        var text = '';
        for (var i = 0; i < length; i++) {
            text += String.fromCharCode(this.getU8());
        }
        return text;
    };
    InputFile.prototype.peekU8 = function () {
        var v = this.getU8();
        this.offset -= 1;
        return v;
    };
    InputFile.prototype.getUnreadSize = function () {
        return this.size - this.offset;
    };
    InputFile.prototype.getReadPos = function () {
        return this.offset;
    };
    InputFile.prototype.setReadPos = function (offset) {
        this.offset = offset;
    };
    InputFile.prototype.validateChecksum = function () {
        return true;
    };
    return InputFile;
}());
exports.InputFile = InputFile;
//# sourceMappingURL=inputfile.js.map