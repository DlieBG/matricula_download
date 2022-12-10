import { TestBed } from '@angular/core/testing';

import { ListDownloaderService } from './list-downloader.service';

describe('ListDownloaderService', () => {
  let service: ListDownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
