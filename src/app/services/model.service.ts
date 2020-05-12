import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {RegisterVO} from "../register/register.model";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RegisterModelService {
    private currentModel$:BehaviorSubject<RegisterVO> = new BehaviorSubject(null);
    constructor() {
        // this.currentModel$ = new BehaviorSubject(null);
    }
    public getRegisterVO$():BehaviorSubject<RegisterVO> {
        return this.currentModel$
    }
    public setRegisterVO$(initialModel:RegisterVO):void {
        this.currentModel$.next(initialModel);
    }
    public setFirstName$(value){
        this.currentModel$.subscribe(data=>{data.firstName = value});
    }
    public setLasttName$(value){
        this.currentModel$.subscribe(data=>{data.lastName = value});
    }
    public setPersonalEmail$(value){
        this.currentModel$.subscribe(data=>{data.personalEmail = value});
    }
    public setCompanyEmail$(value){
        this.currentModel$.subscribe(data=>{data.companyEmail = value});
    }
    public setPhoneNumber$(value){
        this.currentModel$.subscribe(data=>{data.phoneNumber = value});
    }
    
}
