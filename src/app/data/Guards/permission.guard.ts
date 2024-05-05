import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {PermissionService} from "../Services/permission.service";

export const permissionGuard: CanActivateFn = (route, state) => {

	const permissionService = inject(PermissionService);
	const requiredPermissions = route.data['permissions'];

	return permissionService.hasPermission(requiredPermissions);
};
