import { error } from "./log";
import { Color } from "./color";
import { Size } from "./structures/size";
export class Image {
    blit(point, image) {
    }
    overwriteMask(color, insideColor = Color.white, outsideColor = Color.alpha) {
    }
    constructor(size) {
        if (size instanceof Size) {
        }
        else if (typeof size == 'number') {
        }
    }
    static load(path) {
        error('load image', path);
        return null;
    }
    setId(id) {
    }
}
//# sourceMappingURL=image.js.map