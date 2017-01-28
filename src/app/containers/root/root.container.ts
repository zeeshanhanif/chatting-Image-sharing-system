import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import {ChatService} from '../../providers';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';


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
  
  constructor(private router: Router, private fb: FormBuilder,
          private chatService: ChatService) {
        this.users = chatService.getUserList();
  }

  ngOnInit() {
  }

  
}
