import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject"; 
import { BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
@Injectable()
export class UserService { 

    createGamer(data){
      return Observable.ajax({
        method:'POST',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/user"+data, 
      }) 
    }

    verifyGamer(data){
      return Observable.ajax({
        method:'GET',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/verifyPlayer"+data, 
      })
    }

    playerLogin(data){
      return Observable.ajax({
        method:'POST',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/signOn"+data, 
      })
    }

    allGameType(data){
      return Observable.ajax({
        method:'GET',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/allGameType"+data, 
      })
    }
//
    verifyToken(data){
      return Observable.ajax({
        method:'GET',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/verifyToken"+data, 
      })
    }

    getGameConfig(data){
      return Observable.ajax({
        method:'GET',
        url:"https://4bgn511z3f.execute-api.us-west-1.amazonaws.com/dev/gameConfig"+data, 
      }) 
    }
}