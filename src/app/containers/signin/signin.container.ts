import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { IAppState, CounterAction,AuthActions } from '../../store';
import {AuthService} from '../../providers';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.container.html',
  styleUrls: ['./signin.container.css']
})
export class SigninContainer implements OnInit {

  myForm: FormGroup;
  isError: boolean;
  errorMessage: String;

  @select(['auth','user']) user$ :Observable<any>;
  @select(['auth','isLoggedin']) isLoggedin$ :Observable<any>;
  @select(['auth','isError']) isError$ :Observable<any>;
  

  constructor(private router: Router, private fb: FormBuilder,
              private authService: AuthService,private authAction: AuthActions) {
    this.myForm = fb.group({
      'email': ['admin@gmail.com',Validators.required],
      'password': ['123456',Validators.required]
    });

    
    this.isLoggedin$.subscribe(val=>{
      console.log("in isloggedin : ",val);
      this.user$.subscribe(val=>{
        console.log("in user$ stream in sigin : ",val);
        if(val && val.email){
          this.router.navigate(['root'])
        }
      })  
      
    })
    /*
    this.user$.subscribe(val=>{
      console.log("in user$ stream in sigin : ",val);
    })*/

/*
    this.isError$.subscribe(val=>{
      this.isError = true,
      this.errorMessage = val.message
      console.log("in user$ stream in sigin : ",val);
    })
    */
  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    console.log('you submitted value: ', value);
    //this.firebaseServiceLogin(value);
    this.reduxLogin(value);
  }

  reduxLogin(value: any){
    this.authAction.login(value);
  }

  firebaseServiceLogin(value: any){
    this.authService.login(value).subscribe(val=> {
      console.log("user : ",val);
      this.router.navigate(['root']);
    },
    error=>{
      console.log("Error: ",error);
      this.isError = true;
      if(error.code=="auth/user-not-found"){
        this.errorMessage = "User Id or password is incorrect"          
      }
      else {
        this.errorMessage = error.message
      }
    })
  }
}
