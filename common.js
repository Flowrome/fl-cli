const fs = require('fs');
const prettier = require('prettier');
const _ = require('lodash');
const log = require('./log');
const Config = require('./config');
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

    createFolderSync(path, recursive = true) {
        if (!path) {
            console.error('[ERROR] - no path inserted')
            return
        }
        if (recursive) {
            let currPath = '.';
            path.split('/').map((p, index) => {
                if (index !== 0) {
                    currPath = `${currPath}/${p}`;
                    if (!fs.existsSync(currPath)) {
                        fs.mkdirSync(currPath);
                    }
                }
            });
        } else {
            fs.mkdirSync(path);
        }
    },
    exitWithError(...errors) {
        log.cerror(`[FATAL-ERROR] - EXITING - ${errors.join('\n')}`);
        process.exit();
    },
    successMessage(...success) {
        log.clog(`[SUCCESS] - ${success.join('\n')}`);
    },
    readTmplAndWrite(toRead, toWrite, whatToOverwrite, prettyType, whatToLookFor) {
        if (!Array.isArray(whatToLookFor)) {
            whatToLookFor = !!whatToLookFor || Config.toReplace;
        }
        const tmplPath = `${toRead.indexOf(Config.installationPath()) === 0 ? '' : `${Config.installationPath()}/`}${toRead}`;
        const tmpl = fs.readFileSync(tmplPath, 'UTF-8');
        const appPath = `${toWrite.indexOf('./') === 0 ? '' : './'}${toWrite}`;
        let appContent = tmpl;

        if (Array.isArray(whatToLookFor) && Array.isArray(whatToOverwrite)) {
            whatToLookFor.map((repl, index) => {
                appContent = appContent.replace(repl, whatToOverwrite[index]);
            });
        } else {
            appContent = appContent.replace(whatToLookFor, whatToOverwrite);
        }

        fs.writeFileSync(appPath, (prettyType) ? prettier.format(appContent, prettyOpts(prettyType)) : appContent);

        this.successMessage(`write from template ${toRead} to ${appPath}`);
    },
    checkIfCurrentProjectIsFLProject() {
        if (Config.env === ENVS.DEV) {
            return true;
        }
        if (fs.existsSync('./fl-stencil-config.json')) {
            return true;
        }
        this.exitWithError('You\'re not in a fl-project, start one with flcli project [PROJECT-NAME]')
    }
}