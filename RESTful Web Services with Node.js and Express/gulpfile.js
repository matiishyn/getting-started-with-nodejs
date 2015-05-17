var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

// use default task to call nodemon
gulp.task('default', function () {
    nodemon({
        // configs
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting from nodemon');
        });
});

gulp.task('test', function () {
    env({vars: {ENV: 'Test'}});

    gulp.src('Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});