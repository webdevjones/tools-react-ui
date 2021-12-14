let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer')

const paths = {
    scss: {
        src: './src/scss/style.scss',
        dest: './src',
        watch: './src/scss/**/*.scss',
    }
}

const styles = () => {
    return gulp.src([paths.scss.src])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scss.dest))
}

const watch = () => {
    gulp.watch([paths.scss.watch], styles)
}
const build = gulp.series(styles, gulp.parallel(watch))

exports.styles = styles

exports.default = build