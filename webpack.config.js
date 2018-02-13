"use strict";
exports.__esModule = true;
var webpack_server_1 = require("./config/webpack.server");
var webpack_browser_1 = require("./config/webpack.browser");
module.exports = function (env) {
    return [webpack_browser_1.browser(env), webpack_server_1.server(env)];
};
