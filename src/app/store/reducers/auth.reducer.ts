import { AuthActions } from '../actions';
import { IUser } from '../models';

interface IInitalState {
  isLoading: boolean;
  isError: { code: string, status: boolean, message: string }
  isLoggedin: boolean;
  user: any;
  isRegistered: boolean;
  
}

const InitalState: IInitalState = {
  isLoading: false,
  isError: { code: null, status: false, message: null },
  isLoggedin: false,
  user: null,
  isRegistered: false,
};

export const authReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
    console.log("in reduers",action.type);
    console.log("in reduers",action.payload);
  switch (action.type) {
    case AuthActions.LOGIN_FAIL:
      return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: null, 
      isError: {code: action.payload.code, status:false, message:action.payload.message  }});
    case AuthActions.LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isLoggedin: true, user: action.payload });
    case AuthActions.LOGOUT_FAIL:
      return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: null });
    case AuthActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: null });
    case AuthActions.LOGIN:
      return Object.assign({}, state, { isLoading: true,isError:null });
    case AuthActions.REGISTER:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.REGISTER_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isRegistered: true });
    case AuthActions.REGISTER_FAIL:
      return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });
    case AuthActions.REGISTER_FAIL:
      return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });
    case AuthActions.SET_CURRENT_USER_DATA:
      return Object.assign({}, state, { user: Object.assign({}, state.user, action.payload) });
    default:
      return state;
  }
}