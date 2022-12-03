import { TestBed } from '@angular/core/testing';

import { ChurchBookService } from './church-book.service';

describe('ChurchBookService', () => {
  let service: ChurchBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
