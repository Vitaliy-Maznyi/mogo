let gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    nunjucks        = require('gulp-nunjucks'),
    jsImport          = require('gulp-js-import')

gulp.task('importJs', function() {
  return gulp.src('docs/scripts/app.js')
      .pipe(jsImport({hideConsole: true}))
      .pipe(gulp.dest('docs'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', () => {
  return gulp.src('docs/styles/app.scss')
      .pipe(scss().on( 'error', (error) =>
          {console.log( error );} )
      )
      .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
      .pipe(gulp.dest('docs/styles'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('nunjucks', () => {
  return gulp.src('docs/templates/index.html')
      .pipe(nunjucks.compile())
      .pipe(gulp.dest('docs'))
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'docs'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'nunjucks', 'scss', 'importJs'], () => {
  gulp.watch('docs/styles/**/*.scss', ['scss']);
  gulp.watch('docs/scripts/**/*.js', ['importJs']);
  gulp.watch('docs/templates/**/*.html', ['nunjucks', browserSync.reload]);
  gulp.watch('docs/styles/**/*.css', browserSync.reload);
});
