#!/usr/bin/env node
const cli = require('../cli-creator');
const Config = require('../config');
const { ENVS } = require('../consts');

Config.updateEnv(ENVS.PROD);

if (process.argv[2] && process.argv[2] === 'project') {
    cli.configurables().then(() => {
        process.argv.forEach(function (val, index, array) {
            cli.decide(val, index, array);
        });
    })
} else {
    process.argv.forEach(function (val, index, array) {
        cli.decide(val, index, array);
    });
}