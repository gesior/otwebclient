import {Thing} from "./thing";
import {g_things} from "./thingtypemanager";
import {ThingType} from "./thingtype";
import {ThingCategory} from "./constants/const";

export class Item extends Thing {
    constructor(private m_clientId: number = 0) {
        super();

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