/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "5a74");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00d8":
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "044b":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "063c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9efd");

const baseUrl = '/api/content';
const commentApi = {};

commentApi.createComment = (target, comment) => {
  return Object(_utils_service__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    url: `${baseUrl}/${target}/comments`,
    method: 'post',
    data: comment
  });
};

commentApi.listComments = (target, targetId, view = 'tree_view', pagination) => {
  return Object(_utils_service__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    url: `${baseUrl}/${target}/${targetId}/comments/${view}`,
    params: pagination,
    method: 'get'
  });
};

/* harmony default export */ __webpack_exports__["a"] = (commentApi);

/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "09bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("0f7c");
var define = __webpack_require__("f367");

var implementation = __webpack_require__("7b13");
var getPolyfill = __webpack_require__("8926");
var shim = __webpack_require__("522d");

var bound = bind.call(Function.call, getPolyfill());

define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;


/***/ }),

/***/ "0a06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var buildURL = __webpack_require__("30b5");
var InterceptorManager = __webpack_require__("f6b4");
var dispatchRequest = __webpack_require__("5270");
var mergeConfig = __webpack_require__("4a7b");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0df6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "0e27":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("5319");

/* jshint browser: true */
(function () {
  // The properties that we copy into a mirrored div.
  // Note that some browsers, such as Firefox,
  // do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
  // so we have to do every single property specifically.
  var properties = ['direction', // RTL support
  'boxSizing', 'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height', 'overflowX', 'overflowY', // copy the scrollbar for IE
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', // might not make a difference, but better be safe
  'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize'];
  var isFirefox = window.mozInnerScreenX != null;

  function getCaretCoordinates(element, position, options) {
    var debug = options && options.debug || false;

    if (debug) {
      var el = document.querySelector('#input-textarea-caret-position-mirror-div');

      if (el) {
        el.parentNode.removeChild(el);
      }
    } // mirrored div


    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    var style = div.style;
    var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
    // default textarea styles

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') style.wordWrap = 'break-word'; // only for textarea-s
    // position off-screen

    style.position = 'absolute'; // required to return coordinates properly

    if (!debug) style.visibility = 'hidden'; // not 'display: none' because we want rendering
    // transfer the element's properties to the div

    properties.forEach(function (prop) {
      style[prop] = computed[prop];
    });

    if (isFirefox) {
      // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
      if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }

    div.textContent = element.value.substring(0, position); // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037

    if (element.nodeName === 'INPUT') div.textContent = div.textContent.replace(/\s/g, "\u00a0");
    var span = document.createElement('span'); // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // for inputs, just '.' would be enough, but why bother?

    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all

    div.appendChild(span);
    var coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
    };

    if (debug) {
      span.style.backgroundColor = '#aaa';
    } else {
      document.body.removeChild(div);
    }

    return coordinates;
  }

  if ( true && typeof module.exports != "undefined") {
    module.exports = getCaretCoordinates;
  } else {
    window.getCaretCoordinates = getCaretCoordinates;
  }
})();

/***/ }),

/***/ "0e4d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 全局数据不多，因此不使用vuex
var globalData = {
  replyId: 0
};
/* harmony default export */ __webpack_exports__["a"] = (globalData);

/***/ }),

/***/ "0f7c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("688e");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "1696":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1d2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "21d0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2444":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("c532");
var normalizeHeaderName = __webpack_require__("c8af");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("b50d");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__("b50d");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "2af9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// EXTERNAL MODULE: ./src/components/CommentEditor.vue + 42 modules
var CommentEditor = __webpack_require__("3f17");

// EXTERNAL MODULE: ./src/components/CommentNode.vue + 4 modules
var CommentNode = __webpack_require__("f9af");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentLoading.vue?vue&type=template&id=1f98d647&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"comment-loader-container"},[(_vm.configs.loadingStyle==='default')?_c('div',{staticClass:"comment-loader-default"},[_c('span'),_c('span'),_c('span'),_c('span')]):(_vm.configs.loadingStyle==='circle')?_c('div',{staticClass:"comment-loader-circle"}):(_vm.configs.loadingStyle==='balls')?_c('div',{staticClass:"comment-loader-balls"},[_c('div'),_c('div'),_c('div')]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommentLoading.vue?vue&type=template&id=1f98d647&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentLoading.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CommentLoadingvue_type_script_lang_js_ = ({
  name: "CommentLoading",
  props: {
    configs: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/CommentLoading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentLoadingvue_type_script_lang_js_ = (CommentLoadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/CommentLoading.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CommentLoadingvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var CommentLoading = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Pagination.vue?vue&type=template&id=67f9991c&
var Paginationvue_type_template_id_67f9991c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"page"},[_c('li',{staticClass:"page-item",class:{ disabled: !_vm.hasPrev }},[_c('button',{staticClass:"prev-button",attrs:{"tabindex":"-1"},on:{"click":_vm.handlePrevClick}},[_vm._v("上一页")])]),(_vm.firstPage != null)?_c('li',{staticClass:"page-item",class:{ active: _vm.page === _vm.firstPage}},[_c('button',{class:{ active: _vm.page === _vm.firstPage},on:{"click":function($event){return _vm.handlePageItemClick(_vm.firstPage)}}},[_vm._v(_vm._s(_vm.firstPage + 1))])]):_vm._e(),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMorePrev),expression:"hasMorePrev"}],staticClass:"page-item"},[_c('span',[_vm._v("...")])]),_vm._l((_vm.middlePages),function(middlePage){return _c('li',{key:middlePage,staticClass:"page-item",class:{ active: middlePage === _vm.page }},[_c('button',{class:{ active: middlePage === _vm.page },on:{"click":function($event){return _vm.handlePageItemClick(middlePage)}}},[_vm._v(" "+_vm._s(middlePage + 1)+" ")])])}),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMoreNext),expression:"hasMoreNext"}],staticClass:"page-item"},[_c('span',[_vm._v("...")])]),(_vm.lastPage)?_c('li',{staticClass:"page-item",class:{ active: _vm.page === _vm.lastPage}},[_c('button',{class:{ active: _vm.page === _vm.lastPage},on:{"click":function($event){return _vm.handlePageItemClick(_vm.lastPage)}}},[_vm._v(" "+_vm._s(_vm.lastPage + 1)+" ")])]):_vm._e(),_c('li',{staticClass:"page-item",class:{ disabled: !_vm.hasNext }},[_c('button',{staticClass:"next-button",on:{"click":_vm.handleNextClick}},[_vm._v("下一页")])])],2)}
var Paginationvue_type_template_id_67f9991c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Pagination.vue?vue&type=template&id=67f9991c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Pagination.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Paginationvue_type_script_lang_js_ = ({
  name: "Pagination",
  model: {
    prop: "page",
    event: "change"
  },
  props: {
    page: {
      type: Number,
      required: false,
      default: 0
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    total: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    return {
      middleSize: 3
    };
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.size);
    },

    hasNext() {
      return this.page < this.pages - 1;
    },

    hasPrev() {
      return this.page > 0;
    },

    firstPage() {
      if (this.pages === 0) {
        return null;
      }

      return 0;
    },

    hasMorePrev() {
      if (this.firstPage === null || this.pages <= this.middleSize + 2) {
        return false;
      }

      return this.page >= 2 + this.middleSize / 2;
    },

    hasMoreNext() {
      if (this.lastPage === null || this.pages <= this.middleSize + 2) {
        return false;
      }

      return this.page < this.lastPage - 1 - this.middleSize / 2;
    },

    middlePages() {
      if (this.pages <= 2) {
        return [];
      }

      if (this.pages <= 2 + this.middleSize) {
        return this.range(1, this.lastPage);
      }

      const halfMiddleSize = Math.floor(this.middleSize / 2);
      let left = this.page - halfMiddleSize;
      let right = this.page + halfMiddleSize;

      if (this.page <= this.firstPage + halfMiddleSize + 1) {
        left = this.firstPage + 1;
        right = left + this.middleSize - 1;
      } else if (this.page >= this.lastPage - halfMiddleSize - 1) {
        right = this.lastPage - 1;
        left = right - this.middleSize + 1;
      }

      return this.range(left, right + 1);
    },

    lastPage() {
      if (this.pages === 0 || this.pages === 1) {
        return 0;
      }

      return this.pages - 1;
    }

  },
  methods: {
    handleNextClick() {
      if (this.hasNext) {
        this.$emit("change", this.page + 1);
      }
    },

    handlePrevClick() {
      if (this.hasPrev) {
        this.$emit("change", this.page - 1);
      }
    },

    handlePageItemClick(page) {
      this.$emit("change", page);
    },

    range(left, right) {
      if (left >= right) {
        return [];
      }

      const result = [];

      for (let i = left; i < right; i++) {
        result.push(i);
      }

      return result;
    }

  }
});
// CONCATENATED MODULE: ./src/components/Pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Paginationvue_type_script_lang_js_ = (Paginationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Pagination.vue





/* normalize component */

var Pagination_component = Object(componentNormalizer["a" /* default */])(
  components_Paginationvue_type_script_lang_js_,
  Paginationvue_type_template_id_67f9991c_render,
  Paginationvue_type_template_id_67f9991c_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var Pagination = (Pagination_component.exports);
// CONCATENATED MODULE: ./src/components/index.js
// Register components
 // pro components





const _components = {
  CommentEditor: CommentEditor["a" /* default */],
  CommentNode: CommentNode["default"],
  CommentLoading: CommentLoading,
  Pagination: Pagination
};
const components = {};
Object.keys(_components).forEach(key => {
  components[key] = external_Vue_default.a.component(key, _components[key]);
});
/* harmony default export */ var src_components = (components);

/***/ }),

/***/ "2b80":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * UAParser.js v0.7.24
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.24',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]{3,6}).+version\/([\w\.-]+)/i,                  // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser
            /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            ], [NAME, VERSION], [

            /(konqueror)\/([\w\.]+)/i                                           // Konqueror
            ], [[NAME, 'Konqueror'], VERSION], [

            /(trident).+rv[:\s]([\w\.]{1,9}).+like\sgecko/i                     // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
            ], [[NAME, 'Avast Secure Browser'], VERSION], [

            /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
            ], [[NAME, 'AVG Secure Browser'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /(focus)\/([\w\.]+)/i                                               // Firefox Focus
            ], [[NAME, 'Firefox Focus'], VERSION], [

            /(opt)\/([\w\.]+)/i                                                 // Opera Touch
            ], [[NAME, 'Opera Touch'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
            ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(brave)\/([\w\.]+)/i                                               // Brave browser
            ], [[NAME, 'Brave'], VERSION], [

            /(whale)\/([\w\.]+)/i                                               // Whale browser
            ], [[NAME, 'Whale'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android with version
            ], [VERSION, [NAME, 'Facebook']], [
            
            /FBAN\/FBIOS|FB_IAB\/FB4A/i                                         // Facebook App for iOS & Android without version
            ], [[NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(coc_coc_browser)\/([\w\.]+)/i                                     // Coc Coc Browser
            ], [[NAME, 'Coc Coc'], VERSION], [

              /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
            ], [[NAME, 'Sailfish Browser'], VERSION], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
            ], [[NAME, '360 Browser']], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i                      // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i                   // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+)\s.*(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,                       // Other Firefox-based
            /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,                        // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i                        // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)(\sbuild\/|\)).+silk\//i                                 // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i                    // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([\w])(\sbuild\/|\))/i                                 // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,                    // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,                                        // Huawei
            /android.+\s(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?)/i

            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /android.+(bah2?-a?[lw]\d{2})/i                                     // Huawei MediaPad
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|SM-P605|SM-P610|SM-P587|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i                   // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /linux;\snetcast.+smarttv/i,                                        // LG SmartTV
            /lg\snetcast\.tv-201\d/i
            ], [[VENDOR, 'LG'], MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i             // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [
            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
            /(lenovo)[_\s-]?([\w-]+)/i
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel( [2-9]a?)?( xl)?)[\s)]/i                        // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,                // Xiaomi Hongmi
            /android.+(redmi[\s\-_]?(?:note|k)?(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i,      
                                                                                // Xiaomi Redmi
            /android.+(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i    
                                                                                // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]?(?:pad)(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i     // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
            /(mz)-([\w-]{2,})/i
            ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})[\s)]/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s](Venue[\d\s]{2,7})\s+build/i                       // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(\S(?:.*\S)?)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+;\s(PH-1)\s/i
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\w\-\.]+)\s+build/i                       // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            //android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            //], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [
                                                                                // Android Phones from Unidentified Vendors
            /android .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i
            ], [MODEL, [TYPE, MOBILE]], [
                                                                                // Android Tablets from Unidentified Vendors
            /android .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i
            ], [MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /[\s\/\(](smart-?tv)[;\)]/i                                         // SmartTV
            ], [[TYPE, SMARTTV]], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']], [

            /(phone)/i
            ], [[TYPE, MOBILE]]
        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                                                                                // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Xbox, consider this before other Windows-based devices
            /(xbox);\s+xbox\s([^\);]+)/i,                                       // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, 'Chromecast']], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),

/***/ "2c92":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/6.0/#sec-isconstructor

module.exports = function IsConstructor(argument) {
	return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "2d83":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("387f");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "2e67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "30b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesToShadowDOM; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js


function addStylesToShadowDOM (parentId, list, shadowRoot) {
  var styles = listToStyles(parentId, list)
  addStyles(styles, shadowRoot)
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

function addStyles (styles /* Array<StyleObject> */, shadowRoot) {
  const injectedStyles =
    shadowRoot._injectedStyles ||
    (shadowRoot._injectedStyles = {})
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var style = injectedStyles[item.id]
    if (!style) {
      for (var j = 0; j < item.parts.length; j++) {
        addStyle(item.parts[j], shadowRoot)
      }
      injectedStyles[item.id] = true
    }
  }
}

function createStyleElement (shadowRoot) {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  shadowRoot.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */, shadowRoot) {
  var styleElement = createStyleElement(shadowRoot)
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "387f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "3934":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3d27":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES5Type = __webpack_require__("5183");

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};


/***/ }),

/***/ "3f17":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentEditor.vue?vue&type=template&id=3df98dd0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isCurrReply)?_c('section',{ref:"editor",staticClass:"comment-editor",attrs:{"id":_vm.respondId,"role":"form"}},[(_vm.isReply)?_c('h3',{staticClass:"comment-reply-title",attrs:{"id":"reply-title"}},[_c('small',[_c('a',{staticClass:"cancel-comment-reply-link",attrs:{"rel":"nofollow","href":"javascript:void(0);","onclick":"return false;"},on:{"click":_vm.cancelReply}},[_vm._v("Cancel Reply")])])]):_vm._e(),_c('form',{staticClass:"comment-form"},[(!_vm.previewMode)?_c('div',{staticClass:"comment-textarea"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.comment.content),expression:"comment.content"}],staticClass:"commentbody",attrs:{"required":"required","aria-required":"true","tabindex":"4","placeholder":_vm.configs.aWord || '你是我一生只会遇见一次的惊喜 ...'},domProps:{"value":(_vm.comment.content)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.comment, "content", $event.target.value)}}}),_c('label',{staticClass:"input-label"},[_vm._v(_vm._s(_vm.configs.aWord || '你是我一生只会遇见一次的惊喜 ...'))])]):_c('div',{staticClass:"comment-preview markdown-body",domProps:{"innerHTML":_vm._s(_vm.renderedContent)}}),_c('div',{attrs:{"id":"upload-img-show"}}),_c('p',{staticClass:"no-select",attrs:{"id":"emotion-toggle"}},[_c('span',{on:{"click":_vm.handleToogleDialogEmoji}},[_vm._v(_vm._s(!_vm.emojiDialogVisible ? '戳我试试 OωO' : '嘿嘿嘿 ヾ(≧∇≦*)ゝ'))])]),_c('transition',{attrs:{"name":"emoji-fade"}},[_c('VEmojiPicker',{directives:[{name:"show",rawName:"v-show",value:(_vm.emojiDialogVisible),expression:"emojiDialogVisible"}],attrs:{"pack":_vm.emojiPack},on:{"select":_vm.handleSelectEmoji}})],1),_c('div',{staticClass:"author-info"},[_c('div',{staticClass:"commentator"},[_c('img',{staticClass:"avatar",attrs:{"src":_vm.avatar}}),_c('div',{staticClass:"socila-check",class:[_vm.checkType.back]},[_c('i',{class:[_vm.checkType.icon],attrs:{"aria-hidden":"true"}})])]),_c('PopupInput',{staticClass:"cmt-popup cmt-author",attrs:{"popupStyle":"margin-left: -115px","popupText":_vm.configs.authorPopup || '输入QQ号将自动拉取昵称和头像',"inputType":"text","placeholder":"* 昵称","id":"author"},on:{"blurInput":_vm.pullInfo},model:{value:(_vm.comment.author),callback:function ($$v) {_vm.$set(_vm.comment, "author", $$v)},expression:"comment.author"}}),_c('PopupInput',{staticClass:"cmt-popup",attrs:{"popupStyle":"margin-left: -65px;","popupText":_vm.configs.emailPopup || '你将收到回复通知',"inputType":"text","placeholder":"* 电子邮件","id":"email"},on:{"blurInput":_vm.pullInfo},model:{value:(_vm.comment.email),callback:function ($$v) {_vm.$set(_vm.comment, "email", $$v)},expression:"comment.email"}}),_c('PopupInput',{staticClass:"cmt-popup",attrs:{"popupStyle":"margin-left: -55px;","popupText":_vm.configs.urlPopup || '禁止小广告😀',"inputType":"text","placeholder":"个人站点","id":"url"},model:{value:(_vm.comment.authorUrl),callback:function ($$v) {_vm.$set(_vm.comment, "authorUrl", $$v)},expression:"comment.authorUrl"}})],1),_c('ul',{staticClass:"comment-buttons"},[(_vm.comment.content)?_c('li',{staticClass:"middle",staticStyle:{"margin-right":"5px"}},[_c('a',{staticClass:"button-preview-edit",attrs:{"href":"javascript:void(0)","rel":"nofollow noopener"},on:{"click":_vm.handlePreviewContent}},[_vm._v(_vm._s(_vm.previewMode?'编辑':'预览'))])]):_vm._e(),_c('li',{staticClass:"middle"},[_c('a',{staticClass:"button-submit",attrs:{"href":"javascript:void(0)","tabindex":"5","rel":"nofollow noopener"},on:{"click":_vm.handleSubmitClick}},[_vm._v("提交")])])])],1)]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommentEditor.vue?vue&type=template&id=3df98dd0&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// EXTERNAL MODULE: ./node_modules/l-marked/lib/marked.js
var marked = __webpack_require__("a571");
var marked_default = /*#__PURE__*/__webpack_require__.n(marked);

