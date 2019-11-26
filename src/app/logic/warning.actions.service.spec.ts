import { TestBed } from '@angular/core/testing';

import { WarningActionsService } from './warning.actions.service';

describe('WarningActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarningActionsService = TestBed.get(WarningActionsService);
    expect(service).toBeTruthy();
  });
});
