import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Handle} from "@data/Exceptions/handle";
import {ToastService} from "@data/Services/toast.service";
import {ErrorMessagesInterface} from "@data/Interfaces/errors.interface";
import {environment} from "@env/environment";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass,
		RouterLink
	],
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private handleMessage: Handle,
		private translate: TranslateService,
		private toast: ToastService
	) {
	}

	formUser!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
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
			password: ['', [Validators.required, Validators.minLength(8)]],
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
					localStorage.setItem('permissions', JSON.stringify(response.data.relationships.permissions));
					localStorage.setItem('user_key', response.data.id);
					localStorage.setItem('access_token', response.data.relationships.access.token);
				}
				this.handleMessage.handleResponse(this.translate.instant('message.loginSuccessful'), this.formUser, environment.redirectToHome)
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.toast.danger(this.translate.instant('message.loginFailed'));
				return of(null);
			})
		).subscribe();
	}
}
