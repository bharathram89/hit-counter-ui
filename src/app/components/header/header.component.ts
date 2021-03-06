import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class Header {

  constructor(private router: Router){

    

  } 

  ngOnInit() {
     window.location.href.includes('register')? $("#nav_register").addClass('active'):null;
     window.location.href.includes('welcomePage')? $("#nav_home").addClass('active'):null;
     window.location.href.includes('nextRelease')? $("#nav_release").addClass('active'):null;
     window.location.href.includes('featureList')? $("#nav_featureList").addClass('active'):null;
  }
  onSubmit(){
    
    
  } 


}



