import {ThingType} from "./thingtype";
import {ThingCategory} from "./constants/const";
import {error} from "./log";

let nullThingType = new ThingType()

export class ThingTypeManager {
    isValidDatId(id: number, category: ThingCategory): boolean {
        return true;
    }

    m_nullThingType = new ThingType();
    m_thingTypes: ThingType[][] = null;
    constructor() {
        this.m_thingTypes = [];
        for(let i = ThingCategory.ThingCategoryItem; i < ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }

    getThingType(id: number, category: ThingCategory): ThingType {
        if(category >= ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    }

    rawGetThingType(id: number, category: ThingCategory): any {
        return this.getThingType(id, category);
    }

    getNullThingType(): ThingType {
        return nullThingType;
    }

    getContentRevision(): any {
        throw new Error("Method not implemented.");
    }
}

let g_things = new ThingTypeManager();
export {g_things}
