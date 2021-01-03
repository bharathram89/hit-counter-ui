import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {PostAJobObj} from "../secure/postAJob/poastAJob.model";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class PostAJobObjService {
    private currentModel$:BehaviorSubject<PostAJobObj> = new BehaviorSubject(null);
    constructor() {
    }
    public getPostAJobObjectVO$():BehaviorSubject<PostAJobObj> {
        return this.currentModel$
    }
    public setPostAJobObjectVO$(initialModel:PostAJobObj):void {
        this.currentModel$.next(initialModel);
    }
    public setCurrentStep$(value){
        this.currentModel$.subscribe(data=>{data.currentStep = value});
    }
}