import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { CreateUser } from '../../services/createUser.service';
import { UserModelService } from '../../../app/models/user.model';

@Component({
  selector: 'signOn',
  templateUrl: './signOn.component.html',
  styleUrls: ['./signOn.component.scss']
})
export class SignOn {
  login: FormGroup;
  createUserSvc:CreateUser;
  userModelSvc: UserModelService;
  fields={ email:'',password:''}
  constructor(private router: Router){

    this.createUserSvc = new CreateUser();
    this.userModelSvc = new UserModelService();

  } 

  ngOnInit() {
    this.login = new FormGroup({
 
      "email":new FormControl(this.fields.email, [
        Validators.required
      ]),
      "password":new FormControl(this.fields.password, [
        Validators.required
      ]),
      
     })
  

    if(window.location.href.includes('email') && window.location.href.includes('code')){
      let url = window.location.href;
      let email = url.substr(url.indexOf('email')+6,url.length-url.indexOf('email'));
      let code = url.substr(url.indexOf('code')+5,url.indexOf('&')-url.indexOf('code')-5);
      let data = "?email="+email+"&code="+code;
      this.createUserSvc.verifyGamer(data).subscribe((responseData)=>{
        console.log(responseData,"data")
        if(responseData.status = 200){
          $('#verificationComplete').removeClass('d-none')
          //verification success 
        }else{
          $('#verficationFailed').removeClass('d-none')
          //verification failed call us
        }
      })
      //need to call verifyPlayer
      //http://localhost:4200/confirmEmail?code=a2433138e4b5d4adc30368e2b1618347c5de390defa99a603fcc78b032cb7b4fd3f8ab3a6a6223cd4c927d3e709fd978c5418d1dd978e90306d19e6a7836860af672b07b836cdb42aa2ab0394c486c0ece4f231177819d83713edc9b392cb8520cb3ff6d6a2168b4877a94cb33&email=bharathram89@gmail.com
    }
  }
  onSubmit(){
    let data="?email="+this.login.value.email+"&password="+this.login.value.password+"&userType=player";
    this.createUserSvc.playerLogin(data).subscribe((loginResponse)=>{ 
      if( loginResponse.xhr.getResponseHeader('hit-token')){
        console.log(loginResponse," loginResponse ")
        let token =  loginResponse.xhr.getResponseHeader('hit-token');
        this.userModelSvc.setInitial(loginResponse.response.email,token)  
          let user = JSON.stringify({'token':token,"user":loginResponse.response.email});
          sessionStorage.setItem("token",user) 
          this.router.navigate(['home'])
          console.log('Response for login!',token,user) 
      }else{ 
        $('#signOnIssue').removeClass('d-none')
      }
    })
  } 

  get email() { return this.login.get('email'); }
  get password() { return this.login.get('password'); }

}



