import { Injectable } from "@angular/core";
import { ValidatorLogic } from './validator-logic';

@Injectable({providedIn:'root'})
export class NgxValidatorLabelService{

  constructor(private ValidatorLogic: ValidatorLogic){

  }

  setValidationMsg(labels:any){
    this.ValidatorLogic.ValidationLabels= labels;
  }

  appendValidationMsg(labels:any){
    this.ValidatorLogic.ValidationLabels=Object.assign({},labels)
  }

  clearValidationMsg(){
    this.ValidatorLogic.ValidationLabels ={};
  }

}
