import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EDiaryOverviewComponent } from './e-diary-overview.component';

describe('EDiaryOverviewComponent', () => {
  let component: EDiaryOverviewComponent;
  let fixture: ComponentFixture<EDiaryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EDiaryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EDiaryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
