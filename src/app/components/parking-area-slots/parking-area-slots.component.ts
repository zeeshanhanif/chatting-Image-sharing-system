import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable} from 'rxjs';
import { IAppState, AuthActions,ParkingActions } from '../../store';
import {ActivatedRoute} from '@angular/router'
import {HelperService } from '../../providers';


@Component({
  selector: 'app-parking-area-slots',
  inputs : ['date','startTime','hours'],
  templateUrl: './parking-area-slots.component.html',
  styleUrls: ['./parking-area-slots.component.css']
})
export class ParkingAreaSlotsComponent implements OnInit {

  availableColors : string[];
  @select(['parking', 'locations']) locations$: Observable<any>;
  @select(['auth', 'user']) user$: Observable<any>;
  @select(['parking', 'locationAndDateSlots']) locationAndDateSlots$: Observable<any>;
  locationId: string;

  date: Date;
  startTime: string;
  hours: string;
  userId : string;
  endTime: string;

  constructor(private route: ActivatedRoute, private helperService: HelperService,
        private parkingActions: ParkingActions) {
      this.endTime = "02:00 PM";

      console.log("startTime",this.startTime);
      console.log("date",this.date);
      console.log("hours",this.hours);

      this.user$.subscribe(user=>{
        this.userId = user.uid;
      })
      route.params.subscribe(param=>{
        console.log("locationId : ",param['location']);
        this.locationId = param['location'];        

      });
    console.log("Locationid : ",this.locationId);
    
    this.locations$.subscribe(val=>{
      console.log("location subscribe: ",val[this.locationId]);
    }); 

    this.locationAndDateSlots$.subscribe(val=> {
      console.log("location and date slots",val);
    })

   }

  ngOnInit() {
  }

  keys(object: {}) {
    console.log(Object.keys(object));
      return Object.keys(object);
  }

  chipClicked(slot){

     console.log("startTime",this.startTime);
      console.log("date",this.date);
      console.log("hours",this.hours);

      let slotObj = {
        date:this.helperService.convertDateTimeToSampleDate(this.date),
        startTime : this.startTime,
        hours: this.hours,
        userId: this.userId,
        locationId: this.locationId,
        slotId: slot,
        endTime:this.endTime

      }
     console.log("check cliked : ",slot);
     this.parkingActions.bookSlot(slotObj);
  }

  
}
