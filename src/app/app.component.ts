import {Component, OnInit} from '@angular/core';
import {Auth} from '@data/Providers/Auth';
import {RouteExceptionService} from "@data/Services/route-exception.service";
import {catchError, of, tap} from "rxjs";
import {SettingsService} from "@views/admin/settings/settings.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(
		private authUser: Auth,
		private routeExceptionService: RouteExceptionService,
		private settings: SettingsService,
	) {
	}

	public loggedIn: boolean = false;
	title = 'angular-app';

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});

		const app = localStorage.getItem('app') || null;
		if (app === null) {
			this.getAppSettings();
		}
	}

	exceptionRoute(): boolean {
		return this.routeExceptionService.exceptionRoute();
	}

	getAppSettings() {
		this.settings.getSettings('app').pipe(
			tap((response) => {
				const { attributes } = response.data;
				const { name, url_api, url_frontend, description, email, phone, address, timezone, logo, favicon } = attributes;

				const formValues = {
					name,
					url_api,
					url_frontend,
					description,
					email,
					phone,
					address,
					timezone,
					logo,
					favicon,
				};

				localStorage.setItem('app', JSON.stringify(formValues));
			}),
			catchError((error) => {
				return of(null);
			})
		).subscribe();
	}
}
