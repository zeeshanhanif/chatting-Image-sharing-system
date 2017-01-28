import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class ChatService {

    constructor(public af: AngularFire,private router: Router) {
        //this.users = this.af.database.object("/users")
    }

    getUserList(){
        return this.af.database.list("/users");
    }
    
   
   
}