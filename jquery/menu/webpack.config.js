const path = require("path");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    mode: "development"
}