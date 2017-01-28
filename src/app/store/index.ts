import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';

// Reducers
import { counterReducer,authReducer,parkingReducer } from './reducers';

// Actions
import { CounterAction, AuthActions,ParkingActions } from './actions';
export { CounterAction, AuthActions, ParkingActions } from './actions';

import { CounterEpics,AuthEpics, ParkingEpics } from './epics';
import { ICounter, ILogin, IUser } from './models';


//export { Observable } from 'rxjs';
//export { select, NgRedux } from 'ng2-redux';
//export { bindActionCreators } from 'redux';

export interface IAppState {
  counter?: ICounter;
  auth?: Object;
  parking? : Object;
}

export const AppReducer = combineReducers<IAppState>({
  counter: counterReducer,
  auth:authReducer,
  parking:parkingReducer
});


@NgModule({
  providers: [
    // actions
    CounterAction,
    AuthActions,
    ParkingActions,
    // epics
    CounterEpics,
    AuthEpics,
    ParkingEpics
    // other services
    //, HttpService
  ]
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private counterEpics: CounterEpics,
    private authEpics : AuthEpics,
    private parkingEpics: ParkingEpics
    // More Epics here
    
  ) {
    const middleware = [
      createEpicMiddleware(this.counterEpics.increment),
      createEpicMiddleware(this.counterEpics.decrement),
      createEpicMiddleware(this.authEpics.login),      
      createEpicMiddleware(this.authEpics.getCurrentUserData),
      createEpicMiddleware(this.authEpics.logout),
      createEpicMiddleware(this.parkingEpics.getLocations),
      createEpicMiddleware(this.parkingEpics.bookSlot)
      
      

      // More middleware here
    ];
    this.ngRedux.configureStore(
      AppReducer,                                         // Main Reducer
      {},                                                 // Defailt State
      middleware,                                         // Middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] // Enhancers
    )
  }
} 