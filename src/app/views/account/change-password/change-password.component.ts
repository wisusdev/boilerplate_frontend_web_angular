import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ErrorMessagesInterface } from 'src/app/data/Interfaces/Errors.interface';
import { Auth } from 'src/app/data/Providers/Auth';
import { AccountService } from '../account.service';
import { catchError, of, tap } from 'rxjs';
import { Handle } from 'src/app/data/Exceptions/Handle';
import { ToastService } from 'src/app/data/Services/Toast.service';
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
	selector: 'app-change-password',
	standalone: true,
	imports: [
		AccountMenuListComponent,
		TranslateModule,
		ReactiveFormsModule,
		NgClass
	],
	templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private toast: ToastService,
		private handleMessage: Handle,
		private translate: TranslateService
	) { }

	formChangePassword!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
		current_password: '',
		password: '',
		password_confirmation: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			current_password: '',
			password: '',
			password_confirmation: ''
		};
	}

	ngOnInit(): void {
		this.formChangePassword = this.formBuilder.group({
			type: 'change-password',
			id: Auth.userId(),
			current_password: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
		});

		if (this.formChangePassword !== undefined) {
			this.formChangePassword.patchValue(this.formChangePassword);
		}
	}

	get f() {
		return this.formChangePassword.controls;
	}

	onSubmit() {
		this.resetErrorMessages();
		this.accountService.changePassword(this.formChangePassword.value).pipe(
			tap(response => {
				this.formChangePassword.reset();
				this.toast.success(this.translate.instant('message.passwordChangedSuccessfully'));
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();

	}
}
