import { Configuration } from "webpack";
import { server } from "./config/webpack.vendor.server";
import { browser } from "./config/webpack.vendor.browser";
module.exports = (env: any): Configuration[] => {
    return [browser(env), server(env)];
};