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
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class Home {
  user :UserService;
  totalKills = 0;
  tagName;
  userModelSvc: UserModelService;
  userObj:UserObjService
  
  fbConnected: BehaviorSubject<boolean> = new BehaviorSubject(null);
  ytConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  twitterConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  gamerTag: BehaviorSubject<String> = new BehaviorSubject(null);
  about: BehaviorSubject<String> = new BehaviorSubject('Describe yourself in airsoft');
  clanTag: BehaviorSubject<String> = new BehaviorSubject("Choose a Clan Name!");
  numberOfGames: String='0';
  kd = '0';
  constructor(private router: Router,userSvc:UserModelService,userObj:UserObjService){
    this.userModelSvc = userSvc
    this.user = new UserService();
    this.userObj = userObj;
  } 

  ngOnInit() {
    
    $('#main').addClass('d-none')
    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.user.verifyToken(data).subscribe(isTokenValid=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          Observable.combineLatest([this.user.getPlayerStatsSummary(data) , this.user.getUserInfo(data)]).subscribe(
            ([playerStats,userInfo])=>{
              console.log(playerStats,"playerStats ", userInfo, "user Info")
              if(userInfo.status ==200 && playerStats.status ==200){  
                  $('#loading').addClass('d-none')
                  $('#main').removeClass('d-none')
                  if(userInfo.response[0].status !== 'active'){ 
                    this.router.navigate(['profile'], { queryParams: { newUser: true }}) 
                  }else{
                    if(userInfo.response[0]){
                      this.gamerTag.next(userInfo.response[0].gamerTag)
                      this.userObj.tag.next(userInfo.response[0].gamerTag);
                      this.clanTag.next(userInfo.response[0].clanTag)
                      this.about.next(userInfo.response[0].about)
                      this.fbConnected.next(userInfo.response[0].f)
                    }
                    if(playerStats.response[0].totalKills){
                      this.totalKills = playerStats.response[0].totalKills; 
                      this.kd =  (playerStats.response[0].totalKills/playerStats.response[0].totalDeath).toFixed(3);
                      this.numberOfGames = playerStats.response[0].totalGames
                    }
      
                   
                  
                  }
              }else{
                $('#pageLvlError').removeClass('d-none')
                console.log('TODO::: show error message suggest refresh')
              }
              
             },err=>{
              $('#pageLvlError').removeClass('d-none')
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



