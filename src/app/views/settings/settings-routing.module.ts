import {RouterModule, Routes} from "@angular/router";
import {IndexUserComponent} from "./users/index/indexUser.component";
import {IndexRolComponent} from "./roles/index/indexRol.component";
import {NgModule} from "@angular/core";
import {CreateUserComponent} from "./users/create/createUser.component";
import {EditUserComponent} from "./users/edit/editUser.component";
import {CreateRolComponent} from "./roles/create/createRol.component";
import {EditRolComponent} from "./roles/edit/editRol.component";
import { ShowUserComponent } from "./users/show/show.component";
import {authGuard} from "@data/guards/auth.guard";
import {AppConfigComponent} from "@views/settings/config/app/appConfig.component";
import {permissionGuard} from "@data/guards/permission.guard";
import {MailConfigComponent} from "./config/mail/mailConfig.component";
import {PaymentGatewayConfigComponent} from "@views/settings/config/payment-gateway/payment-gateway-config.component";

const router: Routes = [
	{path: 'settings/users', component: IndexUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:index'}},
	{path: 'settings/users/create', component: CreateUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:create'}},
	{path: 'settings/users/show/:id', component: ShowUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:show'}},
	{path: 'settings/users/edit/:id', component: EditUserComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'users:edit'}},

	{path: 'settings/roles', component: IndexRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:index'}},
	{path: 'settings/roles/create', component: CreateRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:create'}},
	{path: 'settings/roles/edit/:id', component: EditRolComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'roles:edit'}},

	{path: 'settings/app', component: AppConfigComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'settings:app'}},
	{path: 'settings/mail', component: MailConfigComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'settings:mail'}},
	{path: 'settings/payment_gateway', component: PaymentGatewayConfigComponent, canActivate: [authGuard, permissionGuard], data: {permissions: 'settings:payment_gateway'}}
];

@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}
