const path = require('path')
const webpack = require('webpack')
const package = require('./package')

const isProduction = process.env.npm_lifecycle_event === 'build'

const config = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: package.name + '.js',
    library: package.name.toUpperCase(),
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { "modules": false }]
          ]
        }
      }
    }]
  },
  plugins: []
}

if(!isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.ModuleConcatenationPlugin()
  ])
}

module.exports = config
