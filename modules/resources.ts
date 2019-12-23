import {InputFile} from "./inputfile";
import {Log} from "./log";



class Resources {
    async openFile(file: string): Promise<InputFile> {
        let get = async function (url): Promise<ArrayBuffer> {
            return new Promise<ArrayBuffer>((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'arraybuffer';

                xhr.onload = function (e) {
                    if (this.status >= 200 && this.status < 300)
                        resolve(this.response);
                    else
                        reject('Response status: ' + this.status);
                };
                xhr.onerror = function(e) {
                    reject(e);
                };
                xhr.open('GET', url, true);//Async
                xhr.send();
            });
        };

        try {

            let response: any = await get(file);
            let uInt8Array = new Uint8Array(response);
            return new InputFile(new DataView(uInt8Array.buffer));
        } catch (e) {
            Log.debug('failed to openFile', e);
            throw e;
        }
    }
}

let g_resources = new Resources();
export {g_resources}

/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://test.test/Kasteria.dat', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
  // var byte3 = uInt8Array[4]; // byte at offset 4
console.log(uInt8Array);
};

xhr.send();
 */
