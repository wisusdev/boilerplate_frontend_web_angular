import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Handle} from 'src/app/data/Exceptions/Handle';
import {catchError, of, tap} from 'rxjs';
import {ErrorMessagesInterface} from 'src/app/data/Interfaces/Errors.interface';
import {TranslateService} from "@ngx-translate/core";
import {app} from "../../../../config/App";
import {ToastService} from "../../../../data/Services/Toast.service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private authUser: AuthService,
		private handleMessage: Handle,
		private translate: TranslateService,
		private toast: ToastService
	) {
	}

	formUser!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
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

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			type: 'users',
			username: ['', [Validators.required, Validators.minLength(3)]],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
		}, {
			validator: this.mustMatch('password', 'password_confirmation')
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	mustMatch(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls[controlName];
			const matchingControl = formGroup.controls[matchingControlName];

			if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
				return;
			}

			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ mustMatch: true });
			} else {
				matchingControl.setErrors(null);
			}
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authUser.register(this.formUser.value).pipe(
			tap(response => {
				this.handleMessage.handleResponse(this.translate.instant('message.registrationSuccessful'), this.formUser, app.redirectToLogin)
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.toast.danger(this.translate.instant('message.registrationFailed'));
				return of(null);
			})
		).subscribe();
	}
}
