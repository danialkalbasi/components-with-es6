const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

module.exports = {
    context: paths.src,
    performance: {
        hints: false
    },
    entry: {
        app: `./index.js`
    },
    output: {
        filename: `[name].[hash:10].js`,
        path: paths.dist
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(ico|jpe?g|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '../images',
                        outputPath: 'images',
                        name: '[name].[hash:10].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stylesheets/[name].[hash:10].css'
        }),
        new CopyWebpackPlugin([{ from: paths.static }])
    ]
};
