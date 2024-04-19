import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Handle} from '../../../../data/Exceptions/Handle';
import {ErrorMessages} from '../../../../data/Interfaces/Errors.interface';
import {catchError, of, tap} from "rxjs";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private handleMessage: Handle) {
	}

	formForgotPassword!: FormGroup;

	errorMessages: ErrorMessages = {
		email: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			email: ''
		};
	}

	ngOnInit() {
		this.formForgotPassword = this.formBuilder.group({
			email: ['', Validators.required]
		});

		if (this.formForgotPassword !== undefined) {
			this.formForgotPassword.patchValue(this.formForgotPassword);
		}
	}

	onSubmit() {
		let userForgotPasswordData = this.formatFormUser(this.formForgotPassword.value);
		this.resetErrorMessages();
		this.authService.forgotPassword(userForgotPasswordData).pipe(
			tap(response => {
				this.handleMessage.handleResponse('Successfully sent reset password email', this.formForgotPassword, '/auth/login');
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

	formatFormUser(formUser: any) {
		return {
			"data": {
				"email": formUser.email,
			}
		};
	}
}
