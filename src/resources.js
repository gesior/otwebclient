import { InputFile } from "./inputfile";
import { Log } from "./log";
import * as fs from "fs";
class Resources {
    openFile(file) {
        try {
            var response = fs.readFileSync(file);
            //console.log('r', response);
            let uInt8Array = new Uint8Array(response);
            return new InputFile(new DataView(uInt8Array.buffer));
        }
        catch (e) {
            Log.debug('failed to openFile', e);
            throw e;
        }
    }
}
let g_resources = new Resources();
export { g_resources };
//# sourceMappingURL=resources.js.map