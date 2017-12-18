import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicSummaryComponent } from './comic-summary.component';

describe('ComicSummaryComponent', () => {
  let component: ComicSummaryComponent;
  let fixture: ComponentFixture<ComicSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
