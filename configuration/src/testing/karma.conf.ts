import * as helper from "../common/path.helper";
import { configure } from "../app/common.config";
module.exports = (config) => {
    var _config: any = {
        basePath: "",

        frameworks: ["jasmine"],

        files: [
            { pattern: "./karma-test-shim.js", watched: false }
        ],

        preprocessors: {
            "./karma-test-shim.js": ["webpack", "sourcemap"]
        },

        webpack: configure({}),

        webpackMiddleware: {
            stats: "errors-only"
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO
    };

    config.set(_config);
};