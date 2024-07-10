import {Component, OnInit} from '@angular/core';
import {Auth} from "@data/Providers/Auth";
import {LoginComponent} from "../../auth/login/login.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {PackageData} from "@data/Interfaces/Responses/showPackageResponse.interface";
import {CurrencyPipe} from "@angular/common";
import {PublicService} from "@views/public/services/public.service";
import {ToastService} from "@data/Services/Toast.service";

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
	templateUrl: './pay-package.component.html'
})
export class PayPackageComponent implements OnInit {
	public loggedIn: boolean = false;
	public serviceId: string = '';
	private userId: string = '';

	public package: PackageData = {
		type: '',
		id: '',
		attributes: {
			name: '',
			description: '',
			limits: '',
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
		private services: PublicService,
		private route: ActivatedRoute,
		private toast: ToastService
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
		this.getUserId();
		this.getPublicService();
	}

	getPublicService(id: string = this.serviceId){
		this.services.publicShowPackage(id).pipe(
			tap((response) => {
				this.package = response.data;
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe()
	}

	storeSubscriptions(payment_method: string){
		let data = {
			type: 'subscriptions',
			user_id: this.userId,
			package_id: this.package.id,
			created_by: this.userId,
			payment_method: payment_method,
		};

		this.services.publicStoreSubscription(data).pipe(
			tap((response) => {
				console.log(response);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	getUserProfile(){
		let userData = localStorage.getItem('user');
		if (userData) {
			this.userProfile = JSON.parse(userData);
		}
	}

	getUserId(){
		let userId = localStorage.getItem('user_key');
		if (userId) {
			this.userId = userId;
		}
	}
}
