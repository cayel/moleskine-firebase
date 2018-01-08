import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertFormComponent } from './concert-form.component';

describe('ConcertFormComponent', () => {
  let component: ConcertFormComponent;
  let fixture: ComponentFixture<ConcertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
