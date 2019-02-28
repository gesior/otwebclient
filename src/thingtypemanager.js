import { ThingType } from "./thingtype";
import { ThingCategory } from "./constants/const";
import { Log } from "./log";
import { g_resources } from "./resources";
let nullThingType = new ThingType();
export class ThingTypeManager {
    constructor() {
        this.m_nullThingType = new ThingType();
        this.m_thingTypes = null;
        this.m_datLoaded = false;
        this.m_xmlLoaded = false;
        this.m_otbLoaded = false;
        this.m_otbMinorVersion = 0;
        this.m_otbMajorVersion = 0;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        this.m_thingTypes = [];
        for (let i = ThingCategory.ThingCategoryItem; i < ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }
    getThingType(id, category) {
        if (category >= ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            Log.error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    }
    rawGetThingType(id, category) {
        return this.getThingType(id, category);
    }
    isValidDatId(id, category) {
        return id >= 1 && id < this.m_thingTypes[category].length;
    }
    getNullThingType() {
        return nullThingType;
    }
    getContentRevision() {
        throw new Error("Method not implemented.");
    }
    loadDat(file) {
        this.m_otbLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        try {
            let fin = g_resources.openFile(file);
            this.m_datSignature = fin.getU32();
            this.m_contentRevision = this.m_datSignature & 0xFFFF;
            for (let category = ThingCategory.ThingCategoryItem; category < ThingCategory.ThingLastCategory; ++category) {
                let count = fin.getU16() + 1;
                this.m_thingTypes[category] = [];
                for (let thingCount = 0; thingCount < count; ++thingCount) {
                    this.m_thingTypes[category][thingCount] = nullThingType;
                }
            }
            for (let category = 0; category < ThingCategory.ThingLastCategory; ++category) {
                let firstId = 1;
                if (category == ThingCategory.ThingCategoryItem)
                    firstId = 100;
                for (let id = firstId; id < this.m_thingTypes[category].length; ++id) {
                    let type = new ThingType();
                    type.unserialize(id, category, fin);
                    this.m_thingTypes[category][id] = type;
                }
            }
            this.m_datLoaded = true;
            //console.log(new Date().getTime(), this.m_thingTypes);
            //g_lua.callGlobalField("g_things", "onLoadDat", file);
            return true;
        }
        catch (e) {
            Log.error("Failed to read dat '%s': %s'", file, e);
            return false;
        }
    }
    loadOtb(file) {
        this.m_datLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        try {
            //console.log(new Date().getTime(), this.m_thingTypes);
            let fin = g_resources.openFile(file);
            this.m_datSignature = fin.getU32();
            this.m_contentRevision = this.m_datSignature & 0xFFFF;
            for (let category = ThingCategory.ThingCategoryItem; category < ThingCategory.ThingLastCategory; ++category) {
                let count = fin.getU16() + 1;
                this.m_thingTypes[category] = [];
                for (let thingCount = 0; thingCount < count; ++thingCount) {
                    this.m_thingTypes[category][thingCount] = nullThingType;
                }
            }
            for (let category = 0; category < ThingCategory.ThingLastCategory; ++category) {
                let firstId = 1;
                if (category == ThingCategory.ThingCategoryItem)
                    firstId = 100;
                for (let id = firstId; id < this.m_thingTypes[category].length; ++id) {
                    let type = new ThingType();
                    type.unserialize(id, category, fin);
                    this.m_thingTypes[category][id] = type;
                }
            }
            this.m_datLoaded = true;
            //console.log(new Date().getTime(), this.m_thingTypes);
            //g_lua.callGlobalField("g_things", "onLoadDat", file);
            return true;
        }
        catch (e) {
            Log.error("Failed to read dat '%s': %s'", file, e);
            return false;
        }
    }
}
let g_things = new ThingTypeManager();
export { g_things };
//# sourceMappingURL=thingtypemanager.js.map