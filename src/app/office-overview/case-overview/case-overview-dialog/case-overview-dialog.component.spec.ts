import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseOverviewDialogComponent } from './case-overview-dialog.component';

describe('CaseOverviewDialogComponent', () => {
  let component: CaseOverviewDialogComponent;
  let fixture: ComponentFixture<CaseOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
