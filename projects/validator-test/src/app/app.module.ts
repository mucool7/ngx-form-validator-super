import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxFormValidatorModule, NgxValidatorLabelService } from "dist/ngx-form-validator";
import { DComponent } from "./sdsd/d.component";

@NgModule({
  declarations: [
    AppComponent,
    DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormValidatorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private labelService:NgxValidatorLabelService){
    labelService.setValidationMsg({
      required :"This field is required.",
      range:"value must be in range",
      minlength:"Minimum value must be _",
      email:"Invalid Email.",
      unMatchedPwd:"Password not matched."
    })
  }
}
