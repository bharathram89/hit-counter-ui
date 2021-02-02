import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject"; 
import { BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import * as config from '../config/config.json'
 

@Injectable()
export class GameService { 

    startGame(data){
        return Observable.ajax({
          method:'POST',
          url:"https://"+config.host+"/startGame"+data, 
          headers:{"x-api-key":config.apiKey}
        }) 
      }

      gameOver(data,head ){
        return Observable.ajax({
          method:'POST',
          url:"https://"+config.host+"/gameOver"+data, 
          body:head,
          headers:{"Content-Type":"application/json","X-Api-Key":config.apiKey}
        }) 
      }
      pastGames(data ){
        return Observable.ajax({
          method:'GET',
          url:"https://"+config.host+"/pastGames"+data,
          headers:{"x-api-key":config.apiKey}
        }) 
      }

}