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
import { PostAJobObjService } from '../../services/postAJob.service';
import {PostAJobObj} from "./poastAJob.model";
@Component({
  selector: 'postAJob',
  templateUrl: './postAJob.component.html',
  styleUrls: ['./postAJob.component.scss']
})
export class PostAJob {

  

  profile: FormGroup;
  currentUser: String;

  public userObjSvc: UserObjService;
  imageUrl = '../../../assets/logo.png'
  private isViewValid:Subject<boolean>;
  private firstPage:BehaviorSubject<boolean>;
  private secondPage:BehaviorSubject<boolean>;
  postAJobSvc: PostAJobObjService;
  constructor(postAJobSvc: PostAJobObjService,userObjSvc: UserObjService,private router: Router){
    this.postAJobSvc =postAJobSvc;
    this.isViewValid = new Subject();
    this.userObjSvc =userObjSvc;
    // this.firstPage = new BehaviorSubject(true);
    // this.secondPage = new BehaviorSubject(false);
    
  } 

  ngOnInit() {
      this.validateToken()
      this.isViewValid.subscribe(isTokenValid=>{

        this.userObjSvc.getUserObjectVO$().subscribe(data=>{
          console.log(data,"userDatashoe dhow",this.getCookie('userObj'))
          if(!isTokenValid || (data && data.userType != "RECRUITER")){//need API to check if auth token in cookie is valid.
            
            this.router.navigate(['signOn']);
          }else{
            this.postAJobSvc.setPostAJobObjectVO$(new PostAJobObj('','FirstStep'))
           
          }
        })
      })
     
      this.postAJobSvc.getPostAJobObjectVO$().subscribe(data=>{
        console.log(data,"post job obj")
        if(data && data.currentStep == 'FirstStep'){
  
          this.firstPage = new BehaviorSubject(true);
          this.secondPage = new BehaviorSubject(false);
        }else{
  
          this.firstPage = new BehaviorSubject(false);
          this.secondPage = new BehaviorSubject(true);
        }
        // if(data)
      })
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
      this.isViewValid.next(true);

      this.userObjSvc.getUserObjectVO$().subscribe(data=>{
        if(!data || !data.userType ){
          let user = new UserObj(response.userRole.name,response.firstName,response.lastName);
          this.userObjSvc.setUserObjectVO$( user);

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



