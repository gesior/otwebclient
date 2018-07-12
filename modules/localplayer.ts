import {Player} from './player';

export class LocalPlayer extends Player {
    m_known: boolean = false;

    isLocalPlayer() {
        return true;
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