window = {};
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(19);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(55)('wks');
var uid = __webpack_require__(34);
var _Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(107);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(15);
var SRC = __webpack_require__(34)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(19).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pIE = __webpack_require__(53);
var createDesc = __webpack_require__(33);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(107);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(74)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {/* empty */}, 1) : method.call(null);
  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(52);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(91);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(31);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(66);
  var $buffer = __webpack_require__(97);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(40);
  var propertyDesc = __webpack_require__(33);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(42);
  var toInteger = __webpack_require__(25);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(133);
  var toAbsoluteIndex = __webpack_require__(36);
  var toPrimitive = __webpack_require__(23);
  var has = __webpack_require__(15);
  var classof = __webpack_require__(54);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(88);
  var create = __webpack_require__(37);
  var getPrototypeOf = __webpack_require__(18);
  var gOPN = __webpack_require__(38).f;
  var getIterFn = __webpack_require__(90);
  var uid = __webpack_require__(34);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(27);
  var createArrayIncludes = __webpack_require__(56);
  var speciesConstructor = __webpack_require__(63);
  var ArrayIterators = __webpack_require__(93);
  var Iterators = __webpack_require__(47);
  var $iterDetect = __webpack_require__(60);
  var setSpecies = __webpack_require__(39);
  var arrayFill = __webpack_require__(92);
  var arrayCopyWithin = __webpack_require__(123);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(17);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function toOffset(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function validate(it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function allocate(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }return new C(length);
  };

  var speciesFromList = function speciesFromList(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function fromList(C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) {
      result[index] = list[index++];
    }return result;
  };

  var addGetter = function addGetter(it, key, internal) {
    dP(it, key, { get: function get() {
        return this._d[internal];
      } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of() /* ...items */{
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) {
      result[index] = arguments[index++];
    }return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) {
      this[offset + index] = src[index++];
    }
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function isTAIndex(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function constructor() {/* noop */},
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function get() {
      return this[TYPED_ARRAY];
    }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function getter(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function setter(that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function addElement(that, index) {
      dP(that, index, {
        get: function get() {
          return getter(this, index);
        },
        set: function set(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) {
          addElement(that, index++);
        }
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function get() {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {/* empty */};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Map = __webpack_require__(128);
var $export = __webpack_require__(0);
var shared = __webpack_require__(55)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(131))());

var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  }return keyMetadata;
};
var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) {
    keys.push(key);
  });
  return keys;
};
var toMetaKey = function toMetaKey(it) {
  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
};
var exp = function exp(O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var META = __webpack_require__(34)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function setMeta(it) {
  setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {} // weak collections IDs
    } });
};
var fastKey = function fastKey(it, create) {
  // return primitive with prefix
  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
    // return object ID
  }return it[META].i;
};
var getWeak = function getWeak(it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
    // return hash weak collections IDs
  }return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function onFreeze(it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(109);
var enumBugKeys = __webpack_require__(75);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(110);
var enumBugKeys = __webpack_require__(75);
var IE_PROTO = __webpack_require__(74)('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(72)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(76).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(109);
var hiddenKeys = __webpack_require__(75).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var call = __webpack_require__(121);
var isArrayIter = __webpack_require__(88);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(90);
var BREAK = {};
var RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }return target;
};

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(7).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(78);
var space = '[' + spaces + ']';
var non = '\u200B\x85';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = __webpack_require__(19);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(31) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(21);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags

var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    }
    // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(42);
var meta = __webpack_require__(30);
var forOf = __webpack_require__(41);
var anInstance = __webpack_require__(40);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(60);
var setToStringTag = __webpack_require__(45);
var inheritIfRequired = __webpack_require__(79);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) {
        $instance[ADDER](index, index);
      }return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(34);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods

module.exports = __webpack_require__(31) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () {/* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
      var length = arguments.length;
      var A = new Array(length);
      while (length--) {
        A[length] = arguments[length];
      }return new this(A);
    } });
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = ctx(mapFn, arguments[2], 2);
        forOf(source, false, function (nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        forOf(source, false, A.push, A);
      }
      return new this(A);
    } });
};

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(19);
var LIBRARY = __webpack_require__(31);
var wksExt = __webpack_require__(108);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(55)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = __webpack_require__(20)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(77).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }return that;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(25);
var defined = __webpack_require__(24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }return res;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = !$expm1
// Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
// Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(25);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(31);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(47);
var $iterCreate = __webpack_require__(85);
var setToStringTag = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(18);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(37);
var descriptor = __webpack_require__(33);
var setToStringTag = __webpack_require__(45);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(59);
var defined = __webpack_require__(24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {/* empty */}
  }return true;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(47);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(54);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(47);
module.exports = __webpack_require__(19).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(241);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) {
    O[index++] = value;
  }return O;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(32);
var step = __webpack_require__(124);
var Iterators = __webpack_require__(47);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(84)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var invoke = __webpack_require__(114);
var html = __webpack_require__(76);
var cel = __webpack_require__(72);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var macrotask = __webpack_require__(94).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(31);
var $typed = __webpack_require__(66);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(42);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(40);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(133);
var gOPN = __webpack_require__(38).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(92);
var setToStringTag = __webpack_require__(45);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function get() {
      return this[internal];
    } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) {
    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(72)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = __webpack_require__(5);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(15);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(56)(false);
var IE_PROTO = __webpack_require__(74)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(38).f;
var toString = {}.toString;

var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(57);
var pIE = __webpack_require__(53);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(52);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(114);
var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function bound() /* args... */{
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(46).trim;
var ws = __webpack_require__(78);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(78) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cof = __webpack_require__(21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(81);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(52);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }return memo;
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }return O;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (done, value) {
  return { value: value, done: !!done };
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(61)
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(96);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(129);
var validate = __webpack_require__(48);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(65)(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7).f;
var create = __webpack_require__(37);
var redefineAll = __webpack_require__(42);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var $iterDefine = __webpack_require__(84);
var step = __webpack_require__(124);
var setSpecies = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(30).fastKey;
var validate = __webpack_require__(48);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = create(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function get() {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(129);
var validate = __webpack_require__(48);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(65)(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(27)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(30);
var assign = __webpack_require__(112);
var weak = __webpack_require__(132);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(48);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function wrapper(get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(65)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () {
  return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;
})) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
        // store all the rest on native weakmap
      }return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(42);
var getWeak = __webpack_require__(30).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var createArrayMethod = __webpack_require__(27);
var $has = __webpack_require__(15);
var validate = __webpack_require__(48);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};
var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = id++; // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(38);
var gOPS = __webpack_require__(57);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var isArray = __webpack_require__(58);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(80);
var defined = __webpack_require__(24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getKeys = __webpack_require__(35);
var toIObject = __webpack_require__(16);
var isEnum = __webpack_require__(53).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }return result;
  };
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(54);
var from = __webpack_require__(139);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forOf = __webpack_require__(41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (arguments.length === 0
  // eslint-disable-next-line no-self-compare
  || x != x
  // eslint-disable-next-line no-self-compare
  || inLow != inLow
  // eslint-disable-next-line no-self-compare
  || inHigh != inHigh
  // eslint-disable-next-line no-self-compare
  || outLow != outLow
  // eslint-disable-next-line no-self-compare
  || outHigh != outHigh) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

/***/ }),
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(150);

__webpack_require__(347);

__webpack_require__(349);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106)))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(151);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(93);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(125);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(128);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
module.exports = __webpack_require__(19);

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var global = __webpack_require__(2);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(30).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(55);
var setToStringTag = __webpack_require__(45);
var uid = __webpack_require__(34);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(108);
var wksDefine = __webpack_require__(73);
var enumKeys = __webpack_require__(152);
var isArray = __webpack_require__(58);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(33);
var _create = __webpack_require__(37);
var gOPNExt = __webpack_require__(111);
var $GOPD = __webpack_require__(17);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function get() {
      return dP(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    }return setSymbolDesc(it, key, D);
  }return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function $set(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(53).f = $propertyIsEnumerable;
  __webpack_require__(57).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(31)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols =
// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  wks(es6Symbols[j++]);
}for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
  wksDefine(wellKnownSymbols[k++]);
}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }$replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(57);
var pIE = __webpack_require__(53);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }return result;
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(37) });

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(110) });

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(16);
var $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(26)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(18);

__webpack_require__(26)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(35);

__webpack_require__(26)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(26)('getOwnPropertyNames', function () {
  return __webpack_require__(111).f;
});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(26)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(26)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(30).onFreeze;

__webpack_require__(26)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(26)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(26)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(26)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(112) });

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(168) });

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(77).set });

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(54);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(113) });

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(18);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) {
      if (this.prototype === O) return true;
    }return false;
  } });

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(115);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(116);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var has = __webpack_require__(15);
var cof = __webpack_require__(21);
var inheritIfRequired = __webpack_require__(79);
var toPrimitive = __webpack_require__(23);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(38).f;
var gOPD = __webpack_require__(17).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(46).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(37)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:case 98:
          radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
        case 79:case 111:
          radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
        default:
          return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      }return parseInt(digits, radix);
    }
  }return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
    // check on 1..constructor(foo) case
    && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
  // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
  // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toInteger = __webpack_require__(25);
var aNumberValue = __webpack_require__(117);
var repeat = __webpack_require__(80);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function multiply(n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function divide(n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = c % n * 1e7;
  }
};
var numToString = function numToString() {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  }return s;
};
var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function log(x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }return n;
};

$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    }return m;
  }
});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(117);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(118) });

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(118);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(116);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(115);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(119);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710
// Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(81);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(82);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(120) });

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(119) });

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(81) });

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(82);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(82);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(36);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }return res.join('');
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }return res.join('');
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()

__webpack_require__(46)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(83)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(84)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $at = __webpack_require__(83)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(86);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(87)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(0);
var context = __webpack_require__(86);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(87)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(80)
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(86);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(87)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)

__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()

__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()

__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()

__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()

__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)

__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)

__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()

__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)

__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()

__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()

__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()

__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()

__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function now() {
    return new Date().getTime();
  } });

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
      return 1;
    } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(230);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(233));

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(58) });

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(121);
var isArrayIter = __webpack_require__(88);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(89);
var getIterFn = __webpack_require__(90);

$export($export.S + $export.F * !__webpack_require__(60)(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var createProperty = __webpack_require__(89);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() {/* empty */}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of() /* ...args */{
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) {
      createProperty(result, index, arguments[index++]);
    }result.length = aLen;
    return result;
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(52) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var html = __webpack_require__(76);
var cof = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) {
      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
    }return cloned;
  }
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $forEach = __webpack_require__(27)(0);
var STRICT = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var isArray = __webpack_require__(58);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $map = __webpack_require__(27)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $filter = __webpack_require__(27)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $some = __webpack_require__(27)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $every = __webpack_require__(27)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(122);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(122);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(56)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
    // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }return -1;
  }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(123) });

__webpack_require__(32)('copyWithin');

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(92) });

__webpack_require__(32)('fill');

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(27)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(27)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(39)('Array');

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(79);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(38).f;
var isRegExp = __webpack_require__(59);
var $flags = __webpack_require__(61);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };
  var proxy = function proxy(key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base[key];
      },
      set: function set(it) {
        Base[key] = it;
      }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
    proxy(keys[i++]);
  }proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(125);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(61);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function define(fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () {
  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
  // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@match logic
__webpack_require__(62)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@replace logic
__webpack_require__(62)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';

    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@search logic
__webpack_require__(62)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@split logic
__webpack_require__(62)('split', 2, function (defined, SPLIT, $split) {
  'use strict';

  var isRegExp = __webpack_require__(59);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function $split(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
    // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function $split(separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(31);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(54);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var speciesConstructor = __webpack_require__(63);
var task = __webpack_require__(94).set;
var microtask = __webpack_require__(95)();
var newPromiseCapabilityModule = __webpack_require__(96);
var perform = __webpack_require__(126);
var userAgent = __webpack_require__(64);
var promiseResolve = __webpack_require__(127);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function empty() {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(45)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(19)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(60)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weak = __webpack_require__(132);
var validate = __webpack_require__(48);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(65)(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $typed = __webpack_require__(66);
var buffer = __webpack_require__(97);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(63);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(66).ABV, {
  DataView: __webpack_require__(97).DataView
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () {/* empty */});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(37);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(113);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() {/* empty */}
  return !(rConstruct(function () {/* empty */}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () {/* empty */});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(17).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)

var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function Enumerate(iterated) {
  this._t = anObject(iterated); // target
  this._i = 0; // next index
  var keys = this._k = []; // keys
  var key;
  for (key in iterated) {
    keys.push(key);
  }
};
__webpack_require__(85)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(17);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(18);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(134) });

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(33);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(77);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(0);
var $includes = __webpack_require__(56)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(32)('includes');

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(135);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(91);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(32)('flatMap');

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(135);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(25);
var arraySpeciesCreate = __webpack_require__(91);

$export($export.P, 'Array', {
  flatten: function flatten() /* depthArg = 1 */{
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(32)('flatten');

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at

var $export = __webpack_require__(0);
var $at = __webpack_require__(83)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(136);
var userAgent = __webpack_require__(64);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(136);
var userAgent = __webpack_require__(64);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(46)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(46)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/

var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(59);
var getFlags = __webpack_require__(61);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(85)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(73)('asyncIterator');

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(73)('observable');

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(134);
var toIObject = __webpack_require__(16);
var gOPD = __webpack_require__(17);
var createProperty = __webpack_require__(89);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(137)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(137)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(138)('Map') });

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(138)('Set') });

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(68)('Map');

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(68)('Set');

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(68)('WeakMap');

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(68)('WeakSet');

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(69)('Map');

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(69)('Set');

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(69)('WeakMap');

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(69)('WeakSet');

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(140);
var fround = __webpack_require__(120);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(140) });

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
  } });

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(63);
var promiseResolve = __webpack_require__(127);

$export($export.P + $export.R, 'Promise', { 'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  } });

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try

var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(96);
var perform = __webpack_require__(126);

$export($export.S, 'Promise', { 'try': function _try(callbackfn) {
    var promiseCapability = newPromiseCapability.f(this);
    var result = perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
  } });

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  } });

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Set = __webpack_require__(130);
var from = __webpack_require__(139);
var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, targetKey) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
    };
  } });

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(95)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable

var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(19);
var microtask = __webpack_require__(95)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(40);
var redefineAll = __webpack_require__(42);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(41);
var RETURN = forOf.RETURN;

var getMethod = function getMethod(fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function cleanupSubscription(subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function subscriptionClosed(subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function closeSubscription(subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function Subscription(observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
        subscription.unsubscribe();
      };else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  }if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    closeSubscription(this);
  }
});

var SubscriptionObserver = function SubscriptionObserver(subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    }cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function next(value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) {
      items[i] = arguments[i++];
    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () {
  return this;
});

$export($export.G, { Observable: $Observable });

__webpack_require__(39)('Observable');

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(64);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function wrap(set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $task = __webpack_require__(94);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $iterators = __webpack_require__(93);
var getKeys = __webpack_require__(35);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(47);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (_typeof(global.process) === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106), __webpack_require__(348)(module)))

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(350);
module.exports = __webpack_require__(19).RegExp.escape;

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(351)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) {
    return $re(it);
  } });

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

/***/ })
/******/ ]);webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = exports.Light = function Light() {
    _classCallCheck(this, Light);

    this.intensity = 0;
    this.color = 215;
};

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var toInt = function toInt(int) {
    return parseInt(int.toString());
};
exports.toInt = toInt;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryDataReader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _position = __webpack_require__(99);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryDataReader = exports.BinaryDataReader = function () {
    function BinaryDataReader(msg) {
        _classCallCheck(this, BinaryDataReader);

        this.data = msg;
        this.offset = 0;
        this.size = this.data.byteLength;
    }

    _createClass(BinaryDataReader, [{
        key: "getU8",
        value: function getU8() {
            if (this.offset === this.size) throw new Error("Koniec pakietu");
            var v = this.data.getUint8(this.offset);
            this.offset += 1;
            return v;
        }
    }, {
        key: "getU16",
        value: function getU16() {
            return this.getU8() + this.getU8() * 256;
        }
    }, {
        key: "getU32",
        value: function getU32() {
            return this.getU16() + this.getU16() * 256 * 256;
        }
    }, {
        key: "getU64",
        value: function getU64() {
            return this.getU32() + this.getU32() * 256 * 256 * 256 * 256;
        }
    }, {
        key: "get8",
        value: function get8() {
            if (this.offset + 1 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt8(this.offset);
            this.offset += 1;
            return v;
        }
    }, {
        key: "get16",
        value: function get16() {
            if (this.offset + 2 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt16(this.offset);
            this.offset += 2;
            return v;
        }
    }, {
        key: "get32",
        value: function get32() {
            if (this.offset + 4 > this.size) throw new Error("Koniec pliku");
            var v = this.data.getInt32(this.offset);
            this.offset += 4;
            return v;
        }
    }, {
        key: "getDouble",
        value: function getDouble() {
            if (this.offset === this.size) throw new Error("Koniec pakietu");
            var v = this.data.getFloat64(this.offset);
            this.offset += 8;
            return v;
        }
    }, {
        key: "getString",
        value: function getString() {
            var length = this.getU16();
            var text = '';
            for (var i = 0; i < length; i++) {
                text += String.fromCharCode(this.getU8());
            }
            return text;
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return new _position.Position(this.getU16(), this.getU16(), this.getU8());
        }
    }, {
        key: "getBytes",
        value: function getBytes(bytesCount) {
            if (bytesCount == -1) bytesCount = this.size - this.offset;
            if (this.offset + bytesCount > this.size) throw new Error("Koniec pakietu");
            var bytes = this.data.buffer.slice(this.offset, this.offset + bytesCount);
            this.offset += bytesCount;
            return bytes;
        }
    }, {
        key: "peekU8",
        value: function peekU8() {
            var v = this.getU8();
            this.offset -= 1;
            return v;
        }
    }, {
        key: "peekU16",
        value: function peekU16() {
            var v = this.getU16();
            this.offset -= 2;
            return v;
        }
    }, {
        key: "peekU32",
        value: function peekU32() {
            var v = this.getU32();
            this.offset -= 4;
            return v;
        }
    }, {
        key: "peekU64",
        value: function peekU64() {
            var v = this.getU64();
            this.offset -= 8;
            return v;
        }
    }, {
        key: "skipBytes",
        value: function skipBytes(bytesCount) {
            if (this.offset + bytesCount > this.size) throw new Error("Koniec pakietu");
            this.offset += bytesCount;
        }
    }, {
        key: "skip",
        value: function skip(bytesCount) {
            this.skipBytes(bytesCount);
        }
    }, {
        key: "getUnreadSize",
        value: function getUnreadSize() {
            return this.size - this.offset;
        }
    }, {
        key: "getReadPos",
        value: function getReadPos() {
            return this.offset;
        }
    }, {
        key: "setReadPos",
        value: function setReadPos(offset) {
            this.offset = offset;
        }
    }, {
        key: "tell",
        value: function tell() {
            return this.getReadPos();
        }
    }, {
        key: "seek",
        value: function seek(offset) {
            this.setReadPos(offset);
        }
    }]);

    return BinaryDataReader;
}();

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CachedText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _size = __webpack_require__(143);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CachedText = exports.CachedText = function () {
    function CachedText() {
        _classCallCheck(this, CachedText);

        this.m_text = null;
        this.m_textSize = null;
        this.m_textMustRecache = true;
        this.m_font = null;
        this.m_align = null;
    }

    _createClass(CachedText, [{
        key: 'draw',
        value: function draw(rect) {}
    }, {
        key: 'wrapText',
        value: function wrapText(maxWidth) {
            if (this.m_font) {
                // update new line positions
                //this.m_text = this.m_font.wrapText(m_text, maxWidth);
                this.update();
            }
        }
    }, {
        key: 'setFont',
        value: function setFont(font) {
            this.m_font = font;
            this.update();
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.m_text = text;
            this.update();
        }
    }, {
        key: 'setAlign',
        value: function setAlign(align) {
            this.m_align = align;
            this.update();
        }
    }, {
        key: 'getTextSize',
        value: function getTextSize() {
            return this.m_textSize;
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.m_text;
        }
    }, {
        key: 'getFont',
        value: function getFont() {
            return this.m_font;
        }
    }, {
        key: 'getAlign',
        value: function getAlign() {
            return this.m_align;
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.m_font) this.m_textSize = new _size.Size();
            /* todo */ //m_font->calculateTextRectSize(m_text);
            this.m_textMustRecache = true;
        }
    }]);

    return CachedText;
}();

CachedText.ALIGN_LEFT = 'left';
CachedText.ALIGN_RIGHT = 'right';

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _g_clock = __webpack_require__(105);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
    function Timer() {
        _classCallCheck(this, Timer);

        this.m_startTicks = 0;
        this.m_stopped = false;
        this.restart();
    }

    _createClass(Timer, [{
        key: "restart",
        value: function restart() {
            this.m_startTicks = _g_clock.g_clock.millis();
            this.m_stopped = false;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.m_stopped = true;
        }
    }, {
        key: "startTicks",
        value: function startTicks() {
            return this.m_startTicks;
        }
    }, {
        key: "ticksElapsed",
        value: function ticksElapsed() {
            return _g_clock.g_clock.millis() - this.m_startTicks;
        }
    }, {
        key: "timeElapsed",
        value: function timeElapsed() {
            return this.ticksElapsed() / 1000;
        }
    }, {
        key: "running",
        value: function running() {
            return !this.m_stopped;
        }
    }]);

    return Timer;
}();

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
    function Clock() {
        _classCallCheck(this, Clock);
    }

    _createClass(Clock, [{
        key: "millis",
        value: function millis() {
            return +new Date();
        }
    }]);

    return Clock;
}();

