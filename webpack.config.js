//
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let scriptName = 'bundle.js';
if (process.env.NODE_ENV === 'production') {
    scriptName = 'bundle.min.js';
}
let devtool = 'eval-source-map';
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const dstPath = path.resolve(appDirectory, './dst');
const publicPath = path.resolve(appDirectory, './public');
const indexPath = path.resolve(appDirectory, publicPath, 'index.html');

const plugins = [
    new CopyWebpackPlugin([{
        from: path.resolve(appDirectory, publicPath),
        to: dstPath,
    }]),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: indexPath,
        scriptName,
        rootPath: '/',
        inject: false,
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV,
        API_GETTER_URL: process.env.LINGUA_API_GETTER_URL,
        API_KEY: process.env.LINGUA_API_KEY,
    }),
];

let cacheDirectory = true;
let optimization;
if (process.env.NODE_ENV === 'production') {
    cacheDirectory = false;
    optimization = {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
    };
    devtool = 'source-map';
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory,
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-flow',
                ],
                plugins: [
                    [
                        require.resolve('@babel/plugin-proposal-object-rest-spread'), { useBuiltIns: true },
                    ],
                    require.resolve('@babel/plugin-proposal-class-properties'),
                ],
            },
        },
    },
    {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        loaders: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
        ],
    },
    {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000000,
                    name: '/fonts/[name].[ext]',
                },
            },
        ],
    },
    {
        test: /(\.png)/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000000,
                    name: 'graphics/[name].[ext]',
                },
            },
        ],
    },
    {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        // options: { ... }
    },
];

const options = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.js',
    target: 'web',
    output: {
        path: dstPath,
        filename: scriptName,
        libraryTarget: 'var',
    },
    devtool,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins,
    devServer: {
        contentBase: dstPath,
        hot: true,
        inline: true,
        // quiet: true,
        compress: true,
        port: 9000,
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: true,
    },
    optimization,
    performance: {
        hints: false,
    },
};
module.exports = options;
