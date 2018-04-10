"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var merge = require("webpack-merge");
var common = require("./common.config");
var helper = require("../common/path.helper");
var path = require("path");
var webpack_2 = require("@ngtools/webpack");
function configure(env) {
    var isDevBuild = !(env && env.prod);
    var commonConfiguration = common.configure(env);
    var configuration = {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("dist", "browser")
        },
        plugins: plugins(isDevBuild),
        devtool: isDevBuild ? "cheap-eval-source-map" : false,
        node: {
            fs: "empty"
        }
    };
    return merge(commonConfiguration, configuration);
}
exports.configure = configure;
function plugins(isDevBuild) {
    if (isDevBuild) {
        return [
            new webpack_1.DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("dist", "browser", "vendor-manifest.json"))
            }),
            new webpack_1.SourceMapDevToolPlugin({
                filename: "[file].map",
                moduleFilenameTemplate: path.relative(helper.root("dist", "browser"), "[resourcePath]")
                // point sourcemap entries to the original file locations on disk
            }),
            new webpack_1.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, helper.root("client")),
            new CopyWebpackPlugin([
                { from: helper.root("assets"), to: helper.root("dist", "browser") }
            ], {})
        ];
    }
    else {
        return [
            new webpack_1.DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("dist", "browser", "vendor-manifest.json"))
            }),
            new webpack_2.AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.browser.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.browser.module#AppModule")
                // todo exclude in tsconfig exclude: ["./**/*.server.ts"]
            }),
            new webpack_1.optimize.UglifyJsPlugin({
                output: {
                    ascii_only: true
                }
            }),
            new CopyWebpackPlugin([
                { from: helper.root("assets"), to: helper.root("dist", "browser") }
            ], {})
        ];
    }
}
