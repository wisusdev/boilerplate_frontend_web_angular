import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'profile', component: ProfileComponent},
	{path: '', redirectTo: 'register', pathMatch: "full"}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule{}
