import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { HandleMessage } from 'src/app/core/HandleMessage';
import { ErrorMessages } from 'src/app/interfaces/errors.interface';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private handleMessage: HandleMessage) { }

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
		this.authService.forgotPassword(this.formForgotPassword.value).subscribe(
			(response) => this.handleMessage.handleResponse(response, this.formForgotPassword, '/auth/login'),
			(error) => this.handleMessage.handleError(error, this.errorMessages)
		);
	}
}
