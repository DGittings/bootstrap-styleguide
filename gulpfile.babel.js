import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import browserSync from "browser-sync";
import fileInclude from "gulp-file-include";
import del from "del";

const dirs = {
  src: "src",
  dest: "dist",
  docs: "docs"
};

const sassPaths = {
  src: `${dirs.src}/scss/main.scss`,
  dest: `${dirs.dest}/styles/`,
  docsDest: dirs.docs
};

const htmlPaths = {
  src: `${dirs.src}/html/index.html`,
  docsDest: dirs.docs
};

const moveableAssets = [
    'src/docs.css',
    'src/favicon.ico'
];

// Autoprefixer browser support options, copied from Bootstrap
const autoprefixerOptions = {
  browsers: [
    //
    // Official browser support policy:
    // https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers
    //
    'Chrome >= 45', // Exact version number here is kinda arbitrary
    'Firefox ESR',
    // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
    // NOT the Edge app version shown in Edge's "About" screen.
    // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
    // See also https://github.com/Fyrd/caniuse/issues/1928
    'Edge >= 12',
    'Explorer >= 10',
    // Out of leniency, we prefix these 1 version further back than the official policy.
    'iOS >= 9',
    'Safari >= 9',
    // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
    'Android >= 4.4',
    'Opera >= 30'
  ]
};

// Sass build task. Does the following:
// 1. Initialise sourcemaps
// 2. Compiles css from scss files in src directory
// 3. Autoprefixes the compiled css
// 4. Minifies the css
// 5. Writes sourcemaps
// 6. Move compiled css to /dist
// 7. Move compiled css to /docs
// 8. Reload browsers
gulp.task("styles", ["clean:css"], () => {
  return gulp
    .src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(gulp.dest(sassPaths.docsDest))
    .pipe(browserSync.stream());
});

// Task to build our index.html from partial files
// Puts the new file in /docs
gulp.task("html", () => {
  return gulp
    .src([htmlPaths.src])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(htmlPaths.docsDest))
    .pipe(browserSync.stream());
});

// Task to move favicon and docs.css to the /docs directory
gulp.task("move-assets", () => {
  gulp.src(moveableAssets)
  .pipe(gulp.dest(dirs.docs))
  .pipe(browserSync.stream());
});


// Browser sync task, creates a local server based off of the /docs directory
gulp.task("browser-sync", ["styles", "html", "move-assets"], () => {
  browserSync.init({
    server: {
      baseDir: dirs.docs
    }
  });
});

// Cleans out .css files from the /dist and /docs directories to ensure that extra 
// files are not left in there when deleted from /src
gulp.task("clean:css", () => {
  return del(
    'dist/styles/**/*',
    'docs/**/*.css'
  );
});

// Watch task, watches the following and reloads the browser on change:
// 1. .scss files in /src
// 2. .css files in /src
// 3. .html files in /src
gulp.task("watch", ["browser-sync"], () => {
  gulp.watch(`${dirs.src}/**/*.scss`, ["styles"])
  gulp.watch(`${dirs.src}/*.css`, ["move-assets"])
  gulp.watch(`${dirs.src}/**/*.html`, ["html"])
});

// Default task
gulp.task("default", ["watch"]);
