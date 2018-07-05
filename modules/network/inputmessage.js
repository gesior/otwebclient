"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../log");
var position_1 = require("../position");
var InputMessage = /** @class */ (function () {
    function InputMessage(msg) {
        this.data = new DataView(msg.buffer.slice(8));
        this.offset = 0;
        this.size = msg.getUint8(6) + msg.getUint8(7) * 256;
    }
    InputMessage.prototype.getU8 = function () {
        //log('InputMessage.getU8', this.offset, this.size);
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");
        var v = this.data.getUint8(this.offset);
        this.offset += 1;
        return v;
    };
    InputMessage.prototype.getU16 = function () {
        return this.getU8() + this.getU8() * 256;
    };
    InputMessage.prototype.getU32 = function () {
        return this.getU16() + this.getU16() * 256 * 256;
    };
    InputMessage.prototype.getU64 = function () {
        return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
    };
    InputMessage.prototype.getString = function () {
        var length = this.getU16();
        var text = '';
        for (var i = 0; i < length; i++) {
            text += String.fromCharCode(this.getU8());
        }
        return text;
    };
    InputMessage.prototype.getPosition = function () {
        return new position_1.Position(this.getU16(), this.getU16(), this.getU8());
    };
    InputMessage.prototype.skipBytes = function (byteCount) {
        log_1.log('InputMessage.skipBytes', this.offset, this.size);
        if (this.offset + byteCount > this.size)
            throw new Error("Koniec pakietu");
        this.offset += byteCount;
    };
    InputMessage.prototype.skip = function (bytes) {
        this.skipBytes(bytes);
    };
    InputMessage.prototype.peekU8 = function () {
        var v = this.getU8();
        this.offset -= 1;
        return v;
    };
    InputMessage.prototype.peekU16 = function () {
        var v = this.getU16();
        this.offset -= 2;
        return v;
    };
    InputMessage.prototype.getUnreadSize = function () {
        return this.size - this.offset;
    };
    InputMessage.prototype.getReadPos = function () {
        return this.offset;
    };
    InputMessage.prototype.setReadPos = function (offset) {
        this.offset = offset;
    };
    InputMessage.prototype.validateChecksum = function () {
        return true;
    };
    InputMessage.prototype.getDouble = function () {
        if (this.offset === this.size)
            throw new Error("Koniec pakietu");
        var v = this.data.getFloat64(this.offset);
        this.offset += 8;
        return v;
    };
    return InputMessage;
}());
exports.InputMessage = InputMessage;
//# sourceMappingURL=inputmessage.js.map