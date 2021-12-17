[TOC]



# react项目结构



## .babelrc文件

参考[知乎文章](https://zhuanlan.zhihu.com/p/84083454)



使用 Babel 第一步就是配置此文件，放在项目根目录，此文件用于配置转码规则和插件，基本格式：

```json
{
"presets":[],
"plugins":[]
}
```

对预设（presets）和插件（plugins）进行配置。



## .babelrc 常用示例

### react 项目

安装：

- npm install --save-dev @babel/preset-env @babel/plugin-transform-runtime @babel/preset-react

```json
{
  "presets": [
    ["@babel/env", {
      "modules": false
    }],
    "@babel/preset-react"
  ],
  "comments": false,//不产生注释
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

