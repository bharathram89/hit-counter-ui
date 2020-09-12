import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { validateConfig } from '@angular/router/src/config';
import { FormGroup, FormControl,Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'register2',
  templateUrl: './RegisterPage2.component.html',
  styleUrls: ['./RegisterPage2.component.scss']
})
export class RegisterPage2 {;

  public modelSvc: RegisterModelService;



  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){
    this.modelSvc = modelSvc;
  } 

  ngOnInit() {    
    this.modelSvc.getRegisterVO$().subscribe(data=>{
      if(data == null){
        this.router.navigate(['registerRecruiter0']);
      }
    })
   
  }
  
  resendEmail() {
    this.modelSvc.getRegisterVO$().subscribe(data=>{
      console.log(data,"user name")
      let head;
      if(data.userType == 'Recruiter'){
        head = {
          type:'rec',
          userName:data["companyEmail"]
        }
      }else{
        head = {
          type:'can',
          userName:data["personalEmail"]
        }
      }
       
      $.ajax({
        method:'GET',
          url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/register/resendVerificationCode?userName="+head.userName,
          
      }) 
      .then((response) => {
        console.log(response);
        $('#sentMessage').removeAttr('style')

        $('#sendFailed').css("display:none");
        //show message saying email resent
      })
      .catch((error) => {
        $('#sendFailed').removeAttr('style')
        console.log(error);
      });
    })
    
  }
  signOn() {
    this.router.navigate(['signOn']);
  }
}


