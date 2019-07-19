const Common = require('./common');
const Config = require('./config');
const ProjectCreator = require('./project-creator');
const ComponentsCreator = require('./components-creator');
const prompt = require('prompt');

module.exports = {
  configurables(array) {
    const promise = new Promise((resolve, reject) => {
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
        if (result) {
          array = [
            ...array,
            ...((result.type) ? [result.type] : []),
            ...((result.name) ? [result.name] : [])
          ]
          if (result.type === 'project') {
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