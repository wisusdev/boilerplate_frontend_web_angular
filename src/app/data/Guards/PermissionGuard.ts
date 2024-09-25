import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PermissionService} from "../Services/permission.service";
import {ToastService} from "@data/Services/toast.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "@env/environment";

export const PermissionGuard: CanActivateFn = (route, state) => {

	const permissionService = inject(PermissionService);
	const router = inject(Router);
	const toast = inject(ToastService);
	const translate = inject(TranslateService);
	const requiredPermissions = route.data['permissions'];

	if (permissionService.hasPermission(requiredPermissions)) {
		return true;
	} else {
		router.navigate([environment.redirectToHome]).then(() =>{
			toast.danger(translate.instant('youDoNotHavePermission'));
		});
		return false;
	}
};
