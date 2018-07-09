import * as $ from 'jquery';
//import 'jqueryui';
import {GameFeature, Otc} from './modules/constants/const'
import {g_game} from "./modules/game";

let x = Otc.MAX_AUTOWALK_DIST;

//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
console.log($);
async function test() {
    g_game.setClientVersion(854);
    console.log('load');
    await g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
    console.log('login');
    g_game.login('', '', 'GOD Spider Local');
}
test();