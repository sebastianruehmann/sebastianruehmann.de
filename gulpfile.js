var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var handlebars = require('handlebars');
var gulpHandlebars = plugins.handlebarsHtml(handlebars);
var critical = require('critical');


/* Available startup modes are: 'production' & 'DEVELOPMENT' */
var mode = plugins.mode();
var psi = require('psi');
var site = 'https://sebastianruehmann.de';
var key = '';

var works = require('./src/work.json');

gulp.task('scss', function() {
    return gulp.src(['./src/scss/style.scss','./src/scss/imprint.scss'])
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(mode.production(plugins.cssmin()))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function(cb) {
        options = {
            partialsDirectory : ['./src/partials']
        };

    var templateData = {};
    var worksections = {};

    worksections.left = {};
    worksections.right = {};

    workslength = Object.keys(works).length;

    var top = {};
    top.left = 0;
    top.right = 0;
    var i = 0;
    for (var key in works) {
        if (works.hasOwnProperty(key)) {
            if (i % 2 == 1) {
                top = top + 50;
            }

            works[key].top = top;

            works[key].orientation = Math.round(i / 2) % 2 == 0  ? 'left' : 'right';

            if (i % 2 == 0) {
                worksections.left[key] = works[key];
                works[key].section = "left";
            } else {
                worksections.right[key] = works[key];
                works[key].section = "right";
            }

            i++;
        }
    }

    templateData.work = works;
    templateData.worksections = worksections;

    gulp.src(["./src/index.hbs","./src/impressum.hbs"])
        .pipe(gulpHandlebars(templateData, options))
        .pipe(mode.development(plugins.htmlhint()))
        .pipe(mode.production(plugins.htmlhint.reporter()))
        .pipe(mode.production(plugins.htmlmin({collapseWhitespace: true})))
        .pipe(plugins.rename({extname: ".html"}))
        .pipe(gulp.dest("./dist"));
});

/*gulp.task('critical', ['scss'], function() {
    critical.generate({
        base: 'dist/',
        src: 'index.html',
        css: 'dist/css/style.min.css',
        dimensions: [{
            width: 320,
            height: 480
        },{
            width: 768,
            height: 1024
        },{
            width: 1280,
            height: 960
        }],
        minify: true,
        ignore: ['@font-face',/url\(/],
        inlineImages: true,
        extract: true,
        dest: 'dist/css/critical.min.css'
    });
});*/

gulp.task('img', function() {
    gulp.src("./src/img/**/*")
        .pipe(plugins.imagemin())
        .pipe(gulp.dest("./dist/img"));
});

gulp.task('php', function() {
    gulp.src("./src/*.php")
        .pipe(gulp.dest("./dist/"));
});

gulp.task('misc', function() {
    gulp.src("./src/inc/**/*")
        .pipe(gulp.dest("./dist/inc"));
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-pack',['js'], function() {
    gulp.src(["./dist/js/index.js"])
        //.pipe(plugins.sourcemaps.init())
        .pipe(plugins.browserify({
            insertGlobals : true
        }))
        //.pipe(plugins.uglify())
        //.pipe(plugins.sourcemaps.write())
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('build', ['html','scss','js-pack','img','misc','php']);

gulp.task('test', ['desktop','mobile']);

gulp.task('watch',['build'], function() {
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch(['./src/**/*.hbs','./src/work.json'], ['html']);
    gulp.watch("./src/inc/*", ['misc']);
    gulp.watch("./src/img/*", ["img"]);
    gulp.watch("./src/*.php", ["php"]);
});


/* ################# TESTS #################### */
gulp.task('mobile', function () {
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('desktop', function() {
    return psi(site, {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

/* TODO Implement gulp-responsive images https://github.com/mahnunchik/gulp-responsive
/* TODO Test all this stuff */