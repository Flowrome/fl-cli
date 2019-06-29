const fs = require('fs');
const prettier = require('prettier');
const { getInstalledPathSync } = require('get-installed-path');
const { ENVS } = require('./consts');

const prettyOpts = (parser) => ({
    arrowParens: 'avoid',
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    parser: parser,
    printWidth: 80,
    proseWrap: 'preserve',
    requirePragma: false,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false
});

module.exports = {
    env: ENVS.PROD,
    toReplace: /\[TMPL_NAME\]/g,
    appName: 'fl-stencil-cli',
    configurable: {
        molecule_prefix: 'fl'
    },
    setConfigurable(configuration) {
        this.configurable = {
            ...this.configurable,
            ...configuration
        }
    },
    setConfigurableLocal(configuration) {
        const config = JSON.parse(fs.readFileSync('./fl-stencil-config.json'));
        config.configuration = {
            ...this.configurable,
            ...configuration
        };
        fs.writeFileSync('./fl-stencil-config.json', prettier.format(JSON.stringify(config), prettyOpts('json')));
    },
    getConfigurable(path) {
        switch (this.env) {
            case ENVS.DEV:
                return this.configurable[path];
            case ENVS.PROD:
                const configurable = JSON.parse(fs.readFileSync('./fl-stencil-config.json'));
                return configurable.configuration[path];
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
}