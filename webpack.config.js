const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
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