var g_clock = new Clock();
exports.g_clock = g_clock;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Otc = exports.Otc = undefined;
(function (Otc) {
    Otc[Otc["TILE_PIXELS"] = 32] = "TILE_PIXELS";
    Otc[Otc["MAX_ELEVATION"] = 24] = "MAX_ELEVATION";
    Otc[Otc["SEA_FLOOR"] = 7] = "SEA_FLOOR";
    Otc[Otc["UNDERGROUND_FLOOR"] = 8] = "UNDERGROUND_FLOOR";
    Otc[Otc["MAX_Z"] = 15] = "MAX_Z";
    Otc[Otc["AWARE_UNDEGROUND_FLOOR_RANGE"] = 2] = "AWARE_UNDEGROUND_FLOOR_RANGE";
    Otc[Otc["INVISIBLE_TICKS_PER_FRAME"] = 500] = "INVISIBLE_TICKS_PER_FRAME";
    Otc[Otc["ITEM_TICKS_PER_FRAME"] = 500] = "ITEM_TICKS_PER_FRAME";
    Otc[Otc["ANIMATED_TEXT_DURATION"] = 1000] = "ANIMATED_TEXT_DURATION";
    Otc[Otc["STATIC_DURATION_PER_CHARACTER"] = 60] = "STATIC_DURATION_PER_CHARACTER";
    Otc[Otc["MIN_STATIC_TEXT_DURATION"] = 3000] = "MIN_STATIC_TEXT_DURATION";
    Otc[Otc["MAX_STATIC_TEXT_WIDTH"] = 200] = "MAX_STATIC_TEXT_WIDTH";
    Otc[Otc["MAX_AUTOWALK_STEPS_RETRY"] = 10] = "MAX_AUTOWALK_STEPS_RETRY";
    Otc[Otc["MAX_AUTOWALK_DIST"] = 127] = "MAX_AUTOWALK_DIST";
})(Otc || (exports.Otc = Otc = {}));
var DrawFlags = exports.DrawFlags = undefined;
(function (DrawFlags) {
    DrawFlags[DrawFlags["DrawGround"] = 1] = "DrawGround";
    DrawFlags[DrawFlags["DrawGroundBorders"] = 2] = "DrawGroundBorders";
    DrawFlags[DrawFlags["DrawOnBottom"] = 4] = "DrawOnBottom";
    DrawFlags[DrawFlags["DrawOnTop"] = 8] = "DrawOnTop";
    DrawFlags[DrawFlags["DrawItems"] = 16] = "DrawItems";
    DrawFlags[DrawFlags["DrawCreatures"] = 32] = "DrawCreatures";
    DrawFlags[DrawFlags["DrawEffects"] = 64] = "DrawEffects";
    DrawFlags[DrawFlags["DrawMissiles"] = 128] = "DrawMissiles";
    DrawFlags[DrawFlags["DrawCreaturesInformation"] = 256] = "DrawCreaturesInformation";
    DrawFlags[DrawFlags["DrawStaticTexts"] = 512] = "DrawStaticTexts";
    DrawFlags[DrawFlags["DrawAnimatedTexts"] = 1024] = "DrawAnimatedTexts";
    DrawFlags[DrawFlags["DrawAnimations"] = 2048] = "DrawAnimations";
    DrawFlags[DrawFlags["DrawBars"] = 4096] = "DrawBars";
    DrawFlags[DrawFlags["DrawNames"] = 8192] = "DrawNames";
    DrawFlags[DrawFlags["DrawLights"] = 16384] = "DrawLights";
    DrawFlags[DrawFlags["DrawManaBar"] = 32768] = "DrawManaBar";
    DrawFlags[DrawFlags["DrawWalls"] = 12] = "DrawWalls";
    DrawFlags[DrawFlags["DrawEverything"] = 65535] = "DrawEverything";
})(DrawFlags || (exports.DrawFlags = DrawFlags = {}));
var DatOpts = exports.DatOpts = undefined;
(function (DatOpts) {
    DatOpts[DatOpts["DatGround"] = 0] = "DatGround";
    DatOpts[DatOpts["DatGroundClip"] = 1] = "DatGroundClip";
    DatOpts[DatOpts["DatOnBottom"] = 2] = "DatOnBottom";
    DatOpts[DatOpts["DatOnTop"] = 3] = "DatOnTop";
    DatOpts[DatOpts["DatContainer"] = 4] = "DatContainer";
    DatOpts[DatOpts["DatStackable"] = 5] = "DatStackable";
    DatOpts[DatOpts["DatForceUse"] = 6] = "DatForceUse";
    DatOpts[DatOpts["DatMultiUse"] = 7] = "DatMultiUse";
    DatOpts[DatOpts["DatWritable"] = 8] = "DatWritable";
    DatOpts[DatOpts["DatWritableOnce"] = 9] = "DatWritableOnce";
    DatOpts[DatOpts["DatFluidContainer"] = 10] = "DatFluidContainer";
    DatOpts[DatOpts["DatSplash"] = 11] = "DatSplash";
    DatOpts[DatOpts["DatBlockWalk"] = 12] = "DatBlockWalk";
    DatOpts[DatOpts["DatNotMoveable"] = 13] = "DatNotMoveable";
    DatOpts[DatOpts["DatBlockProjectile"] = 14] = "DatBlockProjectile";
    DatOpts[DatOpts["DatBlockPathFind"] = 15] = "DatBlockPathFind";
    DatOpts[DatOpts["DatPickupable"] = 16] = "DatPickupable";
    DatOpts[DatOpts["DatHangable"] = 17] = "DatHangable";
    DatOpts[DatOpts["DatHookSouth"] = 18] = "DatHookSouth";
    DatOpts[DatOpts["DatHookEast"] = 19] = "DatHookEast";
    DatOpts[DatOpts["DatRotable"] = 20] = "DatRotable";
    DatOpts[DatOpts["DatLight"] = 21] = "DatLight";
    DatOpts[DatOpts["DatDontHide"] = 22] = "DatDontHide";
    DatOpts[DatOpts["DatTranslucent"] = 23] = "DatTranslucent";
    DatOpts[DatOpts["DatDisplacement"] = 24] = "DatDisplacement";
    DatOpts[DatOpts["DatElevation"] = 25] = "DatElevation";
    DatOpts[DatOpts["DatLyingCorpse"] = 26] = "DatLyingCorpse";
    DatOpts[DatOpts["DatAnimateAlways"] = 27] = "DatAnimateAlways";
    DatOpts[DatOpts["DatMinimapColor"] = 28] = "DatMinimapColor";
    DatOpts[DatOpts["DatLensHelp"] = 29] = "DatLensHelp";
    DatOpts[DatOpts["DatFullGround"] = 30] = "DatFullGround";
    DatOpts[DatOpts["DatIgnoreLook"] = 31] = "DatIgnoreLook";
    DatOpts[DatOpts["DatCloth"] = 32] = "DatCloth";
    DatOpts[DatOpts["DatAnimation"] = 33] = "DatAnimation";
    DatOpts[DatOpts["DatLastOpt"] = 255] = "DatLastOpt";
})(DatOpts || (exports.DatOpts = DatOpts = {}));
var InventorySlot = exports.InventorySlot = undefined;
(function (InventorySlot) {
    InventorySlot[InventorySlot["InventorySlotHead"] = 1] = "InventorySlotHead";
    InventorySlot[InventorySlot["InventorySlotNecklace"] = 2] = "InventorySlotNecklace";
    InventorySlot[InventorySlot["InventorySlotBackpack"] = 3] = "InventorySlotBackpack";
    InventorySlot[InventorySlot["InventorySlotArmor"] = 4] = "InventorySlotArmor";
    InventorySlot[InventorySlot["InventorySlotRight"] = 5] = "InventorySlotRight";
    InventorySlot[InventorySlot["InventorySlotLeft"] = 6] = "InventorySlotLeft";
    InventorySlot[InventorySlot["InventorySlotLegs"] = 7] = "InventorySlotLegs";
    InventorySlot[InventorySlot["InventorySlotFeet"] = 8] = "InventorySlotFeet";
    InventorySlot[InventorySlot["InventorySlotRing"] = 9] = "InventorySlotRing";
    InventorySlot[InventorySlot["InventorySlotAmmo"] = 10] = "InventorySlotAmmo";
    InventorySlot[InventorySlot["InventorySlotPurse"] = 11] = "InventorySlotPurse";
    InventorySlot[InventorySlot["InventorySlotExt1"] = 12] = "InventorySlotExt1";
    InventorySlot[InventorySlot["InventorySlotExt2"] = 13] = "InventorySlotExt2";
    InventorySlot[InventorySlot["InventorySlotExt3"] = 14] = "InventorySlotExt3";
    InventorySlot[InventorySlot["InventorySlotExt4"] = 15] = "InventorySlotExt4";
    InventorySlot[InventorySlot["LastInventorySlot"] = 16] = "LastInventorySlot";
})(InventorySlot || (exports.InventorySlot = InventorySlot = {}));
var Statistic = exports.Statistic = undefined;
(function (Statistic) {
    Statistic[Statistic["Health"] = 0] = "Health";
    Statistic[Statistic["MaxHealth"] = 1] = "MaxHealth";
    Statistic[Statistic["FreeCapacity"] = 2] = "FreeCapacity";
    Statistic[Statistic["Experience"] = 3] = "Experience";
    Statistic[Statistic["Level"] = 4] = "Level";
    Statistic[Statistic["LevelPercent"] = 5] = "LevelPercent";
    Statistic[Statistic["Mana"] = 6] = "Mana";
    Statistic[Statistic["MaxMana"] = 7] = "MaxMana";
    Statistic[Statistic["MagicLevel"] = 8] = "MagicLevel";
    Statistic[Statistic["MagicLevelPercent"] = 9] = "MagicLevelPercent";
    Statistic[Statistic["Soul"] = 10] = "Soul";
    Statistic[Statistic["Stamina"] = 11] = "Stamina";
    Statistic[Statistic["LastStatistic"] = 12] = "LastStatistic";
})(Statistic || (exports.Statistic = Statistic = {}));
var Skill = exports.Skill = undefined;
(function (Skill) {
    Skill[Skill["Fist"] = 0] = "Fist";
    Skill[Skill["Club"] = 1] = "Club";
    Skill[Skill["Sword"] = 2] = "Sword";
    Skill[Skill["Axe"] = 3] = "Axe";
    Skill[Skill["Distance"] = 4] = "Distance";
    Skill[Skill["Shielding"] = 5] = "Shielding";
    Skill[Skill["Fishing"] = 6] = "Fishing";
    Skill[Skill["CriticalChance"] = 7] = "CriticalChance";
    Skill[Skill["CriticalDamage"] = 8] = "CriticalDamage";
    Skill[Skill["LifeLeechChance"] = 9] = "LifeLeechChance";
    Skill[Skill["LifeLeechAmount"] = 10] = "LifeLeechAmount";
    Skill[Skill["ManaLeechChance"] = 11] = "ManaLeechChance";
    Skill[Skill["ManaLeechAmount"] = 12] = "ManaLeechAmount";
    Skill[Skill["LastSkill"] = 13] = "LastSkill";
})(Skill || (exports.Skill = Skill = {}));
var Direction = exports.Direction = undefined;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
    Direction[Direction["NorthEast"] = 4] = "NorthEast";
    Direction[Direction["SouthEast"] = 5] = "SouthEast";
    Direction[Direction["SouthWest"] = 6] = "SouthWest";
    Direction[Direction["NorthWest"] = 7] = "NorthWest";
    Direction[Direction["InvalidDirection"] = 8] = "InvalidDirection";
})(Direction || (exports.Direction = Direction = {}));
var FluidsColor = exports.FluidsColor = undefined;
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidTransparent"] = 0] = "FluidTransparent";
    FluidsColor[FluidsColor["FluidBlue"] = 1] = "FluidBlue";
    FluidsColor[FluidsColor["FluidRed"] = 2] = "FluidRed";
    FluidsColor[FluidsColor["FluidBrown"] = 3] = "FluidBrown";
    FluidsColor[FluidsColor["FluidGreen"] = 4] = "FluidGreen";
    FluidsColor[FluidsColor["FluidYellow"] = 5] = "FluidYellow";
    FluidsColor[FluidsColor["FluidWhite"] = 6] = "FluidWhite";
    FluidsColor[FluidsColor["FluidPurple"] = 7] = "FluidPurple";
})(FluidsColor || (exports.FluidsColor = FluidsColor = {}));
(function (FluidsColor) {
    FluidsColor[FluidsColor["FluidNone"] = 0] = "FluidNone";
    FluidsColor[FluidsColor["FluidWater"] = 1] = "FluidWater";
    FluidsColor[FluidsColor["FluidMana"] = 2] = "FluidMana";
    FluidsColor[FluidsColor["FluidBeer"] = 3] = "FluidBeer";
    FluidsColor[FluidsColor["FluidOil"] = 4] = "FluidOil";
    FluidsColor[FluidsColor["FluidBlood"] = 5] = "FluidBlood";
    FluidsColor[FluidsColor["FluidSlime"] = 6] = "FluidSlime";
    FluidsColor[FluidsColor["FluidMud"] = 7] = "FluidMud";
    FluidsColor[FluidsColor["FluidLemonade"] = 8] = "FluidLemonade";
    FluidsColor[FluidsColor["FluidMilk"] = 9] = "FluidMilk";
    FluidsColor[FluidsColor["FluidWine"] = 10] = "FluidWine";
    FluidsColor[FluidsColor["FluidHealth"] = 11] = "FluidHealth";
    FluidsColor[FluidsColor["FluidUrine"] = 12] = "FluidUrine";
    FluidsColor[FluidsColor["FluidRum"] = 13] = "FluidRum";
    FluidsColor[FluidsColor["FluidFruidJuice"] = 14] = "FluidFruidJuice";
    FluidsColor[FluidsColor["FluidCoconutMilk"] = 15] = "FluidCoconutMilk";
    FluidsColor[FluidsColor["FluidTea"] = 16] = "FluidTea";
    FluidsColor[FluidsColor["FluidMead"] = 17] = "FluidMead";
})(FluidsColor || (exports.FluidsColor = FluidsColor = {}));
var FightModes = exports.FightModes = undefined;
(function (FightModes) {
    FightModes[FightModes["FightOffensive"] = 1] = "FightOffensive";
    FightModes[FightModes["FightBalanced"] = 2] = "FightBalanced";
    FightModes[FightModes["FightDefensive"] = 3] = "FightDefensive";
})(FightModes || (exports.FightModes = FightModes = {}));
var ChaseModes = exports.ChaseModes = undefined;
(function (ChaseModes) {
    ChaseModes[ChaseModes["DontChase"] = 0] = "DontChase";
    ChaseModes[ChaseModes["ChaseOpponent"] = 1] = "ChaseOpponent";
})(ChaseModes || (exports.ChaseModes = ChaseModes = {}));
var PVPModes = exports.PVPModes = undefined;
(function (PVPModes) {
    PVPModes[PVPModes["WhiteDove"] = 0] = "WhiteDove";
    PVPModes[PVPModes["WhiteHand"] = 1] = "WhiteHand";
    PVPModes[PVPModes["YellowHand"] = 2] = "YellowHand";
    PVPModes[PVPModes["RedFist"] = 3] = "RedFist";
})(PVPModes || (exports.PVPModes = PVPModes = {}));
var PlayerSkulls = exports.PlayerSkulls = undefined;
(function (PlayerSkulls) {
    PlayerSkulls[PlayerSkulls["SkullNone"] = 0] = "SkullNone";
    PlayerSkulls[PlayerSkulls["SkullYellow"] = 1] = "SkullYellow";
    PlayerSkulls[PlayerSkulls["SkullGreen"] = 2] = "SkullGreen";
    PlayerSkulls[PlayerSkulls["SkullWhite"] = 3] = "SkullWhite";
    PlayerSkulls[PlayerSkulls["SkullRed"] = 4] = "SkullRed";
    PlayerSkulls[PlayerSkulls["SkullBlack"] = 5] = "SkullBlack";
    PlayerSkulls[PlayerSkulls["SkullOrange"] = 6] = "SkullOrange";
})(PlayerSkulls || (exports.PlayerSkulls = PlayerSkulls = {}));
;
var PlayerShields = exports.PlayerShields = undefined;
(function (PlayerShields) {
    PlayerShields[PlayerShields["ShieldNone"] = 0] = "ShieldNone";
    PlayerShields[PlayerShields["ShieldWhiteYellow"] = 1] = "ShieldWhiteYellow";
    PlayerShields[PlayerShields["ShieldWhiteBlue"] = 2] = "ShieldWhiteBlue";
    PlayerShields[PlayerShields["ShieldBlue"] = 3] = "ShieldBlue";
    PlayerShields[PlayerShields["ShieldYellow"] = 4] = "ShieldYellow";
    PlayerShields[PlayerShields["ShieldBlueSharedExp"] = 5] = "ShieldBlueSharedExp";
    PlayerShields[PlayerShields["ShieldYellowSharedExp"] = 6] = "ShieldYellowSharedExp";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExpBlink"] = 7] = "ShieldBlueNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExpBlink"] = 8] = "ShieldYellowNoSharedExpBlink";
    PlayerShields[PlayerShields["ShieldBlueNoSharedExp"] = 9] = "ShieldBlueNoSharedExp";
    PlayerShields[PlayerShields["ShieldYellowNoSharedExp"] = 10] = "ShieldYellowNoSharedExp";
    PlayerShields[PlayerShields["ShieldGray"] = 11] = "ShieldGray"; // 11 member of another party
})(PlayerShields || (exports.PlayerShields = PlayerShields = {}));
var PlayerEmblems = exports.PlayerEmblems = undefined;
(function (PlayerEmblems) {
    PlayerEmblems[PlayerEmblems["EmblemNone"] = 0] = "EmblemNone";
    PlayerEmblems[PlayerEmblems["EmblemGreen"] = 1] = "EmblemGreen";
    PlayerEmblems[PlayerEmblems["EmblemRed"] = 2] = "EmblemRed";
    PlayerEmblems[PlayerEmblems["EmblemBlue"] = 3] = "EmblemBlue";
    PlayerEmblems[PlayerEmblems["EmblemMember"] = 4] = "EmblemMember";
    PlayerEmblems[PlayerEmblems["EmblemOther"] = 5] = "EmblemOther";
})(PlayerEmblems || (exports.PlayerEmblems = PlayerEmblems = {}));
var CreatureIcons = exports.CreatureIcons = undefined;
(function (CreatureIcons) {
    CreatureIcons[CreatureIcons["NpcIconNone"] = 0] = "NpcIconNone";
    CreatureIcons[CreatureIcons["NpcIconChat"] = 1] = "NpcIconChat";
    CreatureIcons[CreatureIcons["NpcIconTrade"] = 2] = "NpcIconTrade";
    CreatureIcons[CreatureIcons["NpcIconQuest"] = 3] = "NpcIconQuest";
    CreatureIcons[CreatureIcons["NpcIconTradeQuest"] = 4] = "NpcIconTradeQuest";
})(CreatureIcons || (exports.CreatureIcons = CreatureIcons = {}));
var PlayerStates = exports.PlayerStates = undefined;
(function (PlayerStates) {
    PlayerStates[PlayerStates["IconNone"] = 0] = "IconNone";
    PlayerStates[PlayerStates["IconPoison"] = 1] = "IconPoison";
    PlayerStates[PlayerStates["IconBurn"] = 2] = "IconBurn";
    PlayerStates[PlayerStates["IconEnergy"] = 4] = "IconEnergy";
    PlayerStates[PlayerStates["IconDrunk"] = 8] = "IconDrunk";
    PlayerStates[PlayerStates["IconManaShield"] = 16] = "IconManaShield";
    PlayerStates[PlayerStates["IconParalyze"] = 32] = "IconParalyze";
    PlayerStates[PlayerStates["IconHaste"] = 64] = "IconHaste";
    PlayerStates[PlayerStates["IconSwords"] = 128] = "IconSwords";
    PlayerStates[PlayerStates["IconDrowning"] = 256] = "IconDrowning";
    PlayerStates[PlayerStates["IconFreezing"] = 512] = "IconFreezing";
    PlayerStates[PlayerStates["IconDazzled"] = 1024] = "IconDazzled";
    PlayerStates[PlayerStates["IconCursed"] = 2048] = "IconCursed";
    PlayerStates[PlayerStates["IconPartyBuff"] = 4096] = "IconPartyBuff";
    PlayerStates[PlayerStates["IconPzBlock"] = 8192] = "IconPzBlock";
    PlayerStates[PlayerStates["IconPz"] = 16384] = "IconPz";
    PlayerStates[PlayerStates["IconBleeding"] = 32768] = "IconBleeding";
    PlayerStates[PlayerStates["IconHungry"] = 65536] = "IconHungry";
})(PlayerStates || (exports.PlayerStates = PlayerStates = {}));
var MessageMode = exports.MessageMode = undefined;
(function (MessageMode) {
    MessageMode[MessageMode["MessageNone"] = 0] = "MessageNone";
    MessageMode[MessageMode["MessageSay"] = 1] = "MessageSay";
    MessageMode[MessageMode["MessageWhisper"] = 2] = "MessageWhisper";
    MessageMode[MessageMode["MessageYell"] = 3] = "MessageYell";
    MessageMode[MessageMode["MessagePrivateFrom"] = 4] = "MessagePrivateFrom";
    MessageMode[MessageMode["MessagePrivateTo"] = 5] = "MessagePrivateTo";
    MessageMode[MessageMode["MessageChannelManagement"] = 6] = "MessageChannelManagement";
    MessageMode[MessageMode["MessageChannel"] = 7] = "MessageChannel";
    MessageMode[MessageMode["MessageChannelHighlight"] = 8] = "MessageChannelHighlight";
    MessageMode[MessageMode["MessageSpell"] = 9] = "MessageSpell";
    MessageMode[MessageMode["MessageNpcFrom"] = 10] = "MessageNpcFrom";
    MessageMode[MessageMode["MessageNpcTo"] = 11] = "MessageNpcTo";
    MessageMode[MessageMode["MessageGamemasterBroadcast"] = 12] = "MessageGamemasterBroadcast";
    MessageMode[MessageMode["MessageGamemasterChannel"] = 13] = "MessageGamemasterChannel";
    MessageMode[MessageMode["MessageGamemasterPrivateFrom"] = 14] = "MessageGamemasterPrivateFrom";
    MessageMode[MessageMode["MessageGamemasterPrivateTo"] = 15] = "MessageGamemasterPrivateTo";
    MessageMode[MessageMode["MessageLogin"] = 16] = "MessageLogin";
    MessageMode[MessageMode["MessageWarning"] = 17] = "MessageWarning";
    MessageMode[MessageMode["MessageGame"] = 18] = "MessageGame";
    MessageMode[MessageMode["MessageFailure"] = 19] = "MessageFailure";
    MessageMode[MessageMode["MessageLook"] = 20] = "MessageLook";
    MessageMode[MessageMode["MessageDamageDealed"] = 21] = "MessageDamageDealed";
    MessageMode[MessageMode["MessageDamageReceived"] = 22] = "MessageDamageReceived";
    MessageMode[MessageMode["MessageHeal"] = 23] = "MessageHeal";
    MessageMode[MessageMode["MessageExp"] = 24] = "MessageExp";
    MessageMode[MessageMode["MessageDamageOthers"] = 25] = "MessageDamageOthers";
    MessageMode[MessageMode["MessageHealOthers"] = 26] = "MessageHealOthers";
    MessageMode[MessageMode["MessageExpOthers"] = 27] = "MessageExpOthers";
    MessageMode[MessageMode["MessageStatus"] = 28] = "MessageStatus";
    MessageMode[MessageMode["MessageLoot"] = 29] = "MessageLoot";
    MessageMode[MessageMode["MessageTradeNpc"] = 30] = "MessageTradeNpc";
    MessageMode[MessageMode["MessageGuild"] = 31] = "MessageGuild";
    MessageMode[MessageMode["MessagePartyManagement"] = 32] = "MessagePartyManagement";
    MessageMode[MessageMode["MessageParty"] = 33] = "MessageParty";
    MessageMode[MessageMode["MessageBarkLow"] = 34] = "MessageBarkLow";
    MessageMode[MessageMode["MessageBarkLoud"] = 35] = "MessageBarkLoud";
    MessageMode[MessageMode["MessageReport"] = 36] = "MessageReport";
    MessageMode[MessageMode["MessageHotkeyUse"] = 37] = "MessageHotkeyUse";
    MessageMode[MessageMode["MessageTutorialHint"] = 38] = "MessageTutorialHint";
    MessageMode[MessageMode["MessageThankyou"] = 39] = "MessageThankyou";
    MessageMode[MessageMode["MessageMarket"] = 40] = "MessageMarket";
    MessageMode[MessageMode["MessageMana"] = 41] = "MessageMana";
    MessageMode[MessageMode["MessageBeyondLast"] = 42] = "MessageBeyondLast";
    // deprecated
    MessageMode[MessageMode["MessageMonsterYell"] = 43] = "MessageMonsterYell";
    MessageMode[MessageMode["MessageMonsterSay"] = 44] = "MessageMonsterSay";
    MessageMode[MessageMode["MessageRed"] = 45] = "MessageRed";
    MessageMode[MessageMode["MessageBlue"] = 46] = "MessageBlue";
    MessageMode[MessageMode["MessageRVRChannel"] = 47] = "MessageRVRChannel";
    MessageMode[MessageMode["MessageRVRAnswer"] = 48] = "MessageRVRAnswer";
    MessageMode[MessageMode["MessageRVRContinue"] = 49] = "MessageRVRContinue";
    MessageMode[MessageMode["MessageGameHighlight"] = 50] = "MessageGameHighlight";
    MessageMode[MessageMode["MessageNpcFromStartBlock"] = 51] = "MessageNpcFromStartBlock";
    MessageMode[MessageMode["LastMessage"] = 52] = "LastMessage";
    MessageMode[MessageMode["MessageInvalid"] = 255] = "MessageInvalid";
})(MessageMode || (exports.MessageMode = MessageMode = {}));
var GameFeature = exports.GameFeature = undefined;
(function (GameFeature) {
    GameFeature[GameFeature["GameProtocolChecksum"] = 1] = "GameProtocolChecksum";
    GameFeature[GameFeature["GameAccountNames"] = 2] = "GameAccountNames";
    GameFeature[GameFeature["GameChallengeOnLogin"] = 3] = "GameChallengeOnLogin";
    GameFeature[GameFeature["GamePenalityOnDeath"] = 4] = "GamePenalityOnDeath";
    GameFeature[GameFeature["GameNameOnNpcTrade"] = 5] = "GameNameOnNpcTrade";
    GameFeature[GameFeature["GameDoubleFreeCapacity"] = 6] = "GameDoubleFreeCapacity";
    GameFeature[GameFeature["GameDoubleExperience"] = 7] = "GameDoubleExperience";
    GameFeature[GameFeature["GameTotalCapacity"] = 8] = "GameTotalCapacity";
    GameFeature[GameFeature["GameSkillsBase"] = 9] = "GameSkillsBase";
    GameFeature[GameFeature["GamePlayerRegenerationTime"] = 10] = "GamePlayerRegenerationTime";
    GameFeature[GameFeature["GameChannelPlayerList"] = 11] = "GameChannelPlayerList";
    GameFeature[GameFeature["GamePlayerMounts"] = 12] = "GamePlayerMounts";
    GameFeature[GameFeature["GameEnvironmentEffect"] = 13] = "GameEnvironmentEffect";
    GameFeature[GameFeature["GameCreatureEmblems"] = 14] = "GameCreatureEmblems";
    GameFeature[GameFeature["GameItemAnimationPhase"] = 15] = "GameItemAnimationPhase";
    GameFeature[GameFeature["GameMagicEffectU16"] = 16] = "GameMagicEffectU16";
    GameFeature[GameFeature["GamePlayerMarket"] = 17] = "GamePlayerMarket";
    GameFeature[GameFeature["GameSpritesU32"] = 18] = "GameSpritesU32";
    // 19 unused
    GameFeature[GameFeature["GameOfflineTrainingTime"] = 20] = "GameOfflineTrainingTime";
    GameFeature[GameFeature["GamePurseSlot"] = 21] = "GamePurseSlot";
    GameFeature[GameFeature["GameFormatCreatureName"] = 22] = "GameFormatCreatureName";
    GameFeature[GameFeature["GameSpellList"] = 23] = "GameSpellList";
    GameFeature[GameFeature["GameClientPing"] = 24] = "GameClientPing";
    GameFeature[GameFeature["GameExtendedClientPing"] = 25] = "GameExtendedClientPing";
    GameFeature[GameFeature["GameDoubleHealth"] = 28] = "GameDoubleHealth";
    GameFeature[GameFeature["GameDoubleSkills"] = 29] = "GameDoubleSkills";
    GameFeature[GameFeature["GameChangeMapAwareRange"] = 30] = "GameChangeMapAwareRange";
    GameFeature[GameFeature["GameMapMovePosition"] = 31] = "GameMapMovePosition";
    GameFeature[GameFeature["GameAttackSeq"] = 32] = "GameAttackSeq";
    GameFeature[GameFeature["GameBlueNpcNameColor"] = 33] = "GameBlueNpcNameColor";
    GameFeature[GameFeature["GameDiagonalAnimatedText"] = 34] = "GameDiagonalAnimatedText";
    GameFeature[GameFeature["GameLoginPending"] = 35] = "GameLoginPending";
    GameFeature[GameFeature["GameNewSpeedLaw"] = 36] = "GameNewSpeedLaw";
    GameFeature[GameFeature["GameForceFirstAutoWalkStep"] = 37] = "GameForceFirstAutoWalkStep";
    GameFeature[GameFeature["GameMinimapRemove"] = 38] = "GameMinimapRemove";
    GameFeature[GameFeature["GameDoubleShopSellAmount"] = 39] = "GameDoubleShopSellAmount";
    GameFeature[GameFeature["GameContainerPagination"] = 40] = "GameContainerPagination";
    GameFeature[GameFeature["GameThingMarks"] = 41] = "GameThingMarks";
    GameFeature[GameFeature["GameLooktypeU16"] = 42] = "GameLooktypeU16";
    GameFeature[GameFeature["GamePlayerStamina"] = 43] = "GamePlayerStamina";
    GameFeature[GameFeature["GamePlayerAddons"] = 44] = "GamePlayerAddons";
    GameFeature[GameFeature["GameMessageStatements"] = 45] = "GameMessageStatements";
    GameFeature[GameFeature["GameMessageLevel"] = 46] = "GameMessageLevel";
    GameFeature[GameFeature["GameNewFluids"] = 47] = "GameNewFluids";
    GameFeature[GameFeature["GamePlayerStateU16"] = 48] = "GamePlayerStateU16";
    GameFeature[GameFeature["GameNewOutfitProtocol"] = 49] = "GameNewOutfitProtocol";
    GameFeature[GameFeature["GamePVPMode"] = 50] = "GamePVPMode";
    GameFeature[GameFeature["GameWritableDate"] = 51] = "GameWritableDate";
    GameFeature[GameFeature["GameAdditionalVipInfo"] = 52] = "GameAdditionalVipInfo";
    GameFeature[GameFeature["GameBaseSkillU16"] = 53] = "GameBaseSkillU16";
    GameFeature[GameFeature["GameCreatureIcons"] = 54] = "GameCreatureIcons";
    GameFeature[GameFeature["GameHideNpcNames"] = 55] = "GameHideNpcNames";
    GameFeature[GameFeature["GameSpritesAlphaChannel"] = 56] = "GameSpritesAlphaChannel";
    GameFeature[GameFeature["GamePremiumExpiration"] = 57] = "GamePremiumExpiration";
    GameFeature[GameFeature["GameBrowseField"] = 58] = "GameBrowseField";
    GameFeature[GameFeature["GameEnhancedAnimations"] = 59] = "GameEnhancedAnimations";
    GameFeature[GameFeature["GameOGLInformation"] = 60] = "GameOGLInformation";
    GameFeature[GameFeature["GameMessageSizeCheck"] = 61] = "GameMessageSizeCheck";
    GameFeature[GameFeature["GamePreviewState"] = 62] = "GamePreviewState";
    GameFeature[GameFeature["GameLoginPacketEncryption"] = 63] = "GameLoginPacketEncryption";
    GameFeature[GameFeature["GameClientVersion"] = 64] = "GameClientVersion";
    GameFeature[GameFeature["GameContentRevision"] = 65] = "GameContentRevision";
    GameFeature[GameFeature["GameExperienceBonus"] = 66] = "GameExperienceBonus";
    GameFeature[GameFeature["GameAuthenticator"] = 67] = "GameAuthenticator";
    GameFeature[GameFeature["GameUnjustifiedPoints"] = 68] = "GameUnjustifiedPoints";
    GameFeature[GameFeature["GameSessionKey"] = 69] = "GameSessionKey";
    GameFeature[GameFeature["GameDeathType"] = 70] = "GameDeathType";
    GameFeature[GameFeature["GameIdleAnimations"] = 71] = "GameIdleAnimations";
    GameFeature[GameFeature["GameKeepUnawareTiles"] = 72] = "GameKeepUnawareTiles";
    GameFeature[GameFeature["GameIngameStore"] = 73] = "GameIngameStore";
    GameFeature[GameFeature["GameIngameStoreHighlights"] = 74] = "GameIngameStoreHighlights";
    GameFeature[GameFeature["GameIngameStoreServiceType"] = 75] = "GameIngameStoreServiceType";
    GameFeature[GameFeature["GameAdditionalSkills"] = 76] = "GameAdditionalSkills";
    GameFeature[GameFeature["LastGameFeature"] = 101] = "LastGameFeature";
})(GameFeature || (exports.GameFeature = GameFeature = {}));
var PathFindResult = exports.PathFindResult = undefined;
(function (PathFindResult) {
    PathFindResult[PathFindResult["PathFindResultOk"] = 0] = "PathFindResultOk";
    PathFindResult[PathFindResult["PathFindResultSamePosition"] = 1] = "PathFindResultSamePosition";
    PathFindResult[PathFindResult["PathFindResultImpossible"] = 2] = "PathFindResultImpossible";
    PathFindResult[PathFindResult["PathFindResultTooFar"] = 3] = "PathFindResultTooFar";
    PathFindResult[PathFindResult["PathFindResultNoWay"] = 4] = "PathFindResultNoWay";
})(PathFindResult || (exports.PathFindResult = PathFindResult = {}));
var PathFindFlags = exports.PathFindFlags = undefined;
(function (PathFindFlags) {
    PathFindFlags[PathFindFlags["PathFindAllowNotSeenTiles"] = 1] = "PathFindAllowNotSeenTiles";
    PathFindFlags[PathFindFlags["PathFindAllowCreatures"] = 2] = "PathFindAllowCreatures";
    PathFindFlags[PathFindFlags["PathFindAllowNonPathable"] = 4] = "PathFindAllowNonPathable";
    PathFindFlags[PathFindFlags["PathFindAllowNonWalkable"] = 8] = "PathFindAllowNonWalkable";
})(PathFindFlags || (exports.PathFindFlags = PathFindFlags = {}));
var AutomapFlags = exports.AutomapFlags = undefined;
(function (AutomapFlags) {
    AutomapFlags[AutomapFlags["MapMarkTick"] = 0] = "MapMarkTick";
    AutomapFlags[AutomapFlags["MapMarkQuestion"] = 1] = "MapMarkQuestion";
    AutomapFlags[AutomapFlags["MapMarkExclamation"] = 2] = "MapMarkExclamation";
    AutomapFlags[AutomapFlags["MapMarkStar"] = 3] = "MapMarkStar";
    AutomapFlags[AutomapFlags["MapMarkCross"] = 4] = "MapMarkCross";
    AutomapFlags[AutomapFlags["MapMarkTemple"] = 5] = "MapMarkTemple";
    AutomapFlags[AutomapFlags["MapMarkKiss"] = 6] = "MapMarkKiss";
    AutomapFlags[AutomapFlags["MapMarkShovel"] = 7] = "MapMarkShovel";
    AutomapFlags[AutomapFlags["MapMarkSword"] = 8] = "MapMarkSword";
    AutomapFlags[AutomapFlags["MapMarkFlag"] = 9] = "MapMarkFlag";
    AutomapFlags[AutomapFlags["MapMarkLock"] = 10] = "MapMarkLock";
    AutomapFlags[AutomapFlags["MapMarkBag"] = 11] = "MapMarkBag";
    AutomapFlags[AutomapFlags["MapMarkSkull"] = 12] = "MapMarkSkull";
    AutomapFlags[AutomapFlags["MapMarkDollar"] = 13] = "MapMarkDollar";
    AutomapFlags[AutomapFlags["MapMarkRedNorth"] = 14] = "MapMarkRedNorth";
    AutomapFlags[AutomapFlags["MapMarkRedSouth"] = 15] = "MapMarkRedSouth";
    AutomapFlags[AutomapFlags["MapMarkRedEast"] = 16] = "MapMarkRedEast";
    AutomapFlags[AutomapFlags["MapMarkRedWest"] = 17] = "MapMarkRedWest";
    AutomapFlags[AutomapFlags["MapMarkGreenNorth"] = 18] = "MapMarkGreenNorth";
    AutomapFlags[AutomapFlags["MapMarkGreenSouth"] = 19] = "MapMarkGreenSouth";
})(AutomapFlags || (exports.AutomapFlags = AutomapFlags = {}));
var VipState = exports.VipState = undefined;
(function (VipState) {
    VipState[VipState["VipStateOffline"] = 0] = "VipStateOffline";
    VipState[VipState["VipStateOnline"] = 1] = "VipStateOnline";
    VipState[VipState["VipStatePending"] = 2] = "VipStatePending";
})(VipState || (exports.VipState = VipState = {}));
var SpeedFormula = exports.SpeedFormula = undefined;
(function (SpeedFormula) {
    SpeedFormula[SpeedFormula["SpeedFormulaA"] = 0] = "SpeedFormulaA";
    SpeedFormula[SpeedFormula["SpeedFormulaB"] = 1] = "SpeedFormulaB";
    SpeedFormula[SpeedFormula["SpeedFormulaC"] = 2] = "SpeedFormulaC";
    SpeedFormula[SpeedFormula["LastSpeedFormula"] = 3] = "LastSpeedFormula";
})(SpeedFormula || (exports.SpeedFormula = SpeedFormula = {}));
var Blessings = exports.Blessings = undefined;
(function (Blessings) {
    Blessings[Blessings["BlessingNone"] = 0] = "BlessingNone";
    Blessings[Blessings["BlessingAdventurer"] = 1] = "BlessingAdventurer";
    Blessings[Blessings["BlessingSpiritualShielding"] = 2] = "BlessingSpiritualShielding";
    Blessings[Blessings["BlessingEmbraceOfTibia"] = 4] = "BlessingEmbraceOfTibia";
    Blessings[Blessings["BlessingFireOfSuns"] = 8] = "BlessingFireOfSuns";
    Blessings[Blessings["BlessingWisdomOfSolitude"] = 16] = "BlessingWisdomOfSolitude";
    Blessings[Blessings["BlessingSparkOfPhoenix"] = 32] = "BlessingSparkOfPhoenix";
})(Blessings || (exports.Blessings = Blessings = {}));
var DeathType = exports.DeathType = undefined;
(function (DeathType) {
    DeathType[DeathType["DeathRegular"] = 0] = "DeathRegular";
    DeathType[DeathType["DeathBlessed"] = 1] = "DeathBlessed";
})(DeathType || (exports.DeathType = DeathType = {}));
var StoreProductTypes = exports.StoreProductTypes = undefined;
(function (StoreProductTypes) {
    StoreProductTypes[StoreProductTypes["ProductTypeOther"] = 0] = "ProductTypeOther";
    StoreProductTypes[StoreProductTypes["ProductTypeNameChange"] = 1] = "ProductTypeNameChange";
})(StoreProductTypes || (exports.StoreProductTypes = StoreProductTypes = {}));
var StoreErrorTypes = exports.StoreErrorTypes = undefined;
(function (StoreErrorTypes) {
    StoreErrorTypes[StoreErrorTypes["StoreNoError"] = -1] = "StoreNoError";
    StoreErrorTypes[StoreErrorTypes["StorePurchaseError"] = 0] = "StorePurchaseError";
    StoreErrorTypes[StoreErrorTypes["StoreNetworkError"] = 1] = "StoreNetworkError";
    StoreErrorTypes[StoreErrorTypes["StoreHistoryError"] = 2] = "StoreHistoryError";
    StoreErrorTypes[StoreErrorTypes["StoreTransferError"] = 3] = "StoreTransferError";
    StoreErrorTypes[StoreErrorTypes["StoreInformation"] = 4] = "StoreInformation";
})(StoreErrorTypes || (exports.StoreErrorTypes = StoreErrorTypes = {}));
var StoreStates = exports.StoreStates = undefined;
(function (StoreStates) {
    StoreStates[StoreStates["StateNone"] = 0] = "StateNone";
    StoreStates[StoreStates["StateNew"] = 1] = "StateNew";
    StoreStates[StoreStates["StateSale"] = 2] = "StateSale";
    StoreStates[StoreStates["StateTimed"] = 3] = "StateTimed";
})(StoreStates || (exports.StoreStates = StoreStates = {}));
var FrameGroupType = exports.FrameGroupType = undefined;
(function (FrameGroupType) {
    FrameGroupType[FrameGroupType["FrameGroupDefault"] = 0] = "FrameGroupDefault";
    FrameGroupType[FrameGroupType["FrameGroupIdle"] = 0] = "FrameGroupIdle";
    FrameGroupType[FrameGroupType["FrameGroupMoving"] = 1] = "FrameGroupMoving";
})(FrameGroupType || (exports.FrameGroupType = FrameGroupType = {}));
var ThingCategory = exports.ThingCategory = undefined;
(function (ThingCategory) {
    ThingCategory[ThingCategory["ThingCategoryItem"] = 0] = "ThingCategoryItem";
    ThingCategory[ThingCategory["ThingCategoryCreature"] = 1] = "ThingCategoryCreature";
    ThingCategory[ThingCategory["ThingCategoryEffect"] = 2] = "ThingCategoryEffect";
    ThingCategory[ThingCategory["ThingCategoryMissile"] = 3] = "ThingCategoryMissile";
    ThingCategory[ThingCategory["ThingInvalidCategory"] = 4] = "ThingInvalidCategory";
    ThingCategory[ThingCategory["ThingLastCategory"] = 4] = "ThingLastCategory";
})(ThingCategory || (exports.ThingCategory = ThingCategory = {}));
var ThingAttr = exports.ThingAttr = undefined;
(function (ThingAttr) {
    ThingAttr[ThingAttr["ThingAttrGround"] = 0] = "ThingAttrGround";
    ThingAttr[ThingAttr["ThingAttrGroundBorder"] = 1] = "ThingAttrGroundBorder";
    ThingAttr[ThingAttr["ThingAttrOnBottom"] = 2] = "ThingAttrOnBottom";
    ThingAttr[ThingAttr["ThingAttrOnTop"] = 3] = "ThingAttrOnTop";
    ThingAttr[ThingAttr["ThingAttrContainer"] = 4] = "ThingAttrContainer";
    ThingAttr[ThingAttr["ThingAttrStackable"] = 5] = "ThingAttrStackable";
    ThingAttr[ThingAttr["ThingAttrForceUse"] = 6] = "ThingAttrForceUse";
    ThingAttr[ThingAttr["ThingAttrMultiUse"] = 7] = "ThingAttrMultiUse";
    ThingAttr[ThingAttr["ThingAttrWritable"] = 8] = "ThingAttrWritable";
    ThingAttr[ThingAttr["ThingAttrWritableOnce"] = 9] = "ThingAttrWritableOnce";
    ThingAttr[ThingAttr["ThingAttrFluidContainer"] = 10] = "ThingAttrFluidContainer";
    ThingAttr[ThingAttr["ThingAttrSplash"] = 11] = "ThingAttrSplash";
    ThingAttr[ThingAttr["ThingAttrNotWalkable"] = 12] = "ThingAttrNotWalkable";
    ThingAttr[ThingAttr["ThingAttrNotMoveable"] = 13] = "ThingAttrNotMoveable";
    ThingAttr[ThingAttr["ThingAttrBlockProjectile"] = 14] = "ThingAttrBlockProjectile";
    ThingAttr[ThingAttr["ThingAttrNotPathable"] = 15] = "ThingAttrNotPathable";
    ThingAttr[ThingAttr["ThingAttrPickupable"] = 16] = "ThingAttrPickupable";
    ThingAttr[ThingAttr["ThingAttrHangable"] = 17] = "ThingAttrHangable";
    ThingAttr[ThingAttr["ThingAttrHookSouth"] = 18] = "ThingAttrHookSouth";
    ThingAttr[ThingAttr["ThingAttrHookEast"] = 19] = "ThingAttrHookEast";
    ThingAttr[ThingAttr["ThingAttrRotateable"] = 20] = "ThingAttrRotateable";
    ThingAttr[ThingAttr["ThingAttrLight"] = 21] = "ThingAttrLight";
    ThingAttr[ThingAttr["ThingAttrDontHide"] = 22] = "ThingAttrDontHide";
    ThingAttr[ThingAttr["ThingAttrTranslucent"] = 23] = "ThingAttrTranslucent";
    ThingAttr[ThingAttr["ThingAttrDisplacement"] = 24] = "ThingAttrDisplacement";
    ThingAttr[ThingAttr["ThingAttrElevation"] = 25] = "ThingAttrElevation";
    ThingAttr[ThingAttr["ThingAttrLyingCorpse"] = 26] = "ThingAttrLyingCorpse";
    ThingAttr[ThingAttr["ThingAttrAnimateAlways"] = 27] = "ThingAttrAnimateAlways";
    ThingAttr[ThingAttr["ThingAttrMinimapColor"] = 28] = "ThingAttrMinimapColor";
    ThingAttr[ThingAttr["ThingAttrLensHelp"] = 29] = "ThingAttrLensHelp";
    ThingAttr[ThingAttr["ThingAttrFullGround"] = 30] = "ThingAttrFullGround";
    ThingAttr[ThingAttr["ThingAttrLook"] = 31] = "ThingAttrLook";
    ThingAttr[ThingAttr["ThingAttrCloth"] = 32] = "ThingAttrCloth";
    ThingAttr[ThingAttr["ThingAttrMarket"] = 33] = "ThingAttrMarket";
    ThingAttr[ThingAttr["ThingAttrUsable"] = 34] = "ThingAttrUsable";
    ThingAttr[ThingAttr["ThingAttrWrapable"] = 35] = "ThingAttrWrapable";
    ThingAttr[ThingAttr["ThingAttrUnwrapable"] = 36] = "ThingAttrUnwrapable";
    ThingAttr[ThingAttr["ThingAttrTopEffect"] = 37] = "ThingAttrTopEffect";
    // additional
    ThingAttr[ThingAttr["ThingAttrOpacity"] = 100] = "ThingAttrOpacity";
    ThingAttr[ThingAttr["ThingAttrNotPreWalkable"] = 101] = "ThingAttrNotPreWalkable";
    ThingAttr[ThingAttr["ThingAttrFloorChange"] = 252] = "ThingAttrFloorChange";
    ThingAttr[ThingAttr["ThingAttrNoMoveAnimation"] = 253] = "ThingAttrNoMoveAnimation";
    ThingAttr[ThingAttr["ThingAttrChargeable"] = 254] = "ThingAttrChargeable";
    ThingAttr[ThingAttr["ThingLastAttr"] = 255] = "ThingLastAttr";
})(ThingAttr || (exports.ThingAttr = ThingAttr = {}));
var SpriteMask = exports.SpriteMask = undefined;
(function (SpriteMask) {
    SpriteMask[SpriteMask["SpriteMaskRed"] = 1] = "SpriteMaskRed";
    SpriteMask[SpriteMask["SpriteMaskGreen"] = 2] = "SpriteMaskGreen";
    SpriteMask[SpriteMask["SpriteMaskBlue"] = 3] = "SpriteMaskBlue";
    SpriteMask[SpriteMask["SpriteMaskYellow"] = 4] = "SpriteMaskYellow";
})(SpriteMask || (exports.SpriteMask = SpriteMask = {}));
var AnimationPhase = exports.AnimationPhase = undefined;
(function (AnimationPhase) {
    AnimationPhase[AnimationPhase["AnimPhaseAutomatic"] = -1] = "AnimPhaseAutomatic";
    AnimationPhase[AnimationPhase["AnimPhaseRandom"] = 254] = "AnimPhaseRandom";
    AnimationPhase[AnimationPhase["AnimPhaseAsync"] = 255] = "AnimPhaseAsync";
})(AnimationPhase || (exports.AnimationPhase = AnimationPhase = {}));
var AnimationDirection = exports.AnimationDirection = undefined;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["AnimDirForward"] = 0] = "AnimDirForward";
    AnimationDirection[AnimationDirection["AnimDirBackward"] = 1] = "AnimDirBackward";
})(AnimationDirection || (exports.AnimationDirection = AnimationDirection = {}));
var Tilestate = exports.Tilestate = undefined;
(function (Tilestate) {
    Tilestate[Tilestate["TILESTATE_NONE"] = 0] = "TILESTATE_NONE";
    Tilestate[Tilestate["TILESTATE_PROTECTIONZONE"] = 1] = "TILESTATE_PROTECTIONZONE";
    Tilestate[Tilestate["TILESTATE_TRASHED"] = 2] = "TILESTATE_TRASHED";
    Tilestate[Tilestate["TILESTATE_OPTIONALZONE"] = 4] = "TILESTATE_OPTIONALZONE";
    Tilestate[Tilestate["TILESTATE_NOLOGOUT"] = 8] = "TILESTATE_NOLOGOUT";
    Tilestate[Tilestate["TILESTATE_HARDCOREZONE"] = 16] = "TILESTATE_HARDCOREZONE";
    Tilestate[Tilestate["TILESTATE_REFRESH"] = 32] = "TILESTATE_REFRESH";
    // internal usage
    Tilestate[Tilestate["TILESTATE_HOUSE"] = 64] = "TILESTATE_HOUSE";
    Tilestate[Tilestate["TILESTATE_TELEPORT"] = 131072] = "TILESTATE_TELEPORT";
    Tilestate[Tilestate["TILESTATE_MAGICFIELD"] = 262144] = "TILESTATE_MAGICFIELD";
    Tilestate[Tilestate["TILESTATE_MAILBOX"] = 524288] = "TILESTATE_MAILBOX";
    Tilestate[Tilestate["TILESTATE_TRASHHOLDER"] = 1048576] = "TILESTATE_TRASHHOLDER";
    Tilestate[Tilestate["TILESTATE_BED"] = 2097152] = "TILESTATE_BED";
    Tilestate[Tilestate["TILESTATE_DEPOT"] = 4194304] = "TILESTATE_DEPOT";
    Tilestate[Tilestate["TILESTATE_TRANSLUECENT_LIGHT"] = 8388608] = "TILESTATE_TRANSLUECENT_LIGHT";
    Tilestate[Tilestate["TILESTATE_LAST"] = 16777216] = "TILESTATE_LAST";
})(Tilestate || (exports.Tilestate = Tilestate = {}));

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(98);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Creature) {
    _inherits(Player, _Creature);

    function Player() {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
    }

    _createClass(Player, [{
        key: 'isPlayer',
        value: function isPlayer() {
            return true;
        }
    }]);

    return Player;
}(_creature.Creature);

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AwareRange = exports.AwareRange = function () {
    function AwareRange() {
        _classCallCheck(this, AwareRange);

        this.top = 6;
        this.right = 9;
        this.bottom = 7;
        this.left = 8;
    }

    _createClass(AwareRange, [{
        key: "horizontal",
        value: function horizontal() {
            return this.left + this.right + 1;
        }
    }, {
        key: "vertical",
        value: function vertical() {
            return this.top + this.bottom + 1;
        }
    }]);

    return AwareRange;
}();

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Size = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(71);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size = exports.Size = function () {
    function Size() {
        var wd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
        var ht = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, Size);

        this.wd = wd;
        this.ht = ht;
    }

    _createClass(Size, [{
        key: "equals",
        value: function equals(otherSize) {
            return this.wd == otherSize.wd && this.ht == otherSize.ht;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Size(this.wd, this.ht);
        }
    }, {
        key: "add",
        value: function add(size) {
            return new Size(this.wd + size.wd, this.ht + size.ht);
        }
    }, {
        key: "sub",
        value: function sub(size) {
            return new Size(this.wd - size.wd, this.ht - size.ht);
        }
    }, {
        key: "mul",
        value: function mul(ratio) {
            return new Size(this.wd * ratio, this.ht * ratio);
        }
    }, {
        key: "isNull",
        value: function isNull() {
            return this.wd == 0 && this.ht == 0;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.wd < 1 || this.ht < 1;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return this.wd >= 0 && this.ht >= 0;
        }
    }, {
        key: "width",
        value: function width() {
            return this.wd;
        }
    }, {
        key: "height",
        value: function height() {
            return this.ht;
        }
    }, {
        key: "resize",
        value: function resize(w, h) {
            this.wd = w;
            this.ht = h;
        }
    }, {
        key: "setWidth",
        value: function setWidth(w) {
            this.wd = w;
        }
    }, {
        key: "setHeight",
        value: function setHeight(h) {
            this.ht = h;
        }
    }, {
        key: "ratio",
        value: function ratio() {
            return this.wd / this.ht;
        }
    }, {
        key: "area",
        value: function area() {
            return this.wd * this.ht;
        }
    }, {
        key: "toPoint",
        value: function toPoint() {
            return new _point.Point(this.wd, this.ht);
        }
    }]);

    return Size;
}();

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_resources = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputfile = __webpack_require__(360);

