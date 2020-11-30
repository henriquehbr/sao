"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkO6VIHJHZjs = require('../chunk.O6VIHJHZ.js');


var _chunkPURBCYRPjs = require('../chunk.PURBCYRP.js');
require('../chunk.EOPTLNEQ.js');

// src/cmd/get-alias.ts
var getAlias = (cli) => async (name) => {
  if (cli.options.help) {
    cli.outputHelp();
    return;
  }
  console.log(_chunkPURBCYRPjs.store.get(`alias.${_chunkO6VIHJHZjs.escapeDots.call(void 0, name)}`));
};


exports.getAlias = getAlias;
