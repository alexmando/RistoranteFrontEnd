import { TestBed } from '@angular/core/testing';

import { AppService } from './auth.service.js';

describe('AppServiceTs', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
