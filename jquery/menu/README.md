
> 这里用的是jquery编程的方法，在index.html中引入js文件，完成的基本配置方法。
> 但是由于浏览器限制，只能读取ES5语法的文件，且目前的主流写法都已超前，所以在index.html中直接引入文件会产生无法识别require的情况，
> 所以需要使用webpack打包。


# 使用步骤

```shell
# 老方法
$ npm i       #安装依赖
$ webpack     #打包
$ npm start   #启动服务: node app.js


# 最新：直接一条命令完成所有事 （默认是gulp default）
$ gulp
```

# <span style="font-size: 10px">（非常重要！！！）</span><span style="color: red">gulp和webpack组合技</span>

如`gulpfile.js`文件和`webpack.config.js`两个文件中所示，
对`./src`和`./public`目录下的文件进行整合。

通过`gulpfile.js`我们可以把文件使用流的形式加工后放在指定位置。
通过webpack将我们编写的ES6转译成ES5，供浏览器识别。
最后利用gulp.watch方法监督文件的变动，自动化实现热重载。

```javascript
//引入包略

gulp.task('clean', done => {
    del(['./build', './dist']);
    done();
});

gulp.task('htmls', done => {
    gulp.src("./public/*.*")
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./dist'));
    done();
})

gulp.task('scripts', done => {
    gulp.src("./src/**/*.js")
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
    done();
});

gulp.task('stylesCSS', done => {
    gulp.src("./src/**/*.css")
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('webpack', done => {
    webpack(webpack_config).run((err, status) => {
        err && console.log("webpack ERROR: ", err.toString())
        console.log("webpack STATUS: ", status)
        done();
    })
});

gulp.task('server', done => {
    bSync({
        server: {
            baseDir: ['build']
        }
    });
    done();
});

gulp.task('default', gulp.series(
    'clean', gulp.parallel('scripts', 'stylesCSS', 'htmls'),
    'webpack', 'server', done => {
        gulp.watch('./public/*', gulp.series('htmls', 'webpack'))
        gulp.watch('./src/**/*.js', gulp.series('scripts', 'webpack'));
        gulp.watch('./src/**/*.css', gulp.series('stylesCSS', 'webpack'));
        gulp.watch('./dist/**/*', bSync.reload);
        done();
    }
));
```

**<u>学习方法在`gulpfile.js`文件下面</u>**



## 关于webpack

> 至于原理，[这篇文章](https://blog.csdn.net/fqq_5280/article/details/86562488) 介绍的很详细
> 还有一些配置的api说明可以参考[这篇文章](https://blog.csdn.net/handsomezhanghui/article/details/107904250)



## 关于gulp

### gulp的几个指令

- task——申明任务名称，建立任务
- src——读取文件内的**文件**，可以使用通配符，如`gulp.src("./public/*.*")`
- pipe——管道传输的方法，不占用系统空间
- dest——放置路径，是**路径**，通过管道后的地方，如`···.pipe(gulp.dest('./build'))`
- watch——监督文件动作，也可以用通配符，两个参数 [监督文件, 触发动作]
- series——系列，同步执行，多参数
- parallel——并行，异步执行，多参数



### 命令参数

命令行输入gulp 后带有参数时，需要`yargs`包



### 在写一个简单gulp task时，会报有错误：

```shell
......
[15:28:56] The following tasks did not complete: test
[15:28:56] Did you forget to signal async completion?
```

有两种解决方法

1. 在不使用文件流的情况下，参数中加上done参数 <span style="color: #aabbcc">[官方推荐]</span>
```javascript
gulp.task('test', function (done) {
    console.log("hello world!");
    done();
});
```

2. 使用async和await（不建议）
```javascript
gulp.task('test', async function () {
    await console.log("hello world!");
});
```
