import {error} from "./log";
import {Color} from "./color";
import {Point, Size} from "./structures";

export class Image {
    blit(point: Point, image: Image) {

    }

    overwriteMask(color: number, insideColor: number = Color.white, outsideColor: number = Color.alpha) {

    }

    constructor(size) {
        if (size instanceof Size) {

        } else if (typeof size == 'number') {

        }

    }

    static load(path): Image {
        error('load image', path);
        return null
    }
    setId(id: number) {

    }
}