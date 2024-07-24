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
import {loadStripe, Stripe} from "@stripe/stripe-js";
import {app} from "@config/App";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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
		CurrencyPipe,
		NgbCollapseModule,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './pay-package.component.html'
})
export class PayPackageComponent implements OnInit {
	public loggedIn: boolean = false;
	public serviceId: string = '';
	private userId: string = '';
	private stripe: Stripe | null = null;
	isCollapsed = true;
	stripeSubscriptionForm!: FormGroup;
	card: any;

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
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private http: HttpClient
	) {
	}

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});

		this.route.params.subscribe(params => {
			this.serviceId = params['id'];
		});

		this.stripeSubscriptionForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});

		this.getUserProfile();
		this.getUserId();
		this.getPublicService();
		this.payWithStripe().then();
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
				if(payment_method === 'paypal'){
					window.location.href = response.approve_url;
				}
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant(error[0]['detail']));
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

	async payWithStripe(){
		this.stripe = await loadStripe(app.stripeKey);
		const elements = this.stripe!.elements();
		this.card = elements.create('card');
		this.card.mount('#card-element');
	}

	async stripeSubscribe(){
		if(this.stripeSubscriptionForm.valid){
			return;
		}

		const email = this.stripeSubscriptionForm.get('email')?.value;

		const {error, paymentMethod } = await this.stripe!.createPaymentMethod({
			type: 'card',
			card: this.card,
			billing_details: {
				email: email
			}
		});

		if (error) {
			console.error('Error creating payment method!', error);
			return;
		}

		console.log(paymentMethod);
	}
}
