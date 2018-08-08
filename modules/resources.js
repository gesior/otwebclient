var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InputFile } from "./inputfile";
import { Log } from "./log";
class Resources {
    openFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let get = function (url) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Promise((resolve, reject) => {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'arraybuffer';
                        xhr.onload = function (e) {
                            if (this.status >= 200 && this.status < 300)
                                resolve(this.response);
                            else
                                reject('Response status: ' + this.status);
                        };
                        xhr.onerror = function (e) {
                            reject(e);
                        };
                        xhr.open('GET', url, true); //Async
                        xhr.send();
                    });
                });
            };
            try {
                let response = yield get(file);
                console.log('r', response);
                let uInt8Array = new Uint8Array(response);
                return new InputFile(new DataView(uInt8Array.buffer));
            }
            catch (e) {
                Log.debug('failed to openFile', e);
                throw e;
            }
        });
    }
}
let g_resources = new Resources();
export { g_resources };
/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://inditex.localhost/Kasteria.dat', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
  // var byte3 = uInt8Array[4]; // byte at offset 4
console.log(uInt8Array);
};

xhr.send();
 */ 
//# sourceMappingURL=resources.js.map