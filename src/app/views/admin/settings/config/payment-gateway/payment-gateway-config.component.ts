import {Component, OnInit} from '@angular/core';
import {SettingsService} from "@views/admin/settings/settings.service";
import {ToastService} from "@data/Services/toast.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";
import {catchError, of, tap} from "rxjs";
import {LowerCasePipe, NgClass, NgForOf, TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
	selector: 'app-payment-gateway',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass,
		NgForOf,
		TitleCasePipe,
		UpperCasePipe,
		LowerCasePipe,
	],
	templateUrl: './payment-gateway-config.component.html'
})
export class PaymentGatewayConfigComponent implements OnInit {
	formPaymentGateway!: FormGroup;

	paymentMethodsMode: string[] = ['sandbox', 'live'];

	constructor(
		private settings: SettingsService,
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
	) {
	}

	errorMessages: ErrorMessagesInterface = {
		name: ''
	}

	resetErrorMessages() {
		this.errorMessages = {
			name: ''
		};
	}

	ngOnInit(): void {
		this.formPaymentGatewayInit();
		this.getPaymentGatewaySettings();
	}

	private createPaymentMethodGroup() {
		return this.formBuilder.group({
		  enabled: false,
		  mode: 'sandbox',
		  key: ['', [Validators.required]],
		  secret: ['', [Validators.required]]
		});
	  }

	formPaymentGatewayInit() {
		this.formPaymentGateway = this.formBuilder.group({
			id: '',
			type: 'payment_gateway',
			currency: ['', [Validators.required]],
			currency_symbol: ['', [Validators.required]],
			decimal_separator: ['', [Validators.required]],
			thousands_separator: ['', [Validators.required]],
			payment_methods: this.formBuilder.group({
			  paypal: this.createPaymentMethodGroup(),
			  stripe: this.createPaymentMethodGroup(),
			  wompi: this.createPaymentMethodGroup()
			})
		  });
	}

	getPaymentGatewaySettings() {
		this.settings.getSettings('payment_gateway').pipe(
			tap((res) => {
				this.setDataForm(res);
			}),
			catchError((err) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	setDataForm(data: any) {

		const {id, type, attributes} = data.data;
		const {currency, currency_symbol, decimal_separator, thousands_separator, payment_methods} = attributes;

		const formValues = {
			id,
			type,
			currency,
			currency_symbol,
			decimal_separator,
			thousands_separator,
			payment_methods
		};

		this.formPaymentGateway.patchValue(formValues);
		console.log(this.formPaymentGateway.value);
	}

	savePaymentGatewaySettings() {
		this.resetErrorMessages();
		this.settings.updateSettings(this.formPaymentGateway.value).pipe(
			tap((response) => {
				this.setDataForm(response);
				this.toast.success(this.translate.instant('recordUpdated'));
			}),
			catchError((err) => {
				console.error(err);
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}
}
