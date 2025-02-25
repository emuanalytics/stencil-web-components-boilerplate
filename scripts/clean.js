const fs = require('fs-extra');
const path = require('path');

const cleanDirs = ['dist', 'loader', 'www'];

cleanDirs.forEach((dir) => {
  const cleanDir = path.join(__dirname, '../', dir);
  fs.removeSync(cleanDir);
});
