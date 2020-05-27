import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { RegisterVO } from '../../register.model'
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './RegisterPage0.component.html',
  styleUrls: ['./RegisterPage0.component.scss']
})
export class RegisterPage0 {

  public disableNextButton$ =  new BehaviorSubject(true);
  auth2: any;
  @ViewChild('loginRef') loginElement: ElementRef;
  public modelSvc: RegisterModelService;
  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {
    this.disableNextButton$.subscribe(value => console.log(value));
    // this.disableNextButton$.next(true);
    this.googleSDK();
  }
  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
   
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
   
   
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
   
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '380914575563-g1vnc3p8tdvs6j8j06hcbm7rgn8og6ok.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
   
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
   
  }

  
  nextButton(){
    //create register object and proceed to next route
    var selected_option = $('input[type=radio]:checked').attr('value');

    // console.log(selected_option);
    var regiserModel = new RegisterVO(selected_option,null,null,null,null,null,null,null);
    this.modelSvc.setRegisterVO$(regiserModel);
    this.router.navigate(['registerRecruiter1']);
    //create register object and proceed to next route
    
    // window.location.href = '/registerRecruiter1'

  }

  userTypeSelection(){
    this.disableNextButton$.next(false);
  }

  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}
}
