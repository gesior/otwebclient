import { Thing } from "./thing";
export class Missile extends Thing {
    isMissile() {
        return true;
    }
    getId() {
        return this.m_id;
    }
    setId(id) {
        this.m_id = id;
    }
    setPath(fromPos, toPos) {
    }
}
//# sourceMappingURL=missile.js.map