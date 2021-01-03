import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserObjService } from '../../services/userObj.service';
import { UserObj } from '../userObj.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile {

  
  profile: FormGroup;
  currentUser: String;

  public userObjSvc: UserObjService;
  private isViewValid:Subject<boolean>;

  imageData: any;
  private userName:String;


  imageUrl = '../../../assets/logo.png'
  constructor(userObjSvc: UserObjService,private router: Router){
    this.isViewValid = new Subject();
    this.userName = new String();
    this.userObjSvc =userObjSvc;
    

  } 

  ngOnInit() {
      this.validateToken()
      this.isViewValid.subscribe(isTokenValid=>{
        if(!isTokenValid){//need API to check if auth token in cookie is valid.
          
          this.router.navigate(['signOn']);
        }else{
          this.getPfPic();
          this.userObjSvc.getUserObjectVO$().subscribe(userData=>{
            this.currentUser = userData.userType;
            console.log(userData.firstName,"userdata")
            this.userName=userData.firstName + " " +userData.lastName;
            // this.replaceValue("#profileName","[[memberName]]",userData.firstName)
          })
        }
      })
      
  }

  getPfPic(){
    let token = this.getCookie("skippedAuthToken")
    $.ajax({
      method:'GET',
        url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/users/details",
        headers: {
              "X-SkippedAuth": token
            }
    }) 
    .then((response,huh,xhr) => {
      console.log(response,"we need thisss",huh)
      
        this.imageData = response.image.replace("/profile_pic","");
       
    })
    .catch((error) => {
     
    });
    
}
  replaceValue(locator,key,value){
    if($(locator).length === 1 ){
      $(locator).html(function(){
        return $(this).html().replace(key,value)
      })
    }
  }
  postAJob(){
console.log("POST A AJOB")
    this.router.navigate(['/portal/postAJob']);
  }

  validateToken(){
    let token = this.getCookie("skippedAuthToken")
    $.ajax({
      method:'GET',
        url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/users/me",
        headers: {
              "X-SkippedAuth": token
            }
    }) 
    .then((response,huh,xhr) => {

      this.userObjSvc.getUserObjectVO$().subscribe(data=>{
        if(!data || !data.userType ){
          let user = new UserObj(response.userRole.name,response.firstName,response.lastName);
          this.userObjSvc.setUserObjectVO$( user);
          this.isViewValid.next(true);
        }else{
          this.isViewValid.next(true);
        }
      })
    })
    .catch((error) => {
      this.isViewValid.next(false);
      this.router.navigate(['signOn']);
      console.log(error);

    });
    
  }
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
   getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }


}



