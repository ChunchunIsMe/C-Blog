const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin(),
]
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    requireOut: path.resolve(__dirname, 'src/requireOut.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'test',
    libraryTarget: 'umd'
  },
  plugins,
  mode: process.env.NODE_ENV,
  externals: {
    lodash: 'lodash'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3,
      maxInitialRequests: 10,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          minChunks: 2,
          priority: 10,
        },
      }
    }
  }
}