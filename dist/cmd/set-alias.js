"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkO6VIHJHZjs = require('../chunk.O6VIHJHZ.js');


var _chunkPURBCYRPjs = require('../chunk.PURBCYRP.js');


var _chunkEOPTLNEQjs = require('../chunk.EOPTLNEQ.js');

// src/cmd/set-alias.ts
var setAlias = () => async (name, value) => {
  _chunkPURBCYRPjs.store.set(`alias.${_chunkO6VIHJHZjs.escapeDots.call(void 0, name)}`, value);
  _chunkEOPTLNEQjs.logger.success(`Added alias '${name}'`);
};


exports.setAlias = setAlias;