var _log = __webpack_require__(44);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Resources = function () {
    function Resources() {
        _classCallCheck(this, Resources);
    }

    _createClass(Resources, [{
        key: "openFile",
        value: function openFile(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var get, response, uInt8Array;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                get = function get(url) {
                                    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                                                            var xhr = new XMLHttpRequest();
                                                            xhr.responseType = 'arraybuffer';
                                                            xhr.onload = function (e) {
                                                                if (this.status >= 200 && this.status < 300) resolve(this.response);else reject('Response status: ' + this.status);
                                                            };
                                                            xhr.onerror = function (e) {
                                                                reject(e);
                                                            };
                                                            xhr.open('GET', url, true); //Async
                                                            xhr.send();
                                                        }));

                                                    case 1:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));
                                };

                                _context2.prev = 1;
                                _context2.next = 4;
                                return get(file);

                            case 4:
                                response = _context2.sent;

                                console.log('r', response);
                                uInt8Array = new Uint8Array(response);
                                return _context2.abrupt("return", new _inputfile.InputFile(new DataView(uInt8Array.buffer)));

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2["catch"](1);

                                _log.Log.debug('failed to openFile', _context2.t0);
                                throw _context2.t0;

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 10]]);
            }));
        }
    }]);

    return Resources;
}();

var g_resources = new Resources();
exports.g_resources = g_resources;
/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://inditex.localhost/Kasteria.dat', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
  // var byte3 = uInt8Array[4]; // byte at offset 4
console.log(uInt8Array);
};

xhr.send();
 */

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Outfit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(11);

