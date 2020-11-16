import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { UserObjService } from '../../../services/userObj.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserObj } from '../../userObj.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'secureLeftNav',
  templateUrl: './secureLeftNav.component.html',
  styleUrls: ['./secureLeftNav.component.scss']
})
export class SecureLeftNav {

  userName: String;

  profile: FormGroup;
  currentUser: String;

  public userObjSvc: UserObjService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: UserObjService,private router: Router){

    this.userObjSvc =modelSvc;
    

  } 

  ngOnInit() {
   this.userObjSvc.getUserObjectVO$().subscribe(data=>{
     this.userName = data.firstName + ' ' + data.lastName;
   })
   if(window.location.href.includes('profile')){
    this.makeActive('#profile');
   }
    
  }
  makeActive(locator){
    if($(locator).length == 1){
      $(locator).addClass("active")
    }
  }
  signOn(){
    this.router.navigate(['signOn'])
  }
}



