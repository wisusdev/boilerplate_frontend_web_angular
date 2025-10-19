import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "@features/base/pages/profile/profile.component";
import {ChangePasswordComponent} from "@features/base/pages/change-password/change-password.component";
import {DeviceConnectedComponent} from "@features/base/pages/device-connected/device-connected.component";
import {DeleteAccountComponent} from "@features/base/pages/delete-account/delete-account.component";
import {authGuard} from "@core/guards/auth.guard";
import {IndexUserComponent} from "@features/base/pages/users/index/indexUser.component";
import {permissionGuard} from "@core/guards/permission.guard";
import {CreateUserComponent} from "@features/base/pages/users/create/createUser.component";
import {ShowUserComponent} from "@features/base/pages/users/show/show.component";
import {EditUserComponent} from "@features/base/pages/users/edit/editUser.component";
import {IndexRolComponent} from "@features/base/pages/roles/index/indexRol.component";
import {CreateRolComponent} from "@features/base/pages/roles/create/createRol.component";
import {EditRolComponent} from "@features/base/pages/roles/edit/editRol.component";


const routes: Routes = [
	{path: 'account/profile', component: ProfileComponent, canActivate: [authGuard]},
	{path: 'account/change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
	{path: 'account/device-connected', component: DeviceConnectedComponent, canActivate: [authGuard]},
	{path: 'account/delete-account', component: DeleteAccountComponent, canActivate: [authGuard]},

    {path: 'settings/users', component: IndexUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:index'}},
    {path: 'settings/users/create', component: CreateUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:create'}},
    {path: 'settings/users/show/:id', component: ShowUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:show'}},
    {path: 'settings/users/edit/:id', component: EditUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:edit'}},

    {path: 'settings/roles', component: IndexRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:index'}},
    {path: 'settings/roles/create', component: CreateRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:create'}},
    {path: 'settings/roles/edit/:id', component: EditRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:edit'}},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BaseRoutingModule {}
