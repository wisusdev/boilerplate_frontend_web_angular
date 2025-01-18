import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {environment} from "@env/environment";
import {ToastService} from "@data/Services/toast.service";

export const redirectToHomeWithMessage = (router: Router, toast: ToastService, translate: TranslateService) => {
	router.navigate([environment.redirectToHome]).then(() => {
		toast.show({
			message: translate.instant('permissionNotGranted'),
			className: 'bg-warning text-light'
		});
	});
};
