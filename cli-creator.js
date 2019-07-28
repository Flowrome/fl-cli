const Common = require('./common');
const Config = require('./config');
const log = require('./log');
const ProjectCreator = require('./project-creator');
const ComponentsCreator = require('./components-creator');
const prompt = require('prompt');

module.exports = {
  welcome() {
    return Promise.resolve().then(() => {
      log.cwelcome();
    })
  },
  configurables(array) {
    const promise = new Promise((resolve, reject) => {
      const ynRegex = /^([Y|y]([E|e][S|s])?|[N|n]([O|o])?)+$/
      const scheme = [
        ((array.length < 3) ? {
          ask: () => array.length < 3,
          name: 'type',
          description: 'What do you want to create?\n - project\n - page\n - molecule\n',
          default: 'project',
          pattern: /(project|page|molecule)/gm
        } : null),
        ((array.length < 4) ? {
          ask: () => array.length < 4,
          name: 'name',
          description: 'How do you want to call it?',
          default: 'app-name',
          pattern: /[a-zA-Z_-]/gm
        } : null),
        {
          ask: () => (prompt.history('type') || {}).value === 'project' || array[2] === 'project',
          name: 'molecule_prefix',
          default: 'fl',
          description: 'Which prefix do you choose for your molecules?',
          pattern: /^[a-zA-Z]+$/gm
        },
        {
          ask: () => (prompt.history('type') || {}).value === 'project' || array[2] === 'project',
          name: 'include_spec',
          default: 'Y',
          message: 'You should answer Yes/No',
          description: 'Include Unit tests?(Y/N)',
          pattern: ynRegex
        },
        {
          ask: () => (prompt.history('type') || {}).value === 'project' || array[2] === 'project',
          name: 'include_etoe',
          default: 'Y',
          message: 'You should answer Yes/No',
          description: 'Include E2E tests?(Y/N)',
          pattern: ynRegex
        },
        {
          ask: () => (prompt.history('type') || {}).value === 'project' || array[2] === 'project',
          name: 'include_md_reader',
          default: 'Y',
          message: 'You should answer Yes/No',
          description: 'Include MD READER feature?(Y/N)',
          pattern: ynRegex
        }
      ].filter(field => !!field);
      prompt.start();
      prompt.get(scheme, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
      .then(result => {
        const confirmRegex = /^([Y|y]([E|e][S|s])?)+$/;
        if (result) {
          result.include_etoe = confirmRegex.test(result.include_etoe);
          result.include_spec = confirmRegex.test(result.include_spec);
          result.include_md_reader = confirmRegex.test(result.include_md_reader);
          array = [
            ...array,
            ...((result.type) ? [result.type] : []),
            ...((result.name) ? [result.name] : [])
          ]
          if (result.type === 'project' || array[2] === 'project') {
            Config.setConfigurable(result);
          }
          return array;
        }
      })
      .catch(err => {
        Common.exitWithError('While retrieving configuration', err);
      });

    return promise;
  },
  decide(val, index, array) {
    if (array.length < 3) {
      Common.exitWithError(`Please decide what you want to create`, 'Project: project', 'Page: page', 'Molecule: molecule');
    }
    if (array.length < 4) {
      Common.exitWithError(`You have not inserted the ${array[2]} name`);
    }
    if (index === 2) {
      const name = array[3];
      switch (val) {
        case 'project':
          ProjectCreator.createProject(name);
          break;
        case 'page':
          ComponentsCreator.createPage(name);
          break;
        case 'molecule':
          ComponentsCreator.createMolecule(name);
          break;
        default:
          Common.exitWithError(`Please decide what you want to create`, 'Project: project', 'Page: page', 'Molecule: molecule');
          break;
      }
    }
  }
}