import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable} from 'rxjs';
import {AuthService} from './providers';
import { IAppState, CounterAction,AuthActions } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
    @select(['auth','isLoggedin']) isLoggedin$ :Observable<any>;
    @select(['auth','user']) user$ :Observable<any>;
    constructor(private authService: AuthService,private authAction: AuthActions) {
    }

    logout(){
      /*
      this.authService.logout().subscribe(val=>{
        console.log("Logged out");
      });
      */
      this.authAction.logout();
    }
}
