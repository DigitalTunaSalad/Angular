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

    return merge(common(env), {
        target: "node",
        resolve: { mainFields: ["main"] },
        entry: { 
            // todo: set option too use node express
            vendor: allModules.concat(["aspnet-prerendering"]) 
        },
        output: {
            path: helper.root("client", "dist"),
            libraryTarget: "commonjs2",
        },
        plugins: [
            new webpack.DllPlugin({
                path: helper.root("client", "dist", "[name]-mainifest.json"), 
                name: "[name]_[hash]"
            })
        ]
    });
}