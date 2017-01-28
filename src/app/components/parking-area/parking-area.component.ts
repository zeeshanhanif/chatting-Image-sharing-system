import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { NgRedux, select } from 'ng2-redux';
import { Observable} from 'rxjs';
import { IAppState, AuthActions,ParkingActions } from '../../store';
import {HelperService, ParkingService } from '../../providers';

@Component({
  selector: 'app-parking-area',
  templateUrl: './parking-area.component.html',
  styleUrls: ['./parking-area.component.css']
})
export class ParkingAreaComponent implements OnInit {

  date: Date;
  startTime : string;
  hours: string;
  locationId: string;
  @select(['parking', 'locations']) locations$: Observable<any>;
  @select(['auth', 'user']) user$: Observable<any>;
  @select(['parking', 'locationAndDateSlots']) locationAndDateSlots$: Observable<any>;
  startTimeArray: {};
  userId : string;
  endTime: number;

  slotsForDate:Object;

  isEndTimeIncorrect = false;
  isError = false;
  errorMessage = "";
  bookedSlotIds = {};
  isPastDateSelected = false;
  isDateTimeSelected = false;
  
  constructor(private route: ActivatedRoute,private helperService: HelperService,
    private parkingActions: ParkingActions, private parkingService: ParkingService) {
    this.date = new Date();
    
    this.startTimeArray = helperService.getStartTimeArray();

    route.params.subscribe(param=>{
        console.log("params : ",param['location']);
        this.locationId = param['location'];
      });

      this.user$.subscribe(user=>{
        this.userId = user.uid;
      })


      this.locationAndDateSlots$.subscribe(val=> {
      console.log("location and date slots",val);
    })
   }

  ngOnInit() {
  }
  
  

  formatDate(date: Date): string {
    return date.toLocaleString();
  }

  onSelect(date: Date) {
    this.isDateTimeSelected = false;
    console.log("onSelect: ", date);
    //this.parkingActions.getSlotForDateAndLocation(this.locationId,this.helperService.convertDateTimeToSampleDate(date));
    
    if(date < new Date()){
      this.isPastDateSelected = true;
    }
    else {
      this.isPastDateSelected = false;
    }

    this.parkingService.getLocationAndDateSlots(this.locationId,this.helperService.convertDateTimeToSampleDate(date))
    .subscribe(val=> {
      console.log(val);
      this.convertData(val);
    })

  }
  clearDate() {
    this.date = null;
  }
  setToday() {
    this.date = new Date();
  }

  keys(object: {}) {
      return Object.keys(object);
  }

  selectSlots(){
    this.isDateTimeSelected=true;
    if(this.isPastDateSelected){
      alert("Please selected correct date");
      return;
    }
    
    this.bookedSlotIds = {};
    this.isEndTimeIncorrect = false;
    console.log("Date", this.helperService.convertDateTimeToSampleDate(this.date));
    console.log("Time", this.startTime);
    console.log("Hours", this.hours);
    //this.endTime = this.helperService.getEndTime(this.startTime,parseInt(this.hours));
    this.endTime = parseInt(this.startTime) + parseInt(this.hours);
    console.log("endTime", this.endTime);
    if(this.endTime > 24){
      this.endTime=0;
      this.isEndTimeIncorrect =true;
      return;
    }

    //keys((locations$ | async)[locationId]?.slots)
    this.locations$.subscribe(locations=>{
      if(locations[this.locationId]){
      let slots = this.keys(locations[this.locationId].slots);
      console.log(slots);
      slots.forEach(slotkey=>{
        let bookedSlots = this.slotsForDate[slotkey];
        if(bookedSlots){
          bookedSlots.forEach(bSlot=>{
            console.log("booked slots: ",bSlot);
            var slotBooked = false;
            if(this.endTime == parseInt(bSlot.startTime) || parseInt(this.startTime) == bSlot.endTime){
              console.log("not booked start ",this.startTime);
              console.log("not booked end ",this.endTime);
            }
            else {
              for(var i=parseInt(this.startTime);i<=parseInt(this.startTime)+parseInt(this.hours);i++){
                slotBooked = false;
                console.log("current time index ",i);
                for(var j=parseInt(bSlot.startTime);j<=parseInt(bSlot.startTime)+parseInt(bSlot.hours);j++){
                    console.log("booked slot time time index ",j);
                    if(i==j){
                      console.log("Slot booked : ",bSlot);
                      this.bookedSlotIds[bSlot.slotId]=bSlot.slotId;
                      slotBooked = true;
                      break;
                    }
                }
                if(slotBooked){
                  break;
                }
                
              }
              if(!slotBooked){
                console.log("Slot not booked : ",bSlot);
              }
            }
          })
        }
      })
      
      }
    })
    
  }

  chipClicked(slot){

    if(this.isPastDateSelected){
          alert("Please selected corred date");
          return;
        }

    if(!this.isDateTimeSelected){
      return;
    }
     console.log("startTime",this.startTime);
      console.log("date",this.date);
      console.log("hours",this.hours);
        if(!this.bookedSlotIds[slot]){ 
          let slotObj = {
            date:this.helperService.convertDateTimeToSampleDate(this.date),
            startTime : this.startTime,
            hours: this.hours,
            userId: this.userId,
            locationId: this.locationId,
            slotId: slot,
            endTime:this.endTime==24?0:this.endTime

          }
        console.log("check cliked : ",slot);
        this.parkingActions.bookSlot(slotObj);
        this.bookedSlotIds[slot]=slot;
      }
      else {
        alert("slot already booked");
      }
  }

  convertData(filledSlots: any){
    let filledSlotsObj = {};
    filledSlots.forEach(slot=>{
      console.log(slot);
      if(!filledSlotsObj[slot.slotId]){
        filledSlotsObj[slot.slotId]=[]
      }
      filledSlotsObj[slot.slotId].push(slot);
    })
    this.slotsForDate = filledSlotsObj;
    console.log("list final ",filledSlotsObj);
    
  }

  isSlotBooked(slotId){
    return this.bookedSlotIds[slotId]?true:false;
  }

  

}
