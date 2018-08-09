import { Thing } from "./thing";
import { g_things } from "./thingtypemanager";
import { ThingCategory } from "./constants/const";
export class Item extends Thing {
    constructor(m_clientId = 0) {
        super();
        this.m_clientId = m_clientId;
        this.subtype = -1;
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
    setId(id) {
        this.m_clientId = id;
    }
    setCountOrSubType(count) {
        this.subtype = count;
    }
    getThingType() {
        return g_things.getThingType(this.m_clientId, ThingCategory.ThingCategoryItem);
    }
    rawGetThingType() {
        return this.getThingType();
    }
}
//# sourceMappingURL=item.js.map