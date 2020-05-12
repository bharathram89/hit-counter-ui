import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'register2',
  templateUrl: './RegisterPage2.component.html',
  styleUrls: ['./RegisterPage2.component.scss']
})
export class RegisterPage2 {

  public disableNextButton$ =  new BehaviorSubject(true);

  public modelSvc: RegisterModelService;
  public vo: RegisterVO;
  public errors={
    password:false
  }
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {
    this.disableNextButton$.next(true);
  }

  nextButton(){
    if(this.validateEntries()){
      this.modelSvc.setFirstName$($('#introForm>input[ng-model=fName]').val());
      this.modelSvc.setLasttName$($('#introForm>input[ng-model=lName]').val());
      this.modelSvc.setPersonalEmail$($('#introForm>input[ng-model=personalEmail]').val());
      this.modelSvc.setCompanyEmail$($('#introForm>input[ng-model=companyEmail]').val());
      this.modelSvc.setPhoneNumber$($('#introForm>input[ng-model=phoneNum]').val());
      this.router.navigate(['registerRecruiter2'])
    }
    
  }
  validateEntries():boolean{
    console.log('here -v 1');
    if ($('#introForm>input[ng-model=pass]').val().toString().trim() == $('#introForm>input[ng-model=pass2]').val().toString().trim() ){
      this.errors.password = true;
      console.log('here -v 2');
    }else{

    console.log('here -v 3');
      this.errors.password = false;
    }
    if(this.errors.password == false){
      return true
    }else{
      return false;
    }

  }

  userTypeSelection(){

    console.log('here-d -h');
    if ($('#introForm>input[ng-model=pass]').keydown ){

    console.log('here -d -i');
      this.disableNextButton$.next(true);
    }
  }
}


