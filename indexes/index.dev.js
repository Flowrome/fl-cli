#!/usr/bin/env node
const cli = require('../cli-creator');
const Config = require('../config');
const { ENVS } = require('../consts');

Config.updateEnv(ENVS.DEV);

cli.welcome().then(() => {
    cli.configurables(process.argv).then((array) => {
        array.forEach(function (val, index) {
            cli.decide(val, index, array);
        });
    });
});