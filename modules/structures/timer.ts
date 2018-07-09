import {g_clock} from "./g_clock";

export class Timer {
    m_startTicks: number = 0;
    m_stopped: boolean = false;

    constructor() {
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

    ticksElapsed(): number {
        return g_clock.millis() - this.m_startTicks;
    }

    timeElapsed(): number {
        return this.ticksElapsed() / 1000;
    }

    running(): boolean {
        return !this.m_stopped;
    }
}