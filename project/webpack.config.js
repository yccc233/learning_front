// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = process.env.NODE_ENV === "production" ? "production" : "development";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "_build"),
    publicPath: path.resolve(__dirname, "_build", "js"),
    filename: `[name].js`,
    chunkFilename: `[id].js`
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
    }),
    new MiniCssExtractPlugin(),
    //more plugins https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["less-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      //more plugins https://webpack.js.org/loaders/
    ],
  },
  externals: {                                                              //外部扩展包，不用打包
    // jquery: "jquery"
  },
  resolve: {                                                                //配置寻找自定义模块，一般在文件导入时不加路径，但是webpack通过配置此项了解包在哪，其实就是换个别名
    extensions: ["", ".css", ".js", ".jsx", ".less"],                       //在遇到无后缀文件时，尝试使用这些文件加载器
    alias: {
      'hello': "src/pub/hello",                                             //var hello = require('hello');
      "utils": "src/pub/utils",
      "calculate": "./count/calculate"
    }
  },
  mode: env                                                       //环境 "development" 或者 "production"
};

module.exports = config;
