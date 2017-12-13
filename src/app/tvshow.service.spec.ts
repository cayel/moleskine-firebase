import { TestBed, inject } from '@angular/core/testing';

import { TvshowService } from './tvshow.service';

describe('TvshowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvshowService]
    });
  });

  it('should be created', inject([TvshowService], (service: TvshowService) => {
    expect(service).toBeTruthy();
  }));
});
