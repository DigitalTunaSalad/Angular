"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var merge = require("webpack-merge");
var common = require("./common.config");
var helper = require("../common/path.helper");
function configure(env) {
    var commonConfiguration = common.configure(env);
    var configuration = {
        target: "node",
        resolve: { mainFields: ["main"] },
        entry: {
            vendor: common.allModules.concat(["aspnet-prerendering"])
        },
        output: {
            path: helper.root("client", "dist"),
            libraryTarget: "commonjs2"
        },
        plugins: plugins()
    };
    return merge(commonConfiguration, configuration);
}
exports.configure = configure;
function plugins() {
    return [
        new webpack_1.DllPlugin({
            context: __dirname,
            path: helper.root("client", "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];
}
