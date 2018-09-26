import { BinaryDataReader } from "../abstract/binarydatareader";
export class InputMessage extends BinaryDataReader {
    validateChecksum() {
        return true;
    }
}
//# sourceMappingURL=inputmessage.js.map