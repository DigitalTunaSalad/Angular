import { HomeComponent } from "./home.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";

let fixture: ComponentFixture<HomeComponent>;

describe("Attributes", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [HomeComponent] });
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
    });

    it("should not fail", () => {
        expect(10).toBe(10);
    });
});