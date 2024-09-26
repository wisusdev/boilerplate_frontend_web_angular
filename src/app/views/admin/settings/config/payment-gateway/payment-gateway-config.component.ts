import {Component, OnInit} from '@angular/core';
import {SettingsService} from "@views/admin/settings/settings.service";
import {ToastService} from "@data/Services/toast.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";
import {catchError, of, tap} from "rxjs";

@Component({
	selector: 'app-payment-gateway',
	standalone: true,
	imports: [],
	templateUrl: './payment-gateway-config.component.html'
})
export class PaymentGatewayConfigComponent implements OnInit {
	formPaymentGateway!: FormGroup;

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

	formPaymentGatewayInit() {
		this.formPaymentGateway = this.formBuilder.group({});
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
	}
}
