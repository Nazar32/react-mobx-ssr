const path = require('path');

module.exports = {
  entry: `${__dirname}/../src/app.js`,
  outputPath: path.resolve(__dirname, '../', 'dist'),
};
