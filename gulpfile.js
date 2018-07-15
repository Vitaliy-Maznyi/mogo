let gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    nunjucks        = require('gulp-nunjucks'),
    jsImport          = require('gulp-js-import')

gulp.task('importJs', function() {
  return gulp.src('src/scripts/app.js')
      .pipe(jsImport({hideConsole: true}))
      .pipe(gulp.dest('src'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', () => {
  return gulp.src('src/styles/app.scss')
      .pipe(scss().on( 'error', (error) =>
          {console.log( error );} )
      )
      .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
      .pipe(gulp.dest('src/styles'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('nunjucks', () => {
  return gulp.src('src/templates/index.html')
      .pipe(nunjucks.compile())
      .pipe(gulp.dest('src'))
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'nunjucks', 'scss', 'importJs'], () => {
  gulp.watch('src/styles/**/*.scss', ['scss']);
  gulp.watch('src/scripts/**/*.js', ['importJs']);
  gulp.watch('src/templates/**/*.html', ['nunjucks', browserSync.reload]);
  gulp.watch('src/styles/**/*.css', browserSync.reload);
});
