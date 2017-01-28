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

    createPushKey(otherUserId,userId){
        return this.af.database.list("/message").push({}).then(val=>{
            let conversationKey = val.getKey();
            let obj = {};
            obj[otherUserId]=conversationKey;
            return this.af.database.object("/users/"+userId+"/conversation/").update(obj);
        });
    }

    getMessages(otherUser,user):Observable<any>{
        let messages:any;
        return Observable.create((observer)=>{
            this.af.database.object("/conversation/"+user.$key)
                .subscribe(val=>{
                    if(val){
                        messages =  this.af.database.list("/message/"+val[otherUser.$key]);
                        observer.next(messages);
                    }
                    else {
                        observer.next({status:"errro"});
                    }
                });
        });
        
    }

    sendMessage(msg,user,otherUser){
        //this.af.database.list("/message/"+user.$key+"/"+otherUser.$key).push({}).then(
        
        console.log("user = ",user);
        console.log("otherUser = ",otherUser);
        this.af.database.object("/conversation/"+user.$key+"/"+otherUser.$key)
        .subscribe(val=>{
            
                console.log("in send message sub ex: ",val.$exists());
                if(val.$exists()){
                    console.log("in send message sub : ",val);
                    this.af.database.list("/message/"+val.$value)
                        .push({
                            text:msg,
                            senderId:user.$key,
                            receiverId:otherUser.$key
                        })
                }
                else {
                    
                    this.af.database.list("/message").push({}).then(
                        val=> {                    
                            console.log("val after first push ",val);
                            console.log("val after first push ",val.$key);
                            console.log("val after first push ",val.getKey());
                            let conversationKey = val.getKey();
                            this.af.database.list("/message/"+conversationKey)
                                .push({
                                    text:msg,
                                    senderId:user.$key,
                                    receiverId:otherUser.$key
                                })
                                let obj = {};
                                obj[otherUser.$key]=conversationKey
                                let obj2 = {};
                                obj2[user.$key]=conversationKey;
                                this.af.database.object("/conversation/"+user.$key).update(obj);
                                this.af.database.object("/conversation/"+otherUser.$key).update(obj2);
                    })

                }
            
        
        
            
        })
        
        /*
        .push({
            text:msg,
            senderId:user.$key,
            receiverId:otherUser.$key
        })*/
        // /"+user.$key).set({
        /*
        this.af.database.object("/chat/"+user.$key).set({
            text:msg,
            senderId:user.$key,
            receiverId:otherUser.$key
        });*/
    }
    
   
   
}