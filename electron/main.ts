import * as electron from "electron";
import { BrowserWindow, App } from "electron";
import * as url from "url";
import { getConfig, IConfig } from "./config/config";
import { execFile, ChildProcess, exec } from "child_process";
class Main {
    private app: App | undefined;
    private config: IConfig | undefined;
    private window: BrowserWindow | undefined | null;
    private process: ChildProcess | undefined;
    public run(): void {
        this.config = getConfig();
        if (this.config.isDevBuild) {
            this.process = exec("npm start", (error: Error, stdout: string, stderr: string) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                // check for a signal that the process has started completly
                // then start up the app/window
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
        } else {
            this.process = execFile(this.config.exec as string, [], (error: Error, stdout: string, stderr: string) => {
                if (error) {
                    return;
                }
                // check for a signal that the process has started completly
                // then start up the app/window
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
        }

        this.process.stdout.on("data", d => {
            d = d.toString();
            if (d.indexOf("Application started") !== -1) {
                console.log("Starting app");
                this.createWindow();
            }
            console.log(d);
        });

        this.initApp();
    }

    private initApp(): void {
        this.app = electron.app;
        // this method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // some APIs can only be used after this event occurs.
        this.app.on("ready", this.createWindow);

        // quit when all windows are closed.
        this.app.on("window-all-closed", () => {
            // on OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== "darwin" && this.app) {
                this.app.quit();
            }
            this.process.kill();
        });

        this.app.on("activate", () => {
            // on OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            // if (this.window === null) {
            //     this.createWindow();
            // }
        });
    }

    private createWindow(): void {
        // creates the browser window
        this.window = new BrowserWindow({ width: 1200, height: 900 });
        // loads the index.html of the app.
        this.window.loadURL(url.format({
            pathname: this.config ? this.config.url : "localhost:5000",
            protocol: "http:",
            slashes: true,
            port: this.config ? this.config.port : 5000
        }));
        // open the DevTools.
        this.window.webContents.openDevTools();

        // emitted when the window is closed.
        this.window.on("closed", () => {
            // dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.window = null;
        });
    }

    private createSplashScreen(): void {
        console.log("TODO");
    }
}

new Main().run();