const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'asyncUseTest.js'),
  },
  output: {
    path: path.resolve(__dirname, 'distAsync'),
    filename: '[name].js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}