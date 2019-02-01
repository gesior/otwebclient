import {EventLog} from "./structures/eventlog";
import {Position} from "./position";
import {Creature} from "./creature";

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
        console.log('event', this.m_lastPacket, object);
    }

    onParsePacket(date: number) {
        this.m_lastPacket = date;
    }

    onWalk(creature: Creature, position: Position, oldPosition: Position) {
        if (oldPosition && (oldPosition.distance(position) > 1 || oldPosition.z != position.z)) {
            this.log({
                'type': 'm', 'c': creature.getId(),
                'fx': oldPosition.x, 'fy': oldPosition.y, 'fz': oldPosition.z,
                'tx': position.x, 'ty': position.y, 'tz': position.z
            });
        }
        this.log({'type': 'p', 'c': creature.getId(), 'tx': position.x, 'y': position.y, 'z': position.z});
    }

    onHealthChange(creature: Creature, health: number) {
        this.log({'type': 'hc', 'c': creature.getName(), 'h': health});
    }

    onMaxHealthChange(creature: Creature, health: number) {
        this.log({'type': 'mhc', 'c': creature.getName(), 'mh': health});
    }

    onManaChange(creature: Creature, mana: number) {
        this.log({'type': 'mc', 'c': creature.getName(), 'm': mana});
    }

    onMaxManaChange(creature: Creature, health: number) {
        this.log({'type': 'mmc', 'c': creature.getName(), 'mm': health});
    }

    onHear(creature: Creature, text: string, from: string = '') {
        this.log({'type': 't', 'c': creature.getName(), 'text': text, 'from': from});
    }

    onViewText(creature: Creature, text: string, author: string = '') {
        this.log({'type': 'e', 'c': creature.getName(), 'text': text, 'author': author});
    }
}

var g_movieEvent = new MovieEvent();
export {g_movieEvent}