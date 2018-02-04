const browser = require("./config/webpack.browser");
const server = require("./config/webpack.server");
module.exports = (env) => {
    return [browser(env), server(env)];
}