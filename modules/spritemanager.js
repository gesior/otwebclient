var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Image } from "./image";
import { g_resources } from "./resources";
import { Log } from "./log";
import { g_game } from "./game";
import { GameFeature } from "./constants/const";
import { Size } from "./structures/size";
export class SpriteManager {
    constructor() {
        this.m_loaded = false;
        this.m_signature = 0;
        this.m_spritesCount = 0;
        this.m_spritesOffset = 0;
        this.m_spritesFile = null;
        this.m_spriteCache = [];
    }
    loadSpr(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_spritesCount = 0;
            this.m_signature = 0;
            this.m_loaded = false;
            try {
                console.log(new Date().getTime(), 'spr');
                this.m_spritesFile = yield g_resources.openFile(file);
                this.m_signature = this.m_spritesFile.getU32();
                this.m_spritesCount = g_game.getFeature(GameFeature.GameSpritesU32) ? this.m_spritesFile.getU32() : this.m_spritesFile.getU16();
                this.m_spritesOffset = this.m_spritesFile.tell();
                this.m_loaded = true;
                console.log(new Date().getTime(), 'spr');
                return true;
            }
            catch (e) {
                Log.error("Failed to load sprites from '%s': %s", file, e);
                return false;
            }
        });
    }
    getSpritesCount() {
        return this.m_spritesCount;
    }
    getSpriteImage(id) {
        try {
            if (id == 0 || !this.m_spritesFile)
                return null;
            this.m_spritesFile.seek(((id - 1) * 4) + this.m_spritesOffset);
            let spriteAddress = this.m_spritesFile.getU32();
            // no sprite? return an empty texture
            if (spriteAddress == 0)
                return null;
            if (this.m_spriteCache[spriteAddress]) {
                return this.m_spriteCache[spriteAddress];
            }
            this.m_spritesFile.seek(spriteAddress);
            // skip color key
            this.m_spritesFile.getU8();
            this.m_spritesFile.getU8();
            this.m_spritesFile.getU8();
            let pixelDataSize = this.m_spritesFile.getU16();
            let image = new Image(new Size(SpriteManager.SPRITE_SIZE, SpriteManager.SPRITE_SIZE));
            let pixels = image.getPixelData();
            let writePos = 0;
            let read = 0;
            let useAlpha = g_game.getFeature(GameFeature.GameSpritesAlphaChannel);
            let channels = useAlpha ? 4 : 3;
            // decompress pixels
            while (read < pixelDataSize && writePos < SpriteManager.SPRITE_DATA_SIZE) {
                let transparentPixels = this.m_spritesFile.getU16();
                let coloredPixels = this.m_spritesFile.getU16();
                for (let i = 0; i < transparentPixels && writePos < SpriteManager.SPRITE_DATA_SIZE; i++) {
                    pixels[writePos + 0] = 0x00;
                    pixels[writePos + 1] = 0x00;
                    pixels[writePos + 2] = 0x00;
                    pixels[writePos + 3] = 0x00;
                    writePos += 4;
                }
                for (let i = 0; i < coloredPixels && writePos < SpriteManager.SPRITE_DATA_SIZE; i++) {
                    pixels[writePos + 0] = this.m_spritesFile.getU8();
                    pixels[writePos + 1] = this.m_spritesFile.getU8();
                    pixels[writePos + 2] = this.m_spritesFile.getU8();
                    pixels[writePos + 3] = useAlpha ? this.m_spritesFile.getU8() : 0xFF;
                    writePos += 4;
                }
                read += 4 + (channels * coloredPixels);
            }
            // fill remaining pixels with alpha
            while (writePos < SpriteManager.SPRITE_DATA_SIZE) {
                pixels[writePos + 0] = 0x00;
                pixels[writePos + 1] = 0x00;
                pixels[writePos + 2] = 0x00;
                pixels[writePos + 3] = 0x00;
                writePos += 4;
            }
            this.m_spriteCache[spriteAddress] = image;
            return image;
        }
        catch (e) {
            Log.error("Failed to get sprite id %d: %s", id, e);
            return null;
        }
    }
}
SpriteManager.SPRITE_SIZE = 32;
SpriteManager.SPRITE_DATA_SIZE = SpriteManager.SPRITE_SIZE * SpriteManager.SPRITE_SIZE * 4;
let g_sprites = new SpriteManager();
export { g_sprites };
//# sourceMappingURL=spritemanager.js.map