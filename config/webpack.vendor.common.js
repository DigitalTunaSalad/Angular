"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var helper = require("./helper");
exports.treeShakableModules = [
    "@angular/animations",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    "zone.js",
];
exports.nonTreeShakableModules = [
    "es6-promise",
    "es6-shim",
    "event-source-polyfill"
];
exports.allModules = exports.treeShakableModules.concat(exports.nonTreeShakableModules);
function configuration(env) {
    return {
        stats: {
            modules: false
        },
        resolve: {
            extensions: [".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: "url-loader?limit=100000"
                }
            ]
        },
        output: {
            publicPath: "dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            new webpack_1.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new webpack_1.IgnorePlugin(/^vertx$/) // workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };
}
exports.configuration = configuration;
