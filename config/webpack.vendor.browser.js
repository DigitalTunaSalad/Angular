"use strict";
exports.__esModule = true;
var webpack_vendor_common_1 = require("./webpack.vendor.common");
var helper = require("./helper");
var merge = require("webpack-merge");
var webpack_1 = require("webpack");
function browser(env) {
    var isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack_1.DllPlugin({
            path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];
    if (!isDevBuild) {
        plugins.push(new webpack_1.optimize.UglifyJsPlugin());
    }
    return merge(webpack_vendor_common_1.configuration(env), {
        entry: {
            // to keep development builds fast, include all vendor dependencies in the vendor bundle.
            // but for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
            vendor: isDevBuild ? webpack_vendor_common_1.allModules : webpack_vendor_common_1.nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    });
}
exports.browser = browser;
