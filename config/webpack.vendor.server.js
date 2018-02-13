"use strict";
exports.__esModule = true;
var webpack_vendor_common_1 = require("./webpack.vendor.common");
var helper = require("./helper");
var merge = require("webpack-merge");
var webpack_1 = require("webpack");
function server(env) {
    return merge(webpack_vendor_common_1.configuration(env), {
        target: "node",
        resolve: { mainFields: ["main"] },
        entry: {
            // todo: set option too use node express
            vendor: webpack_vendor_common_1.allModules.concat(["aspnet-prerendering"])
        },
        output: {
            path: helper.root("client", "dist"),
            libraryTarget: "commonjs2"
        },
        plugins: [
            new webpack_1.DllPlugin({
                path: helper.root("client", "dist", "[name]-mainifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}
exports.server = server;
