import { TestBed } from '@angular/core/testing';

import { GFormService } from './g-form.service';

describe('GFormService', () => {
  let service: GFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
