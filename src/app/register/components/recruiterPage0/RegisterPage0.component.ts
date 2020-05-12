import { Component } from '@angular/core';
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

  }

  nextButton(){
    //create register object and proceed to next route
    var selected_option = $('input[type=radio]:checked').attr('value');

    // console.log(selected_option);
    var regiserModel = new RegisterVO(selected_option,null,null,null,null,null,null);
    this.modelSvc.setRegisterVO$(regiserModel);
    this.router.navigate(['registerRecruiter1']);
    //create register object and proceed to next route
    
    // window.location.href = '/registerRecruiter1'

  }

  userTypeSelection(){
    this.disableNextButton$.next(false);
  }
}
