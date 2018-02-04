// the common configuration
const common = require("./webpack.common");
const helper = require("./helper");
const merge = require("webpack-merge");
const webpack = require("webpack");
const AotPlugin = require("@ngtools/webpack").AotPlugin;
module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    var plugins = [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(helper.root("wwwroot", "dist", "vendor-manifest.json")),
            sourceType: "commonjs2",
            name: "./vendor"
        })
    ];
    if(!isDevBuild){
        // Plugins that apply in production builds only
        plugins.push(new AotPlugin({
            tsConfigPath: "./tsconfig.json",
            entryModule: helper.root("client", "app", "app.server.module.ts#AppModule"),
            exclude: ["./**/*.browser.ts"]
        }));
    }
    return merge(common(env), {
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