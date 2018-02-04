// the common configuration
const common = require("./webpack.common");
const helper = require("./helper");
const merge = require("webpack-merge");
const webpack = require("webpack");
const AotPlugin = require("@ngtools/webpack").AotPlugin;
const path = require("path");
module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json"))
        })
    ];

    if (isDevBuild) {
        plugins.push(
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map", // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(helper.root("wwwroot", "dist"), "[resourcePath]") // Point sourcemap entries to the original file locations on disk
            })
        );
    } else {
        plugins.push(...[
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new AotPlugin({
                tsConfigPath: "./tsconfig.json",
                entryModule: helper.root("client", "app", "app.browser.module#AppModule"),
                exclude: ["/**/*.server.ts"]
            })
        ]);
    }
    return merge(common(env), {
        entry: {
            "app": helper.root("client", "boot.browser.ts")
        },
        output: {
            path: helper.root("wwwroot", "dist")
        },
        plugins: plugins
    });
}