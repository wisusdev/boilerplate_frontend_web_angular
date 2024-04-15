import {ProfileComponent} from "./profile/profile.component";
import {authGuard} from "../../../data/Guards/Auth.guard";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {DeviceConnectedComponent} from "./device-connected/device-connected.component";

const routes: Routes = [
	{path: '', redirectTo: 'account/profile', pathMatch: 'full'},
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}