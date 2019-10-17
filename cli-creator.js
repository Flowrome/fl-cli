const Common = require('./common');
const Config = require('./config');
const log = require('./log');
const fs = require('fs');
const rimraf = require('rimraf');
const ProjectCreator = require('./project-creator');
const ComponentsCreator = require('./components-creator');
const prompts = require('prompts');

module.exports = {
  welcome() {
    log.cwelcome();
  },
  async configurables(array) {
    const scheme = [
      {
        type: () => (array.length < 3 ? 'select' : null),
        name: 'type',
        message: 'What do you want to create?',
        initial: 0,
        choices: [
          {
            title: 'Project',
            value: 'project'
          },
          {
            title: 'Page',
            value: 'page'
          },
          {
            title: 'Molecule',
            value: 'molecule'
          }
        ],
        validate: type => /(project|page|molecule)/gm.test(type)
      },
      {
        type: () => (array.length < 4 ? 'text' : null),
        name: 'name',
        message: 'How do you want to call it?',
        initial: (prev, value) => {
          let ret = 'fl-name';
          switch (value.type) {
            case 'project':
              ret = 'app-name';
              break;
            case 'page':
              ret = 'page-name';
              break;
            case 'molecule':
              ret = 'molecule-name';
              break;
          }
          return ret;
        },
        validate: name => /[a-zA-Z_-]/gm.test(name)
      },
      {
        type: (prev, values) => (fs.existsSync(`./${values.name}`) ? 'confirm' : null),
        name: 'overwrite',
        initial: false,
        message: (prev, values) => `A project with this name: ${values.name} already exists in folder, Overwrite?`
      },
      {
        type: (prev, values) => (values.type === 'project' || array[2] === 'project' ? 'text' : null),
        name: 'molecule_prefix',
        initial: 'fl',
        message: 'Which prefix do you choose for your molecules?',
        validate: mp => /^[a-zA-Z]+$/gm.test(mp)
      },
      {
        type: (prev, values) => (values.type === 'project' || array[2] === 'project' ? 'confirm' : null),
        name: 'include_spec',
        initial: true,
        message: 'Include Unit tests?'
      },
      {
        type: (prev, values) => (values.type === 'project' || array[2] === 'project' ? 'confirm' : null),
        name: 'include_etoe',
        initial: true,
        message: 'Include E2E tests?'
      },
      {
        type: (prev, values) => (values.type === 'project' || array[2] === 'project' ? 'confirm' : null),
        name: 'include_md_reader',
        initial: true,
        message: 'Include MD READER feature?'
      }
    ].filter(field => !!field);
    const result = await prompts(scheme);
    if (result) {
      if (!!result.overwrite) {
        rimraf.sync(`./${result.name}`);
      }
      array = [...array, ...(result.type ? [result.type] : []), ...(result.name ? [result.name] : [])];
      if (result.type === 'project' || array[2] === 'project') {
        Config.setConfigurable(result);
      }
      return array;
    }

    return result;
  },
  decide(val, index, array) {
    if (array.length < 3) {
      Common.exitWithError(
        `Please decide what you want to create`,
        'Project: project',
        'Page: page',
        'Molecule: molecule'
      );
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
          Common.exitWithError(
            `Please decide what you want to create`,
            'Project: project',
            'Page: page',
            'Molecule: molecule'
          );
          break;
      }
    }
  }
};