var _color = __webpack_require__(51);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Outfit = exports.Outfit = function () {
    function Outfit() {
        _classCallCheck(this, Outfit);

        this.m_category = _const.ThingCategory.ThingCategoryCreature;
        this.m_id = 128;
        this.m_auxId = 0;
        this.resetClothes();
    }

    _createClass(Outfit, [{
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "getAuxId",
        value: function getAuxId() {
            return this.m_auxId;
        }
    }, {
        key: "getHead",
        value: function getHead() {
            return this.m_head;
        }
    }, {
        key: "getBody",
        value: function getBody() {
            return this.m_body;
        }
    }, {
        key: "getLegs",
        value: function getLegs() {
            return this.m_legs;
        }
    }, {
        key: "getFeet",
        value: function getFeet() {
            return this.m_feet;
        }
    }, {
        key: "getAddons",
        value: function getAddons() {
            return this.m_addons;
        }
    }, {
        key: "getMount",
        value: function getMount() {
            return this.m_mount;
        }
    }, {
        key: "getCategory",
        value: function getCategory() {
            return this.m_category;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "setAuxId",
        value: function setAuxId(id) {
            this.m_auxId = id;
        }
    }, {
        key: "setHead",
        value: function setHead(head) {
            this.m_head = head;
            this.m_headColor = Outfit.getColor(head);
        }
    }, {
        key: "setBody",
        value: function setBody(body) {
            this.m_body = body;
            this.m_bodyColor = Outfit.getColor(body);
        }
    }, {
        key: "setLegs",
        value: function setLegs(legs) {
            this.m_legs = legs;
            this.m_legsColor = Outfit.getColor(legs);
        }
    }, {
        key: "setFeet",
        value: function setFeet(feet) {
            this.m_feet = feet;
            this.m_feetColor = Outfit.getColor(feet);
        }
    }, {
        key: "setAddons",
        value: function setAddons(addons) {
            this.m_addons = addons;
        }
    }, {
        key: "setMount",
        value: function setMount(mount) {
            this.m_mount = mount;
        }
    }, {
        key: "setCategory",
        value: function setCategory(category) {
            this.m_category = category;
        }
    }, {
        key: "resetClothes",
        value: function resetClothes() {
            this.setHead(0);
            this.setBody(0);
            this.setLegs(0);
            this.setFeet(0);
            this.setMount(0);
        }
    }], [{
        key: "getColor",
        value: function getColor(color) {
            if (color >= Outfit.HSI_H_STEPS * Outfit.HSI_SI_VALUES) color = 0;
            var loc1 = 0,
                loc2 = 0,
                loc3 = 0;
            if (color % Outfit.HSI_H_STEPS != 0) {
                loc1 = color % Outfit.HSI_H_STEPS / 18.0;
                loc2 = 1;
                loc3 = 1;
                switch (Math.floor(color / Outfit.HSI_H_STEPS)) {
                    case 0:
                        loc2 = 0.25;
                        loc3 = 1.00;
                        break;
                    case 1:
                        loc2 = 0.25;
                        loc3 = 0.75;
                        break;
                    case 2:
                        loc2 = 0.50;
                        loc3 = 0.75;
                        break;
                    case 3:
                        loc2 = 0.667;
                        loc3 = 0.75;
                        break;
                    case 4:
                        loc2 = 1.00;
                        loc3 = 1.00;
                        break;
                    case 5:
                        loc2 = 1.00;
                        loc3 = 0.75;
                        break;
                    case 6:
                        loc2 = 1.00;
                        loc3 = 0.50;
                        break;
                }
            } else {
                loc1 = 0;
                loc2 = 0;
                loc3 = 1 - color / Outfit.HSI_H_STEPS / Outfit.HSI_SI_VALUES;
            }
            if (loc3 == 0) return new _color.Color(0, 0, 0);
            if (loc2 == 0) {
                var loc7 = Math.floor(loc3 * 255);
                return new _color.Color(loc7, loc7, loc7);
            }
            var red = 0,
                green = 0,
                blue = 0;
            if (loc1 < 1.0 / 6.0) {
                red = loc3;
                blue = loc3 * (1 - loc2);
                green = blue + (loc3 - blue) * 6 * loc1;
            } else if (loc1 < 2.0 / 6.0) {
                green = loc3;
                blue = loc3 * (1 - loc2);
                red = green - (loc3 - blue) * (6 * loc1 - 1);
            } else if (loc1 < 3.0 / 6.0) {
                green = loc3;
                red = loc3 * (1 - loc2);
                blue = red + (loc3 - red) * (6 * loc1 - 2);
            } else if (loc1 < 4.0 / 6.0) {
                blue = loc3;
                red = loc3 * (1 - loc2);
                green = blue - (loc3 - red) * (6 * loc1 - 3);
            } else if (loc1 < 5.0 / 6.0) {
                blue = loc3;
                green = loc3 * (1 - loc2);
                red = green + (loc3 - green) * (6 * loc1 - 4);
            } else {
                red = loc3;
                green = loc3 * (1 - loc2);
                blue = red - (loc3 - green) * (6 * loc1 - 5);
            }
            return new _color.Color(Math.floor(red * 255), Math.floor(green * 255), Math.floor(blue * 255));
        }
    }]);

    return Outfit;
}();

Outfit.HSI_SI_VALUES = 7;
Outfit.HSI_H_STEPS = 19;

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Proto;
(function (Proto) {
    Proto[Proto["LoginServerError"] = 10] = "LoginServerError";
    Proto[Proto["LoginServerMotd"] = 20] = "LoginServerMotd";
    Proto[Proto["LoginServerUpdateNeeded"] = 30] = "LoginServerUpdateNeeded";
    Proto[Proto["LoginServerCharacterList"] = 100] = "LoginServerCharacterList";
    Proto[Proto["StaticText"] = 96] = "StaticText";
    Proto[Proto["UnknownCreature"] = 97] = "UnknownCreature";
    Proto[Proto["OutdatedCreature"] = 98] = "OutdatedCreature";
    Proto[Proto["Creature"] = 99] = "Creature";
    Proto[Proto["GameServerLoginOrPendingState"] = 10] = "GameServerLoginOrPendingState";
    Proto[Proto["GameServerGMActions"] = 11] = "GameServerGMActions";
    Proto[Proto["GameServerEnterGame"] = 15] = "GameServerEnterGame";
    Proto[Proto["GameServerUpdateNeeded"] = 17] = "GameServerUpdateNeeded";
    Proto[Proto["GameServerLoginError"] = 20] = "GameServerLoginError";
    Proto[Proto["GameServerLoginAdvice"] = 21] = "GameServerLoginAdvice";
    Proto[Proto["GameServerLoginWait"] = 22] = "GameServerLoginWait";
    Proto[Proto["GameServerLoginSuccess"] = 23] = "GameServerLoginSuccess";
    Proto[Proto["GameServerLoginToken"] = 24] = "GameServerLoginToken";
    Proto[Proto["GameServerStoreButtonIndicators"] = 25] = "GameServerStoreButtonIndicators";
    Proto[Proto["GameServerPingBack"] = 29] = "GameServerPingBack";
    Proto[Proto["GameServerPing"] = 30] = "GameServerPing";
    Proto[Proto["GameServerChallenge"] = 31] = "GameServerChallenge";
    Proto[Proto["GameServerDeath"] = 40] = "GameServerDeath";
    Proto[Proto["GameServerFirstGameOpcode"] = 50] = "GameServerFirstGameOpcode";
    Proto[Proto["GameServerExtendedOpcode"] = 50] = "GameServerExtendedOpcode";
    Proto[Proto["GameServerChangeMapAwareRange"] = 51] = "GameServerChangeMapAwareRange";
    Proto[Proto["GameServerFullMap"] = 100] = "GameServerFullMap";
    Proto[Proto["GameServerMapTopRow"] = 101] = "GameServerMapTopRow";
    Proto[Proto["GameServerMapRightRow"] = 102] = "GameServerMapRightRow";
    Proto[Proto["GameServerMapBottomRow"] = 103] = "GameServerMapBottomRow";
    Proto[Proto["GameServerMapLeftRow"] = 104] = "GameServerMapLeftRow";
    Proto[Proto["GameServerUpdateTile"] = 105] = "GameServerUpdateTile";
    Proto[Proto["GameServerCreateOnMap"] = 106] = "GameServerCreateOnMap";
    Proto[Proto["GameServerChangeOnMap"] = 107] = "GameServerChangeOnMap";
    Proto[Proto["GameServerDeleteOnMap"] = 108] = "GameServerDeleteOnMap";
    Proto[Proto["GameServerMoveCreature"] = 109] = "GameServerMoveCreature";
    Proto[Proto["GameServerOpenContainer"] = 110] = "GameServerOpenContainer";
    Proto[Proto["GameServerCloseContainer"] = 111] = "GameServerCloseContainer";
    Proto[Proto["GameServerCreateContainer"] = 112] = "GameServerCreateContainer";
    Proto[Proto["GameServerChangeInContainer"] = 113] = "GameServerChangeInContainer";
    Proto[Proto["GameServerDeleteInContainer"] = 114] = "GameServerDeleteInContainer";
    Proto[Proto["GameServerSetInventory"] = 120] = "GameServerSetInventory";
    Proto[Proto["GameServerDeleteInventory"] = 121] = "GameServerDeleteInventory";
    Proto[Proto["GameServerOpenNpcTrade"] = 122] = "GameServerOpenNpcTrade";
    Proto[Proto["GameServerPlayerGoods"] = 123] = "GameServerPlayerGoods";
    Proto[Proto["GameServerCloseNpcTrade"] = 124] = "GameServerCloseNpcTrade";
    Proto[Proto["GameServerOwnTrade"] = 125] = "GameServerOwnTrade";
    Proto[Proto["GameServerCounterTrade"] = 126] = "GameServerCounterTrade";
    Proto[Proto["GameServerCloseTrade"] = 127] = "GameServerCloseTrade";
    Proto[Proto["GameServerAmbient"] = 130] = "GameServerAmbient";
    Proto[Proto["GameServerGraphicalEffect"] = 131] = "GameServerGraphicalEffect";
    Proto[Proto["GameServerTextEffect"] = 132] = "GameServerTextEffect";
    Proto[Proto["GameServerMissleEffect"] = 133] = "GameServerMissleEffect";
    Proto[Proto["GameServerMarkCreature"] = 134] = "GameServerMarkCreature";
    Proto[Proto["GameServerTrappers"] = 135] = "GameServerTrappers";
    Proto[Proto["GameServerCreatureHealth"] = 140] = "GameServerCreatureHealth";
    Proto[Proto["GameServerCreatureLight"] = 141] = "GameServerCreatureLight";
    Proto[Proto["GameServerCreatureOutfit"] = 142] = "GameServerCreatureOutfit";
    Proto[Proto["GameServerCreatureSpeed"] = 143] = "GameServerCreatureSpeed";
    Proto[Proto["GameServerCreatureSkull"] = 144] = "GameServerCreatureSkull";
    Proto[Proto["GameServerCreatureParty"] = 145] = "GameServerCreatureParty";
    Proto[Proto["GameServerCreatureUnpass"] = 146] = "GameServerCreatureUnpass";
    Proto[Proto["GameServerCreatureMarks"] = 147] = "GameServerCreatureMarks";
    Proto[Proto["GameServerPlayerHelpers"] = 148] = "GameServerPlayerHelpers";
    Proto[Proto["GameServerCreatureType"] = 149] = "GameServerCreatureType";
    Proto[Proto["GameServerEditText"] = 150] = "GameServerEditText";
    Proto[Proto["GameServerEditList"] = 151] = "GameServerEditList";
    Proto[Proto["GameServerBlessings"] = 156] = "GameServerBlessings";
    Proto[Proto["GameServerPreset"] = 157] = "GameServerPreset";
    Proto[Proto["GameServerPremiumTrigger"] = 158] = "GameServerPremiumTrigger";
    Proto[Proto["GameServerPlayerDataBasic"] = 159] = "GameServerPlayerDataBasic";
    Proto[Proto["GameServerPlayerData"] = 160] = "GameServerPlayerData";
    Proto[Proto["GameServerPlayerSkills"] = 161] = "GameServerPlayerSkills";
    Proto[Proto["GameServerPlayerState"] = 162] = "GameServerPlayerState";
    Proto[Proto["GameServerClearTarget"] = 163] = "GameServerClearTarget";
    Proto[Proto["GameServerPlayerModes"] = 167] = "GameServerPlayerModes";
    Proto[Proto["GameServerSpellDelay"] = 164] = "GameServerSpellDelay";
    Proto[Proto["GameServerSpellGroupDelay"] = 165] = "GameServerSpellGroupDelay";
    Proto[Proto["GameServerMultiUseDelay"] = 166] = "GameServerMultiUseDelay";
    Proto[Proto["GameServerSetStoreDeepLink"] = 168] = "GameServerSetStoreDeepLink";
    Proto[Proto["GameServerTalk"] = 170] = "GameServerTalk";
    Proto[Proto["GameServerChannels"] = 171] = "GameServerChannels";
    Proto[Proto["GameServerOpenChannel"] = 172] = "GameServerOpenChannel";
    Proto[Proto["GameServerOpenPrivateChannel"] = 173] = "GameServerOpenPrivateChannel";
    Proto[Proto["GameServerRuleViolationChannel"] = 174] = "GameServerRuleViolationChannel";
    Proto[Proto["GameServerRuleViolationRemove"] = 175] = "GameServerRuleViolationRemove";
    Proto[Proto["GameServerRuleViolationCancel"] = 176] = "GameServerRuleViolationCancel";
    Proto[Proto["GameServerRuleViolationLock"] = 177] = "GameServerRuleViolationLock";
    Proto[Proto["GameServerOpenOwnChannel"] = 178] = "GameServerOpenOwnChannel";
    Proto[Proto["GameServerCloseChannel"] = 179] = "GameServerCloseChannel";
    Proto[Proto["GameServerTextMessage"] = 180] = "GameServerTextMessage";
    Proto[Proto["GameServerCancelWalk"] = 181] = "GameServerCancelWalk";
    Proto[Proto["GameServerWalkWait"] = 182] = "GameServerWalkWait";
    Proto[Proto["GameServerUnjustifiedStats"] = 183] = "GameServerUnjustifiedStats";
    Proto[Proto["GameServerPvpSituations"] = 184] = "GameServerPvpSituations";
    Proto[Proto["GameServerFloorChangeUp"] = 190] = "GameServerFloorChangeUp";
    Proto[Proto["GameServerFloorChangeDown"] = 191] = "GameServerFloorChangeDown";
    Proto[Proto["GameServerChooseOutfit"] = 200] = "GameServerChooseOutfit";
    Proto[Proto["GameServerVipAdd"] = 210] = "GameServerVipAdd";
    Proto[Proto["GameServerVipState"] = 211] = "GameServerVipState";
    Proto[Proto["GameServerVipLogout"] = 212] = "GameServerVipLogout";
    Proto[Proto["GameServerTutorialHint"] = 220] = "GameServerTutorialHint";
    Proto[Proto["GameServerAutomapFlag"] = 221] = "GameServerAutomapFlag";
    Proto[Proto["GameServerCoinBalance"] = 223] = "GameServerCoinBalance";
    Proto[Proto["GameServerStoreError"] = 224] = "GameServerStoreError";
    Proto[Proto["GameServerRequestPurchaseData"] = 225] = "GameServerRequestPurchaseData";
    Proto[Proto["GameServerQuestLog"] = 240] = "GameServerQuestLog";
    Proto[Proto["GameServerQuestLine"] = 241] = "GameServerQuestLine";
    Proto[Proto["GameServerCoinBalanceUpdating"] = 242] = "GameServerCoinBalanceUpdating";
    Proto[Proto["GameServerChannelEvent"] = 243] = "GameServerChannelEvent";
    Proto[Proto["GameServerItemInfo"] = 244] = "GameServerItemInfo";
    Proto[Proto["GameServerPlayerInventory"] = 245] = "GameServerPlayerInventory";
    Proto[Proto["GameServerMarketEnter"] = 246] = "GameServerMarketEnter";
    Proto[Proto["GameServerMarketLeave"] = 247] = "GameServerMarketLeave";
    Proto[Proto["GameServerMarketDetail"] = 248] = "GameServerMarketDetail";
    Proto[Proto["GameServerMarketBrowse"] = 249] = "GameServerMarketBrowse";
    Proto[Proto["GameServerModalDialog"] = 250] = "GameServerModalDialog";
    Proto[Proto["GameServerStore"] = 251] = "GameServerStore";
    Proto[Proto["GameServerStoreOffers"] = 252] = "GameServerStoreOffers";
    Proto[Proto["GameServerStoreTransactionHistory"] = 253] = "GameServerStoreTransactionHistory";
    Proto[Proto["GameServerStoreCompletePurchase"] = 254] = "GameServerStoreCompletePurchase";
    Proto[Proto["ClientEnterAccount"] = 1] = "ClientEnterAccount";
    Proto[Proto["ClientPendingGame"] = 10] = "ClientPendingGame";
    Proto[Proto["ClientEnterGame"] = 15] = "ClientEnterGame";
    Proto[Proto["ClientLeaveGame"] = 20] = "ClientLeaveGame";
    Proto[Proto["ClientPing"] = 29] = "ClientPing";
    Proto[Proto["ClientPingBack"] = 30] = "ClientPingBack";
    Proto[Proto["ClientFirstGameOpcode"] = 50] = "ClientFirstGameOpcode";
    Proto[Proto["ClientExtendedOpcode"] = 50] = "ClientExtendedOpcode";
    Proto[Proto["ClientChangeMapAwareRange"] = 51] = "ClientChangeMapAwareRange";
    Proto[Proto["ClientAutoWalk"] = 100] = "ClientAutoWalk";
    Proto[Proto["ClientWalkNorth"] = 101] = "ClientWalkNorth";
    Proto[Proto["ClientWalkEast"] = 102] = "ClientWalkEast";
    Proto[Proto["ClientWalkSouth"] = 103] = "ClientWalkSouth";
    Proto[Proto["ClientWalkWest"] = 104] = "ClientWalkWest";
    Proto[Proto["ClientStop"] = 105] = "ClientStop";
    Proto[Proto["ClientWalkNorthEast"] = 106] = "ClientWalkNorthEast";
    Proto[Proto["ClientWalkSouthEast"] = 107] = "ClientWalkSouthEast";
    Proto[Proto["ClientWalkSouthWest"] = 108] = "ClientWalkSouthWest";
    Proto[Proto["ClientWalkNorthWest"] = 109] = "ClientWalkNorthWest";
    Proto[Proto["ClientTurnNorth"] = 111] = "ClientTurnNorth";
    Proto[Proto["ClientTurnEast"] = 112] = "ClientTurnEast";
    Proto[Proto["ClientTurnSouth"] = 113] = "ClientTurnSouth";
    Proto[Proto["ClientTurnWest"] = 114] = "ClientTurnWest";
    Proto[Proto["ClientEquipItem"] = 119] = "ClientEquipItem";
    Proto[Proto["ClientMove"] = 120] = "ClientMove";
    Proto[Proto["ClientInspectNpcTrade"] = 121] = "ClientInspectNpcTrade";
    Proto[Proto["ClientBuyItem"] = 122] = "ClientBuyItem";
    Proto[Proto["ClientSellItem"] = 123] = "ClientSellItem";
    Proto[Proto["ClientCloseNpcTrade"] = 124] = "ClientCloseNpcTrade";
    Proto[Proto["ClientRequestTrade"] = 125] = "ClientRequestTrade";
    Proto[Proto["ClientInspectTrade"] = 126] = "ClientInspectTrade";
    Proto[Proto["ClientAcceptTrade"] = 127] = "ClientAcceptTrade";
    Proto[Proto["ClientRejectTrade"] = 128] = "ClientRejectTrade";
    Proto[Proto["ClientUseItem"] = 130] = "ClientUseItem";
    Proto[Proto["ClientUseItemWith"] = 131] = "ClientUseItemWith";
    Proto[Proto["ClientUseOnCreature"] = 132] = "ClientUseOnCreature";
    Proto[Proto["ClientRotateItem"] = 133] = "ClientRotateItem";
    Proto[Proto["ClientCloseContainer"] = 135] = "ClientCloseContainer";
    Proto[Proto["ClientUpContainer"] = 136] = "ClientUpContainer";
    Proto[Proto["ClientEditText"] = 137] = "ClientEditText";
    Proto[Proto["ClientEditList"] = 138] = "ClientEditList";
    Proto[Proto["ClientLook"] = 140] = "ClientLook";
    Proto[Proto["ClientLookCreature"] = 141] = "ClientLookCreature";
    Proto[Proto["ClientTalk"] = 150] = "ClientTalk";
    Proto[Proto["ClientRequestChannels"] = 151] = "ClientRequestChannels";
    Proto[Proto["ClientJoinChannel"] = 152] = "ClientJoinChannel";
    Proto[Proto["ClientLeaveChannel"] = 153] = "ClientLeaveChannel";
    Proto[Proto["ClientOpenPrivateChannel"] = 154] = "ClientOpenPrivateChannel";
    Proto[Proto["ClientOpenRuleViolation"] = 155] = "ClientOpenRuleViolation";
    Proto[Proto["ClientCloseRuleViolation"] = 156] = "ClientCloseRuleViolation";
    Proto[Proto["ClientCancelRuleViolation"] = 157] = "ClientCancelRuleViolation";
    Proto[Proto["ClientCloseNpcChannel"] = 158] = "ClientCloseNpcChannel";
    Proto[Proto["ClientChangeFightModes"] = 160] = "ClientChangeFightModes";
    Proto[Proto["ClientAttack"] = 161] = "ClientAttack";
    Proto[Proto["ClientFollow"] = 162] = "ClientFollow";
    Proto[Proto["ClientInviteToParty"] = 163] = "ClientInviteToParty";
    Proto[Proto["ClientJoinParty"] = 164] = "ClientJoinParty";
    Proto[Proto["ClientRevokeInvitation"] = 165] = "ClientRevokeInvitation";
    Proto[Proto["ClientPassLeadership"] = 166] = "ClientPassLeadership";
    Proto[Proto["ClientLeaveParty"] = 167] = "ClientLeaveParty";
    Proto[Proto["ClientShareExperience"] = 168] = "ClientShareExperience";
    Proto[Proto["ClientDisbandParty"] = 169] = "ClientDisbandParty";
    Proto[Proto["ClientOpenOwnChannel"] = 170] = "ClientOpenOwnChannel";
    Proto[Proto["ClientInviteToOwnChannel"] = 171] = "ClientInviteToOwnChannel";
    Proto[Proto["ClientExcludeFromOwnChannel"] = 172] = "ClientExcludeFromOwnChannel";
    Proto[Proto["ClientCancelAttackAndFollow"] = 190] = "ClientCancelAttackAndFollow";
    Proto[Proto["ClientUpdateTile"] = 201] = "ClientUpdateTile";
    Proto[Proto["ClientRefreshContainer"] = 202] = "ClientRefreshContainer";
    Proto[Proto["ClientBrowseField"] = 203] = "ClientBrowseField";
    Proto[Proto["ClientSeekInContainer"] = 204] = "ClientSeekInContainer";
    Proto[Proto["ClientRequestOutfit"] = 210] = "ClientRequestOutfit";
    Proto[Proto["ClientChangeOutfit"] = 211] = "ClientChangeOutfit";
    Proto[Proto["ClientMount"] = 212] = "ClientMount";
    Proto[Proto["ClientAddVip"] = 220] = "ClientAddVip";
    Proto[Proto["ClientRemoveVip"] = 221] = "ClientRemoveVip";
    Proto[Proto["ClientEditVip"] = 222] = "ClientEditVip";
    Proto[Proto["ClientBugReport"] = 230] = "ClientBugReport";
    Proto[Proto["ClientRuleViolation"] = 231] = "ClientRuleViolation";
    Proto[Proto["ClientDebugReport"] = 232] = "ClientDebugReport";
    Proto[Proto["ClientTransferCoins"] = 239] = "ClientTransferCoins";
    Proto[Proto["ClientRequestQuestLog"] = 240] = "ClientRequestQuestLog";
    Proto[Proto["ClientRequestQuestLine"] = 241] = "ClientRequestQuestLine";
    Proto[Proto["ClientNewRuleViolation"] = 242] = "ClientNewRuleViolation";
    Proto[Proto["ClientRequestItemInfo"] = 243] = "ClientRequestItemInfo";
    Proto[Proto["ClientMarketLeave"] = 244] = "ClientMarketLeave";
    Proto[Proto["ClientMarketBrowse"] = 245] = "ClientMarketBrowse";
    Proto[Proto["ClientMarketCreate"] = 246] = "ClientMarketCreate";
    Proto[Proto["ClientMarketCancel"] = 247] = "ClientMarketCancel";
    Proto[Proto["ClientMarketAccept"] = 248] = "ClientMarketAccept";
    Proto[Proto["ClientAnswerModalDialog"] = 249] = "ClientAnswerModalDialog";
    Proto[Proto["ClientOpenStore"] = 250] = "ClientOpenStore";
    Proto[Proto["ClientRequestStoreOffers"] = 251] = "ClientRequestStoreOffers";
    Proto[Proto["ClientBuyStoreOffer"] = 252] = "ClientBuyStoreOffer";
    Proto[Proto["ClientOpenTransactionHistory"] = 253] = "ClientOpenTransactionHistory";
    Proto[Proto["ClientRequestTransactionHistory"] = 254] = "ClientRequestTransactionHistory";
    Proto[Proto["CreatureTypePlayer"] = 0] = "CreatureTypePlayer";
    Proto[Proto["CreatureTypeMonster"] = 1] = "CreatureTypeMonster";
    Proto[Proto["CreatureTypeNpc"] = 2] = "CreatureTypeNpc";
    Proto[Proto["CreatureTypeSummonOwn"] = 3] = "CreatureTypeSummonOwn";
    Proto[Proto["CreatureTypeSummonOther"] = 4] = "CreatureTypeSummonOther";
    Proto[Proto["CreatureTypeUnknown"] = 255] = "CreatureTypeUnknown";
    Proto[Proto["PlayerStartId"] = 268435456] = "PlayerStartId";
    Proto[Proto["PlayerEndId"] = 1073741824] = "PlayerEndId";
    Proto[Proto["MonsterStartId"] = 1073741824] = "MonsterStartId";
    Proto[Proto["MonsterEndId"] = 2147483648] = "MonsterEndId";
    Proto[Proto["NpcStartId"] = 2147483648] = "NpcStartId";
    Proto[Proto["NpcEndId"] = 4294967295] = "NpcEndId";
})(Proto || (exports.Proto = Proto = {}));
exports.Proto = Proto;

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binarydatareader = __webpack_require__(102);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputMessage = exports.InputMessage = function (_BinaryDataReader) {
    _inherits(InputMessage, _BinaryDataReader);

    function InputMessage() {
        _classCallCheck(this, InputMessage);

        return _possibleConstructorReturn(this, (InputMessage.__proto__ || Object.getPrototypeOf(InputMessage)).apply(this, arguments));
    }

    _createClass(InputMessage, [{
        key: "validateChecksum",
        value: function validateChecksum() {
            return true;
        }
    }]);

    return InputMessage;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(352);


/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(49);

var _resources = __webpack_require__(144);

var _movie = __webpack_require__(371);

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

//g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');
function test() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var movieData, movie;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _game.g_game.setClientVersion(854);
                        console.log('load');
                        _context.next = 4;
                        return _game.g_game.loadDatFile('http://inditex.localhost/Kasteria.dat');

                    case 4:
                        console.log('load file');
                        _context.next = 7;
                        return _resources.g_resources.openFile('http://inditex.localhost/crash1.ukcam');

                    case 7:
                        movieData = _context.sent;

                        //movieData.setReadPos(8);
                        movie = new _movie.Movie(new DataView(movieData.getBytes(-1)));

                        _game.g_game.watchMovie(movie);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
test();

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(141);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalPlayer = exports.LocalPlayer = function (_Player) {
    _inherits(LocalPlayer, _Player);

    function LocalPlayer() {
        _classCallCheck(this, LocalPlayer);

        var _this = _possibleConstructorReturn(this, (LocalPlayer.__proto__ || Object.getPrototypeOf(LocalPlayer)).apply(this, arguments));

        _this.m_known = false;
        return _this;
    }

    _createClass(LocalPlayer, [{
        key: 'isLocalPlayer',
        value: function isLocalPlayer() {
            return true;
        }
    }, {
        key: 'setBlessings',
        value: function setBlessings(blessings) {}
    }, {
        key: 'setKnown',
        value: function setKnown(v) {
            this.m_known = v;
        }
    }, {
        key: 'isKnown',
        value: function isKnown() {
            return this.m_known;
        }
    }]);

    return LocalPlayer;
}(_player.Player);

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileBlock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = __webpack_require__(355);

var _helpers = __webpack_require__(101);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileBlock = exports.TileBlock = function () {
    function TileBlock() {
        _classCallCheck(this, TileBlock);

        this.m_tiles = [];
    }

    _createClass(TileBlock, [{
        key: "create",
        value: function create(pos) {
            var tile = new _tile.Tile(pos);
            this.m_tiles[this.getTileIndex(pos)] = tile;
            return tile;
        }
    }, {
        key: "getOrCreate",
        value: function getOrCreate(pos) {
            var tile = this.get(pos);
            if (!tile) tile = this.create(pos);
            return tile;
        }
    }, {
        key: "get",
        value: function get(pos) {
            return this.m_tiles[this.getTileIndex(pos)];
        }
    }, {
        key: "remove",
        value: function remove(pos) {
            this.m_tiles[this.getTileIndex(pos)] = null;
        }
    }, {
        key: "getTileIndex",
        value: function getTileIndex(pos) {
            return (0, _helpers.toInt)(pos.y % TileBlock.BLOCK_SIZE) * TileBlock.BLOCK_SIZE + (0, _helpers.toInt)(pos.x % TileBlock.BLOCK_SIZE);
        }
    }, {
        key: "getTiles",
        value: function getTiles() {
            return this.m_tiles;
        }
    }]);

    return TileBlock;
}();

TileBlock.BLOCK_SIZE = 32;

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(49);

var _map = __webpack_require__(70);

var _const = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cc = 0;

var Tile = exports.Tile = function () {
    function Tile(position) {
        _classCallCheck(this, Tile);

        this.m_drawElevation = 0;
        this.m_minimapColor = 0;
        this.m_flags = 0;
        this.m_walkingCreatures = [];
        this.m_effects = [];
        this.m_things = [];
        this.m_position = position;
    }

    _createClass(Tile, [{
        key: "draw",
        value: function draw(dest, scaleFactor, drawFlags) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        }
    }, {
        key: "clean",
        value: function clean() {
            while (this.m_things.length > 0) {
                this.removeThing(this.m_things.pop());
            }
        }
    }, {
        key: "addWalkingCreature",
        value: function addWalkingCreature(creature) {
            this.m_walkingCreatures.push(creature);
        }
    }, {
        key: "removeWalkingCreature",
        value: function removeWalkingCreature(creature) {
            var index = this.m_walkingCreatures.indexOf(creature);
            if (index > -1) {
                this.m_walkingCreatures.splice(index, 1);
            }
        }
    }, {
        key: "addThing",
        value: function addThing(thing, stackPos) {
            if (!thing) return;
            if (thing.isEffect()) {
                if (thing.isTopEffect()) this.m_effects.unshift(thing);else this.m_effects.push(thing);
            } else {
                /*
                if (thing.isCreature())
                    console.log('tile.addThing', thing, stackPos, this.m_things);
                */
                // priority                                    854
                // 0 - ground,                        -.      -.
                // 1 - ground borders                 -.      -.
                // 2 - bottom (walls),                -.      -.
                // 3 - on top (doors)                 -.      -.
                // 4 - creatures, from top to bottom  <--      -.
                // 5 - items, from top to bottom      <--      <--
                if (stackPos < 0 || stackPos == 255) {
                    var priority = thing.getStackPriority();
                    // -1 or 255 => auto detect position
                    // -2        => append
                    var append = void 0;
                    if (stackPos == -2) append = true;else {
                        append = priority <= 3;
                        // newer protocols does not store creatures in reverse order
                        if (_game.g_game.getClientVersion() >= 854 && priority == 4) append = !append;
                    }
                    for (stackPos = 0; stackPos < this.m_things.length; ++stackPos) {
                        var otherPriority = this.m_things[stackPos].getStackPriority();
                        //console.log('prior', stackPos, priority, otherPriority);
                        if (append && otherPriority > priority || !append && otherPriority >= priority) break;
                    }
                } else if (stackPos > this.m_things.length) stackPos = this.m_things.length;
                //this.m_things.insert(this.m_things.begin() + stackPos, thing);
                this.m_things.splice(stackPos, 0, thing);
                //this.m_things[stackPos] = thing;
                if (this.m_things.length > Tile.MAX_THINGS) this.removeThing(this.m_things[Tile.MAX_THINGS]);
                /*
                // check stack priorities
                // this code exists to find stackpos bugs faster
                int lastPriority = 0;
                for(const ThingPtr& thing :this.m_things) {
                    int priority = thing.getStackPriority();
                    assert(lastPriority <= priority);
                    lastPriority = priority;
                }
                */
            }
            thing.setPosition(this.m_position);
            thing.onAppear();
            if (thing.isTranslucent()) this.checkTranslucentLight();
        }
    }, {
        key: "removeThing",
        value: function removeThing(thing) {
            if (!thing) return false;
            var removed = false;
            if (thing.isEffect()) {
                var index = this.m_effects.indexOf(thing);
                if (index > -1) {
                    this.m_effects.splice(index, 1);
                    removed = true;
                }
            } else {
                var _index = this.m_things.indexOf(thing);
                if (_index > -1) {
                    this.m_things.splice(_index, 1);
                    removed = true;
                }
            }
            thing.onDisappear();
            if (thing.isTranslucent()) this.checkTranslucentLight();
            return removed;
        }
    }, {
        key: "getThing",
        value: function getThing(stackPos) {
            if (stackPos >= 0 && stackPos < this.m_things.length) {
                //Log.debug('tile thing: ', this.m_things[stackPos]);
                return this.m_things[stackPos];
            }
            return null;
        }
    }, {
        key: "getEffect",
        value: function getEffect(id) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.m_effects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var effect = _step.value;

                    if (effect.getId() == id) return effect;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }
    }, {
        key: "hasThing",
        value: function hasThing(thing) {
            return this.m_things.indexOf(thing) > -1;
        }
    }, {
        key: "getThingStackPos",
        value: function getThingStackPos(thing) {
            /*
            for(let stackpos = 0; stackpos < this.m_things.length; ++stackpos)
            if(thing == this.m_things[stackpos])
                return stackpos;
             */
            return this.m_things.indexOf(thing);
        }
    }, {
        key: "getTopThing",
        value: function getTopThing() {
            if (this.isEmpty()) return null;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.m_things[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var thing = _step2.value;

                    if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature()) return thing;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this.m_things[this.m_things.length - 1];
        }
    }, {
        key: "getTopLookThing",
        value: function getTopLookThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (!thing.isIgnoreLook() && !thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()) return thing;
            }
            return this.m_things[0];
        }
    }, {
        key: "getTopUseThing",
        value: function getTopUseThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isForceUse() || !thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature() && !thing.isSplash()) return thing;
            }
            for (var _i = 0; _i < this.m_things.length; ++_i) {
                var _thing = this.m_things[_i];
                if (!_thing.isGround() && !_thing.isGroundBorder() && !_thing.isCreature() && !_thing.isSplash()) return _thing;
            }
            return this.m_things[0];
        }
    }, {
        key: "getTopCreature",
        value: function getTopCreature() {
            var creature = void 0;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isLocalPlayer()) creature = thing;else if (thing.isCreature() && !thing.isLocalPlayer()) return thing;
            }
            if (!creature && this.m_walkingCreatures.length > 0) creature = this.m_walkingCreatures[this.m_walkingCreatures.length - 1];
            // check for walking creatures in tiles around
            if (!creature) {
                for (var xi = -1; xi <= 1; ++xi) {
                    for (var yi = -1; yi <= 1; ++yi) {
                        var pos = this.m_position.translated(xi, yi);
                        if (pos == this.m_position) continue;
                        var tile = _map.g_map.getTile(pos);
                        if (tile) {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = tile.getCreatures()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var c = _step3.value;

                                    /* todo */
                                    //if(c.isWalking() && c.getLastStepFromPosition() == this.m_position && c.getStepProgress() < 0.75) {
                                    creature = c;
                                    //}
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return creature;
        }
    }, {
        key: "getTopMoveThing",
        value: function getTopMoveThing() {
            if (this.isEmpty()) return null;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop() && !thing.isCreature()) {
                    if (i > 0 && thing.isNotMoveable()) return this.m_things[i - 1];
                    return thing;
                }
            }
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.m_things[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _thing2 = _step4.value;

                    if (_thing2.isCreature()) return _thing2;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return this.m_things[0];
        }
    }, {
        key: "getTopMultiUseThing",
        value: function getTopMultiUseThing() {
            if (this.isEmpty()) return null;
            var topCreature = this.getTopCreature();
            if (topCreature) return topCreature;
            for (var i = 0; i < this.m_things.length; ++i) {
                var thing = this.m_things[i];
                if (thing.isForceUse()) return thing;
            }
            for (var _i2 = 0; _i2 < this.m_things.length; ++_i2) {
                var _thing3 = this.m_things[_i2];
                if (!_thing3.isGround() && !_thing3.isGroundBorder() && !_thing3.isOnBottom() && !_thing3.isOnTop()) {
                    if (_i2 > 0 && _thing3.isSplash()) return this.m_things[_i2 - 1];
                    return _thing3;
                }
            }
            for (var _i3 = 0; _i3 < this.m_things.length; ++_i3) {
                var _thing4 = this.m_things[_i3];
                if (!_thing4.isGround() && !_thing4.isOnTop()) return _thing4;
            }
            return this.m_things[0];
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return this.m_position;
        }
    }, {
        key: "getDrawElevation",
        value: function getDrawElevation() {
            return this.m_drawElevation;
        }
    }, {
        key: "getItems",
        value: function getItems() {
            var items = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.m_things[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var thing = _step5.value;

                    if (thing.isItem()) items.push(thing);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return items;
        }
    }, {
        key: "getCreatures",
        value: function getCreatures() {
            var creatures = [];
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.m_things[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var thing = _step6.value;

                    if (thing.isCreature()) creatures.push(thing);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return creatures;
        }
    }, {
        key: "getWalkingCreatures",
        value: function getWalkingCreatures() {
            return this.m_walkingCreatures;
        }
    }, {
        key: "getThings",
        value: function getThings() {
            return this.m_things;
        }
    }, {
        key: "getGround",
        value: function getGround() {
            var firstObject = this.getThing(0);
            if (!firstObject) return null;
            if (firstObject.isGround() && firstObject.isItem()) return firstObject;
            return null;
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            var groundSpeed = 100;
            var ground = this.getGround();
            if (ground) groundSpeed = ground.getGroundSpeed();
            return groundSpeed;
        }
    }, {
        key: "getMinimapColorByte",
        value: function getMinimapColorByte() {
            var color = 255; // alpha
            if (this.m_minimapColor != 0) return this.m_minimapColor;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.m_things[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var thing = _step7.value;

                    if (!thing.isGround() && !thing.isGroundBorder() && !thing.isOnBottom() && !thing.isOnTop()) break;
                    var c = thing.getMinimapColor();
                    if (c != 0) color = c;
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return color;
        }
    }, {
        key: "getThingCount",
        value: function getThingCount() {
            return this.m_things.length + this.m_effects.length;
        }
    }, {
        key: "isPathable",
        value: function isPathable() {
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.m_things[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var thing = _step8.value;

                    if (thing.isNotPathable()) return false;
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isWalkable",
        value: function isWalkable() {
            var ignoreCreatures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!this.getGround()) return false;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.m_things[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var thing = _step9.value;

                    if (thing.isNotWalkable()) return false;
                    if (!ignoreCreatures) {
                        if (thing.isCreature()) {
                            var creature = thing;
                            /* todo */
                            //if(!creature.isPassable() && creature.canBeSeen())
                            return false;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            var ground = this.getGround();
            if (ground && ground.isFullGround()) return true;
            return false;
        }
    }, {
        key: "isFullyOpaque",
        value: function isFullyOpaque() {
            var firstObject = this.getThing(0);
            return firstObject && firstObject.isFullGround();
        }
    }, {
        key: "isSingleDimension",
        value: function isSingleDimension() {
            if (this.m_walkingCreatures.length > 0) return false;
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.m_things[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var thing = _step10.value;

                    if (thing.getHeight() != 1 || thing.getWidth() != 1) return false;
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isLookPossible",
        value: function isLookPossible() {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = this.m_things[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var thing = _step11.value;

                    if (thing.blockProjectile()) return false;
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return true;
        }
    }, {
        key: "isClickable",
        value: function isClickable() {
            var hasGround = false;
            var hasOnBottom = false;
            var hasIgnoreLook = false;
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = this.m_things[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var thing = _step12.value;

                    if (thing.isGround()) hasGround = true;
                    if (thing.isOnBottom()) hasOnBottom = true;
                    if ((hasGround || hasOnBottom) && !hasIgnoreLook) return true;
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            return false;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.m_things.length == 0;
        }
    }, {
        key: "isDrawable",
        value: function isDrawable() {
            return this.m_things.length > 0 || this.m_walkingCreatures.length > 0 || this.m_effects.length > 0;
        }
    }, {
        key: "hasTranslucentLight",
        value: function hasTranslucentLight() {
            return (this.m_flags & _const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT) > 0;
        }
    }, {
        key: "mustHookSouth",
        value: function mustHookSouth() {
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.m_things[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var thing = _step13.value;

                    if (thing.isHookSouth()) return true;
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return false;
        }
    }, {
        key: "mustHookEast",
        value: function mustHookEast() {
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = this.m_things[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var thing = _step14.value;

                    if (thing.isHookEast()) return true;
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }

            return false;
        }
    }, {
        key: "hasCreature",
        value: function hasCreature() {
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.m_things[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var thing = _step15.value;

                    if (thing.isCreature()) return true;
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return false;
        }
    }, {
        key: "limitsFloorsView",
        value: function limitsFloorsView() {
            var isFreeView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // ground and walls limits the view
            var firstThing = this.getThing(0);
            if (isFreeView) {
                if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || firstThing.isOnBottom())) return true;
            } else if (firstThing && !firstThing.isDontHide() && (firstThing.isGround() || firstThing.isOnBottom() && firstThing.blockProjectile())) return true;
            return false;
        }
    }, {
        key: "canErase",
        value: function canErase() {
            return this.m_walkingCreatures.length == 0 && this.m_effects.length == 0 && this.m_things.length == 0 && this.m_flags == 0 && this.m_minimapColor == 0;
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            var elevation = 0;
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = this.m_things[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var thing = _step16.value;

                    if (thing.getElevation() > 0) elevation++;
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            return elevation;
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            var elevation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return this.getElevation() >= elevation;
        }
    }, {
        key: "overwriteMinimapColor",
        value: function overwriteMinimapColor(color) {
            this.m_minimapColor = color;
        }
    }, {
        key: "remFlag",
        value: function remFlag(flag) {
            this.m_flags &= ~flag;
        }
    }, {
        key: "setFlag",
        value: function setFlag(flag) {
            this.m_flags |= flag;
        }
    }, {
        key: "setFlags",
        value: function setFlags(flags) {
            this.m_flags = flags;
        }
    }, {
        key: "hasFlag",
        value: function hasFlag(flag) {
            return (this.m_flags & flag) == flag;
        }
    }, {
        key: "getFlags",
        value: function getFlags() {
            return this.m_flags;
        }
    }, {
        key: "checkTranslucentLight",
        value: function checkTranslucentLight() {
            if (this.m_position.z != _const.Otc.SEA_FLOOR) return;
            var downPos = this.m_position.clone();
            if (!downPos.down()) return;
            var tile = _map.g_map.getOrCreateTile(downPos);
            if (!tile) return;
            var translucent = false;
            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = this.m_things[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var thing = _step17.value;

                    if (thing.isTranslucent() || thing.hasLensHelp()) {
                        translucent = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError17 = true;
                _iteratorError17 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
                        _iterator17.return();
                    }
                } finally {
                    if (_didIteratorError17) {
                        throw _iteratorError17;
                    }
                }
            }

            if (translucent) tile.m_flags |= _const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT;else tile.m_flags &= ~_const.Tilestate.TILESTATE_TRANSLUECENT_LIGHT;
        }
    }]);

    return Tile;
}();

Tile.MAX_THINGS = 10;

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ThingType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(11);

var _game = __webpack_require__(49);

var _log = __webpack_require__(44);

var _animator = __webpack_require__(357);

var _color = __webpack_require__(51);

var _thingtypeattribs = __webpack_require__(358);

var _size = __webpack_require__(143);

var _point = __webpack_require__(71);

var _marketdata = __webpack_require__(359);

var _light = __webpack_require__(100);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;

var ThingType = exports.ThingType = function () {
    function ThingType() {
        _classCallCheck(this, ThingType);

        this.m_id = 0;
        this.m_null = true;
        this.m_attribs = new _thingtypeattribs.ThingTypeAttribs();
        this.m_size = new _size.Size();
        this.m_displacement = new _point.Point();
        this.m_animator = null;
        this.m_animationPhases = 0;
        this.m_exactSize = 0;
        this.m_realSize = 0;
        this.m_numPatternX = 0;
        this.m_numPatternY = 0;
        this.m_numPatternZ = 0;
        this.m_layers = 0;
        this.m_elevation = 0;
        this.m_opacity = 1.0;
        this.m_spritesIndex = [];
    }

    _createClass(ThingType, [{
        key: "unserialize",
        value: function unserialize(clientId, category, fin) {
            this.m_null = false;
            this.m_id = clientId;
            this.m_category = category;
            //console.log('load', clientId, fin.getReadPos(), fin.data.buffer.slice(fin.getReadPos()));
            var count = 0;
            var attr = -1;
            var done = false;
            for (var i = 0; i < _const.ThingAttr.ThingLastAttr; ++i) {
                count++;
                attr = fin.getU8();
                if (attr == _const.ThingAttr.ThingLastAttr) {
                    done = true;
                    break;
                }
                if (_game.g_game.getClientVersion() >= 1000) {
                    /* In 10.10+ all attributes from 16 and up were
                     * incremented by 1 to make space for 16 as
                     * "No Movement Animation" flag.
                     */
                    if (attr == 16) attr = _const.ThingAttr.ThingAttrNoMoveAnimation;else if (attr > 16) attr -= 1;
                } else if (_game.g_game.getClientVersion() >= 860) {
                    /* Default attribute values follow
                     * the format of 8.6-9.86.
                     * Therefore no changes here.
                     */
                } else if (_game.g_game.getClientVersion() >= 780) {
                    /* In 7.80-8.54 all attributes from 8 and higher were
                     * incremented by 1 to make space for 8 as
                     * "Item Charges" flag.
                     */
                    if (attr == 8) {
                        this.m_attribs.set(_const.ThingAttr.ThingAttrChargeable, true);
                        continue;
                    } else if (attr > 8) attr -= 1;
                } else if (_game.g_game.getClientVersion() >= 755) {
                    /* In 7.55-7.72 attributes 23 is "Floor Change". */
                    if (attr == 23) attr = _const.ThingAttr.ThingAttrFloorChange;
                } else if (_game.g_game.getClientVersion() >= 740) {
                    /* In 7.4-7.5 attribute "Ground Border" did not exist
                     * attributes 1-15 have to be adjusted.
                     * Several other changes in the format.
                     */
                    if (attr > 0 && attr <= 15) attr += 1;else if (attr == 16) attr = _const.ThingAttr.ThingAttrLight;else if (attr == 17) attr = _const.ThingAttr.ThingAttrFloorChange;else if (attr == 18) attr = _const.ThingAttr.ThingAttrFullGround;else if (attr == 19) attr = _const.ThingAttr.ThingAttrElevation;else if (attr == 20) attr = _const.ThingAttr.ThingAttrDisplacement;else if (attr == 22) attr = _const.ThingAttr.ThingAttrMinimapColor;else if (attr == 23) attr = _const.ThingAttr.ThingAttrRotateable;else if (attr == 24) attr = _const.ThingAttr.ThingAttrLyingCorpse;else if (attr == 25) attr = _const.ThingAttr.ThingAttrHangable;else if (attr == 26) attr = _const.ThingAttr.ThingAttrHookSouth;else if (attr == 27) attr = _const.ThingAttr.ThingAttrHookEast;else if (attr == 28) attr = _const.ThingAttr.ThingAttrAnimateAlways;
                    /* "Multi Use" and "Force Use" are swapped */
                    if (attr == _const.ThingAttr.ThingAttrMultiUse) attr = _const.ThingAttr.ThingAttrForceUse;else if (attr == _const.ThingAttr.ThingAttrForceUse) attr = _const.ThingAttr.ThingAttrMultiUse;
                }
                switch (attr) {
                    case _const.ThingAttr.ThingAttrDisplacement:
                        {
                            this.m_displacement = new _point.Point(0, 0);
                            if (_game.g_game.getClientVersion() >= 755) {
                                this.m_displacement.x = fin.getU16();
                                this.m_displacement.y = fin.getU16();
                            } else {
                                this.m_displacement.x = 8;
                                this.m_displacement.y = 8;
                            }
                            this.m_attribs.set(attr, true);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrLight:
                        {
                            var light = new _light.Light();
                            light.intensity = fin.getU16();
                            light.color = fin.getU16();
                            this.m_attribs.set(attr, light);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrMarket:
                        {
                            var market = new _marketdata.MarketData();
                            market.category = fin.getU16();
                            market.tradeAs = fin.getU16();
                            market.showAs = fin.getU16();
                            market.name = fin.getString();
                            market.restrictVocation = fin.getU16();
                            market.requiredLevel = fin.getU16();
                            this.m_attribs.set(attr, market);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrElevation:
                        {
                            this.m_elevation = fin.getU16();
                            this.m_attribs.set(attr, this.m_elevation);
                            break;
                        }
                    case _const.ThingAttr.ThingAttrUsable:
                    case _const.ThingAttr.ThingAttrGround:
                    case _const.ThingAttr.ThingAttrWritable:
                    case _const.ThingAttr.ThingAttrWritableOnce:
                    case _const.ThingAttr.ThingAttrMinimapColor:
                    case _const.ThingAttr.ThingAttrCloth:
                    case _const.ThingAttr.ThingAttrLensHelp:
                        this.m_attribs.set(attr, fin.getU16());
                        break;
                    default:
                        this.m_attribs.set(attr, true);
                        break;
                }
            }
            if (!done) (0, _log.error)("corrupt data (id: %d, category: %d, count: %d, lastAttr: %d)", this.m_id, this.m_category, count, attr);
            var hasFrameGroups = category == _const.ThingCategory.ThingCategoryCreature && _game.g_game.getFeature(_const.GameFeature.GameIdleAnimations);
            var groupCount = hasFrameGroups ? fin.getU8() : 1;
            this.m_animationPhases = 0;
            var totalSpritesCount = 0;
            for (var _i = 0; _i < groupCount; ++_i) {
                var frameGroupType = _const.FrameGroupType.FrameGroupDefault;
                if (hasFrameGroups) frameGroupType = fin.getU8();
                var width = fin.getU8();
                var height = fin.getU8();
                this.m_size = new _size.Size(width, height);
                if (width > 1 || height > 1) {
                    this.m_realSize = fin.getU8();
                    this.m_exactSize = Math.min(this.m_realSize, Math.max(width * 32, height * 32));
                } else this.m_exactSize = 32;
                this.m_layers = fin.getU8();
                this.m_numPatternX = fin.getU8();
                this.m_numPatternY = fin.getU8();
                if (_game.g_game.getClientVersion() >= 755) this.m_numPatternZ = fin.getU8();else this.m_numPatternZ = 1;
                var groupAnimationsPhases = fin.getU8();
                this.m_animationPhases += groupAnimationsPhases;
                if (groupAnimationsPhases > 1 && _game.g_game.getFeature(_const.GameFeature.GameEnhancedAnimations)) {
                    this.m_animator = new _animator.Animator();
                    this.m_animator.unserialize(groupAnimationsPhases, fin);
                }
                var totalSprites = this.m_size.area() * this.m_layers * this.m_numPatternX * this.m_numPatternY * this.m_numPatternZ * groupAnimationsPhases;
                if (totalSpritesCount + totalSprites > 4096) (0, _log.error)("a thing type has more than 4096 sprites", totalSprites, totalSpritesCount, this.m_size.area(), this.m_layers, this.m_numPatternX, this.m_numPatternY, this.m_numPatternZ, groupAnimationsPhases);
                this.m_spritesIndex = [];
                for (var _i2 = totalSpritesCount; _i2 < totalSpritesCount + totalSprites; _i2++) {
                    this.m_spritesIndex[_i2] = _game.g_game.getFeature(_const.GameFeature.GameSpritesU32) ? fin.getU32() : fin.getU16();
                }totalSpritesCount += totalSprites;
            }
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "getCategory",
        value: function getCategory() {
            return this.m_category;
        }
    }, {
        key: "isNull",
        value: function isNull() {
            return this.m_null;
        }
    }, {
        key: "hasAttr",
        value: function hasAttr(attr) {
            return this.m_attribs.has(attr);
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this.m_size;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.m_size.width();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.m_size.height();
        }
    }, {
        key: "getExactSize",
        value: function getExactSize() {
            var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var xPattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var yPattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var zPattern = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var animationPhase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            /* todo */
            return 0;
        }
    }, {
        key: "getRealSize",
        value: function getRealSize() {
            return this.m_realSize;
        }
    }, {
        key: "getLayers",
        value: function getLayers() {
            return this.m_layers;
        }
    }, {
        key: "getNumPatternX",
        value: function getNumPatternX() {
            return this.m_numPatternX;
        }
    }, {
        key: "getNumPatternY",
        value: function getNumPatternY() {
            return this.m_numPatternY;
        }
    }, {
        key: "getNumPatternZ",
        value: function getNumPatternZ() {
            return this.m_numPatternZ;
        }
    }, {
        key: "getAnimationPhases",
        value: function getAnimationPhases() {
            return this.m_animationPhases;
        }
    }, {
        key: "getAnimator",
        value: function getAnimator() {
            return this.m_animator;
        }
    }, {
        key: "getDisplacement",
        value: function getDisplacement() {
            return this.m_displacement;
        }
    }, {
        key: "getDisplacementX",
        value: function getDisplacementX() {
            return this.getDisplacement().x;
        }
    }, {
        key: "getDisplacementY",
        value: function getDisplacementY() {
            return this.getDisplacement().y;
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            return this.m_elevation;
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrGround);
        }
    }, {
        key: "getMaxTextLength",
        value: function getMaxTextLength() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritableOnce) ? this.m_attribs.get(_const.ThingAttr.ThingAttrWritableOnce) : this.m_attribs.get(_const.ThingAttr.ThingAttrWritable);
        }
    }, {
        key: "getLight",
        value: function getLight() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrLight);
        }
    }, {
        key: "getMinimapColor",
        value: function getMinimapColor() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrMinimapColor);
        }
    }, {
        key: "getLensHelp",
        value: function getLensHelp() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrLensHelp);
        }
    }, {
        key: "getClothSlot",
        value: function getClothSlot() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrCloth);
        }
    }, {
        key: "getMarketData",
        value: function getMarketData() {
            return this.m_attribs.get(_const.ThingAttr.ThingAttrMarket);
        }
    }, {
        key: "isGround",
        value: function isGround() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrGround);
        }
    }, {
        key: "isGroundBorder",
        value: function isGroundBorder() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrGroundBorder);
        }
    }, {
        key: "isOnBottom",
        value: function isOnBottom() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrOnBottom);
        }
    }, {
        key: "isOnTop",
        value: function isOnTop() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrOnTop);
        }
    }, {
        key: "isContainer",
        value: function isContainer() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrContainer);
        }
    }, {
        key: "isStackable",
        value: function isStackable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrStackable);
        }
    }, {
        key: "isForceUse",
        value: function isForceUse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrForceUse);
        }
    }, {
        key: "isMultiUse",
        value: function isMultiUse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMultiUse);
        }
    }, {
        key: "isWritable",
        value: function isWritable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritable);
        }
    }, {
        key: "isChargeable",
        value: function isChargeable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrChargeable);
        }
    }, {
        key: "isWritableOnce",
        value: function isWritableOnce() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWritableOnce);
        }
    }, {
        key: "isFluidContainer",
        value: function isFluidContainer() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrFluidContainer);
        }
    }, {
        key: "isSplash",
        value: function isSplash() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrSplash);
        }
    }, {
        key: "isNotWalkable",
        value: function isNotWalkable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotWalkable);
        }
    }, {
        key: "isNotMoveable",
        value: function isNotMoveable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotMoveable);
        }
    }, {
        key: "blockProjectile",
        value: function blockProjectile() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrBlockProjectile);
        }
    }, {
        key: "isNotPathable",
        value: function isNotPathable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotPathable);
        }
    }, {
        key: "isPickupable",
        value: function isPickupable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrPickupable);
        }
    }, {
        key: "isHangable",
        value: function isHangable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHangable);
        }
    }, {
        key: "isHookSouth",
        value: function isHookSouth() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHookSouth);
        }
    }, {
        key: "isHookEast",
        value: function isHookEast() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrHookEast);
        }
    }, {
        key: "isRotateable",
        value: function isRotateable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrRotateable);
        }
    }, {
        key: "hasLight",
        value: function hasLight() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLight);
        }
    }, {
        key: "isDontHide",
        value: function isDontHide() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrDontHide);
        }
    }, {
        key: "isTranslucent",
        value: function isTranslucent() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrTranslucent);
        }
    }, {
        key: "hasDisplacement",
        value: function hasDisplacement() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrDisplacement);
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrElevation);
        }
    }, {
        key: "isLyingCorpse",
        value: function isLyingCorpse() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLyingCorpse);
        }
    }, {
        key: "isAnimateAlways",
        value: function isAnimateAlways() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrAnimateAlways);
        }
    }, {
        key: "hasMiniMapColor",
        value: function hasMiniMapColor() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMinimapColor);
        }
    }, {
        key: "hasLensHelp",
        value: function hasLensHelp() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLensHelp);
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrFullGround);
        }
    }, {
        key: "isIgnoreLook",
        value: function isIgnoreLook() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrLook);
        }
    }, {
        key: "isCloth",
        value: function isCloth() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrCloth);
        }
    }, {
        key: "isMarketable",
        value: function isMarketable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrMarket);
        }
    }, {
        key: "isUsable",
        value: function isUsable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrUsable);
        }
    }, {
        key: "isWrapable",
        value: function isWrapable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrWrapable);
        }
    }, {
        key: "isUnwrapable",
        value: function isUnwrapable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrUnwrapable);
        }
    }, {
        key: "isTopEffect",
        value: function isTopEffect() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrTopEffect);
        }
    }, {
        key: "getSprites",
        value: function getSprites() {
            return this.m_spritesIndex;
        }
        // additional

    }, {
        key: "getOpacity",
        value: function getOpacity() {
            return this.m_opacity;
        }
    }, {
        key: "isNotPreWalkable",
        value: function isNotPreWalkable() {
            return this.m_attribs.has(_const.ThingAttr.ThingAttrNotPreWalkable);
        }
    }, {
        key: "setPathable",
        value: function setPathable(v) {
            if (v == true) this.m_attribs.remove(_const.ThingAttr.ThingAttrNotPathable);else this.m_attribs.set(_const.ThingAttr.ThingAttrNotPathable, true);
        }
    }]);

    return ThingType;
}();

ThingType.maskColors = [_color.Color.red, _color.Color.green, _color.Color.blue, _color.Color.yellow];

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Animator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animator = exports.Animator = function () {
    function Animator() {
        _classCallCheck(this, Animator);

        this.m_animationPhases = 0;
        this.m_startPhase = 0;
        this.m_loopCount = 0;
        this.m_async = false;
        this.m_phaseDurations = [];
        this.m_currentDuration = 0;
        this.m_currentDirection = _const.AnimationDirection.AnimDirForward;
        this.m_currentLoop = 0;
        this.m_lastPhaseTicks = 0;
        this.m_isComplete = false;
        this.m_phase = 0;
    }

    _createClass(Animator, [{
        key: "unserialize",
        value: function unserialize(animationPhases, fin) {
            this.m_animationPhases = animationPhases;
            this.m_async = fin.getU8() == 0;
            this.m_loopCount = fin.get32();
            this.m_startPhase = fin.get8();
            for (var i = 0; i < this.m_animationPhases; ++i) {
                var minimum = fin.getU32();
                var maximum = fin.getU32();
                this.m_phaseDurations.push([minimum, maximum]);
            }
        }
    }, {
        key: "getPhase",
        value: function getPhase() {
            return this.m_phase;
        }
    }]);

    return Animator;
}();

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThingTypeAttribs = exports.ThingTypeAttribs = function () {
    function ThingTypeAttribs() {
        _classCallCheck(this, ThingTypeAttribs);

        this.attribs = {};
    }

    _createClass(ThingTypeAttribs, [{
        key: "has",
        value: function has(attr) {
            return this.attribs.hasOwnProperty(attr.toString());
        }
    }, {
        key: "get",
        value: function get(attr) {
            return this.attribs[attr];
        }
    }, {
        key: "set",
        value: function set(attr, value) {
            //console.log(attr, value);
            this.attribs[attr] = value;
        }
    }, {
        key: "remove",
        value: function remove(attr) {
            delete this.attribs[attr];
        }
    }]);

    return ThingTypeAttribs;
}();

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarketData = exports.MarketData = function MarketData() {
  _classCallCheck(this, MarketData);
};

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputFile = undefined;

