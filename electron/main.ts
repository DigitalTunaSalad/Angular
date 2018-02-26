import * as electron from "electron";
import { BrowserWindow, App, InterceptFileProtocolRequest } from "electron";
import * as path from "path";
import * as url from "url";

class Main {
    private app: App;
    private window: BrowserWindow;
    public run():void {
        this.app = electron.app;
        // this method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // some APIs can only be used after this event occurs.
        this.app.on("ready", this.createWindow);

        // quit when all windows are closed.
        this.app.on("window-all-closed", () => {
            // on OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== "darwin") {
                this.app.quit();
            }
        });

        this.app.on("activate", () => {
            // on OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.window === null) {
                this.createWindow();
            }
        });
    }

    private createWindow(): void {
        // creates the browser window
        this.window = new BrowserWindow({ width: 1200, height: 900 });
        // loads the index.html of the app.
        this.window.loadURL(url.format({
            pathname: "index.html",
            protocol: "file:",
            slashes: true
        }));

        electron.protocol.interceptFileProtocol("file", (request: InterceptFileProtocolRequest, callback: (path: string) => void) => {
            let p: string;
            p = request.url.substr("file:///".length);
            p = path.join(__dirname, "build", p);
            callback(p);
        });
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
}

new Main().run();