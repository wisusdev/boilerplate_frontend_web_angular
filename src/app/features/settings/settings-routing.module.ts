import {RouterModule, Routes} from "@angular/router";
import {IndexUserComponent} from "./pages/users/index/indexUser.component";
import {IndexRolComponent} from "./pages/roles/index/indexRol.component";
import {NgModule} from "@angular/core";
import {CreateUserComponent} from "./pages/users/create/createUser.component";
import {EditUserComponent} from "./pages/users/edit/editUser.component";
import {CreateRolComponent} from "./pages/roles/create/createRol.component";
import {EditRolComponent} from "./pages/roles/edit/editRol.component";
import { ShowUserComponent } from "./pages/users/show/show.component";
import {authGuard} from "@core/guards/auth.guard";
import {permissionGuard} from "@core/guards/permission.guard";

const router: Routes = [
	{path: 'settings/users', component: IndexUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:index'}},
	{path: 'settings/users/create', component: CreateUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:create'}},
	{path: 'settings/users/show/:id', component: ShowUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:show'}},
	{path: 'settings/users/edit/:id', component: EditUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:edit'}},

	{path: 'settings/roles', component: IndexRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:index'}},
	{path: 'settings/roles/create', component: CreateRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:create'}},
	{path: 'settings/roles/edit/:id', component: EditRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:edit'}},
];

@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}
