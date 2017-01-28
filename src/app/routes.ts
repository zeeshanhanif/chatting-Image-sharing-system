import { Routes } from '@angular/router';
import {LoggedInGuard} from './providers/loggedin-guard'

import { 
    SignupContainer, 
    SigninContainer, 
    AdminContainer,
    UserContainer,
    RootContainer
} from "./containers";
import {     
    BookParkingComponent,
    ViewBookingComponent,
    FeedbackComponent,
    ParkingAreaComponent,
    ParkingAreaSlotsComponent,
    UserListComponent
} from "./components";

export const AppRoutes: Routes = [
    {path: '', redirectTo:'/signin',pathMatch:'full'},
    {path:'signup', component: SignupContainer},
    {path:'signin', component: SigninContainer},
    {path:'root', component: RootContainer, 
        canActivate: [LoggedInGuard],
        children: [
            {path:'admin', component: AdminContainer,
                        children: [
                            {path:'user-list', component: UserListComponent}
                            /*,
                            {path:'student-list', component: UserListComponent},
                            {path:'company-list', component: UserListComponent},
                            {path:'jobDetail', component: JobViewComponent},
                            {path:'userDetail', component: UserViewComponent}
                        */]},
            {path:'user', component: UserContainer,
                        children: [                            
                            {path:'view-booking', component: ViewBookingComponent},
                            {path:'feedback', component: FeedbackComponent},
                            {path:'book-parking', component: BookParkingComponent},
                            {path:'parking-area/:location', component: ParkingAreaComponent}
                        ]},
        ]
    },
];