"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// node_modules/majo/node_modules/fast-glob/out/utils/array.js
var require_array = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
  }
  exports.flatten = flatten;
  function splitWhen(items, predicate) {
    const result = [[]];
    let groupIndex = 0;
    for (const item of items) {
      if (predicate(item)) {
        groupIndex++;
        result[groupIndex] = [];
      } else {
        result[groupIndex].push(item);
      }
    }
    return result;
  }
  exports.splitWhen = splitWhen;
});

// node_modules/majo/node_modules/fast-glob/out/utils/errno.js
var require_errno = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function isEnoentCodeError(error) {
    return error.code === "ENOENT";
  }
  exports.isEnoentCodeError = isEnoentCodeError;
});

// node_modules/majo/node_modules/fast-glob/out/utils/fs.js
var require_fs = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var DirentFromStats = class {
    constructor(name, stats) {
      this.name = name;
      this.isBlockDevice = stats.isBlockDevice.bind(stats);
      this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
      this.isDirectory = stats.isDirectory.bind(stats);
      this.isFIFO = stats.isFIFO.bind(stats);
      this.isFile = stats.isFile.bind(stats);
      this.isSocket = stats.isSocket.bind(stats);
      this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
  };
  function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
  }
  exports.createDirentFromStats = createDirentFromStats;
});

// node_modules/majo/node_modules/fast-glob/out/utils/path.js
var require_path = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
  var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
  function unixify(filepath) {
    return filepath.replace(/\\/g, "/");
  }
  exports.unixify = unixify;
  function makeAbsolute(cwd, filepath) {
    return path.resolve(cwd, filepath);
  }
  exports.makeAbsolute = makeAbsolute;
  function escape(pattern) {
    return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
  }
  exports.escape = escape;
  function removeLeadingDotSegment(entry) {
    if (entry.charAt(0) === ".") {
      const secondCharactery = entry.charAt(1);
      if (secondCharactery === "/" || secondCharactery === "\\") {
        return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
      }
    }
    return entry;
  }
  exports.removeLeadingDotSegment = removeLeadingDotSegment;
});

