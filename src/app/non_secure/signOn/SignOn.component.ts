import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register/register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

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
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){

    this.modelSvc =modelSvc;
    

  } 

  ngOnInit() {
    this.profile= new FormGroup({
      'email': new FormControl(this.hero.email, [
        Validators.required,
        Validators.email
      ]),
      'pass': new FormControl(this.hero.pass, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{5,}$")
        //[A-Z]+[0-9]+[@#\$&]*
      ])
    });
  }
  onSubmit(){
    
    

    $.ajax({
      method:'GET',
        url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/portal/signOn",
        headers: {
              username: this.profile.value.email,
              pass: this.profile.value.pass
            }
    }) 
    .then((response) => {
      console.log(response);
      this.router.navigate(['/portal/profile']);
    })
    .catch((error) => {
      $('#signOnFailed').removeAttr('style')
      console.log(error);
    });
    
  }
  get email() { return this.profile.get('email'); }

  get pass() { return this.profile.get('pass'); }


}



