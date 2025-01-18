import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from '@data/Guards/auth.guard';
import {HomeComponent} from "@views/home/home.component";
import {WelcomeComponent} from "@views/welcome/welcome.component";
import {AccountRoutingModule} from "@views/account/account-routing.module";
import {SettingsRoutingModule} from "@views/settings/settings-routing.module";
import {AuthRoutingModule} from "@views/auth/auth-routing.module";
import {ServicesRoutingModule} from "@views/services/services-routing.module";
import { PublicPackagesComponent } from '@views/services/packages/public-package/public-packages.component';
import {PayPackageComponent} from "@views/services/pay-package/pay-package.component";
import {PaymentStatusComponent} from "@views/services/payment-status/payment-status.component";

const routes: Routes = [
	{path: '', component: WelcomeComponent, data: {title: 'Welcome'}},
	{path: 'home', component: HomeComponent, canActivate: [authGuard], data: {title: 'Home'}},
	{path: 'plans', component: PublicPackagesComponent},
	{path: 'plans/:id', component: PayPackageComponent},
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
