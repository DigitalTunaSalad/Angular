import { Configuration } from "webpack";
import * as client from "./client.config";
import * as server from "./server.config";
module.exports = (env: any):Configuration[] => {
    return [client.configure(env), server.configure(env)];
};