import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./resources/views/auth/login/login.component";
import {RegisterComponent} from "./resources/views/auth/register/register.component";
import {ForgotPasswordComponent} from "./resources/views/auth/forgot-password/forgot-password.component";
import {ProfileComponent} from "./resources/views/profile/profile.component";
import {authGuard} from "./data/Guards/Auth.guard";
import {ResetPasswordComponent} from "./resources/views/auth/reset-password/reset-password.component";
import { guestGuard } from './data/Guards/guest.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full'},
	{ path: 'auth/login', component: LoginComponent, canActivate: [guestGuard]},
	{ path: 'auth/register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'auth/forgot-password', component: ForgotPasswordComponent, canActivate: [guestGuard]},
	{ path: 'auth/reset-password', component: ResetPasswordComponent, canActivate: [guestGuard]},
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
