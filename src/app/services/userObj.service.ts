import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {UserObj} from "../secure/userObj.model";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserObjService {
    private currentModel$:BehaviorSubject<UserObj> = new BehaviorSubject(null);
    constructor() {
    }
    public getUserObjectVO$():BehaviorSubject<UserObj> {
        return this.currentModel$
    }
    public setUserObjectVO$(initialModel:UserObj):void {
        this.currentModel$.next(initialModel);
    }
}