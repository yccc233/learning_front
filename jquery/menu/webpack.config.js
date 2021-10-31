const path = require("path");
// const webpack = require("webpack");
module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    module: {
        rules:  [
            // use 从右到左执行
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },
    externals: {
        jquery: 'jquery'
    },
    mode: "development"
}