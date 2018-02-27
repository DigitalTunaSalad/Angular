export interface IConfig {
    url: string;
    port: number;
}

export const getConfig: () => IConfig = (): IConfig => {
    const isDevBuild: boolean = !(process.env && process.env.prod);
    return {
        url: "localhost",
        port: 321123
    };
};