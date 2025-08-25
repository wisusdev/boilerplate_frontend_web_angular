import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from '@data/guards/auth.guard';
import {HomeComponent} from "@views/home/home.component";
import {AccountRoutingModule} from "@views/account/account-routing.module";
import {SettingsRoutingModule} from "@views/settings/settings-routing.module";
import {AuthRoutingModule} from "@views/auth/auth-routing.module";
import {LoginComponent} from "@views/auth/login/login.component";

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
