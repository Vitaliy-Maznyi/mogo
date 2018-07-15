let gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    nunjucks        = require('gulp-nunjucks')
    // concat          = require('gulp-concat')

gulp.task('scss', () => {
  return gulp.src('src/styles/main.scss')
      .pipe(scss().on( 'error', (error) =>
          {console.log( error );} )
      )
      .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
      .pipe(gulp.dest('src/styles'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('nunjucks', () =>{
  return gulp.src('src/templates/index.html')
      .pipe(nunjucks.compile())
      .pipe(gulp.dest('src'))
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () =>{
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'nunjucks', 'scss'], () => {
  gulp.watch('src/styles**/*.scss', ['scss']);
  gulp.watch('src/templates/**/*.html', ['nunjucks', browserSync.reload]);
  gulp.watch('src/styles/**/*.css', browserSync.reload);
  gulp.watch('src/scripts/**/*.js', browserSync.reload);
});
