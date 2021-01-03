import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { PostAJobObjService } from '../../../../services/postAJob.service';
import { PostAJobObj } from '../../poastAJob.model';

import { UserObjService } from '../../../../services/userObj.service';
import { UserObj } from '../../../userObj.model';

@Component({
  selector: 'postAJob-Page0',
  templateUrl: './page0.component.html',
  styleUrls: ['./page0.component.scss']
})
export class PostAJobPage0 {

  addAJob: FormGroup;
  hero = { jobTitle: '',industry:''};
  public userObjSvc: UserObjService;
  jobTitle=[];
  industry=[];
  jobTitleSelectedItems = [];
  dropdownSettings = {};
  sigleSectionDropdownSettings = {};
  industrySelectedItems = [];
  jobTitleList:Subject<any>;
  industryList:Subject<any>;


  profile: FormGroup;
  currentUser: String;

  private isViewValid:Subject<boolean>;
  private postAJobSvc: PostAJobObjService;
  imageUrl = '../../../assets/logo.png'

  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["US"] 
    } 
  } 

  constructor(postAJobSvc: PostAJobObjService,private router: Router,userObjSvc: UserObjService){
    this.isViewValid = new Subject();
    this.postAJobSvc = postAJobSvc;
    this.userObjSvc =userObjSvc;

    this.jobTitleList = new Subject();
    this.industryList = new Subject();
    // this.dropdownList = new Subject();
    this.getJobTitles();
    this.getIndustries();
    this.jobTitleList.subscribe(data=>{
      console.log("data being set",data)
      this.jobTitle = data;
    })
    this.industryList.subscribe(data=>{
      this.industry= data;
    })
this.dropdownSettings =  {
  "singleSelection": false,
  "defaultOpen": false,
  "idField": "item_id",
  "textField": "item_text",
  "unSelectAllText": "UnSelect All",
  "enableCheckAll": false,
  "itemsShowLimit": 3,
  "allowSearchFilter": true,
  "limitSelection":5
}

this.sigleSectionDropdownSettings =  {
  "singleSelection": true,
  "defaultOpen": false,
  "idField": "item_id",
  "textField": "item_text",
  "unSelectAllText": "UnSelect All",
  "enableCheckAll": false,
  "itemsShowLimit": 1,
  "allowSearchFilter": true,
  "limitSelection":1
}
this.jobTitleSelectedItems = [
]; 

  } 

  ngOnInit() {
    this.addAJob = new FormGroup({
      "jobTitle":new FormControl(this.hero.jobTitle, [
        Validators.required
      ]),
      "industry":new FormControl(this.hero.industry, [
        Validators.required
      ]),
    });
      this.isViewValid.subscribe(isTokenValid=>{
        if(!isTokenValid){//need API to check if auth token in cookie is valid.
          
          this.router.navigate(['signOn']);
        }else{
          
        }
      })
      
      
    
  }

  public AddressChange(address: any) { 
  //setting address from API to local variable 
   this.formattedaddress=address.formatted_address 
} 

  nextStep(){
    console.log("triggered")
    this.postAJobSvc.getPostAJobObjectVO$().subscribe(data=>{
      console.log(data,"riggered")
    })
    let obj = new PostAJobObj('NewTitle','SecondStep')
    this.postAJobSvc.setPostAJobObjectVO$(obj);
  }


  onItemSelect(item:any){
    console.log(item);
    console.log(this.jobTitleSelectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.jobTitleSelectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}


getIndustries(){
  let token = this.getCookie("skippedAuthToken")
  $.ajax({
    method:'GET',
      url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/jobs/industries",
      headers: {
            "X-SkippedAuth": token
          }
  }) 
  .then((response,huh,xhr) => {
    console.log(response,"getIndustries")
    let formatedArr = [];
      response.forEach(element => {
        console.log(element,"ele")  
        formatedArr.push({
          "item_id":element.id,
          "item_text":element.name
        })
      });

    this.industryList.next(formatedArr);
  })
  .catch((error) => {
    this.isViewValid.next(false);
    this.router.navigate(['signOn']);
    console.log(error);

  });

}

getJobTitles(){
  let token = this.getCookie("skippedAuthToken")
  $.ajax({
    method:'GET',
      url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/jobs/titles",
      headers: {
            "X-SkippedAuth": token
          }
  }) 
  .then((response,huh,xhr) => {
    console.log(response,"getTitle")
    let formatedArr = [];
    for (const property in response) {
      response[property].forEach(element => {
        console.log(element,"ele")
        formatedArr.push({
          "item_id":element.id,
          "item_text":element.speciality,
          // "itemType":element.title
        })
      });

    }
    this.jobTitleList.next(formatedArr);
  })
  .catch((error) => {
    this.isViewValid.next(false);
    this.router.navigate(['signOn']);
    console.log(error);

  });

}


validateToken(){
  let token = this.getCookie("skippedAuthToken")
  $.ajax({
    method:'GET',
      url:"http://ec2-54-151-38-10.us-west-1.compute.amazonaws.com:8080/api/v1/users/me",
      headers: {
            "X-SkippedAuth": token
          }
  }) 
  .then((response,huh,xhr) => {
    this.isViewValid.next(true);

    this.userObjSvc.getUserObjectVO$().subscribe(data=>{
      if(!data || !data.userType ){
        let user = new UserObj(response.userRole.name,response.firstName,response.lastName);
        this.userObjSvc.setUserObjectVO$( user);

      }
    })

  })
  .catch((error) => {
    this.isViewValid.next(false);
    this.router.navigate(['signOn']);
    console.log(error);

  });

}



getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


}



