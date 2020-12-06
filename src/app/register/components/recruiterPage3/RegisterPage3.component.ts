import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { RegisterModelService } from '../../../services/model.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { RegisterVO } from '../../register.model';
import { validateConfig } from '@angular/router/src/config';
import { FormGroup, FormControl,Validators, EmailValidator, AbstractControl, ValidatorFn } from '@angular/forms';

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
  pfData:RegisterVO;
  profile: FormGroup;

  selectedFile: ImageSnippet;

  imageUrl = '../../../assets/logo.png'
  constructor(modelSvc: RegisterModelService,private router: Router ){
    this.modelSvc = modelSvc;
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 

  ngOnInit() {
     
    this.modelSvc.getRegisterVO$().subscribe(data=>{
      if(data == null){
      this.router.navigate(['registerRecruiter0']);
      }else{
        this.pfData= data;
      }
    })
   
    this.profile = new FormGroup({
      'address': new FormControl(this.hero.address, [
        Validators.required
        //[A-Z]+[0-9]+[@#\$&]*
      ]),
      'zip': new FormControl(this.hero.zip, [
        Validators.required,//
        Validators.pattern(".*[0-9]{5,5}$")
      ]),
      'link': new FormControl(this.hero.link, [
        Validators.required,
        Validators.pattern("^(?=.*linkedin.com).{6,90}$")
      ]),
      'image': new FormControl(this.hero.image, [
        Validators.required
      ])
    });
  }
  onSubmit() {
    console.log(this.profile.value,"flow",)
    this.modelSvc.setAddrress$(this.profile.value.address);
    this.modelSvc.setZipCode$(this.profile.value.zip);
    this.modelSvc.setlinkdin$(this.profile.value.linkedin);
    this.modelSvc.setProfileImage$(this.profile.value.image)
    // this.router.navigate(['registerRecruiter3']);
  }
  get address() { return this.profile.get('address'); }

  get link() { return this.profile.get('link'); }

  get zip() { return this.profile.get('zip'); }

  get image() { return this.profile.get('image'); }
  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
console.log
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.modelSvc.setProfileImage$(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}


