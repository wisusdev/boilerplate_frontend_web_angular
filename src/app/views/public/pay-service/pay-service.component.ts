import {Component, OnInit} from '@angular/core';
import {Auth} from "../../../data/Providers/Auth";
import {LoginComponent} from "../auth/login/login.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServicesService} from "../../admin/services/services.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {PackageData} from "../../../data/Interfaces/Responses/showPackageResponse.interface";
import {CurrencyPipe} from "@angular/common";

interface UserProfile {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

@Component({
	selector: 'app-pay-service',
	standalone: true,
	imports: [
		LoginComponent,
		TranslateModule,
		CurrencyPipe
	],
	templateUrl: './pay-service.component.html'
})
export class PayServiceComponent implements OnInit {
	public loggedIn: boolean = false;
	public serviceId: string = '';

	public package: PackageData = {
		type: '',
		id: '',
		attributes: {
			name: '',
			description: '',
			max_users: 0,
			interval: '',
			interval_count: 0,
			price: '',
			trial_days: 0,
			active: 0,
			created_by: '',
			created_at: '',
			updated_at: ''
		}
	};

	public userProfile: UserProfile = {
		id: '',
		first_name: '',
		last_name: '',
		email: '',
		avatar: '',
	}

	constructor(
		private authUser: Auth,
		protected translate: TranslateService,
		private services: ServicesService,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});

		this.route.params.subscribe(params => {
			this.serviceId = params['id'];
		});

		this.getUserProfile();

		this.getPublicService();
	}

	getPublicService(id: string = this.serviceId){
		this.services.publicShowService(id).pipe(
			tap((response) => {
				this.package = response.data;
			}),
			catchError((error) => {
				console.error(error);
				return of(null);
			})
		).subscribe()
	}

	getUserProfile(){
		let userData = localStorage.getItem('user');
		if (userData) {
			this.userProfile = JSON.parse(userData);
		}
	}
}
