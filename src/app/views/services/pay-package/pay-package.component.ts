import {Component, OnInit} from '@angular/core';
import {Auth} from "@data/Providers/auth";
import {LoginComponent} from "@views/auth/login/login.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {PackageData} from "@data/Interfaces/Responses/showPackageResponse.interface";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ToastService} from "@data/Services/toast.service";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "@env/environment";
import {WompiRequest} from "@data/Requests/wompi-request";
import {CreditCardNumberMaskDirective} from "@data/Directives/credit-card-number-mask.directive";
import {CreditCardCvvMaskDirective} from "@data/Directives/credit-card-cvv-mask.directive";
import {Pais, Territorio} from "@data/Interfaces/Responses/getWompiRegions.interface";
import {ServicesService} from "@views/services/services.service";

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
		FormsModule,
		NgForOf,
		CreditCardNumberMaskDirective,
		CreditCardCvvMaskDirective,
		NgClass,
		NgIf,
	],
	templateUrl: './pay-package.component.html'
})
export class PayPackageComponent implements OnInit {

	public loggedIn: boolean = false;
	public serviceId: string = '';
	private userId: string = '';
	private stripe: Stripe | null = null;

	private formData: object = {};

	stripeIsCollapsed = true;
	wompiIsCollapsed = true;

	stripeSubscriptionForm!: FormGroup;
	wompiSubscriptionForm!: FormGroup;

	card: any;
	paymentMethodId: string = '';
	months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

	currentYear: number = new Date().getFullYear();
	years: number[] = Array.from({ length: 11 }, (_, i) => this.currentYear + i);

	countries: Pais[] = [];
	territories: Territorio[] = [];

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
		private services: ServicesService,
		private route: ActivatedRoute,
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private router: Router
	) {
	}

	ngOnInit() {
		this.getUserProfile();

		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});

		this.route.params.subscribe(params => {
			this.serviceId = params['id'];
		});

		this.stripeSubscriptionForm = this.formBuilder.group({
			email: [this.userProfile.email, [Validators.required, Validators.email]]
		});

		this.wompiSubscriptionForm = this.formBuilder.group({
			card_number: ['', [Validators.required, WompiRequest.creditCardNumberWithMask()],],
			cvv: ['', [Validators.required, WompiRequest.cvv],],
			expiration_month: [1, Validators.required],
			expiration_year: [this.currentYear, Validators.required],
			first_name: [this.userProfile.first_name, Validators.required],
			last_name: [this.userProfile.last_name, Validators.required],
			email: [this.userProfile.email, [Validators.required, Validators.email]],
			country: ['', [Validators.required]],
			state: ['', [Validators.required]],
			city: ['', Validators.required],
			address: ['', Validators.required],
			postal_code: ['', Validators.required],
			phone: ['', Validators.required],
		});

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
			...this.formData,
			type: 'subscriptions',
			user_id: this.userId,
			package_id: this.package.id,
			created_by: this.userId,
			payment_method: payment_method
		};

		this.services.publicStoreSubscription(data).pipe(
			tap((response) => {
				if(payment_method === 'paypal' && response.approve_url){
					window.location.href = response.approve_url;
				}

				if (payment_method === 'stripe' && response.status === 'succeeded') {
					this.router.navigate(['/payment-success/' + this.package.id]).then(responseRoute => {
						this.toast.success(this.translate.instant('paymentSuccessful'));
					});
				}

				if (payment_method === 'wompi' && response.status === 'approved') {
					this.router.navigate(['/payment-success/' + this.package.id]).then(responseRoute => {
						this.toast.success(this.translate.instant('paymentSuccessful'));
					});
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
		this.stripe = await loadStripe(environment.stripeKey);
		const elements = this.stripe!.elements();
		this.card = elements.create('card');
		this.card.mount('#card-element');
	}

	async stripeSubscribe(){
		if(!this.stripeSubscriptionForm.valid){
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

		this.formData = {...this.formData, payment_method_id: paymentMethod!.id};

		this.storeSubscriptions('stripe');
	}

	toggleWompi(){
		this.wompiIsCollapsed = !this.wompiIsCollapsed;

		if(this.countries.length === 0){
			this.getWompiRegions();
		}
	}

	getWompiRegions(){
		this.services.getWompiRegions().pipe(
			tap((response) => {
				this.countries = Object.values(response);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	onCountryChange(event: Event) {
		const selectedCountryId = (event.target as HTMLSelectElement).value;
		const selectedCountry = this.countries.find(country => country.id === selectedCountryId);
		this.territories = selectedCountry ? selectedCountry.territorios : [];
	}

	wompiPayment(){
		const formValue = this.wompiSubscriptionForm.value;
		this.formData = {...this.formData, ...formValue};
		this.storeSubscriptions('wompi');
	}
}
