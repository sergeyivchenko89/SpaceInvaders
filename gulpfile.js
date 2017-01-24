var lr = require('tiny-lr'), // Минивебсервер для livereload
    gulp = require('gulp'), // Сообственно Gulp JS
    jade = require('gulp-jade'), // Плагин для Jade
    stylus = require('gulp-stylus'), // Плагин для Stylus
    livereload = require('gulp-livereload'), // Livereload для Gulp
    myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    connect = require('connect'), // Webserver
    server = lr();

gulp.task('js', function () {
    gulp
        .src(['./sources/js/**/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload(server));
});

gulp.task('html', function () {
    gulp
        .src(['./sources/*.html'])
        .pipe(gulp.dest('./build'))
        .pipe(livereload(server));
});

gulp.task('css', function () {
    gulp
        .src('./sources/css/**/*.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload(server));
});

gulp.task('img', function () {
    gulp
        .src('./sources/img/*')
        .pipe(gulp.dest('./build/img'))
        .pipe(livereload(server));
});

gulp.task('watch', function () {

    gulp.start('js');
    gulp.start('html');
    gulp.start('css');
    gulp.start('img');

    // Подключаем Livereload
    server.listen(35729, function(err) {
        if (err) return console.log(err);
        
        gulp.watch('sources/js/**/*', function() {
            gulp.start('js');
        });

        gulp.watch('sources/*.html', function () {
            gulp.start('html');
        });

        gulp.watch('sources/css/**/*', function () {
            gulp.start('css');
        });

        gulp.watch('sources/img/*', function () {
            gulp.start('img');
        });
    });
});