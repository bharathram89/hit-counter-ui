import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserObj } from '../../secure/userObj.model'
import { UserObjService } from '../../services/userObj.service';
@Component({
  selector: 'signOn',
  templateUrl: './SignOn.component.html',
  styleUrls: ['./SignOn.component.scss']
})
export class SignOn {

  
  hero = { email:"", pass:""};

  profile: FormGroup;
  currentUser: String;

  public modelSvc: RegisterModelService;
  public userObjSvc: UserObjService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router,userObjService : UserObjService){

    this.modelSvc =modelSvc;
    this.userObjSvc = userObjService;
  } 

  ngOnInit() {
    this.profile= new FormGroup({
      'email': new FormControl(this.hero.email, [
        Validators.required,
        Validators.email
      ]),
      'pass': new FormControl(this.hero.pass, [
        Validators.required
        //[A-Z]+[0-9]+[@#\$&]*
      ])
    });
  }
  onSubmit(){
    let that  = this;
    $.ajax({
      method:'POST',
        url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/login",
        data: JSON.stringify({
              userName: this.profile.value.email,
              password: this.profile.value.pass
            })
    }) 
    .then((response,huh,xhr) => {
      let respHead = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
      var headerMap = {};
      respHead.forEach(function (line) {
        var parts = line.split(': ');
        var header = parts.shift();
        var value = parts.join(': ');
        headerMap[header] = value;
      });
      console.log(headerMap['x-skippedauth'],"resp",response);
      // userObjService
      let user = new UserObj(response.userRole.name,response.firstName,response.lastName);
      this.userObjSvc.setUserObjectVO$( user);
      this.setCookie("skippedAuthToken",headerMap['x-skippedauth'],2)
      this.router.navigate(['/portal/profile']);
    })
    .catch((error) => {
      $('#signOnFailed').removeAttr('style')
      console.log(error);
    });
    
  }
  get email() { return this.profile.get('email'); }

  get pass() { return this.profile.get('pass'); }

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



