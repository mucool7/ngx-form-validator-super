import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export class CustomValidators{


  static validateRange(from:number,to:number):ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value

      if(value!=null && value!=undefined && value != '' ){

        if(!(value>=from && value<= to)){
          return {
              range:true
          }
        }

      }

      return null;
    };
  }
}
