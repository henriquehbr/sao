"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// node_modules/env-paths/index.js
var require_env_paths = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var path2 = require("path");
  var os = require("os");
  var homedir = os.homedir();
  var tmpdir = os.tmpdir();
  var {env} = process;
  var macos = (name) => {
    const library = path2.join(homedir, "Library");
    return {
      data: path2.join(library, "Application Support", name),
      config: path2.join(library, "Preferences", name),
      cache: path2.join(library, "Caches", name),
      log: path2.join(library, "Logs", name),
      temp: path2.join(tmpdir, name)
    };
  };
  var windows = (name) => {
    const appData = env.APPDATA || path2.join(homedir, "AppData", "Roaming");
    const localAppData = env.LOCALAPPDATA || path2.join(homedir, "AppData", "Local");
    return {
      data: path2.join(localAppData, name, "Data"),
      config: path2.join(appData, name, "Config"),
      cache: path2.join(localAppData, name, "Cache"),
      log: path2.join(localAppData, name, "Log"),
      temp: path2.join(tmpdir, name)
    };
  };
  var linux = (name) => {
    const username = path2.basename(homedir);
    return {
      data: path2.join(env.XDG_DATA_HOME || path2.join(homedir, ".local", "share"), name),
      config: path2.join(env.XDG_CONFIG_HOME || path2.join(homedir, ".config"), name),
      cache: path2.join(env.XDG_CACHE_HOME || path2.join(homedir, ".cache"), name),
      log: path2.join(env.XDG_STATE_HOME || path2.join(homedir, ".local", "state"), name),
      temp: path2.join(tmpdir, username, name)
    };
  };
  var envPaths2 = (name, options) => {
    if (typeof name !== "string") {
      throw new TypeError(`Expected string, got ${typeof name}`);
    }
    options = Object.assign({suffix: "nodejs"}, options);
    if (options.suffix) {
      name += `-${options.suffix}`;
    }
    if (process.platform === "darwin") {
      return macos(name);
    }
    if (process.platform === "win32") {
      return windows(name);
    }
    return linux(name);
  };
  module.exports = envPaths2;
  module.exports.default = envPaths2;
});

// node_modules/dot-prop/node_modules/is-obj/index.js
var require_is_obj = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = (value) => {
    const type = typeof value;
    return value !== null && (type === "object" || type === "function");
  };
});

// node_modules/dot-prop/index.js
var require_dot_prop = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var isObj = require_is_obj();
  var disallowedKeys = [
    "__proto__",
    "prototype",
    "constructor"
  ];
  var isValidPath = (pathSegments) => !pathSegments.some((segment) => disallowedKeys.includes(segment));
  function getPathSegments(path2) {
    const pathArray = path2.split(".");
    const parts = [];
    for (let i = 0; i < pathArray.length; i++) {
      let p = pathArray[i];
      while (p[p.length - 1] === "\\" && pathArray[i + 1] !== void 0) {
        p = p.slice(0, -1) + ".";
        p += pathArray[++i];
      }
      parts.push(p);
    }
    if (!isValidPath(parts)) {
      return [];
    }
    return parts;
  }
  module.exports = {
    get(object, path2, value) {
      if (!isObj(object) || typeof path2 !== "string") {
        return value === void 0 ? object : value;
      }
      const pathArray = getPathSegments(path2);
      if (pathArray.length === 0) {
        return;
      }
      for (let i = 0; i < pathArray.length; i++) {
        if (!Object.prototype.propertyIsEnumerable.call(object, pathArray[i])) {
          return value;
        }
        object = object[pathArray[i]];
        if (object === void 0 || object === null) {
          if (i !== pathArray.length - 1) {
            return value;
          }
          break;
        }
      }
      return object;
    },
    set(object, path2, value) {
      if (!isObj(object) || typeof path2 !== "string") {
        return object;
      }
      const root = object;
      const pathArray = getPathSegments(path2);
      for (let i = 0; i < pathArray.length; i++) {
        const p = pathArray[i];
        if (!isObj(object[p])) {
          object[p] = {};
        }
        if (i === pathArray.length - 1) {
          object[p] = value;
        }
        object = object[p];
      }
      return root;
    },
    delete(object, path2) {
      if (!isObj(object) || typeof path2 !== "string") {
        return;
      }
      const pathArray = getPathSegments(path2);
      for (let i = 0; i < pathArray.length; i++) {
        const p = pathArray[i];
        if (i === pathArray.length - 1) {
          delete object[p];
          return;
        }
        object = object[p];
        if (!isObj(object)) {
          return;
        }
      }
    },
    has(object, path2) {
      if (!isObj(object) || typeof path2 !== "string") {
        return false;
      }
      const pathArray = getPathSegments(path2);
      if (pathArray.length === 0) {
        return false;
      }
      for (let i = 0; i < pathArray.length; i++) {
        if (isObj(object)) {
          if (!(pathArray[i] in object)) {
            return false;
          }
          object = object[pathArray[i]];
        } else {
          return false;
        }
      }
      return true;
    }
  };
});

// src/store.ts
var env_paths = _chunkEOPTLNEQjs.__toModule.call(void 0, require_env_paths());
var dot_prop = _chunkEOPTLNEQjs.__toModule.call(void 0, require_dot_prop());
var _path = require('path');
var _fs = require('fs');
var configDir = env_paths.default("sao").config;
var storePath = _path.join.call(void 0, configDir, "config.json");
_chunkEOPTLNEQjs.logger.debug("Store path:", storePath);
try {
  _fs.mkdirSync.call(void 0, configDir, {recursive: true});
} catch (error) {
  console.error(error);
}
var Store = class {
  constructor() {
    this.data = this.read();
  }
  read() {
    try {
      return JSON.parse(_fs.readFileSync.call(void 0, storePath, "utf8"));
    } catch (_) {
      return {};
    }
  }
  set(key, value) {
    dot_prop.default.set(this.data, key, value);
    _fs.writeFileSync.call(void 0, storePath, JSON.stringify(this.data), "utf8");
  }
  get(key) {
    return dot_prop.default.get(this.data, key);
  }
};
var store = new Store();



exports.store = store;
