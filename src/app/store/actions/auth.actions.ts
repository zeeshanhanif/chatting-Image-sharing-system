import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../';
import { ILogin } from '../models';

@Injectable()
export class AuthActions {

    static REGISTER: string = 'REGISTER';
    static REGISTER_SUCCESS: string = 'REGISTER_SUCCESS';
    static LOGIN: string = 'LOGIN';
    static LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
    static REGISTER_FAILED: string = 'REGISTER_FAILED';
    static LOGIN_FAILED: string = 'LOGIN_FAILED';
    
    static ISLOGGEDIN: string = 'ISLOGGEDIN';

    static REGISTER_FAIL: string = 'REGISTER_FAIL';
    static LOGIN_FAIL: string = 'LOGIN_FAIL';
    
    static SET_CURRENT_USER_DATA: string = 'SET_CURRENT_USER_DATA';

    static LOGOUT: string = 'LOGOUT';
    static LOGOUT_FAIL: string = 'LOGOUT_FAIL';
    static LOGOUT_SUCCESS: string = 'LOGOUT_SUCCESS';
    
    static NULL: string = 'NULL';

    
    constructor(private ngRedux: NgRedux<IAppState>) {   
        /*
        this.ngRedux.dispatch({
            type: AuthActions.ISLOGGEDIN
        });*/     
    }

    //// 1 = Student, 2= Company, 3 = Admin
    register(user: Object): void {
        console.log("auth action = ",user);
        this.ngRedux.dispatch({
            type: AuthActions.REGISTER,
            payload: user
        });
    }


    login(credentials: ILogin): void {
        this.ngRedux.dispatch({
            type: AuthActions.LOGIN,
            payload: credentials
        });
    }

    logout(): void {
        this.ngRedux.dispatch({
            type: AuthActions.LOGOUT
        });
    }
   

}