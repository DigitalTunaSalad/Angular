"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var awesome_typescript_loader_1 = require("awesome-typescript-loader");
var helper = require("./helper");
function configuration(env) {
    var isDevBuild = !(env && env.prod);
    var buildSass = env && env.sass;
    var extractTextPlugin = new ExtractTextPlugin({
        filename: "theme.css",
        disable: isDevBuild || buildSass
    });
    return {
        stats: {
            modules: false
        },
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts"]
        },
        output: {
            filename: "[name].js",
            publicPath: "dist/"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: isDevBuild ? [
                        "awesome-typescript-loader?silent=true",
                        "angular2-template-loader",
                        "angular2-router-loader"
                    ] : "@ngtools/webpack"
                },
                {
                    test: /\.html$/,
                    use: "html-loader?minimize=false"
                },
                {
                    test: /\.scss$/,
                    include: helper.root("client", "app"),
                    loaders: ["raw-loader", "sass-loader"]
                },
                {
                    test: /\.scss$/,
                    exclude: helper.root("client", "app"),
                    include: helper.root("client", "theming"),
                    use: extractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: "url-loader?limit=25000"
                }
            ]
        },
        plugins: [
            new awesome_typescript_loader_1.CheckerPlugin(),
            new webpack_1.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            extractTextPlugin
        ]
    };
}
exports.configuration = configuration;
