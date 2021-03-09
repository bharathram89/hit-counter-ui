import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject"; 
import { BehaviorSubject, Subject } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import * as config from '../config/config.json'
 
@Injectable()
export class UserService { 
 
    createGamer(data){
      return Observable.ajax({
        method:'POST',
        url:"https://"+config.host+"/user"+data, 
        headers:{"x-api-key":config.apiKey}
      }) 
    }

    createField(data){
      return Observable.ajax({
        method:'POST',
        url:"https://"+config.host+"/field"+data, 
        headers:{"x-api-key":config.apiKey}
      }) 
    }

    verifyGamer(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/verifyPlayer"+data, 
        headers:{"x-api-key":config.apiKey}
      })
    }

    playerLogin(data){
      return Observable.ajax({
        method:'POST',
        url:"https://"+config.host+"/signOn"+data, 
        headers:{"x-api-key":config.apiKey}
      })
    }

    allGameType(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/allGameType"+data, 
        headers:{"x-api-key":config.apiKey}
      })
    }
//
    verifyToken(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/verifyToken"+data, 
        headers:{"x-api-key":config.apiKey}
      })
    }

    getGameConfig(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/gameConfig"+data, 
        headers:{"x-api-key":config.apiKey}
      }) 
    }

    getPlayerStatsSummary(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/playerStatsSummary"+data,
        headers:{"x-api-key":config.apiKey} 
      }) 
    }

    getUserInfo(data){
      return Observable.ajax({
        method:'GET',
        url:"https://"+config.host+"/userData"+data, 
        headers:{"x-api-key":config.apiKey}
      }) 
    }

    saveProfileInfo(data,head){
      return Observable.ajax({
        method:'POST',
        url:"https://"+config.host+"/profile"+data, 
        body:head,
        headers:{"Content-Type":"application/json","X-Api-Key":config.apiKey}
      }) 
    }
}