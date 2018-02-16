import { Configuration, Plugin, DllPlugin } from "webpack";
import * as merge from "webpack-merge";
import * as common from "./common.config";
import * as helper from "../common/path.helper";
export function configure(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    const commonConfiguration: Configuration = common.configure(env);
    const configuration: Configuration = {
        entry: {
            vendor: isDevBuild ? common.allModules : common.nonTreeShakableModules
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins()
    };
    return merge(commonConfiguration, configuration);
}


function plugins(): Plugin[] {
    return [
        new DllPlugin({
            context: __dirname,
            path: helper.root("wwwroot", "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ];
}