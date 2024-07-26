import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "@env/environment";

export const headerTokenInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	let response = next(req);

	const access_token: string | null = localStorage.getItem('access_token');

	if(access_token) {
		const authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${access_token}`
			}
		});

		response = next(authReq).pipe(
			catchError((error) => {
				if (error.status === 401) {
					localStorage.clear();
					router.navigate([environment.redirectToLogin]).then();
				}

				throw error;
			})
		);
	}

	return response;
};
