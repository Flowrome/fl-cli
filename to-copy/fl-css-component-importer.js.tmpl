const glob = require('glob');
const fs = require('fs');

const pathDivider = process.platform === 'win32' ? '\\' : '/';
const basePath = `.${pathDivider}`;

const fileGlob = `${basePath}src${pathDivider}components${pathDivider}**${pathDivider}*.cssvars.scss`;

glob(fileGlob, (err, matches) => {
  if (err) return;
  if (matches && matches.length > 0) {
    let scssIndex = '';
    matches.map(match => {
      const splitted = match.split(pathDivider);
      splitted.splice(0, 2);
      const correctPath = `@import '${['..', '..', ...splitted].join(pathDivider)}';`;
      scssIndex = scssIndex + correctPath + '\n';
    });
    if (!fs.existsSync(`${basePath}src${pathDivider}styles${pathDivider}css-vars`)) {
      fs.mkdirSync(`${basePath}src${pathDivider}styles${pathDivider}css-vars`);
    }
    fs.writeFileSync(
      `${basePath}src${pathDivider}styles${pathDivider}css-vars${pathDivider}_var-index.scss`,
      scssIndex,
      'UTF-8'
    );
  }
});
