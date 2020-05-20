const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
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
})