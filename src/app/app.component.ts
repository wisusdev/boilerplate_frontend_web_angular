import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Auth} from './data/Providers/Auth';
import {routesException} from "./data/Vendor/RoutesException";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(
		private authUser: Auth
	) {
	}

	public loggedIn: boolean = false;
	title = 'angular-app';

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});
	}

	protected readonly routesException = routesException;
}
