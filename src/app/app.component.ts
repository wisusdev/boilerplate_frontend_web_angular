import {Component, OnInit} from '@angular/core';
import {Auth} from './data/Providers/Auth';
import {RouteExceptionService} from "./data/Services/route-exception.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(
		private authUser: Auth,
		private routeExceptionService: RouteExceptionService,
	) {
	}

	public loggedIn: boolean = false;
	title = 'angular-app';

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});
	}

	exceptionRoute(): boolean {
		return this.routeExceptionService.exceptionRoute();
	}
}
