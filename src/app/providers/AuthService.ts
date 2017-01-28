import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
    
    //user: any;
    //users: FirebaseListObservable<any>;
    users: FirebaseObjectObservable<any>;
    currentUser: FirebaseObjectObservable<any>;
    constructor(public af: AngularFire,private router: Router) {
        this.users = this.af.database.object("/users")
    }

    register(user:any){

        return Observable.fromPromise(
                <Promise<any>>
                this.af.auth.createUser({email:user.email,password:user.password})
                ).switchMap(auth => {
                    delete user.password;
                    user.accountType="1";
                    return this.af.database.object("/users/"+auth.uid).set(user);
                });
    }

    login(user: any){
        return Observable.fromPromise(
                <Promise<any>>
                this.af.auth.login({email:user.email,password:user.password})
                )
                .switchMap(auth => {
                    console.log("swithc : ",auth);
                    this.af.database.object("/users/"+auth.uid)
                    return this.af.database.object("/users/"+auth.uid);
                });
    }

    logout(){
        return Observable.fromPromise(
                <Promise<any>>
                this.af.auth.logout()
                );

    }
}