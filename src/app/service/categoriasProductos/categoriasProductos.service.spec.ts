/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriasProductosService } from './categoriasProductos.service';

describe('Service: CategoriasProductos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriasProductosService]
    });
  });

  it('should ...', inject([CategoriasProductosService], (service: CategoriasProductosService) => {
    expect(service).toBeTruthy();
  }));
});
