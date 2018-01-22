import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStatComponent } from './book-stat.component';

describe('BookStatComponent', () => {
  let component: BookStatComponent;
  let fixture: ComponentFixture<BookStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
