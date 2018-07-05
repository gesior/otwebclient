import {AnimationDirection} from "./constants/const";
import {InputFile} from "./inputfile";

export class Animator {
    m_animationPhases = 0;
    m_startPhase = 0;
    m_loopCount = 0;
    m_async = false;
    m_phaseDurations = [];
    m_currentDuration = 0;
    m_currentDirection = AnimationDirection.AnimDirForward;
    m_currentLoop = 0;
    m_lastPhaseTicks = 0;
    m_isComplete = false;
    m_phase = 0;

    unserialize(animationPhases: number, fin: InputFile) {
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
}
