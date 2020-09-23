# NgxFormValidator

A super flexible and time saving Validation logic handeling directive for Angular Reactive forms.

## App module
```typescript
...
import { NgxFormValidatorModule, NgxValidatorLabelService } from "ngx-form-validator-super";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    // 1. Import in app module
    NgxFormValidatorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // 2. Add validation messages using NgxValidatorLabelService service (you can inject this service in any component) `
  constructor(private labelService:NgxValidatorLabelService){

    labelService.setValidationMsg(
      {
       required :"It is a required field. please fill some value",
       range:"value must be in range"
      }
    )
  } 
```

## AppComponent.html
```html
<form [formGroup]="Form" ngxValidator>

   <input formControlName="test" />
   <button type="submit">
      submit
   </button>
</form>

```
## AppComponent.ts
```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Form= new FormGroup({
    test:new FormControl(null,Validators.required)
  })
}

```
## Styles and theme
```css
@import "ngx-form-validator-super/src/styless.css";
```
to modify look and feel use below class to overwrite
**.ngx-validation-label**

## Control Panel
you can check all the form controls in a reactive form on realtime to see there values changing and which validations are currently applicable. all this information in a small popup.
To View just press **shift+f8**

