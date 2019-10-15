import { TestBed } from '@angular/core/testing';

import { Filter.PipeService } from './filter.pipe.service';

describe('Filter.PipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Filter.PipeService = TestBed.get(Filter.PipeService);
    expect(service).toBeTruthy();
  });
});
