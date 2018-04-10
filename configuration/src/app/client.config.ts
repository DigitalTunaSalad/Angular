import { Configuration, Plugin, DllReferencePlugin, SourceMapDevToolPlugin, optimize, ContextReplacementPlugin } from "webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as merge from "webpack-merge";
import * as common from "./common.config";
import * as helper from "../common/path.helper";
import * as path from "path";
import { AngularCompilerPlugin } from "@ngtools/webpack";
export function configure(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    const commonConfiguration: Configuration = common.configure(env);
    const configuration: Configuration = {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("dist", "browser")
        },
        plugins: plugins(isDevBuild),
        devtool: isDevBuild ? "cheap-eval-source-map" : false,
        node: {
            fs: "empty"
        }
    };
    return merge(commonConfiguration, configuration);
}


function plugins(isDevBuild: boolean): Plugin[] {
    if (isDevBuild) {
        return [
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("dist", "browser", "vendor-manifest.json"))
            }),
            new SourceMapDevToolPlugin({
                filename: "[file].map", // remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(helper.root("dist", "browser"), "[resourcePath]")
                // point sourcemap entries to the original file locations on disk
            }),
            new ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, helper.root("client")),
            new CopyWebpackPlugin([
                { from: helper.root("assets"), to: helper.root("dist", "browser") }
            ], {})
        ];
    } else {
        return [
            new DllReferencePlugin({
                context: __dirname,
                manifest: require(helper.root("dist", "browser", "vendor-manifest.json"))
            }),
            new AngularCompilerPlugin({
                mainPath: helper.root("client", "boot.browser.ts"),
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.browser.module#AppModule")
                // todo exclude in tsconfig exclude: ["./**/*.server.ts"]
            }),
            new optimize.UglifyJsPlugin({
                output: (<any>{
                    ascii_only: true,
                })
            }),
            new CopyWebpackPlugin([
                { from: helper.root("assets"), to: helper.root("dist", "browser") }
            ], {})
        ];
    }
}