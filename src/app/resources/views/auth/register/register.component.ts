import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterUserInterface } from "../../../../data/Interfaces/Auth/RegisterUser.interface";
import { AuthService } from "../Auth.service";
import { Handle } from 'src/app/data/Exceptions/Handle';
import { catchError, of, tap } from 'rxjs';
import { ErrorMessages } from 'src/app/data/Interfaces/Errors.interface';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	constructor(private formBuilder: FormBuilder, private authUser: AuthService, private handleMessage: Handle) { }

	formUser!: FormGroup;

	errorMessages: ErrorMessages = {
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirmation: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirmation: ''
		};
	}

	@Input()
	userModel!: RegisterUserInterface;

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			username: ['', Validators.required],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			password_confirmation: ['', Validators.required]
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	onSubmit() {
		let userRegisterData = this.formatFormUser(this.formUser.value);
		this.resetErrorMessages();
		this.authUser.register(userRegisterData).pipe(
			tap(response => this.handleMessage.handleResponse('User created successfully', this.formUser, '/auth/login')),
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
				"username": formUser.username,
				"first_name": formUser.first_name,
				"last_name": formUser.last_name,
				"email": formUser.email,
				"password": formUser.password,
				"password_confirmation": formUser.password_confirmation
			}
		}
	}

}
