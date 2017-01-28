import { Component, OnInit,Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import {ChatService} from '../../providers';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable, FirebaseApp} from 'angularfire2';
import * as fb from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './root.container.html',
  styleUrls: ['./root.container.css']
})
export class RootContainer implements OnInit {

  myForm: FormGroup;
  @select(['auth','user']) user$ :Observable<any>;
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  users: FirebaseListObservable<any>;
  userMessage:string
  otherUser: any;
  private storage: fb.storage.Reference;
  conversation : FirebaseListObservable<any>;
  constructor(private router: Router, private fb: FormBuilder,
          private chatService: ChatService,@Inject(FirebaseApp) private firebaseApp: any) {
        this.users = chatService.getUserList();
      this.storage = this.firebaseApp.storage().ref();
      this.user$.subscribe(user=>{
        if(!user || !user.$key){
          this.router.navigate(['signin'])
        }
      })
        
  }

  ngOnInit() {
  }

  sendMessage(msg){
    this.user$.subscribe(user=> {
      this.chatService.sendMessage(msg,user,this.otherUser);
    })
      
  }

  upload() {
    console.log("test");
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('userUploadedFile')).files[0]]) {
      if(selectedFile) {
        var thisRef = this.storage.child(selectedFile.name);
        thisRef.put(selectedFile).then((snapshot) => {
          console.log("image uplad ",snapshot.downloadURL);
          thisRef.getDownloadURL().then(url=> {
            console.log("image url after = "+url);
            this.sendMessage(url);
            //this.projectDetails.designImages = [{ imgUrl: url }];
            //this.isUploadedFile = true;
          })
        }, (err) => {
          console.log("Error", err);
      });
      }
    }
  }

  selectForChat(user){
    this.otherUser = user;
    this.user$.subscribe(user=>{
      this.chatService.getMessages(this.otherUser,user).subscribe(val=>{
          if(!val.status){
            this.conversation = val;
          }
          
      })
    })

    
  

/*
      if(user && user.conversation && !user.conversation[this.otherUser.$key]) {
        this.chatService.createPushKey(this.otherUser.$key,user.$key)
        .then(val=>{
          this.conversation = this.chatService.getMessages(this.otherUser.$key,user.conversation[this.otherUser.$key])
        })
        //load conversaation
      }
    })
*/
/*
    this.user$.subscribe(user=>{
      if(user && user.conversation && !user.conversation[this.otherUser.$key]) {
        this.chatService.createPushKey(this.otherUser.$key,user.$key)
        .then(val=>{
          this.conversation = this.chatService.getMessages(this.otherUser.$key,user.conversation[this.otherUser.$key])
        })
        //load conversaation
      }
    })
  */  
  }

  getFileNameFromUrl(url){
    return url.split("/")[url.split("/").length-1].split("?")[0]
  }

  
}
