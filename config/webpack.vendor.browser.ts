import { allModules, configuration, nonTreeShakableModules } from "./webpack.vendor.common";
import * as helper from "./helper";
import * as merge from "webpack-merge";
import { Configuration, DllPlugin, optimize, Plugin } from "webpack";
export function browser(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    var plugins: Plugin[] = [
        new DllPlugin({
            path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];

    if (!isDevBuild) {
        plugins.push(new optimize.UglifyJsPlugin());
    }
    return merge(configuration(env), {
        entry: {
            // to keep development builds fast, include all vendor dependencies in the vendor bundle.
            // but for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
            vendor: isDevBuild ? allModules : nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    });
}