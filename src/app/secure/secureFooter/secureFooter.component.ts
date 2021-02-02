import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserModelService } from '../../models/user.model';
import { UserObjService } from '../../services/userObj.service';
 
@Component({
  selector: 'secureFooter',
  templateUrl: './secureFooter.component.html',
  styleUrls: ['./secureFooter.component.scss']
})
export class SecureFooter {
  user :UserService;
  totalKills = 0;
  tagName; 
  userObjSvc:UserObjService
  fbConnected: BehaviorSubject<boolean> = new BehaviorSubject(null);
  ytConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  twitterConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  gamerTag: BehaviorSubject<String> = new BehaviorSubject(null);
  about: BehaviorSubject<String> = new BehaviorSubject('Describe yourself in airsoft');
  clanTag: BehaviorSubject<String> = new BehaviorSubject("Choose a Clan Name!");
  currentYear:String;
  kd = 0;
  constructor(private router: Router ,userObj:UserObjService){
    this.userObjSvc = userObj;
    this.user = new UserService();

  } 

  ngOnInit() {
 
    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.user.verifyToken(data).subscribe(isTokenValid=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          
        }else{
          this.router.navigate(['signOn']) 
        }
      },error => this.router.navigate(['signOn']))
      console.log(data,"data")
    }else{
      this.router.navigate(['signOn'])
    }
  }

  signOut(){
    sessionStorage.removeItem('token')
    this.router.navigate(["welcomePage"])
  }
  onSubmit(){
    
    
  } 


}



