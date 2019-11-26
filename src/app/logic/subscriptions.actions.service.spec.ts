import { TestBed } from '@angular/core/testing';

import { Subscriptions.ActionsService } from './subscriptions.actions.service';

describe('Subscriptions.ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Subscriptions.ActionsService = TestBed.get(Subscriptions.ActionsService);
    expect(service).toBeTruthy();
  });
});
