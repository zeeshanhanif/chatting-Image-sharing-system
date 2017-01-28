import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, CounterAction,AuthActions } from '../../store';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.container.html',
  styleUrls: ['./signup.container.css']
})
export class SignupContainer implements OnInit {

  myForm: FormGroup;
  isError: boolean;
  errorMessage: String;
  
  //@select(['auth', 'user']) user$: Observable<any>
  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService,private authAction: AuthActions) {
     this.myForm = fb.group({
      'firstName': ['',Validators.required],
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    });
    
    //redux not working for me
    /*
    this.user$.subscribe(val=>{
      console.log("subs:",val);
      //this.router.navigate(['/signin']);
    },error=> {
      console.log("Erro: ",error);
    },()=>{
      console.log("comleted");
    })
    */

  }

  ngOnInit() {
  }

  onSubmit(value: String): void {
    console.log('you submitted value: ', value);
    
    this.authService.register(value).subscribe(val=>{
        this.router.navigate(['/signin']);
    },
    error=>{
      console.log("Error: ",error);
      this.isError = true;
      this.errorMessage = error.message
    })

    //redux not working for me
    //this.authAction.register(value);


  }

}
