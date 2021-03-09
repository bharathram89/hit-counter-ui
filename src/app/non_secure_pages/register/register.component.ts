import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class Register {
  createUserSvc: UserService;
  addUser: FormGroup;
  fields={gamer_tag:'',email:'',password:'',fieldName:'',phone:"999-888-0000"}
  constructor(private router: Router){
    this.createUserSvc = new UserService();

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


      "fieldName":new FormControl(this.fields.fieldName, [
        Validators.required
      ]),
      "phone":new FormControl(this.fields.phone, [
        Validators.required
      ]),
 
      
     })
  }
  submit(){
    console.log('hello my friends',this.addUser.value,$('#player-signup').hasClass('active'))
    if($('#player-signup').hasClass('active')){ 
      let params = "?gamerTag="+this.addUser.value.gamer_tag+"&email="+this.addUser.value.email+"&password="+this.addUser.value.password+"&userType=player"
      this.createUserSvc.createGamer(params)
      .subscribe((response) => {
        console.log(response);
        $("#userCreatedMessage").removeClass('d-none');
        // If all is well show message to confirm email
      },(err)=>{
        $("#userCreatFaileddMessage").removeClass('d-none');  
        console.log(err);
      }) 
    }else{
     let params = "?fieldTag="+this.addUser.value.fieldName+"&email="+this.addUser.value.email+"&password="+this.addUser.value.password+"&phone="+this.addUser.value.phone+"&userType=field"
      
      this.createUserSvc.createField(params)
      .subscribe((response) => {
        console.log(response);
        $("#userCreatedMessage").removeClass('d-none');
        // If all is well show message to confirm email
      },(err)=>{
        $("#userCreatFaileddMessage").removeClass('d-none');  
        console.log(err);
      }) 
    }
  } 

  get gamer_tag() { return this.addUser.get('gamer_tag'); }
  get email() { return this.addUser.get('email'); }
  get password() { return this.addUser.get('password'); }
  get fieldName() { return this.addUser.get('fieldName'); }
  get phone() { return this.addUser.get('phone'); }


}



