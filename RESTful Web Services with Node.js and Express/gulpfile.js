var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

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