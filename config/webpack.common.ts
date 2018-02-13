import { Configuration, ContextReplacementPlugin } from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as helper from "./helper";
export function configuration(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
    const buildSass: boolean = env && env.sass;
    const extractTextPlugin: ExtractTextPlugin = new ExtractTextPlugin({
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
            new CheckerPlugin(),
            new ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            extractTextPlugin
        ]
    };
}