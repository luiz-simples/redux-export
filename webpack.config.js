const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'async-node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: {main: './reduxExportEs6.js'},
  output: {
    filename: 'reduxExport.js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [{loader: 'babel-loader'}]
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
      compress: {warnings: false},
      output: {comments: false}
    }),

    new webpack.LoaderOptionsPlugin({debug: false, minimize: true})
  ]
}