// EXTERNAL MODULE: ./node_modules/md5/md5.js
var md5 = __webpack_require__("6821");
var md5_default = /*#__PURE__*/__webpack_require__.n(md5);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=template&id=2413c210&
var VEmojiPickervue_type_template_id_2413c210_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"emotion-box no-select"},[(_vm.showCategory)?_c('Categories',{on:{"select":function($event){return _vm.onChangeCategory($event)}}}):_vm._e(),_c('keep-alive',[_c('EmojiList',{attrs:{"data":_vm.emojis,"category":_vm.category},on:{"select":function($event){return _vm.onSelectEmoji(arguments)}}})],1)],1)}
var VEmojiPickervue_type_template_id_2413c210_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=template&id=2413c210&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Categories.vue?vue&type=template&id=441e9ae5&
var Categoriesvue_type_template_id_441e9ae5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"category"}},[_c('table',{staticClass:"motion-switcher-table"},[_c('tbody',[_c('tr',_vm._l((_vm.categories),function(categorie,index){return _c('th',{key:index,class:['category', categorie.name + '-box', { active: index === _vm.active }, {'on-hover': index === _vm.active}],on:{"click":function($event){return _vm.onSelect(index)}}},[_vm._v(_vm._s(categorie.title))])}),0)])])])}
var Categoriesvue_type_template_id_441e9ae5_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue?vue&type=template&id=441e9ae5&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/Categories.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Categoriesvue_type_script_lang_js_ = ({
  name: 'Categories',
  data: () => ({
    categories: [{
      name: 'bilibili',
      title: 'bilibili~'
    }, {
      name: 'menhera',
      title: '(✪ω✪)'
    }, {
      name: 'tieba',
      title: 'Tieba'
    }],
    active: 0
  }),
  methods: {
    onSelect(index) {
      this.active = index;
      const _category = this.categories[index];
      this.$emit('select', _category);
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_Categoriesvue_type_script_lang_js_ = (Categoriesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/EmojiPicker/Categories.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_Categoriesvue_type_script_lang_js_,
  Categoriesvue_type_template_id_441e9ae5_render,
  Categoriesvue_type_template_id_441e9ae5_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var Categories = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/EmojiList.vue?vue&type=template&id=bf67a9e4&
var EmojiListvue_type_template_id_bf67a9e4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"motion-container",class:_vm.categoryClass,attrs:{"id":"container-emoji"}},_vm._l((_vm.data[_vm.category]),function(emoji,index){return _c(_vm.categoryEmoji,{key:index,tag:"component",attrs:{"data":emoji},nativeOn:{"click":function($event){return _vm.onSelect(emoji, _vm.type)}}})}),1)}
var EmojiListvue_type_template_id_bf67a9e4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue?vue&type=template&id=bf67a9e4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/BilibiliEmoji.vue?vue&type=template&id=e1039c80&
var BilibiliEmojivue_type_template_id_e1039c80_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"emotion-secter emotion-item emotion-select-parent",style:(_vm.biliSpanStyle)},[_c('div',{staticClass:"img emotion-select-child",style:(_vm.biliImgStyle)})])}
var BilibiliEmojivue_type_template_id_e1039c80_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/BilibiliEmoji.vue?vue&type=template&id=e1039c80&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/BilibiliEmoji.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var BilibiliEmojivue_type_script_lang_js_ = ({
  name: 'BilibiliEmoji',
  props: {
    data: {
      type: Object
    },
    url: {
      type: String,
      required: false,
      default: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/bili/"
    }
  },
  computed: {
    biliSpanStyle() {
      return "background-image: url(" + this.url + "hd/ic_emoji_" + this.data.name + ".png);";
    },

    biliImgStyle() {
      let background = this.url + this.data.name + ".png";
      let emoji = this.data;
      let dataStyle = "";
      Object.keys(emoji.style).forEach(function (item) {
        dataStyle += item + ":" + emoji.style[item] + ";";
      });
      return "background-image: url(" + background + ");" + dataStyle;
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/BilibiliEmoji.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_BilibiliEmojivue_type_script_lang_js_ = (BilibiliEmojivue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/BilibiliEmoji.vue





/* normalize component */

var BilibiliEmoji_component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_BilibiliEmojivue_type_script_lang_js_,
  BilibiliEmojivue_type_template_id_e1039c80_render,
  BilibiliEmojivue_type_template_id_e1039c80_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var BilibiliEmoji = (BilibiliEmoji_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/MenheraEmoji.vue?vue&type=template&id=3fdcf991&
var MenheraEmojivue_type_template_id_3fdcf991_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"emoji-item"},[_vm._v(" "+_vm._s(_vm.data.name)+" ")])}
var MenheraEmojivue_type_template_id_3fdcf991_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/MenheraEmoji.vue?vue&type=template&id=3fdcf991&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/MenheraEmoji.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var MenheraEmojivue_type_script_lang_js_ = ({
  name: 'MenheraEmoji',
  props: {
    data: {
      type: Object
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/MenheraEmoji.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_MenheraEmojivue_type_script_lang_js_ = (MenheraEmojivue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/MenheraEmoji.vue





/* normalize component */

var MenheraEmoji_component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_MenheraEmojivue_type_script_lang_js_,
  MenheraEmojivue_type_template_id_3fdcf991_render,
  MenheraEmojivue_type_template_id_3fdcf991_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var MenheraEmoji = (MenheraEmoji_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/TiebaEmoji.vue?vue&type=template&id=0e25cc38&
var TiebaEmojivue_type_template_id_0e25cc38_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"title":_vm.data.description}},[_c('img',{attrs:{"src":_vm.tiebaSrc}})])}
var TiebaEmojivue_type_template_id_0e25cc38_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EmojiPicker/TiebaEmoji.vue?vue&type=template&id=0e25cc38&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/TiebaEmoji.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var TiebaEmojivue_type_script_lang_js_ = ({
  name: 'TiebaEmoji',
  props: {
    data: {
      type: Object
    },
    url: {
      type: String,
      required: false,
      default: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/smilies/"
    }
  },
  computed: {
    tiebaSrc() {
      return this.url + "icon_" + this.data.name + ".gif";
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/TiebaEmoji.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_TiebaEmojivue_type_script_lang_js_ = (TiebaEmojivue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/TiebaEmoji.vue





/* normalize component */

var TiebaEmoji_component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_TiebaEmojivue_type_script_lang_js_,
  TiebaEmojivue_type_template_id_0e25cc38_render,
  TiebaEmojivue_type_template_id_0e25cc38_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var TiebaEmoji = (TiebaEmoji_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/EmojiList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var EmojiListvue_type_script_lang_js_ = ({
  name: 'EmojiList',
  components: {
    BilibiliEmoji: BilibiliEmoji,
    MenheraEmoji: MenheraEmoji,
    TiebaEmoji: TiebaEmoji
  },
  data: () => ({
    categories: [{
      name: 'bilibili',
      title: 'bilibili~'
    }, {
      name: 'menhera',
      title: '(✪ω✪)'
    }, {
      name: 'tieba',
      title: 'Tieba'
    }]
  }),
  props: {
    data: {
      type: Object
    },
    category: {
      type: String
    }
  },
  methods: {
    onSelect(emoji, type) {
      this.$emit('select', emoji, type);
    }

  },
  computed: {
    categoryClass() {
      return this.category + "-container";
    },

    categoryEmoji() {
      return this.category + "Emoji";
    },

    type() {
      if (this.category === "bilibili") {
        return "Math";
      } else if (this.category === "tieba") {
        return "BBCode";
      }

      return "";
    }

  },
  watch: {
    data() {
      this.$refs['container-emoji'].scrollTop = 0;
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_EmojiListvue_type_script_lang_js_ = (EmojiListvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiList.vue





/* normalize component */

var EmojiList_component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_EmojiListvue_type_script_lang_js_,
  EmojiListvue_type_template_id_bf67a9e4_render,
  EmojiListvue_type_template_id_bf67a9e4_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var EmojiList = (EmojiList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var VEmojiPickervue_type_script_lang_js_ = ({
  name: 'VEmojiPicker',
  props: {
    pack: {
      type: Array,
      required: true
    },
    showCategory: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Categories: Categories,
    EmojiList: EmojiList
  },
  data: () => ({
    mapEmojis: {},
    category: 'bilibili'
  }),

  created() {
    this.mapperData(this.pack);
  },

  methods: {
    onChangeCategory(category) {
      this.category = category.name;
      this.$emit('changeCategory', this.category);
    },

    onSelectEmoji(data) {
      this.$emit('select', data);
    },

    mapperData(dataEmojis) {
      dataEmojis.forEach(emoji => {
        const _category = emoji['category'];

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, [emoji]);
        } else {
          this.mapEmojis[_category].push(emoji);
        }
      });
    }

  },

  beforeDestroy() {
    delete this.mapEmojis;
  },

  computed: {
    emojis() {
      return this.mapEmojis;
    }

  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var EmojiPicker_VEmojiPickervue_type_script_lang_js_ = (VEmojiPickervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EmojiPicker/VEmojiPicker.vue





/* normalize component */

var VEmojiPicker_component = Object(componentNormalizer["a" /* default */])(
  EmojiPicker_VEmojiPickervue_type_script_lang_js_,
  VEmojiPickervue_type_template_id_2413c210_render,
  VEmojiPickervue_type_template_id_2413c210_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var VEmojiPicker = (VEmojiPicker_component.exports);
// EXTERNAL MODULE: ./src/components/EmojiPicker/data/emojis2.js
var emojis2 = __webpack_require__("fb89");

// EXTERNAL MODULE: ./src/utils/emojiutil.js
var emojiutil = __webpack_require__("f058");

// EXTERNAL MODULE: ./src/utils/util.js
var util = __webpack_require__("ca00");

// EXTERNAL MODULE: ./src/api/comment.js
var api_comment = __webpack_require__("063c");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PopupInput/index.vue?vue&type=template&id=59b25854&
var PopupInputvue_type_template_id_59b25854_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"popup"},[_c('transition',{attrs:{"name":"fade"}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isPopup),expression:"isPopup"}],staticClass:"popuptext",style:(_vm.popupStyle)},[_vm._v(" "+_vm._s(_vm.popupText)+" ")])]),_c('input',{attrs:{"type":_vm.inputType,"required":"required","aria-required":"true","placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"focus":function($event){_vm.isPopup=true},"blur":_vm.inputBlur,"input":function($event){return _vm.$emit('input', $event.target.value)}}})],1)}
var PopupInputvue_type_template_id_59b25854_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PopupInput/index.vue?vue&type=template&id=59b25854&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PopupInput/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var PopupInputvue_type_script_lang_js_ = ({
  props: {
    popupStyle: String,
    popupText: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String
  },
  methods: {
    inputBlur: function inputBlur($event) {
      this.isPopup = false;
      this.$emit('blurInput', $event.target.value);
    }
  },
  data: function data() {
    return {
      isPopup: false
    };
  }
});
// CONCATENATED MODULE: ./src/components/PopupInput/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PopupInputvue_type_script_lang_js_ = (PopupInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/PopupInput/index.vue





/* normalize component */

var PopupInput_component = Object(componentNormalizer["a" /* default */])(
  components_PopupInputvue_type_script_lang_js_,
  PopupInputvue_type_template_id_59b25854_render,
  PopupInputvue_type_template_id_59b25854_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PopupInput = (PopupInput_component.exports);
// EXTERNAL MODULE: ./src/utils/globals.js
var globals = __webpack_require__("0e4d");

// EXTERNAL MODULE: ./src/libs/textarea-caret-position.js
var textarea_caret_position = __webpack_require__("0e27");
var textarea_caret_position_default = /*#__PURE__*/__webpack_require__.n(textarea_caret_position);

// CONCATENATED MODULE: ./src/libs/activate-power-mode.js



var canvas = document.createElement('canvas');
canvas.id = "activate-canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999';
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
var context;
var particles = [];
var particlePointer = 0;
var rendering = false;
POWERMODE.shake = true;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getColor(el) {
  if (POWERMODE.colorful) {
    var u = getRandom(0, 360);
    return 'hsla(' + getRandom(u - 10, u + 10) + ', 100%, ' + getRandom(50, 80) + '%, ' + 1 + ')';
  } else {
    return window.getComputedStyle(el).color;
  }
}

function getCaret() {
  // 操作影子dom中的数据
  var el = document.activeElement.shadowRoot != null ? document.activeElement.shadowRoot.activeElement : document.activeElement;
  var bcr;

  if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT' && el.getAttribute('type') === 'text') {
    var offset = textarea_caret_position_default()(el, el.selectionEnd);
    bcr = el.getBoundingClientRect();
    return {
      x: offset.left + bcr.left,
      y: offset.top + bcr.top,
      color: getColor(el)
    };
  }

  var selection = window.getSelection();

  if (selection.rangeCount) {
    var range = selection.getRangeAt(0);
    var startNode = range.startContainer;

    if (startNode.nodeType === document.TEXT_NODE) {
      startNode = startNode.parentNode;
    }

    bcr = range.getBoundingClientRect();
    return {
      x: bcr.left,
      y: bcr.top,
      color: getColor(startNode)
    };
  }

  return {
    x: 0,
    y: 0,
    color: 'transparent'
  };
}

function createParticle(x, y, color) {
  return {
    x: x,
    y: y,
    alpha: 1,
    color: color,
    velocity: {
      x: -1 + Math.random() * 2,
      y: -3.5 + Math.random() * 2
    }
  };
}

function POWERMODE() {
  var dcm = document.activeElement.shadowRoot != null ? document.activeElement.shadowRoot.ownerDocument : document;

  if (dcm.getElementById("activate-canvas") == null) {
    dcm.body.appendChild(canvas);
    context = canvas.getContext('2d');
  }

  {
    // spawn particles
    var caret = getCaret();
    var numParticles = 5 + Math.round(Math.random() * 10);

    while (numParticles--) {
      particles[particlePointer] = createParticle(caret.x, caret.y, caret.color);
      particlePointer = (particlePointer + 1) % 500;
    }
  }
  {
    // shake screen
    if (POWERMODE.shake) {
      var intensity = 1 + 2 * Math.random();
      var x = intensity * (Math.random() > 0.5 ? -1 : 1);
      var y = intensity * (Math.random() > 0.5 ? -1 : 1);
      dcm.body.style.marginLeft = x + 'px';
      dcm.body.style.marginTop = y + 'px';
      setTimeout(function () {
        dcm.body.style.marginLeft = '';
        dcm.body.style.marginTop = '';
      }, 75);
    }
  }

  if (!rendering) {
    requestAnimationFrame(loop);
  }
}
POWERMODE.colorful = false;

function loop() {
  rendering = true;
  context.clearRect(0, 0, canvas.width, canvas.height);
  var rendered = false;
  var rect = canvas.getBoundingClientRect();

  for (var i = 0; i < particles.length; ++i) {
    var particle = particles[i];
    if (particle.alpha <= 0.1) continue;
    particle.velocity.y += 0.075;
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
    particle.alpha *= 0.96;
    context.globalAlpha = particle.alpha;
    context.fillStyle = particle.color;
    context.fillRect(Math.round(particle.x - 1.5) - rect.left, Math.round(particle.y - 1.5) - rect.top, 3, 3);
    rendered = true;
  }

  if (rendered) {
    requestAnimationFrame(loop);
  } else {
    rendering = false;
  }
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentEditor.vue?vue&type=script&lang=js&










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













/* harmony default export */ var CommentEditorvue_type_script_lang_js_ = ({
  name: "CommentEditor",
  components: {
    VEmojiPicker: VEmojiPicker,
    PopupInput: PopupInput
  },
  props: {
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function validator(value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    replyComment: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    options: {
      required: false,
      default: []
    },
    configs: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      emojiPack: emojis2["default"],
      emojiDialogVisible: false,
      comment: {
        author: null,
        authorUrl: null,
        email: null,
        content: ""
      },
      previewMode: false,
      infoes: [],
      warnings: [],
      successes: [],
      checkType: {
        back: "gravatar-check",
        icon: "fa fa-google"
      },
      globalData: globals["a" /* default */],
      lockPullAvatar: false,
      avatar: this.configs.gravatarSource + "?d=mm"
    };
  },
  computed: {
    renderedContent: function renderedContent() {
      var html = this.comment.content ? marked_default()(this.comment.content) : "";
      return Object(util["h" /* return2Br */])(Object(emojiutil["a" /* renderedEmojiHtml */])(html));
    },
    commentValid: function commentValid() {
      return !Object(util["b" /* isEmpty */])(this.comment.author) && !Object(util["b" /* isEmpty */])(this.comment.email) && !Object(util["b" /* isEmpty */])(this.comment.content);
    },
    isReply: function isReply() {
      return this.globalData.replyId != 0;
    },
    isCurrReply: function isCurrReply() {
      var _this = this;

      var isCurr = !this.replyComment || this.globalData.replyId == this.replyComment.id;

      if (isCurr) {
        // 获取当前评论组件相对于document的位置并跳转
        if (this.isReply) {
          this.viewJump(function (dom) {
            // 获取定位并移动视角
            var rootOffsetTop = _this.$root.$el.offsetTop;
            var offsetTop = dom.offsetTop + rootOffsetTop;
            var clientHeight = window.innerHeight;
            var objHeight = dom.offsetHeight;
            window.scrollTo(document.body.scrollWidth, offsetTop - clientHeight + objHeight + 20);
          });
        }
      }

      return isCurr;
    },
    respondId: function respondId() {
      return "respond-" + (!this.replyComment ? 0 : this.replyComment.id);
    }
  },
  created: function created() {
    // Get info from local storage
    var author = localStorage.getItem("comment-author");
    var authorUrl = localStorage.getItem("comment-authorUrl");
    var email = localStorage.getItem("comment-email");
    var avatar = localStorage.getItem("avatar");
    this.comment.author = author ? author : "";
    this.comment.authorUrl = authorUrl ? authorUrl : "";
    this.comment.email = email ? email : "";
    this.avatar = avatar ? avatar : this.avatar;
    this.$nextTick(function () {
      POWERMODE.colorful = true; // make power mode colorful

      POWERMODE.shake = false; // turn off shake

      document.body.addEventListener('input', POWERMODE);
    });
  },
  methods: {
    handleSubmitClick: function handleSubmitClick() {
      var _this2 = this;

      if (Object(util["b" /* isEmpty */])(this.comment.author)) {
        this.$tips("昵称不能为空", 5000, this);
        return;
      }

      if (Object(util["b" /* isEmpty */])(this.comment.email)) {
        this.$tips("邮箱不能为空", 5000, this);
        return;
      }

      if (Object(util["b" /* isEmpty */])(this.comment.content)) {
        this.$tips("评论内容不能为空", 5000, this);
        return;
      } // Submit the comment


      this.comment.postId = this.targetId;

      if (this.replyComment) {
        // Set parent id if available
        this.comment.parentId = this.replyComment.id;
      }

      api_comment["a" /* default */].createComment(this.target, this.comment).then(function (response) {
        // Store comment author, email, authorUrl
        localStorage.setItem("comment-author", _this2.comment.author);
        localStorage.setItem("comment-email", _this2.comment.email);
        localStorage.setItem("comment-authorUrl", _this2.comment.authorUrl);
        localStorage.setItem("avatar", _this2.avatar); // clear comment

        _this2.comment.content = "";

        _this2.handleCommentCreated(response.data.data);
      }).catch(function (error) {
        _this2.handleFailedToCreateComment(error.response);
      });
    },
    handlePreviewContent: function handlePreviewContent() {
      this.previewMode = !this.previewMode;
    },
    handleCommentCreated: function handleCommentCreated(createdComment) {
      if (createdComment.status === "PUBLISHED") {
        // 成功后直接新增新的评论node
        try {
          this.createdNewNode(createdComment);
          this.$tips("评论成功！", 5000, this);
        } catch (_unused) {
          this.$tips("评论成功，刷新即可显示最新评论！", 5000, this);
        }
      } else {
        // Show tips
        this.$tips("您的评论已经投递至博主，等待博主审核！", 5000, this);
      }
    },
    createdNewNode: function createdNewNode(newComment) {
      var elDom = this.$root.$el;
      var pr = {
        targetId: this.targetId,
        target: this.target,
        options: this.options,
        configs: this.configs,
        comment: newComment
      };
      pr = newComment.parentId == 0 ? pr : _objectSpread2(_objectSpread2({}, pr), {
        isChild: true,
        parent: this.replyComment,
        depth: this.$parent.selfAddDepth
      });

      var CommentNode = function CommentNode() {
        return Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "f9af"));
      }; // 创建一个组件


      var comment = new external_Vue_default.a({
        render: function render(h) {
          return h(CommentNode, {
            props: pr
          });
        }
      });
      var dom;

      if (newComment.parentId == 0) {
        if (elDom.getElementsByClassName("commentwrap").length > 0) {
          dom = elDom.getElementsByClassName("commentwrap")[0];
        } else {
          dom = document.createElement("ul");
          dom.setAttribute("class", "commentwrap");
          var emptyDom = elDom.getElementsByClassName("comment-empty")[0];
          emptyDom.parentNode.replaceChild(dom, emptyDom);
        }
      } else {
        // 获取li
        var parentDom = elDom.getElementsByClassName("comment-" + this.replyComment.id)[0]; // 获取li下的ul节点

        var replyDom = parentDom.getElementsByTagName("ul");

        if (replyDom.length > 0) {
          dom = replyDom[0];
        } else {
          dom = document.createElement("ul");
          dom.setAttribute('class', 'children');
          parentDom.appendChild(dom);
        }
      }

      var nodeDom = document.createElement('div');

      if (dom.children[0]) {
        dom.insertBefore(nodeDom, dom.children[0]);
      } else {
        dom.appendChild(nodeDom);
      }

      comment.$mount(nodeDom);
    },
    handleFailedToCreateComment: function handleFailedToCreateComment(response) {
      var _this3 = this;

      if (response.status === 400) {
        this.$tips(response.data.message);

        if (response.data) {
          var errorDetail = response.data.data;

          if (Object(util["d" /* isObject */])(errorDetail)) {
            Object.keys(errorDetail).forEach(function (key) {
              _this3.$tips(errorDetail[key]);
            });
          }
        }
      }
    },
    handleToogleDialogEmoji: function handleToogleDialogEmoji() {
      this.emojiDialogVisible = !this.emojiDialogVisible;
    },
    handleSelectEmoji: function handleSelectEmoji(args) {
      var emoji, type;
      var emojiComment;

      if (args.length == 0) {
        return;
      }

      if (args.length > 0) {
        emoji = args[0];
      }

      if (args.length > 1) {
        type = args[1];
      }

      if (!type) {
        emojiComment = emoji.name;
      } else {
        if (type === "Math") {
          emojiComment = "f(x)=∫(" + emoji.name + ")sec²xdx";
        } else if (type === "BBCode") {
          emojiComment = ":" + emoji.name + ":";
        }
      }

      this.comment.content += " " + emojiComment + " ";
    },
    handleGithubLogin: function handleGithubLogin() {
      var githubOauthUrl = "http://github.com/login/oauth/authorize";
      var query = {
        client_id: "a1aacd842bc158abd65b",
        redirect_uri: window.location.href,
        scope: "public_repo"
      };
      window.location.href = "".concat(githubOauthUrl, "?").concat(Object(util["f" /* queryStringify */])(query));
    },
    handleGetGithubUser: function handleGetGithubUser() {
      var _this4 = this;

      var accessToken = this.handleGetGithubAccessToken();
      axios_default.a.get("https://cors-anywhere.herokuapp.com/https://api.github.com/user", {
        params: {
          access_token: accessToken
        }
      }).then(function (response) {
        this.$tips(response);
      }).catch(function (error) {
        _this4.$tips(error);
      });
    },
    handleGetGithubAccessToken: function handleGetGithubAccessToken() {
      var _this5 = this;

      var code = Object(util["a" /* getUrlKey */])("code");

      if (code) {
        axios_default.a.get("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token", {
          params: {
            client_id: "a1aacd842bc158abd65b",
            client_secret: "0daedb3923a4cdeb72620df511bdb11685dfe282",
            code: code
          }
        }).then(function (response) {
          var args = response.split("&");
          var arg = args[0].split("=");
          var access_token = arg[1];
          this.$tips(access_token);
          return access_token;
        }).catch(function (error) {
          _this5.$tips(error);
        });
      }
    },
    cancelReply: function cancelReply() {
      // 当replyId为0时则为回复博主
      this.globalData.replyId = 0;
      this.globalData.isReplyData = false; // 取消回复后，将跳转至回复前的地方

      var targetDom = this.$el.previousSibling;
      var offsetTop = targetDom.offsetTop + this.$root.$el.offsetTop;
      window.scrollTo(document.body.scrollWidth, offsetTop);
    },
    pullInfo: function pullInfo() {
      var _this6 = this;

      var author = this.comment.author;

      if (author.length != 0 && Object(util["e" /* isQQ */])(author)) {
        // 如果是QQ号，则拉取QQ头像
        this.pullQQInfo(function () {
          _this6.$tips("拉取QQ信息失败！尝试拉取Gravatar", 2000, _this6); // 如果QQ拉取失败，则尝试拉取Gravatar


          _this6.pullGravatarInfo();
        });
        return;
      } // 防止刚拉取完QQ头像就拉取Gravatar头像


      if (this.lockPullAvatar) {
        this.lockPullAvatar = false;
        return;
      } // 否则拉取Gravatar头像


      this.pullGravatarInfo();
    },
    pullQQInfo: function pullQQInfo(errorQQCallback) {
      var _self = this; // 拉取QQ昵称，头像等


      axios_default.a.get("https://api.lixingyong.com/api/qq", {
        params: {
          id: _self.comment.author
        }
      }).then(function (res) {
        var data = res.data;

        if (!!data.code && data.code == 500) {
          errorQQCallback();
        }

        _self.$tips("拉取QQ头像成功！", 2000, _self);

        _self.comment.author = data.nickname;
        _self.comment.email = data.email;
        _self.avatar = data.avatar;
        _self.lockPullAvatar = true;
      }).catch(function () {
        errorQQCallback();
      });
    },
    pullGravatarInfo: function pullGravatarInfo() {
      var gravatarMd5 = md5_default()(this.comment.email);
      var gravatarSource = this.options.gravatar_source || this.configs.gravatarSource;
      this.avatar = gravatarSource + "/".concat(gravatarMd5, "?s=256&d=") + this.options.comment_gravatar_default;
    },
    // 锚点跳转
    viewJump: function viewJump(callback, targetDom) {
      var _this7 = this;

      // dom为异步更新，因此务必放在nextTick内，否则无法获取到dom。
      this.$nextTick(function () {
        var dom = targetDom || _this7.$el; // 若当前dom不在可视范围内，则将视角移动至dom下

        if (!Object(util["c" /* isInVisibleArea */])(dom, _this7.$root.$el, "bottom")) {
          callback(dom);
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/CommentEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentEditorvue_type_script_lang_js_ = (CommentEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/CommentEditor.vue





/* normalize component */

var CommentEditor_component = Object(componentNormalizer["a" /* default */])(
  components_CommentEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CommentEditor = __webpack_exports__["a"] = (CommentEditor_component.exports);

/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("2d83");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "4a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
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
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5156":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__("1696");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "5183":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://www.ecma-international.org/ecma-262/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};


/***/ }),

/***/ "522d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

var getPolyfill = __webpack_require__("8926");
var define = __webpack_require__("f367");

module.exports = function shimPromiseFinally() {
	requirePromise();

	var polyfill = getPolyfill();
	define(Promise.prototype, { 'finally': polyfill }, {
		'finally': function testFinally() {
			return Promise.prototype['finally'] !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "5270":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var transformData = __webpack_require__("c401");
var isCancel = __webpack_require__("2e67");
var defaults = __webpack_require__("2444");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (Object({"NODE_ENV":"production","BASE_URL":"/"}).NEED_CURRENTSCRIPT_POLYFILL) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("8bbf");
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./node_modules/@vue/web-component-wrapper/dist/vue-wc-wrapper.js
const camelizeRE = /-(\w)/g;
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
};

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
};

function getInitialProps (propsList) {
  const res = {};
  propsList.forEach(key => {
    res[key] = undefined;
  });
  return res
}

function injectHook (options, key, hook) {
  options[key] = [].concat(options[key] || []);
  options[key].unshift(hook);
}

function callHooks (vm, hook) {
  if (vm) {
    const hooks = vm.$options[hook] || [];
    hooks.forEach(hook => {
      hook.call(vm);
    });
  }
}

function createCustomEvent (name, args) {
  return new CustomEvent(name, {
    bubbles: false,
    cancelable: false,
    detail: args
  })
}

const isBoolean = val => /function Boolean/.test(String(val));
const isNumber = val => /function Number/.test(String(val));

function convertAttributeValue (value, name, { type } = {}) {
  if (isBoolean(type)) {
    if (value === 'true' || value === 'false') {
      return value === 'true'
    }
    if (value === '' || value === name) {
      return true
    }
    return value != null
  } else if (isNumber(type)) {
    const parsed = parseFloat(value, 10);
    return isNaN(parsed) ? value : parsed
  } else {
    return value
  }
}

function toVNodes (h, children) {
  const res = [];
  for (let i = 0, l = children.length; i < l; i++) {
    res.push(toVNode(h, children[i]));
  }
  return res
}

function toVNode (h, node) {
  if (node.nodeType === 3) {
    return node.data.trim() ? node.data : null
  } else if (node.nodeType === 1) {
    const data = {
      attrs: getAttributes(node),
      domProps: {
        innerHTML: node.innerHTML
      }
    };
    if (data.attrs.slot) {
      data.slot = data.attrs.slot;
      delete data.attrs.slot;
    }
    return h(node.tagName, data)
  } else {
    return null
  }
}

function getAttributes (node) {
  const res = {};
  for (let i = 0, l = node.attributes.length; i < l; i++) {
    const attr = node.attributes[i];
    res[attr.nodeName] = attr.nodeValue;
  }
  return res
}

function wrap (Vue, Component) {
  const isAsync = typeof Component === 'function' && !Component.cid;
  let isInitialized = false;
  let hyphenatedPropsList;
  let camelizedPropsList;
  let camelizedPropsMap;

  function initialize (Component) {
    if (isInitialized) return

    const options = typeof Component === 'function'
      ? Component.options
      : Component;

    // extract props info
    const propsList = Array.isArray(options.props)
      ? options.props
      : Object.keys(options.props || {});
    hyphenatedPropsList = propsList.map(hyphenate);
    camelizedPropsList = propsList.map(camelize);
    const originalPropsAsObject = Array.isArray(options.props) ? {} : options.props || {};
    camelizedPropsMap = camelizedPropsList.reduce((map, key, i) => {
      map[key] = originalPropsAsObject[propsList[i]];
      return map
    }, {});

    // proxy $emit to native DOM events
    injectHook(options, 'beforeCreate', function () {
      const emit = this.$emit;
      this.$emit = (name, ...args) => {
        this.$root.$options.customElement.dispatchEvent(createCustomEvent(name, args));
        return emit.call(this, name, ...args)
      };
    });

    injectHook(options, 'created', function () {
      // sync default props values to wrapper on created
      camelizedPropsList.forEach(key => {
        this.$root.props[key] = this[key];
      });
    });

    // proxy props as Element properties
    camelizedPropsList.forEach(key => {
      Object.defineProperty(CustomElement.prototype, key, {
        get () {
          return this._wrapper.props[key]
        },
        set (newVal) {
          this._wrapper.props[key] = newVal;
        },
        enumerable: false,
        configurable: true
      });
    });

    isInitialized = true;
  }

  function syncAttribute (el, key) {
    const camelized = camelize(key);
    const value = el.hasAttribute(key) ? el.getAttribute(key) : undefined;
    el._wrapper.props[camelized] = convertAttributeValue(
      value,
      key,
      camelizedPropsMap[camelized]
    );
  }

  class CustomElement extends HTMLElement {
    constructor () {
      super();
      this.attachShadow({ mode: 'open' });

      const wrapper = this._wrapper = new Vue({
        name: 'shadow-root',
        customElement: this,
        shadowRoot: this.shadowRoot,
        data () {
          return {
            props: {},
            slotChildren: []
          }
        },
        render (h) {
          return h(Component, {
            ref: 'inner',
            props: this.props
          }, this.slotChildren)
        }
      });

      // Use MutationObserver to react to future attribute & slot content change
      const observer = new MutationObserver(mutations => {
        let hasChildrenChange = false;
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i];
          if (isInitialized && m.type === 'attributes' && m.target === this) {
            syncAttribute(this, m.attributeName);
          } else {
            hasChildrenChange = true;
          }
        }
        if (hasChildrenChange) {
          wrapper.slotChildren = Object.freeze(toVNodes(
            wrapper.$createElement,
            this.childNodes
          ));
        }
      });
      observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }

    get vueComponent () {
      return this._wrapper.$refs.inner
    }

    connectedCallback () {
      const wrapper = this._wrapper;
      if (!wrapper._isMounted) {
        // initialize attributes
        const syncInitialAttributes = () => {
          wrapper.props = getInitialProps(camelizedPropsList);
          hyphenatedPropsList.forEach(key => {
            syncAttribute(this, key);
          });
        };

        if (isInitialized) {
          syncInitialAttributes();
        } else {
          // async & unresolved
          Component().then(resolved => {
            if (resolved.__esModule || resolved[Symbol.toStringTag] === 'Module') {
              resolved = resolved.default;
            }
            initialize(resolved);
            syncInitialAttributes();
          });
        }
        // initialize children
        wrapper.slotChildren = Object.freeze(toVNodes(
          wrapper.$createElement,
          this.childNodes
        ));
        wrapper.$mount();
        this.shadowRoot.appendChild(wrapper.$el);
      } else {
        callHooks(this.vueComponent, 'activated');
      }
    }

    disconnectedCallback () {
      callHooks(this.vueComponent, 'deactivated');
    }
  }

  if (!isAsync) {
    initialize(Component);
  }

  return CustomElement
}

/* harmony default export */ var vue_wc_wrapper = (wrap);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/runtime/api.js
var api = __webpack_require__("24fb");

// EXTERNAL MODULE: ./node_modules/vue-style-loader/lib/addStylesShadow.js + 1 modules
var addStylesShadow = __webpack_require__("35d6");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Comment.vue?vue&type=template&id=d1cd7ce8&shadow
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"halo-comment serif",attrs:{"id":"halo-comment"}},[(_vm.isReply)?_c('comment-editor',{staticClass:"bottom-comment",attrs:{"targetId":_vm.id,"target":_vm.target,"options":_vm.options,"configs":_vm.mergedConfigs}}):_vm._e(),(!_vm.mergedConfigs.autoLoad && !_vm.loaded)?_c('div',{staticClass:"comment-load-button"},[_c('a',{staticClass:"button-load",attrs:{"href":"javascript:void(0)","rel":"nofollow noopener"},on:{"click":_vm.loadComments}},[_vm._v("加载评论")])]):_vm._e(),_c('comment-loading',{directives:[{name:"show",rawName:"v-show",value:(_vm.commentLoading),expression:"commentLoading"}],attrs:{"configs":_vm.mergedConfigs}}),(_vm.comments.length >=1)?_c('ul',{staticClass:"commentwrap"},[_vm._l((_vm.comments),function(comment,index){return [_c('CommentNode',{key:index,attrs:{"targetId":_vm.id,"target":_vm.target,"comment":comment,"options":_vm.options,"configs":_vm.mergedConfigs,"depth":1}})]})],2):_vm._e(),(_vm.loaded && !_vm.commentLoading && _vm.comments.length<=0)?_c('div',{staticClass:"comment-empty"},[_vm._v(_vm._s(_vm.mergedConfigs.notComment || '暂无评论'))]):_vm._e(),(_vm.pagination.pages > 1)?_c('div',{staticClass:"comment-page"},[_c('pagination',{attrs:{"page":_vm.pagination.page,"size":_vm.pagination.size,"total":_vm.pagination.total},on:{"change":_vm.handlePaginationChange}})],1):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Comment.vue?vue&type=template&id=d1cd7ce8&shadow

// EXTERNAL MODULE: ./src/components/index.js + 10 modules
var components = __webpack_require__("2af9");

// CONCATENATED MODULE: ./src/config/defaultconfig.js
/* harmony default export */ var defaultconfig = ({
  autoLoad: true,
  showUserAgent: true,
  gravatarSource: "//cn.gravatar.com/avatar",
  loadingStyle: "default",
  aWord: "你是我一生只会遇见一次的惊喜 ...",
  authorPopup: "输入QQ号将自动拉取昵称和头像",
  emailPopup: "你将收到回复通知",
  urlPopup: "禁止小广告😀",
  notComment: "暂无评论"
});
// EXTERNAL MODULE: ./src/api/comment.js
var comment = __webpack_require__("063c");

// EXTERNAL MODULE: ./src/utils/service.js
var service = __webpack_require__("9efd");

// CONCATENATED MODULE: ./src/api/option.js

const baseUrl = '/api/content/options';
const optionApi = {};

optionApi.list = () => {
  return Object(service["a" /* default */])({
    url: `${baseUrl}/comment`,
    method: 'get'
  });
};

/* harmony default export */ var api_option = (optionApi);
// EXTERNAL MODULE: ./src/utils/globals.js
var globals = __webpack_require__("0e4d");

// CONCATENATED MODULE: ./node_modules/vue-lazyload/vue-lazyload.esm.js
/*!
 * Vue-Lazyload.js v1.3.3
 * (c) 2019 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// see http://jsperf.com/testing-value-is-primitive/7

var isPrimitive = function isPrimitive(value) {
  return value == null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var assignSymbols = function assignSymbols(receiver, objects) {
  if (receiver === null || typeof receiver === 'undefined') {
    throw new TypeError('expected first argument to be an object.');
  }

  if (typeof objects === 'undefined' || typeof Symbol === 'undefined') {
    return receiver;
  }

  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return receiver;
  }

  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length,
      i = 0;

  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);

    for (var j = 0; j < names.length; j++) {
      var key = names[j];

      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};

var vue_lazyload_esm_toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

  // primitivies
  if (type === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (type === 'string' || val instanceof String) {
    return 'string';
  }
  if (type === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (type === 'function' || val instanceof Function) {
    if (typeof val.constructor.name !== 'undefined' && val.constructor.name.slice(0, 9) === 'Generator') {
      return 'generatorfunction';
    }
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  type = vue_lazyload_esm_toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  if (type === '[object Map Iterator]') {
    return 'mapiterator';
  }
  if (type === '[object Set Iterator]') {
    return 'setiterator';
  }
  if (type === '[object String Iterator]') {
    return 'stringiterator';
  }
  if (type === '[object Array Iterator]') {
    return 'arrayiterator';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  return val.constructor && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

function vue_lazyload_esm_assign(target /*, objects*/) {
  target = target || {};
  var len = arguments.length,
      i = 0;
  if (len === 1) {
    return target;
  }
  while (++i < len) {
    var val = arguments[i];
    if (isPrimitive(target)) {
      target = val;
    }
    if (isObject$1(val)) {
      extend(target, val);
    }
  }
  return target;
}

/**
 * Shallow extend
 */

function extend(target, obj) {
  assignSymbols(target, obj);

  for (var key in obj) {
    if (key !== '__proto__' && hasOwn(obj, key)) {
      var val = obj[key];
      if (isObject$1(val)) {
        if (kindOf(target[key]) === 'undefined' && kindOf(val) === 'function') {
          target[key] = val;
        }
        target[key] = vue_lazyload_esm_assign(target[key] || {}, val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}

/**
 * Returns true if the object is a plain object or a function.
 */

function isObject$1(obj) {
  return kindOf(obj) === 'object' || kindOf(obj) === 'function';
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Expose `assign`
 */

var assignDeep = vue_lazyload_esm_assign;

var inBrowser = typeof window !== 'undefined';
var hasIntersectionObserver = checkIntersectionObserver();

function checkIntersectionObserver() {
  if (inBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get$$1() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
}

var modeType = {
  event: 'event',
  observer: 'observer'

  // CustomEvent polyfill
};var vue_lazyload_esm_CustomEvent = function () {
  if (!inBrowser) return;
  if (typeof window.CustomEvent === 'function') return window.CustomEvent;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  return CustomEvent;
}();

function remove(arr, item) {
  if (!arr.length) return;
  var index = arr.indexOf(item);
  if (index > -1) return arr.splice(index, 1);
}

function some(arr, fn) {
  var has = false;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      has = true;
      break;
    }
  }
  return has;
}

function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;

  var options = el.getAttribute('data-srcset');
  var result = [];
  var container = el.parentNode;
  var containerWidth = container.offsetWidth * scale;

  var spaceIndex = void 0;
  var tmpSrc = void 0;
  var tmpWidth = void 0;

  options = options.trim().split(',');

  options.map(function (item) {
    item = item.trim();
    spaceIndex = item.lastIndexOf(' ');
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
    }
    result.push([tmpWidth, tmpSrc]);
  });

  result.sort(function (a, b) {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  var bestSelectedSrc = '';
  var tmpOption = void 0;

  for (var i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    var next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }

  return bestSelectedSrc;
}

function find(arr, fn) {
  var item = void 0;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      item = arr[i];
      break;
    }
  }
  return item;
}

var getDPR = function getDPR() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return inBrowser ? window.devicePixelRatio || scale : scale;
};

function supportWebp() {
  if (!inBrowser) return false;

  var support = true;
  var d = document;

  try {
    var el = d.createElement('object');
    el.type = 'image/webp';
    el.style.visibility = 'hidden';
    el.innerHTML = '!';
    d.body.appendChild(el);
    support = !el.offsetWidth;
    d.body.removeChild(el);
  } catch (err) {
    support = false;
  }

  return support;
}

function throttle(action, delay) {
  var timeout = null;
  var lastRun = 0;
  return function () {
    if (timeout) {
      return;
    }
    var elapsed = Date.now() - lastRun;
    var context = this;
    var args = arguments;
    var runCallback = function runCallback() {
      lastRun = Date.now();
      timeout = false;
      action.apply(context, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}

function testSupportsPassive() {
  if (!inBrowser) return;
  var support = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get$$1() {
        support = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
  return support;
}

var supportsPassive = testSupportsPassive();

var _ = {
  on: function on(el, type, func) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (supportsPassive) {
      el.addEventListener(type, func, {
        capture: capture,
        passive: true
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },
  off: function off(el, type, func) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    el.removeEventListener(type, func, capture);
  }
};

var loadImageAsync = function loadImageAsync(item, resolve, reject) {
  var image = new Image();
  if (!item || !item.src) {
    var err = new Error('image src is required');
    return reject(err);
  }

  image.src = item.src;

  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    });
  };

  image.onerror = function (e) {
    reject(e);
  };
};

var style = function style(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};

var overflow = function overflow(el) {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};

var scrollParent = function scrollParent(el) {
  if (!inBrowser) return;
  if (!(el instanceof HTMLElement)) {
    return window;
  }

  var parent = el;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function ObjectKeys(obj) {
  if (!(obj instanceof Object)) return [];
  if (Object.keys) {
    return Object.keys(obj);
  } else {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }
}

function ArrayFrom(arrLike) {
  var len = arrLike.length;
  var list = [];
  for (var i = 0; i < len; i++) {
    list.push(arrLike[i]);
  }
  return list;
}

function noop() {}

var ImageCache = function () {
  function ImageCache(_ref) {
    var max = _ref.max;
    classCallCheck(this, ImageCache);

    this.options = {
      max: max || 100
    };
    this._caches = [];
  }

  createClass(ImageCache, [{
    key: 'has',
    value: function has(key) {
      return this._caches.indexOf(key) > -1;
    }
  }, {
    key: 'add',
    value: function add(key) {
      if (this.has(key)) return;
      this._caches.push(key);
      if (this._caches.length > this.options.max) {
        this.free();
      }
    }
  }, {
    key: 'free',
    value: function free() {
      this._caches.shift();
    }
  }]);
  return ImageCache;
}();

// el: {
//     state,
//     src,
//     error,
//     loading
// }

var ReactiveListener = function () {
  function ReactiveListener(_ref) {
    var el = _ref.el,
        src = _ref.src,
        error = _ref.error,
        loading = _ref.loading,
        bindType = _ref.bindType,
        $parent = _ref.$parent,
        options = _ref.options,
        elRenderer = _ref.elRenderer,
        imageCache = _ref.imageCache;
    classCallCheck(this, ReactiveListener);

    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;

    this.naturalHeight = 0;
    this.naturalWidth = 0;

    this.options = options;

    this.rect = null;

    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this._imageCache = imageCache;
    this.performanceData = {
      init: Date.now(),
      loadStart: 0,
      loadEnd: 0
    };

    this.filter();
    this.initState();
    this.render('loading', false);
  }

  /*
   * init listener state
   * @return
   */


  createClass(ReactiveListener, [{
    key: 'initState',
    value: function initState() {
      if ('dataset' in this.el) {
        this.el.dataset.src = this.src;
      } else {
        this.el.setAttribute('data-src', this.src);
      }

      this.state = {
        loading: false,
        error: false,
        loaded: false,
        rendered: false
      };
    }

    /*
     * record performance
     * @return
     */

  }, {
    key: 'record',
    value: function record(event) {
      this.performanceData[event] = Date.now();
    }

    /*
     * update image listener data
     * @param  {String} image uri
     * @param  {String} loading image uri
     * @param  {String} error image uri
     * @return
     */

  }, {
    key: 'update',
    value: function update(_ref2) {
      var src = _ref2.src,
          loading = _ref2.loading,
          error = _ref2.error;

      var oldSrc = this.src;
      this.src = src;
      this.loading = loading;
      this.error = error;
      this.filter();
      if (oldSrc !== this.src) {
        this.attempt = 0;
        this.initState();
      }
    }

    /*
     * get el node rect
     * @return
     */

  }, {
    key: 'getRect',
    value: function getRect() {
      this.rect = this.el.getBoundingClientRect();
    }

    /*
     *  check el is in view
     * @return {Boolean} el is in view
     */

  }, {
    key: 'checkInView',
    value: function checkInView() {
      this.getRect();
      return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
    }

    /*
     * listener filter
     */

  }, {
    key: 'filter',
    value: function filter() {
      var _this = this;

      ObjectKeys(this.options.filter).map(function (key) {
        _this.options.filter[key](_this, _this.options);
      });
    }

    /*
     * render loading first
     * @params cb:Function
     * @return
     */

  }, {
    key: 'renderLoading',
    value: function renderLoading(cb) {
      var _this2 = this;

      this.state.loading = true;
      loadImageAsync({
        src: this.loading
      }, function (data) {
        _this2.render('loading', false);
        _this2.state.loading = false;
        cb();
      }, function () {
        // handler `loading image` load failed
        cb();
        _this2.state.loading = false;
        if (!_this2.options.silent) console.warn('VueLazyload log: load failed with loading image(' + _this2.loading + ')');
      });
    }

    /*
     * try load image and  render it
     * @return
     */

  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      var onFinish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      if (this.attempt > this.options.attempt - 1 && this.state.error) {
        if (!this.options.silent) console.log('VueLazyload log: ' + this.src + ' tried too more than ' + this.options.attempt + ' times');
        onFinish();
        return;
      }
      if (this.state.rendered && this.state.loaded) return;
      if (this._imageCache.has(this.src)) {
        this.state.loaded = true;
        this.render('loaded', true);
        this.state.rendered = true;
        return onFinish();
      }

      this.renderLoading(function () {
        _this3.attempt++;

        _this3.options.adapter['beforeLoad'] && _this3.options.adapter['beforeLoad'](_this3, _this3.options);
        _this3.record('loadStart');

        loadImageAsync({
          src: _this3.src
        }, function (data) {
          _this3.naturalHeight = data.naturalHeight;
          _this3.naturalWidth = data.naturalWidth;
          _this3.state.loaded = true;
          _this3.state.error = false;
          _this3.record('loadEnd');
          _this3.render('loaded', false);
          _this3.state.rendered = true;
          _this3._imageCache.add(_this3.src);
          onFinish();
        }, function (err) {
          !_this3.options.silent && console.error(err);
          _this3.state.error = true;
          _this3.state.loaded = false;
          _this3.render('error', false);
        });
      });
    }

    /*
     * render image
     * @param  {String} state to render // ['loading', 'src', 'error']
     * @param  {String} is form cache
     * @return
     */

  }, {
    key: 'render',
    value: function render(state, cache) {
      this.elRenderer(this, state, cache);
    }

    /*
     * output performance data
     * @return {Object} performance data
     */

  }, {
    key: 'performance',
    value: function performance() {
      var state = 'loading';
      var time = 0;

      if (this.state.loaded) {
        state = 'loaded';
        time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000;
      }

      if (this.state.error) state = 'error';

      return {
        src: this.src,
        state: state,
        time: time
      };
    }

    /*
     * $destroy
     * @return
     */

  }, {
    key: '$destroy',
    value: function $destroy() {
      this.el = null;
      this.src = null;
      this.error = null;
      this.loading = null;
      this.bindType = null;
      this.attempt = 0;
    }
  }]);
  return ReactiveListener;
}();

var DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};

var Lazy = function (Vue) {
  return function () {
    function Lazy(_ref) {
      var preLoad = _ref.preLoad,
          error = _ref.error,
          throttleWait = _ref.throttleWait,
          preLoadTop = _ref.preLoadTop,
          dispatchEvent = _ref.dispatchEvent,
          loading = _ref.loading,
          attempt = _ref.attempt,
          _ref$silent = _ref.silent,
          silent = _ref$silent === undefined ? true : _ref$silent,
          scale = _ref.scale,
          listenEvents = _ref.listenEvents,
          hasbind = _ref.hasbind,
          filter = _ref.filter,
          adapter = _ref.adapter,
          observer = _ref.observer,
          observerOptions = _ref.observerOptions;
      classCallCheck(this, Lazy);

      this.version = '1.3.3';
      this.mode = modeType.event;
      this.ListenerQueue = [];
      this.TargetIndex = 0;
      this.TargetQueue = [];
      this.options = {
        silent: silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        hasbind: false,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };
      this._initEvent();
      this._imageCache = new ImageCache({ max: 200 });
      this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.options.throttleWait);

      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }

    /**
     * update config
     * @param  {Object} config params
     * @return
     */


    createClass(Lazy, [{
      key: 'config',
      value: function config() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        assignDeep(this.options, options);
      }

      /**
       * output listener's load performance
       * @return {Array}
       */

    }, {
      key: 'performance',
      value: function performance() {
        var list = [];

        this.ListenerQueue.map(function (item) {
          list.push(item.performance());
        });

        return list;
      }

      /*
       * add lazy component to queue
       * @param  {Vue} vm lazy component instance
       * @return
       */

    }, {
      key: 'addLazyBox',
      value: function addLazyBox(vm) {
        this.ListenerQueue.push(vm);
        if (inBrowser) {
          this._addListenerTarget(window);
          this._observer && this._observer.observe(vm.el);
          if (vm.$el && vm.$el.parentNode) {
            this._addListenerTarget(vm.$el.parentNode);
          }
        }
      }

      /*
       * add image listener to queue
       * @param  {DOM} el
       * @param  {object} binding vue directive binding
       * @param  {vnode} vnode vue directive vnode
       * @return
       */

    }, {
      key: 'add',
      value: function add(el, binding, vnode) {
        var _this = this;

        if (some(this.ListenerQueue, function (item) {
          return item.el === el;
        })) {
          this.update(el, binding);
          return Vue.nextTick(this.lazyLoadHandler);
        }

        var _valueFormatter2 = this._valueFormatter(binding.value),
            src = _valueFormatter2.src,
            loading = _valueFormatter2.loading,
            error = _valueFormatter2.error;

        Vue.nextTick(function () {
          src = getBestSelectionFromSrcset(el, _this.options.scale) || src;
          _this._observer && _this._observer.observe(el);

          var container = Object.keys(binding.modifiers)[0];
          var $parent = void 0;

          if (container) {
            $parent = vnode.context.$refs[container];
            // if there is container passed in, try ref first, then fallback to getElementById to support the original usage
            $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
          }

          if (!$parent) {
            $parent = scrollParent(el);
          }

          var newListener = new ReactiveListener({
            bindType: binding.arg,
            $parent: $parent,
            el: el,
            loading: loading,
            error: error,
            src: src,
            elRenderer: _this._elRenderer.bind(_this),
            options: _this.options,
            imageCache: _this._imageCache
          });

          _this.ListenerQueue.push(newListener);

          if (inBrowser) {
            _this._addListenerTarget(window);
            _this._addListenerTarget($parent);
          }

          _this.lazyLoadHandler();
          Vue.nextTick(function () {
            return _this.lazyLoadHandler();
          });
        });
      }

      /**
      * update image src
      * @param  {DOM} el
      * @param  {object} vue directive binding
      * @return
      */

    }, {
      key: 'update',
      value: function update(el, binding, vnode) {
        var _this2 = this;

        var _valueFormatter3 = this._valueFormatter(binding.value),
            src = _valueFormatter3.src,
            loading = _valueFormatter3.loading,
            error = _valueFormatter3.error;

        src = getBestSelectionFromSrcset(el, this.options.scale) || src;

        var exist = find(this.ListenerQueue, function (item) {
          return item.el === el;
        });
        if (!exist) {
          this.add(el, binding, vnode);
        } else {
          exist.update({
            src: src,
            loading: loading,
            error: error
          });
        }
        if (this._observer) {
          this._observer.unobserve(el);
          this._observer.observe(el);
        }
        this.lazyLoadHandler();
        Vue.nextTick(function () {
          return _this2.lazyLoadHandler();
        });
      }

      /**
      * remove listener form list
      * @param  {DOM} el
      * @return
      */

    }, {
      key: 'remove',
      value: function remove$$1(el) {
        if (!el) return;
        this._observer && this._observer.unobserve(el);
        var existItem = find(this.ListenerQueue, function (item) {
          return item.el === el;
        });
        if (existItem) {
          this._removeListenerTarget(existItem.$parent);
          this._removeListenerTarget(window);
          remove(this.ListenerQueue, existItem);
          existItem.$destroy();
        }
      }

      /*
       * remove lazy components form list
       * @param  {Vue} vm Vue instance
       * @return
       */

    }, {
      key: 'removeComponent',
      value: function removeComponent(vm) {
        if (!vm) return;
        remove(this.ListenerQueue, vm);
        this._observer && this._observer.unobserve(vm.el);
        if (vm.$parent && vm.$el.parentNode) {
          this._removeListenerTarget(vm.$el.parentNode);
        }
        this._removeListenerTarget(window);
      }
    }, {
      key: 'setMode',
      value: function setMode(mode) {
        var _this3 = this;

        if (!hasIntersectionObserver && mode === modeType.observer) {
          mode = modeType.event;
        }

        this.mode = mode; // event or observer

        if (mode === modeType.event) {
          if (this._observer) {
            this.ListenerQueue.forEach(function (listener) {
              _this3._observer.unobserve(listener.el);
            });
            this._observer = null;
          }

          this.TargetQueue.forEach(function (target) {
            _this3._initListen(target.el, true);
          });
        } else {
          this.TargetQueue.forEach(function (target) {
            _this3._initListen(target.el, false);
          });
          this._initIntersectionObserver();
        }
      }

      /*
      *** Private functions ***
      */

      /*
       * add listener target
       * @param  {DOM} el listener target
       * @return
       */

    }, {
      key: '_addListenerTarget',
      value: function _addListenerTarget(el) {
        if (!el) return;
        var target = find(this.TargetQueue, function (target) {
          return target.el === el;
        });
        if (!target) {
          target = {
            el: el,
            id: ++this.TargetIndex,
            childrenCount: 1,
            listened: true
          };
          this.mode === modeType.event && this._initListen(target.el, true);
          this.TargetQueue.push(target);
        } else {
          target.childrenCount++;
        }
        return this.TargetIndex;
      }

      /*
       * remove listener target or reduce target childrenCount
       * @param  {DOM} el or window
       * @return
       */

    }, {
      key: '_removeListenerTarget',
      value: function _removeListenerTarget(el) {
        var _this4 = this;

        this.TargetQueue.forEach(function (target, index) {
          if (target.el === el) {
            target.childrenCount--;
            if (!target.childrenCount) {
              _this4._initListen(target.el, false);
              _this4.TargetQueue.splice(index, 1);
              target = null;
            }
          }
        });
      }

      /*
       * add or remove eventlistener
       * @param  {DOM} el DOM or Window
       * @param  {boolean} start flag
       * @return
       */

    }, {
      key: '_initListen',
      value: function _initListen(el, start) {
        var _this5 = this;

        this.options.ListenEvents.forEach(function (evt) {
          return _[start ? 'on' : 'off'](el, evt, _this5.lazyLoadHandler);
        });
      }
    }, {
      key: '_initEvent',
      value: function _initEvent() {
        var _this6 = this;

        this.Event = {
          listeners: {
            loading: [],
            loaded: [],
            error: []
          }
        };

        this.$on = function (event, func) {
          if (!_this6.Event.listeners[event]) _this6.Event.listeners[event] = [];
          _this6.Event.listeners[event].push(func);
        };

        this.$once = function (event, func) {
          var vm = _this6;
          function on() {
            vm.$off(event, on);
            func.apply(vm, arguments);
          }
          _this6.$on(event, on);
        };

        this.$off = function (event, func) {
          if (!func) {
            if (!_this6.Event.listeners[event]) return;
            _this6.Event.listeners[event].length = 0;
            return;
          }
          remove(_this6.Event.listeners[event], func);
        };

        this.$emit = function (event, context, inCache) {
          if (!_this6.Event.listeners[event]) return;
          _this6.Event.listeners[event].forEach(function (func) {
            return func(context, inCache);
          });
        };
      }

      /**
       * find nodes which in viewport and trigger load
       * @return
       */

    }, {
      key: '_lazyLoadHandler',
      value: function _lazyLoadHandler() {
        var _this7 = this;

        var freeList = [];
        this.ListenerQueue.forEach(function (listener, index) {
          if (!listener.el || !listener.el.parentNode) {
            freeList.push(listener);
          }
          var catIn = listener.checkInView();
          if (!catIn) return;
          listener.load();
        });
        freeList.forEach(function (item) {
          remove(_this7.ListenerQueue, item);
          item.$destroy();
        });
      }
      /**
      * init IntersectionObserver
      * set mode to observer
      * @return
      */

    }, {
      key: '_initIntersectionObserver',
      value: function _initIntersectionObserver() {
        var _this8 = this;

        if (!hasIntersectionObserver) return;
        this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);
        if (this.ListenerQueue.length) {
          this.ListenerQueue.forEach(function (listener) {
            _this8._observer.observe(listener.el);
          });
        }
      }

      /**
      * init IntersectionObserver
      * @return
      */

    }, {
      key: '_observerHandler',
      value: function _observerHandler(entries, observer) {
        var _this9 = this;

        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            _this9.ListenerQueue.forEach(function (listener) {
              if (listener.el === entry.target) {
                if (listener.state.loaded) return _this9._observer.unobserve(listener.el);
                listener.load();
              }
            });
          }
        });
      }

      /**
      * set element attribute with image'url and state
      * @param  {object} lazyload listener object
      * @param  {string} state will be rendered
      * @param  {bool} inCache  is rendered from cache
      * @return
      */

    }, {
      key: '_elRenderer',
      value: function _elRenderer(listener, state, cache) {
        if (!listener.el) return;
        var el = listener.el,
            bindType = listener.bindType;


        var src = void 0;
        switch (state) {
          case 'loading':
            src = listener.loading;
            break;
          case 'error':
            src = listener.error;
            break;
          default:
            src = listener.src;
            break;
        }

        if (bindType) {
          el.style[bindType] = 'url("' + src + '")';
        } else if (el.getAttribute('src') !== src) {
          el.setAttribute('src', src);
        }

        el.setAttribute('lazy', state);

        this.$emit(state, listener, cache);
        this.options.adapter[state] && this.options.adapter[state](listener, this.options);

        if (this.options.dispatchEvent) {
          var event = new vue_lazyload_esm_CustomEvent(state, {
            detail: listener
          });
          el.dispatchEvent(event);
        }
      }

      /**
      * generate loading loaded error image url
      * @param {string} image's src
      * @return {object} image's loading, loaded, error url
      */

    }, {
      key: '_valueFormatter',
      value: function _valueFormatter(value) {
        var src = value;
        var loading = this.options.loading;
        var error = this.options.error;

        // value is object
        if (isObject(value)) {
          if (!value.src && !this.options.silent) console.error('Vue Lazyload warning: miss src with ' + value);
          src = value.src;
          loading = value.loading || this.options.loading;
          error = value.error || this.options.error;
        }
        return {
          src: src,
          loading: loading,
          error: error
        };
      }
    }]);
    return Lazy;
  }();
};

var LazyComponent = (function (lazy) {
  return {
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    render: function render(h) {
      if (this.show === false) {
        return h(this.tag);
      }
      return h(this.tag, null, this.$slots.default);
    },
    data: function data() {
      return {
        el: null,
        state: {
          loaded: false
        },
        rect: {},
        show: false
      };
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazy.addLazyBox(this);
      lazy.lazyLoadHandler();
    },
    beforeDestroy: function beforeDestroy() {
      lazy.removeComponent(this);
    },

    methods: {
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
      },
      load: function load() {
        this.show = true;
        this.state.loaded = true;
        this.$emit('show', this);
      },
      destroy: function destroy() {
        return this.$destroy;
      }
    }
  };
});

var LazyContainerMananger = function () {
  function LazyContainerMananger(_ref) {
    var lazy = _ref.lazy;
    classCallCheck(this, LazyContainerMananger);

    this.lazy = lazy;
    lazy.lazyContainerMananger = this;
    this._queue = [];
  }

  createClass(LazyContainerMananger, [{
    key: 'bind',
    value: function bind(el, binding, vnode) {
      var container = new LazyContainer$1({ el: el, binding: binding, vnode: vnode, lazy: this.lazy });
      this._queue.push(container);
    }
  }, {
    key: 'update',
    value: function update(el, binding, vnode) {
      var container = find(this._queue, function (item) {
        return item.el === el;
      });
      if (!container) return;
      container.update({ el: el, binding: binding, vnode: vnode });
    }
  }, {
    key: 'unbind',
    value: function unbind(el, binding, vnode) {
      var container = find(this._queue, function (item) {
        return item.el === el;
      });
      if (!container) return;
      container.clear();
      remove(this._queue, container);
    }
  }]);
  return LazyContainerMananger;
}();

var defaultOptions = {
  selector: 'img'
};

var LazyContainer$1 = function () {
  function LazyContainer(_ref2) {
    var el = _ref2.el,
        binding = _ref2.binding,
        vnode = _ref2.vnode,
        lazy = _ref2.lazy;
    classCallCheck(this, LazyContainer);

    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;

    this._queue = [];
    this.update({ el: el, binding: binding });
  }

  createClass(LazyContainer, [{
    key: 'update',
    value: function update(_ref3) {
      var _this = this;

      var el = _ref3.el,
          binding = _ref3.binding;

      this.el = el;
      this.options = assignDeep({}, defaultOptions, binding.value);

      var imgs = this.getImgs();
      imgs.forEach(function (el) {
        _this.lazy.add(el, assignDeep({}, _this.binding, {
          value: {
            src: 'dataset' in el ? el.dataset.src : el.getAttribute('data-src'),
            error: ('dataset' in el ? el.dataset.error : el.getAttribute('data-error')) || _this.options.error,
            loading: ('dataset' in el ? el.dataset.loading : el.getAttribute('data-loading')) || _this.options.loading
          }
        }), _this.vnode);
      });
    }
  }, {
    key: 'getImgs',
    value: function getImgs() {
      return ArrayFrom(this.el.querySelectorAll(this.options.selector));
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      var imgs = this.getImgs();
      imgs.forEach(function (el) {
        return _this2.lazy.remove(el);
      });

      this.vnode = null;
      this.binding = null;
      this.lazy = null;
    }
  }]);
  return LazyContainer;
}();

var LazyImage = (function (lazyManager) {
  return {
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: 'img'
      }
    },
    render: function render(h) {
      return h(this.tag, {
        attrs: {
          src: this.renderSrc
        }
      }, this.$slots.default);
    },
    data: function data() {
      return {
        el: null,
        options: {
          src: '',
          error: '',
          loading: '',
          attempt: lazyManager.options.attempt
        },
        state: {
          loaded: false,
          error: false,
          attempt: 0
        },
        rect: {},
        renderSrc: ''
      };
    },

    watch: {
      src: function src() {
        this.init();
        lazyManager.addLazyBox(this);
        lazyManager.lazyLoadHandler();
      }
    },
    created: function created() {
      this.init();
      this.renderSrc = this.options.loading;
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    },
    beforeDestroy: function beforeDestroy() {
      lazyManager.removeComponent(this);
    },

    methods: {
      init: function init() {
        var _lazyManager$_valueFo = lazyManager._valueFormatter(this.src),
            src = _lazyManager$_valueFo.src,
            loading = _lazyManager$_valueFo.loading,
            error = _lazyManager$_valueFo.error;

        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazyManager.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazyManager.options.preLoad && this.rect.right > 0;
      },
      load: function load() {
        var _this = this;

        var onFinish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          if (!lazyManager.options.silent) console.log('VueLazyload log: ' + this.options.src + ' tried too more than ' + this.options.attempt + ' times');
          onFinish();
          return;
        }
        var src = this.options.src;
        loadImageAsync({ src: src }, function (_ref) {
          var src = _ref.src;

          _this.renderSrc = src;
          _this.state.loaded = true;
        }, function (e) {
          _this.state.attempt++;
          _this.renderSrc = _this.options.error;
          _this.state.error = true;
        });
      }
    }
  };
});

var index = {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var LazyClass = Lazy(Vue);
    var lazy = new LazyClass(options);
    var lazyContainer = new LazyContainerMananger({ lazy: lazy });

    var isVue2 = Vue.version.split('.')[0] === '2';

    Vue.prototype.$Lazyload = lazy;

    if (options.lazyComponent) {
      Vue.component('lazy-component', LazyComponent(lazy));
    }

    if (options.lazyImage) {
      Vue.component('lazy-image', LazyImage(lazy));
    }

    if (isVue2) {
      Vue.directive('lazy', {
        bind: lazy.add.bind(lazy),
        update: lazy.update.bind(lazy),
        componentUpdated: lazy.lazyLoadHandler.bind(lazy),
        unbind: lazy.remove.bind(lazy)
      });
      Vue.directive('lazy-container', {
        bind: lazyContainer.bind.bind(lazyContainer),
        componentUpdated: lazyContainer.update.bind(lazyContainer),
        unbind: lazyContainer.unbind.bind(lazyContainer)
      });
    } else {
      Vue.directive('lazy', {
        bind: lazy.lazyLoadHandler.bind(lazy),
        update: function update(newValue, oldValue) {
          assignDeep(this.vm.$refs, this.vm.$els);
          lazy.add(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: newValue,
            oldValue: oldValue
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          lazy.remove(this.el);
        }
      });

      Vue.directive('lazy-container', {
        update: function update(newValue, oldValue) {
          lazyContainer.update(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: newValue,
            oldValue: oldValue
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          lazyContainer.unbind(this.el);
        }
      });
    }
  }
};

/* harmony default export */ var vue_lazyload_esm = (index);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plugins/Tips/index.vue?vue&type=template&id=790eaf82&
var Tipsvue_type_template_id_790eaf82_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"butterBar butterBar-center"},[_c('p',{staticClass:"butterBar-message",domProps:{"innerHTML":_vm._s(_vm.message)}})])}
var Tipsvue_type_template_id_790eaf82_staticRenderFns = []


// CONCATENATED MODULE: ./src/plugins/Tips/index.vue?vue&type=template&id=790eaf82&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plugins/Tips/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var Tipsvue_type_script_lang_js_ = ({
  name: 'tips',
  props: {
    message: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      show: false
    };
  }

});
// CONCATENATED MODULE: ./src/plugins/Tips/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var plugins_Tipsvue_type_script_lang_js_ = (Tipsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plugins/Tips/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  plugins_Tipsvue_type_script_lang_js_,
  Tipsvue_type_template_id_790eaf82_render,
  Tipsvue_type_template_id_790eaf82_staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var Tips = (component.exports);
// CONCATENATED MODULE: ./src/plugins/Tips/index.js


let tipTem = external_Vue_default.a.extend(Tips);
let instance;
let timer = null;

let tips = (message, time = 6000, _self) => {
  if (!instance) {
    instance = new tipTem();
    instance.vm = instance.$mount();
    /**
    * 解决提示信息不存在的问题，使用此方式后，样式只能由配置参数传入
    * 如果想使用主题自定义的方式，可以采用 var rootDom = document.body; 这时将采用主题定义的样式（默认样式会失效）
    */

    var rootDom = _self.$root.$el;
    rootDom.appendChild(instance.vm.$el);
  }

  if (timer) {
    clearTimeout(timer);
    timer = null;
    instance.show = false;
    instance.message = "";
  }

  instance.time = 3000;

  if (typeof message === 'string') {
    instance.message = message;
  } else {
    return;
  }

  if (typeof time === 'number') {
    instance.time = time;
  }

  instance.show = true;
  timer = setTimeout(() => {
    instance.show = false;
    clearTimeout(timer);
    timer = null;
    instance.message = "";
  }, instance.time);
};

tips.install = Vue => {
  Vue.prototype.$tips = tips;
};

/* harmony default export */ var plugins_Tips = (tips);
// EXTERNAL MODULE: ./src/utils/util.js
var util = __webpack_require__("ca00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Comment.vue?vue&type=script&lang=js&shadow
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









external_Vue_default.a.use(vue_lazyload_esm, {
  error: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/Sakura/images/Transparent_Akkarin.th.jpg',
  loading: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/svg/loader/trans.ajax-spinner-preloader.svg',
  attempt: 1
});
external_Vue_default.a.use(plugins_Tips);
/* harmony default export */ var Commentvue_type_script_lang_js_shadow = ({
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: "post",
      validator: function (value) {
        return ["post", "sheet", "journal"].indexOf(value) !== -1;
      }
    },
    configs: {
      type: Object,
      required: false,
      default: () => defaultconfig
    }
  },

  data() {
    return {
      comments: [],
      pagination: {
        pages: 0,
        page: 0,
        sort: "",
        size: 5,
        total: 0
      },
      commentLoading: false,
      loaded: false,
      repliedSuccess: null,
      replyingComment: null,
      options: {
        comment_gravatar_default: "mm"
      },
      globalData: globals["a" /* default */]
    };
  },

  computed: {
    target() {
      // pluralize it
      return `${this.type}s`;
    },

    mergedConfigs() {
      var jsonConfig;

      if (typeof this.configs === "string") {
        jsonConfig = JSON.parse(this.configs);
      } else if (typeof this.configs === "object") {
        jsonConfig = this.configs;
      } else {
        throw new TypeError("参数类型错误");
      } // 移除值为空的


      Object(util["g" /* removeJsonEmpty */])(jsonConfig);
      return Object.assign(defaultconfig, jsonConfig);
    },

    isReply() {
      return this.globalData.replyId == 0;
    }

  },

  created() {
    if (this.mergedConfigs.autoLoad) {
      this.loadComments();
    }

    this.loadOptions();
  },

  methods: {
    loadComments() {
      this.comments = [];
      this.commentLoading = true;
      comment["a" /* default */].listComments(this.target, this.id, "tree_view", this.pagination).then(response => {
        this.comments = response.data.data.content;
        this.pagination.size = response.data.data.rpp;
        this.pagination.total = response.data.data.total;
        this.pagination.pages = response.data.data.pages;
      }).finally(() => {
        this.commentLoading = false;
        this.loaded = true;
      });
    },

    loadOptions() {
      api_option.list().then(response => {
        this.options = response.data.data;
      });
    },

    handlePaginationChange(page) {
      this.pagination.page = page;
      this.loadComments();
    }

  }
});
// CONCATENATED MODULE: ./src/components/Comment.vue?vue&type=script&lang=js&shadow
 /* harmony default export */ var components_Commentvue_type_script_lang_js_shadow = (Commentvue_type_script_lang_js_shadow); 
// CONCATENATED MODULE: ./src/components/Comment.vue?shadow



function injectStyles (context) {
  
  var style0 = __webpack_require__("a85a")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Commentshadow_component = Object(componentNormalizer["a" /* default */])(
  components_Commentvue_type_script_lang_js_shadow,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var Commentshadow = (Commentshadow_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-wc.js




// runtime shared by every component chunk





window.customElements.define('halo-comment', vue_wc_wrapper(external_Vue_default.a, Commentshadow))

/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5f02":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__("00d8"),
      utf8 = __webpack_require__("9a63").utf8,
      isBuffer = __webpack_require__("044b"),
      bin = __webpack_require__("9a63").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "688e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "791b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e64f");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6193bffe", content, shadowRoot)
};

/***/ }),

/***/ "7a77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "7aac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7b13":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

requirePromise();

var IsCallable = __webpack_require__("7f73");
var SpeciesConstructor = __webpack_require__("8253");
var Type = __webpack_require__("3d27");

var promiseResolve = function PromiseResolve(C, value) {
	return new C(function (resolve) {
		resolve(value);
	});
};

var OriginalPromise = Promise;

var createThenFinally = function CreateThenFinally(C, onFinally) {
	return function (value) {
		var result = onFinally();
		var promise = promiseResolve(C, result);
		var valueThunk = function () {
			return value;
		};
		return promise.then(valueThunk);
	};
};

var createCatchFinally = function CreateCatchFinally(C, onFinally) {
	return function (reason) {
		var result = onFinally();
		var promise = promiseResolve(C, result);
		var thrower = function () {
			throw reason;
		};
		return promise.then(thrower);
	};
};

var promiseFinally = function finally_(onFinally) {
	/* eslint no-invalid-this: 0 */

	var promise = this;

	if (Type(promise) !== 'Object') {
		throw new TypeError('receiver is not an Object');
	}

	var C = SpeciesConstructor(promise, OriginalPromise); // may throw

	var thenFinally = onFinally;
	var catchFinally = onFinally;
	if (IsCallable(onFinally)) {
		thenFinally = createThenFinally(C, onFinally);
		catchFinally = createCatchFinally(C, onFinally);
	}

	return promise.then(thenFinally, catchFinally);
};

if (Object.getOwnPropertyDescriptor) {
	var descriptor = Object.getOwnPropertyDescriptor(promiseFinally, 'name');
	if (descriptor && descriptor.configurable) {
		Object.defineProperty(promiseFinally, 'name', { configurable: true, value: 'finally' });
	}
}

module.exports = promiseFinally;


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f73":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

module.exports = __webpack_require__("21d0");


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "8253":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = __webpack_require__("2c92");
var Type = __webpack_require__("3d27");

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "83b9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__("d925");
var combineURLs = __webpack_require__("e683");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8926":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requirePromise = __webpack_require__("be77");

var implementation = __webpack_require__("7b13");

module.exports = function getPolyfill() {
	requirePromise();
	return typeof Promise.prototype['finally'] === 'function' ? Promise.prototype['finally'] : implementation;
};


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ "8df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("7a77");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a63":
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9efd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


__webpack_require__("09bd").shim();

const service = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL:  true ? '' : undefined,
  timeout: 5000,
  withCredentials: true
});
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});
service.interceptors.response.use(response => {
  return response;
}, error => {
  if (axios__WEBPACK_IMPORTED_MODULE_0___default.a.isCancel(error)) {
    // Vue.$log.debug("Cancelled uploading by user.");
    return Promise.reject(error);
  } // Vue.$log.error("Response failed", error);


  const response = error.response; // const status = response ? response.status : -1;
  // Vue.$log.error("Server response status", status);

  const data = response ? response.data : null;

  if (data) {
    // Business response
    // Vue.$log.error("Business response status", data.status);
    if (data.status === 400) {// TODO handle 400 status error
    } else if (data.status === 401) {// TODO Handle 401 status error
    } else if (data.status === 403) {// TODO handle 403 status error
    } else if (data.status === 404) {// TODO handle 404 status error
    } else if (data.status === 500) {// TODO handle 500 status error
    }
  } else {// TODO Server unavailable
    }

  return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a571":
/***/ (function(module, exports, __webpack_require__) {

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o) {
    var i = 0;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    i = o[Symbol.iterator]();
    return i.next.bind(i);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var defaults = createCommonjsModule(function (module) {
    function getDefaults() {
      return {
        baseUrl: null,
        breaks: false,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false,
        bilibiliEmojiUrl: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/bili/',
        codeEmojiEmojiUrl: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/Sakura/images/smilies/'
      };
    }

    function changeDefaults(newDefaults) {
      module.exports.defaults = newDefaults;
    }

    module.exports = {
      defaults: getDefaults(),
      getDefaults: getDefaults,
      changeDefaults: changeDefaults
    };
  });
  var defaults_1 = defaults.defaults;
  var defaults_2 = defaults.getDefaults;
  var defaults_3 = defaults.changeDefaults;

  /**
   * Helpers
   */
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  var getEscapeReplacement = function getEscapeReplacement(ch) {
    return escapeReplacements[ch];
  };

  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }

    return html;
  }

  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';

      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }

      return '';
    });
  }

  var caret = /(^|[^\[])\^/g;

  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    var obj = {
      replace: function replace(name, val) {
        val = val.source || val;
        val = val.replace(caret, '$1');
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: function getRegex() {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }

  var nonWordAndColonTest = /[^\w:]/g;
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      var prot;

      try {
        prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
      } catch (e) {
        return null;
      }

      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return null;
      }
    }

    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }

    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }

    return href;
  }

  var baseUrls = {};
  var justDomain = /^[^:]+:\/*[^/]*$/;
  var protocol = /^([^:]+:)[\s\S]*$/;
  var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }

    base = baseUrls[' ' + base];
    var relativeBase = base.indexOf(':') === -1;

    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }

      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }

      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  var noopTest = {
    exec: function noopTest() {}
  };

  function merge(obj) {
    var i = 1,
        target,
        key;

    for (; i < arguments.length; i++) {
      target = arguments[i];

      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
      var escaped = false,
          curr = offset;

      while (--curr >= 0 && str[curr] === '\\') {
        escaped = !escaped;
      }

      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
        cells = row.split(/ \|/);
    var i = 0;

    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) {
        cells.push('');
      }
    }

    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }

    return cells;
  } // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.


  function rtrim(str, c, invert) {
    var l = str.length;

    if (l === 0) {
      return '';
    } // Length of suffix matching the invert condition.


    var suffLen = 0; // Step left until we fail to match the invert condition.

    while (suffLen < l) {
      var currChar = str.charAt(l - suffLen - 1);

      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }

    var l = str.length;
    var level = 0,
        i = 0;

    for (; i < l; i++) {
      if (str[i] === '\\') {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;

        if (level < 0) {
          return i;
        }
      }
    }

    return -1;
  }

  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
    }
  }

  var helpers = {
    escape: escape,
    unescape: unescape,
    edit: edit,
    cleanUrl: cleanUrl,
    resolveUrl: resolveUrl,
    noopTest: noopTest,
    merge: merge,
    splitCells: splitCells,
    rtrim: rtrim,
    findClosingBracket: findClosingBracket,
    checkSanitizeDeprecation: checkSanitizeDeprecation
  };

  var defaults$1 = defaults.defaults;
  var rtrim$1 = helpers.rtrim,
      splitCells$1 = helpers.splitCells,
      _escape = helpers.escape,
      findClosingBracket$1 = helpers.findClosingBracket;

  function outputLink(cap, link, raw) {
    var href = link.href;
    var title = link.title ? _escape(link.title) : null;
    var text = cap[1].replace(/\\([\[\]])/g, '$1');

    if (cap[0].charAt(0) !== '!') {
      return {
        type: 'link',
        raw: raw,
        href: href,
        title: title,
        text: text
      };
    } else {
      return {
        type: 'image',
        raw: raw,
        href: href,
        title: title,
        text: _escape(text)
      };
    }
  }

  function indentCodeCompensation(raw, text) {
    var matchIndentToCode = raw.match(/^(\s+)(?:```)/);

    if (matchIndentToCode === null) {
      return text;
    }

    var indentToCode = matchIndentToCode[1];
    return text.split('\n').map(function (node) {
      var matchIndentInNode = node.match(/^\s+/);

      if (matchIndentInNode === null) {
        return node;
      }

      var indentInNode = matchIndentInNode[0];

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    }).join('\n');
  }
  /**
   * Tokenizer
   */


  var Tokenizer_1 = /*#__PURE__*/function () {
    function Tokenizer(options) {
      this.options = options || defaults$1;
    }

    var _proto = Tokenizer.prototype;

    _proto.bilibiliEmoji = function bilibiliEmoji(src) {
      var cap = this.rules.inline.bilibiliEmoji.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'bilibiliEmoji',
            raw: cap[0],
            text: cap[1]
          };
        }
      }
    };

    _proto.textEmoji = function textEmoji(src) {
      var cap = this.rules.inline.textEmoji.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'textEmoji',
            raw: cap[0],
            text: cap[1]
          };
        }
      }
    };

    _proto.codeEmoji = function codeEmoji(src) {
      var cap = this.rules.inline.codeEmoji.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'codeEmoji',
            raw: cap[0],
            text: cap[1]
          };
        }
      }
    };

    _proto.space = function space(src) {
      var cap = this.rules.block.newline.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }

        return {
          raw: '\n'
        };
      }
    };

    _proto.code = function code(src, tokens) {
      var cap = this.rules.block.code.exec(src);

      if (cap) {
        var lastToken = tokens[tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

        if (lastToken && lastToken.type === 'paragraph') {
          return {
            raw: cap[0],
            text: cap[0].trimRight()
          };
        }

        var text = cap[0].replace(/^ {4}/gm, '');
        return {
          type: 'code',
          raw: cap[0],
          codeBlockStyle: 'indented',
          text: !this.options.pedantic ? rtrim$1(text, '\n') : text
        };
      }
    };

    _proto.fences = function fences(src) {
      var cap = this.rules.block.fences.exec(src);

      if (cap) {
        var raw = cap[0];
        var text = indentCodeCompensation(raw, cap[3] || '');
        return {
          type: 'code',
          raw: raw,
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: text
        };
      }
    };

    _proto.heading = function heading(src) {
      var cap = this.rules.block.heading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: cap[2]
        };
      }
    };

    _proto.nptable = function nptable(src) {
      var cap = this.rules.block.nptable.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
          raw: cap[0]
        };

        if (item.header.length === item.align.length) {
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(item.cells[i], item.header.length);
          }

          return item;
        }
      }
    };

    _proto.hr = function hr(src) {
      var cap = this.rules.block.hr.exec(src);

      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    };

    _proto.blockquote = function blockquote(src) {
      var cap = this.rules.block.blockquote.exec(src);

      if (cap) {
        var text = cap[0].replace(/^ *> ?/gm, '');
        return {
          type: 'blockquote',
          raw: cap[0],
          text: text
        };
      }
    };

    _proto.list = function list(src) {
      var cap = this.rules.block.list.exec(src);

      if (cap) {
        var raw = cap[0];
        var bull = cap[2];
        var isordered = bull.length > 1;
        var isparen = bull[bull.length - 1] === ')';
        var list = {
          type: 'list',
          raw: raw,
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : '',
          loose: false,
          items: []
        }; // Get each top-level item.

        var itemMatch = cap[0].match(this.rules.block.item);
        var next = false,
            item,
            space,
            b,
            addBack,
            loose,
            istask,
            ischecked;
        var l = itemMatch.length;

        for (var i = 0; i < l; i++) {
          item = itemMatch[i];
          raw = item; // Remove the list item's bullet
          // so it is seen as the next token.

          space = item.length;
          item = item.replace(/^ *([*+-]|\d+[.)]) */, ''); // Outdent whatever the
          // list item contains. Hacky.

          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          } // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.


          if (i !== l - 1) {
            b = this.rules.block.bullet.exec(itemMatch[i + 1])[0];

            if (isordered ? b.length === 1 || !isparen && b[b.length - 1] === ')' : b.length > 1 || this.options.smartLists && b !== bull) {
              addBack = itemMatch.slice(i + 1).join('\n');
              list.raw = list.raw.substring(0, list.raw.length - addBack.length);
              i = l - 1;
            }
          } // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.


          loose = next || /\n\n(?!\s*$)/.test(item);

          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            list.loose = true;
          } // Check for task list items


          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;

          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          list.items.push({
            type: 'list_item',
            raw: raw,
            task: istask,
            checked: ischecked,
            loose: loose,
            text: item
          });
        }

        return list;
      }
    };

    _proto.html = function html(src) {
      var cap = this.rules.block.html.exec(src);

      if (cap) {
        return {
          type: this.options.sanitize ? 'paragraph' : 'html',
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    };

    _proto.def = function def(src) {
      var cap = this.rules.block.def.exec(src);

      if (cap) {
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        return {
          tag: tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    };

    _proto.table = function table(src) {
      var cap = this.rules.block.table.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
          }

          return item;
        }
      }
    };

    _proto.lheading = function lheading(src) {
      var cap = this.rules.block.lheading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1]
        };
      }
    };

    _proto.paragraph = function paragraph(src) {
      var cap = this.rules.block.paragraph.exec(src);

      if (cap) {
        return {
          type: 'paragraph',
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
        };
      }
    };

    _proto.text = function text(src, tokens) {
      var cap = this.rules.block.text.exec(src);

      if (cap) {
        var lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === 'text') {
          return {
            raw: cap[0],
            text: cap[0]
          };
        }

        return {
          type: 'text',
          raw: cap[0],
          text: cap[0]
        };
      }
    };

    _proto.escape = function escape(src) {
      var cap = this.rules.inline.escape.exec(src);

      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: _escape(cap[1])
        };
      }
    };

    _proto.tag = function tag(src, inLink, inRawBlock) {
      var cap = this.rules.inline.tag.exec(src);

      if (cap) {
        if (!inLink && /^<a /i.test(cap[0])) {
          inLink = true;
        } else if (inLink && /^<\/a>/i.test(cap[0])) {
          inLink = false;
        }

        if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = true;
        } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = false;
        }

        return {
          type: this.options.sanitize ? 'text' : 'html',
          raw: cap[0],
          inLink: inLink,
          inRawBlock: inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    };

    _proto.link = function link(src) {
      var cap = this.rules.inline.link.exec(src);

      if (cap) {
        var lastParenIndex = findClosingBracket$1(cap[2], '()');

        if (lastParenIndex > -1) {
          var start = cap[0].indexOf('!') === 0 ? 5 : 4;
          var linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }

        var href = cap[2];
        var title = '';

        if (this.options.pedantic) {
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        var token = outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0]);
        return token;
      }
    };

    _proto.reflink = function reflink(src, links) {
      var cap;

      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];

        if (!link || !link.href) {
          var text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text: text
          };
        }

        var token = outputLink(cap, link, cap[0]);
        return token;
      }
    };

    _proto.strong = function strong(src) {
      var cap = this.rules.inline.strong.exec(src);

      if (cap) {
        return {
          type: 'strong',
          raw: cap[0],
          text: cap[4] || cap[3] || cap[2] || cap[1]
        };
      }
    };

    _proto.em = function em(src) {
      var cap = this.rules.inline.em.exec(src);

      if (cap) {
        return {
          type: 'em',
          raw: cap[0],
          text: cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]
        };
      }
    };

    _proto.codespan = function codespan(src) {
      var cap = this.rules.inline.code.exec(src);

      if (cap) {
        var text = cap[2].replace(/\n/g, ' ');
        var hasNonSpaceChars = /[^ ]/.test(text);
        var hasSpaceCharsOnBothEnds = text.startsWith(' ') && text.endsWith(' ');

        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }

        text = _escape(text, true);
        return {
          type: 'codespan',
          raw: cap[0],
          text: text
        };
      }
    };

    _proto.br = function br(src) {
      var cap = this.rules.inline.br.exec(src);

      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    };

    _proto.del = function del(src) {
      var cap = this.rules.inline.del.exec(src);

      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[1]
        };
      }
    };

    _proto.autolink = function autolink(src, mangle) {
      var cap = this.rules.inline.autolink.exec(src);

      if (cap) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = _escape(cap[1]);
          href = text;
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.url = function url(src, mangle) {
      var cap;

      if (cap = this.rules.inline.url.exec(src)) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          var prevCapZero;

          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);

          text = _escape(cap[0]);

          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    };

    _proto.inlineText = function inlineText(src, inRawBlock, smartypants) {
      var cap = this.rules.inline.text.exec(src);

      if (cap) {
        var text;

        if (inRawBlock) {
          text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
        } else {
          text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }

        return {
          type: 'text',
          raw: cap[0],
          text: text
        };
      }
    };

    return Tokenizer;
  }();

  var noopTest$1 = helpers.noopTest,
      edit$1 = helpers.edit,
      merge$1 = helpers.merge;
  /**
   * Block-Level Grammar
   */

  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noopTest$1,
    table: noopTest$1,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit$1(block.def).replace('label', block._label).replace('title', block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit$1(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
  block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
  block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
  block._comment = /<!--(?!-?>)[\s\S]*?-->/;
  block.html = edit$1(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.paragraph = edit$1(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
  block.blockquote = edit$1(block.blockquote).replace('paragraph', block.paragraph).getRegex();
  /**
   * Normal Block Grammar
   */

  block.normal = merge$1({}, block);
  /**
   * GFM Block Grammar
   */

  block.gfm = merge$1({}, block.normal, {
    nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
    + ' *([-:]+ *\\|[-| :]*)' // Align
    + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
    // Cells
    table: '^ *\\|(.+)\\n' // Header
    + ' *\\|?( *[-:]+[-| :]*)' // Align
    + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells

  });
  block.gfm.nptable = edit$1(block.gfm.nptable).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  block.gfm.table = edit$1(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  /**
   * Pedantic grammar (original John Gruber's loose markdown specification)
   */

  block.pedantic = merge$1({}, block.normal, {
    html: edit$1('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    fences: noopTest$1,
    // fences not supported
    paragraph: edit$1(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
  });
  /**
   * Inline-Level Grammar
   */

  var inline = {
    bilibiliEmoji: /^f\(x\)=∫\(([^A-Z]\w+?)\)sec²xdx/,
    textEmoji: /^`([^a-zA-Z]+?)`/,
    codeEmoji: /^:([^A-Z]\w+?):/,
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest$1,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    // CDATA section
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
    em: /^_([^\s_])_(?!_)|^_([^\s_<][\s\S]*?[^\s_])_(?!_|[^\s,punctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\s,punctuation])|^\*([^\s*<\[])\*(?!\*)|^\*([^\s<"][\s\S]*?[^\s\[\*])\*(?![\]`punctuation])|^\*([^\s*"<\[][\s\S]*[^\s])\*(?!\*)/,
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest$1,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`:f*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
  }; // list of punctuation marks from common mark spec
  // without ` and ] to workaround Rule 17 (inline code blocks/links)
  // without , to work around example 393

  inline._punctuation = '!"#$%&\'()*+\\-./:;<=>?@\\[^_{|}~';
  inline.em = edit$1(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit$1(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit$1(inline.tag).replace('comment', block._comment).replace('attribute', inline._attribute).getRegex();
  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit$1(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
  inline.reflink = edit$1(inline.reflink).replace('label', inline._label).getRegex();
  /**
   * Normal Inline Grammar
   */

  inline.normal = merge$1({}, inline);
  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge$1({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
    link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
    reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
  });
  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge$1({}, inline.normal, {
    escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`:f*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit$1(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge$1({}, inline.gfm, {
    br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
    text: edit$1(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
  });
  var rules = {
    block: block,
    inline: inline
  };

  var defaults$2 = defaults.defaults;
  var block$1 = rules.block,
      inline$1 = rules.inline;
  /**
   * smartypants text replacement
   */

  function smartypants(text) {
    return text // em-dashes
    .replace(/---/g, "\u2014") // en-dashes
    .replace(/--/g, "\u2013") // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
    .replace(/'/g, "\u2019") // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
    .replace(/"/g, "\u201D") // ellipses
    .replace(/\.{3}/g, "\u2026");
  }
  /**
   * mangle email addresses
   */


  function mangle(text) {
    var out = '',
        i,
        ch;
    var l = text.length;

    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);

      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }

      out += '&#' + ch + ';';
    }

    return out;
  }
  /**
   * Block Lexer
   */


  var Lexer_1 = /*#__PURE__*/function () {
    function Lexer(options) {
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options || defaults$2;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      var rules = {
        block: block$1.normal,
        inline: inline$1.normal
      };

      if (this.options.pedantic) {
        rules.block = block$1.pedantic;
        rules.inline = inline$1.pedantic;
      } else if (this.options.gfm) {
        rules.block = block$1.gfm;

        if (this.options.breaks) {
          rules.inline = inline$1.breaks;
        } else {
          rules.inline = inline$1.gfm;
        }
      }

      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */


    /**
     * Static Lex Method
     */
    Lexer.lex = function lex(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    }
    /**
     * Preprocessing
     */
    ;

    var _proto = Lexer.prototype;

    _proto.lex = function lex(src) {
      src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
      this.blockTokens(src, this.tokens, true);
      this.inline(this.tokens);
      return this.tokens;
    }
    /**
     * Lexing
     */
    ;

    _proto.blockTokens = function blockTokens(src, tokens, top) {
      if (tokens === void 0) {
        tokens = [];
      }

      if (top === void 0) {
        top = true;
      }

      src = src.replace(/^ +$/gm, '');
      var token, i, l, lastToken;

      while (src) {
        // newline
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // code


        if (token = this.tokenizer.code(src, tokens)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }

          continue;
        } // fences


        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // heading


        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // table no leading pipe (gfm)


        if (token = this.tokenizer.nptable(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // hr


        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // blockquote


        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.blockTokens(token.text, [], top);
          tokens.push(token);
          continue;
        } // list


        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          l = token.items.length;

          for (i = 0; i < l; i++) {
            token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
          }

          tokens.push(token);
          continue;
        } // html


        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // def


        if (top && (token = this.tokenizer.def(src))) {
          src = src.substring(token.raw.length);

          if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }

          continue;
        } // table (gfm)


        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // lheading


        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // top-level paragraph


        if (top && (token = this.tokenizer.paragraph(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.text(src, tokens)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }

          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    };

    _proto.inline = function inline(tokens) {
      var i, j, k, l2, row, token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'paragraph':
          case 'text':
          case 'heading':
            {
              token.tokens = [];
              this.inlineTokens(token.text, token.tokens);
              break;
            }

          case 'table':
            {
              token.tokens = {
                header: [],
                cells: []
              }; // header

              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                token.tokens.header[j] = [];
                this.inlineTokens(token.header[j], token.tokens.header[j]);
              } // cells


              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.cells[j];
                token.tokens.cells[j] = [];

                for (k = 0; k < row.length; k++) {
                  token.tokens.cells[j][k] = [];
                  this.inlineTokens(row[k], token.tokens.cells[j][k]);
                }
              }

              break;
            }

          case 'blockquote':
            {
              this.inline(token.tokens);
              break;
            }

          case 'list':
            {
              l2 = token.items.length;

              for (j = 0; j < l2; j++) {
                this.inline(token.items[j].tokens);
              }

              break;
            }
        }
      }

      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    ;

    _proto.inlineTokens = function inlineTokens(src, tokens, inLink, inRawBlock) {
      if (tokens === void 0) {
        tokens = [];
      }

      if (inLink === void 0) {
        inLink = false;
      }

      if (inRawBlock === void 0) {
        inRawBlock = false;
      }

      var token;

      while (src) {
        // bilibili表情 f(x)=∫(weiqu)sec²xdx
        if (token = this.tokenizer.bilibiliEmoji(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // 文字表情


        if (token = this.tokenizer.textEmoji(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // 帖吧表情/BBcodeEmoji


        if (token = this.tokenizer.codeEmoji(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // escape


        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // tag


        if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
          src = src.substring(token.raw.length);
          inLink = token.inLink;
          inRawBlock = token.inRawBlock;
          tokens.push(token);
          continue;
        } // link


        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // reflink, nolink


        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // strong


        if (token = this.tokenizer.strong(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // em


        if (token = this.tokenizer.em(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // code


        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // br


        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // del (gfm)


        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // autolink


        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // url (gfm)


        if (!inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    };

    _createClass(Lexer, null, [{
      key: "rules",
      get: function get() {
        return {
          block: block$1,
          inline: inline$1
        };
      }
    }]);

    return Lexer;
  }();

  var defaults$3 = defaults.defaults;
  var cleanUrl$1 = helpers.cleanUrl,
      escape$1 = helpers.escape;
  /**
   * Renderer
   */

  var Renderer_1 = /*#__PURE__*/function () {
    function Renderer(options) {
      this.options = options || defaults$3;
    }

    var _proto = Renderer.prototype;

    _proto.bilibiliEmoji = function bilibiliEmoji(text) {
      var href = text + '.png';
      href = cleanUrl$1(this.options.sanitize, this.options.bilibiliEmojiUrl, href);
      return '<span class="emotion-inline emotion-item ' + text + '" data-icon="' + text + '"><img src="' + href + '" class="img"></span>';
    };

    _proto.textEmoji = function textEmoji(text) {
      return text;
    };

    _proto.codeEmoji = function codeEmoji(text) {
      var href = 'icon_' + text + '.gif';
      href = cleanUrl$1(this.options.sanitize, this.options.codeEmojiEmojiUrl, href);
      return '<img src="' + href + '" alt=":' + text + ':" class="smilies" data-icon="' + text + '">';
    };

    _proto.code = function code(_code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];

      if (this.options.highlight) {
        var out = this.options.highlight(_code, lang);

        if (out != null && out !== _code) {
          escaped = true;
          _code = out;
        }
      }

      if (!lang) {
        return '<pre><code>' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
      }

      return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
    };

    _proto.blockquote = function blockquote(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    };

    _proto.html = function html(_html) {
      return _html;
    };

    _proto.heading = function heading(text, level, raw, slugger) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
      } // ignore IDs


      return '<h' + level + '>' + text + '</h' + level + '>\n';
    };

    _proto.hr = function hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };

    _proto.list = function list(body, ordered, start) {
      var type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    };

    _proto.listitem = function listitem(text) {
      return '<li>' + text + '</li>\n';
    };

    _proto.checkbox = function checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    };

    _proto.paragraph = function paragraph(text) {
      return '<p>' + text + '</p>\n';
    };

    _proto.table = function table(header, body) {
      if (body) body = '<tbody>' + body + '</tbody>';
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    };

    _proto.tablerow = function tablerow(content) {
      return '<tr>\n' + content + '</tr>\n';
    };

    _proto.tablecell = function tablecell(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    } // span level renderer
    ;

    _proto.strong = function strong(text) {
      return '<strong>' + text + '</strong>';
    };

    _proto.em = function em(text) {
      return '<em>' + text + '</em>';
    };

    _proto.codespan = function codespan(text) {
      return '<code>' + text + '</code>';
    };

    _proto.br = function br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    };

    _proto.del = function del(text) {
      return '<del>' + text + '</del>';
    };

    _proto.link = function link(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<a href="' + escape$1(href) + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += '>' + text + '</a>';
      return out;
    };

    _proto.image = function image(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<img src="' + href + '" alt="' + text + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += this.options.xhtml ? '/>' : '>';
      return out;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    return Renderer;
  }();

  /**
   * TextRenderer
   * returns only the textual part of the token
   */
  var TextRenderer_1 = /*#__PURE__*/function () {
    function TextRenderer() {}

    var _proto = TextRenderer.prototype;

    // no need for block level renderers
    _proto.strong = function strong(text) {
      return text;
    };

    _proto.em = function em(text) {
      return text;
    };

    _proto.codespan = function codespan(text) {
      return text;
    };

    _proto.del = function del(text) {
      return text;
    };

    _proto.html = function html(text) {
      return text;
    };

    _proto.text = function text(_text) {
      return _text;
    };

    _proto.link = function link(href, title, text) {
      return '' + text;
    };

    _proto.image = function image(href, title, text) {
      return '' + text;
    };

    _proto.br = function br() {
      return '';
    };

    return TextRenderer;
  }();

  /**
   * Slugger generates header id
   */
  var Slugger_1 = /*#__PURE__*/function () {
    function Slugger() {
      this.seen = {};
    }
    /**
     * Convert string to unique id
     */


    var _proto = Slugger.prototype;

    _proto.slug = function slug(value) {
      var slug = value.toLowerCase().trim() // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '') // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');

      if (this.seen.hasOwnProperty(slug)) {
        var originalSlug = slug;

        do {
          this.seen[originalSlug]++;
          slug = originalSlug + '-' + this.seen[originalSlug];
        } while (this.seen.hasOwnProperty(slug));
      }

      this.seen[slug] = 0;
      return slug;
    };

    return Slugger;
  }();

  var defaults$4 = defaults.defaults;
  var unescape$1 = helpers.unescape;
  /**
   * Parsing & Compiling
   */

  var Parser_1 = /*#__PURE__*/function () {
    function Parser(options) {
      this.options = options || defaults$4;
      this.options.renderer = this.options.renderer || new Renderer_1();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer_1();
      this.slugger = new Slugger_1();
    }
    /**
     * Static Parse Method
     */


    Parser.parse = function parse(tokens, options) {
      var parser = new Parser(options);
      return parser.parse(tokens);
    }
    /**
     * Parse Loop
     */
    ;

    var _proto = Parser.prototype;

    _proto.parse = function parse(tokens, top) {
      if (top === void 0) {
        top = true;
      }

      var out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'space':
            {
              continue;
            }

          case 'hr':
            {
              out += this.renderer.hr();
              continue;
            }

          case 'heading':
            {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape$1(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }

          case 'code':
            {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }

          case 'table':
            {
              header = ''; // header

              cell = '';
              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                  header: true,
                  align: token.align[j]
                });
              }

              header += this.renderer.tablerow(cell);
              body = '';
              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.tokens.cells[j];
                cell = '';
                l3 = row.length;

                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k]), {
                    header: false,
                    align: token.align[k]
                  });
                }

                body += this.renderer.tablerow(cell);
              }

              out += this.renderer.table(header, body);
              continue;
            }

          case 'blockquote':
            {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }

          case 'list':
            {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = '';

              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = '';

                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);

                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;

                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }

          case 'html':
            {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }

          case 'paragraph':
            {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }

          case 'text':
            {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;

              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }

              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    }
    /**
     * Parse Inline Tokens
     */
    ;

    _proto.parseInline = function parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      var out = '',
          i,
          token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'bilibiliEmoji':
            {
              out += renderer.bilibiliEmoji(token.text);
              break;
            }

          case 'textEmoji':
            {
              out += renderer.textEmoji(token.text);
              break;
            }

          case 'codeEmoji':
            {
              out += renderer.codeEmoji(token.text);
              break;
            }

          case 'escape':
            {
              out += renderer.text(token.text);
              break;
            }

          case 'html':
            {
              out += renderer.html(token.text);
              break;
            }

          case 'link':
            {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }

          case 'image':
            {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }

          case 'strong':
            {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'em':
            {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'codespan':
            {
              out += renderer.codespan(token.text);
              break;
            }

          case 'br':
            {
              out += renderer.br();
              break;
            }

          case 'del':
            {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'text':
            {
              out += renderer.text(token.text);
              break;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    };

    return Parser;
  }();

  var merge$2 = helpers.merge,
      checkSanitizeDeprecation$1 = helpers.checkSanitizeDeprecation,
      escape$2 = helpers.escape;
  var getDefaults = defaults.getDefaults,
      changeDefaults = defaults.changeDefaults,
      defaults$5 = defaults.defaults;
  /**
   * Marked
   */

  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }

    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }

    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }

    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);

    if (callback) {
      var highlight = opt.highlight;
      var tokens;

      try {
        tokens = Lexer_1.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      var done = function done(err) {
        var out;

        if (!err) {
          try {
            out = Parser_1.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
        }

        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;
      if (!tokens.length) return done();
      var pending = 0;
      marked.walkTokens(tokens, function (token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(function () {
            highlight(token.text, token.lang, function (err, code) {
              if (err) {
                return done(err);
              }

              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }

              pending--;

              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });

      if (pending === 0) {
        done();
      }

      return;
    }

    try {
      var _tokens = Lexer_1.lex(src, opt);

      if (opt.walkTokens) {
        marked.walkTokens(_tokens, opt.walkTokens);
      }

      return Parser_1.parse(_tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';

      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
      }

      throw e;
    }
  }
  /**
   * Options
   */


  marked.options = marked.setOptions = function (opt) {
    merge$2(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };

  marked.getDefaults = getDefaults;
  marked.defaults = defaults$5;
  /**
   * Use Extension
   */

  marked.use = function (extension) {
    var opts = merge$2({}, extension);

    if (extension.renderer) {
      (function () {
        var renderer = marked.defaults.renderer || new Renderer_1();

        var _loop = function _loop(prop) {
          var prevRenderer = renderer[prop];

          renderer[prop] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var ret = extension.renderer[prop].apply(renderer, args);

            if (ret === false) {
              ret = prevRenderer.apply(renderer, args);
            }

            return ret;
          };
        };

        for (var prop in extension.renderer) {
          _loop(prop);
        }

        opts.renderer = renderer;
      })();
    }

    if (extension.tokenizer) {
      (function () {
        var tokenizer = marked.defaults.tokenizer || new Tokenizer_1();

        var _loop2 = function _loop2(prop) {
          var prevTokenizer = tokenizer[prop];

          tokenizer[prop] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var ret = extension.tokenizer[prop].apply(tokenizer, args);

            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args);
            }

            return ret;
          };
        };

        for (var prop in extension.tokenizer) {
          _loop2(prop);
        }

        opts.tokenizer = tokenizer;
      })();
    }

    if (extension.walkTokens) {
      var walkTokens = marked.defaults.walkTokens;

      opts.walkTokens = function (token) {
        extension.walkTokens(token);

        if (walkTokens) {
          walkTokens(token);
        }
      };
    }

    marked.setOptions(opts);
  };
  /**
   * Run callback for every token
   */


  marked.walkTokens = function (tokens, callback) {
    for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
      var token = _step.value;
      callback(token);

      switch (token.type) {
        case 'table':
          {
            for (var _iterator2 = _createForOfIteratorHelperLoose(token.tokens.header), _step2; !(_step2 = _iterator2()).done;) {
              var cell = _step2.value;
              marked.walkTokens(cell, callback);
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(token.tokens.cells), _step3; !(_step3 = _iterator3()).done;) {
              var row = _step3.value;

              for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done;) {
                var _cell = _step4.value;
                marked.walkTokens(_cell, callback);
              }
            }

            break;
          }

        case 'list':
          {
            marked.walkTokens(token.items, callback);
            break;
          }

        default:
          {
            if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
      }
    }
  };
  /**
   * Expose
   */


  marked.Parser = Parser_1;
  marked.parser = Parser_1.parse;
  marked.Renderer = Renderer_1;
  marked.TextRenderer = TextRenderer_1;
  marked.Lexer = Lexer_1;
  marked.lexer = Lexer_1.lex;
  marked.Tokenizer = Tokenizer_1;
  marked.Slugger = Slugger_1;
  marked.parse = marked;
  var marked_1 = marked;

  return marked_1;

})));


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a85a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("791b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b189":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__("d4ab"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "b50d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var settle = __webpack_require__("467f");
var cookies = __webpack_require__("7aac");
var buildURL = __webpack_require__("30b5");
var buildFullPath = __webpack_require__("83b9");
var parseHeaders = __webpack_require__("c345");
var isURLSameOrigin = __webpack_require__("3934");
var createError = __webpack_require__("2d83");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "bc3a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cee4");

/***/ }),

/***/ "be77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function requirePromise() {
	if (typeof Promise !== 'function') {
		throw new TypeError('`Promise.prototype.finally` requires a global `Promise` be available.');
	}
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c345":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "c401":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("1d2b");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca00":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return timeAgo; });
/* unused harmony export isUrl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isObject; });
/* unused harmony export validEmail */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isQQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return queryStringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getUrlKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return return2Br; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isInVisibleArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeJsonEmpty; });
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_0__);


/**
 * time ago
 * @param {*} time
 */
function timeAgo(time) {
  var currentTime = new Date().getTime();
  var between = currentTime - time;
  var days = Math.floor(between / (24 * 3600 * 1000));

  if (days === 0) {
    var leave1 = between % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));

    if (hours === 0) {
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));

      if (minutes === 0) {
        var leave3 = leave2 % (60 * 1000);
        var seconds = Math.round(leave3 / 1000);
        return seconds + ' 秒前';
      }

      return minutes + ' 分钟前';
    }

    return hours + ' 小时前';
  }

  if (days < 0) return '刚刚';

  if (days < 1) {
    return days + ' 天前';
  } else {
    return formatDate(time, 'yyyy/MM/dd hh:mm');
  }
}

function formatDate(date, fmt) {
  date = new Date(date);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
} // From <https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php>


function isUrl(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
function isEmpty(content) {
  return content === null || content === undefined || content === '';
}
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}
function validEmail(email) {
  var re = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,8}$/;
  return re.test(email);
}
function isQQ(qq) {
  var re = /^[1-9][0-9]{4,9}$/gim;
  return re.test(qq);
}
const queryStringify = query => {
  const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
  return queryString;
};
function getUrlKey(name) {
  return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || "")[1].replace(/\+/g, "%20")) || null;
}

function trimTailBr(str) {
  return str.replace(/((\s|&nbsp;)*\r?\n)+$/g, '');
}

function limitBr(str) {
  return str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n");
}

function trimHeadBr(str) {
  return str.replace(/^((\s|&nbsp;)*\r?\n)+/g, '');
}

function return2Br(str) {
  str = trimHeadBr(str);
  str = trimTailBr(str);
  str = limitBr(str);
  return str.replace(/\r?\n/g, "<br />");
} //判断一个元素是否在可视区域内

function isInVisibleArea(elem, root) {
  if (!elem || !elem.getBoundingClientRect) return false;
  var clientHeight = window.innerHeight;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 这里需要加上根节点距顶端的距离

  var rootOffsetTop = root.offsetTop;
  var offsetTop = elem.offsetTop + rootOffsetTop;
  var objHeight = elem.offsetHeight;

  if (offsetTop + objHeight < scrollTop + clientHeight && offsetTop + objHeight > scrollTop) {
    return true;
  }

  return false;
}
/**
 * 移除 JSON 内值为空的数据
 * @param {*} obj json 对象
 */

function removeJsonEmpty(obj) {
  for (let k in obj) {
    let v = obj[k];

    if (v === '') {
      delete obj[k];
    } else if (v.constructor == Object) {
      removeJsonEmpty(v);
    }
  }
}

/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cee4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var bind = __webpack_require__("1d2b");
var Axios = __webpack_require__("0a06");
var mergeConfig = __webpack_require__("4a7b");
var defaults = __webpack_require__("2444");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("7a77");
axios.CancelToken = __webpack_require__("8df4");
axios.isCancel = __webpack_require__("2e67");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("0df6");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__("5f02");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d4ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "d6c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__("d4ab");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__("b189");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e64f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC);"]);
// Module
exports.push([module.i, ".halo-comment{-webkit-animation:main .6s;animation:main .6s}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@-webkit-keyframes main{0%{opacity:0;-webkit-transform:translateY(50px);transform:translateY(50px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes main{0%{opacity:0;-webkit-transform:translateY(50px);transform:translateY(50px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes bottom20{0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes bottom20{0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar,::-webkit-scrollbar-track{background-color:#eee}::-webkit-scrollbar-thumb{background-color:orange}div{-webkit-transition:top .8s ease;transition:top .8s ease}.halo-comment a{text-decoration:none;color:#898c7b}.halo-comment input::-webkit-input-placeholder,.halo-comment textarea::-webkit-input-placeholder{color:#ccc}.halo-comment button,.halo-comment input,.halo-comment textarea{box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-webkit-appearance:none;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.halo-comment button:focus,.halo-comment input:focus,.halo-comment textarea:focus{outline:none}.halo-comment ol,.halo-comment ul{list-style:none}.halo-comment{position:relative;font-size:14px;font-weight:500;line-height:1.8;color:#313131;text-rendering:geometricPrecision;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:content-box;box-sizing:content-box}.halo-comment input[type=color],.halo-comment input[type=date],.halo-comment input[type=datetime-local],.halo-comment input[type=datetime],.halo-comment input[type=email],.halo-comment input[type=month],.halo-comment input[type=number],.halo-comment input[type=password],.halo-comment input[type=range],.halo-comment input[type=search],.halo-comment input[type=tel],.halo-comment input[type=text],.halo-comment input[type=time],.halo-comment input[type=url],.halo-comment input[type=week],.halo-comment textarea{color:#666;border:1px solid #ccc;border-radius:3px}.halo-comment .comment-load-button{margin:30px 0;text-align:center}.halo-comment .comment-loader-container{-webkit-animation:top20 .5s;animation:top20 .5s;position:relative;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:30px 0}@-webkit-keyframes top20{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes top20{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.halo-comment .comment-loader-container .comment-loader-default{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:30px}.halo-comment .comment-loader-container .comment-loader-default span{width:4px;height:15px;background-color:#898c7b}.halo-comment .comment-loader-container .comment-loader-default span:first-of-type{-webkit-animation:grow 1s ease-in-out -.45s infinite;animation:grow 1s ease-in-out -.45s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(2){-webkit-animation:grow 1s ease-in-out -.3s infinite;animation:grow 1s ease-in-out -.3s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(3){-webkit-animation:grow 1s ease-in-out -.15s infinite;animation:grow 1s ease-in-out -.15s infinite}.halo-comment .comment-loader-container .comment-loader-default span:nth-of-type(4){-webkit-animation:grow 1s ease-in-out infinite;animation:grow 1s ease-in-out infinite}@-webkit-keyframes grow{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(2);transform:scaleY(2)}}@keyframes grow{0%,to{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(2);transform:scaleY(2)}}.halo-comment .comment-loader-container .comment-loader-circle{border:3px solid #898c7b;border-top-color:#fff;border-radius:50%;width:2.5em;height:2.5em;-webkit-animation:spin .7s linear infinite;animation:spin .7s linear infinite}@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.halo-comment .comment-loader-container .comment-loader-balls{width:3.5em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.halo-comment .comment-loader-container .comment-loader-balls div{width:.7em;height:.7em;border-radius:50%;background-color:#898c7b;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-animation:wave .7s ease-in-out infinite alternate;animation:wave .7s ease-in-out infinite alternate}.halo-comment .comment-loader-container .comment-loader-balls div:first-of-type{-webkit-animation-delay:-.4s;animation-delay:-.4s}.halo-comment .comment-loader-container .comment-loader-balls div:nth-of-type(2){-webkit-animation-delay:-.2s;animation-delay:-.2s}@-webkit-keyframes wave{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}@keyframes wave{0%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}to{-webkit-transform:translateY(100%);transform:translateY(100%)}}.halo-comment ul.commentwrap{margin:0 auto 30px}.halo-comment .commentwrap{width:100%;margin:0 auto;padding:0}.halo-comment .commentwrap .children{padding-left:40px;margin:0}.halo-comment .commentwrap .children main{width:100%}.halo-comment .commentwrap .children .profile{float:left;width:5%;margin-top:4px}.halo-comment .commentwrap .children .profile img{height:40px;width:40px}.halo-comment .commentwrap .children .children .children .children .children .children{margin:0;padding:0}.halo-comment .comment{margin:0;padding:0;list-style:none}.halo-comment .comment .contents{width:100%;float:left}.halo-comment .comment .contents:hover .comment-reply-link{opacity:.9}@media (max-width:880px){.halo-comment .comment .contents{padding-bottom:10px}}.halo-comment .comment .commentwrap hr{height:0;width:100%;background:#eee;border:0;margin:40px 0}.halo-comment .comment hr{clear:both;width:100%;height:1px;margin:40px 0 60px;border:0;background:#e6e6e6}@media (max-width:880px){.halo-comment .comment hr{margin:6.39% 0}}.halo-comment .comment .main{float:right;width:100%;padding:0}.halo-comment .comment .main.shadow:hover img.avatar{-webkit-transform:rotate(1turn);transform:rotate(1turn)}.halo-comment .comment .main.shadow img.avatar{transform:rotate(0deg);-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-ms-transform:rotate(0deg);transition:all 1s ease;-webkit-transition:all 1s ease;-moz-transition:all ease 1s;-o-transition:all ease 1s;-webkit-box-shadow:0 1px 10px -6px rgba(0,0,0,.5);box-shadow:0 1px 10px -6px rgba(0,0,0,.5);margin-left:3px}.halo-comment .comment .profile{float:left;margin-right:10px;margin-top:5px}.halo-comment .comment .profile img{width:100%;max-width:40px;height:40px;border-radius:100%;-webkit-transition:opacity .15s ease-out;transition:opacity .15s ease-out}.halo-comment .comment .profile img:hover{opacity:.8}@media (max-width:880px){.halo-comment .comment .profile{display:none}}.halo-comment .comment .commeta{font-size:16px;overflow:hidden;margin-bottom:5px;text-transform:uppercase;color:#9499a8;margin-left:50px}.halo-comment .comment .commeta .bb-comment{border:1px solid #fb7299;min-width:30px;display:inline-block;text-align:center;font-size:12px;color:#fb7299;border-radius:3px;font-weight:400}.halo-comment .comment .commeta .comment-time{display:inline-block;margin-top:6px;font-size:12px;color:#657786}.halo-comment .comment .commeta .info{margin-top:2px;font-size:12px;letter-spacing:0;text-transform:none;color:rgba(0,0,0,.35)}.halo-comment .comment .commeta .info .useragent-info img{vertical-align:sub;width:14px;height:14px;border:0}@media (max-width:480px){.halo-comment .comment .commeta .info .useragent-info{display:none}}.halo-comment .comment .commeta .info .useragent-info-m{margin-top:2px;font-size:12px;letter-spacing:0;text-transform:none;color:rgba(0,0,0,.35);display:none}.halo-comment .comment .commeta .info .useragent-info-m img{vertical-align:sub;width:14px;height:14px;border:0}@media (max-width:480px){.halo-comment .comment .commeta .info .useragent-info-m{display:inline}}@media (max-width:880px){.halo-comment .comment .commeta{margin-left:0}}.halo-comment .comment h4{font-size:24px;font-weight:400;margin:0;letter-spacing:0;text-transform:none;line-height:20px}.halo-comment .comment h4 a{color:#fe9600;font-size:15px;font-weight:600}.halo-comment .comment h4 a:hover{color:orange}.halo-comment .comment h4 img{display:none;border-radius:3px;margin-right:5px;vertical-align:-4px}@media (max-width:880px){.halo-comment .comment h4 img{display:inline-block}}.halo-comment .comment .comment-reply-link{font-size:12px;display:block;margin-left:10px;float:right;text-transform:uppercase;color:#fff;background-color:orange;line-height:20px;padding:0 6px;border-radius:3px;opacity:0}.halo-comment .comment .comment-reply-link:hover{opacity:1}@media (max-width:880px){.halo-comment .comment .comment-reply-link{opacity:1}}.halo-comment .comment .body{line-height:32px;color:#63686d;position:relative}.halo-comment .comment .body>:last-child{margin-bottom:0}.halo-comment .comment .body p{font-size:14px;line-height:30px;padding-bottom:30px;padding-left:3px;color:#63686d}.halo-comment .comment .body p a{position:relative;color:orange}.halo-comment .comment .body p a:after{content:\"\";position:absolute;width:100%;-webkit-transform:scaleX(0);transform:scaleX(0);height:2px;bottom:0;left:0;background-color:orange;-webkit-transform-origin:bottom right;transform-origin:bottom right;-webkit-transition:-webkit-transform .25s ease-out;transition:-webkit-transform .25s ease-out;transition:transform .25s ease-out;transition:transform .25s ease-out,-webkit-transform .25s ease-out}.halo-comment .comment .body p a:hover:after{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:bottom left;transform-origin:bottom left}.halo-comment .comment .body p p{display:inline}@media (max-width:580px){.halo-comment .comment .body p{margin:0;font-size:12px;line-height:24px;padding-bottom:13px}}.halo-comment .comment .body .comment-at{color:#99ce00;text-decoration:none}.halo-comment .comment .markdown-body .comment_inline_img{display:inline-block;height:150px;margin-right:3px;border:1px solid #ddd;border-radius:4px;padding:3px;cursor:pointer}.halo-comment .comment-editor{width:100%;margin:0 auto;padding:0;-webkit-animation:top20 .5s;animation:top20 .5s}.halo-comment .comment-editor input:active,.halo-comment .comment-editor input:focus,.halo-comment .comment-editor textarea:active,.halo-comment .comment-editor textarea:focus{outline:0}.halo-comment .comment-editor input::-webkit-input-placeholder,.halo-comment .comment-editor textarea::-webkit-input-placeholder{color:#535a63}.halo-comment .comment-editor input::-moz-placeholder,.halo-comment .comment-editor textarea::-moz-placeholder{opacity:1;color:#535a63}.halo-comment .comment-editor input::-ms-input-placeholder,.halo-comment .comment-editor textarea::-ms-input-placeholder{color:#535a63}.halo-comment .comment-editor .cancel-comment-reply-link{background:#f4f6f8;border-radius:3px;padding:12px 25px;font-size:12px;color:#454545}.halo-comment .comment-editor .comment-form{outline:none}.halo-comment .comment-editor .comment-form input,.halo-comment .comment-editor .comment-form textarea{font-size:14px;width:31.3%;margin:0;padding:21px 21px 20px;color:#535a63;background:#fff}.halo-comment .comment-editor .comment-form textarea{background-image:url(https://view.moezx.cc/images/2018/03/24/comment-bg.png);background-size:contain;background-repeat:no-repeat;background-position:100%;resize:vertical;display:block;float:none;width:100%;height:180px;margin-bottom:10px;color:#535a63;border:1px solid #ddd;background-color:transparent}.halo-comment .comment-editor .comment-form textarea:focus{border-color:orange}.halo-comment .comment-editor .comment-form input{border:1px solid #ddd;width:100%;background-color:hsla(0,0%,100%,0)}.halo-comment .comment-editor .comment-form input:last-of-type{margin-right:0}.halo-comment .comment-editor .comment-form input:focus{border-color:#ccc}.halo-comment .comment-editor .comment-form .comment-textarea{position:relative}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:focus{border-color:orange;-webkit-transition:border-color .25s;transition:border-color .25s}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:placeholder-shown::-webkit-input-placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:placeholder-shown::-moz-placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:placeholder-shown:-ms-input-placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:placeholder-shown::-ms-input-placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:-moz-placeholder-shown::placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:-ms-input-placeholder::placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:placeholder-shown::placeholder{color:transparent}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:not(:-moz-placeholder-shown)~.input-label{color:#fff;background-color:orange;transform:scale(.75) translate(-2px,-37px);border-radius:3px}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:not(:-ms-input-placeholder)~.input-label{color:#fff;background-color:orange;transform:scale(.75) translate(-2px,-37px);border-radius:3px}.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:focus~.input-label,.halo-comment .comment-editor .comment-form .comment-textarea .commentbody:not(:placeholder-shown)~.input-label{color:#fff;background-color:orange;-webkit-transform:scale(.75) translate(-2px,-37px);transform:scale(.75) translate(-2px,-37px);border-radius:3px}.halo-comment .comment-editor .comment-form .comment-textarea .input-label{position:absolute;left:16px;top:20px;padding:0 6px;-webkit-transform-origin:0 0;transform-origin:0 0;pointer-events:none;-webkit-transition:all .25s;transition:all .25s}.halo-comment .comment-editor .comment-form .comment-preview{position:relative;width:100%;height:180px;display:block;float:none;-webkit-box-shadow:none;box-shadow:none;border:1px solid #ddd;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:3px;padding:21px 21px 20px;margin:0;background:#fff;line-height:1.5;margin-bottom:10px;overflow-y:auto}.halo-comment .comment-editor .comment-form .comment-preview img{max-width:100%}.halo-comment .comment-editor .comment-form .author-info .commentator{position:absolute;display:inline-block;width:64px;height:64px;pointer-events:none;margin-top:10px}.halo-comment .comment-editor .comment-form .author-info .commentator img{width:100%;height:100%;border-radius:50%}.halo-comment .comment-editor .comment-form .author-info .commentator .socila-check{display:none;width:1.5em;height:1.5em;font-size:1em;line-height:1.5em;text-align:center;color:#fff;border-radius:50%;position:absolute;margin:-28px 0 0 42px}.halo-comment .comment-editor .comment-form .author-info .commentator .gravatar-check{background-color:#1e8cbe;-webkit-transform:rotate(270deg);transform:rotate(270deg)}.halo-comment .comment-editor .comment-form .author-info .commentator .qq-check{background-color:#99ce00}@media (max-width:625px){.halo-comment .comment-editor .comment-form .author-info .commentator{padding-top:10px;width:45px;height:45px;right:11%}.halo-comment .comment-editor .comment-form .author-info .commentator .socila-check{width:1.5em;height:1.5em;font-size:.5em;line-height:1.5em;margin:-40% 0 0 77%}}.halo-comment .comment-editor .comment-form .author-info .cmt-popup{margin:0 0 40px 1%;--widthA:98%;--widthB:calc(var(--widthA) - 71px);--widthC:calc(var(--widthB)/3);width:var(--widthC);margin-top:10px}.halo-comment .comment-editor .comment-form .author-info .cmt-popup.cmt-author{margin-left:70px}@media (max-width:625px){.halo-comment .comment-editor .comment-form .author-info .cmt-popup{margin:0;width:100%;margin-top:15px}.halo-comment .comment-editor .comment-form .author-info .cmt-popup.cmt-author{margin-top:10px;margin-left:0}}@media (min-width:625px){.halo-comment .comment-editor .comment-form .author-info{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}}.halo-comment .comment-editor .comment-form .comment-buttons{font-size:14px;text-align:right;margin-top:10px}.halo-comment .comment-editor .comment-form .comment-buttons .middle{display:inline-block;vertical-align:middle}.halo-comment .comment-editor .comment-form .comment-buttons .button-preview-edit,.halo-comment .comment-editor .comment-form .comment-buttons .button-submit{-webkit-animation:bottom20 .5s;animation:bottom20 .5s;border:none;background:#898c7b;color:#fff;font-weight:500;padding:6px 18px;text-transform:uppercase;border-radius:4px;display:inline-block;-webkit-transition:all .3s ease 0s;transition:all .3s ease 0s}.halo-comment .comment-editor .comment-form .comment-buttons .button-preview-edit:hover,.halo-comment .comment-editor .comment-form .comment-buttons .button-submit:hover{color:#404040;font-weight:700;letter-spacing:3px;background:none;-webkit-box-shadow:0 5px 40px -10px rgba(0,0,0,.57);box-shadow:0 5px 40px -10px rgba(0,0,0,.57);-webkit-transition:all .3s ease 0s;transition:all .3s ease 0s}@media (max-width:1080px){.halo-comment .comment-editor{width:100%;padding:0 6.39%;max-width:1245px;-webkit-box-sizing:border-box;box-sizing:border-box}.halo-comment .comment-editor input{width:100%;margin-bottom:15px}}.halo-comment .comment-empty{margin:30px 0;text-align:center;color:#8899a6}.halo-comment .comment-page{margin-top:30px;text-align:center;border-top:3px solid #f5f8fa}.halo-comment .comment-page .page{display:inline-block;padding:10px 0;margin:0}.halo-comment .comment-page .page li{display:inline;margin-right:5px}.halo-comment .comment-page .page button{margin-bottom:8px;position:relative;font-size:inherit;font-family:inherit;padding:5px 10px;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;-webkit-transition:all .8s;transition:all .8s;font-weight:400;color:rgba(0,0,0,.65);background-color:#fff}.halo-comment .comment-page .page button:hover{color:#1890ff;border-color:#1890ff}.halo-comment .comment-page .page .active{color:#1890ff;border-color:#1890ff}#emotion-toggle{text-align:center;margin-bottom:5px}#emotion-toggle,.emoji-item,.emotion-box,.emotion-item,.on-hover,.tieba-container span{cursor:url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/cursor/No_Disponible.cur),auto}.emoji-fade-enter-active,.emoji-fade-leave-active{-webkit-transition:all .8s ease;transition:all .8s ease}.emoji-fade-enter,.emoji-fade-leave-to{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.emotion-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.emotion-box .category-enter,.emotion-box .category-leave-to{opacity:0}.emotion-box .category-enter-active,.emotion-box .category-leave-active{-webkit-transition:all .2s ease;transition:all .2s ease}.emotion-box .category-enter{-webkit-transform:translateX(10px);transform:translateX(10px)}.emotion-box .category-leave-to{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.emotion-box .motion-switcher-table{border-collapse:collapse;width:100%;margin:0;table-layout:fixed}.emotion-box .motion-switcher-table td,.emotion-box .motion-switcher-table th{padding:8px;text-align:center;border-radius:5px}.emotion-box .motion-switcher-table th:hover{background-color:hsla(0,0%,96.1%,.5);color:orange}.emotion-box .motion-switcher-table .on-hover{color:orange}.emotion-box .motion-container{height:110px;overflow:auto;margin-bottom:5px;border-radius:5px}.emotion-box .motion-container.bilibili-container,.emotion-box .motion-container.tieba-container{padding-left:16px}@media (max-width:860px){.emotion-box .motion-container.bilibili-container,.emotion-box .motion-container.tieba-container{padding-left:0}}.emotion-box .motion-container img,.emotion-box .motion-container span{width:32px;height:32px}@media (max-width:860px){.emotion-box .motion-container img,.emotion-box .motion-container span{-webkit-transform:scale(.6);transform:scale(.6);margin-bottom:-10px}}.emotion-box .motion-container img{margin:7px;max-width:100%;border:0}.emotion-box .motion-container img:hover{background-color:hsla(0,0%,96.1%,.8);border-radius:5px}.emotion-box .motion-container .emoji-item{padding:3px 5px;margin:3px;display:inline-block;border-radius:4px;color:#333}.emotion-box .motion-container .emoji-item:hover{background-color:hsla(0,0%,96.1%,.8)}.emotion-box .motion-container a{background-color:transparent;text-decoration:none;cursor:url(https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/cursor/ayuda.cur),auto;color:#e67474;outline:none;-webkit-transition:color .2s ease-out,border .2s ease-out,opacity .2s ease-out;transition:color .2s ease-out,border .2s ease-out,opacity .2s ease-out}.emotion-box .motion-container .emotion-select-parent{background-size:cover}.emotion-box .motion-container .emotion-select-parent:hover{background-color:hsla(0,0%,96.1%,.8);background-image:none!important;border-radius:5px}.emotion-box .motion-container .emotion-select-parent:hover .emotion-select-child{display:block}.emotion-box .motion-container .emotion-select-child{display:none}.emotion-box .motion-container .emotion-secter{margin:12px 12px 0 0}@media (max-width:860px){.emotion-box .motion-container .emotion-secter{margin:0}.emotion-box .motion-container .emotion-secter .emotion-select-parent:hover{background-image:none!important;-webkit-transform:scale(.6);transform:scale(.6)}}.emotion-box .emotion-inline{padding-left:0!important;padding-right:0!important}.emotion-item{margin:6px;display:inline-block;width:32px;height:32px;overflow:hidden;border-radius:4px;margin-bottom:-8px}.emotion-item .img{-webkit-animation:im-emotion-step 1.08s steps(27) infinite;animation:im-emotion-step 1.08s steps(27) infinite;-webkit-animation-duration:1.08s;animation-duration:1.08s;-webkit-animation-timing-function:steps(27);animation-timing-function:steps(27);width:32px;height:864px;max-width:32px;background:top/32px no-repeat;background-image:none}@-webkit-keyframes im-emotion-step{0%{-webkit-transform:translateY(0);transform:translateY(0)}to{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}@keyframes im-emotion-step{0%{-webkit-transform:translateY(0);transform:translateY(0)}to{-webkit-transform:translateY(-100%);transform:translateY(-100%)}}@media (max-width:860px){.emotion-item{-webkit-transform:scale(.6);transform:scale(.6);margin-bottom:-10px}}.popup{position:relative;display:inline-block;cursor:pointer}.popup .popuptext{width:auto;padding:8px 10px;background-color:#555;color:#fff;text-align:center;border-radius:6px;position:absolute;z-index:1;bottom:110%;left:50%;margin-left:-80px}.popup .popuptext:after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent}.popup .fade-enter-active,.popup .fade-enter-to{-webkit-transition:opacity 1s;transition:opacity 1s}.popup .fade-enter,.popup .fade-leave-to{opacity:0}.smilies{height:1em;max-height:1em}.butterBar{position:fixed;text-align:center;top:0;left:0;right:0;width:100%;z-index:10000}.butterBar.butterBar-center{margin:auto}.butterBar .butterBar-message{background:#fe9600;color:#fff;border-bottom-left-radius:4px;border-bottom-right-radius:4px;display:inline-block;font-size:14px;margin-bottom:0;padding:12px 25px;z-index:10000;margin-top:-4px}.serif{font-family:\"Noto Serif SC\",\"Source Han Serif SC\",\"Source Han Serif\",\"source-han-serif-sc\",\"PT Serif\",SongTi SC,MicroSoft Yahei,Georgia,serif}.markdown-body{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#24292e;line-height:1.5;font-size:16px;word-wrap:break-word}.markdown-body .octicon{display:inline-block;fill:currentColor;vertical-align:text-bottom}.markdown-body .anchor{float:left;line-height:1;margin-left:-20px;padding-right:4px}.markdown-body .anchor:focus{outline:none}.markdown-body details{display:block}.markdown-body details summary{cursor:pointer}.markdown-body summary{display:list-item}.markdown-body a{background-color:transparent;text-decoration:none}.markdown-body a:hover{text-decoration:underline}.markdown-body a:not([href]){color:inherit;text-decoration:none}.markdown-body strong{font-weight:inherit;font-weight:bolder;font-weight:600}.markdown-body h1{margin:.67em 0;font-size:32px;font-size:2em}.markdown-body img{border-style:none;background-color:#fff;max-width:100%}.markdown-body hr,.markdown-body img{-webkit-box-sizing:content-box;box-sizing:content-box}.markdown-body hr{overflow:visible;background:transparent;border-bottom:1px solid #dfe2e5;height:0;margin:15px 0;overflow:hidden;background-color:#e1e4e8;border:0;height:.25em;margin:24px 0;padding:0;border-bottom-color:#eee}.markdown-body hr:before{content:\"\";display:table}.markdown-body hr:after{clear:both;content:\"\";display:table}.markdown-body input{font:inherit;margin:0;overflow:visible;font-family:inherit;font-size:inherit;line-height:inherit}.markdown-body [type=checkbox]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}.markdown-body *{-webkit-box-sizing:border-box;box-sizing:border-box}.markdown-body table{border-collapse:collapse;border-spacing:0;display:block;overflow:auto;width:100%}.markdown-body table th{font-weight:600}.markdown-body table tr{background-color:#fff;border-top:1px solid #c6cbd1}.markdown-body table tr:nth-child(2n){background-color:#f6f8fa}.markdown-body h2{font-size:24px;font-size:1.5em}.markdown-body h3{font-size:20px;font-size:1.25em}.markdown-body h4{font-size:16px;font-size:1em}.markdown-body h5{font-size:14px;font-size:.875em}.markdown-body h6{font-size:12px;color:#6a737d;font-size:.85em}.markdown-body p{margin-bottom:10px;margin-top:0}.markdown-body blockquote{margin:0;border-left:.25em solid #dfe2e5;color:#6a737d;padding:0 1em}.markdown-body blockquote>:first-child{margin-top:0}.markdown-body blockquote>:last-child{margin-bottom:0}.markdown-body dd{margin-left:0}.markdown-body pre{margin-bottom:0;margin-top:0;word-wrap:normal}.markdown-body pre>code{background:transparent;border:0;font-size:100%;margin:0;padding:0;white-space:pre;word-break:normal}.markdown-body pre code{background-color:transparent;border:0;display:inline;line-height:inherit;margin:0;max-width:auto;overflow:visible;padding:0;word-wrap:normal}.markdown-body li{word-wrap:break-all}.markdown-body li>p{margin-top:16px}.markdown-body li+li{margin-top:.25em}.markdown-body dl{padding:0}.markdown-body dl dt{font-size:1em;font-style:italic;font-weight:600;margin-top:16px;padding:0}.markdown-body dl dd{margin-bottom:16px;padding:0 16px}.markdown-body img[align=right]{padding-left:20px}.markdown-body img[align=left]{padding-right:20px}.markdown-body code{background-color:rgba(27,31,35,.05);border-radius:3px;font-size:85%;margin:0;padding:.2em .4em}.markdown-body .highlight{margin-bottom:16px}.markdown-body .highlight pre{margin-bottom:0;word-break:normal}.markdown-body a:active,.markdown-body a:hover{outline-width:0}.markdown-body code,.markdown-body pre{font-family:monospace,monospace;font-size:1em}.markdown-body td,.markdown-body th{padding:0}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-bottom:0;margin-top:0;font-weight:600;line-height:1.25;margin-bottom:16px;margin-top:24px}.markdown-body h1,.markdown-body h2{font-weight:600;border-bottom:1px solid #eaecef;padding-bottom:.3em}.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{font-weight:600}.markdown-body ol,.markdown-body ul{margin-bottom:0;margin-top:0;padding-left:0;padding-left:2em}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ol ol ol,.markdown-body ol ul ol,.markdown-body ul ol ol,.markdown-body ul ul ol{list-style-type:lower-alpha}.markdown-body code,.markdown-body pre{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px}.markdown-body input::-webkit-inner-spin-button,.markdown-body input::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}.markdown-body blockquote,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{margin-bottom:16px;margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-bottom:0;margin-top:0}.markdown-body table td,.markdown-body table th{border:1px solid #dfe2e5;padding:6px 13px}.markdown-body .highlight pre,.markdown-body pre{background-color:#f6f8fa;border-radius:3px;font-size:85%;line-height:1.45;overflow:auto;padding:16px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e683":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e9ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__("5156")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%': generator ? getProto(generator()) : undefined,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = __webpack_require__("0f7c");
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};


/***/ }),

/***/ "f058":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderedEmojiHtml; });
const emojiData = __webpack_require__("fb89");

function renderedEmojiHtml(html) {
  let parser = new DOMParser();
  let doc = removeNotEmoji(parser.parseFromString(html, "text/html"));
  let emotions = doc.getElementsByClassName("emotion-item");

  for (let i = 0; i < emotions.length; i++) {
    let emojiName = emotions[i].getAttribute("data-icon");

    for (let j = 0; j < emojiData["default"].length; j++) {
      if (emojiData["default"][j]["name"] === emojiName) {
        let emoji = emojiData["default"][j];
        let img = emotions[i].getElementsByClassName("img")[0];
        let dataStyle = "";
        Object.keys(emoji.style).forEach(function (item) {
          dataStyle += item + ":" + emoji.style[item] + ";";
        });
        img.style.cssText = dataStyle;
        break;
      }
    }
  }

  return doc.body.innerHTML;
}
/**
 * 判断需要渲染的 HTML 是否属于表情包，如果不属于，则去除此 HTML，仅保留文字
 * issue#17 https://github.com/LIlGG/halo-comment-sakura/issues/17
 */

function removeNotEmoji(doc) {
  let smilies = doc.getElementsByClassName("smilies");
  loopSearchEmoji(smilies, "tieba", node => {
    let alt = node.getAttribute('alt');
    let textNode = document.createTextNode(alt);
    node.parentNode.replaceChild(textNode, node);
  });
  return doc;
}

function loopSearchEmoji(nodeList, type, callback) {
  for (let i = 0; i < nodeList.length; i++) {
    var name = nodeList[i].dataset.icon;

    if (!findEmoji(type, name)) {
      callback(nodeList[i]);
    }
  }
}
/**
 * 根据条件查找表情
 * @param {*} type 
 * @param {*} name
 * @returns 返回 true 则表示表情存在，返回 false 则表示不存在
 */


function findEmoji(type, name) {
  return emojiData["default"].filter(item => item.category === type && item.name === name).length > 0;
}

/***/ }),

/***/ "f367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__("d6c7");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f6b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f9af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"bbcda878-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentNode.vue?vue&type=template&id=2051dab4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('li',{staticClass:"comment",class:_vm.commentClass,attrs:{"id":'comment-'+_vm.comment.id,"itemtype":"http://schema.org/Comment","itemprop":"comment"}},[_c('div',{staticClass:"contents"},[_c('div',{staticClass:"main shadow"},[_c('div',{staticClass:"profile"},[_c('a',{attrs:{"href":_vm.comment.authorUrl,"rel":"nofollow","target":"_blank"}},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(_vm.avatar),expression:"avatar"}],staticClass:"avatar",attrs:{"alt":_vm.comment.author,"height":"80","width":"80"}})])]),_c('div',{staticClass:"commentinfo"},[_c('section',{staticClass:"commeta"},[_c('div',{staticClass:"left"},[_c('h4',{staticClass:"author"},[_c('a',{attrs:{"href":_vm.comment.authorUrl,"rel":"nofollow","target":"_blank"}},[_c('img',{staticClass:"avatar",attrs:{"alt":_vm.comment.author,"src":_vm.avatar,"height":"24","width":"24"}}),(_vm.comment.isAdmin)?_c('span',{staticClass:"bb-comment isauthor",attrs:{"title":"博主"}},[_vm._v("博主")]):_vm._e(),_vm._v(" "+_vm._s(_vm.comment.author)+" ")])])]),_c('a',{staticClass:"comment-reply-link",style:(_vm.editing?'display:block;':''),attrs:{"rel":"nofollow","onclick":"return false;","href":"javascript:void(0);"},on:{"click":_vm.handleReplyClick}},[_vm._v("Reply")]),_c('div',{staticClass:"right"},[_c('div',{staticClass:"info"},[_c('time',{staticClass:"comment-time",attrs:{"itemprop":"datePublished","datetime":_vm.comment.createTime}},[_vm._v("发布于 "+_vm._s(_vm.createTimeAgo))]),(_vm.configs.showUserAgent)?_c('span',{staticClass:"useragent-info",domProps:{"innerHTML":_vm._s(_vm.compileUserAgent)}}):_vm._e()])])])]),_c('div',{staticClass:"body markdown-body"},[_c('p',{domProps:{"innerHTML":_vm._s(_vm.compileContent)}})])])]),_c('hr'),(_vm.comment.children)?_c('ul',{staticClass:"children"},[_vm._l((_vm.comment.children),function(children,index){return [_c('CommentNode',{key:index,attrs:{"isChild":true,"targetId":_vm.targetId,"target":_vm.target,"comment":children,"options":_vm.options,"configs":_vm.configs,"depth":_vm.selfAddDepth,"parent":_vm.comment}})]})],2):_vm._e()]),_c('CommentEditor',{attrs:{"targetId":_vm.targetId,"target":_vm.target,"replyComment":_vm.comment,"options":_vm.options,"configs":_vm.configs}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CommentNode.vue?vue&type=template&id=2051dab4&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./src/components/index.js + 10 modules
var components = __webpack_require__("2af9");

// EXTERNAL MODULE: ./src/utils/util.js
var util = __webpack_require__("ca00");

// EXTERNAL MODULE: ./node_modules/ua-parser-js/src/ua-parser.js
var ua_parser = __webpack_require__("2b80");
var ua_parser_default = /*#__PURE__*/__webpack_require__.n(ua_parser);

// EXTERNAL MODULE: ./node_modules/l-marked/lib/marked.js
var marked = __webpack_require__("a571");
var marked_default = /*#__PURE__*/__webpack_require__.n(marked);

// EXTERNAL MODULE: ./src/utils/emojiutil.js
var emojiutil = __webpack_require__("f058");

// EXTERNAL MODULE: ./src/components/CommentEditor.vue + 42 modules
var CommentEditor = __webpack_require__("3f17");

// EXTERNAL MODULE: ./src/utils/globals.js
var globals = __webpack_require__("0e4d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CommentNode.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var CommentNodevue_type_script_lang_js_ = ({
  name: "CommentNode",
  components: {
    CommentEditor: CommentEditor["a" /* default */]
  },
  props: {
    parent: {
      type: Object,
      required: false,
      default: undefined
    },
    depth: {
      type: Number,
      required: false,
      default: 1
    },
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function validator(value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    comment: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    options: {
      type: Object,
      required: false,
      default: function _default() {}
    },
    configs: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      editing: false,
      level: [{
        name: "小萌新~",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_0.svg"
      }, {
        name: "小魔仙",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_1.svg"
      }, {
        name: "初露头角",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_2.svg"
      }, {
        name: "大水笔",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_3.svg"
      }, {
        name: "后宫团",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_4.svg"
      }, {
        name: "有豪宅",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_5.svg"
      }, {
        name: "德国骨科",
        icon: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_6.svg"
      }],
      globalData: globals["a" /* default */]
    };
  },
  created: function created() {
    var renderer = {
      image: function image(href, title) {
        return "\n          <img src=\"".concat(href, "\" title=\"").concat(title, "\" class=\"lazyload comment_inline_img\" onerror=\"imgError(this)\">");
      },
      link: function link(href, title, text) {
        return "<a href=\"".concat(href, "\" title=\"").concat(title, "\" target=\"_blank\" rel=\"nofollow\">").concat(text, "</a>");
      }
    };
    marked_default.a.use({
      renderer: renderer
    });
  },
  computed: {
    avatar: function avatar() {
      var gravatarSource = this.options.gravatar_source || this.configs.gravatarSource;
      return gravatarSource + "/".concat(this.comment.gravatarMd5, "?s=256&d=") + this.options.comment_gravatar_default;
    },
    compileContent: function compileContent() {
      var at = "";

      if (this.parent != undefined) {
        at = '<a href="' + this.parent.authorUrl + '" class="comment-at"> @' + this.parent.author + " </a>";
      } // 获取转换后的marked


      var markedHtml = marked_default()(at + this.comment.content); // 处理其中的img
      // 处理表情包

      var emoji = Object(emojiutil["a" /* renderedEmojiHtml */])(markedHtml); // 将回车转换为br

      return Object(util["h" /* return2Br */])(emoji);
    },
    createTimeAgo: function createTimeAgo() {
      return Object(util["i" /* timeAgo */])(this.comment.createTime);
    },
    compileUserAgent: function compileUserAgent() {
      var parser = new ua_parser_default.a();
      parser.setUA(this.comment.userAgent);
      var result = parser.getResult();
      var browserImg = "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/" + result.browser.name.toLowerCase() + ".svg";
      var uaImg = "";

      switch (result.os.name) {
        case "Windows":
          switch (result.os.version) {
            case "7":
            case "8":
            case "10":
              uaImg = "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows_win" + result.os.version + ".svg";
              break;

            case "":
              uaImg = "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows_" + result.os.version + ".svg";
              break;

            default:
              uaImg = "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows.svg";
              break;
          }

          break;

        default:
          uaImg = "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/" + result.os.name.replace(/\s+/g, "").toLowerCase() + ".svg";
          break;
      }

      return "( <img src=\"" + browserImg + " \">  " + result.browser.name + " " + result.browser.version + " \n       <img src=\"" + uaImg + "\"> " + result.os.name + " " + result.os.version + " )";
    },
    selfAddDepth: function selfAddDepth() {
      return this.depth + 1;
    },
    commentClass: function commentClass() {
      return "depth-" + this.depth + " comment-" + this.comment.id;
    }
  },
  methods: {
    handleReplyClick: function handleReplyClick() {
      // 设置状态为回复状态
      this.globalData.replyId = this.comment.id;
    }
  }
});
// CONCATENATED MODULE: ./src/components/CommentNode.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CommentNodevue_type_script_lang_js_ = (CommentNodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/CommentNode.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CommentNodevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CommentNode = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "fb89":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_0__);


class Emoji {
  constructor(name, description, category, style) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.style = style;
  }

}

let bilibiliEmoji = [new Emoji("baiyan", "白眼", "bilibili", {
  "animation-duration": "1800ms",
  "animation-timing-function": "steps(45)",
  "transform": "translateY(-1408px)",
  "height": "1440px"
}), new Emoji("fadai", "发呆", "bilibili", {
  "animation-duration": "1080ms",
  "animation-timing-function": "steps(27)",
  "transform": "translateY(-832px)",
  "height": "864px"
}), new Emoji("koubi", "抠鼻", "bilibili", {
  "animation-duration": "1200ms",
  "animation-timing-function": "steps(30)",
  "transform": "translateY(-928px)",
  "height": "960px"
}), new Emoji("qinqin", "亲亲", "bilibili", {
  "animation-duration": "280ms",
  "animation-timing-function": "steps(7)",
  "transform": "translateY(-192px)",
  "height": "224px"
}), new Emoji("weiqu", "委屈", "bilibili", {
  "animation-duration": "800ms",
  "animation-timing-function": "steps(20)",
  "transform": "translateY(-608px)",
  "height": "640px"
}), new Emoji("bishi", "鄙视", "bilibili", {
  "animation-duration": "360ms",
  "animation-timing-function": "steps(9)",
  "transform": "translateY(-256px)",
  "height": "288px"
}), new Emoji("fanu", "发怒", "bilibili", {
  "animation-duration": "1320ms",
  "animation-timing-function": "steps(33)",
  "transform": "translateY(-1024px)",
  "height": "1056px"
}), new Emoji("kun", "困", "bilibili", {
  "animation-duration": "1760ms",
  "animation-timing-function": "steps(44)",
  "transform": "translateY(-1376px)",
  "height": "1408px"
}), new Emoji("se", "色", "bilibili", {
  "animation-duration": "400ms",
  "animation-timing-function": "steps(10)",
  "transform": "translateY(-288px)",
  "height": "320px"
}), new Emoji("weixiao", "微笑", "bilibili", {
  "animation-duration": "800ms",
  "animation-timing-function": "steps(20)",
  "transform": "translateY(-608px)",
  "height": "640px"
}), new Emoji("bizui", "闭嘴", "bilibili", {
  "animation-duration": "1240ms",
  "animation-timing-function": "steps(31)",
  "transform": "translateY(-960px)",
  "height": "992px"
}), new Emoji("ganga", "尴尬", "bilibili", {
  "animation-duration": "1520ms",
  "animation-timing-function": "steps(38)",
  "transform": "translateY(-1184px)",
  "height": "1216px"
}), new Emoji("lengmo", "冷漠", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("shengbing", "生病", "bilibili", {
  "animation-duration": "1400ms",
  "animation-timing-function": "steps(35)",
  "transform": "translateY(-1088px)",
  "height": "1120px"
}), new Emoji("wunai", "无奈", "bilibili", {
  "animation-duration": "920ms",
  "animation-timing-function": "steps(23)",
  "transform": "translateY(-704px)",
  "height": "736px"
}), new Emoji("chan", "馋", "bilibili", {
  "animation-duration": "1600ms",
  "animation-timing-function": "steps(40)",
  "transform": "translateY(-1248px)",
  "height": "1280px"
}), new Emoji("guilian", "鬼脸", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("liubixue", "流鼻血", "bilibili", {
  "animation-duration": "1400ms",
  "animation-timing-function": "steps(35)",
  "transform": "translateY(-1088px)",
  "height": "1120px"
}), new Emoji("shengqi", "生气", "bilibili", {
  "animation-duration": "440ms",
  "animation-timing-function": "steps(11)",
  "transform": "translateY(-320px)",
  "height": "352px"
}), new Emoji("xiaoku", "笑哭", "bilibili", {
  "animation-duration": "600ms",
  "animation-timing-function": "steps(15)",
  "transform": "translateY(-448px)",
  "height": "480px"
}), new Emoji("daku", "大哭", "bilibili", {
  "animation-duration": "320ms",
  "animation-timing-function": "steps(8)",
  "transform": "translateY(-224px)",
  "height": "256px"
}), new Emoji("guzhang", "鼓掌", "bilibili", {
  "animation-duration": "680ms",
  "animation-timing-function": "steps(17)",
  "transform": "translateY(-512px)",
  "height": "544px"
}), new Emoji("liuhan", "流汗", "bilibili", {
  "animation-duration": "1080ms",
  "animation-timing-function": "steps(27)",
  "transform": "translateY(-832px)",
  "height": "864px"
}), new Emoji("shuizhao", "睡着", "bilibili", {
  "animation-duration": "960ms",
  "animation-timing-function": "steps(24)",
  "transform": "translateY(-736px)",
  "height": "768px"
}), new Emoji("xieyanxiao", "斜眼笑", "bilibili", {
  "animation-duration": "320ms",
  "animation-timing-function": "steps(8)",
  "transform": "translateY(-224px)",
  "height": "256px"
}), new Emoji("dalao", "大佬", "bilibili", {
  "animation-duration": "1320ms",
  "animation-timing-function": "steps(33)",
  "transform": "translateY(-1024px)",
  "height": "1056px"
}), new Emoji("haixiu", "害羞", "bilibili", {
  "animation-duration": "1240ms",
  "animation-timing-function": "steps(31)",
  "transform": "translateY(-960px))",
  "height": "992px"
}), new Emoji("liulei", "流泪", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("sikao", "思考", "bilibili", {
  "animation-duration": "1440ms",
  "animation-timing-function": "steps(36)",
  "transform": "translateY(-1120px)",
  "height": "1152px"
}), new Emoji("yiwen", "疑问", "bilibili", {
  "animation-duration": "840ms",
  "animation-timing-function": "steps(21)",
  "transform": "translateY(-640px)",
  "height": "672px"
}), new Emoji("dalian", "打脸", "bilibili", {
  "animation-duration": "1480ms",
  "animation-timing-function": "steps(37)",
  "transform": "translateY(-1152px)",
  "height": "1184px"
}), new Emoji("heirenwenhao", "黑人问号", "bilibili", {
  "animation-duration": "1040ms",
  "animation-timing-function": "steps(26)",
  "transform": "translateY(-800px)",
  "height": "832px"
}), new Emoji("miantian", "腼腆", "bilibili", {
  "animation-duration": "1120ms",
  "animation-timing-function": "steps(28)",
  "transform": "translateY(-864px)",
  "height": "896px"
}), new Emoji("tiaokan", "调侃", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("yun", "晕", "bilibili", {
  "animation-duration": "480ms",
  "animation-timing-function": "steps(12)",
  "transform": "translateY(-352px)",
  "height": "384px"
}), new Emoji("dianzan", "点赞", "bilibili", {
  "animation-duration": "800ms",
  "animation-timing-function": "steps(20)",
  "transform": "translateY(-608px)",
  "height": "640px"
}), new Emoji("huaixiao", "坏笑", "bilibili", {
  "animation-duration": "1240ms",
  "animation-timing-function": "steps(31)",
  "transform": "translateY(-960px)",
  "height": "992px"
}), new Emoji("mudengkoudai", "目瞪口呆", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("tiaopi", "调皮", "bilibili", {
  "animation-duration": "2000ms",
  "animation-timing-function": "steps(50)",
  "transform": "translateY(-1568px)",
  "height": "1600px"
}), new Emoji("zaijian", "再见", "bilibili", {
  "animation-duration": "960ms",
  "animation-timing-function": "steps(24)",
  "transform": "translateY(-736px)",
  "height": "768px"
}), new Emoji("doge", "狗头", "bilibili", {
  "animation-duration": "800ms",
  "animation-timing-function": "steps(20)",
  "transform": "translateY(-608px)",
  "height": "640px"
}), new Emoji("jingxia", "惊吓", "bilibili", {
  "animation-duration": "1280ms",
  "animation-timing-function": "steps(32)",
  "transform": "translateY(-992px)",
  "height": "1024px"
}), new Emoji("nanguo", "难过", "bilibili", {
  "animation-duration": "1120ms",
  "animation-timing-function": "steps(28)",
  "transform": "translateY(-864px)",
  "height": "896px"
}), new Emoji("touxiao", "偷笑", "bilibili", {
  "animation-duration": "240ms",
  "animation-timing-function": "steps(6)",
  "transform": "translateY(-160px)",
  "height": "192px"
}), new Emoji("zhoumei", "皱眉", "bilibili", {
  "animation-duration": "40ms",
  "animation-timing-function": "steps(1)",
  "transform": "translateY(-0px)",
  "height": "32px"
}), new Emoji("facai", "发财", "bilibili", {
  "animation-duration": "1200ms",
  "animation-timing-function": "steps(30)",
  "transform": "translateY(-928px)",
  "height": "960px"
}), new Emoji("keai", "可爱", "bilibili", {
  "animation-duration": "680ms",
  "animation-timing-function": "steps(17)",
  "transform": "translateY(-512px)",
  "height": "544px"
}), new Emoji("outu", "呕吐", "bilibili", {
  "animation-duration": "1680ms",
  "animation-timing-function": "steps(42)",
  "transform": "translateY(-1312px)",
  "height": "1344px"
}), new Emoji("tuxue", "吐血", "bilibili", {
  "animation-duration": "320ms",
  "animation-timing-function": "steps(8)",
  "transform": "translateY(-224px)",
  "height": "256px"
}), new Emoji("zhuakuang", "抓狂", "bilibili", {
  "animation-duration": "760ms",
  "animation-timing-function": "steps(19)",
  "transform": "translateY(-576px)",
  "height": "608px"
})];
let menheraEmoji = [new Emoji("(⌒▽⌒)", "(⌒▽⌒)", "menhera"), new Emoji("(￣▽￣)", "(￣▽￣)", "menhera"), new Emoji("(=・ω・=)", "(=・ω・=)", "menhera"), new Emoji("(｀・ω・´)", "(｀・ω・´)", "menhera"), new Emoji("(〜￣△￣)〜", "(〜￣△￣)〜", "menhera"), new Emoji("(･∀･)", "(･∀･)", "menhera"), new Emoji("(°∀°)ﾉ", "(°∀°)ﾉ", "menhera"), new Emoji("(￣3￣)", "(￣3￣)", "menhera"), new Emoji("╮(￣▽￣)╭", "╮(￣▽￣)╭", "menhera"), new Emoji("(´_ゝ｀)", "(´_ゝ｀)", "menhera"), new Emoji("←_←", "←_←", "menhera"), new Emoji("→_→", "→_→", "menhera"), new Emoji("(<_<)", "(<_<)", "menhera"), new Emoji("(>_>)", "(>_>)", "menhera"), new Emoji("(;¬_¬)", "(;¬_¬)", "menhera"), new Emoji("(▔□▔)/", "(▔□▔)/", "menhera"), new Emoji("(ﾟДﾟ≡ﾟдﾟ)!?", "(ﾟДﾟ≡ﾟдﾟ)!?", "menhera"), new Emoji("Σ(ﾟдﾟ;)", "Σ(ﾟдﾟ;)", "menhera"), new Emoji("Σ(￣□￣||)", "Σ(￣□￣||)", "menhera"), new Emoji("(’；ω；‘)", "(’；ω；‘)", "menhera"), new Emoji("（/TДT)/", "（/TДT)/", "menhera"), new Emoji("(^・ω・^ )", "(^・ω・^ )", "menhera"), new Emoji("(｡･ω･｡)", "(｡･ω･｡)", "menhera"), new Emoji("(●￣(ｴ)￣●)", "(●￣(ｴ)￣●)", "menhera"), new Emoji("ε=ε=(ノ≧∇≦)ノ", "ε=ε=(ノ≧∇≦)ノ", "menhera"), new Emoji("(’･_･‘)", "(’･_･‘)", "menhera"), new Emoji("(-_-#)", "(-_-#)", "menhera"), new Emoji("（￣へ￣）", "（￣へ￣）", "menhera"), new Emoji("(￣ε(#￣)Σ", "(￣ε(#￣)Σ", "menhera"), new Emoji("ヽ(‘Д’)ﾉ", "ヽ(‘Д’)ﾉ", "menhera"), new Emoji("（#-_-)┯━┯", "（#-_-)┯━┯", "menhera"), new Emoji("(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "menhera"), new Emoji("←◡←", "←◡←", "menhera"), new Emoji("( ♥д♥)", "( ♥д♥)", "menhera"), new Emoji("_(:3」∠)_", "_(:3」∠)_", "menhera"), new Emoji("Σ>―(〃°ω°〃)♡→", "Σ>―(〃°ω°〃)♡→", "menhera"), new Emoji("⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "menhera"), new Emoji("(╬ﾟдﾟ)▄︻┻┳═一", "(╬ﾟдﾟ)▄︻┻┳═一", "menhera"), new Emoji("･*･:≡(　ε:)", "･*･:≡(　ε:)", "menhera"), new Emoji("(笑)", "(笑)", "menhera"), new Emoji("(汗)", "(汗)", "menhera"), new Emoji("(泣)", "(泣)", "menhera"), new Emoji("(苦笑)", "(苦笑)", "menhera")];
let tiebaEmoji = [new Emoji("tongue", "吐舌", "tieba"), new Emoji("theblackline", "尴尬", "tieba"), new Emoji("tear", "大哭", "tieba"), new Emoji("surprised", "惊哭", "tieba"), new Emoji("surprised2", "惊讶", "tieba"), new Emoji("spray", "喷", "tieba"), new Emoji("spit", "呕吐", "tieba"), new Emoji("smilingeyes", "笑眼", "tieba"), new Emoji("shui", "睡", "tieba"), new Emoji("shame", "羞辱", "tieba"), new Emoji("se", "色", "tieba"), new Emoji("rmb", "钱", "tieba"), new Emoji("reluctantly", "勉强", "tieba"), new Emoji("rbq", "观望", "tieba"), new Emoji("niconiconit", "niconiconit", "tieba"), new Emoji("niconiconi", "niconiconi", "tieba"), new Emoji("niconiconi_t", "niconiconi-t", "tieba"), new Emoji("naive", "naive", "tieba"), new Emoji("ku", "ku", "tieba"), new Emoji("huaji", "huaji", "tieba"), new Emoji("hu", "hu", "tieba"), new Emoji("han", "han", "tieba"), new Emoji("haha", "haha", "tieba"), new Emoji("good", "good", "tieba"), new Emoji("doubt", "doubt", "tieba"), new Emoji("britan", "britan", "tieba"), new Emoji("bbd", "bbd", "tieba"), new Emoji("awesome", "awesome", "tieba"), new Emoji("anger", "anger", "tieba"), new Emoji("aa", "aa", "tieba"), new Emoji("Happy", "Happy", "tieba"), new Emoji("Grievance", "Grievance", "tieba")];
/* harmony default export */ __webpack_exports__["default"] = ([...bilibiliEmoji, ...menheraEmoji, ...tiebaEmoji]);

/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ });
//# sourceMappingURL=halo-comment.js.map