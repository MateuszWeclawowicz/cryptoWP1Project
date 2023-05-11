import { TestBed } from '@angular/core/testing';

import { CryptoloreApiService } from './cryptolore-api.service';

describe('CryptoloreApiService', () => {
  let service: CryptoloreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoloreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
