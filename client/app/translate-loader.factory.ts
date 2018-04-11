import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const TranslateLoaderFactory: (http: HttpClient, baseHref: string) => TranslateHttpLoader =
    (http: HttpClient, baseHref: string) => {
        // temporary Azure hack
        if (baseHref === null && typeof window !== "undefined") {
            baseHref = window.location.origin;
        }
        // i18n files are in `wwwroot/`
        return new TranslateHttpLoader(http, `${baseHref}/i18n/`, ".json");
    };