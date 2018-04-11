"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var merge = require("webpack-merge");
var common = require("./common.config");
var helper = require("../common/path.helper");
function configure(env) {
    var isDevBuild = !(env && env.prod);
    var commonConfiguration = common.configure(env);
    var configuration = {
        entry: {
            vendor: isDevBuild ? common.allModules : common.nonTreeShakableModules
        },
        output: {
            path: helper.root("dist", "browser")
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
            path: helper.root("dist", "browser", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];
}
