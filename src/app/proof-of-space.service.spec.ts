import { TestBed } from '@angular/core/testing';

import { ProofOfSpaceService } from './proof-of-space.service';

describe('ProofOfSpaceService', () => {
  let service: ProofOfSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofOfSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
