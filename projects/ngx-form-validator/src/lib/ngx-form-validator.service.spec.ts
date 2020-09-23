import { TestBed } from '@angular/core/testing';

import { NgxFormValidatorService } from './ngx-form-validator.service';

describe('NgxFormValidatorService', () => {
  let service: NgxFormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFormValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
