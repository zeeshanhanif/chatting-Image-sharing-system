import { ParkingActions } from '../actions';
import { IUser } from '../models';
//import { IUser } from '../models';

interface IInitalState {
  isError: { code: string, status: boolean, message: string }
  locations: any;
  userLocations: any;
  locationAndDateSlots : any
}

const InitalState: IInitalState = {
  isError: { code: null, status: false, message: null },
  locations:{},
  userLocations: {},
  locationAndDateSlots : {}
};

export const parkingReducer = function (state: IInitalState = InitalState, action: { type: string, payload?: any }) {
    console.log("in parkingReducer: ",action.type);
    console.log("in parkingReducer: ",action.payload);

  let obj = null;
  switch (action.type) {
    case ParkingActions.LOAD_PARKING_LOCATIONS:
      return Object.assign({}, state, { locations: {}, isError: null});
    case ParkingActions.LOAD_PARKING_LOCATIONS_SUCCESS:
      return Object.assign({}, state, { locations: action.payload, isError:null });
    case ParkingActions.LOAD_PARKING_LOCATIONS_FAILED:
      return Object.assign({}, state, { locations: {},
          isError: {code: action.payload.code, status:false, message:action.payload.message  }});
    case ParkingActions.ADD_LOCATION:
        obj = Object.assign({}, state.locations);
        obj[action.payload['$key']] = action.payload;
        return Object.assign({}, state, { locations: obj });
    case ParkingActions.BOOK_SLOT:
        return Object.assign({}, state, { userLocations: {}, isError: null});
    case ParkingActions.BOOK_SLOT_SUCCESS:
        return Object.assign({}, state, { userLocations: action.payload, isError:null});
    case ParkingActions.BOOK_SLOT_FAILED:
        return Object.assign({}, state, { userLocations: null, 
          isError: {code: action.payload.code, status:false, message:action.payload.message  }}
        );
    case ParkingActions.GET_SLOTS_FOR_LOCATION_AND_DATE:
        return Object.assign({}, state, { locationAndDateSlots: {}, isError: null});
    case ParkingActions.GET_SLOTS_FOR_LOCATION_AND_DATE_SUCCESS:
        return Object.assign({}, state, {  isError: null});
    case ParkingActions.GET_SLOTS_FOR_LOCATION_AND_DATE_FAILED:
        return Object.assign({}, state, { locationAndDateSlots: null, 
          isError: {code: action.payload.code, status:false, message:action.payload.message  }}
        );
    case ParkingActions.ADD_SLOTS_FOR_LOCATION_AND_DATE:
        obj = Object.assign({}, state.locationAndDateSlots);
        console.log("in reducer add slots payload is ",action.payload);
        obj[action.payload['$key']] = action.payload;
        return Object.assign({}, state, { locationAndDateSlots: obj });        
    default:
      return state;
  }
}