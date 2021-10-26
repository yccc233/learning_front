var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var minifyCSS = require("gulp-cssnano");
var prefix = require("gulp-autoprefixer");
var jshint = require("gulp-jshint");
var del = require("del");


/**
 * task方法就是相当于注册一个参数方法
 */
gulp.task('test', async function () {
    await console.log("hello world!");
});

/**
 * src方法可以根据输入规则读取文件
 * ** 匹配的是所有子目录，≥0
 * pipe是流提供的方法
 * dest方法可以将文件写入
 */
gulp.task('copy', done => {
    gulp.src("./src/**/*.js")
        .pipe(gulp.dest('./dist'))
    done();
});

/**
 * 在上一个task任务前提下使用gulp-uglify（混淆）插件
 * 将文件中空格、可优化空间的表达式做些修改
 */
gulp.task('copy-ugly', done => {
    gulp.src("./src/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
    done();
});

/**
 * 在上一个task任务前提下使用gulp-concat（合并）插件
 * 将多个文件合并在一起
 */
gulp.task('copy-concat', done => {
    gulp.src("./src/**/*.js")
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest('./dist'))
    done();
});

/**
 * 在上一个task任务前提下使用gulp-concat（合并）和gulp-uglify插件
 * 将多个文件合并在一起
 */
gulp.task('copy-concat-ugly', done => {
    gulp.src("./src/**/*.js")
        .pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
    done();
});


/********

/**
 * 删除之前构建的包
 */
gulp.task('clean', done => {
    del(['dist']);
    done();
});

gulp.task('scripts', done => {
    gulp.src("./src/**/*.js")
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
    done();
});

gulp.task('styles', done => {
    gulp.src("./src/**/*.css")
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('./dist/css'));
    done();
});

gulp.task('check', done => {
    gulp.src(["./src/**/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
    done();
});

/**
 * 使用依赖链和执行链来走完整个项目的打包过程
 */
gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));