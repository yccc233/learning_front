> [官方教程](https://www.w3cschool.cn/doc_flow/flow-config.html)



安装：`$ sudo npm i -g flow-bin`

The `.flowconfig` consists of 5 sections:

- [`[include]`](https://www.w3cschool.cn/doc_flow/flow-include)
- [`[ignore]`](https://www.w3cschool.cn/doc_flow/.html?lang=en"ignore")
- [`[libs]`](https://flow.org/en/docs/libs)
- [`[options]`](https://www.w3cschool.cn/doc_flow/flow-options.html?lang=en)
- [`[version]`](https://www.w3cschool.cn/doc_flow/flow-version.html?lang=en)

诸如下面这个格式，还可以支持通配符和正则。

```
[include]
../otherdir/src

[ignore]
.*/build/.*

[libs]
./lib
```



### 1. include

顾名思义

```
[include]
../externalFile.js
../externalDir/
../otherProject/*.js
../otherProject/**/coolStuff/
```

- 外部文件



### 2. ignore

```
[ignore]
.*/__tests__/.*
.*/src/\(foo\|bar\)/.*
.*\.ignore\.js
```

- `__tests__`目录下的所有文件或者文件夹

- 正则匹配文件
- 正则 \\.所有以`.ignore.js`结尾的文件 

自v0.23.0，可以用 `<PROJECT_ROOT>`代替`.flowconfig`所在路径

```
[ignore]
<PROJECT_ROOT>/__tests__/.*
```



### 3. libs

`.flowconfig`文件中的libs部分告诉Flow在类型检查代码时包含指定的库定义。可以指定多个库。默认情况下，项目根目录中的流类型文件夹包含为库目录。此默认值允许您使用流类型来安装库定义，而无需额外配置。
`libs`部分中的每一行都是要包含的库文件或目录的路径。这些路径可以是相对于项目根目录的路径，也可以是绝对路径。包含目录递归地将该目录下的所有文件作为库文件包含。



### 4. options

[跳转到详细介绍和配置项](https://www.w3cschool.cn/doc_flow/flow-config-options.html?lang=en)

```
[options]
keyA=valueA
keyB=valueB
```

省略的任何选项都将使用其默认值。可以使用命令行标志覆盖某些选项。



### 5. version

```
[version]
0.22.0
```

如果用了其他版本flow，会报错，

不过可以是用符号range

```
[version]
>=0.13.0 <0.14.0
```



## 迭代

在执行`flow init`后，文件内置有六种

```
[ignore]

[include]

[libs]

[lints]

[options]

[strict]
```





## 尝试

```javascript
// @flow
// function square(n: number): number {
//   return n * n;
// }

// square("2");


function squre(n) {
  return n * n;
}

squre("2");
```

注意，第一行的`// @flow`必有，否则直接跳过该文件。

