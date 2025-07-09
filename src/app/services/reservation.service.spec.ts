import { TestBed } from '@angular/core/testing';

import { AppReservationService } from './reservation.service';

describe('AppReservationService', () => {
  let service: AppReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
