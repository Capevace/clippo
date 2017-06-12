const path = require('path');
const webpack = require('webpack');
const randomstring = require('randomstring');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const isDevBuild = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './app/client.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, isDevBuild ? 'dist/dev' : 'dist/production')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }]],
              plugins: [
                'syntax-async-functions',
                'syntax-dynamic-import',
                'transform-async-to-generator',
                'transform-regenerator',
                'transform-runtime',
                'transform-object-rest-spread',
                ['transform-react-jsx', { pragma: 'h' }],
                'transform-class-properties'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        include: /flexboxgrid/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin([isDevBuild ? 'dist/dev' : 'dist/production']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/index.template.html'),
      filename: 'index.template.html'
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'app/img/icon.png'),
      title: 'Clippo'
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'app/service-worker.js'),
      transformOptions: jsonStats =>
        Object.assign({}, jsonStats, {
          versionHash: randomstring.generate()
        })
    })
  ],
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  devtool: isDevBuild ? 'eval-source-map' : false
};
