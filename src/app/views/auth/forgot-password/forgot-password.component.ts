import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {catchError, of, tap} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {Handle} from "@data/Exceptions/handle";
import {ToastService} from "@data/Services/toast.service";
import {ErrorMessagesInterface} from "@data/Interfaces/errors.interface";
import {environment} from "@env/environment";

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	templateUrl: './forgot-password.component.html',
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass
	]
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
				this.handleMessage.handleResponse(this.translate.instant('message.resetPasswordEmailSent'), this.formForgotPassword, environment.redirectToLogin);
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
