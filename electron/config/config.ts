export interface IConfig {
    url: string;
    port: number;
    isDevBuild: boolean;
    exec?: string;
}

export function getConfig(): IConfig {
    const isDevBuild: boolean = !(process.env && process.env.prod);
    return {
        url: "localhost:5000",
        port: 321123,
        isDevBuild: isDevBuild,
        exec: "../../npm start"
    };
}