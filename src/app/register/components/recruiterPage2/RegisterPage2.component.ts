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

  hero = { password: '', confirmPassword: ''};

  profile: FormGroup;


  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {    
    this.modelSvc.getRegisterVO$().subscribe(data=>{
      if(data == null){
      this.router.navigate(['registerRecruiter0']);
      }
    })
    this.profile = new FormGroup({
      'password': new FormControl(this.hero.password, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{5}$")
        //[A-Z]+[0-9]+[@#\$&]*
      ]),
      'confirmPassword': new FormControl(this.hero.confirmPassword, [
        Validators.required
      ])
    },this.checkPasswords);
  }
  checkPasswords(g: FormGroup) { // here we have the 'passwords' group
  // console.log(g,"here") this is form group values
    let pass = g.value.password;
    let confirmPass = g.value.confirmPassword;
    return pass === confirmPass ? null : { notSame: true }
  }
  get password() { return this.profile.get('password'); }

  get confirmPassword() { return this.profile.get('confirmPassword'); }
  
  onSubmit() {
    this.modelSvc.setPassword$(this.profile.value.confirmPassword);//need to encode
    this.router.navigate(['registerRecruiter3']);
  }
}


