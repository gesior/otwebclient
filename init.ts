
import {GameFeature, Otc} from './modules/constants/const'
import {g_game} from "./modules/game";
import {g_resources} from "./modules/resources";
import {InputFile} from "./modules/inputfile";
import {Movie} from "./modules/network/movie";
import {g_mapview} from "./modules/view/mapview";

let x = Otc.MAX_AUTOWALK_DIST;

//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');

import 'pixi.js'
console.log('pixi', PIXI);

async function test() {
    g_game.setClientVersion(854);
    console.log('load');
    await g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
    await g_game.loadSprFile('http://inditex.localhost/Kasteria.spr');
    console.log('load file');
    var movieData: InputFile = await g_resources.openFile('http://inditex.localhost/poh.ukcam');
    //movieData.setReadPos(8);
    var movie: Movie = new Movie(new DataView(movieData.getBytes(-1)));
    g_mapview.init();
    g_mapview.clear();
    g_game.watchMovie(movie);
    g_mapview.draw();
    //g_game.login('', '', 'GOD Spider Local');
}
test();