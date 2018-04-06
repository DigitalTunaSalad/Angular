import "../theming/theme.scss";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppComponent, HomeComponent } from "./components";
import { AppRouteModule } from "./app.route.module";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { ORIGIN_URL } from "@nguniversal/aspnetcore-engine/tokens";
import { TranslateLoaderFactory } from "./translate-loader.factory";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({
            appId: "app-id" // make sure this matches with your Server NgModule
        }),
        HttpClientModule,
        TransferHttpCacheModule,
        BrowserTransferStateModule,
        FormsModule,
        AppRouteModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: TranslateLoaderFactory,
              deps: [HttpClient, [ORIGIN_URL]]
            }
          })
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers:[
        TranslateModule
    ]
})
export class AppSharedModule { }