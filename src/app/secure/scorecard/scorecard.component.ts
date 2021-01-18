import { Component, NgZone, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { CreateUser } from '../../services/createUser.service';
import { GameModelService } from '../../models/game.model';
import { GameService } from '../../services/game.service';
 


export interface Card {
  name: string;
  spawn: string;
  medic: string;
}



@Component({
  selector: 'scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class Scorecard {


  totalKills:BehaviorSubject<number>=new BehaviorSubject(0);  

  medicButton:boolean=true;
  reviveButton:boolean=true;
  respawnButton:boolean=true;
  killButton:boolean=true;
  deadButton:boolean=true;
 
  gameMdlSvc:GameModelService;
  userSvc:CreateUser;
  gameSvc:GameService;
  // items=[];
  p: number = 1;
  collection: any[] = [];  
  constructor(private el: ElementRef,private router: Router,gameMdlService: GameModelService,createService:CreateUser,gameService:GameService){

    this.userSvc = createService;
    this.gameMdlSvc = gameMdlService;
    this.gameSvc= gameService;

  } 

  ngOnInit() {

    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.userSvc.verifyToken(data).subscribe((isTokenValid)=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          if(sessionStorage.getItem('activeGameModal')  && this.isGameInfoInSessionForCurrentLoggedInUser(isTokenValid.response.user)){ 
            let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))
            this.setPageUp(gameModal.rules)
            console.log("Scorecard: ", gameModal,isTokenValid.response.user)

          }else{
            this.router.navigate(['newGame'])
          } 
        }
      },
      err=>{ 
        this.router.navigate(['signOn'])//verify token failed
      })
    }else{
      this.router.navigate(['signOn'])
    } 
  } 
  setPageUp(rules){
    if(!rules.revive){
      this.medicButton= false;
      this.reviveButton = false;
      //show medic/revive options
    }
    if(!rules.respawn){
      this.respawnButton = false;
      //show respwan 
    }

  }
isGameInfoInSessionForCurrentLoggedInUser(user):boolean{ //we need to check this as we make the session on this page and what if a different user comes in with old sessiond data from other users.
  let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))
  if(gameModal.scorecard.user == user){
    return true;
  }
  return false;
}

  onKill(){ 
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'));
    let kills = gameModal.scorecard.totalKills 
    gameModal.scorecard.totalKills = kills+1;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalKills.next(kills)
  } 
  onDead(){ 
  } 
  onMedic(){ 
  } 
  onRevive(){ 
  } 
  onRespawn(){ 
  } 
  onEndGame(){ 
  } 


}



