import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { UserInterface } from "../../../../interfaces/user.interface";
import {ErrorMessages} from "../../../../interfaces/errors.interface";
import {HandleMessage} from "../../../../core/HandleMessage";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private handleMessage: HandleMessage) { }

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
		this.authService.login(this.formUser.value).subscribe(
			(response) => this.handleMessage.handleResponse(response, this.formUser, '/profile'),
			(error) => this.handleMessage.handleError(error, this.errorMessages)
		);
	}
}
