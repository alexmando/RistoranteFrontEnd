import { TestBed } from '@angular/core/testing';

import { AppTableService } from '../../services/app.table.service';

describe('AppTableService', () => {
  let service: AppTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
