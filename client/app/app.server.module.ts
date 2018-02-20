import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppSharedModule } from "./app.shared.module";
import { AppComponent } from "./components";

import { ServerPrebootModule } from "preboot/server";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // our Common AppModule
    AppSharedModule,

    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: "app" }),
    NoopAnimationsModule
  ]
})
export class AppModule {

}
