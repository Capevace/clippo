const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../backend/public/')
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
    new CleanWebpackPlugin(['backend/public'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/img/icon.png'),
      title: 'Clippo'
    })
  ],
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  }
};
