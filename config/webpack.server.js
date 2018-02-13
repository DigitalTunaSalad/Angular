"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var merge = require("webpack-merge");
var webpack_common_1 = require("./webpack.common");
var helper = require("./helper");
var webpack_2 = require("@ngtools/webpack");
function server(env) {
    var isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack_1.DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json")),
            sourceType: "commonjs2",
            name: "./vendor"
        })
    ];
    if (isDevBuild) {
        plugins.push(
        // plugins that apply in development builds only
        new webpack_2.AngularCompilerPlugin({
            tsConfigPath: "./tsconfig.json",
            entryModule: helper.root("client", "app", "app.server.module#AppModule")
        }));
    }
    return merge(webpack_common_1.configuration(env), {
        resolve: {
            mainFields: ["main"]
        },
        entry: {
            "server": helper.root("client", "boot.server.ts")
        },
        plugins: plugins,
        output: {
            libraryTarget: "commonjs",
            path: helper.root("client", "dist")
        },
        target: "node",
        devtool: "inline-source-map"
    });
}
exports.server = server;
