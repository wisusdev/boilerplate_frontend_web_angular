import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Handle} from '../../../../data/Exceptions/Handle';
import {ErrorMessagesInterface} from '../../../../data/Interfaces/Errors.interface';
import {catchError, of, tap} from "rxjs";
import {app} from "../../../../config/App";
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "../../../../data/Services/Toast.service";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private handleMessage: Handle,
		private translate: TranslateService,
		private toast: ToastService
	) {
	}

	formForgotPassword!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
		email: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			email: ''
		};
	}

	ngOnInit() {
		this.formForgotPassword = this.formBuilder.group({
			type: 'users',
			email: ['', [Validators.required, Validators.email]]
		});

		if (this.formForgotPassword !== undefined) {
			this.formForgotPassword.patchValue(this.formForgotPassword);
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authService.forgotPassword(this.formForgotPassword.value).pipe(
			tap(response => {
				this.handleMessage.handleResponse(this.translate.instant('message.resetPasswordEmailSent'), this.formForgotPassword, app.redirectToLogin);
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.toast.danger(this.translate.instant('message.failingSendingEmail'));
				return of(null);
			})
		).subscribe();
	}
}
