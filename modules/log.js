"use strict";
exports.__esModule = true;
var log = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.log.apply(this, v);
    //$('#status').text(v.join(','));
};
exports.log = log;
var error = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    console.error.apply(this, v);
    //$('#status').text(v.join(','));
};
exports.error = error;
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.log = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        console.log.apply(this, v);
        //$('#status').text(v.join(','));
    };
    Log.debug = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        console.log.apply(this, v);
        //$('#status').text(v.join(','));
    };
    Log.error = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        console.error.apply(this, v);
        //$('#status').text(v.join(','));
    };
    return Log;
}());
exports.Log = Log;
