import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'nextRelease',
  templateUrl: './nextRelease.component.html',
  styleUrls: ['./nextRelease.component.scss']
})
export class NextRelease {

  constructor(private router: Router){

    

  } 

  ngOnInit() {
     window.location.href.includes('register')? $("#nav_register").addClass('active'):null;
     window.location.href.includes('welcomePage')? $("#nav_home").addClass('active'):null;
     window.location.href.includes('release')? $("#nav_release").addClass('active'):null;
  }
  onSubmit(){
    
    
  } 


}



