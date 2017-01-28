import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';
import {LoggedInGuard} from './providers/loggedin-guard';
import {environment} from '../environments/environment';
import { NgReduxModule } from 'ng2-redux';
import { StoreModule } from './store';
import { Providers } from './providers';
import { DatepickerModule } from 'angular2-material-datepicker'
import 'hammerjs';



import { AppComponent } from './app.component';
//import {HomeComponent} from './components/home/home.component'
import {AppRoutes} from './routes';
import {Containers} from './containers';
import {Components} from './components';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    Containers,
    Components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig,myFirebaseAuthConfig),
    NgReduxModule,
    StoreModule,
    DatepickerModule
  ],
  providers: [LoggedInGuard,Providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
