// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/canvas-sketch/dist/canvas-sketch.umd.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasSketch = factory());
}(this, (function () {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var browser =
	  commonjsGlobal.performance &&
	  commonjsGlobal.performance.now ? function now() {
	    return performance.now()
	  } : Date.now || function now() {
	    return +new Date
	  };

	var isPromise_1 = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	var isDom = isNode;

	function isNode (val) {
	  return (!val || typeof val !== 'object')
	    ? false
	    : (typeof window === 'object' && typeof window.Node === 'object')
	      ? (val instanceof window.Node)
	      : (typeof val.nodeType === 'number') &&
	        (typeof val.nodeName === 'string')
	}

	function getClientAPI() {
	    return typeof window !== 'undefined' && window['canvas-sketch-cli'];
	}

	function defined() {
	    var arguments$1 = arguments;

	    for (var i = 0;i < arguments.length; i++) {
	        if (arguments$1[i] != null) {
	            return arguments$1[i];
	        }
	    }
	    return undefined;
	}

	function isBrowser() {
	    return typeof document !== 'undefined';
	}

	function isWebGLContext(ctx) {
	    return typeof ctx.clear === 'function' && typeof ctx.clearColor === 'function' && typeof ctx.bufferData === 'function';
	}

	function isCanvas(element) {
	    return isDom(element) && /canvas/i.test(element.nodeName) && typeof element.getContext === 'function';
	}

	var keys = createCommonjsModule(function (module, exports) {
	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	});
	var keys_1 = keys.shim;

	var is_arguments = createCommonjsModule(function (module, exports) {
	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	}});
	var is_arguments_1 = is_arguments.supported;
	var is_arguments_2 = is_arguments.unsupported;

	var deepEqual_1 = createCommonjsModule(function (module) {
	var pSlice = Array.prototype.slice;



	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (is_arguments(a)) {
	    if (!is_arguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = keys(a),
	        kb = keys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}
	});

	var dateformat = createCommonjsModule(function (module, exports) {
	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
	          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
	          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
	          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ],
	    timeNames: [
	      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occurred and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	}


	  if (typeof undefined === 'function' && undefined.amd) {
	    undefined(function () {
	      return dateFormat;
	    });
	  } else {
	    module.exports = dateFormat;
	  }
	})(commonjsGlobal);
	});

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	var repeatString = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }

	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    str += str;
	  }

	  res += str;
	  res = res.substr(0, max);
	  return res;
	}

	var padLeft = function padLeft(str, num, ch) {
	  str = str.toString();

	  if (typeof num === 'undefined') {
	    return str;
	  }

	  if (ch === 0) {
	    ch = '0';
	  } else if (ch) {
	    ch = ch.toString();
	  } else {
	    ch = ' ';
	  }

	  return repeatString(ch, num - str.length) + str;
	};

	var noop = function () {};
	var link;
	var defaultExts = {
	    extension: '',
	    prefix: '',
	    suffix: ''
	};
	var supportedEncodings = ['image/png','image/jpeg','image/webp'];
	function stream(isStart, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve, reject) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = resolveFilename(Object.assign({}, opts, {
	            extension: '',
	            frame: undefined
	        }));
	        var func = isStart ? 'streamStart' : 'streamEnd';
	        var client = getClientAPI();
	        if (client && client.output && typeof client[func] === 'function') {
	            return client[func](objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            return resolve({
	                filename: filename,
	                client: false
	            });
	        }
	    });
	}

	function streamStart(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(true, opts);
	}

	function streamEnd(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(false, opts);
	}

	function exportCanvas(canvas, opt) {
	    if ( opt === void 0 ) opt = {};

	    var encoding = opt.encoding || 'image/png';
	    if (!supportedEncodings.includes(encoding)) 
	        { throw new Error(("Invalid canvas encoding " + encoding)); }
	    var extension = (encoding.split('/')[1] || '').replace(/jpeg/i, 'jpg');
	    if (extension) 
	        { extension = ("." + extension).toLowerCase(); }
	    return {
	        extension: extension,
	        type: encoding,
	        dataURL: canvas.toDataURL(encoding, opt.encodingQuality)
	    };
	}

	function createBlobFromDataURL(dataURL) {
	    return new Promise(function (resolve) {
	        var splitIndex = dataURL.indexOf(',');
	        if (splitIndex === -1) {
	            resolve(new window.Blob());
	            return;
	        }
	        var base64 = dataURL.slice(splitIndex + 1);
	        var byteString = window.atob(base64);
	        var type = dataURL.slice(0, splitIndex);
	        var mimeMatch = /data:([^;]+)/.exec(type);
	        var mime = (mimeMatch ? mimeMatch[1] : '') || undefined;
	        var ab = new ArrayBuffer(byteString.length);
	        var ia = new Uint8Array(ab);
	        for (var i = 0;i < byteString.length; i++) {
	            ia[i] = byteString.charCodeAt(i);
	        }
	        resolve(new window.Blob([ab], {
	            type: mime
	        }));
	    });
	}

	function saveDataURL(dataURL, opts) {
	    if ( opts === void 0 ) opts = {};

	    return createBlobFromDataURL(dataURL).then(function (blob) { return saveBlob(blob, opts); });
	}

	function saveBlob(blob, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = opts.filename;
	        var client = getClientAPI();
	        if (client && typeof client.saveBlob === 'function' && client.output) {
	            return client.saveBlob(blob, objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            if (!link) {
	                link = document.createElement('a');
	                link.style.visibility = 'hidden';
	                link.target = '_blank';
	            }
	            link.download = filename;
	            link.href = window.URL.createObjectURL(blob);
	            document.body.appendChild(link);
	            link.onclick = (function () {
	                link.onclick = noop;
	                setTimeout(function () {
	                    window.URL.revokeObjectURL(blob);
	                    if (link.parentElement) 
	                        { link.parentElement.removeChild(link); }
	                    link.removeAttribute('href');
	                    resolve({
	                        filename: filename,
	                        client: false
	                    });
	                });
	            });
	            link.click();
	        }
	    });
	}

	function saveFile(data, opts) {
	    if ( opts === void 0 ) opts = {};

	    var parts = Array.isArray(data) ? data : [data];
	    var blob = new window.Blob(parts, {
	        type: opts.type || ''
	    });
	    return saveBlob(blob, opts);
	}

	function getTimeStamp() {
	    var dateFormatStr = "yyyy.mm.dd-HH.MM.ss";
	    return dateformat(new Date(), dateFormatStr);
	}

	function resolveFilename(opt) {
	    if ( opt === void 0 ) opt = {};

	    opt = objectAssign({}, opt);
	    if (typeof opt.file === 'function') {
	        return opt.file(opt);
	    } else if (opt.file) {
	        return opt.file;
	    }
	    var frame = null;
	    var extension = '';
	    if (typeof opt.extension === 'string') 
	        { extension = opt.extension; }
	    if (typeof opt.frame === 'number') {
	        var totalFrames;
	        if (typeof opt.totalFrames === 'number') {
	            totalFrames = opt.totalFrames;
	        } else {
	            totalFrames = Math.max(10000, opt.frame);
	        }
	        frame = padLeft(String(opt.frame), String(totalFrames).length, '0');
	    }
	    var layerStr = isFinite(opt.totalLayers) && isFinite(opt.layer) && opt.totalLayers > 1 ? ("" + (opt.layer)) : '';
	    if (frame != null) {
	        return [layerStr,frame].filter(Boolean).join('-') + extension;
	    } else {
	        var defaultFileName = opt.timeStamp;
	        return [opt.prefix,opt.name || defaultFileName,layerStr,opt.hash,opt.suffix].filter(Boolean).join('-') + extension;
	    }
	}

	var commonTypos = {
	    dimension: 'dimensions',
	    animated: 'animate',
	    animating: 'animate',
	    unit: 'units',
	    P5: 'p5',
	    pixellated: 'pixelated',
	    looping: 'loop',
	    pixelPerInch: 'pixels'
	};
	var allKeys = ['dimensions','units','pixelsPerInch','orientation','scaleToFit',
	    'scaleToView','bleed','pixelRatio','exportPixelRatio','maxPixelRatio','scaleContext',
	    'resizeCanvas','styleCanvas','canvas','context','attributes','parent','file',
	    'name','prefix','suffix','animate','playing','loop','duration','totalFrames',
	    'fps','playbackRate','timeScale','frame','time','flush','pixelated','hotkeys',
	    'p5','id','scaleToFitPadding','data','params','encoding','encodingQuality'];
	var checkSettings = function (settings) {
	    var keys = Object.keys(settings);
	    keys.forEach(function (key) {
	        if (key in commonTypos) {
	            var actual = commonTypos[key];
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\", did you mean \"" + actual + "\"?"));
	        } else if (!allKeys.includes(key)) {
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\""));
	        }
	    });
	};

	function keyboardShortcuts (opt) {
	    if ( opt === void 0 ) opt = {};

	    var handler = function (ev) {
	        if (!opt.enabled()) 
	            { return; }
	        var client = getClientAPI();
	        if (ev.keyCode === 83 && !ev.altKey && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.save(ev);
	        } else if (ev.keyCode === 32) {
	            opt.togglePlay(ev);
	        } else if (client && !ev.altKey && ev.keyCode === 75 && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.commit(ev);
	        }
	    };
	    var attach = function () {
	        window.addEventListener('keydown', handler);
	    };
	    var detach = function () {
	        window.removeEventListener('keydown', handler);
	    };
	    return {
	        attach: attach,
	        detach: detach
	    };
	}

	var defaultUnits = 'mm';
	var data = [['postcard',101.6,152.4],['poster-small',280,430],['poster',460,610],
	    ['poster-large',610,910],['business-card',50.8,88.9],['2r',64,89],['3r',89,127],
	    ['4r',102,152],['5r',127,178],['6r',152,203],['8r',203,254],['10r',254,305],['11r',
	    279,356],['12r',305,381],['a0',841,1189],['a1',594,841],['a2',420,594],['a3',
	    297,420],['a4',210,297],['a5',148,210],['a6',105,148],['a7',74,105],['a8',52,
	    74],['a9',37,52],['a10',26,37],['2a0',1189,1682],['4a0',1682,2378],['b0',1000,
	    1414],['b1',707,1000],['b1+',720,1020],['b2',500,707],['b2+',520,720],['b3',353,
	    500],['b4',250,353],['b5',176,250],['b6',125,176],['b7',88,125],['b8',62,88],
	    ['b9',44,62],['b10',31,44],['b11',22,32],['b12',16,22],['c0',917,1297],['c1',
	    648,917],['c2',458,648],['c3',324,458],['c4',229,324],['c5',162,229],['c6',114,
	    162],['c7',81,114],['c8',57,81],['c9',40,57],['c10',28,40],['c11',22,32],['c12',
	    16,22],['half-letter',5.5,8.5,'in'],['letter',8.5,11,'in'],['legal',8.5,14,'in'],
	    ['junior-legal',5,8,'in'],['ledger',11,17,'in'],['tabloid',11,17,'in'],['ansi-a',
	    8.5,11.0,'in'],['ansi-b',11.0,17.0,'in'],['ansi-c',17.0,22.0,'in'],['ansi-d',
	    22.0,34.0,'in'],['ansi-e',34.0,44.0,'in'],['arch-a',9,12,'in'],['arch-b',12,18,
	    'in'],['arch-c',18,24,'in'],['arch-d',24,36,'in'],['arch-e',36,48,'in'],['arch-e1',
	    30,42,'in'],['arch-e2',26,38,'in'],['arch-e3',27,39,'in']];
	var paperSizes = data.reduce(function (dict, preset) {
	    var item = {
	        units: preset[3] || defaultUnits,
	        dimensions: [preset[1],preset[2]]
	    };
	    dict[preset[0]] = item;
	    dict[preset[0].replace(/-/g, ' ')] = item;
	    return dict;
	}, {})

	var defined$1 = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (arguments[i] !== undefined) return arguments[i];
	    }
	};

	var units = [ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ];

	var conversions = {
	  // metric
	  m: {
	    system: 'metric',
	    factor: 1
	  },
	  cm: {
	    system: 'metric',
	    factor: 1 / 100
	  },
	  mm: {
	    system: 'metric',
	    factor: 1 / 1000
	  },
	  // imperial
	  pt: {
	    system: 'imperial',
	    factor: 1 / 72
	  },
	  pc: {
	    system: 'imperial',
	    factor: 1 / 6
	  },
	  in: {
	    system: 'imperial',
	    factor: 1
	  },
	  ft: {
	    system: 'imperial',
	    factor: 12
	  }
	};

	const anchors = {
	  metric: {
	    unit: 'm',
	    ratio: 1 / 0.0254
	  },
	  imperial: {
	    unit: 'in',
	    ratio: 0.0254
	  }
	};

	function round (value, decimals) {
	  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function convertDistance (value, fromUnit, toUnit, opts) {
	  if (typeof value !== 'number' || !isFinite(value)) throw new Error('Value must be a finite number');
	  if (!fromUnit || !toUnit) throw new Error('Must specify from and to units');

	  opts = opts || {};
	  var pixelsPerInch = defined$1(opts.pixelsPerInch, 96);
	  var precision = opts.precision;
	  var roundPixel = opts.roundPixel !== false;

	  fromUnit = fromUnit.toLowerCase();
	  toUnit = toUnit.toLowerCase();

	  if (units.indexOf(fromUnit) === -1) throw new Error('Invalid from unit "' + fromUnit + '", must be one of: ' + units.join(', '));
	  if (units.indexOf(toUnit) === -1) throw new Error('Invalid from unit "' + toUnit + '", must be one of: ' + units.join(', '));

	  if (fromUnit === toUnit) {
	    // We don't need to convert from A to B since they are the same already
	    return value;
	  }

	  var toFactor = 1;
	  var fromFactor = 1;
	  var isToPixel = false;

	  if (fromUnit === 'px') {
	    fromFactor = 1 / pixelsPerInch;
	    fromUnit = 'in';
	  }
	  if (toUnit === 'px') {
	    isToPixel = true;
	    toFactor = pixelsPerInch;
	    toUnit = 'in';
	  }

	  var fromUnitData = conversions[fromUnit];
	  var toUnitData = conversions[toUnit];

	  // source to anchor inside source's system
	  var anchor = value * fromUnitData.factor * fromFactor;

	  // if systems differ, convert one to another
	  if (fromUnitData.system !== toUnitData.system) {
	    // regular 'm' to 'in' and so forth
	    anchor *= anchors[fromUnitData.system].ratio;
	  }

	  var result = anchor / toUnitData.factor * toFactor;
	  if (isToPixel && roundPixel) {
	    result = Math.round(result);
	  } else if (typeof precision === 'number' && isFinite(precision)) {
	    result = round(result, precision);
	  }
	  return result;
	}

	var convertLength = convertDistance;
	var units_1 = units;
	convertLength.units = units_1;

	function getDimensionsFromPreset(dimensions, unitsTo, pixelsPerInch) {
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    if (typeof dimensions === 'string') {
	        var key = dimensions.toLowerCase();
	        if (!(key in paperSizes)) {
	            throw new Error(("The dimension preset \"" + dimensions + "\" is not supported or could not be found; try using a4, a3, postcard, letter, etc."));
	        }
	        var preset = paperSizes[key];
	        return preset.dimensions.map(function (d) { return convertDistance$1(d, preset.units, unitsTo, pixelsPerInch); });
	    } else {
	        return dimensions;
	    }
	}

	function convertDistance$1(dimension, unitsFrom, unitsTo, pixelsPerInch) {
	    if ( unitsFrom === void 0 ) unitsFrom = 'px';
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    return convertLength(dimension, unitsFrom, unitsTo, {
	        pixelsPerInch: pixelsPerInch,
	        precision: 4,
	        roundPixel: true
	    });
	}

	function checkIfHasDimensions(settings) {
	    if (!settings.dimensions) 
	        { return false; }
	    if (typeof settings.dimensions === 'string') 
	        { return true; }
	    if (Array.isArray(settings.dimensions) && settings.dimensions.length >= 2) 
	        { return true; }
	    return false;
	}

	function getParentSize(props, settings) {
	    if (!isBrowser()) {
	        return [300,150];
	    }
	    var element = settings.parent || window;
	    if (element === window || element === document || element === document.body) {
	        return [window.innerWidth,window.innerHeight];
	    } else {
	        var ref = element.getBoundingClientRect();
	        var width = ref.width;
	        var height = ref.height;
	        return [width,height];
	    }
	}

	function resizeCanvas(props, settings) {
	    var width, height;
	    var styleWidth, styleHeight;
	    var canvasWidth, canvasHeight;
	    var browser = isBrowser();
	    var dimensions = settings.dimensions;
	    var hasDimensions = checkIfHasDimensions(settings);
	    var exporting = props.exporting;
	    var scaleToFit = hasDimensions ? settings.scaleToFit !== false : false;
	    var scaleToView = !exporting && hasDimensions ? settings.scaleToView : true;
	    if (!browser) 
	        { scaleToFit = (scaleToView = false); }
	    var units = settings.units;
	    var pixelsPerInch = typeof settings.pixelsPerInch === 'number' && isFinite(settings.pixelsPerInch) ? settings.pixelsPerInch : 72;
	    var bleed = defined(settings.bleed, 0);
	    var devicePixelRatio = browser ? window.devicePixelRatio : 1;
	    var basePixelRatio = scaleToView ? devicePixelRatio : 1;
	    var pixelRatio, exportPixelRatio;
	    if (typeof settings.pixelRatio === 'number' && isFinite(settings.pixelRatio)) {
	        pixelRatio = settings.pixelRatio;
	        exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	    } else {
	        if (hasDimensions) {
	            pixelRatio = basePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, 1);
	        } else {
	            pixelRatio = devicePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	        }
	    }
	    if (typeof settings.maxPixelRatio === 'number' && isFinite(settings.maxPixelRatio)) {
	        pixelRatio = Math.min(settings.maxPixelRatio, pixelRatio);
	    }
	    if (exporting) {
	        pixelRatio = exportPixelRatio;
	    }
	    var ref = getParentSize(props, settings);
	    var parentWidth = ref[0];
	    var parentHeight = ref[1];
	    var trimWidth, trimHeight;
	    if (hasDimensions) {
	        var result = getDimensionsFromPreset(dimensions, units, pixelsPerInch);
	        var highest = Math.max(result[0], result[1]);
	        var lowest = Math.min(result[0], result[1]);
	        if (settings.orientation) {
	            var landscape = settings.orientation === 'landscape';
	            width = landscape ? highest : lowest;
	            height = landscape ? lowest : highest;
	        } else {
	            width = result[0];
	            height = result[1];
	        }
	        trimWidth = width;
	        trimHeight = height;
	        width += bleed * 2;
	        height += bleed * 2;
	    } else {
	        width = parentWidth;
	        height = parentHeight;
	        trimWidth = width;
	        trimHeight = height;
	    }
	    var realWidth = width;
	    var realHeight = height;
	    if (hasDimensions && units) {
	        realWidth = convertDistance$1(width, units, 'px', pixelsPerInch);
	        realHeight = convertDistance$1(height, units, 'px', pixelsPerInch);
	    }
	    styleWidth = Math.round(realWidth);
	    styleHeight = Math.round(realHeight);
	    if (scaleToFit && !exporting && hasDimensions) {
	        var aspect = width / height;
	        var windowAspect = parentWidth / parentHeight;
	        var scaleToFitPadding = defined(settings.scaleToFitPadding, 40);
	        var maxWidth = Math.round(parentWidth - scaleToFitPadding * 2);
	        var maxHeight = Math.round(parentHeight - scaleToFitPadding * 2);
	        if (styleWidth > maxWidth || styleHeight > maxHeight) {
	            if (windowAspect > aspect) {
	                styleHeight = maxHeight;
	                styleWidth = Math.round(styleHeight * aspect);
	            } else {
	                styleWidth = maxWidth;
	                styleHeight = Math.round(styleWidth / aspect);
	            }
	        }
	    }
	    canvasWidth = scaleToView ? Math.round(pixelRatio * styleWidth) : Math.round(pixelRatio * realWidth);
	    canvasHeight = scaleToView ? Math.round(pixelRatio * styleHeight) : Math.round(pixelRatio * realHeight);
	    var viewportWidth = scaleToView ? Math.round(styleWidth) : Math.round(realWidth);
	    var viewportHeight = scaleToView ? Math.round(styleHeight) : Math.round(realHeight);
	    var scaleX = canvasWidth / width;
	    var scaleY = canvasHeight / height;
	    return {
	        bleed: bleed,
	        pixelRatio: pixelRatio,
	        width: width,
	        height: height,
	        dimensions: [width,height],
	        units: units || 'px',
	        scaleX: scaleX,
	        scaleY: scaleY,
	        pixelsPerInch: pixelsPerInch,
	        viewportWidth: viewportWidth,
	        viewportHeight: viewportHeight,
	        canvasWidth: canvasWidth,
	        canvasHeight: canvasHeight,
	        trimWidth: trimWidth,
	        trimHeight: trimHeight,
	        styleWidth: styleWidth,
	        styleHeight: styleHeight
	    };
	}

	var getCanvasContext_1 = getCanvasContext;
	function getCanvasContext (type, opts) {
	  if (typeof type !== 'string') {
	    throw new TypeError('must specify type string')
	  }

	  opts = opts || {};

	  if (typeof document === 'undefined' && !opts.canvas) {
	    return null // check for Node
	  }

	  var canvas = opts.canvas || document.createElement('canvas');
	  if (typeof opts.width === 'number') {
	    canvas.width = opts.width;
	  }
	  if (typeof opts.height === 'number') {
	    canvas.height = opts.height;
	  }

	  var attribs = opts;
	  var gl;
	  try {
	    var names = [ type ];
	    // prefix GL contexts
	    if (type.indexOf('webgl') === 0) {
	      names.push('experimental-' + type);
	    }

	    for (var i = 0; i < names.length; i++) {
	      gl = canvas.getContext(names[i], attribs);
	      if (gl) return gl
	    }
	  } catch (e) {
	    gl = null;
	  }
	  return (gl || null) // ensure null on fail
	}

	function createCanvasElement() {
	    if (!isBrowser()) {
	        throw new Error('It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.');
	    }
	    return document.createElement('canvas');
	}

	function createCanvas(settings) {
	    if ( settings === void 0 ) settings = {};

	    var context, canvas;
	    var ownsCanvas = false;
	    if (settings.canvas !== false) {
	        context = settings.context;
	        if (!context || typeof context === 'string') {
	            var newCanvas = settings.canvas;
	            if (!newCanvas) {
	                newCanvas = createCanvasElement();
	                ownsCanvas = true;
	            }
	            var type = context || '2d';
	            if (typeof newCanvas.getContext !== 'function') {
	                throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");
	            }
	            context = getCanvasContext_1(type, objectAssign({}, settings.attributes, {
	                canvas: newCanvas
	            }));
	            if (!context) {
	                throw new Error(("Failed at canvas.getContext('" + type + "') - the browser may not support this context, or a different context may already be in use with this canvas."));
	            }
	        }
	        canvas = context.canvas;
	        if (settings.canvas && canvas !== settings.canvas) {
	            throw new Error('The { canvas } and { context } settings must point to the same underlying canvas element');
	        }
	        if (settings.pixelated) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false;
	            context.oImageSmoothingEnabled = false;
	            context.webkitImageSmoothingEnabled = false;
	            context.msImageSmoothingEnabled = false;
	            canvas.style['image-rendering'] = 'pixelated';
	        }
	    }
	    return {
	        canvas: canvas,
	        context: context,
	        ownsCanvas: ownsCanvas
	    };
	}

	var SketchManager = function SketchManager() {
	    var this$1 = this;

	    this._settings = {};
	    this._props = {};
	    this._sketch = undefined;
	    this._raf = null;
	    this._recordTimeout = null;
	    this._lastRedrawResult = undefined;
	    this._isP5Resizing = false;
	    this._keyboardShortcuts = keyboardShortcuts({
	        enabled: function () { return this$1.settings.hotkeys !== false; },
	        save: function (ev) {
	            if (ev.shiftKey) {
	                if (this$1.props.recording) {
	                    this$1.endRecord();
	                    this$1.run();
	                } else 
	                    { this$1.record(); }
	            } else if (!this$1.props.recording) {
	                this$1.exportFrame();
	            }
	        },
	        togglePlay: function () {
	            if (this$1.props.playing) 
	                { this$1.pause(); }
	             else 
	                { this$1.play(); }
	        },
	        commit: function (ev) {
	            this$1.exportFrame({
	                commit: true
	            });
	        }
	    });
	    this._animateHandler = (function () { return this$1.animate(); });
	    this._resizeHandler = (function () {
	        var changed = this$1.resize();
	        if (changed) {
	            this$1.render();
	        }
	    });
	};

	var prototypeAccessors = { sketch: { configurable: true },settings: { configurable: true },props: { configurable: true } };
	prototypeAccessors.sketch.get = function () {
	    return this._sketch;
	};
	prototypeAccessors.settings.get = function () {
	    return this._settings;
	};
	prototypeAccessors.props.get = function () {
	    return this._props;
	};
	SketchManager.prototype._computePlayhead = function _computePlayhead (currentTime, duration) {
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    return hasDuration ? currentTime / duration : 0;
	};
	SketchManager.prototype._computeFrame = function _computeFrame (playhead, time, totalFrames, fps) {
	    return isFinite(totalFrames) && totalFrames > 1 ? Math.floor(playhead * (totalFrames - 1)) : Math.floor(fps * time);
	};
	SketchManager.prototype._computeCurrentFrame = function _computeCurrentFrame () {
	    return this._computeFrame(this.props.playhead, this.props.time, this.props.totalFrames, this.props.fps);
	};
	SketchManager.prototype._getSizeProps = function _getSizeProps () {
	    var props = this.props;
	    return {
	        width: props.width,
	        height: props.height,
	        pixelRatio: props.pixelRatio,
	        canvasWidth: props.canvasWidth,
	        canvasHeight: props.canvasHeight,
	        viewportWidth: props.viewportWidth,
	        viewportHeight: props.viewportHeight
	    };
	};
	SketchManager.prototype.run = function run () {
	    if (!this.sketch) 
	        { throw new Error('should wait until sketch is loaded before trying to play()'); }
	    if (this.settings.playing !== false) {
	        this.play();
	    }
	    if (typeof this.sketch.dispose === 'function') {
	        console.warn('In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()');
	    }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.tick();
	    this.render();
	    return this;
	};
	SketchManager.prototype._cancelTimeouts = function _cancelTimeouts () {
	    if (this._raf != null && typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
	        window.cancelAnimationFrame(this._raf);
	        this._raf = null;
	    }
	    if (this._recordTimeout != null) {
	        clearTimeout(this._recordTimeout);
	        this._recordTimeout = null;
	    }
	};
	SketchManager.prototype.play = function play () {
	    var animate = this.settings.animate;
	    if ('animation' in this.settings) {
	        animate = true;
	        console.warn('[canvas-sketch] { animation } has been renamed to { animate }');
	    }
	    if (!animate) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported');
	        return;
	    }
	    if (this.props.playing) 
	        { return; }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.props.playing = true;
	    this._cancelTimeouts();
	    this._lastTime = browser();
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	};
	SketchManager.prototype.pause = function pause () {
	    if (this.props.recording) 
	        { this.endRecord(); }
	    this.props.playing = false;
	    this._cancelTimeouts();
	};
	SketchManager.prototype.togglePlay = function togglePlay () {
	    if (this.props.playing) 
	        { this.pause(); }
	     else 
	        { this.play(); }
	};
	SketchManager.prototype.stop = function stop () {
	    this.pause();
	    this.props.frame = 0;
	    this.props.playhead = 0;
	    this.props.time = 0;
	    this.props.deltaTime = 0;
	    this.props.started = false;
	    this.render();
	};
	SketchManager.prototype.record = function record () {
	        var this$1 = this;

	    if (this.props.recording) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Recording from Node.js is not yet supported');
	        return;
	    }
	    this.stop();
	    this.props.playing = true;
	    this.props.recording = true;
	    var exportOpts = this._createExportOptions({
	        sequence: true
	    });
	    var frameInterval = 1 / this.props.fps;
	    this._cancelTimeouts();
	    var tick = function () {
	        if (!this$1.props.recording) 
	            { return Promise.resolve(); }
	        this$1.props.deltaTime = frameInterval;
	        this$1.tick();
	        return this$1.exportFrame(exportOpts).then(function () {
	            if (!this$1.props.recording) 
	                { return; }
	            this$1.props.deltaTime = 0;
	            this$1.props.frame++;
	            if (this$1.props.frame < this$1.props.totalFrames) {
	                this$1.props.time += frameInterval;
	                this$1.props.playhead = this$1._computePlayhead(this$1.props.time, this$1.props.duration);
	                this$1._recordTimeout = setTimeout(tick, 0);
	            } else {
	                console.log('Finished recording');
	                this$1._signalEnd();
	                this$1.endRecord();
	                this$1.stop();
	                this$1.run();
	            }
	        });
	    };
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    if (this.sketch && typeof this.sketch.beginRecord === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.beginRecord(props); });
	    }
	    streamStart(exportOpts).catch(function (err) {
	        console.error(err);
	    }).then(function (response) {
	        this$1._raf = window.requestAnimationFrame(tick);
	    });
	};
	SketchManager.prototype._signalBegin = function _signalBegin () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.begin === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.begin(props); });
	    }
	};
	SketchManager.prototype._signalEnd = function _signalEnd () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.end === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.end(props); });
	    }
	};
	SketchManager.prototype.endRecord = function endRecord () {
	        var this$1 = this;

	    var wasRecording = this.props.recording;
	    this._cancelTimeouts();
	    this.props.recording = false;
	    this.props.deltaTime = 0;
	    this.props.playing = false;
	    return streamEnd().catch(function (err) {
	        console.error(err);
	    }).then(function () {
	        if (wasRecording && this$1.sketch && typeof this$1.sketch.endRecord === 'function') {
	            this$1._wrapContextScale(function (props) { return this$1.sketch.endRecord(props); });
	        }
	    });
	};
	SketchManager.prototype._createExportOptions = function _createExportOptions (opt) {
	        if ( opt === void 0 ) opt = {};

	    return {
	        sequence: opt.sequence,
	        save: opt.save,
	        fps: this.props.fps,
	        frame: opt.sequence ? this.props.frame : undefined,
	        file: this.settings.file,
	        name: this.settings.name,
	        prefix: this.settings.prefix,
	        suffix: this.settings.suffix,
	        encoding: this.settings.encoding,
	        encodingQuality: this.settings.encodingQuality,
	        timeStamp: opt.timeStamp || getTimeStamp(),
	        totalFrames: isFinite(this.props.totalFrames) ? Math.max(0, this.props.totalFrames) : 1000
	    };
	};
	SketchManager.prototype.exportFrame = function exportFrame (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    if (!this.sketch) 
	        { return Promise.all([]); }
	    if (typeof this.sketch.preExport === 'function') {
	        this.sketch.preExport();
	    }
	    var exportOpts = this._createExportOptions(opt);
	    var client = getClientAPI();
	    var p = Promise.resolve();
	    if (client && opt.commit && typeof client.commit === 'function') {
	        var commitOpts = objectAssign({}, exportOpts);
	        var hash = client.commit(commitOpts);
	        if (isPromise_1(hash)) 
	            { p = hash; }
	         else 
	            { p = Promise.resolve(hash); }
	    }
	    return p.then(function (hash) { return this$1._doExportFrame(objectAssign({}, exportOpts, {
	        hash: hash || ''
	    })); }).then(function (result) {
	        if (result.length === 1) 
	            { return result[0]; }
	         else 
	            { return result; }
	    });
	};
	SketchManager.prototype._doExportFrame = function _doExportFrame (exportOpts) {
	        var this$1 = this;
	        if ( exportOpts === void 0 ) exportOpts = {};

	    this._props.exporting = true;
	    this.resize();
	    var drawResult = this.render();
	    var canvas = this.props.canvas;
	    if (typeof drawResult === 'undefined') {
	        drawResult = [canvas];
	    }
	    drawResult = [].concat(drawResult).filter(Boolean);
	    drawResult = drawResult.map(function (result) {
	        var hasDataObject = typeof result === 'object' && result && ('data' in result || 'dataURL' in result);
	        var data = hasDataObject ? result.data : result;
	        var opts = hasDataObject ? objectAssign({}, result, {
	            data: data
	        }) : {
	            data: data
	        };
	        if (isCanvas(data)) {
	            var encoding = opts.encoding || exportOpts.encoding;
	            var encodingQuality = defined(opts.encodingQuality, exportOpts.encodingQuality, 0.95);
	            var ref = exportCanvas(data, {
	                encoding: encoding,
	                encodingQuality: encodingQuality
	            });
	                var dataURL = ref.dataURL;
	                var extension = ref.extension;
	                var type = ref.type;
	            return Object.assign(opts, {
	                dataURL: dataURL,
	                extension: extension,
	                type: type
	            });
	        } else {
	            return opts;
	        }
	    });
	    this._props.exporting = false;
	    this.resize();
	    this.render();
	    return Promise.all(drawResult.map(function (result, i, layerList) {
	        var curOpt = objectAssign({
	            extension: '',
	            prefix: '',
	            suffix: ''
	        }, exportOpts, result, {
	            layer: i,
	            totalLayers: layerList.length
	        });
	        var saveParam = exportOpts.save === false ? false : result.save;
	        curOpt.save = saveParam !== false;
	        curOpt.filename = resolveFilename(curOpt);
	        delete curOpt.encoding;
	        delete curOpt.encodingQuality;
	        for (var k in curOpt) {
	            if (typeof curOpt[k] === 'undefined') 
	                { delete curOpt[k]; }
	        }
	        var savePromise = Promise.resolve({});
	        if (curOpt.save) {
	            var data = curOpt.data;
	            if (curOpt.dataURL) {
	                var dataURL = curOpt.dataURL;
	                savePromise = saveDataURL(dataURL, curOpt);
	            } else {
	                savePromise = saveFile(data, curOpt);
	            }
	        }
	        return savePromise.then(function (saveResult) { return Object.assign({}, curOpt, saveResult); });
	    })).then(function (ev) {
	        var savedEvents = ev.filter(function (e) { return e.save; });
	        if (savedEvents.length > 0) {
	            var eventWithOutput = savedEvents.find(function (e) { return e.outputName; });
	            var isClient = savedEvents.some(function (e) { return e.client; });
	            var isStreaming = savedEvents.some(function (e) { return e.stream; });
	            var item;
	            if (savedEvents.length > 1) 
	                { item = savedEvents.length; }
	             else if (eventWithOutput) 
	                { item = (eventWithOutput.outputName) + "/" + (savedEvents[0].filename); }
	             else 
	                { item = "" + (savedEvents[0].filename); }
	            var ofSeq = '';
	            if (exportOpts.sequence) {
	                var hasTotalFrames = isFinite(this$1.props.totalFrames);
	                ofSeq = hasTotalFrames ? (" (frame " + (exportOpts.frame + 1) + " / " + (this$1.props.totalFrames) + ")") : (" (frame " + (exportOpts.frame) + ")");
	            } else if (savedEvents.length > 1) {
	                ofSeq = " files";
	            }
	            var client = isClient ? 'canvas-sketch-cli' : 'canvas-sketch';
	            var action = isStreaming ? 'Streaming into' : 'Exported';
	            console.log(("%c[" + client + "]%c " + action + " %c" + item + "%c" + ofSeq), 'color: #8e8e8e;', 'color: initial;', 'font-weight: bold;', 'font-weight: initial;');
	        }
	        if (typeof this$1.sketch.postExport === 'function') {
	            this$1.sketch.postExport();
	        }
	        return ev;
	    });
	};
	SketchManager.prototype._wrapContextScale = function _wrapContextScale (cb) {
	    this._preRender();
	    cb(this.props);
	    this._postRender();
	};
	SketchManager.prototype._preRender = function _preRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.save();
	        if (this.settings.scaleContext !== false) {
	            props.context.scale(props.scaleX, props.scaleY);
	        }
	    } else if (props.p5) {
	        props.p5.scale(props.scaleX / props.pixelRatio, props.scaleY / props.pixelRatio);
	    }
	};
	SketchManager.prototype._postRender = function _postRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.restore();
	    }
	    if (props.gl && this.settings.flush !== false && !props.p5) {
	        props.gl.flush();
	    }
	};
	SketchManager.prototype.tick = function tick () {
	    if (this.sketch && typeof this.sketch.tick === 'function') {
	        this._preRender();
	        this.sketch.tick(this.props);
	        this._postRender();
	    }
	};
	SketchManager.prototype.render = function render () {
	    if (this.props.p5) {
	        this._lastRedrawResult = undefined;
	        this.props.p5.redraw();
	        return this._lastRedrawResult;
	    } else {
	        return this.submitDrawCall();
	    }
	};
	SketchManager.prototype.submitDrawCall = function submitDrawCall () {
	    if (!this.sketch) 
	        { return; }
	    var props = this.props;
	    this._preRender();
	    var drawResult;
	    if (typeof this.sketch === 'function') {
	        drawResult = this.sketch(props);
	    } else if (typeof this.sketch.render === 'function') {
	        drawResult = this.sketch.render(props);
	    }
	    this._postRender();
	    return drawResult;
	};
	SketchManager.prototype.update = function update (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    var notYetSupported = ['animate'];
	    Object.keys(opt).forEach(function (key) {
	        if (notYetSupported.indexOf(key) >= 0) {
	            throw new Error(("Sorry, the { " + key + " } option is not yet supported with update()."));
	        }
	    });
	    var oldCanvas = this._settings.canvas;
	    var oldContext = this._settings.context;
	    for (var key in opt) {
	        var value = opt[key];
	        if (typeof value !== 'undefined') {
	            this$1._settings[key] = value;
	        }
	    }
	    var timeOpts = Object.assign({}, this._settings, opt);
	    if ('time' in opt && 'frame' in opt) 
	        { throw new Error('You should specify { time } or { frame } but not both'); }
	     else if ('time' in opt) 
	        { delete timeOpts.frame; }
	     else if ('frame' in opt) 
	        { delete timeOpts.time; }
	    if ('duration' in opt && 'totalFrames' in opt) 
	        { throw new Error('You should specify { duration } or { totalFrames } but not both'); }
	     else if ('duration' in opt) 
	        { delete timeOpts.totalFrames; }
	     else if ('totalFrames' in opt) 
	        { delete timeOpts.duration; }
	    if ('data' in opt) 
	        { this._props.data = opt.data; }
	    var timeProps = this.getTimeProps(timeOpts);
	    Object.assign(this._props, timeProps);
	    if (oldCanvas !== this._settings.canvas || oldContext !== this._settings.context) {
	        var ref = createCanvas(this._settings);
	            var canvas = ref.canvas;
	            var context = ref.context;
	        this.props.canvas = canvas;
	        this.props.context = context;
	        this._setupGLKey();
	        this._appendCanvasIfNeeded();
	    }
	    if (opt.p5 && typeof opt.p5 !== 'function') {
	        this.props.p5 = opt.p5;
	        this.props.p5.draw = (function () {
	            if (this$1._isP5Resizing) 
	                { return; }
	            this$1._lastRedrawResult = this$1.submitDrawCall();
	        });
	    }
	    if ('playing' in opt) {
	        if (opt.playing) 
	            { this.play(); }
	         else 
	            { this.pause(); }
	    }
	    checkSettings(this._settings);
	    this.resize();
	    this.render();
	    return this.props;
	};
	SketchManager.prototype.resize = function resize () {
	    var oldSizes = this._getSizeProps();
	    var settings = this.settings;
	    var props = this.props;
	    var newProps = resizeCanvas(props, settings);
	    Object.assign(this._props, newProps);
	    var ref = this.props;
	        var pixelRatio = ref.pixelRatio;
	        var canvasWidth = ref.canvasWidth;
	        var canvasHeight = ref.canvasHeight;
	        var styleWidth = ref.styleWidth;
	        var styleHeight = ref.styleHeight;
	    var canvas = this.props.canvas;
	    if (canvas && settings.resizeCanvas !== false) {
	        if (props.p5) {
	            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
	                this._isP5Resizing = true;
	                props.p5.pixelDensity(pixelRatio);
	                props.p5.resizeCanvas(canvasWidth / pixelRatio, canvasHeight / pixelRatio, false);
	                this._isP5Resizing = false;
	            }
	        } else {
	            if (canvas.width !== canvasWidth) 
	                { canvas.width = canvasWidth; }
	            if (canvas.height !== canvasHeight) 
	                { canvas.height = canvasHeight; }
	        }
	        if (isBrowser() && settings.styleCanvas !== false) {
	            canvas.style.width = styleWidth + "px";
	            canvas.style.height = styleHeight + "px";
	        }
	    }
	    var newSizes = this._getSizeProps();
	    var changed = !deepEqual_1(oldSizes, newSizes);
	    if (changed) {
	        this._sizeChanged();
	    }
	    return changed;
	};
	SketchManager.prototype._sizeChanged = function _sizeChanged () {
	    if (this.sketch && typeof this.sketch.resize === 'function') {
	        this.sketch.resize(this.props);
	    }
	};
	SketchManager.prototype.animate = function animate () {
	    if (!this.props.playing) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Animation in Node.js is not yet supported');
	        return;
	    }
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	    var now = browser();
	    var fps = this.props.fps;
	    var frameIntervalMS = 1000 / fps;
	    var deltaTimeMS = now - this._lastTime;
	    var duration = this.props.duration;
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var isNewFrame = true;
	    var playbackRate = this.settings.playbackRate;
	    if (playbackRate === 'fixed') {
	        deltaTimeMS = frameIntervalMS;
	    } else if (playbackRate === 'throttle') {
	        if (deltaTimeMS > frameIntervalMS) {
	            now = now - deltaTimeMS % frameIntervalMS;
	            this._lastTime = now;
	        } else {
	            isNewFrame = false;
	        }
	    } else {
	        this._lastTime = now;
	    }
	    var deltaTime = deltaTimeMS / 1000;
	    var newTime = this.props.time + deltaTime * this.props.timeScale;
	    if (newTime < 0 && hasDuration) {
	        newTime = duration + newTime;
	    }
	    var isFinished = false;
	    var isLoopStart = false;
	    var looping = this.settings.loop !== false;
	    if (hasDuration && newTime >= duration) {
	        if (looping) {
	            isNewFrame = true;
	            newTime = newTime % duration;
	            isLoopStart = true;
	        } else {
	            isNewFrame = false;
	            newTime = duration;
	            isFinished = true;
	        }
	        this._signalEnd();
	    }
	    if (isNewFrame) {
	        this.props.deltaTime = deltaTime;
	        this.props.time = newTime;
	        this.props.playhead = this._computePlayhead(newTime, duration);
	        var lastFrame = this.props.frame;
	        this.props.frame = this._computeCurrentFrame();
	        if (isLoopStart) 
	            { this._signalBegin(); }
	        if (lastFrame !== this.props.frame) 
	            { this.tick(); }
	        this.render();
	        this.props.deltaTime = 0;
	    }
	    if (isFinished) {
	        this.pause();
	    }
	};
	SketchManager.prototype.dispatch = function dispatch (cb) {
	    if (typeof cb !== 'function') 
	        { throw new Error('must pass function into dispatch()'); }
	    cb(this.props);
	    this.render();
	};
	SketchManager.prototype.mount = function mount () {
	    this._appendCanvasIfNeeded();
	};
	SketchManager.prototype.unmount = function unmount () {
	    if (isBrowser()) {
	        window.removeEventListener('resize', this._resizeHandler);
	        this._keyboardShortcuts.detach();
	    }
	    if (this.props.canvas.parentElement) {
	        this.props.canvas.parentElement.removeChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._appendCanvasIfNeeded = function _appendCanvasIfNeeded () {
	    if (!isBrowser()) 
	        { return; }
	    if (this.settings.parent !== false && (this.props.canvas && !this.props.canvas.parentElement)) {
	        var defaultParent = this.settings.parent || document.body;
	        defaultParent.appendChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._setupGLKey = function _setupGLKey () {
	    if (this.props.context) {
	        if (isWebGLContext(this.props.context)) {
	            this._props.gl = this.props.context;
	        } else {
	            delete this._props.gl;
	        }
	    }
	};
	SketchManager.prototype.getTimeProps = function getTimeProps (settings) {
	        if ( settings === void 0 ) settings = {};

	    var duration = settings.duration;
	    var totalFrames = settings.totalFrames;
	    var timeScale = defined(settings.timeScale, 1);
	    var fps = defined(settings.fps, 24);
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var hasTotalFrames = typeof totalFrames === 'number' && isFinite(totalFrames);
	    var totalFramesFromDuration = hasDuration ? Math.floor(fps * duration) : undefined;
	    var durationFromTotalFrames = hasTotalFrames ? totalFrames / fps : undefined;
	    if (hasDuration && hasTotalFrames && totalFramesFromDuration !== totalFrames) {
	        throw new Error('You should specify either duration or totalFrames, but not both. Or, they must match exactly.');
	    }
	    if (typeof settings.dimensions === 'undefined' && typeof settings.units !== 'undefined') {
	        console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored.");
	    }
	    totalFrames = defined(totalFrames, totalFramesFromDuration, Infinity);
	    duration = defined(duration, durationFromTotalFrames, Infinity);
	    var startTime = settings.time;
	    var startFrame = settings.frame;
	    var hasStartTime = typeof startTime === 'number' && isFinite(startTime);
	    var hasStartFrame = typeof startFrame === 'number' && isFinite(startFrame);
	    var time = 0;
	    var frame = 0;
	    var playhead = 0;
	    if (hasStartTime && hasStartFrame) {
	        throw new Error('You should specify either start frame or time, but not both.');
	    } else if (hasStartTime) {
	        time = startTime;
	        playhead = this._computePlayhead(time, duration);
	        frame = this._computeFrame(playhead, time, totalFrames, fps);
	    } else if (hasStartFrame) {
	        frame = startFrame;
	        time = frame / fps;
	        playhead = this._computePlayhead(time, duration);
	    }
	    return {
	        playhead: playhead,
	        time: time,
	        frame: frame,
	        duration: duration,
	        totalFrames: totalFrames,
	        fps: fps,
	        timeScale: timeScale
	    };
	};
	SketchManager.prototype.setup = function setup (settings) {
	        var this$1 = this;
	        if ( settings === void 0 ) settings = {};

	    if (this.sketch) 
	        { throw new Error('Multiple setup() calls not yet supported.'); }
	    this._settings = Object.assign({}, settings, this._settings);
	    checkSettings(this._settings);
	    var ref = createCanvas(this._settings);
	        var context = ref.context;
	        var canvas = ref.canvas;
	    var timeProps = this.getTimeProps(this._settings);
	    this._props = Object.assign({}, timeProps,
	        {canvas: canvas,
	        context: context,
	        deltaTime: 0,
	        started: false,
	        exporting: false,
	        playing: false,
	        recording: false,
	        settings: this.settings,
	        data: this.settings.data,
	        render: function () { return this$1.render(); },
	        togglePlay: function () { return this$1.togglePlay(); },
	        dispatch: function (cb) { return this$1.dispatch(cb); },
	        tick: function () { return this$1.tick(); },
	        resize: function () { return this$1.resize(); },
	        update: function (opt) { return this$1.update(opt); },
	        exportFrame: function (opt) { return this$1.exportFrame(opt); },
	        record: function () { return this$1.record(); },
	        play: function () { return this$1.play(); },
	        pause: function () { return this$1.pause(); },
	        stop: function () { return this$1.stop(); }});
	    this._setupGLKey();
	    this.resize();
	};
	SketchManager.prototype.loadAndRun = function loadAndRun (canvasSketch, newSettings) {
	        var this$1 = this;

	    return this.load(canvasSketch, newSettings).then(function () {
	        this$1.run();
	        return this$1;
	    });
	};
	SketchManager.prototype.unload = function unload () {
	        var this$1 = this;

	    this.pause();
	    if (!this.sketch) 
	        { return; }
	    if (typeof this.sketch.unload === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.unload(props); });
	    }
	    this._sketch = null;
	};
	SketchManager.prototype.destroy = function destroy () {
	    this.unload();
	    this.unmount();
	};
	SketchManager.prototype.load = function load (createSketch, newSettings) {
	        var this$1 = this;

	    if (typeof createSketch !== 'function') {
	        throw new Error('The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)');
	    }
	    if (this.sketch) {
	        this.unload();
	    }
	    if (typeof newSettings !== 'undefined') {
	        this.update(newSettings);
	    }
	    this._preRender();
	    var preload = Promise.resolve();
	    if (this.settings.p5) {
	        if (!isBrowser()) {
	            throw new Error('[canvas-sketch] ERROR: Using p5.js in Node.js is not supported');
	        }
	        preload = new Promise(function (resolve) {
	            var P5Constructor = this$1.settings.p5;
	            var preload;
	            if (P5Constructor.p5) {
	                preload = P5Constructor.preload;
	                P5Constructor = P5Constructor.p5;
	            }
	            var p5Sketch = function (p5) {
	                if (preload) 
	                    { p5.preload = (function () { return preload(p5); }); }
	                p5.setup = (function () {
	                    var props = this$1.props;
	                    var isGL = this$1.settings.context === 'webgl';
	                    var renderer = isGL ? p5.WEBGL : p5.P2D;
	                    p5.noLoop();
	                    p5.pixelDensity(props.pixelRatio);
	                    p5.createCanvas(props.viewportWidth, props.viewportHeight, renderer);
	                    if (isGL && this$1.settings.attributes) {
	                        p5.setAttributes(this$1.settings.attributes);
	                    }
	                    this$1.update({
	                        p5: p5,
	                        canvas: p5.canvas,
	                        context: p5._renderer.drawingContext
	                    });
	                    resolve();
	                });
	            };
	            if (typeof P5Constructor === 'function') {
	                new P5Constructor(p5Sketch);
	            } else {
	                if (typeof window.createCanvas !== 'function') {
	                    throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");
	                }
	                p5Sketch(window);
	            }
	        });
	    }
	    return preload.then(function () {
	        var loader = createSketch(this$1.props);
	        if (!isPromise_1(loader)) {
	            loader = Promise.resolve(loader);
	        }
	        return loader;
	    }).then(function (sketch) {
	        if (!sketch) 
	            { sketch = {}; }
	        this$1._sketch = sketch;
	        if (isBrowser()) {
	            this$1._keyboardShortcuts.attach();
	            window.addEventListener('resize', this$1._resizeHandler);
	        }
	        this$1._postRender();
	        this$1._sizeChanged();
	        return this$1;
	    }).catch(function (err) {
	        console.warn('Could not start sketch, the async loading function rejected with an error:\n    Error: ' + err.message);
	        throw err;
	    });
	};

	Object.defineProperties( SketchManager.prototype, prototypeAccessors );

	var CACHE = 'hot-id-cache';
	var runtimeCollisions = [];
	function isHotReload() {
	    var client = getClientAPI();
	    return client && client.hot;
	}

	function cacheGet(id) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    return client[CACHE][id];
	}

	function cachePut(id, data) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    client[CACHE][id] = data;
	}

	function getTimeProp(oldManager, newSettings) {
	    return newSettings.animate ? {
	        time: oldManager.props.time
	    } : undefined;
	}

	function canvasSketch(sketch, settings) {
	    if ( settings === void 0 ) settings = {};

	    if (settings.p5) {
	        if (settings.canvas || settings.context && typeof settings.context !== 'string') {
	            throw new Error("In { p5 } mode, you can't pass your own canvas or context, unless the context is a \"webgl\" or \"2d\" string");
	        }
	        var context = typeof settings.context === 'string' ? settings.context : false;
	        settings = Object.assign({}, settings, {
	            canvas: false,
	            context: context
	        });
	    }
	    var isHot = isHotReload();
	    var hotID;
	    if (isHot) {
	        hotID = defined(settings.id, '$__DEFAULT_CANVAS_SKETCH_ID__$');
	    }
	    var isInjecting = isHot && typeof hotID === 'string';
	    if (isInjecting && runtimeCollisions.includes(hotID)) {
	        console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ", hotID);
	        isInjecting = false;
	    }
	    var preload = Promise.resolve();
	    if (isInjecting) {
	        runtimeCollisions.push(hotID);
	        var previousData = cacheGet(hotID);
	        if (previousData) {
	            var next = function () {
	                var newProps = getTimeProp(previousData.manager, settings);
	                previousData.manager.destroy();
	                return newProps;
	            };
	            preload = previousData.load.then(next).catch(next);
	        }
	    }
	    return preload.then(function (newProps) {
	        var manager = new SketchManager();
	        var result;
	        if (sketch) {
	            settings = Object.assign({}, settings, newProps);
	            manager.setup(settings);
	            manager.mount();
	            result = manager.loadAndRun(sketch);
	        } else {
	            result = Promise.resolve(manager);
	        }
	        if (isInjecting) {
	            cachePut(hotID, {
	                load: result,
	                manager: manager
	            });
	        }
	        return result;
	    });
	}

	canvasSketch.canvasSketch = canvasSketch;
	canvasSketch.PaperSizes = paperSizes;

	return canvasSketch;

})));


},{}],"node_modules/seed-random/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var width = 256;// each RC4 output is 0 <= x < 256
var chunks = 6;// at least six RC4 outputs for each double
var digits = 52;// there are 52 significant digits in a double
var pool = [];// pool: entropy pool starts empty
var GLOBAL = typeof global === 'undefined' ? window : global;

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = Math.pow(width, chunks),
    significance = Math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1;


