import { RouterTestingModule } from "@angular/router/testing";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { TranslateModule, TranslateFakeLoader, TranslateLoader } from "@ngx-translate/core";
describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader
                    }
                })
            ],
            declarations: [
                AppComponent
            ],
            providers: [TranslateModule]
        }).compileComponents();
    }));
    it("should create the app", async(() => {
        const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        const app: AppComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'App'`, async(() => {
        const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        const app: AppComponent = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("App");
    }));
    it("should render copyright information in the footer", async(() => {
        const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.getElementsByClassName("footer")[0].textContent).toContain("© 2017 Digital Tuna Salad.  All rights reserved. ");
    }));
});
