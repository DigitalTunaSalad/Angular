import { NgModule } from "@angular/core";
import { AppSharedModule } from "./app.shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./components";

@NgModule({
    imports: [
        AppSharedModule,
        BrowserModule
    ],
    providers:[
        {
            provide: "BASE_URL",
            useFactory: () => document.getElementsByTagName("base")[0].href
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}