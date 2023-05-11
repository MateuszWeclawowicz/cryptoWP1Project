import { TestBed } from '@angular/core/testing';

import { CryptomarketsApiService } from './cryptomarkets-api.service';

describe('CryptomarketsApiService', () => {
  let service: CryptomarketsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptomarketsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