var _binarydatareader = __webpack_require__(102);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputFile = exports.InputFile = function (_BinaryDataReader) {
  _inherits(InputFile, _BinaryDataReader);

  function InputFile() {
    _classCallCheck(this, InputFile);

    return _possibleConstructorReturn(this, (InputFile.__proto__ || Object.getPrototypeOf(InputFile)).apply(this, arguments));
  }

  return InputFile;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProtocolGame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _protocol = __webpack_require__(362);

var _game = __webpack_require__(49);

var _const = __webpack_require__(11);

var _log = __webpack_require__(44);

var _proto = __webpack_require__(146);

var _inputmessage = __webpack_require__(147);

var _outfit = __webpack_require__(145);

var _thing = __webpack_require__(43);

var _position = __webpack_require__(99);

var _item = __webpack_require__(363);

var _statictext = __webpack_require__(364);

var _thingtypemanager = __webpack_require__(50);

var _map = __webpack_require__(70);

var _effect = __webpack_require__(365);

var _animatedtext = __webpack_require__(366);

var _missile = __webpack_require__(367);

var _color2 = __webpack_require__(51);

var _player = __webpack_require__(141);

var _light = __webpack_require__(100);

var _npc = __webpack_require__(368);

var _monster = __webpack_require__(369);

var _awarerange = __webpack_require__(142);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProtocolGame = exports.ProtocolGame = function (_Protocol) {
    _inherits(ProtocolGame, _Protocol);

    function ProtocolGame(game) {
        _classCallCheck(this, ProtocolGame);

        var _this = _possibleConstructorReturn(this, (ProtocolGame.__proto__ || Object.getPrototypeOf(ProtocolGame)).call(this));

        _this.m_gameInitialized = false;
        _this.m_mapKnown = false;
        return _this;
    }

    _createClass(ProtocolGame, [{
        key: "login",
        value: function login(accountName, accountPassword, host, port, characterName, authenticatorToken, sessionKey) {
            this.m_firstRecv = false;
            this.m_accountName = accountName;
            this.m_accountPassword = accountPassword;
            this.m_authenticatorToken = authenticatorToken;
            this.m_sessionKey = sessionKey;
            this.m_characterName = characterName;
            this.connect(host, port);
        }
    }, {
        key: "watch",
        value: function watch(m_movieData) {
            var i = 0;
            _log.Log.debug('start', +new Date());
            this.m_localPlayer = _game.g_game.getLocalPlayer();
            this.m_movieData = m_movieData;
            var first = 0;
            while (this.m_movieData.getUnreadSize() >= 10) {
                var timestamp = this.m_movieData.getU64();
                var s = this.m_movieData.getReadPos();
                if (this.m_movieData.getUnreadSize() >= 10) {
                    var next = this.m_movieData.peekU64();
                    //console.log('com', timestamp, next);
                    if (next - timestamp < 5000 && next - timestamp >= 0) {
                        continue;
                    }
                }
                this.m_movieData.setReadPos(s);
                var packetLength = this.m_movieData.getU16();
                var packetData = this.m_movieData.getBytes(packetLength);
                if (first === 0) first = timestamp;
                var inputMessage = new _inputmessage.InputMessage(new DataView(packetData));
                try {
                    this.parseMessage(inputMessage);
                } catch (e) {
                    // debug client, stop movie
                    break;
                }
            }
            _log.Log.debug('end', +new Date());
            console.error('loaded packets', i);
        }
    }, {
        key: "onRecv",
        value: function onRecv(inputMessage) {
            _log.Log.debug("Game onRecv", inputMessage);
            /*todo checksum, msgsize etc. why is it wrong*/
            if (this.m_firstRecv) {
                this.m_firstRecv = false;
            }
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageSizeCheck)) {
                var size = inputMessage.getU16();
                if (size != inputMessage.getUnreadSize()) {
                    _log.Log.error("invalid message size", size, inputMessage.getUnreadSize(), inputMessage);
                    return;
                }
            }
            this.parseMessage(inputMessage);
        }
    }, {
        key: "onError",
        value: function onError(evt) {
            _game.g_game.processConnectionError();
            this.disconnect();
        }
    }, {
        key: "parseMessage",
        value: function parseMessage(msg) {
            var opcode = -1;
            var prevOpcode = -1;
            try {
                while (msg.getUnreadSize() > 0) {
                    opcode = msg.getU8();
                    //Log.debug('opcode', prevOpcode, opcode);
                    if (!_game.g_game.getFeature(_const.GameFeature.GameLoginPending)) {
                        if (!this.m_gameInitialized && opcode > _proto.Proto.GameServerFirstGameOpcode) {
                            //g_game.processGameStart();
                            this.m_gameInitialized = true;
                        }
                    }
                    /*
                    // try to parse in lua first
                    int readPos = msg.getReadPos();
                    if(callLuaField<bool>("onOpcode", opcode, msg))
                        continue;
                    else
                        msg.setReadPos(readPos); // restore read pos
                    */
                    switch (opcode) {
                        case _proto.Proto.GameServerLoginOrPendingState:
                            /*
                            if(g_game.getFeature(GameFeature.GameLoginPending))
                                this.parsePendingGame(msg);
                            else
                            */
                            this.parseLogin(msg);
                            break;
                        case _proto.Proto.GameServerGMActions:
                            this.parseGMActions(msg);
                            break;
                        case _proto.Proto.GameServerUpdateNeeded:
                            this.parseUpdateNeeded(msg);
                            break;
                        case _proto.Proto.GameServerLoginError:
                            this.parseLoginError(msg);
                            break;
                        case _proto.Proto.GameServerLoginAdvice:
                            this.parseLoginAdvice(msg);
                            break;
                        case _proto.Proto.GameServerLoginWait:
                            this.parseLoginWait(msg);
                            break;
                        case _proto.Proto.GameServerLoginToken:
                            this.parseLoginToken(msg);
                            break;
                        case _proto.Proto.GameServerPing:
                        case _proto.Proto.GameServerPingBack:
                            if (opcode == _proto.Proto.GameServerPing && _game.g_game.getFeature(_const.GameFeature.GameClientPing) || opcode == _proto.Proto.GameServerPingBack && !_game.g_game.getFeature(_const.GameFeature.GameClientPing)) this.parsePingBack(msg);else this.parsePing(msg);
                            break;
                        case _proto.Proto.GameServerChallenge:
                            this.parseChallenge(msg);
                            break;
                        case _proto.Proto.GameServerDeath:
                            this.parseDeath(msg);
                            break;
                        case _proto.Proto.GameServerFullMap:
                            this.parseMapDescription(msg);
                            break;
                        case _proto.Proto.GameServerMapTopRow:
                            this.parseMapMoveNorth(msg);
                            break;
                        case _proto.Proto.GameServerMapRightRow:
                            this.parseMapMoveEast(msg);
                            break;
                        case _proto.Proto.GameServerMapBottomRow:
                            this.parseMapMoveSouth(msg);
                            break;
                        case _proto.Proto.GameServerMapLeftRow:
                            this.parseMapMoveWest(msg);
                            break;
                        case _proto.Proto.GameServerUpdateTile:
                            this.parseUpdateTile(msg);
                            break;
                        case _proto.Proto.GameServerCreateOnMap:
                            this.parseTileAddThing(msg);
                            break;
                        case _proto.Proto.GameServerChangeOnMap:
                            this.parseTileTransformThing(msg);
                            break;
                        case _proto.Proto.GameServerDeleteOnMap:
                            this.parseTileRemoveThing(msg);
                            break;
                        case _proto.Proto.GameServerMoveCreature:
                            this.parseCreatureMove(msg);
                            break;
                        case _proto.Proto.GameServerOpenContainer:
                            this.parseOpenContainer(msg);
                            break;
                        case _proto.Proto.GameServerCloseContainer:
                            this.parseCloseContainer(msg);
                            break;
                        case _proto.Proto.GameServerCreateContainer:
                            this.parseContainerAddItem(msg);
                            break;
                        case _proto.Proto.GameServerChangeInContainer:
                            this.parseContainerUpdateItem(msg);
                            break;
                        case _proto.Proto.GameServerDeleteInContainer:
                            this.parseContainerRemoveItem(msg);
                            break;
                        case _proto.Proto.GameServerSetInventory:
                            this.parseAddInventoryItem(msg);
                            break;
                        case _proto.Proto.GameServerDeleteInventory:
                            this.parseRemoveInventoryItem(msg);
                            break;
                        case _proto.Proto.GameServerOpenNpcTrade:
                            this.parseOpenNpcTrade(msg);
                            break;
                        case _proto.Proto.GameServerPlayerGoods:
                            this.parsePlayerGoods(msg);
                            break;
                        case _proto.Proto.GameServerCloseNpcTrade:
                            this.parseCloseNpcTrade(msg);
                            break;
                        case _proto.Proto.GameServerOwnTrade:
                            this.parseOwnTrade(msg);
                            break;
                        case _proto.Proto.GameServerCounterTrade:
                            this.parseCounterTrade(msg);
                            break;
                        case _proto.Proto.GameServerCloseTrade:
                            this.parseCloseTrade(msg);
                            break;
                        case _proto.Proto.GameServerAmbient:
                            this.parseWorldLight(msg);
                            break;
                        case _proto.Proto.GameServerGraphicalEffect:
                            this.parseMagicEffect(msg);
                            break;
                        case _proto.Proto.GameServerTextEffect:
                            this.parseAnimatedText(msg);
                            break;
                        case _proto.Proto.GameServerMissleEffect:
                            this.parseDistanceMissile(msg);
                            break;
                        case _proto.Proto.GameServerMarkCreature:
                            this.parseCreatureMark(msg);
                            break;
                        case _proto.Proto.GameServerTrappers:
                            this.parseTrappers(msg);
                            break;
                        case _proto.Proto.GameServerCreatureHealth:
                            this.parseCreatureHealth(msg);
                            break;
                        case _proto.Proto.GameServerCreatureLight:
                            this.parseCreatureLight(msg);
                            break;
                        case _proto.Proto.GameServerCreatureOutfit:
                            this.parseCreatureOutfit(msg);
                            break;
                        case _proto.Proto.GameServerCreatureSpeed:
                            this.parseCreatureSpeed(msg);
                            break;
                        case _proto.Proto.GameServerCreatureSkull:
                            this.parseCreatureSkulls(msg);
                            break;
                        case _proto.Proto.GameServerCreatureParty:
                            this.parseCreatureShields(msg);
                            break;
                        case _proto.Proto.GameServerCreatureUnpass:
                            this.parseCreatureUnpass(msg);
                            break;
                        case _proto.Proto.GameServerEditText:
                            this.parseEditText(msg);
                            break;
                        case _proto.Proto.GameServerEditList:
                            this.parseEditList(msg);
                            break;
                        // PROTOCOL>=1038
                        case _proto.Proto.GameServerPremiumTrigger:
                            this.parsePremiumTrigger(msg);
                            break;
                        case _proto.Proto.GameServerPlayerData:
                            this.parsePlayerStats(msg);
                            break;
                        case _proto.Proto.GameServerPlayerSkills:
                            this.parsePlayerSkills(msg);
                            break;
                        case _proto.Proto.GameServerPlayerState:
                            this.parsePlayerState(msg);
                            break;
                        case _proto.Proto.GameServerClearTarget:
                            this.parsePlayerCancelAttack(msg);
                            break;
                        case _proto.Proto.GameServerPlayerModes:
                            this.parsePlayerModes(msg);
                            break;
                        case _proto.Proto.GameServerTalk:
                            this.parseTalk(msg);
                            break;
                        case _proto.Proto.GameServerChannels:
                            this.parseChannelList(msg);
                            break;
                        case _proto.Proto.GameServerOpenChannel:
                            this.parseOpenChannel(msg);
                            break;
                        case _proto.Proto.GameServerOpenPrivateChannel:
                            this.parseOpenPrivateChannel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationChannel:
                            this.parseRuleViolationChannel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationRemove:
                            this.parseRuleViolationRemove(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationCancel:
                            this.parseRuleViolationCancel(msg);
                            break;
                        case _proto.Proto.GameServerRuleViolationLock:
                            this.parseRuleViolationLock(msg);
                            break;
                        case _proto.Proto.GameServerOpenOwnChannel:
                            this.parseOpenOwnPrivateChannel(msg);
                            break;
                        case _proto.Proto.GameServerCloseChannel:
                            this.parseCloseChannel(msg);
                            break;
                        case _proto.Proto.GameServerTextMessage:
                            this.parseTextMessage(msg);
                            break;
                        case _proto.Proto.GameServerCancelWalk:
                            this.parseCancelWalk(msg);
                            break;
                        case _proto.Proto.GameServerWalkWait:
                            this.parseWalkWait(msg);
                            break;
                        case _proto.Proto.GameServerFloorChangeUp:
                            this.parseFloorChangeUp(msg);
                            break;
                        case _proto.Proto.GameServerFloorChangeDown:
                            this.parseFloorChangeDown(msg);
                            break;
                        case _proto.Proto.GameServerChooseOutfit:
                            this.parseOpenOutfitWindow(msg);
                            break;
                        case _proto.Proto.GameServerVipAdd:
                            this.parseVipAdd(msg);
                            break;
                        case _proto.Proto.GameServerVipState:
                            this.parseVipState(msg);
                            break;
                        case _proto.Proto.GameServerVipLogout:
                            this.parseVipLogout(msg);
                            break;
                        case _proto.Proto.GameServerTutorialHint:
                            this.parseTutorialHint(msg);
                            break;
                        case _proto.Proto.GameServerAutomapFlag:
                            this.parseAutomapFlag(msg);
                            break;
                        case _proto.Proto.GameServerQuestLog:
                            this.parseQuestLog(msg);
                            break;
                        case _proto.Proto.GameServerQuestLine:
                            this.parseQuestLine(msg);
                            break;
                        // PROTOCOL>=870
                        case _proto.Proto.GameServerSpellDelay:
                            this.parseSpellCooldown(msg);
                            break;
                        case _proto.Proto.GameServerSpellGroupDelay:
                            this.parseSpellGroupCooldown(msg);
                            break;
                        case _proto.Proto.GameServerMultiUseDelay:
                            this.parseMultiUseCooldown(msg);
                            break;
                        // PROTOCOL>=910
                        case _proto.Proto.GameServerChannelEvent:
                            this.parseChannelEvent(msg);
                            break;
                        case _proto.Proto.GameServerItemInfo:
                            this.parseItemInfo(msg);
                            break;
                        case _proto.Proto.GameServerPlayerInventory:
                            this.parsePlayerInventory(msg);
                            break;
                        // PROTOCOL>=950
                        case _proto.Proto.GameServerPlayerDataBasic:
                            this.parsePlayerInfo(msg);
                            break;
                        // PROTOCOL>=970
                        case _proto.Proto.GameServerModalDialog:
                            this.parseModalDialog(msg);
                            break;
                        // PROTOCOL>=980
                        case _proto.Proto.GameServerLoginSuccess:
                            this.parseLogin(msg);
                            break;
                        case _proto.Proto.GameServerEnterGame:
                            this.parseEnterGame(msg);
                            break;
                        case _proto.Proto.GameServerPlayerHelpers:
                            this.parsePlayerHelpers(msg);
                            break;
                        // PROTOCOL>=1000
                        case _proto.Proto.GameServerCreatureMarks:
                            this.parseCreaturesMark(msg);
                            break;
                        case _proto.Proto.GameServerCreatureType:
                            this.parseCreatureType(msg);
                            break;
                        // PROTOCOL>=1055
                        case _proto.Proto.GameServerBlessings:
                            this.parseBlessings(msg);
                            break;
                        case _proto.Proto.GameServerUnjustifiedStats:
                            this.parseUnjustifiedStats(msg);
                            break;
                        case _proto.Proto.GameServerPvpSituations:
                            this.parsePvpSituations(msg);
                            break;
                        case _proto.Proto.GameServerPreset:
                            this.parsePreset(msg);
                            break;
                        // PROTOCOL>=1080
                        case _proto.Proto.GameServerCoinBalanceUpdating:
                            this.parseCoinBalanceUpdating(msg);
                            break;
                        case _proto.Proto.GameServerCoinBalance:
                            this.parseCoinBalance(msg);
                            break;
                        case _proto.Proto.GameServerRequestPurchaseData:
                            this.parseRequestPurchaseData(msg);
                            break;
                        case _proto.Proto.GameServerStoreCompletePurchase:
                            this.parseCompleteStorePurchase(msg);
                            break;
                        case _proto.Proto.GameServerStoreOffers:
                            this.parseStoreOffers(msg);
                            break;
                        case _proto.Proto.GameServerStoreTransactionHistory:
                            this.parseStoreTransactionHistory(msg);
                            break;
                        case _proto.Proto.GameServerStoreError:
                            this.parseStoreError(msg);
                            break;
                        case _proto.Proto.GameServerStore:
                            this.parseStore(msg);
                            break;
                        // PROTOCOL>=1097
                        case _proto.Proto.GameServerStoreButtonIndicators:
                            this.parseStoreButtonIndicators(msg);
                            break;
                        case _proto.Proto.GameServerSetStoreDeepLink:
                            this.parseSetStoreDeepLink(msg);
                            break;
                        // otclient ONLY
                        case _proto.Proto.GameServerExtendedOpcode:
                            this.parseExtendedOpcode(msg);
                            break;
                        case _proto.Proto.GameServerChangeMapAwareRange:
                            this.parseChangeMapAwareRange(msg);
                            break;
                        case 55:
                            return;
                        default:
                            _log.Log.error("unhandled opcode %d", opcode, msg);
                            throw new Error('opcode');
                    }
                    prevOpcode = opcode;
                }
            } catch (e) {
                _log.Log.error("ProtocolGame parse message exception (%d bytes unread, last opcode is %d, prev opcode is %d): %s", msg.getUnreadSize(), opcode, prevOpcode, e);
                throw new Error('parser');
            }
        }
    }, {
        key: "parseLogin",
        value: function parseLogin(msg) {
            var playerId = msg.getU32();
            var serverBeat = msg.getU16();
            var canReportBugs = msg.getU8();
            if (_game.g_game.getClientVersion() >= 1054) msg.getU8(); // can change pvp frame option
            if (_game.g_game.getClientVersion() >= 1058) {
                var expertModeEnabled = msg.getU8();
                //g_game.setExpertPvpMode(expertModeEnabled);
            }
            if (_game.g_game.getFeature(_const.GameFeature.GameIngameStore)) {
                // URL to ingame store images
                msg.getString();
                // premium coin package size
                // e.g you can only buy packs of 25, 50, 75, .. coins in the market
                msg.getU16();
            }
            this.m_localPlayer.setId(playerId);
            _log.Log.error('local pid', playerId);
            //g_game.setServerBeat(serverBeat);
            //g_game.setCanReportBugs(canReportBugs);
            //g_game.processLogin();
        }
    }, {
        key: "parsePendingGame",
        value: function parsePendingGame(msg) {
            //set player to pending game state
            //g_game.processPendingGame();
        }
    }, {
        key: "parseEnterGame",
        value: function parseEnterGame(msg) {
            //set player to entered game state
            //g_game.processEnterGame();
            if (!this.m_gameInitialized) {
                //g_game.processGameStart();
                this.m_gameInitialized = true;
            }
        }
    }, {
        key: "parseStoreButtonIndicators",
        value: function parseStoreButtonIndicators(msg) {
            msg.getU8(); // unknown
            msg.getU8(); // unknown
        }
    }, {
        key: "parseSetStoreDeepLink",
        value: function parseSetStoreDeepLink(msg) {
            var currentlyFeaturedServiceType = msg.getU8();
        }
    }, {
        key: "parseBlessings",
        value: function parseBlessings(msg) {
            var blessings = msg.getU16();
            this.m_localPlayer.setBlessings(blessings);
        }
    }, {
        key: "parsePreset",
        value: function parsePreset(msg) {
            var preset = msg.getU32();
        }
    }, {
        key: "parseRequestPurchaseData",
        value: function parseRequestPurchaseData(msg) {
            var transactionId = msg.getU32();
            var productType = msg.getU8();
        }
    }, {
        key: "parseStore",
        value: function parseStore(msg) {
            this.parseCoinBalance(msg);
            // Parse all categories
            var count = msg.getU16();
            for (var i = 0; i < count; i++) {
                var category = msg.getString();
                var description = msg.getString();
                var highlightState = 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights)) highlightState = msg.getU8();
                var icons = [];
                var iconCount = msg.getU8();
                for (var _i = 0; _i < iconCount; _i++) {
                    var icon = msg.getString();
                    icons.push(icon);
                }
                // If this is a valid category name then
                // the category we just parsed is a child of that
                var parentCategory = msg.getString();
            }
        }
    }, {
        key: "parseCoinBalance",
        value: function parseCoinBalance(msg) {
            var update = msg.getU8() == 1;
            var coins = -1;
            var transferableCoins = -1;
            if (update) {
                // amount of coins that can be used to buy prodcuts
                // in the ingame store
                coins = msg.getU32();
                // amount of coins that can be sold in market
                // or be transfered to another player
                transferableCoins = msg.getU32();
            }
        }
    }, {
        key: "parseCoinBalanceUpdating",
        value: function parseCoinBalanceUpdating(msg) {
            // coin balance can be updating and might not be accurate
            var isUpdating = msg.getU8() == 1;
        }
    }, {
        key: "parseCompleteStorePurchase",
        value: function parseCompleteStorePurchase(msg) {
            // not used
            msg.getU8();
            var message = msg.getString();
            var coins = msg.getU32();
            var transferableCoins = msg.getU32();
            _log.Log.debug("Purchase Complete: %s", message);
        }
    }, {
        key: "parseStoreTransactionHistory",
        value: function parseStoreTransactionHistory(msg) {
            var currentPage = void 0;
            if (_game.g_game.getClientVersion() <= 1096) {
                currentPage = msg.getU16();
                var hasNextPage = msg.getU8() == 1;
            } else {
                currentPage = msg.getU32();
                var pageCount = msg.getU32();
            }
            var entries = msg.getU8();
            for (var i = 0; i < entries; i++) {
                var time = msg.getU16();
                var productType = msg.getU8();
                var coinChange = msg.getU32();
                var productName = msg.getString();
                _log.Log.debug("Time %i, type %i, change %i, product name %s", time, productType, coinChange, productName);
            }
        }
    }, {
        key: "parseStoreOffers",
        value: function parseStoreOffers(msg) {
            var categoryName = msg.getString();
            var offers = msg.getU16();
            for (var i = 0; i < offers; i++) {
                var offerId = msg.getU32();
                var offerName = msg.getString();
                var offerDescription = msg.getString();
                var price = msg.getU32();
                var highlightState = msg.getU8();
                if (highlightState == 2 && _game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights) && _game.g_game.getClientVersion() >= 1097) {
                    var saleValidUntilTimestamp = msg.getU32();
                    var basePrice = msg.getU32();
                }
                var disabledState = msg.getU8();
                var disabledReason = "";
                if (_game.g_game.getFeature(_const.GameFeature.GameIngameStoreHighlights) && disabledState == 1) {
                    disabledReason = msg.getString();
                }
                var icons = msg.getU8();
                for (var j = 0; j < icons; j++) {
                    var icon = msg.getString();
                }
                var subOffers = msg.getU16();
                for (var _j = 0; _j < subOffers; _j++) {
                    var name = msg.getString();
                    var description = msg.getString();
                    var subIcons = msg.getU8();
                    for (var k = 0; k < subIcons; k++) {
                        var _icon = msg.getString();
                    }
                    var serviceType = msg.getString();
                }
            }
        }
    }, {
        key: "parseStoreError",
        value: function parseStoreError(msg) {
            var errorType = msg.getU8();
            var message = msg.getString();
            _log.Log.error("Store Error: %s [%i]", message, errorType);
        }
    }, {
        key: "parseUnjustifiedStats",
        value: function parseUnjustifiedStats(msg) {
            var unjustifiedPoints = void 0;
            unjustifiedPoints.killsDay = msg.getU8();
            unjustifiedPoints.killsDayRemaining = msg.getU8();
            unjustifiedPoints.killsWeek = msg.getU8();
            unjustifiedPoints.killsWeekRemaining = msg.getU8();
            unjustifiedPoints.killsMonth = msg.getU8();
            unjustifiedPoints.killsMonthRemaining = msg.getU8();
            unjustifiedPoints.skullTime = msg.getU8();
            //g_game.setUnjustifiedPoints(unjustifiedPoints);
        }
    }, {
        key: "parsePvpSituations",
        value: function parsePvpSituations(msg) {
            var openPvpSituations = msg.getU8();
            //g_game.setOpenPvpSituations(openPvpSituations);
        }
    }, {
        key: "parsePlayerHelpers",
        value: function parsePlayerHelpers(msg) {
            var id = msg.getU32();
            var helpers = msg.getU16();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) {
                //g_game.processPlayerHelpers(helpers);
            } else _log.Log.error("could not get creature with id %d", id);
        }
    }, {
        key: "parseGMActions",
        value: function parseGMActions(msg) {
            var actions = [];
            var numViolationReasons = void 0;
            if (_game.g_game.getClientVersion() >= 850) numViolationReasons = 20;else if (_game.g_game.getClientVersion() >= 840) numViolationReasons = 23;else numViolationReasons = 32;
            for (var i = 0; i < numViolationReasons; ++i) {
                actions.push(msg.getU8());
            }_log.Log.debug(numViolationReasons, actions);
            //g_game.processGMActions(actions);
        }
    }, {
        key: "parseUpdateNeeded",
        value: function parseUpdateNeeded(msg) {
            var signature = msg.getString();
            //g_game.processUpdateNeeded(signature);
        }
    }, {
        key: "parseLoginError",
        value: function parseLoginError(msg) {
            var error = msg.getString();
            _log.Log.error('login error', error);
            //g_game.processLoginError(error);
        }
    }, {
        key: "parseLoginAdvice",
        value: function parseLoginAdvice(msg) {
            var message = msg.getString();
            //g_game.processLoginAdvice(message);
        }
    }, {
        key: "parseLoginWait",
        value: function parseLoginWait(msg) {
            var message = msg.getString();
            var time = msg.getU8();
            //g_game.processLoginWait(message, time);
        }
    }, {
        key: "parseLoginToken",
        value: function parseLoginToken(msg) {
            var unknown = msg.getU8() == 0;
            //g_game.processLoginToken(unknown);
        }
    }, {
        key: "parsePing",
        value: function parsePing(msg) {
            //this.sendPingBack();
        }
    }, {
        key: "parsePingBack",
        value: function parsePingBack(msg) {
            //g_game.processPingBack();
        }
    }, {
        key: "parseChallenge",
        value: function parseChallenge(msg) {
            var timestamp = msg.getU32();
            var random = msg.getU8();
        }
    }, {
        key: "parseDeath",
        value: function parseDeath(msg) {
            var penality = 100;
            var deathType = _const.DeathType.DeathRegular;
            if (_game.g_game.getFeature(_const.GameFeature.GameDeathType)) deathType = msg.getU8();
            if (_game.g_game.getFeature(_const.GameFeature.GamePenalityOnDeath) && deathType == _const.DeathType.DeathRegular) penality = msg.getU8();
            //g_game.processDeath(deathType, penality);
        }
    }, {
        key: "parseMapDescription",
        value: function parseMapDescription(msg) {
            var pos = this.getPosition(msg);
            if (!this.m_mapKnown) this.m_localPlayer.setPosition(pos);
            _map.g_map.setCentralPosition(pos);
            //Log.debug(this.m_localPlayer, g_map.getCentralPosition());
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), range.vertical());
            if (!this.m_mapKnown) {
                this.m_mapKnown = true;
            }
            //g_dispatcher.addEvent([] { g_lua.callGlobalField("g_game", "onMapDescription"); });
        }
    }, {
        key: "parseMapMoveNorth",
        value: function parseMapMoveNorth(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.y--;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, range.horizontal(), 1);
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveEast",
        value: function parseMapMoveEast(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.x++;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x + range.right, pos.y - range.top, pos.z, 1, range.vertical());
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveSouth",
        value: function parseMapMoveSouth(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.y++;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y + range.bottom, pos.z, range.horizontal(), 1);
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseMapMoveWest",
        value: function parseMapMoveWest(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            pos.x--;
            var range = _map.g_map.getAwareRange();
            this.setMapDescription(msg, pos.x - range.left, pos.y - range.top, pos.z, 1, range.vertical());
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseUpdateTile",
        value: function parseUpdateTile(msg) {
            var tilePos = this.getPosition(msg);
            this.setTileDescription(msg, tilePos);
        }
    }, {
        key: "parseTileAddThing",
        value: function parseTileAddThing(msg) {
            var pos = this.getPosition(msg);
            var stackPos = -1;
            if (_game.g_game.getClientVersion() >= 841) stackPos = msg.getU8();
            var thing = this.getThing(msg);
            _map.g_map.addThing(thing, pos, stackPos);
        }
    }, {
        key: "parseTileTransformThing",
        value: function parseTileTransformThing(msg) {
            var thing = this.getMappedThing(msg);
            var newThing = this.getThing(msg);
            if (!thing) {
                _log.Log.error("no thing");
                return;
            }
            var pos = thing.getPosition();
            var stackpos = thing.getStackPos();
            if (!_map.g_map.removeThing(thing)) {
                _log.Log.error("unable to remove thing");
                return;
            }
            _map.g_map.addThing(newThing, pos, stackpos);
        }
    }, {
        key: "parseTileRemoveThing",
        value: function parseTileRemoveThing(msg) {
            var thing = this.getMappedThing(msg);
            if (!thing) {
                _log.Log.error("no thing");
                return;
            }
            if (!_map.g_map.removeThing(thing)) _log.Log.error("unable to remove thing");
        }
    }, {
        key: "parseCreatureMove",
        value: function parseCreatureMove(msg) {
            var thing = this.getMappedThing(msg);
            var newPos = this.getPosition(msg);
            if (!thing || !thing.isCreature()) {
                _log.Log.error("no creature found to move", thing);
                return;
            }
            if (!_map.g_map.removeThing(thing)) {
                _log.Log.error("unable to remove creature");
                return;
            }
            var creature = thing;
            creature.allowAppearWalk();
            //Log.debug('creature move', creature, g_map.getTile(newPos).m_things);
            _map.g_map.addThing(thing, newPos, -1);
        }
    }, {
        key: "parseOpenContainer",
        value: function parseOpenContainer(msg) {
            var containerId = msg.getU8();
            var containerItem = this.getItem(msg);
            var name = msg.getString();
            var capacity = msg.getU8();
            var hasParent = msg.getU8() != 0;
            var isUnlocked = true;
            var hasPages = false;
            var containerSize = 0;
            var firstIndex = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                isUnlocked = msg.getU8() != 0; // drag and drop
                hasPages = msg.getU8() != 0; // pagination
                containerSize = msg.getU16(); // container size
                firstIndex = msg.getU16(); // first index
            }
            var itemCount = msg.getU8();
            var items = [];
            for (var i = 0; i < itemCount; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processOpenContainer(containerId, containerItem, name, capacity, hasParent, items, isUnlocked, hasPages, containerSize, firstIndex);
        }
    }, {
        key: "parseCloseContainer",
        value: function parseCloseContainer(msg) {
            var containerId = msg.getU8();
            //g_game.processCloseContainer(containerId);
        }
    }, {
        key: "parseContainerAddItem",
        value: function parseContainerAddItem(msg) {
            var containerId = msg.getU8();
            var slot = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16(); // slot
            }
            var item = this.getItem(msg);
            //g_game.processContainerAddItem(containerId, item, slot);
        }
    }, {
        key: "parseContainerUpdateItem",
        value: function parseContainerUpdateItem(msg) {
            var containerId = msg.getU8();
            var slot = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16();
            } else {
                slot = msg.getU8();
            }
            var item = this.getItem(msg);
            //g_game.processContainerUpdateItem(containerId, slot, item);
        }
    }, {
        key: "parseContainerRemoveItem",
        value: function parseContainerRemoveItem(msg) {
            var containerId = msg.getU8();
            var slot = void 0;
            var lastItem = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameContainerPagination)) {
                slot = msg.getU16();
                var itemId = msg.getU16();
                if (itemId != 0) lastItem = this.getItem(msg, itemId);
            } else {
                slot = msg.getU8();
            }
            //g_game.processContainerRemoveItem(containerId, slot, lastItem);
        }
    }, {
        key: "parseAddInventoryItem",
        value: function parseAddInventoryItem(msg) {
            var slot = msg.getU8();
            var item = this.getItem(msg);
            //g_game.processInventoryChange(slot, item);
        }
    }, {
        key: "parseRemoveInventoryItem",
        value: function parseRemoveInventoryItem(msg) {
            var slot = msg.getU8();
            //g_game.processInventoryChange(slot, new Item());
        }
    }, {
        key: "parseOpenNpcTrade",
        value: function parseOpenNpcTrade(msg) {
            var items = [];
            var npcName = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameNameOnNpcTrade)) npcName = msg.getString();
            var listCount = void 0;
            if (_game.g_game.getClientVersion() >= 900) listCount = msg.getU16();else listCount = msg.getU8();
            for (var i = 0; i < listCount; ++i) {
                var itemId = msg.getU16();
                var count = msg.getU8();
                var item = new _item.Item(itemId);
                item.setCountOrSubType(count);
                var name = msg.getString();
                var weight = msg.getU32();
                var buyPrice = msg.getU32();
                var sellPrice = msg.getU32();
                items.push([item, name, weight, buyPrice, sellPrice]);
            }
            //g_game.processOpenNpcTrade(items);
        }
    }, {
        key: "parsePlayerGoods",
        value: function parsePlayerGoods(msg) {
            var goods = [];
            var money = void 0;
            if (_game.g_game.getClientVersion() >= 973) money = msg.getU64();else money = msg.getU32();
            var size = msg.getU8();
            for (var i = 0; i < size; i++) {
                var itemId = msg.getU16();
                var amount = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameDoubleShopSellAmount)) amount = msg.getU16();else amount = msg.getU8();
                goods.push([new _item.Item(itemId), amount]);
            }
            //g_game.processPlayerGoods(money, goods);
        }
    }, {
        key: "parseCloseNpcTrade",
        value: function parseCloseNpcTrade(msg) {
            //g_game.processCloseNpcTrade();
        }
    }, {
        key: "parseOwnTrade",
        value: function parseOwnTrade(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            var count = msg.getU8();
            var items = [];
            for (var i = 0; i < count; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processOwnTrade(name, items);
        }
    }, {
        key: "parseCounterTrade",
        value: function parseCounterTrade(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            var count = msg.getU8();
            var items = [];
            for (var i = 0; i < count; i++) {
                items[i] = this.getItem(msg);
            } //g_game.processCounterTrade(name, items);
        }
    }, {
        key: "parseCloseTrade",
        value: function parseCloseTrade(msg) {
            //g_game.processCloseTrade();
        }
    }, {
        key: "parseWorldLight",
        value: function parseWorldLight(msg) {
            var light = new _light.Light();
            light.intensity = msg.getU8();
            light.color = msg.getU8();
            _map.g_map.setLight(light);
        }
    }, {
        key: "parseMagicEffect",
        value: function parseMagicEffect(msg) {
            var pos = this.getPosition(msg);
            var effectId = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMagicEffectU16)) effectId = msg.getU16();else effectId = msg.getU8();
            if (!_thingtypemanager.g_things.isValidDatId(effectId, _const.ThingCategory.ThingCategoryEffect)) {
                _log.Log.error("invalid effect id %d", effectId);
                return;
            }
            var effect = new _effect.Effect();
            effect.setId(effectId);
            _map.g_map.addThing(effect, pos);
        }
    }, {
        key: "parseAnimatedText",
        value: function parseAnimatedText(msg) {
            var position = this.getPosition(msg);
            var color = msg.getU8();
            var text = msg.getString();
            var animatedText = new _animatedtext.AnimatedText();
            animatedText.setColor(color);
            animatedText.setText(text);
            _map.g_map.addThing(animatedText, position);
        }
    }, {
        key: "parseDistanceMissile",
        value: function parseDistanceMissile(msg) {
            var fromPos = this.getPosition(msg);
            var toPos = this.getPosition(msg);
            var shotId = msg.getU8();
            if (!_thingtypemanager.g_things.isValidDatId(shotId, _const.ThingCategory.ThingCategoryMissile)) {
                _log.Log.error("invalid missile id %d", shotId);
                return;
            }
            var missile = new _missile.Missile();
            missile.setId(shotId);
            missile.setPath(fromPos, toPos);
            _map.g_map.addThing(missile, fromPos);
        }
    }, {
        key: "parseCreatureMark",
        value: function parseCreatureMark(msg) {
            var id = msg.getU32();
            var color = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.addTimedSquare(color);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseTrappers",
        value: function parseTrappers(msg) {
            var numTrappers = msg.getU8();
            if (numTrappers > 8) _log.Log.error("too many trappers");
            for (var i = 0; i < numTrappers; ++i) {
                var id = msg.getU32();
                var creature = _map.g_map.getCreatureById(id);
                if (creature) {
                    //TODO: set creature as trapper
                } else _log.Log.error("could not get creature");
            }
        }
    }, {
        key: "parseCreatureHealth",
        value: function parseCreatureHealth(msg) {
            var id = msg.getU32();
            var healthPercent = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setHealthPercent(healthPercent);
        }
    }, {
        key: "parseCreatureLight",
        value: function parseCreatureLight(msg) {
            var id = msg.getU32();
            var light = new _light.Light();
            light.intensity = msg.getU8();
            light.color = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setLight(light);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureOutfit",
        value: function parseCreatureOutfit(msg) {
            var id = msg.getU32();
            var outfit = this.getOutfit(msg);
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setOutfit(outfit);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureSpeed",
        value: function parseCreatureSpeed(msg) {
            var id = msg.getU32();
            var baseSpeed = -1;
            if (_game.g_game.getClientVersion() >= 1059) baseSpeed = msg.getU16();
            var speed = msg.getU16();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) {
                creature.setSpeed(speed);
                if (baseSpeed != -1) creature.setBaseSpeed(baseSpeed);
            }
        }
    }, {
        key: "parseCreatureSkulls",
        value: function parseCreatureSkulls(msg) {
            var id = msg.getU32();
            var skull = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setSkull(skull);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureShields",
        value: function parseCreatureShields(msg) {
            var id = msg.getU32();
            var shield = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setShield(shield);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseCreatureUnpass",
        value: function parseCreatureUnpass(msg) {
            var id = msg.getU32();
            var unpass = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setPassable(!unpass);else _log.Log.error("could not get creature");
        }
    }, {
        key: "parseEditText",
        value: function parseEditText(msg) {
            var id = msg.getU32();
            var itemId = void 0;
            if (_game.g_game.getClientVersion() >= 1010) {
                // TODO: processEditText with ItemPtr as parameter
                var item = this.getItem(msg);
                itemId = item.getId();
            } else itemId = msg.getU16();
            var maxLength = msg.getU16();
            var text = msg.getString();
            var writer = msg.getString();
            var date = "";
            if (_game.g_game.getFeature(_const.GameFeature.GameWritableDate)) date = msg.getString();
            //g_game.processEditText(id, itemId, maxLength, text, writer, date);
        }
    }, {
        key: "parseEditList",
        value: function parseEditList(msg) {
            var doorId = msg.getU8();
            var id = msg.getU32();
            var text = msg.getString();
            //g_game.processEditList(id, doorId, text);
        }
    }, {
        key: "parsePremiumTrigger",
        value: function parsePremiumTrigger(msg) {
            var triggerCount = msg.getU8();
            var triggers = void 0;
            for (var i = 0; i < triggerCount; ++i) {
                triggers.push_back(msg.getU8());
            }
            if (_game.g_game.getClientVersion() <= 1096) {
                var something = msg.getU8() == 1;
            }
        }
    }, {
        key: "parsePlayerInfo",
        value: function parsePlayerInfo(msg) {
            var premium = msg.getU8(); // premium
            if (_game.g_game.getFeature(_const.GameFeature.GamePremiumExpiration)) {
                var premiumEx = msg.getU32(); // premium expiration used for premium advertisement
            }
            var vocation = msg.getU8(); // vocation
            var spellCount = msg.getU16();
            var spells = void 0;
            for (var i = 0; i < spellCount; ++i) {
                spells.push(msg.getU8());
            } // spell id
            //m_localPlayer.setPremium(premium);
            //m_localPlayer.setVocation(vocation);
            //m_localPlayer.setSpells(spells);
        }
    }, {
        key: "parsePlayerStats",
        value: function parsePlayerStats(msg) {
            var health = void 0;
            var maxHealth = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleHealth)) {
                health = msg.getU32();
                maxHealth = msg.getU32();
            } else {
                health = msg.getU16();
                maxHealth = msg.getU16();
            }
            var freeCapacity = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleFreeCapacity)) freeCapacity = msg.getU32() / 100.0;else freeCapacity = msg.getU16() / 100.0;
            var totalCapacity = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameTotalCapacity)) totalCapacity = msg.getU32() / 100.0;
            var experience = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleExperience)) experience = msg.getU64();else experience = msg.getU32();
            var level = msg.getU16();
            var levelPercent = msg.getU8();
            if (_game.g_game.getFeature(_const.GameFeature.GameExperienceBonus)) {
                if (_game.g_game.getClientVersion() <= 1096) {
                    var experienceBonus = msg.getDouble();
                } else {
                    var baseXpGain = msg.getU16();
                    var voucherAddend = msg.getU16();
                    var grindingAddend = msg.getU16();
                    var storeBoostAddend = msg.getU16();
                    var huntingBoostFactor = msg.getU16();
                }
            }
            var mana = void 0;
            var maxMana = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameDoubleHealth)) {
                mana = msg.getU32();
                maxMana = msg.getU32();
            } else {
                mana = msg.getU16();
                maxMana = msg.getU16();
            }
            var magicLevel = msg.getU8();
            var baseMagicLevel = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) baseMagicLevel = msg.getU8();else baseMagicLevel = magicLevel;
            var magicLevelPercent = msg.getU8();
            var soul = msg.getU8();
            var stamina = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerStamina)) stamina = msg.getU16();
            var baseSpeed = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) baseSpeed = msg.getU16();
            var regeneration = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerRegenerationTime)) regeneration = msg.getU16();
            var training = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameOfflineTrainingTime)) {
                training = msg.getU16();
                if (_game.g_game.getClientVersion() >= 1097) {
                    var remainingStoreXpBoostSeconds = msg.getU16();
                    var canBuyMoreStoreXpBoosts = msg.getU8();
                }
            }
            /*
            m_localPlayer.setHealth(health, maxHealth);
            m_localPlayer.setFreeCapacity(freeCapacity);
            m_localPlayer.setTotalCapacity(totalCapacity);
            m_localPlayer.setExperience(experience);
            m_localPlayer.setLevel(level, levelPercent);
            m_localPlayer.setMana(mana, maxMana);
            m_localPlayer.setMagicLevel(magicLevel, magicLevelPercent);
            m_localPlayer.setBaseMagicLevel(baseMagicLevel);
            m_localPlayer.setStamina(stamina);
            m_localPlayer.setSoul(soul);
            m_localPlayer.setBaseSpeed(baseSpeed);
            m_localPlayer.setRegenerationTime(regeneration);
            m_localPlayer.setOfflineTrainingTime(training);
            */
        }
    }, {
        key: "parsePlayerSkills",
        value: function parsePlayerSkills(msg) {
            var lastSkill = _const.Skill.Fishing + 1;
            if (_game.g_game.getFeature(_const.GameFeature.GameAdditionalSkills)) lastSkill = _const.Skill.LastSkill;
            for (var skill = 0; skill < lastSkill; skill++) {
                var level = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameDoubleSkills)) level = msg.getU16();else level = msg.getU8();
                var baseLevel = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameSkillsBase)) {
                    if (_game.g_game.getFeature(_const.GameFeature.GameBaseSkillU16)) baseLevel = msg.getU16();else baseLevel = msg.getU8();
                } else baseLevel = level;
                var levelPercent = 0;
                // Critical, Life Leech and Mana Leech have no level percent
                if (skill <= _const.Skill.Fishing) levelPercent = msg.getU8();
                /*
                    m_localPlayer.setSkill(skill, level, levelPercent);
                    m_localPlayer.setBaseSkill(skill, baseLevel);
                    */
            }
        }
    }, {
        key: "parsePlayerState",
        value: function parsePlayerState(msg) {
            var states = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerStateU16)) states = msg.getU16();else states = msg.getU8();
            //m_localPlayer.setStates(states);
        }
    }, {
        key: "parsePlayerCancelAttack",
        value: function parsePlayerCancelAttack(msg) {
            var seq = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameAttackSeq)) seq = msg.getU32();
            //g_game.processAttackCancel(seq);
        }
    }, {
        key: "parsePlayerModes",
        value: function parsePlayerModes(msg) {
            var fightMode = msg.getU8();
            var chaseMode = msg.getU8();
            var safeMode = msg.getU8();
            var pvpMode = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GamePVPMode)) pvpMode = msg.getU8();
            //g_game.processPlayerModes((Otc::FightModes)fightMode, (Otc::ChaseModes)chaseMode, safeMode, (Otc::PVPModes)pvpMode);
        }
    }, {
        key: "parseSpellCooldown",
        value: function parseSpellCooldown(msg) {
            var spellId = msg.getU8();
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onSpellCooldown", spellId, delay);
        }
    }, {
        key: "parseSpellGroupCooldown",
        value: function parseSpellGroupCooldown(msg) {
            var groupId = msg.getU8();
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onSpellGroupCooldown", groupId, delay);
        }
    }, {
        key: "parseMultiUseCooldown",
        value: function parseMultiUseCooldown(msg) {
            var delay = msg.getU32();
            //g_lua.callGlobalField("g_game", "onMultiUseCooldown", delay);
        }
    }, {
        key: "parseTalk",
        value: function parseTalk(msg) {
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageStatements)) msg.getU32(); // channel statement guid
            var name = _game.g_game.formatCreatureName(msg.getString());
            var level = 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMessageLevel)) level = msg.getU16();
            var mode = _game.g_game.translateMessageModeFromServer(msg.getU8());
            var channelId = 0;
            var pos = void 0;
            switch (mode) {
                case _const.MessageMode.MessageSay:
                case _const.MessageMode.MessageWhisper:
                case _const.MessageMode.MessageYell:
                case _const.MessageMode.MessageMonsterSay:
                case _const.MessageMode.MessageMonsterYell:
                case _const.MessageMode.MessageNpcTo:
                case _const.MessageMode.MessageBarkLow:
                case _const.MessageMode.MessageBarkLoud:
                case _const.MessageMode.MessageSpell:
                case _const.MessageMode.MessageNpcFromStartBlock:
                    pos = this.getPosition(msg);
                    break;
                case _const.MessageMode.MessageChannel:
                case _const.MessageMode.MessageChannelManagement:
                case _const.MessageMode.MessageChannelHighlight:
                case _const.MessageMode.MessageGamemasterChannel:
                    channelId = msg.getU16();
                    break;
                case _const.MessageMode.MessageNpcFrom:
                case _const.MessageMode.MessagePrivateFrom:
                case _const.MessageMode.MessageGamemasterBroadcast:
                case _const.MessageMode.MessageGamemasterPrivateFrom:
                case _const.MessageMode.MessageRVRAnswer:
                case _const.MessageMode.MessageRVRContinue:
                    break;
                case _const.MessageMode.MessageRVRChannel:
                    msg.getU32();
                    break;
                default:
                    _log.Log.error("unknown message mode %d", mode);
                    break;
            }
            var text = msg.getString();
            _game.g_game.processTalk(name, level, mode, text, channelId, pos);
        }
    }, {
        key: "parseChannelList",
        value: function parseChannelList(msg) {
            var count = msg.getU8();
            var channelList = [];
            for (var i = 0; i < count; i++) {
                var id = msg.getU16();
                var name = msg.getString();
                channelList.push([id, name]);
            }
            //g_game.processChannelList(channelList);
        }
    }, {
        key: "parseOpenChannel",
        value: function parseOpenChannel(msg) {
            var channelId = msg.getU16();
            var name = msg.getString();
            if (_game.g_game.getFeature(_const.GameFeature.GameChannelPlayerList)) {
                var joinedPlayers = msg.getU16();
                for (var i = 0; i < joinedPlayers; ++i) {
                    _game.g_game.formatCreatureName(msg.getString());
                } // player name
                var invitedPlayers = msg.getU16();
                for (var _i2 = 0; _i2 < invitedPlayers; ++_i2) {
                    _game.g_game.formatCreatureName(msg.getString());
                } // player name
            }
            _game.g_game.processOpenChannel(channelId, name);
        }
    }, {
        key: "parseOpenPrivateChannel",
        value: function parseOpenPrivateChannel(msg) {
            var name = _game.g_game.formatCreatureName(msg.getString());
            //g_game.processOpenPrivateChannel(name);
        }
    }, {
        key: "parseOpenOwnPrivateChannel",
        value: function parseOpenOwnPrivateChannel(msg) {
            var channelId = msg.getU16();
            var name = msg.getString();
            _game.g_game.processOpenOwnPrivateChannel(channelId, name);
        }
    }, {
        key: "parseCloseChannel",
        value: function parseCloseChannel(msg) {
            var channelId = msg.getU16();
            _game.g_game.processCloseChannel(channelId);
        }
    }, {
        key: "parseRuleViolationChannel",
        value: function parseRuleViolationChannel(msg) {
            var channelId = msg.getU16();
            console.log('g_game.processRuleViolationChannel', channelId);
            //g_game.processRuleViolationChannel(channelId);
        }
    }, {
        key: "parseRuleViolationRemove",
        value: function parseRuleViolationRemove(msg) {
            var name = msg.getString();
            console.log('g_game.processRuleViolationRemove', name);
            //g_game.processRuleViolationRemove(name);
        }
    }, {
        key: "parseRuleViolationCancel",
        value: function parseRuleViolationCancel(msg) {
            var name = msg.getString();
            console.log('g_game.processRuleViolationCancel', name);
            //g_game.processRuleViolationCancel(name);
        }
    }, {
        key: "parseRuleViolationLock",
        value: function parseRuleViolationLock(msg) {
            console.log('g_game.processRuleViolationLock');
            //g_game.processRuleViolationLock();
        }
    }, {
        key: "parseTextMessage",
        value: function parseTextMessage(msg) {
            var code = msg.getU8();
            var mode = _game.g_game.translateMessageModeFromServer(code);
            var text = void 0;
            switch (mode) {
                case _const.MessageMode.MessageChannelManagement:
                    {
                        var channel = msg.getU16();
                        text = msg.getString();
                        break;
                    }
                case _const.MessageMode.MessageGuild:
                case _const.MessageMode.MessagePartyManagement:
                case _const.MessageMode.MessageParty:
                    {
                        var _channel = msg.getU16();
                        text = msg.getString();
                        break;
                    }
                case _const.MessageMode.MessageDamageDealed:
                case _const.MessageMode.MessageDamageReceived:
                case _const.MessageMode.MessageDamageOthers:
                    {
                        var pos = this.getPosition(msg);
                        var value = [];
                        var color = [];
                        // physical damage
                        value[0] = msg.getU32();
                        color[0] = msg.getU8();
                        // magic damage
                        value[1] = msg.getU32();
                        color[1] = msg.getU8();
                        text = msg.getString();
                        for (var i = 0; i < 2; ++i) {
                            if (value[i] == 0) continue;
                            var animatedText = new _animatedtext.AnimatedText();
                            animatedText.setColor(color[i]);
                            animatedText.setText(value[i]);
                            _map.g_map.addThing(animatedText, pos);
                        }
                        break;
                    }
                case _const.MessageMode.MessageHeal:
                case _const.MessageMode.MessageMana:
                case _const.MessageMode.MessageExp:
                case _const.MessageMode.MessageHealOthers:
                case _const.MessageMode.MessageExpOthers:
                    {
                        var _pos = this.getPosition(msg);
                        var _value = msg.getU32();
                        var _color = msg.getU8();
                        text = msg.getString();
                        var _animatedText = new _animatedtext.AnimatedText();
                        _animatedText.setColor(_color);
                        _animatedText.setText(_value.toString());
                        _map.g_map.addThing(_animatedText, _pos);
                        break;
                    }
                case _const.MessageMode.MessageInvalid:
                    _log.Log.error("unknown message mode %d", mode);
                    break;
                default:
                    text = msg.getString();
                    break;
            }
            //g_game.processTextMessage(mode, text);
        }
    }, {
        key: "parseCancelWalk",
        value: function parseCancelWalk(msg) {
            var direction = msg.getU8();
            //g_game.processWalkCancel(direction);
        }
    }, {
        key: "parseWalkWait",
        value: function parseWalkWait(msg) {
            var millis = msg.getU16();
            //m_localPlayer.lockWalk(millis);
        }
    }, {
        key: "parseFloorChangeUp",
        value: function parseFloorChangeUp(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            var range = _map.g_map.getAwareRange();
            pos.z--;
            var skip = 0;
            if (pos.z == _const.Otc.SEA_FLOOR) for (var i = _const.Otc.SEA_FLOOR - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; i >= 0; i--) {
                skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), 8 - i, skip);
            } else if (pos.z > _const.Otc.SEA_FLOOR) skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), 3, skip);
            pos.x++;
            pos.y++;
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseFloorChangeDown",
        value: function parseFloorChangeDown(msg) {
            var pos = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameMapMovePosition)) pos = this.getPosition(msg);else pos = _map.g_map.getCentralPosition();
            var range = _map.g_map.getAwareRange();
            pos.z++;
            var skip = 0;
            if (pos.z == _const.Otc.UNDERGROUND_FLOOR) {
                var j = void 0,
                    i = void 0;
                for (i = pos.z, j = -1; i <= pos.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE; ++i, --j) {
                    skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, i, range.horizontal(), range.vertical(), j, skip);
                }
            } else if (pos.z > _const.Otc.UNDERGROUND_FLOOR && pos.z < _const.Otc.MAX_Z - 1) skip = this.setFloorDescription(msg, pos.x - range.left, pos.y - range.top, pos.z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, range.horizontal(), range.vertical(), -3, skip);
            pos.x--;
            pos.y--;
            _map.g_map.setCentralPosition(pos);
        }
    }, {
        key: "parseOpenOutfitWindow",
        value: function parseOpenOutfitWindow(msg) {
            var currentOutfit = this.getOutfit(msg);
            var outfitList = [];
            if (_game.g_game.getFeature(_const.GameFeature.GameNewOutfitProtocol)) {
                var outfitCount = msg.getU8();
                for (var i = 0; i < outfitCount; i++) {
                    var outfitId = msg.getU16();
                    var outfitName = msg.getString();
                    var outfitAddons = msg.getU8();
                    outfitList.push([outfitId, outfitName, outfitAddons]);
                }
            } else {
                var outfitStart = void 0,
                    outfitEnd = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameLooktypeU16)) {
                    outfitStart = msg.getU16();
                    outfitEnd = msg.getU16();
                } else {
                    outfitStart = msg.getU8();
                    outfitEnd = msg.getU8();
                }
                for (var _i3 = outfitStart; _i3 <= outfitEnd; _i3++) {
                    outfitList.push([_i3, "", 0]);
                }
            }
            var mountList = [];
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerMounts)) {
                var mountCount = msg.getU8();
                for (var _i4 = 0; _i4 < mountCount; ++_i4) {
                    var mountId = msg.getU16(); // mount type
                    var mountName = msg.getString(); // mount name
                    mountList.push([mountId, mountName]);
                }
            }
            //g_game.processOpenOutfitWindow(currentOutfit, outfitList, mountList);
        }
    }, {
        key: "parseVipAdd",
        value: function parseVipAdd(msg) {
            var id = void 0,
                iconId = 0,
                status = void 0;
            var name = void 0,
                desc = "";
            var notifyLogin = false;
            id = msg.getU32();
            name = _game.g_game.formatCreatureName(msg.getString());
            if (_game.g_game.getFeature(_const.GameFeature.GameAdditionalVipInfo)) {
                desc = msg.getString();
                iconId = msg.getU32();
                notifyLogin = msg.getU8() > 0;
            }
            status = msg.getU8();
            //g_game.processVipAdd(id, name, status, desc, iconId, notifyLogin);
        }
    }, {
        key: "parseVipState",
        value: function parseVipState(msg) {
            var id = msg.getU32();
            if (_game.g_game.getFeature(_const.GameFeature.GameLoginPending)) {
                var status = msg.getU8();
                //g_game.processVipStateChange(id, status);
            } else {
                    //g_game.processVipStateChange(id, 1);
                }
        }
    }, {
        key: "parseVipLogout",
        value: function parseVipLogout(msg) {
            var id = msg.getU32();
            //g_game.processVipStateChange(id, 0);
        }
    }, {
        key: "parseTutorialHint",
        value: function parseTutorialHint(msg) {
            var id = msg.getU8();
            //g_game.processTutorialHint(id);
        }
    }, {
        key: "parseAutomapFlag",
        value: function parseAutomapFlag(msg) {
            var pos = this.getPosition(msg);
            var icon = msg.getU8();
            var description = msg.getString();
            var remove = false;
            if (_game.g_game.getFeature(_const.GameFeature.GameMinimapRemove)) remove = msg.getU8() != 0;
            if (!remove) {
                //g_game.processAddAutomapFlag(pos, icon, description);
            } else {
                    //g_game.processRemoveAutomapFlag(pos, icon, description);
                }
        }
    }, {
        key: "parseQuestLog",
        value: function parseQuestLog(msg) {
            var questList = [];
            var questsCount = msg.getU16();
            for (var i = 0; i < questsCount; i++) {
                var id = msg.getU16();
                var name = msg.getString();
                var completed = msg.getU8();
                questList.push([id, name, completed]);
            }
            //g_game.processQuestLog(questList);
        }
    }, {
        key: "parseQuestLine",
        value: function parseQuestLine(msg) {
            var questMissions = [];
            var questId = msg.getU16();
            var missionCount = msg.getU8();
            for (var i = 0; i < missionCount; i++) {
                var missionName = msg.getString();
                var missionDescrition = msg.getString();
                questMissions.push([missionName, missionDescrition]);
            }
            //g_game.processQuestLine(questId, questMissions);
        }
    }, {
        key: "parseChannelEvent",
        value: function parseChannelEvent(msg) {
            msg.getU16(); // channel id
            _game.g_game.formatCreatureName(msg.getString()); // player name
            msg.getU8(); // event type
        }
    }, {
        key: "parseItemInfo",
        value: function parseItemInfo(msg) {
            var list = [];
            var size = msg.getU8();
            for (var i = 0; i < size; ++i) {
                var item = new _item.Item();
                item.setId(msg.getU16());
                item.setCountOrSubType(msg.getU8());
                var desc = msg.getString();
                list.push([item, desc]);
            }
            //g_lua.callGlobalField("g_game", "onItemInfo", list);
        }
    }, {
        key: "parsePlayerInventory",
        value: function parsePlayerInventory(msg) {
            msg.getU8(); // subtype
            /*
            let size = msg.getU16();
            for (let i = 0; i < size; ++i) {
                msg.getU16(); // id
                msg.getU8(); // subtype
                msg.getU16(); // count
            }
            */
        }
    }, {
        key: "parseModalDialog",
        value: function parseModalDialog(msg) {
            var id = msg.getU32();
            var title = msg.getString();
            var message = msg.getString();
            var sizeButtons = msg.getU8();
            var buttonList = [];
            for (var i = 0; i < sizeButtons; ++i) {
                var value = msg.getString();
                var _id = msg.getU8();
                buttonList.push([_id, value]);
            }
            var sizeChoices = msg.getU8();
            var choiceList = void 0;
            for (var _i5 = 0; _i5 < sizeChoices; ++_i5) {
                var _value2 = msg.getString();
                var _id2 = msg.getU8();
                choiceList.push_back([_id2, _value2]);
            }
            var enterButton = void 0,
                escapeButton = void 0;
            if (_game.g_game.getClientVersion() > 970) {
                escapeButton = msg.getU8();
                enterButton = msg.getU8();
            } else {
                enterButton = msg.getU8();
                escapeButton = msg.getU8();
            }
            var priority = msg.getU8() == 0x01;
            //g_game.processModalDialog(id, title, message, buttonList, enterButton, escapeButton, choiceList, priority);
        }
    }, {
        key: "parseExtendedOpcode",
        value: function parseExtendedOpcode(msg) {
            var opcode = msg.getU8();
            var buffer = msg.getString();
            /*
                if(opcode == 0)
                    m_enableSendExtendedOpcode = true;
                else if(opcode == 2)
                    parsePingBack(msg);
                else {
                    callLuaField("onExtendedOpcode", opcode, buffer);
                }
            */
        }
    }, {
        key: "parseChangeMapAwareRange",
        value: function parseChangeMapAwareRange(msg) {
            var xrange = msg.getU8();
            var yrange = msg.getU8();
            var range = new _awarerange.AwareRange();
            range.left = xrange / 2 - (xrange + 1) % 2;
            range.right = xrange / 2;
            range.top = yrange / 2 - (yrange + 1) % 2;
            range.bottom = yrange / 2;
            _map.g_map.setAwareRange(range);
            //g_lua.callGlobalField("g_game", "onMapChangeAwareRange", xrange, yrange);
        }
    }, {
        key: "parseCreaturesMark",
        value: function parseCreaturesMark(msg) {
            var len = void 0;
            if (_game.g_game.getClientVersion() >= 1035) {
                len = 1;
            } else {
                len = msg.getU8();
            }
            for (var i = 0; i < len; ++i) {
                var id = msg.getU32();
                var isPermanent = msg.getU8() != 1;
                var markType = msg.getU8();
                var creature = _map.g_map.getCreatureById(id);
                if (creature) {
                    if (isPermanent) {
                        if (markType == 0xff) creature.hideStaticSquare();else creature.showStaticSquare(_color2.Color.from8bit(markType));
                    } else creature.addTimedSquare(markType);
                } else _log.Log.error("could not get creature");
            }
        }
    }, {
        key: "parseCreatureType",
        value: function parseCreatureType(msg) {
            var id = msg.getU32();
            var type = msg.getU8();
            var creature = _map.g_map.getCreatureById(id);
            if (creature) creature.setType(type);else _log.Log.error("could not get creature");
        }
    }, {
        key: "setMapDescription",
        value: function setMapDescription(msg, x, y, z, width, height) {
            var startz = void 0;
            var endz = void 0;
            var zstep = void 0;
            if (z > _const.Otc.SEA_FLOOR) {
                startz = z - _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE;
                endz = Math.min(z + _const.Otc.AWARE_UNDEGROUND_FLOOR_RANGE, _const.Otc.MAX_Z);
                zstep = 1;
            } else {
                startz = _const.Otc.SEA_FLOOR;
                endz = 0;
                zstep = -1;
            }
            var skip = 0;
            for (var nz = startz; nz != endz + zstep; nz += zstep) {
                skip = this.setFloorDescription(msg, x, y, nz, width, height, z - nz, skip);
            }
        }
    }, {
        key: "setFloorDescription",
        value: function setFloorDescription(msg, x, y, z, width, height, offset, skip) {
            for (var nx = 0; nx < width; nx++) {
                for (var ny = 0; ny < height; ny++) {
                    var tilePos = new _position.Position(x + nx + offset, y + ny + offset, z);
                    if (skip == 0) skip = this.setTileDescription(msg, tilePos);else {
                        //Log.debug('setFloorDescription - clean', tilePos);
                        _map.g_map.cleanTile(tilePos);
                        skip--;
                    }
                }
            }
            return skip;
        }
    }, {
        key: "setTileDescription",
        value: function setTileDescription(msg, position) {
            _map.g_map.cleanTile(position);
            var gotEffect = false;
            for (var stackPos = 0; stackPos < 256; stackPos++) {
                if (msg.peekU16() >= 0xff00) {
                    //Log.debug('setTileDescription SKIP', position, stackPos, msg.peekU16() & 0xff);
                    return msg.getU16() & 0xff;
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameEnvironmentEffect) && !gotEffect) {
                    msg.getU16(); // environment effect
                    gotEffect = true;
                    continue;
                }
                if (stackPos > 10) _log.Log.error("too many things, pos=%s, stackpos=%d", position, stackPos);
                var thing = this.getThing(msg);
                _map.g_map.addThing(thing, position, stackPos);
            }
            return 0;
        }
    }, {
        key: "getOutfit",
        value: function getOutfit(msg) {
            var outfit = new _outfit.Outfit();
            var lookType = void 0;
            if (_game.g_game.getFeature(_const.GameFeature.GameLooktypeU16)) lookType = msg.getU16();else lookType = msg.getU8();
            if (lookType != 0) {
                outfit.setCategory(_const.ThingCategory.ThingCategoryCreature);
                var head = msg.getU8();
                var body = msg.getU8();
                var legs = msg.getU8();
                var feet = msg.getU8();
                var addons = 0;
                if (_game.g_game.getFeature(_const.GameFeature.GamePlayerAddons)) addons = msg.getU8();
                if (!_thingtypemanager.g_things.isValidDatId(lookType, _const.ThingCategory.ThingCategoryCreature)) {
                    _log.Log.error("invalid outfit looktype %d", lookType);
                    lookType = 0;
                }
                outfit.setId(lookType);
                outfit.setHead(head);
                outfit.setBody(body);
                outfit.setLegs(legs);
                outfit.setFeet(feet);
                outfit.setAddons(addons);
            } else {
                var lookTypeEx = msg.getU16();
                if (lookTypeEx == 0) {
                    outfit.setCategory(_const.ThingCategory.ThingCategoryEffect);
                    outfit.setAuxId(13); // invisible effect id
                } else {
                    if (!_thingtypemanager.g_things.isValidDatId(lookTypeEx, _const.ThingCategory.ThingCategoryItem)) {
                        _log.Log.error("invalid outfit looktypeex %d", lookTypeEx);
                        lookTypeEx = 0;
                    }
                    outfit.setCategory(_const.ThingCategory.ThingCategoryItem);
                    outfit.setAuxId(lookTypeEx);
                }
            }
            if (_game.g_game.getFeature(_const.GameFeature.GamePlayerMounts)) {
                var mount = msg.getU16();
                outfit.setMount(mount);
            }
            return outfit;
        }
    }, {
        key: "getThing",
        value: function getThing(msg) {
            var thing = new _thing.Thing();
            var id = msg.getU16();
            if (id == 0) _log.Log.error("invalid thing id");else if (id == _proto.Proto.UnknownCreature || id == _proto.Proto.OutdatedCreature || id == _proto.Proto.Creature) thing = this.getCreature(msg, id);else if (id == _proto.Proto.StaticText) thing = this.getStaticText(msg, id);else thing = this.getItem(msg, id);
            return thing;
        }
    }, {
        key: "getMappedThing",
        value: function getMappedThing(msg) {
            var thing = void 0;
            var x = msg.getU16();
            if (x != 0xffff) {
                var pos = new _position.Position();
                pos.x = x;
                pos.y = msg.getU16();
                pos.z = msg.getU8();
                var stackpos = msg.getU8();
                thing = _map.g_map.getThing(pos, stackpos);
                if (!thing) {
                    _log.Log.error("no thing at pos:%s, stackpos:%d", pos, stackpos, _map.g_map.getTile(pos));
                    throw new Error('no thing');
                }
            } else {
                var id = msg.getU32();
                thing = _map.g_map.getCreatureById(id);
                if (!thing) _log.Log.error("no creature with id %u", id);
            }
            return thing;
        }
    }, {
        key: "getCreature",
        value: function getCreature(msg, type) {
            //Log.debug('getCreature', type, msg);
            if (type == 0) type = msg.getU16();
            var creature = void 0;
            var known = type != _proto.Proto.UnknownCreature;
            if (type == _proto.Proto.OutdatedCreature || type == _proto.Proto.UnknownCreature) {
                if (known) {
                    var id = msg.getU32();
                    creature = _map.g_map.getCreatureById(id);
                    if (!creature) _log.Log.error("server said that a creature is known, but it's not");
                } else {
                    var removeId = msg.getU32();
                    _map.g_map.removeCreatureById(removeId);
                    var _id3 = msg.getU32();
                    var _creatureType = void 0;
                    if (_game.g_game.getClientVersion() >= 910) _creatureType = msg.getU8();else {
                        if (_id3 >= _proto.Proto.PlayerStartId && _id3 < _proto.Proto.PlayerEndId) _creatureType = _proto.Proto.CreatureTypePlayer;else if (_id3 >= _proto.Proto.MonsterStartId && _id3 < _proto.Proto.MonsterEndId) _creatureType = _proto.Proto.CreatureTypeMonster;else _creatureType = _proto.Proto.CreatureTypeNpc;
                    }
                    var name = _game.g_game.formatCreatureName(msg.getString());
                    if (_id3 == this.m_localPlayer.getId()) creature = this.m_localPlayer;else if (_creatureType == _proto.Proto.CreatureTypePlayer) {
                        // fixes a bug server side bug where GameInit is not sent and local player id is unknown
                        if (this.m_localPlayer.getId() == 0 && name == this.m_localPlayer.getName()) creature = this.m_localPlayer;else creature = new _player.Player();
                    } else if (_creatureType == _proto.Proto.CreatureTypeMonster) creature = new _monster.Monster();else if (_creatureType == _proto.Proto.CreatureTypeNpc) creature = new _npc.Npc();else _log.Log.error("creature type is invalid");
                    if (creature) {
                        creature.setId(_id3);
                        creature.setName(name);
                        _map.g_map.addCreature(creature);
                    }
                }
                var healthPercent = msg.getU8();
                var direction = msg.getU8();
                var outfit = this.getOutfit(msg);
                var light = new _light.Light();
                light.intensity = msg.getU8();
                light.color = msg.getU8();
                var speed = msg.getU16();
                var skull = msg.getU8();
                var shield = msg.getU8();
                // emblem is sent only when the creature is not known
                var emblem = -1;
                var creatureType = -1;
                var icon = -1;
                var unpass = true;
                var mark = void 0;
                if (_game.g_game.getFeature(_const.GameFeature.GameCreatureEmblems) && !known) emblem = msg.getU8();
                if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                    creatureType = msg.getU8();
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameCreatureIcons)) {
                    icon = msg.getU8();
                }
                if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                    mark = msg.getU8(); // mark
                    msg.getU16(); // helpers
                    if (creature) {
                        if (mark == 0xff) creature.hideStaticSquare();else creature.showStaticSquare(_color2.Color.from8bit(mark));
                    }
                }
                if (_game.g_game.getClientVersion() >= 854) unpass = msg.getU8() > 0;
                if (creature) {
                    creature.setHealthPercent(healthPercent);
                    creature.setDirection(direction);
                    creature.setOutfit(outfit);
                    creature.setSpeed(speed);
                    creature.setSkull(skull);
                    creature.setShield(shield);
                    creature.setPassable(!unpass);
                    creature.setLight(light);
                    if (emblem != -1) creature.setEmblem(emblem);
                    if (creatureType != -1) creature.setType(creatureType);
                    if (icon != -1) creature.setIcon(icon);
                    if (creature == this.m_localPlayer && !this.m_localPlayer.isKnown()) this.m_localPlayer.setKnown(true);
                }
            } else if (type == _proto.Proto.Creature) {
                var _id4 = msg.getU32();
                creature = _map.g_map.getCreatureById(_id4);
                if (!creature) _log.Log.error("invalid creature");
                var _direction = msg.getU8();
                if (creature) creature.turn(_direction);
                if (_game.g_game.getClientVersion() >= 953) {
                    var _unpass = msg.getU8();
                    if (creature) creature.setPassable(!_unpass);
                }
            } else {
                _log.Log.error("invalid creature opcode");
            }
            return creature;
        }
    }, {
        key: "getItem",
        value: function getItem(msg) {
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (id == 0) id = msg.getU16();
            //Log.debug('getItem', id);
            var item = new _item.Item(id);
            if (item.getId() == 0) _log.Log.error("unable to create item with invalid id %d", id);
            if (_game.g_game.getFeature(_const.GameFeature.GameThingMarks)) {
                msg.getU8(); // mark
            }
            if (item.isStackable() || item.isFluidContainer() || item.isSplash() || item.isChargeable()) item.setCountOrSubType(msg.getU8());
            if (_game.g_game.getFeature(_const.GameFeature.GameItemAnimationPhase)) {
                if (item.getAnimationPhases() > 1) {
                    // 0x00 => automatic phase
                    // 0xFE => random phase
                    // 0xFF => async phase
                    msg.getU8();
                    //item.setPhase(msg.getU8());
                }
            }
            return item;
        }
    }, {
        key: "getStaticText",
        value: function getStaticText(msg, id) {
            var colorByte = msg.getU8();
            var color = _color2.Color.from8bit(colorByte);
            var fontName = msg.getString();
            var text = msg.getString();
            var staticText = new _statictext.StaticText();
            /*
            staticText.setText(text);
            staticText.setFont(fontName);
            staticText.setColor(color);
            */
            return staticText;
        }
    }, {
        key: "getPosition",
        value: function getPosition(msg) {
            var x = msg.getU16();
            var y = msg.getU16();
            var z = msg.getU8();
            return new _position.Position(x, y, z);
        }
    }, {
        key: "getLocalPlayer",
        value: function getLocalPlayer() {
            return this.m_localPlayer;
        }
    }]);

    return ProtocolGame;
}(_protocol.Protocol);

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Protocol = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputmessage = __webpack_require__(147);

