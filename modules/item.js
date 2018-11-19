"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = require("./thing");
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(id) {
        if (id === void 0) { id = 0; }
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    Item.prototype.getId = function () {
        return this.id;
    };
    Item.prototype.setCountOrSubType = function (count) {
    };
    return Item;
}(thing_1.Thing));
exports.Item = Item;
//# sourceMappingURL=item.js.map