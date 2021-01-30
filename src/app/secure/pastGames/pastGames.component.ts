import { Component, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserModelService } from '../../models/user.model';
import { GameService } from '../../services/game.service';
 
@Component({
  selector: 'pastGames',
  templateUrl: './pastGames.component.html',
  styleUrls: ['./pastGames.component.scss']
})
export class PastGames {
  user :UserService;
  totalKills = 0;
  tagName;
  userModelSvc: UserModelService;
  gameSvc:GameService;
  fbConnected: BehaviorSubject<boolean> = new BehaviorSubject(null);
  ytConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  twitterConnected:  BehaviorSubject<boolean> = new BehaviorSubject(null);
  gamerTag: BehaviorSubject<String> = new BehaviorSubject(null);
  usr: BehaviorSubject<String> = new BehaviorSubject('A');
  about: BehaviorSubject<String> = new BehaviorSubject('Describe yourself in airsoft');
  clanTag: BehaviorSubject<String> = new BehaviorSubject("Choose a Clan Name!");
  numberOfGames: String;
  kd = 0;



  p: number = 1;
  collection: any[] = [];  
  constructor(private router: Router,userSvc:UserModelService,gameSvc:GameService){
    this.userModelSvc = userSvc
    this.user = new UserService();
    this.gameSvc = new GameService();

  } 

  ngOnInit() { 
    $('#main').addClass('d-none');//loading
    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token+"&filter=all"; 
      
      
      Observable.combineLatest([this.user.verifyToken(data)  , this.gameSvc.pastGames(data)]).subscribe(
        ([isTokenValid,data])=>{
          if(isTokenValid.status = 200 && isTokenValid.response.user){

            if(data.response.length >0){

              $('#main').removeClass('d-none');
              $('#loading').addClass('d-none');
              console.log(data.response,"all data for games")
              this.collection=data.response//push to collection all the stats for the games to show in the cards
            }else{
              $('#loading').addClass('d-none');
              $('#noGames').removeClass('d-none')
            }
          }
        }) 
       
      
    }else{
      $('#loading').addClass('d-none');
      $('#pageError').removeClass('d-none');
    }
  }

  signOut(){
    sessionStorage.removeItem('token')
    this.router.navigate(["welcomePage"])
  }
  chan(){
    
    this.collection.push({name:"hmm",medic:"mmm",spawn:"hhhh"})
  } 


}



