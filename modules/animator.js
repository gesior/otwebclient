"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./constants/const");
var Animator = (function () {
    function Animator() {
        this.m_animationPhases = 0;
        this.m_startPhase = 0;
        this.m_loopCount = 0;
        this.m_async = false;
        this.m_phaseDurations = [];
        this.m_currentDuration = 0;
        this.m_currentDirection = const_1.AnimationDirection.AnimDirForward;
        this.m_currentLoop = 0;
        this.m_lastPhaseTicks = 0;
        this.m_isComplete = false;
        this.m_phase = 0;
    }
    Animator.prototype.unserialize = function (animationPhases, fin) {
        this.m_animationPhases = animationPhases;
        this.m_async = fin.getU8() == 0;
        this.m_loopCount = fin.get32();
        this.m_startPhase = fin.get8();
        for (var i = 0; i < this.m_animationPhases; ++i) {
            var minimum = fin.getU32();
            var maximum = fin.getU32();
            this.m_phaseDurations.push([minimum, maximum]);
        }
        /*
        m_phase = getStartPhase();

        assert(m_animationPhases == (int)m_phaseDurations.size());
        assert(m_startPhase >= -1 && m_startPhase < m_animationPhases);
        */
    };
    return Animator;
}());
exports.Animator = Animator;
//# sourceMappingURL=animator.js.map