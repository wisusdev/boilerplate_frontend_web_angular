import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../data/Services/Auth.service";
import { ErrorMessages } from "../../../../data/Interfaces/Errors.interface";
import { Handle } from "../../../../data/Exceptions/Handle";
import { of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import {LoginUserInterface} from "../../../../data/Interfaces/Auth/LoginUser.interface";
import {app} from "../../../../config/App";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private handleMessage: Handle) { }

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

	@Input()
	userModel!: LoginUserInterface;

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	onSubmit() {
		let userLoginData = this.formatFormUser(this.formUser.value);
		this.resetErrorMessages();
		this.authService.login(userLoginData).pipe(
			tap(response => this.handleMessage.handleResponse(response, this.formUser, app.redirectAuth)),
			catchError(error => {
				if(typeof error === 'object') {
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

	formatFormUser(formUser: any) {
		return {
			"data": {
				"email": formUser.email,
				"password": formUser.password
			}
		}
	}
}
