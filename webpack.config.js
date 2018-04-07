const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'async-node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: {main: './reduxExportEs6.js'},
  output: {
    path: __dirname,
    filename: 'reduxExport.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [{loader: 'babel-loader'}]
    }]
  }
}
