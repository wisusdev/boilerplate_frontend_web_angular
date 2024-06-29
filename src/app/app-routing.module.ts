import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './data/Guards/Auth.guard';
import {HomeComponent} from "./views/home/home.component";
import {AccountRoutingModule} from "./views/account/account-routing.module";
import {AuthRoutingModule} from "./views/auth/auth-routing.module";
import {SettingsRoutingModule} from "./views/settings/settings-routing.module";
import {ServicesRoutingModule} from "./views/services/services-routing.module";
import {WelcomeComponent} from './views/welcome/welcome.component';

const routes: Routes = [
	{ path: '', component: WelcomeComponent },
	{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
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
