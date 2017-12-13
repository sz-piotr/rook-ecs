const path = require('path')
const webpack = require('webpack')
const packageJSON = require('./package')

const isProduction = process.env.npm_lifecycle_event === 'build'

const config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: packageJSON.name + '.js',
    library: packageJSON.name.toUpperCase(),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: []
}

if (!isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.ModuleConcatenationPlugin()
  ])
}

module.exports = config
