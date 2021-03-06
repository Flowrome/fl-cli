const _ = require('lodash');
const Common = require('./common');
const Config = require('./config');

module.exports = {
  createMolecule(moleculeName) {
    if (Common.checkIfCurrentProjectIsFLProject()) {
      moleculeName = `${Config.getConfigurable().molecule_prefix}-${_.kebabCase(moleculeName)}`;
      moleculeNameClass = `${_.camelCase(moleculeName)
        .charAt(0)
        .toUpperCase() + _.camelCase(moleculeName).slice(1)}`;
      const moleculePath = `${Config.moleculesPath()}/${moleculeName}.molecule`;
      Common.createFolderSync(moleculePath);
      if (Config.getConfigurable().include_etoe) {
        Common.readTmplAndWrite(
          `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.e2e.ts.tmpl`,
          `${moleculePath}/${moleculeName}.molecule.e2e.ts`,
          moleculeName,
          'typescript'
        );
      }
      if (Config.getConfigurable().include_spec) {
        Common.readTmplAndWrite(
          `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.spec.ts.tmpl`,
          `${moleculePath}/${moleculeName}.molecule.spec.ts`,
          [moleculeName, moleculeNameClass],
          'typescript',
          [Config.toReplace, /\[TMPL_NAME\:CLASS_CASE\]/g]
        );
      }
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.tsx${
          Config.getConfigurable().include_md_reader ? '' : '[NO_MD_READER]'
        }.tmpl`,
        `${moleculePath}/${moleculeName}.molecule.tsx`,
        [moleculeName, moleculeNameClass],
        'typescript',
        [Config.toReplace, /\[TMPL_NAME\:CLASS_CASE\]/g]
      );
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.stories.js.tmpl`,
        `${moleculePath}/${moleculeName}.stories.js`,
        [moleculeName, moleculeNameClass],
        'babel',
        [Config.toReplace, /\[TMPL_NAME\:CLASS_CASE\]/g]
      );
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.scss.tmpl`,
        `${moleculePath}/${moleculeName}.molecule.scss`,
        moleculeName,
        'scss'
      );
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/molecule/tmpl-name.molecule.cssvars.scss.tmpl`,
        `${moleculePath}/${moleculeName}.molecule.cssvars.scss`,
        moleculeName,
        'scss'
      );
      Common.successMessage(`register component: ${moleculeName}`);
    }
  },
  createPage(pageName) {
    if (Common.checkIfCurrentProjectIsFLProject()) {
      pageName = `${_.kebabCase(pageName)}`;
      pageNameClass = `${_.camelCase(pageName)
        .charAt(0)
        .toUpperCase() + _.camelCase(pageName).slice(1)}`;
      const pagePath = `${Config.pagesPath()}/${pageName}.page`;
      Common.createFolderSync(pagePath);
      if (Config.getConfigurable().include_etoe) {
        Common.readTmplAndWrite(
          `${Config.installationPath()}/templates/page/tmpl-name.page.e2e.ts.tmpl`,
          `${pagePath}/${pageName}.page.e2e.ts`,
          pageName,
          'typescript'
        );
      }
      if (Config.getConfigurable().include_spec) {
        Common.readTmplAndWrite(
          `${Config.installationPath()}/templates/page/tmpl-name.page.spec.ts.tmpl`,
          `${pagePath}/${pageName}.page.spec.ts`,
          [pageName, pageNameClass],
          'typescript',
          [Config.toReplace, /\[TMPL_NAME:CLASS_CASE\]/g]
        );
      }
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/page/tmpl-name.page.tsx.tmpl`,
        `${pagePath}/${pageName}.page.tsx`,
        [pageName, pageNameClass],
        'typescript',
        [Config.toReplace, /\[TMPL_NAME:CLASS_CASE\]/g]
      );
      Common.readTmplAndWrite(
        `${Config.installationPath()}/templates/page/tmpl-name.page.scss.tmpl`,
        `${pagePath}/${pageName}.page.scss`,
        pageName,
        'scss'
      );
      Common.successMessage(`register component: ${pageName}`);
    }
  }
};
