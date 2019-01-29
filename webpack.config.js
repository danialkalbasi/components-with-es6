const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-env/webpack.common');

module.exports = (env, argv) => {
    if (!argv.mode) {
        throw new Error('You must pass a --mode flag into your build in order to work!');
    }
    const envConfig = require(`./webpack-env/webpack.${argv.mode}.js`);

    return webpackMerge(commonConfig, envConfig);
};
