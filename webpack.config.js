var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');

var common = {

  entry: [path.resolve(ROOT_PATH, 'app/main')],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './app/index.html'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },

      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
};

switch (TARGET) {
  case 'build':
    module.exports = merge(common, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ]
    });

    break;

  case 'dev':
    module.exports = merge(common, {
      entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server'
      ]
    });
    break;
}
