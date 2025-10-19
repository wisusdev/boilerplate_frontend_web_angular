import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from '@core/guards/auth.guard';
import {HomeComponent} from "@features/home/home.component";
import {AccountRoutingModule} from "@features/account/account-routing.module";
import {SettingsRoutingModule} from "@features/settings/settings-routing.module";
import {AuthRoutingModule} from "@features/auth/auth-routing.module";
import {LoginComponent} from "@features/auth/pages/login/login.component";

const routes: Routes = [
	{path: '', component: LoginComponent, data: {title: 'Login'}},
	{path: 'home', component: HomeComponent, canActivate: [authGuard], data: {title: 'Home'}},
	{path: '**', redirectTo: '', pathMatch: 'full'}
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
