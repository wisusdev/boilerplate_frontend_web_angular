import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../data/Services/Auth.service";
import { UserInterface } from "../../../../data/Interfaces/User.interface";
import { ErrorMessages } from "../../../../data/Interfaces/Errors.interface";
import { Handle } from "../../../../data/Exceptions/Handle";
import { of, tap } from "rxjs";
import { catchError } from "rxjs/operators";

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
	userModel!: UserInterface;

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
		this.resetErrorMessages();
		this.authService.login(this.formUser.value).pipe(
			tap(response => this.handleMessage.handleResponse(response, this.formUser, '/profile')),
			catchError(error => {
				this.handleMessage.handleError(error);
				return of(null);
			})
		).subscribe();
	}
}
