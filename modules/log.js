"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var log = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.log.apply(this, v);
    $('#status').text(v.join(','));
};
exports.log = log;
var error = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.error.apply(this, v);
    console.log.apply(this, [new Error().stack]);
    $('#status').text(v.join(','));
};
exports.error = error;
//# sourceMappingURL=log.js.map