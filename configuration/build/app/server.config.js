"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var merge = require("webpack-merge");
var common = require("./common.config");
var helper = require("../common/path.helper");
var webpack_2 = require("@ngtools/webpack");
function configure(env) {
    var commonConfiguration = common.configure(env);
    var isDevBuild = !(env && env.prod);
    var configuration = {
        entry: {
            "server": isDevBuild ? helper.root("client", "boot.server.ts") : helper.root("client", "boot.server.production.ts")
        },
        plugins: plugins(isDevBuild),
        output: {
            libraryTarget: "commonjs",
            path: helper.root("client", "dist")
        },
        target: "node",
        // switch to "inline-source-map" if you want to debug the TS during SSR
        devtool: isDevBuild ? "cheap-eval-source-map" : false
    };
    return merge(commonConfiguration, configuration);
}
exports.configure = configure;
function plugins(isDevBuild) {
    if (isDevBuild) {
        return [
            new webpack_1.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new webpack_1.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client"))
        ];
    }
    else {
        return [
            new webpack_1.optimize.UglifyJsPlugin({
                mangle: false,
                compress: false,
                output: {
                    ascii_only: true
                }
            }),
            // plugins that apply in production builds only
            new webpack_2.AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.server.production.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.server.module#AppModule")
                // todo: exclude in tsconfig exclude: ['./**/*.browser.ts']
            })
        ];
    }
}
