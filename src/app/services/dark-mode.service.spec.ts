import { TestBed } from '@angular/core/testing';

import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('creado correctamente', () => {
    const service: DarkModeService = TestBed.get(DarkModeService);
    expect(service).toBeTruthy();
  });
});
