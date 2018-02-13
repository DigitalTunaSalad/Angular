"use strict";
exports.__esModule = true;
var webpack_vendor_server_1 = require("./config/webpack.vendor.server");
var webpack_vendor_browser_1 = require("./config/webpack.vendor.browser");
module.exports = function (env) {
    return [webpack_vendor_browser_1.browser(env), webpack_vendor_server_1.server(env)];
};
