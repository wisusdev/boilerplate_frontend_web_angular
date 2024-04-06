import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./resources/views/auth/login/login.component";
import {RegisterComponent} from "./resources/views/auth/register/register.component";
import {ForgotPasswordComponent} from "./resources/views/auth/forgot-password/forgot-password.component";
import {ProfileComponent} from "./resources/views/profile/profile.component";
import {authGuard} from "./core/Guards/Auth.guard";
import {ResetPasswordComponent} from "./resources/views/auth/reset-password/reset-password.component";

const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full'},
	{ path: 'auth/login', component: LoginComponent },
	{ path: 'auth/register', component: RegisterComponent },
	{ path: 'auth/forgot-password', component: ForgotPasswordComponent },
	{ path: 'auth/reset-password', component: ResetPasswordComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
