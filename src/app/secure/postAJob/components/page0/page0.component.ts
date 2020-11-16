import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { PostAJobObjService } from '../../../../services/postAJob.service';
import { PostAJobObj } from '../../poastAJob.model';


@Component({
  selector: 'postAJob-Page0',
  templateUrl: './page0.component.html',
  styleUrls: ['./page0.component.scss']
})
export class PostAJobPage0 {

  
  profile: FormGroup;
  currentUser: String;

  private isViewValid:Subject<boolean>;
  private postAJobSvc: PostAJobObjService;
  imageUrl = '../../../assets/logo.png'
  constructor(postAJobSvc: PostAJobObjService,private router: Router){
    this.isViewValid = new Subject();
    this.postAJobSvc = postAJobSvc;

  } 

  ngOnInit() {
      
      this.isViewValid.subscribe(isTokenValid=>{
        if(!isTokenValid){//need API to check if auth token in cookie is valid.
          
          this.router.navigate(['signOn']);
        }else{
          
        }
      })
      
      
    
  }
  nextStep(){
    console.log("triggered")
    this.postAJobSvc.getPostAJobObjectVO$().subscribe(data=>{
      console.log(data,"riggered")
    })
    let obj = new PostAJobObj('NewTitle','SecondStep')
    this.postAJobSvc.setPostAJobObjectVO$(obj);
  }

}