// node_modules/is-extglob/index.js
var require_is_extglob = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  /*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  module.exports = function isExtglob(str) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    var match;
    while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
      if (match[2])
        return true;
      str = str.slice(match.index + match[0].length);
    }
    return false;
  };
});

// node_modules/is-glob/index.js
var require_is_glob = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  /*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  var isExtglob = require_is_extglob();
  var chars = {"{": "}", "(": ")", "[": "]"};
  var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;
  module.exports = function isGlob(str, options) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    if (isExtglob(str)) {
      return true;
    }
    var regex = strictRegex;
    var match;
    if (options && options.strict === false) {
      regex = relaxedRegex;
    }
    while (match = regex.exec(str)) {
      if (match[2])
        return true;
      var idx = match.index + match[0].length;
      var open = match[1];
      var close = open ? chars[open] : null;
      if (open && close) {
        var n = str.indexOf(close, idx);
        if (n !== -1) {
          idx = n + 1;
        }
      }
      str = str.slice(idx);
    }
    return false;
  };
});

// node_modules/glob-parent/index.js
var require_glob_parent = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isGlob = require_is_glob();
  var pathPosixDirname = require("path").posix.dirname;
  var isWin32 = require("os").platform() === "win32";
  var slash = "/";
  var backslash = /\\/g;
  var enclosure = /[\{\[].*[\/]*.*[\}\]]$/;
  var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
  var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
  module.exports = function globParent(str, opts) {
    var options = Object.assign({flipBackslashes: true}, opts);
    if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
      str = str.replace(backslash, slash);
    }
    if (enclosure.test(str)) {
      str += slash;
    }
    str += "a";
    do {
      str = pathPosixDirname(str);
    } while (isGlob(str) || globby.test(str));
    return str.replace(escaped, "$1");
  };
});

// node_modules/braces/lib/utils.js
var require_utils = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  exports.isInteger = (num) => {
    if (typeof num === "number") {
      return Number.isInteger(num);
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isInteger(Number(num));
    }
    return false;
  };
  exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
  exports.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false)
      return false;
    if (!exports.isInteger(min) || !exports.isInteger(max))
      return false;
    return (Number(max) - Number(min)) / Number(step) >= limit;
  };
  exports.escapeNode = (block, n = 0, type) => {
    let node = block.nodes[n];
    if (!node)
      return;
    if (type && node.type === type || node.type === "open" || node.type === "close") {
      if (node.escaped !== true) {
        node.value = "\\" + node.value;
        node.escaped = true;
      }
    }
  };
  exports.encloseBrace = (node) => {
    if (node.type !== "brace")
      return false;
    if (node.commas >> 0 + node.ranges >> 0 === 0) {
      node.invalid = true;
      return true;
    }
    return false;
  };
  exports.isInvalidBrace = (block) => {
    if (block.type !== "brace")
      return false;
    if (block.invalid === true || block.dollar)
      return true;
    if (block.commas >> 0 + block.ranges >> 0 === 0) {
      block.invalid = true;
      return true;
    }
    if (block.open !== true || block.close !== true) {
      block.invalid = true;
      return true;
    }
    return false;
  };
  exports.isOpenOrClose = (node) => {
    if (node.type === "open" || node.type === "close") {
      return true;
    }
    return node.open === true || node.close === true;
  };
  exports.reduce = (nodes) => nodes.reduce((acc, node) => {
    if (node.type === "text")
      acc.push(node.value);
    if (node.type === "range")
      node.type = "text";
    return acc;
  }, []);
  exports.flatten = (...args) => {
    const result = [];
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
      }
      return result;
    };
    flat(args);
    return result;
  };
});

// node_modules/braces/lib/stringify.js
var require_stringify = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = (ast, options = {}) => {
    let stringify = (node, parent = {}) => {
      let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
      let invalidNode = node.invalid === true && options.escapeInvalid === true;
      let output = "";
      if (node.value) {
        if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
          return "\\" + node.value;
        }
        return node.value;
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes) {
        for (let child of node.nodes) {
          output += stringify(child);
        }
      }
      return output;
    };
    return stringify(ast);
  };
});

// node_modules/to-regex-range/node_modules/is-number/index.js
var require_is_number = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  /*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  module.exports = function(num) {
    if (typeof num === "number") {
      return num - num === 0;
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
  };
});

// node_modules/to-regex-range/index.js
var require_to_regex_range = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  /*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  var isNumber = require_is_number();
  var toRegexRange = (min, max, options) => {
    if (isNumber(min) === false) {
      throw new TypeError("toRegexRange: expected the first argument to be a number");
    }
    if (max === void 0 || min === max) {
      return String(min);
    }
    if (isNumber(max) === false) {
      throw new TypeError("toRegexRange: expected the second argument to be a number.");
    }
    let opts = {relaxZeros: true, ...options};
    if (typeof opts.strictZeros === "boolean") {
      opts.relaxZeros = opts.strictZeros === false;
    }
    let relax = String(opts.relaxZeros);
    let shorthand = String(opts.shorthand);
    let capture = String(opts.capture);
    let wrap = String(opts.wrap);
    let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
    if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
      return toRegexRange.cache[cacheKey].result;
    }
    let a = Math.min(min, max);
    let b = Math.max(min, max);
    if (Math.abs(a - b) === 1) {
      let result = min + "|" + max;
      if (opts.capture) {
        return `(${result})`;
      }
      if (opts.wrap === false) {
        return result;
      }
      return `(?:${result})`;
    }
    let isPadded = hasPadding(min) || hasPadding(max);
    let state = {min, max, a, b};
    let positives = [];
    let negatives = [];
    if (isPadded) {
      state.isPadded = isPadded;
      state.maxLen = String(state.max).length;
    }
    if (a < 0) {
      let newMin = b < 0 ? Math.abs(b) : 1;
      negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
      a = state.a = 0;
    }
    if (b >= 0) {
      positives = splitToPatterns(a, b, state, opts);
    }
    state.negatives = negatives;
    state.positives = positives;
    state.result = collatePatterns(negatives, positives, opts);
    if (opts.capture === true) {
      state.result = `(${state.result})`;
    } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
      state.result = `(?:${state.result})`;
    }
    toRegexRange.cache[cacheKey] = state;
    return state.result;
  };
  function collatePatterns(neg, pos, options) {
    let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
    let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
    let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
    return subpatterns.join("|");
  }
  function splitToRanges(min, max) {
    let nines = 1;
    let zeros = 1;
    let stop = countNines(min, nines);
    let stops = new Set([max]);
    while (min <= stop && stop <= max) {
      stops.add(stop);
      nines += 1;
      stop = countNines(min, nines);
    }
    stop = countZeros(max + 1, zeros) - 1;
    while (min < stop && stop <= max) {
      stops.add(stop);
      zeros += 1;
      stop = countZeros(max + 1, zeros) - 1;
    }
    stops = [...stops];
    stops.sort(compare);
    return stops;
  }
  function rangeToPattern(start, stop, options) {
    if (start === stop) {
      return {pattern: start, count: [], digits: 0};
    }
    let zipped = zip(start, stop);
    let digits = zipped.length;
    let pattern = "";
    let count = 0;
    for (let i = 0; i < digits; i++) {
      let [startDigit, stopDigit] = zipped[i];
      if (startDigit === stopDigit) {
        pattern += startDigit;
      } else if (startDigit !== "0" || stopDigit !== "9") {
        pattern += toCharacterClass(startDigit, stopDigit, options);
      } else {
        count++;
      }
    }
    if (count) {
      pattern += options.shorthand === true ? "\\d" : "[0-9]";
    }
    return {pattern, count: [count], digits};
  }
  function splitToPatterns(min, max, tok, options) {
    let ranges = splitToRanges(min, max);
    let tokens = [];
    let start = min;
    let prev;
    for (let i = 0; i < ranges.length; i++) {
      let max2 = ranges[i];
      let obj = rangeToPattern(String(start), String(max2), options);
      let zeros = "";
      if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
        if (prev.count.length > 1) {
          prev.count.pop();
        }
        prev.count.push(obj.count[0]);
        prev.string = prev.pattern + toQuantifier(prev.count);
        start = max2 + 1;
        continue;
      }
      if (tok.isPadded) {
        zeros = padZeros(max2, tok, options);
      }
      obj.string = zeros + obj.pattern + toQuantifier(obj.count);
      tokens.push(obj);
      start = max2 + 1;
      prev = obj;
    }
    return tokens;
  }
  function filterPatterns(arr, comparison, prefix, intersection, options) {
    let result = [];
    for (let ele of arr) {
      let {string} = ele;
      if (!intersection && !contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
      if (intersection && contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
    }
    return result;
  }
  function zip(a, b) {
    let arr = [];
    for (let i = 0; i < a.length; i++)
      arr.push([a[i], b[i]]);
    return arr;
  }
  function compare(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  }
  function contains(arr, key, val) {
    return arr.some((ele) => ele[key] === val);
  }
  function countNines(min, len) {
    return Number(String(min).slice(0, -len) + "9".repeat(len));
  }
  function countZeros(integer, zeros) {
    return integer - integer % Math.pow(10, zeros);
  }
  function toQuantifier(digits) {
    let [start = 0, stop = ""] = digits;
    if (stop || start > 1) {
      return `{${start + (stop ? "," + stop : "")}}`;
    }
    return "";
  }
  function toCharacterClass(a, b, options) {
    return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
  }
  function hasPadding(str) {
    return /^-?(0+)\d/.test(str);
  }
  function padZeros(value, tok, options) {
    if (!tok.isPadded) {
      return value;
    }
    let diff = Math.abs(tok.maxLen - String(value).length);
    let relax = options.relaxZeros !== false;
    switch (diff) {
      case 0:
        return "";
      case 1:
        return relax ? "0?" : "0";
      case 2:
        return relax ? "0{0,2}" : "00";
      default: {
        return relax ? `0{0,${diff}}` : `0{${diff}}`;
      }
    }
  }
  toRegexRange.cache = {};
  toRegexRange.clearCache = () => toRegexRange.cache = {};
  module.exports = toRegexRange;
});

// node_modules/fill-range/index.js
var require_fill_range = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  /*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  "use strict";
  var util = require("util");
  var toRegexRange = require_to_regex_range();
  var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  var transform = (toNumber) => {
    return (value) => toNumber === true ? Number(value) : String(value);
  };
  var isValidValue = (value) => {
    return typeof value === "number" || typeof value === "string" && value !== "";
  };
  var isNumber = (num) => Number.isInteger(+num);
  var zeros = (input) => {
    let value = `${input}`;
    let index = -1;
    if (value[0] === "-")
      value = value.slice(1);
    if (value === "0")
      return false;
    while (value[++index] === "0")
      ;
    return index > 0;
  };
  var stringify = (start, end, options) => {
    if (typeof start === "string" || typeof end === "string") {
      return true;
    }
    return options.stringify === true;
  };
  var pad = (input, maxLength, toNumber) => {
    if (maxLength > 0) {
      let dash = input[0] === "-" ? "-" : "";
      if (dash)
        input = input.slice(1);
      input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
    }
    if (toNumber === false) {
      return String(input);
    }
    return input;
  };
  var toMaxLen = (input, maxLength) => {
    let negative = input[0] === "-" ? "-" : "";
    if (negative) {
      input = input.slice(1);
      maxLength--;
    }
    while (input.length < maxLength)
      input = "0" + input;
    return negative ? "-" + input : input;
  };
  var toSequence = (parts, options) => {
    parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    let prefix = options.capture ? "" : "?:";
    let positives = "";
    let negatives = "";
    let result;
    if (parts.positives.length) {
      positives = parts.positives.join("|");
    }
    if (parts.negatives.length) {
      negatives = `-(${prefix}${parts.negatives.join("|")})`;
    }
    if (positives && negatives) {
      result = `${positives}|${negatives}`;
    } else {
      result = positives || negatives;
    }
    if (options.wrap) {
      return `(${prefix}${result})`;
    }
    return result;
  };
  var toRange = (a, b, isNumbers, options) => {
    if (isNumbers) {
      return toRegexRange(a, b, {wrap: false, ...options});
    }
    let start = String.fromCharCode(a);
    if (a === b)
      return start;
    let stop = String.fromCharCode(b);
    return `[${start}-${stop}]`;
  };
  var toRegex = (start, end, options) => {
    if (Array.isArray(start)) {
      let wrap = options.wrap === true;
      let prefix = options.capture ? "" : "?:";
      return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
    }
    return toRegexRange(start, end, options);
  };
  var rangeError = (...args) => {
    return new RangeError("Invalid range arguments: " + util.inspect(...args));
  };
  var invalidRange = (start, end, options) => {
    if (options.strictRanges === true)
      throw rangeError([start, end]);
    return [];
  };
  var invalidStep = (step, options) => {
    if (options.strictRanges === true) {
      throw new TypeError(`Expected step "${step}" to be a number`);
    }
    return [];
  };
  var fillNumbers = (start, end, step = 1, options = {}) => {
    let a = Number(start);
    let b = Number(end);
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    }
    if (a === 0)
      a = 0;
    if (b === 0)
      b = 0;
    let descending = a > b;
    let startString = String(start);
    let endString = String(end);
    let stepString = String(step);
    step = Math.max(Math.abs(step), 1);
    let padded = zeros(startString) || zeros(endString) || zeros(stepString);
    let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
    let toNumber = padded === false && stringify(start, end, options) === false;
    let format = options.transform || transform(toNumber);
    if (options.toRegex && step === 1) {
      return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
    }
    let parts = {negatives: [], positives: []};
    let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      if (options.toRegex === true && step > 1) {
        push(a);
      } else {
        range.push(pad(format(a, index), maxLen, toNumber));
      }
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return step > 1 ? toSequence(parts, options) : toRegex(range, null, {wrap: false, ...options});
    }
    return range;
  };
  var fillLetters = (start, end, step = 1, options = {}) => {
    if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
      return invalidRange(start, end, options);
    }
    let format = options.transform || ((val) => String.fromCharCode(val));
    let a = `${start}`.charCodeAt(0);
    let b = `${end}`.charCodeAt(0);
    let descending = a > b;
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (options.toRegex && step === 1) {
      return toRange(min, max, false, options);
    }
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      range.push(format(a, index));
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return toRegex(range, null, {wrap: false, options});
    }
    return range;
  };
  var fill = (start, end, step, options = {}) => {
    if (end == null && isValidValue(start)) {
      return [start];
    }
    if (!isValidValue(start) || !isValidValue(end)) {
      return invalidRange(start, end, options);
    }
    if (typeof step === "function") {
      return fill(start, end, 1, {transform: step});
    }
    if (isObject(step)) {
      return fill(start, end, 0, step);
    }
    let opts = {...options};
    if (opts.capture === true)
      opts.wrap = true;
    step = step || opts.step || 1;
    if (!isNumber(step)) {
      if (step != null && !isObject(step))
        return invalidStep(step, opts);
      return fill(start, end, 1, step);
    }
    if (isNumber(start) && isNumber(end)) {
      return fillNumbers(start, end, step, opts);
    }
    return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
  };
  module.exports = fill;
});

// node_modules/braces/lib/compile.js
var require_compile = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var fill = require_fill_range();
  var utils = require_utils();
  var compile = (ast, options = {}) => {
    let walk = (node, parent = {}) => {
      let invalidBlock = utils.isInvalidBrace(parent);
      let invalidNode = node.invalid === true && options.escapeInvalid === true;
      let invalid = invalidBlock === true || invalidNode === true;
      let prefix = options.escapeInvalid === true ? "\\" : "";
      let output = "";
      if (node.isOpen === true) {
        return prefix + node.value;
      }
      if (node.isClose === true) {
        return prefix + node.value;
      }
      if (node.type === "open") {
        return invalid ? prefix + node.value : "(";
      }
      if (node.type === "close") {
        return invalid ? prefix + node.value : ")";
      }
      if (node.type === "comma") {
        return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes && node.ranges > 0) {
        let args = utils.reduce(node.nodes);
        let range = fill(...args, {...options, wrap: false, toRegex: true});
        if (range.length !== 0) {
          return args.length > 1 && range.length > 1 ? `(${range})` : range;
        }
      }
      if (node.nodes) {
        for (let child of node.nodes) {
          output += walk(child, node);
        }
      }
      return output;
    };
    return walk(ast);
  };
  module.exports = compile;
});

// node_modules/braces/lib/expand.js
var require_expand = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var fill = require_fill_range();
  var stringify = require_stringify();
  var utils = require_utils();
  var append = (queue = "", stash = "", enclose = false) => {
    let result = [];
    queue = [].concat(queue);
    stash = [].concat(stash);
    if (!stash.length)
      return queue;
    if (!queue.length) {
      return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
    }
    for (let item of queue) {
      if (Array.isArray(item)) {
        for (let value of item) {
          result.push(append(value, stash, enclose));
        }
      } else {
        for (let ele of stash) {
          if (enclose === true && typeof ele === "string")
            ele = `{${ele}}`;
          result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
        }
      }
    }
    return utils.flatten(result);
  };
  var expand = (ast, options = {}) => {
    let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
    let walk = (node, parent = {}) => {
      node.queue = [];
      let p = parent;
      let q = parent.queue;
      while (p.type !== "brace" && p.type !== "root" && p.parent) {
        p = p.parent;
        q = p.queue;
      }
      if (node.invalid || node.dollar) {
        q.push(append(q.pop(), stringify(node, options)));
        return;
      }
      if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
        q.push(append(q.pop(), ["{}"]));
        return;
      }
      if (node.nodes && node.ranges > 0) {
        let args = utils.reduce(node.nodes);
        if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
          throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
        }
        let range = fill(...args, options);
        if (range.length === 0) {
          range = stringify(node, options);
        }
        q.push(append(q.pop(), range));
        node.nodes = [];
        return;
      }
      let enclose = utils.encloseBrace(node);
      let queue = node.queue;
      let block = node;
      while (block.type !== "brace" && block.type !== "root" && block.parent) {
        block = block.parent;
        queue = block.queue;
      }
      for (let i = 0; i < node.nodes.length; i++) {
        let child = node.nodes[i];
        if (child.type === "comma" && node.type === "brace") {
          if (i === 1)
            queue.push("");
          queue.push("");
          continue;
        }
        if (child.type === "close") {
          q.push(append(q.pop(), queue, enclose));
          continue;
        }
        if (child.value && child.type !== "open") {
          queue.push(append(queue.pop(), child.value));
          continue;
        }
        if (child.nodes) {
          walk(child, node);
        }
      }
      return queue;
    };
    return utils.flatten(walk(ast));
  };
  module.exports = expand;
});

// node_modules/braces/lib/constants.js
var require_constants = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = {
    MAX_LENGTH: 1024 * 64,
    CHAR_0: "0",
    CHAR_9: "9",
    CHAR_UPPERCASE_A: "A",
    CHAR_LOWERCASE_A: "a",
    CHAR_UPPERCASE_Z: "Z",
    CHAR_LOWERCASE_Z: "z",
    CHAR_LEFT_PARENTHESES: "(",
    CHAR_RIGHT_PARENTHESES: ")",
    CHAR_ASTERISK: "*",
    CHAR_AMPERSAND: "&",
    CHAR_AT: "@",
    CHAR_BACKSLASH: "\\",
    CHAR_BACKTICK: "`",
    CHAR_CARRIAGE_RETURN: "\r",
    CHAR_CIRCUMFLEX_ACCENT: "^",
    CHAR_COLON: ":",
    CHAR_COMMA: ",",
    CHAR_DOLLAR: "$",
    CHAR_DOT: ".",
    CHAR_DOUBLE_QUOTE: '"',
    CHAR_EQUAL: "=",
    CHAR_EXCLAMATION_MARK: "!",
    CHAR_FORM_FEED: "\f",
    CHAR_FORWARD_SLASH: "/",
    CHAR_HASH: "#",
    CHAR_HYPHEN_MINUS: "-",
    CHAR_LEFT_ANGLE_BRACKET: "<",
    CHAR_LEFT_CURLY_BRACE: "{",
    CHAR_LEFT_SQUARE_BRACKET: "[",
    CHAR_LINE_FEED: "\n",
    CHAR_NO_BREAK_SPACE: "\xA0",
    CHAR_PERCENT: "%",
    CHAR_PLUS: "+",
    CHAR_QUESTION_MARK: "?",
    CHAR_RIGHT_ANGLE_BRACKET: ">",
    CHAR_RIGHT_CURLY_BRACE: "}",
    CHAR_RIGHT_SQUARE_BRACKET: "]",
    CHAR_SEMICOLON: ";",
    CHAR_SINGLE_QUOTE: "'",
    CHAR_SPACE: " ",
    CHAR_TAB: "	",
    CHAR_UNDERSCORE: "_",
    CHAR_VERTICAL_LINE: "|",
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  };
});

// node_modules/braces/lib/parse.js
var require_parse = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var stringify = require_stringify();
  var {
    MAX_LENGTH,
    CHAR_BACKSLASH,
    CHAR_BACKTICK,
    CHAR_COMMA,
    CHAR_DOT,
    CHAR_LEFT_PARENTHESES,
    CHAR_RIGHT_PARENTHESES,
    CHAR_LEFT_CURLY_BRACE,
    CHAR_RIGHT_CURLY_BRACE,
    CHAR_LEFT_SQUARE_BRACKET,
    CHAR_RIGHT_SQUARE_BRACKET,
    CHAR_DOUBLE_QUOTE,
    CHAR_SINGLE_QUOTE,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE
  } = require_constants();
  var parse = (input, options = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    let opts = options || {};
    let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    if (input.length > max) {
      throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
    }
    let ast = {type: "root", input, nodes: []};
    let stack = [ast];
    let block = ast;
    let prev = ast;
    let brackets = 0;
    let length = input.length;
    let index = 0;
    let depth = 0;
    let value;
    let memo = {};
    const advance = () => input[index++];
    const push = (node) => {
      if (node.type === "text" && prev.type === "dot") {
        prev.type = "text";
      }
      if (prev && prev.type === "text" && node.type === "text") {
        prev.value += node.value;
        return;
      }
      block.nodes.push(node);
      node.parent = block;
      node.prev = prev;
      prev = node;
      return node;
    };
    push({type: "bos"});
    while (index < length) {
      block = stack[stack.length - 1];
      value = advance();
      if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
        continue;
      }
      if (value === CHAR_BACKSLASH) {
        push({type: "text", value: (options.keepEscaping ? value : "") + advance()});
        continue;
      }
      if (value === CHAR_RIGHT_SQUARE_BRACKET) {
        push({type: "text", value: "\\" + value});
        continue;
      }
      if (value === CHAR_LEFT_SQUARE_BRACKET) {
        brackets++;
        let closed = true;
        let next;
        while (index < length && (next = advance())) {
          value += next;
          if (next === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            continue;
          }
          if (next === CHAR_BACKSLASH) {
            value += advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            brackets--;
            if (brackets === 0) {
              break;
            }
          }
        }
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_LEFT_PARENTHESES) {
        block = push({type: "paren", nodes: []});
        stack.push(block);
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_RIGHT_PARENTHESES) {
        if (block.type !== "paren") {
          push({type: "text", value});
          continue;
        }
        block = stack.pop();
        push({type: "text", value});
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
        let open = value;
        let next;
        if (options.keepQuotes !== true) {
          value = "";
        }
        while (index < length && (next = advance())) {
          if (next === CHAR_BACKSLASH) {
            value += next + advance();
            continue;
          }
          if (next === open) {
            if (options.keepQuotes === true)
              value += next;
            break;
          }
          value += next;
        }
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_LEFT_CURLY_BRACE) {
        depth++;
        let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
        let brace = {
          type: "brace",
          open: true,
          close: false,
          dollar,
          depth,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        block = push(brace);
        stack.push(block);
        push({type: "open", value});
        continue;
      }
      if (value === CHAR_RIGHT_CURLY_BRACE) {
        if (block.type !== "brace") {
          push({type: "text", value});
          continue;
        }
        let type = "close";
        block = stack.pop();
        block.close = true;
        push({type, value});
        depth--;
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_COMMA && depth > 0) {
        if (block.ranges > 0) {
          block.ranges = 0;
          let open = block.nodes.shift();
          block.nodes = [open, {type: "text", value: stringify(block)}];
        }
        push({type: "comma", value});
        block.commas++;
        continue;
      }
      if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
        let siblings = block.nodes;
        if (depth === 0 || siblings.length === 0) {
          push({type: "text", value});
          continue;
        }
        if (prev.type === "dot") {
          block.range = [];
          prev.value += value;
          prev.type = "range";
          if (block.nodes.length !== 3 && block.nodes.length !== 5) {
            block.invalid = true;
            block.ranges = 0;
            prev.type = "text";
            continue;
          }
          block.ranges++;
          block.args = [];
          continue;
        }
        if (prev.type === "range") {
          siblings.pop();
          let before = siblings[siblings.length - 1];
          before.value += prev.value + value;
          prev = before;
          block.ranges--;
          continue;
        }
        push({type: "dot", value});
        continue;
      }
      push({type: "text", value});
    }
    do {
      block = stack.pop();
      if (block.type !== "root") {
        block.nodes.forEach((node) => {
          if (!node.nodes) {
            if (node.type === "open")
              node.isOpen = true;
            if (node.type === "close")
              node.isClose = true;
            if (!node.nodes)
              node.type = "text";
            node.invalid = true;
          }
        });
        let parent = stack[stack.length - 1];
        let index2 = parent.nodes.indexOf(block);
        parent.nodes.splice(index2, 1, ...block.nodes);
      }
    } while (stack.length > 0);
    push({type: "eos"});
    return ast;
  };
  module.exports = parse;
});

// node_modules/braces/index.js
var require_braces = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var stringify = require_stringify();
  var compile = require_compile();
  var expand = require_expand();
  var parse = require_parse();
  var braces = (input, options = {}) => {
    let output = [];
    if (Array.isArray(input)) {
      for (let pattern of input) {
        let result = braces.create(pattern, options);
        if (Array.isArray(result)) {
          output.push(...result);
        } else {
          output.push(result);
        }
      }
    } else {
      output = [].concat(braces.create(input, options));
    }
    if (options && options.expand === true && options.nodupes === true) {
      output = [...new Set(output)];
    }
    return output;
  };
  braces.parse = (input, options = {}) => parse(input, options);
  braces.stringify = (input, options = {}) => {
    if (typeof input === "string") {
      return stringify(braces.parse(input, options), options);
    }
    return stringify(input, options);
  };
  braces.compile = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    return compile(input, options);
  };
  braces.expand = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    let result = expand(input, options);
    if (options.noempty === true) {
      result = result.filter(Boolean);
    }
    if (options.nodupes === true) {
      result = [...new Set(result)];
    }
    return result;
  };
  braces.create = (input, options = {}) => {
    if (input === "" || input.length < 3) {
      return [input];
    }
    return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
  };
  module.exports = braces;
});

// node_modules/picomatch/lib/constants.js
var require_constants2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path = require("path");
  var WIN_SLASH = "\\\\/";
  var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
  var DOT_LITERAL = "\\.";
  var PLUS_LITERAL = "\\+";
  var QMARK_LITERAL = "\\?";
  var SLASH_LITERAL = "\\/";
  var ONE_CHAR = "(?=.)";
  var QMARK = "[^/]";
  var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
  var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
  var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
  var NO_DOT = `(?!${DOT_LITERAL})`;
  var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
  var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
  var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
  var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
  var STAR = `${QMARK}*?`;
  var POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  };
  var WINDOWS_CHARS = {
    ...POSIX_CHARS,
    SLASH_LITERAL: `[${WIN_SLASH}]`,
    QMARK: WIN_NO_SLASH,
    STAR: `${WIN_NO_SLASH}*?`,
    DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
    NO_DOT: `(?!${DOT_LITERAL})`,
    NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
    NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
    START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
    END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
  };
  var POSIX_REGEX_SOURCE = {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9"
  };
  module.exports = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    REPLACEMENTS: {
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    CHAR_0: 48,
    CHAR_9: 57,
    CHAR_UPPERCASE_A: 65,
    CHAR_LOWERCASE_A: 97,
    CHAR_UPPERCASE_Z: 90,
    CHAR_LOWERCASE_Z: 122,
    CHAR_LEFT_PARENTHESES: 40,
    CHAR_RIGHT_PARENTHESES: 41,
    CHAR_ASTERISK: 42,
    CHAR_AMPERSAND: 38,
    CHAR_AT: 64,
    CHAR_BACKWARD_SLASH: 92,
    CHAR_CARRIAGE_RETURN: 13,
    CHAR_CIRCUMFLEX_ACCENT: 94,
    CHAR_COLON: 58,
    CHAR_COMMA: 44,
    CHAR_DOT: 46,
    CHAR_DOUBLE_QUOTE: 34,
    CHAR_EQUAL: 61,
    CHAR_EXCLAMATION_MARK: 33,
    CHAR_FORM_FEED: 12,
    CHAR_FORWARD_SLASH: 47,
    CHAR_GRAVE_ACCENT: 96,
    CHAR_HASH: 35,
    CHAR_HYPHEN_MINUS: 45,
    CHAR_LEFT_ANGLE_BRACKET: 60,
    CHAR_LEFT_CURLY_BRACE: 123,
    CHAR_LEFT_SQUARE_BRACKET: 91,
    CHAR_LINE_FEED: 10,
    CHAR_NO_BREAK_SPACE: 160,
    CHAR_PERCENT: 37,
    CHAR_PLUS: 43,
    CHAR_QUESTION_MARK: 63,
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    CHAR_RIGHT_CURLY_BRACE: 125,
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    CHAR_SEMICOLON: 59,
    CHAR_SINGLE_QUOTE: 39,
    CHAR_SPACE: 32,
    CHAR_TAB: 9,
    CHAR_UNDERSCORE: 95,
    CHAR_VERTICAL_LINE: 124,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    SEP: path.sep,
    extglobChars(chars) {
      return {
        "!": {type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})`},
        "?": {type: "qmark", open: "(?:", close: ")?"},
        "+": {type: "plus", open: "(?:", close: ")+"},
        "*": {type: "star", open: "(?:", close: ")*"},
        "@": {type: "at", open: "(?:", close: ")"}
      };
    },
    globChars(win32) {
      return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
  };
});

// node_modules/picomatch/lib/utils.js
var require_utils2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  var path = require("path");
  var win32 = process.platform === "win32";
  var {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = require_constants2();
  exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
  exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
  exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
  exports.removeBackslashes = (str) => {
    return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === "\\" ? "" : match;
    });
  };
  exports.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win32 === true || path.sep === "\\";
  };
  exports.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1)
      return input;
    if (input[idx - 1] === "\\")
      return exports.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
});

// node_modules/picomatch/lib/scan.js
var require_scan = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils2();
  var {
    CHAR_ASTERISK,
    CHAR_AT,
    CHAR_BACKWARD_SLASH,
    CHAR_COMMA,
    CHAR_DOT,
    CHAR_EXCLAMATION_MARK,
    CHAR_FORWARD_SLASH,
    CHAR_LEFT_CURLY_BRACE,
    CHAR_LEFT_PARENTHESES,
    CHAR_LEFT_SQUARE_BRACKET,
    CHAR_PLUS,
    CHAR_QUESTION_MARK,
    CHAR_RIGHT_CURLY_BRACE,
    CHAR_RIGHT_PARENTHESES,
    CHAR_RIGHT_SQUARE_BRACKET
  } = require_constants2();
  var isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  };
  var depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1;
    }
  };
  var scan = (input, options) => {
    const opts = options || {};
    const length = input.length - 1;
    const scanToEnd = opts.parts === true || opts.scanToEnd === true;
    const slashes = [];
    const tokens = [];
    const parts = [];
    let str = input;
    let index = -1;
    let start = 0;
    let lastIndex = 0;
    let isBrace = false;
    let isBracket = false;
    let isGlob = false;
    let isExtglob = false;
    let isGlobstar = false;
    let braceEscaped = false;
    let backslashes = false;
    let negated = false;
    let finished = false;
    let braces = 0;
    let prev;
    let code;
    let token = {value: "", depth: 0, isGlob: false};
    const eos = () => index >= length;
    const peek = () => str.charCodeAt(index + 1);
    const advance = () => {
      prev = code;
      return str.charCodeAt(++index);
    };
    while (index < length) {
      code = advance();
      let next;
      if (code === CHAR_BACKWARD_SLASH) {
        backslashes = token.backslashes = true;
        code = advance();
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braceEscaped = true;
        }
        continue;
      }
      if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
        braces++;
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            continue;
          }
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
            isBrace = token.isBrace = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (braceEscaped !== true && code === CHAR_COMMA) {
            isBrace = token.isBrace = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_RIGHT_CURLY_BRACE) {
            braces--;
            if (braces === 0) {
              braceEscaped = false;
              isBrace = token.isBrace = true;
              finished = true;
              break;
            }
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_FORWARD_SLASH) {
        slashes.push(index);
        tokens.push(token);
        token = {value: "", depth: 0, isGlob: false};
        if (finished === true)
          continue;
        if (prev === CHAR_DOT && index === start + 1) {
          start += 2;
          continue;
        }
        lastIndex = index + 1;
        continue;
      }
      if (opts.noext !== true) {
        const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          isExtglob = token.isExtglob = true;
          finished = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob = token.isGlob = true;
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
      }
      if (code === CHAR_ASTERISK) {
        if (prev === CHAR_ASTERISK)
          isGlobstar = token.isGlobstar = true;
        isGlob = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_QUESTION_MARK) {
        isGlob = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_LEFT_SQUARE_BRACKET) {
        while (eos() !== true && (next = advance())) {
          if (next === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            isBracket = token.isBracket = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
        }
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
        negated = token.negated = true;
        start++;
        continue;
      }
      if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_LEFT_PARENTHESES) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (isGlob === true) {
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
    }
    if (opts.noext === true) {
      isExtglob = false;
      isGlob = false;
    }
    let base = str;
    let prefix = "";
    let glob = "";
    if (start > 0) {
      prefix = str.slice(0, start);
      str = str.slice(start);
      lastIndex -= start;
    }
    if (base && isGlob === true && lastIndex > 0) {
      base = str.slice(0, lastIndex);
      glob = str.slice(lastIndex);
    } else if (isGlob === true) {
      base = "";
      glob = str;
    } else {
      base = str;
    }
    if (base && base !== "" && base !== "/" && base !== str) {
      if (isPathSeparator(base.charCodeAt(base.length - 1))) {
        base = base.slice(0, -1);
      }
    }
    if (opts.unescape === true) {
      if (glob)
        glob = utils.removeBackslashes(glob);
      if (base && backslashes === true) {
        base = utils.removeBackslashes(base);
      }
    }
    const state = {
      prefix,
      input,
      start,
      base,
      glob,
      isBrace,
      isBracket,
      isGlob,
      isExtglob,
      isGlobstar,
      negated
    };
    if (opts.tokens === true) {
      state.maxDepth = 0;
      if (!isPathSeparator(code)) {
        tokens.push(token);
      }
      state.tokens = tokens;
    }
    if (opts.parts === true || opts.tokens === true) {
      let prevIndex;
      for (let idx = 0; idx < slashes.length; idx++) {
        const n = prevIndex ? prevIndex + 1 : start;
        const i = slashes[idx];
        const value = input.slice(n, i);
        if (opts.tokens) {
          if (idx === 0 && start !== 0) {
            tokens[idx].isPrefix = true;
            tokens[idx].value = prefix;
          } else {
            tokens[idx].value = value;
          }
          depth(tokens[idx]);
          state.maxDepth += tokens[idx].depth;
        }
        if (idx !== 0 || value !== "") {
          parts.push(value);
        }
        prevIndex = i;
      }
      if (prevIndex && prevIndex + 1 < input.length) {
        const value = input.slice(prevIndex + 1);
        parts.push(value);
        if (opts.tokens) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
      }
      state.slashes = slashes;
      state.parts = parts;
    }
    return state;
  };
  module.exports = scan;
});

// node_modules/picomatch/lib/parse.js
var require_parse2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var constants = require_constants2();
  var utils = require_utils2();
  var {
    MAX_LENGTH,
    POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS
  } = constants;
  var expandRange = (args, options) => {
    if (typeof options.expandRange === "function") {
      return options.expandRange(...args, options);
    }
    args.sort();
    const value = `[${args.join("-")}]`;
    try {
      new RegExp(value);
    } catch (ex) {
      return args.map((v) => utils.escapeRegex(v)).join("..");
    }
    return value;
  };
  var syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
  };
  var parse = (input, options) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    input = REPLACEMENTS[input] || input;
    const opts = {...options};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    let len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    const bos = {type: "bos", value: "", output: opts.prepend || ""};
    const tokens = [bos];
    const capture = opts.capture ? "" : "?:";
    const win32 = utils.isWindows(options);
    const PLATFORM_CHARS = constants.globChars(win32);
    const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
    const {
      DOT_LITERAL,
      PLUS_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    } = PLATFORM_CHARS;
    const globstar = (opts2) => {
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const nodot = opts.dot ? "" : NO_DOT;
    const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    if (typeof opts.noext === "boolean") {
      opts.noextglob = opts.noext;
    }
    const state = {
      input,
      index: -1,
      start: 0,
      dot: opts.dot === true,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: false,
      negated: false,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: false,
      tokens
    };
    input = utils.removePrefix(input, state);
    len = input.length;
    const extglobs = [];
    const braces = [];
    const stack = [];
    let prev = bos;
    let value;
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index];
    const remaining = () => input.slice(state.index + 1);
    const consume = (value2 = "", num = 0) => {
      state.consumed += value2;
      state.index += num;
    };
    const append = (token) => {
      state.output += token.output != null ? token.output : token.value;
      consume(token.value);
    };
    const negate = () => {
      let count = 1;
      while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
        advance();
        state.start++;
        count++;
      }
      if (count % 2 === 0) {
        return false;
      }
      state.negated = true;
      state.start++;
      return true;
    };
    const increment = (type) => {
      state[type]++;
      stack.push(type);
    };
    const decrement = (type) => {
      state[type]--;
      stack.pop();
    };
    const push = (tok) => {
      if (prev.type === "globstar") {
        const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
        const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
        if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "star";
          prev.value = "*";
          prev.output = star;
          state.output += prev.output;
        }
      }
      if (extglobs.length && tok.type !== "paren" && !EXTGLOB_CHARS[tok.value]) {
        extglobs[extglobs.length - 1].inner += tok.value;
      }
      if (tok.value || tok.output)
        append(tok);
      if (prev && prev.type === "text" && tok.type === "text") {
        prev.value += tok.value;
        prev.output = (prev.output || "") + tok.value;
        return;
      }
      tok.prev = prev;
      tokens.push(tok);
      prev = tok;
    };
    const extglobOpen = (type, value2) => {
      const token = {...EXTGLOB_CHARS[value2], conditions: 1, inner: ""};
      token.prev = prev;
      token.parens = state.parens;
      token.output = state.output;
      const output = (opts.capture ? "(" : "") + token.open;
      increment("parens");
      push({type, value: value2, output: state.output ? "" : ONE_CHAR});
      push({type: "paren", extglob: true, value: advance(), output});
      extglobs.push(token);
    };
    const extglobClose = (token) => {
      let output = token.close + (opts.capture ? ")" : "");
      if (token.type === "negate") {
        let extglobStar = star;
        if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
          extglobStar = globstar(opts);
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`;
        }
        if (token.prev.type === "bos" && eos()) {
          state.negatedExtglob = true;
        }
      }
      push({type: "paren", extglob: true, value, output});
      decrement("parens");
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false;
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
        if (first === "\\") {
          backslashes = true;
          return m;
        }
        if (first === "?") {
          if (esc) {
            return esc + first + (rest ? QMARK.repeat(rest.length) : "");
          }
          if (index === 0) {
            return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
          }
          return QMARK.repeat(chars.length);
        }
        if (first === ".") {
          return DOT_LITERAL.repeat(chars.length);
        }
        if (first === "*") {
          if (esc) {
            return esc + first + (rest ? star : "");
          }
          return star;
        }
        return esc ? m : `\\${m}`;
      });
      if (backslashes === true) {
        if (opts.unescape === true) {
          output = output.replace(/\\/g, "");
        } else {
          output = output.replace(/\\+/g, (m) => {
            return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
          });
        }
      }
      if (output === input && opts.contains === true) {
        state.output = input;
        return state;
      }
      state.output = utils.wrapOutput(output, state, options);
      return state;
    }
    while (!eos()) {
      value = advance();
      if (value === "\0") {
        continue;
      }
      if (value === "\\") {
        const next = peek();
        if (next === "/" && opts.bash !== true) {
          continue;
        }
        if (next === "." || next === ";") {
          continue;
        }
        if (!next) {
          value += "\\";
          push({type: "text", value});
          continue;
        }
        const match = /^\\+/.exec(remaining());
        let slashes = 0;
        if (match && match[0].length > 2) {
          slashes = match[0].length;
          state.index += slashes;
          if (slashes % 2 !== 0) {
            value += "\\";
          }
        }
        if (opts.unescape === true) {
          value = advance() || "";
        } else {
          value += advance() || "";
        }
        if (state.brackets === 0) {
          push({type: "text", value});
          continue;
        }
      }
      if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
        if (opts.posix !== false && value === ":") {
          const inner = prev.value.slice(1);
          if (inner.includes("[")) {
            prev.posix = true;
            if (inner.includes(":")) {
              const idx = prev.value.lastIndexOf("[");
              const pre = prev.value.slice(0, idx);
              const rest2 = prev.value.slice(idx + 2);
              const posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix;
                state.backtrack = true;
                advance();
                if (!bos.output && tokens.indexOf(prev) === 1) {
                  bos.output = ONE_CHAR;
                }
                continue;
              }
            }
          }
        }
        if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
          value = `\\${value}`;
        }
        if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
          value = `\\${value}`;
        }
        if (opts.posix === true && value === "!" && prev.value === "[") {
          value = "^";
        }
        prev.value += value;
        append({value});
        continue;
      }
      if (state.quotes === 1 && value !== '"') {
        value = utils.escapeRegex(value);
        prev.value += value;
        append({value});
        continue;
      }
      if (value === '"') {
        state.quotes = state.quotes === 1 ? 0 : 1;
        if (opts.keepQuotes === true) {
          push({type: "text", value});
        }
        continue;
      }
      if (value === "(") {
        increment("parens");
        push({type: "paren", value});
        continue;
      }
      if (value === ")") {
        if (state.parens === 0 && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "("));
        }
        const extglob = extglobs[extglobs.length - 1];
        if (extglob && state.parens === extglob.parens + 1) {
          extglobClose(extglobs.pop());
          continue;
        }
        push({type: "paren", value, output: state.parens ? ")" : "\\)"});
        decrement("parens");
        continue;
      }
      if (value === "[") {
        if (opts.nobracket === true || !remaining().includes("]")) {
          if (opts.nobracket !== true && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("closing", "]"));
          }
          value = `\\${value}`;
        } else {
          increment("brackets");
        }
        push({type: "bracket", value});
        continue;
      }
      if (value === "]") {
        if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
          push({type: "text", value, output: `\\${value}`});
          continue;
        }
        if (state.brackets === 0) {
          if (opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "["));
          }
          push({type: "text", value, output: `\\${value}`});
          continue;
        }
        decrement("brackets");
        const prevValue = prev.value.slice(1);
        if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
          value = `/${value}`;
        }
        prev.value += value;
        append({value});
        if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
          continue;
        }
        const escaped = utils.escapeRegex(prev.value);
        state.output = state.output.slice(0, -prev.value.length);
        if (opts.literalBrackets === true) {
          state.output += escaped;
          prev.value = escaped;
          continue;
        }
        prev.value = `(${capture}${escaped}|${prev.value})`;
        state.output += prev.value;
        continue;
      }
      if (value === "{" && opts.nobrace !== true) {
        increment("braces");
        const open = {
          type: "brace",
          value,
          output: "(",
          outputIndex: state.output.length,
          tokensIndex: state.tokens.length
        };
        braces.push(open);
        push(open);
        continue;
      }
      if (value === "}") {
        const brace = braces[braces.length - 1];
        if (opts.nobrace === true || !brace) {
          push({type: "text", value, output: value});
          continue;
        }
        let output = ")";
        if (brace.dots === true) {
          const arr = tokens.slice();
          const range = [];
          for (let i = arr.length - 1; i >= 0; i--) {
            tokens.pop();
            if (arr[i].type === "brace") {
              break;
            }
            if (arr[i].type !== "dots") {
              range.unshift(arr[i].value);
            }
          }
          output = expandRange(range, opts);
          state.backtrack = true;
        }
        if (brace.comma !== true && brace.dots !== true) {
          const out = state.output.slice(0, brace.outputIndex);
          const toks = state.tokens.slice(brace.tokensIndex);
          brace.value = brace.output = "\\{";
          value = output = "\\}";
          state.output = out;
          for (const t of toks) {
            state.output += t.output || t.value;
          }
        }
        push({type: "brace", value, output});
        decrement("braces");
        braces.pop();
        continue;
      }
      if (value === "|") {
        if (extglobs.length > 0) {
          extglobs[extglobs.length - 1].conditions++;
        }
        push({type: "text", value});
        continue;
      }
      if (value === ",") {
        let output = value;
        const brace = braces[braces.length - 1];
        if (brace && stack[stack.length - 1] === "braces") {
          brace.comma = true;
          output = "|";
        }
        push({type: "comma", value, output});
        continue;
      }
      if (value === "/") {
        if (prev.type === "dot" && state.index === state.start + 1) {
          state.start = state.index + 1;
          state.consumed = "";
          state.output = "";
          tokens.pop();
          prev = bos;
          continue;
        }
        push({type: "slash", value, output: SLASH_LITERAL});
        continue;
      }
      if (value === ".") {
        if (state.braces > 0 && prev.type === "dot") {
          if (prev.value === ".")
            prev.output = DOT_LITERAL;
          const brace = braces[braces.length - 1];
          prev.type = "dots";
          prev.output += value;
          prev.value += value;
          brace.dots = true;
          continue;
        }
        if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
          push({type: "text", value, output: DOT_LITERAL});
          continue;
        }
        push({type: "dot", value, output: DOT_LITERAL});
        continue;
      }
      if (value === "?") {
        const isGroup = prev && prev.value === "(";
        if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("qmark", value);
          continue;
        }
        if (prev && prev.type === "paren") {
          const next = peek();
          let output = value;
          if (next === "<" && !utils.supportsLookbehinds()) {
            throw new Error("Node.js v10 or higher is required for regex lookbehinds");
          }
          if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
            output = `\\${value}`;
          }
          push({type: "text", value, output});
          continue;
        }
        if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
          push({type: "qmark", value, output: QMARK_NO_DOT});
          continue;
        }
        push({type: "qmark", value, output: QMARK});
        continue;
      }
      if (value === "!") {
        if (opts.noextglob !== true && peek() === "(") {
          if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
            extglobOpen("negate", value);
            continue;
          }
        }
        if (opts.nonegate !== true && state.index === 0) {
          negate();
          continue;
        }
      }
      if (value === "+") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("plus", value);
          continue;
        }
        if (prev && prev.value === "(" || opts.regex === false) {
          push({type: "plus", value, output: PLUS_LITERAL});
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
          push({type: "plus", value});
          continue;
        }
        push({type: "plus", value: PLUS_LITERAL});
        continue;
      }
      if (value === "@") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          push({type: "at", extglob: true, value, output: ""});
          continue;
        }
        push({type: "text", value});
        continue;
      }
      if (value !== "*") {
        if (value === "$" || value === "^") {
          value = `\\${value}`;
        }
        const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
        if (match) {
          value += match[0];
          state.index += match[0].length;
        }
        push({type: "text", value});
        continue;
      }
      if (prev && (prev.type === "globstar" || prev.star === true)) {
        prev.type = "star";
        prev.star = true;
        prev.value += value;
        prev.output = star;
        state.backtrack = true;
        state.globstar = true;
        consume(value);
        continue;
      }
      let rest = remaining();
      if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
        extglobOpen("star", value);
        continue;
      }
      if (prev.type === "star") {
        if (opts.noglobstar === true) {
          consume(value);
          continue;
        }
        const prior = prev.prev;
        const before = prior.prev;
        const isStart = prior.type === "slash" || prior.type === "bos";
        const afterStar = before && (before.type === "star" || before.type === "globstar");
        if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
          push({type: "star", value, output: ""});
          continue;
        }
        const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
        const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
        if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
          push({type: "star", value, output: ""});
          continue;
        }
        while (rest.slice(0, 3) === "/**") {
          const after = input[state.index + 4];
          if (after && after !== "/") {
            break;
          }
          rest = rest.slice(3);
          consume("/**", 3);
        }
        if (prior.type === "bos" && eos()) {
          prev.type = "globstar";
          prev.value += value;
          prev.output = globstar(opts);
          state.output = prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
          prev.value += value;
          state.globstar = true;
          state.output += prior.output + prev.output;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
          const end = rest[1] !== void 0 ? "|$" : "";
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
          prev.value += value;
          state.output += prior.output + prev.output;
          state.globstar = true;
          consume(value + advance());
          push({type: "slash", value: "/", output: ""});
          continue;
        }
        if (prior.type === "bos" && rest[0] === "/") {
          prev.type = "globstar";
          prev.value += value;
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
          state.output = prev.output;
          state.globstar = true;
          consume(value + advance());
          push({type: "slash", value: "/", output: ""});
          continue;
        }
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "globstar";
        prev.output = globstar(opts);
        prev.value += value;
        state.output += prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      const token = {type: "star", value, output: star};
      if (opts.bash === true) {
        token.output = ".*?";
        if (prev.type === "bos" || prev.type === "slash") {
          token.output = nodot + token.output;
        }
        push(token);
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
        token.output = value;
        push(token);
        continue;
      }
      if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
        if (prev.type === "dot") {
          state.output += NO_DOT_SLASH;
          prev.output += NO_DOT_SLASH;
        } else if (opts.dot === true) {
          state.output += NO_DOTS_SLASH;
          prev.output += NO_DOTS_SLASH;
        } else {
          state.output += nodot;
          prev.output += nodot;
        }
        if (peek() !== "*") {
          state.output += ONE_CHAR;
          prev.output += ONE_CHAR;
        }
      }
      push(token);
    }
    while (state.brackets > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", "]"));
      state.output = utils.escapeLast(state.output, "[");
      decrement("brackets");
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", ")"));
      state.output = utils.escapeLast(state.output, "(");
      decrement("parens");
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", "}"));
      state.output = utils.escapeLast(state.output, "{");
      decrement("braces");
    }
    if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
      push({type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?`});
    }
    if (state.backtrack === true) {
      state.output = "";
      for (const token of state.tokens) {
        state.output += token.output != null ? token.output : token.value;
        if (token.suffix) {
          state.output += token.suffix;
        }
      }
    }
    return state;
  };
  parse.fastpaths = (input, options) => {
    const opts = {...options};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    const len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    const win32 = utils.isWindows(options);
    const {
      DOT_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOTS_SLASH,
      STAR,
      START_ANCHOR
    } = constants.globChars(win32);
    const nodot = opts.dot ? NO_DOTS : NO_DOT;
    const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    const capture = opts.capture ? "" : "?:";
    const state = {negated: false, prefix: ""};
    let star = opts.bash === true ? ".*?" : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    const globstar = (opts2) => {
      if (opts2.noglobstar === true)
        return star;
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = (str) => {
      switch (str) {
        case "*":
          return `${nodot}${ONE_CHAR}${star}`;
        case ".*":
          return `${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*.*":
          return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*/*":
          return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
        case "**":
          return nodot + globstar(opts);
        case "**/*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
        case "**/*.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "**/.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
        default: {
          const match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match)
            return;
          const source2 = create(match[1]);
          if (!source2)
            return;
          return source2 + DOT_LITERAL + match[2];
        }
      }
    };
    const output = utils.removePrefix(input, state);
    let source = create(output);
    if (source && opts.strictSlashes !== true) {
      source += `${SLASH_LITERAL}?`;
    }
    return source;
  };
  module.exports = parse;
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path = require("path");
  var scan = require_scan();
  var parse = require_parse2();
  var utils = require_utils2();
  var constants = require_constants2();
  var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
  var picomatch = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
      const fns = glob.map((input) => picomatch(input, options, returnState));
      const arrayMatcher = (str) => {
        for (const isMatch of fns) {
          const state2 = isMatch(str);
          if (state2)
            return state2;
        }
        return false;
      };
      return arrayMatcher;
    }
    const isState = isObject(glob) && glob.tokens && glob.input;
    if (glob === "" || typeof glob !== "string" && !isState) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const opts = options || {};
    const posix = utils.isWindows(options);
    const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
    const state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
      const ignoreOpts = {...options, ignore: null, onMatch: null, onResult: null};
      isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
      const {isMatch, match, output} = picomatch.test(input, regex, options, {glob, posix});
      const result = {glob, state, regex, posix, input, output, match, isMatch};
      if (typeof opts.onResult === "function") {
        opts.onResult(result);
      }
      if (isMatch === false) {
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (isIgnored(input)) {
        if (typeof opts.onIgnore === "function") {
          opts.onIgnore(result);
        }
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (typeof opts.onMatch === "function") {
        opts.onMatch(result);
      }
      return returnObject ? result : true;
    };
    if (returnState) {
      matcher.state = state;
    }
    return matcher;
  };
  picomatch.test = (input, regex, options, {glob, posix} = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    if (input === "") {
      return {isMatch: false, output: ""};
    }
    const opts = options || {};
    const format = opts.format || (posix ? utils.toPosixSlashes : null);
    let match = input === glob;
    let output = match && format ? format(input) : input;
    if (match === false) {
      output = format ? format(input) : input;
      match = output === glob;
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch.matchBase(input, regex, options, posix);
      } else {
        match = regex.exec(output);
      }
    }
    return {isMatch: Boolean(match), match, output};
  };
  picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
    const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
    return regex.test(path.basename(input));
  };
  picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
  picomatch.parse = (pattern, options) => {
    if (Array.isArray(pattern))
      return pattern.map((p) => picomatch.parse(p, options));
    return parse(pattern, {...options, fastpaths: false});
  };
  picomatch.scan = (input, options) => scan(input, options);
  picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return parsed.output;
    }
    const opts = options || {};
    const prepend = opts.contains ? "" : "^";
    const append = opts.contains ? "" : "$";
    let source = `${prepend}(?:${parsed.output})${append}`;
    if (parsed && parsed.negated === true) {
      source = `^(?!${source}).*$`;
    }
    const regex = picomatch.toRegex(source, options);
    if (returnState === true) {
      regex.state = parsed;
    }
    return regex;
  };
  picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== "string") {
      throw new TypeError("Expected a non-empty string");
    }
    const opts = options || {};
    let parsed = {negated: false, fastpaths: true};
    let prefix = "";
    let output;
    if (input.startsWith("./")) {
      input = input.slice(2);
      prefix = parsed.prefix = "./";
    }
    if (opts.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
      output = parse.fastpaths(input, options);
    }
    if (output === void 0) {
      parsed = parse(input, options);
      parsed.prefix = prefix + (parsed.prefix || "");
    } else {
      parsed.output = output;
    }
    return picomatch.compileRe(parsed, options, returnOutput, returnState);
  };
  picomatch.toRegex = (source, options) => {
    try {
      const opts = options || {};
      return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
    } catch (err) {
      if (options && options.debug === true)
        throw err;
      return /$^/;
    }
  };
  picomatch.constants = constants;
  module.exports = picomatch;
});

