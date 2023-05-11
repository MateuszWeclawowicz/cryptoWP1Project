import { TestBed } from '@angular/core/testing';

import { CryptowatchlistApiService } from './cryptowatchlist-api.service';

describe('CryptowatchlistApiService', () => {
  let service: CryptowatchlistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptowatchlistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
