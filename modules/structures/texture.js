import { g_painter } from "../painter";
import { toInt } from "../constants/helpers";
let x = 0;
export class Texture {
    constructor(image, buildMipmaps = false, compress = false) {
        this.m_id = 0;
        this.m_time = 0;
        this.m_hasMipmaps = false;
        this.m_smooth = false;
        this.m_upsideDown = false;
        this.m_repeat = false;
        this.m_texture = null;
        this.tmp_img = image;
    }
    getPixiTexture() {
        if (this.m_texture) {
            return this.m_texture;
        }
        let graphics = new PIXI.Graphics();
        graphics.width = this.tmp_img.m_size.width();
        graphics.height = this.tmp_img.m_size.height();
        graphics.beginFill(0, 0);
        graphics.drawRect(0, 0, graphics.width, graphics.height);
        graphics.endFill();
        //this.tmp_img.getPixelData();
        let other = this.tmp_img;
        for (let p = 0; p < other.getPixelCount(); ++p) {
            let x = toInt(p % other.getWidth());
            let y = toInt(p / other.getWidth());
            if (other.m_pixels[p * 4 + 3] != 0) {
                graphics.beginFill(other.m_pixels[p * 4] * 256 * 256 + other.m_pixels[p * 4 + 1] * 256 + other.m_pixels[p * 4 + 2], 1);
                graphics.drawRect(x, y, 1, 1);
                graphics.endFill();
            }
        }
        this.m_texture = g_painter.app.renderer.generateTexture(graphics);
        return this.m_texture;
        //return PIXI.Texture.fromImage('/prv/webclient/fronttypescript/favicon.png');
    }
}
//# sourceMappingURL=texture.js.map