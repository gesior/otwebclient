import {Creature} from './creature';

export class Player extends Creature {

    isPlayer() {
        return true;
    }
}