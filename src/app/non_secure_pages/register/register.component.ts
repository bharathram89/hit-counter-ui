import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { CreateUser } from '../../services/createUser.service'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class Register {
  createUserSvc: CreateUser;
  addUser: FormGroup;
  fields={gamer_tag:'',email:'',password:''}
  constructor(private router: Router){
    this.createUserSvc = new CreateUser();

  } 

  ngOnInit() {
     this.addUser = new FormGroup({

      "gamer_tag":new FormControl(this.fields.gamer_tag, [
        Validators.required
      ]),
      "email":new FormControl(this.fields.email, [
        Validators.required
      ]),
      "password":new FormControl(this.fields.password, [
        Validators.required
      ]),
      
     })
  }
  submit(){
    console.log('hello my friends',this.addUser.value)
    let params = "?gamerTag="+this.addUser.value.gamer_tag+"&email="+this.addUser.value.email+"&password="+this.addUser.value.password+"&userType=player"

    this.createUserSvc.createGamer(params)
    .subscribe((response) => {
      console.log(response);
      $("#userCreatedMessage").removeClass('d-none');
      // If all is well show message to confirm email
    })
    // .catch((error) => {
    //   $("#userCreatFaileddMessage").removeClass('d-none');  
    //   console.log(error);
    // })
  } 

  get gamer_tag() { return this.addUser.get('gamer_tag'); }
  get email() { return this.addUser.get('email'); }
  get password() { return this.addUser.get('password'); }


}



