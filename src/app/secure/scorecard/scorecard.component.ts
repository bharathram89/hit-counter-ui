import { Component, NgZone, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject} from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
// import * as $ from "jquery";
import { ValueTransformer } from '@angular/compiler/src/util';
import { FormGroup, FormControl,Validators, EmailValidator, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GameModelService } from '../../models/game.model';
import { GameService } from '../../services/game.service'; 
import { resolve } from 'url';
import { data } from 'jquery';
import * as bootstrap from "bootstrap"; 


export interface Card {
  name: string;
  spawn: string;
  medic: string;
}

declare var $ : any;

@Component({
  selector: 'scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class Scorecard {

  playerState:ReplaySubject<String>=new ReplaySubject(1);   //active,dead,gameOver
  isMedicEnabled:boolean = false;
  isRespawnEnabled:boolean = false;
  revived:Subject<boolean>=new Subject();
  reviveTimOut:Subject<boolean>=new Subject();


  totalKills:BehaviorSubject<number>=new BehaviorSubject(0);  
  totalDeaths:BehaviorSubject<number>=new BehaviorSubject(0);  
  totalRespawn:BehaviorSubject<number>=new BehaviorSubject(0);  
  totalRevive:BehaviorSubject<number>=new BehaviorSubject(0);  
  totalMedic:BehaviorSubject<number>=new BehaviorSubject(0);  
  medicButton:ReplaySubject<boolean>=new ReplaySubject(1);;
  reviveButton:ReplaySubject<boolean>=new ReplaySubject(1);;;
  respawnButton:ReplaySubject<boolean>=new ReplaySubject(1);;;
  killButton:ReplaySubject<boolean>=new ReplaySubject(1);;;
  deadButton:ReplaySubject<boolean>=new ReplaySubject(1);;;

  gameMdlSvc:GameModelService;
  userSvc:UserService;
  gameSvc:GameService;

  constructor(private el: ElementRef,private router: Router,gameMdlService: GameModelService,createService:UserService,gameService:GameService){

    this.userSvc = createService;
    this.gameMdlSvc = gameMdlService;
    this.gameSvc= gameService;
    this.playerState.next('active')
  } 

  ngOnInit() {
    // ($('#finalScore') as any).modal('hide');
    $("#finalScore").modal("hide");

    if(sessionStorage.getItem('token')){
      let data = "?token="+ JSON.parse(sessionStorage.getItem('token')).token; 
      this.userSvc.verifyToken(data).subscribe((isTokenValid)=>{
        if(isTokenValid.status = 200 && isTokenValid.response.user){
          if(sessionStorage.getItem('activeGameModal')  && this.isGameInfoInSessionForCurrentLoggedInUser(isTokenValid.response.user)){ 
            
            let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))      
            this.parseModalToSetGlobalValues()
            this.playerState.subscribe(state=>{

              this.handleMedicButtons(state);
            }) 
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
  revive(){ 
    setTimeout(()=>{ 
      $('#reviveButton').data["revived"]=true;
      this.revived.next(true) 
      this.reviveTimOut.next(false) 
    }, 4000); 
  }
    
  handleMedicButtons(state){
// death get double counted when timer runs out

    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))        
      if( state == 'active' ){
        this.killButton.next(true);
        this.deadButton.next(true);
        this.respawnButton.next(false);
        this.reviveButton.next(false);
        if(this.isMedicEnabled){
          this.medicButton.next(true);
        }

        //reset states 

        // this.reviveTimOut.next(null)
        // this.revived.next(null)
      }
      if (state == 'dead'){
        // let revived:Subject<boolean>=new Subject();
        this.killButton.next(false);
        this.deadButton.next(false);
        this.medicButton.next(false);
        let lastState ='';
        Observable.combineLatest([this.revived , this.reviveTimOut]).subscribe(
          ([wasRevived,wasReviveTimedOut])=>{

            if(wasRevived && !wasReviveTimedOut){ 
              this.playerState.next('active')
              this.killButton.next(true);
              this.deadButton.next(true);
              this.reviveButton.next(false);
              this.onRevive();
                //set state and handle buttons and update scorecard
            }else if(!wasRevived && wasReviveTimedOut){
              this.reviveButton.next(false);//failed to revive
              if(this.isRespawnAvaliable(gameModal)){ 
                this.respawnButton.next(true)
              }else{

                this.onEndGame()
                console.log('you are dead and no more respawn and you didnt get revived')
              }
            }else{
              this.reviveButton.next(false);
              if(this.isRespawnEnabled && this.isRespawnAvaliable(gameModal)){
                this.respawnButton.next(true);
              }else{

                this.onEndGame()
                //all dead 
                console.log('you are dead')
              }
            } 

          }
        ) 

        if(this.isMedicEnabled && this.isReviveAvaliable(gameModal) ){
          this.reviveButton.next(true);
          $('#reviveButton').data["revived"]=false;


          let that = this;
          //wait for user to revive or time to run out. 
          
          setTimeout(()=>{  
            if(!$('#reviveButton').data["revived"]){
              that.reviveTimOut.next(true)  
              that.revived.next(false)   
            }
          },20000)
           
        }else{
          this.revived.next(false)
          this.reviveTimOut.next(false)
        } 
      }   
  }

  isReviveAvaliable(gameModal):boolean{
    if(gameModal.rules.revive.maxRevive > gameModal.scorecard.totalTimesRevived ){
          //maxed out review 
          return true;
        }
        return false;
  }
  isRespawnAvaliable(gameModal):boolean{ 
    if(gameModal.rules.maxRespawn > gameModal.scorecard.totalRespawn ){
      //maxed out review 
      return true;
    } 
    return false;
  }
  parseModalToSetGlobalValues(){
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))
    if(gameModal.rules.revive){ 
      this.isMedicEnabled = true;
    }
    if(gameModal.rules.respawn){ 
      this.isRespawnEnabled =true; 
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
    let kills = gameModal.scorecard.totalKills +1
    gameModal.scorecard.totalKills = kills;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalKills.next(kills)
  } 
  onDead(){ 
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'));
    let deaths = gameModal.scorecard.totalDeaths + 1;
    gameModal.scorecard.totalDeaths = deaths;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalDeaths.next(deaths)
    this.playerState.next('dead')
    // if revive is enabled then show review till bleedOutTime then if respawn is enabled for this game show respawn 
    //  this.playerState.next('down')
  }

  onMedic(){ 
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'));
    let successfulRevives = gameModal.scorecard.totalSuccessfulRevives + 1;
    gameModal.scorecard.totalSuccessfulRevives = successfulRevives;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalMedic.next(successfulRevives)
  } 
  onRevive(){ 
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'));
    let timesRevived = gameModal.scorecard.totalTimesRevived + 1;
    gameModal.scorecard.totalTimesRevived = timesRevived;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalRevive.next(timesRevived) 
    //if timesRevived = maxRevives then disable (revive)
  } 
  onRespawn(){ 
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'));
    let respawn = gameModal.scorecard.totalRespawn + 1;
    gameModal.scorecard.totalRespawn = respawn;
    sessionStorage.setItem('activeGameModal',JSON.stringify(gameModal));
    this.totalRespawn.next(respawn)
    this.playerState.next('active');
    //reenable all buttons 
  } 
  onEndGame(){ 
    // ($('#finalScore') as any).modal({backdrop: "static"});
    let gameModal = JSON.parse(sessionStorage.getItem('activeGameModal'))   
    $("#finalScore").modal({backdrop: "static"});
    let stat = {totalKills:gameModal.scorecard.totalKills, 
                              totalRevived:gameModal.scorecard.totalSuccessfulRevives,
                              totalRespawn:gameModal.scorecard.totalRespawn,
                              totalMediced:gameModal.scorecard.totalTimesRevived,
                              totalDeath:gameModal.scorecard.totalDeaths
                            }
    let data = "?token="+JSON.parse(sessionStorage.getItem('token')).token;
    let head = {
      "stats":stat,
      "gameid":gameModal.gameID
    }
    this.gameSvc.gameOver(data,head).subscribe(ren=>{
      console.log(ren,"game saved")
      sessionStorage.removeItem('activeGameModal') 
      $('#modalHome').removeClass('d-none')
      $('#modalNewGame').removeClass('d-none')

    })
    // $("#finalScore").removeClass('d-none')
    // show "End Game Card"
    // sessionStorage.removeItem('activeGameModal') 
    // this.router.navigate(['newGame'])
  } 


}



