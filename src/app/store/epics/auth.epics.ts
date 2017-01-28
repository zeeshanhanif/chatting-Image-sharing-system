import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthActions } from '../actions';

@Injectable()
export class AuthEpics {

  constructor(private af: AngularFire) { }

  login = (action$) =>
    action$.ofType(AuthActions.LOGIN)
    .switchMap(({payload}) => {
        return Observable.fromPromise(<Promise<any>> 
          this.af.auth.login({ email: payload.email, password: payload.password }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
          }))
          .catch(err => {
            
            return Observable.of({
              type: AuthActions.LOGIN_FAIL,
              payload: { isError: { status: true, msg: err.message } }
            })
          })
          .map(data => {
            if (data.type === 'LOGIN_FAIL') {
              return data;
            }

            return {
              type: AuthActions.LOGIN_SUCCESS,
              payload: data
            }
          });
      });
      
   getCurrentUserData = (action$) =>
    action$.ofType(AuthActions.LOGIN_SUCCESS)
      .switchMap(({payload}) => {
          console.log("payload in get current user data,"+payload)
          return this.af.database.object(`users/${payload.uid}`)
      })
        .catch(err => {
          console.log('users/ err ', err);
          return Observable.of(null)
        })
        .switchMap((user) => {
          if (user) {
             console.log("Login- getCurrentUserData ", user);     
            return Observable.of({
              type: AuthActions.SET_CURRENT_USER_DATA,
              payload: user
            });
          } else {
            return Observable.of({
              type: AuthActions.NULL
            });
          }
        });

    logout = (action$) =>
      action$.ofType(AuthActions.LOGOUT)
        .switchMap(() => {
          this.af.auth.logout();
          return Observable.of({
            type: AuthActions.LOGOUT_SUCCESS
          });
        });
}