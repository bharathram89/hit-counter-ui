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
    if(window.location.href.includes('welcomePage')){
      $('#top_nav_home').addClass('active')
      $('#top_nav_register').removeClass('active')
    }else if(window.location.href.includes('register')){
      $('#top_nav_home').removeClass('active')
      $('#top_nav_register').addClass('active')

    }else{

    }
  }
  onSubmit(){
    
    
  } 


}



