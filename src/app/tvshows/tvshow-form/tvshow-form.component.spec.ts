import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowFormComponent } from './tvshow-form.component';

describe('TvshowFormComponent', () => {
  let component: TvshowFormComponent;
  let fixture: ComponentFixture<TvshowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
