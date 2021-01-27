import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserModelService } from '../../models/user.model';
 
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class Home {
  user :UserService;
  totalKills = 0;
  tagName;
  userModelSvc: UserModelService;
  
  kd = 0;
  constructor(private router: Router,userSvc:UserModelService){
    this.userModelSvc = userSvc
    this.user = new UserService();

  } 

  ngOnInit() {
    
    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.user.verifyToken(data).subscribe(isTokenValid=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          Observable.combineLatest([this.user.getPlayerStatsSummary(data) , this.user.getUserInfo(data)]).subscribe(
            ([playerStats,userInfo])=>{
              // console.log(playerStats,"playerStats ", userInfo, "user Info")
              if(userInfo.status ==200 && playerStats.status ==200 && this.setPlayerInfoInToken(userInfo.response[0])){  
                  
                  if(userInfo.response[0].status !== 'active'){ 
                    this.router.navigate(['profile']) 
                  }
                  if(playerStats.response[0].totalKills){
                    this.totalKills = playerStats.response[0].totalKills;
                    this.kd = playerStats.response[0].totalKills/playerStats.response[0].totalDeath;
                  
                  }
    
                  if(userInfo.response[0]){
                    this.tagName = userInfo.response[0].gamerTag
                  } 
                
              }else{
                console.log('TODO::: show error message suggest refresh')
              }
              
             },err=>{
                console.log('TODO::: show error message suggest refresh')

             })
       
        }else{
          this.router.navigate(['signOn']) 
        }
      },error => this.router.navigate(['signOn']))
      console.log(data,"data")
    }else{
      this.router.navigate(['signOn'])
    }
  }

  async setPlayerInfoInToken(userData){ 
    let data = JSON.parse(sessionStorage.getItem('token')); 
    const result = {
      ...data,
      ...userData,
    };
    sessionStorage.setItem('token',JSON.stringify(result))
    return true;

  }
  onSubmit(){
    
    
  } 


}



