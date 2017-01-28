import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../';
import { ILogin } from '../models';

@Injectable()
export class ParkingActions {

    static LOAD_PARKING_LOCATIONS: string = 'LOAD_PARKING_LOCATIONS';
    static LOAD_PARKING_LOCATIONS_SUCCESS: string = 'LOAD_PARKING_LOCATIONS_SUCCESS';
    static LOAD_PARKING_LOCATIONS_FAILED: string = 'LOAD_PARKING_LOCATIONS_FAILED';

    static BOOK_SLOT: string = 'BOOK_SLOT';
    static BOOK_SLOT_SUCCESS: string = 'BOOK_SLOT_SUCCESS';

    static BOOK_SLOT_FAILED: string = 'BOOK_SLOT_FAILED';

    static ADD_LOCATION: string = 'ADD_LOCATION';

    static GET_SLOTS_FOR_LOCATION_AND_DATE: string = 'GET_SLOTS_FOR_LOCATION_AND_DATE';
    static GET_SLOTS_FOR_LOCATION_AND_DATE_SUCCESS: string = 'GET_SLOTS_FOR_LOCATION_AND_DATE_SUCCESS';
    static GET_SLOTS_FOR_LOCATION_AND_DATE_FAILED: string = 'GET_SLOTS_FOR_LOCATION_AND_DATE_FAILED';
    static ADD_SLOTS_FOR_LOCATION_AND_DATE: string = 'ADD_SLOTS_FOR_LOCATION_AND_DATE';
    
    static GET_SLOTS_FOR_LOCATION: string = 'GET_SLOTS_FOR_LOCATION';
    static GET_SLOTS_FOR_LOCATION_SUCCESS: string = 'GET_SLOTS_FOR_LOCATION_SUCCESS';
    static GET_SLOTS_FOR_LOCATION_FAILED: string = 'GET_SLOTS_FOR_LOCATION_FAILED';
    static ADD_SLOTS_FOR_LOCATION: string = 'ADD_SLOTS_FOR_LOCATION';
    
    
    static NULL: string = 'NULL';

    
    constructor(private ngRedux: NgRedux<IAppState>) {   
        
        this.ngRedux.dispatch({
            type: ParkingActions.LOAD_PARKING_LOCATIONS
        });     
    }

    getLocations(){
        console.log("get Locations Action");
        this.ngRedux.dispatch({
            type: ParkingActions.LOAD_PARKING_LOCATIONS
        })
    }

    bookSlot(data){
        console.log("Book slot Action");
        this.ngRedux.dispatch({
            type: ParkingActions.BOOK_SLOT,
            payload: data
        })
    }

    getSlotForDateAndLocation(locationId: string, date:string){
         console.log("getSlots For Date and Location");
        this.ngRedux.dispatch({
            type: ParkingActions.GET_SLOTS_FOR_LOCATION_AND_DATE,
            payload: {locationId:locationId, date:date}
        })
    }

}