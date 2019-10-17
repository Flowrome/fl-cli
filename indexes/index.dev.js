#!/usr/bin/env node
const cli = require('../cli-creator');
const Config = require('../config');
const { ENVS } = require('../consts');

Config.updateEnv(ENVS.DEV);

(async () => {
  cli.welcome();
  const array = await cli.configurables(process.argv);
  array.forEach(function(val, index) {
    cli.decide(val, index, array);
  });
})();