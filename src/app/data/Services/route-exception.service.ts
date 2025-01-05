import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {exceptionOfRoutesForAdministrationPanel} from "@data/vendor/routes-exception";

@Injectable({
	providedIn: 'root'
})
export class RouteExceptionService {

	constructor(private router: Router) { }

	exceptionRoute(): boolean {
		// Obtiene solo la parte de la ruta de la URL, excluyendo los parámetros de consulta
		const path = this.router.url.split('?')[0];
		const urlSegments = path.split('/');

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
