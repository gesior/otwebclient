"use strict";
exports.__esModule = true;
var jspack_1 = require("../jspack");
var OutputMessage = /** @class */ (function () {
    function OutputMessage() {
        this.data = [];
    }
    OutputMessage.prototype.addU8 = function (v) {
        v = v % 256;
        this.data = this.data.concat(OutputMessage.packer.Pack('B', [v]));
    };
    OutputMessage.prototype.addU16 = function (v) {
        v = v % (256 * 256);
        this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v]));
    };
    OutputMessage.prototype.addU32 = function (v) {
        v = v % (256 * 256 * 256 * 256);
        this.data = this.data.concat(OutputMessage.packer.Pack('<I', [v]));
    };
    OutputMessage.prototype.addU64 = function (v) {
        throw new Error('unimplemented');
    };
    OutputMessage.prototype.addString = function (v) {
        this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v.length]));
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var c = v_1[_i];
            this.data = this.data.concat(OutputMessage.packer.Pack('s', [c]));
        }
    };
    OutputMessage.prototype.writeChecksum = function () {
        //error('writeChecksum not implemented');
    };
    OutputMessage.prototype.writeMessageSize = function () {
        this.data = OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
    };
    OutputMessage.prototype.getBuffer = function () {
        return new Uint8Array(this.data).buffer; //OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
    };
    OutputMessage.packer = (new jspack_1.JSPack());
    return OutputMessage;
}());
exports.OutputMessage = OutputMessage;
