import { TestBed } from '@angular/core/testing';

import { CalculTotalsService } from './calcul-totals.service';

describe('CalculTotalsService', () => {
  let service: CalculTotalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculTotalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
