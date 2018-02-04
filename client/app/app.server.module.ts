import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { AppSharedModule } from "./app.shared.module";
import { AppComponent } from "./components";

@NgModule({
    imports: [
        ServerModule,
        AppSharedModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
