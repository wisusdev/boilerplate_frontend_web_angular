import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {Handle} from "../../../data/Exceptions/Handle";
import {ToastService} from "../../../data/Services/Toast.service";
import {ErrorMessagesInterface} from "../../../data/Interfaces/Errors.interface";
import {mustMatch} from "../../../data/Vendor/mustMatch";
import {app} from "../../../config/App";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private authService: AuthService,
		private handleMessage: Handle,
		private toast: ToastService,
		private translate: TranslateService,
	) {
	}

	token: string = '';
	formResetPassword!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
		password: '',
		password_confirmation: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			password: '',
			password_confirmation: ''
		};
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe(param => {
			this.token = param['token'];
		})

		this.formResetPassword = this.formBuilder.group({
			type: 'reset-password',
			token: this.token,
			password: ['', [Validators.required, Validators.minLength(8)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
		});

		if (this.formResetPassword !== undefined) {
			this.formResetPassword.patchValue(this.formResetPassword);
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authService.resetPassword(this.formResetPassword.value).pipe(
			tap(response => {
				this.handleMessage.handleResponse(this.translate.instant('message.passwordResetSuccess'), this.formResetPassword, app.redirectToLogin);
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.toast.danger(this.translate.instant('message.passwordResetError'));
				return of(null);
			})
		).subscribe();
	}
}
