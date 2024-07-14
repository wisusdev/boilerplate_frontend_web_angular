import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {authGuard} from "@data/Guards/Auth.guard";
import {AccountSubscriptionsComponent} from "@views/admin/account/account-subscriptions/account-subscriptions.component";
import {ProfileComponent} from "@views/admin/account/profile/profile.component";
import {ChangePasswordComponent} from "@views/admin/account/change-password/change-password.component";
import {DeviceConnectedComponent} from "@views/admin/account/device-connected/device-connected.component";
import {DeleteAccountComponent} from "@views/admin/account/delete-account/delete-account.component";

const routes: Routes = [
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]},
	{path: 'account/delete-account', component: DeleteAccountComponent, canActivate: [authGuard]},
	{path: 'account/subscriptions', component: AccountSubscriptionsComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}
