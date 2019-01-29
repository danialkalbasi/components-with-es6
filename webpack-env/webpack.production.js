const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true
            }
        })
    ],
    devtool: 'source-map'
};

module.exports = production;
