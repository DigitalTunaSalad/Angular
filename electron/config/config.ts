export interface IConfig {
    url: string;
    port: number;
}

module.exports = (env):IConfig =>  {
    const isDevBuild: boolean = !(env && env.prod);
    return {
        url: "localhost",
        port: 321123
    };
};