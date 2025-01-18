import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Handle} from '@data/Exceptions/handle';
import {catchError, of, tap} from 'rxjs';
import {ErrorMessagesInterface} from '@data/Interfaces/errors.interface';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {ToastService} from "@data/Services/toast.service";
import {environment} from "@env/environment";
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass,
		RouterLink
	],
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
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	onSubmit() {
		this.resetErrorMessages();
		this.authUser.register(this.formUser.value).pipe(
			tap(response => {
				this.handleMessage.handleResponse(this.translate.instant('message.registrationSuccessful'), this.formUser, environment.redirectToLogin)
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
