import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class HelperService {
    
    startTimeArray = [];
    startTimeArrayMap ={};
    constructor(public af: AngularFire,private router: Router) {
        this.startTimeArrayMap = {
                "12:00 AM":0,
                "01:00 AM":1,
                "02:00 AM":2,
                "03:00 AM":3,
                "04:00 AM":4,
                "05:00 AM":5,
                "06:00 AM":6,
                "07:00 AM":7,
                "08:00 AM":8,
                "09:00 AM":9,
                "10:00 AM":10,
                "11:00 AM":11,
                "12:00 PM":12,
                "01:00 PM":13,
                "02:00 PM":14,
                "03:00 PM":15,
                "04:00 PM":16,
                "05:00 PM":17,
                "06:00 PM":18,
                "07:00 PM":19,
                "08:00 PM":20,
                "09:00 PM":21,
                "10:00 PM":22,
                "11:00 PM":23
                
        };
        this.startTimeArray = [
                "12:00 AM",
                "01:00 AM",
                "02:00 AM",
                "03:00 AM",
                "04:00 AM",
                "05:00 AM",
                "06:00 AM",
                "07:00 AM",
                "08:00 AM",
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "01:00 PM",
                "02:00 PM",
                "03:00 PM",
                "04:00 PM",
                "05:00 PM",
                "06:00 PM",
                "07:00 PM",
                "08:00 PM",
                "09:00 PM",
                "10:00 PM",
                "11:00 PM"
                
        ];
    }

    getStartTimeArray(){
        return this.startTimeArrayMap;
    }

    getEndTime(startTime:string,hours:number){
        var endTme = "";
        for(var a=0;a<this.startTimeArray.length;a++){
            if(this.startTimeArray[a]==startTime){
                return endTme = this.startTimeArray[a+hours];
            }
        }
    }

    convertDateTimeToSampleDate(date: Date){
        return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    }
}