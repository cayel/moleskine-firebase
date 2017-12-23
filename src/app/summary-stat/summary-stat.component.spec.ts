import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStatComponent } from './summary-stat.component';

describe('SummaryStatComponent', () => {
  let component: SummaryStatComponent;
  let fixture: ComponentFixture<SummaryStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
