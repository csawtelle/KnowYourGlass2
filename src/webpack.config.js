var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var sh = require('webpack-shell-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    loaders: [ 
     {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({loader: 'css-loader'})},
    ]
  },
  devtool: 'source-map',
  output: {
    path: helpers.root('public'),
    publicPath: '',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: './app'
        },
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Alert: "exports?Alert!bootstrap/js/dist/alert",
      Button: "exports?Button!bootstrap/js/dist/button",
      Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports?Modal!bootstrap/js/dist/modal",
      Popover: "exports?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports?Util!bootstrap/js/dist/util",
    }),
    new sh({
      onBuildStart: ['mkdir /build/dev/KnowYourGlass2/public'],
      onBuildEnd:[
        'ln -s /build/KnowYourGlass2/src/app/images /build/dev/KnowYourGlass2/public/images'
      ]
    })
  ]
};
