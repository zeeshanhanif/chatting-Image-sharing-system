import { Routes } from '@angular/router';
import {LoggedInGuard} from './providers/loggedin-guard'

import { 
    SignupContainer, 
    SigninContainer, 
    UserContainer,
    RootContainer
} from "./containers";
import {
    UserListComponent
} from "./components";

export const AppRoutes: Routes = [
    {path: '', redirectTo:'/signin',pathMatch:'full'},
    {path:'signup', component: SignupContainer},
    {path:'signin', component: SigninContainer},
    {path:'root', component: RootContainer, canActivate: [LoggedInGuard]}
];