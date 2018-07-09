import { Thing } from "./thing";
import { g_things } from "./thingtypemanager";
import { ThingCategory } from "./constants/const";
export class Item extends Thing {
    constructor(m_clientId = 0) {
        super();
        this.m_clientId = m_clientId;
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
    }
    getThingType() {
        return g_things.getThingType(this.m_clientId, ThingCategory.ThingCategoryItem);
    }
    rawGetThingType() {
        return this.getThingType();
    }
}
//# sourceMappingURL=item.js.map