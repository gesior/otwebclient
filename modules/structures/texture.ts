import {Image} from "../image";
import {Size} from "./size";

export class Texture {
    m_id = 0;
    m_time = 0;
    m_size: Size;
    mglSize: Size;
    m_hasMipmaps = false;
    m_smooth = false;
    m_upsideDown = false;
    m_repeat = false;

    constructor(image: Image, buildMipmaps: boolean = false, compress: boolean = false) {

    }
}