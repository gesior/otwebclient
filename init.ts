import {g_game} from "./src/game";
import {g_resources} from "./src/resources";
import {InputFile} from "./src/inputfile";
import {Movie} from "./src/network/movie";
import * as pako from "./node_modules/pako/dist/pako.js"
import {g_mapview} from "./src/mapview";

var moviePath = '20923_5033_237_1548719510_1548723110_2643428645_.cam.ready';
var compressed = true;

console.log(+new Date());
g_game.setClientVersion(1099);
g_game.loadDatFile('Masteria.dat');
var movieData: InputFile = g_resources.openFile(moviePath);
var movie: Movie;

if (compressed) {
    //movieData.setReadPos(8);
    try {
        var result= movieData.getBytes(-1);
        console.log(123, result);
        //var result = pako.inflate(x);
        //console.log(123, result);
        movie = new Movie(new DataView(result));
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