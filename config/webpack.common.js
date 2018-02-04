const helper = require("./helper");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const buildSass = env && env.sass;
    const extractSass = new ExtractTextPlugin({
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
                    loaders: extractSass.extract({
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
            new CheckerPlugin(),
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            extractSass
        ]
    }
}