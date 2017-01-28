import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';


@Component({
  selector: 'app-root',
  templateUrl: './root.container.html',
  styleUrls: ['./root.container.css']
})
export class RootContainer implements OnInit {

  myForm: FormGroup;
  @select(['auth','user']) user$ :Observable<any>;
  @select(['auth', 'isLoggedin']) isLoggedin$: Observable<boolean>;
  
  constructor(private router: Router, private fb: FormBuilder,
  private authService: AuthService) {

    this.user$.subscribe(user=> {
        if(user){
          switch(user.accountType){
            case "1":
              this.router.navigate(['root/user']);
              break;
            /*case "2":
              this.router.navigate(['root/company']);
              break;*/
            case "3":
              this.router.navigate(['root/admin']);
              break;
            default : 
              this.router.navigate(['signin']);
              break;

          }
      }
      else {
        this.router.navigate(['signin']);
    }});

/*
    this.isLoggedin$.subscribe(val=>{
      console.log("in isloggedin : ",val);
      this.router.navigate(['root/admin'])
    })
    */
/*
    this.user$.subscribe(user=> {
        if(user){
          switch(user.accountType){
            case "1":
              this.router.navigate(['student']);
              break;
            case "2":
              this.router.navigate(['company']);
              break;
            case "3":
              this.router.navigate(['admin']);
              break;
            default : 
              this.router.navigate(['signin']);
              break;

          }
      }
      else {
        this.router.navigate(['signin']);
      }

  })  */
    

   
  }

  ngOnInit() {
  }

  
}
