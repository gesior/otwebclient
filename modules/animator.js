import { AnimationDirection } from "./constants/const";
export class Animator {
    constructor() {
        this.m_animationPhases = 0;
        this.m_startPhase = 0;
        this.m_loopCount = 0;
        this.m_async = false;
        this.m_phaseDurations = [];
        this.m_currentDuration = 0;
        this.m_currentDirection = AnimationDirection.AnimDirForward;
        this.m_currentLoop = 0;
        this.m_lastPhaseTicks = 0;
        this.m_isComplete = false;
        this.m_phase = 0;
    }
    unserialize(animationPhases, fin) {
        this.m_animationPhases = animationPhases;
        this.m_async = fin.getU8() == 0;
        this.m_loopCount = fin.get32();
        this.m_startPhase = fin.get8();
        for (let i = 0; i < this.m_animationPhases; ++i) {
            let minimum = fin.getU32();
            let maximum = fin.getU32();
            this.m_phaseDurations.push([minimum, maximum]);
        }
        /*
        m_phase = getStartPhase();

        assert(m_animationPhases == (int)m_phaseDurations.size());
        assert(m_startPhase >= -1 && m_startPhase < m_animationPhases);
        */
    }
    getPhase() {
        return this.m_phase;
    }
}
//# sourceMappingURL=animator.js.map