import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject"; 
import { BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
@Injectable()
export class GameService { 

    startGame(data){
        return Observable.ajax({
          method:'POST',
          url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/startGame"+data, 
        }) 
      }

      gameOver(data,head ){
        return Observable.ajax({
          method:'POST',
          url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/gameOver"+data, 
          body:head,
          headers:{"Content-Type":"application/json"}
        }) 
      }

}