import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Auth} from "../Providers/Auth";
import {map, take} from "rxjs";
import {app} from "../../config/App";

export const guestGuard: CanActivateFn = () => {
	const authUser = inject(Auth);
	const router = inject(Router);

	return authUser.status().pipe(take(1), map((isLoggedIn: boolean) => {
		if(!isLoggedIn){
			return true;
		} else {
			router.createUrlTree([app.redirectAuth]);
			return false;
		}
	}));
};
