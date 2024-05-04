import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {Handle} from "../../../data/Exceptions/Handle";
import {ToastService} from "../../../data/Services/Toast.service";
import {ErrorMessagesInterface} from "../../../data/Interfaces/Errors.interface";
import {mustMatch} from "../../../data/Vendor/mustMatch";

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
			token: this.token,
			password: ['', [Validators.required, Validators.minLength(8)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
		}, {
			validator: mustMatch('password', 'password_confirmation')
		});

		if (this.formResetPassword !== undefined) {
			this.formResetPassword.patchValue(this.formResetPassword);
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authService.resetPassword(this.formResetPassword.value).pipe(
			tap(response => {
				this.handleMessage.handleResponse('Successfully reset password', this.formResetPassword, '/auth/login');
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[1];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				return of(null);
			})
		).subscribe();
	}
}
