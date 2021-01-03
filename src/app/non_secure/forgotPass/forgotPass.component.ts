import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'forgotPass',
  templateUrl: './forgotPass.component.html',
  styleUrls: ['./forgotPass.component.scss']
})
export class ForgotPass {

  
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
  onSubmit(){

    $.ajax({
      method:'GET',
        url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/users/resetPassword?userName="+this.profile.value.email
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
 
  get email() { return this.profile.get('email'); }

}



