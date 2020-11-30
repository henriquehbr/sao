"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkOP7ZF2FCjs = require('../chunk.OP7ZF2FC.js');
require('../chunk.A3G5L6QY.js');
require('../chunk.EOPTLNEQ.js');

// src/cmd/utils.ts
function printGenerators() {
  const table = new _chunkOP7ZF2FCjs.cli_table3.default({
    head: ["Name", "Versions"]
  });
  for (const [name, generators] of _chunkOP7ZF2FCjs.generatorList.groupedGenerators) {
    table.push([name, generators.map((g) => `${g.version}`).join(", ")]);
  }
  console.log(table.toString());
}

// src/cmd/list.ts
var list = () => () => {
  printGenerators();
};


exports.list = list;
