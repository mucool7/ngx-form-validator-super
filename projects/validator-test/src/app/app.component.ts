import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from "./CustomValidators/match-password-validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'validatorTest';

  Form=new FormGroup({

    Email:new FormControl(null,[Validators.required,Validators.email]),
    Password1:new FormControl(null,[Validators.required]),
    Password2:new FormControl(null,[Validators.required,PasswordValidator.matchPassword]),

 })

 constructor(){

 }

 onSubmit(){

  alert('Submit Called')
 }
}
