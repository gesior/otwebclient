import { EventLog } from "./structures/eventlog";
class MovieEvent {
    init(startDate) {
        this.m_startDate = startDate;
        this.m_lastPacket = startDate;
        this.m_log = [];
    }
    log(object) {
        this.m_log.push(new EventLog(this.m_lastPacket, object));
        //console.log('event', this.m_lastPacket, object);
    }
    onParsePacket(date) {
        this.m_lastPacket = date;
    }
    onWalk(position) {
        this.log({ 'type': 'p', 'x': position.x, 'y': position.y, 'z': position.z });
    }
    onHear(text, from = '') {
        this.log({ 'type': 't', 'text': text, 'from': from });
    }
    onViewText(text, author = '') {
        this.log({ 'type': 'e', 'text': text, 'author': author });
    }
}
var g_movieEvent = new MovieEvent();
export { g_movieEvent };
//# sourceMappingURL=movieevent.js.map