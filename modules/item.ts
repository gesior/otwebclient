import {Thing} from "./thing";
import {g_things} from "./thingtypemanager";
import {ThingType} from "./thingtype";
import {ThingCategory} from "./constants/const";

export class Item extends Thing {
    istop: boolean;
    isbot: boolean;
    stackprio: number;
    constructor(private m_clientId: number = 0) {
        super();
        this.istop = this.getThingType().isOnTop();
        this.isbot = this.getThingType().isOnBottom();
        this.stackprio = this.getStackPriority();
    }

    isItem() {
        return true;
    }

    getId() {
        return this.m_clientId;
    }

    setId(id: number) {
        this.m_clientId = id;
    }

    setCountOrSubType(count: number) {

    }

    getThingType(): ThingType {
        return g_things.getThingType(this.m_clientId, ThingCategory.ThingCategoryItem);
    }

    rawGetThingType(): ThingType {
        return this.getThingType();
    }
}