"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkO57BF5YNjs = require('./chunk.O57BF5YN.js');


var _chunkGL5SJIXUjs = require('./chunk.GL5SJIXU.js');


var _chunkPURBCYRPjs = require('./chunk.PURBCYRP.js');
require('./chunk.A3G5L6QY.js');



var _chunkEOPTLNEQjs = require('./chunk.EOPTLNEQ.js');

// src/run-prompts.ts
var resolve_from = _chunkEOPTLNEQjs.__toModule.call(void 0, _chunkGL5SJIXUjs.require_resolve_from.call(void 0, ));
var runPrompts = async (config, context) => {
  const prompts = typeof config.prompts === "function" ? await config.prompts.call(context, context) : config.prompts;
  if (!prompts || prompts.length === 0) {
    context.answers = {};
    return;
  }
  const pkgPath = resolve_from.default.silent(context.parsedGenerator.path, "./package.json");
  const pkgVersion = pkgPath ? require(pkgPath).version : "";
  const STORED_ANSWERS_ID = `answers.${context.parsedGenerator.hash + "__npm__" + pkgVersion.replace(/\./g, "\\.")}`;
  const storedAnswers = _chunkPURBCYRPjs.store.get(STORED_ANSWERS_ID) || {};
  const {mock} = context.opts;
  if (!mock) {
    _chunkEOPTLNEQjs.logger.debug("Reusing cached answers:", storedAnswers);
  }
  if (context.opts.answers === true) {
    _chunkEOPTLNEQjs.logger.warn(`The yes flag has been set. This will automatically answer default value to all questions, which may have security implications.`);
  }
  const answers = await _chunkO57BF5YNjs.prompt.call(void 0, prompts, context.opts.answers, context.opts.mock);
  _chunkEOPTLNEQjs.logger.debug(`Retrived answers:`, answers);
  const answersToStore = {};
  for (const p of prompts) {
    if (!Object.prototype.hasOwnProperty.call(answers, p.name)) {
      answers[p.name] = void 0;
    }
    if (p.store) {
      answersToStore[p.name] = answers[p.name];
    }
  }
  if (!mock) {
    _chunkPURBCYRPjs.store.set(STORED_ANSWERS_ID, answersToStore);
    _chunkEOPTLNEQjs.logger.debug("Cached prompt answers:", answersToStore);
  }
  context.answers = answers;
};


exports.runPrompts = runPrompts;
