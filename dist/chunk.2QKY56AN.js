"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkO6VIHJHZjs = require('./chunk.O6VIHJHZ.js');





var _chunkOP7ZF2FCjs = require('./chunk.OP7ZF2FC.js');





var _chunkGL5SJIXUjs = require('./chunk.GL5SJIXU.js');


var _chunkPURBCYRPjs = require('./chunk.PURBCYRP.js');


var _chunkA3G5L6QYjs = require('./chunk.A3G5L6QY.js');







var _chunkN3M3HMMCjs = require('./chunk.N3M3HMMC.js');







var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// node_modules/isexe/windows.js
var require_windows = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = isexe;
  isexe.sync = sync;
  var fs11 = require("fs");
  function checkPathExt(path16, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path16.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path16, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path16, options);
  }
  function isexe(path16, options, cb) {
    fs11.stat(path16, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path16, options));
    });
  }
  function sync(path16, options) {
    return checkStat(fs11.statSync(path16), path16, options);
  }
});

// node_modules/isexe/mode.js
var require_mode = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = isexe;
  isexe.sync = sync;
  var fs11 = require("fs");
  function isexe(path16, options, cb) {
    fs11.stat(path16, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync(path16, options) {
    return checkStat(fs11.statSync(path16), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
});

// node_modules/isexe/index.js
var require_isexe = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var fs11 = require("fs");
  var core;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core = require_windows();
  } else {
    core = require_mode();
  }
  module.exports = isexe;
  isexe.sync = sync;
  function isexe(path16, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function(resolve, reject) {
        isexe(path16, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path16, options || {}, function(er, is) {
      if (er) {
        if (er.code === "EACCES" || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path16, options) {
    try {
      return core.sync(path16, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  }
});

// node_modules/which/which.js
var require_which = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
  var path16 = require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
  var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), {code: "ENOENT"});
  var getPathInfo = (cmd, opt) => {
    const colon = opt.colon || COLON;
    const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
      ...isWindows ? [process.cwd()] : [],
      ...(opt.path || process.env.PATH || "").split(colon)
    ];
    const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
    const pathExt = isWindows ? pathExtExe.split(colon) : [""];
    if (isWindows) {
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
        pathExt.unshift("");
    }
    return {
      pathEnv,
      pathExt,
      pathExtExe
    };
  };
  var which = (cmd, opt, cb) => {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    if (!opt)
      opt = {};
    const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt);
    const found = [];
    const step = (i) => new Promise((resolve, reject) => {
      if (i === pathEnv.length)
        return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
      const ppRaw = pathEnv[i];
      const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
      const pCmd = path16.join(pathPart, cmd);
      const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
      resolve(subStep(p, i, 0));
    });
    const subStep = (p, i, ii) => new Promise((resolve, reject) => {
      if (ii === pathExt.length)
        return resolve(step(i + 1));
      const ext = pathExt[ii];
      isexe(p + ext, {pathExt: pathExtExe}, (er, is) => {
        if (!er && is) {
          if (opt.all)
            found.push(p + ext);
          else
            return resolve(p + ext);
        }
        return resolve(subStep(p, i, ii + 1));
      });
    });
    return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
  };
  var whichSync = (cmd, opt) => {
    opt = opt || {};
    const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt);
    const found = [];
    for (let i = 0; i < pathEnv.length; i++) {
      const ppRaw = pathEnv[i];
      const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
      const pCmd = path16.join(pathPart, cmd);
      const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
      for (let j = 0; j < pathExt.length; j++) {
        const cur = p + pathExt[j];
        try {
          const is = isexe.sync(cur, {pathExt: pathExtExe});
          if (is) {
            if (opt.all)
              found.push(cur);
            else
              return cur;
          }
        } catch (ex) {
        }
      }
    }
    if (opt.all && found.length)
      return found;
    if (opt.nothrow)
      return null;
    throw getNotFoundError(cmd);
  };
  module.exports = which;
  which.sync = whichSync;
});

// node_modules/path-key/index.js
var require_path_key = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var pathKey = (options = {}) => {
    const environment = options.env || process.env;
    const platform = options.platform || process.platform;
    if (platform !== "win32") {
      return "PATH";
    }
    return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
  };
  module.exports = pathKey;
  module.exports.default = pathKey;
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path16 = require("path");
  var which = require_which();
  var getPathKey = require_path_key();
  function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
    if (shouldSwitchCwd) {
      try {
        process.chdir(parsed.options.cwd);
      } catch (err) {
      }
    }
    let resolved;
    try {
      resolved = which.sync(parsed.command, {
        path: env[getPathKey({env})],
        pathExt: withoutPathExt ? path16.delimiter : void 0
      });
    } catch (e) {
    } finally {
      if (shouldSwitchCwd) {
        process.chdir(cwd);
      }
    }
    if (resolved) {
      resolved = path16.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    }
    return resolved;
  }
  function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
  }
  module.exports = resolveCommand;
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
  function escapeCommand(arg) {
    arg = arg.replace(metaCharsRegExp, "^$1");
    return arg;
  }
  function escapeArgument(arg, doubleEscapeMetaChars) {
    arg = `${arg}`;
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');
    arg = arg.replace(/(\\*)$/, "$1$1");
    arg = `"${arg}"`;
    arg = arg.replace(metaCharsRegExp, "^$1");
    if (doubleEscapeMetaChars) {
      arg = arg.replace(metaCharsRegExp, "^$1");
    }
    return arg;
  }
  module.exports.command = escapeCommand;
  module.exports.argument = escapeArgument;
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = /^#!(.*)/;
});

