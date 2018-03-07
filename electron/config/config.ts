export interface IConfig {
    url: string;
    port: number;
    isDevBuild: boolean;
    exePath?: string;
}

export const getConfig: () => IConfig = (): IConfig => {
    const isDevBuild: boolean = !(process.env && process.env.prod);
    return {
        url: "localhost:5000",
        port: 321123,
        isDevBuild: isDevBuild
    };
};