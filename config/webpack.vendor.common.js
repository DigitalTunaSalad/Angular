const webpack = require("webpack");
const helper = require("./helper");
module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return {
        stats: {
            modules: false
        },
        resolve: {
            extensions: [".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: "url-loader?limit=100000"
                }
            ]
        },
        output: {
            publicPath: "dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    }
}