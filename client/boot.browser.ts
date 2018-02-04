import "reflect-metadata";
import "zone.js";
import "./theming/theme.scss";
import { AppModule } from "./app/app.browser.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModuleRef, enableProdMode } from "@angular/core";
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        const oldRootElem: Element | null = document.querySelector("app");
        const newRootElem: Element | null = document.createElement("app");
        oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
        modulePromise.then(appModule => appModule.destroy());
    });
} else {
    enableProdMode();
}

const modulePromise: Promise<NgModuleRef<AppModule>> = platformBrowserDynamic().bootstrapModule(AppModule);