import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {NgModule} from "@angular/core";
import {guestGuard} from "@data/Guards/guest.guard";

const routes: Routes = [
	{ path: 'auth/login', component: LoginComponent, canActivate: [guestGuard]},
	{ path: 'auth/register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'auth/forgot-password', component: ForgotPasswordComponent, canActivate: [guestGuard]},
	{ path: 'auth/reset-password', component: ResetPasswordComponent, canActivate: [guestGuard]},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
