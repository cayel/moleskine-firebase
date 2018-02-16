import { TestBed, inject } from '@angular/core/testing';

import { MovieReferenceService } from './movie-reference.service';

describe('MovieReferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieReferenceService]
    });
  });

  it('should be created', inject([MovieReferenceService], (service: MovieReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
