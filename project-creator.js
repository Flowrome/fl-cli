const ncp = require('ncp');
const _ = require('lodash');
const shell = require('shelljs');
const Spinner = require('cli-spinner').Spinner;
const log = require('./log');
const Common = require('./common');
const Config = require('./config');
const { ENVS } = require('./consts');

module.exports = {
  createProject(appName) {
    if (!appName) {
      Common.exitWithError('You have not inserted the app name');
    }
    const appPath = `./${appName}`;
    Common.createFolderSync(appPath);
    this.startProjectStructure(appName);
    this.copyStencilFiles(appName).then(() => {
      shell.cd(appPath);

      this.createApp(appName);
      if (Config.getConfigurable().include_md_reader) {
        this.createMarkdownReader(appName);
      }
      this.createWelcomePage(appName);

      log.cwarn('INSTALLING DEPENDENCIES');

      const spinner = new Spinner('installing... %s');
      spinner.setSpinnerString('|/-\\');
      spinner.start();

      shell.exec('npm i', null, () => {
        shell.exec('git init', null, () => {
          spinner.setSpinnerTitle('updating readmes... %s');
          shell.exec('npm run readme', null, () => {
            spinner.stop();
            shell.cd('../');
            log.cwarn('FINISHED INSTALLING DEPENDENCIES AND GIT INITIALIZATION');
          });
        });
      });
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
    Common.createFolderSync(`${appPath}/src/envs`, false);
  },
  copyStencilFiles(appName) {
    const appPath = `./${appName}`;

    Common.readTmplAndWrite(
      `${Config.installationPath()}/to-copy/fl-stencil-config.json.tmpl`,
      `${appPath}/fl-stencil-config.json`,
      [_.kebabCase(appName), JSON.stringify(Config.configurable)],
      'json',
      [Config.toReplace, /\[TMPL_CONFIGURATION\]/g]
    );
    if (Config.getConfigurable(true).include_md_reader) {
      Common.readTmplAndWrite(
        `${Config.installationPath()}/to-copy/fl-stencil-md-reader.js.tmpl`,
        `${appPath}/fl-stencil-md-reader.js`,
        '',
        'babel'
      );
    }
    Common.readTmplAndWrite(
      `${Config.installationPath()}/to-copy/fl-stencil-env-chooser.js.tmpl`,
      `${appPath}/fl-stencil-env-chooser.js`,
      '',
      'babel'
    );

    Common.readTmplAndWrite(
      `${Config.installationPath()}/to-copy/fl-dynamic-builds.js.tmpl`,
      `${appPath}/fl-dynamic-builds.js`,
      '',
      'babel'
    );

    Common.readTmplAndWrite(
      `${Config.installationPath()}/to-copy/fl-css-component-importer.js.tmpl`,
      `${appPath}/fl-css-component-importer.js`,
      '',
      'babel'
    );

    const promise = Promise.all([
      new Promise((resolve, reject) =>
        ncp(`${Config.installationPath()}/to-copy/src/styles`, `${appPath}/src/styles`, err =>
          err ? reject(err) : resolve()
        )
      ),
      new Promise((resolve, reject) =>
        ncp(`${Config.installationPath()}/to-copy/src/assets`, `${appPath}/src/assets`, err =>
          err ? reject(err) : resolve()
        )
      ),
      new Promise((resolve, reject) =>
        ncp(`${Config.installationPath()}/to-copy/envs`, `${appPath}/src/envs`, err => (err ? reject(err) : resolve()))
      )
    ]);
    return promise
      .then(() => {
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/src/components.d.ts.tmpl`,
          `${appPath}/src/components.d.ts`,
          '',
          'typescript'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/src/index.ts.tmpl`,
          `${appPath}/src/index.ts`,
          '',
          'typescript'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/src/index.html.tmpl`,
          `${appPath}/src/index.html`,
          _.kebabCase(appName),
          'html'
        );

        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/package.json${
            Config.getConfigurable(true).include_md_reader ? '' : '[NO_MD_READER]'
          }.tmpl`,
          `${appPath}/package.json`,
          _.kebabCase(appName),
          'json'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/stencil.config.ts.tmpl`,
          `${appPath}/stencil.config.ts`,
          _.kebabCase(appName),
          'typescript'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/stencil.config.output-targets.json.tmpl`,
          `${appPath}/stencil.config.output-targets.json`
        );
        Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/LICENSE.tmpl`, `${appPath}/LICENSE`, '');
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/readme.md.tmpl`,
          `${appPath}/readme.md`,
          '',
          'markdown'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/tsconfig.json.tmpl`,
          `${appPath}/tsconfig.json`,
          '',
          'json'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/tslint.json.tmpl`,
          `${appPath}/tslint.json`,
          '',
          'json'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/.prettierrc.tmpl`,
          `${appPath}/.prettierrc`,
          '',
          'json'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/.editorconfig.tmpl`,
          `${appPath}/.editorconfig`,
          ''
        );
        Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/.gitignore.tmpl`, `${appPath}/.gitignore`, '');
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/fl-bundler.js.tmpl`,
          `${appPath}/fl-bundler.js`,
          '',
          'babel'
        );
        Common.readTmplAndWrite(`${Config.installationPath()}/to-copy/bundles.ts.tmpl`, `${appPath}/bundles.ts`, '');
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/fl-css-theme-builder.js.tmpl`,
          `${appPath}/fl-css-theme-builder.js`,
          '',
          'babel'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/.storybook/main.js.tmpl`,
          `${appPath}/.storybook/main.js`,
          _.kebabCase(appName),
          'babel'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/.storybook/stories-compiler.js.tmpl`,
          `${appPath}/.storybook/stories-compiler.js`,
          '',
          'babel'
        );
        Common.readTmplAndWrite(
          `${Config.installationPath()}/to-copy/.storybook/config.js.tmpl`,
          `${appPath}/.storybook/config.js`,
          _.kebabCase(appName),
          'babel'
        );
        Common.successMessage('copied succsesfully stencil files');
      })
      .catch(error => {
        Common.exitWithError(error);
      });
  },
  createApp() {
    const appPath = `./`;
    if (Config.getConfigurable().include_etoe) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/app/app.e2e.ts.tmpl`,
        `${appPath}/src/components/app/app.e2e.ts`,
        '',
        'typescript'
      );
    }
    if (Config.getConfigurable().include_spec) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/app/app.spec.ts.tmpl`,
        `${appPath}/src/components/app/app.spec.ts`,
        '',
        'typescript'
      );
    }
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/app/app.tsx${
        Config.getConfigurable().include_md_reader ? '' : '[NO_MD_READER]'
      }.tmpl`,
      `${appPath}/src/components/app/app.tsx`,
      '',
      'typescript'
    );
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/app/app.scss.tmpl`,
      `${appPath}/src/components/app/app.scss`,
      '',
      'scss'
    );
    Common.successMessage('register app');
  },
  createMarkdownReader() {
    const appPath = `./`;
    Common.createFolderSync(`${appPath}/src/components/markdown-reader`);
    if (Config.getConfigurable().include_etoe) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/markdown-reader/markdown-reader.e2e.ts.tmpl`,
        `${appPath}/src/components/markdown-reader/markdown-reader.e2e.ts`,
        '',
        'typescript'
      );
    }
    if (Config.getConfigurable().include_spec) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/markdown-reader/markdown-reader.spec.ts.tmpl`,
        `${appPath}/src/components/markdown-reader/markdown-reader.spec.ts`,
        '',
        'typescript'
      );
    }
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/markdown-reader/markdown-reader.tsx.tmpl`,
      `${appPath}/src/components/markdown-reader/markdown-reader.tsx`,
      '',
      'typescript'
    );
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/markdown-reader/markdown-reader.scss.tmpl`,
      `${appPath}/src/components/markdown-reader/markdown-reader.scss`,
      '',
      'scss'
    );
    Common.successMessage('register markdown-page');
  },
  createWelcomePage() {
    const appPath = `./`;
    Common.createFolderSync(`${appPath}/src/components/page/welcome.page`);
    if (Config.getConfigurable().include_etoe) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/welcome.page/welcome.page.e2e.ts.tmpl`,
        `${appPath}/src/components/page/welcome.page/welcome.page.e2e.ts`,
        '',
        'typescript'
      );
    }
    if (Config.getConfigurable().include_spec) {
      Common.readTmplAndWrite(
        `${Config.installationPath(Config.env === ENVS.DEV)}/templates/welcome.page/welcome.page.spec.ts.tmpl`,
        `${appPath}/src/components/page/welcome.page/welcome.page.spec.ts`,
        '',
        'typescript'
      );
    }
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/welcome.page/welcome.page.tsx.tmpl`,
      `${appPath}/src/components/page/welcome.page/welcome.page.tsx`,
      '',
      'typescript'
    );
    Common.readTmplAndWrite(
      `${Config.installationPath(Config.env === ENVS.DEV)}/templates/welcome.page/welcome.page.scss.tmpl`,
      `${appPath}/src/components/page/welcome.page/welcome.page.scss`,
      '',
      'scss'
    );
    Common.successMessage('register welcome-page');
  }
};
