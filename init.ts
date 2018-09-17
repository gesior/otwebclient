
import {g_game} from "./modules/game";
import {g_resources} from "./modules/resources";
import {InputFile} from "./modules/inputfile";
import {Movie} from "./modules/network/movie";

//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');

async function test() {
    g_game.setClientVersion(854);
    console.log('load');
    await g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
    console.log('load file');
    var movieData: InputFile = await g_resources.openFile('http://inditex.localhost/small.ukcam');
    //movieData.setReadPos(8);
    var movie: Movie = new Movie(new DataView(movieData.getBytes(-1)));
    g_game.watchMovie(movie);
}
test();