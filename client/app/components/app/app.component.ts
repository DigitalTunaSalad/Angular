import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public title: string = "App";
    constructor(public translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang("en");

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use("en");
    }
}
