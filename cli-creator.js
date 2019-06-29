const Common = require('./common');
const Config = require('./config');
const ProjectCreator = require('./project-creator');
const ComponentsCreator = require('./components-creator');
const prompt = require('prompt');

module.exports = {
  configurables() {
    const promise = new Promise((resolve, reject) => {
      prompt.start();
      prompt.get([
        {
          name: 'molecule_prefix',
          default: 'fl',
          description: 'Which prefix do you choose for your molecules?',
          pattern: /^[a-zA-Z]+$/gm
        }
      ], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
      .then(result => {
        Config.setConfigurable(result);
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