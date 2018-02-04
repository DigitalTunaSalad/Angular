import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent, HomeComponent } from "./components";
import { AppRouteModule } from "./app.route.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppRouteModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ]
})
export class AppSharedModule { }
