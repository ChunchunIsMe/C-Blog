const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    test: path.resolve(__dirname, 'test.js'),
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development'
}