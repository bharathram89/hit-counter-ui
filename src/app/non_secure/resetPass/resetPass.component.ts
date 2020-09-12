import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'resetPass',
  templateUrl: './resetPass.component.html',
  styleUrls: ['./resetPass.component.scss']
})
export class ResetPass {

  
  hero = { confirmPassword:"", pass:""};

  profile: FormGroup;
  currentUser: String;

  public modelSvc: RegisterModelService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){

    this.modelSvc =modelSvc;
    

  } 

  ngOnInit() {

    if(!window.location.search.includes('userName')){
      this.router.navigate(['signOn'])
    }
    this.profile= new FormGroup({
      'pass': new FormControl(this.hero.pass, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{5,}$")
      ]),
      'confirmPassword': new FormControl(this.hero.confirmPassword, [
        Validators.required
      ])
    },this.checkPasswords);
   
    
  }
  onSubmit(){
    console.log(window.location,'url')
    if(window.location.search.includes('userName')){
      let str = window.location.search;
      let code = str.substring(str.indexOf("code=")+5,str.indexOf("code=")+10)
      let userName = str.substring((str.indexOf("userName=")+9),str.length)
      $.ajax({
        method:'POST',
          url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/register/resetPass",
          headers:{
            "pass":this.profile.value.pass,
            "userName":userName,
            "code":code
          }
      }) 
      .then((response) => {
        console.log(response);
        $('#resetSuccessful').removeAttr('style')
        // this.router.navigate(['registerRecruiter2']);
      })
      .catch((error) => {
        $('#resetFailed').removeAttr('style')
        console.log(error);
      });
    }
    
  }
  checkPasswords(g: FormGroup) { // here we have the 'passwords' group
  // console.log('eze',this,g.value.password)
    if(this,g.value.pass !== '' && this,g.value.confirmPassword !== ''){
      let pass = g.value.pass;
      let confirmPass = g.value.confirmPassword;
      return pass === confirmPass ? null :  { notSame: true }
    }else {return null}
  
  }

  get pass() { return this.profile.get('pass'); }

  get confirmPassword() { return this.profile.get('confirmPassword'); }

}



