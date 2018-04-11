import "zone.js/dist/zone-node";
import "./polyfills/server.polyfills";
import { createServerRenderer, BootFuncParams, RenderResult } from "aspnet-prerendering";
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from "@nguniversal/aspnetcore-engine";
import { enableProdMode } from "@angular/core";
const { AppModuleNgFactory } = require("./app/app.server.module.ngfactory");
enableProdMode();
export default createServerRenderer((params: BootFuncParams): Promise<RenderResult> => {
    let setupOptions: IEngineOptions;
    setupOptions = {
        appSelector: "<app></app>",
        request: params,
        providers: [
            // optional - Any other Server providers you want to pass
            // (remember you'll have to provide them for the Browser as well)
        ],
        ngModule: AppModuleNgFactory
    };
    return ngAspnetCoreEngine(setupOptions).then(response => {

        // apply your transferData to response.globals
        response.globals.transferData = createTransferScript({
            someData: "Transfer this to the client on the window.TRANSFER_CACHE {} object",
            fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
        });

        return ({
            html: response.html, // our <app-root> serialized
            globals: response.globals // all of our styles/scripts/meta-tags/link-tags for aspnet to serve up
        });
    });
});