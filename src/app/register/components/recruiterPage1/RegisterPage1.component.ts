import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';

@Component({
  selector: 'register2',
  templateUrl: './RegisterPage1.component.html',
  styleUrls: ['./RegisterPage1.component.scss']
})
export class RegisterPage1 {

  public disableNextButton$ =  new BehaviorSubject(true);

  public modelSvc: RegisterModelService;
  public vo: RegisterVO;
  public errors =  {
    fNameMissing:false,
    lNameMissing:false,
    personalEmail:false,
    companyEmail:false,

  }


  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {
    this.disableNextButton$.next(false);
  }

  nextButton(){
    if(this.validateEntries()){
      this.modelSvc.setFirstName$($('#introForm>input[ng-model=fName]').val());
      this.modelSvc.setLasttName$($('#introForm>input[ng-model=lName]').val());
      this.modelSvc.setPersonalEmail$($('#introForm>input[ng-model=personalEmail]').val());
      this.modelSvc.setCompanyEmail$($('#introForm>input[ng-model=companyEmail]').val());
      this.modelSvc.setPhoneNumber$($('#introForm>input[ng-model=phoneNum]').val());
      this.modelSvc.getRegisterVO$().subscribe(data=>{console.log(data)})
      // this.router.navigate(['registerRecruiter2'])
    }
    
  }
  validateEntries():boolean{
    if ($('#introForm>input[ng-model=fName]').val().toString().trim() == "" ){
      this.errors.fNameMissing = true;
    }else{
      this.errors.fNameMissing = false;
    }
    if ($('#introForm>input[ng-model=lName]').val().toString().trim() == "" ){
      this.errors.lNameMissing = true;
    }else{
      this.errors.lNameMissing = false;
    }
    if ($('#introForm>input[ng-model=personalEmail]').val().toString().trim() == "" ){
      this.errors.personalEmail = true;
    }else{
      this.errors.personalEmail = false;
    }
    if ($('#introForm>input[ng-model=companyEmail]').val().toString().trim() == "" ){
      this.errors.companyEmail  = true;
    }else{
      this.errors.companyEmail = false;
    }


    if(this.errors.fNameMissing == false && this.errors.lNameMissing ==false && this.errors.personalEmail ==false && this.errors.companyEmail ==false){
      return true
    }else{
      return false;
    }

  }
}
