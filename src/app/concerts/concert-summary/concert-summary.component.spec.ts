import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertSummaryComponent } from './concert-summary.component';

describe('ConcertSummaryComponent', () => {
  let component: ConcertSummaryComponent;
  let fixture: ComponentFixture<ConcertSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