var oldRandom = Math.random;

//
// seedrandom()
// This is the seedrandom function described above.
//
module.exports = function(seed, options) {
  if (options && options.global === true) {
    options.global = false;
    Math.random = module.exports(seed, options);
    options.global = true;
    return Math.random;
  }
  var use_entropy = (options && options.entropy) || false;
  var key = [];

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    use_entropy ? [seed, tostring(pool)] :
    0 in arguments ? seed : autoseed(), 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  return function() {         // Closure to return a random double:
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer Math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };
};

module.exports.resetGlobal = function () {
  Math.random = oldRandom;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj)[0], prop;
  if (depth && typ == 'o') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 's' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array=} seed */
function autoseed(seed) {
  try {
    GLOBAL.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, GLOBAL, GLOBAL.navigator && GLOBAL.navigator.plugins,
            GLOBAL.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call Math.random on its own again after
// initialization.
//
mixkey(Math.random(), pool);

},{}],"node_modules/simplex-noise/simplex-noise.js":[function(require,module,exports) {
var define;
/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function() {
  'use strict';

  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  var F3 = 1.0 / 3.0;
  var G3 = 1.0 / 6.0;
  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

  function SimplexNoise(randomOrSeed) {
    var random;
    if (typeof randomOrSeed == 'function') {
      random = randomOrSeed;
    }
    else if (randomOrSeed) {
      random = alea(randomOrSeed);
    } else {
      random = Math.random;
    }
    this.p = buildPermutationTable(random);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (var i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

  }
  SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0,
      -1, 1, 0,
      1, -1, 0,

      -1, -1, 0,
      1, 0, 1,
      -1, 0, 1,

      1, 0, -1,
      -1, 0, -1,
      0, 1, 1,

      0, -1, 1,
      0, 1, -1,
      0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function(xin, yin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0 = 0; // Noise contributions from the three corners
      var n1 = 0;
      var n2 = 0;
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin) * F2; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space
      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin
      var y0 = yin - Y0;
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      else {
        i1 = 0;
        j1 = 1;
      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
      var y2 = y0 - 1.0 + 2.0 * G2;
      // Work out the hashed gradient indices of the three simplex corners
      var ii = i & 255;
      var jj = j & 255;
      // Calculate the contribution from the three corners
      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 >= 0) {
        var gi0 = permMod12[ii + perm[jj]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 >= 0) {
        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
      }
      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 >= 0) {
        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function(xin, yin, zin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0, n1, n2, n3; // Noise contributions from the four corners
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);
      var t = (i + j + k) * G3;
      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
      var Y0 = j - t;
      var Z0 = k - t;
      var x0 = xin - X0; // The x,y,z distances from the cell origin
      var y0 = yin - Y0;
      var z0 = zin - Z0;
      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.
      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // X Y Z order
        else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // X Z Y order
        else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // Z X Y order
      }
      else { // x0<y0
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Y Z X order
        else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // Y X Z order
      }
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.
      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;
      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
      var y2 = y0 - j2 + 2.0 * G3;
      var z2 = z0 - k2 + 2.0 * G3;
      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
      var y3 = y0 - 1.0 + 3.0 * G3;
      var z3 = z0 - 1.0 + 3.0 * G3;
      // Work out the hashed gradient indices of the four simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      // Calculate the contribution from the four corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
        t3 *= t3;
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]
      return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function(x, y, z, w) {
      var perm = this.perm;
      var grad4 = this.grad4;

      var n0, n1, n2, n3, n4; // Noise contributions from the five corners
      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
      var s = (x + y + z + w) * F4; // Factor for 4D skewing
      var i = Math.floor(x + s);
      var j = Math.floor(y + s);
      var k = Math.floor(z + s);
      var l = Math.floor(w + s);
      var t = (i + j + k + l) * G4; // Factor for 4D unskewing
      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
      var Y0 = j - t;
      var Z0 = k - t;
      var W0 = l - t;
      var x0 = x - X0; // The x,y,z,w distances from the cell origin
      var y0 = y - Y0;
      var z0 = z - Z0;
      var w0 = w - W0;
      // For the 4D case, the simplex is a 4D shape I won't even try to describe.
      // To find out which of the 24 possible simplices we're in, we need to
      // determine the magnitude ordering of x0, y0, z0 and w0.
      // Six pair-wise comparisons are performed between each possible pair
      // of the four coordinates, and the results are used to rank the numbers.
      var rankx = 0;
      var ranky = 0;
      var rankz = 0;
      var rankw = 0;
      if (x0 > y0) rankx++;
      else ranky++;
      if (x0 > z0) rankx++;
      else rankz++;
      if (x0 > w0) rankx++;
      else rankw++;
      if (y0 > z0) ranky++;
      else rankz++;
      if (y0 > w0) ranky++;
      else rankw++;
      if (z0 > w0) rankz++;
      else rankw++;
      var i1, j1, k1, l1; // The integer offsets for the second simplex corner
      var i2, j2, k2, l2; // The integer offsets for the third simplex corner
      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
      // impossible. Only the 24 indices which have non-zero entries make any sense.
      // We use a thresholding to set the coordinates in turn from the largest magnitude.
      // Rank 3 denotes the largest coordinate.
      i1 = rankx >= 3 ? 1 : 0;
      j1 = ranky >= 3 ? 1 : 0;
      k1 = rankz >= 3 ? 1 : 0;
      l1 = rankw >= 3 ? 1 : 0;
      // Rank 2 denotes the second largest coordinate.
      i2 = rankx >= 2 ? 1 : 0;
      j2 = ranky >= 2 ? 1 : 0;
      k2 = rankz >= 2 ? 1 : 0;
      l2 = rankw >= 2 ? 1 : 0;
      // Rank 1 denotes the second smallest coordinate.
      i3 = rankx >= 1 ? 1 : 0;
      j3 = ranky >= 1 ? 1 : 0;
      k3 = rankz >= 1 ? 1 : 0;
      l3 = rankw >= 1 ? 1 : 0;
      // The fifth corner has all coordinate offsets = 1, so no need to compute that.
      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
      var y1 = y0 - j1 + G4;
      var z1 = z0 - k1 + G4;
      var w1 = w0 - l1 + G4;
      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
      var y2 = y0 - j2 + 2.0 * G4;
      var z2 = z0 - k2 + 2.0 * G4;
      var w2 = w0 - l2 + 2.0 * G4;
      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
      var y3 = y0 - j3 + 3.0 * G4;
      var z3 = z0 - k3 + 3.0 * G4;
      var w3 = w0 - l3 + 3.0 * G4;
      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
      var y4 = y0 - 1.0 + 4.0 * G4;
      var z4 = z0 - 1.0 + 4.0 * G4;
      var w4 = w0 - 1.0 + 4.0 * G4;
      // Work out the hashed gradient indices of the five simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      var ll = l & 255;
      // Calculate the contribution from the five corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
        t0 *= t0;
        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
        t1 *= t1;
        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
        t2 *= t2;
        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
        t3 *= t3;
        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
      }
      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
      if (t4 < 0) n4 = 0.0;
      else {
        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
        t4 *= t4;
        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
      }
      // Sum up and scale the result to cover the range [-1,1]
      return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
  };

  function buildPermutationTable(random) {
    var i;
    var p = new Uint8Array(256);
    for (i = 0; i < 256; i++) {
      p[i] = i;
    }
    for (i = 0; i < 255; i++) {
      var r = i + ~~(random() * (256 - i));
      var aux = p[i];
      p[i] = p[r];
      p[r] = aux;
    }
    return p;
  }
  SimplexNoise._buildPermutationTable = buildPermutationTable;

  function alea() {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    var mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < arguments.length; i++) {
      s0 -= mash(arguments[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(arguments[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(arguments[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;
    return function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
  }
  function masher() {
    var n = 0xefc8249d;
    return function(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
  }

  // amd
  if (typeof define !== 'undefined' && define.amd) define(function() {return SimplexNoise;});
  // common js
  if (typeof exports !== 'undefined') exports.SimplexNoise = SimplexNoise;
  // browser
  else if (typeof window !== 'undefined') window.SimplexNoise = SimplexNoise;
  // nodejs
  if (typeof module !== 'undefined') {
    module.exports = SimplexNoise;
  }

})();

},{}],"node_modules/defined/index.js":[function(require,module,exports) {
'use strict';

module.exports = function defined() {
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] !== 'undefined') {
			return arguments[i];
		}
	}
};

},{}],"node_modules/canvas-sketch-util/random.js":[function(require,module,exports) {
var seedRandom = require('seed-random');
var SimplexNoise = require('simplex-noise');
var defined = require('defined');

function createRandom (defaultSeed) {
  defaultSeed = defined(defaultSeed, null);
  var defaultRandom = Math.random;
  var currentSeed;
  var currentRandom;
  var noiseGenerator;
  var _nextGaussian = null;
  var _hasNextGaussian = false;

  setSeed(defaultSeed);

  return {
    value: value,
    createRandom: function (defaultSeed) {
      return createRandom(defaultSeed);
    },
    setSeed: setSeed,
    getSeed: getSeed,
    getRandomSeed: getRandomSeed,
    valueNonZero: valueNonZero,
    permuteNoise: permuteNoise,
    noise1D: noise1D,
    noise2D: noise2D,
    noise3D: noise3D,
    noise4D: noise4D,
    sign: sign,
    boolean: boolean,
    chance: chance,
    range: range,
    rangeFloor: rangeFloor,
    pick: pick,
    shuffle: shuffle,
    onCircle: onCircle,
    insideCircle: insideCircle,
    onSphere: onSphere,
    insideSphere: insideSphere,
    quaternion: quaternion,
    weighted: weighted,
    weightedSet: weightedSet,
    weightedSetIndex: weightedSetIndex,
    gaussian: gaussian
  };

  function setSeed (seed, opt) {
    if (typeof seed === 'number' || typeof seed === 'string') {
      currentSeed = seed;
      currentRandom = seedRandom(currentSeed, opt);
    } else {
      currentSeed = undefined;
      currentRandom = defaultRandom;
    }
    noiseGenerator = createNoise();
    _nextGaussian = null;
    _hasNextGaussian = false;
  }

  function value () {
    return currentRandom();
  }

  function valueNonZero () {
    var u = 0;
    while (u === 0) u = value();
    return u;
  }

  function getSeed () {
    return currentSeed;
  }

  function getRandomSeed () {
    var seed = String(Math.floor(Math.random() * 1000000));
    return seed;
  }

  function createNoise () {
    return new SimplexNoise(currentRandom);
  }

  function permuteNoise () {
    noiseGenerator = createNoise();
  }

  function noise1D (x, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, 0);
  }

  function noise2D (x, y, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, y * frequency);
  }

  function noise3D (x, y, z, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise3D(
      x * frequency,
      y * frequency,
      z * frequency
    );
  }

  function noise4D (x, y, z, w, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    if (!isFinite(w)) throw new TypeError('w component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise4D(
      x * frequency,
      y * frequency,
      z * frequency,
      w * frequency
    );
  }

  function sign () {
    return boolean() ? 1 : -1;
  }

  function boolean () {
    return value() > 0.5;
  }

  function chance (n) {
    n = defined(n, 0.5);
    if (typeof n !== 'number') throw new TypeError('expected n to be a number');
    return value() < n;
  }

  function range (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return value() * (max - min) + min;
  }

  function rangeFloor (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return Math.floor(range(min, max));
  }

  function pick (array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  function shuffle (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('Expected Array, got ' + typeof arr);
    }

    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();
    while (len) {
      rand = Math.floor(value() * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }
    return ret;
  }

  function onCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var theta = value() * 2.0 * Math.PI;
    out[0] = radius * Math.cos(theta);
    out[1] = radius * Math.sin(theta);
    return out;
  }

  function insideCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    onCircle(1, out);
    var r = radius * Math.sqrt(value());
    out[0] *= r;
    out[1] *= r;
    return out;
  }

  function onSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var phi = u;
    var theta = Math.acos(v);
    out[0] = radius * Math.sin(theta) * Math.cos(phi);
    out[1] = radius * Math.sin(theta) * Math.sin(phi);
    out[2] = radius * Math.cos(theta);
    return out;
  }

  function insideSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var k = value();

    var phi = u;
    var theta = Math.acos(v);
    var r = radius * Math.cbrt(k);
    out[0] = r * Math.sin(theta) * Math.cos(phi);
    out[1] = r * Math.sin(theta) * Math.sin(phi);
    out[2] = r * Math.cos(theta);
    return out;
  }

  function quaternion (out) {
    out = out || [];
    var u1 = value();
    var u2 = value();
    var u3 = value();

    var sq1 = Math.sqrt(1 - u1);
    var sq2 = Math.sqrt(u1);

    var theta1 = Math.PI * 2 * u2;
    var theta2 = Math.PI * 2 * u3;

    var x = Math.sin(theta1) * sq1;
    var y = Math.cos(theta1) * sq1;
    var z = Math.sin(theta2) * sq2;
    var w = Math.cos(theta2) * sq2;
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  function weightedSet (set) {
    set = set || [];
    if (set.length === 0) return null;
    return set[weightedSetIndex(set)].value;
  }

  function weightedSetIndex (set) {
    set = set || [];
    if (set.length === 0) return -1;
    return weighted(set.map(function (s) {
      return s.weight;
    }));
  }

  function weighted (weights) {
    weights = weights || [];
    if (weights.length === 0) return -1;
    var totalWeight = 0;
    var i;

    for (i = 0; i < weights.length; i++) {
      totalWeight += weights[i];
    }

    if (totalWeight <= 0) throw new Error('Weights must sum to > 0');

    var random = value() * totalWeight;
    for (i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i;
      }
      random -= weights[i];
    }
    return 0;
  }

  function gaussian (mean, standardDerivation) {
    mean = defined(mean, 0);
    standardDerivation = defined(standardDerivation, 1);

    // https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/classes/java/util/Random.java#L496
    if (_hasNextGaussian) {
      _hasNextGaussian = false;
      var result = _nextGaussian;
      _nextGaussian = null;
      return mean + standardDerivation * result;
    } else {
      var v1 = 0;
      var v2 = 0;
      var s = 0;
      do {
        v1 = value() * 2 - 1; // between -1 and 1
        v2 = value() * 2 - 1; // between -1 and 1
        s = v1 * v1 + v2 * v2;
      } while (s >= 1 || s === 0);
      var multiplier = Math.sqrt(-2 * Math.log(s) / s);
      _nextGaussian = (v2 * multiplier);
      _hasNextGaussian = true;
      return mean + standardDerivation * (v1 * multiplier);
    }
  }
}