// node_modules/picomatch/index.js
var require_picomatch2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = require_picomatch();
});

// node_modules/micromatch/index.js
var require_micromatch = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var util = require("util");
  var braces = require_braces();
  var picomatch = require_picomatch2();
  var utils = require_utils2();
  var isEmptyString = (val) => typeof val === "string" && (val === "" || val === "./");
  var micromatch = (list, patterns, options) => {
    patterns = [].concat(patterns);
    list = [].concat(list);
    let omit = new Set();
    let keep = new Set();
    let items = new Set();
    let negatives = 0;
    let onResult = (state) => {
      items.add(state.output);
      if (options && options.onResult) {
        options.onResult(state);
      }
    };
    for (let i = 0; i < patterns.length; i++) {
      let isMatch = picomatch(String(patterns[i]), {...options, onResult}, true);
      let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
      if (negated)
        negatives++;
      for (let item of list) {
        let matched = isMatch(item, true);
        let match = negated ? !matched.isMatch : matched.isMatch;
        if (!match)
          continue;
        if (negated) {
          omit.add(matched.output);
        } else {
          omit.delete(matched.output);
          keep.add(matched.output);
        }
      }
    }
    let result = negatives === patterns.length ? [...items] : [...keep];
    let matches = result.filter((item) => !omit.has(item));
    if (options && matches.length === 0) {
      if (options.failglob === true) {
        throw new Error(`No matches found for "${patterns.join(", ")}"`);
      }
      if (options.nonull === true || options.nullglob === true) {
        return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
      }
    }
    return matches;
  };
  micromatch.match = micromatch;
  micromatch.matcher = (pattern, options) => picomatch(pattern, options);
  micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
  micromatch.any = micromatch.isMatch;
  micromatch.not = (list, patterns, options = {}) => {
    patterns = [].concat(patterns).map(String);
    let result = new Set();
    let items = [];
    let onResult = (state) => {
      if (options.onResult)
        options.onResult(state);
      items.push(state.output);
    };
    let matches = micromatch(list, patterns, {...options, onResult});
    for (let item of items) {
      if (!matches.includes(item)) {
        result.add(item);
      }
    }
    return [...result];
  };
  micromatch.contains = (str, pattern, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    if (Array.isArray(pattern)) {
      return pattern.some((p) => micromatch.contains(str, p, options));
    }
    if (typeof pattern === "string") {
      if (isEmptyString(str) || isEmptyString(pattern)) {
        return false;
      }
      if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
        return true;
      }
    }
    return micromatch.isMatch(str, pattern, {...options, contains: true});
  };
  micromatch.matchKeys = (obj, patterns, options) => {
    if (!utils.isObject(obj)) {
      throw new TypeError("Expected the first argument to be an object");
    }
    let keys = micromatch(Object.keys(obj), patterns, options);
    let res = {};
    for (let key of keys)
      res[key] = obj[key];
    return res;
  };
  micromatch.some = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options);
      if (items.some((item) => isMatch(item))) {
        return true;
      }
    }
    return false;
  };
  micromatch.every = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options);
      if (!items.every((item) => isMatch(item))) {
        return false;
      }
    }
    return true;
  };
  micromatch.all = (str, patterns, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    return [].concat(patterns).every((p) => picomatch(p, options)(str));
  };
  micromatch.capture = (glob, input, options) => {
    let posix = utils.isWindows(options);
    let regex = picomatch.makeRe(String(glob), {...options, capture: true});
    let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
    if (match) {
      return match.slice(1).map((v) => v === void 0 ? "" : v);
    }
  };
  micromatch.makeRe = (...args) => picomatch.makeRe(...args);
  micromatch.scan = (...args) => picomatch.scan(...args);
  micromatch.parse = (patterns, options) => {
    let res = [];
    for (let pattern of [].concat(patterns || [])) {
      for (let str of braces(String(pattern), options)) {
        res.push(picomatch.parse(str, options));
      }
    }
    return res;
  };
  micromatch.braces = (pattern, options) => {
    if (typeof pattern !== "string")
      throw new TypeError("Expected a string");
    if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
      return [pattern];
    }
    return braces(pattern, options);
  };
  micromatch.braceExpand = (pattern, options) => {
    if (typeof pattern !== "string")
      throw new TypeError("Expected a string");
    return micromatch.braces(pattern, {...options, expand: true});
  };
  module.exports = micromatch;
});

