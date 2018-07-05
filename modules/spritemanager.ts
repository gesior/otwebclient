import {InputFile} from "./inputfile";
import {Image} from "./image";

export class SpriteManager {
    m_loaded = false;
    m_signature = 0;
    m_spritesCount = 0;
    m_spritesOffset = 0;
    m_spritesFile: InputFile = null;

    getSpriteImage(id: number): Image { return new Image(0);}
}

let g_sprites = new SpriteManager();
export {g_sprites}