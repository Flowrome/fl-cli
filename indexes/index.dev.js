#!/usr/bin/env node
const cli = require('../cli-creator');
const Config = require('../config');
const { ENVS } = require('../consts');

Config.updateEnv(ENVS.DEV);

process.argv.forEach(function (val, index, array) {
    cli.decide(val, index, array);
});