module.exports = createRandom();

},{"seed-random":"node_modules/seed-random/index.js","simplex-noise":"node_modules/simplex-noise/simplex-noise.js","defined":"node_modules/defined/index.js"}],"node_modules/canvas-sketch-util/lib/wrap.js":[function(require,module,exports) {
module.exports = wrap;
function wrap (value, from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new TypeError('Must specify "to" and "from" arguments as numbers');
  }
  // algorithm from http://stackoverflow.com/a/5852628/599884
  if (from > to) {
    var t = from;
    from = to;
    to = t;
  }
  var cycle = to - from;
  if (cycle === 0) {
    return to;
  }
  return value - cycle * Math.floor((value - from) / cycle);
}

},{}],"node_modules/canvas-sketch-util/math.js":[function(require,module,exports) {
var defined = require('defined');
var wrap = require('./lib/wrap');
var EPSILON = Number.EPSILON;

function clamp (value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
}

function clamp01 (v) {
  return clamp(v, 0, 1);
}

function lerp (min, max, t) {
  return min * (1 - t) + max * t;
}

function inverseLerp (min, max, t) {
  if (Math.abs(min - max) < EPSILON) return 0;
  else return (t - min) / (max - min);
}

function smoothstep (min, max, t) {
  var x = clamp(inverseLerp(min, max, t), 0, 1);
  return x * x * (3 - 2 * x);
}

function toFinite (n, defaultValue) {
  defaultValue = defined(defaultValue, 0);
  return typeof n === 'number' && isFinite(n) ? n : defaultValue;
}

function expandVector (dims) {
  if (typeof dims !== 'number') throw new TypeError('Expected dims argument');
  return function (p, defaultValue) {
    defaultValue = defined(defaultValue, 0);
    var scalar;
    if (p == null) {
      // No vector, create a default one
      scalar = defaultValue;
    } else if (typeof p === 'number' && isFinite(p)) {
      // Expand single channel to multiple vector
      scalar = p;
    }

    var out = [];
    var i;
    if (scalar == null) {
      for (i = 0; i < dims; i++) {
        out[i] = toFinite(p[i], defaultValue);
      }
    } else {
      for (i = 0; i < dims; i++) {
        out[i] = scalar;
      }
    }
    return out;
  };
}

function lerpArray (min, max, t, out) {
  out = out || [];
  if (min.length !== max.length) {
    throw new TypeError('min and max array are expected to have the same length');
  }
  for (var i = 0; i < min.length; i++) {
    out[i] = lerp(min[i], max[i], t);
  }
  return out;
}

function newArray (n, initialValue) {
  n = defined(n, 0);
  if (typeof n !== 'number') throw new TypeError('Expected n argument to be a number');
  var out = [];
  for (var i = 0; i < n; i++) out.push(initialValue);
  return out;
}

function linspace (n, opts) {
  n = defined(n, 0);
  if (typeof n !== 'number') throw new TypeError('Expected n argument to be a number');
  opts = opts || {};
  if (typeof opts === 'boolean') {
    opts = { endpoint: true };
  }
  var offset = defined(opts.offset, 0);
  if (opts.endpoint) {
    return newArray(n).map(function (_, i) {
      return n <= 1 ? 0 : ((i + offset) / (n - 1));
    });
  } else {
    return newArray(n).map(function (_, i) {
      return (i + offset) / n;
    });
  }
}

function lerpFrames (values, t, out) {
  t = clamp(t, 0, 1);

  var len = values.length - 1;
  var whole = t * len;
  var frame = Math.floor(whole);
  var fract = whole - frame;

  var nextFrame = Math.min(frame + 1, len);
  var a = values[frame % values.length];
  var b = values[nextFrame % values.length];
  if (typeof a === 'number' && typeof b === 'number') {
    return lerp(a, b, fract);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return lerpArray(a, b, fract, out);
  } else {
    throw new TypeError('Mismatch in value type of two array elements: ' + frame + ' and ' + nextFrame);
  }
}

function mod (a, b) {
  return ((a % b) + b) % b;
}

function degToRad (n) {
  return n * Math.PI / 180;
}

function radToDeg (n) {
  return n * 180 / Math.PI;
}

function fract (n) {
  return n - Math.floor(n);
}

function sign (n) {
  if (n > 0) return 1;
  else if (n < 0) return -1;
  else return 0;
}

// Specific function from Unity / ofMath, not sure its needed?
// function lerpWrap (a, b, t, min, max) {
//   return wrap(a + wrap(b - a, min, max) * t, min, max)
// }

function pingPong (t, length) {
  t = mod(t, length * 2);
  return length - Math.abs(t - length);
}

function damp (a, b, lambda, dt) {
  return lerp(a, b, 1 - Math.exp(-lambda * dt));
}

function dampArray (a, b, lambda, dt, out) {
  out = out || [];
  for (var i = 0; i < a.length; i++) {
    out[i] = damp(a[i], b[i], lambda, dt);
  }
  return out;
}

function mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < EPSILON) {
    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

module.exports = {
  mod: mod,
  fract: fract,
  sign: sign,
  degToRad: degToRad,
  radToDeg: radToDeg,
  wrap: wrap,
  pingPong: pingPong,
  linspace: linspace,
  lerp: lerp,
  lerpArray: lerpArray,
  inverseLerp: inverseLerp,
  lerpFrames: lerpFrames,
  clamp: clamp,
  clamp01: clamp01,
  smoothstep: smoothstep,
  damp: damp,
  dampArray: dampArray,
  mapRange: mapRange,
  expand2D: expandVector(2),
  expand3D: expandVector(3),
  expand4D: expandVector(4)
};

},{"defined":"node_modules/defined/index.js","./lib/wrap":"node_modules/canvas-sketch-util/lib/wrap.js"}],"node_modules/colormap/colorScale.js":[function(require,module,exports) {
module.exports={
	"jet":[{"index":0,"rgb":[0,0,131]},{"index":0.125,"rgb":[0,60,170]},{"index":0.375,"rgb":[5,255,255]},{"index":0.625,"rgb":[255,255,0]},{"index":0.875,"rgb":[250,0,0]},{"index":1,"rgb":[128,0,0]}],

	"hsv":[{"index":0,"rgb":[255,0,0]},{"index":0.169,"rgb":[253,255,2]},{"index":0.173,"rgb":[247,255,2]},{"index":0.337,"rgb":[0,252,4]},{"index":0.341,"rgb":[0,252,10]},{"index":0.506,"rgb":[1,249,255]},{"index":0.671,"rgb":[2,0,253]},{"index":0.675,"rgb":[8,0,253]},{"index":0.839,"rgb":[255,0,251]},{"index":0.843,"rgb":[255,0,245]},{"index":1,"rgb":[255,0,6]}],

	"hot":[{"index":0,"rgb":[0,0,0]},{"index":0.3,"rgb":[230,0,0]},{"index":0.6,"rgb":[255,210,0]},{"index":1,"rgb":[255,255,255]}],

	"spring":[{"index":0,"rgb":[255,0,255]},{"index":1,"rgb":[255,255,0]}],

	"summer":[{"index":0,"rgb":[0,128,102]},{"index":1,"rgb":[255,255,102]}],

	"autumn":[{"index":0,"rgb":[255,0,0]},{"index":1,"rgb":[255,255,0]}],

	"winter":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[0,255,128]}],

	"bone":[{"index":0,"rgb":[0,0,0]},{"index":0.376,"rgb":[84,84,116]},{"index":0.753,"rgb":[169,200,200]},{"index":1,"rgb":[255,255,255]}],

	"copper":[{"index":0,"rgb":[0,0,0]},{"index":0.804,"rgb":[255,160,102]},{"index":1,"rgb":[255,199,127]}],

	"greys":[{"index":0,"rgb":[0,0,0]},{"index":1,"rgb":[255,255,255]}],

	"yignbu":[{"index":0,"rgb":[8,29,88]},{"index":0.125,"rgb":[37,52,148]},{"index":0.25,"rgb":[34,94,168]},{"index":0.375,"rgb":[29,145,192]},{"index":0.5,"rgb":[65,182,196]},{"index":0.625,"rgb":[127,205,187]},{"index":0.75,"rgb":[199,233,180]},{"index":0.875,"rgb":[237,248,217]},{"index":1,"rgb":[255,255,217]}],

	"greens":[{"index":0,"rgb":[0,68,27]},{"index":0.125,"rgb":[0,109,44]},{"index":0.25,"rgb":[35,139,69]},{"index":0.375,"rgb":[65,171,93]},{"index":0.5,"rgb":[116,196,118]},{"index":0.625,"rgb":[161,217,155]},{"index":0.75,"rgb":[199,233,192]},{"index":0.875,"rgb":[229,245,224]},{"index":1,"rgb":[247,252,245]}],

	"yiorrd":[{"index":0,"rgb":[128,0,38]},{"index":0.125,"rgb":[189,0,38]},{"index":0.25,"rgb":[227,26,28]},{"index":0.375,"rgb":[252,78,42]},{"index":0.5,"rgb":[253,141,60]},{"index":0.625,"rgb":[254,178,76]},{"index":0.75,"rgb":[254,217,118]},{"index":0.875,"rgb":[255,237,160]},{"index":1,"rgb":[255,255,204]}],

	"bluered":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[255,0,0]}],

	"rdbu":[{"index":0,"rgb":[5,10,172]},{"index":0.35,"rgb":[106,137,247]},{"index":0.5,"rgb":[190,190,190]},{"index":0.6,"rgb":[220,170,132]},{"index":0.7,"rgb":[230,145,90]},{"index":1,"rgb":[178,10,28]}],

	"picnic":[{"index":0,"rgb":[0,0,255]},{"index":0.1,"rgb":[51,153,255]},{"index":0.2,"rgb":[102,204,255]},{"index":0.3,"rgb":[153,204,255]},{"index":0.4,"rgb":[204,204,255]},{"index":0.5,"rgb":[255,255,255]},{"index":0.6,"rgb":[255,204,255]},{"index":0.7,"rgb":[255,153,255]},{"index":0.8,"rgb":[255,102,204]},{"index":0.9,"rgb":[255,102,102]},{"index":1,"rgb":[255,0,0]}],

	"rainbow":[{"index":0,"rgb":[150,0,90]},{"index":0.125,"rgb":[0,0,200]},{"index":0.25,"rgb":[0,25,255]},{"index":0.375,"rgb":[0,152,255]},{"index":0.5,"rgb":[44,255,150]},{"index":0.625,"rgb":[151,255,0]},{"index":0.75,"rgb":[255,234,0]},{"index":0.875,"rgb":[255,111,0]},{"index":1,"rgb":[255,0,0]}],

	"portland":[{"index":0,"rgb":[12,51,131]},{"index":0.25,"rgb":[10,136,186]},{"index":0.5,"rgb":[242,211,56]},{"index":0.75,"rgb":[242,143,56]},{"index":1,"rgb":[217,30,30]}],

	"blackbody":[{"index":0,"rgb":[0,0,0]},{"index":0.2,"rgb":[230,0,0]},{"index":0.4,"rgb":[230,210,0]},{"index":0.7,"rgb":[255,255,255]},{"index":1,"rgb":[160,200,255]}],

	"earth":[{"index":0,"rgb":[0,0,130]},{"index":0.1,"rgb":[0,180,180]},{"index":0.2,"rgb":[40,210,40]},{"index":0.4,"rgb":[230,230,50]},{"index":0.6,"rgb":[120,70,20]},{"index":1,"rgb":[255,255,255]}],

	"electric":[{"index":0,"rgb":[0,0,0]},{"index":0.15,"rgb":[30,0,100]},{"index":0.4,"rgb":[120,0,100]},{"index":0.6,"rgb":[160,90,0]},{"index":0.8,"rgb":[230,200,0]},{"index":1,"rgb":[255,250,220]}],

	"alpha": [{"index":0, "rgb": [255,255,255,0]},{"index":1, "rgb": [255,255,255,1]}],

	"viridis": [{"index":0,"rgb":[68,1,84]},{"index":0.13,"rgb":[71,44,122]},{"index":0.25,"rgb":[59,81,139]},{"index":0.38,"rgb":[44,113,142]},{"index":0.5,"rgb":[33,144,141]},{"index":0.63,"rgb":[39,173,129]},{"index":0.75,"rgb":[92,200,99]},{"index":0.88,"rgb":[170,220,50]},{"index":1,"rgb":[253,231,37]}],

	"inferno": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[31,12,72]},{"index":0.25,"rgb":[85,15,109]},{"index":0.38,"rgb":[136,34,106]},{"index":0.5,"rgb":[186,54,85]},{"index":0.63,"rgb":[227,89,51]},{"index":0.75,"rgb":[249,140,10]},{"index":0.88,"rgb":[249,201,50]},{"index":1,"rgb":[252,255,164]}],

	"magma": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[28,16,68]},{"index":0.25,"rgb":[79,18,123]},{"index":0.38,"rgb":[129,37,129]},{"index":0.5,"rgb":[181,54,122]},{"index":0.63,"rgb":[229,80,100]},{"index":0.75,"rgb":[251,135,97]},{"index":0.88,"rgb":[254,194,135]},{"index":1,"rgb":[252,253,191]}],

	"plasma": [{"index":0,"rgb":[13,8,135]},{"index":0.13,"rgb":[75,3,161]},{"index":0.25,"rgb":[125,3,168]},{"index":0.38,"rgb":[168,34,150]},{"index":0.5,"rgb":[203,70,121]},{"index":0.63,"rgb":[229,107,93]},{"index":0.75,"rgb":[248,148,65]},{"index":0.88,"rgb":[253,195,40]},{"index":1,"rgb":[240,249,33]}],

	"warm": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[172,0,187]},{"index":0.25,"rgb":[219,0,170]},{"index":0.38,"rgb":[255,0,130]},{"index":0.5,"rgb":[255,63,74]},{"index":0.63,"rgb":[255,123,0]},{"index":0.75,"rgb":[234,176,0]},{"index":0.88,"rgb":[190,228,0]},{"index":1,"rgb":[147,255,0]}],

	"cool": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[116,0,218]},{"index":0.25,"rgb":[98,74,237]},{"index":0.38,"rgb":[68,146,231]},{"index":0.5,"rgb":[0,204,197]},{"index":0.63,"rgb":[0,247,146]},{"index":0.75,"rgb":[0,255,88]},{"index":0.88,"rgb":[40,255,8]},{"index":1,"rgb":[147,255,0]}],

	"rainbow-soft": [{"index":0,"rgb":[125,0,179]},{"index":0.1,"rgb":[199,0,180]},{"index":0.2,"rgb":[255,0,121]},{"index":0.3,"rgb":[255,108,0]},{"index":0.4,"rgb":[222,194,0]},{"index":0.5,"rgb":[150,255,0]},{"index":0.6,"rgb":[0,255,55]},{"index":0.7,"rgb":[0,246,150]},{"index":0.8,"rgb":[50,167,222]},{"index":0.9,"rgb":[103,51,235]},{"index":1,"rgb":[124,0,186]}],

	"bathymetry": [{"index":0,"rgb":[40,26,44]},{"index":0.13,"rgb":[59,49,90]},{"index":0.25,"rgb":[64,76,139]},{"index":0.38,"rgb":[63,110,151]},{"index":0.5,"rgb":[72,142,158]},{"index":0.63,"rgb":[85,174,163]},{"index":0.75,"rgb":[120,206,163]},{"index":0.88,"rgb":[187,230,172]},{"index":1,"rgb":[253,254,204]}],

	"cdom": [{"index":0,"rgb":[47,15,62]},{"index":0.13,"rgb":[87,23,86]},{"index":0.25,"rgb":[130,28,99]},{"index":0.38,"rgb":[171,41,96]},{"index":0.5,"rgb":[206,67,86]},{"index":0.63,"rgb":[230,106,84]},{"index":0.75,"rgb":[242,149,103]},{"index":0.88,"rgb":[249,193,135]},{"index":1,"rgb":[254,237,176]}],

	"chlorophyll": [{"index":0,"rgb":[18,36,20]},{"index":0.13,"rgb":[25,63,41]},{"index":0.25,"rgb":[24,91,59]},{"index":0.38,"rgb":[13,119,72]},{"index":0.5,"rgb":[18,148,80]},{"index":0.63,"rgb":[80,173,89]},{"index":0.75,"rgb":[132,196,122]},{"index":0.88,"rgb":[175,221,162]},{"index":1,"rgb":[215,249,208]}],

	"density": [{"index":0,"rgb":[54,14,36]},{"index":0.13,"rgb":[89,23,80]},{"index":0.25,"rgb":[110,45,132]},{"index":0.38,"rgb":[120,77,178]},{"index":0.5,"rgb":[120,113,213]},{"index":0.63,"rgb":[115,151,228]},{"index":0.75,"rgb":[134,185,227]},{"index":0.88,"rgb":[177,214,227]},{"index":1,"rgb":[230,241,241]}],

	"freesurface-blue": [{"index":0,"rgb":[30,4,110]},{"index":0.13,"rgb":[47,14,176]},{"index":0.25,"rgb":[41,45,236]},{"index":0.38,"rgb":[25,99,212]},{"index":0.5,"rgb":[68,131,200]},{"index":0.63,"rgb":[114,156,197]},{"index":0.75,"rgb":[157,181,203]},{"index":0.88,"rgb":[200,208,216]},{"index":1,"rgb":[241,237,236]}],

	"freesurface-red": [{"index":0,"rgb":[60,9,18]},{"index":0.13,"rgb":[100,17,27]},{"index":0.25,"rgb":[142,20,29]},{"index":0.38,"rgb":[177,43,27]},{"index":0.5,"rgb":[192,87,63]},{"index":0.63,"rgb":[205,125,105]},{"index":0.75,"rgb":[216,162,148]},{"index":0.88,"rgb":[227,199,193]},{"index":1,"rgb":[241,237,236]}],

	"oxygen": [{"index":0,"rgb":[64,5,5]},{"index":0.13,"rgb":[106,6,15]},{"index":0.25,"rgb":[144,26,7]},{"index":0.38,"rgb":[168,64,3]},{"index":0.5,"rgb":[188,100,4]},{"index":0.63,"rgb":[206,136,11]},{"index":0.75,"rgb":[220,174,25]},{"index":0.88,"rgb":[231,215,44]},{"index":1,"rgb":[248,254,105]}],

	"par": [{"index":0,"rgb":[51,20,24]},{"index":0.13,"rgb":[90,32,35]},{"index":0.25,"rgb":[129,44,34]},{"index":0.38,"rgb":[159,68,25]},{"index":0.5,"rgb":[182,99,19]},{"index":0.63,"rgb":[199,134,22]},{"index":0.75,"rgb":[212,171,35]},{"index":0.88,"rgb":[221,210,54]},{"index":1,"rgb":[225,253,75]}],

	"phase": [{"index":0,"rgb":[145,105,18]},{"index":0.13,"rgb":[184,71,38]},{"index":0.25,"rgb":[186,58,115]},{"index":0.38,"rgb":[160,71,185]},{"index":0.5,"rgb":[110,97,218]},{"index":0.63,"rgb":[50,123,164]},{"index":0.75,"rgb":[31,131,110]},{"index":0.88,"rgb":[77,129,34]},{"index":1,"rgb":[145,105,18]}],

	"salinity": [{"index":0,"rgb":[42,24,108]},{"index":0.13,"rgb":[33,50,162]},{"index":0.25,"rgb":[15,90,145]},{"index":0.38,"rgb":[40,118,137]},{"index":0.5,"rgb":[59,146,135]},{"index":0.63,"rgb":[79,175,126]},{"index":0.75,"rgb":[120,203,104]},{"index":0.88,"rgb":[193,221,100]},{"index":1,"rgb":[253,239,154]}],

	"temperature": [{"index":0,"rgb":[4,35,51]},{"index":0.13,"rgb":[23,51,122]},{"index":0.25,"rgb":[85,59,157]},{"index":0.38,"rgb":[129,79,143]},{"index":0.5,"rgb":[175,95,130]},{"index":0.63,"rgb":[222,112,101]},{"index":0.75,"rgb":[249,146,66]},{"index":0.88,"rgb":[249,196,65]},{"index":1,"rgb":[232,250,91]}],

	"turbidity": [{"index":0,"rgb":[34,31,27]},{"index":0.13,"rgb":[65,50,41]},{"index":0.25,"rgb":[98,69,52]},{"index":0.38,"rgb":[131,89,57]},{"index":0.5,"rgb":[161,112,59]},{"index":0.63,"rgb":[185,140,66]},{"index":0.75,"rgb":[202,174,88]},{"index":0.88,"rgb":[216,209,126]},{"index":1,"rgb":[233,246,171]}],

	"velocity-blue": [{"index":0,"rgb":[17,32,64]},{"index":0.13,"rgb":[35,52,116]},{"index":0.25,"rgb":[29,81,156]},{"index":0.38,"rgb":[31,113,162]},{"index":0.5,"rgb":[50,144,169]},{"index":0.63,"rgb":[87,173,176]},{"index":0.75,"rgb":[149,196,189]},{"index":0.88,"rgb":[203,221,211]},{"index":1,"rgb":[254,251,230]}],

	"velocity-green": [{"index":0,"rgb":[23,35,19]},{"index":0.13,"rgb":[24,64,38]},{"index":0.25,"rgb":[11,95,45]},{"index":0.38,"rgb":[39,123,35]},{"index":0.5,"rgb":[95,146,12]},{"index":0.63,"rgb":[152,165,18]},{"index":0.75,"rgb":[201,186,69]},{"index":0.88,"rgb":[233,216,137]},{"index":1,"rgb":[255,253,205]}],

	"cubehelix": [{"index":0,"rgb":[0,0,0]},{"index":0.07,"rgb":[22,5,59]},{"index":0.13,"rgb":[60,4,105]},{"index":0.2,"rgb":[109,1,135]},{"index":0.27,"rgb":[161,0,147]},{"index":0.33,"rgb":[210,2,142]},{"index":0.4,"rgb":[251,11,123]},{"index":0.47,"rgb":[255,29,97]},{"index":0.53,"rgb":[255,54,69]},{"index":0.6,"rgb":[255,85,46]},{"index":0.67,"rgb":[255,120,34]},{"index":0.73,"rgb":[255,157,37]},{"index":0.8,"rgb":[241,191,57]},{"index":0.87,"rgb":[224,220,93]},{"index":0.93,"rgb":[218,241,142]},{"index":1,"rgb":[227,253,198]}]
};

},{}],"node_modules/lerp/index.js":[function(require,module,exports) {
function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
module.exports = lerp
},{}],"node_modules/colormap/index.js":[function(require,module,exports) {
/*
 * Ben Postlethwaite
 * January 2013
 * License MIT
 */
'use strict';

var colorScale = require('./colorScale');
var lerp = require('lerp')

module.exports = createColormap;

function createColormap (spec) {
    /*
     * Default Options
     */
    var indicies, fromrgba, torgba,
        nsteps, cmap, colormap, format,
        nshades, colors, alpha, i;

    if ( !spec ) spec = {};

    nshades = (spec.nshades || 72) - 1;
    format = spec.format || 'hex';

    colormap = spec.colormap;
    if (!colormap) colormap = 'jet';

    if (typeof colormap === 'string') {
        colormap = colormap.toLowerCase();

        if (!colorScale[colormap]) {
            throw Error(colormap + ' not a supported colorscale');
        }

        cmap = colorScale[colormap];

    } else if (Array.isArray(colormap)) {
        cmap = colormap.slice();

    } else {
        throw Error('unsupported colormap option', colormap);
    }

    if (cmap.length > nshades + 1) {
        throw new Error(
            colormap+' map requires nshades to be at least size '+cmap.length
        );
    }

    if (!Array.isArray(spec.alpha)) {

        if (typeof spec.alpha === 'number') {
            alpha = [spec.alpha, spec.alpha];

        } else {
            alpha = [1, 1];
        }

    } else if (spec.alpha.length !== 2) {
        alpha = [1, 1];

    } else {
        alpha = spec.alpha.slice();
    }

    // map index points from 0..1 to 0..n-1
    indicies = cmap.map(function(c) {
        return Math.round(c.index * nshades);
    });

    // Add alpha channel to the map
    alpha[0] = Math.min(Math.max(alpha[0], 0), 1);
    alpha[1] = Math.min(Math.max(alpha[1], 0), 1);

    var steps = cmap.map(function(c, i) {
        var index = cmap[i].index

        var rgba = cmap[i].rgb.slice();

        // if user supplies their own map use it
        if (rgba.length === 4 && rgba[3] >= 0 && rgba[3] <= 1) {
            return rgba
        }
        rgba[3] = alpha[0] + (alpha[1] - alpha[0])*index;

        return rgba
    })


    /*
     * map increasing linear values between indicies to
     * linear steps in colorvalues
     */
    var colors = []
    for (i = 0; i < indicies.length-1; ++i) {
        nsteps = indicies[i+1] - indicies[i];
        fromrgba = steps[i];
        torgba = steps[i+1];

        for (var j = 0; j < nsteps; j++) {
            var amt = j / nsteps
            colors.push([
                Math.round(lerp(fromrgba[0], torgba[0], amt)),
                Math.round(lerp(fromrgba[1], torgba[1], amt)),
                Math.round(lerp(fromrgba[2], torgba[2], amt)),
                lerp(fromrgba[3], torgba[3], amt)
            ])
        }
    }

    //add 1 step as last value
    colors.push(cmap[cmap.length - 1].rgb.concat(alpha[1]))

    if (format === 'hex') colors = colors.map( rgb2hex );
    else if (format === 'rgbaString') colors = colors.map( rgbaStr );
    else if (format === 'float') colors = colors.map( rgb2float );

    return colors;
};

function rgb2float (rgba) {
    return [
        rgba[0] / 255,
        rgba[1] / 255,
        rgba[2] / 255,
        rgba[3]
    ]
}

function rgb2hex (rgba) {
    var dig, hex = '#';
    for (var i = 0; i < 3; ++i) {
        dig = rgba[i];
        dig = dig.toString(16);
        hex += ('00' + dig).substr( dig.length );
    }
    return hex;
}

function rgbaStr (rgba) {
    return 'rgba(' + rgba.join(',') + ')';
}

},{"./colorScale":"node_modules/colormap/colorScale.js","lerp":"node_modules/lerp/index.js"}],"node_modules/tweakpane/dist/tweakpane.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/*! Tweakpane 3.1.2 (c) 2016 cocopon, licensed under the MIT license. */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tweakpane = {}));
})(this, (function (exports) { 'use strict';

    /***
     * A simple semantic versioning perser.
     */
    class Semver {
        /**
         * @hidden
         */
        constructor(text) {
            const [core, prerelease] = text.split('-');
            const coreComps = core.split('.');
            this.major = parseInt(coreComps[0], 10);
            this.minor = parseInt(coreComps[1], 10);
            this.patch = parseInt(coreComps[2], 10);
            this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
        }
        toString() {
            const core = [this.major, this.minor, this.patch].join('.');
            return this.prerelease !== null ? [core, this.prerelease].join('-') : core;
        }
    }

    class BladeApi {
        constructor(controller) {
            this.controller_ = controller;
        }
        get element() {
            return this.controller_.view.element;
        }
        get disabled() {
            return this.controller_.viewProps.get('disabled');
        }
        set disabled(disabled) {
            this.controller_.viewProps.set('disabled', disabled);
        }
        get hidden() {
            return this.controller_.viewProps.get('hidden');
        }
        set hidden(hidden) {
            this.controller_.viewProps.set('hidden', hidden);
        }
        dispose() {
            this.controller_.viewProps.set('disposed', true);
        }
    }

    class TpEvent {
        constructor(target) {
            this.target = target;
        }
    }
    class TpChangeEvent extends TpEvent {
        constructor(target, value, presetKey, last) {
            super(target);
            this.value = value;
            this.presetKey = presetKey;
            this.last = last !== null && last !== void 0 ? last : true;
        }
    }
    class TpUpdateEvent extends TpEvent {
        constructor(target, value, presetKey) {
            super(target);
            this.value = value;
            this.presetKey = presetKey;
        }
    }
    class TpFoldEvent extends TpEvent {
        constructor(target, expanded) {
            super(target);
            this.expanded = expanded;
        }
    }
    class TpTabSelectEvent extends TpEvent {
        constructor(target, index) {
            super(target);
            this.index = index;
        }
    }

    function forceCast(v) {
        return v;
    }
    function isEmpty(value) {
        return value === null || value === undefined;
    }
    function deepEqualsArray(a1, a2) {
        if (a1.length !== a2.length) {
            return false;
        }
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }

    const CREATE_MESSAGE_MAP = {
        alreadydisposed: () => 'View has been already disposed',
        invalidparams: (context) => `Invalid parameters for '${context.name}'`,
        nomatchingcontroller: (context) => `No matching controller for '${context.key}'`,
        nomatchingview: (context) => `No matching view for '${JSON.stringify(context.params)}'`,
        notbindable: () => `Value is not bindable`,
        propertynotfound: (context) => `Property '${context.name}' not found`,
        shouldneverhappen: () => 'This error should never happen',
    };
    class TpError {
        constructor(config) {
            var _a;
            this.message =
                (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : 'Unexpected error';
            this.name = this.constructor.name;
            this.stack = new Error(this.message).stack;
            this.type = config.type;
        }
        static alreadyDisposed() {
            return new TpError({ type: 'alreadydisposed' });
        }
        static notBindable() {
            return new TpError({
                type: 'notbindable',
            });
        }
        static propertyNotFound(name) {
            return new TpError({
                type: 'propertynotfound',
                context: {
                    name: name,
                },
            });
        }
        static shouldNeverHappen() {
            return new TpError({ type: 'shouldneverhappen' });
        }
    }

    class BindingTarget {
        constructor(obj, key, opt_id) {
            this.obj_ = obj;
            this.key_ = key;
            this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
        }
        static isBindable(obj) {
            if (obj === null) {
                return false;
            }
            if (typeof obj !== 'object') {
                return false;
            }
            return true;
        }
        get key() {
            return this.key_;
        }
        get presetKey() {
            return this.presetKey_;
        }
        read() {
            return this.obj_[this.key_];
        }
        write(value) {
            this.obj_[this.key_] = value;
        }
        writeProperty(name, value) {
            const valueObj = this.read();
            if (!BindingTarget.isBindable(valueObj)) {
                throw TpError.notBindable();
            }
            if (!(name in valueObj)) {
                throw TpError.propertyNotFound(name);
            }
            valueObj[name] = value;
        }
    }

    class ButtonApi extends BladeApi {
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        get title() {
            var _a;
            return (_a = this.controller_.valueController.props.get('title')) !== null && _a !== void 0 ? _a : '';
        }
        set title(title) {
            this.controller_.valueController.props.set('title', title);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            const emitter = this.controller_.valueController.emitter;
            emitter.on(eventName, () => {
                bh(new TpEvent(this));
            });
            return this;
        }
    }

    class Emitter {
        constructor() {
            this.observers_ = {};
        }
        on(eventName, handler) {
            let observers = this.observers_[eventName];
            if (!observers) {
                observers = this.observers_[eventName] = [];
            }
            observers.push({
                handler: handler,
            });
            return this;
        }
        off(eventName, handler) {
            const observers = this.observers_[eventName];
            if (observers) {
                this.observers_[eventName] = observers.filter((observer) => {
                    return observer.handler !== handler;
                });
            }
            return this;
        }
        emit(eventName, event) {
            const observers = this.observers_[eventName];
            if (!observers) {
                return;
            }
            observers.forEach((observer) => {
                observer.handler(event);
            });
        }
    }

    const PREFIX = 'tp';
    function ClassName(viewName) {
        const fn = (opt_elementName, opt_modifier) => {
            return [
                PREFIX,
                '-',
                viewName,
                'v',
                opt_elementName ? `_${opt_elementName}` : '',
                opt_modifier ? `-${opt_modifier}` : '',
            ].join('');
        };
        return fn;
    }

    function compose(h1, h2) {
        return (input) => h2(h1(input));
    }
    function extractValue(ev) {
        return ev.rawValue;
    }
    function bindValue(value, applyValue) {
        value.emitter.on('change', compose(extractValue, applyValue));
        applyValue(value.rawValue);
    }
    function bindValueMap(valueMap, key, applyValue) {
        bindValue(valueMap.value(key), applyValue);
    }

    function applyClass(elem, className, active) {
        if (active) {
            elem.classList.add(className);
        }
        else {
            elem.classList.remove(className);
        }
    }
    function valueToClassName(elem, className) {
        return (value) => {
            applyClass(elem, className, value);
        };
    }
    function bindValueToTextContent(value, elem) {
        bindValue(value, (text) => {
            elem.textContent = text !== null && text !== void 0 ? text : '';
        });
    }

    const className$q = ClassName('btn');
    class ButtonView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$q());
            config.viewProps.bindClassModifiers(this.element);
            const buttonElem = doc.createElement('button');
            buttonElem.classList.add(className$q('b'));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement('div');
            titleElem.classList.add(className$q('t'));
            bindValueToTextContent(config.props.value('title'), titleElem);
            this.buttonElement.appendChild(titleElem);
        }
    }

    class ButtonController {
        constructor(doc, config) {
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new ButtonView(doc, {
                props: this.props,
                viewProps: this.viewProps,
            });
            this.view.buttonElement.addEventListener('click', this.onClick_);
        }
        onClick_() {
            this.emitter.emit('click', {
                sender: this,
            });
        }
    }

    class BoundValue {
        constructor(initialValue, config) {
            var _a;
            this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
            this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : ((v1, v2) => v1 === v2);
            this.emitter = new Emitter();
            this.rawValue_ = initialValue;
        }
        get constraint() {
            return this.constraint_;
        }
        get rawValue() {
            return this.rawValue_;
        }
        set rawValue(rawValue) {
            this.setRawValue(rawValue, {
                forceEmit: false,
                last: true,
            });
        }
        setRawValue(rawValue, options) {
            const opts = options !== null && options !== void 0 ? options : {
                forceEmit: false,
                last: true,
            };
            const constrainedValue = this.constraint_
                ? this.constraint_.constrain(rawValue)
                : rawValue;
            const changed = !this.equals_(this.rawValue_, constrainedValue);
            if (!changed && !opts.forceEmit) {
                return;
            }
            this.emitter.emit('beforechange', {
                sender: this,
            });
            this.rawValue_ = constrainedValue;
            this.emitter.emit('change', {
                options: opts,
                rawValue: constrainedValue,
                sender: this,
            });
        }
    }

    class PrimitiveValue {
        constructor(initialValue) {
            this.emitter = new Emitter();
            this.value_ = initialValue;
        }
        get rawValue() {
            return this.value_;
        }
        set rawValue(value) {
            this.setRawValue(value, {
                forceEmit: false,
                last: true,
            });
        }
        setRawValue(value, options) {
            const opts = options !== null && options !== void 0 ? options : {
                forceEmit: false,
                last: true,
            };
            if (this.value_ === value && !opts.forceEmit) {
                return;
            }
            this.emitter.emit('beforechange', {
                sender: this,
            });
            this.value_ = value;
            this.emitter.emit('change', {
                options: opts,
                rawValue: this.value_,
                sender: this,
            });
        }
    }

    function createValue(initialValue, config) {
        const constraint = config === null || config === void 0 ? void 0 : config.constraint;
        const equals = config === null || config === void 0 ? void 0 : config.equals;
        if (!constraint && !equals) {
            return new PrimitiveValue(initialValue);
        }
        return new BoundValue(initialValue, config);
    }

    class ValueMap {
        constructor(valueMap) {
            this.emitter = new Emitter();
            this.valMap_ = valueMap;
            for (const key in this.valMap_) {
                const v = this.valMap_[key];
                v.emitter.on('change', () => {
                    this.emitter.emit('change', {
                        key: key,
                        sender: this,
                    });
                });
            }
        }
        static createCore(initialValue) {
            const keys = Object.keys(initialValue);
            return keys.reduce((o, key) => {
                return Object.assign(o, {
                    [key]: createValue(initialValue[key]),
                });
            }, {});
        }
        static fromObject(initialValue) {
            const core = this.createCore(initialValue);
            return new ValueMap(core);
        }
        get(key) {
            return this.valMap_[key].rawValue;
        }
        set(key, value) {
            this.valMap_[key].rawValue = value;
        }
        value(key) {
            return this.valMap_[key];
        }
    }

    function parseObject(value, keyToParserMap) {
        const keys = Object.keys(keyToParserMap);
        const result = keys.reduce((tmp, key) => {
            if (tmp === undefined) {
                return undefined;
            }
            const parser = keyToParserMap[key];
            const result = parser(value[key]);
            return result.succeeded
                ? Object.assign(Object.assign({}, tmp), { [key]: result.value }) : undefined;
        }, {});
        return forceCast(result);
    }
    function parseArray(value, parseItem) {
        return value.reduce((tmp, item) => {
            if (tmp === undefined) {
                return undefined;
            }
            const result = parseItem(item);
            if (!result.succeeded || result.value === undefined) {
                return undefined;
            }
            return [...tmp, result.value];
        }, []);
    }
    function isObject(value) {
        if (value === null) {
            return false;
        }
        return typeof value === 'object';
    }
    function createParamsParserBuilder(parse) {
        return (optional) => (v) => {
            if (!optional && v === undefined) {
                return {
                    succeeded: false,
                    value: undefined,
                };
            }
            if (optional && v === undefined) {
                return {
                    succeeded: true,
                    value: undefined,
                };
            }
            const result = parse(v);
            return result !== undefined
                ? {
                    succeeded: true,
                    value: result,
                }
                : {
                    succeeded: false,
                    value: undefined,
                };
        };
    }
    function createParamsParserBuilders(optional) {
        return {
            custom: (parse) => createParamsParserBuilder(parse)(optional),
            boolean: createParamsParserBuilder((v) => typeof v === 'boolean' ? v : undefined)(optional),
            number: createParamsParserBuilder((v) => typeof v === 'number' ? v : undefined)(optional),
            string: createParamsParserBuilder((v) => typeof v === 'string' ? v : undefined)(optional),
            function: createParamsParserBuilder((v) =>
            typeof v === 'function' ? v : undefined)(optional),
            constant: (value) => createParamsParserBuilder((v) => (v === value ? value : undefined))(optional),
            raw: createParamsParserBuilder((v) => v)(optional),
            object: (keyToParserMap) => createParamsParserBuilder((v) => {
                if (!isObject(v)) {
                    return undefined;
                }
                return parseObject(v, keyToParserMap);
            })(optional),
            array: (itemParser) => createParamsParserBuilder((v) => {
                if (!Array.isArray(v)) {
                    return undefined;
                }
                return parseArray(v, itemParser);
            })(optional),
        };
    }
    const ParamsParsers = {
        optional: createParamsParserBuilders(true),
        required: createParamsParserBuilders(false),
    };
    function parseParams(value, keyToParserMap) {
        const result = ParamsParsers.required.object(keyToParserMap)(value);
        return result.succeeded ? result.value : undefined;
    }

    function disposeElement(elem) {
        if (elem && elem.parentElement) {
            elem.parentElement.removeChild(elem);
        }
        return null;
    }

    function getAllBladePositions() {
        return ['veryfirst', 'first', 'last', 'verylast'];
    }

    const className$p = ClassName('');
    const POS_TO_CLASS_NAME_MAP = {
        veryfirst: 'vfst',
        first: 'fst',
        last: 'lst',
        verylast: 'vlst',
    };
    class BladeController {
        constructor(config) {
            this.parent_ = null;
            this.blade = config.blade;
            this.view = config.view;
            this.viewProps = config.viewProps;
            const elem = this.view.element;
            this.blade.value('positions').emitter.on('change', () => {
                getAllBladePositions().forEach((pos) => {
                    elem.classList.remove(className$p(undefined, POS_TO_CLASS_NAME_MAP[pos]));
                });
                this.blade.get('positions').forEach((pos) => {
                    elem.classList.add(className$p(undefined, POS_TO_CLASS_NAME_MAP[pos]));
                });
            });
            this.viewProps.handleDispose(() => {
                disposeElement(elem);
            });
        }
        get parent() {
            return this.parent_;
        }
    }

    const SVG_NS = 'http://www.w3.org/2000/svg';
    function forceReflow(element) {
        element.offsetHeight;
    }
    function disableTransitionTemporarily(element, callback) {
        const t = element.style.transition;
        element.style.transition = 'none';
        callback();
        element.style.transition = t;
    }
    function supportsTouch(doc) {
        return doc.ontouchstart !== undefined;
    }
    function getGlobalObject() {
        return globalThis;
    }
    function getWindowDocument() {
        const globalObj = forceCast(getGlobalObject());
        return globalObj.document;
    }
    function getCanvasContext(canvasElement) {
        const win = canvasElement.ownerDocument.defaultView;
        if (!win) {
            return null;
        }
        const isBrowser = 'document' in win;
        return isBrowser
            ? canvasElement.getContext('2d', {
                willReadFrequently: true,
            })
            : null;
    }
    const ICON_ID_TO_INNER_HTML_MAP = {
        check: '<path d="M2 8l4 4l8 -8"/>',
        dropdown: '<path d="M5 7h6l-3 3 z"/>',
        p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>',
    };
    function createSvgIconElement(document, iconId) {
        const elem = document.createElementNS(SVG_NS, 'svg');
        elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
        return elem;
    }
    function insertElementAt(parentElement, element, index) {
        parentElement.insertBefore(element, parentElement.children[index]);
    }
    function removeElement(element) {
        if (element.parentElement) {
            element.parentElement.removeChild(element);
        }
    }
    function removeChildElements(element) {
        while (element.children.length > 0) {
            element.removeChild(element.children[0]);
        }
    }
    function removeChildNodes(element) {
        while (element.childNodes.length > 0) {
            element.removeChild(element.childNodes[0]);
        }
    }
    function findNextTarget(ev) {
        if (ev.relatedTarget) {
            return forceCast(ev.relatedTarget);
        }
        if ('explicitOriginalTarget' in ev) {
            return ev.explicitOriginalTarget;
        }
        return null;
    }

    const className$o = ClassName('lbl');
    function createLabelNode(doc, label) {
        const frag = doc.createDocumentFragment();
        const lineNodes = label.split('\n').map((line) => {
            return doc.createTextNode(line);
        });
        lineNodes.forEach((lineNode, index) => {
            if (index > 0) {
                frag.appendChild(doc.createElement('br'));
            }
            frag.appendChild(lineNode);
        });
        return frag;
    }
    class LabelView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$o());
            config.viewProps.bindClassModifiers(this.element);
            const labelElem = doc.createElement('div');
            labelElem.classList.add(className$o('l'));
            bindValueMap(config.props, 'label', (value) => {
                if (isEmpty(value)) {
                    this.element.classList.add(className$o(undefined, 'nol'));
                }
                else {
                    this.element.classList.remove(className$o(undefined, 'nol'));
                    removeChildNodes(labelElem);
                    labelElem.appendChild(createLabelNode(doc, value));
                }
            });
            this.element.appendChild(labelElem);
            this.labelElement = labelElem;
            const valueElem = doc.createElement('div');
            valueElem.classList.add(className$o('v'));
            this.element.appendChild(valueElem);
            this.valueElement = valueElem;
        }
    }

    class LabelController extends BladeController {
        constructor(doc, config) {
            const viewProps = config.valueController.viewProps;
            super(Object.assign(Object.assign({}, config), { view: new LabelView(doc, {
                    props: config.props,
                    viewProps: viewProps,
                }), viewProps: viewProps }));
            this.props = config.props;
            this.valueController = config.valueController;
            this.view.valueElement.appendChild(this.valueController.view.element);
        }
    }

    const ButtonBladePlugin = {
        id: 'button',
        type: 'blade',
        accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
                title: p.required.string,
                view: p.required.constant('button'),
                label: p.optional.string,
            });
            return result ? { params: result } : null;
        },
        controller(args) {
            return new LabelController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                    label: args.params.label,
                }),
                valueController: new ButtonController(args.document, {
                    props: ValueMap.fromObject({
                        title: args.params.title,
                    }),
                    viewProps: args.viewProps,
                }),
            });
        },
        api(args) {
            if (!(args.controller instanceof LabelController)) {
                return null;
            }
            if (!(args.controller.valueController instanceof ButtonController)) {
                return null;
            }
            return new ButtonApi(args.controller);
        },
    };

    class ValueBladeController extends BladeController {
        constructor(config) {
            super(config);
            this.value = config.value;
        }
    }

    function createBlade() {
        return new ValueMap({
            positions: createValue([], {
                equals: deepEqualsArray,
            }),
        });
    }

    class Foldable extends ValueMap {
        constructor(valueMap) {
            super(valueMap);
        }
        static create(expanded) {
            const coreObj = {
                completed: true,
                expanded: expanded,
                expandedHeight: null,
                shouldFixHeight: false,
                temporaryExpanded: null,
            };
            const core = ValueMap.createCore(coreObj);
            return new Foldable(core);
        }
        get styleExpanded() {
            var _a;
            return (_a = this.get('temporaryExpanded')) !== null && _a !== void 0 ? _a : this.get('expanded');
        }
        get styleHeight() {
            if (!this.styleExpanded) {
                return '0';
            }
            const exHeight = this.get('expandedHeight');
            if (this.get('shouldFixHeight') && !isEmpty(exHeight)) {
                return `${exHeight}px`;
            }
            return 'auto';
        }
        bindExpandedClass(elem, expandedClassName) {
            const onExpand = () => {
                const expanded = this.styleExpanded;
                if (expanded) {
                    elem.classList.add(expandedClassName);
                }
                else {
                    elem.classList.remove(expandedClassName);
                }
            };
            bindValueMap(this, 'expanded', onExpand);
            bindValueMap(this, 'temporaryExpanded', onExpand);
        }
        cleanUpTransition() {
            this.set('shouldFixHeight', false);
            this.set('expandedHeight', null);
            this.set('completed', true);
        }
    }
    function computeExpandedFolderHeight(folder, containerElement) {
        let height = 0;
        disableTransitionTemporarily(containerElement, () => {
            folder.set('expandedHeight', null);
            folder.set('temporaryExpanded', true);
            forceReflow(containerElement);
            height = containerElement.clientHeight;
            folder.set('temporaryExpanded', null);
            forceReflow(containerElement);
        });
        return height;
    }
    function applyHeight(foldable, elem) {
        elem.style.height = foldable.styleHeight;
    }
    function bindFoldable(foldable, elem) {
        foldable.value('expanded').emitter.on('beforechange', () => {
            foldable.set('completed', false);
            if (isEmpty(foldable.get('expandedHeight'))) {
                foldable.set('expandedHeight', computeExpandedFolderHeight(foldable, elem));
            }
            foldable.set('shouldFixHeight', true);
            forceReflow(elem);
        });
        foldable.emitter.on('change', () => {
            applyHeight(foldable, elem);
        });
        applyHeight(foldable, elem);
        elem.addEventListener('transitionend', (ev) => {
            if (ev.propertyName !== 'height') {
                return;
            }
            foldable.cleanUpTransition();
        });
    }

    class RackLikeApi extends BladeApi {
        constructor(controller, rackApi) {
            super(controller);
            this.rackApi_ = rackApi;
        }
    }

    function addButtonAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: 'button' }));
    }
    function addFolderAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: 'folder' }));
    }
    function addSeparatorAsBlade(api, opt_params) {
        const params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
        return api.addBlade(Object.assign(Object.assign({}, params), { view: 'separator' }));
    }
    function addTabAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: 'tab' }));
    }

    class NestedOrderedSet {
        constructor(extract) {
            this.emitter = new Emitter();
            this.items_ = [];
            this.cache_ = new Set();
            this.onSubListAdd_ = this.onSubListAdd_.bind(this);
            this.onSubListRemove_ = this.onSubListRemove_.bind(this);
            this.extract_ = extract;
        }
        get items() {
            return this.items_;
        }
        allItems() {
            return Array.from(this.cache_);
        }
        find(callback) {
            for (const item of this.allItems()) {
                if (callback(item)) {
                    return item;
                }
            }
            return null;
        }
        includes(item) {
            return this.cache_.has(item);
        }
        add(item, opt_index) {
            if (this.includes(item)) {
                throw TpError.shouldNeverHappen();
            }
            const index = opt_index !== undefined ? opt_index : this.items_.length;
            this.items_.splice(index, 0, item);
            this.cache_.add(item);
            const subList = this.extract_(item);
            if (subList) {
                subList.emitter.on('add', this.onSubListAdd_);
                subList.emitter.on('remove', this.onSubListRemove_);
                subList.allItems().forEach((item) => {
                    this.cache_.add(item);
                });
            }
            this.emitter.emit('add', {
                index: index,
                item: item,
                root: this,
                target: this,
            });
        }
        remove(item) {
            const index = this.items_.indexOf(item);
            if (index < 0) {
                return;
            }
            this.items_.splice(index, 1);
            this.cache_.delete(item);
            const subList = this.extract_(item);
            if (subList) {
                subList.emitter.off('add', this.onSubListAdd_);
                subList.emitter.off('remove', this.onSubListRemove_);
            }
            this.emitter.emit('remove', {
                index: index,
                item: item,
                root: this,
                target: this,
            });
        }
        onSubListAdd_(ev) {
            this.cache_.add(ev.item);
            this.emitter.emit('add', {
                index: ev.index,
                item: ev.item,
                root: this,
                target: ev.target,
            });
        }
        onSubListRemove_(ev) {
            this.cache_.delete(ev.item);
            this.emitter.emit('remove', {
                index: ev.index,
                item: ev.item,
                root: this,
                target: ev.target,
            });
        }
    }

    class InputBindingApi extends BladeApi {
        constructor(controller) {
            super(controller);
            this.onBindingChange_ = this.onBindingChange_.bind(this);
            this.emitter_ = new Emitter();
            this.controller_.binding.emitter.on('change', this.onBindingChange_);
        }
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
        refresh() {
            this.controller_.binding.read();
        }
        onBindingChange_(ev) {
            const value = ev.sender.target.read();
            this.emitter_.emit('change', {
                event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey, ev.options.last),
            });
        }
    }

    class InputBindingController extends LabelController {
        constructor(doc, config) {
            super(doc, config);
            this.binding = config.binding;
        }
    }

    class MonitorBindingApi extends BladeApi {
        constructor(controller) {
            super(controller);
            this.onBindingUpdate_ = this.onBindingUpdate_.bind(this);
            this.emitter_ = new Emitter();
            this.controller_.binding.emitter.on('update', this.onBindingUpdate_);
        }
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
        refresh() {
            this.controller_.binding.read();
        }
        onBindingUpdate_(ev) {
            const value = ev.sender.target.read();
            this.emitter_.emit('update', {
                event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey),
            });
        }
    }

    class MonitorBindingController extends LabelController {
        constructor(doc, config) {
            super(doc, config);
            this.binding = config.binding;
            this.viewProps.bindDisabled(this.binding.ticker);
            this.viewProps.handleDispose(() => {
                this.binding.dispose();
            });
        }
    }

    function findSubBladeApiSet(api) {
        if (api instanceof RackApi) {
            return api['apiSet_'];
        }
        if (api instanceof RackLikeApi) {
            return api['rackApi_']['apiSet_'];
        }
        return null;
    }
    function getApiByController(apiSet, controller) {
        const api = apiSet.find((api) => api.controller_ === controller);
        if (!api) {
            throw TpError.shouldNeverHappen();
        }
        return api;
    }
    function createBindingTarget(obj, key, opt_id) {
        if (!BindingTarget.isBindable(obj)) {
            throw TpError.notBindable();
        }
        return new BindingTarget(obj, key, opt_id);
    }
    class RackApi extends BladeApi {
        constructor(controller, pool) {
            super(controller);
            this.onRackAdd_ = this.onRackAdd_.bind(this);
            this.onRackRemove_ = this.onRackRemove_.bind(this);
            this.onRackInputChange_ = this.onRackInputChange_.bind(this);
            this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this);
            this.emitter_ = new Emitter();
            this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
            this.pool_ = pool;
            const rack = this.controller_.rack;
            rack.emitter.on('add', this.onRackAdd_);
            rack.emitter.on('remove', this.onRackRemove_);
            rack.emitter.on('inputchange', this.onRackInputChange_);
            rack.emitter.on('monitorupdate', this.onRackMonitorUpdate_);
            rack.children.forEach((bc) => {
                this.setUpApi_(bc);
            });
        }
        get children() {
            return this.controller_.rack.children.map((bc) => getApiByController(this.apiSet_, bc));
        }
        addInput(object, key, opt_params) {
            const params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createInput(doc, createBindingTarget(object, key, params.presetKey), params);
            const api = new InputBindingApi(bc);
            return this.add(api, params.index);
        }
        addMonitor(object, key, opt_params) {
            const params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createMonitor(doc, createBindingTarget(object, key), params);
            const api = new MonitorBindingApi(bc);
            return forceCast(this.add(api, params.index));
        }
        addFolder(params) {
            return addFolderAsBlade(this, params);
        }
        addButton(params) {
            return addButtonAsBlade(this, params);
        }
        addSeparator(opt_params) {
            return addSeparatorAsBlade(this, opt_params);
        }
        addTab(params) {
            return addTabAsBlade(this, params);
        }
        add(api, opt_index) {
            this.controller_.rack.add(api.controller_, opt_index);
            const gapi = this.apiSet_.find((a) => a.controller_ === api.controller_);
            if (gapi) {
                this.apiSet_.remove(gapi);
            }
            this.apiSet_.add(api);
            return api;
        }
        remove(api) {
            this.controller_.rack.remove(api.controller_);
        }
        addBlade(params) {
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createBlade(doc, params);
            const api = this.pool_.createBladeApi(bc);
            return this.add(api, params.index);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
        setUpApi_(bc) {
            const api = this.apiSet_.find((api) => api.controller_ === bc);
            if (!api) {
                this.apiSet_.add(this.pool_.createBladeApi(bc));
            }
        }
        onRackAdd_(ev) {
            this.setUpApi_(ev.bladeController);
        }
        onRackRemove_(ev) {
            if (ev.isRoot) {
                const api = getApiByController(this.apiSet_, ev.bladeController);
                this.apiSet_.remove(api);
            }
        }
        onRackInputChange_(ev) {
            const bc = ev.bladeController;
            if (bc instanceof InputBindingController) {
                const api = getApiByController(this.apiSet_, bc);
                const binding = bc.binding;
                this.emitter_.emit('change', {
                    event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey, ev.options.last),
                });
            }
            else if (bc instanceof ValueBladeController) {
                const api = getApiByController(this.apiSet_, bc);
                this.emitter_.emit('change', {
                    event: new TpChangeEvent(api, bc.value.rawValue, undefined, ev.options.last),
                });
            }
        }
        onRackMonitorUpdate_(ev) {
            if (!(ev.bladeController instanceof MonitorBindingController)) {
                throw TpError.shouldNeverHappen();
            }
            const api = getApiByController(this.apiSet_, ev.bladeController);
            const binding = ev.bladeController.binding;
            this.emitter_.emit('update', {
                event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey),
            });
        }
    }

    class FolderApi extends RackLikeApi {
        constructor(controller, pool) {
            super(controller, new RackApi(controller.rackController, pool));
            this.emitter_ = new Emitter();
            this.controller_.foldable
                .value('expanded')
                .emitter.on('change', (ev) => {
                this.emitter_.emit('fold', {
                    event: new TpFoldEvent(this, ev.sender.rawValue),
                });
            });
            this.rackApi_.on('change', (ev) => {
                this.emitter_.emit('change', {
                    event: ev,
                });
            });
            this.rackApi_.on('update', (ev) => {
                this.emitter_.emit('update', {
                    event: ev,
                });
            });
        }
        get expanded() {
            return this.controller_.foldable.get('expanded');
        }
        set expanded(expanded) {
            this.controller_.foldable.set('expanded', expanded);
        }
        get title() {
            return this.controller_.props.get('title');
        }
        set title(title) {
            this.controller_.props.set('title', title);
        }
        get children() {
            return this.rackApi_.children;
        }
        addInput(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
        }
        addMonitor(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
        }
        addFolder(params) {
            return this.rackApi_.addFolder(params);
        }
        addButton(params) {
            return this.rackApi_.addButton(params);
        }
        addSeparator(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
        }
        addTab(params) {
            return this.rackApi_.addTab(params);
        }
        add(api, opt_index) {
            return this.rackApi_.add(api, opt_index);
        }
        remove(api) {
            this.rackApi_.remove(api);
        }
        addBlade(params) {
            return this.rackApi_.addBlade(params);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
    }

    class RackLikeController extends BladeController {
        constructor(config) {
            super({
                blade: config.blade,
                view: config.view,
                viewProps: config.rackController.viewProps,
            });
            this.rackController = config.rackController;
        }
    }

    class PlainView {
        constructor(doc, config) {
            const className = ClassName(config.viewName);
            this.element = doc.createElement('div');
            this.element.classList.add(className());
            config.viewProps.bindClassModifiers(this.element);
        }
    }

    function findInputBindingController(bcs, b) {
        for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof InputBindingController && bc.binding === b) {
                return bc;
            }
        }
        return null;
    }
    function findMonitorBindingController(bcs, b) {
        for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof MonitorBindingController && bc.binding === b) {
                return bc;
            }
        }
        return null;
    }
    function findValueBladeController(bcs, v) {
        for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof ValueBladeController && bc.value === v) {
                return bc;
            }
        }
        return null;
    }
    function findSubRack(bc) {
        if (bc instanceof RackController) {
            return bc.rack;
        }
        if (bc instanceof RackLikeController) {
            return bc.rackController.rack;
        }
        return null;
    }
    function findSubBladeControllerSet(bc) {
        const rack = findSubRack(bc);
        return rack ? rack['bcSet_'] : null;
    }
    class BladeRack {
        constructor(blade) {
            var _a;
            this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
            this.onSetAdd_ = this.onSetAdd_.bind(this);
            this.onSetRemove_ = this.onSetRemove_.bind(this);
            this.onChildDispose_ = this.onChildDispose_.bind(this);
            this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
            this.onChildInputChange_ = this.onChildInputChange_.bind(this);
            this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
            this.onChildValueChange_ = this.onChildValueChange_.bind(this);
            this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
            this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
            this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
            this.onDescendantMonitorUpdate_ =
                this.onDescendantMonitorUpdate_.bind(this);
            this.emitter = new Emitter();
            this.blade_ = blade !== null && blade !== void 0 ? blade : null;
            (_a = this.blade_) === null || _a === void 0 ? void 0 : _a.value('positions').emitter.on('change', this.onBladePositionsChange_);
            this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
            this.bcSet_.emitter.on('add', this.onSetAdd_);
            this.bcSet_.emitter.on('remove', this.onSetRemove_);
        }
        get children() {
            return this.bcSet_.items;
        }
        add(bc, opt_index) {
            if (bc.parent) {
                bc.parent.remove(bc);
            }
            bc['parent_'] = this;
            this.bcSet_.add(bc, opt_index);
        }
        remove(bc) {
            bc['parent_'] = null;
            this.bcSet_.remove(bc);
        }
        find(controllerClass) {
            return forceCast(this.bcSet_.allItems().filter((bc) => {
                return bc instanceof controllerClass;
            }));
        }
        onSetAdd_(ev) {
            this.updatePositions_();
            const isRoot = ev.target === ev.root;
            this.emitter.emit('add', {
                bladeController: ev.item,
                index: ev.index,
                isRoot: isRoot,
                sender: this,
            });
            if (!isRoot) {
                return;
            }
            const bc = ev.item;
            bc.viewProps.emitter.on('change', this.onChildViewPropsChange_);
            bc.blade
                .value('positions')
                .emitter.on('change', this.onChildPositionsChange_);
            bc.viewProps.handleDispose(this.onChildDispose_);
            if (bc instanceof InputBindingController) {
                bc.binding.emitter.on('change', this.onChildInputChange_);
            }
            else if (bc instanceof MonitorBindingController) {
                bc.binding.emitter.on('update', this.onChildMonitorUpdate_);
            }
            else if (bc instanceof ValueBladeController) {
                bc.value.emitter.on('change', this.onChildValueChange_);
            }
            else {
                const rack = findSubRack(bc);
                if (rack) {
                    const emitter = rack.emitter;
                    emitter.on('layout', this.onDescendantLayout_);
                    emitter.on('inputchange', this.onDescendantInputChange_);
                    emitter.on('monitorupdate', this.onDescendantMonitorUpdate_);
                }
            }
        }
        onSetRemove_(ev) {
            this.updatePositions_();
            const isRoot = ev.target === ev.root;
            this.emitter.emit('remove', {
                bladeController: ev.item,
                isRoot: isRoot,
                sender: this,
            });
            if (!isRoot) {
                return;
            }
            const bc = ev.item;
            if (bc instanceof InputBindingController) {
                bc.binding.emitter.off('change', this.onChildInputChange_);
            }
            else if (bc instanceof MonitorBindingController) {
                bc.binding.emitter.off('update', this.onChildMonitorUpdate_);
            }
            else if (bc instanceof ValueBladeController) {
                bc.value.emitter.off('change', this.onChildValueChange_);
            }
            else {
                const rack = findSubRack(bc);
                if (rack) {
                    const emitter = rack.emitter;
                    emitter.off('layout', this.onDescendantLayout_);
                    emitter.off('inputchange', this.onDescendantInputChange_);
                    emitter.off('monitorupdate', this.onDescendantMonitorUpdate_);
                }
            }
        }
        updatePositions_() {
            const visibleItems = this.bcSet_.items.filter((bc) => !bc.viewProps.get('hidden'));
            const firstVisibleItem = visibleItems[0];
            const lastVisibleItem = visibleItems[visibleItems.length - 1];
            this.bcSet_.items.forEach((bc) => {
                const ps = [];
                if (bc === firstVisibleItem) {
                    ps.push('first');
                    if (!this.blade_ ||
                        this.blade_.get('positions').includes('veryfirst')) {
                        ps.push('veryfirst');
                    }
                }
                if (bc === lastVisibleItem) {
                    ps.push('last');
                    if (!this.blade_ || this.blade_.get('positions').includes('verylast')) {
                        ps.push('verylast');
                    }
                }
                bc.blade.set('positions', ps);
            });
        }
        onChildPositionsChange_() {
            this.updatePositions_();
            this.emitter.emit('layout', {
                sender: this,
            });
        }
        onChildViewPropsChange_(_ev) {
            this.updatePositions_();
            this.emitter.emit('layout', {
                sender: this,
            });
        }
        onChildDispose_() {
            const disposedUcs = this.bcSet_.items.filter((bc) => {
                return bc.viewProps.get('disposed');
            });
            disposedUcs.forEach((bc) => {
                this.bcSet_.remove(bc);
            });
        }
        onChildInputChange_(ev) {
            const bc = findInputBindingController(this.find(InputBindingController), ev.sender);
            if (!bc) {
                throw TpError.alreadyDisposed();
            }
            this.emitter.emit('inputchange', {
                bladeController: bc,
                options: ev.options,
                sender: this,
            });
        }
        onChildMonitorUpdate_(ev) {
            const bc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
            if (!bc) {
                throw TpError.alreadyDisposed();
            }
            this.emitter.emit('monitorupdate', {
                bladeController: bc,
                sender: this,
            });
        }
        onChildValueChange_(ev) {
            const bc = findValueBladeController(this.find(ValueBladeController), ev.sender);
            if (!bc) {
                throw TpError.alreadyDisposed();
            }
            this.emitter.emit('inputchange', {
                bladeController: bc,
                options: ev.options,
                sender: this,
            });
        }
        onDescendantLayout_(_) {
            this.updatePositions_();
            this.emitter.emit('layout', {
                sender: this,
            });
        }
        onDescendantInputChange_(ev) {
            this.emitter.emit('inputchange', {
                bladeController: ev.bladeController,
                options: ev.options,
                sender: this,
            });
        }
        onDescendantMonitorUpdate_(ev) {
            this.emitter.emit('monitorupdate', {
                bladeController: ev.bladeController,
                sender: this,
            });
        }
        onBladePositionsChange_() {
            this.updatePositions_();
        }
    }

    class RackController extends BladeController {
        constructor(doc, config) {
            super(Object.assign(Object.assign({}, config), { view: new PlainView(doc, {
                    viewName: 'brk',
                    viewProps: config.viewProps,
                }) }));
            this.onRackAdd_ = this.onRackAdd_.bind(this);
            this.onRackRemove_ = this.onRackRemove_.bind(this);
            const rack = new BladeRack(config.root ? undefined : config.blade);
            rack.emitter.on('add', this.onRackAdd_);
            rack.emitter.on('remove', this.onRackRemove_);
            this.rack = rack;
            this.viewProps.handleDispose(() => {
                for (let i = this.rack.children.length - 1; i >= 0; i--) {
                    const bc = this.rack.children[i];
                    bc.viewProps.set('disposed', true);
                }
            });
        }
        onRackAdd_(ev) {
            if (!ev.isRoot) {
                return;
            }
            insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
        }
        onRackRemove_(ev) {
            if (!ev.isRoot) {
                return;
            }
            removeElement(ev.bladeController.view.element);
        }
    }

    const bladeContainerClassName = ClassName('cnt');

    class FolderView {
        constructor(doc, config) {
            var _a;
            this.className_ = ClassName((_a = config.viewName) !== null && _a !== void 0 ? _a : 'fld');
            this.element = doc.createElement('div');
            this.element.classList.add(this.className_(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            this.foldable_ = config.foldable;
            this.foldable_.bindExpandedClass(this.element, this.className_(undefined, 'expanded'));
            bindValueMap(this.foldable_, 'completed', valueToClassName(this.element, this.className_(undefined, 'cpl')));
            const buttonElem = doc.createElement('button');
            buttonElem.classList.add(this.className_('b'));
            bindValueMap(config.props, 'title', (title) => {
                if (isEmpty(title)) {
                    this.element.classList.add(this.className_(undefined, 'not'));
                }
                else {
                    this.element.classList.remove(this.className_(undefined, 'not'));
                }
            });
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement('div');
            titleElem.classList.add(this.className_('t'));
            bindValueToTextContent(config.props.value('title'), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
            const markElem = doc.createElement('div');
            markElem.classList.add(this.className_('m'));
            this.buttonElement.appendChild(markElem);
            const containerElem = config.containerElement;
            containerElem.classList.add(this.className_('c'));
            this.element.appendChild(containerElem);
            this.containerElement = containerElem;
        }
    }

    class FolderController extends RackLikeController {
        constructor(doc, config) {
            var _a;
            const foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
            const rc = new RackController(doc, {
                blade: config.blade,
                root: config.root,
                viewProps: config.viewProps,
            });
            super(Object.assign(Object.assign({}, config), { rackController: rc, view: new FolderView(doc, {
                    containerElement: rc.view.element,
                    foldable: foldable,
                    props: config.props,
                    viewName: config.root ? 'rot' : undefined,
                    viewProps: config.viewProps,
                }) }));
            this.onTitleClick_ = this.onTitleClick_.bind(this);
            this.props = config.props;
            this.foldable = foldable;
            bindFoldable(this.foldable, this.view.containerElement);
            this.rackController.rack.emitter.on('add', () => {
                this.foldable.cleanUpTransition();
            });
            this.rackController.rack.emitter.on('remove', () => {
                this.foldable.cleanUpTransition();
            });
            this.view.buttonElement.addEventListener('click', this.onTitleClick_);
        }
        get document() {
            return this.view.element.ownerDocument;
        }
        onTitleClick_() {
            this.foldable.set('expanded', !this.foldable.get('expanded'));
        }
    }

    const FolderBladePlugin = {
        id: 'folder',
        type: 'blade',
        accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
                title: p.required.string,
                view: p.required.constant('folder'),
                expanded: p.optional.boolean,
            });
            return result ? { params: result } : null;
        },
        controller(args) {
            return new FolderController(args.document, {
                blade: args.blade,
                expanded: args.params.expanded,
                props: ValueMap.fromObject({
                    title: args.params.title,
                }),
                viewProps: args.viewProps,
            });
        },
        api(args) {
            if (!(args.controller instanceof FolderController)) {
                return null;
            }
            return new FolderApi(args.controller, args.pool);
        },
    };

    class LabeledValueController extends ValueBladeController {
        constructor(doc, config) {
            const viewProps = config.valueController.viewProps;
            super(Object.assign(Object.assign({}, config), { value: config.valueController.value, view: new LabelView(doc, {
                    props: config.props,
                    viewProps: viewProps,
                }), viewProps: viewProps }));
            this.props = config.props;
            this.valueController = config.valueController;
            this.view.valueElement.appendChild(this.valueController.view.element);
        }
    }

    class SeparatorApi extends BladeApi {
    }

    const className$n = ClassName('spr');
    class SeparatorView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$n());
            config.viewProps.bindClassModifiers(this.element);
            const hrElem = doc.createElement('hr');
            hrElem.classList.add(className$n('r'));
            this.element.appendChild(hrElem);
        }
    }

    class SeparatorController extends BladeController {
        constructor(doc, config) {
            super(Object.assign(Object.assign({}, config), { view: new SeparatorView(doc, {
                    viewProps: config.viewProps,
                }) }));
        }
    }

    const SeparatorBladePlugin = {
        id: 'separator',
        type: 'blade',
        accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
                view: p.required.constant('separator'),
            });
            return result ? { params: result } : null;
        },
        controller(args) {
            return new SeparatorController(args.document, {
                blade: args.blade,
                viewProps: args.viewProps,
            });
        },
        api(args) {
            if (!(args.controller instanceof SeparatorController)) {
                return null;
            }
            return new SeparatorApi(args.controller);
        },
    };

    const className$m = ClassName('');
    function valueToModifier(elem, modifier) {
        return valueToClassName(elem, className$m(undefined, modifier));
    }
    class ViewProps extends ValueMap {
        constructor(valueMap) {
            super(valueMap);
        }
        static create(opt_initialValue) {
            var _a, _b;
            const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
            const coreObj = {
                disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
                disposed: false,
                hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false,
            };
            const core = ValueMap.createCore(coreObj);
            return new ViewProps(core);
        }
        bindClassModifiers(elem) {
            bindValueMap(this, 'disabled', valueToModifier(elem, 'disabled'));
            bindValueMap(this, 'hidden', valueToModifier(elem, 'hidden'));
        }
        bindDisabled(target) {
            bindValueMap(this, 'disabled', (disabled) => {
                target.disabled = disabled;
            });
        }
        bindTabIndex(elem) {
            bindValueMap(this, 'disabled', (disabled) => {
                elem.tabIndex = disabled ? -1 : 0;
            });
        }
        handleDispose(callback) {
            this.value('disposed').emitter.on('change', (disposed) => {
                if (disposed) {
                    callback();
                }
            });
        }
    }

    const className$l = ClassName('tbi');
    class TabItemView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$l());
            config.viewProps.bindClassModifiers(this.element);
            bindValueMap(config.props, 'selected', (selected) => {
                if (selected) {
                    this.element.classList.add(className$l(undefined, 'sel'));
                }
                else {
                    this.element.classList.remove(className$l(undefined, 'sel'));
                }
            });
            const buttonElem = doc.createElement('button');
            buttonElem.classList.add(className$l('b'));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement('div');
            titleElem.classList.add(className$l('t'));
            bindValueToTextContent(config.props.value('title'), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
        }
    }

    class TabItemController {
        constructor(doc, config) {
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new TabItemView(doc, {
                props: config.props,
                viewProps: config.viewProps,
            });
            this.view.buttonElement.addEventListener('click', this.onClick_);
        }
        onClick_() {
            this.emitter.emit('click', {
                sender: this,
            });
        }
    }

    class TabPageController {
        constructor(doc, config) {
            this.onItemClick_ = this.onItemClick_.bind(this);
            this.ic_ = new TabItemController(doc, {
                props: config.itemProps,
                viewProps: ViewProps.create(),
            });
            this.ic_.emitter.on('click', this.onItemClick_);
            this.cc_ = new RackController(doc, {
                blade: createBlade(),
                viewProps: ViewProps.create(),
            });
            this.props = config.props;
            bindValueMap(this.props, 'selected', (selected) => {
                this.itemController.props.set('selected', selected);
                this.contentController.viewProps.set('hidden', !selected);
            });
        }
        get itemController() {
            return this.ic_;
        }
        get contentController() {
            return this.cc_;
        }
        onItemClick_() {
            this.props.set('selected', true);
        }
    }

    class TabPageApi {
        constructor(controller, contentRackApi) {
            this.controller_ = controller;
            this.rackApi_ = contentRackApi;
        }
        get title() {
            var _a;
            return (_a = this.controller_.itemController.props.get('title')) !== null && _a !== void 0 ? _a : '';
        }
        set title(title) {
            this.controller_.itemController.props.set('title', title);
        }
        get selected() {
            return this.controller_.props.get('selected');
        }
        set selected(selected) {
            this.controller_.props.set('selected', selected);
        }
        get children() {
            return this.rackApi_.children;
        }
        addButton(params) {
            return this.rackApi_.addButton(params);
        }
        addFolder(params) {
            return this.rackApi_.addFolder(params);
        }
        addSeparator(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
        }
        addTab(params) {
            return this.rackApi_.addTab(params);
        }
        add(api, opt_index) {
            this.rackApi_.add(api, opt_index);
        }
        remove(api) {
            this.rackApi_.remove(api);
        }
        addInput(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
        }
        addMonitor(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
        }
        addBlade(params) {
            return this.rackApi_.addBlade(params);
        }
    }

    class TabApi extends RackLikeApi {
        constructor(controller, pool) {
            super(controller, new RackApi(controller.rackController, pool));
            this.onPageAdd_ = this.onPageAdd_.bind(this);
            this.onPageRemove_ = this.onPageRemove_.bind(this);
            this.onSelect_ = this.onSelect_.bind(this);
            this.emitter_ = new Emitter();
            this.pageApiMap_ = new Map();
            this.rackApi_.on('change', (ev) => {
                this.emitter_.emit('change', {
                    event: ev,
                });
            });
            this.rackApi_.on('update', (ev) => {
                this.emitter_.emit('update', {
                    event: ev,
                });
            });
            this.controller_.tab.selectedIndex.emitter.on('change', this.onSelect_);
            this.controller_.pageSet.emitter.on('add', this.onPageAdd_);
            this.controller_.pageSet.emitter.on('remove', this.onPageRemove_);
            this.controller_.pageSet.items.forEach((pc) => {
                this.setUpPageApi_(pc);
            });
        }
        get pages() {
            return this.controller_.pageSet.items.map((pc) => {
                const api = this.pageApiMap_.get(pc);
                if (!api) {
                    throw TpError.shouldNeverHappen();
                }
                return api;
            });
        }
        addPage(params) {
            const doc = this.controller_.view.element.ownerDocument;
            const pc = new TabPageController(doc, {
                itemProps: ValueMap.fromObject({
                    selected: false,
                    title: params.title,
                }),
                props: ValueMap.fromObject({
                    selected: false,
                }),
            });
            this.controller_.add(pc, params.index);
            const api = this.pageApiMap_.get(pc);
            if (!api) {
                throw TpError.shouldNeverHappen();
            }
            return api;
        }
        removePage(index) {
            this.controller_.remove(index);
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
        setUpPageApi_(pc) {
            const rackApi = this.rackApi_['apiSet_'].find((api) => api.controller_ === pc.contentController);
            if (!rackApi) {
                throw TpError.shouldNeverHappen();
            }
            const api = new TabPageApi(pc, rackApi);
            this.pageApiMap_.set(pc, api);
        }
        onPageAdd_(ev) {
            this.setUpPageApi_(ev.item);
        }
        onPageRemove_(ev) {
            const api = this.pageApiMap_.get(ev.item);
            if (!api) {
                throw TpError.shouldNeverHappen();
            }
            this.pageApiMap_.delete(ev.item);
        }
        onSelect_(ev) {
            this.emitter_.emit('select', {
                event: new TpTabSelectEvent(this, ev.rawValue),
            });
        }
    }

    const INDEX_NOT_SELECTED = -1;
    class Tab {
        constructor() {
            this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this);
            this.empty = createValue(true);
            this.selectedIndex = createValue(INDEX_NOT_SELECTED);
            this.items_ = [];
        }
        add(item, opt_index) {
            const index = opt_index !== null && opt_index !== void 0 ? opt_index : this.items_.length;
            this.items_.splice(index, 0, item);
            item.emitter.on('change', this.onItemSelectedChange_);
            this.keepSelection_();
        }
        remove(item) {
            const index = this.items_.indexOf(item);
            if (index < 0) {
                return;
            }
            this.items_.splice(index, 1);
            item.emitter.off('change', this.onItemSelectedChange_);
            this.keepSelection_();
        }
        keepSelection_() {
            if (this.items_.length === 0) {
                this.selectedIndex.rawValue = INDEX_NOT_SELECTED;
                this.empty.rawValue = true;
                return;
            }
            const firstSelIndex = this.items_.findIndex((s) => s.rawValue);
            if (firstSelIndex < 0) {
                this.items_.forEach((s, i) => {
                    s.rawValue = i === 0;
                });
                this.selectedIndex.rawValue = 0;
            }
            else {
                this.items_.forEach((s, i) => {
                    s.rawValue = i === firstSelIndex;
                });
                this.selectedIndex.rawValue = firstSelIndex;
            }
            this.empty.rawValue = false;
        }
        onItemSelectedChange_(ev) {
            if (ev.rawValue) {
                const index = this.items_.findIndex((s) => s === ev.sender);
                this.items_.forEach((s, i) => {
                    s.rawValue = i === index;
                });
                this.selectedIndex.rawValue = index;
            }
            else {
                this.keepSelection_();
            }
        }
    }

    const className$k = ClassName('tab');
    class TabView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$k(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.empty, valueToClassName(this.element, className$k(undefined, 'nop')));
            const itemsElem = doc.createElement('div');
            itemsElem.classList.add(className$k('i'));
            this.element.appendChild(itemsElem);
            this.itemsElement = itemsElem;
            const contentsElem = config.contentsElement;
            contentsElem.classList.add(className$k('c'));
            this.element.appendChild(contentsElem);
            this.contentsElement = contentsElem;
        }
    }

    class TabController extends RackLikeController {
        constructor(doc, config) {
            const cr = new RackController(doc, {
                blade: config.blade,
                viewProps: config.viewProps,
            });
            const tab = new Tab();
            super({
                blade: config.blade,
                rackController: cr,
                view: new TabView(doc, {
                    contentsElement: cr.view.element,
                    empty: tab.empty,
                    viewProps: config.viewProps,
                }),
            });
            this.onPageAdd_ = this.onPageAdd_.bind(this);
            this.onPageRemove_ = this.onPageRemove_.bind(this);
            this.pageSet_ = new NestedOrderedSet(() => null);
            this.pageSet_.emitter.on('add', this.onPageAdd_);
            this.pageSet_.emitter.on('remove', this.onPageRemove_);
            this.tab = tab;
        }
        get pageSet() {
            return this.pageSet_;
        }
        add(pc, opt_index) {
            this.pageSet_.add(pc, opt_index);
        }
        remove(index) {
            this.pageSet_.remove(this.pageSet_.items[index]);
        }
        onPageAdd_(ev) {
            const pc = ev.item;
            insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
            this.rackController.rack.add(pc.contentController, ev.index);
            this.tab.add(pc.props.value('selected'));
        }
        onPageRemove_(ev) {
            const pc = ev.item;
            removeElement(pc.itemController.view.element);
            this.rackController.rack.remove(pc.contentController);
            this.tab.remove(pc.props.value('selected'));
        }
    }

    const TabBladePlugin = {
        id: 'tab',
        type: 'blade',
        accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
                pages: p.required.array(p.required.object({ title: p.required.string })),
                view: p.required.constant('tab'),
            });
            if (!result || result.pages.length === 0) {
                return null;
            }
            return { params: result };
        },
        controller(args) {
            const c = new TabController(args.document, {
                blade: args.blade,
                viewProps: args.viewProps,
            });
            args.params.pages.forEach((p) => {
                const pc = new TabPageController(args.document, {
                    itemProps: ValueMap.fromObject({
                        selected: false,
                        title: p.title,
                    }),
                    props: ValueMap.fromObject({
                        selected: false,
                    }),
                });
                c.add(pc);
            });
            return c;
        },
        api(args) {
            if (!(args.controller instanceof TabController)) {
                return null;
            }
            return new TabApi(args.controller, args.pool);
        },
    };

    function createBladeController(plugin, args) {
        const ac = plugin.accept(args.params);
        if (!ac) {
            return null;
        }
        const disabled = ParamsParsers.optional.boolean(args.params['disabled']).value;
        const hidden = ParamsParsers.optional.boolean(args.params['hidden']).value;
        return plugin.controller({
            blade: createBlade(),
            document: args.document,
            params: forceCast(Object.assign(Object.assign({}, ac.params), { disabled: disabled, hidden: hidden })),
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden,
            }),
        });
    }

    class ManualTicker {
        constructor() {
            this.disabled = false;
            this.emitter = new Emitter();
        }
        dispose() { }
        tick() {
            if (this.disabled) {
                return;
            }
            this.emitter.emit('tick', {
                sender: this,
            });
        }
    }

    class IntervalTicker {
        constructor(doc, interval) {
            this.disabled_ = false;
            this.timerId_ = null;
            this.onTick_ = this.onTick_.bind(this);
            this.doc_ = doc;
            this.emitter = new Emitter();
            this.interval_ = interval;
            this.setTimer_();
        }
        get disabled() {
            return this.disabled_;
        }
        set disabled(inactive) {
            this.disabled_ = inactive;
            if (this.disabled_) {
                this.clearTimer_();
            }
            else {
                this.setTimer_();
            }
        }
        dispose() {
            this.clearTimer_();
        }
        clearTimer_() {
            if (this.timerId_ === null) {
                return;
            }
            const win = this.doc_.defaultView;
            if (win) {
                win.clearInterval(this.timerId_);
            }
            this.timerId_ = null;
        }
        setTimer_() {
            this.clearTimer_();
            if (this.interval_ <= 0) {
                return;
            }
            const win = this.doc_.defaultView;
            if (win) {
                this.timerId_ = win.setInterval(this.onTick_, this.interval_);
            }
        }
        onTick_() {
            if (this.disabled_) {
                return;
            }
            this.emitter.emit('tick', {
                sender: this,
            });
        }
    }

    class CompositeConstraint {
        constructor(constraints) {
            this.constraints = constraints;
        }
        constrain(value) {
            return this.constraints.reduce((result, c) => {
                return c.constrain(result);
            }, value);
        }
    }
    function findConstraint(c, constraintClass) {
        if (c instanceof constraintClass) {
            return c;
        }
        if (c instanceof CompositeConstraint) {
            const result = c.constraints.reduce((tmpResult, sc) => {
                if (tmpResult) {
                    return tmpResult;
                }
                return sc instanceof constraintClass ? sc : null;
            }, null);
            if (result) {
                return result;
            }
        }
        return null;
    }

    class DefiniteRangeConstraint {
        constructor(config) {
            this.values = ValueMap.fromObject({
                max: config.max,
                min: config.min,
            });
        }
        constrain(value) {
            const max = this.values.get('max');
            const min = this.values.get('min');
            return Math.min(Math.max(value, min), max);
        }
    }

    class ListConstraint {
        constructor(options) {
            this.values = ValueMap.fromObject({
                options: options,
            });
        }
        get options() {
            return this.values.get('options');
        }
        constrain(value) {
            const opts = this.values.get('options');
            if (opts.length === 0) {
                return value;
            }
            const matched = opts.filter((item) => {
                return item.value === value;
            }).length > 0;
            return matched ? value : opts[0].value;
        }
    }

    class RangeConstraint {
        constructor(config) {
            this.values = ValueMap.fromObject({
                max: config.max,
                min: config.min,
            });
        }
        get maxValue() {
            return this.values.get('max');
        }
        get minValue() {
            return this.values.get('min');
        }
        constrain(value) {
            const max = this.values.get('max');
            const min = this.values.get('min');
            let result = value;
            if (!isEmpty(min)) {
                result = Math.max(result, min);
            }
            if (!isEmpty(max)) {
                result = Math.min(result, max);
            }
            return result;
        }
    }

    class StepConstraint {
        constructor(step, origin = 0) {
            this.step = step;
            this.origin = origin;
        }
        constrain(value) {
            const o = this.origin % this.step;
            const r = Math.round((value - o) / this.step);
            return o + r * this.step;
        }
    }

    const className$j = ClassName('lst');
    class ListView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.props_ = config.props;
            this.element = doc.createElement('div');
            this.element.classList.add(className$j());
            config.viewProps.bindClassModifiers(this.element);
            const selectElem = doc.createElement('select');
            selectElem.classList.add(className$j('s'));
            bindValueMap(this.props_, 'options', (opts) => {
                removeChildElements(selectElem);
                opts.forEach((item, index) => {
                    const optionElem = doc.createElement('option');
                    optionElem.dataset.index = String(index);
                    optionElem.textContent = item.text;
                    optionElem.value = String(item.value);
                    selectElem.appendChild(optionElem);
                });
            });
            config.viewProps.bindDisabled(selectElem);
            this.element.appendChild(selectElem);
            this.selectElement = selectElem;
            const markElem = doc.createElement('div');
            markElem.classList.add(className$j('m'));
            markElem.appendChild(createSvgIconElement(doc, 'dropdown'));
            this.element.appendChild(markElem);
            config.value.emitter.on('change', this.onValueChange_);
            this.value_ = config.value;
            this.update_();
        }
        update_() {
            this.selectElement.value = String(this.value_.rawValue);
        }
        onValueChange_() {
            this.update_();
        }
    }

    class ListController {
        constructor(doc, config) {
            this.onSelectChange_ = this.onSelectChange_.bind(this);
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ListView(doc, {
                props: this.props,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view.selectElement.addEventListener('change', this.onSelectChange_);
        }
        onSelectChange_(e) {
            const selectElem = forceCast(e.currentTarget);
            const optElem = selectElem.selectedOptions.item(0);
            if (!optElem) {
                return;
            }
            const itemIndex = Number(optElem.dataset.index);
            this.value.rawValue = this.props.get('options')[itemIndex].value;
        }
    }

    const className$i = ClassName('pop');
    class PopupView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$i());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.shows, valueToClassName(this.element, className$i(undefined, 'v')));
        }
    }

    class PopupController {
        constructor(doc, config) {
            this.shows = createValue(false);
            this.viewProps = config.viewProps;
            this.view = new PopupView(doc, {
                shows: this.shows,
                viewProps: this.viewProps,
            });
        }
    }

    const className$h = ClassName('txt');
    class TextView {
        constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className$h());
            config.viewProps.bindClassModifiers(this.element);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            const inputElem = doc.createElement('input');
            inputElem.classList.add(className$h('i'));
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on('change', this.onChange_);
            this.value_ = config.value;
            this.refresh();
        }
        refresh() {
            const formatter = this.props_.get('formatter');
            this.inputElement.value = formatter(this.value_.rawValue);
        }
        onChange_() {
            this.refresh();
        }
    }

    class TextController {
        constructor(doc, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.parser_ = config.parser;
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new TextView(doc, {
                props: config.props,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            const value = inputElem.value;
            const parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
                this.value.rawValue = parsedValue;
            }
            this.view.refresh();
        }
    }

    function boolToString(value) {
        return String(value);
    }
    function boolFromUnknown(value) {
        if (value === 'false') {
            return false;
        }
        return !!value;
    }
    function BooleanFormatter(value) {
        return boolToString(value);
    }

    class NumberLiteralNode {
        constructor(text) {
            this.text = text;
        }
        evaluate() {
            return Number(this.text);
        }
        toString() {
            return this.text;
        }
    }
    const BINARY_OPERATION_MAP = {
        '**': (v1, v2) => Math.pow(v1, v2),
        '*': (v1, v2) => v1 * v2,
        '/': (v1, v2) => v1 / v2,
        '%': (v1, v2) => v1 % v2,
        '+': (v1, v2) => v1 + v2,
        '-': (v1, v2) => v1 - v2,
        '<<': (v1, v2) => v1 << v2,
        '>>': (v1, v2) => v1 >> v2,
        '>>>': (v1, v2) => v1 >>> v2,
        '&': (v1, v2) => v1 & v2,
        '^': (v1, v2) => v1 ^ v2,
        '|': (v1, v2) => v1 | v2,
    };
    class BinaryOperationNode {
        constructor(operator, left, right) {
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        evaluate() {
            const op = BINARY_OPERATION_MAP[this.operator];
            if (!op) {
                throw new Error(`unexpected binary operator: '${this.operator}`);
            }
            return op(this.left.evaluate(), this.right.evaluate());
        }
        toString() {
            return [
                'b(',
                this.left.toString(),
                this.operator,
                this.right.toString(),
                ')',
            ].join(' ');
        }
    }
    const UNARY_OPERATION_MAP = {
        '+': (v) => v,
        '-': (v) => -v,
        '~': (v) => ~v,
    };
    class UnaryOperationNode {
        constructor(operator, expr) {
            this.operator = operator;
            this.expression = expr;
        }
        evaluate() {
            const op = UNARY_OPERATION_MAP[this.operator];
            if (!op) {
                throw new Error(`unexpected unary operator: '${this.operator}`);
            }
            return op(this.expression.evaluate());
        }
        toString() {
            return ['u(', this.operator, this.expression.toString(), ')'].join(' ');
        }
    }

    function combineReader(parsers) {
        return (text, cursor) => {
            for (let i = 0; i < parsers.length; i++) {
                const result = parsers[i](text, cursor);
                if (result !== '') {
                    return result;
                }
            }
            return '';
        };
    }
    function readWhitespace(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^\s+/);
        return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
    }
    function readNonZeroDigit(text, cursor) {
        const ch = text.substr(cursor, 1);
        return ch.match(/^[1-9]$/) ? ch : '';
    }
    function readDecimalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9]+/);
        return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
    }
    function readSignedInteger(text, cursor) {
        const ds = readDecimalDigits(text, cursor);
        if (ds !== '') {
            return ds;
        }
        const sign = text.substr(cursor, 1);
        cursor += 1;
        if (sign !== '-' && sign !== '+') {
            return '';
        }
        const sds = readDecimalDigits(text, cursor);
        if (sds === '') {
            return '';
        }
        return sign + sds;
    }
    function readExponentPart(text, cursor) {
        const e = text.substr(cursor, 1);
        cursor += 1;
        if (e.toLowerCase() !== 'e') {
            return '';
        }
        const si = readSignedInteger(text, cursor);
        if (si === '') {
            return '';
        }
        return e + si;
    }
    function readDecimalIntegerLiteral(text, cursor) {
        const ch = text.substr(cursor, 1);
        if (ch === '0') {
            return ch;
        }
        const nzd = readNonZeroDigit(text, cursor);
        cursor += nzd.length;
        if (nzd === '') {
            return '';
        }
        return nzd + readDecimalDigits(text, cursor);
    }
    function readDecimalLiteral1(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === '') {
            return '';
        }
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== '.') {
            return '';
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        return dil + dot + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral2(text, cursor) {
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== '.') {
            return '';
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        if (dds === '') {
            return '';
        }
        return dot + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral3(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === '') {
            return '';
        }
        return dil + readExponentPart(text, cursor);
    }
    const readDecimalLiteral = combineReader([
        readDecimalLiteral1,
        readDecimalLiteral2,
        readDecimalLiteral3,
    ]);
    function parseBinaryDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[01]+/);
        return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
    }
    function readBinaryIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0b') {
            return '';
        }
        const bds = parseBinaryDigits(text, cursor);
        if (bds === '') {
            return '';
        }
        return prefix + bds;
    }
    function readOctalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-7]+/);
        return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
    }
    function readOctalIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0o') {
            return '';
        }
        const ods = readOctalDigits(text, cursor);
        if (ods === '') {
            return '';
        }
        return prefix + ods;
    }
    function readHexDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9a-f]+/i);
        return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
    }
    function readHexIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0x') {
            return '';
        }
        const hds = readHexDigits(text, cursor);
        if (hds === '') {
            return '';
        }
        return prefix + hds;
    }
    const readNonDecimalIntegerLiteral = combineReader([
        readBinaryIntegerLiteral,
        readOctalIntegerLiteral,
        readHexIntegerLiteral,
    ]);
    const readNumericLiteral = combineReader([
        readNonDecimalIntegerLiteral,
        readDecimalLiteral,
    ]);

    function parseLiteral(text, cursor) {
        const num = readNumericLiteral(text, cursor);
        cursor += num.length;
        if (num === '') {
            return null;
        }
        return {
            evaluable: new NumberLiteralNode(num),
            cursor: cursor,
        };
    }
    function parseParenthesizedExpression(text, cursor) {
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== '(') {
            return null;
        }
        const expr = parseExpression(text, cursor);
        if (!expr) {
            return null;
        }
        cursor = expr.cursor;
        cursor += readWhitespace(text, cursor).length;
        const cl = text.substr(cursor, 1);
        cursor += cl.length;
        if (cl !== ')') {
            return null;
        }
        return {
            evaluable: expr.evaluable,
            cursor: cursor,
        };
    }
    function parsePrimaryExpression(text, cursor) {
        var _a;
        return ((_a = parseLiteral(text, cursor)) !== null && _a !== void 0 ? _a : parseParenthesizedExpression(text, cursor));
    }
    function parseUnaryExpression(text, cursor) {
        const expr = parsePrimaryExpression(text, cursor);
        if (expr) {
            return expr;
        }
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== '+' && op !== '-' && op !== '~') {
            return null;
        }
        const num = parseUnaryExpression(text, cursor);
        if (!num) {
            return null;
        }
        cursor = num.cursor;
        return {
            cursor: cursor,
            evaluable: new UnaryOperationNode(op, num.evaluable),
        };
    }
    function readBinaryOperator(ops, text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        const op = ops.filter((op) => text.startsWith(op, cursor))[0];
        if (!op) {
            return null;
        }
        cursor += op.length;
        cursor += readWhitespace(text, cursor).length;
        return {
            cursor: cursor,
            operator: op,
        };
    }
    function createBinaryOperationExpressionParser(exprParser, ops) {
        return (text, cursor) => {
            const firstExpr = exprParser(text, cursor);
            if (!firstExpr) {
                return null;
            }
            cursor = firstExpr.cursor;
            let expr = firstExpr.evaluable;
            for (;;) {
                const op = readBinaryOperator(ops, text, cursor);
                if (!op) {
                    break;
                }
                cursor = op.cursor;
                const nextExpr = exprParser(text, cursor);
                if (!nextExpr) {
                    return null;
                }
                cursor = nextExpr.cursor;
                expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
            }
            return expr
                ? {
                    cursor: cursor,
                    evaluable: expr,
                }
                : null;
        };
    }
    const parseBinaryOperationExpression = [
        ['**'],
        ['*', '/', '%'],
        ['+', '-'],
        ['<<', '>>>', '>>'],
        ['&'],
        ['^'],
        ['|'],
    ].reduce((parser, ops) => {
        return createBinaryOperationExpressionParser(parser, ops);
    }, parseUnaryExpression);
    function parseExpression(text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        return parseBinaryOperationExpression(text, cursor);
    }
    function parseEcmaNumberExpression(text) {
        const expr = parseExpression(text, 0);
        if (!expr) {
            return null;
        }
        const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
        if (cursor !== text.length) {
            return null;
        }
        return expr.evaluable;
    }

    function parseNumber(text) {
        var _a;
        const r = parseEcmaNumberExpression(text);
        return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
    }
    function numberFromUnknown(value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            const pv = parseNumber(value);
            if (!isEmpty(pv)) {
                return pv;
            }
        }
        return 0;
    }
    function numberToString(value) {
        return String(value);
    }
    function createNumberFormatter(digits) {
        return (value) => {
            return value.toFixed(Math.max(Math.min(digits, 20), 0));
        };
    }

    const innerFormatter = createNumberFormatter(0);
    function formatPercentage(value) {
        return innerFormatter(value) + '%';
    }

    function stringFromUnknown(value) {
        return String(value);
    }
    function formatString(value) {
        return value;
    }

    function fillBuffer(buffer, bufferSize) {
        while (buffer.length < bufferSize) {
            buffer.push(undefined);
        }
    }
    function initializeBuffer(bufferSize) {
        const buffer = [];
        fillBuffer(buffer, bufferSize);
        return createValue(buffer);
    }
    function createTrimmedBuffer(buffer) {
        const index = buffer.indexOf(undefined);
        return forceCast(index < 0 ? buffer : buffer.slice(0, index));
    }
    function createPushedBuffer(buffer, newValue) {
        const newBuffer = [...createTrimmedBuffer(buffer), newValue];
        if (newBuffer.length > buffer.length) {
            newBuffer.splice(0, newBuffer.length - buffer.length);
        }
        else {
            fillBuffer(newBuffer, buffer.length);
        }
        return newBuffer;
    }

    function connectValues({ primary, secondary, forward, backward, }) {
        let changing = false;
        function preventFeedback(callback) {
            if (changing) {
                return;
            }
            changing = true;
            callback();
            changing = false;
        }
        primary.emitter.on('change', (ev) => {
            preventFeedback(() => {
                secondary.setRawValue(forward(primary, secondary), ev.options);
            });
        });
        secondary.emitter.on('change', (ev) => {
            preventFeedback(() => {
                primary.setRawValue(backward(primary, secondary), ev.options);
            });
            preventFeedback(() => {
                secondary.setRawValue(forward(primary, secondary), ev.options);
            });
        });
        preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), {
                forceEmit: false,
                last: true,
            });
        });
    }

    function getStepForKey(baseStep, keys) {
        const step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
        if (keys.upKey) {
            return +step;
        }
        else if (keys.downKey) {
            return -step;
        }
        return 0;
    }
    function getVerticalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.key === 'ArrowDown',
            shiftKey: ev.shiftKey,
            upKey: ev.key === 'ArrowUp',
        };
    }
    function getHorizontalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.key === 'ArrowLeft',
            shiftKey: ev.shiftKey,
            upKey: ev.key === 'ArrowRight',
        };
    }
    function isVerticalArrowKey(key) {
        return key === 'ArrowUp' || key === 'ArrowDown';
    }
    function isArrowKey(key) {
        return isVerticalArrowKey(key) || key === 'ArrowLeft' || key === 'ArrowRight';
    }

    function computeOffset$1(ev, elem) {
        var _a, _b;
        const win = elem.ownerDocument.defaultView;
        const rect = elem.getBoundingClientRect();
        return {
            x: ev.pageX - (((_a = (win && win.scrollX)) !== null && _a !== void 0 ? _a : 0) + rect.left),
            y: ev.pageY - (((_b = (win && win.scrollY)) !== null && _b !== void 0 ? _b : 0) + rect.top),
        };
    }
    class PointerHandler {
        constructor(element) {
            this.lastTouch_ = null;
            this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
            this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
            this.onMouseDown_ = this.onMouseDown_.bind(this);
            this.onTouchEnd_ = this.onTouchEnd_.bind(this);
            this.onTouchMove_ = this.onTouchMove_.bind(this);
            this.onTouchStart_ = this.onTouchStart_.bind(this);
            this.elem_ = element;
            this.emitter = new Emitter();
            element.addEventListener('touchstart', this.onTouchStart_, {
                passive: false,
            });
            element.addEventListener('touchmove', this.onTouchMove_, {
                passive: true,
            });
            element.addEventListener('touchend', this.onTouchEnd_);
            element.addEventListener('mousedown', this.onMouseDown_);
        }
        computePosition_(offset) {
            const rect = this.elem_.getBoundingClientRect();
            return {
                bounds: {
                    width: rect.width,
                    height: rect.height,
                },
                point: offset
                    ? {
                        x: offset.x,
                        y: offset.y,
                    }
                    : null,
            };
        }
        onMouseDown_(ev) {
            var _a;
            ev.preventDefault();
            (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
            const doc = this.elem_.ownerDocument;
            doc.addEventListener('mousemove', this.onDocumentMouseMove_);
            doc.addEventListener('mouseup', this.onDocumentMouseUp_);
            this.emitter.emit('down', {
                altKey: ev.altKey,
                data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                sender: this,
                shiftKey: ev.shiftKey,
            });
        }
        onDocumentMouseMove_(ev) {
            this.emitter.emit('move', {
                altKey: ev.altKey,
                data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                sender: this,
                shiftKey: ev.shiftKey,
            });
        }
        onDocumentMouseUp_(ev) {
            const doc = this.elem_.ownerDocument;
            doc.removeEventListener('mousemove', this.onDocumentMouseMove_);
            doc.removeEventListener('mouseup', this.onDocumentMouseUp_);
            this.emitter.emit('up', {
                altKey: ev.altKey,
                data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                sender: this,
                shiftKey: ev.shiftKey,
            });
        }
        onTouchStart_(ev) {
            ev.preventDefault();
            const touch = ev.targetTouches.item(0);
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit('down', {
                altKey: ev.altKey,
                data: this.computePosition_(touch
                    ? {
                        x: touch.clientX - rect.left,
                        y: touch.clientY - rect.top,
                    }
                    : undefined),
                sender: this,
                shiftKey: ev.shiftKey,
            });
            this.lastTouch_ = touch;
        }
        onTouchMove_(ev) {
            const touch = ev.targetTouches.item(0);
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit('move', {
                altKey: ev.altKey,
                data: this.computePosition_(touch
                    ? {
                        x: touch.clientX - rect.left,
                        y: touch.clientY - rect.top,
                    }
                    : undefined),
                sender: this,
                shiftKey: ev.shiftKey,
            });
            this.lastTouch_ = touch;
        }
        onTouchEnd_(ev) {
            var _a;
            const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit('up', {
                altKey: ev.altKey,
                data: this.computePosition_(touch
                    ? {
                        x: touch.clientX - rect.left,
                        y: touch.clientY - rect.top,
                    }
                    : undefined),
                sender: this,
                shiftKey: ev.shiftKey,
            });
        }
    }

    function mapRange(value, start1, end1, start2, end2) {
        const p = (value - start1) / (end1 - start1);
        return start2 + p * (end2 - start2);
    }
    function getDecimalDigits(value) {
        const text = String(value.toFixed(10));
        const frac = text.split('.')[1];
        return frac.replace(/0+$/, '').length;
    }
    function constrainRange(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    function loopRange(value, max) {
        return ((value % max) + max) % max;
    }

    const className$g = ClassName('txt');
    class NumberTextView {
        constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$g(), className$g(undefined, 'num'));
            if (config.arrayPosition) {
                this.element.classList.add(className$g(undefined, config.arrayPosition));
            }
            config.viewProps.bindClassModifiers(this.element);
            const inputElem = doc.createElement('input');
            inputElem.classList.add(className$g('i'));
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            this.onDraggingChange_ = this.onDraggingChange_.bind(this);
            this.dragging_ = config.dragging;
            this.dragging_.emitter.on('change', this.onDraggingChange_);
            this.element.classList.add(className$g());
            this.inputElement.classList.add(className$g('i'));
            const knobElem = doc.createElement('div');
            knobElem.classList.add(className$g('k'));
            this.element.appendChild(knobElem);
            this.knobElement = knobElem;
            const guideElem = doc.createElementNS(SVG_NS, 'svg');
            guideElem.classList.add(className$g('g'));
            this.knobElement.appendChild(guideElem);
            const bodyElem = doc.createElementNS(SVG_NS, 'path');
            bodyElem.classList.add(className$g('gb'));
            guideElem.appendChild(bodyElem);
            this.guideBodyElem_ = bodyElem;
            const headElem = doc.createElementNS(SVG_NS, 'path');
            headElem.classList.add(className$g('gh'));
            guideElem.appendChild(headElem);
            this.guideHeadElem_ = headElem;
            const tooltipElem = doc.createElement('div');
            tooltipElem.classList.add(ClassName('tt')());
            this.knobElement.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on('change', this.onChange_);
            this.value = config.value;
            this.refresh();
        }
        onDraggingChange_(ev) {
            if (ev.rawValue === null) {
                this.element.classList.remove(className$g(undefined, 'drg'));
                return;
            }
            this.element.classList.add(className$g(undefined, 'drg'));
            const x = ev.rawValue / this.props_.get('draggingScale');
            const aox = x + (x > 0 ? -1 : x < 0 ? +1 : 0);
            const adx = constrainRange(-aox, -4, +4);
            this.guideHeadElem_.setAttributeNS(null, 'd', [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(' '));
            this.guideBodyElem_.setAttributeNS(null, 'd', `M 0,4 L${x},4`);
            const formatter = this.props_.get('formatter');
            this.tooltipElem_.textContent = formatter(this.value.rawValue);
            this.tooltipElem_.style.left = `${x}px`;
        }
        refresh() {
            const formatter = this.props_.get('formatter');
            this.inputElement.value = formatter(this.value.rawValue);
        }
        onChange_() {
            this.refresh();
        }
    }

    class NumberTextController {
        constructor(doc, config) {
            var _a;
            this.originRawValue_ = 0;
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
            this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.baseStep_ = config.baseStep;
            this.parser_ = config.parser;
            this.props = config.props;
            this.sliderProps_ = (_a = config.sliderProps) !== null && _a !== void 0 ? _a : null;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.dragging_ = createValue(null);
            this.view = new NumberTextView(doc, {
                arrayPosition: config.arrayPosition,
                dragging: this.dragging_,
                props: this.props,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
            this.view.inputElement.addEventListener('keydown', this.onInputKeyDown_);
            this.view.inputElement.addEventListener('keyup', this.onInputKeyUp_);
            const ph = new PointerHandler(this.view.knobElement);
            ph.emitter.on('down', this.onPointerDown_);
            ph.emitter.on('move', this.onPointerMove_);
            ph.emitter.on('up', this.onPointerUp_);
        }
        constrainValue_(value) {
            var _a, _b;
            const min = (_a = this.sliderProps_) === null || _a === void 0 ? void 0 : _a.get('minValue');
            const max = (_b = this.sliderProps_) === null || _b === void 0 ? void 0 : _b.get('maxValue');
            let v = value;
            if (min !== undefined) {
                v = Math.max(v, min);
            }
            if (max !== undefined) {
                v = Math.min(v, max);
            }
            return v;
        }
        onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            const value = inputElem.value;
            const parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
                this.value.rawValue = this.constrainValue_(parsedValue);
            }
            this.view.refresh();
        }
        onInputKeyDown_(ev) {
            const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.constrainValue_(this.value.rawValue + step), {
                forceEmit: false,
                last: false,
            });
        }
        onInputKeyUp_(ev) {
            const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
        onPointerDown_() {
            this.originRawValue_ = this.value.rawValue;
            this.dragging_.rawValue = 0;
        }
        computeDraggingValue_(data) {
            if (!data.point) {
                return null;
            }
            const dx = data.point.x - data.bounds.width / 2;
            return this.constrainValue_(this.originRawValue_ + dx * this.props.get('draggingScale'));
        }
        onPointerMove_(ev) {
            const v = this.computeDraggingValue_(ev.data);
            if (v === null) {
                return;
            }
            this.value.setRawValue(v, {
                forceEmit: false,
                last: false,
            });
            this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
        }
        onPointerUp_(ev) {
            const v = this.computeDraggingValue_(ev.data);
            if (v === null) {
                return;
            }
            this.value.setRawValue(v, {
                forceEmit: true,
                last: true,
            });
            this.dragging_.rawValue = null;
        }
    }

    const className$f = ClassName('sld');
    class SliderView {
        constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$f());
            config.viewProps.bindClassModifiers(this.element);
            const trackElem = doc.createElement('div');
            trackElem.classList.add(className$f('t'));
            config.viewProps.bindTabIndex(trackElem);
            this.element.appendChild(trackElem);
            this.trackElement = trackElem;
            const knobElem = doc.createElement('div');
            knobElem.classList.add(className$f('k'));
            this.trackElement.appendChild(knobElem);
            this.knobElement = knobElem;
            config.value.emitter.on('change', this.onChange_);
            this.value = config.value;
            this.update_();
        }
        update_() {
            const p = constrainRange(mapRange(this.value.rawValue, this.props_.get('minValue'), this.props_.get('maxValue'), 0, 100), 0, 100);
            this.knobElement.style.width = `${p}%`;
        }
        onChange_() {
            this.update_();
        }
    }

    class SliderController {
        constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.baseStep_ = config.baseStep;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.props = config.props;
            this.view = new SliderView(doc, {
                props: this.props,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.ptHandler_ = new PointerHandler(this.view.trackElement);
            this.ptHandler_.emitter.on('down', this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on('move', this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.trackElement.addEventListener('keydown', this.onKeyDown_);
            this.view.trackElement.addEventListener('keyup', this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
            if (!d.point) {
                return;
            }
            this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get('minValue'), this.props.get('maxValue')), opts);
        }
        onPointerDownOrMove_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: true,
                last: true,
            });
        }
        onKeyDown_(ev) {
            const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue + step, {
                forceEmit: false,
                last: false,
            });
        }
        onKeyUp_(ev) {
            const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
    }

    const className$e = ClassName('sldtxt');
    class SliderTextView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$e());
            const sliderElem = doc.createElement('div');
            sliderElem.classList.add(className$e('s'));
            this.sliderView_ = config.sliderView;
            sliderElem.appendChild(this.sliderView_.element);
            this.element.appendChild(sliderElem);
            const textElem = doc.createElement('div');
            textElem.classList.add(className$e('t'));
            this.textView_ = config.textView;
            textElem.appendChild(this.textView_.element);
            this.element.appendChild(textElem);
        }
    }

    class SliderTextController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.sliderC_ = new SliderController(doc, {
                baseStep: config.baseStep,
                props: config.sliderProps,
                value: config.value,
                viewProps: this.viewProps,
            });
            this.textC_ = new NumberTextController(doc, {
                baseStep: config.baseStep,
                parser: config.parser,
                props: config.textProps,
                sliderProps: config.sliderProps,
                value: config.value,
                viewProps: config.viewProps,
            });
            this.view = new SliderTextView(doc, {
                sliderView: this.sliderC_.view,
                textView: this.textC_.view,
            });
        }
        get sliderController() {
            return this.sliderC_;
        }
        get textController() {
            return this.textC_;
        }
    }

    function writePrimitive(target, value) {
        target.write(value);
    }

    function parseListOptions(value) {
        const p = ParamsParsers;
        if (Array.isArray(value)) {
            return p.required.array(p.required.object({
                text: p.required.string,
                value: p.required.raw,
            }))(value).value;
        }
        if (typeof value === 'object') {
            return p.required.raw(value)
                .value;
        }
        return undefined;
    }
    function parsePickerLayout(value) {
        if (value === 'inline' || value === 'popup') {
            return value;
        }
        return undefined;
    }
    function parsePointDimensionParams(value) {
        const p = ParamsParsers;
        return p.required.object({
            max: p.optional.number,
            min: p.optional.number,
            step: p.optional.number,
        })(value).value;
    }
    function normalizeListOptions(options) {
        if (Array.isArray(options)) {
            return options;
        }
        const items = [];
        Object.keys(options).forEach((text) => {
            items.push({ text: text, value: options[text] });
        });
        return items;
    }
    function createListConstraint(options) {
        return !isEmpty(options)
            ? new ListConstraint(normalizeListOptions(forceCast(options)))
            : null;
    }
    function findStep(constraint) {
        const c = constraint ? findConstraint(constraint, StepConstraint) : null;
        if (!c) {
            return null;
        }
        return c.step;
    }
    function getSuitableDecimalDigits(constraint, rawValue) {
        const sc = constraint && findConstraint(constraint, StepConstraint);
        if (sc) {
            return getDecimalDigits(sc.step);
        }
        return Math.max(getDecimalDigits(rawValue), 2);
    }
    function getBaseStep(constraint) {
        const step = findStep(constraint);
        return step !== null && step !== void 0 ? step : 1;
    }
    function getSuitableDraggingScale(constraint, rawValue) {
        var _a;
        const sc = constraint && findConstraint(constraint, StepConstraint);
        const base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
        return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
    }

    const className$d = ClassName('ckb');
    class CheckboxView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className$d());
            config.viewProps.bindClassModifiers(this.element);
            const labelElem = doc.createElement('label');
            labelElem.classList.add(className$d('l'));
            this.element.appendChild(labelElem);
            const inputElem = doc.createElement('input');
            inputElem.classList.add(className$d('i'));
            inputElem.type = 'checkbox';
            labelElem.appendChild(inputElem);
            this.inputElement = inputElem;
            config.viewProps.bindDisabled(this.inputElement);
            const wrapperElem = doc.createElement('div');
            wrapperElem.classList.add(className$d('w'));
            labelElem.appendChild(wrapperElem);
            const markElem = createSvgIconElement(doc, 'check');
            wrapperElem.appendChild(markElem);
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.update_();
        }
        update_() {
            this.inputElement.checked = this.value.rawValue;
        }
        onValueChange_() {
            this.update_();
        }
    }

    class CheckboxController {
        constructor(doc, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new CheckboxView(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            this.value.rawValue = inputElem.checked;
        }
    }

    function createConstraint$6(params) {
        const constraints = [];
        const lc = createListConstraint(params.options);
        if (lc) {
            constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
    }
    const BooleanInputPlugin = {
        id: 'input-bool',
        type: 'input',
        accept: (value, params) => {
            if (typeof value !== 'boolean') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                options: p.optional.custom(parseListOptions),
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => boolFromUnknown,
            constraint: (args) => createConstraint$6(args.params),
            writer: (_args) => writePrimitive,
        },
        controller: (args) => {
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            const lc = c && findConstraint(c, ListConstraint);
            if (lc) {
                return new ListController(doc, {
                    props: new ValueMap({
                        options: lc.values.value('options'),
                    }),
                    value: value,
                    viewProps: args.viewProps,
                });
            }
            return new CheckboxController(doc, {
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    const className$c = ClassName('col');
    class ColorView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$c());
            config.foldable.bindExpandedClass(this.element, className$c(undefined, 'expanded'));
            bindValueMap(config.foldable, 'completed', valueToClassName(this.element, className$c(undefined, 'cpl')));
            const headElem = doc.createElement('div');
            headElem.classList.add(className$c('h'));
            this.element.appendChild(headElem);
            const swatchElem = doc.createElement('div');
            swatchElem.classList.add(className$c('s'));
            headElem.appendChild(swatchElem);
            this.swatchElement = swatchElem;
            const textElem = doc.createElement('div');
            textElem.classList.add(className$c('t'));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === 'inline') {
                const pickerElem = doc.createElement('div');
                pickerElem.classList.add(className$c('p'));
                this.element.appendChild(pickerElem);
                this.pickerElement = pickerElem;
            }
            else {
                this.pickerElement = null;
            }
        }
    }

    function rgbToHslInt(r, g, b) {
        const rp = constrainRange(r / 255, 0, 1);
        const gp = constrainRange(g / 255, 0, 1);
        const bp = constrainRange(b / 255, 0, 1);
        const cmax = Math.max(rp, gp, bp);
        const cmin = Math.min(rp, gp, bp);
        const c = cmax - cmin;
        let h = 0;
        let s = 0;
        const l = (cmin + cmax) / 2;
        if (c !== 0) {
            s = c / (1 - Math.abs(cmax + cmin - 1));
            if (rp === cmax) {
                h = (gp - bp) / c;
            }
            else if (gp === cmax) {
                h = 2 + (bp - rp) / c;
            }
            else {
                h = 4 + (rp - gp) / c;
            }
            h = h / 6 + (h < 0 ? 1 : 0);
        }
        return [h * 360, s * 100, l * 100];
    }
    function hslToRgbInt(h, s, l) {
        const hp = ((h % 360) + 360) % 360;
        const sp = constrainRange(s / 100, 0, 1);
        const lp = constrainRange(l / 100, 0, 1);
        const c = (1 - Math.abs(2 * lp - 1)) * sp;
        const x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
        const m = lp - c / 2;
        let rp, gp, bp;
        if (hp >= 0 && hp < 60) {
            [rp, gp, bp] = [c, x, 0];
        }
        else if (hp >= 60 && hp < 120) {
            [rp, gp, bp] = [x, c, 0];
        }
        else if (hp >= 120 && hp < 180) {
            [rp, gp, bp] = [0, c, x];
        }
        else if (hp >= 180 && hp < 240) {
            [rp, gp, bp] = [0, x, c];
        }
        else if (hp >= 240 && hp < 300) {
            [rp, gp, bp] = [x, 0, c];
        }
        else {
            [rp, gp, bp] = [c, 0, x];
        }
        return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
    }
    function rgbToHsvInt(r, g, b) {
        const rp = constrainRange(r / 255, 0, 1);
        const gp = constrainRange(g / 255, 0, 1);
        const bp = constrainRange(b / 255, 0, 1);
        const cmax = Math.max(rp, gp, bp);
        const cmin = Math.min(rp, gp, bp);
        const d = cmax - cmin;
        let h;
        if (d === 0) {
            h = 0;
        }
        else if (cmax === rp) {
            h = 60 * (((((gp - bp) / d) % 6) + 6) % 6);
        }
        else if (cmax === gp) {
            h = 60 * ((bp - rp) / d + 2);
        }
        else {
            h = 60 * ((rp - gp) / d + 4);
        }
        const s = cmax === 0 ? 0 : d / cmax;
        const v = cmax;
        return [h, s * 100, v * 100];
    }
    function hsvToRgbInt(h, s, v) {
        const hp = loopRange(h, 360);
        const sp = constrainRange(s / 100, 0, 1);
        const vp = constrainRange(v / 100, 0, 1);
        const c = vp * sp;
        const x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
        const m = vp - c;
        let rp, gp, bp;
        if (hp >= 0 && hp < 60) {
            [rp, gp, bp] = [c, x, 0];
        }
        else if (hp >= 60 && hp < 120) {
            [rp, gp, bp] = [x, c, 0];
        }
        else if (hp >= 120 && hp < 180) {
            [rp, gp, bp] = [0, c, x];
        }
        else if (hp >= 180 && hp < 240) {
            [rp, gp, bp] = [0, x, c];
        }
        else if (hp >= 240 && hp < 300) {
            [rp, gp, bp] = [x, 0, c];
        }
        else {
            [rp, gp, bp] = [c, 0, x];
        }
        return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
    }
    function hslToHsvInt(h, s, l) {
        const sd = l + (s * (100 - Math.abs(2 * l - 100))) / (2 * 100);
        return [
            h,
            sd !== 0 ? (s * (100 - Math.abs(2 * l - 100))) / sd : 0,
            l + (s * (100 - Math.abs(2 * l - 100))) / (2 * 100),
        ];
    }
    function hsvToHslInt(h, s, v) {
        const sd = 100 - Math.abs((v * (200 - s)) / 100 - 100);
        return [h, sd !== 0 ? (s * v) / sd : 0, (v * (200 - s)) / (2 * 100)];
    }
    function removeAlphaComponent(comps) {
        return [comps[0], comps[1], comps[2]];
    }
    function appendAlphaComponent(comps, alpha) {
        return [comps[0], comps[1], comps[2], alpha];
    }
    const MODE_CONVERTER_MAP = {
        hsl: {
            hsl: (h, s, l) => [h, s, l],
            hsv: hslToHsvInt,
            rgb: hslToRgbInt,
        },
        hsv: {
            hsl: hsvToHslInt,
            hsv: (h, s, v) => [h, s, v],
            rgb: hsvToRgbInt,
        },
        rgb: {
            hsl: rgbToHslInt,
            hsv: rgbToHsvInt,
            rgb: (r, g, b) => [r, g, b],
        },
    };
    function getColorMaxComponents(mode, type) {
        return [
            type === 'float' ? 1 : mode === 'rgb' ? 255 : 360,
            type === 'float' ? 1 : mode === 'rgb' ? 255 : 100,
            type === 'float' ? 1 : mode === 'rgb' ? 255 : 100,
        ];
    }
    function loopHueRange(hue, max) {
        return hue === max ? max : loopRange(hue, max);
    }
    function constrainColorComponents(components, mode, type) {
        var _a;
        const ms = getColorMaxComponents(mode, type);
        return [
            mode === 'rgb'
                ? constrainRange(components[0], 0, ms[0])
                : loopHueRange(components[0], ms[0]),
            constrainRange(components[1], 0, ms[1]),
            constrainRange(components[2], 0, ms[2]),
            constrainRange((_a = components[3]) !== null && _a !== void 0 ? _a : 1, 0, 1),
        ];
    }
    function convertColorType(comps, mode, from, to) {
        const fms = getColorMaxComponents(mode, from);
        const tms = getColorMaxComponents(mode, to);
        return comps.map((c, index) => (c / fms[index]) * tms[index]);
    }
    function convertColor(components, from, to) {
        const intComps = convertColorType(components, from.mode, from.type, 'int');
        const result = MODE_CONVERTER_MAP[from.mode][to.mode](...intComps);
        return convertColorType(result, to.mode, 'int', to.type);
    }

    function isRgbColorComponent(obj, key) {
        if (typeof obj !== 'object' || isEmpty(obj)) {
            return false;
        }
        return key in obj && typeof obj[key] === 'number';
    }
    class Color {
        constructor(comps, mode, type = 'int') {
            this.mode = mode;
            this.type = type;
            this.comps_ = constrainColorComponents(comps, mode, type);
        }
        static black(type = 'int') {
            return new Color([0, 0, 0], 'rgb', type);
        }
        static fromObject(obj, type = 'int') {
            const comps = 'a' in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
            return new Color(comps, 'rgb', type);
        }
        static toRgbaObject(color, type = 'int') {
            return color.toRgbaObject(type);
        }
        static isRgbColorObject(obj) {
            return (isRgbColorComponent(obj, 'r') &&
                isRgbColorComponent(obj, 'g') &&
                isRgbColorComponent(obj, 'b'));
        }
        static isRgbaColorObject(obj) {
            return this.isRgbColorObject(obj) && isRgbColorComponent(obj, 'a');
        }
        static isColorObject(obj) {
            return this.isRgbColorObject(obj);
        }
        static equals(v1, v2) {
            if (v1.mode !== v2.mode) {
                return false;
            }
            const comps1 = v1.comps_;
            const comps2 = v2.comps_;
            for (let i = 0; i < comps1.length; i++) {
                if (comps1[i] !== comps2[i]) {
                    return false;
                }
            }
            return true;
        }
        getComponents(opt_mode, type = 'int') {
            return appendAlphaComponent(convertColor(removeAlphaComponent(this.comps_), { mode: this.mode, type: this.type }, { mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode, type }), this.comps_[3]);
        }
        toRgbaObject(type = 'int') {
            const rgbComps = this.getComponents('rgb', type);
            return {
                r: rgbComps[0],
                g: rgbComps[1],
                b: rgbComps[2],
                a: rgbComps[3],
            };
        }
    }

    const className$b = ClassName('colp');
    class ColorPickerView {
        constructor(doc, config) {
            this.alphaViews_ = null;
            this.element = doc.createElement('div');
            this.element.classList.add(className$b());
            const hsvElem = doc.createElement('div');
            hsvElem.classList.add(className$b('hsv'));
            const svElem = doc.createElement('div');
            svElem.classList.add(className$b('sv'));
            this.svPaletteView_ = config.svPaletteView;
            svElem.appendChild(this.svPaletteView_.element);
            hsvElem.appendChild(svElem);
            const hElem = doc.createElement('div');
            hElem.classList.add(className$b('h'));
            this.hPaletteView_ = config.hPaletteView;
            hElem.appendChild(this.hPaletteView_.element);
            hsvElem.appendChild(hElem);
            this.element.appendChild(hsvElem);
            const rgbElem = doc.createElement('div');
            rgbElem.classList.add(className$b('rgb'));
            this.textView_ = config.textView;
            rgbElem.appendChild(this.textView_.element);
            this.element.appendChild(rgbElem);
            if (config.alphaViews) {
                this.alphaViews_ = {
                    palette: config.alphaViews.palette,
                    text: config.alphaViews.text,
                };
                const aElem = doc.createElement('div');
                aElem.classList.add(className$b('a'));
                const apElem = doc.createElement('div');
                apElem.classList.add(className$b('ap'));
                apElem.appendChild(this.alphaViews_.palette.element);
                aElem.appendChild(apElem);
                const atElem = doc.createElement('div');
                atElem.classList.add(className$b('at'));
                atElem.appendChild(this.alphaViews_.text.element);
                aElem.appendChild(atElem);
                this.element.appendChild(aElem);
            }
        }
        get allFocusableElements() {
            const elems = [
                this.svPaletteView_.element,
                this.hPaletteView_.element,
                this.textView_.modeSelectElement,
                ...this.textView_.textViews.map((v) => v.inputElement),
            ];
            if (this.alphaViews_) {
                elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
            }
            return elems;
        }
    }

    function parseColorType(value) {
        return value === 'int' ? 'int' : value === 'float' ? 'float' : undefined;
    }
    function parseColorInputParams(params) {
        const p = ParamsParsers;
        return parseParams(params, {
            alpha: p.optional.boolean,
            color: p.optional.object({
                alpha: p.optional.boolean,
                type: p.optional.custom(parseColorType),
            }),
            expanded: p.optional.boolean,
            picker: p.optional.custom(parsePickerLayout),
        });
    }
    function getBaseStepForColor(forAlpha) {
        return forAlpha ? 0.1 : 1;
    }
    function extractColorType(params) {
        var _a;
        return (_a = params.color) === null || _a === void 0 ? void 0 : _a.type;
    }

    function equalsStringColorFormat(f1, f2) {
        return (f1.alpha === f2.alpha &&
            f1.mode === f2.mode &&
            f1.notation === f2.notation &&
            f1.type === f2.type);
    }
    function parseCssNumberOrPercentage(text, maxValue) {
        const m = text.match(/^(.+)%$/);
        if (!m) {
            return Math.min(parseFloat(text), maxValue);
        }
        return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
    }
    const ANGLE_TO_DEG_MAP = {
        deg: (angle) => angle,
        grad: (angle) => (angle * 360) / 400,
        rad: (angle) => (angle * 360) / (2 * Math.PI),
        turn: (angle) => angle * 360,
    };
    function parseCssNumberOrAngle(text) {
        const m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
        if (!m) {
            return parseFloat(text);
        }
        const angle = parseFloat(m[1]);
        const unit = m[2];
        return ANGLE_TO_DEG_MAP[unit](angle);
    }
    function parseFunctionalRgbColorComponents(text) {
        const m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255),
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
        }
        return comps;
    }
    function createFunctionalRgbColorParser(type) {
        return (text) => {
            const comps = parseFunctionalRgbColorComponents(text);
            return comps ? new Color(comps, 'rgb', type) : null;
        };
    }
    function parseFunctionalRgbaColorComponents(text) {
        const m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255),
            parseCssNumberOrPercentage(m[4], 1),
        ];
        if (isNaN(comps[0]) ||
            isNaN(comps[1]) ||
            isNaN(comps[2]) ||
            isNaN(comps[3])) {
            return null;
        }
        return comps;
    }
    function createFunctionalRgbaColorParser(type) {
        return (text) => {
            const comps = parseFunctionalRgbaColorComponents(text);
            return comps ? new Color(comps, 'rgb', type) : null;
        };
    }
    function parseHslColorComponents(text) {
        const m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100),
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
        }
        return comps;
    }
    function createHslColorParser(type) {
        return (text) => {
            const comps = parseHslColorComponents(text);
            return comps ? new Color(comps, 'hsl', type) : null;
        };
    }
    function parseHslaColorComponents(text) {
        const m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100),
            parseCssNumberOrPercentage(m[4], 1),
        ];
        if (isNaN(comps[0]) ||
            isNaN(comps[1]) ||
            isNaN(comps[2]) ||
            isNaN(comps[3])) {
            return null;
        }
        return comps;
    }
    function createHslaColorParser(type) {
        return (text) => {
            const comps = parseHslaColorComponents(text);
            return comps ? new Color(comps, 'hsl', type) : null;
        };
    }
    function parseHexRgbColorComponents(text) {
        const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRgb) {
            return [
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16),
            ];
        }
        const mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRrggbb) {
            return [
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16),
            ];
        }
        return null;
    }
    function parseHexRgbColor(text) {
        const comps = parseHexRgbColorComponents(text);
        return comps ? new Color(comps, 'rgb', 'int') : null;
    }
    function parseHexRgbaColorComponents(text) {
        const mRgb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRgb) {
            return [
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16),
                mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1),
            ];
        }
        const mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRrggbb) {
            return [
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16),
                mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1),
            ];
        }
        return null;
    }
    function parseHexRgbaColor(text) {
        const comps = parseHexRgbaColorComponents(text);
        return comps ? new Color(comps, 'rgb', 'int') : null;
    }
    function parseObjectRgbColorComponents(text) {
        const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseFloat(m[1]),
            parseFloat(m[2]),
            parseFloat(m[3]),
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
        }
        return comps;
    }
    function createObjectRgbColorParser(type) {
        return (text) => {
            const comps = parseObjectRgbColorComponents(text);
            return comps ? new Color(comps, 'rgb', type) : null;
        };
    }
    function parseObjectRgbaColorComponents(text) {
        const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
        if (!m) {
            return null;
        }
        const comps = [
            parseFloat(m[1]),
            parseFloat(m[2]),
            parseFloat(m[3]),
            parseFloat(m[4]),
        ];
        if (isNaN(comps[0]) ||
            isNaN(comps[1]) ||
            isNaN(comps[2]) ||
            isNaN(comps[3])) {
            return null;
        }
        return comps;
    }
    function createObjectRgbaColorParser(type) {
        return (text) => {
            const comps = parseObjectRgbaColorComponents(text);
            return comps ? new Color(comps, 'rgb', type) : null;
        };
    }
    const PARSER_AND_RESULT = [
        {
            parser: parseHexRgbColorComponents,
            result: {
                alpha: false,
                mode: 'rgb',
                notation: 'hex',
            },
        },
        {
            parser: parseHexRgbaColorComponents,
            result: {
                alpha: true,
                mode: 'rgb',
                notation: 'hex',
            },
        },
        {
            parser: parseFunctionalRgbColorComponents,
            result: {
                alpha: false,
                mode: 'rgb',
                notation: 'func',
            },
        },
        {
            parser: parseFunctionalRgbaColorComponents,
            result: {
                alpha: true,
                mode: 'rgb',
                notation: 'func',
            },
        },
        {
            parser: parseHslColorComponents,
            result: {
                alpha: false,
                mode: 'hsl',
                notation: 'func',
            },
        },
        {
            parser: parseHslaColorComponents,
            result: {
                alpha: true,
                mode: 'hsl',
                notation: 'func',
            },
        },
        {
            parser: parseObjectRgbColorComponents,
            result: {
                alpha: false,
                mode: 'rgb',
                notation: 'object',
            },
        },
        {
            parser: parseObjectRgbaColorComponents,
            result: {
                alpha: true,
                mode: 'rgb',
                notation: 'object',
            },
        },
    ];
    function detectStringColor(text) {
        return PARSER_AND_RESULT.reduce((prev, { parser, result: detection }) => {
            if (prev) {
                return prev;
            }
            return parser(text) ? detection : null;
        }, null);
    }
    function detectStringColorFormat(text, type = 'int') {
        const r = detectStringColor(text);
        if (!r) {
            return null;
        }
        if (r.notation === 'hex' && type !== 'float') {
            return Object.assign(Object.assign({}, r), { type: 'int' });
        }
        if (r.notation === 'func') {
            return Object.assign(Object.assign({}, r), { type: type });
        }
        return null;
    }
    const TYPE_TO_PARSERS = {
        int: [
            parseHexRgbColor,
            parseHexRgbaColor,
            createFunctionalRgbColorParser('int'),
            createFunctionalRgbaColorParser('int'),
            createHslColorParser('int'),
            createHslaColorParser('int'),
            createObjectRgbColorParser('int'),
            createObjectRgbaColorParser('int'),
        ],
        float: [
            createFunctionalRgbColorParser('float'),
            createFunctionalRgbaColorParser('float'),
            createHslColorParser('float'),
            createHslaColorParser('float'),
            createObjectRgbColorParser('float'),
            createObjectRgbaColorParser('float'),
        ],
    };
    function createColorStringBindingReader(type) {
        const parsers = TYPE_TO_PARSERS[type];
        return (value) => {
            if (typeof value !== 'string') {
                return Color.black(type);
            }
            const result = parsers.reduce((prev, parser) => {
                if (prev) {
                    return prev;
                }
                return parser(value);
            }, null);
            return result !== null && result !== void 0 ? result : Color.black(type);
        };
    }
    function createColorStringParser(type) {
        const parsers = TYPE_TO_PARSERS[type];
        return (value) => {
            return parsers.reduce((prev, parser) => {
                if (prev) {
                    return prev;
                }
                return parser(value);
            }, null);
        };
    }
    function zerofill(comp) {
        const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
    function colorToHexRgbString(value, prefix = '#') {
        const hexes = removeAlphaComponent(value.getComponents('rgb'))
            .map(zerofill)
            .join('');
        return `${prefix}${hexes}`;
    }
    function colorToHexRgbaString(value, prefix = '#') {
        const rgbaComps = value.getComponents('rgb');
        const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255]
            .map(zerofill)
            .join('');
        return `${prefix}${hexes}`;
    }
    function colorToFunctionalRgbString(value, opt_type) {
        const formatter = createNumberFormatter(opt_type === 'float' ? 2 : 0);
        const comps = removeAlphaComponent(value.getComponents('rgb', opt_type)).map((comp) => formatter(comp));
        return `rgb(${comps.join(', ')})`;
    }
    function createFunctionalRgbColorFormatter(type) {
        return (value) => {
            return colorToFunctionalRgbString(value, type);
        };
    }
    function colorToFunctionalRgbaString(value, opt_type) {
        const aFormatter = createNumberFormatter(2);
        const rgbFormatter = createNumberFormatter(opt_type === 'float' ? 2 : 0);
        const comps = value.getComponents('rgb', opt_type).map((comp, index) => {
            const formatter = index === 3 ? aFormatter : rgbFormatter;
            return formatter(comp);
        });
        return `rgba(${comps.join(', ')})`;
    }
    function createFunctionalRgbaColorFormatter(type) {
        return (value) => {
            return colorToFunctionalRgbaString(value, type);
        };
    }
    function colorToFunctionalHslString(value) {
        const formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage,
        ];
        const comps = removeAlphaComponent(value.getComponents('hsl')).map((comp, index) => formatters[index](comp));
        return `hsl(${comps.join(', ')})`;
    }
    function colorToFunctionalHslaString(value) {
        const formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage,
            createNumberFormatter(2),
        ];
        const comps = value
            .getComponents('hsl')
            .map((comp, index) => formatters[index](comp));
        return `hsla(${comps.join(', ')})`;
    }
    function colorToObjectRgbString(value, type) {
        const formatter = createNumberFormatter(type === 'float' ? 2 : 0);
        const names = ['r', 'g', 'b'];
        const comps = removeAlphaComponent(value.getComponents('rgb', type)).map((comp, index) => `${names[index]}: ${formatter(comp)}`);
        return `{${comps.join(', ')}}`;
    }
    function createObjectRgbColorFormatter(type) {
        return (value) => colorToObjectRgbString(value, type);
    }
    function colorToObjectRgbaString(value, type) {
        const aFormatter = createNumberFormatter(2);
        const rgbFormatter = createNumberFormatter(type === 'float' ? 2 : 0);
        const names = ['r', 'g', 'b', 'a'];
        const comps = value.getComponents('rgb', type).map((comp, index) => {
            const formatter = index === 3 ? aFormatter : rgbFormatter;
            return `${names[index]}: ${formatter(comp)}`;
        });
        return `{${comps.join(', ')}}`;
    }
    function createObjectRgbaColorFormatter(type) {
        return (value) => colorToObjectRgbaString(value, type);
    }
    const FORMAT_AND_STRINGIFIERS = [
        {
            format: {
                alpha: false,
                mode: 'rgb',
                notation: 'hex',
                type: 'int',
            },
            stringifier: colorToHexRgbString,
        },
        {
            format: {
                alpha: true,
                mode: 'rgb',
                notation: 'hex',
                type: 'int',
            },
            stringifier: colorToHexRgbaString,
        },
        {
            format: {
                alpha: false,
                mode: 'hsl',
                notation: 'func',
                type: 'int',
            },
            stringifier: colorToFunctionalHslString,
        },
        {
            format: {
                alpha: true,
                mode: 'hsl',
                notation: 'func',
                type: 'int',
            },
            stringifier: colorToFunctionalHslaString,
        },
        ...['int', 'float'].reduce((prev, type) => {
            return [
                ...prev,
                {
                    format: {
                        alpha: false,
                        mode: 'rgb',
                        notation: 'func',
                        type: type,
                    },
                    stringifier: createFunctionalRgbColorFormatter(type),
                },
                {
                    format: {
                        alpha: true,
                        mode: 'rgb',
                        notation: 'func',
                        type: type,
                    },
                    stringifier: createFunctionalRgbaColorFormatter(type),
                },
                {
                    format: {
                        alpha: false,
                        mode: 'rgb',
                        notation: 'object',
                        type: type,
                    },
                    stringifier: createObjectRgbColorFormatter(type),
                },
                {
                    format: {
                        alpha: true,
                        mode: 'rgb',
                        notation: 'object',
                        type: type,
                    },
                    stringifier: createObjectRgbaColorFormatter(type),
                },
            ];
        }, []),
    ];
    function findColorStringifier(format) {
        return FORMAT_AND_STRINGIFIERS.reduce((prev, fas) => {
            if (prev) {
                return prev;
            }
            return equalsStringColorFormat(fas.format, format)
                ? fas.stringifier
                : null;
        }, null);
    }

    const className$a = ClassName('apl');
    class APaletteView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$a());
            config.viewProps.bindTabIndex(this.element);
            const barElem = doc.createElement('div');
            barElem.classList.add(className$a('b'));
            this.element.appendChild(barElem);
            const colorElem = doc.createElement('div');
            colorElem.classList.add(className$a('c'));
            barElem.appendChild(colorElem);
            this.colorElem_ = colorElem;
            const markerElem = doc.createElement('div');
            markerElem.classList.add(className$a('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            const previewElem = doc.createElement('div');
            previewElem.classList.add(className$a('p'));
            this.markerElem_.appendChild(previewElem);
            this.previewElem_ = previewElem;
            this.update_();
        }
        update_() {
            const c = this.value.rawValue;
            const rgbaComps = c.getComponents('rgb');
            const leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], 'rgb');
            const rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], 'rgb');
            const gradientComps = [
                'to right',
                colorToFunctionalRgbaString(leftColor),
                colorToFunctionalRgbaString(rightColor),
            ];
            this.colorElem_.style.background = `linear-gradient(${gradientComps.join(',')})`;
            this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
            const left = mapRange(rgbaComps[3], 0, 1, 0, 100);
            this.markerElem_.style.left = `${left}%`;
        }
        onValueChange_() {
            this.update_();
        }
    }

    class APaletteController {
        constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new APaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
            if (!d.point) {
                return;
            }
            const alpha = d.point.x / d.bounds.width;
            const c = this.value.rawValue;
            const [h, s, v] = c.getComponents('hsv');
            this.value.setRawValue(new Color([h, s, v, alpha], 'hsv'), opts);
        }
        onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: true,
                last: true,
            });
        }
        onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents('hsv');
            this.value.setRawValue(new Color([h, s, v, a + step], 'hsv'), {
                forceEmit: false,
                last: false,
            });
        }
        onKeyUp_(ev) {
            const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
    }

    const className$9 = ClassName('coltxt');
    function createModeSelectElement(doc) {
        const selectElem = doc.createElement('select');
        const items = [
            { text: 'RGB', value: 'rgb' },
            { text: 'HSL', value: 'hsl' },
            { text: 'HSV', value: 'hsv' },
        ];
        selectElem.appendChild(items.reduce((frag, item) => {
            const optElem = doc.createElement('option');
            optElem.textContent = item.text;
            optElem.value = item.value;
            frag.appendChild(optElem);
            return frag;
        }, doc.createDocumentFragment()));
        return selectElem;
    }
    class ColorTextView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$9());
            const modeElem = doc.createElement('div');
            modeElem.classList.add(className$9('m'));
            this.modeElem_ = createModeSelectElement(doc);
            this.modeElem_.classList.add(className$9('ms'));
            modeElem.appendChild(this.modeSelectElement);
            const modeMarkerElem = doc.createElement('div');
            modeMarkerElem.classList.add(className$9('mm'));
            modeMarkerElem.appendChild(createSvgIconElement(doc, 'dropdown'));
            modeElem.appendChild(modeMarkerElem);
            this.element.appendChild(modeElem);
            const textsElem = doc.createElement('div');
            textsElem.classList.add(className$9('w'));
            this.element.appendChild(textsElem);
            this.textsElem_ = textsElem;
            this.textViews_ = config.textViews;
            this.applyTextViews_();
            bindValue(config.colorMode, (mode) => {
                this.modeElem_.value = mode;
            });
        }
        get modeSelectElement() {
            return this.modeElem_;
        }
        get textViews() {
            return this.textViews_;
        }
        set textViews(textViews) {
            this.textViews_ = textViews;
            this.applyTextViews_();
        }
        applyTextViews_() {
            removeChildElements(this.textsElem_);
            const doc = this.element.ownerDocument;
            this.textViews_.forEach((v) => {
                const compElem = doc.createElement('div');
                compElem.classList.add(className$9('c'));
                compElem.appendChild(v.element);
                this.textsElem_.appendChild(compElem);
            });
        }
    }

    function createFormatter$2(type) {
        return createNumberFormatter(type === 'float' ? 2 : 0);
    }
    function createConstraint$5(mode, type, index) {
        const max = getColorMaxComponents(mode, type)[index];
        return new DefiniteRangeConstraint({
            min: 0,
            max: max,
        });
    }
    function createComponentController(doc, config, index) {
        return new NumberTextController(doc, {
            arrayPosition: index === 0 ? 'fst' : index === 3 - 1 ? 'lst' : 'mid',
            baseStep: getBaseStepForColor(false),
            parser: config.parser,
            props: ValueMap.fromObject({
                draggingScale: config.colorType === 'float' ? 0.01 : 1,
                formatter: createFormatter$2(config.colorType),
            }),
            value: createValue(0, {
                constraint: createConstraint$5(config.colorMode, config.colorType, index),
            }),
            viewProps: config.viewProps,
        });
    }
    class ColorTextController {
        constructor(doc, config) {
            this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
            this.colorType_ = config.colorType;
            this.parser_ = config.parser;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.colorMode = createValue(this.value.rawValue.mode);
            this.ccs_ = this.createComponentControllers_(doc);
            this.view = new ColorTextView(doc, {
                colorMode: this.colorMode,
                textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
            });
            this.view.modeSelectElement.addEventListener('change', this.onModeSelectChange_);
        }
        createComponentControllers_(doc) {
            const cc = {
                colorMode: this.colorMode.rawValue,
                colorType: this.colorType_,
                parser: this.parser_,
                viewProps: this.viewProps,
            };
            const ccs = [
                createComponentController(doc, cc, 0),
                createComponentController(doc, cc, 1),
                createComponentController(doc, cc, 2),
            ];
            ccs.forEach((cs, index) => {
                connectValues({
                    primary: this.value,
                    secondary: cs.value,
                    forward: (p) => {
                        return p.rawValue.getComponents(this.colorMode.rawValue, this.colorType_)[index];
                    },
                    backward: (p, s) => {
                        const pickedMode = this.colorMode.rawValue;
                        const comps = p.rawValue.getComponents(pickedMode, this.colorType_);
                        comps[index] = s.rawValue;
                        return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode, this.colorType_);
                    },
                });
            });
            return ccs;
        }
        onModeSelectChange_(ev) {
            const selectElem = ev.currentTarget;
            this.colorMode.rawValue = selectElem.value;
            this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
            this.view.textViews = [
                this.ccs_[0].view,
                this.ccs_[1].view,
                this.ccs_[2].view,
            ];
        }
    }

    const className$8 = ClassName('hpl');
    class HPaletteView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$8());
            config.viewProps.bindTabIndex(this.element);
            const colorElem = doc.createElement('div');
            colorElem.classList.add(className$8('c'));
            this.element.appendChild(colorElem);
            const markerElem = doc.createElement('div');
            markerElem.classList.add(className$8('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
        }
        update_() {
            const c = this.value.rawValue;
            const [h] = c.getComponents('hsv');
            this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([h, 100, 100], 'hsv'));
            const left = mapRange(h, 0, 360, 0, 100);
            this.markerElem_.style.left = `${left}%`;
        }
        onValueChange_() {
            this.update_();
        }
    }

    class HPaletteController {
        constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new HPaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
            if (!d.point) {
                return;
            }
            const hue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, 0, 360);
            const c = this.value.rawValue;
            const [, s, v, a] = c.getComponents('hsv');
            this.value.setRawValue(new Color([hue, s, v, a], 'hsv'), opts);
        }
        onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: true,
                last: true,
            });
        }
        onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents('hsv');
            this.value.setRawValue(new Color([h + step, s, v, a], 'hsv'), {
                forceEmit: false,
                last: false,
            });
        }
        onKeyUp_(ev) {
            const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            if (step === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
    }

    const className$7 = ClassName('svp');
    const CANVAS_RESOL = 64;
    class SvPaletteView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$7());
            config.viewProps.bindTabIndex(this.element);
            const canvasElem = doc.createElement('canvas');
            canvasElem.height = CANVAS_RESOL;
            canvasElem.width = CANVAS_RESOL;
            canvasElem.classList.add(className$7('c'));
            this.element.appendChild(canvasElem);
            this.canvasElement = canvasElem;
            const markerElem = doc.createElement('div');
            markerElem.classList.add(className$7('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
        }
        update_() {
            const ctx = getCanvasContext(this.canvasElement);
            if (!ctx) {
                return;
            }
            const c = this.value.rawValue;
            const hsvComps = c.getComponents('hsv');
            const width = this.canvasElement.width;
            const height = this.canvasElement.height;
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;
            for (let iy = 0; iy < height; iy++) {
                for (let ix = 0; ix < width; ix++) {
                    const s = mapRange(ix, 0, width, 0, 100);
                    const v = mapRange(iy, 0, height, 100, 0);
                    const rgbComps = hsvToRgbInt(hsvComps[0], s, v);
                    const i = (iy * width + ix) * 4;
                    data[i] = rgbComps[0];
                    data[i + 1] = rgbComps[1];
                    data[i + 2] = rgbComps[2];
                    data[i + 3] = 255;
                }
            }
            ctx.putImageData(imgData, 0, 0);
            const left = mapRange(hsvComps[1], 0, 100, 0, 100);
            this.markerElem_.style.left = `${left}%`;
            const top = mapRange(hsvComps[2], 0, 100, 100, 0);
            this.markerElem_.style.top = `${top}%`;
        }
        onValueChange_() {
            this.update_();
        }
    }

    class SvPaletteController {
        constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SvPaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
            if (!d.point) {
                return;
            }
            const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
            const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
            const [h, , , a] = this.value.rawValue.getComponents('hsv');
            this.value.setRawValue(new Color([h, saturation, value, a], 'hsv'), opts);
        }
        onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: true,
                last: true,
            });
        }
        onKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
                ev.preventDefault();
            }
            const [h, s, v, a] = this.value.rawValue.getComponents('hsv');
            const baseStep = getBaseStepForColor(false);
            const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
            const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
            if (ds === 0 && dv === 0) {
                return;
            }
            this.value.setRawValue(new Color([h, s + ds, v + dv, a], 'hsv'), {
                forceEmit: false,
                last: false,
            });
        }
        onKeyUp_(ev) {
            const baseStep = getBaseStepForColor(false);
            const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
            const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
            if (ds === 0 && dv === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
    }

    class ColorPickerController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.hPaletteC_ = new HPaletteController(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.svPaletteC_ = new SvPaletteController(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            this.alphaIcs_ = config.supportsAlpha
                ? {
                    palette: new APaletteController(doc, {
                        value: this.value,
                        viewProps: this.viewProps,
                    }),
                    text: new NumberTextController(doc, {
                        parser: parseNumber,
                        baseStep: 0.1,
                        props: ValueMap.fromObject({
                            draggingScale: 0.01,
                            formatter: createNumberFormatter(2),
                        }),
                        value: createValue(0, {
                            constraint: new DefiniteRangeConstraint({ min: 0, max: 1 }),
                        }),
                        viewProps: this.viewProps,
                    }),
                }
                : null;
            if (this.alphaIcs_) {
                connectValues({
                    primary: this.value,
                    secondary: this.alphaIcs_.text.value,
                    forward: (p) => {
                        return p.rawValue.getComponents()[3];
                    },
                    backward: (p, s) => {
                        const comps = p.rawValue.getComponents();
                        comps[3] = s.rawValue;
                        return new Color(comps, p.rawValue.mode);
                    },
                });
            }
            this.textC_ = new ColorTextController(doc, {
                colorType: config.colorType,
                parser: parseNumber,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view = new ColorPickerView(doc, {
                alphaViews: this.alphaIcs_
                    ? {
                        palette: this.alphaIcs_.palette.view,
                        text: this.alphaIcs_.text.view,
                    }
                    : null,
                hPaletteView: this.hPaletteC_.view,
                supportsAlpha: config.supportsAlpha,
                svPaletteView: this.svPaletteC_.view,
                textView: this.textC_.view,
            });
        }
        get textController() {
            return this.textC_;
        }
    }

    const className$6 = ClassName('colsw');
    class ColorSwatchView {
        constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.element = doc.createElement('div');
            this.element.classList.add(className$6());
            config.viewProps.bindClassModifiers(this.element);
            const swatchElem = doc.createElement('div');
            swatchElem.classList.add(className$6('sw'));
            this.element.appendChild(swatchElem);
            this.swatchElem_ = swatchElem;
            const buttonElem = doc.createElement('button');
            buttonElem.classList.add(className$6('b'));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            this.update_();
        }
        update_() {
            const value = this.value.rawValue;
            this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
        }
        onValueChange_() {
            this.update_();
        }
    }

    class ColorSwatchController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ColorSwatchView(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
        }
    }

    class ColorController {
        constructor(doc, config) {
            this.onButtonBlur_ = this.onButtonBlur_.bind(this);
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.swatchC_ = new ColorSwatchController(doc, {
                value: this.value,
                viewProps: this.viewProps,
            });
            const buttonElem = this.swatchC_.view.buttonElement;
            buttonElem.addEventListener('blur', this.onButtonBlur_);
            buttonElem.addEventListener('click', this.onButtonClick_);
            this.textC_ = new TextController(doc, {
                parser: config.parser,
                props: ValueMap.fromObject({
                    formatter: config.formatter,
                }),
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view = new ColorView(doc, {
                foldable: this.foldable_,
                pickerLayout: config.pickerLayout,
            });
            this.view.swatchElement.appendChild(this.swatchC_.view.element);
            this.view.textElement.appendChild(this.textC_.view.element);
            this.popC_ =
                config.pickerLayout === 'popup'
                    ? new PopupController(doc, {
                        viewProps: this.viewProps,
                    })
                    : null;
            const pickerC = new ColorPickerController(doc, {
                colorType: config.colorType,
                supportsAlpha: config.supportsAlpha,
                value: this.value,
                viewProps: this.viewProps,
            });
            pickerC.view.allFocusableElements.forEach((elem) => {
                elem.addEventListener('blur', this.onPopupChildBlur_);
                elem.addEventListener('keydown', this.onPopupChildKeydown_);
            });
            this.pickerC_ = pickerC;
            if (this.popC_) {
                this.view.element.appendChild(this.popC_.view.element);
                this.popC_.view.element.appendChild(pickerC.view.element);
                connectValues({
                    primary: this.foldable_.value('expanded'),
                    secondary: this.popC_.shows,
                    forward: (p) => p.rawValue,
                    backward: (_, s) => s.rawValue,
                });
            }
            else if (this.view.pickerElement) {
                this.view.pickerElement.appendChild(this.pickerC_.view.element);
                bindFoldable(this.foldable_, this.view.pickerElement);
            }
        }
        get textController() {
            return this.textC_;
        }
        onButtonBlur_(e) {
            if (!this.popC_) {
                return;
            }
            const elem = this.view.element;
            const nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
                this.popC_.shows.rawValue = false;
            }
        }
        onButtonClick_() {
            this.foldable_.set('expanded', !this.foldable_.get('expanded'));
            if (this.foldable_.get('expanded')) {
                this.pickerC_.view.allFocusableElements[0].focus();
            }
        }
        onPopupChildBlur_(ev) {
            if (!this.popC_) {
                return;
            }
            const elem = this.popC_.view.element;
            const nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
                return;
            }
            if (nextTarget &&
                nextTarget === this.swatchC_.view.buttonElement &&
                !supportsTouch(elem.ownerDocument)) {
                return;
            }
            this.popC_.shows.rawValue = false;
        }
        onPopupChildKeydown_(ev) {
            if (this.popC_) {
                if (ev.key === 'Escape') {
                    this.popC_.shows.rawValue = false;
                }
            }
            else if (this.view.pickerElement) {
                if (ev.key === 'Escape') {
                    this.swatchC_.view.buttonElement.focus();
                }
            }
        }
    }

    function colorFromObject(value, opt_type) {
        if (Color.isColorObject(value)) {
            return Color.fromObject(value, opt_type);
        }
        return Color.black(opt_type);
    }
    function colorToRgbNumber(value) {
        return removeAlphaComponent(value.getComponents('rgb')).reduce((result, comp) => {
            return (result << 8) | (Math.floor(comp) & 0xff);
        }, 0);
    }
    function colorToRgbaNumber(value) {
        return (value.getComponents('rgb').reduce((result, comp, index) => {
            const hex = Math.floor(index === 3 ? comp * 255 : comp) & 0xff;
            return (result << 8) | hex;
        }, 0) >>> 0);
    }
    function numberToRgbColor(num) {
        return new Color([(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff], 'rgb');
    }
    function numberToRgbaColor(num) {
        return new Color([
            (num >> 24) & 0xff,
            (num >> 16) & 0xff,
            (num >> 8) & 0xff,
            mapRange(num & 0xff, 0, 255, 0, 1),
        ], 'rgb');
    }
    function colorFromRgbNumber(value) {
        if (typeof value !== 'number') {
            return Color.black();
        }
        return numberToRgbColor(value);
    }
    function colorFromRgbaNumber(value) {
        if (typeof value !== 'number') {
            return Color.black();
        }
        return numberToRgbaColor(value);
    }

    function createColorStringWriter(format) {
        const stringify = findColorStringifier(format);
        return stringify
            ? (target, value) => {
                writePrimitive(target, stringify(value));
            }
            : null;
    }
    function createColorNumberWriter(supportsAlpha) {
        const colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
        return (target, value) => {
            writePrimitive(target, colorToNumber(value));
        };
    }
    function writeRgbaColorObject(target, value, opt_type) {
        const obj = value.toRgbaObject(opt_type);
        target.writeProperty('r', obj.r);
        target.writeProperty('g', obj.g);
        target.writeProperty('b', obj.b);
        target.writeProperty('a', obj.a);
    }
    function writeRgbColorObject(target, value, opt_type) {
        const obj = value.toRgbaObject(opt_type);
        target.writeProperty('r', obj.r);
        target.writeProperty('g', obj.g);
        target.writeProperty('b', obj.b);
    }
    function createColorObjectWriter(supportsAlpha, opt_type) {
        return (target, inValue) => {
            if (supportsAlpha) {
                writeRgbaColorObject(target, inValue, opt_type);
            }
            else {
                writeRgbColorObject(target, inValue, opt_type);
            }
        };
    }

    function shouldSupportAlpha$1(inputParams) {
        var _a;
        if ((inputParams === null || inputParams === void 0 ? void 0 : inputParams.alpha) || ((_a = inputParams === null || inputParams === void 0 ? void 0 : inputParams.color) === null || _a === void 0 ? void 0 : _a.alpha)) {
            return true;
        }
        return false;
    }
    function createFormatter$1(supportsAlpha) {
        return supportsAlpha
            ? (v) => colorToHexRgbaString(v, '0x')
            : (v) => colorToHexRgbString(v, '0x');
    }
    function isForColor(params) {
        if ('color' in params) {
            return true;
        }
        if ('view' in params && params.view === 'color') {
            return true;
        }
        return false;
    }
    const NumberColorInputPlugin = {
        id: 'input-color-number',
        type: 'input',
        accept: (value, params) => {
            if (typeof value !== 'number') {
                return null;
            }
            if (!isForColor(params)) {
                return null;
            }
            const result = parseColorInputParams(params);
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (args) => {
                return shouldSupportAlpha$1(args.params)
                    ? colorFromRgbaNumber
                    : colorFromRgbNumber;
            },
            equals: Color.equals,
            writer: (args) => {
                return createColorNumberWriter(shouldSupportAlpha$1(args.params));
            },
        },
        controller: (args) => {
            const supportsAlpha = shouldSupportAlpha$1(args.params);
            const expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            const picker = 'picker' in args.params ? args.params.picker : undefined;
            return new ColorController(args.document, {
                colorType: 'int',
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: createFormatter$1(supportsAlpha),
                parser: createColorStringParser('int'),
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: supportsAlpha,
                value: args.value,
                viewProps: args.viewProps,
            });
        },
    };

    function shouldSupportAlpha(initialValue) {
        return Color.isRgbaColorObject(initialValue);
    }
    function createColorObjectReader(opt_type) {
        return (value) => {
            return colorFromObject(value, opt_type);
        };
    }
    function createColorObjectFormatter(supportsAlpha, type) {
        return (value) => {
            if (supportsAlpha) {
                return colorToObjectRgbaString(value, type);
            }
            return colorToObjectRgbString(value, type);
        };
    }
    const ObjectColorInputPlugin = {
        id: 'input-color-object',
        type: 'input',
        accept: (value, params) => {
            if (!Color.isColorObject(value)) {
                return null;
            }
            const result = parseColorInputParams(params);
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (args) => createColorObjectReader(extractColorType(args.params)),
            equals: Color.equals,
            writer: (args) => createColorObjectWriter(shouldSupportAlpha(args.initialValue), extractColorType(args.params)),
        },
        controller: (args) => {
            var _a;
            const supportsAlpha = Color.isRgbaColorObject(args.initialValue);
            const expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            const picker = 'picker' in args.params ? args.params.picker : undefined;
            const type = (_a = extractColorType(args.params)) !== null && _a !== void 0 ? _a : 'int';
            return new ColorController(args.document, {
                colorType: type,
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: createColorObjectFormatter(supportsAlpha, type),
                parser: createColorStringParser(type),
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: supportsAlpha,
                value: args.value,
                viewProps: args.viewProps,
            });
        },
    };

    const StringColorInputPlugin = {
        id: 'input-color-string',
        type: 'input',
        accept: (value, params) => {
            if (typeof value !== 'string') {
                return null;
            }
            if ('view' in params && params.view === 'text') {
                return null;
            }
            const format = detectStringColorFormat(value, extractColorType(params));
            if (!format) {
                return null;
            }
            const stringifier = findColorStringifier(format);
            if (!stringifier) {
                return null;
            }
            const result = parseColorInputParams(params);
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (args) => { var _a; return createColorStringBindingReader((_a = extractColorType(args.params)) !== null && _a !== void 0 ? _a : 'int'); },
            equals: Color.equals,
            writer: (args) => {
                const format = detectStringColorFormat(args.initialValue, extractColorType(args.params));
                if (!format) {
                    throw TpError.shouldNeverHappen();
                }
                const writer = createColorStringWriter(format);
                if (!writer) {
                    throw TpError.notBindable();
                }
                return writer;
            },
        },
        controller: (args) => {
            const format = detectStringColorFormat(args.initialValue, extractColorType(args.params));
            if (!format) {
                throw TpError.shouldNeverHappen();
            }
            const stringifier = findColorStringifier(format);
            if (!stringifier) {
                throw TpError.shouldNeverHappen();
            }
            const expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            const picker = 'picker' in args.params ? args.params.picker : undefined;
            return new ColorController(args.document, {
                colorType: format.type,
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: stringifier,
                parser: createColorStringParser(format.type),
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: format.alpha,
                value: args.value,
                viewProps: args.viewProps,
            });
        },
    };

    class PointNdConstraint {
        constructor(config) {
            this.components = config.components;
            this.asm_ = config.assembly;
        }
        constrain(value) {
            const comps = this.asm_
                .toComponents(value)
                .map((comp, index) => { var _a, _b; return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp; });
            return this.asm_.fromComponents(comps);
        }
    }

    const className$5 = ClassName('pndtxt');
    class PointNdTextView {
        constructor(doc, config) {
            this.textViews = config.textViews;
            this.element = doc.createElement('div');
            this.element.classList.add(className$5());
            this.textViews.forEach((v) => {
                const axisElem = doc.createElement('div');
                axisElem.classList.add(className$5('a'));
                axisElem.appendChild(v.element);
                this.element.appendChild(axisElem);
            });
        }
    }

    function createAxisController(doc, config, index) {
        return new NumberTextController(doc, {
            arrayPosition: index === 0 ? 'fst' : index === config.axes.length - 1 ? 'lst' : 'mid',
            baseStep: config.axes[index].baseStep,
            parser: config.parser,
            props: config.axes[index].textProps,
            value: createValue(0, {
                constraint: config.axes[index].constraint,
            }),
            viewProps: config.viewProps,
        });
    }
    class PointNdTextController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
            this.acs_.forEach((c, index) => {
                connectValues({
                    primary: this.value,
                    secondary: c.value,
                    forward: (p) => {
                        return config.assembly.toComponents(p.rawValue)[index];
                    },
                    backward: (p, s) => {
                        const comps = config.assembly.toComponents(p.rawValue);
                        comps[index] = s.rawValue;
                        return config.assembly.fromComponents(comps);
                    },
                });
            });
            this.view = new PointNdTextView(doc, {
                textViews: this.acs_.map((ac) => ac.view),
            });
        }
    }

    function createStepConstraint(params, initialValue) {
        if ('step' in params && !isEmpty(params.step)) {
            return new StepConstraint(params.step, initialValue);
        }
        return null;
    }
    function createRangeConstraint(params) {
        if (!isEmpty(params.max) && !isEmpty(params.min)) {
            return new DefiniteRangeConstraint({
                max: params.max,
                min: params.min,
            });
        }
        if (!isEmpty(params.max) || !isEmpty(params.min)) {
            return new RangeConstraint({
                max: params.max,
                min: params.min,
            });
        }
        return null;
    }
    function findNumberRange(c) {
        const drc = findConstraint(c, DefiniteRangeConstraint);
        if (drc) {
            return [drc.values.get('min'), drc.values.get('max')];
        }
        const rc = findConstraint(c, RangeConstraint);
        if (rc) {
            return [rc.minValue, rc.maxValue];
        }
        return [undefined, undefined];
    }
    function createConstraint$4(params,
    initialValue) {
        const constraints = [];
        const sc = createStepConstraint(params, initialValue);
        if (sc) {
            constraints.push(sc);
        }
        const rc = createRangeConstraint(params);
        if (rc) {
            constraints.push(rc);
        }
        const lc = createListConstraint(params.options);
        if (lc) {
            constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
    }
    const NumberInputPlugin = {
        id: 'input-number',
        type: 'input',
        accept: (value, params) => {
            if (typeof value !== 'number') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                format: p.optional.function,
                max: p.optional.number,
                min: p.optional.number,
                options: p.optional.custom(parseListOptions),
                step: p.optional.number,
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => numberFromUnknown,
            constraint: (args) => createConstraint$4(args.params, args.initialValue),
            writer: (_args) => writePrimitive,
        },
        controller: (args) => {
            var _a;
            const value = args.value;
            const c = args.constraint;
            const lc = c && findConstraint(c, ListConstraint);
            if (lc) {
                return new ListController(args.document, {
                    props: new ValueMap({
                        options: lc.values.value('options'),
                    }),
                    value: value,
                    viewProps: args.viewProps,
                });
            }
            const formatter = (_a = ('format' in args.params ? args.params.format : undefined)) !== null && _a !== void 0 ? _a : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
            const drc = c && findConstraint(c, DefiniteRangeConstraint);
            if (drc) {
                return new SliderTextController(args.document, {
                    baseStep: getBaseStep(c),
                    parser: parseNumber,
                    sliderProps: new ValueMap({
                        maxValue: drc.values.value('max'),
                        minValue: drc.values.value('min'),
                    }),
                    textProps: ValueMap.fromObject({
                        draggingScale: getSuitableDraggingScale(c, value.rawValue),
                        formatter: formatter,
                    }),
                    value: value,
                    viewProps: args.viewProps,
                });
            }
            return new NumberTextController(args.document, {
                baseStep: getBaseStep(c),
                parser: parseNumber,
                props: ValueMap.fromObject({
                    draggingScale: getSuitableDraggingScale(c, value.rawValue),
                    formatter: formatter,
                }),
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    class Point2d {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        getComponents() {
            return [this.x, this.y];
        }
        static isObject(obj) {
            if (isEmpty(obj)) {
                return false;
            }
            const x = obj.x;
            const y = obj.y;
            if (typeof x !== 'number' || typeof y !== 'number') {
                return false;
            }
            return true;
        }
        static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y;
        }
        toObject() {
            return {
                x: this.x,
                y: this.y,
            };
        }
    }
    const Point2dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point2d(...comps),
    };

    const className$4 = ClassName('p2d');
    class Point2dView {
        constructor(doc, config) {
            this.element = doc.createElement('div');
            this.element.classList.add(className$4());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.expanded, valueToClassName(this.element, className$4(undefined, 'expanded')));
            const headElem = doc.createElement('div');
            headElem.classList.add(className$4('h'));
            this.element.appendChild(headElem);
            const buttonElem = doc.createElement('button');
            buttonElem.classList.add(className$4('b'));
            buttonElem.appendChild(createSvgIconElement(doc, 'p2dpad'));
            config.viewProps.bindDisabled(buttonElem);
            headElem.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const textElem = doc.createElement('div');
            textElem.classList.add(className$4('t'));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === 'inline') {
                const pickerElem = doc.createElement('div');
                pickerElem.classList.add(className$4('p'));
                this.element.appendChild(pickerElem);
                this.pickerElement = pickerElem;
            }
            else {
                this.pickerElement = null;
            }
        }
    }

    const className$3 = ClassName('p2dp');
    class Point2dPickerView {
        constructor(doc, config) {
            this.onFoldableChange_ = this.onFoldableChange_.bind(this);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.invertsY_ = config.invertsY;
            this.maxValue_ = config.maxValue;
            this.element = doc.createElement('div');
            this.element.classList.add(className$3());
            if (config.layout === 'popup') {
                this.element.classList.add(className$3(undefined, 'p'));
            }
            const padElem = doc.createElement('div');
            padElem.classList.add(className$3('p'));
            config.viewProps.bindTabIndex(padElem);
            this.element.appendChild(padElem);
            this.padElement = padElem;
            const svgElem = doc.createElementNS(SVG_NS, 'svg');
            svgElem.classList.add(className$3('g'));
            this.padElement.appendChild(svgElem);
            this.svgElem_ = svgElem;
            const xAxisElem = doc.createElementNS(SVG_NS, 'line');
            xAxisElem.classList.add(className$3('ax'));
            xAxisElem.setAttributeNS(null, 'x1', '0');
            xAxisElem.setAttributeNS(null, 'y1', '50%');
            xAxisElem.setAttributeNS(null, 'x2', '100%');
            xAxisElem.setAttributeNS(null, 'y2', '50%');
            this.svgElem_.appendChild(xAxisElem);
            const yAxisElem = doc.createElementNS(SVG_NS, 'line');
            yAxisElem.classList.add(className$3('ax'));
            yAxisElem.setAttributeNS(null, 'x1', '50%');
            yAxisElem.setAttributeNS(null, 'y1', '0');
            yAxisElem.setAttributeNS(null, 'x2', '50%');
            yAxisElem.setAttributeNS(null, 'y2', '100%');
            this.svgElem_.appendChild(yAxisElem);
            const lineElem = doc.createElementNS(SVG_NS, 'line');
            lineElem.classList.add(className$3('l'));
            lineElem.setAttributeNS(null, 'x1', '50%');
            lineElem.setAttributeNS(null, 'y1', '50%');
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            const markerElem = doc.createElement('div');
            markerElem.classList.add(className$3('m'));
            this.padElement.appendChild(markerElem);
            this.markerElem_ = markerElem;
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.update_();
        }
        get allFocusableElements() {
            return [this.padElement];
        }
        update_() {
            const [x, y] = this.value.rawValue.getComponents();
            const max = this.maxValue_;
            const px = mapRange(x, -max, +max, 0, 100);
            const py = mapRange(y, -max, +max, 0, 100);
            const ipy = this.invertsY_ ? 100 - py : py;
            this.lineElem_.setAttributeNS(null, 'x2', `${px}%`);
            this.lineElem_.setAttributeNS(null, 'y2', `${ipy}%`);
            this.markerElem_.style.left = `${px}%`;
            this.markerElem_.style.top = `${ipy}%`;
        }
        onValueChange_() {
            this.update_();
        }
        onFoldableChange_() {
            this.update_();
        }
    }

    function computeOffset(ev, baseSteps, invertsY) {
        return [
            getStepForKey(baseSteps[0], getHorizontalStepKeys(ev)),
            getStepForKey(baseSteps[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1),
        ];
    }
    class Point2dPickerController {
        constructor(doc, config) {
            this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
            this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.baseSteps_ = config.baseSteps;
            this.maxValue_ = config.maxValue;
            this.invertsY_ = config.invertsY;
            this.view = new Point2dPickerView(doc, {
                invertsY: this.invertsY_,
                layout: config.layout,
                maxValue: this.maxValue_,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.ptHandler_ = new PointerHandler(this.view.padElement);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.padElement.addEventListener('keydown', this.onPadKeyDown_);
            this.view.padElement.addEventListener('keyup', this.onPadKeyUp_);
        }
        handlePointerEvent_(d, opts) {
            if (!d.point) {
                return;
            }
            const max = this.maxValue_;
            const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
            const py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
            this.value.setRawValue(new Point2d(px, py), opts);
        }
        onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: false,
                last: false,
            });
        }
        onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
                forceEmit: true,
                last: true,
            });
        }
        onPadKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
                ev.preventDefault();
            }
            const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
            if (dx === 0 && dy === 0) {
                return;
            }
            this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
                forceEmit: false,
                last: false,
            });
        }
        onPadKeyUp_(ev) {
            const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
            if (dx === 0 && dy === 0) {
                return;
            }
            this.value.setRawValue(this.value.rawValue, {
                forceEmit: true,
                last: true,
            });
        }
    }

    class Point2dController {
        constructor(doc, config) {
            var _a, _b;
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
            this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.popC_ =
                config.pickerLayout === 'popup'
                    ? new PopupController(doc, {
                        viewProps: this.viewProps,
                    })
                    : null;
            const padC = new Point2dPickerController(doc, {
                baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
                invertsY: config.invertsY,
                layout: config.pickerLayout,
                maxValue: config.maxValue,
                value: this.value,
                viewProps: this.viewProps,
            });
            padC.view.allFocusableElements.forEach((elem) => {
                elem.addEventListener('blur', this.onPopupChildBlur_);
                elem.addEventListener('keydown', this.onPopupChildKeydown_);
            });
            this.pickerC_ = padC;
            this.textC_ = new PointNdTextController(doc, {
                assembly: Point2dAssembly,
                axes: config.axes,
                parser: config.parser,
                value: this.value,
                viewProps: this.viewProps,
            });
            this.view = new Point2dView(doc, {
                expanded: this.foldable_.value('expanded'),
                pickerLayout: config.pickerLayout,
                viewProps: this.viewProps,
            });
            this.view.textElement.appendChild(this.textC_.view.element);
            (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', this.onPadButtonBlur_);
            (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.onPadButtonClick_);
            if (this.popC_) {
                this.view.element.appendChild(this.popC_.view.element);
                this.popC_.view.element.appendChild(this.pickerC_.view.element);
                connectValues({
                    primary: this.foldable_.value('expanded'),
                    secondary: this.popC_.shows,
                    forward: (p) => p.rawValue,
                    backward: (_, s) => s.rawValue,
                });
            }
            else if (this.view.pickerElement) {
                this.view.pickerElement.appendChild(this.pickerC_.view.element);
                bindFoldable(this.foldable_, this.view.pickerElement);
            }
        }
        onPadButtonBlur_(e) {
            if (!this.popC_) {
                return;
            }
            const elem = this.view.element;
            const nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
                this.popC_.shows.rawValue = false;
            }
        }
        onPadButtonClick_() {
            this.foldable_.set('expanded', !this.foldable_.get('expanded'));
            if (this.foldable_.get('expanded')) {
                this.pickerC_.view.allFocusableElements[0].focus();
            }
        }
        onPopupChildBlur_(ev) {
            if (!this.popC_) {
                return;
            }
            const elem = this.popC_.view.element;
            const nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
                return;
            }
            if (nextTarget &&
                nextTarget === this.view.buttonElement &&
                !supportsTouch(elem.ownerDocument)) {
                return;
            }
            this.popC_.shows.rawValue = false;
        }
        onPopupChildKeydown_(ev) {
            if (this.popC_) {
                if (ev.key === 'Escape') {
                    this.popC_.shows.rawValue = false;
                }
            }
            else if (this.view.pickerElement) {
                if (ev.key === 'Escape') {
                    this.view.buttonElement.focus();
                }
            }
        }
    }

    class Point3d {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        getComponents() {
            return [this.x, this.y, this.z];
        }
        static isObject(obj) {
            if (isEmpty(obj)) {
                return false;
            }
            const x = obj.x;
            const y = obj.y;
            const z = obj.z;
            if (typeof x !== 'number' ||
                typeof y !== 'number' ||
                typeof z !== 'number') {
                return false;
            }
            return true;
        }
        static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
        }
        toObject() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
            };
        }
    }
    const Point3dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point3d(...comps),
    };

    function point3dFromUnknown(value) {
        return Point3d.isObject(value)
            ? new Point3d(value.x, value.y, value.z)
            : new Point3d();
    }
    function writePoint3d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
        target.writeProperty('z', value.z);
    }

    function createConstraint$3(params, initialValue) {
        return new PointNdConstraint({
            assembly: Point3dAssembly,
            components: [
                createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x),
                createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y),
                createDimensionConstraint('z' in params ? params.z : undefined, initialValue.z),
            ],
        });
    }
    function createAxis$2(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue)),
            }),
        };
    }
    const Point3dInputPlugin = {
        id: 'input-point3d',
        type: 'input',
        accept: (value, params) => {
            if (!Point3d.isObject(value)) {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.custom(parsePointDimensionParams),
                z: p.optional.custom(parsePointDimensionParams),
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => point3dFromUnknown,
            constraint: (args) => createConstraint$3(args.params, args.initialValue),
            equals: Point3d.equals,
            writer: (_args) => writePoint3d,
        },
        controller: (args) => {
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
                throw TpError.shouldNeverHappen();
            }
            return new PointNdTextController(args.document, {
                assembly: Point3dAssembly,
                axes: [
                    createAxis$2(value.rawValue.x, c.components[0]),
                    createAxis$2(value.rawValue.y, c.components[1]),
                    createAxis$2(value.rawValue.z, c.components[2]),
                ],
                parser: parseNumber,
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    class Point4d {
        constructor(x = 0, y = 0, z = 0, w = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        getComponents() {
            return [this.x, this.y, this.z, this.w];
        }
        static isObject(obj) {
            if (isEmpty(obj)) {
                return false;
            }
            const x = obj.x;
            const y = obj.y;
            const z = obj.z;
            const w = obj.w;
            if (typeof x !== 'number' ||
                typeof y !== 'number' ||
                typeof z !== 'number' ||
                typeof w !== 'number') {
                return false;
            }
            return true;
        }
        static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
        }
        toObject() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                w: this.w,
            };
        }
    }
    const Point4dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point4d(...comps),
    };

    function point4dFromUnknown(value) {
        return Point4d.isObject(value)
            ? new Point4d(value.x, value.y, value.z, value.w)
            : new Point4d();
    }
    function writePoint4d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
        target.writeProperty('z', value.z);
        target.writeProperty('w', value.w);
    }

    function createConstraint$2(params, initialValue) {
        return new PointNdConstraint({
            assembly: Point4dAssembly,
            components: [
                createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x),
                createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y),
                createDimensionConstraint('z' in params ? params.z : undefined, initialValue.z),
                createDimensionConstraint('w' in params ? params.w : undefined, initialValue.w),
            ],
        });
    }
    function createAxis$1(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue)),
            }),
        };
    }
    const Point4dInputPlugin = {
        id: 'input-point4d',
        type: 'input',
        accept: (value, params) => {
            if (!Point4d.isObject(value)) {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.custom(parsePointDimensionParams),
                z: p.optional.custom(parsePointDimensionParams),
                w: p.optional.custom(parsePointDimensionParams),
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => point4dFromUnknown,
            constraint: (args) => createConstraint$2(args.params, args.initialValue),
            equals: Point4d.equals,
            writer: (_args) => writePoint4d,
        },
        controller: (args) => {
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
                throw TpError.shouldNeverHappen();
            }
            return new PointNdTextController(args.document, {
                assembly: Point4dAssembly,
                axes: value.rawValue
                    .getComponents()
                    .map((comp, index) => createAxis$1(comp, c.components[index])),
                parser: parseNumber,
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    function createConstraint$1(params) {
        const constraints = [];
        const lc = createListConstraint(params.options);
        if (lc) {
            constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
    }
    const StringInputPlugin = {
        id: 'input-string',
        type: 'input',
        accept: (value, params) => {
            if (typeof value !== 'string') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                options: p.optional.custom(parseListOptions),
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => stringFromUnknown,
            constraint: (args) => createConstraint$1(args.params),
            writer: (_args) => writePrimitive,
        },
        controller: (args) => {
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            const lc = c && findConstraint(c, ListConstraint);
            if (lc) {
                return new ListController(doc, {
                    props: new ValueMap({
                        options: lc.values.value('options'),
                    }),
                    value: value,
                    viewProps: args.viewProps,
                });
            }
            return new TextController(doc, {
                parser: (v) => v,
                props: ValueMap.fromObject({
                    formatter: formatString,
                }),
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    const Constants = {
        monitor: {
            defaultInterval: 200,
            defaultLineCount: 3,
        },
    };

    const className$2 = ClassName('mll');
    class MultiLogView {
        constructor(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement('div');
            this.element.classList.add(className$2());
            config.viewProps.bindClassModifiers(this.element);
            const textareaElem = doc.createElement('textarea');
            textareaElem.classList.add(className$2('i'));
            textareaElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
            textareaElem.readOnly = true;
            config.viewProps.bindDisabled(textareaElem);
            this.element.appendChild(textareaElem);
            this.textareaElem_ = textareaElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        update_() {
            const elem = this.textareaElem_;
            const shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
            const lines = [];
            this.value.rawValue.forEach((value) => {
                if (value !== undefined) {
                    lines.push(this.formatter_(value));
                }
            });
            elem.textContent = lines.join('\n');
            if (shouldScroll) {
                elem.scrollTop = elem.scrollHeight;
            }
        }
        onValueUpdate_() {
            this.update_();
        }
    }

    class MultiLogController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new MultiLogView(doc, {
                formatter: config.formatter,
                lineCount: config.lineCount,
                value: this.value,
                viewProps: this.viewProps,
            });
        }
    }

    const className$1 = ClassName('sgl');
    class SingleLogView {
        constructor(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement('div');
            this.element.classList.add(className$1());
            config.viewProps.bindClassModifiers(this.element);
            const inputElem = doc.createElement('input');
            inputElem.classList.add(className$1('i'));
            inputElem.readOnly = true;
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        update_() {
            const values = this.value.rawValue;
            const lastValue = values[values.length - 1];
            this.inputElement.value =
                lastValue !== undefined ? this.formatter_(lastValue) : '';
        }
        onValueUpdate_() {
            this.update_();
        }
    }

    class SingleLogController {
        constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SingleLogView(doc, {
                formatter: config.formatter,
                value: this.value,
                viewProps: this.viewProps,
            });
        }
    }

    const BooleanMonitorPlugin = {
        id: 'monitor-bool',
        type: 'monitor',
        accept: (value, params) => {
            if (typeof value !== 'boolean') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                lineCount: p.optional.number,
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => boolFromUnknown,
        },
        controller: (args) => {
            var _a;
            if (args.value.rawValue.length === 1) {
                return new SingleLogController(args.document, {
                    formatter: BooleanFormatter,
                    value: args.value,
                    viewProps: args.viewProps,
                });
            }
            return new MultiLogController(args.document, {
                formatter: BooleanFormatter,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                value: args.value,
                viewProps: args.viewProps,
            });
        },
    };

    const className = ClassName('grl');
    class GraphLogView {
        constructor(doc, config) {
            this.onCursorChange_ = this.onCursorChange_.bind(this);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className());
            config.viewProps.bindClassModifiers(this.element);
            this.formatter_ = config.formatter;
            this.props_ = config.props;
            this.cursor_ = config.cursor;
            this.cursor_.emitter.on('change', this.onCursorChange_);
            const svgElem = doc.createElementNS(SVG_NS, 'svg');
            svgElem.classList.add(className('g'));
            svgElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
            this.element.appendChild(svgElem);
            this.svgElem_ = svgElem;
            const lineElem = doc.createElementNS(SVG_NS, 'polyline');
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            const tooltipElem = doc.createElement('div');
            tooltipElem.classList.add(className('t'), ClassName('tt')());
            this.element.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        get graphElement() {
            return this.svgElem_;
        }
        update_() {
            const bounds = this.svgElem_.getBoundingClientRect();
            const maxIndex = this.value.rawValue.length - 1;
            const min = this.props_.get('minValue');
            const max = this.props_.get('maxValue');
            const points = [];
            this.value.rawValue.forEach((v, index) => {
                if (v === undefined) {
                    return;
                }
                const x = mapRange(index, 0, maxIndex, 0, bounds.width);
                const y = mapRange(v, min, max, bounds.height, 0);
                points.push([x, y].join(','));
            });
            this.lineElem_.setAttributeNS(null, 'points', points.join(' '));
            const tooltipElem = this.tooltipElem_;
            const value = this.value.rawValue[this.cursor_.rawValue];
            if (value === undefined) {
                tooltipElem.classList.remove(className('t', 'a'));
                return;
            }
            const tx = mapRange(this.cursor_.rawValue, 0, maxIndex, 0, bounds.width);
            const ty = mapRange(value, min, max, bounds.height, 0);
            tooltipElem.style.left = `${tx}px`;
            tooltipElem.style.top = `${ty}px`;
            tooltipElem.textContent = `${this.formatter_(value)}`;
            if (!tooltipElem.classList.contains(className('t', 'a'))) {
                tooltipElem.classList.add(className('t', 'a'), className('t', 'in'));
                forceReflow(tooltipElem);
                tooltipElem.classList.remove(className('t', 'in'));
            }
        }
        onValueUpdate_() {
            this.update_();
        }
        onCursorChange_() {
            this.update_();
        }
    }

    class GraphLogController {
        constructor(doc, config) {
            this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
            this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
            this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
            this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
            this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
            this.props_ = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.cursor_ = createValue(-1);
            this.view = new GraphLogView(doc, {
                cursor: this.cursor_,
                formatter: config.formatter,
                lineCount: config.lineCount,
                props: this.props_,
                value: this.value,
                viewProps: this.viewProps,
            });
            if (!supportsTouch(doc)) {
                this.view.element.addEventListener('mousemove', this.onGraphMouseMove_);
                this.view.element.addEventListener('mouseleave', this.onGraphMouseLeave_);
            }
            else {
                const ph = new PointerHandler(this.view.element);
                ph.emitter.on('down', this.onGraphPointerDown_);
                ph.emitter.on('move', this.onGraphPointerMove_);
                ph.emitter.on('up', this.onGraphPointerUp_);
            }
        }
        onGraphMouseLeave_() {
            this.cursor_.rawValue = -1;
        }
        onGraphMouseMove_(ev) {
            const bounds = this.view.element.getBoundingClientRect();
            this.cursor_.rawValue = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerDown_(ev) {
            this.onGraphPointerMove_(ev);
        }
        onGraphPointerMove_(ev) {
            if (!ev.data.point) {
                this.cursor_.rawValue = -1;
                return;
            }
            this.cursor_.rawValue = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerUp_() {
            this.cursor_.rawValue = -1;
        }
    }

    function createFormatter(params) {
        return 'format' in params && !isEmpty(params.format)
            ? params.format
            : createNumberFormatter(2);
    }
    function createTextMonitor(args) {
        var _a;
        if (args.value.rawValue.length === 1) {
            return new SingleLogController(args.document, {
                formatter: createFormatter(args.params),
                value: args.value,
                viewProps: args.viewProps,
            });
        }
        return new MultiLogController(args.document, {
            formatter: createFormatter(args.params),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps,
        });
    }
    function createGraphMonitor(args) {
        var _a, _b, _c;
        return new GraphLogController(args.document, {
            formatter: createFormatter(args.params),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            props: ValueMap.fromObject({
                maxValue: (_b = ('max' in args.params ? args.params.max : null)) !== null && _b !== void 0 ? _b : 100,
                minValue: (_c = ('min' in args.params ? args.params.min : null)) !== null && _c !== void 0 ? _c : 0,
            }),
            value: args.value,
            viewProps: args.viewProps,
        });
    }
    function shouldShowGraph(params) {
        return 'view' in params && params.view === 'graph';
    }
    const NumberMonitorPlugin = {
        id: 'monitor-number',
        type: 'monitor',
        accept: (value, params) => {
            if (typeof value !== 'number') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                format: p.optional.function,
                lineCount: p.optional.number,
                max: p.optional.number,
                min: p.optional.number,
                view: p.optional.string,
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            defaultBufferSize: (params) => (shouldShowGraph(params) ? 64 : 1),
            reader: (_args) => numberFromUnknown,
        },
        controller: (args) => {
            if (shouldShowGraph(args.params)) {
                return createGraphMonitor(args);
            }
            return createTextMonitor(args);
        },
    };

    const StringMonitorPlugin = {
        id: 'monitor-string',
        type: 'monitor',
        accept: (value, params) => {
            if (typeof value !== 'string') {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                lineCount: p.optional.number,
                multiline: p.optional.boolean,
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => stringFromUnknown,
        },
        controller: (args) => {
            var _a;
            const value = args.value;
            const multiline = value.rawValue.length > 1 ||
                ('multiline' in args.params && args.params.multiline);
            if (multiline) {
                return new MultiLogController(args.document, {
                    formatter: formatString,
                    lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                    value: value,
                    viewProps: args.viewProps,
                });
            }
            return new SingleLogController(args.document, {
                formatter: formatString,
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    class InputBinding {
        constructor(config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.reader = config.reader;
            this.writer = config.writer;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.target = config.target;
            this.read();
        }
        read() {
            const targetValue = this.target.read();
            if (targetValue !== undefined) {
                this.value.rawValue = this.reader(targetValue);
            }
        }
        write_(rawValue) {
            this.writer(this.target, rawValue);
        }
        onValueChange_(ev) {
            this.write_(ev.rawValue);
            this.emitter.emit('change', {
                options: ev.options,
                rawValue: ev.rawValue,
                sender: this,
            });
        }
    }

    function createInputBindingController(plugin, args) {
        const result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) {
            return null;
        }
        const p = ParamsParsers;
        const valueArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params,
        };
        const reader = plugin.binding.reader(valueArgs);
        const constraint = plugin.binding.constraint
            ? plugin.binding.constraint(valueArgs)
            : undefined;
        const value = createValue(reader(result.initialValue), {
            constraint: constraint,
            equals: plugin.binding.equals,
        });
        const binding = new InputBinding({
            reader: reader,
            target: args.target,
            value: value,
            writer: plugin.binding.writer(valueArgs),
        });
        const disabled = p.optional.boolean(args.params.disabled).value;
        const hidden = p.optional.boolean(args.params.hidden).value;
        const controller = plugin.controller({
            constraint: constraint,
            document: args.document,
            initialValue: result.initialValue,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden,
            }),
        });
        const label = p.optional.string(args.params.label).value;
        return new InputBindingController(args.document, {
            binding: binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
                label: label !== null && label !== void 0 ? label : args.target.key,
            }),
            valueController: controller,
        });
    }

    class MonitorBinding {
        constructor(config) {
            this.onTick_ = this.onTick_.bind(this);
            this.reader_ = config.reader;
            this.target = config.target;
            this.emitter = new Emitter();
            this.value = config.value;
            this.ticker = config.ticker;
            this.ticker.emitter.on('tick', this.onTick_);
            this.read();
        }
        dispose() {
            this.ticker.dispose();
        }
        read() {
            const targetValue = this.target.read();
            if (targetValue === undefined) {
                return;
            }
            const buffer = this.value.rawValue;
            const newValue = this.reader_(targetValue);
            this.value.rawValue = createPushedBuffer(buffer, newValue);
            this.emitter.emit('update', {
                rawValue: newValue,
                sender: this,
            });
        }
        onTick_(_) {
            this.read();
        }
    }

    function createTicker(document, interval) {
        return interval === 0
            ? new ManualTicker()
            : new IntervalTicker(document, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
    }
    function createMonitorBindingController(plugin, args) {
        var _a, _b, _c;
        const P = ParamsParsers;
        const result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) {
            return null;
        }
        const bindingArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params,
        };
        const reader = plugin.binding.reader(bindingArgs);
        const bufferSize = (_b = (_a = P.optional.number(args.params.bufferSize).value) !== null && _a !== void 0 ? _a : (plugin.binding.defaultBufferSize &&
            plugin.binding.defaultBufferSize(result.params))) !== null && _b !== void 0 ? _b : 1;
        const interval = P.optional.number(args.params.interval).value;
        const binding = new MonitorBinding({
            reader: reader,
            target: args.target,
            ticker: createTicker(args.document, interval),
            value: initializeBuffer(bufferSize),
        });
        const disabled = P.optional.boolean(args.params.disabled).value;
        const hidden = P.optional.boolean(args.params.hidden).value;
        const controller = plugin.controller({
            document: args.document,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden,
            }),
        });
        const label = (_c = P.optional.string(args.params.label).value) !== null && _c !== void 0 ? _c : args.target.key;
        return new MonitorBindingController(args.document, {
            binding: binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
                label: label,
            }),
            valueController: controller,
        });
    }

    class PluginPool {
        constructor() {
            this.pluginsMap_ = {
                blades: [],
                inputs: [],
                monitors: [],
            };
        }
        getAll() {
            return [
                ...this.pluginsMap_.blades,
                ...this.pluginsMap_.inputs,
                ...this.pluginsMap_.monitors,
            ];
        }
        register(r) {
            if (r.type === 'blade') {
                this.pluginsMap_.blades.unshift(r);
            }
            else if (r.type === 'input') {
                this.pluginsMap_.inputs.unshift(r);
            }
            else if (r.type === 'monitor') {
                this.pluginsMap_.monitors.unshift(r);
            }
        }
        createInput(document, target, params) {
            const initialValue = target.read();
            if (isEmpty(initialValue)) {
                throw new TpError({
                    context: {
                        key: target.key,
                    },
                    type: 'nomatchingcontroller',
                });
            }
            const bc = this.pluginsMap_.inputs.reduce((result, plugin) => result !== null && result !== void 0 ? result : createInputBindingController(plugin, {
                document: document,
                target: target,
                params: params,
            }), null);
            if (bc) {
                return bc;
            }
            throw new TpError({
                context: {
                    key: target.key,
                },
                type: 'nomatchingcontroller',
            });
        }
        createMonitor(document, target, params) {
            const bc = this.pluginsMap_.monitors.reduce((result, plugin) => result !== null && result !== void 0 ? result : createMonitorBindingController(plugin, {
                document: document,
                params: params,
                target: target,
            }), null);
            if (bc) {
                return bc;
            }
            throw new TpError({
                context: {
                    key: target.key,
                },
                type: 'nomatchingcontroller',
            });
        }
        createBlade(document, params) {
            const bc = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : createBladeController(plugin, {
                document: document,
                params: params,
            }), null);
            if (!bc) {
                throw new TpError({
                    type: 'nomatchingview',
                    context: {
                        params: params,
                    },
                });
            }
            return bc;
        }
        createBladeApi(bc) {
            if (bc instanceof InputBindingController) {
                return new InputBindingApi(bc);
            }
            if (bc instanceof MonitorBindingController) {
                return new MonitorBindingApi(bc);
            }
            if (bc instanceof RackController) {
                return new RackApi(bc, this);
            }
            const api = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : plugin.api({
                controller: bc,
                pool: this,
            }), null);
            if (!api) {
                throw TpError.shouldNeverHappen();
            }
            return api;
        }
    }

    function createDefaultPluginPool() {
        const pool = new PluginPool();
        [
            Point2dInputPlugin,
            Point3dInputPlugin,
            Point4dInputPlugin,
            StringInputPlugin,
            NumberInputPlugin,
            StringColorInputPlugin,
            ObjectColorInputPlugin,
            NumberColorInputPlugin,
            BooleanInputPlugin,
            BooleanMonitorPlugin,
            StringMonitorPlugin,
            NumberMonitorPlugin,
            ButtonBladePlugin,
            FolderBladePlugin,
            SeparatorBladePlugin,
            TabBladePlugin,
        ].forEach((p) => {
            pool.register(p);
        });
        return pool;
    }

    function point2dFromUnknown(value) {
        return Point2d.isObject(value)
            ? new Point2d(value.x, value.y)
            : new Point2d();
    }
    function writePoint2d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
    }

    function createDimensionConstraint(params, initialValue) {
        if (!params) {
            return undefined;
        }
        const constraints = [];
        const cs = createStepConstraint(params, initialValue);
        if (cs) {
            constraints.push(cs);
        }
        const rs = createRangeConstraint(params);
        if (rs) {
            constraints.push(rs);
        }
        return new CompositeConstraint(constraints);
    }
    function createConstraint(params, initialValue) {
        return new PointNdConstraint({
            assembly: Point2dAssembly,
            components: [
                createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x),
                createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y),
            ],
        });
    }
    function getSuitableMaxDimensionValue(constraint, rawValue) {
        const [min, max] = constraint ? findNumberRange(constraint) : [];
        if (!isEmpty(min) || !isEmpty(max)) {
            return Math.max(Math.abs(min !== null && min !== void 0 ? min : 0), Math.abs(max !== null && max !== void 0 ? max : 0));
        }
        const step = getBaseStep(constraint);
        return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
    }
    function getSuitableMaxValue(initialValue, constraint) {
        const xc = constraint instanceof PointNdConstraint
            ? constraint.components[0]
            : undefined;
        const yc = constraint instanceof PointNdConstraint
            ? constraint.components[1]
            : undefined;
        const xr = getSuitableMaxDimensionValue(xc, initialValue.x);
        const yr = getSuitableMaxDimensionValue(yc, initialValue.y);
        return Math.max(xr, yr);
    }
    function createAxis(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue)),
            }),
        };
    }
    function shouldInvertY(params) {
        if (!('y' in params)) {
            return false;
        }
        const yParams = params.y;
        if (!yParams) {
            return false;
        }
        return 'inverted' in yParams ? !!yParams.inverted : false;
    }
    const Point2dInputPlugin = {
        id: 'input-point2d',
        type: 'input',
        accept: (value, params) => {
            if (!Point2d.isObject(value)) {
                return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
                expanded: p.optional.boolean,
                picker: p.optional.custom(parsePickerLayout),
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.object({
                    inverted: p.optional.boolean,
                    max: p.optional.number,
                    min: p.optional.number,
                    step: p.optional.number,
                }),
            });
            return result
                ? {
                    initialValue: value,
                    params: result,
                }
                : null;
        },
        binding: {
            reader: (_args) => point2dFromUnknown,
            constraint: (args) => createConstraint(args.params, args.initialValue),
            equals: Point2d.equals,
            writer: (_args) => writePoint2d,
        },
        controller: (args) => {
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
                throw TpError.shouldNeverHappen();
            }
            const expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            const picker = 'picker' in args.params ? args.params.picker : undefined;
            return new Point2dController(doc, {
                axes: [
                    createAxis(value.rawValue.x, c.components[0]),
                    createAxis(value.rawValue.y, c.components[1]),
                ],
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                invertsY: shouldInvertY(args.params),
                maxValue: getSuitableMaxValue(value.rawValue, c),
                parser: parseNumber,
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                value: value,
                viewProps: args.viewProps,
            });
        },
    };

    class ListApi extends BladeApi {
        constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on('change', (ev) => {
                this.emitter_.emit('change', {
                    event: new TpChangeEvent(this, ev.rawValue),
                });
            });
        }
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        get options() {
            return this.controller_.valueController.props.get('options');
        }
        set options(options) {
            this.controller_.valueController.props.set('options', options);
        }
        get value() {
            return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
            this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
    }

    class SliderApi extends BladeApi {
        constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on('change', (ev) => {
                this.emitter_.emit('change', {
                    event: new TpChangeEvent(this, ev.rawValue),
                });
            });
        }
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        get maxValue() {
            return this.controller_.valueController.sliderController.props.get('maxValue');
        }
        set maxValue(maxValue) {
            this.controller_.valueController.sliderController.props.set('maxValue', maxValue);
        }
        get minValue() {
            return this.controller_.valueController.sliderController.props.get('minValue');
        }
        set minValue(minValue) {
            this.controller_.valueController.sliderController.props.set('minValue', minValue);
        }
        get value() {
            return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
            this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
    }

    class TextApi extends BladeApi {
        constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on('change', (ev) => {
                this.emitter_.emit('change', {
                    event: new TpChangeEvent(this, ev.rawValue),
                });
            });
        }
        get label() {
            return this.controller_.props.get('label');
        }
        set label(label) {
            this.controller_.props.set('label', label);
        }
        get formatter() {
            return this.controller_.valueController.props.get('formatter');
        }
        set formatter(formatter) {
            this.controller_.valueController.props.set('formatter', formatter);
        }
        get value() {
            return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
            this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
                bh(ev.event);
            });
            return this;
        }
    }

    const ListBladePlugin = (function () {
        return {
            id: 'list',
            type: 'blade',
            accept(params) {
                const p = ParamsParsers;
                const result = parseParams(params, {
                    options: p.required.custom(parseListOptions),
                    value: p.required.raw,
                    view: p.required.constant('list'),
                    label: p.optional.string,
                });
                return result ? { params: result } : null;
            },
            controller(args) {
                const lc = new ListConstraint(normalizeListOptions(args.params.options));
                const value = createValue(args.params.value, {
                    constraint: lc,
                });
                const ic = new ListController(args.document, {
                    props: new ValueMap({
                        options: lc.values.value('options'),
                    }),
                    value: value,
                    viewProps: args.viewProps,
                });
                return new LabeledValueController(args.document, {
                    blade: args.blade,
                    props: ValueMap.fromObject({
                        label: args.params.label,
                    }),
                    valueController: ic,
                });
            },
            api(args) {
                if (!(args.controller instanceof LabeledValueController)) {
                    return null;
                }
                if (!(args.controller.valueController instanceof ListController)) {
                    return null;
                }
                return new ListApi(args.controller);
            },
        };
    })();

    /**
     * @hidden
     */
    function exportPresetJson(targets) {
        return targets.reduce((result, target) => {
            return Object.assign(result, {
                [target.presetKey]: target.read(),
            });
        }, {});
    }
    /**
     * @hidden
     */
    function importPresetJson(targets, preset) {
        targets.forEach((target) => {
            const value = preset[target.presetKey];
            if (value !== undefined) {
                target.write(value);
            }
        });
    }

    class RootApi extends FolderApi {
        /**
         * @hidden
         */
        constructor(controller, pool) {
            super(controller, pool);
        }
        get element() {
            return this.controller_.view.element;
        }
        /**
         * Imports a preset of all inputs.
         * @param preset The preset object to import.
         */
        importPreset(preset) {
            const targets = this.controller_.rackController.rack
                .find(InputBindingController)
                .map((ibc) => {
                return ibc.binding.target;
            });
            importPresetJson(targets, preset);
            this.refresh();
        }
        /**
         * Exports a preset of all inputs.
         * @return An exported preset object.
         */
        exportPreset() {
            const targets = this.controller_.rackController.rack
                .find(InputBindingController)
                .map((ibc) => {
                return ibc.binding.target;
            });
            return exportPresetJson(targets);
        }
        /**
         * Refreshes all bindings of the pane.
         */
        refresh() {
            // Force-read all input bindings
            this.controller_.rackController.rack
                .find(InputBindingController)
                .forEach((ibc) => {
                ibc.binding.read();
            });
            // Force-read all monitor bindings
            this.controller_.rackController.rack
                .find(MonitorBindingController)
                .forEach((mbc) => {
                mbc.binding.read();
            });
        }
    }

    class RootController extends FolderController {
        constructor(doc, config) {
            super(doc, {
                expanded: config.expanded,
                blade: config.blade,
                props: config.props,
                root: true,
                viewProps: config.viewProps,
            });
        }
    }

    const SliderBladePlugin = {
        id: 'slider',
        type: 'blade',
        accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
                max: p.required.number,
                min: p.required.number,
                view: p.required.constant('slider'),
                format: p.optional.function,
                label: p.optional.string,
                value: p.optional.number,
            });
            return result ? { params: result } : null;
        },
        controller(args) {
            var _a, _b;
            const initialValue = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
            const drc = new DefiniteRangeConstraint({
                max: args.params.max,
                min: args.params.min,
            });
            const vc = new SliderTextController(args.document, {
                baseStep: 1,
                parser: parseNumber,
                sliderProps: new ValueMap({
                    maxValue: drc.values.value('max'),
                    minValue: drc.values.value('min'),
                }),
                textProps: ValueMap.fromObject({
                    draggingScale: getSuitableDraggingScale(undefined, initialValue),
                    formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString,
                }),
                value: createValue(initialValue, {
                    constraint: drc,
                }),
                viewProps: args.viewProps,
            });
            return new LabeledValueController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                    label: args.params.label,
                }),
                valueController: vc,
            });
        },
        api(args) {
            if (!(args.controller instanceof LabeledValueController)) {
                return null;
            }
            if (!(args.controller.valueController instanceof SliderTextController)) {
                return null;
            }
            return new SliderApi(args.controller);
        },
    };

    const TextBladePlugin = (function () {
        return {
            id: 'text',
            type: 'blade',
            accept(params) {
                const p = ParamsParsers;
                const result = parseParams(params, {
                    parse: p.required.function,
                    value: p.required.raw,
                    view: p.required.constant('text'),
                    format: p.optional.function,
                    label: p.optional.string,
                });
                return result ? { params: result } : null;
            },
            controller(args) {
                var _a;
                const ic = new TextController(args.document, {
                    parser: args.params.parse,
                    props: ValueMap.fromObject({
                        formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : ((v) => String(v)),
                    }),
                    value: createValue(args.params.value),
                    viewProps: args.viewProps,
                });
                return new LabeledValueController(args.document, {
                    blade: args.blade,
                    props: ValueMap.fromObject({
                        label: args.params.label,
                    }),
                    valueController: ic,
                });
            },
            api(args) {
                if (!(args.controller instanceof LabeledValueController)) {
                    return null;
                }
                if (!(args.controller.valueController instanceof TextController)) {
                    return null;
                }
                return new TextApi(args.controller);
            },
        };
    })();

    function createDefaultWrapperElement(doc) {
        const elem = doc.createElement('div');
        elem.classList.add(ClassName('dfw')());
        if (doc.body) {
            doc.body.appendChild(elem);
        }
        return elem;
    }
    function embedStyle(doc, id, css) {
        if (doc.querySelector(`style[data-tp-style=${id}]`)) {
            return;
        }
        const styleElem = doc.createElement('style');
        styleElem.dataset.tpStyle = id;
        styleElem.textContent = css;
        doc.head.appendChild(styleElem);
    }
    /**
     * The root pane of Tweakpane.
     */
    class Pane extends RootApi {
        constructor(opt_config) {
            var _a, _b;
            const config = opt_config !== null && opt_config !== void 0 ? opt_config : {};
            const doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
            const pool = createDefaultPluginPool();
            const rootController = new RootController(doc, {
                expanded: config.expanded,
                blade: createBlade(),
                props: ValueMap.fromObject({
                    title: config.title,
                }),
                viewProps: ViewProps.create(),
            });
            super(rootController, pool);
            this.pool_ = pool;
            this.containerElem_ = (_b = config.container) !== null && _b !== void 0 ? _b : createDefaultWrapperElement(doc);
            this.containerElem_.appendChild(this.element);
            this.doc_ = doc;
            this.usesDefaultWrapper_ = !config.container;
            this.setUpDefaultPlugins_();
        }
        get document() {
            if (!this.doc_) {
                throw TpError.alreadyDisposed();
            }
            return this.doc_;
        }
        dispose() {
            const containerElem = this.containerElem_;
            if (!containerElem) {
                throw TpError.alreadyDisposed();
            }
            if (this.usesDefaultWrapper_) {
                const parentElem = containerElem.parentElement;
                if (parentElem) {
                    parentElem.removeChild(containerElem);
                }
            }
            this.containerElem_ = null;
            this.doc_ = null;
            super.dispose();
        }
        registerPlugin(bundle) {
            const plugins = 'plugin' in bundle
                ? [bundle.plugin]
                : 'plugins' in bundle
                    ? bundle.plugins
                    : [];
            plugins.forEach((p) => {
                this.pool_.register(p);
                this.embedPluginStyle_(p);
            });
        }
        embedPluginStyle_(plugin) {
            if (plugin.css) {
                embedStyle(this.document, `plugin-${plugin.id}`, plugin.css);
            }
        }
        setUpDefaultPlugins_() {
            // NOTE: This string literal will be replaced with the default CSS by Rollup at the compilation time
            embedStyle(this.document, 'default', '.tp-tbiv_b,.tp-coltxtv_ms,.tp-ckbv_i,.tp-rotv_b,.tp-fldv_b,.tp-mllv_i,.tp-sglv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-mllv_i,.tp-sglv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-mllv_i::-webkit-scrollbar,.tp-sglv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-mllv_i::-webkit-scrollbar-corner,.tp-sglv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-mllv_i::-webkit-scrollbar-thumb,.tp-sglv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, hsl(230deg, 7%, 17%));--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--btn-bg: var(--tp-button-background-color, hsl(230deg, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230deg, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230deg, 7%, 75%));--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230deg, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-v-p))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tabv_c .tp-brkv>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i,.tp-fldv_c>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(4px + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-h-p));position:absolute;right:calc(-1*var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--bld-us)*3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-h-p));right:calc(-1*var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}');
            this.pool_.getAll().forEach((plugin) => {
                this.embedPluginStyle_(plugin);
            });
            this.registerPlugin({
                plugins: [
                    SliderBladePlugin,
                    ListBladePlugin,
                    TabBladePlugin,
                    TextBladePlugin,
                ],
            });
        }
    }

    const VERSION = new Semver('3.1.2');

    exports.BladeApi = BladeApi;
    exports.ButtonApi = ButtonApi;
    exports.FolderApi = FolderApi;
    exports.InputBindingApi = InputBindingApi;
    exports.ListApi = ListApi;
    exports.MonitorBindingApi = MonitorBindingApi;
    exports.Pane = Pane;
    exports.SeparatorApi = SeparatorApi;
    exports.SliderApi = SliderApi;
    exports.TabApi = TabApi;
    exports.TabPageApi = TabPageApi;
    exports.TextApi = TextApi;
    exports.TpChangeEvent = TpChangeEvent;
    exports.VERSION = VERSION;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],"src/index.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var canvasSketch = require("canvas-sketch");
