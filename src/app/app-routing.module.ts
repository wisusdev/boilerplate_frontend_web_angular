import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRoutingModule } from "./resources/views/account/account-routing.module";
import { AuthRoutingModule } from "./resources/views/auth/auth-routing.module";
import { SettingsRoutingModule } from "./resources/views/settings/settings-routing.module";
import { HomeComponent } from './resources/views/home/home.component';
import { authGuard } from './data/Guards/Auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [authGuard] }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		AccountRoutingModule,
		AuthRoutingModule,
		SettingsRoutingModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