// node_modules/majo/node_modules/fast-glob/out/utils/pattern.js
var require_pattern = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var globParent = require_glob_parent();
  var micromatch = require_micromatch();
  var picomatch = require_picomatch2();
  var GLOBSTAR = "**";
  var ESCAPE_SYMBOL = "\\";
  var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
  var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/;
  var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/;
  var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/;
  var BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/;
  function isStaticPattern(pattern, options = {}) {
    return !isDynamicPattern(pattern, options);
  }
  exports.isStaticPattern = isStaticPattern;
  function isDynamicPattern(pattern, options = {}) {
    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
      return true;
    }
    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    if (options.braceExpansion !== false && BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    return false;
  }
  exports.isDynamicPattern = isDynamicPattern;
  function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
  }
  exports.convertToPositivePattern = convertToPositivePattern;
  function convertToNegativePattern(pattern) {
    return "!" + pattern;
  }
  exports.convertToNegativePattern = convertToNegativePattern;
  function isNegativePattern(pattern) {
    return pattern.startsWith("!") && pattern[1] !== "(";
  }
  exports.isNegativePattern = isNegativePattern;
  function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
  }
  exports.isPositivePattern = isPositivePattern;
  function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
  }
  exports.getNegativePatterns = getNegativePatterns;
  function getPositivePatterns(patterns) {
    return patterns.filter(isPositivePattern);
  }
  exports.getPositivePatterns = getPositivePatterns;
  function getBaseDirectory(pattern) {
    return globParent(pattern, {flipBackslashes: false});
  }
  exports.getBaseDirectory = getBaseDirectory;
  function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR);
  }
  exports.hasGlobStar = hasGlobStar;
  function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith("/" + GLOBSTAR);
  }
  exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
  function isAffectDepthOfReadingPattern(pattern) {
    const basename = path.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
  }
  exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
  function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
      return collection.concat(expandBraceExpansion(pattern));
    }, []);
  }
  exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
  function expandBraceExpansion(pattern) {
    return micromatch.braces(pattern, {
      expand: true,
      nodupes: true
    });
  }
  exports.expandBraceExpansion = expandBraceExpansion;
  function getPatternParts(pattern, options) {
    const info = picomatch.scan(pattern, Object.assign(Object.assign({}, options), {parts: true}));
    if (info.parts.length === 0) {
      return [pattern];
    }
    return info.parts;
  }
  exports.getPatternParts = getPatternParts;
  function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
  }
  exports.makeRe = makeRe;
  function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
  }
  exports.convertPatternsToRe = convertPatternsToRe;
  function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry));
  }
  exports.matchAny = matchAny;
});

// node_modules/merge2/index.js
var require_merge2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var Stream = require("stream");
  var PassThrough = Stream.PassThrough;
  var slice = Array.prototype.slice;
  module.exports = merge2;
  function merge2() {
    const streamsQueue = [];
    let merging = false;
    const args = slice.call(arguments);
    let options = args[args.length - 1];
    if (options && !Array.isArray(options) && options.pipe == null)
      args.pop();
    else
      options = {};
    const doEnd = options.end !== false;
    if (options.objectMode == null)
      options.objectMode = true;
    if (options.highWaterMark == null)
      options.highWaterMark = 64 * 1024;
    const mergedStream = PassThrough(options);
    function addStream() {
      for (let i = 0, len = arguments.length; i < len; i++) {
        streamsQueue.push(pauseStreams(arguments[i], options));
      }
      mergeStream();
      return this;
    }
    function mergeStream() {
      if (merging)
        return;
      merging = true;
      let streams = streamsQueue.shift();
      if (!streams) {
        process.nextTick(endStream);
        return;
      }
      if (!Array.isArray(streams))
        streams = [streams];
      let pipesCount = streams.length + 1;
      function next() {
        if (--pipesCount > 0)
          return;
        merging = false;
        mergeStream();
      }
      function pipe(stream) {
        function onend() {
          stream.removeListener("merge2UnpipeEnd", onend);
          stream.removeListener("end", onend);
          next();
        }
        if (stream._readableState.endEmitted)
          return next();
        stream.on("merge2UnpipeEnd", onend);
        stream.on("end", onend);
        stream.pipe(mergedStream, {end: false});
        stream.resume();
      }
      for (let i = 0; i < streams.length; i++)
        pipe(streams[i]);
      next();
    }
    function endStream() {
      merging = false;
      mergedStream.emit("queueDrain");
      return doEnd && mergedStream.end();
    }
    mergedStream.setMaxListeners(0);
    mergedStream.add = addStream;
    mergedStream.on("unpipe", function(stream) {
      stream.emit("merge2UnpipeEnd");
    });
    if (args.length)
      addStream.apply(null, args);
    return mergedStream;
  }
  function pauseStreams(streams, options) {
    if (!Array.isArray(streams)) {
      if (!streams._readableState && streams.pipe)
        streams = streams.pipe(PassThrough(options));
      if (!streams._readableState || !streams.pause || !streams.pipe) {
        throw new Error("Only readable stream can be merged.");
      }
      streams.pause();
    } else {
      for (let i = 0, len = streams.length; i < len; i++)
        streams[i] = pauseStreams(streams[i], options);
    }
    return streams;
  }
});

// node_modules/majo/node_modules/fast-glob/out/utils/stream.js
var require_stream = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var merge2 = require_merge2();
  function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
      stream.once("error", (error) => mergedStream.emit("error", error));
    });
    mergedStream.once("close", () => propagateCloseEventToSources(streams));
    mergedStream.once("end", () => propagateCloseEventToSources(streams));
    return mergedStream;
  }
  exports.merge = merge;
  function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit("close"));
  }
});

// node_modules/majo/node_modules/fast-glob/out/utils/string.js
var require_string = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function isString(input) {
    return typeof input === "string";
  }
  exports.isString = isString;
  function isEmpty(input) {
    return input === "";
  }
  exports.isEmpty = isEmpty;
});

// node_modules/majo/node_modules/fast-glob/out/utils/index.js
var require_utils3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var array = require_array();
  exports.array = array;
  var errno = require_errno();
  exports.errno = errno;
  var fs3 = require_fs();
  exports.fs = fs3;
  var path = require_path();
  exports.path = path;
  var pattern = require_pattern();
  exports.pattern = pattern;
  var stream = require_stream();
  exports.stream = stream;
  var string = require_string();
  exports.string = string;
});

// node_modules/majo/node_modules/fast-glob/out/managers/tasks.js
var require_tasks = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
    const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
    const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true);
    return staticTasks.concat(dynamicTasks);
  }
  exports.generate = generate;
  function convertPatternsToTasks(positive, negative, dynamic) {
    const positivePatternsGroup = groupPatternsByBaseDirectory(positive);
    if ("." in positivePatternsGroup) {
      const task = convertPatternGroupToTask(".", positive, negative, dynamic);
      return [task];
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic);
  }
  exports.convertPatternsToTasks = convertPatternsToTasks;
  function getPositivePatterns(patterns) {
    return utils.pattern.getPositivePatterns(patterns);
  }
  exports.getPositivePatterns = getPositivePatterns;
  function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils.pattern.convertToPositivePattern);
    return positive;
  }
  exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
  function groupPatternsByBaseDirectory(patterns) {
    const group = {};
    return patterns.reduce((collection, pattern) => {
      const base = utils.pattern.getBaseDirectory(pattern);
      if (base in collection) {
        collection[base].push(pattern);
      } else {
        collection[base] = [pattern];
      }
      return collection;
    }, group);
  }
  exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
  function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
      return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
  }
  exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
  function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
      dynamic,
      positive,
      negative,
      base,
      patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
    };
  }
  exports.convertPatternGroupToTask = convertPatternGroupToTask;
});

// node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function read(path, settings, callback) {
    settings.fs.lstat(path, (lstatError, lstat) => {
      if (lstatError !== null) {
        return callFailureCallback(callback, lstatError);
      }
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return callSuccessCallback(callback, lstat);
      }
      settings.fs.stat(path, (statError, stat) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return callFailureCallback(callback, statError);
          }
          return callSuccessCallback(callback, lstat);
        }
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true;
        }
        callSuccessCallback(callback, stat);
      });
    });
  }
  exports.read = read;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, result) {
    callback(null, result);
  }
});

// node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function read(path, settings) {
    const lstat = settings.fs.lstatSync(path);
    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
      return lstat;
    }
    try {
      const stat = settings.fs.statSync(path);
      if (settings.markSymbolicLink) {
        stat.isSymbolicLink = () => true;
      }
      return stat;
    } catch (error) {
      if (!settings.throwErrorOnBrokenSymbolicLink) {
        return lstat;
      }
      throw error;
    }
  }
  exports.read = read;
});

// node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fs3 = require("fs");
  exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs3.lstat,
    stat: fs3.stat,
    lstatSync: fs3.lstatSync,
    statSync: fs3.statSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports.createFileSystemAdapter = createFileSystemAdapter;
});

// node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fs3 = require_fs2();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
      this.fs = fs3.createFileSystemAdapter(this._options.fs);
      this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
  };
  exports.default = Settings;
});

// node_modules/@nodelib/fs.stat/out/index.js
var require_out = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var async = require_async();
  var sync = require_sync();
  var settings_1 = require_settings();
  exports.Settings = settings_1.default;
  function stat(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return async.read(path, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
  }
  exports.stat = stat;
  function statSync(path, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path, settings);
  }
  exports.statSync = statSync;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// node_modules/run-parallel/index.js
