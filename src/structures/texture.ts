import {Image} from "../image";
import {Size} from "./size";

let x = 0;
export class Texture {
    m_id = 0;
    m_time = 0;
    m_size: Size;
    mglSize: Size;
    m_hasMipmaps = false;
    m_smooth = false;
    m_upsideDown = false;
    m_repeat = false;

    tmp_img :Image;
    constructor(image: Image, buildMipmaps: boolean = false, compress: boolean = false) {
        this.tmp_img = image;
    }

}