import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseDialogComponent } from './add-case-dialog.component';

describe('AddCaseDialogComponent', () => {
  let component: AddCaseDialogComponent;
  let fixture: ComponentFixture<AddCaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
