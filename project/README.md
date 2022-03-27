
[TOC]

# 启动

```shell
$ gulp
```



# .eslintrc.json

```shell
$ eslint init
```

# app.js
```javascript
var express = require("express");
var app = express();
```

express的路由，众所周知，是app.get()，app.post()，app.all()....，但其实，它们都是app.use的别名。


# gulpfile.js
参考`learning\jquery\menu\README.md`

# webpack.config.js

```shell
$ webpack init
```

配置后默认生成的
```jsx
const config = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
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
        ],
    },
};
```
