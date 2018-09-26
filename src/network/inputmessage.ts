import {BinaryDataReader} from "../abstract/binarydatareader";

export class InputMessage  extends BinaryDataReader {
    validateChecksum(): boolean {
        return true;
    }
}