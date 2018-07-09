var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as $ from 'jquery';
//import 'jqueryui';
import { Otc } from './modules/constants/const';
import { g_game } from "./modules/game";
let x = Otc.MAX_AUTOWALK_DIST;
//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
console.log($);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        g_game.setClientVersion(854);
        console.log('load');
        yield g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
        console.log('login');
        g_game.login('', '', 'GOD Spider Local');
    });
}
test();
//# sourceMappingURL=init.js.map