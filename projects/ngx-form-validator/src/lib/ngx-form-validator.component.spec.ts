import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormValidatorComponent } from './ngx-form-validator.component';

describe('NgxFormValidatorComponent', () => {
  let component: NgxFormValidatorComponent;
  let fixture: ComponentFixture<NgxFormValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
