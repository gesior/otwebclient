var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { g_game } from "./modules/game";
import { g_resources } from "./modules/resources";
import { Movie } from "./modules/network/movie";
//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        g_game.setClientVersion(854);
        console.log('load');
        yield g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
        console.log('load file');
        var movieData = yield g_resources.openFile('http://inditex.localhost/small.ukcam');
        //movieData.setReadPos(8);
        var movie = new Movie(new DataView(movieData.getBytes(-1)));
        g_game.watchMovie(movie);
    });
}
test();
//# sourceMappingURL=init.js.map