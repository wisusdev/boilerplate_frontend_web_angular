import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../Auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../data/Services/Toast.service";
import {ErrorMessages} from "../../../../data/Interfaces/Errors.interface";
import {catchError, of, tap} from "rxjs";
import {Handle} from "../../../../data/Exceptions/Handle";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private handleMessage: Handle) {
	}

	token: string = '';
	formUser!: FormGroup;

	errorMessages: ErrorMessages = {
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
		this.formUser = this.formBuilder.group({
			password: ['', Validators.required],
			password_confirmation: ['', Validators.required]
		});

		this.route.queryParams.subscribe(param => {
			this.token = param['token'];
		})
	}

	onSubmit() {
		let userResetPasswordData = this.formatFormUser(this.formUser.value);
		this.resetErrorMessages();
		this.authService.resetPassword(userResetPasswordData).pipe(
			tap(response => {
				this.handleMessage.handleResponse('Successfully reset password', this.formUser, '/auth/login');
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
				"token": this.token,
				"password": formUser.password,
				"password_confirmation": formUser.password_confirmation
			}
		}
	}
}
