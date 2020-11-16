import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'postAJob-Page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class PostAJobPage1 {

  
  profile: FormGroup;
  currentUser: String;

  private isViewValid:Subject<boolean>;
  imageUrl = '../../../assets/logo.png'
  constructor(private router: Router){
    this.isViewValid = new Subject();
    

  } 

  ngOnInit() {
      
      this.isViewValid.subscribe(isTokenValid=>{
        if(!isTokenValid){//need API to check if auth token in cookie is valid.
          
          this.router.navigate(['signOn']);
        }else{
          
        }
      })
      
      
    
  }


}