var require_run_parallel = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = runParallel;
  function runParallel(tasks, cb) {
    var results, pending, keys;
    var isSync = true;
    if (Array.isArray(tasks)) {
      results = [];
      pending = tasks.length;
    } else {
      keys = Object.keys(tasks);
      results = {};
      pending = keys.length;
    }
    function done(err) {
      function end() {
        if (cb)
          cb(err, results);
        cb = null;
      }
      if (isSync)
        process.nextTick(end);
      else
        end();
    }
    function each(i, err, result) {
      results[i] = result;
      if (--pending === 0 || err) {
        done(err);
      }
    }
    if (!pending) {
      done(null);
    } else if (keys) {
      keys.forEach(function(key) {
        tasks[key](function(err, result) {
          each(key, err, result);
        });
      });
    } else {
      tasks.forEach(function(task, i) {
        task(function(err, result) {
          each(i, err, result);
        });
      });
    }
    isSync = false;
  }
});

// node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
  var MAJOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
  var MINOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
  var SUPPORTED_MAJOR_VERSION = 10;
  var SUPPORTED_MINOR_VERSION = 10;
  var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
  var IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
  exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
});

// node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var DirentFromStats = class {
    constructor(name, stats) {
      this.name = name;
      this.isBlockDevice = stats.isBlockDevice.bind(stats);
      this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
      this.isDirectory = stats.isDirectory.bind(stats);
      this.isFIFO = stats.isFIFO.bind(stats);
      this.isFile = stats.isFile.bind(stats);
      this.isSocket = stats.isSocket.bind(stats);
      this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
  };
  function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
  }
  exports.createDirentFromStats = createDirentFromStats;
});

// node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fs3 = require_fs3();
  exports.fs = fs3;
});

// node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fsStat = require_out();
  var rpl = require_run_parallel();
  var constants_1 = require_constants3();
  var utils = require_utils4();
  function read(directory, settings, callback) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings, callback);
    }
    return readdir(directory, settings, callback);
  }
  exports.read = read;
  function readdirWithFileTypes(directory, settings, callback) {
    settings.fs.readdir(directory, {withFileTypes: true}, (readdirError, dirents) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError);
      }
      const entries = dirents.map((dirent) => ({
        dirent,
        name: dirent.name,
        path: `${directory}${settings.pathSegmentSeparator}${dirent.name}`
      }));
      if (!settings.followSymbolicLinks) {
        return callSuccessCallback(callback, entries);
      }
      const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
      rpl(tasks, (rplError, rplEntries) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError);
        }
        callSuccessCallback(callback, rplEntries);
      });
    });
  }
  exports.readdirWithFileTypes = readdirWithFileTypes;
  function makeRplTaskEntry(entry, settings) {
    return (done) => {
      if (!entry.dirent.isSymbolicLink()) {
        return done(null, entry);
      }
      settings.fs.stat(entry.path, (statError, stats) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return done(statError);
          }
          return done(null, entry);
        }
        entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
        return done(null, entry);
      });
    };
  }
  function readdir(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError);
      }
      const filepaths = names.map((name) => `${directory}${settings.pathSegmentSeparator}${name}`);
      const tasks = filepaths.map((filepath) => {
        return (done) => fsStat.stat(filepath, settings.fsStatSettings, done);
      });
      rpl(tasks, (rplError, results) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError);
        }
        const entries = [];
        names.forEach((name, index) => {
          const stats = results[index];
          const entry = {
            name,
            path: filepaths[index],
            dirent: utils.fs.createDirentFromStats(name, stats)
          };
          if (settings.stats) {
            entry.stats = stats;
          }
          entries.push(entry);
        });
        callSuccessCallback(callback, entries);
      });
    });
  }
  exports.readdir = readdir;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, result) {
    callback(null, result);
  }
});

// node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fsStat = require_out();
  var constants_1 = require_constants3();
  var utils = require_utils4();
  function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings);
    }
    return readdir(directory, settings);
  }
  exports.read = read;
  function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, {withFileTypes: true});
    return dirents.map((dirent) => {
      const entry = {
        dirent,
        name: dirent.name,
        path: `${directory}${settings.pathSegmentSeparator}${dirent.name}`
      };
      if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
        try {
          const stats = settings.fs.statSync(entry.path);
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
        } catch (error) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            throw error;
          }
        }
      }
      return entry;
    });
  }
  exports.readdirWithFileTypes = readdirWithFileTypes;
  function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory);
    return names.map((name) => {
      const entryPath = `${directory}${settings.pathSegmentSeparator}${name}`;
      const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
      const entry = {
        name,
        path: entryPath,
        dirent: utils.fs.createDirentFromStats(name, stats)
      };
      if (settings.stats) {
        entry.stats = stats;
      }
      return entry;
    });
  }
  exports.readdir = readdir;
});

// node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fs3 = require("fs");
  exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs3.lstat,
    stat: fs3.stat,
    lstatSync: fs3.lstatSync,
    statSync: fs3.statSync,
    readdir: fs3.readdir,
    readdirSync: fs3.readdirSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports.createFileSystemAdapter = createFileSystemAdapter;
});

// node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var fsStat = require_out();
  var fs3 = require_fs4();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
      this.fs = fs3.createFileSystemAdapter(this._options.fs);
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
      this.stats = this._getValue(this._options.stats, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
      this.fsStatSettings = new fsStat.Settings({
        followSymbolicLink: this.followSymbolicLinks,
        fs: this.fs,
        throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
      });
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
  };
  exports.default = Settings;
});

// node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var async = require_async2();
  var sync = require_sync2();
  var settings_1 = require_settings2();
  exports.Settings = settings_1.default;
  function scandir(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return async.read(path, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
  }
  exports.scandir = scandir;
  function scandirSync(path, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path, settings);
  }
  exports.scandirSync = scandirSync;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// node_modules/reusify/reusify.js
var require_reusify = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  function reusify(Constructor) {
    var head = new Constructor();
    var tail = head;
    function get() {
      var current = head;
      if (current.next) {
        head = current.next;
      } else {
        head = new Constructor();
        tail = head;
      }
      current.next = null;
      return current;
    }
    function release(obj) {
      tail.next = obj;
      tail = obj;
    }
    return {
      get,
      release
    };
  }
  module.exports = reusify;
});

// node_modules/fastq/queue.js
var require_queue = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var reusify = require_reusify();
  function fastqueue(context, worker, concurrency) {
    if (typeof context === "function") {
      concurrency = worker;
      worker = context;
      context = null;
    }
    var cache = reusify(Task);
    var queueHead = null;
    var queueTail = null;
    var _running = 0;
    var self = {
      push,
      drain: noop,
      saturated: noop,
      pause,
      paused: false,
      concurrency,
      running,
      resume,
      idle,
      length,
      getQueue,
      unshift,
      empty: noop,
      kill,
      killAndDrain
    };
    return self;
    function running() {
      return _running;
    }
    function pause() {
      self.paused = true;
    }
    function length() {
      var current = queueHead;
      var counter = 0;
      while (current) {
        current = current.next;
        counter++;
      }
      return counter;
    }
    function getQueue() {
      var current = queueHead;
      var tasks = [];
      while (current) {
        tasks.push(current.value);
        current = current.next;
      }
      return tasks;
    }
    function resume() {
      if (!self.paused)
        return;
      self.paused = false;
      for (var i = 0; i < self.concurrency; i++) {
        _running++;
        release();
      }
    }
    function idle() {
      return _running === 0 && self.length() === 0;
    }
    function push(value, done) {
      var current = cache.get();
      current.context = context;
      current.release = release;
      current.value = value;
      current.callback = done || noop;
      if (_running === self.concurrency || self.paused) {
        if (queueTail) {
          queueTail.next = current;
          queueTail = current;
        } else {
          queueHead = current;
          queueTail = current;
          self.saturated();
        }
      } else {
        _running++;
        worker.call(context, current.value, current.worked);
      }
    }
    function unshift(value, done) {
      var current = cache.get();
      current.context = context;
      current.release = release;
      current.value = value;
      current.callback = done || noop;
      if (_running === self.concurrency || self.paused) {
        if (queueHead) {
          current.next = queueHead;
          queueHead = current;
        } else {
          queueHead = current;
          queueTail = current;
          self.saturated();
        }
      } else {
        _running++;
        worker.call(context, current.value, current.worked);
      }
    }
    function release(holder) {
      if (holder) {
        cache.release(holder);
      }
      var next = queueHead;
      if (next) {
        if (!self.paused) {
          if (queueTail === queueHead) {
            queueTail = null;
          }
          queueHead = next.next;
          next.next = null;
          worker.call(context, next.value, next.worked);
          if (queueTail === null) {
            self.empty();
          }
        } else {
          _running--;
        }
      } else if (--_running === 0) {
        self.drain();
      }
    }
    function kill() {
      queueHead = null;
      queueTail = null;
      self.drain = noop;
    }
    function killAndDrain() {
      queueHead = null;
      queueTail = null;
      self.drain();
      self.drain = noop;
    }
  }
  function noop() {
  }
  function Task() {
    this.value = null;
    this.callback = noop;
    this.next = null;
    this.release = noop;
    this.context = null;
    var self = this;
    this.worked = function worked(err, result) {
      var callback = self.callback;
      self.value = null;
      self.callback = noop;
      callback.call(self.context, err, result);
      self.release(self);
    };
  }
  module.exports = fastqueue;
});

// node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
      return true;
    }
    return !settings.errorFilter(error);
  }
  exports.isFatalError = isFatalError;
  function isAppliedFilter(filter, value) {
    return filter === null || filter(value);
  }
  exports.isAppliedFilter = isAppliedFilter;
  function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[\\/]/).join(separator);
  }
  exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
  function joinPathSegments(a, b, separator) {
    if (a === "") {
      return b;
    }
    return a + separator + b;
  }
  exports.joinPathSegments = joinPathSegments;
});

// node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var common = require_common();
  var Reader = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
    }
  };
  exports.default = Reader;
});

// node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var events_1 = require("events");
  var fsScandir = require_out2();
  var fastq = require_queue();
  var common = require_common();
  var reader_1 = require_reader();
  var AsyncReader = class extends reader_1.default {
    constructor(_root, _settings) {
      super(_root, _settings);
      this._settings = _settings;
      this._scandir = fsScandir.scandir;
      this._emitter = new events_1.EventEmitter();
      this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
      this._isFatalError = false;
      this._isDestroyed = false;
      this._queue.drain = () => {
        if (!this._isFatalError) {
          this._emitter.emit("end");
        }
      };
    }
    read() {
      this._isFatalError = false;
      this._isDestroyed = false;
      setImmediate(() => {
        this._pushToQueue(this._root, this._settings.basePath);
      });
      return this._emitter;
    }
    destroy() {
      if (this._isDestroyed) {
        throw new Error("The reader is already destroyed");
      }
      this._isDestroyed = true;
      this._queue.killAndDrain();
    }
    onEntry(callback) {
      this._emitter.on("entry", callback);
    }
    onError(callback) {
      this._emitter.once("error", callback);
    }
    onEnd(callback) {
      this._emitter.once("end", callback);
    }
    _pushToQueue(directory, base) {
      const queueItem = {directory, base};
      this._queue.push(queueItem, (error) => {
        if (error !== null) {
          this._handleError(error);
        }
      });
    }
    _worker(item, done) {
      this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
        if (error !== null) {
          return done(error, void 0);
        }
        for (const entry of entries) {
          this._handleEntry(entry, item.base);
        }
        done(null, void 0);
      });
    }
    _handleError(error) {
      if (!common.isFatalError(this._settings, error)) {
        return;
      }
      this._isFatalError = true;
      this._isDestroyed = true;
      this._emitter.emit("error", error);
    }
    _handleEntry(entry, base) {
      if (this._isDestroyed || this._isFatalError) {
        return;
      }
      const fullpath = entry.path;
      if (base !== void 0) {
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._emitEntry(entry);
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path);
      }
    }
    _emitEntry(entry) {
      this._emitter.emit("entry", entry);
    }
  };
  exports.default = AsyncReader;
});

// node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var async_1 = require_async3();
  var AsyncProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new async_1.default(this._root, this._settings);
      this._storage = new Set();
    }
    read(callback) {
      this._reader.onError((error) => {
        callFailureCallback(callback, error);
      });
      this._reader.onEntry((entry) => {
        this._storage.add(entry);
      });
      this._reader.onEnd(() => {
        callSuccessCallback(callback, [...this._storage]);
      });
      this._reader.read();
    }
  };
  exports.default = AsyncProvider;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, entries) {
    callback(null, entries);
  }
});

// node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var stream_1 = require("stream");
  var async_1 = require_async3();
  var StreamProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new async_1.default(this._root, this._settings);
      this._stream = new stream_1.Readable({
        objectMode: true,
        read: () => {
        },
        destroy: this._reader.destroy.bind(this._reader)
      });
    }
    read() {
      this._reader.onError((error) => {
        this._stream.emit("error", error);
      });
      this._reader.onEntry((entry) => {
        this._stream.push(entry);
      });
      this._reader.onEnd(() => {
        this._stream.push(null);
      });
      this._reader.read();
      return this._stream;
    }
  };
  exports.default = StreamProvider;
});

// node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fsScandir = require_out2();
  var common = require_common();
  var reader_1 = require_reader();
  var SyncReader = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._scandir = fsScandir.scandirSync;
      this._storage = new Set();
      this._queue = new Set();
    }
    read() {
      this._pushToQueue(this._root, this._settings.basePath);
      this._handleQueue();
      return [...this._storage];
    }
    _pushToQueue(directory, base) {
      this._queue.add({directory, base});
    }
    _handleQueue() {
      for (const item of this._queue.values()) {
        this._handleDirectory(item.directory, item.base);
      }
    }
    _handleDirectory(directory, base) {
      try {
        const entries = this._scandir(directory, this._settings.fsScandirSettings);
        for (const entry of entries) {
          this._handleEntry(entry, base);
        }
      } catch (error) {
        this._handleError(error);
      }
    }
    _handleError(error) {
      if (!common.isFatalError(this._settings, error)) {
        return;
      }
      throw error;
    }
    _handleEntry(entry, base) {
      const fullpath = entry.path;
      if (base !== void 0) {
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._pushToStorage(entry);
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path);
      }
    }
    _pushToStorage(entry) {
      this._storage.add(entry);
    }
  };
  exports.default = SyncReader;
});

// node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var sync_1 = require_sync3();
  var SyncProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new sync_1.default(this._root, this._settings);
    }
    read() {
      return this._reader.read();
    }
  };
  exports.default = SyncProvider;
});

// node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var fsScandir = require_out2();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.basePath = this._getValue(this._options.basePath, void 0);
      this.concurrency = this._getValue(this._options.concurrency, Infinity);
      this.deepFilter = this._getValue(this._options.deepFilter, null);
      this.entryFilter = this._getValue(this._options.entryFilter, null);
      this.errorFilter = this._getValue(this._options.errorFilter, null);
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
      this.fsScandirSettings = new fsScandir.Settings({
        followSymbolicLinks: this._options.followSymbolicLinks,
        fs: this._options.fs,
        pathSegmentSeparator: this._options.pathSegmentSeparator,
        stats: this._options.stats,
        throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
      });
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
  };
  exports.default = Settings;
});

// node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var async_1 = require_async4();
  var stream_1 = require_stream2();
  var sync_1 = require_sync4();
  var settings_1 = require_settings3();
  exports.Settings = settings_1.default;
  function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
    }
    new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
  }
  exports.walk = walk;
  function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new sync_1.default(directory, settings);
    return provider.read();
  }
  exports.walkSync = walkSync;
  function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new stream_1.default(directory, settings);
    return provider.read();
  }
  exports.walkStream = walkStream;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// node_modules/majo/node_modules/fast-glob/out/readers/reader.js
var require_reader2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var fsStat = require_out();
  var utils = require_utils3();
  var Reader = class {
    constructor(_settings) {
      this._settings = _settings;
      this._fsStatSettings = new fsStat.Settings({
        followSymbolicLink: this._settings.followSymbolicLinks,
        fs: this._settings.fs,
        throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
      });
    }
    _getFullEntryPath(filepath) {
      return path.resolve(this._settings.cwd, filepath);
    }
    _makeEntry(stats, pattern) {
      const entry = {
        name: pattern,
        path: pattern,
        dirent: utils.fs.createDirentFromStats(pattern, stats)
      };
      if (this._settings.stats) {
        entry.stats = stats;
      }
      return entry;
    }
    _isFatalError(error) {
      return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
    }
  };
  exports.default = Reader;
});

// node_modules/majo/node_modules/fast-glob/out/readers/stream.js
var require_stream3 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var stream_1 = require("stream");
  var fsStat = require_out();
  var fsWalk = require_out3();
  var reader_1 = require_reader2();
  var ReaderStream = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._walkStream = fsWalk.walkStream;
      this._stat = fsStat.stat;
    }
    dynamic(root, options) {
      return this._walkStream(root, options);
    }
    static(patterns, options) {
      const filepaths = patterns.map(this._getFullEntryPath, this);
      const stream = new stream_1.PassThrough({objectMode: true});
      stream._write = (index, _enc, done) => {
        return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
          if (entry !== null && options.entryFilter(entry)) {
            stream.push(entry);
          }
          if (index === filepaths.length - 1) {
            stream.end();
          }
          done();
        }).catch(done);
      };
      for (let i = 0; i < filepaths.length; i++) {
        stream.write(i);
      }
      return stream;
    }
    _getEntry(filepath, pattern, options) {
      return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
        if (options.errorFilter(error)) {
          return null;
        }
        throw error;
      });
    }
    _getStat(filepath) {
      return new Promise((resolve, reject) => {
        this._stat(filepath, this._fsStatSettings, (error, stats) => {
          return error === null ? resolve(stats) : reject(error);
        });
      });
    }
  };
  exports.default = ReaderStream;
});

