import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountRoutingModule} from "./resources/views/account/account-routing.module";
import {AuthRoutingModule} from "./resources/views/auth/auth-routing.module";

const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		AccountRoutingModule,
		AuthRoutingModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
