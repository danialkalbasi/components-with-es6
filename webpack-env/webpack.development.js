const HtmlWebpackPlugin = require('html-webpack-plugin');
const development = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: true,
    }
};

module.exports = development;