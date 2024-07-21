import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from '@data/Guards/Auth.guard';
import {HomeComponent} from "@views/admin/home/home.component";
import {WelcomeComponent} from "@views/public/welcome/welcome.component";
import {AccountRoutingModule} from "@views/admin/account/account-routing.module";
import {SettingsRoutingModule} from "@views/admin/settings/settings-routing.module";
import {AuthRoutingModule} from "@views/public/auth/auth-routing.module";
import {ServicesRoutingModule} from "@views/admin/services/services-routing.module";
import { PublicPackagesComponent } from '@views/public/services/package/public-packages.component';
import {PayPackageComponent} from "@views/public/services/pay-package/pay-package.component";
import {PaymentStatusComponent} from "@views/public/services/payment-status/payment-status.component";

const routes: Routes = [
	{path: '', component: WelcomeComponent},
	{path: 'home', component: HomeComponent, canActivate: [authGuard]},
	{path: 'plans', component: PublicPackagesComponent},
	{path: 'plans/:id', component: PayPackageComponent, canActivate: [authGuard]},
	{path: 'payment-success/:id', component: PaymentStatusComponent, canActivate: [authGuard]},
	{path: 'payment-cancelled/:id', component: PaymentStatusComponent, canActivate: [authGuard]},
	{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		AccountRoutingModule,
		AuthRoutingModule,
		SettingsRoutingModule,
		ServicesRoutingModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
