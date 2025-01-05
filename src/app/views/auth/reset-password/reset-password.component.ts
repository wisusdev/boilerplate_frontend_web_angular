import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {Handle} from "@data/exceptions/handle";
import {ToastService} from "@data/services/toast.service";
import {ErrorMessagesInterface} from "@data/interfaces/errors.interface";
import {environment} from "@env/environment";

@Component({
	selector: 'app-reset-password',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass
	],
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
				this.handleMessage.handleResponse(this.translate.instant('message.passwordResetSuccess'), this.formResetPassword, environment.redirectToLogin);
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
