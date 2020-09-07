import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'resendVerificationEmail',
  templateUrl: './resendVerificationEmail.component.html',
  styleUrls: ['./resendVerificationEmail.component.scss']
})
export class ResendVerificationEmail {

  
  hero = { email:""};

  profile: FormGroup;
  currentUser: String;

  public modelSvc: RegisterModelService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){

    this.modelSvc =modelSvc;
    

  } 

  ngOnInit() {
    this.profile= new FormGroup({
      'email': new FormControl(this.hero.email, [
        Validators.required,
        Validators.email
      ])
    });
   
    
  }
  get email() { return this.profile.get('email'); }

  onSubmit(){
    console.log(this.profile.value.email)
    $.ajax({
      method:'GET',
        url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/register/resendVerificationCode?userName="+this.profile.value.email,
        
    }) 
    .then((response) => {
      console.log(response);
      $('#sentMessage').removeAttr('style')

      $('#sendFailed').css("display:none");
      //show message saying email resent
    })
    .catch((error) => {
      $('#sendFailed').removeAttr('style')
      $('#sentMessage').css("display:none");
      console.log(error);
    });
  }

}



