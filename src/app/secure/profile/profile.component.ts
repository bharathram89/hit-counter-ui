import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserObjService } from '../../services/userObj.service';
 
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile {
  user :UserService;
  profile:FormGroup;
  fields={gamer_tag:'', clan_tag:'',about:'',current_password:'',new_password:'',confirm_new_password:'',email_com:'',promotional_com:'',products_com:'',facebook:'',twitter:'',youtube:'',pfPic:''}
  pageError:BehaviorSubject<boolean> = new BehaviorSubject(false);

  fbConnected: BehaviorSubject<boolean> = new BehaviorSubject(null);
  ytConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  twitterConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  gamerTag: BehaviorSubject<String> = new BehaviorSubject(null);
  clanTag: BehaviorSubject<String> = new BehaviorSubject("Choose a Clan Name!");
  userType:BehaviorSubject<String> = new BehaviorSubject(null);
  about: BehaviorSubject<String> = new BehaviorSubject("Tell us about your gear your game types");
  userObj:UserObjService;
  constructor(private router: Router,userObj:UserObjService){
    this.userObj = userObj;
    this.user = new UserService();

  } 

  ngOnInit() {
    this.profile = new FormGroup({

      "gamer_tag":new FormControl(this.fields.gamer_tag, [ 
      ]), 
      "clan_tag":new FormControl(this.fields.clan_tag, [ 
      ]), 
      "about":new FormControl(this.fields.about, [ 
      ]), 
      "current_password":new FormControl(this.fields.current_password, [ 
      ]),
      "new_password":new FormControl(this.fields.new_password, [ 
      ]),
      "confirm_new_password":new FormControl(this.fields.confirm_new_password, [ 
      ]),
      "email_com":new FormControl(this.fields.email_com, [ 
      ]),
      "promotional_com":new FormControl(this.fields.promotional_com, [ 
      ]),
      "products_com":new FormControl(this.fields.products_com, [ 
      ]),
      "facebook":new FormControl(this.fields.facebook, [ 
      ]),
      "twitter":new FormControl(this.fields.twitter, [ 
      ]),
      "youtube":new FormControl(this.fields.youtube, [ 
      ]),
      "pfPic":new FormControl(this.fields.pfPic, [ 
      ]),
      
     }) 
    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.user.verifyToken(data).subscribe(isTokenValid=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          window.location.href.includes('newUser=true') ? $('#newUser').removeClass('d-none'):null;
          // let userData = JSON.parse(sessionStorage.getItem('token'));
          this.user.getUserInfo(data).subscribe(resp=>{
            let userData = resp.response[0];
            userData.youtube ? this.ytConnected.next(true) : this.ytConnected.next(false);
            userData.facebook ? this.fbConnected.next(true) :this.fbConnected.next(false);
            userData.twitter ?  this.twitterConnected.next(true) :this.twitterConnected.next(false);
            userData.gamerTag ? this.gamerTag.next(userData.gamerTag) :this.pageError.next(true);
            this.userObj.tag.next(userData.gamerTag);
            userData.clanTag ? this.clanTag.next(userData.clanTag) : null;
            userData.userType ? this.userType.next(userData.userType) : this.pageError.next(true);
            userData.about ? this.about.next (userData.about) : null;
             $('#loading').addClass('d-none')
            $('#main').removeClass('d-none')
           console.log(userData," sessionData")
          })
        }else{
          console.log(" toke call failed")

         $('#loading').addClass('d-none') 
         $('#pageError').removeClass('d-none');
        }
      },error => { 
        $('#loading').addClass('d-none');
        $('#pageError').removeClass('d-none');
      }
    )
    }else{
      this.router.navigate(['signOn'])
    }
  }

  onSave(){
    console.log(this.profile.value.gamer_tag,"aiiii")
    let data = "?token="+JSON.parse(sessionStorage.getItem('token')).token;
    let body = {
      "profile":{
        "gamer_tag":this.profile.value.gamer_tag,
        "clan_tag":this.profile.value.clan_tag,
        "about":this.profile.value.about,
        "oldPass":this.profile.value.current_password,
        "newPass":this.profile.value.new_password,
        "email_com":this.profile.value.email_com?1:0,
        "promotional_com":this.profile.value.promotional_com?1:0,
        "product_com":this.profile.value.product_com?1:0,
        "facebook":"",
        "twitter":"",
        "youtube":"",
        "pfPic":""
      }
    }
    this.user.saveProfileInfo(data,body).subscribe(success=>{
      
        $('#pfUpdatePass').removeClass('d-none'); 
    },
    err=>{
      $('#pfUpdateFailed').removeClass('d-none');
      //show profile update failed message
    })
  }

}



