import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'featureList',
  templateUrl: './featureList.component.html',
  styleUrls: ['./featureList.component.scss']
})
export class FeatureList {

  constructor(private router: Router){

    

  } 

  ngOnInit() { 
  }
  onSubmit(){
    
    
  } 


}



