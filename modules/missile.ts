import {Thing} from "./thing";

export class Missile extends Thing {
    m_id: number;

    isMissile() {
        return true;
    }

    getId() {
        return this.m_id;
    }

    setId(id: number) {
        this.m_id = id;
    }

    setPath(fromPos: any, toPos: any) {

    }
}