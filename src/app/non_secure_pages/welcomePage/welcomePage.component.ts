import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'welcomePage',
  templateUrl: './welcomePage.component.html',
  styleUrls: ['./welcomePage.component.scss']
})
export class WelcomePage {

  constructor(private router: Router){

    

  } 

  ngOnInit() {
    
  }
  onSubmit(){
    
    
  } 


}



