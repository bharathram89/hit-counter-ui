import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Time } from '@angular/common';


export class GameModelService {
    currentModel$: GameModel =null;
    // userObj:SecureModel;
    constructor(){    
        // this.currentModel$ 
    }
    getGameModel(){
        return this.currentModel$;
    } 
    setInitial(config,gameID,user):boolean{
        console.log(config,"config");
        let revive = null;
        let respawn = false;
        if(config.revive.data[0]){ 
            revive = new MedicModal(config.maxRevive,config.timeToRevive,config.bleedOutTime)
        }
        if(config.respawn.data[0]){
            respawn = true;
        }

        let totalKills = 0;
        let totalDeaths = 0;
        let totalRespawn = null;
        let totalSuccessfulRevives = null;
        let totalUnsuccessuflRevives = null;
        let totalTimesRevived = null;

        if(revive){
            totalSuccessfulRevives = 0;
            totalUnsuccessuflRevives = 0;
            totalTimesRevived = 0;
        }
        if(respawn){
            totalRespawn = 0;
        }



        let scorecard = new ScorecardModel(user,totalKills,totalDeaths,totalRespawn,totalSuccessfulRevives,totalUnsuccessuflRevives,totalTimesRevived)

        let rules = new GameRules(revive,respawn,config.maxRespawn)
        this.currentModel$ = new GameModel(config.gameTypeID,gameID,scorecard,rules);       
       
        return true;
        // this.currentModel$.next(new GameModel(config.gameTypeID,medic,respawn,config.maxRespawn))

        // this.currentModel$.next(new GameModel(,key)) 
    } 
}

class GameRules {
    revive:MedicModal;
    respawn:boolean;
    maxRespawn:number;
    constructor(
        revive:MedicModal,
        respawn:boolean,
        maxRespawn:number ){ 
            this.revive = revive;
            this.respawn = respawn;
            this.maxRespawn = maxRespawn;
    }
}

class GameModel {
    gameID:number;
    gameTypeID:number;
    gameStartTime:Date;
    rules:GameRules;
    scorecard:ScorecardModel
    constructor(
        gameTypeID:number,  
        gameID:number,
        scorecard:ScorecardModel,
        rule:GameRules
    ) {
        this.rules = rule;
        this.gameTypeID = gameTypeID; 
        this.gameID = gameID;
        this.scorecard = scorecard;
        this.gameStartTime = new Date();
    }
}
class MedicModal{
    maxRevive:number;
    timeToRevive:number;
    bleedOutTime:number;
    constructor(
        maxRevive:number,
        timeToRevive:number,
        bleedOutTime:number
    ){

        this.maxRevive=maxRevive,
        this.timeToRevive=timeToRevive;
        this.bleedOutTime=bleedOutTime;
    }
}

class ScorecardModel {
    user:string;
    totalKills:number;
    totalDeaths:number; 
    totalRespawn:number;
    totalSuccessfulRevives:number;
    totalUnsuccessuflRevives:number; 
    totalTimesRevived:number;
     
    constructor(
        user:string,
        totalKills:number,
        totalDeaths:number,
        totalRespawn:number,
        totalSuccessfulRevives:number,
        totalUnsuccessuflRevives:number,
        totalTimesRevived:number
    ) {
        this.user = user;
        this.totalKills = totalKills;
        this.totalDeaths = totalDeaths;
        this.totalRespawn = totalRespawn;
        this.totalSuccessfulRevives = totalSuccessfulRevives;
        this.totalUnsuccessuflRevives = totalUnsuccessuflRevives;
        this.totalTimesRevived = totalTimesRevived;
    } 
} 