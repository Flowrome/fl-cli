const Common = require('./common');
const ProjectCreator = require('./project-creator');
const ComponentsCreator = require('./components-creator');

module.exports = {
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
      }
    }
  }
}