import {EventLog} from "./structures/eventlog";
import {Position} from "./position";

class MovieEvent {
    m_startDate: number;
    m_lastPacket: number;
    m_log: EventLog[];

    init(startDate: number) {
        this.m_startDate = startDate;
        this.m_lastPacket = startDate;
        this.m_log = [];
    }

    private log(object) {
        this.m_log.push(new EventLog(this.m_lastPacket, object));
        //console.log('event', this.m_lastPacket, object);
    }

    onParsePacket(date: number) {
        this.m_lastPacket = date;
    }

    onWalk(position: Position) {
        this.log({'type': 'p', 'x': position.x, 'y': position.y, 'z': position.z});
    }

    onHear(text: string, from: string = '') {
        this.log({'type': 't', 'text': text, 'from': from});
    }

    onViewText(text: string, author: string = '') {
        this.log({'type': 'e', 'text': text, 'author': author});
    }
}
var g_movieEvent = new MovieEvent();
export { g_movieEvent }