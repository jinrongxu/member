const gulp = require("gulp");
const sass = require("gulp-sass");
const webServer = require("gulp-webserver");

gulp.task("devCss", () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
});
gulp.task("watch", () => {
    gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webServer({
            port: 5555,
            livereload: true,
            proxies: [{
                source: "/api/getUser",
                target: "http://localhost:3000/api/getUser"
            }, {
                source: "/api/getOne",
                target: "http://localhost:3000/api/getOne"
            }, {
                source: "/api/upDate",
                target: "http://localhost:3000/api/upDate"
            }, {
                source: "/api/getAdd",
                target: "http://localhost:3000/api/getAdd"
            }, {
                source: "/api/delete",
                target: "http://localhost:3000/api/delete"
            }, {
                source: "/api/search",
                target: "http://localhost:3000/api/search"
            }]
        }))

});
gulp.task("dev", gulp.series("server", "devCss", "watch"))