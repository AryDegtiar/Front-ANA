/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfesoresService } from './profesores.service';

describe('Service: Profesores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfesoresService]
    });
  });

  it('should ...', inject([ProfesoresService], (service: ProfesoresService) => {
    expect(service).toBeTruthy();
  }));
});
