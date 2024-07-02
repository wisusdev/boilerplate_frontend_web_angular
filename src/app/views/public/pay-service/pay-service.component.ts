import {Component, OnInit} from '@angular/core';
import {Auth} from "../../../data/Providers/Auth";
import {LoginComponent} from "../auth/login/login.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: 'app-pay-service',
	standalone: true,
	imports: [
		LoginComponent,
		TranslateModule
	],
	templateUrl: './pay-service.component.html'
})
export class PayServiceComponent implements OnInit {
	public loggedIn: boolean = false;

	constructor(
		private authUser: Auth,
	) {
	}

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});
	}
}
