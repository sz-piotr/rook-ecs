const path = require('path')
const packageJSON = require('./package')

const config = {
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
  }
}

module.exports = config
