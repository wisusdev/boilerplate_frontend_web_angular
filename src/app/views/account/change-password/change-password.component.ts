import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ErrorMessagesInterface } from 'src/app/data/Interfaces/Errors.interface';
import { Auth } from 'src/app/data/Providers/Auth';
import { AccountService } from '../account.service';
import { catchError, of, tap } from 'rxjs';
import { Handle } from 'src/app/data/Exceptions/Handle';
import { ToastService } from 'src/app/data/Services/Toast.service';
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {TranslateModule} from "@ngx-translate/core";
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
		private handleMessage: Handle
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
		if (this.formChangePassword.invalid) {
			this.toast.show({ message: 'Please fill in all required fields', className: 'bg-warning text-light'});
			return
		}

		if (this.formChangePassword.value.password !== this.formChangePassword.value.password_confirmation) {
			this.toast.show({ message: 'Password and Confirm Password do not match', className: 'bg-warning  text-light'});
			return;
		}

		let userChangePasswordData = this.formatChangePassword(this.formChangePassword.value);
		this.resetErrorMessages();
		this.accountService.changePassword(userChangePasswordData).pipe(
			tap(response => {
				this.formChangePassword.reset();
				this.toast.show({ message: 'Successfully changed password' });
			}),
			catchError(error => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[2];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.handleMessage.handleError(error);
				return of(null);
			})
		).subscribe();

	}

	formatChangePassword(formUser: any) {
		return {
			"data": {
				"type": "profiles",
				"id": Auth.userId(),
				"attributes": {
					"current_password": formUser.current_password,
					"password": formUser.password,
					"password_confirmation": formUser.password_confirmation
				}
			}
		};
	}
}
