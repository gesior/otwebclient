import { Image } from "./image";
export class SpriteManager {
    constructor() {
        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
    }
    getSpriteImage(id) { return new Image(0); }
}
let g_sprites = new SpriteManager();
export { g_sprites };
//# sourceMappingURL=spritemanager.js.map