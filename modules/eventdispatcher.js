export class ScheduledEvent {
    constructor(id) {
        this.id = id;
    }
    cancel() {
        clearTimeout(this.id);
    }
}
export class EventDispatcher {
    scheduleEvent(event, delay = 0) {
        return new ScheduledEvent(setTimeout(event, delay));
    }
}
let g_dispatcher = new EventDispatcher();
export { g_dispatcher };
//# sourceMappingURL=eventdispatcher.js.map