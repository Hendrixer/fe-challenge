var gulp = require('gulp');
var bs = require('browser-sync');
var reload = bs.reload;


gulp.task('serve', function(){
  bs({
    port: 4500,
    server: {
      baseDir: './client'
    }
  });
});

gulp.task('watch', ['serve'], function(){
  gulp.watch('client/**/*.**', reload);
});

gulp.task('default', ['watch']);
