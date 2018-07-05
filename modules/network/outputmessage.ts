import {JSPack} from "../jspack";

export class OutputMessage {
    private static packer = (new JSPack());
    private data: number[];

    constructor() {
        this.data = [];
    }

    addU8(v) {
        v = v % 256;
        this.data = this.data.concat(OutputMessage.packer.Pack('B', [v]));
    }

    addU16(v) {
        v = v % (256 * 256);
        this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v]));
    }

    addU32(v) {
        v = v % (256 * 256 * 256 * 256);
        this.data = this.data.concat(OutputMessage.packer.Pack('<I', [v]));
    }

    addU64(v) {
        throw new Error('unimplemented');
    }

    addString(v) {
        this.data = this.data.concat(OutputMessage.packer.Pack('<H', [v.length]));
        for (let c of v) {
            this.data = this.data.concat(OutputMessage.packer.Pack('s', [c]));
        }
    }

    writeChecksum() {
        throw new Error('unimplemented');
    }

    writeMessageSize() {
        this.data = OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
    }

    getBuffer() {
        return new Uint8Array(this.data).buffer;//OutputMessage.packer.Pack('<H', [this.data.length]).concat(this.data);
    }
}