var _log = __webpack_require__(44);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Protocol = exports.Protocol = function () {
    function Protocol() {
        _classCallCheck(this, Protocol);

        this.m_xteaEncryptionEnabled = false;
        this.m_checksumEnabled = null;
        this.m_connection = null;
        this.m_xteaKey = [];
    }

    _createClass(Protocol, [{
        key: "connect",
        value: function connect(host, port) {
            var serverUrl = "ws://" + host + ":" + port;
            this.m_connection = new WebSocket(serverUrl);
            this.m_connection.binaryType = 'arraybuffer';
            var protocol = this;
            this.m_connection.onopen = function (evt) {
                console.log('m_connectiononopen', evt);
                protocol.onConnect(evt);
            };
            this.m_connection.onerror = function (evt) {
                console.log('m_connectiononerror', evt);
                protocol.onError(evt);
            };
            this.m_connection.onclose = function (evt) {
                console.log('m_connectiononclose', evt);
                protocol.onClose(evt);
            };
            this.m_connection.onmessage = function (evt) {
                console.log('m_connectiononmessage', evt);
                protocol.internalRecvData(evt);
            };
        }
    }, {
        key: "onConnect",
        value: function onConnect(evt) {
            (0, _log.log)("onConnect", evt);
        }
    }, {
        key: "onRecv",
        value: function onRecv(inputMessage) {
            (0, _log.log)("onRecv", inputMessage);
        }
    }, {
        key: "onError",
        value: function onError(evt) {
            (0, _log.log)("onError", evt);
            this.disconnect();
        }
    }, {
        key: "onClose",
        value: function onClose(evt) {
            (0, _log.log)("onClose", evt);
            this.disconnect();
        }
    }, {
        key: "send",
        value: function send(outputMessage) {
            if (this.m_xteaEncryptionEnabled) this.xteaEncrypt(outputMessage);
            if (this.m_checksumEnabled) outputMessage.writeChecksum();
            outputMessage.writeMessageSize();
            if (this.m_connection) this.m_connection.send(outputMessage.getBuffer());
        }
    }, {
        key: "internalRecvData",
        value: function internalRecvData(evt) {
            if (!this.isConnected()) {
                (0, _log.error)("received data while disconnected");
                return;
            }
            var inputMessage = new _inputmessage.InputMessage(new DataView(evt.data));
            if (this.m_checksumEnabled && !inputMessage.validateChecksum()) {
                (0, _log.error)("got a network message with invalid checksum");
                return;
            }
            if (this.m_checksumEnabled) {
                // size(2) + checksum(4)
                inputMessage.skip(6);
            }
            if (this.m_xteaEncryptionEnabled) {
                if (!this.xteaDecrypt(inputMessage)) {
                    (0, _log.error)("failed to decrypt message");
                    return;
                }
            }
            this.onRecv(inputMessage);
        }
    }, {
        key: "isConnected",
        value: function isConnected() {
            return this.m_connection && this.m_connection.readyState == WebSocket.OPEN;
        }
    }, {
        key: "isConnecting",
        value: function isConnecting() {
            return this.m_connection && this.m_connection.readyState == WebSocket.CONNECTING;
        }
    }, {
        key: "disconnect",
        value: function disconnect() {
            if (this.m_connection) {
                this.m_connection.close();
                this.m_connection = null;
            }
        }
    }, {
        key: "enableXteaEncryption",
        value: function enableXteaEncryption() {
            this.m_xteaEncryptionEnabled = true;
        }
    }, {
        key: "enableChecksum",
        value: function enableChecksum() {
            this.m_checksumEnabled = true;
        }
    }, {
        key: "xteaEncrypt",
        value: function xteaEncrypt(outputMessage) {
            return true;
        }
    }, {
        key: "xteaDecrypt",
        value: function xteaDecrypt(inputMessage) {
            return true;
        }
    }, {
        key: "generateXteaKey",
        value: function generateXteaKey() {
            throw new Error('unimplemented');
        }
    }, {
        key: "getXteaKey",
        value: function getXteaKey() {
            throw new Error('unimplemented');
        }
    }, {
        key: "setXteaKey",
        value: function setXteaKey() {
            throw new Error('unimplemented');
        }
    }]);

    return Protocol;
}();

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

