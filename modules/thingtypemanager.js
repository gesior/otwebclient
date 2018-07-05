"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thingtype_1 = require("./thingtype");
var const_1 = require("./constants/const");
var log_1 = require("./log");
var nullThingType = new thingtype_1.ThingType();
var ThingTypeManager = /** @class */ (function () {
    function ThingTypeManager() {
        this.m_nullThingType = new thingtype_1.ThingType();
        this.m_thingTypes = null;
        this.m_thingTypes = [];
        for (var i = const_1.ThingCategory.ThingCategoryItem; i < const_1.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }
    ThingTypeManager.prototype.isValidDatId = function (id, category) {
        return true;
    };
    ThingTypeManager.prototype.getThingType = function (id, category) {
        if (category >= const_1.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            log_1.error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    };
    ThingTypeManager.prototype.rawGetThingType = function (id, category) {
        return this.getThingType(id, category);
    };
    ThingTypeManager.prototype.getNullThingType = function () {
        return nullThingType;
    };
    ThingTypeManager.prototype.getContentRevision = function () {
        throw new Error("Method not implemented.");
    };
    return ThingTypeManager;
}());
exports.ThingTypeManager = ThingTypeManager;
var g_things = new ThingTypeManager();
exports.g_things = g_things;
//# sourceMappingURL=thingtypemanager.js.map