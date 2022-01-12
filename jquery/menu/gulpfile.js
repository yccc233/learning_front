//往下翻可以看到学习内容
var gulp = require("gulp");
    uglify = require("gulp-uglify");
    concat = require("gulp-concat");
    minifyCSS = require("gulp-cssnano");
    prefix = require("gulp-autoprefixer");
    clean = require("gulp-clean");
    jshint = require("gulp-jshint");
    argvs = (require("yargs"));
    webpack = require("webpack");
    webpack_config = require('./webpack.config');
    bSync = require("browser-sync");
    fs = require('fs');

console.log("gulp argv: ", argvs)

// gulp.task('clean', done => {
//     if (fs.existsSync('build'))
//         gulp.src(['build'])
//             .pipe(clean())
//     done();
// });
//
// gulp.task('htmls', done => {
//     gulp.src("./public/*.*")
//         // .pipe(gulp.dest('./dist'))
//         .pipe(gulp.dest('./build'));
//     done();
// })
//
// gulp.task('scripts', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(concat('bundle.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'));
//     done();
// });
//
// gulp.task('stylesCSS', done => {
//     gulp.src("./src/**/*.css")
//         .pipe(minifyCSS())
//         .pipe(prefix())
//         // .pipe(gulp.dest('./dist'))
//         .pipe(gulp.dest('./build'));
//     done();
// });
//
// gulp.task('webpack', done => {
//     webpack(webpack_config).run((err, status) => {
//         err && console.log("webpack ERROR: ", err.toString())
//         err && console.log("webpack STATUS: ", status)
//     })
//     done();
// });
//
// gulp.task('server', done => {
//     bSync({
//         server: {
//             baseDir: ['build']
//         },
//         browser: "google chrome"
//     });
//     done();
// });
//
// gulp.task('default', gulp.series(
//     'clean', 
//     gulp.parallel('htmls', 'webpack'),
//     'server', done => {
//         gulp.watch('./public/*', gulp.series('htmls', 'webpack'))
//         gulp.watch('./src/**/*.js', gulp.series('webpack'));
//         gulp.watch('./src/**/*.css', gulp.series('webpack'));
//         gulp.watch('./dist/**/*', bSync.reload);
//         done();
//     }
// ));

































/** 学习方法，指令上都带有下划线 */

/**
 * task方法就是相当于注册一个参数方法
 */
// gulp.task('_test', async function () {
//     await console.log("hello world!");
// });

/**
 * src方法可以根据输入规则读取文件
 * ** 匹配的是所有子目录，≥0
 * pipe是流提供的方法
 * dest方法可以将文件写入
 */
// gulp.task('_copy', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(gulp.dest('./dist'))
//     done();
// });

/**
 * 在上一个task任务前提下使用gulp-uglify（混淆）插件
 * 将文件中空格、可优化空间的表达式做些修改
 */
// gulp.task('_copy-ugly', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'))
//     done();
// });

/**
 * 在上一个task任务前提下使用gulp-concat（合并）插件
 * 将多个文件合并在一起
 */
// gulp.task('_copy-concat', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(concat("bundle.js"))
//         .pipe(gulp.dest('./dist'))
//     done();
// });

/**
 * 在上一个task任务前提下使用gulp-concat（合并）和gulp-uglify插件
 * 将多个文件合并在一起
 */
// gulp.task('_copy-concat-ugly', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(concat("bundle.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'))
//     done();
// });

//**********************************************************************************************************************

/**
 * 删除之前构建的包
 */
// gulp.task('_clean', done => {
//     del(['dist', 'build']);
//     done();
// });

// gulp.task('_scripts', done => {
//     gulp.src("./src/**/*.js")
//         .pipe(concat('main.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'));
//     done();
// });

// gulp.task('_styles', done => {
//     gulp.src("./src/**/*.css")
//         .pipe(minifyCSS())
//         .pipe(prefix())
//         .pipe(gulp.dest('./dist/css'));
//     done();
// });

// gulp.task('_check', done => {
//     gulp.src(["./src/**/*.js"])
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(jshint.reporter('fail'))
//     done();
// });

/**
 * 使用依赖链和执行链来走完整个项目的打包过程
 * series同步执行
 * parallel异步执行
 */
// gulp.task('_default1', gulp.series('clean', gulp.parallel('_scripts', '_styles')));

/**
 * 启动服务器，监听文件夹下的静态文件
 * 基本参数够用了,还可以主动打开一个新的浏览器标签
 * 其他配置参考网页：http://browsersync.io
 * api参考：https://browsersync.io/docs/options
 */
// gulp.task('_server', done => {
//     bSync({
//         server: {
//             baseDir: ['./dist', './src']
//         },
//         browser: "google chrome"
//     });
//     done();
// });

/**
 * gulp.series同步任务：
 * 使用clean指令清除之前编译完成的文件
 * 同步执行scripts和styles指令，将文件打包到dist文件夹
 * 执行server指令监听
 * 最后回调监听文件变化，一旦变化执行对应的方法
 */
// gulp.task('_default', gulp.series(
//     '_clean', gulp.parallel('_scripts', '_styles'),
//     '_server', done => {
//         gulp.watch(
//             './src/**/*.js',
//             gulp.parallel('_scripts')
//         );
//         gulp.watch(
//             './src/**/*.css',
//             gulp.parallel('_styles')
//         );
//         gulp.watch(
//             './dist/**/*',
//             bSync.reload
//         );
//         done();
//     }
// ));
