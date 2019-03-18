var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Otc } from './modules/constants/const';
import { g_game } from "./modules/game";
import { g_resources } from "./modules/resources";
import { Movie } from "./modules/network/movie";
import { g_mapview } from "./modules/view/mapview";
let x = Otc.MAX_AUTOWALK_DIST;
//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
import 'pixi.js';
import { Log } from "./modules/log";
import { g_painter } from "./modules/painter";
//console.log('pixi', PIXI);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        g_game.setClientVersion(854);
        yield g_game.loadDatFile('http://php72.sbg.best/prv/webclient/fronttypescript/Kasteria.dat');
        yield g_game.loadSprFile('http://php72.sbg.best/prv/webclient/fronttypescript/Kasteria.spr');
        var movieData = yield g_resources.openFile('http://php72.sbg.best/prv/webclient/fronttypescript/small.ukcam');
        //movieData.setReadPos(8);
        var movie = new Movie(new DataView(movieData.getBytes(-1)));
        g_mapview.init();
        g_mapview.clear();
        g_painter.app.ticker.add(function (deltaTime) {
            Log.debug('ticker', deltaTime);
            g_game.updateMovie(deltaTime);
            g_game.updateView(deltaTime);
            Log.debug('drawstart', +new Date());
            g_mapview.draw();
            Log.debug('drawend', +new Date());
        });
        g_game.loadMovie(movie);
        Log.debug('qwestart1', +new Date());
        //g_mapview.draw();
        Log.debug('qwestart2', +new Date());
        //g_mapview.draw();
        Log.debug('qweend', +new Date());
        //g_game.login('', '', 'GOD Spider Local');
    });
}
test();
//# sourceMappingURL=init.js.map