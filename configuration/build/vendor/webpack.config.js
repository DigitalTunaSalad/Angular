"use strict";
exports.__esModule = true;
var client = require("./client.config");
var server = require("./server.config");
module.exports = function (env) {
    return [client.configure(env), server.configure(env)];
};
