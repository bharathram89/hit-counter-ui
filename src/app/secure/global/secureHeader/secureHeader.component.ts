import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { UserObj } from '../../userObj.model';
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserObjService } from '../../../services/userObj.service';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'secureHeader',
  templateUrl: './secureHeader.component.html',
  styleUrls: ['./secureHeader.component.scss']
})
export class SecureHeader {

  

  profile: FormGroup;
  currentUser: String;

  public modelSvc: UserObjService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: UserObjService,private router: Router){

    this.modelSvc =modelSvc;
    

  } 

  ngOnInit() {
   
    
  }
  signOn(){
    this.router.navigate(['signOn'])
  }
}



