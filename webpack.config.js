const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.tsx'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
      },
      {
        test: [/\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 30000,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { importLoaders: 2, modules: true, localIdentName: '[name]__[local]--[hash:base64:5]' },
          },
        ],
      },
    ],
  },

  output: {
    path: resolveApp('dist'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: `DEV`,
      filename: 'index.html',
      template: resolveApp('src/index.html'),
      favicon: resolveApp('src/favicon.ico'),
      inject: true,
      hash: true,
    }),
    new WebpackBar({
      name: 'BasicTable',
    }),
    new webpack.DefinePlugin({}),
  ],
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8090,
    hot: true,
    noInfo: true,
    stats: 'minimal',
    contentBase: './src',
  },
};
