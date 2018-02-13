import { IgnorePlugin, ContextReplacementPlugin, Configuration } from "webpack";
import * as helper from "./helper";

export const treeShakableModules: string[] = [
    "@angular/animations",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    "zone.js",
];

export const nonTreeShakableModules: string[] = [
    "es6-promise",
    "es6-shim",
    "event-source-polyfill"
];

export const allModules: string[] = [
    ...treeShakableModules,
    ... nonTreeShakableModules
];

export function configuration(env: any): Configuration {
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
            new ContextReplacementPlugin(/angular(\\|\/)core/, helper.root("client")),
            new IgnorePlugin(/^vertx$/) // workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };
}