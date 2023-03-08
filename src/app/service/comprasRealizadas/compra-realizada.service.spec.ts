import { TestBed } from '@angular/core/testing';

import { CompraRealizadaService } from './compra-realizada.service';

describe('CompraRealizadaService', () => {
  let service: CompraRealizadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraRealizadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