var random = require("canvas-sketch-util/random");
var math = require("canvas-sketch-util/math");
var colormap = require("colormap");
var tweakPane = require("tweakpane");
var settings = {
  dimensions: [1080, 1080],
  animate: true
};
var params = {
  cols: 20,
  rows: 30,
  colorScheme: "",
  frequency: 0.002,
  amplitude: 90,
  speed: 2
};
var sketch = function sketch(_ref) {
  var context = _ref.context,
    width = _ref.width,
    height = _ref.height,
    frame = _ref.frame;
  var cols = 1 * params.cols;
  var rows = 1 * params.rows;
  console.log(cols, rows);
  var numCells = cols * rows;

  //grid
  var gw = width * 0.8;
  var gh = height * 0.8;
  //cell
  var cw = gw / cols;
  var ch = gh / rows;
  //margin
  var mx = (width - gw) * 0.5;
  var my = (height - gh) * 0.5;
  var points = [];
  var x, y, n, lineWidth, color;
  var freq = 1 * params.frequency;
  var amp = 1 * params.amplitude;
  var colors = colormap({
    colormap: params.colorScheme,
    nshades: amp
  });
  for (var i = 0; i < numCells; i++) {
    x = i % cols * cw;
    y = Math.floor(i / cols) * ch;
    n = random.noise2D(x, y, freq, amp);
    // x += n;
    // y += n;

    //random line width
    lineWidth = math.mapRange(n, -amp, amp, 1, 20);

    //random colors
    color = colors[Math.floor(math.mapRange(n, -amp, amp, 0, amp))];
    points.push(new Point({
      x: x,
      y: y,
      lineWidth: lineWidth,
      color: color
    }));
  }
  return function (_ref2) {
    var context = _ref2.context,
      width = _ref2.width,
      height = _ref2.height,
      frame = _ref2.frame;
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(mx, my);
    context.translate(0.5 * cw, 0.5 * ch);
    context.strokeStyle = "green";
    context.lineWidth = 4;

    //update position for animation
    points.forEach(function (point) {
      // point.draw(context);
      n = random.noise2D(point.ix + frame * params.speed, point.iy, freq, amp);
      point.x = point.ix + n;
      point.y = point.iy + n;
    });
    var lastx, lasty;
    //draw lines

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols - 1; c++) {
        var curr = points[r * cols + c + 0];
        var next = points[r * cols + c + 1];
        var _mx = curr.x + (next.x - curr.x) * 0.5;
        var _my = curr.y + (next.y - curr.y) * 0.5;

        // if (c === 0) context.moveTo(curr.x, curr.y);
        // else if (c === points.length - 2)
        //   context.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
        // else context.quadraticCurveTo(curr.x, curr.y, mx, my);
        if (!c) {
          lastx = curr.x;
          lasty = curr.y;
        }
        context.beginPath();
        context.lineWidth = curr.lineWidth;
        context.strokeStyle = curr.color;
        context.moveTo(lastx, lasty);
        context.quadraticCurveTo(curr.x, curr.y, _mx, _my);
        context.stroke();
        lastx = _mx;
        lasty = _my;
      }
    }

    //draw point
    points.forEach(function (point) {
      // point.draw(context);
    });
    context.restore();
  };
};

