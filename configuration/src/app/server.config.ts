import { Configuration, ContextReplacementPlugin, Plugin, optimize } from "webpack";
import * as merge from "webpack-merge";
import * as common from "./common.config";
import * as helper from "../common/path.helper";
import { AngularCompilerPlugin } from "@ngtools/webpack";
export function configure(env: any): Configuration {
    const commonConfiguration: Configuration = common.configure(env);
    const isDevBuild: boolean = !(env && env.prod);
    const configuration: Configuration = {
        entry: {
            "server": isDevBuild ? helper.root("client", "boot.server.ts") : helper.root("client", "boot.server.production.ts")
        },
        plugins: plugins(isDevBuild),
        output: {
            libraryTarget: "commonjs",
            path: helper.root("client", "dist")
        },
        target: "node",
        // switch to "inline-source-map" if you want to debug the TS during SSR
        devtool: isDevBuild ? "cheap-eval-source-map" : false
    };
    return merge(commonConfiguration, configuration);
}


function plugins(isDevBuild: boolean): Plugin[] {
    if (isDevBuild) {
        return [
            new ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, helper.root("client"))
        ];
    } else {
        return [
            new optimize.UglifyJsPlugin({
                mangle: false,
                compress: false,
                output: (<any>{
                    ascii_only: true,
                })
            }),
            // plugins that apply in production builds only
            new AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.server.production.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.server.module#AppModule")
                // todo: exclude in tsconfig exclude: ['./**/*.browser.ts']
            })
        ];
    }
}