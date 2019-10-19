import { TestBed } from '@angular/core/testing';

import { Prueba.MatriculaService } from './prueba.matricula.service';

describe('Prueba.MatriculaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Prueba.MatriculaService = TestBed.get(Prueba.MatriculaService);
    expect(service).toBeTruthy();
  });
});
