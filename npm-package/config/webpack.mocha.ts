let webpackMerge = require('webpack-merge');
let nodeExternals = require('webpack-node-externals');

let commonConfig = require('./webpack.test');

module.exports = webpackMerge(commonConfig, {
  externals: [
    nodeExternals()
  ]
});