// node_modules/shebang-command/index.js
var require_shebang_command = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var shebangRegex = require_shebang_regex();
  module.exports = (string = "") => {
    const match = string.match(shebangRegex);
    if (!match) {
      return null;
    }
    const [path16, argument] = match[0].replace(/#! ?/, "").split(" ");
    const binary = path16.split("/").pop();
    if (binary === "env") {
      return argument;
    }
    return argument ? `${binary} ${argument}` : binary;
  };
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var fs11 = require("fs");
  var shebangCommand = require_shebang_command();
  function readShebang(command) {
    const size = 150;
    const buffer = Buffer.alloc(size);
    let fd;
    try {
      fd = fs11.openSync(command, "r");
      fs11.readSync(fd, buffer, 0, size, 0);
      fs11.closeSync(fd);
    } catch (e) {
    }
    return shebangCommand(buffer.toString());
  }
  module.exports = readShebang;
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path16 = require("path");
  var resolveCommand = require_resolveCommand();
  var escape = require_escape();
  var readShebang = require_readShebang();
  var isWin = process.platform === "win32";
  var isExecutableRegExp = /\.(?:com|exe)$/i;
  var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);
    const shebang = parsed.file && readShebang(parsed.file);
    if (shebang) {
      parsed.args.unshift(parsed.file);
      parsed.command = shebang;
      return resolveCommand(parsed);
    }
    return parsed.file;
  }
  function parseNonShell(parsed) {
    if (!isWin) {
      return parsed;
    }
    const commandFile = detectShebang(parsed);
    const needsShell = !isExecutableRegExp.test(commandFile);
    if (parsed.options.forceShell || needsShell) {
      const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
      parsed.command = path16.normalize(parsed.command);
      parsed.command = escape.command(parsed.command);
      parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
      parsed.command = process.env.comspec || "cmd.exe";
      parsed.options.windowsVerbatimArguments = true;
    }
    return parsed;
  }
  function parse(command, args, options) {
    if (args && !Array.isArray(args)) {
      options = args;
      args = null;
    }
    args = args ? args.slice(0) : [];
    options = Object.assign({}, options);
    const parsed = {
      command,
      args,
      options,
      file: void 0,
      original: {
        command,
        args
      }
    };
    return options.shell ? parsed : parseNonShell(parsed);
  }
  module.exports = parse;
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isWin = process.platform === "win32";
  function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${syscall} ${original.command}`,
      path: original.command,
      spawnargs: original.args
    });
  }
  function hookChildProcess(cp, parsed) {
    if (!isWin) {
      return;
    }
    const originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
      if (name === "exit") {
        const err = verifyENOENT(arg1, parsed, "spawn");
        if (err) {
          return originalEmit.call(cp, "error", err);
        }
      }
      return originalEmit.apply(cp, arguments);
    };
  }
  function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawn");
    }
    return null;
  }
  function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawnSync");
    }
    return null;
  }
  module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError
  };
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var cp = require("child_process");
  var parse = require_parse();
  var enoent = require_enoent();
  function spawn4(command, args, options) {
    const parsed = parse(command, args, options);
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
  }
  function spawnSync(command, args, options) {
    const parsed = parse(command, args, options);
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
  }
  module.exports = spawn4;
  module.exports.spawn = spawn4;
  module.exports.sync = spawnSync;
  module.exports._parse = parse;
  module.exports._enoent = enoent;
});

// node_modules/joycon/lib/index.js
var require_lib = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _fs = _interopRequireDefault(require("fs"));
  var _path = _interopRequireDefault(require("path"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error6) {
      reject(error6);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  var readFile2 = (fp) => new Promise((resolve, reject) => {
    _fs.default.readFile(fp, "utf8", (err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    });
  });
  var readFileSync3 = (fp) => {
    return _fs.default.readFileSync(fp, "utf8");
  };
  var pathExists2 = (fp) => new Promise((resolve) => {
    _fs.default.access(fp, (err) => {
      resolve(!err);
    });
  });
  var pathExistsSync = _fs.default.existsSync;
  var JoyCon2 = class {
    constructor({
      files,
      cwd = process.cwd(),
      stopDir,
      packageKey,
      parseJSON = JSON.parse
    } = {}) {
      this.options = {
        files,
        cwd,
        stopDir,
        packageKey,
        parseJSON
      };
      this.existsCache = new Map();
      this.loaders = new Set();
      this.packageJsonCache = new Map();
    }
    addLoader(loader) {
      this.loaders.add(loader);
      return this;
    }
    removeLoader(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = this.loaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const loader = _step.value;
          if (name && loader.name === name) {
            this.loaders.delete(loader);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return this;
    }
    recusivelyResolve(options) {
      var _this = this;
      return _asyncToGenerator(function* () {
        if (options.cwd === options.stopDir || _path.default.basename(options.cwd) === "node_modules") {
          return null;
        }
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = void 0;
        try {
          for (var _iterator4 = options.files[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            const filename = _step4.value;
            const file = _path.default.resolve(options.cwd, filename);
            const exists = _this.existsCache.has(file) ? _this.existsCache.get(file) : yield pathExists2(file);
            _this.existsCache.set(file, exists);
            if (exists) {
              if (!options.packageKey || _path.default.basename(file) !== "package.json") {
                return file;
              }
              const data = require(file);
              delete require.cache[file];
              const hasPackageKey = Object.prototype.hasOwnProperty.call(data, options.packageKey);
              if (hasPackageKey) {
                _this.packageJsonCache.set(file, data);
                return file;
              }
            }
            continue;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
        return _this.recusivelyResolve(Object.assign({}, options, {
          cwd: _path.default.dirname(options.cwd)
        }));
      })();
    }
    recusivelyResolveSync(options) {
      if (options.cwd === options.stopDir || _path.default.basename(options.cwd) === "node_modules") {
        return null;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = void 0;
      try {
        for (var _iterator2 = options.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const filename = _step2.value;
          const file = _path.default.resolve(options.cwd, filename);
          const exists = this.existsCache.has(file) ? this.existsCache.get(file) : pathExistsSync(file);
          this.existsCache.set(file, exists);
          if (exists) {
            if (!options.packageKey || _path.default.basename(file) !== "package.json") {
              return file;
            }
            const data = require(file);
            delete require.cache[file];
            const hasPackageKey = Object.prototype.hasOwnProperty.call(data, options.packageKey);
            if (hasPackageKey) {
              this.packageJsonCache.set(file, data);
              return file;
            }
          }
          continue;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
      return this.recusivelyResolveSync(Object.assign({}, options, {
        cwd: _path.default.dirname(options.cwd)
      }));
    }
    resolve(...args) {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        const options = _this2.normalizeOptions(args);
        return _this2.recusivelyResolve(options);
      })();
    }
    resolveSync(...args) {
      const options = this.normalizeOptions(args);
      return this.recusivelyResolveSync(options);
    }
    load(...args) {
      var _this3 = this;
      return _asyncToGenerator(function* () {
        const options = _this3.normalizeOptions(args);
        const filepath = yield _this3.recusivelyResolve(options);
        if (filepath) {
          const loader = _this3.findLoader(filepath);
          if (loader) {
            return {
              path: filepath,
              data: yield loader.load(filepath)
            };
          }
          const extname = _path.default.extname(filepath).slice(1);
          if (extname === "js") {
            delete require.cache[filepath];
            return {
              path: filepath,
              data: require(filepath)
            };
          }
          if (extname === "json") {
            if (_this3.packageJsonCache.has(filepath)) {
              return {
                path: filepath,
                data: _this3.packageJsonCache.get(filepath)[options.packageKey]
              };
            }
            const data = _this3.options.parseJSON(yield readFile2(filepath));
            return {
              path: filepath,
              data
            };
          }
          return {
            path: filepath,
            data: yield readFile2(filepath)
          };
        }
        return {};
      })();
    }
    loadSync(...args) {
      const options = this.normalizeOptions(args);
      const filepath = this.recusivelyResolveSync(options);
      if (filepath) {
        const loader = this.findLoader(filepath);
        if (loader) {
          return {
            path: filepath,
            data: loader.loadSync(filepath)
          };
        }
        const extname = _path.default.extname(filepath).slice(1);
        if (extname === "js") {
          delete require.cache[filepath];
          return {
            path: filepath,
            data: require(filepath)
          };
        }
        if (extname === "json") {
          if (this.packageJsonCache.has(filepath)) {
            return {
              path: filepath,
              data: this.packageJsonCache.get(filepath)[options.packageKey]
            };
          }
          const data = this.options.parseJSON(readFileSync3(filepath));
          return {
            path: filepath,
            data
          };
        }
        return {
          path: filepath,
          data: readFileSync3(filepath)
        };
      }
      return {};
    }
    findLoader(filepath) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = void 0;
      try {
        for (var _iterator3 = this.loaders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const loader = _step3.value;
          if (loader.test && loader.test.test(filepath)) {
            return loader;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
      return null;
    }
    clearCache() {
      this.existsCache.clear();
      this.packageJsonCache.clear();
      return this;
    }
    normalizeOptions(args) {
      const options = Object.assign({}, this.options);
      if (Object.prototype.toString.call(args[0]) === "[object Object]") {
        Object.assign(options, args[0]);
      } else {
        if (args[0]) {
          options.files = args[0];
        }
        if (args[1]) {
          options.cwd = args[1];
        }
        if (args[2]) {
          options.stopDir = args[2];
        }
      }
      options.cwd = _path.default.resolve(options.cwd);
      options.stopDir = options.stopDir ? _path.default.resolve(options.stopDir) : _path.default.parse(options.cwd).root;
      if (!options.files || options.files.length === 0) {
        throw new Error("[joycon] files must be an non-empty array!");
      }
      options.__normalized__ = true;
      return options;
    }
  };
  exports.default = JoyCon2;
  module.exports = JoyCon2;
  module.exports.default = JoyCon2;
});

// node_modules/hash-sum/hash-sum.js
var require_hash_sum = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  function pad(hash, len) {
    while (hash.length < len) {
      hash = "0" + hash;
    }
    return hash;
  }
  function fold(hash, text) {
    var i;
    var chr;
    var len;
    if (text.length === 0) {
      return hash;
    }
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash < 0 ? hash * -2 : hash;
  }
  function foldObject(hash, o, seen) {
    return Object.keys(o).sort().reduce(foldKey, hash);
    function foldKey(hash2, key) {
      return foldValue(hash2, o[key], key, seen);
    }
  }
  function foldValue(input, value, key, seen) {
    var hash = fold(fold(fold(input, key), toString(value)), typeof value);
    if (value === null) {
      return fold(hash, "null");
    }
    if (value === void 0) {
      return fold(hash, "undefined");
    }
    if (typeof value === "object" || typeof value === "function") {
      if (seen.indexOf(value) !== -1) {
        return fold(hash, "[Circular]" + key);
      }
      seen.push(value);
      var objHash = foldObject(hash, value, seen);
      if (!("valueOf" in value) || typeof value.valueOf !== "function") {
        return objHash;
      }
      try {
        return fold(objHash, String(value.valueOf()));
      } catch (err) {
        return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
      }
    }
    return fold(hash, value.toString());
  }
  function toString(o) {
    return Object.prototype.toString.call(o);
  }
  function sum2(o) {
    return pad(foldValue(0, o, "", []).toString(16), 8);
  }
  module.exports = sum2;
});

// node_modules/parse-package-name/index.js
var require_parse_package_name = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var RE_SCOPED = /^(@[^/]+\/[^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
  var RE_NORMAL = /^([^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
  module.exports = function(input) {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    const matched = input.charAt(0) === "@" ? input.match(RE_SCOPED) : input.match(RE_NORMAL);
    if (!matched) {
      throw new Error(`[parse-package-name] "${input}" is not a valid string`);
    }
    return {
      name: matched[1],
      path: matched[2] || "",
      version: matched[3] || ""
    };
  };
});

// node_modules/os-homedir/index.js
var require_os_homedir = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var os6 = require("os");
  function homedir() {
    var env = process.env;
    var home = env.HOME;
    var user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
    if (process.platform === "win32") {
      return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
    }
    if (process.platform === "darwin") {
      return home || (user ? "/Users/" + user : null);
    }
    if (process.platform === "linux") {
      return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
    }
    return home || null;
  }
  module.exports = typeof os6.homedir === "function" ? os6.homedir : homedir;
});

// node_modules/user-home/index.js
var require_user_home = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = require_os_homedir()();
});

// node_modules/yarn-global/index.js
var require_yarn_global = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var fs11 = require("fs");
  var path16 = require("path");
  var userHome = require_user_home();
  if (process.platform === "linux" && isRootUser(getUid())) {
    userHome = path16.resolve("/usr/local/share");
  }
  function getDirectory() {
    let configDirectory;
    if (process.platform === "win32" && process.env.LOCALAPPDATA) {
      configDirectory = path16.join(process.env.LOCALAPPDATA, "Yarn", "config");
    } else {
      configDirectory = path16.join(userHome, ".config", "yarn");
    }
    return path16.join(configDirectory, "global", "node_modules");
  }
  function inDirectory(dir) {
    return dir.indexOf(getDirectory()) !== -1;
  }
  function getDependencies() {
    try {
      const dir = getDirectory();
      return Object.keys(require(path16.join(dir, "../", "package.json")).dependencies);
    } catch (_) {
      return [];
    }
  }
  function hasDependency(name) {
    return getDependencies().indexOf(name) !== -1;
  }
  function hasPackage(name) {
    try {
      return fs11.existsSync(path16.join(getDirectory(), name));
    } catch (_) {
      return false;
    }
  }
  function getUid() {
    if (process.platform !== "win32" && process.getuid) {
      return process.getuid();
    }
    return null;
  }
  function isRootUser(uid) {
    return uid === 0;
  }
  module.exports.getDirectory = getDirectory;
  module.exports.inDirectory = inDirectory;
  module.exports.getDependencies = getDependencies;
  module.exports.hasDependency = hasDependency;
  module.exports.hasPackage = hasPackage;
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
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
});

// node_modules/axios/lib/utils.js
var require_utils = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var bind = require_bind();
  var toString = Object.prototype.toString;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
  }
  function isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isFile(val) {
    return toString.call(val) === "[object File]";
  }
  function isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function trim(str) {
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function deepMerge() {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  module.exports = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    deepMerge,
    extend,
    trim
  };
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  module.exports = function buildURL(url, params, paramsSerializer) {
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
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + "=" + encode(v));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  module.exports = InterceptorManager;
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = function transformData(data, headers, fns) {
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
    return data;
  };
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = function enhanceError(error6, config, code, request, response) {
    error6.config = config;
    if (code) {
      error6.code = code;
    }
    error6.request = request;
    error6.response = response;
    error6.isAxiosError = true;
    error6.toJSON = function() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code
      };
    };
    return error6;
  };
});

// node_modules/axios/lib/core/createError.js
var require_createError = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var enhanceError = require_enhanceError();
  module.exports = function createError(message, config, code, request, response) {
    var error6 = new Error(message);
    return enhanceError(error6, config, code, request, response);
  };
});

// node_modules/axios/lib/core/settle.js
var require_settle = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var createError = require_createError();
  module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
  };
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = function isAbsoluteURL(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isAbsoluteURL = require_isAbsoluteURL();
  var combineURLs = require_combineURLs();
  module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin(requestURL) {
      var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path16, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils.isString(path16)) {
          cookie.push("path=" + path16);
        }
        if (utils.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }();
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var settle = require_settle();
  var buildURL = require_buildURL();
  var buildFullPath = require_buildFullPath();
  var parseHeaders = require_parseHeaders();
  var isURLSameOrigin = require_isURLSameOrigin();
  var createError = require_createError();
  module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      if (utils.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password || "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(resolve, reject, response);
        request = null;
      };
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError("Request aborted", config, "ECONNABORTED", request));
        request = null;
      };
      request.onerror = function handleError2() {
        reject(createError("Network Error", config, null, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
        request = null;
      };
      if (utils.isStandardBrowserEnv()) {
        var cookies = require_cookies();
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          if (config.responseType !== "json") {
            throw e;
          }
        }
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          request.abort();
          reject(cancel);
          request = null;
        });
      }
      if (requestData === void 0) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
});

// node_modules/ms/index.js
var require_ms = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + "d";
    }
    if (ms >= h) {
      return Math.round(ms / h) + "h";
    }
    if (ms >= m) {
      return Math.round(ms / m) + "m";
    }
    if (ms >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
  }
  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + " " + name;
    }
    return Math.ceil(ms / n) + " " + name + "s";
  }
});

// node_modules/follow-redirects/node_modules/debug/src/debug.js
var require_debug = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = require_ms();
  exports.instances = [];
  exports.names = [];
  exports.skips = [];
  exports.formatters = {};
  function selectColor(namespace) {
    var hash = 0, i;
    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }
    return exports.colors[Math.abs(hash) % exports.colors.length];
  }
  function createDebug(namespace) {
    var prevTime;
    function debug() {
      if (!debug.enabled)
        return;
      var self = debug;
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      args[0] = exports.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        if (match === "%%")
          return match;
        index++;
        var formatter = exports.formatters[format];
        if (typeof formatter === "function") {
          var val = args[index];
          match = formatter.call(self, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      exports.formatArgs.call(self, args);
      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    if (typeof exports.init === "function") {
      exports.init(debug);
    }
    exports.instances.push(debug);
    return debug;
  }
  function destroy() {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  function enable(namespaces) {
    exports.save(namespaces);
    exports.names = [];
    exports.skips = [];
    var i;
    var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    var len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i])
        continue;
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        exports.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }
  function disable() {
    exports.enable("");
  }
  function enabled(name) {
    if (name[name.length - 1] === "*") {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  function coerce(val) {
    if (val instanceof Error)
      return val.stack || val.message;
    return val;
  }
});

// node_modules/follow-redirects/node_modules/debug/src/browser.js
var require_browser = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  exports = module.exports = require_debug();
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return "[UnexpectedJSONParseError]: " + err.message;
    }
  };
  function formatArgs(args) {
    var useColors2 = this.useColors;
    args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!useColors2)
      return;
    var c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if (match === "%%")
        return;
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log() {
    return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function save(namespaces) {
    try {
      if (namespaces == null) {
        exports.storage.removeItem("debug");
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {
    }
  }
  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  exports.enable(load());
  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {
    }
  }
});

// node_modules/follow-redirects/node_modules/debug/src/node.js
var require_node = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var tty = require("tty");
  var util = require("util");
  exports = module.exports = require_debug();
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    supportsColor = _chunkEOPTLNEQjs.require_supports_color.call(void 0, );
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (err) {
  }
  var supportsColor;
  exports.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
  }).reduce(function(obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
      return k.toUpperCase();
    });
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val))
      val = true;
    else if (/^(no|off|false|disabled)$/i.test(val))
      val = false;
    else if (val === "null")
      val = null;
    else
      val = Number(val);
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
      return str.trim();
    }).join(" ");
  };
  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
  function formatArgs(args) {
    var name = this.namespace;
    var useColors2 = this.useColors;
    if (useColors2) {
      var c = this.color;
      var colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
      var prefix = "  " + colorCode + ";1m" + name + " [0m";
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return "";
    } else {
      return new Date().toISOString() + " ";
    }
  }
  function log() {
    return process.stderr.write(util.format.apply(util, arguments) + "\n");
  }
  function save(namespaces) {
    if (namespaces == null) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  exports.enable(load());
});

// node_modules/follow-redirects/node_modules/debug/src/index.js
var require_src = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  if (typeof process === "undefined" || process.type === "renderer") {
    module.exports = require_browser();
  } else {
    module.exports = require_node();
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var url = require("url");
  var http = require("http");
  var https = require("https");
  var assert = require("assert");
  var Writable = require("stream").Writable;
  var debug = require_src()("follow-redirects");
  var SAFE_METHODS = {GET: true, HEAD: true, OPTIONS: true, TRACE: true};
  var eventHandlers = Object.create(null);
  ["abort", "aborted", "error", "socket", "timeout"].forEach(function(event) {
    eventHandlers[event] = function(arg) {
      this._redirectable.emit(event, arg);
    };
  });
  function RedirectableRequest(options, responseCallback) {
    Writable.call(this);
    options.headers = options.headers || {};
    this._options = options;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    if (options.host) {
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }
    if (responseCallback) {
      this.on("response", responseCallback);
    }
    var self = this;
    this._onNativeResponse = function(response) {
      self._processResponse(response);
    };
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      } else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);
  RedirectableRequest.prototype.write = function(data, encoding, callback) {
    if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
      throw new Error("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({data, encoding});
      this._currentRequest.write(data, encoding, callback);
    } else {
      this.emit("error", new Error("Request body larger than maxBodyLength limit"));
      this.abort();
    }
  };
  RedirectableRequest.prototype.end = function(data, encoding, callback) {
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    } else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    var currentRequest = this._currentRequest;
    this.write(data || "", encoding, function() {
      currentRequest.end(null, null, callback);
    });
  };
  RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };
  RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };
  [
    "abort",
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive",
    "setTimeout"
  ].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
      return this._currentRequest[method](a, b);
    };
  });
  ["aborted", "connection", "socket"].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function() {
        return this._currentRequest[property];
      }
    });
  });
  RedirectableRequest.prototype._performRequest = function() {
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new Error("Unsupported protocol " + protocol));
      return;
    }
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url.format(this._options);
    request._redirectable = this;
    for (var event in eventHandlers) {
      if (event) {
        request.on(event, eventHandlers[event]);
      }
    }
    if (this._isRedirect) {
      var i = 0;
      var buffers = this._requestBodyBuffers;
      (function writeNext() {
        if (i < buffers.length) {
          var buffer = buffers[i++];
          request.write(buffer.data, buffer.encoding, writeNext);
        } else {
          request.end();
        }
      })();
    }
  };
  RedirectableRequest.prototype._processResponse = function(response) {
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: response.statusCode
      });
    }
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false && response.statusCode >= 300 && response.statusCode < 400) {
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new Error("Max redirects exceeded."));
        return;
      }
      var header;
      var headers = this._options.headers;
      if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        for (header in headers) {
          if (/^content-/i.test(header)) {
            delete headers[header];
          }
        }
      }
      if (!this._isRedirect) {
        for (header in headers) {
          if (/^host$/i.test(header)) {
            delete headers[header];
          }
        }
      }
      var redirectUrl = url.resolve(this._currentUrl, location);
      debug("redirecting to", redirectUrl);
      Object.assign(this._options, url.parse(redirectUrl));
      this._isRedirect = true;
      this._performRequest();
      response.destroy();
    } else {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);
      this._requestBodyBuffers = [];
    }
  };
  function wrap(protocols) {
    var exports2 = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024
    };
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
      wrappedProtocol.request = function(options, callback) {
        if (typeof options === "string") {
          options = url.parse(options);
          options.maxRedirects = exports2.maxRedirects;
        } else {
          options = Object.assign({
            protocol,
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, options);
        }
        options.nativeProtocols = nativeProtocols;
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      };
      wrappedProtocol.get = function(options, callback) {
        var request = wrappedProtocol.request(options, callback);
        request.end();
        return request;
      };
    });
    return exports2;
  }
  module.exports = wrap({http, https});
  module.exports.wrap = wrap;
});

// node_modules/axios/package.json
var require_package = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = {
    name: "axios",
    version: "0.19.2",
    description: "Promise based HTTP client for the browser and node.js",
    main: "index.js",
    scripts: {
      test: "grunt test && bundlesize",
      start: "node ./sandbox/server.js",
      build: "NODE_ENV=production grunt build",
      preversion: "npm test",
      version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
      postversion: "git push && git push --tags",
      examples: "node ./examples/server.js",
      coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
      fix: "eslint --fix lib/**/*.js"
    },
    repository: {
      type: "git",
      url: "https://github.com/axios/axios.git"
    },
    keywords: [
      "xhr",
      "http",
      "ajax",
      "promise",
      "node"
    ],
    author: "Matt Zabriskie",
    license: "MIT",
    bugs: {
      url: "https://github.com/axios/axios/issues"
    },
    homepage: "https://github.com/axios/axios",
    devDependencies: {
      bundlesize: "^0.17.0",
      coveralls: "^3.0.0",
      "es6-promise": "^4.2.4",
      grunt: "^1.0.2",
      "grunt-banner": "^0.6.0",
      "grunt-cli": "^1.2.0",
      "grunt-contrib-clean": "^1.1.0",
      "grunt-contrib-watch": "^1.0.0",
      "grunt-eslint": "^20.1.0",
      "grunt-karma": "^2.0.0",
      "grunt-mocha-test": "^0.13.3",
      "grunt-ts": "^6.0.0-beta.19",
      "grunt-webpack": "^1.0.18",
      "istanbul-instrumenter-loader": "^1.0.0",
      "jasmine-core": "^2.4.1",
      karma: "^1.3.0",
      "karma-chrome-launcher": "^2.2.0",
      "karma-coverage": "^1.1.1",
      "karma-firefox-launcher": "^1.1.0",
      "karma-jasmine": "^1.1.1",
      "karma-jasmine-ajax": "^0.1.13",
      "karma-opera-launcher": "^1.0.0",
      "karma-safari-launcher": "^1.0.0",
      "karma-sauce-launcher": "^1.2.0",
      "karma-sinon": "^1.0.5",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-webpack": "^1.7.0",
      "load-grunt-tasks": "^3.5.2",
      minimist: "^1.2.0",
      mocha: "^5.2.0",
      sinon: "^4.5.0",
      typescript: "^2.8.1",
      "url-search-params": "^0.10.0",
      webpack: "^1.13.1",
      "webpack-dev-server": "^1.14.1"
    },
    browser: {
      "./lib/adapters/http.js": "./lib/adapters/xhr.js"
    },
    typings: "./index.d.ts",
    dependencies: {
      "follow-redirects": "1.5.10"
    },
    bundlesize: [
      {
        path: "./dist/axios.min.js",
        threshold: "5kB"
      }
    ]
  };
});

// node_modules/axios/lib/adapters/http.js
var require_http = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var settle = require_settle();
  var buildFullPath = require_buildFullPath();
  var buildURL = require_buildURL();
  var http = require("http");
  var https = require("https");
  var httpFollow = require_follow_redirects().http;
  var httpsFollow = require_follow_redirects().https;
  var url = require("url");
  var zlib = require("zlib");
  var pkg = require_package();
  var createError = require_createError();
  var enhanceError = require_enhanceError();
  var isHttps = /https:?/;
  module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var resolve = function resolve2(value) {
        resolvePromise(value);
      };
      var reject = function reject2(value) {
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;
      if (!headers["User-Agent"] && !headers["user-agent"]) {
        headers["User-Agent"] = "axios/" + pkg.version;
      }
      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) {
        } else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, "utf-8");
        } else {
          return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
        }
        headers["Content-Length"] = data.length;
      }
      var auth = void 0;
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password || "";
        auth = username + ":" + password;
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url.parse(fullPath);
      var protocol = parsed.protocol || "http:";
      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(":");
        var urlUsername = urlAuth[0] || "";
        var urlPassword = urlAuth[1] || "";
        auth = urlUsername + ":" + urlPassword;
      }
      if (auth) {
        delete headers.Authorization;
      }
      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
        method: config.method.toUpperCase(),
        headers,
        agent,
        agents: {http: config.httpAgent, https: config.httpsAgent},
        auth
      };
      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }
      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + "_proxy";
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;
          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(",").map(function trim(s) {
              return s.trim();
            });
            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === "*") {
                return true;
              }
              if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }
              return parsed.hostname === proxyElement;
            });
          }
          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port
            };
            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(":");
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }
      if (proxy) {
        options.hostname = proxy.host;
        options.host = proxy.host;
        options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
        options.port = proxy.port;
        options.path = protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path;
        if (proxy.auth) {
          var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
          options.headers["Proxy-Authorization"] = "Basic " + base64;
        }
      }
      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }
      if (config.maxContentLength && config.maxContentLength > -1) {
        options.maxBodyLength = config.maxContentLength;
      }
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted)
          return;
        var stream = res;
        switch (res.headers["content-encoding"]) {
          case "gzip":
          case "compress":
          case "deflate":
            stream = res.statusCode === 204 ? stream : stream.pipe(zlib.createUnzip());
            delete res.headers["content-encoding"];
            break;
        }
        var lastRequest = res.req || req;
        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config,
          request: lastRequest
        };
        if (config.responseType === "stream") {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on("data", function handleStreamData(chunk) {
            responseBuffer.push(chunk);
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              stream.destroy();
              reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
            }
          });
          stream.on("error", function handleStreamError(err) {
            if (req.aborted)
              return;
            reject(enhanceError(err, config, null, lastRequest));
          });
          stream.on("end", function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== "arraybuffer") {
              responseData = responseData.toString(config.responseEncoding);
            }
            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });
      req.on("error", function handleRequestError(err) {
        if (req.aborted)
          return;
        reject(enhanceError(err, config, null, req));
      });
      if (config.timeout) {
        req.setTimeout(config.timeout, function handleRequestTimeout() {
          req.abort();
          reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", req));
        });
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted)
            return;
          req.abort();
          reject(cancel);
        });
      }
      if (utils.isStream(data)) {
        data.on("error", function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };
});

// node_modules/axios/lib/defaults.js
var require_defaults = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var normalizeHeaderName = require_normalizeHeaderName();
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
      headers["Content-Type"] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
      adapter = require_xhr();
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
      adapter = require_http();
    }
    return adapter;
  }
  var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");
      if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, "application/json;charset=utf-8");
        return JSON.stringify(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
        }
      }
      return data;
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  defaults.headers = {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  };
  utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  module.exports = defaults;
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var transformData = require_transformData();
  var isCancel = require_isCancel();
  var defaults = require_defaults();
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData(config.data, config.headers, config.transformRequest);
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData(response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  module.exports = function mergeConfig(config1, config2) {
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = ["url", "method", "params", "data"];
    var mergeDeepPropertiesKeys = ["headers", "auth", "proxy"];
    var defaultToConfig2Keys = [
      "baseURL",
      "url",
      "transformRequest",
      "transformResponse",
      "paramsSerializer",
      "timeout",
      "withCredentials",
      "adapter",
      "responseType",
      "xsrfCookieName",
      "xsrfHeaderName",
      "onUploadProgress",
      "onDownloadProgress",
      "maxContentLength",
      "validateStatus",
      "maxRedirects",
      "httpAgent",
      "httpsAgent",
      "cancelToken",
      "socketPath"
    ];
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (typeof config2[prop] !== "undefined") {
        config[prop] = config2[prop];
      }
    });
    utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
      if (utils.isObject(config2[prop])) {
        config[prop] = utils.deepMerge(config1[prop], config2[prop]);
      } else if (typeof config2[prop] !== "undefined") {
        config[prop] = config2[prop];
      } else if (utils.isObject(config1[prop])) {
        config[prop] = utils.deepMerge(config1[prop]);
      } else if (typeof config1[prop] !== "undefined") {
        config[prop] = config1[prop];
      }
    });
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (typeof config2[prop] !== "undefined") {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== "undefined") {
        config[prop] = config1[prop];
      }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
    var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
      if (typeof config2[prop] !== "undefined") {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== "undefined") {
        config[prop] = config1[prop];
      }
    });
    return config;
  };
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var buildURL = require_buildURL();
  var InterceptorManager = require_InterceptorManager();
  var dispatchRequest = require_dispatchRequest();
  var mergeConfig = require_mergeConfig();
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  Axios.prototype.request = function request(config) {
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    config = mergeConfig(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    var chain = [dispatchRequest, void 0];
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
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
  };
  utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(utils.merge(config || {}, {
        method,
        url
      }));
    };
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    Axios.prototype[method] = function(url, data, config) {
      return this.request(utils.merge(config || {}, {
        method,
        url,
        data
      }));
    };
  });
  module.exports = Axios;
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  function Cancel(message) {
    this.message = message;
  }
  Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel.prototype.__CANCEL__ = true;
  module.exports = Cancel;
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var Cancel = require_Cancel();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  module.exports = CancelToken;
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
});

// node_modules/axios/lib/axios.js
var require_axios = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var utils = require_utils();
  var bind = require_bind();
  var Axios = require_Axios();
  var mergeConfig = require_mergeConfig();
  var defaults = require_defaults();
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    utils.extend(instance, Axios.prototype, context);
    utils.extend(instance, context);
    return instance;
  }
  var axios3 = createInstance(defaults);
  axios3.Axios = Axios;
  axios3.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios3.defaults, instanceConfig));
  };
  axios3.Cancel = require_Cancel();
  axios3.CancelToken = require_CancelToken();
  axios3.isCancel = require_isCancel();
  axios3.all = function all(promises) {
    return Promise.all(promises);
  };
  axios3.spread = require_spread();
  module.exports = axios3;
  module.exports.default = axios3;
});

// node_modules/axios/index.js
var require_axios2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = require_axios();
});

// node_modules/debug/node_modules/ms/index.js
var require_ms2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// node_modules/debug/src/common.js
var require_common = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms2();
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.instances = [];
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self = debug;
        const curr = Number(new Date());
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return match;
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend;
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      createDebug.instances.push(debug);
      return debug;
    }
    function destroy() {
      const index = createDebug.instances.indexOf(this);
      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }
      return false;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < createDebug.instances.length; i++) {
        const instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module.exports = setup;
});

// node_modules/debug/src/browser.js
var require_browser2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log(...args) {
    return typeof console === "object" && console.log && console.log(...args);
  }
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error6) {
    }
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error6) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error6) {
    }
  }
  module.exports = require_common()(exports);
  var {formatters} = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error6) {
      return "[UnexpectedJSONParseError]: " + error6.message;
    }
  };
});

// node_modules/debug/src/node.js
var require_node2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var tty = require("tty");
  var util = require("util");
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = _chunkEOPTLNEQjs.require_supports_color.call(void 0, );
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error6) {
  }
  exports.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  function formatArgs(args) {
    const {namespace: name, useColors: useColors2} = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} [0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  }
  function log(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  }
  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  module.exports = require_common()(exports);
  var {formatters} = module.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, " ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// node_modules/debug/src/index.js
var require_src2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
    module.exports = require_browser2();
  } else {
    module.exports = require_node2();
  }
});

// node_modules/end-of-stream/index.js
var require_end_of_stream = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var once = _chunkN3M3HMMCjs.require_once.call(void 0, );
  var noop = function() {
  };
  var isRequest = function(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  };
  var isChildProcess = function(stream) {
    return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
  };
  var eos = function(stream, opts, callback) {
    if (typeof opts === "function")
      return eos(stream, null, opts);
    if (!opts)
      opts = {};
    callback = once(callback || noop);
    var ws = stream._writableState;
    var rs = stream._readableState;
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function() {
      if (!stream.writable)
        onfinish();
    };
    var onfinish = function() {
      writable = false;
      if (!readable)
        callback.call(stream);
    };
    var onend = function() {
      readable = false;
      if (!writable)
        callback.call(stream);
    };
    var onexit = function(exitCode) {
      callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
    };
    var onerror = function(err) {
      callback.call(stream, err);
    };
    var onclose = function() {
      if (readable && !(rs && rs.ended))
        return callback.call(stream, new Error("premature close"));
      if (writable && !(ws && ws.ended))
        return callback.call(stream, new Error("premature close"));
    };
    var onrequest = function() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !ws) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    if (isChildProcess(stream))
      stream.on("exit", onexit);
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("exit", onexit);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  };
  module.exports = eos;
});

// node_modules/pump/index.js
var require_pump = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var once = _chunkN3M3HMMCjs.require_once.call(void 0, );
  var eos = require_end_of_stream();
  var fs11 = require("fs");
  var noop = function() {
  };
  var ancient = /^v?\.0/.test(process.version);
  var isFn = function(fn) {
    return typeof fn === "function";
  };
  var isFS = function(stream) {
    if (!ancient)
      return false;
    if (!fs11)
      return false;
    return (stream instanceof (fs11.ReadStream || noop) || stream instanceof (fs11.WriteStream || noop)) && isFn(stream.close);
  };
  var isRequest = function(stream) {
    return stream.setHeader && isFn(stream.abort);
  };
  var destroyer = function(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    eos(stream, {readable: reading, writable: writing}, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isFS(stream))
        return stream.close(noop);
      if (isRequest(stream))
        return stream.abort();
      if (isFn(stream.destroy))
        return stream.destroy();
      callback(err || new Error("stream was destroyed"));
    };
  };
  var call = function(fn) {
    fn();
  };
  var pipe = function(from, to) {
    return from.pipe(to);
  };
  var pump = function() {
    var streams = Array.prototype.slice.call(arguments);
    var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2)
      throw new Error("pump requires two streams per minimum");
    var error6;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream, reading, writing, function(err) {
        if (!error6)
          error6 = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error6);
      });
    });
    return streams.reduce(pipe);
  };
  module.exports = pump;
});

// node_modules/get-stream/buffer-stream.js
var require_buffer_stream = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var {PassThrough: PassThroughStream} = require("stream");
  module.exports = (options) => {
    options = {...options};
    const {array} = options;
    let {encoding} = options;
    const isBuffer = encoding === "buffer";
    let objectMode = false;
    if (array) {
      objectMode = !(encoding || isBuffer);
    } else {
      encoding = encoding || "utf8";
    }
    if (isBuffer) {
      encoding = null;
    }
    const stream = new PassThroughStream({objectMode});
    if (encoding) {
      stream.setEncoding(encoding);
    }
    let length = 0;
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
      if (objectMode) {
        length = chunks.length;
      } else {
        length += chunk.length;
      }
    });
    stream.getBufferedValue = () => {
      if (array) {
        return chunks;
      }
      return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
    };
    stream.getBufferedLength = () => length;
    return stream;
  };
});

// node_modules/get-stream/index.js
var require_get_stream = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var pump = require_pump();
  var bufferStream = require_buffer_stream();
  var MaxBufferError = class extends Error {
    constructor() {
      super("maxBuffer exceeded");
      this.name = "MaxBufferError";
    }
  };
  async function getStream(inputStream, options) {
    if (!inputStream) {
      return Promise.reject(new Error("Expected a stream"));
    }
    options = {
      maxBuffer: Infinity,
      ...options
    };
    const {maxBuffer} = options;
    let stream;
    await new Promise((resolve, reject) => {
      const rejectPromise = (error6) => {
        if (error6) {
          error6.bufferedData = stream.getBufferedValue();
        }
        reject(error6);
      };
      stream = pump(inputStream, bufferStream(options), (error6) => {
        if (error6) {
          rejectPromise(error6);
          return;
        }
        resolve();
      });
      stream.on("data", () => {
        if (stream.getBufferedLength() > maxBuffer) {
          rejectPromise(new MaxBufferError());
        }
      });
    });
    return stream.getBufferedValue();
  }
  module.exports = getStream;
  module.exports.default = getStream;
  module.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: "buffer"});
  module.exports.array = (stream, options) => getStream(stream, {...options, array: true});
  module.exports.MaxBufferError = MaxBufferError;
});

// node_modules/pend/index.js
var require_pend = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = Pend;
  function Pend() {
    this.pending = 0;
    this.max = Infinity;
    this.listeners = [];
    this.waiting = [];
    this.error = null;
  }
  Pend.prototype.go = function(fn) {
    if (this.pending < this.max) {
      pendGo(this, fn);
    } else {
      this.waiting.push(fn);
    }
  };
  Pend.prototype.wait = function(cb) {
    if (this.pending === 0) {
      cb(this.error);
    } else {
      this.listeners.push(cb);
    }
  };
  Pend.prototype.hold = function() {
    return pendHold(this);
  };
  function pendHold(self) {
    self.pending += 1;
    var called = false;
    return onCb;
    function onCb(err) {
      if (called)
        throw new Error("callback called twice");
      called = true;
      self.error = self.error || err;
      self.pending -= 1;
      if (self.waiting.length > 0 && self.pending < self.max) {
        pendGo(self, self.waiting.shift());
      } else if (self.pending === 0) {
        var listeners = self.listeners;
        self.listeners = [];
        listeners.forEach(cbListener);
      }
    }
    function cbListener(listener) {
      listener(self.error);
    }
  }
  function pendGo(self, fn) {
    fn(pendHold(self));
  }
});

// node_modules/fd-slicer/index.js
var require_fd_slicer = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  var fs11 = require("fs");
  var util = require("util");
  var stream = require("stream");
  var Readable = stream.Readable;
  var Writable = stream.Writable;
  var PassThrough = stream.PassThrough;
  var Pend = require_pend();
  var EventEmitter = require("events").EventEmitter;
  exports.createFromBuffer = createFromBuffer;
  exports.createFromFd = createFromFd;
  exports.BufferSlicer = BufferSlicer;
  exports.FdSlicer = FdSlicer;
  util.inherits(FdSlicer, EventEmitter);
  function FdSlicer(fd, options) {
    options = options || {};
    EventEmitter.call(this);
    this.fd = fd;
    this.pend = new Pend();
    this.pend.max = 1;
    this.refCount = 0;
    this.autoClose = !!options.autoClose;
  }
  FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
    var self = this;
    self.pend.go(function(cb) {
      fs11.read(self.fd, buffer, offset, length, position, function(err, bytesRead, buffer2) {
        cb();
        callback(err, bytesRead, buffer2);
      });
    });
  };
  FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
    var self = this;
    self.pend.go(function(cb) {
      fs11.write(self.fd, buffer, offset, length, position, function(err, written, buffer2) {
        cb();
        callback(err, written, buffer2);
      });
    });
  };
  FdSlicer.prototype.createReadStream = function(options) {
    return new ReadStream(this, options);
  };
  FdSlicer.prototype.createWriteStream = function(options) {
    return new WriteStream(this, options);
  };
  FdSlicer.prototype.ref = function() {
    this.refCount += 1;
  };
  FdSlicer.prototype.unref = function() {
    var self = this;
    self.refCount -= 1;
    if (self.refCount > 0)
      return;
    if (self.refCount < 0)
      throw new Error("invalid unref");
    if (self.autoClose) {
      fs11.close(self.fd, onCloseDone);
    }
    function onCloseDone(err) {
      if (err) {
        self.emit("error", err);
      } else {
        self.emit("close");
      }
    }
  };
  util.inherits(ReadStream, Readable);
  function ReadStream(context, options) {
    options = options || {};
    Readable.call(this, options);
    this.context = context;
    this.context.ref();
    this.start = options.start || 0;
    this.endOffset = options.end;
    this.pos = this.start;
    this.destroyed = false;
  }
  ReadStream.prototype._read = function(n) {
    var self = this;
    if (self.destroyed)
      return;
    var toRead = Math.min(self._readableState.highWaterMark, n);
    if (self.endOffset != null) {
      toRead = Math.min(toRead, self.endOffset - self.pos);
    }
    if (toRead <= 0) {
      self.destroyed = true;
      self.push(null);
      self.context.unref();
      return;
    }
    self.context.pend.go(function(cb) {
      if (self.destroyed)
        return cb();
      var buffer = new Buffer(toRead);
      fs11.read(self.context.fd, buffer, 0, toRead, self.pos, function(err, bytesRead) {
        if (err) {
          self.destroy(err);
        } else if (bytesRead === 0) {
          self.destroyed = true;
          self.push(null);
          self.context.unref();
        } else {
          self.pos += bytesRead;
          self.push(buffer.slice(0, bytesRead));
        }
        cb();
      });
    });
  };
  ReadStream.prototype.destroy = function(err) {
    if (this.destroyed)
      return;
    err = err || new Error("stream destroyed");
    this.destroyed = true;
    this.emit("error", err);
    this.context.unref();
  };
  util.inherits(WriteStream, Writable);
  function WriteStream(context, options) {
    options = options || {};
    Writable.call(this, options);
    this.context = context;
    this.context.ref();
    this.start = options.start || 0;
    this.endOffset = options.end == null ? Infinity : +options.end;
    this.bytesWritten = 0;
    this.pos = this.start;
    this.destroyed = false;
    this.on("finish", this.destroy.bind(this));
  }
  WriteStream.prototype._write = function(buffer, encoding, callback) {
    var self = this;
    if (self.destroyed)
      return;
    if (self.pos + buffer.length > self.endOffset) {
      var err = new Error("maximum file length exceeded");
      err.code = "ETOOBIG";
      self.destroy();
      callback(err);
      return;
    }
    self.context.pend.go(function(cb) {
      if (self.destroyed)
        return cb();
      fs11.write(self.context.fd, buffer, 0, buffer.length, self.pos, function(err2, bytes) {
        if (err2) {
          self.destroy();
          cb();
          callback(err2);
        } else {
          self.bytesWritten += bytes;
          self.pos += bytes;
          self.emit("progress");
          cb();
          callback();
        }
      });
    });
  };
  WriteStream.prototype.destroy = function() {
    if (this.destroyed)
      return;
    this.destroyed = true;
    this.context.unref();
  };
  util.inherits(BufferSlicer, EventEmitter);
  function BufferSlicer(buffer, options) {
    EventEmitter.call(this);
    options = options || {};
    this.refCount = 0;
    this.buffer = buffer;
    this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
  }
  BufferSlicer.prototype.read = function(buffer, offset, length, position, callback) {
    var end = position + length;
    var delta = end - this.buffer.length;
    var written = delta > 0 ? delta : length;
    this.buffer.copy(buffer, offset, position, end);
    setImmediate(function() {
      callback(null, written);
    });
  };
  BufferSlicer.prototype.write = function(buffer, offset, length, position, callback) {
    buffer.copy(this.buffer, position, offset, offset + length);
    setImmediate(function() {
      callback(null, length, buffer);
    });
  };
  BufferSlicer.prototype.createReadStream = function(options) {
    options = options || {};
    var readStream = new PassThrough(options);
    readStream.destroyed = false;
    readStream.start = options.start || 0;
    readStream.endOffset = options.end;
    readStream.pos = readStream.endOffset || this.buffer.length;
    var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
    var offset = 0;
    while (true) {
      var nextOffset = offset + this.maxChunkSize;
      if (nextOffset >= entireSlice.length) {
        if (offset < entireSlice.length) {
          readStream.write(entireSlice.slice(offset, entireSlice.length));
        }
        break;
      }
      readStream.write(entireSlice.slice(offset, nextOffset));
      offset = nextOffset;
    }
    readStream.end();
    readStream.destroy = function() {
      readStream.destroyed = true;
    };
    return readStream;
  };
  BufferSlicer.prototype.createWriteStream = function(options) {
    var bufferSlicer = this;
    options = options || {};
    var writeStream = new Writable(options);
    writeStream.start = options.start || 0;
    writeStream.endOffset = options.end == null ? this.buffer.length : +options.end;
    writeStream.bytesWritten = 0;
    writeStream.pos = writeStream.start;
    writeStream.destroyed = false;
    writeStream._write = function(buffer, encoding, callback) {
      if (writeStream.destroyed)
        return;
      var end = writeStream.pos + buffer.length;
      if (end > writeStream.endOffset) {
        var err = new Error("maximum file length exceeded");
        err.code = "ETOOBIG";
        writeStream.destroyed = true;
        callback(err);
        return;
      }
      buffer.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer.length);
      writeStream.bytesWritten += buffer.length;
      writeStream.pos = end;
      writeStream.emit("progress");
      callback();
    };
    writeStream.destroy = function() {
      writeStream.destroyed = true;
    };
    return writeStream;
  };
  BufferSlicer.prototype.ref = function() {
    this.refCount += 1;
  };
  BufferSlicer.prototype.unref = function() {
    this.refCount -= 1;
    if (this.refCount < 0) {
      throw new Error("invalid unref");
    }
  };
  function createFromBuffer(buffer, options) {
    return new BufferSlicer(buffer, options);
  }
  function createFromFd(fd, options) {
    return new FdSlicer(fd, options);
  }
});

// node_modules/buffer-crc32/index.js
var require_buffer_crc32 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var Buffer2 = require("buffer").Buffer;
  var CRC_TABLE = [
    0,
    1996959894,
    3993919788,
    2567524794,
    124634137,
    1886057615,
    3915621685,
    2657392035,
    249268274,
    2044508324,
    3772115230,
    2547177864,
    162941995,
    2125561021,
    3887607047,
    2428444049,
    498536548,
    1789927666,
    4089016648,
    2227061214,
    450548861,
    1843258603,
    4107580753,
    2211677639,
    325883990,
    1684777152,
    4251122042,
    2321926636,
    335633487,
    1661365465,
    4195302755,
    2366115317,
    997073096,
    1281953886,
    3579855332,
    2724688242,
    1006888145,
    1258607687,
    3524101629,
    2768942443,
    901097722,
    1119000684,
    3686517206,
    2898065728,
    853044451,
    1172266101,
    3705015759,
    2882616665,
    651767980,
    1373503546,
    3369554304,
    3218104598,
    565507253,
    1454621731,
    3485111705,
    3099436303,
    671266974,
    1594198024,
    3322730930,
    2970347812,
    795835527,
    1483230225,
    3244367275,
    3060149565,
    1994146192,
    31158534,
    2563907772,
    4023717930,
    1907459465,
    112637215,
    2680153253,
    3904427059,
    2013776290,
    251722036,
    2517215374,
    3775830040,
    2137656763,
    141376813,
    2439277719,
    3865271297,
    1802195444,
    476864866,
    2238001368,
    4066508878,
    1812370925,
    453092731,
    2181625025,
    4111451223,
    1706088902,
    314042704,
    2344532202,
    4240017532,
    1658658271,
    366619977,
    2362670323,
    4224994405,
    1303535960,
    984961486,
    2747007092,
    3569037538,
    1256170817,
    1037604311,
    2765210733,
    3554079995,
    1131014506,
    879679996,
    2909243462,
    3663771856,
    1141124467,
    855842277,
    2852801631,
    3708648649,
    1342533948,
    654459306,
    3188396048,
    3373015174,
    1466479909,
    544179635,
    3110523913,
    3462522015,
    1591671054,
    702138776,
    2966460450,
    3352799412,
    1504918807,
    783551873,
    3082640443,
    3233442989,
    3988292384,
    2596254646,
    62317068,
    1957810842,
    3939845945,
    2647816111,
    81470997,
    1943803523,
    3814918930,
    2489596804,
    225274430,
    2053790376,
    3826175755,
    2466906013,
    167816743,
    2097651377,
    4027552580,
    2265490386,
    503444072,
    1762050814,
    4150417245,
    2154129355,
    426522225,
    1852507879,
    4275313526,
    2312317920,
    282753626,
    1742555852,
    4189708143,
    2394877945,
    397917763,
    1622183637,
    3604390888,
    2714866558,
    953729732,
    1340076626,
    3518719985,
    2797360999,
    1068828381,
    1219638859,
    3624741850,
    2936675148,
    906185462,
    1090812512,
    3747672003,
    2825379669,
    829329135,
    1181335161,
    3412177804,
    3160834842,
    628085408,
    1382605366,
    3423369109,
    3138078467,
    570562233,
    1426400815,
    3317316542,
    2998733608,
    733239954,
    1555261956,
    3268935591,
    3050360625,
    752459403,
    1541320221,
    2607071920,
    3965973030,
    1969922972,
    40735498,
    2617837225,
    3943577151,
    1913087877,
    83908371,
    2512341634,
    3803740692,
    2075208622,
    213261112,
    2463272603,
    3855990285,
    2094854071,
    198958881,
    2262029012,
    4057260610,
    1759359992,
    534414190,
    2176718541,
    4139329115,
    1873836001,
    414664567,
    2282248934,
    4279200368,
    1711684554,
    285281116,
    2405801727,
    4167216745,
    1634467795,
    376229701,
    2685067896,
    3608007406,
    1308918612,
    956543938,
    2808555105,
    3495958263,
    1231636301,
    1047427035,
    2932959818,
    3654703836,
    1088359270,
    936918e3,
    2847714899,
    3736837829,
    1202900863,
    817233897,
    3183342108,
    3401237130,
    1404277552,
    615818150,
    3134207493,
    3453421203,
    1423857449,
    601450431,
    3009837614,
    3294710456,
    1567103746,
    711928724,
    3020668471,
    3272380065,
    1510334235,
    755167117
  ];
  if (typeof Int32Array !== "undefined") {
    CRC_TABLE = new Int32Array(CRC_TABLE);
  }
  function ensureBuffer(input) {
    if (Buffer2.isBuffer(input)) {
      return input;
    }
    var hasNewBufferAPI = typeof Buffer2.alloc === "function" && typeof Buffer2.from === "function";
    if (typeof input === "number") {
      return hasNewBufferAPI ? Buffer2.alloc(input) : new Buffer2(input);
    } else if (typeof input === "string") {
      return hasNewBufferAPI ? Buffer2.from(input) : new Buffer2(input);
    } else {
      throw new Error("input must be buffer, number, or string, received " + typeof input);
    }
  }
  function bufferizeInt(num) {
    var tmp = ensureBuffer(4);
    tmp.writeInt32BE(num, 0);
    return tmp;
  }
  function _crc32(buf, previous) {
    buf = ensureBuffer(buf);
    if (Buffer2.isBuffer(previous)) {
      previous = previous.readUInt32BE(0);
    }
    var crc = ~~previous ^ -1;
    for (var n = 0; n < buf.length; n++) {
      crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
    }
    return crc ^ -1;
  }
  function crc32() {
    return bufferizeInt(_crc32.apply(null, arguments));
  }
  crc32.signed = function() {
    return _crc32.apply(null, arguments);
  };
  crc32.unsigned = function() {
    return _crc32.apply(null, arguments) >>> 0;
  };
  module.exports = crc32;
});

// node_modules/yauzl/index.js
var require_yauzl = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  var fs11 = require("fs");
  var zlib = require("zlib");
  var fd_slicer = require_fd_slicer();
  var crc32 = require_buffer_crc32();
  var util = require("util");
  var EventEmitter = require("events").EventEmitter;
  var Transform = require("stream").Transform;
  var PassThrough = require("stream").PassThrough;
  var Writable = require("stream").Writable;
  exports.open = open;
  exports.fromFd = fromFd;
  exports.fromBuffer = fromBuffer;
  exports.fromRandomAccessReader = fromRandomAccessReader;
  exports.dosDateTimeToDate = dosDateTimeToDate;
  exports.validateFileName = validateFileName;
  exports.ZipFile = ZipFile;
  exports.Entry = Entry;
  exports.RandomAccessReader = RandomAccessReader;
  function open(path16, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    if (options == null)
      options = {};
    if (options.autoClose == null)
      options.autoClose = true;
    if (options.lazyEntries == null)
      options.lazyEntries = false;
    if (options.decodeStrings == null)
      options.decodeStrings = true;
    if (options.validateEntrySizes == null)
      options.validateEntrySizes = true;
    if (options.strictFileNames == null)
      options.strictFileNames = false;
    if (callback == null)
      callback = defaultCallback;
    fs11.open(path16, "r", function(err, fd) {
      if (err)
        return callback(err);
      fromFd(fd, options, function(err2, zipfile) {
        if (err2)
          fs11.close(fd, defaultCallback);
        callback(err2, zipfile);
      });
    });
  }
  function fromFd(fd, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    if (options == null)
      options = {};
    if (options.autoClose == null)
      options.autoClose = false;
    if (options.lazyEntries == null)
      options.lazyEntries = false;
    if (options.decodeStrings == null)
      options.decodeStrings = true;
    if (options.validateEntrySizes == null)
      options.validateEntrySizes = true;
    if (options.strictFileNames == null)
      options.strictFileNames = false;
    if (callback == null)
      callback = defaultCallback;
    fs11.fstat(fd, function(err, stats) {
      if (err)
        return callback(err);
      var reader = fd_slicer.createFromFd(fd, {autoClose: true});
      fromRandomAccessReader(reader, stats.size, options, callback);
    });
  }
  function fromBuffer(buffer, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    if (options == null)
      options = {};
    options.autoClose = false;
    if (options.lazyEntries == null)
      options.lazyEntries = false;
    if (options.decodeStrings == null)
      options.decodeStrings = true;
    if (options.validateEntrySizes == null)
      options.validateEntrySizes = true;
    if (options.strictFileNames == null)
      options.strictFileNames = false;
    var reader = fd_slicer.createFromBuffer(buffer, {maxChunkSize: 65536});
    fromRandomAccessReader(reader, buffer.length, options, callback);
  }
  function fromRandomAccessReader(reader, totalSize, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    if (options == null)
      options = {};
    if (options.autoClose == null)
      options.autoClose = true;
    if (options.lazyEntries == null)
      options.lazyEntries = false;
    if (options.decodeStrings == null)
      options.decodeStrings = true;
    var decodeStrings = !!options.decodeStrings;
    if (options.validateEntrySizes == null)
      options.validateEntrySizes = true;
    if (options.strictFileNames == null)
      options.strictFileNames = false;
    if (callback == null)
      callback = defaultCallback;
    if (typeof totalSize !== "number")
      throw new Error("expected totalSize parameter to be a number");
    if (totalSize > Number.MAX_SAFE_INTEGER) {
      throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
    }
    reader.ref();
    var eocdrWithoutCommentSize = 22;
    var maxCommentSize = 65535;
    var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
    var buffer = newBuffer(bufferSize);
    var bufferReadStart = totalSize - buffer.length;
    readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
      if (err)
        return callback(err);
      for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
        if (buffer.readUInt32LE(i) !== 101010256)
          continue;
        var eocdrBuffer = buffer.slice(i);
        var diskNumber = eocdrBuffer.readUInt16LE(4);
        if (diskNumber !== 0) {
          return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
        }
        var entryCount = eocdrBuffer.readUInt16LE(10);
        var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
        var commentLength = eocdrBuffer.readUInt16LE(20);
        var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
        if (commentLength !== expectedCommentLength) {
          return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
        }
        var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
        if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) {
          return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
        }
        var zip64EocdlBuffer = newBuffer(20);
        var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
        readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err2) {
          if (err2)
            return callback(err2);
          if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) {
            return callback(new Error("invalid zip64 end of central directory locator signature"));
          }
          var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
          var zip64EocdrBuffer = newBuffer(56);
          readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err3) {
            if (err3)
              return callback(err3);
            if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) {
              return callback(new Error("invalid zip64 end of central directory record signature"));
            }
            entryCount = readUInt64LE(zip64EocdrBuffer, 32);
            centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
            return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
          });
        });
        return;
      }
      callback(new Error("end of central directory record signature not found"));
    });
  }
  util.inherits(ZipFile, EventEmitter);
  function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
    var self = this;
    EventEmitter.call(self);
    self.reader = reader;
    self.reader.on("error", function(err) {
      emitError(self, err);
    });
    self.reader.once("close", function() {
      self.emit("close");
    });
    self.readEntryCursor = centralDirectoryOffset;
    self.fileSize = fileSize;
    self.entryCount = entryCount;
    self.comment = comment;
    self.entriesRead = 0;
    self.autoClose = !!autoClose;
    self.lazyEntries = !!lazyEntries;
    self.decodeStrings = !!decodeStrings;
    self.validateEntrySizes = !!validateEntrySizes;
    self.strictFileNames = !!strictFileNames;
    self.isOpen = true;
    self.emittedError = false;
    if (!self.lazyEntries)
      self._readEntry();
  }
  ZipFile.prototype.close = function() {
    if (!this.isOpen)
      return;
    this.isOpen = false;
    this.reader.unref();
  };
  function emitErrorAndAutoClose(self, err) {
    if (self.autoClose)
      self.close();
    emitError(self, err);
  }
  function emitError(self, err) {
    if (self.emittedError)
      return;
    self.emittedError = true;
    self.emit("error", err);
  }
  ZipFile.prototype.readEntry = function() {
    if (!this.lazyEntries)
      throw new Error("readEntry() called without lazyEntries:true");
    this._readEntry();
  };
  ZipFile.prototype._readEntry = function() {
    var self = this;
    if (self.entryCount === self.entriesRead) {
      setImmediate(function() {
        if (self.autoClose)
          self.close();
        if (self.emittedError)
          return;
        self.emit("end");
      });
      return;
    }
    if (self.emittedError)
      return;
    var buffer = newBuffer(46);
    readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err) {
      if (err)
        return emitErrorAndAutoClose(self, err);
      if (self.emittedError)
        return;
      var entry = new Entry();
      var signature = buffer.readUInt32LE(0);
      if (signature !== 33639248)
        return emitErrorAndAutoClose(self, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
      entry.versionMadeBy = buffer.readUInt16LE(4);
      entry.versionNeededToExtract = buffer.readUInt16LE(6);
      entry.generalPurposeBitFlag = buffer.readUInt16LE(8);
      entry.compressionMethod = buffer.readUInt16LE(10);
      entry.lastModFileTime = buffer.readUInt16LE(12);
      entry.lastModFileDate = buffer.readUInt16LE(14);
      entry.crc32 = buffer.readUInt32LE(16);
      entry.compressedSize = buffer.readUInt32LE(20);
      entry.uncompressedSize = buffer.readUInt32LE(24);
      entry.fileNameLength = buffer.readUInt16LE(28);
      entry.extraFieldLength = buffer.readUInt16LE(30);
      entry.fileCommentLength = buffer.readUInt16LE(32);
      entry.internalFileAttributes = buffer.readUInt16LE(36);
      entry.externalFileAttributes = buffer.readUInt32LE(38);
      entry.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42);
      if (entry.generalPurposeBitFlag & 64)
        return emitErrorAndAutoClose(self, new Error("strong encryption is not supported"));
      self.readEntryCursor += 46;
      buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
      readAndAssertNoEof(self.reader, buffer, 0, buffer.length, self.readEntryCursor, function(err2) {
        if (err2)
          return emitErrorAndAutoClose(self, err2);
        if (self.emittedError)
          return;
        var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
        entry.fileName = self.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8) : buffer.slice(0, entry.fileNameLength);
        var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
        var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
        entry.extraFields = [];
        var i = 0;
        while (i < extraFieldBuffer.length - 3) {
          var headerId = extraFieldBuffer.readUInt16LE(i + 0);
          var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
          var dataStart = i + 4;
          var dataEnd = dataStart + dataSize;
          if (dataEnd > extraFieldBuffer.length)
            return emitErrorAndAutoClose(self, new Error("extra field length exceeds extra field buffer size"));
          var dataBuffer = newBuffer(dataSize);
          extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
          entry.extraFields.push({
            id: headerId,
            data: dataBuffer
          });
          i = dataEnd;
        }
        entry.fileComment = self.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
        entry.comment = entry.fileComment;
        self.readEntryCursor += buffer.length;
        self.entriesRead += 1;
        if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
          var zip64EiefBuffer = null;
          for (var i = 0; i < entry.extraFields.length; i++) {
            var extraField = entry.extraFields[i];
            if (extraField.id === 1) {
              zip64EiefBuffer = extraField.data;
              break;
            }
          }
          if (zip64EiefBuffer == null) {
            return emitErrorAndAutoClose(self, new Error("expected zip64 extended information extra field"));
          }
          var index = 0;
          if (entry.uncompressedSize === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include uncompressed size"));
            }
            entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
          if (entry.compressedSize === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include compressed size"));
            }
            entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
          if (entry.relativeOffsetOfLocalHeader === 4294967295) {
            if (index + 8 > zip64EiefBuffer.length) {
              return emitErrorAndAutoClose(self, new Error("zip64 extended information extra field does not include relative header offset"));
            }
            entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
            index += 8;
          }
        }
        if (self.decodeStrings) {
          for (var i = 0; i < entry.extraFields.length; i++) {
            var extraField = entry.extraFields[i];
            if (extraField.id === 28789) {
              if (extraField.data.length < 6) {
                continue;
              }
              if (extraField.data.readUInt8(0) !== 1) {
                continue;
              }
              var oldNameCrc32 = extraField.data.readUInt32LE(1);
              if (crc32.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
                continue;
              }
              entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
              break;
            }
          }
        }
        if (self.validateEntrySizes && entry.compressionMethod === 0) {
          var expectedCompressedSize = entry.uncompressedSize;
          if (entry.isEncrypted()) {
            expectedCompressedSize += 12;
          }
          if (entry.compressedSize !== expectedCompressedSize) {
            var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
            return emitErrorAndAutoClose(self, new Error(msg));
          }
        }
        if (self.decodeStrings) {
          if (!self.strictFileNames) {
            entry.fileName = entry.fileName.replace(/\\/g, "/");
          }
          var errorMessage = validateFileName(entry.fileName, self.validateFileNameOptions);
          if (errorMessage != null)
            return emitErrorAndAutoClose(self, new Error(errorMessage));
        }
        self.emit("entry", entry);
        if (!self.lazyEntries)
          self._readEntry();
      });
    });
  };
  ZipFile.prototype.openReadStream = function(entry, options, callback) {
    var self = this;
    var relativeStart = 0;
    var relativeEnd = entry.compressedSize;
    if (callback == null) {
      callback = options;
      options = {};
    } else {
      if (options.decrypt != null) {
        if (!entry.isEncrypted()) {
          throw new Error("options.decrypt can only be specified for encrypted entries");
        }
        if (options.decrypt !== false)
          throw new Error("invalid options.decrypt value: " + options.decrypt);
        if (entry.isCompressed()) {
          if (options.decompress !== false)
            throw new Error("entry is encrypted and compressed, and options.decompress !== false");
        }
      }
      if (options.decompress != null) {
        if (!entry.isCompressed()) {
          throw new Error("options.decompress can only be specified for compressed entries");
        }
        if (!(options.decompress === false || options.decompress === true)) {
          throw new Error("invalid options.decompress value: " + options.decompress);
        }
      }
      if (options.start != null || options.end != null) {
        if (entry.isCompressed() && options.decompress !== false) {
          throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
        }
        if (entry.isEncrypted() && options.decrypt !== false) {
          throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
        }
      }
      if (options.start != null) {
        relativeStart = options.start;
        if (relativeStart < 0)
          throw new Error("options.start < 0");
        if (relativeStart > entry.compressedSize)
          throw new Error("options.start > entry.compressedSize");
      }
      if (options.end != null) {
        relativeEnd = options.end;
        if (relativeEnd < 0)
          throw new Error("options.end < 0");
        if (relativeEnd > entry.compressedSize)
          throw new Error("options.end > entry.compressedSize");
        if (relativeEnd < relativeStart)
          throw new Error("options.end < options.start");
      }
    }
    if (!self.isOpen)
      return callback(new Error("closed"));
    if (entry.isEncrypted()) {
      if (options.decrypt !== false)
        return callback(new Error("entry is encrypted, and options.decrypt !== false"));
    }
    self.reader.ref();
    var buffer = newBuffer(30);
    readAndAssertNoEof(self.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
      try {
        if (err)
          return callback(err);
        var signature = buffer.readUInt32LE(0);
        if (signature !== 67324752) {
          return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
        }
        var fileNameLength = buffer.readUInt16LE(26);
        var extraFieldLength = buffer.readUInt16LE(28);
        var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
        var decompress;
        if (entry.compressionMethod === 0) {
          decompress = false;
        } else if (entry.compressionMethod === 8) {
          decompress = options.decompress != null ? options.decompress : true;
        } else {
          return callback(new Error("unsupported compression method: " + entry.compressionMethod));
        }
        var fileDataStart = localFileHeaderEnd;
        var fileDataEnd = fileDataStart + entry.compressedSize;
        if (entry.compressedSize !== 0) {
          if (fileDataEnd > self.fileSize) {
            return callback(new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self.fileSize));
          }
        }
        var readStream = self.reader.createReadStream({
          start: fileDataStart + relativeStart,
          end: fileDataStart + relativeEnd
        });
        var endpointStream = readStream;
        if (decompress) {
          var destroyed = false;
          var inflateFilter = zlib.createInflateRaw();
          readStream.on("error", function(err2) {
            setImmediate(function() {
              if (!destroyed)
                inflateFilter.emit("error", err2);
            });
          });
          readStream.pipe(inflateFilter);
          if (self.validateEntrySizes) {
            endpointStream = new AssertByteCountStream(entry.uncompressedSize);
            inflateFilter.on("error", function(err2) {
              setImmediate(function() {
                if (!destroyed)
                  endpointStream.emit("error", err2);
              });
            });
            inflateFilter.pipe(endpointStream);
          } else {
            endpointStream = inflateFilter;
          }
          endpointStream.destroy = function() {
            destroyed = true;
            if (inflateFilter !== endpointStream)
              inflateFilter.unpipe(endpointStream);
            readStream.unpipe(inflateFilter);
            readStream.destroy();
          };
        }
        callback(null, endpointStream);
      } finally {
        self.reader.unref();
      }
    });
  };
  function Entry() {
  }
  Entry.prototype.getLastModDate = function() {
    return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
  };
  Entry.prototype.isEncrypted = function() {
    return (this.generalPurposeBitFlag & 1) !== 0;
  };
  Entry.prototype.isCompressed = function() {
    return this.compressionMethod === 8;
  };
  function dosDateTimeToDate(date, time) {
    var day = date & 31;
    var month = (date >> 5 & 15) - 1;
    var year = (date >> 9 & 127) + 1980;
    var millisecond = 0;
    var second = (time & 31) * 2;
    var minute = time >> 5 & 63;
    var hour = time >> 11 & 31;
    return new Date(year, month, day, hour, minute, second, millisecond);
  }
  function validateFileName(fileName) {
    if (fileName.indexOf("\\") !== -1) {
      return "invalid characters in fileName: " + fileName;
    }
    if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
      return "absolute path: " + fileName;
    }
    if (fileName.split("/").indexOf("..") !== -1) {
      return "invalid relative path: " + fileName;
    }
    return null;
  }
  function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
    if (length === 0) {
      return setImmediate(function() {
        callback(null, newBuffer(0));
      });
    }
    reader.read(buffer, offset, length, position, function(err, bytesRead) {
      if (err)
        return callback(err);
      if (bytesRead < length) {
        return callback(new Error("unexpected EOF"));
      }
      callback();
    });
  }
  util.inherits(AssertByteCountStream, Transform);
  function AssertByteCountStream(byteCount) {
    Transform.call(this);
    this.actualByteCount = 0;
    this.expectedByteCount = byteCount;
  }
  AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
    this.actualByteCount += chunk.length;
    if (this.actualByteCount > this.expectedByteCount) {
      var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
      return cb(new Error(msg));
    }
    cb(null, chunk);
  };
  AssertByteCountStream.prototype._flush = function(cb) {
    if (this.actualByteCount < this.expectedByteCount) {
      var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
      return cb(new Error(msg));
    }
    cb();
  };
  util.inherits(RandomAccessReader, EventEmitter);
  function RandomAccessReader() {
    EventEmitter.call(this);
    this.refCount = 0;
  }
  RandomAccessReader.prototype.ref = function() {
    this.refCount += 1;
  };
  RandomAccessReader.prototype.unref = function() {
    var self = this;
    self.refCount -= 1;
    if (self.refCount > 0)
      return;
    if (self.refCount < 0)
      throw new Error("invalid unref");
    self.close(onCloseDone);
    function onCloseDone(err) {
      if (err)
        return self.emit("error", err);
      self.emit("close");
    }
  };
  RandomAccessReader.prototype.createReadStream = function(options) {
    var start = options.start;
    var end = options.end;
    if (start === end) {
      var emptyStream = new PassThrough();
      setImmediate(function() {
        emptyStream.end();
      });
      return emptyStream;
    }
    var stream = this._readStreamForRange(start, end);
    var destroyed = false;
    var refUnrefFilter = new RefUnrefFilter(this);
    stream.on("error", function(err) {
      setImmediate(function() {
        if (!destroyed)
          refUnrefFilter.emit("error", err);
      });
    });
    refUnrefFilter.destroy = function() {
      stream.unpipe(refUnrefFilter);
      refUnrefFilter.unref();
      stream.destroy();
    };
    var byteCounter = new AssertByteCountStream(end - start);
    refUnrefFilter.on("error", function(err) {
      setImmediate(function() {
        if (!destroyed)
          byteCounter.emit("error", err);
      });
    });
    byteCounter.destroy = function() {
      destroyed = true;
      refUnrefFilter.unpipe(byteCounter);
      refUnrefFilter.destroy();
    };
    return stream.pipe(refUnrefFilter).pipe(byteCounter);
  };
  RandomAccessReader.prototype._readStreamForRange = function(start, end) {
    throw new Error("not implemented");
  };
  RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
    var readStream = this.createReadStream({start: position, end: position + length});
    var writeStream = new Writable();
    var written = 0;
    writeStream._write = function(chunk, encoding, cb) {
      chunk.copy(buffer, offset + written, 0, chunk.length);
      written += chunk.length;
      cb();
    };
    writeStream.on("finish", callback);
    readStream.on("error", function(error6) {
      callback(error6);
    });
    readStream.pipe(writeStream);
  };
  RandomAccessReader.prototype.close = function(callback) {
    setImmediate(callback);
  };
  util.inherits(RefUnrefFilter, PassThrough);
  function RefUnrefFilter(context) {
    PassThrough.call(this);
    this.context = context;
    this.context.ref();
    this.unreffedYet = false;
  }
  RefUnrefFilter.prototype._flush = function(cb) {
    this.unref();
    cb();
  };
  RefUnrefFilter.prototype.unref = function(cb) {
    if (this.unreffedYet)
      return;
    this.unreffedYet = true;
    this.context.unref();
  };
  var cp437 = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";
  function decodeBuffer(buffer, start, end, isUtf8) {
    if (isUtf8) {
      return buffer.toString("utf8", start, end);
    } else {
      var result = "";
      for (var i = start; i < end; i++) {
        result += cp437[buffer[i]];
      }
      return result;
    }
  }
  function readUInt64LE(buffer, offset) {
    var lower32 = buffer.readUInt32LE(offset);
    var upper32 = buffer.readUInt32LE(offset + 4);
    return upper32 * 4294967296 + lower32;
  }
  var newBuffer;
  if (typeof Buffer.allocUnsafe === "function") {
    newBuffer = function(len) {
      return Buffer.allocUnsafe(len);
    };
  } else {
    newBuffer = function(len) {
      return new Buffer(len);
    };
  }
  function defaultCallback(err) {
    if (err)
      throw err;
  }
});

// node_modules/@egoist/extract-zip/index.js
var require_extract_zip = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  var debug = require_src2()("extract-zip");
  var {createWriteStream, promises: fs11} = require("fs");
  var getStream = require_get_stream();
  var path16 = require("path");
  var {promisify} = require("util");
  var stream = require("stream");
  var yauzl = require_yauzl();
  var openZip = promisify(yauzl.open);
  var pipeline = promisify(stream.pipeline);
  var Extractor = class {
    constructor(zipPath, opts) {
      this.zipPath = zipPath;
      this.opts = opts;
    }
    async extract() {
      debug("opening", this.zipPath, "with opts", this.opts);
      this.zipfile = await openZip(this.zipPath, {lazyEntries: true});
      this.canceled = false;
      return new Promise((resolve, reject) => {
        this.zipfile.on("error", (err) => {
          this.canceled = true;
          reject(err);
        });
        this.zipfile.readEntry();
        this.zipfile.on("close", () => {
          if (!this.canceled) {
            debug("zip extraction complete");
            resolve();
          }
        });
        this.zipfile.on("entry", async (entry) => {
          if (this.canceled) {
            debug("skipping entry", entry.fileName, {cancelled: this.canceled});
            return;
          }
          debug("zipfile entry", entry.fileName);
          if (entry.fileName.startsWith("__MACOSX/")) {
            this.zipfile.readEntry();
            return;
          }
          const destDir = path16.dirname(path16.join(this.opts.dir, entry.fileName));
          try {
            await fs11.mkdir(destDir, {recursive: true});
            const canonicalDestDir = await fs11.realpath(destDir);
            const relativeDestDir = path16.relative(this.opts.dir, canonicalDestDir);
            if (relativeDestDir.split(path16.sep).includes("..")) {
              throw new Error(`Out of bound path "${canonicalDestDir}" found while processing file ${entry.fileName}`);
            }
            await this.extractEntry(entry);
            debug("finished processing", entry.fileName);
            this.zipfile.readEntry();
          } catch (err) {
            this.canceled = true;
            this.zipfile.close();
            reject(err);
          }
        });
      });
    }
    async extractEntry(entry) {
      if (this.canceled) {
        debug("skipping entry extraction", entry.fileName, {
          cancelled: this.canceled
        });
        return;
      }
      if (this.opts.onEntry) {
        this.opts.onEntry(entry, this.zipfile);
      }
      const strip = this.opts.strip || 0;
      let filenameParts = entry.fileName.split("/");
      filenameParts = filenameParts.slice(Math.min(strip, filenameParts.length - 1));
      const dest = path16.join(this.opts.dir, ...filenameParts);
      const mode = entry.externalFileAttributes >> 16 & 65535;
      const IFMT = 61440;
      const IFDIR = 16384;
      const IFLNK = 40960;
      const symlink = (mode & IFMT) === IFLNK;
      let isDir = (mode & IFMT) === IFDIR;
      if (!isDir && entry.fileName.endsWith("/")) {
        isDir = true;
      }
      const madeBy = entry.versionMadeBy >> 8;
      if (!isDir)
        isDir = madeBy === 0 && entry.externalFileAttributes === 16;
      debug("extracting entry", {
        filename: entry.fileName,
        isDir,
        isSymlink: symlink
      });
      const umask = ~process.umask();
      const procMode = this.getExtractedMode(mode, isDir) & umask;
      const destDir = isDir ? dest : path16.dirname(dest);
      const mkdirOptions = {recursive: true};
      if (isDir) {
        mkdirOptions.mode = procMode;
      }
      debug("mkdir", {dir: destDir, ...mkdirOptions});
      await fs11.mkdir(destDir, mkdirOptions);
      if (isDir)
        return;
      debug("opening read stream", dest);
      const readStream = await promisify(this.zipfile.openReadStream.bind(this.zipfile))(entry);
      if (symlink) {
        const link = await getStream(readStream);
        debug("creating symlink", link, dest);
        await fs11.symlink(link, dest);
      } else {
        await pipeline(readStream, createWriteStream(dest, {mode: procMode}));
      }
    }
    getExtractedMode(entryMode, isDir) {
      let mode = entryMode;
      if (mode === 0) {
        if (isDir) {
          if (this.opts.defaultDirMode) {
            mode = parseInt(this.opts.defaultDirMode, 10);
          }
          if (!mode) {
            mode = 493;
          }
        } else {
          if (this.opts.defaultFileMode) {
            mode = parseInt(this.opts.defaultFileMode, 10);
          }
          if (!mode) {
            mode = 420;
          }
        }
      }
      return mode;
    }
  };
  module.exports = async function(zipPath, opts) {
    debug("creating target directory", opts.dir);
    if (!path16.isAbsolute(opts.dir)) {
      throw new Error("Target directory is expected to be absolute");
    }
    await fs11.mkdir(opts.dir, {recursive: true});
    opts.dir = await fs11.realpath(opts.dir);
    return new Extractor(zipPath, opts).extract();
  };
});

// node_modules/ansi-escapes/index.js
var require_ansi_escapes = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var ansiEscapes = module.exports;
  module.exports.default = ansiEscapes;
  var ESC = "[";
  var OSC = "]";
  var BEL = "\x07";
  var SEP = ";";
  var isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal";
  ansiEscapes.cursorTo = (x, y) => {
    if (typeof x !== "number") {
      throw new TypeError("The `x` argument is required");
    }
    if (typeof y !== "number") {
      return ESC + (x + 1) + "G";
    }
    return ESC + (y + 1) + ";" + (x + 1) + "H";
  };
  ansiEscapes.cursorMove = (x, y) => {
    if (typeof x !== "number") {
      throw new TypeError("The `x` argument is required");
    }
    let ret = "";
    if (x < 0) {
      ret += ESC + -x + "D";
    } else if (x > 0) {
      ret += ESC + x + "C";
    }
    if (y < 0) {
      ret += ESC + -y + "A";
    } else if (y > 0) {
      ret += ESC + y + "B";
    }
    return ret;
  };
  ansiEscapes.cursorUp = (count = 1) => ESC + count + "A";
  ansiEscapes.cursorDown = (count = 1) => ESC + count + "B";
  ansiEscapes.cursorForward = (count = 1) => ESC + count + "C";
  ansiEscapes.cursorBackward = (count = 1) => ESC + count + "D";
  ansiEscapes.cursorLeft = ESC + "G";
  ansiEscapes.cursorSavePosition = isTerminalApp ? "7" : ESC + "s";
  ansiEscapes.cursorRestorePosition = isTerminalApp ? "8" : ESC + "u";
  ansiEscapes.cursorGetPosition = ESC + "6n";
  ansiEscapes.cursorNextLine = ESC + "E";
  ansiEscapes.cursorPrevLine = ESC + "F";
  ansiEscapes.cursorHide = ESC + "?25l";
  ansiEscapes.cursorShow = ESC + "?25h";
  ansiEscapes.eraseLines = (count) => {
    let clear = "";
    for (let i = 0; i < count; i++) {
      clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
    }
    if (count) {
      clear += ansiEscapes.cursorLeft;
    }
    return clear;
  };
  ansiEscapes.eraseEndLine = ESC + "K";
  ansiEscapes.eraseStartLine = ESC + "1K";
  ansiEscapes.eraseLine = ESC + "2K";
  ansiEscapes.eraseDown = ESC + "J";
  ansiEscapes.eraseUp = ESC + "1J";
  ansiEscapes.eraseScreen = ESC + "2J";
  ansiEscapes.scrollUp = ESC + "S";
  ansiEscapes.scrollDown = ESC + "T";
  ansiEscapes.clearScreen = "c";
  ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC}0f` : `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;
  ansiEscapes.beep = BEL;
  ansiEscapes.link = (text, url) => {
    return [
      OSC,
      "8",
      SEP,
      SEP,
      url,
      BEL,
      text,
      OSC,
      "8",
      SEP,
      SEP,
      BEL
    ].join("");
  };
  ansiEscapes.image = (buffer, options = {}) => {
    let ret = `${OSC}1337;File=inline=1`;
    if (options.width) {
      ret += `;width=${options.width}`;
    }
    if (options.height) {
      ret += `;height=${options.height}`;
    }
    if (options.preserveAspectRatio === false) {
      ret += ";preserveAspectRatio=0";
    }
    return ret + ":" + buffer.toString("base64") + BEL;
  };
  ansiEscapes.iTerm = {
    setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
    annotation: (message, options = {}) => {
      let ret = `${OSC}1337;`;
      const hasX = typeof options.x !== "undefined";
      const hasY = typeof options.y !== "undefined";
      if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== "undefined")) {
        throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
      }
      message = message.replace(/\|/g, "");
      ret += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
      if (options.length > 0) {
        ret += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join("|");
      } else {
        ret += message;
      }
      return ret + BEL;
    }
  };
});

// node_modules/wrap-ansi/index.js
var require_wrap_ansi = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var stringWidth = _chunkOP7ZF2FCjs.require_string_width.call(void 0, );
  var stripAnsi = _chunkA3G5L6QYjs.require_strip_ansi.call(void 0, );
  var ansiStyles = _chunkEOPTLNEQjs.require_ansi_styles.call(void 0, );
  var ESCAPES = new Set([
    "",
    "\x9B"
  ]);
  var END_CODE = 39;
  var wrapAnsi = (code) => `${ESCAPES.values().next().value}[${code}m`;
  var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
  var wrapWord = (rows, word, columns) => {
    const characters = [...word];
    let isInsideEscape = false;
    let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
    for (const [index, character] of characters.entries()) {
      const characterLength = stringWidth(character);
      if (visible + characterLength <= columns) {
        rows[rows.length - 1] += character;
      } else {
        rows.push(character);
        visible = 0;
      }
      if (ESCAPES.has(character)) {
        isInsideEscape = true;
      } else if (isInsideEscape && character === "m") {
        isInsideEscape = false;
        continue;
      }
      if (isInsideEscape) {
        continue;
      }
      visible += characterLength;
      if (visible === columns && index < characters.length - 1) {
        rows.push("");
        visible = 0;
      }
    }
    if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
      rows[rows.length - 2] += rows.pop();
    }
  };
  var stringVisibleTrimSpacesRight = (str) => {
    const words = str.split(" ");
    let last = words.length;
    while (last > 0) {
      if (stringWidth(words[last - 1]) > 0) {
        break;
      }
      last--;
    }
    if (last === words.length) {
      return str;
    }
    return words.slice(0, last).join(" ") + words.slice(last).join("");
  };
  var exec = (string, columns, options = {}) => {
    if (options.trim !== false && string.trim() === "") {
      return "";
    }
    let pre = "";
    let ret = "";
    let escapeCode;
    const lengths = wordLengths(string);
    let rows = [""];
    for (const [index, word] of string.split(" ").entries()) {
      if (options.trim !== false) {
        rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
      }
      let rowLength = stringWidth(rows[rows.length - 1]);
      if (index !== 0) {
        if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
          rows.push("");
          rowLength = 0;
        }
        if (rowLength > 0 || options.trim === false) {
          rows[rows.length - 1] += " ";
          rowLength++;
        }
      }
      if (options.hard && lengths[index] > columns) {
        const remainingColumns = columns - rowLength;
        const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
        const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
        if (breaksStartingNextLine < breaksStartingThisLine) {
          rows.push("");
        }
        wrapWord(rows, word, columns);
        continue;
      }
      if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
        if (options.wordWrap === false && rowLength < columns) {
          wrapWord(rows, word, columns);
          continue;
        }
        rows.push("");
      }
      if (rowLength + lengths[index] > columns && options.wordWrap === false) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows[rows.length - 1] += word;
    }
    if (options.trim !== false) {
      rows = rows.map(stringVisibleTrimSpacesRight);
    }
    pre = rows.join("\n");
    for (const [index, character] of [...pre].entries()) {
      ret += character;
      if (ESCAPES.has(character)) {
        const code2 = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
        escapeCode = code2 === END_CODE ? null : code2;
      }
      const code = ansiStyles.codes.get(Number(escapeCode));
      if (escapeCode && code) {
        if (pre[index + 1] === "\n") {
          ret += wrapAnsi(code);
        } else if (character === "\n") {
          ret += wrapAnsi(escapeCode);
        }
      }
    }
    return ret;
  };
  module.exports = (string, columns, options) => {
    return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line) => exec(line, columns, options)).join("\n");
  };
});

// node_modules/slice-ansi/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isFullwidthCodePoint = (codePoint) => {
    if (Number.isNaN(codePoint)) {
      return false;
    }
    if (codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141)) {
      return true;
    }
    return false;
  };
  module.exports = isFullwidthCodePoint;
  module.exports.default = isFullwidthCodePoint;
});

// node_modules/astral-regex/index.js
var require_astral_regex = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var regex = "[\uD800-\uDBFF][\uDC00-\uDFFF]";
  var astralRegex = (options) => options && options.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, "g");
  module.exports = astralRegex;
});

// node_modules/slice-ansi/index.js
var require_slice_ansi = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isFullwidthCodePoint = require_is_fullwidth_code_point();
  var astralRegex = require_astral_regex();
  var ansiStyles = _chunkEOPTLNEQjs.require_ansi_styles.call(void 0, );
  var ESCAPES = [
    "",
    "\x9B"
  ];
  var wrapAnsi = (code) => `${ESCAPES[0]}[${code}m`;
  var checkAnsi = (ansiCodes, isEscapes, endAnsiCode) => {
    let output = [];
    ansiCodes = [...ansiCodes];
    for (let ansiCode of ansiCodes) {
      const ansiCodeOrigin = ansiCode;
      if (ansiCode.includes(";")) {
        ansiCode = ansiCode.split(";")[0][0] + "0";
      }
      const item = ansiStyles.codes.get(Number.parseInt(ansiCode, 10));
      if (item) {
        const indexEscape = ansiCodes.indexOf(item.toString());
        if (indexEscape === -1) {
          output.push(wrapAnsi(isEscapes ? item : ansiCodeOrigin));
        } else {
          ansiCodes.splice(indexEscape, 1);
        }
      } else if (isEscapes) {
        output.push(wrapAnsi(0));
        break;
      } else {
        output.push(wrapAnsi(ansiCodeOrigin));
      }
    }
    if (isEscapes) {
      output = output.filter((element, index) => output.indexOf(element) === index);
      if (endAnsiCode !== void 0) {
        const fistEscapeCode = wrapAnsi(ansiStyles.codes.get(Number.parseInt(endAnsiCode, 10)));
        output = output.reduce((current, next) => next === fistEscapeCode ? [next, ...current] : [...current, next], []);
      }
    }
    return output.join("");
  };
  module.exports = (string, begin, end) => {
    const characters = [...string];
    const ansiCodes = [];
    let stringEnd = typeof end === "number" ? end : characters.length;
    let isInsideEscape = false;
    let ansiCode;
    let visible = 0;
    let output = "";
    for (const [index, character] of characters.entries()) {
      let leftEscape = false;
      if (ESCAPES.includes(character)) {
        const code = /\d[^m]*/.exec(string.slice(index, index + 18));
        ansiCode = code && code.length > 0 ? code[0] : void 0;
        if (visible < stringEnd) {
          isInsideEscape = true;
          if (ansiCode !== void 0) {
            ansiCodes.push(ansiCode);
          }
        }
      } else if (isInsideEscape && character === "m") {
        isInsideEscape = false;
        leftEscape = true;
      }
      if (!isInsideEscape && !leftEscape) {
        visible++;
      }
      if (!astralRegex({exact: true}).test(character) && isFullwidthCodePoint(character.codePointAt())) {
        visible++;
        if (typeof end !== "number") {
          stringEnd++;
        }
      }
      if (visible > begin && visible <= stringEnd) {
        output += character;
      } else if (visible === begin && !isInsideEscape && ansiCode !== void 0) {
        output = checkAnsi(ansiCodes);
      } else if (visible >= stringEnd) {
        output += checkAnsi(ansiCodes, true, ansiCode);
        break;
      }
    }
    return output;
  };
});

// node_modules/log-update/index.js
var require_log_update = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var ansiEscapes = require_ansi_escapes();
  var cliCursor = _chunkGL5SJIXUjs.require_cli_cursor.call(void 0, );
  var wrapAnsi = require_wrap_ansi();
  var sliceAnsi = require_slice_ansi();
  var defaultTerminalHeight = 24;
  var getWidth = (stream) => {
    const {columns} = stream;
    if (!columns) {
      return 80;
    }
    return columns;
  };
  var fitToTerminalHeight = (stream, text) => {
    const terminalHeight = stream.rows || defaultTerminalHeight;
    const lines = text.split("\n");
    const toRemove = lines.length - terminalHeight;
    if (toRemove <= 0) {
      return text;
    }
    return sliceAnsi(text, lines.slice(0, toRemove).join("\n").length + 1, text.length);
  };
  var main = (stream, {showCursor = false} = {}) => {
    let previousLineCount = 0;
    let previousWidth = getWidth(stream);
    let previousOutput = "";
    const render = (...args) => {
      if (!showCursor) {
        cliCursor.hide();
      }
      let output = args.join(" ") + "\n";
      output = fitToTerminalHeight(stream, output);
      const width = getWidth(stream);
      if (output === previousOutput && previousWidth === width) {
        return;
      }
      previousOutput = output;
      previousWidth = width;
      output = wrapAnsi(output, width, {
        trim: false,
        hard: true,
        wordWrap: false
      });
      stream.write(ansiEscapes.eraseLines(previousLineCount) + output);
      previousLineCount = output.split("\n").length;
    };
    render.clear = () => {
      stream.write(ansiEscapes.eraseLines(previousLineCount));
      previousOutput = "";
      previousWidth = getWidth(stream);
      previousLineCount = 0;
    };
    render.done = () => {
      previousOutput = "";
      previousWidth = getWidth(stream);
      previousLineCount = 0;
      if (!showCursor) {
        cliCursor.show();
      }
    };
    return render;
  };
  module.exports = main(process.stdout);
  module.exports.stderr = main(process.stderr);
  module.exports.create = main;
});

// node_modules/ini/ini.js
var require_ini = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports) => {
  exports.parse = exports.decode = decode;
  exports.stringify = exports.encode = encode;
  exports.safe = safe;
  exports.unsafe = unsafe;
  var eol = typeof process !== "undefined" && process.platform === "win32" ? "\r\n" : "\n";
  function encode(obj, opt) {
    var children = [];
    var out = "";
    if (typeof opt === "string") {
      opt = {
        section: opt,
        whitespace: false
      };
    } else {
      opt = opt || {};
      opt.whitespace = opt.whitespace === true;
    }
    var separator = opt.whitespace ? " = " : "=";
    Object.keys(obj).forEach(function(k, _, __) {
      var val = obj[k];
      if (val && Array.isArray(val)) {
        val.forEach(function(item) {
          out += safe(k + "[]") + separator + safe(item) + "\n";
        });
      } else if (val && typeof val === "object") {
        children.push(k);
      } else {
        out += safe(k) + separator + safe(val) + eol;
      }
    });
    if (opt.section && out.length) {
      out = "[" + safe(opt.section) + "]" + eol + out;
    }
    children.forEach(function(k, _, __) {
      var nk = dotSplit(k).join("\\.");
      var section = (opt.section ? opt.section + "." : "") + nk;
      var child = encode(obj[k], {
        section,
        whitespace: opt.whitespace
      });
      if (out.length && child.length) {
        out += eol;
      }
      out += child;
    });
    return out;
  }
  function dotSplit(str) {
    return str.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map(function(part) {
      return part.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
    });
  }
  function decode(str) {
    var out = {};
    var p = out;
    var section = null;
    var re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    var lines = str.split(/[\r\n]+/g);
    lines.forEach(function(line, _, __) {
      if (!line || line.match(/^\s*[;#]/))
        return;
      var match = line.match(re);
      if (!match)
        return;
      if (match[1] !== void 0) {
        section = unsafe(match[1]);
        p = out[section] = out[section] || {};
        return;
      }
      var key = unsafe(match[2]);
      var value = match[3] ? unsafe(match[4]) : true;
      switch (value) {
        case "true":
        case "false":
        case "null":
          value = JSON.parse(value);
      }
      if (key.length > 2 && key.slice(-2) === "[]") {
        key = key.substring(0, key.length - 2);
        if (!p[key]) {
          p[key] = [];
        } else if (!Array.isArray(p[key])) {
          p[key] = [p[key]];
        }
      }
      if (Array.isArray(p[key])) {
        p[key].push(value);
      } else {
        p[key] = value;
      }
    });
    Object.keys(out).filter(function(k, _, __) {
      if (!out[k] || typeof out[k] !== "object" || Array.isArray(out[k])) {
        return false;
      }
      var parts = dotSplit(k);
      var p2 = out;
      var l = parts.pop();
      var nl = l.replace(/\\\./g, ".");
      parts.forEach(function(part, _2, __2) {
        if (!p2[part] || typeof p2[part] !== "object")
          p2[part] = {};
        p2 = p2[part];
      });
      if (p2 === out && nl === l) {
        return false;
      }
      p2[nl] = out[k];
      return true;
    }).forEach(function(del, _, __) {
      delete out[del];
    });
    return out;
  }
  function isQuoted(val) {
    return val.charAt(0) === '"' && val.slice(-1) === '"' || val.charAt(0) === "'" && val.slice(-1) === "'";
  }
  function safe(val) {
    return typeof val !== "string" || val.match(/[=\r\n]/) || val.match(/^\[/) || val.length > 1 && isQuoted(val) || val !== val.trim() ? JSON.stringify(val) : val.replace(/;/g, "\\;").replace(/#/g, "\\#");
  }
  function unsafe(val, doUnesc) {
    val = (val || "").trim();
    if (isQuoted(val)) {
      if (val.charAt(0) === "'") {
        val = val.substr(1, val.length - 2);
      }
      try {
        val = JSON.parse(val);
      } catch (_) {
      }
    } else {
      var esc = false;
      var unesc = "";
      for (var i = 0, l = val.length; i < l; i++) {
        var c = val.charAt(i);
        if (esc) {
          if ("\\;#".indexOf(c) !== -1) {
            unesc += c;
          } else {
            unesc += "\\" + c;
          }
          esc = false;
        } else if (";#".indexOf(c) !== -1) {
          break;
        } else if (c === "\\") {
          esc = true;
        } else {
          unesc += c;
        }
      }
      if (esc) {
        unesc += "\\";
      }
      return unesc.trim();
    }
    return val;
  }
});

// node_modules/cac/dist/index.js
var require_dist2 = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var events = require("events");
  function toArr(any) {
    return any == null ? [] : Array.isArray(any) ? any : [any];
  }
  function toVal(out, key, val, opts) {
    var x, old = out[key], nxt = !!~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : !!~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x = +val, x * 0 === 0) ? x : val), !!val) : (x = +val, x * 0 === 0) ? x : val;
    out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [old, nxt];
  }
  var lib = function(args, opts) {
    args = args || [];
    opts = opts || {};
    var k, arr, arg, name, val, out = {_: []};
    var i = 0, j = 0, idx = 0, len = args.length;
    const alibi = opts.alias !== void 0;
    const strict = opts.unknown !== void 0;
    const defaults = opts.default !== void 0;
    opts.alias = opts.alias || {};
    opts.string = toArr(opts.string);
    opts.boolean = toArr(opts.boolean);
    if (alibi) {
      for (k in opts.alias) {
        arr = opts.alias[k] = toArr(opts.alias[k]);
        for (i = 0; i < arr.length; i++) {
          (opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
        }
      }
    }
    opts.boolean.forEach((key) => {
      opts.boolean = opts.boolean.concat(opts.alias[key] = opts.alias[key] || []);
    });
    opts.string.forEach((key) => {
      opts.string = opts.string.concat(opts.alias[key] = opts.alias[key] || []);
    });
    if (defaults) {
      for (k in opts.default) {
        opts.alias[k] = opts.alias[k] || [];
        (opts[typeof opts.default[k]] || []).push(k);
      }
    }
    const keys = strict ? Object.keys(opts.alias) : [];
    for (i = 0; i < len; i++) {
      arg = args[i];
      if (arg === "--") {
        out._ = out._.concat(args.slice(++i));
        break;
      }
      for (j = 0; j < arg.length; j++) {
        if (arg.charCodeAt(j) !== 45)
          break;
      }
      if (j === 0) {
        out._.push(arg);
      } else if (arg.substring(j, j + 3) === "no-") {
        name = arg.substring(j + 3);
        if (strict && !~keys.indexOf(name)) {
          return opts.unknown(arg);
        }
        out[name] = false;
      } else {
        for (idx = j + 1; idx < arg.length; idx++) {
          if (arg.charCodeAt(idx) === 61)
            break;
        }
        name = arg.substring(j, idx);
        val = arg.substring(++idx) || (i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i]);
        arr = j === 2 ? [name] : name;
        for (idx = 0; idx < arr.length; idx++) {
          name = arr[idx];
          if (strict && !~keys.indexOf(name))
            return opts.unknown("-".repeat(j) + name);
          toVal(out, name, idx + 1 < arr.length || val, opts);
        }
      }
    }
    if (defaults) {
      for (k in opts.default) {
        if (out[k] === void 0) {
          out[k] = opts.default[k];
        }
      }
    }
    if (alibi) {
      for (k in out) {
        arr = opts.alias[k] || [];
        while (arr.length > 0) {
          out[arr.shift()] = out[k];
        }
      }
    }
    return out;
  };
  var removeBrackets = (v) => v.replace(/[<[].+/, "").trim();
  var findAllBrackets = (v) => {
    const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g;
    const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g;
    const res = [];
    const parse = (match) => {
      let variadic = false;
      let value = match[1];
      if (value.startsWith("...")) {
        value = value.slice(3);
        variadic = true;
      }
      return {
        required: match[0].startsWith("<"),
        value,
        variadic
      };
    };
    let angledMatch;
    while (angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v)) {
      res.push(parse(angledMatch));
    }
    let squareMatch;
    while (squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v)) {
      res.push(parse(squareMatch));
    }
    return res;
  };
  var getMriOptions = (options) => {
    const result = {
      alias: {},
      boolean: []
    };
    for (const [index, option] of options.entries()) {
      if (option.names.length > 1) {
        result.alias[option.names[0]] = option.names.slice(1);
      }
      if (option.isBoolean) {
        if (option.negated) {
          const hasStringTypeOption = options.some((o, i) => {
            return i !== index && o.names.some((name) => option.names.includes(name)) && typeof o.required === "boolean";
          });
          if (!hasStringTypeOption) {
            result.boolean.push(option.names[0]);
          }
        } else {
          result.boolean.push(option.names[0]);
        }
      }
    }
    return result;
  };
  var findLongest = (arr) => {
    return arr.sort((a, b) => {
      return a.length > b.length ? -1 : 1;
    })[0];
  };
  var padRight = (str, length) => {
    return str.length >= length ? str : `${str}${" ".repeat(length - str.length)}`;
  };
  var camelcase = (input) => {
    return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
      return p1 + p2.toUpperCase();
    });
  };
  var setDotProp = (obj, keys, val) => {
    let i = 0;
    let length = keys.length;
    let t = obj;
    let x;
    for (; i < length; ++i) {
      x = t[keys[i]];
      t = t[keys[i]] = i === length - 1 ? val : x != null ? x : !!~keys[i + 1].indexOf(".") || !(+keys[i + 1] > -1) ? {} : [];
    }
  };
  var setByType = (obj, transforms) => {
    for (const key of Object.keys(transforms)) {
      const transform = transforms[key];
      if (transform.shouldTransform) {
        obj[key] = Array.prototype.concat.call([], obj[key]);
        if (typeof transform.transformFunction === "function") {
          obj[key] = obj[key].map(transform.transformFunction);
        }
      }
    }
  };
  var getFileName = (input) => {
    const m = /([^\\\/]+)$/.exec(input);
    return m ? m[1] : "";
  };
  var camelcaseOptionName = (name) => {
    return name.split(".").map((v, i) => {
      return i === 0 ? camelcase(v) : v;
    }).join(".");
  };
  var CACError = class extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error(message).stack;
      }
    }
  };
  var Option = class {
    constructor(rawName, description, config) {
      this.rawName = rawName;
      this.description = description;
      this.config = Object.assign({}, config);
      rawName = rawName.replace(/\.\*/g, "");
      this.negated = false;
      this.names = removeBrackets(rawName).split(",").map((v) => {
        let name = v.trim().replace(/^-{1,2}/, "");
        if (name.startsWith("no-")) {
          this.negated = true;
          name = name.replace(/^no-/, "");
        }
        return camelcaseOptionName(name);
      }).sort((a, b) => a.length > b.length ? 1 : -1);
      this.name = this.names[this.names.length - 1];
      if (this.negated) {
        this.config.default = true;
      }
      if (rawName.includes("<")) {
        this.required = true;
      } else if (rawName.includes("[")) {
        this.required = false;
      } else {
        this.isBoolean = true;
      }
    }
  };
  var deno = typeof window !== "undefined" && window.Deno;
  var processArgs = deno ? ["deno", "cli"].concat(Deno.args) : process.argv;
  var platformInfo = deno ? `${Deno.build.os}-${Deno.build.arch} deno-${Deno.version.deno}` : `${process.platform}-${process.arch} node-${process.version}`;
  var Command = class {
    constructor(rawName, description, config = {}, cli) {
      this.rawName = rawName;
      this.description = description;
      this.config = config;
      this.cli = cli;
      this.options = [];
      this.aliasNames = [];
      this.name = removeBrackets(rawName);
      this.args = findAllBrackets(rawName);
      this.examples = [];
    }
    usage(text) {
      this.usageText = text;
      return this;
    }
    allowUnknownOptions() {
      this.config.allowUnknownOptions = true;
      return this;
    }
    ignoreOptionDefaultValue() {
      this.config.ignoreOptionDefaultValue = true;
      return this;
    }
    version(version, customFlags = "-v, --version") {
      this.versionNumber = version;
      this.option(customFlags, "Display version number");
      return this;
    }
    example(example) {
      this.examples.push(example);
      return this;
    }
    option(rawName, description, config) {
      const option = new Option(rawName, description, config);
      this.options.push(option);
      return this;
    }
    alias(name) {
      this.aliasNames.push(name);
      return this;
    }
    action(callback) {
      this.commandAction = callback;
      return this;
    }
    isMatched(name) {
      return this.name === name || this.aliasNames.includes(name);
    }
    get isDefaultCommand() {
      return this.name === "" || this.aliasNames.includes("!");
    }
    get isGlobalCommand() {
      return this instanceof GlobalCommand;
    }
    hasOption(name) {
      name = name.split(".")[0];
      return this.options.find((option) => {
        return option.names.includes(name);
      });
    }
    outputHelp() {
      const {name, commands} = this.cli;
      const {versionNumber, options: globalOptions, helpCallback} = this.cli.globalCommand;
      let sections = [{
        body: `${name}${versionNumber ? ` v${versionNumber}` : ""}`
      }];
      sections.push({
        title: "Usage",
        body: `  $ ${name} ${this.usageText || this.rawName}`
      });
      const showCommands = (this.isGlobalCommand || this.isDefaultCommand) && commands.length > 0;
      if (showCommands) {
        const longestCommandName = findLongest(commands.map((command) => command.rawName));
        sections.push({
          title: "Commands",
          body: commands.map((command) => {
            return `  ${padRight(command.rawName, longestCommandName.length)}  ${command.description}`;
          }).join("\n")
        });
        sections.push({
          title: `For more info, run any command with the \`--help\` flag`,
          body: commands.map((command) => `  $ ${name}${command.name === "" ? "" : ` ${command.name}`} --help`).join("\n")
        });
      }
      const options = this.isGlobalCommand ? globalOptions : [...this.options, ...globalOptions || []];
      if (options.length > 0) {
        const longestOptionName = findLongest(options.map((option) => option.rawName));
        sections.push({
          title: "Options",
          body: options.map((option) => {
            return `  ${padRight(option.rawName, longestOptionName.length)}  ${option.description} ${option.config.default === void 0 ? "" : `(default: ${option.config.default})`}`;
          }).join("\n")
        });
      }
      if (this.examples.length > 0) {
        sections.push({
          title: "Examples",
          body: this.examples.map((example) => {
            if (typeof example === "function") {
              return example(name);
            }
            return example;
          }).join("\n")
        });
      }
      if (helpCallback) {
        sections = helpCallback(sections) || sections;
      }
      console.log(sections.map((section) => {
        return section.title ? `${section.title}:
${section.body}` : section.body;
      }).join("\n\n"));
    }
    outputVersion() {
      const {name} = this.cli;
      const {versionNumber} = this.cli.globalCommand;
      if (versionNumber) {
        console.log(`${name}/${versionNumber} ${platformInfo}`);
      }
    }
    checkRequiredArgs() {
      const minimalArgsCount = this.args.filter((arg) => arg.required).length;
      if (this.cli.args.length < minimalArgsCount) {
        throw new CACError(`missing required args for command \`${this.rawName}\``);
      }
    }
    checkUnknownOptions() {
      const {options, globalCommand} = this.cli;
      if (!this.config.allowUnknownOptions) {
        for (const name of Object.keys(options)) {
          if (name !== "--" && !this.hasOption(name) && !globalCommand.hasOption(name)) {
            throw new CACError(`Unknown option \`${name.length > 1 ? `--${name}` : `-${name}`}\``);
          }
        }
      }
    }
    checkOptionValue() {
      const {options: parsedOptions, globalCommand} = this.cli;
      const options = [...globalCommand.options, ...this.options];
      for (const option of options) {
        const value = parsedOptions[option.name.split(".")[0]];
        if (option.required) {
          const hasNegated = options.some((o) => o.negated && o.names.includes(option.name));
          if (value === true || value === false && !hasNegated) {
            throw new CACError(`option \`${option.rawName}\` value is missing`);
          }
        }
      }
    }
  };
  var GlobalCommand = class extends Command {
    constructor(cli) {
      super("@@global@@", "", {}, cli);
    }
  };
  var __assign = Object.assign;
  var CAC = class extends events.EventEmitter {
    constructor(name = "") {
      super();
      this.name = name;
      this.commands = [];
      this.globalCommand = new GlobalCommand(this);
      this.globalCommand.usage("<command> [options]");
    }
    usage(text) {
      this.globalCommand.usage(text);
      return this;
    }
    command(rawName, description, config) {
      const command = new Command(rawName, description || "", config, this);
      command.globalCommand = this.globalCommand;
      this.commands.push(command);
      return command;
    }
    option(rawName, description, config) {
      this.globalCommand.option(rawName, description, config);
      return this;
    }
    help(callback) {
      this.globalCommand.option("-h, --help", "Display this message");
      this.globalCommand.helpCallback = callback;
      this.showHelpOnExit = true;
      return this;
    }
    version(version, customFlags = "-v, --version") {
      this.globalCommand.version(version, customFlags);
      this.showVersionOnExit = true;
      return this;
    }
    example(example) {
      this.globalCommand.example(example);
      return this;
    }
    outputHelp() {
      if (this.matchedCommand) {
        this.matchedCommand.outputHelp();
      } else {
        this.globalCommand.outputHelp();
      }
    }
    outputVersion() {
      this.globalCommand.outputVersion();
    }
    setParsedInfo({args, options}, matchedCommand, matchedCommandName) {
      this.args = args;
      this.options = options;
      if (matchedCommand) {
        this.matchedCommand = matchedCommand;
      }
      if (matchedCommandName) {
        this.matchedCommandName = matchedCommandName;
      }
      return this;
    }
    unsetMatchedCommand() {
      this.matchedCommand = void 0;
      this.matchedCommandName = void 0;
    }
    parse(argv = processArgs, {run = true} = {}) {
      this.rawArgs = argv;
      if (!this.name) {
        this.name = argv[1] ? getFileName(argv[1]) : "cli";
      }
      let shouldParse = true;
      for (const command of this.commands) {
        const parsed = this.mri(argv.slice(2), command);
        const commandName = parsed.args[0];
        if (command.isMatched(commandName)) {
          shouldParse = false;
          const parsedInfo = __assign(__assign({}, parsed), {
            args: parsed.args.slice(1)
          });
          this.setParsedInfo(parsedInfo, command, commandName);
          this.emit(`command:${commandName}`, command);
        }
      }
      if (shouldParse) {
        for (const command of this.commands) {
          if (command.name === "") {
            shouldParse = false;
            const parsed = this.mri(argv.slice(2), command);
            this.setParsedInfo(parsed, command);
            this.emit(`command:!`, command);
          }
        }
      }
      if (shouldParse) {
        const parsed = this.mri(argv.slice(2));
        this.setParsedInfo(parsed);
      }
      if (this.options.help && this.showHelpOnExit) {
        this.outputHelp();
        run = false;
        this.unsetMatchedCommand();
      }
      if (this.options.version && this.showVersionOnExit) {
        this.outputVersion();
        run = false;
        this.unsetMatchedCommand();
      }
      const parsedArgv = {
        args: this.args,
        options: this.options
      };
      if (run) {
        this.runMatchedCommand();
      }
      if (!this.matchedCommand && this.args[0]) {
        this.emit("command:*");
      }
      return parsedArgv;
    }
    mri(argv, command) {
      const cliOptions = [...this.globalCommand.options, ...command ? command.options : []];
      const mriOptions = getMriOptions(cliOptions);
      let argsAfterDoubleDashes = [];
      const doubleDashesIndex = argv.indexOf("--");
      if (doubleDashesIndex > -1) {
        argsAfterDoubleDashes = argv.slice(doubleDashesIndex + 1);
        argv = argv.slice(0, doubleDashesIndex);
      }
      let parsed = lib(argv, mriOptions);
      parsed = Object.keys(parsed).reduce((res, name) => {
        return __assign(__assign({}, res), {
          [camelcaseOptionName(name)]: parsed[name]
        });
      }, {
        _: []
      });
      const args = parsed._;
      delete parsed._;
      const options = {
        "--": argsAfterDoubleDashes
      };
      const ignoreDefault = command && command.config.ignoreOptionDefaultValue ? command.config.ignoreOptionDefaultValue : this.globalCommand.config.ignoreOptionDefaultValue;
      let transforms = Object.create(null);
      for (const cliOption of cliOptions) {
        if (!ignoreDefault && cliOption.config.default !== void 0) {
          for (const name of cliOption.names) {
            options[name] = cliOption.config.default;
          }
        }
        if (Array.isArray(cliOption.config.type)) {
          if (transforms[cliOption.name] === void 0) {
            transforms[cliOption.name] = Object.create(null);
            transforms[cliOption.name]["shouldTransform"] = true;
            transforms[cliOption.name]["transformFunction"] = cliOption.config.type[0];
          }
        }
      }
      for (const key of Object.keys(parsed)) {
        const keys = key.split(".");
        setDotProp(options, keys, parsed[key]);
        setByType(options, transforms);
      }
      return {
        args,
        options
      };
    }
    runMatchedCommand() {
      const {args, options, matchedCommand: command} = this;
      if (!command || !command.commandAction)
        return;
      command.checkUnknownOptions();
      command.checkOptionValue();
      command.checkRequiredArgs();
      const actionArgs = [];
      command.args.forEach((arg, index) => {
        if (arg.variadic) {
          actionArgs.push(args.slice(index));
        } else {
          actionArgs.push(args[index]);
        }
      });
      actionArgs.push(options);
      return command.commandAction.apply(this, actionArgs);
    }
  };
  var cac3 = (name = "") => new CAC(name);
  if (typeof module !== "undefined") {
    module.exports = cac3;
    module.exports.default = cac3;
    module.exports.cac = cac3;
  }
  exports.CAC = CAC;
  exports.Command = Command;
  exports.cac = cac3;
  exports.default = cac3;
});

