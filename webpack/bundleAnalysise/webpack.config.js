const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'distSimple'),
    filename: '[name].js',
  },
  mode: 'development'
}