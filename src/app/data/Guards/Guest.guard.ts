import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Auth} from "../Providers/Auth";
import {map, take} from "rxjs";
import {environment} from "@env/environment";

export const guestGuard: CanActivateFn = () => {
	const authUser = inject(Auth);
	const router = inject(Router);

	return authUser.status().pipe(take(1), map((isLoggedIn: boolean) => {
		if(!isLoggedIn){
			return true;
		} else {
			router.createUrlTree([environment.redirectToHome]);
			return false;
		}
	}));
};
