import { TestBed } from '@angular/core/testing';

import { VoterApiService } from './voter-api.service';

describe('VoterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoterApiService = TestBed.get(VoterApiService);
    expect(service).toBeTruthy();
  });
});
