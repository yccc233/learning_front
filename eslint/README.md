> [官方手册](http://eslint.cn/docs/user-guide/getting-started)
>
> [rules配置](http://eslint.cn/docs/rules/)
>
> [高级配置](http://eslint.cn/docs/user-guide/configuring)
>
> [命令行参数](http://eslint.cn/docs/user-guide/command-line-interface)




```shell
$ npm install eslint --save-dev
$ ./node_modules/.bin/eslint --init				#根据提示选择偏好设置
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.28.0 eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0
✔ Would you like to install them now with npm? · No / Yes
...【安装步骤】
```




```javascript
// .eslintrc.json默认生成下列配置项，具体配置及说明看当下的	eslintrc.json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}

```





# 配置项手册

## rules

内置如：

```json
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

第一个值是错误级别，可以使下面的值之一：

- `"off"` or `0` - 关闭规则
- `"warn"` or `1` - 将规则视为一个警告（不会影响退出码）
- `"error"` or `2` - 将规则视为一个错误 (退出码为1)







# 具体见目录下的`eslint.json`文件