// node_modules/majo/node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  var Matcher = class {
    constructor(_patterns, _settings, _micromatchOptions) {
      this._patterns = _patterns;
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
      this._storage = [];
      this._fillStorage();
    }
    _fillStorage() {
      const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns);
      for (const pattern of patterns) {
        const segments = this._getPatternSegments(pattern);
        const sections = this._splitSegmentsIntoSections(segments);
        this._storage.push({
          complete: sections.length <= 1,
          pattern,
          segments,
          sections
        });
      }
    }
    _getPatternSegments(pattern) {
      const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
      return parts.map((part) => {
        const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
        if (!dynamic) {
          return {
            dynamic: false,
            pattern: part
          };
        }
        return {
          dynamic: true,
          pattern: part,
          patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
        };
      });
    }
    _splitSegmentsIntoSections(segments) {
      return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
    }
  };
  exports.default = Matcher;
});

// node_modules/majo/node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var matcher_1 = require_matcher();
  var PartialMatcher = class extends matcher_1.default {
    match(filepath) {
      const parts = filepath.split("/");
      const levels = parts.length;
      const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
      for (const pattern of patterns) {
        const section = pattern.sections[0];
        if (!pattern.complete && levels > section.length) {
          return true;
        }
        const match = parts.every((part, index) => {
          const segment = pattern.segments[index];
          if (segment.dynamic && segment.patternRe.test(part)) {
            return true;
          }
          if (!segment.dynamic && segment.pattern === part) {
            return true;
          }
          return false;
        });
        if (match) {
          return true;
        }
      }
      return false;
    }
  };
  exports.default = PartialMatcher;
});

// node_modules/majo/node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  var partial_1 = require_partial();
  var DeepFilter = class {
    constructor(_settings, _micromatchOptions) {
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
    }
    getFilter(basePath, positive, negative) {
      const matcher = this._getMatcher(positive);
      const negativeRe = this._getNegativePatternsRe(negative);
      return (entry) => this._filter(basePath, entry, matcher, negativeRe);
    }
    _getMatcher(patterns) {
      return new partial_1.default(patterns, this._settings, this._micromatchOptions);
    }
    _getNegativePatternsRe(patterns) {
      const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
      return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
    }
    _filter(basePath, entry, matcher, negativeRe) {
      const depth = this._getEntryLevel(basePath, entry.path);
      if (this._isSkippedByDeep(depth)) {
        return false;
      }
      if (this._isSkippedSymbolicLink(entry)) {
        return false;
      }
      const filepath = utils.path.removeLeadingDotSegment(entry.path);
      if (this._isSkippedByPositivePatterns(filepath, matcher)) {
        return false;
      }
      return this._isSkippedByNegativePatterns(filepath, negativeRe);
    }
    _isSkippedByDeep(entryDepth) {
      return entryDepth >= this._settings.deep;
    }
    _isSkippedSymbolicLink(entry) {
      return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
    }
    _getEntryLevel(basePath, entryPath) {
      const basePathDepth = basePath.split("/").length;
      const entryPathDepth = entryPath.split("/").length;
      return entryPathDepth - (basePath === "" ? 0 : basePathDepth);
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
      return !this._settings.baseNameMatch && !matcher.match(entryPath);
    }
    _isSkippedByNegativePatterns(entryPath, negativeRe) {
      return !utils.pattern.matchAny(entryPath, negativeRe);
    }
  };
  exports.default = DeepFilter;
});

// node_modules/majo/node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  var EntryFilter = class {
    constructor(_settings, _micromatchOptions) {
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
      this.index = new Map();
    }
    getFilter(positive, negative) {
      const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
      const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions);
      return (entry) => this._filter(entry, positiveRe, negativeRe);
    }
    _filter(entry, positiveRe, negativeRe) {
      if (this._settings.unique) {
        if (this._isDuplicateEntry(entry)) {
          return false;
        }
        this._createIndexRecord(entry);
      }
      if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
        return false;
      }
      if (this._isSkippedByAbsoluteNegativePatterns(entry, negativeRe)) {
        return false;
      }
      const filepath = this._settings.baseNameMatch ? entry.name : entry.path;
      return this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe);
    }
    _isDuplicateEntry(entry) {
      return this.index.has(entry.path);
    }
    _createIndexRecord(entry) {
      this.index.set(entry.path, void 0);
    }
    _onlyFileFilter(entry) {
      return this._settings.onlyFiles && !entry.dirent.isFile();
    }
    _onlyDirectoryFilter(entry) {
      return this._settings.onlyDirectories && !entry.dirent.isDirectory();
    }
    _isSkippedByAbsoluteNegativePatterns(entry, negativeRe) {
      if (!this._settings.absolute) {
        return false;
      }
      const fullpath = utils.path.makeAbsolute(this._settings.cwd, entry.path);
      return this._isMatchToPatterns(fullpath, negativeRe);
    }
    _isMatchToPatterns(entryPath, patternsRe) {
      const filepath = utils.path.removeLeadingDotSegment(entryPath);
      return utils.pattern.matchAny(filepath, patternsRe);
    }
  };
  exports.default = EntryFilter;
});

// node_modules/majo/node_modules/fast-glob/out/providers/filters/error.js
var require_error = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  var ErrorFilter = class {
    constructor(_settings) {
      this._settings = _settings;
    }
    getFilter() {
      return (error) => this._isNonFatalError(error);
    }
    _isNonFatalError(error) {
      return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
    }
  };
  exports.default = ErrorFilter;
});

// node_modules/majo/node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var utils = require_utils3();
  var EntryTransformer = class {
    constructor(_settings) {
      this._settings = _settings;
    }
    getTransformer() {
      return (entry) => this._transform(entry);
    }
    _transform(entry) {
      let filepath = entry.path;
      if (this._settings.absolute) {
        filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
        filepath = utils.path.unixify(filepath);
      }
      if (this._settings.markDirectories && entry.dirent.isDirectory()) {
        filepath += "/";
      }
      if (!this._settings.objectMode) {
        return filepath;
      }
      return Object.assign(Object.assign({}, entry), {path: filepath});
    }
  };
  exports.default = EntryTransformer;
});

// node_modules/majo/node_modules/fast-glob/out/providers/provider.js
var require_provider = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var path = require("path");
  var deep_1 = require_deep();
  var entry_1 = require_entry();
  var error_1 = require_error();
  var entry_2 = require_entry2();
  var Provider = class {
    constructor(_settings) {
      this._settings = _settings;
      this.errorFilter = new error_1.default(this._settings);
      this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
      this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
      this.entryTransformer = new entry_2.default(this._settings);
    }
    _getRootDirectory(task) {
      return path.resolve(this._settings.cwd, task.base);
    }
    _getReaderOptions(task) {
      const basePath = task.base === "." ? "" : task.base;
      return {
        basePath,
        pathSegmentSeparator: "/",
        concurrency: this._settings.concurrency,
        deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
        entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
        errorFilter: this.errorFilter.getFilter(),
        followSymbolicLinks: this._settings.followSymbolicLinks,
        fs: this._settings.fs,
        stats: this._settings.stats,
        throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
        transform: this.entryTransformer.getTransformer()
      };
    }
    _getMicromatchOptions() {
      return {
        dot: this._settings.dot,
        matchBase: this._settings.baseNameMatch,
        nobrace: !this._settings.braceExpansion,
        nocase: !this._settings.caseSensitiveMatch,
        noext: !this._settings.extglob,
        noglobstar: !this._settings.globstar,
        posix: true,
        strictSlashes: false
      };
    }
  };
  exports.default = Provider;
});

// node_modules/majo/node_modules/fast-glob/out/providers/async.js
var require_async5 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var stream_1 = require_stream3();
  var provider_1 = require_provider();
  var ProviderAsync = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new stream_1.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const entries = [];
      return new Promise((resolve, reject) => {
        const stream = this.api(root, task, options);
        stream.once("error", reject);
        stream.on("data", (entry) => entries.push(options.transform(entry)));
        stream.once("end", () => resolve(entries));
      });
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports.default = ProviderAsync;
});

// node_modules/majo/node_modules/fast-glob/out/providers/stream.js
var require_stream4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var stream_1 = require("stream");
  var stream_2 = require_stream3();
  var provider_1 = require_provider();
  var ProviderStream = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new stream_2.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const source = this.api(root, task, options);
      const destination = new stream_1.Readable({objectMode: true, read: () => {
      }});
      source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
      destination.once("close", () => source.destroy());
      return destination;
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports.default = ProviderStream;
});

// node_modules/majo/node_modules/fast-glob/out/readers/sync.js
var require_sync5 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fsStat = require_out();
  var fsWalk = require_out3();
  var reader_1 = require_reader2();
  var ReaderSync = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._walkSync = fsWalk.walkSync;
      this._statSync = fsStat.statSync;
    }
    dynamic(root, options) {
      return this._walkSync(root, options);
    }
    static(patterns, options) {
      const entries = [];
      for (const pattern of patterns) {
        const filepath = this._getFullEntryPath(pattern);
        const entry = this._getEntry(filepath, pattern, options);
        if (entry === null || !options.entryFilter(entry)) {
          continue;
        }
        entries.push(entry);
      }
      return entries;
    }
    _getEntry(filepath, pattern, options) {
      try {
        const stats = this._getStat(filepath);
        return this._makeEntry(stats, pattern);
      } catch (error) {
        if (options.errorFilter(error)) {
          return null;
        }
        throw error;
      }
    }
    _getStat(filepath) {
      return this._statSync(filepath, this._fsStatSettings);
    }
  };
  exports.default = ReaderSync;
});

// node_modules/majo/node_modules/fast-glob/out/providers/sync.js
var require_sync6 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var sync_1 = require_sync5();
  var provider_1 = require_provider();
  var ProviderSync = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new sync_1.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const entries = this.api(root, task, options);
      return entries.map(options.transform);
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports.default = ProviderSync;
});

// node_modules/majo/node_modules/fast-glob/out/settings.js
var require_settings4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var fs3 = require("fs");
  var os = require("os");
  var CPU_COUNT = os.cpus().length;
  exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: fs3.lstat,
    lstatSync: fs3.lstatSync,
    stat: fs3.stat,
    statSync: fs3.statSync,
    readdir: fs3.readdir,
    readdirSync: fs3.readdirSync
  };
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.absolute = this._getValue(this._options.absolute, false);
      this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
      this.braceExpansion = this._getValue(this._options.braceExpansion, true);
      this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
      this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
      this.cwd = this._getValue(this._options.cwd, process.cwd());
      this.deep = this._getValue(this._options.deep, Infinity);
      this.dot = this._getValue(this._options.dot, false);
      this.extglob = this._getValue(this._options.extglob, true);
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
      this.fs = this._getFileSystemMethods(this._options.fs);
      this.globstar = this._getValue(this._options.globstar, true);
      this.ignore = this._getValue(this._options.ignore, []);
      this.markDirectories = this._getValue(this._options.markDirectories, false);
      this.objectMode = this._getValue(this._options.objectMode, false);
      this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
      this.onlyFiles = this._getValue(this._options.onlyFiles, true);
      this.stats = this._getValue(this._options.stats, false);
      this.suppressErrors = this._getValue(this._options.suppressErrors, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
      this.unique = this._getValue(this._options.unique, true);
      if (this.onlyDirectories) {
        this.onlyFiles = false;
      }
      if (this.stats) {
        this.objectMode = true;
      }
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
    _getFileSystemMethods(methods = {}) {
      return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
    }
  };
  exports.default = Settings;
});

// node_modules/majo/node_modules/fast-glob/out/index.js
var require_out4 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var taskManager = require_tasks();
  var async_1 = require_async5();
  var stream_1 = require_stream4();
  var sync_1 = require_sync6();
  var settings_1 = require_settings4();
  var utils = require_utils3();
  async function FastGlob(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, async_1.default, options);
    const result = await Promise.all(works);
    return utils.array.flatten(result);
  }
  (function(FastGlob2) {
    function sync(source, options) {
      assertPatternsInput(source);
      const works = getWorks(source, sync_1.default, options);
      return utils.array.flatten(works);
    }
    FastGlob2.sync = sync;
    function stream(source, options) {
      assertPatternsInput(source);
      const works = getWorks(source, stream_1.default, options);
      return utils.stream.merge(works);
    }
    FastGlob2.stream = stream;
    function generateTasks(source, options) {
      assertPatternsInput(source);
      const patterns = [].concat(source);
      const settings = new settings_1.default(options);
      return taskManager.generate(patterns, settings);
    }
    FastGlob2.generateTasks = generateTasks;
    function isDynamicPattern(source, options) {
      assertPatternsInput(source);
      const settings = new settings_1.default(options);
      return utils.pattern.isDynamicPattern(source, settings);
    }
    FastGlob2.isDynamicPattern = isDynamicPattern;
    function escapePath(source) {
      assertPatternsInput(source);
      return utils.path.escape(source);
    }
    FastGlob2.escapePath = escapePath;
  })(FastGlob || (FastGlob = {}));
  function getWorks(source, _Provider, options) {
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
  }
  function assertPatternsInput(input) {
    const source = [].concat(input);
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
    if (!isValidSource) {
      throw new TypeError("Patterns must be a string (non empty) or an array of strings");
    }
  }
  module.exports = FastGlob;
});

// node_modules/fs.realpath/old.js
var require_old = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  var pathModule = require("path");
  var isWindows = process.platform === "win32";
  var fs3 = require("fs");
  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function rethrow() {
    var callback;
    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else
      callback = missingCallback;
    return callback;
    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }
    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation)
          throw err;
        else if (!process.noDeprecation) {
          var msg = "fs: missing callback " + (err.stack || err.message);
          if (process.traceDeprecation)
            console.trace(msg);
          else
            console.error(msg);
        }
      }
    }
  }
  function maybeCallback(cb) {
    return typeof cb === "function" ? cb : rethrow();
  }
  var normalize = pathModule.normalize;
  if (isWindows) {
    nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }
  var nextPartRe;
  if (isWindows) {
    splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    splitRootRe = /^[\/]*/;
  }
  var splitRootRe;
  exports.realpathSync = function realpathSync(p, cache) {
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs3.lstatSync(base);
        knownHard[base] = true;
      }
    }
    while (pos < p.length) {
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }
      var resolvedLink;
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        resolvedLink = cache[base];
      } else {
        var stat = fs3.lstatSync(base);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          continue;
        }
        var linkTarget = null;
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }
        if (linkTarget === null) {
          fs3.statSync(base);
          linkTarget = fs3.readlinkSync(base);
        }
        resolvedLink = pathModule.resolve(previous, linkTarget);
        if (cache)
          cache[base] = resolvedLink;
        if (!isWindows)
          seenLinks[id] = linkTarget;
      }
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
    if (cache)
      cache[original] = p;
    return p;
  };
  exports.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== "function") {
      cb = maybeCallback(cache);
      cache = null;
    }
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs3.lstat(base, function(err) {
          if (err)
            return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }
    function LOOP() {
      if (pos >= p.length) {
        if (cache)
          cache[original] = p;
        return cb(null, p);
      }
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        return gotResolvedLink(cache[base]);
      }
      return fs3.lstat(base, gotStat);
    }
    function gotStat(err, stat) {
      if (err)
        return cb(err);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache)
          cache[base] = base;
        return process.nextTick(LOOP);
      }
      if (!isWindows) {
        var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }
      fs3.stat(base, function(err2) {
        if (err2)
          return cb(err2);
        fs3.readlink(base, function(err3, target) {
          if (!isWindows)
            seenLinks[id] = target;
          gotTarget(err3, target);
        });
      });
    }
    function gotTarget(err, target, base2) {
      if (err)
        return cb(err);
      var resolvedLink = pathModule.resolve(previous, target);
      if (cache)
        cache[base2] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }
    function gotResolvedLink(resolvedLink) {
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };
});

// node_modules/fs.realpath/index.js
var require_fs5 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var fs3 = require("fs");
  var origRealpath = fs3.realpath;
  var origRealpathSync = fs3.realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = require_old();
  function newError(er) {
    return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
  }
  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }
    if (typeof cache === "function") {
      cb = cache;
      cache = null;
    }
    origRealpath(p, cache, function(er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }
  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }
    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }
  function monkeypatch() {
    fs3.realpath = realpath;
    fs3.realpathSync = realpathSync;
  }
  function unmonkeypatch() {
    fs3.realpath = origRealpath;
    fs3.realpathSync = origRealpathSync;
  }
});

// node_modules/concat-map/index.js
var require_concat_map = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x))
        res.push.apply(res, x);
      else
        res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === "[object Array]";
  };
});

