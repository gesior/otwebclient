import {BinaryDataReader} from "../abstract/binarydatareader";

export class Movie extends BinaryDataReader {

    constructor(msg: DataView) {
        super(msg);
        var header = this.getStringWithLength(8);
        if (header != 'TIBIACAM') {
            throw new Error('Not a Tibiacam movie. Header: ' + header);
        }
        
        console.log('TIBIACAM_VERSION', this.getU8());
        console.log('PLAYER_ID', this.getU32());
        console.log('PLAYER_NAME', this.getString());
        console.log('PROTOCOL', this.getU16());
        console.log('START MOVIE TIME', this.getU64());
    }

}