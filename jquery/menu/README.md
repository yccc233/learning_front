
> 这里用的是jquery编程的方法，在index.html中引入js文件，完成的基本配置方法。
> 但是由于浏览器限制，只能读取ES5语法的文件，且目前的主流写法都已超前，所以在index.html中直接引入文件会产生无法识别require的情况，
> 所以需要使用webpack打包。


# 使用步骤

```shell
$ npm i       #安装依赖
$ webpack     #打包
$ npm start   #启动服务: node app.js
```

## 关于webpack
> 至于原理，[这篇文章](https://blog.csdn.net/fqq_5280/article/details/86562488) 介绍的很详细


## 关于gulp

在写一个简单gulp task时，会报有错误：
```shell
......
[15:28:56] The following tasks did not complete: test
[15:28:56] Did you forget to signal async completion?
```

有几种解决方法

1. 在不使用文件流的情况下，参数中加上done参数 <span style="color: rgb(79,134,236)">[官方推荐]</span>
```javascript
gulp.task('test', function (done) {
    console.log("hello world!");
    done();
});
```

2. 使用async和await
```javascript
gulp.task('test', async function () {
    await console.log("hello world!");
});
```