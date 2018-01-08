import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowSummaryComponent } from './tvshow-summary.component';

describe('TvshowSummaryComponent', () => {
  let component: TvshowSummaryComponent;
  let fixture: ComponentFixture<TvshowSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
