import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './data/Guards/Auth.guard';
import {HomeComponent} from "./views/admin/home/home.component";
import {WelcomeComponent} from "./views/public/welcome/welcome.component";
import {AccountRoutingModule} from "./views/admin/account/account-routing.module";
import {SettingsRoutingModule} from "./views/admin/settings/settings-routing.module";
import {AuthRoutingModule} from "./views/public/auth/auth-routing.module";
import {ServicesRoutingModule} from "./views/admin/services/services-routing.module";
import { PublicServicesComponent } from './views/public/services/public-services.component';
import {PayServiceComponent} from "./views/public/pay-service/pay-service.component";

const routes: Routes = [
	{path: '', component: WelcomeComponent},
	{path: 'home', component: HomeComponent, canActivate: [authGuard]},
	{path: 'plans', component: PublicServicesComponent},
	{path: 'plans/:id', component: PayServiceComponent},
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
