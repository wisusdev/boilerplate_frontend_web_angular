import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Auth} from "../../config/Auth";
import {map, take} from "rxjs";

export const guestGuard: CanActivateFn = (route, state) => {
	const authUser = inject(Auth);
	const router = inject(Router);

	return authUser.status().pipe(take(1), map((isLoggedIn: boolean) => {
		if (isLoggedIn) {
			router.createUrlTree(['/profile']);
			return false;
		}

		return true;
	}));
};
