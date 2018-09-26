import {g_game} from "./src/game";
import {g_resources} from "./src/resources";
import {InputFile} from "./src/inputfile";
import {Movie} from "./src/network/movie";
import * as pako from "./node_modules/pako/dist/pako.js"
import {g_mapview} from "./src/mapview";

var moviePath = 'test.cam';
var compressed = false;

console.log(+new Date());
g_game.setClientVersion(854);
g_game.loadDatFile('Kasteria.dat');
var movieData: InputFile = g_resources.openFile(moviePath);
var movie: Movie;

if (compressed) {
    movieData.setReadPos(8);
    try {
        var result = pako.inflate(movieData.getBytes(-1));
        movie = new Movie(new DataView(result.buffer));
    } catch (err) {
        throw new Error(err);
    }
} else {
    movie = new Movie(movieData.getDataView());
}
console.log(+new Date());

g_game.watchMovie(movie);
console.log(+new Date());

//g_mapview.draw();