//control Panel

var createPane = function createPane() {
  var pane = new tweakPane.Pane();
  var folder;
  folder = pane.addFolder({
    title: "Grid"
  });
  folder.addInput(params, "cols", {
    min: 2,
    max: 50,
    step: 1
  });
  folder.addInput(params, "rows", {
    min: 2,
    max: 50,
    step: 1
  });
  color = pane.addFolder({
    title: "Color Setting"
  });
  color.addInput(params, "colorScheme", {
    options: {
      default: "plasma",
      electric: "electirc",
      viridis: "viridis"
    }
  });
  speed = pane.addFolder({
    title: "Animation"
  });
  speed.addInput(params, "speed", {
    min: 1,
    max: 30,
    step: 0.5
  });
  speed.addInput(params, "amplitude", {
    min: 30,
    max: 200,
    step: 1
  });
  speed.addInput(params, "frequency", {
    min: 0.001,
    max: 1,
    step: 0.001
  });
};
createPane();
canvasSketch(sketch, settings);
var Point = /*#__PURE__*/function () {
  function Point(_ref3) {
    var x = _ref3.x,
      y = _ref3.y,
      lineWidth = _ref3.lineWidth,
      color = _ref3.color;
    _classCallCheck(this, Point);
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.ix = x;
    this.iy = y;
    // this.control= control;
  }
  _createClass(Point, [{
    key: "draw",
    value: function draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.fillStyle = "red";
      context.beginPath();
      context.arc(0, 0, 10, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }, {
    key: "hitTest",
    value: function hitTest(x, y) {
      var dx = this.x - x;
      var dy = this.y - y;
      var dd = Math.sqrt(dx * dx + dy * dy);
      return dd < 20;
    }
  }]);
  return Point;
}();
},{"canvas-sketch":"node_modules/canvas-sketch/dist/canvas-sketch.umd.js","canvas-sketch-util/random":"node_modules/canvas-sketch-util/random.js","canvas-sketch-util/math":"node_modules/canvas-sketch-util/math.js","colormap":"node_modules/colormap/index.js","tweakpane":"node_modules/tweakpane/dist/tweakpane.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34301" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map