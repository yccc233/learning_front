var gulp = require("gulp"),
    bSync = require("browser-sync");
fs = require('fs');

gulp.task('server', done => {
    bSync({
        server: {
            baseDir: ['public']
        },
        browser: "google chrome"
    });
    done();
});

gulp.task('default', gulp.series(
    'server', done => {
        gulp.watch('./public/*', bSync.reload)
        done();
    }
));