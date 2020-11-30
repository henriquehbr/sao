"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var _chunkN3M3HMMCjs = require('./chunk.N3M3HMMC.js');




var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// node_modules/ejs/lib/utils.js
var require_utils = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  var regExpChars = /[|\\{}()[\]^$+*?.]/g;
  exports.escapeRegExpChars = function(string) {
    if (!string) {
      return "";
    }
    return String(string).replace(regExpChars, "\\$&");
  };
  var _ENCODE_HTML_RULES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&#34;",
    "'": "&#39;"
  };
  var _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }
  var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
  exports.escapeXML = function(markup) {
    return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
  };
  exports.escapeXML.toString = function() {
    return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
  };
  exports.shallowCopy = function(to, from) {
    from = from || {};
    for (var p in from) {
      to[p] = from[p];
    }
    return to;
  };
  exports.shallowCopyFromList = function(to, from, list) {
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (typeof from[p] != "undefined") {
        to[p] = from[p];
      }
    }
    return to;
  };
  exports.cache = {
    _data: {},
    set: function(key, val) {
      this._data[key] = val;
    },
    get: function(key) {
      return this._data[key];
    },
    remove: function(key) {
      delete this._data[key];
    },
    reset: function() {
      this._data = {};
    }
  };
});

// node_modules/ejs/package.json
var require_package = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = {
    name: "ejs",
    description: "Embedded JavaScript templates",
    keywords: [
      "template",
      "engine",
      "ejs"
    ],
    version: "3.1.2",
    author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
    license: "Apache-2.0",
    bin: {
      ejs: "./bin/cli.js"
    },
    main: "./lib/ejs.js",
    repository: {
      type: "git",
      url: "git://github.com/mde/ejs.git"
    },
    bugs: "https://github.com/mde/ejs/issues",
    homepage: "https://github.com/mde/ejs",
    dependencies: {
      jake: "^10.6.1"
    },
    devDependencies: {
      browserify: "^16.5.1",
      eslint: "^6.8.0",
      "git-directory-deploy": "^1.5.1",
      jsdoc: "^3.6.4",
      "lru-cache": "^4.0.1",
      mocha: "^7.1.1",
      "uglify-js": "^3.3.16"
    },
    engines: {
      node: ">=0.10.0"
    },
    scripts: {
      test: "mocha",
      postinstall: "node --harmony ./postinstall.js"
    }
  };
});

