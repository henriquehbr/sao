"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// node_modules/ansi-regex/index.js
var require_ansi_regex = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  module.exports = ({onlyFirst = false} = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? void 0 : "g");
  };
});

// node_modules/strip-ansi/index.js
var require_strip_ansi = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  "use strict";
  var ansiRegex = require_ansi_regex();
  module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
});



exports.require_strip_ansi = require_strip_ansi;
