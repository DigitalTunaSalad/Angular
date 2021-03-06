import { Configuration, Rule, Plugin } from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { CheckerPlugin, TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as helper from "../common/path.helper";
export function configure(env: any): Configuration {
    const isDevBuild: boolean = !(env && env.prod);
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
            publicPath: "dist/" // webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: rules(isDevBuild)
        },
        plugins: plugins()
    };
}

function rules(isDevBuild: boolean): Rule[] {
    return [
        {
            test: /\.ts$/,
            use: isDevBuild ? [
                "awesome-typescript-loader",
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
            use: ExtractTextPlugin.extract({
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
    ];
}

function plugins(): Plugin[] {
    return [
        new CheckerPlugin(),
        new ExtractTextPlugin("theme.css")
    ];
}