// src/index.ts
var resolve_from = _chunkEOPTLNEQjs.__toModule.call(void 0, _chunkGL5SJIXUjs.require_resolve_from.call(void 0, ));
var majo2 = _chunkEOPTLNEQjs.__toModule.call(void 0, _chunkN3M3HMMCjs.require_dist.call(void 0, ));
var cross_spawn3 = _chunkEOPTLNEQjs.__toModule.call(void 0, require_cross_spawn());
var _os = require('os'); var _os2 = _interopRequireDefault2(_os);
var _path2 = require('path'); var _path3 = _interopRequireDefault2(_path2);

// src/generator-config.ts
var joycon = _chunkEOPTLNEQjs.__toModule.call(void 0, require_lib());

var joycon2 = new joycon.default({
  files: ["saofile.js", "saofile.mjs", "saofile.json"]
});
var loadGeneratorConfig = (cwd) => joycon2.load({
  cwd,
  stopDir: _path3.default.dirname(cwd)
});
var generatorHasConfig = (cwd) => {
  return Boolean(joycon2.resolve({
    cwd,
    stopDir: _path3.default.dirname(cwd)
  }));
};

// src/utils/is-local-path.ts
var RE = /^[./]|(^[a-zA-Z]:)/;
var isLocalPath = (v) => RE.test(v);
var removeLocalPathPrefix = (v) => v.replace(RE, "");

