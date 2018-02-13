import { Configuration, Plugin, DllReferencePlugin, SourceMapDevToolPlugin, optimize} from "webpack";
import * as merge from "webpack-merge";
import { configuration } from "./webpack.common";
import * as helper from "./helper";
import { AngularCompilerPlugin } from "@ngtools/webpack";
import * as path from "path";
export function browser(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    var plugins: Plugin[] = [
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
        })
    ];
    if (isDevBuild) {
        plugins.push(
            // plugins that apply in development builds only
            new SourceMapDevToolPlugin({
                filename: "[file].map", // remove this line if you prefer inline source maps
                // point sourcemap entries to the original file locations on disk
                moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]")
            })
        );
    } else {
        plugins.push(...[
            // plugins that apply in production builds only
            new AngularCompilerPlugin({
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.browser.module#AppModule")
            }),
            new optimize.UglifyJsPlugin()
        ]);
    }
    return merge(configuration(env), {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    });
}