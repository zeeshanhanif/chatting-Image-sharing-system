import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { ActionsObservable } from 'redux-observable';

import { ParkingActions } from '../actions';

@Injectable()
export class ParkingEpics {

  constructor(private af: AngularFire) { }
/*
    getLocations = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(ParkingActions.LOAD_PARKING_LOCATIONS)
            .switchMap(() => {
                    return this.af.database.list("locations")
                    .mergeMap(array => {
                        console.log("in get locations epic",array);
                        return Observable.of({
                            type: ParkingActions.LOAD_PARKING_LOCATIONS_SUCCESS,
                            payload: array
                        })
                    });
                });
                */
            

    getLocations = (action$: ActionsObservable<any>) => // if my account type is company then get my posts
        action$.ofType(ParkingActions.LOAD_PARKING_LOCATIONS)
            .switchMap(() => {
                    return this.af.database.list("locations")
                    .mergeMap(array => {
                        console.log("in get locations epic",array);
                        return array.map(x => {
                            console.log("in get locations epic- array map x = ",x);
                            delete x['$exists']
                            return {
                                type: ParkingActions.ADD_LOCATION,
                                payload: x
                            }
                        });
                    });

                
            })


     bookSlot = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingActions.BOOK_SLOT)
            .switchMap(({payload}) => {
                console.log("payload in bookslot epic",payload);
                //return this.af.database.list(`bookings/${payload.locationId}/${payload.date}/${payload.slotId}`)
                return this.af.database.list(`bookings/${payload.locationId}/`)
                    .push(payload)
                    .then(d => {
                        console.log("booking slots push key check ",d.key);
                        payload.bookingId = d.key;
                        //return this.af.database.list(`userbookings/${payload.userId}/${payload.date}/${payload.slotId}`)
                        return this.af.database.list(`userbookings/${payload.userId}`)
                        .push(payload)
                    }).then(d =>{
                       return {
                            type: ParkingActions.BOOK_SLOT_SUCCESS,
                            payload: payload
                        } 
                    })
                    .catch((err) => {
                        console.log('ParkingActions.BOOK_SLOT catch ', err)
                        return {
                            type: ParkingActions.BOOK_SLOT_FAILED,
                            payload: err,
                        }
                    })
            })


    getLocationsAndDateSlots = (action$: ActionsObservable<any>) => 
        action$.ofType(ParkingActions.GET_SLOTS_FOR_LOCATION_AND_DATE)
            .switchMap(({payload}) => {
                    console.log("in get location and date slots",payload);
                    return this.af.database.list(`bookings/${payload.locationId}`, {
                        query: {
                            orderByChild: 'date',
                            equalTo: payload.date
                    }})
                    //return this.af.database.list(`bookings`)
                    .mergeMap(array => {
                        console.log("in get locations and date slots epic",array);
                        return array.map(x => {
                            console.log("in get locations and date slots - array map x = ",x);
                            //delete x['$exists']
                            return {
                                type: ParkingActions.ADD_SLOTS_FOR_LOCATION_AND_DATE,
                                payload: x
                            }
                        });
                    });
            })

    getLocationsSlots = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingActions.GET_SLOTS_FOR_LOCATION)
            .switchMap(({payload}) => {
                    return this.af.database.list(`bookings/${payload.locationId}`)
                    .mergeMap(array => {
                        console.log("in get locations  slots epic",array);
                        return array.map(x => {
                            console.log("in get locations slots - array map x = ",x);
                            delete x['$exists']
                            return {
                                type: ParkingActions.ADD_SLOTS_FOR_LOCATION,
                                payload: x
                            }
                        });
                    });
            })
            
 
}