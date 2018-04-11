import { RouterModule, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent, AboutComponent } from "./components";
export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot([
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "**", redirectTo: "home" }
], {
        // router options
        useHash: false,
        preloadingStrategy: PreloadAllModules,
        initialNavigation: "enabled"
    });