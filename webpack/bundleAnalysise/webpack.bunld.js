const path = require('path');

module.exports = {
  entry: {
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'distBundle'),
    filename: '[name].js',
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        vendors: {
          test: /test.js/,
          priority: 10
        }
      }
    }
  }
}