var _thingtypemanager = __webpack_require__(50);

var _const = __webpack_require__(11);

var _game = __webpack_require__(49);

var _g_clock = __webpack_require__(105);

var _helpers = __webpack_require__(101);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = exports.Item = function (_Thing) {
    _inherits(Item, _Thing);

    function Item() {
        var clientId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

        _this.m_clientId = 0;
        _this.m_countOrSubType = -1;
        _this.m_async = true;
        _this.m_phase = 0;
        _this.m_lastPhase = 0;
        _this.m_clientId = clientId;
        return _this;
    }

    _createClass(Item, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        }
    }, {
        key: "calculateAnimationPhase",
        value: function calculateAnimationPhase(animate) {
            if (this.getAnimationPhases() > 1) {
                if (animate) {
                    if (this.getAnimator() != null) return (0, _helpers.toInt)(this.getAnimator().getPhase());
                    if (this.m_async) return (0, _helpers.toInt)(_g_clock.g_clock.millis() % (_const.Otc.ITEM_TICKS_PER_FRAME * this.getAnimationPhases()) / _const.Otc.ITEM_TICKS_PER_FRAME);else {
                        if (_g_clock.g_clock.millis() - this.m_lastPhase >= _const.Otc.ITEM_TICKS_PER_FRAME) {
                            this.m_phase = (this.m_phase + 1) % this.getAnimationPhases();
                            this.m_lastPhase = _g_clock.g_clock.millis();
                        }
                        return (0, _helpers.toInt)(this.m_phase);
                    }
                } else return (0, _helpers.toInt)(this.getAnimationPhases() - 1);
            }
            return 0;
        }
    }, {
        key: "calculatePatterns",
        value: function calculatePatterns(pattern) {
            // Avoid crashes with invalid items
            if (!this.isValid()) return;
            if (this.isStackable() && this.getNumPatternX() == 4 && this.getNumPatternY() == 2) {
                if (this.m_countOrSubType <= 0) {
                    pattern.x = 0;
                    pattern.y = 0;
                } else if (this.m_countOrSubType < 5) {
                    pattern.x = this.m_countOrSubType - 1;
                    pattern.y = 0;
                } else if (this.m_countOrSubType < 10) {
                    pattern.x = 0;
                    pattern.y = 1;
                } else if (this.m_countOrSubType < 25) {
                    pattern.x = 1;
                    pattern.y = 1;
                } else if (this.m_countOrSubType < 50) {
                    pattern.x = 2;
                    pattern.y = 1;
                } else {
                    pattern.x = 3;
                    pattern.y = 1;
                }
            } else if (this.isHangable()) {
                var tile = this.getTile();
                if (tile) {
                    if (tile.mustHookSouth()) pattern.x = this.getNumPatternX() >= 2 ? 1 : 0;else if (tile.mustHookEast()) pattern.x = this.getNumPatternX() >= 3 ? 2 : 0;
                }
            } else if (this.isSplash() || this.isFluidContainer()) {
                var color = _const.FluidsColor.FluidTransparent;
                if (_game.g_game.getFeature(_const.GameFeature.GameNewFluids)) {
                    switch (this.m_countOrSubType) {
                        case _const.FluidsColor.FluidNone:
                            color = _const.FluidsColor.FluidTransparent;
                            break;
                        case _const.FluidsColor.FluidWater:
                            color = _const.FluidsColor.FluidBlue;
                            break;
                        case _const.FluidsColor.FluidMana:
                            color = _const.FluidsColor.FluidPurple;
                            break;
                        case _const.FluidsColor.FluidBeer:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidOil:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidBlood:
                            color = _const.FluidsColor.FluidRed;
                            break;
                        case _const.FluidsColor.FluidSlime:
                            color = _const.FluidsColor.FluidGreen;
                            break;
                        case _const.FluidsColor.FluidMud:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidLemonade:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidMilk:
                            color = _const.FluidsColor.FluidWhite;
                            break;
                        case _const.FluidsColor.FluidWine:
                            color = _const.FluidsColor.FluidPurple;
                            break;
                        case _const.FluidsColor.FluidHealth:
                            color = _const.FluidsColor.FluidRed;
                            break;
                        case _const.FluidsColor.FluidUrine:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidRum:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidFruidJuice:
                            color = _const.FluidsColor.FluidYellow;
                            break;
                        case _const.FluidsColor.FluidCoconutMilk:
                            color = _const.FluidsColor.FluidWhite;
                            break;
                        case _const.FluidsColor.FluidTea:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        case _const.FluidsColor.FluidMead:
                            color = _const.FluidsColor.FluidBrown;
                            break;
                        default:
                            color = _const.FluidsColor.FluidTransparent;
                            break;
                    }
                } else color = this.m_countOrSubType;
                pattern.x = color % 4 % this.getNumPatternX();
                pattern.y = color / 4 % this.getNumPatternY();
            } else {
                pattern.x = this.m_position.x % this.getNumPatternX();
                pattern.y = this.m_position.y % this.getNumPatternY();
                pattern.z = this.m_position.z % this.getNumPatternZ();
            }
        }
    }, {
        key: "isItem",
        value: function isItem() {
            return true;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_clientId;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_clientId = id;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return _thingtypemanager.g_things.isValidDatId(this.m_clientId, _const.ThingCategory.ThingCategoryItem);
        }
    }, {
        key: "setCountOrSubType",
        value: function setCountOrSubType(count) {
            this.m_countOrSubType = count;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_clientId, _const.ThingCategory.ThingCategoryItem);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return this.getThingType();
        }
    }]);

    return Item;
}(_thing.Thing);

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaticText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

var _color = __webpack_require__(51);

var _const = __webpack_require__(11);

var _cachedtext = __webpack_require__(103);

var _g_clock = __webpack_require__(105);

var _map = __webpack_require__(70);

var _log = __webpack_require__(44);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticText = exports.StaticText = function (_Thing) {
    _inherits(StaticText, _Thing);

    function StaticText() {
        _classCallCheck(this, StaticText);

        var _this = _possibleConstructorReturn(this, (StaticText.__proto__ || Object.getPrototypeOf(StaticText)).apply(this, arguments));

        _this.m_yell = false;
        /*std::deque<std::pair<std::string, ticks_t>>*/
        _this.m_messages = [];
        _this.m_cachedText = new _cachedtext.CachedText();
        _this.m_updateEvent = null;
        return _this;
    }

    _createClass(StaticText, [{
        key: "getName",
        value: function getName() {
            return this.m_name;
        }
    }, {
        key: "getMessageMode",
        value: function getMessageMode() {
            return this.m_mode;
        }
    }, {
        key: "getFirstMessage",
        value: function getFirstMessage() {
            return this.m_messages[0][0];
        }
    }, {
        key: "isYell",
        value: function isYell() {
            return this.m_mode == _const.MessageMode.MessageYell || this.m_mode == _const.MessageMode.MessageMonsterYell || this.m_mode == _const.MessageMode.MessageBarkLoud;
        }
    }, {
        key: "setText",
        value: function setText(text) {
            this.m_cachedText.setText(text);
        }
    }, {
        key: "setFont",
        value: function setFont(fontName) {
            this.m_cachedText.setFont(fontName);
        }
    }, {
        key: "addMessage",
        value: function addMessage(name, mode, text) {
            if (this.m_messages.length == 0) {
                this.m_name = name;
                this.m_mode = mode;
            } else if (this.m_name != name || this.m_mode != mode) {
                return false;
            } else if (this.m_messages.length > 10) {
                this.m_messages.shift();
                clearTimeout(this.m_updateEvent);
                this.m_updateEvent = null;
            }
            var delay = Math.max(_const.Otc.STATIC_DURATION_PER_CHARACTER * text.length, _const.Otc.MIN_STATIC_TEXT_DURATION);
            if (this.isYell()) delay *= 2;
            this.m_messages.push([text, _g_clock.g_clock.millis() + delay]);
            this.compose();
            if (!this.m_updateEvent) this.scheduleUpdate();
            return true;
        }
    }, {
        key: "asStaticText",
        value: function asStaticText() {
            return this;
        }
    }, {
        key: "isStaticText",
        value: function isStaticText() {
            return true;
        }
    }, {
        key: "setColor",
        value: function setColor(color) {
            this.m_color = color;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this.m_color;
        }
    }, {
        key: "update",
        value: function update() {
            this.m_messages.shift();
            if (this.m_messages.length == 0) {
                // schedule removal
                var self = this.asStaticText();
                setTimeout(function (self) {
                    _map.g_map.removeThing(self);
                }, 0, self);
            } else {
                this.compose();
                this.scheduleUpdate();
            }
        }
    }, {
        key: "scheduleUpdate",
        value: function scheduleUpdate() {
            var delay = Math.max(this.m_messages[0][1] - _g_clock.g_clock.millis(), 0);
            var self = this.asStaticText();
            this.m_updateEvent = setTimeout(function (self) {
                self.m_updateEvent = null;
                self.update();
            }, delay, self);
        }
    }, {
        key: "compose",
        value: function compose() {
            //TODO: this could be moved to lua
            var text = void 0;
            if (this.m_mode == _const.MessageMode.MessageSay) {
                text += this.m_name;
                text += " says:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageWhisper) {
                text += this.m_name;
                text += " whispers:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageYell) {
                text += this.m_name;
                text += " yells:\n";
                this.m_color = new _color.Color(239, 239, 0);
            } else if (this.m_mode == _const.MessageMode.MessageMonsterSay || this.m_mode == _const.MessageMode.MessageMonsterYell || this.m_mode == _const.MessageMode.MessageSpell || this.m_mode == _const.MessageMode.MessageBarkLow || this.m_mode == _const.MessageMode.MessageBarkLoud) {
                this.m_color = new _color.Color(254, 101, 0);
            } else if (this.m_mode == _const.MessageMode.MessageNpcFrom || this.m_mode == _const.MessageMode.MessageNpcFromStartBlock) {
                text += this.m_name;
                text += " says:\n";
                this.m_color = new _color.Color(95, 247, 247);
            } else {
                _log.Log.error("Unknown speak type: %d", this.m_mode);
            }
            for (var i = 0; i < this.m_messages.length; ++i) {
                text += this.m_messages[i][0];
                if (i < this.m_messages.length - 1) text += "\n";
            }
            this.m_cachedText.setText(text);
            this.m_cachedText.wrapText(275);
        }
    }]);

    return StaticText;
}(_thing.Thing);

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Effect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

var _thingtypemanager = __webpack_require__(50);

var _const = __webpack_require__(11);

var _timer = __webpack_require__(104);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effect = exports.Effect = function (_Thing) {
    _inherits(Effect, _Thing);

    function Effect() {
        _classCallCheck(this, Effect);

        var _this = _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).apply(this, arguments));

        _this.m_animationTimer = new _timer.Timer();
        return _this;
    }

    _createClass(Effect, [{
        key: "isEffect",
        value: function isEffect() {
            return true;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            if (!_thingtypemanager.g_things.isValidDatId(id, _const.ThingCategory.ThingCategoryEffect)) id = 0;
            this.m_id = id;
        }
    }, {
        key: "asEffect",
        value: function asEffect() {
            return this;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_id, _const.ThingCategory.ThingCategoryEffect);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return _thingtypemanager.g_things.rawGetThingType(this.m_id, _const.ThingCategory.ThingCategoryEffect);
        }
    }, {
        key: "onAppear",
        value: function onAppear() {
            this.m_animationTimer.restart();
            this.m_phaseDuration = Effect.EFFECT_TICKS_PER_FRAME;
            // hack to fix some animation phases duration, currently there is no better solution
            if (this.m_id == 33) this.m_phaseDuration <<= 2;
            //g_dispatcher.scheduleEvent([this]() { g_map.removeThing(this); }, this.m_phaseDuration * this.getAnimationPhases());
        }
    }]);

    return Effect;
}(_thing.Thing);

Effect.EFFECT_TICKS_PER_FRAME = 75;

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimatedText = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

var _timer = __webpack_require__(104);

var _color = __webpack_require__(51);

var _cachedtext = __webpack_require__(103);

var _const = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedText = exports.AnimatedText = function (_Thing) {
    _inherits(AnimatedText, _Thing);

    function AnimatedText() {
        _classCallCheck(this, AnimatedText);

        var _this = _possibleConstructorReturn(this, (AnimatedText.__proto__ || Object.getPrototypeOf(AnimatedText)).call(this));

        _this.m_color = new _color.Color();
        _this.m_animationTimer = new _timer.Timer();
        _this.m_cachedText = new _cachedtext.CachedText();
        _this.m_cachedText.setFont("verdana-11px-rounded");
        _this.m_cachedText.setAlign(_cachedtext.CachedText.ALIGN_LEFT);
        return _this;
    }

    _createClass(AnimatedText, [{
        key: "drawText",
        value: function drawText(dest, visibleRect) {
            /* todo */
            /*
            static float tf = Otc::ANIMATED_TEXT_DURATION;
            static float tftf = Otc::ANIMATED_TEXT_DURATION * Otc::ANIMATED_TEXT_DURATION;
             Point p = dest;
            Size textSize = m_cachedText.getTextSize();
            float t = m_animationTimer.ticksElapsed();
            p.x += (24 - textSize.width() / 2);
             if(g_game.getFeature(Otc::GameDiagonalAnimatedText)) {
                p.x -= (4 * t / tf) + (8 * t * t / tftf);
            }
             p.y += 8 + (-48 * t) / tf;
            p += m_offset;
            Rect rect(p, textSize);
             if(visibleRect.contains(rect)) {
                float t0 = tf / 1.2;
                if(t > t0) {
                    Color color = m_color;
                    color.setAlpha((float)(1 - (t - t0) / (tf - t0)));
                    g_painter.setColor(color);
                }
                else
                    g_painter.setColor(m_color);
                m_cachedText.draw(rect);
            }
            */
        }
    }, {
        key: "setColor",
        value: function setColor(color) {
            this.m_color = _color.Color.from8bit(color);
        }
    }, {
        key: "setText",
        value: function setText(text) {
            //m_cachedText.setText(text);
        }
    }, {
        key: "setOffset",
        value: function setOffset(offset) {
            this.m_offset = offset;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this.m_color;
        }
    }, {
        key: "getCachedText",
        value: function getCachedText() {
            return this.m_cachedText;
        }
    }, {
        key: "getOffset",
        value: function getOffset() {
            return this.m_offset;
        }
    }, {
        key: "getTimer",
        value: function getTimer() {
            return this.m_animationTimer;
        }
    }, {
        key: "merge",
        value: function merge(other) {
            if (other.getColor() != this.m_color) return false;
            if (other.getCachedText().getFont() != this.m_cachedText.getFont()) return false;
            if (this.m_animationTimer.ticksElapsed() > _const.Otc.ANIMATED_TEXT_DURATION / 2.5) return false;
            var number = parseInt(this.m_cachedText.getText());
            var otherNumber = parseInt(other.getCachedText().getText());
            if (!isNaN(number) && !isNaN(otherNumber)) {
                this.m_cachedText.setText((number + otherNumber).toString());
                return true;
            }
            return false;
        }
    }, {
        key: "asAnimatedText",
        value: function asAnimatedText() {
            return this;
        }
    }, {
        key: "isAnimatedText",
        value: function isAnimatedText() {
            return true;
        }
    }, {
        key: "onAppear",
        value: function onAppear() {
            this.m_animationTimer.restart();
            // schedule removal
            //auto self = asAnimatedText();
            //g_dispatcher.scheduleEvent([self]() { g_map.removeThing(self); }, Otc::ANIMATED_TEXT_DURATION);
        }
    }]);

    return AnimatedText;
}(_thing.Thing);

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Missile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Missile = exports.Missile = function (_Thing) {
    _inherits(Missile, _Thing);

    function Missile() {
        _classCallCheck(this, Missile);

        return _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).apply(this, arguments));
    }

    _createClass(Missile, [{
        key: "isMissile",
        value: function isMissile() {
            return true;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "setPath",
        value: function setPath(fromPos, toPos) {}
    }]);

    return Missile;
}(_thing.Thing);

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Npc = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(98);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Npc = exports.Npc = function (_Creature) {
    _inherits(Npc, _Creature);

    function Npc() {
        _classCallCheck(this, Npc);

        return _possibleConstructorReturn(this, (Npc.__proto__ || Object.getPrototypeOf(Npc)).apply(this, arguments));
    }

    _createClass(Npc, [{
        key: "isNpc",
        value: function isNpc() {
            return true;
        }
    }]);

    return Npc;
}(_creature.Creature);

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Monster = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creature = __webpack_require__(98);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster = exports.Monster = function (_Creature) {
    _inherits(Monster, _Creature);

    function Monster() {
        _classCallCheck(this, Monster);

        return _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).apply(this, arguments));
    }

    _createClass(Monster, [{
        key: "isMonster",
        value: function isMonster() {
            return true;
        }
    }]);

    return Monster;
}(_creature.Creature);

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = exports.Container = function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, [{
        key: "setId",
        value: function setId(id) {}
    }]);

    return Container;
}();

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = undefined;

var _binarydatareader = __webpack_require__(102);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = exports.Movie = function (_BinaryDataReader) {
  _inherits(Movie, _BinaryDataReader);

  function Movie() {
    _classCallCheck(this, Movie);

    return _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).apply(this, arguments));
  }

  return Movie;
}(_binarydatareader.BinaryDataReader);

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Thing = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(70);

var _game = __webpack_require__(49);

var _log = __webpack_require__(44);

var _thingtypemanager = __webpack_require__(50);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thing = exports.Thing = function () {
    function Thing() {
        _classCallCheck(this, Thing);
    }

    _createClass(Thing, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            throw new Error('Unimplemented!');
        }
    }, {
        key: "setId",
        value: function setId(id) {}
    }, {
        key: "setPosition",
        value: function setPosition(position) {
            if (this.m_position == position) return;
            var oldPos = this.m_position;
            this.m_position = position;
            this.onPositionChange(this.m_position, oldPos);
        }
    }, {
        key: "getId",
        value: function getId() {
            return 0;
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return this.m_position;
        }
    }, {
        key: "getStackPriority",
        value: function getStackPriority() {
            if (this.isGround()) return 0;else if (this.isGroundBorder()) return 1;else if (this.isOnBottom()) return 2;else if (this.isOnTop()) return 3;else if (this.isCreature()) return 4;else return 5;
        }
    }, {
        key: "getTile",
        value: function getTile() {
            return _map.g_map.getTile(this.m_position);
        }
    }, {
        key: "getParentContainer",
        value: function getParentContainer() {
            if (this.m_position.x == 0xffff && this.m_position.y & 0x40) {
                var containerId = this.m_position.y ^ 0x40;
                return _game.g_game.getContainer(containerId);
            }
            return null;
        }
    }, {
        key: "getStackPos",
        value: function getStackPos() {
            if (this.m_position.x == 65535 && this.isItem()) return this.m_position.z;else {
                var tile = this.getTile();
                if (tile) return tile.getThingStackPos(this);else (0, _log.error)("got a thing with invalid stackpos");
            }
            return -1;
        }
    }, {
        key: "isItem",
        value: function isItem() {
            return false;
        }
    }, {
        key: "isEffect",
        value: function isEffect() {
            return false;
        }
    }, {
        key: "isMissile",
        value: function isMissile() {
            return false;
        }
    }, {
        key: "isCreature",
        value: function isCreature() {
            return false;
        }
    }, {
        key: "isNpc",
        value: function isNpc() {
            return false;
        }
    }, {
        key: "isMonster",
        value: function isMonster() {
            return false;
        }
    }, {
        key: "isPlayer",
        value: function isPlayer() {
            return false;
        }
    }, {
        key: "isLocalPlayer",
        value: function isLocalPlayer() {
            return false;
        }
    }, {
        key: "isAnimatedText",
        value: function isAnimatedText() {
            return false;
        }
    }, {
        key: "isStaticText",
        value: function isStaticText() {
            return false;
        }
        // type shortcuts

    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getNullThingType();
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return this.getThingType();
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this.rawGetThingType().getSize();
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.rawGetThingType().getWidth();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.rawGetThingType().getHeight();
        }
    }, {
        key: "getDisplacement",
        value: function getDisplacement() {
            return this.rawGetThingType().getDisplacement();
        }
    }, {
        key: "getDisplacementX",
        value: function getDisplacementX() {
            return this.rawGetThingType().getDisplacementX();
        }
    }, {
        key: "getDisplacementY",
        value: function getDisplacementY() {
            return this.rawGetThingType().getDisplacementY();
        }
    }, {
        key: "getExactSize",
        value: function getExactSize(layer, xPattern, yPattern, zPattern, animationPhase) {
            return this.rawGetThingType().getExactSize(layer, xPattern, yPattern, zPattern, animationPhase);
        }
    }, {
        key: "getLayers",
        value: function getLayers() {
            return this.rawGetThingType().getLayers();
        }
    }, {
        key: "getNumPatternX",
        value: function getNumPatternX() {
            return this.rawGetThingType().getNumPatternX();
        }
    }, {
        key: "getNumPatternY",
        value: function getNumPatternY() {
            return this.rawGetThingType().getNumPatternY();
        }
    }, {
        key: "getNumPatternZ",
        value: function getNumPatternZ() {
            return this.rawGetThingType().getNumPatternZ();
        }
    }, {
        key: "getAnimationPhases",
        value: function getAnimationPhases() {
            return this.rawGetThingType().getAnimationPhases();
        }
    }, {
        key: "getAnimator",
        value: function getAnimator() {
            return this.rawGetThingType().getAnimator();
        }
    }, {
        key: "getGroundSpeed",
        value: function getGroundSpeed() {
            return this.rawGetThingType().getGroundSpeed();
        }
    }, {
        key: "getMaxTextLength",
        value: function getMaxTextLength() {
            return this.rawGetThingType().getMaxTextLength();
        }
    }, {
        key: "getLight",
        value: function getLight() {
            return this.rawGetThingType().getLight();
        }
    }, {
        key: "getMinimapColor",
        value: function getMinimapColor() {
            return this.rawGetThingType().getMinimapColor();
        }
    }, {
        key: "getLensHelp",
        value: function getLensHelp() {
            return this.rawGetThingType().getLensHelp();
        }
    }, {
        key: "getClothSlot",
        value: function getClothSlot() {
            return this.rawGetThingType().getClothSlot();
        }
    }, {
        key: "getElevation",
        value: function getElevation() {
            return this.rawGetThingType().getElevation();
        }
    }, {
        key: "isGround",
        value: function isGround() {
            return this.rawGetThingType().isGround();
        }
    }, {
        key: "isGroundBorder",
        value: function isGroundBorder() {
            return this.rawGetThingType().isGroundBorder();
        }
    }, {
        key: "isOnBottom",
        value: function isOnBottom() {
            return this.rawGetThingType().isOnBottom();
        }
    }, {
        key: "isOnTop",
        value: function isOnTop() {
            return this.rawGetThingType().isOnTop();
        }
    }, {
        key: "isContainer",
        value: function isContainer() {
            return this.rawGetThingType().isContainer();
        }
    }, {
        key: "isStackable",
        value: function isStackable() {
            return this.rawGetThingType().isStackable();
        }
    }, {
        key: "isForceUse",
        value: function isForceUse() {
            return this.rawGetThingType().isForceUse();
        }
    }, {
        key: "isMultiUse",
        value: function isMultiUse() {
            return this.rawGetThingType().isMultiUse();
        }
    }, {
        key: "isWritable",
        value: function isWritable() {
            return this.rawGetThingType().isWritable();
        }
    }, {
        key: "isChargeable",
        value: function isChargeable() {
            return this.rawGetThingType().isChargeable();
        }
    }, {
        key: "isWritableOnce",
        value: function isWritableOnce() {
            return this.rawGetThingType().isWritableOnce();
        }
    }, {
        key: "isFluidContainer",
        value: function isFluidContainer() {
            return this.rawGetThingType().isFluidContainer();
        }
    }, {
        key: "isSplash",
        value: function isSplash() {
            return this.rawGetThingType().isSplash();
        }
    }, {
        key: "isNotWalkable",
        value: function isNotWalkable() {
            return this.rawGetThingType().isNotWalkable();
        }
    }, {
        key: "isNotMoveable",
        value: function isNotMoveable() {
            return this.rawGetThingType().isNotMoveable();
        }
    }, {
        key: "blockProjectile",
        value: function blockProjectile() {
            return this.rawGetThingType().blockProjectile();
        }
    }, {
        key: "isNotPathable",
        value: function isNotPathable() {
            return this.rawGetThingType().isNotPathable();
        }
    }, {
        key: "isPickupable",
        value: function isPickupable() {
            return this.rawGetThingType().isPickupable();
        }
    }, {
        key: "isHangable",
        value: function isHangable() {
            return this.rawGetThingType().isHangable();
        }
    }, {
        key: "isHookSouth",
        value: function isHookSouth() {
            return this.rawGetThingType().isHookSouth();
        }
    }, {
        key: "isHookEast",
        value: function isHookEast() {
            return this.rawGetThingType().isHookEast();
        }
    }, {
        key: "isRotateable",
        value: function isRotateable() {
            return this.rawGetThingType().isRotateable();
        }
    }, {
        key: "hasLight",
        value: function hasLight() {
            return this.rawGetThingType().hasLight();
        }
    }, {
        key: "isDontHide",
        value: function isDontHide() {
            return this.rawGetThingType().isDontHide();
        }
    }, {
        key: "isTranslucent",
        value: function isTranslucent() {
            return this.rawGetThingType().isTranslucent();
        }
    }, {
        key: "hasDisplacement",
        value: function hasDisplacement() {
            return this.rawGetThingType().hasDisplacement();
        }
    }, {
        key: "hasElevation",
        value: function hasElevation() {
            return this.rawGetThingType().hasElevation();
        }
    }, {
        key: "isLyingCorpse",
        value: function isLyingCorpse() {
            return this.rawGetThingType().isLyingCorpse();
        }
    }, {
        key: "isAnimateAlways",
        value: function isAnimateAlways() {
            return this.rawGetThingType().isAnimateAlways();
        }
    }, {
        key: "hasMiniMapColor",
        value: function hasMiniMapColor() {
            return this.rawGetThingType().hasMiniMapColor();
        }
    }, {
        key: "hasLensHelp",
        value: function hasLensHelp() {
            return this.rawGetThingType().hasLensHelp();
        }
    }, {
        key: "isFullGround",
        value: function isFullGround() {
            return this.rawGetThingType().isFullGround();
        }
    }, {
        key: "isIgnoreLook",
        value: function isIgnoreLook() {
            return this.rawGetThingType().isIgnoreLook();
        }
    }, {
        key: "isCloth",
        value: function isCloth() {
            return this.rawGetThingType().isCloth();
        }
    }, {
        key: "isMarketable",
        value: function isMarketable() {
            return this.rawGetThingType().isMarketable();
        }
    }, {
        key: "isUsable",
        value: function isUsable() {
            return this.rawGetThingType().isUsable();
        }
    }, {
        key: "isWrapable",
        value: function isWrapable() {
            return this.rawGetThingType().isWrapable();
        }
    }, {
        key: "isUnwrapable",
        value: function isUnwrapable() {
            return this.rawGetThingType().isUnwrapable();
        }
    }, {
        key: "isTopEffect",
        value: function isTopEffect() {
            return this.rawGetThingType().isTopEffect();
        }
    }, {
        key: "getMarketData",
        value: function getMarketData() {
            return this.rawGetThingType().getMarketData();
        }
    }, {
        key: "onPositionChange",
        value: function onPositionChange(newPos, oldPos) {}
    }, {
        key: "onAppear",
        value: function onAppear() {}
    }, {
        key: "onDisappear",
        value: function onDisappear() {}
    }]);

    return Thing;
}();

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = function log() {
    for (var _len = arguments.length, v = Array(_len), _key = 0; _key < _len; _key++) {
        v[_key] = arguments[_key];
    }

    console.log.apply(this, v);
    //$('#status').text(v.join(','));
};
var error = function error() {
    for (var _len2 = arguments.length, v = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        v[_key2] = arguments[_key2];
    }

    console.error.apply(this, v);
    //$('#status').text(v.join(','));
};

