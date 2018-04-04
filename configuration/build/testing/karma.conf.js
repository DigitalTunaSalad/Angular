"use strict";
exports.__esModule = true;
var common_config_1 = require("../app/common.config");
module.exports = function (config) {
    var _config = {
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            { pattern: "./karma-test-shim.js", watched: false }
        ],
        preprocessors: {
            "./karma-test-shim.js": ["webpack", "sourcemap"]
        },
        webpack: common_config_1.configure({}),
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
