import { TestBed } from '@angular/core/testing';

import { ParserJobService } from './parser-job.service';

describe('ParserJobService', () => {
  let service: ParserJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