var Log = exports.Log = function () {
    function Log() {
        _classCallCheck(this, Log);
    }

    _createClass(Log, null, [{
        key: "log",
        value: function log() {
            for (var _len3 = arguments.length, v = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                v[_key3] = arguments[_key3];
            }

            console.log.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }, {
        key: "debug",
        value: function debug() {
            for (var _len4 = arguments.length, v = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                v[_key4] = arguments[_key4];
            }

            console.log.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }, {
        key: "error",
        value: function error() {
            for (var _len5 = arguments.length, v = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                v[_key5] = arguments[_key5];
            }

            console.error.apply(this, v);
            //$('#status').text(v.join(','));
        }
    }]);

    return Log;
}();

exports.log = log;
exports.error = error;

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_game = exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _localplayer = __webpack_require__(353);

var _const = __webpack_require__(11);

var _thingtypemanager = __webpack_require__(50);

var _protocolgame = __webpack_require__(361);

var _container = __webpack_require__(370);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.m_clientVersion = 0;
        this.messageModesMap = {};
        this.m_features = [];
        this.m_localPlayer = new _localplayer.LocalPlayer();
    }

    _createClass(Game, [{
        key: "processCloseChannel",
        value: function processCloseChannel(channelId) {
            //g_chat.removeTab(channelId);
        }
    }, {
        key: "processOpenChannel",
        value: function processOpenChannel(channelId, name) {
            //g_chat.addChannel(name, channelId);
        }
    }, {
        key: "processOpenOwnPrivateChannel",
        value: function processOpenOwnPrivateChannel(channelId, name) {
            //g_chat.addChannel(name, channelId);
        }
    }, {
        key: "processTalk",
        value: function processTalk(name, level, mode, message, channelId, creaturePos) {
            //console.log('Game.processTalk', name, level, mode, message, channelId, creaturePos);
            //g_chat.handleMessage(name, level, mode, message, channelId, creaturePos);
        }
    }, {
        key: "setClientVersion",
        value: function setClientVersion(version) {
            this.m_clientVersion = version;
            this.updateMessageModesMap(version);
            this.updateFeatures(version);
        }
    }, {
        key: "loadDatFile",
        value: function loadDatFile(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _thingtypemanager.g_things.loadDat(file);

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "updateMessageModesMap",
        value: function updateMessageModesMap(version) {
            this.messageModesMap = {};
            if (version >= 1094) {
                this.messageModesMap[_const.MessageMode.MessageMana] = 43;
            }
            if (version >= 1055) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 4;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 5;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 8;
                this.messageModesMap[_const.MessageMode.MessageSpell] = 9;
                this.messageModesMap[_const.MessageMode.MessageNpcFromStartBlock] = 10;
                this.messageModesMap[_const.MessageMode.MessageNpcFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 12;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 13;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 14;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 15;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 16;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 17;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 18; // Admin
                this.messageModesMap[_const.MessageMode.MessageGame] = 19;
                this.messageModesMap[_const.MessageMode.MessageGameHighlight] = 20;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 21;
                this.messageModesMap[_const.MessageMode.MessageLook] = 22;
                this.messageModesMap[_const.MessageMode.MessageDamageDealed] = 23;
                this.messageModesMap[_const.MessageMode.MessageDamageReceived] = 24;
                this.messageModesMap[_const.MessageMode.MessageHeal] = 25;
                this.messageModesMap[_const.MessageMode.MessageExp] = 26;
                this.messageModesMap[_const.MessageMode.MessageDamageOthers] = 27;
                this.messageModesMap[_const.MessageMode.MessageHealOthers] = 28;
                this.messageModesMap[_const.MessageMode.MessageExpOthers] = 29;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 30;
                this.messageModesMap[_const.MessageMode.MessageLoot] = 31;
                this.messageModesMap[_const.MessageMode.MessageTradeNpc] = 32;
                this.messageModesMap[_const.MessageMode.MessageGuild] = 33;
                this.messageModesMap[_const.MessageMode.MessagePartyManagement] = 34;
                this.messageModesMap[_const.MessageMode.MessageParty] = 35;
                this.messageModesMap[_const.MessageMode.MessageBarkLow] = 36;
                this.messageModesMap[_const.MessageMode.MessageBarkLoud] = 37;
                this.messageModesMap[_const.MessageMode.MessageReport] = 38;
                this.messageModesMap[_const.MessageMode.MessageHotkeyUse] = 39;
                this.messageModesMap[_const.MessageMode.MessageTutorialHint] = 40;
                this.messageModesMap[_const.MessageMode.MessageThankyou] = 41;
                this.messageModesMap[_const.MessageMode.MessageMarket] = 42;
            } else if (version >= 1036) {
                for (var i = _const.MessageMode.MessageNone; i <= _const.MessageMode.MessageBeyondLast; ++i) {
                    if (i >= _const.MessageMode.MessageNpcTo) this.messageModesMap[i] = i + 1;else this.messageModesMap[i] = i;
                }
            } else if (version >= 900) {
                for (var _i = _const.MessageMode.MessageNone; _i <= _const.MessageMode.MessageBeyondLast; ++_i) {
                    this.messageModesMap[_i] = _i;
                }
            } else if (version >= 861) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageNpcFrom] = 5;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 6;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 8;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 9;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 10;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 11;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 12;
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 13;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 14;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 15;
                this.messageModesMap[_const.MessageMode.MessageGame] = 16;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 17;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 18;
                this.messageModesMap[_const.MessageMode.MessageLook] = 19;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 20;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 21;
                this.messageModesMap[_const.MessageMode.MessageRed] = 22;
            } else if (version >= 840) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessageNpcTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageNpcFromStartBlock] = 5;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 6;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 6;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 7;
                this.messageModesMap[_const.MessageMode.MessageChannelManagement] = 8;
                this.messageModesMap[_const.MessageMode.MessageRVRChannel] = 9;
                this.messageModesMap[_const.MessageMode.MessageRVRAnswer] = 10;
                this.messageModesMap[_const.MessageMode.MessageRVRContinue] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 12;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 13;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 14;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 14;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 15;
                // 16, 17 ??
                this.messageModesMap[_const.MessageMode.MessageRed] = 18;
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 19;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 20;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 21;
                this.messageModesMap[_const.MessageMode.MessageGame] = 22;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 23;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 24;
                this.messageModesMap[_const.MessageMode.MessageLook] = 25;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 26;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 27;
            } else if (version >= 760) {
                this.messageModesMap[_const.MessageMode.MessageNone] = 0;
                this.messageModesMap[_const.MessageMode.MessageSay] = 1;
                this.messageModesMap[_const.MessageMode.MessageWhisper] = 2;
                this.messageModesMap[_const.MessageMode.MessageYell] = 3;
                this.messageModesMap[_const.MessageMode.MessagePrivateFrom] = 4;
                this.messageModesMap[_const.MessageMode.MessagePrivateTo] = 4;
                this.messageModesMap[_const.MessageMode.MessageChannel] = 5;
                this.messageModesMap[_const.MessageMode.MessageRVRChannel] = 6;
                this.messageModesMap[_const.MessageMode.MessageRVRAnswer] = 7;
                this.messageModesMap[_const.MessageMode.MessageRVRContinue] = 8;
                this.messageModesMap[_const.MessageMode.MessageGamemasterBroadcast] = 9;
                this.messageModesMap[_const.MessageMode.MessageGamemasterChannel] = 10;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateFrom] = 11;
                this.messageModesMap[_const.MessageMode.MessageGamemasterPrivateTo] = 11;
                this.messageModesMap[_const.MessageMode.MessageChannelHighlight] = 12;
                // 13, 14, 15 ??
                this.messageModesMap[_const.MessageMode.MessageMonsterSay] = 16;
                this.messageModesMap[_const.MessageMode.MessageMonsterYell] = 17;
                this.messageModesMap[_const.MessageMode.MessageWarning] = 18;
                this.messageModesMap[_const.MessageMode.MessageGame] = 19;
                this.messageModesMap[_const.MessageMode.MessageLogin] = 20;
                this.messageModesMap[_const.MessageMode.MessageStatus] = 21;
                this.messageModesMap[_const.MessageMode.MessageLook] = 22;
                this.messageModesMap[_const.MessageMode.MessageFailure] = 23;
                this.messageModesMap[_const.MessageMode.MessageBlue] = 24;
                this.messageModesMap[_const.MessageMode.MessageRed] = 25;
            }
        }
    }, {
        key: "updateFeatures",
        value: function updateFeatures(version) {
            this.m_features = [];
            this.enableFeature(_const.GameFeature.GameFormatCreatureName);
            if (version >= 770) {
                this.enableFeature(_const.GameFeature.GameLooktypeU16);
                this.enableFeature(_const.GameFeature.GameMessageStatements);
                this.enableFeature(_const.GameFeature.GameLoginPacketEncryption);
            }
            if (version >= 780) {
                this.enableFeature(_const.GameFeature.GamePlayerAddons);
                this.enableFeature(_const.GameFeature.GamePlayerStamina);
                this.enableFeature(_const.GameFeature.GameNewFluids);
                this.enableFeature(_const.GameFeature.GameMessageLevel);
                this.enableFeature(_const.GameFeature.GamePlayerStateU16);
                this.enableFeature(_const.GameFeature.GameNewOutfitProtocol);
            }
            if (version >= 790) {
                this.enableFeature(_const.GameFeature.GameWritableDate);
            }
            if (version >= 840) {
                this.enableFeature(_const.GameFeature.GameProtocolChecksum);
                this.enableFeature(_const.GameFeature.GameAccountNames);
                this.enableFeature(_const.GameFeature.GameDoubleFreeCapacity);
            }
            if (version >= 841) {
                this.enableFeature(_const.GameFeature.GameChallengeOnLogin);
                this.enableFeature(_const.GameFeature.GameMessageSizeCheck);
            }
            if (version >= 854) {
                this.enableFeature(_const.GameFeature.GameCreatureEmblems);
            }
            if (version >= 860) {
                this.enableFeature(_const.GameFeature.GameAttackSeq);
            }
            if (version >= 862) {
                this.enableFeature(_const.GameFeature.GamePenalityOnDeath);
            }
            if (version >= 870) {
                this.enableFeature(_const.GameFeature.GameDoubleExperience);
                this.enableFeature(_const.GameFeature.GamePlayerMounts);
                this.enableFeature(_const.GameFeature.GameSpellList);
            }
            if (version >= 910) {
                this.enableFeature(_const.GameFeature.GameNameOnNpcTrade);
                this.enableFeature(_const.GameFeature.GameTotalCapacity);
                this.enableFeature(_const.GameFeature.GameSkillsBase);
                this.enableFeature(_const.GameFeature.GamePlayerRegenerationTime);
                this.enableFeature(_const.GameFeature.GameChannelPlayerList);
                this.enableFeature(_const.GameFeature.GameEnvironmentEffect);
                this.enableFeature(_const.GameFeature.GameItemAnimationPhase);
            }
            if (version >= 940) {
                this.enableFeature(_const.GameFeature.GamePlayerMarket);
            }
            if (version >= 953) {
                this.enableFeature(_const.GameFeature.GamePurseSlot);
                this.enableFeature(_const.GameFeature.GameClientPing);
            }
            if (version >= 960) {
                this.enableFeature(_const.GameFeature.GameSpritesU32);
                this.enableFeature(_const.GameFeature.GameOfflineTrainingTime);
            }
            if (version >= 963) {
                this.enableFeature(_const.GameFeature.GameAdditionalVipInfo);
            }
            if (version >= 980) {
                this.enableFeature(_const.GameFeature.GamePreviewState);
                this.enableFeature(_const.GameFeature.GameClientVersion);
            }
            if (version >= 981) {
                this.enableFeature(_const.GameFeature.GameLoginPending);
                this.enableFeature(_const.GameFeature.GameNewSpeedLaw);
            }
            if (version >= 984) {
                this.enableFeature(_const.GameFeature.GameContainerPagination);
                this.enableFeature(_const.GameFeature.GameBrowseField);
            }
            if (version >= 1000) {
                this.enableFeature(_const.GameFeature.GameThingMarks);
                this.enableFeature(_const.GameFeature.GamePVPMode);
            }
            if (version >= 1035) {
                this.enableFeature(_const.GameFeature.GameDoubleSkills);
                this.enableFeature(_const.GameFeature.GameBaseSkillU16);
            }
            if (version >= 1036) {
                this.enableFeature(_const.GameFeature.GameCreatureIcons);
                this.enableFeature(_const.GameFeature.GameHideNpcNames);
            }
            if (version >= 1038) {
                this.enableFeature(_const.GameFeature.GamePremiumExpiration);
            }
            if (version >= 1050) {
                this.enableFeature(_const.GameFeature.GameEnhancedAnimations);
            }
            if (version >= 1053) {
                this.enableFeature(_const.GameFeature.GameUnjustifiedPoints);
            }
            if (version >= 1054) {
                this.enableFeature(_const.GameFeature.GameExperienceBonus);
            }
            if (version >= 1055) {
                this.enableFeature(_const.GameFeature.GameDeathType);
            }
            if (version >= 1057) {
                this.enableFeature(_const.GameFeature.GameIdleAnimations);
            }
            if (version >= 1061) {
                this.enableFeature(_const.GameFeature.GameOGLInformation);
            }
            if (version >= 1071) {
                this.enableFeature(_const.GameFeature.GameContentRevision);
            }
            if (version >= 1072) {
                this.enableFeature(_const.GameFeature.GameAuthenticator);
            }
            if (version >= 1074) {
                this.enableFeature(_const.GameFeature.GameSessionKey);
            }
            if (version >= 1080) {
                this.enableFeature(_const.GameFeature.GameIngameStore);
            }
            if (version >= 1092) {
                this.enableFeature(_const.GameFeature.GameIngameStoreServiceType);
            }
            if (version >= 1093) {
                this.enableFeature(_const.GameFeature.GameIngameStoreHighlights);
            }
            if (version >= 1094) {
                this.enableFeature(_const.GameFeature.GameAdditionalSkills);
            }
        }
    }, {
        key: "enableFeature",
        value: function enableFeature(feature) {
            this.m_features[feature] = true;
        }
    }, {
        key: "disableFeature",
        value: function disableFeature(feature) {
            this.m_features[feature] = false;
        }
    }, {
        key: "getFeature",
        value: function getFeature(feature) {
            return this.m_features[feature] == true;
        }
    }, {
        key: "translateMessageModeFromServer",
        value: function translateMessageModeFromServer(mode) {
            for (var i in this.messageModesMap) {
                if (this.messageModesMap[i] == mode) {
                    return parseInt(i);
                }
            }
            return _const.MessageMode.MessageInvalid;
        }
    }, {
        key: "getContainer",
        value: function getContainer(containerId) {
            return new _container.Container();
        }
    }, {
        key: "getClientVersion",
        value: function getClientVersion() {
            return this.m_clientVersion;
        }
    }, {
        key: "processConnectionError",
        value: function processConnectionError() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getLocalPlayer",
        value: function getLocalPlayer() {
            return this.m_localPlayer;
        }
    }, {
        key: "login",
        value: function login(accountName, accountPassword, characterName) {
            this.m_protocolGame = new _protocolgame.ProtocolGame(this);
            this.m_protocolGame.login(accountName, accountPassword, '127.0.0.1', 7176, characterName, '', '');
        }
    }, {
        key: "watchMovie",
        value: function watchMovie(movie) {
            this.m_protocolGame = new _protocolgame.ProtocolGame(this);
            this.m_protocolGame.watch(movie);
        }
    }, {
        key: "formatCreatureName",
        value: function formatCreatureName(string) {
            return string;
        }
    }]);

    return Game;
}();

var g_game = new Game();
exports.g_game = g_game;

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_things = exports.ThingTypeManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thingtype = __webpack_require__(356);

var _const = __webpack_require__(11);

var _log = __webpack_require__(44);

var _resources = __webpack_require__(144);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var nullThingType = new _thingtype.ThingType();

var ThingTypeManager = exports.ThingTypeManager = function () {
    function ThingTypeManager() {
        _classCallCheck(this, ThingTypeManager);

        this.m_nullThingType = new _thingtype.ThingType();
        this.m_thingTypes = null;
        this.m_datLoaded = false;
        this.m_datSignature = 0;
        this.m_contentRevision = 0;
        this.m_thingTypes = [];
        for (var i = _const.ThingCategory.ThingCategoryItem; i < _const.ThingCategory.ThingLastCategory; ++i) {
            this.m_thingTypes[i] = [];
        }
    }

    _createClass(ThingTypeManager, [{
        key: "getThingType",
        value: function getThingType(id, category) {
            if (category >= _const.ThingCategory.ThingLastCategory || id >= this.m_thingTypes[category].length) {
                _log.Log.error("invalid thing type client id %d in category %d", id, category);
                return this.m_nullThingType;
            }
            return this.m_thingTypes[category][id];
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType(id, category) {
            return this.getThingType(id, category);
        }
    }, {
        key: "isValidDatId",
        value: function isValidDatId(id, category) {
            return true;
        }
    }, {
        key: "getNullThingType",
        value: function getNullThingType() {
            return nullThingType;
        }
    }, {
        key: "getContentRevision",
        value: function getContentRevision() {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "loadDat",
        value: function loadDat(file) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var fin, category, count, thingCount, _category, firstId, id, type;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.m_datLoaded = false;
                                this.m_datSignature = 0;
                                this.m_contentRevision = 0;
                                _context.prev = 3;

                                console.log(new Date().getTime(), this.m_thingTypes);
                                _context.next = 7;
                                return _resources.g_resources.openFile(file);

                            case 7:
                                fin = _context.sent;

                                this.m_datSignature = fin.getU32();
                                this.m_contentRevision = this.m_datSignature & 0xFFFF;
                                for (category = _const.ThingCategory.ThingCategoryItem; category < _const.ThingCategory.ThingLastCategory; ++category) {
                                    count = fin.getU16() + 1;

                                    this.m_thingTypes[category] = [];
                                    for (thingCount = 0; thingCount < count; ++thingCount) {
                                        this.m_thingTypes[category][thingCount] = nullThingType;
                                    }
                                }
                                for (_category = 0; _category < _const.ThingCategory.ThingLastCategory; ++_category) {
                                    firstId = 1;

                                    if (_category == _const.ThingCategory.ThingCategoryItem) firstId = 100;
                                    for (id = firstId; id < this.m_thingTypes[_category].length; ++id) {
                                        type = new _thingtype.ThingType();

                                        type.unserialize(id, _category, fin);
                                        this.m_thingTypes[_category][id] = type;
                                    }
                                }
                                this.m_datLoaded = true;
                                console.log(new Date().getTime(), this.m_thingTypes);
                                //g_lua.callGlobalField("g_things", "onLoadDat", file);
                                return _context.abrupt("return", true);

                            case 17:
                                _context.prev = 17;
                                _context.t0 = _context["catch"](3);

                                _log.Log.error("Failed to read dat '%s': %s'", file, _context.t0);
                                return _context.abrupt("return", false);

                            case 21:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 17]]);
            }));
        }
    }]);

    return ThingTypeManager;
}();

var g_things = new ThingTypeManager();
exports.g_things = g_things;

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = exports.Color = function () {
    //Color() : m_r(1.0f), m_g(1.0f), m_b(1.0f), m_a(1.0f) { }
    //Color(uint32 rgba) { setRGBA(rgba); }
    function Color() {
        _classCallCheck(this, Color);

        if (arguments.length == 0) {
            this.m_r = 1;
            this.m_g = 1;
            this.m_b = 1;
            this.m_a = 1;
            return;
        } else if (arguments.length == 1) {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number') {
                this.setRGBA(arguments.length <= 0 ? undefined : arguments[0]);
                return;
            }
        } else if (arguments.length == 3) {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'number' && typeof (arguments.length <= 1 ? undefined : arguments[1]) == 'number' && typeof (arguments.length <= 2 ? undefined : arguments[2]) == 'number') {
                var r = (arguments.length <= 0 ? undefined : arguments[0]) / 255;
                var g = (arguments.length <= 1 ? undefined : arguments[1]) / 255;
                var b = (arguments.length <= 2 ? undefined : arguments[2]) / 255;
                this.m_r = r;
                this.m_g = g;
                this.m_b = b;
                this.m_a = 1;
                return;
            }
        }
        throw new Error('Unhandled constructor');
    }

    _createClass(Color, [{
        key: 'equals',
        value: function equals(otherColor) {
            return this.m_r == otherColor.m_r && this.m_g == otherColor.m_g && this.m_b == otherColor.m_b && this.m_a == otherColor.m_a;
        }
    }, {
        key: 'clone',
        value: function clone() {
            var color = new Color();
            color.m_r = this.m_r;
            color.m_g = this.m_g;
            color.m_b = this.m_b;
            color.m_a = this.m_a;
            return color;
        }
    }, {
        key: 'a',
        value: function a() {
            return this.m_a * 255.0;
        }
    }, {
        key: 'b',
        value: function b() {
            return this.m_b * 255.0;
        }
    }, {
        key: 'g',
        value: function g() {
            return this.m_g * 255.0;
        }
    }, {
        key: 'r',
        value: function r() {
            return this.m_r * 255.0;
        }
    }, {
        key: 'aF',
        value: function aF() {
            return this.m_a;
        }
    }, {
        key: 'bF',
        value: function bF() {
            return this.m_b;
        }
    }, {
        key: 'gF',
        value: function gF() {
            return this.m_g;
        }
    }, {
        key: 'rF',
        value: function rF() {
            return this.m_r;
        }
    }, {
        key: 'rgba',
        value: function rgba() {
            return this.a() | this.b() << 8 | this.g() << 16 | this.r() << 24;
        }
    }, {
        key: 'setRGBA',
        value: function setRGBA(r) {
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 255;

            if (g == -1) {
                var rgba = r;
                this.setRGBA(rgba >> 0 & 0xff, rgba >> 8 & 0xff, rgba >> 16 & 0xff, rgba >> 24 & 0xff);
            } else {
                this.m_r = r / 255;
                this.m_g = g / 255;
                this.m_b = b / 255;
                this.m_a = a / 255;
            }
        }
    }], [{
        key: 'from8bit',
        value: function from8bit(color) {
            if (color >= 216 || color <= 0) return new Color(0, 0, 0);
            var r = parseInt((color / 36).toString()) % 6 * 51;
            var g = parseInt((color / 6).toString()) % 6 * 51;
            var b = color % 6 * 51;
            return new Color(r, g, b);
        }
    }]);

    return Color;
}();

Color.alpha = 0x00000000;
Color.white = 0xffffffff;
Color.black = 0xff000000;
Color.red = 0xff0000ff;
Color.darkRed = 0xff000080;
Color.green = 0xff00ff00;
Color.darkGreen = 0xff008000;
Color.blue = 0xffff0000;
Color.darkBlue = 0xff800000;
Color.pink = 0xffff00ff;
Color.darkPink = 0xff800080;
Color.yellow = 0xff00ffff;
Color.darkYellow = 0xff008080;
Color.teal = 0xffffff00;
Color.darkTeal = 0xff808000;
Color.gray = 0xffa0a0a0;
Color.darkGray = 0xff808080;
Color.lightGray = 0xffc0c0c0;
Color.orange = 0xff008cff;

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g_map = exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _position = __webpack_require__(99);

var _awarerange = __webpack_require__(142);

var _light = __webpack_require__(100);

var _tileblock = __webpack_require__(354);

var _const = __webpack_require__(11);

var _point = __webpack_require__(71);

var _helpers = __webpack_require__(101);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = exports.Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.m_tileBlocks = [];
        this.m_knownCreatures = [];
        this.m_floorMissiles = [];
        this.m_animatedTexts = [];
        this.m_staticTexts = [];
        // std::vector<MapViewPtr> m_mapViews;
        //std::unordered_map<Position, std::string, PositionHasher> m_waypoints;
        this.m_animationFlags = 0;
        this.m_zoneFlags = 0;
        this.m_zoneColors = [];
        this.m_zoneOpacity = 0.0;
        this.m_light = new _light.Light();
        this.m_centralPosition = new _position.Position();
        this.m_attribs = [];
        this.m_awareRange = new _awarerange.AwareRange();
        for (var z = 0; z <= _const.Otc.MAX_Z + 1; ++z) {
            this.m_tileBlocks[z] = [];
            this.m_floorMissiles[z] = [];
        }
    }

    _createClass(Map, [{
        key: "createTile",
        value: function createTile(pos) {
            if (!pos.isMapPosition()) return null;
            var block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (!block) {
                block = new _tileblock.TileBlock();
                this.m_tileBlocks[pos.z][this.getBlockIndex(pos)] = block;
            }
            return block.create(pos);
        }
    }, {
        key: "getTile",
        value: function getTile(pos) {
            if (!pos.isMapPosition()) return null;
            var it = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (it) return it.get(pos);
            return null;
        }
    }, {
        key: "getOrCreateTile",
        value: function getOrCreateTile(pos) {
            if (!pos.isMapPosition()) return null;
            var tile = this.getTile(pos);
            if (!tile) {
                tile = this.createTile(pos);
            }
            return tile;
        }
    }, {
        key: "setAwareRange",
        value: function setAwareRange(arg0) {
            throw new Error("Method not implemented.");
        }
    }, {
        key: "getCreatureById",
        value: function getCreatureById(id) {
            //console.log('known creatures', g_map.m_knownCreatures);
            if (!g_map.m_knownCreatures[id]) {
                console.log('known creatures failed', id, g_map.m_knownCreatures);
                throw new Error('get ' + id);
            }
            return g_map.m_knownCreatures[id];
        }
    }, {
        key: "getAwareRange",
        value: function getAwareRange() {
            return this.m_awareRange;
        }
    }, {
        key: "getCentralPosition",
        value: function getCentralPosition() {
            return this.m_centralPosition;
        }
    }, {
        key: "setCentralPosition",
        value: function setCentralPosition(pos) {
            this.m_centralPosition = pos;
        }
    }, {
        key: "cleanTile",
        value: function cleanTile(pos) {
            if (!pos.isMapPosition()) return;
            var block = this.m_tileBlocks[pos.z][this.getBlockIndex(pos)];
            if (block) {
                var tile = block.get(pos);
                if (tile) {
                    tile.clean();
                    if (tile.canErase()) block.remove(pos);
                    //notificateTileUpdate(pos);
                }
            }
            for (var i = 0; i < this.m_staticTexts.length;) {
                var staticText = this.m_staticTexts[i];
                if (staticText.getPosition().equals(pos) && staticText.getMessageMode() == _const.MessageMode.MessageNone) this.m_staticTexts.splice(i, 1);else ++i;
            }
        }
    }, {
        key: "addThing",
        value: function addThing(thing, pos) {
            var stackPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

            if (!thing) return;
            if (thing.isItem() || thing.isCreature() || thing.isEffect()) {
                var tile = this.getOrCreateTile(pos);
                if (tile) tile.addThing(thing, stackPos);
            } else {
                if (thing.isMissile()) {
                    this.m_floorMissiles[pos.z].push(thing);
                } else if (thing.isAnimatedText()) {
                    // this code will stack animated texts of the same color
                    var animatedText = thing;
                    var prevAnimatedText = void 0;
                    var merged = false;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.m_animatedTexts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var other = _step.value;

                            if (other.getPosition() == pos) {
                                prevAnimatedText = other;
                                if (other.merge(animatedText)) {
                                    merged = true;
                                    break;
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (!merged) {
                        if (prevAnimatedText) {
                            var offset = prevAnimatedText.getOffset();
                            var t = prevAnimatedText.getTimer().ticksElapsed();
                            if (t < _const.Otc.ANIMATED_TEXT_DURATION / 4.0) {
                                var y = 12 - 48 * t / _const.Otc.ANIMATED_TEXT_DURATION;
                                offset.add(new _point.Point(0, y));
                            }
                            offset.y = Math.min(offset.y, 12);
                            animatedText.setOffset(offset);
                        }
                        this.m_animatedTexts.push(animatedText);
                    }
                } else if (thing.isStaticText()) {
                    var staticText = thing;
                    var mustAdd = true;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.m_staticTexts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _other = _step2.value;

                            // try to combine messages
                            if (_other.getPosition() == pos && _other.addMessage(staticText.getName(), staticText.getMessageMode(), staticText.getFirstMessage())) {
                                mustAdd = false;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (mustAdd) this.m_staticTexts.push(staticText);else return;
                }
                thing.setPosition(pos);
                thing.onAppear();
            }
            //notificateTileUpdate(pos);
        }
    }, {
        key: "removeThing",
        value: function removeThing(thing) {
            if (!thing) return false;
            var ret = false;
            if (thing.isMissile()) {
                var missile = thing;
                var z = missile.getPosition().z;
                var it = this.m_floorMissiles[z].indexOf(missile);
                if (it > -1) {
                    this.m_floorMissiles.splice(it, 1);
                    ret = true;
                }
            } else if (thing.isAnimatedText()) {
                var animatedText = thing;
                var _it = this.m_animatedTexts.indexOf(animatedText);
                if (_it > -1) {
                    this.m_animatedTexts.splice(_it, 1);
                    ret = true;
                }
            } else if (thing.isStaticText()) {
                var staticText = thing;
                var _it2 = this.m_staticTexts.indexOf(staticText);
                if (_it2 > -1) {
                    this.m_staticTexts.splice(_it2, 1);
                    ret = true;
                }
            } else {
                var tile = thing.getTile();
                if (tile) ret = tile.removeThing(thing);
            }
            //notificateTileUpdate(thing.getPosition());
            return ret;
        }
    }, {
        key: "removeThingByPos",
        value: function removeThingByPos(pos, stackPos) {
            var tile = this.getTile(pos);
            if (tile) return this.removeThing(tile.getThing(stackPos));
            return false;
        }
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "getThing",
        value: function getThing(pos, stackpos) {
            var tile = this.getTile(pos);
            //Log.debug('Map.getThing', pos, tile.getThing(stackpos));
            if (tile) return tile.getThing(stackpos);
            return null;
        }
    }, {
        key: "addCreature",
        value: function addCreature(creature) {
            this.m_knownCreatures[creature.getId()] = creature;
        }
    }, {
        key: "removeCreatureById",
        value: function removeCreatureById(id) {
            if (id == 0) return;
            if (this.m_knownCreatures[id]) {
                //this.m_knownCreatures.splice(id, 1);
            }
        }
    }, {
        key: "removeUnawareThings",
        value: function removeUnawareThings() {
            /* todo */
        }
    }, {
        key: "getBlockIndex",
        value: function getBlockIndex(pos) {
            return (0, _helpers.toInt)(pos.y / _tileblock.TileBlock.BLOCK_SIZE) * (0, _helpers.toInt)(65536 / _tileblock.TileBlock.BLOCK_SIZE) + (0, _helpers.toInt)(pos.x / _tileblock.TileBlock.BLOCK_SIZE);
        }
    }]);

    return Map;
}();

var g_map = new Map();
exports.g_map = g_map;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = function () {
    function Point() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "equals",
        value: function equals(otherPoint) {
            return this.x == otherPoint.x && this.y == otherPoint.y;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Point(this.x, this.y);
        }
    }, {
        key: "add",
        value: function add(point) {
            return new Point(this.x + point.x, this.y + point.y);
        }
    }, {
        key: "sub",
        value: function sub(point) {
            return new Point(this.x - point.x, this.y - point.y);
        }
    }, {
        key: "mul",
        value: function mul(ratio) {
            return new Point(this.x * ratio, this.y * ratio);
        }
    }]);

    return Point;
}();

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Creature = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _thing = __webpack_require__(43);

var _outfit = __webpack_require__(145);

var _const = __webpack_require__(11);

var _color = __webpack_require__(51);

var _cachedtext = __webpack_require__(103);

var _timer = __webpack_require__(104);

var _point = __webpack_require__(71);

var _proto = __webpack_require__(146);

var _thingtypemanager = __webpack_require__(50);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Creature = exports.Creature = function (_Thing) {
    _inherits(Creature, _Thing);

    function Creature() {
        _classCallCheck(this, Creature);

        var _this = _possibleConstructorReturn(this, (Creature.__proto__ || Object.getPrototypeOf(Creature)).call(this));

        _this.m_id = 0;
        _this.m_healthPercent = 100;
        _this.m_direction = _const.Direction.South;
        _this.m_outfit = new _outfit.Outfit();
        _this.m_speed = 200;
        _this.m_skull = _const.PlayerSkulls.SkullNone;
        _this.m_shield = _const.PlayerShields.ShieldNone;
        _this.m_emblem = _const.PlayerEmblems.EmblemNone;
        _this.m_type = _proto.Proto.CreatureTypeUnknown;
        _this.m_icon = _const.CreatureIcons.NpcIconNone;
        _this.m_showShieldTexture = true;
        _this.m_shieldBlink = false;
        _this.m_passable = false;
        _this.m_showTimedSquare = false;
        _this.m_showStaticSquare = false;
        _this.m_removed = true;
        _this.m_nameCache = new _cachedtext.CachedText();
        _this.m_informationColor = new _color.Color(96, 96, 96);
        _this.m_outfitColor = new _color.Color(255, 255, 255);
        //ScheduledEventPtr m_outfitColorUpdateEvent;
        _this.m_outfitColorTimer = new _timer.Timer();
        // walk related
        _this.m_walkAnimationPhase = 0;
        _this.m_walkedPixels = 0;
        _this.m_footStep = 0;
        _this.m_walkTimer = new _timer.Timer();
        _this.m_footTimer = new _timer.Timer();
        _this.m_walking = false;
        _this.m_allowAppearWalk = false;
        _this.m_footStepDrawn = false;
        _this.m_walkOffset = new _point.Point();
        _this.m_walkTurnDirection = _const.Direction.InvalidDirection;
        _this.m_lastStepDirection = _const.Direction.InvalidDirection;
        return _this;
    }

    _createClass(Creature, [{
        key: "draw",
        value: function draw(dest, scaleFactor, animate) {
            var lightView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.m_id;
        }
    }, {
        key: "setId",
        value: function setId(id) {
            this.m_id = id;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.m_name;
        }
    }, {
        key: "setName",
        value: function setName(name) {
            this.m_name = name;
        }
    }, {
        key: "isCreature",
        value: function isCreature() {
            return true;
        }
    }, {
        key: "canBeSeen",
        value: function canBeSeen() {
            return !this.isInvisible() || this.isPlayer();
        }
    }, {
        key: "isInvisible",
        value: function isInvisible() {
            return this.m_outfit.getCategory() == _const.ThingCategory.ThingCategoryEffect && this.m_outfit.getAuxId() == 13;
        }
    }, {
        key: "addTimedSquare",
        value: function addTimedSquare(arg0) {
            // throw new Error("Method not implemented.");
        }
    }, {
        key: "hideStaticSquare",
        value: function hideStaticSquare() {
            //throw new Error("Method not implemented.");
        }
    }, {
        key: "showStaticSquare",
        value: function showStaticSquare(arg0) {
            // throw new Error("Method not implemented.");
        }
    }, {
        key: "setType",
        value: function setType(type) {
            this.m_type = type;
        }
    }, {
        key: "allowAppearWalk",
        value: function allowAppearWalk() {}
    }, {
        key: "setHealthPercent",
        value: function setHealthPercent(healthPercent) {
            this.m_healthPercent = healthPercent;
        }
    }, {
        key: "setLight",
        value: function setLight(light) {}
    }, {
        key: "setOutfit",
        value: function setOutfit(outfit) {
            this.m_outfit = outfit;
        }
    }, {
        key: "setSpeed",
        value: function setSpeed(speed) {}
    }, {
        key: "setBaseSpeed",
        value: function setBaseSpeed(baseSpeed) {}
    }, {
        key: "setSkull",
        value: function setSkull(skull) {}
    }, {
        key: "setShield",
        value: function setShield(shield) {}
    }, {
        key: "setPassable",
        value: function setPassable(v) {}
    }, {
        key: "setEmblem",
        value: function setEmblem(emblem) {}
    }, {
        key: "setIcon",
        value: function setIcon(icon) {}
    }, {
        key: "setDirection",
        value: function setDirection(direction) {
            this.m_direction = direction;
        }
    }, {
        key: "turn",
        value: function turn(direction) {
            if (!this.m_walking) this.setDirection(direction);else this.m_walkTurnDirection = direction;
        }
    }, {
        key: "isWalking",
        value: function isWalking() {
            return this.m_walking;
        }
    }, {
        key: "getThingType",
        value: function getThingType() {
            return _thingtypemanager.g_things.getThingType(this.m_outfit.getId(), _const.ThingCategory.ThingCategoryCreature);
        }
    }, {
        key: "rawGetThingType",
        value: function rawGetThingType() {
            return _thingtypemanager.g_things.rawGetThingType(this.m_outfit.getId(), _const.ThingCategory.ThingCategoryCreature);
        }
    }]);

    return Creature;
}(_thing.Thing);

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Position = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = exports.Position = function () {
    function Position() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Position);

        this.x = x;
        this.y = y;
        this.z = z;
    }

    _createClass(Position, [{
        key: "equals",
        value: function equals(otherPosition) {
            return this.x == otherPosition.x && this.y == otherPosition.y && this.z == otherPosition.z;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Position(this.x, this.y, this.z);
        }
    }, {
        key: "isMapPosition",
        value: function isMapPosition() {
            return this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= _const.Otc.MAX_Z;
        }
    }, {
        key: "isValid",
        value: function isValid() {
            return !(this.x == 65535 && this.y == 65535 && this.z == 255);
        }
    }, {
        key: "distance",
        value: function distance(pos) {
            return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2));
        }
    }, {
        key: "translate",
        value: function translate(dx, dy) {
            var dz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.x += dx;
            this.y += dy;
            this.z += dz;
        }
    }, {
        key: "translated",
        value: function translated(dx, dy) {
            var dz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return new Position(this.x + dx, this.y + dy, this.z + dz);
        }
    }, {
        key: "isInRange",
        value: function isInRange(pos, xRange, yRange) {
            return Math.abs(this.x - pos.x) <= xRange && Math.abs(this.y - pos.y) <= yRange && this.z == pos.z;
        }
        /*
            isInRange(pos: Position, minXRange: number, maxXRange: number, minYRange: number, maxYRange: number): boolean {
                return (pos.x >= this.x - minXRange && pos.x <= this.x + maxXRange && pos.y >= this.y - minYRange && pos.y <= this.y + maxYRange && pos.z == this.z);
            }
        */

    }, {
        key: "up",
        value: function up() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nz = this.z - n;
            if (nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "down",
        value: function down() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nz = this.z + n;
            if (nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "coveredUp",
        value: function coveredUp() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nx = this.x + n,
                ny = this.y + n,
                nz = this.z - n;
            if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.x = nx;
                this.y = ny;
                this.z = nz;
                return true;
            }
            return false;
        }
    }, {
        key: "coveredDown",
        value: function coveredDown() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var nx = this.x - n,
                ny = this.y - n,
                nz = this.z + n;
            if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= _const.Otc.MAX_Z) {
                this.x = nx;
                this.y = ny;
                this.z = nz;
                return true;
            }
            return false;
        }
    }]);

    return Position;
}();

/***/ })

},[148]);