const webpackConfig = require("../webpack.config");

module.exports = (config) => {
    const _config = {
        basePath: "",

        frameworks: ["jasmine"],

        files: [
            {
                pattern: "../client/boot.tests.ts",
                watched: false
            }
        ],

        preprocessors: {
            "../client/boot.tests.ts": ["webpack", "sourcemap"]
        },

        webpack: webpackConfig().filter(config => config.target !== "node"),

        webpackMiddleware: {
            stats: "errors-only"
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ["PhantomJS"],
        singleRun: true
    };

    config.set(_config);
};
