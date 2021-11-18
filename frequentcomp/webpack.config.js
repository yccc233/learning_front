const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /.less$/, use: 'less-loader'},
            {test: /.css$/, use: 'css-loader'},
            {test: /.jsx$/, use: 'babel-loader'},
        ]
    },
    mode: "production"
};