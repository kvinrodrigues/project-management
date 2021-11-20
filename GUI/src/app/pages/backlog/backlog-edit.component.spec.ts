import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogEditComponent } from './backlog-edit.component';

describe('BacklogEditComponent', () => {
  let component: BacklogEditComponent;
  let fixture: ComponentFixture<BacklogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
