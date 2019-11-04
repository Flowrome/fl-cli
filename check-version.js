const prompts = require('prompts');
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('./package.json', 'UTF-8'));

(async () => {
  responses = await prompts([
    {
      type: 'text',
      message: 'Do you want to update the version of the package?',
      name: 'version',
      validate: version => /^([0-9]+\.[0-9]+\.[0-9]+\-[0-9]+)$/gm.test(version),
      initial: json.version
    }
  ]);
  const version = responses.version;
  json.version = version;
  fs.writeFileSync('./package.json', JSON.stringify(json));
})();