// node_modules/balanced-match/index.js
var require_balanced_match = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp)
      a = maybeMatch(a, str);
    if (b instanceof RegExp)
      b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;
      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }
          bi = str.indexOf(b, i + 1);
        }
        i = ai < bi && ai >= 0 ? ai : bi;
      }
      if (begs.length) {
        result = [left, right];
      }
    }
    return result;
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var concatMap = require_concat_map();
  var balanced = require_balanced_match();
  module.exports = expandTop;
  var escSlash = "\0SLASH" + Math.random() + "\0";
  var escOpen = "\0OPEN" + Math.random() + "\0";
  var escClose = "\0CLOSE" + Math.random() + "\0";
  var escComma = "\0COMMA" + Math.random() + "\0";
  var escPeriod = "\0PERIOD" + Math.random() + "\0";
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
  }
  function parseCommaParts(str) {
    if (!str)
      return [""];
    var parts = [];
    var m = balanced("{", "}", str);
    if (!m)
      return str.split(",");
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(",");
    p[p.length - 1] += "{" + body + "}";
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str)
      return [];
    if (str.substr(0, 2) === "{}") {
      str = "\\{\\}" + str.substr(2);
    }
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function embrace(str) {
    return "{" + str + "}";
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced("{", "}", str);
    if (!m || /\$$/.test(m.pre))
      return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [""];
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [""];
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\")
            c = "";
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              if (i < 0)
                c = "-" + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function(el) {
        return expand(el, false);
      });
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
    return expansions;
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = {sep: "/"};
  try {
    path = require("path");
  } catch (er) {
  }
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = require_brace_expansion();
  var plTypes = {
    "!": {open: "(?:(?!(?:", close: "))[^/]*?)"},
    "?": {open: "(?:", close: ")?"},
    "+": {open: "(?:", close: ")+"},
    "*": {open: "(?:", close: ")*"},
    "@": {open: "(?:", close: ")"}
  };
  var qmark = "[^/]";
  var star = qmark + "*?";
  var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  var reSpecials = charSet("().*{}+?[]^$\\!");
  function charSet(s) {
    return s.split("").reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    return t;
  }
  minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return minimatch;
    var orig = minimatch;
    var m = function minimatch2(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch2(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    if (pattern.trim() === "")
      return p === "";
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    pattern = pattern.trim();
    if (path.sep !== "/") {
      pattern = pattern.split(path.sep).join("/");
    }
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.make();
  }
  Minimatch.prototype.debug = function() {
  };
  Minimatch.prototype.make = make;
  function make() {
    if (this._made)
      return;
    var pattern = this.pattern;
    var options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug)
      this.debug = console.error;
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function(s, si, set2) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate)
      return;
    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === "undefined" ? this.pattern : pattern;
    if (typeof pattern === "undefined") {
      throw new TypeError("undefined pattern");
    }
    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }
    return expand(pattern);
  }
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError("pattern is too long");
    }
    var options = this.options;
    if (!options.noglobstar && pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    var re = "";
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic = true;
            break;
          case "?":
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += "\\" + stateChar;
            break;
        }
        self.debug("clearStateChar %j %j", stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug("%s	%s %s %j", pattern, i, re, c);
      if (escaping && reSpecials[c]) {
        re += "\\" + c;
        escaping = false;
        continue;
      }
      switch (c) {
        case "/":
          return false;
        case "\\":
          clearStateChar();
          escaping = true;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
          if (inClass) {
            this.debug("  in class");
            if (c === "!" && i === classStart + 1)
              c = "^";
            re += c;
            continue;
          }
          self.debug("call clearStateChar %j", stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext)
            clearStateChar();
          continue;
        case "(":
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
          this.debug("plType %j %j", stateChar, re);
          stateChar = false;
          continue;
        case ")":
          if (inClass || !patternListStack.length) {
            re += "\\)";
            continue;
          }
          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          re += pl.close;
          if (pl.type === "!") {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;
        case "|":
          if (inClass || !patternListStack.length || escaping) {
            re += "\\|";
            escaping = false;
            continue;
          }
          clearStateChar();
          re += "|";
          continue;
        case "[":
          clearStateChar();
          if (inClass) {
            re += "\\" + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c;
            escaping = false;
            continue;
          }
          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          clearStateChar();
          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === "^" && inClass)) {
            re += "\\";
          }
          re += c;
      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + "\\[" + sp[0];
      hasMagic = hasMagic || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          $2 = "\\";
        }
        return $1 + $1 + $2 + "|";
      });
      this.debug("tail=%j\n   %s", tail, tail, pl, re);
      var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar();
    if (escaping) {
      re += "\\\\";
    }
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case ".":
      case "[":
      case "(":
        addPatternStart = true;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split("(").length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      }
      nlAfter = cleanAfter;
      var dollar = "";
      if (nlAfter === "" && isSub !== SUBPARSE) {
        dollar = "$";
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }
    if (re !== "" && hasMagic) {
      re = "(?=.)" + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? "i" : "";
    try {
      var regExp = new RegExp("^" + re + "$", flags);
    } catch (er) {
      return new RegExp("$.");
    }
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? "i" : "";
    var re = set.map(function(pattern) {
      return pattern.map(function(p) {
        return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
      }).join("\\/");
    }).join("|");
    re = "^(?:" + re + ")$";
    if (this.negate)
      re = "^(?!" + re + ").*$";
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug("match", f, this.pattern);
    if (this.comment)
      return false;
    if (this.empty)
      return f === "";
    if (f === "/" && partial)
      return true;
    var options = this.options;
    if (path.sep !== "/") {
      f = f.split(path.sep).join("/");
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, "split", f);
    var set = this.set;
    this.debug(this.pattern, "set", set);
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename)
        break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate)
          return true;
        return !this.negate;
      }
    }
    if (options.flipNegate)
      return false;
    return this.negate;
  }
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    this.debug("matchOne", {this: this, file, pattern});
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false)
        return false;
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl)
            return true;
        }
        return false;
      }
      var hit;
      if (typeof p === "string") {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug("string match", p, f, hit);
      } else {
        hit = f.match(p);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = fi === fl - 1 && file[fi] === "";
      return emptyFileEnd;
    }
    throw new Error("wtf?");
  };
  function globUnescape(s) {
    return s.replace(/\\(.)/g, "$1");
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  try {
    util = require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module.exports = util.inherits;
  } catch (e) {
    module.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  function posix(path) {
    return path.charAt(0) === "/";
  }
  function win32(path) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || "";
    var isUnc = Boolean(device && device.charAt(1) !== ":");
    return Boolean(result[2] || isUnc);
  }
  module.exports = process.platform === "win32" ? win32 : posix;
  module.exports.posix = posix;
  module.exports.win32 = win32;
});

// node_modules/glob/common.js
var require_common2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  exports.alphasort = alphasort;
  exports.alphasorti = alphasorti;
  exports.setopts = setopts;
  exports.ownProp = ownProp;
  exports.makeAbs = makeAbs;
  exports.finish = finish;
  exports.mark = mark;
  exports.isIgnored = isIgnored;
  exports.childrenIgnored = childrenIgnored;
  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }
  var path = require("path");
  var minimatch = require_minimatch();
  var isAbsolute = require_path_is_absolute();
  var Minimatch = minimatch.Minimatch;
  function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
  function alphasort(a, b) {
    return a.localeCompare(b);
  }
  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore))
      self.ignore = [self.ignore];
    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }
  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === "/**") {
      var gpattern = pattern.replace(/(\/\*\*)+$/, "");
      gmatcher = new Minimatch(gpattern, {dot: true});
    }
    return {
      matcher: new Minimatch(pattern, {dot: true}),
      gmatcher
    };
  }
  function setopts(self, pattern, options) {
    if (!options)
      options = {};
    if (options.matchBase && pattern.indexOf("/") === -1) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }
    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir)
      self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd"))
      self.cwd = cwd;
    else {
      self.cwd = path.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path.resolve(self.cwd, "/");
    self.root = path.resolve(self.root);
    if (process.platform === "win32")
      self.root = self.root.replace(/\\/g, "/");
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32")
      self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;
    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }
  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);
    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          var literal = self.minimatch.globSet[i];
          if (nou)
            all.push(literal);
          else
            all[literal] = true;
        }
      } else {
        var m = Object.keys(matches);
        if (nou)
          all.push.apply(all, m);
        else
          m.forEach(function(m2) {
            all[m2] = true;
          });
      }
    }
    if (!nou)
      all = Object.keys(all);
    if (!self.nosort)
      all = all.sort(self.nocase ? alphasorti : alphasort);
    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function(e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c)
            notDir = c !== "DIR" && !Array.isArray(c);
          return notDir;
        });
      }
    }
    if (self.ignore.length)
      all = all.filter(function(m2) {
        return !isIgnored(self, m2);
      });
    self.found = all;
  }
  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === "DIR" || Array.isArray(c);
      var slash = p.slice(-1) === "/";
      if (isDir && !slash)
        m += "/";
      else if (!isDir && slash)
        m = m.slice(0, -1);
      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }
    return m;
  }
  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === "/") {
      abs = path.join(self.root, f);
    } else if (isAbsolute(f) || f === "") {
      abs = f;
    } else if (self.changedCwd) {
      abs = path.resolve(self.cwd, f);
    } else {
      abs = path.resolve(f);
    }
    if (process.platform === "win32")
      abs = abs.replace(/\\/g, "/");
    return abs;
  }
  function isIgnored(self, path2) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return item.matcher.match(path2) || !!(item.gmatcher && item.gmatcher.match(path2));
    });
  }
  function childrenIgnored(self, path2) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return !!(item.gmatcher && item.gmatcher.match(path2));
    });
  }
});

// node_modules/glob/sync.js
var require_sync7 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = globSync;
  globSync.GlobSync = GlobSync;
  var fs3 = require("fs");
  var rp = require_fs5();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var Glob = require_glob().Glob;
  var util = require("util");
  var path = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var common = require_common2();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  function globSync(pattern, options) {
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    return new GlobSync(pattern, options).found;
  }
  function GlobSync(pattern, options) {
    if (!pattern)
      throw new Error("must provide pattern");
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    if (!(this instanceof GlobSync))
      return new GlobSync(pattern, options);
    setopts(this, pattern, options);
    if (this.noprocess)
      return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }
  GlobSync.prototype._finish = function() {
    assert(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function(matchset, index) {
        var set = self.matches[index] = Object.create(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === "stat")
              set[self._makeAbs(p)] = true;
            else
              throw er;
          }
        }
      });
    }
    common.finish(this);
  };
  GlobSync.prototype._process = function(pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return;
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };
  GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return;
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return;
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix)
        newPattern = [prefix, e];
      else
        newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };
  GlobSync.prototype._emitMatch = function(index, e) {
    if (isIgnored(this, e))
      return;
    var abs = this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute) {
      e = abs;
    }
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    if (this.stat)
      this._stat(e);
  };
  GlobSync.prototype._readdirInGlobStar = function(abs) {
    if (this.follow)
      return this._readdir(abs, false);
    var entries;
    var lstat;
    var stat;
    try {
      lstat = fs3.lstatSync(abs);
    } catch (er) {
      if (er.code === "ENOENT") {
        return null;
      }
    }
    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;
    if (!isSym && lstat && !lstat.isDirectory())
      this.cache[abs] = "FILE";
    else
      entries = this._readdir(abs, false);
    return entries;
  };
  GlobSync.prototype._readdir = function(abs, inGlobStar) {
    var entries;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return null;
      if (Array.isArray(c))
        return c;
    }
    try {
      return this._readdirEntries(abs, fs3.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };
  GlobSync.prototype._readdirEntries = function(abs, entries) {
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return entries;
  };
  GlobSync.prototype._readdirError = function(f, er) {
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict)
          throw er;
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
  };
  GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false);
    var len = entries.length;
    var isSym = this.symlinks[abs];
    if (isSym && inGlobStar)
      return;
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };
  GlobSync.prototype._processSimple = function(prefix, index) {
    var exists = this._stat(prefix);
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists)
      return;
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
  };
  GlobSync.prototype._stat = function(f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return false;
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return c;
      if (needDir && c === "FILE")
        return false;
    }
    var exists;
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = fs3.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
          this.statCache[abs] = false;
          return false;
        }
      }
      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs3.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }
    this.statCache[abs] = stat;
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return false;
    return c;
  };
  GlobSync.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  GlobSync.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
});

// node_modules/wrappy/wrappy.js
var require_wrappy = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb)
      return wrappy(fn)(cb);
    if (typeof fn !== "function")
      throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb2 = args[args.length - 1];
      if (typeof ret === "function" && ret !== cb2) {
        Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        });
      }
      return ret;
    }
  }
});

// node_modules/once/once.js
var require_once = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var wrappy = require_wrappy();
  module.exports = wrappy(once);
  module.exports.strict = wrappy(onceStrict);
  once.proto = once(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
      value: function() {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once(fn) {
    var f = function() {
      if (f.called)
        return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function() {
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
});

// node_modules/inflight/inflight.js
var require_inflight = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var wrappy = require_wrappy();
  var reqs = Object.create(null);
  var once = require_once();
  module.exports = wrappy(inflight);
  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }
  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);
      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function() {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }
  function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++)
      array[i] = args[i];
    return array;
  }
});

// node_modules/glob/glob.js
var require_glob = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = glob;
  var fs3 = require("fs");
  var rp = require_fs5();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var inherits = require_inherits();
  var EE = require("events").EventEmitter;
  var path = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var globSync = require_sync7();
  var common = require_common2();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = require_inflight();
  var util = require("util");
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  var once = require_once();
  function glob(pattern, options, cb) {
    if (typeof options === "function")
      cb = options, options = {};
    if (!options)
      options = {};
    if (options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return globSync(pattern, options);
    }
    return new Glob(pattern, options, cb);
  }
  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;
  glob.glob = glob;
  function extend(origin, add) {
    if (add === null || typeof add !== "object") {
      return origin;
    }
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  glob.hasMagic = function(pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern)
      return false;
    if (set.length > 1)
      return true;
    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== "string")
        return true;
    }
    return false;
  };
  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = null;
    }
    if (options && options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return new GlobSync(pattern, options);
    }
    if (!(this instanceof Glob))
      return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    if (typeof cb === "function") {
      cb = once(cb);
      this.on("error", cb);
      this.on("end", function(matches) {
        cb(null, matches);
      });
    }
    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess)
      return this;
    if (n === 0)
      return done();
    var sync = true;
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }
    sync = false;
    function done() {
      --self._processing;
      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function() {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }
  Glob.prototype._finish = function() {
    assert(this instanceof Glob);
    if (this.aborted)
      return;
    if (this.realpath && !this._didRealpath)
      return this._realpath();
    common.finish(this);
    this.emit("end", this.found);
  };
  Glob.prototype._realpath = function() {
    if (this._didRealpath)
      return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0)
      return this._finish();
    var self = this;
    for (var i = 0; i < this.matches.length; i++)
      this._realpathSet(i, next);
    function next() {
      if (--n === 0)
        self._finish();
    }
  };
  Glob.prototype._realpathSet = function(index, cb) {
    var matchset = this.matches[index];
    if (!matchset)
      return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0)
      return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function(p, i) {
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function(er, real) {
        if (!er)
          set[real] = true;
        else if (er.syscall === "stat")
          set[p] = true;
        else
          self.emit("error", er);
        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };
  Glob.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  Glob.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
  Glob.prototype.abort = function() {
    this.aborted = true;
    this.emit("abort");
  };
  Glob.prototype.pause = function() {
    if (!this.paused) {
      this.paused = true;
      this.emit("pause");
    }
  };
  Glob.prototype.resume = function() {
    if (this.paused) {
      this.emit("resume");
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };
  Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === "function");
    if (this.aborted)
      return;
    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index, cb);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return cb();
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };
  Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return cb();
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return cb();
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) {
        if (prefix !== "/")
          e = prefix + "/" + e;
        else
          e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };
  Glob.prototype._emitMatch = function(index, e) {
    if (this.aborted)
      return;
    if (isIgnored(this, e))
      return;
    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }
    var abs = isAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute)
      e = abs;
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st)
      this.emit("stat", e, st);
    this.emit("match", e);
  };
  Glob.prototype._readdirInGlobStar = function(abs, cb) {
    if (this.aborted)
      return;
    if (this.follow)
      return this._readdir(abs, false, cb);
    var lstatkey = "lstat\0" + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);
    if (lstatcb)
      fs3.lstat(abs, lstatcb);
    function lstatcb_(er, lstat) {
      if (er && er.code === "ENOENT")
        return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = "FILE";
        cb();
      } else
        self._readdir(abs, false, cb);
    }
  };
  Glob.prototype._readdir = function(abs, inGlobStar, cb) {
    if (this.aborted)
      return;
    cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
    if (!cb)
      return;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs, cb);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return cb();
      if (Array.isArray(c))
        return cb(null, c);
    }
    var self = this;
    fs3.readdir(abs, readdirCb(this, abs, cb));
  };
  function readdirCb(self, abs, cb) {
    return function(er, entries) {
      if (er)
        self._readdirError(abs, er, cb);
      else
        self._readdirEntries(abs, entries, cb);
    };
  }
  Glob.prototype._readdirEntries = function(abs, entries, cb) {
    if (this.aborted)
      return;
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return cb(null, entries);
  };
  Glob.prototype._readdirError = function(f, er, cb) {
    if (this.aborted)
      return;
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit("error", error);
          this.abort();
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit("error", er);
          this.abort();
        }
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
    return cb();
  };
  Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false, cb);
    var isSym = this.symlinks[abs];
    var len = entries.length;
    if (isSym && inGlobStar)
      return cb();
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }
    cb();
  };
  Glob.prototype._processSimple = function(prefix, index, cb) {
    var self = this;
    this._stat(prefix, function(er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };
  Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists)
      return cb();
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
    cb();
  };
  Glob.prototype._stat = function(f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return cb();
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return cb(null, c);
      if (needDir && c === "FILE")
        return cb();
    }
    var exists;
    var stat = this.statCache[abs];
    if (stat !== void 0) {
      if (stat === false)
        return cb(null, stat);
      else {
        var type = stat.isDirectory() ? "DIR" : "FILE";
        if (needDir && type === "FILE")
          return cb();
        else
          return cb(null, type, stat);
      }
    }
    var self = this;
    var statcb = inflight("stat\0" + abs, lstatcb_);
    if (statcb)
      fs3.lstat(abs, statcb);
    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        return fs3.stat(abs, function(er2, stat2) {
          if (er2)
            self._stat2(f, abs, null, lstat, cb);
          else
            self._stat2(f, abs, er2, stat2, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };
  Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
    if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
      this.statCache[abs] = false;
      return cb();
    }
    var needDir = f.slice(-1) === "/";
    this.statCache[abs] = stat;
    if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
      return cb(null, false, stat);
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return cb();
    return cb(null, c, stat);
  };
});

