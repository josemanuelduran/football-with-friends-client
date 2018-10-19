import { TestBed, inject } from '@angular/core/testing';

import { ValuationsService } from './valuations.service';

describe('ValuationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValuationsService]
    });
  });

  it('should be created', inject([ValuationsService], (service: ValuationsService) => {
    expect(service).toBeTruthy();
  }));
});
