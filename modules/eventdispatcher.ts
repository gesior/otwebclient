export class ScheduledEvent {
    constructor(public id: number) {
    }

    cancel(): void {
        clearTimeout(this.id);
    }
}

export class EventDispatcher {
    scheduleEvent(event, delay = 0): ScheduledEvent {
        return new ScheduledEvent(setTimeout(event, delay));
    }
}

let g_dispatcher = new EventDispatcher();
export {g_dispatcher};