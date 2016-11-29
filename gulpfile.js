var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var gulp = require('gulp');
var minify = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');


gulp.task('default', ['build', 'browser-sync'], function() {
    gulp.watch("./scss/**/**.*", ['sass']);
    gulp.watch("./src/components/**/*.js", ['angular']);
    gulp.watch("./src/**/*.html", ['static']);
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        ui: false,
        server: {
            baseDir: "./dist/",
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});

gulp.task('build', ['angular', 'libs', 'static', 'sass'], function(cb) {
    cb();
});

gulp.task('sass', function() {

    return gulp.src("./scss/**/**.scss", {
        read: true,
    })
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest("./dist/static/css"));

});

gulp.task('angular', function() {

    return gulp.src("./src/components/**/*.js")
        .pipe(angularFilesort())
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js", {
            newLine: ';'
        }))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./dist/static/scripts"));

});

gulp.task('static', function() {

    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist/"));
    gulp.src("./src/static/**/*.*")
        .pipe(gulp.dest("./dist/static"));

});

gulp.task('libs', function() {

    gulp.src("./node_modules/angular/angular.min.js")
        .pipe(gulp.dest("./dist/static/scripts/angular"));
    gulp.src("./node_modules/angular-ui-router/release/angular-ui-router.min.js")
        .pipe(gulp.dest("./dist/static/scripts/angular-ui-router"));
    gulp.src("./node_modules/font-awesome/css/font-awesome.min.css")
        .pipe(gulp.dest("./dist/static/css"));
    gulp.src("./node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest("./dist/static/fonts"));

});