// node_modules/ejs/lib/ejs.js
var require_ejs = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  "use strict";
  /**
   * @file Embedded JavaScript templating engine. {@link http://ejs.co}
   * @author Matthew Eernisse <mde@fleegix.org>
   * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
   * @project EJS
   * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
   */
  var fs2 = require("fs");
  var path3 = require("path");
  var utils = require_utils();
  var scopeOptionWarned = false;
  var _VERSION_STRING = require_package().version;
  var _DEFAULT_OPEN_DELIMITER = "<";
  var _DEFAULT_CLOSE_DELIMITER = ">";
  var _DEFAULT_DELIMITER = "%";
  var _DEFAULT_LOCALS_NAME = "locals";
  var _NAME = "ejs";
  var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
  var _OPTS_PASSABLE_WITH_DATA = [
    "delimiter",
    "scope",
    "context",
    "debug",
    "compileDebug",
    "client",
    "_with",
    "rmWhitespace",
    "strict",
    "filename",
    "async"
  ];
  var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
  var _BOM = /^\uFEFF/;
  exports.cache = utils.cache;
  exports.fileLoader = fs2.readFileSync;
  exports.localsName = _DEFAULT_LOCALS_NAME;
  exports.promiseImpl = new Function("return this;")().Promise;
  exports.resolveInclude = function(name, filename, isDir) {
    var dirname = path3.dirname;
    var extname = path3.extname;
    var resolve = path3.resolve;
    var includePath = resolve(isDir ? filename : dirname(filename), name);
    var ext = extname(name);
    if (!ext) {
      includePath += ".ejs";
    }
    return includePath;
  };
  function resolvePaths(name, paths) {
    var filePath;
    if (paths.some(function(v) {
      filePath = exports.resolveInclude(name, v, true);
      return fs2.existsSync(filePath);
    })) {
      return filePath;
    }
  }
  function getIncludePath(path4, options) {
    var includePath;
    var filePath;
    var views = options.views;
    var match = /^[A-Za-z]+:\\|^\//.exec(path4);
    if (match && match.length) {
      path4 = path4.replace(/^\/*/, "");
      if (Array.isArray(options.root)) {
        includePath = resolvePaths(path4, options.root);
      } else {
        includePath = exports.resolveInclude(path4, options.root || "/", true);
      }
    } else {
      if (options.filename) {
        filePath = exports.resolveInclude(path4, options.filename);
        if (fs2.existsSync(filePath)) {
          includePath = filePath;
        }
      }
      if (!includePath && Array.isArray(views)) {
        includePath = resolvePaths(path4, views);
      }
      if (!includePath) {
        throw new Error('Could not find the include file "' + options.escapeFunction(path4) + '"');
      }
    }
    return includePath;
  }
  function handleCache(options, template) {
    var func;
    var filename = options.filename;
    var hasTemplate = arguments.length > 1;
    if (options.cache) {
      if (!filename) {
        throw new Error("cache option requires a filename");
      }
      func = exports.cache.get(filename);
      if (func) {
        return func;
      }
      if (!hasTemplate) {
        template = fileLoader(filename).toString().replace(_BOM, "");
      }
    } else if (!hasTemplate) {
      if (!filename) {
        throw new Error("Internal EJS error: no file name or template provided");
      }
      template = fileLoader(filename).toString().replace(_BOM, "");
    }
    func = exports.compile(template, options);
    if (options.cache) {
      exports.cache.set(filename, func);
    }
    return func;
  }
  function tryHandleCache(options, data, cb) {
    var result;
    if (!cb) {
      if (typeof exports.promiseImpl == "function") {
        return new exports.promiseImpl(function(resolve, reject) {
          try {
            result = handleCache(options)(data);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      } else {
        throw new Error("Please provide a callback function");
      }
    } else {
      try {
        result = handleCache(options)(data);
      } catch (err) {
        return cb(err);
      }
      cb(null, result);
    }
  }
  function fileLoader(filePath) {
    return exports.fileLoader(filePath);
  }
  function includeFile(path4, options) {
    var opts = utils.shallowCopy({}, options);
    opts.filename = getIncludePath(path4, opts);
    return handleCache(opts);
  }
  function rethrow(err, str, flnm, lineno, esc) {
    var lines = str.split("\n");
    var start = Math.max(lineno - 3, 0);
    var end = Math.min(lines.length, lineno + 3);
    var filename = esc(flnm);
    var context = lines.slice(start, end).map(function(line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
    }).join("\n");
    err.path = filename;
    err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
    throw err;
  }
  function stripSemi(str) {
    return str.replace(/;(\s*$)/, "$1");
  }
  exports.compile = function compile(template, opts) {
    var templ;
    if (opts && opts.scope) {
      if (!scopeOptionWarned) {
        console.warn("`scope` option is deprecated and will be removed in EJS 3");
        scopeOptionWarned = true;
      }
      if (!opts.context) {
        opts.context = opts.scope;
      }
      delete opts.scope;
    }
    templ = new Template(template, opts);
    return templ.compile();
  };
  exports.render = function(template, d, o) {
    var data = d || {};
    var opts = o || {};
    if (arguments.length == 2) {
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
    }
    return handleCache(opts, template)(data);
  };
  exports.renderFile = function() {
    var args = Array.prototype.slice.call(arguments);
    var filename = args.shift();
    var cb;
    var opts = {filename};
    var data;
    var viewOpts;
    if (typeof arguments[arguments.length - 1] == "function") {
      cb = args.pop();
    }
    if (args.length) {
      data = args.shift();
      if (args.length) {
        utils.shallowCopy(opts, args.pop());
      } else {
        if (data.settings) {
          if (data.settings.views) {
            opts.views = data.settings.views;
          }
          if (data.settings["view cache"]) {
            opts.cache = true;
          }
          viewOpts = data.settings["view options"];
          if (viewOpts) {
            utils.shallowCopy(opts, viewOpts);
          }
        }
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
      }
      opts.filename = filename;
    } else {
      data = {};
    }
    return tryHandleCache(opts, data, cb);
  };
  exports.Template = Template;
  exports.clearCache = function() {
    exports.cache.reset();
  };
  function Template(text, opts) {
    opts = opts || {};
    var options = {};
    this.templateText = text;
    this.mode = null;
    this.truncate = false;
    this.currentLine = 1;
    this.source = "";
    options.client = opts.client || false;
    options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
    options.compileDebug = opts.compileDebug !== false;
    options.debug = !!opts.debug;
    options.filename = opts.filename;
    options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
    options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
    options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
    options.strict = opts.strict || false;
    options.context = opts.context;
    options.cache = opts.cache || false;
    options.rmWhitespace = opts.rmWhitespace;
    options.root = opts.root;
    options.outputFunctionName = opts.outputFunctionName;
    options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
    options.views = opts.views;
    options.async = opts.async;
    options.destructuredLocals = opts.destructuredLocals;
    options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
    if (options.strict) {
      options._with = false;
    } else {
      options._with = typeof opts._with != "undefined" ? opts._with : true;
    }
    this.opts = options;
    this.regex = this.createRegex();
  }
  Template.modes = {
    EVAL: "eval",
    ESCAPED: "escaped",
    RAW: "raw",
    COMMENT: "comment",
    LITERAL: "literal"
  };
  Template.prototype = {
    createRegex: function() {
      var str = _REGEX_STRING;
      var delim = utils.escapeRegExpChars(this.opts.delimiter);
      var open = utils.escapeRegExpChars(this.opts.openDelimiter);
      var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
      str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
      return new RegExp(str);
    },
    compile: function() {
      var src;
      var fn;
      var opts = this.opts;
      var prepended = "";
      var appended = "";
      var escapeFn = opts.escapeFunction;
      var ctor;
      if (!this.source) {
        this.generateSource();
        prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
        if (opts.outputFunctionName) {
          prepended += "  var " + opts.outputFunctionName + " = __append;\n";
        }
        if (opts.destructuredLocals && opts.destructuredLocals.length) {
          var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
          for (var i = 0; i < opts.destructuredLocals.length; i++) {
            var name = opts.destructuredLocals[i];
            if (i > 0) {
              destructuring += ",\n  ";
            }
            destructuring += name + " = __locals." + name;
          }
          prepended += destructuring + ";\n";
        }
        if (opts._with !== false) {
          prepended += "  with (" + opts.localsName + " || {}) {\n";
          appended += "  }\n";
        }
        appended += "  return __output;\n";
        this.source = prepended + this.source + appended;
      }
      if (opts.compileDebug) {
        src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + (opts.filename ? JSON.stringify(opts.filename) : "undefined") + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
      } else {
        src = this.source;
      }
      if (opts.client) {
        src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
        if (opts.compileDebug) {
          src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
        }
      }
      if (opts.strict) {
        src = '"use strict";\n' + src;
      }
      if (opts.debug) {
        console.log(src);
      }
      if (opts.compileDebug && opts.filename) {
        src = src + "\n//# sourceURL=" + opts.filename + "\n";
      }
      try {
        if (opts.async) {
          try {
            ctor = new Function("return (async function(){}).constructor;")();
          } catch (e) {
            if (e instanceof SyntaxError) {
              throw new Error("This environment does not support async/await");
            } else {
              throw e;
            }
          }
        } else {
          ctor = Function;
        }
        fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
      } catch (e) {
        if (e instanceof SyntaxError) {
          if (opts.filename) {
            e.message += " in " + opts.filename;
          }
          e.message += " while compiling ejs\n\n";
          e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
          e.message += "https://github.com/RyanZim/EJS-Lint";
          if (!opts.async) {
            e.message += "\n";
            e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
          }
        }
        throw e;
      }
      var returnedFn = opts.client ? fn : function anonymous(data) {
        var include = function(path4, includeData) {
          var d = utils.shallowCopy({}, data);
          if (includeData) {
            d = utils.shallowCopy(d, includeData);
          }
          return includeFile(path4, opts)(d);
        };
        return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
      };
      if (opts.filename && typeof Object.defineProperty === "function") {
        var filename = opts.filename;
        var basename = path3.basename(filename, path3.extname(filename));
        try {
          Object.defineProperty(returnedFn, "name", {
            value: basename,
            writable: false,
            enumerable: false,
            configurable: true
          });
        } catch (e) {
        }
      }
      return returnedFn;
    },
    generateSource: function() {
      var opts = this.opts;
      if (opts.rmWhitespace) {
        this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
      }
      this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
      var self = this;
      var matches = this.parseTemplateText();
      var d = this.opts.delimiter;
      var o = this.opts.openDelimiter;
      var c = this.opts.closeDelimiter;
      if (matches && matches.length) {
        matches.forEach(function(line, index) {
          var closing;
          if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
            closing = matches[index + 2];
            if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
              throw new Error('Could not find matching close tag for "' + line + '".');
            }
          }
          self.scanLine(line);
        });
      }
    },
    parseTemplateText: function() {
      var str = this.templateText;
      var pat = this.regex;
      var result = pat.exec(str);
      var arr = [];
      var firstPos;
      while (result) {
        firstPos = result.index;
        if (firstPos !== 0) {
          arr.push(str.substring(0, firstPos));
          str = str.slice(firstPos);
        }
        arr.push(result[0]);
        str = str.slice(result[0].length);
        result = pat.exec(str);
      }
      if (str) {
        arr.push(str);
      }
      return arr;
    },
    _addOutput: function(line) {
      if (this.truncate) {
        line = line.replace(/^(?:\r\n|\r|\n)/, "");
        this.truncate = false;
      }
      if (!line) {
        return line;
      }
      line = line.replace(/\\/g, "\\\\");
      line = line.replace(/\n/g, "\\n");
      line = line.replace(/\r/g, "\\r");
      line = line.replace(/"/g, '\\"');
      this.source += '    ; __append("' + line + '")\n';
    },
    scanLine: function(line) {
      var self = this;
      var d = this.opts.delimiter;
      var o = this.opts.openDelimiter;
      var c = this.opts.closeDelimiter;
      var newLineCount = 0;
      newLineCount = line.split("\n").length - 1;
      switch (line) {
        case o + d:
        case o + d + "_":
          this.mode = Template.modes.EVAL;
          break;
        case o + d + "=":
          this.mode = Template.modes.ESCAPED;
          break;
        case o + d + "-":
          this.mode = Template.modes.RAW;
          break;
        case o + d + "#":
          this.mode = Template.modes.COMMENT;
          break;
        case o + d + d:
          this.mode = Template.modes.LITERAL;
          this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
          break;
        case d + d + c:
          this.mode = Template.modes.LITERAL;
          this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
          break;
        case d + c:
        case "-" + d + c:
        case "_" + d + c:
          if (this.mode == Template.modes.LITERAL) {
            this._addOutput(line);
          }
          this.mode = null;
          this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
          break;
        default:
          if (this.mode) {
            switch (this.mode) {
              case Template.modes.EVAL:
              case Template.modes.ESCAPED:
              case Template.modes.RAW:
                if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                  line += "\n";
                }
            }
            switch (this.mode) {
              case Template.modes.EVAL:
                this.source += "    ; " + line + "\n";
                break;
              case Template.modes.ESCAPED:
                this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                break;
              case Template.modes.RAW:
                this.source += "    ; __append(" + stripSemi(line) + ")\n";
                break;
              case Template.modes.COMMENT:
                break;
              case Template.modes.LITERAL:
                this._addOutput(line);
                break;
            }
          } else {
            this._addOutput(line);
          }
      }
      if (self.opts.compileDebug && newLineCount) {
        this.currentLine += newLineCount;
        this.source += "    ; __line = " + this.currentLine + "\n";
      }
    }
  };
  exports.escapeXML = utils.escapeXML;
  exports.__express = exports.renderFile;
  exports.VERSION = _VERSION_STRING;
  exports.name = _NAME;
  if (typeof window != "undefined") {
    window.ejs = exports;
  }
});

// node_modules/binary-extensions/binary-extensions.json
var require_binary_extensions = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = [
    "3dm",
    "3ds",
    "3g2",
    "3gp",
    "7z",
    "a",
    "aac",
    "adp",
    "ai",
    "aif",
    "aiff",
    "alz",
    "ape",
    "apk",
    "ar",
    "arj",
    "asf",
    "au",
    "avi",
    "bak",
    "baml",
    "bh",
    "bin",
    "bk",
    "bmp",
    "btif",
    "bz2",
    "bzip2",
    "cab",
    "caf",
    "cgm",
    "class",
    "cmx",
    "cpio",
    "cr2",
    "cur",
    "dat",
    "dcm",
    "deb",
    "dex",
    "djvu",
    "dll",
    "dmg",
    "dng",
    "doc",
    "docm",
    "docx",
    "dot",
    "dotm",
    "dra",
    "DS_Store",
    "dsk",
    "dts",
    "dtshd",
    "dvb",
    "dwg",
    "dxf",
    "ecelp4800",
    "ecelp7470",
    "ecelp9600",
    "egg",
    "eol",
    "eot",
    "epub",
    "exe",
    "f4v",
    "fbs",
    "fh",
    "fla",
    "flac",
    "fli",
    "flv",
    "fpx",
    "fst",
    "fvt",
    "g3",
    "gh",
    "gif",
    "graffle",
    "gz",
    "gzip",
    "h261",
    "h263",
    "h264",
    "icns",
    "ico",
    "ief",
    "img",
    "ipa",
    "iso",
    "jar",
    "jpeg",
    "jpg",
    "jpgv",
    "jpm",
    "jxr",
    "key",
    "ktx",
    "lha",
    "lib",
    "lvp",
    "lz",
    "lzh",
    "lzma",
    "lzo",
    "m3u",
    "m4a",
    "m4v",
    "mar",
    "mdi",
    "mht",
    "mid",
    "midi",
    "mj2",
    "mka",
    "mkv",
    "mmr",
    "mng",
    "mobi",
    "mov",
    "movie",
    "mp3",
    "mp4",
    "mp4a",
    "mpeg",
    "mpg",
    "mpga",
    "mxu",
    "nef",
    "npx",
    "numbers",
    "nupkg",
    "o",
    "oga",
    "ogg",
    "ogv",
    "otf",
    "pages",
    "pbm",
    "pcx",
    "pdb",
    "pdf",
    "pea",
    "pgm",
    "pic",
    "png",
    "pnm",
    "pot",
    "potm",
    "potx",
    "ppa",
    "ppam",
    "ppm",
    "pps",
    "ppsm",
    "ppsx",
    "ppt",
    "pptm",
    "pptx",
    "psd",
    "pya",
    "pyc",
    "pyo",
    "pyv",
    "qt",
    "rar",
    "ras",
    "raw",
    "resources",
    "rgb",
    "rip",
    "rlc",
    "rmf",
    "rmvb",
    "rtf",
    "rz",
    "s3m",
    "s7z",
    "scpt",
    "sgi",
    "shar",
    "sil",
    "sketch",
    "slk",
    "smv",
    "snk",
    "so",
    "stl",
    "suo",
    "sub",
    "swf",
    "tar",
    "tbz",
    "tbz2",
    "tga",
    "tgz",
    "thmx",
    "tif",
    "tiff",
    "tlz",
    "ttc",
    "ttf",
    "txz",
    "udf",
    "uvh",
    "uvi",
    "uvm",
    "uvp",
    "uvs",
    "uvu",
    "viv",
    "vob",
    "war",
    "wav",
    "wax",
    "wbmp",
    "wdp",
    "weba",
    "webm",
    "webp",
    "whl",
    "wim",
    "wm",
    "wma",
    "wmv",
    "wmx",
    "woff",
    "woff2",
    "wrm",
    "wvx",
    "xbm",
    "xif",
    "xla",
    "xlam",
    "xls",
    "xlsb",
    "xlsm",
    "xlsx",
    "xlt",
    "xltm",
    "xltx",
    "xm",
    "xmind",
    "xpi",
    "xpm",
    "xwd",
    "xz",
    "z",
    "zip",
    "zipx"
  ];
});

// node_modules/binary-extensions/index.js
var require_binary_extensions2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = require_binary_extensions();
});

// node_modules/is-binary-path/index.js
var require_is_binary_path = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path3 = require("path");
  var binaryExtensions = require_binary_extensions2();
  var extensions = new Set(binaryExtensions);
  module.exports = (filePath) => extensions.has(path3.extname(filePath).slice(1).toLowerCase());
});

// src/run-actions.ts
var micromatch = _chunkEOPTLNEQjs.__toModule.call(void 0, _chunkN3M3HMMCjs.require_micromatch.call(void 0, ));
var majo = _chunkEOPTLNEQjs.__toModule.call(void 0, _chunkN3M3HMMCjs.require_dist.call(void 0, ));
var ejs = _chunkEOPTLNEQjs.__toModule.call(void 0, require_ejs());
var is_binary_path = _chunkEOPTLNEQjs.__toModule.call(void 0, require_is_binary_path());
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// src/utils/evaluate.ts
var evaluate = (exp, data) => {
  const fn = new Function("data", `with (data) { return ${exp} }`);
  try {
    return fn(data);
  } catch (err) {
    console.error(err.stack);
    console.error(`Error when evaluating filter condition: ${exp}`);
  }
};

// src/utils/get-glob-patterns.ts
var getGlobPatterns = (files, context, getExcludedPatterns) => {
  return Object.keys(files).filter((pattern) => {
    let condition = files[pattern];
    if (typeof condition === "string") {
      condition = evaluate(condition, context);
    }
    return getExcludedPatterns ? !condition : condition;
  });
};

// src/run-actions.ts
var runActions = async (config, context) => {
  const actions = typeof config.actions === "function" ? await config.actions.call(context, context) : config.actions;
  if (!actions)
    return;
  for (const action of actions) {
    _chunkEOPTLNEQjs.logger.debug("Running action:", action);
    if (action.type === "add" && action.files) {
      const stream = majo.majo();
      stream.source(["!**/node_modules/**"].concat(action.files), {
        baseDir: _path2.default.resolve(context.parsedGenerator.path, action.templateDir || config.templateDir || "template")
      });
      if (action.filters) {
        const excludedPatterns = getGlobPatterns(action.filters, context.answers, true);
        if (excludedPatterns.length > 0) {
          stream.use(() => {
            const excludedFiles = micromatch.default(stream.fileList, excludedPatterns);
            for (const file of excludedFiles) {
              stream.deleteFile(file);
            }
          });
        }
      }
      const shouldTransform = typeof action.transform === "boolean" ? action.transform : config.transform !== false;
      if (shouldTransform) {
        stream.use(({files}) => {
          let fileList = Object.keys(stream.files);
          fileList = fileList.filter((fp) => !is_binary_path.default(fp));
          if (action.transformInclude) {
            fileList = micromatch.default(fileList, action.transformInclude);
          }
          if (action.transformExclude) {
            fileList = micromatch.default.not(fileList, action.transformExclude);
          }
          fileList.forEach((relativePath) => {
            const contents = files[relativePath].contents.toString();
            const actionData = typeof action.data === "object" ? action.data : action.data && action.data.call(context, context);
            stream.writeContents(relativePath, ejs.default.render(contents, Object.assign({}, context.answers, actionData, {
              context
            })));
          });
        });
      }
      stream.onWrite = (_, targetPath) => {
        _chunkEOPTLNEQjs.logger.fileAction("magenta", "Created", targetPath);
      };
      await stream.dest(context.outDir);
    } else if (action.type === "modify" && action.handler) {
      const stream = majo.majo();
      stream.source(action.files, {baseDir: context.outDir});
      stream.use(async ({files}) => {
        await Promise.all(Object.keys(files).map(async (relativePath) => {
          const isJson = relativePath.endsWith(".json");
          let contents = stream.fileContents(relativePath);
          if (isJson) {
            contents = JSON.parse(contents);
          }
          let result = await action.handler(contents, relativePath);
          if (isJson) {
            result = JSON.stringify(result, null, 2);
          }
          stream.writeContents(relativePath, result);
          _chunkEOPTLNEQjs.logger.fileAction("yellow", "Modified", _path2.default.join(context.outDir, relativePath));
        }));
      });
      await stream.dest(context.outDir);
    } else if (action.type === "move" && action.patterns) {
      await Promise.all(Object.keys(action.patterns).map(async (pattern) => {
        const files = await majo.glob(pattern, {
          cwd: context.outDir,
          absolute: true,
          onlyFiles: false
        });
        if (files.length > 1) {
          throw new Error('"move" pattern can only match one file!');
        } else if (files.length === 1) {
          const from = files[0];
          const to = _path2.default.join(context.outDir, action.patterns[pattern]);
          await _chunkN3M3HMMCjs.move_file.default(from, to, {
            overwrite: true
          });
          _chunkEOPTLNEQjs.logger.fileMoveAction(from, to);
        }
      }));
    } else if (action.type === "remove" && action.files) {
      let patterns = [];
      if (typeof action.files === "string") {
        patterns = [action.files];
      } else if (Array.isArray(action.files)) {
        patterns = action.files;
      } else if (typeof action.files === "object") {
        patterns = getGlobPatterns(action.files, context.data);
      }
      const files = await majo.glob(patterns, {
        cwd: context.outDir,
        absolute: true,
        onlyFiles: false
      });
      await Promise.all(files.map((file) => {
        _chunkEOPTLNEQjs.logger.fileAction("red", "Removed", file);
        return majo.remove(file);
      }));
    }
  }
};


exports.runActions = runActions;
