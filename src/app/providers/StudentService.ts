import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class StudentService {
    
    currentDisplayUser: User;
    constructor(public af: AngularFire,private router: Router) {
        //this.users = this.af.database.object("/users")
    }
    
    updateInfo(userId:string, userDetail: any){
        this.af.database.object("/users/"+userId).update(userDetail);
    }

    getUserList(accountType: string){
        if(accountType){
            return this.af.database.list("/users",{query: {
                        orderByChild: 'accountType',
                        equalTo: accountType 
                    }});
        }
        else {
            return this.af.database.list("/users");
        }
    }

    setCurrentDisplayUser(user: User){
        this.currentDisplayUser = user;
    }

    getCurrentDisplayUser(){
        return this.currentDisplayUser;
    }

    deleteUser(user: any){
        //console.log("in delete",user);
        //console.log("in delete",user.uid);
        //console.log("in delete",user.uid);
        console.log("in delete",user.$key);
        //console.log("in delete",user.key);
        this.af.database.list("/users").remove(user.$key);
    }


   
}