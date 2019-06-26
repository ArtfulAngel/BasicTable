const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    stats: {
        // copied from `'minimal'`
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true,
    },
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
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                context: resolveApp('src'),
                                hashPrefix: 'my-custom-hash',
                            },
                        },
                    },
                    'sass-loader',
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
        stats: 'minimal',
        contentBase: './src',
    },
};
