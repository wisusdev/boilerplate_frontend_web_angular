import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {NgModule} from "@angular/core";
import {guestGuard} from "@core/guards/guest.guard";

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
