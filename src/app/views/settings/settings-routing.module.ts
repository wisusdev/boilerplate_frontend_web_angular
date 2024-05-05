import {RouterModule, Routes} from "@angular/router";
import {IndexUserComponent} from "./users/index/indexUser.component";
import {IndexRolComponent} from "./roles/index/indexRol.component";
import {NgModule} from "@angular/core";
import {CreateUserComponent} from "./users/create/createUser.component";
import {EditUserComponent} from "./users/edit/editUser.component";
import {CreateRolComponent} from "./roles/create/createRol.component";
import {EditRolComponent} from "./roles/edit/editRol.component";
import { ShowUserComponent } from "./users/show/show.component";
import {authGuard} from "../../data/Guards/Auth.guard";

const router: Routes = [
	{path: 'settings/users', component: IndexUserComponent, canActivate: [authGuard]},
	{path: 'settings/users/create', component: CreateUserComponent, canActivate: [authGuard]},
	{path: 'settings/users/show/:id', component: ShowUserComponent, canActivate: [authGuard]},
	{path: 'settings/users/edit/:id', component: EditUserComponent, canActivate: [authGuard]},

	{path: 'settings/roles', component: IndexRolComponent, canActivate: [authGuard]},
	{path: 'settings/roles/create', component: CreateRolComponent, canActivate: [authGuard]},
	{path: 'settings/roles/edit/:id', component: EditRolComponent, canActivate: [authGuard]},
];

@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}