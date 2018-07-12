import { Player } from './player';
export class LocalPlayer extends Player {
    constructor() {
        super(...arguments);
        this.m_known = false;
    }
    isLocalPlayer() {
        return true;
    }
    setBlessings(blessings) {
    }
    setKnown(v) {
        this.m_known = v;
    }
    isKnown() {
        return this.m_known;
    }
}
//# sourceMappingURL=localplayer.js.map