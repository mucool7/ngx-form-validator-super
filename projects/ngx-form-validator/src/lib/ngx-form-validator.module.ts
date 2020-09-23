import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxFormValidatorComponent } from './ngx-form-validator.component';
import { NGXFormValidator, NativeElementInjectorDirective } from './Directive/validator-directive';
import { ValidatorLogic } from './Directive/validator-logic';
import { NgxValidatorLabelService } from './Directive/label-service';
import { TestComponent } from './pages/test/test.component';



@NgModule({
  declarations: [NgxFormValidatorComponent,NGXFormValidator,NativeElementInjectorDirective, TestComponent],
  imports: [
  ],
  exports: [NgxFormValidatorComponent,
           NGXFormValidator,
           NativeElementInjectorDirective
          ],
  providers:[

    ValidatorLogic,
    NgxValidatorLabelService
  ]
})
export class NgxFormValidatorModule {

  static forRoot(): ModuleWithProviders<NgxFormValidatorModule> {
    return {
      ngModule: NgxFormValidatorModule,
      providers: [NgxValidatorLabelService]
    };
  }

}
