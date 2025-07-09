import { TestBed } from '@angular/core/testing';

import { AppServiceTs } from './auth-service.js';

describe('AppServiceTs', () => {
  let service: AppServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
