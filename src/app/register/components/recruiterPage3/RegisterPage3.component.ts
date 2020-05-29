import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { validateConfig } from '@angular/router/src/config';
import { FormGroup, FormControl,Validators, EmailValidator } from '@angular/forms';
import { AuthService } from 'ng4-social-login';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'register3',
  templateUrl: './RegisterPage3.component.html',
  styleUrls: ['./RegisterPage3.component.scss']
})
export class RegisterPage3 {;

  public modelSvc: RegisterModelService;

  hero = { address: '', zip: '',link:'',image:''};

  profile: FormGroup;

  selectedFile: ImageSnippet;

  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router,private authService: AuthService){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {
    this.authService.authState.subscribe(data=>{
      console.log(data,"google data")
    })
    this.profile = new FormGroup({
      'address': new FormControl(this.hero.address, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{3,20}$")
        //[A-Z]+[0-9]+[@#\$&]*
      ]),
      'zip': new FormControl(this.hero.zip, [
        Validators.required
      ]),
      'link': new FormControl(this.hero.link, [
        Validators.required
      ]),
      'image': new FormControl(null, [Validators.required])
    },this.checkPasswords);
  }
  checkPasswords(g: FormGroup) { // here we have the 'passwords' group
  // console.log(g,"here") this is form group values
    let pass = g.value.password;
    let confirmPass = g.value.confirmPassword;
    return pass === confirmPass ? null : { notSame: true }
  }
  get address() { return this.profile.get('address'); }

  get link() { return this.profile.get('link'); }

  get zip() { return this.profile.get('zip'); }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.modelSvc.setProfileImage$(file);
    });

    reader.readAsDataURL(file);
  }
}


