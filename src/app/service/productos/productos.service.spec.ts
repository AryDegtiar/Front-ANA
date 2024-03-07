/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductosService } from './productos.service';

describe('Service: Productos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductosService]
    });
  });

  it('should ...', inject([ProductosService], (service: ProductosService) => {
    expect(service).toBeTruthy();
  }));
});
