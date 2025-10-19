import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "@features/account/pages/profile/profile.component";
import {ChangePasswordComponent} from "@features/account/pages/change-password/change-password.component";
import {DeviceConnectedComponent} from "@features/account/pages/device-connected/device-connected.component";
import {DeleteAccountComponent} from "@features/account/pages/delete-account/delete-account.component";
import {authGuard} from "@core/guards/auth.guard";


const routes: Routes = [
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]},
	{path: 'account/delete-account', component: DeleteAccountComponent, canActivate: [authGuard]},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}
