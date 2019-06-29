const ncp = require('ncp');
const _ = require('lodash');
const shell = require('shelljs');
const Spinner = require('cli-spinner').Spinner;
const log = require('./log');
const Common = require('./common');
const Config = require('./config');

module.exports = {
    createProject(appName) {
        if (!appName) {
            Common.exitWithError('You have not inserted the app name');
        }
        const appPath = `./${appName}`;
        Common.createFolderSync(appPath);
        this.startProjectStructure(appName);
        this.copyStencilFiles(appName).then(() => {
            this.createApp(appName);

            log.cwarn('INSTALLING DEPENDENCIES');
            
            const spinner = new Spinner('installing... %s');
            spinner.setSpinnerString('|/-\\');
            spinner.start();

            shell.cd(appPath);
            shell.exec('npm i', null, () => {
                spinner.stop();
                shell.cd('../');
                log.cwarn('FINISHED INSTALLING DEPENDENCIES');
            })
        });
    },
    startProjectStructure(appName) {
        const appPath = `./${appName}`;
        Common.createFolderSync(`${appPath}/src/components/app`);
        Common.createFolderSync(`${appPath}/src/assets/fonts`);
        Common.createFolderSync(`${appPath}/src/assets/images`, false);
        Common.createFolderSync(`${appPath}/src/assets/mocks`, false);
        Common.createFolderSync(`${appPath}/src/styles`, false);
        Common.createFolderSync(`${appPath}/src/utils`, false);
    },
    copyStencilFiles(appName) {
        const appPath = `./${appName}`;
        const promise = Promise.all([
            new Promise((resolve, reject) => ncp(`${Config.installationPath()}/to-copy/src/styles`, `${appPath}/src/styles`, (err) => (err ? reject(err) : resolve()))),
            new Promise((resolve, reject) => ncp(`${Config.installationPath()}/to-copy/src/assets`, `${appPath}/src/assets`, (err) => (err ? reject(err) : resolve()))),
        ])
        return promise.then(() => {
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/src/components.d.ts.tmpl`, `${appPath}/src/components.d.ts`, '', 'typescript')
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/src/index.ts.tmpl`, `${appPath}/src/index.ts`, '', 'typescript')
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/src/index.html.tmpl`, `${appPath}/src/index.html`, _.kebabCase(appName), 'html')

            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/package.json.tmpl`, `${appPath}/package.json`, _.kebabCase(appName), 'json');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/stencil.config.ts.tmpl`, `${appPath}/stencil.config.ts`, _.kebabCase(appName), 'typescript');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/LICENSE.tmpl`, `${appPath}/LICENSE`, '');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/readme.md.tmpl`, `${appPath}/readme.md`, '', 'markdown');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/tsconfig.json.tmpl`, `${appPath}/tsconfig.json`, '', 'json');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/.editorconfig.tmpl`, `${appPath}/.editorconfig`, '');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/fl-stencil-config.json.tmpl`, `${appPath}/fl-stencil-config.json`, _.kebabCase(appName), 'json');
            Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/fl-stencil-md-reader.js.tmpl`, `${appPath}/fl-stencil-md-reader.js`, '', 'babel');
            Common.successMessage('copied succsesfully stencil files');
        }).catch((error) => {
            Common.exitWithError(error);
        });
    },
    createApp(appName) {
        const appPath = `./${appName}`;
        Common.readTmplAndWrite(`${Config.installationPath()}/templates/app/app.e2e.ts.tmpl`, `${appPath}/src/components/app/app.e2e.ts`, '', 'typescript');
        Common.readTmplAndWrite(`${Config.installationPath()}/templates/app/app.tsx.tmpl`, `${appPath}/src/components/app/app.tsx`, '', 'typescript');
        Common.readTmplAndWrite(`${Config.installationPath()}/templates/app/app.scss.tmpl`, `${appPath}/src/components/app/app.scss`, '', 'scss');
        Common.successMessage('register app');
    }
}