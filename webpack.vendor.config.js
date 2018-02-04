const browser = require("./config/webpack.vendor.browser");
const server = require("./config/webpack.vendor.server");
module.exports = (env) => {
    return [browser(env), server(env)];
}