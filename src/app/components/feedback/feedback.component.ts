import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {ParkingService} from '../../providers';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  myForm: FormGroup;
  isError: boolean;
  errorMessage: String;
  replyFeedback: String;
  @select(['auth','user']) user$ :Observable<any>; 
  feedbacks: FirebaseListObservable<any>;
  currnetFeedback : any;
  isFeedbackSelected: boolean;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
        private parkingService: ParkingService) {

    this.myForm = fb.group({
        'feedback': ['',Validators.required]
    });

    this.user$.subscribe(user=>{
      if(user.accountType==1){
        this.myForm = fb.group({
            'feedback': ['',Validators.required]
        });
        this.feedbacks =  this.parkingService.getFeedbacks(user.uid);  
      }
      else {
        this.myForm = fb.group({
            'replyFeedback': ['',Validators.required]
        });
        this.feedbacks =  this.parkingService.getFeedbacks(null);  
      }
    });

    

   
    
  }

  ngOnInit() {
  }

   onSubmit(value: any): void {
    console.log('you submitted value: ', value);
    this.user$.subscribe(user=>{
      this.parkingService.sendFeedback(user.uid,value);  
    });
   }

   sendReplay(feedback){
     //replyFeedback
     if(this.currnetFeedback){
        console.log("current feedback",this.currnetFeedback);
        this.parkingService.replyFeedback(this.currnetFeedback,this.replyFeedback);
        this.isFeedbackSelected=true;
     }
     else {
        this.isFeedbackSelected=false;
     }
     
   }

   selectReplyFeedback(feedback){
     console.log("current feedback",feedback);
     this.currnetFeedback = feedback;
   }

}
