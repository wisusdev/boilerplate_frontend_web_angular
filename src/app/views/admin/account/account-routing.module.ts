import {ProfileComponent} from "./profile/profile.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {DeviceConnectedComponent} from "./device-connected/device-connected.component";
import {DeleteAccountComponent} from "./delete-account/delete-account.component";
import {authGuard} from "../../../data/Guards/Auth.guard";

const routes: Routes = [
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]},
	{path: 'account/delete-account', component: DeleteAccountComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}
