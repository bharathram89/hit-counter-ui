import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'register2',
  templateUrl: './RegisterPage1.component.html',
  styleUrls: ['./RegisterPage1.component.scss']
})
export class RegisterPage1 {

  
  hero = { fname: '',lname: '' ,pemail: "",cemail:"", phone:"",password:"",confirmPassword:""};

  profile: FormGroup;
  currentUser: String;

  public modelSvc: RegisterModelService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){

    this.modelSvc =modelSvc;
    

  } 

  ngOnInit() {

    this.modelSvc.getRegisterVO$().subscribe(data=>{
      console.log(data,"is user model created?")
      this.profile= new FormGroup({
        'fname': new FormControl(this.hero.fname, [
          Validators.required
        ]),
        'lname': new FormControl(this.hero.lname, [
          Validators.required
        ]),
        'phone': new FormControl(this.hero.phone, [
          Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")
        ]),
        'password': new FormControl(this.hero.password, [
          Validators.required,
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{5,}$")
          //[A-Z]+[0-9]+[@#\$&]*
        ]),
        'confirmPassword': new FormControl(this.hero.confirmPassword, [
          Validators.required
        ])
      },this.checkPasswords);


      if(data === null){
        console.log(data,"ireouting out")
        this.router.navigate(['registerRecruiter0']);
        // this.router.navigate(['registerRecruiter0']);
      }else{
        this.currentUser = data.userType;
        if(this.currentUser == 'Recruiter'){
          this.profile.addControl('cemail', new FormControl(this.hero.cemail, [
            Validators.required,
            Validators.email,
          ]))
        console.log(this.profile,"is form group created?")
        }else{
          this.profile.addControl('pemail', new FormControl(this.hero.cemail, [
            Validators.required,
            Validators.email,
          ]))
        }
      }
        
      
      
    })
    
  }

  onSubmit() {
    console.log(this.profile.errors,"errors");
    this.modelSvc.setPassword$(this.profile.value.confirmPassword);//need to encode
    this.modelSvc.setFirstName$(this.profile.value.fname);
    this.modelSvc.setLasttName$(this.profile.value.lname);
    this.modelSvc.setPersonalEmail$(this.profile.value.pemail);
    this.modelSvc.setCompanyEmail$(this.profile.value.cemail);
    this.modelSvc.setPhoneNumber$(this.profile.value.phone);


    this.modelSvc.getRegisterVO$().subscribe(data=>{
      if(data.userType =='Recruiter'){
        var head;
        if(this.profile.value.phone===''){
          head =  {
            first_name: this.profile.value.fname,
            last_name: this.profile.value.lname,
            org_email: this.profile.value.cemail,
            password:this.profile.value.confirmPassword
          }
        }else{
          head =  {
            first_name: this.profile.value.fname,
                  last_name: this.profile.value.lname,
                  org_email: this.profile.value.cemail,
                  contact_number: this.profile.value.phone,
                  password:this.profile.value.confirmPassword
          }
        }
        $.ajax({
          method:'POST',
            url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/users/createRecruiter",
            headers: head
        }) 
        .then((response) => {
          console.log(response);
          this.router.navigate(['registerRecruiter2']);
        })
        .catch((error) => {
          $('#create_fail_msg').removeAttr('style')
          console.log(error);
        });
        
      }else if(data.userType == 'Candidate'){
        var head;
          if(this.profile.value.phone===''){
            head =  {
              firstname: this.profile.value.fname,
              lastname: this.profile.value.lname,
              pemail: this.profile.value.pemail,
              password:this.profile.value.confirmPassword
            }
          }else{
            head =  {
              firstname: this.profile.value.fname,
              lastname: this.profile.value.lname,
              pemail: this.profile.value.pemail,
              contactnumber:this.profile.value.phone,
              password:this.profile.value.confirmPassword
            }
          }
      

        $.ajax({
          method:'POST',
            url:"https://zaj3gxtv1m.execute-api.us-west-1.amazonaws.com/dev/users/candidate",
            headers: head
        }) 
        .then((response) => {
          console.log(response);
          this.router.navigate(['registerRecruiter2']);
        })
        .catch((error) => {
          $('#create_fail_msg').removeAttr('style')
          console.log(error);
        });
      }else{

      }
    })


    
  }
  get fname() { return this.profile.get('fname'); }

  get lname() { return this.profile.get('lname'); }


  get pemail() { return this.profile.get('pemail'); }



  get cemail() { return this.profile.get('cemail'); }

  get phone() { return this.profile.get('phone'); }

  checkPasswords(g: FormGroup) { // here we have the 'passwords' group
  // console.log('eze',this,g.value.password)
    if(this,g.value.password !== '' && this,g.value.confirmPassword !== ''){
      let pass = g.value.password;
      let confirmPass = g.value.confirmPassword;
      return pass === confirmPass ? null :  { notSame: true }
    }else {return null}
  
  }
  get password() { return this.profile.get('password'); }

  get confirmPassword() { return this.profile.get('confirmPassword'); }
  

}



