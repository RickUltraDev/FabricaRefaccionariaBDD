import { TestBed } from '@angular/core/testing';

import { PiezaService } from './pieza.service';

describe('PiezaService', () => {
  let service: PiezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
