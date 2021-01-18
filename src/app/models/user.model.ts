import { BehaviorSubject } from 'rxjs';


export class UserModelService {
    currentModel$:BehaviorSubject<UserModel> = new BehaviorSubject(null);
    // userObj:SecureModel;
    constructor(){    
    }
    getSecureModel(){
        return this.currentModel$;
    }
    setInitial(userType,key){
        this.currentModel$.next(new UserModel(userType,key)) 
    }
}

class UserModel {
    constructor(
        userType:string,
        key:string
    ) {}
}