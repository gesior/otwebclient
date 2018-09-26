import {Player} from './player';
import {Position} from "./position";
import {g_movieEvent} from "./movieevent";

export class LocalPlayer extends Player {
    m_known: boolean = false;

    isLocalPlayer() {
        return true;
    }


    onPositionChange(newPos: Position, oldPos: Position) {
        super.onPositionChange(newPos, oldPos);
        g_movieEvent.onWalk(newPos);
    }
    setBlessings(blessings: number) {

    }

    setKnown(v: boolean) {
        this.m_known = v;
    }
    isKnown() {
        return this.m_known;
    }

}