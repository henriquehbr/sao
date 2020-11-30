"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk2QKY56ANjs = require('../chunk.2QKY56AN.js');
require('../chunk.O6VIHJHZ.js');



var _chunkOP7ZF2FCjs = require('../chunk.OP7ZF2FC.js');


var _chunkO57BF5YNjs = require('../chunk.O57BF5YN.js');
require('../chunk.GL5SJIXU.js');
require('../chunk.PURBCYRP.js');
require('../chunk.A3G5L6QY.js');
require('../chunk.N3M3HMMC.js');



var _chunkEOPTLNEQjs = require('../chunk.EOPTLNEQ.js');

// node_modules/text-table/index.js
var require_text_table = _chunkEOPTLNEQjs.__commonJS.call(void 0, (exports, module) => {
  module.exports = function(rows_, opts) {
    if (!opts)
      opts = {};
    var hsep = opts.hsep === void 0 ? "  " : opts.hsep;
    var align = opts.align || [];
    var stringLength = opts.stringLength || function(s) {
      return String(s).length;
    };
    var dotsizes = reduce(rows_, function(acc, row) {
      forEach(row, function(c, ix) {
        var n = dotindex(c);
        if (!acc[ix] || n > acc[ix])
          acc[ix] = n;
      });
      return acc;
    }, []);
    var rows = map(rows_, function(row) {
      return map(row, function(c_, ix) {
        var c = String(c_);
        if (align[ix] === ".") {
          var index = dotindex(c);
          var size = dotsizes[ix] + (/\./.test(c) ? 1 : 2) - (stringLength(c) - index);
          return c + Array(size).join(" ");
        } else
          return c;
      });
    });
    var sizes = reduce(rows, function(acc, row) {
      forEach(row, function(c, ix) {
        var n = stringLength(c);
        if (!acc[ix] || n > acc[ix])
          acc[ix] = n;
      });
      return acc;
    }, []);
    return map(rows, function(row) {
      return map(row, function(c, ix) {
        var n = sizes[ix] - stringLength(c) || 0;
        var s = Array(Math.max(n + 1, 1)).join(" ");
        if (align[ix] === "r" || align[ix] === ".") {
          return s + c;
        }
        if (align[ix] === "c") {
          return Array(Math.ceil(n / 2 + 1)).join(" ") + c + Array(Math.floor(n / 2 + 1)).join(" ");
        }
        return c + s;
      }).join(hsep).replace(/\s+$/, "");
    }).join("\n");
  };
  function dotindex(c) {
    var m = /\.[^.]*$/.exec(c);
    return m ? m.index + 1 : c.length;
  }
  function reduce(xs, f, init) {
    if (xs.reduce)
      return xs.reduce(f, init);
    var i = 0;
    var acc = arguments.length >= 3 ? init : xs[i++];
    for (; i < xs.length; i++) {
      f(acc, xs[i], i);
    }
    return acc;
  }
  function forEach(xs, f) {
    if (xs.forEach)
      return xs.forEach(f);
    for (var i = 0; i < xs.length; i++) {
      f.call(xs, xs[i], i);
    }
  }
  function map(xs, f) {
    if (xs.map)
      return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f.call(xs, xs[i], i));
    }
    return res;
  }
});

// src/cmd/main.ts
var text_table = _chunkEOPTLNEQjs.__toModule.call(void 0, require_text_table());
var main = (cli) => async (generator, outDir) => {
  if (cli.options.help) {
    cli.outputHelp();
    return;
  }
  if (!generator) {
    const generatorsMap = _chunkOP7ZF2FCjs.generatorList.groupedGenerators;
    if (generatorsMap.size === 0) {
      cli.outputHelp();
      return;
    }
    const {name, version} = await _chunkO57BF5YNjs.prompt.call(void 0, [
      {
        name: "name",
        type: "select",
        message: "Select a generator to run",
        choices: [...generatorsMap.keys()]
      },
      {
        name: "version",
        type: "select",
        message: "Found multiple versions, select one",
        default: "latest",
        skip({answers: {name: name2}}) {
          const generators = generatorsMap.get(name2);
          return !generators || generators.length < 2;
        },
        choices({answers: {name: name2}}) {
          var _a;
          return ((_a = generatorsMap.get(name2)) == null ? void 0 : _a.map((g) => g.version)) || [];
        }
      }
    ]);
    const matched = name && generatorsMap.get(name);
    if (matched) {
      const actualVersion = version || matched[0].version;
      return main(cli)(`${name}${["latest", "master"].includes(actualVersion) ? "" : `@${actualVersion}`}`, outDir);
    }
    return;
  }
  const options = {
    generator,
    outDir: outDir || ".",
    updateCheck: true,
    answers: cli.options.yes ? true : cli.options.answers,
    ...cli.options
  };
  try {
    const sao = new (0, _chunk2QKY56ANjs.SAO)(options);
    const g = sao.parsedGenerator;
    if (cli.options.help) {
      const {config} = await sao.getGenerator();
      const prompts = typeof config.prompts === "function" ? await config.prompts.call(sao, sao) : config.prompts;
      const answerFlags = prompts && text_table.default(prompts.map((prompt3) => {
        return [
          `  --answers.${prompt3.name}${prompt3.type === "confirm" ? "" : ` <value>`}`,
          `${prompt3.message}`
        ];
      }));
      cli.globalCommand.helpCallback = (sections) => {
        sections = sections.map((section) => {
          if (section.title === "Usage") {
            section.body = section.body.replace("<generator>", g.type === "local" ? g.path : g.type === "npm" ? g.name.replace("sao-", "") : _chunkOP7ZF2FCjs.getRepoGeneratorName.call(void 0, g));
          }
          if (section.title === "Options") {
            section.title = "Shared Options";
            section.body = section.body.replace(/^\s+--answers\.\*[^\n]+\n/m, "");
          }
          return section;
        }).filter((section) => {
          return section.title !== "Commands" && section.title !== "For more info, run any command with the `--help` flag";
        });
        if (answerFlags) {
          sections.push({
            title: "Generator Options",
            body: answerFlags
          });
        }
        sections.push({
          title: `Tips`,
          body: `  Prefix an option with '--no-' to set the value to 'false'.
  e.g. --no-answers.unitTest`
        });
        return sections;
      };
      cli.outputHelp();
    } else {
      await sao.run();
    }
  } catch (error2) {
    _chunk2QKY56ANjs.handleError.call(void 0, error2);
  }
};


exports.main = main;
