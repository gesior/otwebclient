let x = 0;
export class Texture {
    constructor(image, buildMipmaps = false, compress = false) {
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
        this.tmp_img = image;
    }
}
//# sourceMappingURL=texture.js.map