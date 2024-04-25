import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {authGuard} from "../../../data/Guards/Auth.guard";
import {RolesComponent} from "./roles/roles.component";
import {NgModule} from "@angular/core";

const router: Routes = [
	{ path: 'settings/users', component: UsersComponent, canActivate: [authGuard] },
	{ path: 'settings/roles', component: RolesComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(router)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {}
