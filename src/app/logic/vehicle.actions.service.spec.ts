import { TestBed } from '@angular/core/testing';

import { Vehicle.ActionsService } from './vehicle.actions.service';

describe('Vehicle.ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Vehicle.ActionsService = TestBed.get(Vehicle.ActionsService);
    expect(service).toBeTruthy();
  });
});
