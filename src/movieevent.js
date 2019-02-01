import { EventLog } from "./structures/eventlog";
class MovieEvent {
    init(startDate) {
        this.m_startDate = startDate;
        this.m_lastPacket = startDate;
        this.m_log = [];
    }
    log(object) {
        this.m_log.push(new EventLog(this.m_lastPacket, object));
        console.log('event', this.m_lastPacket, object);
    }
    onParsePacket(date) {
        this.m_lastPacket = date;
    }
    onWalk(creature, position, oldPosition) {
        if (oldPosition && (oldPosition.distance(position) > 1 || oldPosition.z != position.z)) {
            this.log({
                'type': 'm', 'c': creature.getId(),
                'fx': oldPosition.x, 'fy': oldPosition.y, 'fz': oldPosition.z,
                'tx': position.x, 'ty': position.y, 'tz': position.z
            });
        }
        this.log({ 'type': 'p', 'c': creature.getId(), 'tx': position.x, 'y': position.y, 'z': position.z });
    }
    onHealthChange(creature, health) {
        this.log({ 'type': 'hc', 'c': creature.getName(), 'h': health });
    }
    onMaxHealthChange(creature, health) {
        this.log({ 'type': 'mhc', 'c': creature.getName(), 'mh': health });
    }
    onManaChange(creature, mana) {
        this.log({ 'type': 'mc', 'c': creature.getName(), 'm': mana });
    }
    onMaxManaChange(creature, health) {
        this.log({ 'type': 'mmc', 'c': creature.getName(), 'mm': health });
    }
    onHear(creature, text, from = '') {
        this.log({ 'type': 't', 'c': creature.getName(), 'text': text, 'from': from });
    }
    onViewText(creature, text, author = '') {
        this.log({ 'type': 'e', 'c': creature.getName(), 'text': text, 'author': author });
    }
}
var g_movieEvent = new MovieEvent();
export { g_movieEvent };
//# sourceMappingURL=movieevent.js.map