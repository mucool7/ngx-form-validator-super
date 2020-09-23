import { Injectable } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { PanelLogic } from './panel-logic';


@Injectable({providedIn:'root'})
export class ValidatorLogic {

  formControl: any;
  ValidationLabels:any={}

  constructor(private panelLogic:PanelLogic){}

  private GetAllControls(controls) {

    let extractedControls = []
    for (let ctrl in controls) {

      if (controls[ctrl] instanceof FormControl) {
        controls[ctrl].name = ctrl;
        extractedControls.push(controls[ctrl])

        setTimeout(() => {


          // Setting control status to valid for elements thata are nto visible on UI
          if (controls[ctrl].nativeElement && (!document.body.contains(controls[ctrl].nativeElement))) {

            controls[ctrl].setValue(null);
            //controls[ctrl].clearValidators();
            controls[ctrl].errors = null;
            controls[ctrl].status = 'VALID';
            //console.log("Preset on DOM",controls[ctrl].name,document.body.contains(controls[ctrl].nativeElement))
          }
          else {
            controls[ctrl].updateValueAndValidity({ emitEvent: false });
          }

        }, 10)


      }

      if (controls[ctrl] instanceof FormArray) {

        extractedControls = [...extractedControls, ... this.GetAllControls(controls[ctrl].controls)]
      }

      if (controls[ctrl] instanceof FormGroup) {

        extractedControls = [...extractedControls, ... this.GetAllControls(controls[ctrl].controls)]
      }
    }

    return extractedControls;
  }

  public ValidateControls(changedControl) {

    try {
      let allControls = this.GetAllControls(this.formControl.form.controls);
      let controls = []
      let selectedControlIndex = -1;
      let hasError =false;


      if (changedControl) {
        selectedControlIndex = allControls.findIndex(x => (x.nativeElement && x.nativeElement.isSameNode(changedControl)));

        controls = allControls.map((x, index) => {
          if (index != selectedControlIndex) { return index }
          else
            return -1;
        }).filter((x) => x != -1)
      }


      //this.LowestControl=null
      allControls.forEach((formControl, index) => {

        if (formControl.nativeElement)
          if ((!controls.includes(index) && formControl.nativeElement.type == "checkbox") || (selectedControlIndex > -1 && (!controls.includes(index) || (index == selectedControlIndex))) || ((selectedControlIndex == -1) && formControl.nativeElement.type != "checkbox")) {
            this.AddRemoveErrorMsg(false, "", formControl.nativeElement);

            // Show validation msg only when forms submits not when control value changes
            if (!changedControl || index == selectedControlIndex) {
              for (let errorName in formControl.errors) {

                let erroObj = {};
                erroObj[errorName] = formControl.errors[errorName];

                hasError= true;

                // if(!changedControl)
                // this.focusOnValidation(formControl.nativeElement);

                this.AddRemoveErrorMsg(true, erroObj, formControl.nativeElement);
              }
            }
            controls.push(index);
          }
      })

      if(!hasError){
        this.formControl['form'].status ='VALID';
      }

    this.panelLogic.updateControlStatus(this.formControl,allControls);


      // if (this.LowestControl && !changedControl) {

      //     let yy = window.scrollY - Math.abs(this.LowestControl.y)
      //     window.scroll(0, yy - 300)
      //     this.LowestControl.ele.focus();

      //     this.toatser.error("Please fill the required details.", "Error !")

      // }


    }
    catch (ex) {

      console.error(ex)
    }

  }

  private GetValidationType(ele) {

    if (!ele.attributes["validationHint"]) {

      return 1;
    }
    let validationType = ele.attributes["validationHint"].value;
    if (validationType = "borderOnly") {
      return 2;
    }

    return 1;
  }

  private GetValidationContainer(ele) {
    if (!ele.attributes["validationContainerId"]) {

      return null;
    }

    return document.getElementById(ele.attributes["validationContainerId"].value) || null
  }

  private AddRemoveErrorMsg(isAdd, error, ele) {

    if (!ele || !ele.parentElement) { return; }


    let validationContainer = this.GetValidationContainer(ele) as any;
    let validationType = this.GetValidationType(ele);
    let childs: any[] = [];
    let errorName = error ? Object.keys(error)[0] : null;
    let errorObj = error ? error[errorName] : null;

    if (validationContainer) {

      if (validationContainer.childNodes.length > 0) {
        childs = validationContainer.childNodes;
      }

    }
    else {
      childs = ele.parentElement.childNodes;
    }

    if (validationType == 2) {
      ele.classList.remove('_BrdrError');

      if (validationContainer) {
        validationContainer.classList.remove('_BrdrError');
      }

    }

    for (let i = 0; i < childs.length; i++) {

      if (childs[i].classList && childs[i].classList.contains('_ErX')) {
        childs[i].remove();
      }
    }

    if (isAdd) {

      let div = document.createElement('div');

      if (validationType == 2) {


        if (validationContainer) {
          validationContainer.classList.add('_BrdrError');
        }
        else {
          ele.classList.add('_BrdrError');
        }
        return;
      }


      div.classList.add('_ErX')

      this.GetErrorMsg(errorName, errorLabel => {

        if (errorLabel && (errorObj.hasOwnProperty('requiredLength') || errorObj.hasOwnProperty('max'))) {
          errorLabel = errorLabel.replace('_', errorObj.requiredLength || errorObj.max)
        }


        div.innerHTML = ' <small  class="ngx-validation-label " >' + errorLabel + '</small>';

        // Adding validation msg to given container element
        if (validationContainer) {

          //If container has childs
          if (validationContainer.childNodes.lenght > 0) {
            validationContainer.children[validationContainer.children.length - 1].insertAdjacentElement('beforeend', div);

          }
          else {

            // if container has no child
            validationContainer.appendChild(div);

          }

        }
        else {
          // adding validation on from control it self
          ele.parentElement.insertAdjacentElement("beforeend", div);
        }

      })


    }


  }

  private GetErrorMsg(errorCode,cb){
    let eCode={
        required:"This field is required.",
        email:"Invalid email.",
        number:"Invalid number",
        max:"Maxlength exceeds",
        minlength:"Minimum length of this field must be _ .",
        invalidOfficerTitle:"Select valid Officer Title.",
        requiredExpiryDate:"Please enter card's expiry date.",
        inavlidExpiryDate:"Past date is not allowed",
        phoneLength:"Phone number must be _ digits long.",
        zipLength:"Zip must be _ digits long.",
    }

    cb(this.ValidationLabels[errorCode]);

}

  public TogglePanel(){
    this.panelLogic.IsConsoleShow =!this.panelLogic.IsConsoleShow;
    this.panelLogic.updateControlStatus(this.formControl,this.GetAllControls(this.formControl.form.controls));

  }
}
