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
  selector: 'newGame',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss']
})
export class NewGame {


  gameSvc:GameService
  gameMdlService:GameModelService;
  userSvc:CreateUser;
  // items=[];
  p: number = 1;
  collection: any[] = [];  
  constructor(private el: ElementRef,private router: Router,gameMdlService: GameModelService,createService:CreateUser,gameService:GameService){
    this.gameMdlService=gameMdlService;
    this.userSvc = createService;
    this.gameSvc = gameService;

  } 

  ngOnInit() {

    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.userSvc.verifyToken(data).subscribe((isTokenValid)=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token;
          this.userSvc.allGameType(data).subscribe(data=>{
            if(data.status ==200 && data.response){ 
              this.collection = data.response;
              console.log(data,"alldaa")
            }else{
              console.log("TODO:::: NEED TO SHOW ERROR THAT CANT GET ALL GAME TYPES AND TRY REFRESH")
            }
          },error => console.log("TODO:::: NEED TO SHOW ERROR THAT CANT GET ALL GAME TYPES AND TRY REFRESH"))
        }else{
          this.router.navigate(['signOn']) 
        }
      },error => this.router.navigate(['signOn']))
      console.log(data,"data")
    }else{
      this.router.navigate(['signOn'])
    } 

  } 



  selectedGameType(gameTypeId){
    console.log(gameTypeId,"ID")
    let data = "?token="+JSON.parse(sessionStorage.getItem('token')).token+"&gameTypeID="+gameTypeId
     this.userSvc.getGameConfig(data).subscribe(gameConfig=>{
       if(gameConfig.status = 200 &&gameConfig.response[0]){
        this.gameSvc.startGame(data).subscribe(
          gameID=>{
            if(this.gameMdlService.setInitial(gameConfig.response[0],gameID.response[0].gID,JSON.parse(sessionStorage.getItem('token')).user)){ 
              sessionStorage.setItem('activeGameModal',JSON.stringify(this.gameMdlService.currentModel$))
              this.router.navigateByUrl('/scorecard')
            }else{
              console.log("TODO: SHOW ERROR THAT COULD NOT START GAME")
            } 
          }
          ,err=>{
            console.log("TODO: NEED TO SHOW ERROR IN POPUP AND GO BACK TO GAME SELECTION PAGE AS I CANT REGISTER START GAME")
            this.router.navigate(['newGame']) 
          }
        )
       }else{
        console.log("TODO: SHOW ERROR THAT COULD NOT LOAD CONFIG")
       } 
     },err=>{
       console.log("TODO: SHOW ERROR THAT COULD NOT LOAD CONFIG")
     }) 
  }

  onSubmit(){
    
    
  } 


}



