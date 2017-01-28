import { Component, OnInit } from '@angular/core';

import {ParkingService} from '../../providers';

import {ActivatedRoute,Router} from '@angular/router'

import { Observable} from 'rxjs';
import { IAppState,AuthActions } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  bookings: FirebaseListObservable<any>;
  @select(['auth','user']) user$ :Observable<any>;
  constructor(private parkingService: ParkingService,private route: ActivatedRoute,
            private router: Router) {
      this.user$.subscribe(user=> {
      console.log("in booking",user);
      if(user && user.accountType=="1"){
        this.bookings = this.parkingService.getBookings(user.uid);
      }
      else {
        this.bookings = this.parkingService.getBookings(null);
        //this.bookings = this.parkingService.getBookings(null);
        console.log("No bookings");
      }
      
    })

   }

  ngOnInit() {
  }

  cancelBooking(booking) {
    console.log("cancel booking",booking);
    this.parkingService.removeBookings(booking);
  }

}
