import { Configuration, Plugin, DllPlugin } from "webpack";
import * as merge from "webpack-merge";
import * as common from "./common.config";
import * as helper from "../common/path.helper";
export function configure(env: any): Configuration {
    const commonConfiguration: Configuration = common.configure(env);
    const configuration: Configuration = {
        target: "node",
        resolve: { mainFields: ["main"] },
        entry: {
            vendor: common.allModules.concat(["aspnet-prerendering"])
        },
        output: {
            path: helper.root("dist", "server"),
            libraryTarget: "commonjs2"
        },
        plugins: plugins()
    };
    return merge(commonConfiguration, configuration);
}


function plugins(): Plugin[] {
    return [
        new DllPlugin({
            context: __dirname,
            path: helper.root("dist", "server", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];
}