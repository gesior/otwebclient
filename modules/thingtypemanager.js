"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var thingtype_1 = require("./thingtype");
var const_1 = require("./constants/const");
var log_1 = require("./log");
var resources_1 = require("./resources");
var nullThingType = new thingtype_1.ThingType();
var ThingTypeManager = /** @class */ (function () {
    function ThingTypeManager() {
        this.m_nullThingType = new thingtype_1.ThingType();
        this.m_thingTypes = null;
        this.m_datLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        this.m_thingTypes = [];
        for (var i = const_1.ThingCategory.ThingCategoryItem; i < const_1.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }
    ThingTypeManager.prototype.getThingType = function (id, category) {
        if (category >= const_1.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
            log_1.Log.error("invalid thing type client id %d in category %d", id, category);
            return this.m_nullThingType;
        }
        return this.m_thingTypes[category][id];
    };
    ThingTypeManager.prototype.rawGetThingType = function (id, category) {
        return this.getThingType(id, category);
    };
    ThingTypeManager.prototype.isValidDatId = function (id, category) {
        return true;
    };
    ThingTypeManager.prototype.getNullThingType = function () {
        return nullThingType;
    };
    ThingTypeManager.prototype.getContentRevision = function () {
        throw new Error("Method not implemented.");
    };
    ThingTypeManager.prototype.loadDat = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fin, category, count, thingCount, category, firstId, id, type, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.m_datLoaded = false;
                        this.m_datSignature = 0;
                        this.m_contentRevision = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log(new Date().getTime(), this.m_thingTypes);
                        return [4 /*yield*/, resources_1.g_resources.openFile(file)];
                    case 2:
                        fin = _a.sent();
                        this.m_datSignature = fin.getU32();
                        this.m_contentRevision = this.m_datSignature & 0xFFFF;
                        for (category = const_1.ThingCategory.ThingCategoryItem; category < const_1.ThingCategory.ThingLastCategory; ++category) {
                            count = fin.getU16() + 1;
                            this.m_thingTypes[category] = [];
                            for (thingCount = 0; thingCount < count; ++thingCount) {
                                this.m_thingTypes[category][thingCount] = nullThingType;
                            }
                        }
                        for (category = 0; category < const_1.ThingCategory.ThingLastCategory; ++category) {
                            firstId = 1;
                            if (category == const_1.ThingCategory.ThingCategoryItem)
                                firstId = 100;
                            for (id = firstId; id < this.m_thingTypes[category].length; ++id) {
                                type = new thingtype_1.ThingType();
                                type.unserialize(id, category, fin);
                                this.m_thingTypes[category][id] = type;
                            }
                        }
                        this.m_datLoaded = true;
                        console.log(new Date().getTime(), this.m_thingTypes);
                        //g_lua.callGlobalField("g_things", "onLoadDat", file);
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        log_1.Log.error("Failed to read dat '%s': %s'", file, e_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ThingTypeManager;
}());
exports.ThingTypeManager = ThingTypeManager;
var g_things = new ThingTypeManager();
exports.g_things = g_things;
