import { Injectable } from '@angular/core';
import { AngularFire,FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router'
import { Observable,Observer } from 'rxjs';
import { User } from '../models'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class ParkingService {

    constructor(public af: AngularFire,private router: Router) {
        //this.users = this.af.database.object("/users")
    }
    
    getLocationAndDateSlots(locationId:string, date:string ){
        return this.af.database.list(`bookings/${locationId}`,{query: {
                            orderByChild: 'date',
                            equalTo: date
                    }});
    }

    getBookings(userId){
        console.log("in getBookings",userId);
        if(userId){
            return this.af.database.list("/userbookings/"+userId);
        }
        else {
            return this.af.database.list("/userbookings/RGL9Nm7TQUZ2X5nHRAnjraF6sr53");
        }
        /*
        if(companyId){
            return this.af.database.list("/jobs", {query: {
                        orderByChild: 'companyId',
                        equalTo: companyId 
                    }})
        }
        else{
            return this.af.database.list("/jobs");
        }*/
    }

    sendFeedback(userId,data){
        this.af.database.list("/userfeedback/").push({userId:userId,feedback:data.feedback,reply:""});
    }


    getFeedbacks(userId){
        console.log("in get user feedbacks",userId);
        if(userId){
        return this.af.database.list("/userfeedback/",{query: {
                            orderByChild: 'userId',
                            equalTo: userId
        }});
        }
        else {
            return this.af.database.list("/userfeedback");
        }

    }

    removeBookings(booking){
        console.log("in remove booking",booking);
        
        this.af.database.list("bookings/"+booking.locationId).remove(booking.bookingId);
        this.af.database.list("userbookings/"+booking.userId).remove(booking.$key);
        

    }

    getUserList(accountType: string){
        if(accountType){
            return this.af.database.list("/users",{query: {
                        orderByChild: 'accountType',
                        equalTo: accountType 
                    }});
        }
        else {
            return this.af.database.list("/users");
        }
    }

    replyFeedback(feedback, reply){
        this.af.database.object("/userfeedback/"+feedback.$key).update({reply:reply});
    }
    
   
}