// node_modules/rimraf/rimraf.js
var require_rimraf = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var assert = require("assert");
  var path = require("path");
  var fs3 = require("fs");
  var glob = void 0;
  try {
    glob = require_glob();
  } catch (_err) {
  }
  var defaultGlobOpts = {
    nosort: true,
    silent: true
  };
  var timeout = 0;
  var isWindows = process.platform === "win32";
  var defaults = (options) => {
    const methods = [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ];
    methods.forEach((m) => {
      options[m] = options[m] || fs3[m];
      m = m + "Sync";
      options[m] = options[m] || fs3[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1e3;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    if (options.disableGlob !== true && glob === void 0) {
      throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  };
  var rimraf = (p, options, cb) => {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert.equal(typeof cb, "function", "rimraf: callback function required");
    assert(options, "rimraf: invalid options argument provided");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    defaults(options);
    let busyTries = 0;
    let errState = null;
    let n = 0;
    const next = (er) => {
      errState = errState || er;
      if (--n === 0)
        cb(errState);
    };
    const afterGlob = (er, results) => {
      if (er)
        return cb(er);
      n = results.length;
      if (n === 0)
        return cb();
      results.forEach((p2) => {
        const CB = (er2) => {
          if (er2) {
            if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
            }
            if (er2.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(() => rimraf_(p2, options, CB), timeout++);
            }
            if (er2.code === "ENOENT")
              er2 = null;
          }
          timeout = 0;
          next(er2);
        };
        rimraf_(p2, options, CB);
      });
    };
    if (options.disableGlob || !glob.hasMagic(p))
      return afterGlob(null, [p]);
    options.lstat(p, (er, stat) => {
      if (!er)
        return afterGlob(null, [p]);
      glob(p, options.glob, afterGlob);
    });
  };
  var rimraf_ = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.lstat(p, (er, st) => {
      if (er && er.code === "ENOENT")
        return cb(null);
      if (er && er.code === "EPERM" && isWindows)
        fixWinEPERM(p, options, er, cb);
      if (st && st.isDirectory())
        return rmdir(p, options, er, cb);
      options.unlink(p, (er2) => {
        if (er2) {
          if (er2.code === "ENOENT")
            return cb(null);
          if (er2.code === "EPERM")
            return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
          if (er2.code === "EISDIR")
            return rmdir(p, options, er2, cb);
        }
        return cb(er2);
      });
    });
  };
  var fixWinEPERM = (p, options, er, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.chmod(p, 438, (er2) => {
      if (er2)
        cb(er2.code === "ENOENT" ? null : er);
      else
        options.stat(p, (er3, stats) => {
          if (er3)
            cb(er3.code === "ENOENT" ? null : er);
          else if (stats.isDirectory())
            rmdir(p, options, er, cb);
          else
            options.unlink(p, cb);
        });
    });
  };
  var fixWinEPERMSync = (p, options, er) => {
    assert(p);
    assert(options);
    try {
      options.chmodSync(p, 438);
    } catch (er2) {
      if (er2.code === "ENOENT")
        return;
      else
        throw er;
    }
    let stats;
    try {
      stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT")
        return;
      else
        throw er;
    }
    if (stats.isDirectory())
      rmdirSync(p, options, er);
    else
      options.unlinkSync(p);
  };
  var rmdir = (p, options, originalEr, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.rmdir(p, (er) => {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
        rmkids(p, options, cb);
      else if (er && er.code === "ENOTDIR")
        cb(originalEr);
      else
        cb(er);
    });
  };
  var rmkids = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.readdir(p, (er, files) => {
      if (er)
        return cb(er);
      let n = files.length;
      if (n === 0)
        return options.rmdir(p, cb);
      let errState;
      files.forEach((f) => {
        rimraf(path.join(p, f), options, (er2) => {
          if (errState)
            return;
          if (er2)
            return cb(errState = er2);
          if (--n === 0)
            options.rmdir(p, cb);
        });
      });
    });
  };
  var rimrafSync = (p, options) => {
    options = options || {};
    defaults(options);
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert(options, "rimraf: missing options");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    let results;
    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }
    if (!results.length)
      return;
    for (let i = 0; i < results.length; i++) {
      const p2 = results[i];
      let st;
      try {
        st = options.lstatSync(p2);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM" && isWindows)
          fixWinEPERMSync(p2, options, er);
      }
      try {
        if (st && st.isDirectory())
          rmdirSync(p2, options, null);
        else
          options.unlinkSync(p2);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM")
          return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
        if (er.code !== "EISDIR")
          throw er;
        rmdirSync(p2, options, er);
      }
    }
  };
  var rmdirSync = (p, options, originalEr) => {
    assert(p);
    assert(options);
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT")
        return;
      if (er.code === "ENOTDIR")
        throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
        rmkidsSync(p, options);
    }
  };
  var rmkidsSync = (p, options) => {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach((f) => rimrafSync(path.join(p, f), options));
    const retries = isWindows ? 100 : 1;
    let i = 0;
    do {
      let threw = true;
      try {
        const ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw)
          continue;
      }
    } while (true);
  };
  module.exports = rimraf;
  rimraf.sync = rimrafSync;
});

// node_modules/mkdirp/lib/opts-arg.js
var require_opts_arg = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var {promisify} = require("util");
  var fs3 = require("fs");
  var optsArg = (opts) => {
    if (!opts)
      opts = {mode: 511, fs: fs3};
    else if (typeof opts === "object")
      opts = {mode: 511, fs: fs3, ...opts};
    else if (typeof opts === "number")
      opts = {mode: opts, fs: fs3};
    else if (typeof opts === "string")
      opts = {mode: parseInt(opts, 8), fs: fs3};
    else
      throw new TypeError("invalid options argument");
    opts.mkdir = opts.mkdir || opts.fs.mkdir || fs3.mkdir;
    opts.mkdirAsync = promisify(opts.mkdir);
    opts.stat = opts.stat || opts.fs.stat || fs3.stat;
    opts.statAsync = promisify(opts.stat);
    opts.statSync = opts.statSync || opts.fs.statSync || fs3.statSync;
    opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs3.mkdirSync;
    return opts;
  };
  module.exports = optsArg;
});

// node_modules/mkdirp/lib/path-arg.js
var require_path_arg = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var platform = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
  var {resolve, parse} = require("path");
  var pathArg = (path) => {
    if (/\0/.test(path)) {
      throw Object.assign(new TypeError("path must be a string without null bytes"), {
        path,
        code: "ERR_INVALID_ARG_VALUE"
      });
    }
    path = resolve(path);
    if (platform === "win32") {
      const badWinChars = /[*|"<>?:]/;
      const {root} = parse(path);
      if (badWinChars.test(path.substr(root.length))) {
        throw Object.assign(new Error("Illegal characters in path."), {
          path,
          code: "EINVAL"
        });
      }
    }
    return path;
  };
  module.exports = pathArg;
});

// node_modules/mkdirp/lib/find-made.js
var require_find_made = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var {dirname} = require("path");
  var findMade = (opts, parent, path = void 0) => {
    if (path === parent)
      return Promise.resolve();
    return opts.statAsync(parent).then((st) => st.isDirectory() ? path : void 0, (er) => er.code === "ENOENT" ? findMade(opts, dirname(parent), parent) : void 0);
  };
  var findMadeSync = (opts, parent, path = void 0) => {
    if (path === parent)
      return void 0;
    try {
      return opts.statSync(parent).isDirectory() ? path : void 0;
    } catch (er) {
      return er.code === "ENOENT" ? findMadeSync(opts, dirname(parent), parent) : void 0;
    }
  };
  module.exports = {findMade, findMadeSync};
});

// node_modules/mkdirp/lib/mkdirp-manual.js
var require_mkdirp_manual = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var {dirname} = require("path");
  var mkdirpManual = (path, opts, made) => {
    opts.recursive = false;
    const parent = dirname(path);
    if (parent === path) {
      return opts.mkdirAsync(path, opts).catch((er) => {
        if (er.code !== "EISDIR")
          throw er;
      });
    }
    return opts.mkdirAsync(path, opts).then(() => made || path, (er) => {
      if (er.code === "ENOENT")
        return mkdirpManual(parent, opts).then((made2) => mkdirpManual(path, opts, made2));
      if (er.code !== "EEXIST" && er.code !== "EROFS")
        throw er;
      return opts.statAsync(path).then((st) => {
        if (st.isDirectory())
          return made;
        else
          throw er;
      }, () => {
        throw er;
      });
    });
  };
  var mkdirpManualSync = (path, opts, made) => {
    const parent = dirname(path);
    opts.recursive = false;
    if (parent === path) {
      try {
        return opts.mkdirSync(path, opts);
      } catch (er) {
        if (er.code !== "EISDIR")
          throw er;
        else
          return;
      }
    }
    try {
      opts.mkdirSync(path, opts);
      return made || path;
    } catch (er) {
      if (er.code === "ENOENT")
        return mkdirpManualSync(path, opts, mkdirpManualSync(parent, opts, made));
      if (er.code !== "EEXIST" && er.code !== "EROFS")
        throw er;
      try {
        if (!opts.statSync(path).isDirectory())
          throw er;
      } catch (_) {
        throw er;
      }
    }
  };
  module.exports = {mkdirpManual, mkdirpManualSync};
});

// node_modules/mkdirp/lib/mkdirp-native.js
var require_mkdirp_native = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var {dirname} = require("path");
  var {findMade, findMadeSync} = require_find_made();
  var {mkdirpManual, mkdirpManualSync} = require_mkdirp_manual();
  var mkdirpNative = (path, opts) => {
    opts.recursive = true;
    const parent = dirname(path);
    if (parent === path)
      return opts.mkdirAsync(path, opts);
    return findMade(opts, path).then((made) => opts.mkdirAsync(path, opts).then(() => made).catch((er) => {
      if (er.code === "ENOENT")
        return mkdirpManual(path, opts);
      else
        throw er;
    }));
  };
  var mkdirpNativeSync = (path, opts) => {
    opts.recursive = true;
    const parent = dirname(path);
    if (parent === path)
      return opts.mkdirSync(path, opts);
    const made = findMadeSync(opts, path);
    try {
      opts.mkdirSync(path, opts);
      return made;
    } catch (er) {
      if (er.code === "ENOENT")
        return mkdirpManualSync(path, opts);
      else
        throw er;
    }
  };
  module.exports = {mkdirpNative, mkdirpNativeSync};
});

// node_modules/mkdirp/lib/use-native.js
var require_use_native = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var fs3 = require("fs");
  var version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
  var versArr = version.replace(/^v/, "").split(".");
  var hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;
  var useNative = !hasNative ? () => false : (opts) => opts.mkdir === fs3.mkdir;
  var useNativeSync = !hasNative ? () => false : (opts) => opts.mkdirSync === fs3.mkdirSync;
  module.exports = {useNative, useNativeSync};
});

// node_modules/mkdirp/index.js
var require_mkdirp = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var optsArg = require_opts_arg();
  var pathArg = require_path_arg();
  var {mkdirpNative, mkdirpNativeSync} = require_mkdirp_native();
  var {mkdirpManual, mkdirpManualSync} = require_mkdirp_manual();
  var {useNative, useNativeSync} = require_use_native();
  var mkdirp = (path, opts) => {
    path = pathArg(path);
    opts = optsArg(opts);
    return useNative(opts) ? mkdirpNative(path, opts) : mkdirpManual(path, opts);
  };
  var mkdirpSync = (path, opts) => {
    path = pathArg(path);
    opts = optsArg(opts);
    return useNativeSync(opts) ? mkdirpNativeSync(path, opts) : mkdirpManualSync(path, opts);
  };
  mkdirp.sync = mkdirpSync;
  mkdirp.native = (path, opts) => mkdirpNative(pathArg(path), optsArg(opts));
  mkdirp.manual = (path, opts) => mkdirpManual(pathArg(path), optsArg(opts));
  mkdirp.nativeSync = (path, opts) => mkdirpNativeSync(pathArg(path), optsArg(opts));
  mkdirp.manualSync = (path, opts) => mkdirpManualSync(pathArg(path), optsArg(opts));
  module.exports = mkdirp;
});

// node_modules/majo/dist/index.js
var require_dist = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var path = _interopDefault(require("path"));
  var fs3 = _interopDefault(require("fs"));
  var util = require("util");
  var glob = _interopDefault(require_out4());
  var rimraf = _interopDefault(require_rimraf());
  var ensureDir2 = _interopDefault(require_mkdirp());
  var Wares = class {
    constructor() {
      this.middlewares = [];
    }
    use(middleware) {
      this.middlewares = this.middlewares.concat(middleware);
      return this;
    }
    run(context) {
      return this.middlewares.reduce((current, next) => {
        return current.then(() => Promise.resolve(next(context)));
      }, Promise.resolve());
    }
  };
  var readFile2 = util.promisify(fs3.readFile);
  var writeFile = util.promisify(fs3.writeFile);
  var remove2 = util.promisify(rimraf);
  var Majo = class {
    constructor() {
      this.middlewares = [];
      this.meta = {};
      this.files = {};
    }
    source(patterns, options = {}) {
      const {baseDir = ".", dotFiles = true, onWrite} = options;
      this.baseDir = path.resolve(baseDir);
      this.sourcePatterns = Array.isArray(patterns) ? patterns : [patterns];
      this.dotFiles = dotFiles;
      this.onWrite = onWrite;
      return this;
    }
    use(middleware) {
      this.middlewares.push(middleware);
      return this;
    }
    async process() {
      if (!this.sourcePatterns || !this.baseDir) {
        throw new Error(`[majo] You need to call .source first`);
      }
      const allEntries = await glob(this.sourcePatterns, {
        cwd: this.baseDir,
        dot: this.dotFiles,
        stats: true
      });
      await Promise.all(allEntries.map((entry) => {
        const absolutePath = path.resolve(this.baseDir, entry.path);
        return readFile2(absolutePath).then((contents) => {
          const file = {
            contents,
            stats: entry.stats,
            path: absolutePath
          };
          this.files[entry.path] = file;
        });
      }));
      await new Wares().use(this.middlewares).run(this);
      return this;
    }
    filter(fn) {
      return this.use((context) => {
        for (const relativePath in context.files) {
          if (!fn(relativePath, context.files[relativePath])) {
            delete context.files[relativePath];
          }
        }
      });
    }
    async transform(relativePath, fn) {
      const contents = this.files[relativePath].contents.toString();
      const newContents = await fn(contents);
      this.files[relativePath].contents = Buffer.from(newContents);
    }
    async dest(dest, options = {}) {
      const {baseDir = ".", clean = false} = options;
      const destPath = path.resolve(baseDir, dest);
      await this.process();
      if (clean) {
        await remove2(destPath);
      }
      await Promise.all(Object.keys(this.files).map((filename) => {
        const {contents} = this.files[filename];
        const target = path.join(destPath, filename);
        if (this.onWrite) {
          this.onWrite(filename, target);
        }
        return ensureDir2(path.dirname(target)).then(() => writeFile(target, contents));
      }));
      return this;
    }
    fileContents(relativePath) {
      return this.file(relativePath).contents.toString();
    }
    writeContents(relativePath, contents) {
      this.files[relativePath].contents = Buffer.from(contents);
      return this;
    }
    fileStats(relativePath) {
      return this.file(relativePath).stats;
    }
    file(relativePath) {
      return this.files[relativePath];
    }
    deleteFile(relativePath) {
      delete this.files[relativePath];
      return this;
    }
    createFile(relativePath, file) {
      this.files[relativePath] = file;
      return this;
    }
    get fileList() {
      return Object.keys(this.files).sort();
    }
    rename(fromPath, toPath) {
      if (!this.baseDir) {
        return this;
      }
      const file = this.files[fromPath];
      this.createFile(toPath, {
        path: path.resolve(this.baseDir, toPath),
        stats: file.stats,
        contents: file.contents
      });
      this.deleteFile(fromPath);
      return this;
    }
  };
  var majo2 = () => new Majo();
  var outputFile2 = (filepath, data, options) => ensureDir2(path.dirname(filepath)).then(() => writeFile(filepath, data, options));
  exports.glob = glob;
  exports.ensureDir = ensureDir2;
  exports.Majo = Majo;
  exports.majo = majo2;
  exports.outputFile = outputFile2;
  exports.remove = remove2;
});

// node_modules/path-exists/index.js
var require_path_exists = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var fs3 = require("fs");
  var {promisify} = require("util");
  var pAccess = promisify(fs3.access);
  module.exports = async (path) => {
    try {
      await pAccess(path);
      return true;
    } catch (_) {
      return false;
    }
  };
  module.exports.sync = (path) => {
    try {
      fs3.accessSync(path);
      return true;
    } catch (_) {
      return false;
    }
  };
});

// node_modules/move-file/index.js
var require_move_file = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path = require("path");
  var fs3 = require("fs");
  var pathExists = require_path_exists();
  var fsP = fs3.promises;
  module.exports = async (source, destination, options) => {
    if (!source || !destination) {
      throw new TypeError("`source` and `destination` file required");
    }
    options = {
      overwrite: true,
      ...options
    };
    if (!options.overwrite && await pathExists(destination)) {
      throw new Error(`The destination file exists: ${destination}`);
    }
    await fsP.mkdir(path.dirname(destination), {recursive: true});
    try {
      await fsP.rename(source, destination);
    } catch (error) {
      if (error.code === "EXDEV") {
        await fsP.copyFile(source, destination);
        await fsP.unlink(source);
      } else {
        throw error;
      }
    }
  };
  module.exports.sync = (source, destination, options) => {
    if (!source || !destination) {
      throw new TypeError("`source` and `destination` file required");
    }
    options = {
      overwrite: true,
      ...options
    };
    if (!options.overwrite && fs3.existsSync(destination)) {
      throw new Error(`The destination file exists: ${destination}`);
    }
    fs3.mkdirSync(path.dirname(destination), {recursive: true});
    try {
      fs3.renameSync(source, destination);
    } catch (error) {
      if (error.code === "EXDEV") {
        fs3.copyFileSync(source, destination);
        fs3.unlinkSync(source);
      } else {
        throw error;
      }
    }
  };
});

// src/utils/fs.ts
var move_file = _chunkEOPTLNEQjs.__toModule.call(void 0, require_move_file());
var majo = _chunkEOPTLNEQjs.__toModule.call(void 0, require_dist());
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var readFile = _fs2.default.promises.readFile;









exports.fs = _fs2.default; exports.move_file = move_file; exports.readFile = readFile; exports.majo = majo; exports.require_once = require_once; exports.require_dist = require_dist; exports.require_micromatch = require_micromatch;
