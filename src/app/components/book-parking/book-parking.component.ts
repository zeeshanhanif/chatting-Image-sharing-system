import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable} from 'rxjs';
import { IAppState, AuthActions,ParkingActions } from '../../store';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {

  @select(['parking', 'locations']) locations$: Observable<any>;
  
  constructor(private parkingActions: ParkingActions) {

    parkingActions.getLocations();

    this.locations$.subscribe(val=>{
      console.log("value === ",val);
    })

   }

  ngOnInit() {
  }

  keys(object: {}) {
        return Object.keys(object);
    }

}
