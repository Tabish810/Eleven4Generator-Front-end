import { TestBed, inject } from '@angular/core/testing';

import { CusCalService } from './cus-cal.service';

describe('CusCalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CusCalService]
    });
  });

  it('should be created', inject([CusCalService], (service: CusCalService) => {
    expect(service).toBeTruthy();
  }));
});
