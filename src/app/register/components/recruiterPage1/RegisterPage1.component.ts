import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { FormGroup, FormControl,Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'register2',
  templateUrl: './RegisterPage1.component.html',
  styleUrls: ['./RegisterPage1.component.scss']
})
export class RegisterPage1 {

  
  hero = { fname: '',lname: '' ,pemail: "",cemail:"", phone:""};

  profile: FormGroup;


  public modelSvc: RegisterModelService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){

    this.modelSvc =modelSvc;
  } 

  ngOnInit() {

    this.modelSvc.getRegisterVO$().subscribe(data=>{
      if(data == null){

      this.router.navigate(['registerRecruiter0']);
      }
    })
    this.profile = new FormGroup({
      'fname': new FormControl(this.hero.fname, [
        Validators.required
      ]),
      'lname': new FormControl(this.hero.lname, [
        Validators.required
      ]),
      'pemail': new FormControl(this.hero.pemail, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'cemail': new FormControl(this.hero.cemail, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'phone': new FormControl(this.hero.phone, [
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")
      ])
    });
  }

  onSubmit() {
    this.modelSvc.setFirstName$(this.profile.value.fname);
    this.modelSvc.setLasttName$(this.profile.value.lname);
    this.modelSvc.setPersonalEmail$(this.profile.value.pemail);
    this.modelSvc.setCompanyEmail$(this.profile.value.cemail);
    this.modelSvc.setPhoneNumber$(this.profile.value.phone);
    this.router.navigate(['registerRecruiter2']);
  }
  get fname() { return this.profile.get('fname'); }

  get lname() { return this.profile.get('lname'); }


  get pemail() { return this.profile.get('pemail'); }



  get cemail() { return this.profile.get('cemail'); }

  get phone() { return this.profile.get('phone'); }


}



