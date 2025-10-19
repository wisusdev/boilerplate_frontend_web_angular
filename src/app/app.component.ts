import {Component, OnInit} from '@angular/core';
import {Auth} from '@core/providers/auth';
import {catchError, of, tap} from "rxjs";
import {RoleAndPermissionService} from "@features/base/services/role-and-permission.service";
import {Title} from "@angular/platform-browser";
import {RouteExceptionService} from '@core/services/route-exception.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

	constructor(
		private authUser: Auth,
		private routeExceptionService: RouteExceptionService,
		private settings: RoleAndPermissionService,
		private titleService: Title
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
