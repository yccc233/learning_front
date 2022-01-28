const gulp = require("gulp");
const watch = require("gulp-watch");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const less = require("gulp-less");
const gutil = require("gulp-util");
const minifyCSS = require("gulp-cssnano");
const gulpPlumber = require("gulp-plumber");
const shell = require("gulp-shell");
const webpack = require("webpack");
const exec = require("child_process").exec;
const livereload = require('gulp-livereload'); // 网页自动刷新（文件变动后即时刷新页面）
const webserver = require('gulp-webserver'); // 本地服务器
const fs = require("fs");
const Path = require("path");

const buildPath = "_build/";

function callback(file) {
    if (file.event) {
        gutil.log("[file]", gutil.colors.green(Path.basename(file.path)), gutil.colors.red(file.event));
    }
}

function plumber() {
    return gulpPlumber({
        errorHandler: function (err) {
            console.log("plumberERROR", err.toString().substring(0,100) + "...");
            this.emit("end");
        }
    });
}


gulp.task("clean", done => {
    if (fs.existsSync(buildPath)) {
        exec("rm -rf _build/");
    }
    done();
});


gulp.task("html", function (done) {
    const path = "./src/html/**/*.html";
    gulp.src(path)
        .pipe(watch(path, {}, callback))
        .pipe(gulp.dest(buildPath));
    done();
});
gulp.task("js", function (done) {
    const path = "./src/js/**/*.js";
    gulp.src(path)
        .pipe(watch(path, {}, callback))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + "js"));
    done();
});
gulp.task("css", function (done) {
    const path = "./src/css/**/*.css";
    gulp.src(path)
        .pipe(watch(path, {}, callback))
        .pipe(minifyCSS())
        .pipe(gulp.dest(buildPath + "css"));
    done();
});
gulp.task("less", function (done) {
    const path = "./src/css/**/*.less";
    gulp.src(path)
        .pipe(watch(path, {}, callback))
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(buildPath + "css"));
    done();
});
gulp.task("pack", function (done) {

    done();
});
gulp.task("webpack", gulp.series(["pack"], function (done) {
    webpack(require("./webpack.config"), function (err, stat) {
        if (err) {
            gutil.log(stat.toString())
        }
        done();
    })
}));

// 注册任务
gulp.task('webserver', function() {
    gulp.src( '.' ) // 服务器目录（.代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});

gulp.task("express", function (done) {
    exec("node app.js");
    gutil.log("express is running!")
});

// 监听任务
gulp.task('watch',function(){
    // 监听 html
    gulp.watch('src/**/*.html', ['html'])
    // 监听 scss
    gulp.watch('src/css/**/*.css', ['css']);
    // 监听 images
    gulp.watch('src/images/**/*.{png,jpg,gif,svg}', ['images']);
    // 监听 js
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task("default", gulp.series("clean", [gulp.parallel(["html", "js", "css", "less"]), "express"], function (done) {
    gutil.log(gutil.colors.green("default is done!"));
    done();
}));


