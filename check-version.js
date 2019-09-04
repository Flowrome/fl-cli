const prompt = require('prompt');
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('./package.json', 'UTF-8'));
console.log(json.version);

prompt.start();
prompt.get([
    {
        name: 'version',
        description: 'Do you want to update the version of the package?',
        default: json.version,
        pattern: /^([0-9]+\.[0-9]+\.[0-9]+\-[0-9]+)$/gm
    }
], (err, result) => {
    if (err) {
        console.log(err);
    }
    const version = result.version
    json.version = version;
    fs.writeFileSync('./package.json', JSON.stringify(json));
})