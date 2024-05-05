import { Router } from '@angular/router';
import { ToastService } from '../Services/Toast.service';
import { TranslateService } from '@ngx-translate/core';
import { app } from '../../config/App';

export const redirectToHomeWithMessage = (router: Router, toast: ToastService, translate: TranslateService) => {
	router.navigate([app.redirectToHome]).then(() => {
		toast.show({
			message: translate.instant('permissionNotGranted'),
			className: 'bg-warning text-light'
		});
	});
};
