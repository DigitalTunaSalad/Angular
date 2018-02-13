import { Configuration, Plugin, DllReferencePlugin } from "webpack";
import * as merge from "webpack-merge";
import { configuration } from "./webpack.common";
import * as helper from "./helper";
import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as path from "path";
export function server(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    var plugins: Plugin[] = [
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json")),
            sourceType: "commonjs2",
            name: "./vendor"
        })
    ];
    if (isDevBuild) {
        plugins.push(
            // plugins that apply in development builds only
            new AngularCompilerPlugin({
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.server.module#AppModule")
            })
        );
    }
    return merge(configuration(env), {
        resolve: {
            mainFields: ["main"]
        },
        entry: {
            "server": helper.root("client", "boot.server.ts")
        },
        plugins: plugins,
        output: {
            libraryTarget: "commonjs",
            path: helper.root("client", "dist")
        },
        target: "node",
        devtool: "inline-source-map"
    });
}