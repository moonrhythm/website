var webpack = require("webpack");

module.exports = {
  target: 'web',
  context: __dirname,
  entry: "./entry.js",
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  //devtool: "source-map",
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9\.\=]+)?$/, loader: 'file?name=./fonts/[hash].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=./img/[hash].[ext]' },
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, comments: false }),
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  }
};
