class Painter {
    constructor() {
        this.app = new PIXI.Application(800, 600, { transparent: true });
        document.body.appendChild(this.app.view);
        this.app.stage.interactive = true;
        //this.container = new PIXI.particles.ParticleContainer();
        //this.app.stage.addChild(this.container);
        this.app.stage
            .on('mousemove', onPointerMove)
            .on('touchmove', onPointerMove);
        function onPointerMove(eventData) {
        }
    }
    drawTexturedRect(dest, texture, src) {
        if (dest.isEmpty() || src.isEmpty()) {
            console.log('empty', dest.width(), dest.height(), src);
            throw new Error('empty');
            //return;
        }
        let pixiTexture = texture.getPixiTexture(src);
        let pixiSprite = new PIXI.Sprite(pixiTexture);
        pixiSprite.position.x = dest.left() + 40;
        pixiSprite.position.y = dest.top() + 30;
        pixiSprite.width = pixiTexture.width;
        pixiSprite.height = pixiTexture.height;
        if (pixiSprite.width != pixiTexture.width || pixiSprite.height != pixiTexture.height)
            console.log('addchild', dest, src, pixiSprite.width, pixiSprite.height, pixiTexture.width, pixiTexture.height);
        this.app.stage.addChild(pixiSprite);
        // const awareRange = g_map.getAwareRange();
        // var painterview = document.getElementById('painterview');
        // let image : Image = texture.tmp_img;
        // var el = <HTMLCanvasElement> document.getElementById("myCanvas");
        // var $ctx = el.getContext('2d');
        // var id = $ctx.createImageData(1,1);
        // for (let i = 0; i < image.getPixelCount(); ++i) {
        //
        //     let x = i % image.getWidth();
        //     let y = toInt(i / image.getWidth());
        //     let pos = ((y) * image.getWidth() + (x)) * 4;
        //     let r = image.m_pixels[pos];
        //     let g = image.m_pixels[pos+1];
        //     let b = image.m_pixels[pos+2];
        //     let a = image.m_pixels[pos+3];
        //
        //     //a=128;
        //     $ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';
        //     $ctx.fillRect(dest.x + x + 260, dest.y + y+270, 1, 1);
        // }
    }
}
let g_painter = new Painter();
export { g_painter };
//# sourceMappingURL=painter.js.map