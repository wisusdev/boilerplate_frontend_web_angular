import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import { AuthUser } from '../core/AuthUser';

export const authGuard: CanActivateFn = (route, state) => {
	const authUser = inject(AuthUser);
	const router = inject(Router);

	return authUser.status().pipe(take(1), map((isLoggedIn: boolean) => {
		if (!isLoggedIn) {
			router.createUrlTree(['/auth/login']);
			return false;
		}
		return true;
	}));
};
