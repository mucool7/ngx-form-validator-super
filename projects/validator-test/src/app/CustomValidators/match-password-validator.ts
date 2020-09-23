import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export class PasswordValidator{


  static matchPassword(control:AbstractControl): ValidationErrors {

    if(!control.parent){return null;}

      const password2 = control.value;
      const password1 = control.parent.get('Password1').value;

      if(password2 != password1){
        return{
          unMatchedPwd:true
        }
      }


      return null;
    };

}
