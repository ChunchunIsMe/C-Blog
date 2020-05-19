const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'asyncUseTest.js'),
  },
  output: {
    path: path.resolve(__dirname, 'distAsync'),
    filename: '[name].js',
  },
  mode: 'development'
}