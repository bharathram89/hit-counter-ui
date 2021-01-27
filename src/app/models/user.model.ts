import { BehaviorSubject } from 'rxjs';

export class UserModel {
    constructor(
        userType:string,
        key:string
    ) {}
}

export class UserModelService {
    currentModel$:BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel(null,null));
    sharedMoldal = this.currentModel$.asObservable();
    // userObj:SecureModel;
    constructor(){ 
        this.currentModel$ 
    }
    setKey(key){ 
    }
}
