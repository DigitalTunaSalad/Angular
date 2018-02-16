import { RouterModule, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components";
export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot([
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "**", redirectTo: "home" }
], {
        // router options
        useHash: false,
        preloadingStrategy: PreloadAllModules,
        initialNavigation: "enabled"
    });