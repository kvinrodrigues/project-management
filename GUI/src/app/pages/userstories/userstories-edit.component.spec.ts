import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserstoriesEditComponent} from './userstories-edit.component';

describe('UserstoriesEditComponent', () => {
    let component: UserstoriesEditComponent;
    let fixture: ComponentFixture<UserstoriesEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserstoriesEditComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserstoriesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
