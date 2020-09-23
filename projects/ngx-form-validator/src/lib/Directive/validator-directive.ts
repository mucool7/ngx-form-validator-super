import { Directive, ElementRef, Optional, HostListener, ViewContainerRef } from '@angular/core';
import { NgControl, NgModel, ControlContainer } from '@angular/forms'
import { ValidatorLogic } from './validator-logic';

@Directive({
  selector: '[ngxValidator]'
})
export class NGXFormValidator {


  constructor(private controlContainer: ControlContainer,public ValidatorLogic: ValidatorLogic) {
  }
  ngOnInit() {

 }

  @HostListener("change", ["$event"]) change(event) {

    this.ValidatorLogic.formControl = this.controlContainer;
    if (event.srcElement.attributes.formcontrolname) {
      this.ValidatorLogic.ValidateControls(event.srcElement);
    }
  }

  @HostListener("submit", ["$event"]) submit(e) {
    //e.currentTarget.stopPropagation();

    this.ValidatorLogic.formControl = this.controlContainer

    this.ValidatorLogic.ValidateControls(null);
    e.target.onSubmit=null;
    return false;
  }

  @HostListener('document:keydown.shift.f8',['$event']) openPanel(){

    this.ValidatorLogic.formControl = this.controlContainer
    this.ValidatorLogic.TogglePanel();

  }

}







@Directive({
  selector: '[ngModel], [formControl], [formControlName]', // or 'input, select, textarea' - but then your controls won't be handled and also checking for undefined would be necessary
})
export class NativeElementInjectorDirective {
  constructor(private el: ElementRef, private control: NgControl, @Optional() private model: NgModel) {
    this.appendNativeElement();

  }

  @HostListener('change', ['$event']) onChange(event) {
    this.appendNativeElement();

  }

  ngAfterViewInit() {

    this.appendNativeElement();
  }

  private appendNativeElement() {
    if (!!this.model)
      (<any>this.model.control).nativeElement = this.el.nativeElement;
    else if(this.control.control)
      (<any>this.control.control).nativeElement = this.el.nativeElement;


  }
}
