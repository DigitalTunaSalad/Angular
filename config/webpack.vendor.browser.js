// the common configuration
const common = require("./webpack.vendor.common");
const helper = require("./helper");
const merge = require("webpack-merge");
const webpack = require("webpack");

const treeShakableModules = [
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
const nonTreeShakableModules = [
    "es6-promise",
    "es6-shim",
    "event-source-polyfill"
];

const allModules = [...treeShakableModules, ...nonTreeShakableModules];

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack.DllPlugin({
            path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];

    if (!isDevBuild) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    return merge(common(env), {
        entry: {
            // To keep development builds fast, include all vendor dependencies in the vendor bundle.
            // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
            vendor: isDevBuild ? allModules : nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    })
}