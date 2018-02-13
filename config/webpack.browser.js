"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var merge = require("webpack-merge");
var webpack_common_1 = require("./webpack.common");
var helper = require("./helper");
var webpack_2 = require("@ngtools/webpack");
var path = require("path");
function browser(env) {
    var isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack_1.DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
        })
    ];
    if (isDevBuild) {
        plugins.push(
        // plugins that apply in development builds only
        new webpack_1.SourceMapDevToolPlugin({
            filename: "[file].map",
            // point sourcemap entries to the original file locations on disk
            moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]")
        }));
    }
    else {
        plugins.push.apply(plugins, [
            // plugins that apply in production builds only
            new webpack_2.AngularCompilerPlugin({
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.browser.module#AppModule")
            }),
            new webpack_1.optimize.UglifyJsPlugin()
        ]);
    }
    return merge(webpack_common_1.configuration(env), {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    });
}
exports.browser = browser;
