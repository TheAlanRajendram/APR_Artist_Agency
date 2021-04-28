const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const sass = require('gulp-dart-sass');

gulp.task('nunjucks', function() {
  return gulp.src('./pages/**/*.+(html|njk)')
    .pipe(nunjucksRender({
      path: ['./templates']
    }))
    .pipe(gulp.dest('../'))
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../'));
})

gulp.task('watch', function(){
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./**/*.njk', gulp.series('nunjucks'));
})