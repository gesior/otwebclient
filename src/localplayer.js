import { Player } from './player';
import { g_movieEvent } from "./movieevent";
export class LocalPlayer extends Player {
    constructor() {
        super(...arguments);
        this.m_known = false;
    }
    isLocalPlayer() {
        return true;
    }
    onPositionChange(newPos, oldPos) {
        super.onPositionChange(newPos, oldPos);
        g_movieEvent.onWalk(newPos);
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