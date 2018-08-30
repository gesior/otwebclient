class Clock {
    millis() {
        return +new Date();
    }
}

let g_clock = new Clock();
export {g_clock}