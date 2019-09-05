const fs = require('fs');
const { getInstalledPathSync } = require('get-installed-path');
const { ENVS } = require('./consts');

module.exports = {
  env: ENVS.PROD,
  toReplace: /\[TMPL_NAME\]/g,
  appName: 'fl-stencil-cli',
  configurable: {
    molecule_prefix: 'fl',
    include_etoe: true,
    include_spec: true,
    include_md_reader: true
  },
  setConfigurable(configuration) {
    this.configurable = {
      ...this.configurable,
      ...configuration
    };
  },
  getConfigurableProp(path) {
    switch (this.env) {
      case ENVS.DEV:
        return this.configurable[path];
      case ENVS.PROD:
        const configurable = JSON.parse(fs.readFileSync('./fl-stencil-config.json', 'UTF-8'));
        return configurable.configuration[path];
    }
  },
  getConfigurable(isStartingProject = false) {
    switch (this.env) {
      case ENVS.DEV:
        return this.configurable;
      case ENVS.PROD:
        const configurable = isStartingProject
          ? { configuration: this.configurable }
          : JSON.parse(fs.readFileSync('./fl-stencil-config.json', 'UTF-8'));
        return configurable.configuration;
    }
  },
  installationPath() {
    switch (this.env) {
      case ENVS.DEV:
        return '.';
      case ENVS.PROD:
        return getInstalledPathSync(this.appName);
    }
  },
  moleculesPath() {
    switch (this.env) {
      case ENVS.DEV:
        return './prova-app/src/components/molecules';
      case ENVS.PROD:
        const config = JSON.parse(fs.readFileSync('./fl-stencil-config.json'));
        return config.paths.molecules;
    }
  },
  pagesPath() {
    switch (this.env) {
      case ENVS.DEV:
        return './prova-app/src/components/pages';
      case ENVS.PROD:
        const config = JSON.parse(fs.readFileSync('./fl-stencil-config.json'));
        return config.paths.pages;
    }
  },
  updateEnv(env = ENVS.PROD) {
    this.env = env;
  }
};
