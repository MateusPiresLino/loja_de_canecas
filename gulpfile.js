const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin'); 
const sourcemaps = require('gulp-sourcemaps');

// Configurações
const paths = {
    styles: './source/styles/*.scss',
    scripts: './source/scripts/*.js',
    images: './source/images/**/*',
    output: './build'
};

// Tarefas
function optimizeImages() {
    return src(paths.images)
    .pipe(imagemin()) // Ou .pipe(squoosh())
    .pipe(dest(`${paths.output}/images`));
}

function minifyJS() {
    return src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(terser().on('error', console.error))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(`${paths.output}/scripts`));
}

function compileSass() {
    return src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(`${paths.output}/styles`));
}

// Tarefas agrupadas
exports.build = parallel(optimizeImages, minifyJS, compileSass);
exports.dev = series(
exports.build, () => {
    watch(paths.styles, compileSass);
    watch(paths.scripts, minifyJS);
    watch(paths.images, optimizeImages);
}
);
exports.default = exports.dev;

