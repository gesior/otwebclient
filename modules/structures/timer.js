import { g_clock } from "./g_clock";
export class Timer {
    constructor() {
        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }
    restart() {
        this.m_startTicks = g_clock.millis();
        this.m_stopped = false;
    }
    stop() {
        this.m_stopped = true;
    }
    startTicks() {
        return this.m_startTicks;
    }
    ticksElapsed() {
        return g_clock.millis() - this.m_startTicks;
    }
    timeElapsed() {
        return this.ticksElapsed() / 1000;
    }
    running() {
        return !this.m_stopped;
    }
}
//# sourceMappingURL=timer.js.map