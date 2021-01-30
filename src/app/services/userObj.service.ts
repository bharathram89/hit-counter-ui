import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject"; 
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserObjService {
    tag:BehaviorSubject<string> = new BehaviorSubject(null);
     constructor(){
         this.tag.next('')
     }
}