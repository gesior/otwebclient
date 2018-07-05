import {Thing} from "./thing";

export class Item extends Thing {
    constructor(private id: number = 0) {
        super();
    }

    getId(): number {
        return this.id
    }

    setCountOrSubType(count: number) {

    }
}