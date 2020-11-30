"use strict";Object.defineProperty(exports, "__esModule", {value: true});






var _chunk2QKY56ANjs = require('./chunk.2QKY56AN.js');
require('./chunk.O6VIHJHZ.js');


var _chunkOP7ZF2FCjs = require('./chunk.OP7ZF2FC.js');
require('./chunk.GL5SJIXU.js');


var _chunkPURBCYRPjs = require('./chunk.PURBCYRP.js');
require('./chunk.A3G5L6QY.js');
require('./chunk.N3M3HMMC.js');
require('./chunk.EOPTLNEQ.js');

// src/cli-engine.ts
async function runCLI() {
  var _a;
  const bin = _chunk2QKY56ANjs.runByTsNode ? "yarn sao" : "sao";
  const cli = _chunk2QKY56ANjs.cac.default(bin);
  cli.command("[generator] [outDir]", "Run a generator").action((generator, outDir) => Promise.resolve().then(() => require("./cmd/main.js")).then((res) => res.main(cli)(generator, outDir))).option("--npm-client <client>", `Use a specific npm client ('yarn' | 'npm' | 'pnpm')`).option("-u, --update", "Update cached generator").option("-c, --clone", "Clone repository instead of archive download").option("-y, --yes", "Use the default value for all prompts").option("--registry <registry>", "Use a custom registry for package manager").option("--answers.* [value]", "Skip specific prompt and use provided answer instead").option("--debug", "Display debug logs").option("--version", "Display SAO version").option("-h, --help", "Display CLI usages");
  cli.command("set-alias <name> <value>", "Set an alias for a generator path").option("-h, --help", "Display CLI usages").action((name, value) => Promise.resolve().then(() => require("./cmd/set-alias.js")).then((res) => res.setAlias()(name, value)));
  cli.command("get-alias <name>", "Get the generator for an alias").option("-h, --help", "Display CLI usages").action((name) => Promise.resolve().then(() => require("./cmd/get-alias.js")).then((res) => res.getAlias(cli)(name)));
  cli.command("list", "List all downloaded generators").option("-h, --help", "Display CLI usages").action(() => Promise.resolve().then(() => require("./cmd/list.js")).then((res) => res.list()()));
  cli.parse(process.argv, {run: false});
  if (cli.options.version && cli.args.length === 0) {
    const pkg = JSON.parse(_chunk2QKY56ANjs.readFileSync.call(void 0, _chunk2QKY56ANjs.join.call(void 0, __dirname, "../package.json"), "utf8"));
    console.log(`sao: ${pkg.version}`);
    console.log(`node: ${process.versions.node}`);
    console.log(`os: ${process.platform}`);
  } else if (((_a = cli.matchedCommand) == null ? void 0 : _a.name) !== "" && cli.options.help) {
    cli.outputHelp();
  } else {
    await cli.runMatchedCommand();
  }
}






exports.SAO = _chunk2QKY56ANjs.SAO; exports.generatorList = _chunkOP7ZF2FCjs.generatorList; exports.handleError = _chunk2QKY56ANjs.handleError; exports.runCLI = runCLI; exports.store = _chunkPURBCYRPjs.store;
