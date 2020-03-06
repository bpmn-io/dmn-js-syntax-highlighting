'use strict';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const absoluteBasePath = path.resolve(__dirname);

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: 'lib/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'dmn-js-syntax-highlighting',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.ttf$/,
        use: 'file-loader'
      },
      {
        test: /\.(eot|dmn|svg)$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: isProduction ? {} : {
      inferno: 'inferno/dist/index.dev.esm.js',
    },
    modules: [
      'node_modules',
      absoluteBasePath
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: []
    }),
    ...pgl(),
    ...bundlesize(process.env.BUNDLESIZE)
  ],
  externals: [
    'inferno',
    'min-dash',
    /^dmn-js/,
    /^table-js/
  ],
  devtool: isProduction ? 'sourcemap' : 'eval-source-map'
};


function pgl() {
  return isProduction ? [ new CleanWebpackPlugin() ] : [];
}

function bundlesize(enabled) {
  return enabled ? [ new BundleAnalyzerPlugin() ] : [];
}
