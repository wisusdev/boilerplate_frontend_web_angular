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
import {IndexConfigComponent} from "./config/index/indexConfig.component";

const router: Routes = [
	{path: 'settings/users', component: IndexUserComponent, canActivate: [authGuard], data: {permissions: 'users.index'}},
	{path: 'settings/users/create', component: CreateUserComponent, canActivate: [authGuard], data: {permissions: 'users.create'}},
	{path: 'settings/users/show/:id', component: ShowUserComponent, canActivate: [authGuard], data: {permissions: 'users.show'}},
	{path: 'settings/users/edit/:id', component: EditUserComponent, canActivate: [authGuard], data: {permissions: 'users.edit'}},

	{path: 'settings/roles', component: IndexRolComponent, canActivate: [authGuard], data: {permissions: 'roles.index'}},
	{path: 'settings/roles/create', component: CreateRolComponent, canActivate: [authGuard], data: {permissions: 'roles.create'}},
	{path: 'settings/roles/edit/:id', component: EditRolComponent, canActivate: [authGuard], data: {permissions: 'roles.edit'}},
];

@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}
