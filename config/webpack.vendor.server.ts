import { configuration, allModules} from "./webpack.vendor.common";
import * as helper from "./helper";
import * as merge from "webpack-merge";
import { Configuration, DllPlugin } from "webpack";
export function server(env: any): Configuration {
    return merge(configuration(env), {
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
            new DllPlugin({
                path: helper.root("client", "dist", "[name]-mainifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });
}