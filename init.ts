import * as $ from 'jquery';
import 'jqueryui';
import {Otc} from './modules/constants/const'
import {Game} from "./modules/game";

let x = Otc.MAX_AUTOWALK_DIST;


$(() => {
    let game = new Game();
    game.login('', '', '');
});
