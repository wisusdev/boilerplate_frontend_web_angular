import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {authGuard} from "@data/guards/auth.guard";
import {AccountSubscriptionsComponent} from "@views/account/account-subscriptions/account-subscriptions.component";
import {ProfileComponent} from "@views/account/profile/profile.component";
import {ChangePasswordComponent} from "@views/account/change-password/change-password.component";
import {DeviceConnectedComponent} from "@views/account/device-connected/device-connected.component";
import {DeleteAccountComponent} from "@views/account/delete-account/delete-account.component";
import {AccountInvoiceShowComponent} from "@views/account/account-invoice/show/accountInvoiceShow.component";

const routes: Routes = [
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]},
	{path: 'account/delete-account', component: DeleteAccountComponent, canActivate: [authGuard]},
	{path: 'account/subscriptions', component: AccountSubscriptionsComponent, canActivate: [authGuard]},
	{path: 'account/invoices/show/:id', component: AccountInvoiceShowComponent, canActivate: [authGuard]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}
