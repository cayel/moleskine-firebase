import { TestBed, inject } from '@angular/core/testing';

import { MovieDbService } from './moviedb.service';

describe('MovieDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDbService]
    });
  });

  it('should be created', inject([MovieDbService], (service: MovieDbService) => {
    expect(service).toBeTruthy();
  }));
});
