import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {exceptionOfRoutesForAdministrationPanel} from "../Vendor/RoutesException";

@Injectable({
	providedIn: 'root'
})
export class RouteExceptionService {

	constructor(private router: Router) { }

	exceptionRoute(): boolean {
		const urlSegments = this.router.url.split('/');
		return exceptionOfRoutesForAdministrationPanel.some(route => {
			const routeSegments = route.split('/');
			if (urlSegments.length !== routeSegments.length) {
				return false;
			}
			for (let i = 0; i < urlSegments.length; i++) {
				if (routeSegments[i].startsWith(':')) {
					continue;
				}
				if (routeSegments[i] !== urlSegments[i]) {
					return false;
				}
			}
			return true;
		});
	}
}