// src/error.ts
function handleError(error6) {
  _chunkGL5SJIXUjs.spinner.stop();
  if (error6 instanceof _chunkGL5SJIXUjs.SAOError) {
    if (error6.cmdOutput) {
      console.error(error6.cmdOutput);
    }
    _chunkEOPTLNEQjs.logger.error(error6.message);
    _chunkEOPTLNEQjs.logger.debug(_chunkEOPTLNEQjs.chalk.default.dim(error6.stack));
  } else if (error6.name === "CACError") {
    _chunkEOPTLNEQjs.logger.error(error6.message);
  } else {
    _chunkEOPTLNEQjs.logger.error(error6.stack);
  }
  process.exit(1);
}

// src/parse-generator.ts
var hash_sum = _chunkEOPTLNEQjs.__toModule.call(void 0, require_hash_sum());
var parse_package_name = _chunkEOPTLNEQjs.__toModule.call(void 0, require_parse_package_name());

function parseGenerator(generator) {
  if (generator.startsWith("alias:")) {
    const alias = generator.slice(6);
    const url = _chunkPURBCYRPjs.store.get(`alias.${_chunkO6VIHJHZjs.escapeDots.call(void 0, alias)}`);
    if (!url) {
      throw new (0, _chunkGL5SJIXUjs.SAOError)(`Cannot find alias '${alias}'`);
    }
    return parseGenerator(url);
  }
  if (isLocalPath(generator)) {
    let subGenerator2;
    if (removeLocalPathPrefix(generator).includes(":")) {
      subGenerator2 = generator.slice(generator.lastIndexOf(":") + 1);
      generator = generator.slice(0, generator.lastIndexOf(":"));
    }
    const absolutePath = _path3.default.resolve(generator);
    return {
      type: "local",
      path: absolutePath,
      hash: hash_sum.default(absolutePath),
      subGenerator: subGenerator2
    };
  }
  const GENERATOR_PREFIX_RE = /^(npm|github|bitbucket|gitlab):/;
  if (!GENERATOR_PREFIX_RE.test(generator)) {
    if (generator.startsWith("@")) {
      generator = `npm:${generator.replace(/\/(sao-)?/, "/sao-")}`;
    } else if (generator.includes("/")) {
      generator = `github:${generator}`;
    } else {
      generator = `npm:${generator.replace(/^(sao-)?/, "sao-")}`;
    }
  }
  let prefix = "npm";
  let m = null;
  if (m = GENERATOR_PREFIX_RE.exec(generator)) {
    prefix = m[1];
    generator = generator.replace(GENERATOR_PREFIX_RE, "");
  }
  if (prefix === "npm") {
    const hasSubGenerator = generator.indexOf(":") !== -1;
    const slug = generator.slice(0, hasSubGenerator ? generator.indexOf(":") : generator.length);
    const parsed = parse_package_name.default(slug);
    const hash2 = hash_sum.default(`npm:${slug}`);
    return {
      type: "npm",
      name: parsed.name,
      version: parsed.version || "latest",
      slug,
      subGenerator: hasSubGenerator ? generator.slice(generator.indexOf(":") + 1) : void 0,
      hash: hash2,
      path: _path3.default.join(_chunkOP7ZF2FCjs.PACKAGES_CACHE_PATH, hash2, "node_modules", parsed.name)
    };
  }
  const [, user, repo, version = "master", subGenerator] = /([^/]+)\/([^#:]+)(?:#(.+))?(?::(.+))?$/.exec(generator) || [];
  const hash = hash_sum.default({
    type: "repo",
    prefix,
    user,
    repo,
    version,
    subGenerator
  });
  return {
    type: "repo",
    prefix,
    user,
    repo,
    version,
    subGenerator,
    hash,
    path: _path3.default.join(_chunkOP7ZF2FCjs.REPOS_CACHE_PATH, hash)
  };
}

// src/update-check.ts

var _fs2 = require('fs'); var _fs3 = _interopRequireDefault2(_fs2);
var _updatenotifier = require('update-notifier'); var _updatenotifier2 = _interopRequireDefault2(_updatenotifier);
var yarn_global = _chunkEOPTLNEQjs.__toModule.call(void 0, require_yarn_global());
function performSelfUpdateCheck() {
  const pkg = JSON.parse(_fs3.default.readFileSync(_path3.default.join(__dirname, "../package.json"), "utf8"));
  const notifier = _updatenotifier2.default.call(void 0, {pkg});
  if (notifier.update) {
    process.on("exit", () => {
      if (!notifier.update)
        return;
      _chunkEOPTLNEQjs.logger.warn(`Your current version of SAO is out of date. The latest version is "${notifier.update.latest}", while you're on "${notifier.update.current}".`);
      const isPnpm = __dirname.includes("/pnpm-global/");
      const isYarn = !isPnpm && yarn_global.default.hasDependency("sao");
      _chunkEOPTLNEQjs.logger.tip(`To upgrade SAO, run the following command:
${_chunkEOPTLNEQjs.chalk.default.dim(isYarn ? "$ yarn global add sao" : `$ ${isPnpm ? "pnpm" : "npm"} i -g sao`)}`);
    });
  }
}
function performGeneratorUpdateCheck(generator, showNotifier) {
  const pkg = require(_path3.default.join(generator.path, "package.json"));
  const notifier = _updatenotifier2.default.call(void 0, {pkg});
  if (notifier.update && showNotifier) {
    process.on("exit", () => {
      if (!notifier.update)
        return;
      _chunkEOPTLNEQjs.logger.warn(`The generator you were running is out of date. The latest version is "${notifier.update.latest}", while you're on "${notifier.update.current}".`);
      _chunkEOPTLNEQjs.logger.tip(`To run the generator with an updated version, run the following command:
${_chunkEOPTLNEQjs.chalk.default.dim("$ sao " + process.argv.slice(2).join(" ") + " --update")}`);
    });
  }
}
var updateCheck = ({
  generator,
  checkGenerator,
  showNotifier
}) => {
  performSelfUpdateCheck();
  if (checkGenerator) {
    performGeneratorUpdateCheck(generator, showNotifier);
  }
};

// src/utils/fs.ts
var pathExists = async (path16) => {
  try {
    await _chunkN3M3HMMCjs.fs.promises.access(path16);
    return true;
  } catch (_) {
    return false;
  }
};

// src/utils/download-repo.ts
var cross_spawn = _chunkEOPTLNEQjs.__toModule.call(void 0, require_cross_spawn());
var axios = _chunkEOPTLNEQjs.__toModule.call(void 0, require_axios2());
var extract_zip = _chunkEOPTLNEQjs.__toModule.call(void 0, require_extract_zip());



function getUrl(generator, clone) {
  let url = "";
  let origin = generator.prefix === "github" ? "github.com" : generator.prefix === "gitlab" ? "gitlab.com" : generator.prefix === "bitbucket" ? "bitbucket.com" : "";
  if (clone) {
    origin = "git@" + origin;
  } else {
    origin = "https://" + origin;
  }
  if (/^git@/i.test(origin)) {
    origin = origin + ":";
  } else {
    origin = origin + "/";
  }
  if (clone) {
    url = origin + generator.user + "/" + generator.repo + ".git";
  } else {
    if (generator.prefix === "github") {
      url = origin + generator.user + "/" + generator.repo + "/archive/" + generator.version + ".zip";
    } else if (generator.prefix === "gitlab") {
      url = origin + generator.user + "/" + generator.repo + "/repository/archive.zip?ref=" + generator.version;
    } else if (generator.prefix === "bitbucket") {
      url = origin + generator.user + "/" + generator.repo + "/get/" + generator.version + ".zip";
    }
  }
  return url;
}
async function downloadFile(url, outPath, extract) {
  const tempFile = _path3.default.join(_os2.default.tmpdir(), `sao-${Date.now()}`);
  const writer = _fs3.default.createWriteStream(tempFile);
  _chunkEOPTLNEQjs.logger.debug(`Downloading file: ${url}`);
  const reponse = await axios.default({url, responseType: "stream", method: "GET"});
  reponse.data.pipe(writer);
  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  if (extract) {
    _chunkEOPTLNEQjs.logger.debug(`Extracting downloaded file`);
    await extract_zip.default(tempFile, {
      dir: outPath,
      strip: 1
    });
  } else {
    await _chunkN3M3HMMCjs.move_file.default(tempFile, outPath);
  }
}
async function downloadRepo(generator, {clone, outDir}) {
  const url = getUrl(generator, clone);
  if (clone) {
    const cmd = cross_spawn.default.sync("git", ["clone", url, outDir, "--depth=1"]);
    if (cmd.status !== 0) {
      throw new (0, _chunkGL5SJIXUjs.SAOError)(`Failed to download repo: ${cmd.output}`);
    }
  } else {
    await downloadFile(url, outDir, true);
  }
}

// src/utils/ensure-generator.ts


// src/install-packages.ts
var cross_spawn2 = _chunkEOPTLNEQjs.__toModule.call(void 0, require_cross_spawn());
var log_update = _chunkEOPTLNEQjs.__toModule.call(void 0, require_log_update());
var cachedNpmClient = null;
function getNpmClient() {
  if (cachedNpmClient) {
    return cachedNpmClient;
  }
  if (cross_spawn2.default.sync("yarn", ["--version"]).status === 0) {
    cachedNpmClient = "yarn";
  } else {
    cachedNpmClient = "npm";
  }
  return cachedNpmClient;
}
var installPackages = async ({
  cwd,
  npmClient: _npmClient,
  installArgs,
  packages,
  saveDev,
  registry
}) => {
  const npmClient = _npmClient || getNpmClient();
  const packageName = packages ? packages.join(", ") : "packages";
  return new Promise((resolve, reject) => {
    const args = [packages ? "add" : "install"].concat(packages ? packages : []);
    if (saveDev) {
      args.push(npmClient === "npm" ? "-D" : "--dev");
    }
    if (registry) {
      args.push("--registry", registry);
    }
    if (installArgs) {
      args.push(...installArgs);
    }
    _chunkEOPTLNEQjs.logger.debug(npmClient, args.join(" "));
    _chunkEOPTLNEQjs.logger.debug("install directory", cwd);
    _chunkGL5SJIXUjs.spinner.start(`Installing ${packageName} with ${npmClient}`);
    const ps = cross_spawn2.default(npmClient, args, {
      stdio: [0, "pipe", "pipe"],
      cwd,
      env: Object.assign({
        FORCE_COLOR: true,
        npm_config_color: "always",
        npm_config_progress: true
      }, process.env)
    });
    let stdoutLogs = "";
    let stderrLogs = "";
    ps.stdout && ps.stdout.setEncoding("utf8").on("data", (data) => {
      if (npmClient === "pnpm") {
        stdoutLogs = data;
      } else {
        stdoutLogs += data;
      }
      _chunkGL5SJIXUjs.spinner.stop();
      log_update.default(stdoutLogs);
      _chunkGL5SJIXUjs.spinner.start();
    });
    ps.stderr && ps.stderr.setEncoding("utf8").on("data", (data) => {
      if (npmClient === "pnpm") {
        stderrLogs = data;
      } else {
        stderrLogs += data;
      }
      _chunkGL5SJIXUjs.spinner.stop();
      log_update.default.clear();
      log_update.default.stderr(stderrLogs);
      log_update.default(stdoutLogs);
      _chunkGL5SJIXUjs.spinner.start();
    });
    ps.on("close", (code) => {
      _chunkGL5SJIXUjs.spinner.stop();
      if (code === 0) {
        log_update.default.clear();
        log_update.default.stderr.clear();
        _chunkEOPTLNEQjs.logger.success(`Installed ${packageName}`);
        resolve({code});
      } else {
        reject(new (0, _chunkGL5SJIXUjs.SAOError)(`Failed to install ${packageName} in ${cwd}`));
      }
    });
    ps.on("error", reject);
  });
};

// src/utils/ensure-generator.ts
async function ensureRepo(generator, {
  update,
  clone,
  registry
}) {
  if (!update && await pathExists(generator.path)) {
    return;
  }
  _chunkGL5SJIXUjs.spinner.start("Downloading repo");
  try {
    await downloadRepo(generator, {
      clone,
      outDir: generator.path
    });
    _chunkGL5SJIXUjs.spinner.stop();
    _chunkEOPTLNEQjs.logger.success("Downloaded repo");
  } catch (err) {
    let message = err.message;
    if (err.host && err.path) {
      message += "\n" + err.host + err.path;
    }
    throw new (0, _chunkGL5SJIXUjs.SAOError)(message);
  }
  const [hasConfig, hasPackageJson] = await Promise.all([
    generatorHasConfig(generator.path),
    pathExists(_path3.default.join(generator.path, "package.json"))
  ]);
  if (hasConfig && hasPackageJson) {
    await installPackages({
      cwd: generator.path,
      registry,
      installArgs: ["--production"]
    });
  }
}
async function ensureLocal(generator) {
  const exists = await pathExists(generator.path);
  if (!exists) {
    throw new (0, _chunkGL5SJIXUjs.SAOError)(`Directory ${_chunkEOPTLNEQjs.chalk.default.underline(generator.path)} does not exist`);
  }
}
async function ensurePackage(generator, {update, registry}) {
  const installPath = _path3.default.join(_chunkOP7ZF2FCjs.PACKAGES_CACHE_PATH, generator.hash);
  if (update || !await pathExists(generator.path)) {
    await _chunkN3M3HMMCjs.majo.outputFile(_path3.default.join(installPath, "package.json"), JSON.stringify({
      private: true
    }), "utf8");
    _chunkEOPTLNEQjs.logger.debug("Installing generator at", installPath);
    await installPackages({
      cwd: installPath,
      registry,
      packages: [`${generator.name}@${generator.version || "latest"}`]
    });
  }
}

// src/default-saofile.ts
var defautSaoFile = {
  templateDir: ".",
  actions: [
    {
      type: "add",
      files: "**"
    }
  ],
  async completed() {
    await this.gitInit();
    if (await this.hasOutputFile("package.json")) {
      await this.npmInstall();
    }
    this.showProjectTips();
  }
};

// src/utils/git-user.ts
var ini = _chunkEOPTLNEQjs.__toModule.call(void 0, require_ini());



var gitUser = null;
var getGitUser = (mock) => {
  if (gitUser)
    return gitUser;
  if (mock) {
    return {
      name: "MOCK_NAME",
      username: "MOCK_USERNAME",
      email: "mock@example.com"
    };
  }
  const filepath = _path3.default.join(_os2.default.homedir(), ".gitconfig");
  if (!_fs2.existsSync.call(void 0, filepath)) {
    return {name: "", username: "", email: ""};
  }
  const {user = {}} = ini.default.parse(_fs2.readFileSync.call(void 0, filepath, "utf8"));
  gitUser = {
    name: user.name || "",
    username: user.username || "",
    email: user.email || ""
  };
  return gitUser;
};

// src/cli-engine.ts
var cac = _chunkEOPTLNEQjs.__toModule.call(void 0, require_dist2());


var runByTsNode = __filename.includes("/sao/src/");

// src/index.ts
var EMPTY_ANSWERS = Symbol();
var EMPTY_DATA = Symbol();
var SAO = class {
  constructor(opts) {
    this.spinner = _chunkGL5SJIXUjs.spinner;
    this.colors = _chunkEOPTLNEQjs.chalk.default;
    this.logger = _chunkEOPTLNEQjs.logger;
    this._answers = EMPTY_ANSWERS;
    this._data = EMPTY_DATA;
    this.opts = {
      ...opts,
      outDir: _path3.default.resolve(opts.outDir || "."),
      logLevel: opts.logLevel || 3,
      mock: typeof opts.mock === "boolean" ? opts.mock : false
    };
    if (opts.debug) {
      this.opts.logLevel = 4;
    } else if (opts.quiet) {
      this.opts.logLevel = 1;
    }
    _chunkEOPTLNEQjs.logger.setOptions({
      logLevel: this.opts.logLevel,
      mock: this.opts.mock
    });
    if (this.opts.mock) {
      this.opts.outDir = _path3.default.join(_os.tmpdir.call(void 0, ), `sao-out/${Date.now()}/out`);
    }
    if (this.opts.mock && typeof this.opts.answers === "undefined") {
      this.opts.answers = true;
    }
    this.generatorList = _chunkOP7ZF2FCjs.generatorList;
    this.parsedGenerator = parseGenerator(this.opts.generator);
    if (this.parsedGenerator.subGenerator && !this.opts.mock) {
      _chunkEOPTLNEQjs.logger.debug(`Setting out directory to process.cwd() since it's a sub generator`);
      this.opts.outDir = process.cwd();
    }
  }
  async getGeneratorHelp() {
    const {config} = await this.getGenerator();
    let help = "";
    if (config.description) {
      help += `
${config.description}`;
    }
    return help;
  }
  async getGenerator(generator = this.parsedGenerator, hasParent) {
    if (generator.type === "repo") {
      await ensureRepo(generator, {
        update: this.opts.update,
        clone: this.opts.clone,
        registry: this.opts.registry
      });
    } else if (generator.type === "npm") {
      await ensurePackage(generator, this.opts);
    } else if (generator.type === "local") {
      await ensureLocal(generator);
    }
    if (!hasParent) {
      this.generatorList.add(generator);
    }
    _chunkEOPTLNEQjs.logger.debug(`Loaded generator from ${generator.path}`);
    const loaded = await loadGeneratorConfig(generator.path);
    const config = loaded.path && loaded.data ? loaded.data : defautSaoFile;
    if (!hasParent) {
      if (this.opts.updateCheck) {
        updateCheck({
          generator,
          checkGenerator: config.updateCheck !== false && generator.type === "npm",
          showNotifier: !this.opts.update
        });
      }
      _chunkPURBCYRPjs.store.set(`generators.${generator.hash}`, generator);
    }
    if (generator.subGenerator && config.subGenerators) {
      const subGenerator = config.subGenerators.find((g) => g.name === generator.subGenerator);
      if (subGenerator) {
        let generatorPath = subGenerator.generator;
        generatorPath = isLocalPath(generatorPath) ? _path3.default.resolve(generator.path, generatorPath) : resolve_from.default(generator.path, generatorPath);
        return this.getGenerator(parseGenerator(generatorPath), true);
      }
      throw new (0, _chunkGL5SJIXUjs.SAOError)(`No such sub generator in generator ${generator.path}`);
    }
    return {
      generator,
      config
    };
  }
  async runGenerator(generator, config) {
    if (config.description) {
      _chunkEOPTLNEQjs.logger.status("green", "Generator", config.description);
    }
    if (typeof config.prepare === "function") {
      await config.prepare.call(this, this);
    }
    if (config.prompts) {
      const {runPrompts} = await Promise.resolve().then(() => require("./run-prompts.js"));
      await runPrompts(config, this);
    } else {
      this._answers = {};
    }
    this._data = config.data ? config.data.call(this, this) : {};
    if (config.actions) {
      const {runActions} = await Promise.resolve().then(() => require("./run-actions.js"));
      await runActions(config, this);
    }
    if (!this.opts.mock && config.completed) {
      await config.completed.call(this, this);
    }
  }
  async run() {
    const {generator, config} = await this.getGenerator();
    await this.runGenerator(generator, config);
  }
  get answers() {
    if (typeof this._answers === "symbol") {
      throw new (0, _chunkGL5SJIXUjs.SAOError)(`You can't access \`.answers\` here`);
    }
    return this._answers;
  }
  set answers(value) {
    this._answers = value;
  }
  get data() {
    if (typeof this._data === "symbol") {
      throw new (0, _chunkGL5SJIXUjs.SAOError)(`You can't call \`.data\` here`);
    }
    return {
      ...this.answers,
      ...this._data
    };
  }
  get pkg() {
    try {
      return require(_path3.default.join(this.outDir, "package.json"));
    } catch (err) {
      return {};
    }
  }
  get gitUser() {
    return getGitUser(this.opts.mock);
  }
  get outDirName() {
    return _path3.default.basename(this.opts.outDir);
  }
  get outDir() {
    return this.opts.outDir;
  }
  get npmClient() {
    return getNpmClient();
  }
  gitInit() {
    if (this.opts.mock) {
      return;
    }
    const ps = cross_spawn3.default.sync("git", ["init"], {
      stdio: "ignore",
      cwd: this.outDir
    });
    if (ps.status === 0) {
      _chunkEOPTLNEQjs.logger.success("Initialized empty Git repository");
    } else {
      _chunkEOPTLNEQjs.logger.debug(`git init failed in ${this.outDir}`);
    }
  }
  async npmInstall(opts) {
    if (this.opts.mock) {
      return {code: 0};
    }
    return installPackages(Object.assign({
      registry: this.opts.registry,
      cwd: this.outDir
    }, opts));
  }
  showProjectTips() {
    _chunkGL5SJIXUjs.spinner.stop();
    _chunkEOPTLNEQjs.logger.success(`Generated into ${_chunkEOPTLNEQjs.chalk.default.underline(this.outDir)}`);
  }
  createError(message) {
    return new (0, _chunkGL5SJIXUjs.SAOError)(message);
  }
  async getOutputFiles() {
    const files = await majo2.glob(["**/*", "!**/node_modules/**", "!**/.git/**"], {
      cwd: this.opts.outDir,
      dot: true,
      onlyFiles: true
    });
    return files.sort();
  }
  async hasOutputFile(file) {
    return pathExists(_path3.default.join(this.opts.outDir, file));
  }
  async readOutputFile(file) {
    return _chunkN3M3HMMCjs.readFile.call(void 0, _path3.default.join(this.opts.outDir, file), "utf8");
  }
};








exports.join = _path2.join; exports.readFileSync = _fs2.readFileSync; exports.cac = cac; exports.runByTsNode = runByTsNode; exports.handleError = handleError; exports.SAO = SAO;
