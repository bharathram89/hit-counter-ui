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
  imageData: any;
  public userObjSvc: UserObjService;
  imageUrl = '../../../assets/logo.png'
  private userType:String;

  constructor(userObjSvc: UserObjService,private router: Router){

    this.userObjSvc =userObjSvc;
    

  } 

  ngOnInit() {
    this.userObjSvc.getUserObjectVO$().subscribe(data=>{
      this.userType = data.userType;
      this.getPfPic();
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


  SignOut(){
    // this.router.navigate(['signOn'])
    this.delete_cookie('skippedAuthToken','/','')
  }
  get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
  }
  delete_cookie( name, path, domain ) {
    if( this.get_cookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
}



