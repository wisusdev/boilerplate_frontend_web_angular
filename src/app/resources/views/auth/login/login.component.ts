import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ErrorMessages} from "../../../../data/Interfaces/Errors.interface";
import {Handle} from "../../../../data/Exceptions/Handle";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {app} from "../../../../config/App";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private handleMessage: Handle
	) {
	}

	formUser!: FormGroup;

	errorMessages: ErrorMessages = {
		email: '',
		password: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			email: '',
			password: ''
		};
	}

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			type: 'users',
			email: ['', Validators.required],
			password: ['', Validators.required],
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authService.login(this.formUser.value).pipe(
			tap(response => {
				if (response && response.data.relationships.access.token) {
					localStorage.setItem('user', JSON.stringify(response.data.attributes.user));
					localStorage.setItem('user_key', response.data.id);
					localStorage.setItem('access_token', response.data.relationships.access.token);
				}
				this.handleMessage.handleResponse('Successfully login', this.formUser, app.redirectAuth)
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[1];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.handleMessage.handleError(error);
				return of(null);
			})
		).subscribe();
	}
}
