import {g_game} from "./src/game";
import {g_resources} from "./src/resources";
import {InputFile} from "./src/inputfile";
import {Movie} from "./src/network/movie";
import * as pako from "./node_modules/pako/dist/pako.js"

g_game.setClientVersion(854);
g_game.loadDatFile('Kasteria.dat');
var movieData: InputFile = g_resources.openFile('itembug3.kcam');

movieData.setReadPos(8);

var result;
try {
    result = pako.inflate(movieData.getBytes(-1));
} catch (err) {
    throw new Error(err);
}
var movie: Movie = new Movie(new DataView(result.buffer));
g_game.watchMovie(movie);
