import { TestBed } from '@angular/core/testing';

import { Worker.ActionsService } from './worker.actions.service';

describe('Worker.ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Worker.ActionsService = TestBed.get(Worker.ActionsService);
    expect(service).toBeTruthy();
  });
});
