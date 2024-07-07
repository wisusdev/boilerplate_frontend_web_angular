import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SettingsService} from "../../settings.service";
import {NgClass, NgForOf} from "@angular/common";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/Toast.service";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [
		RouterLink,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		NgForOf,
		NgClass
	],
	templateUrl: './createUser.component.html',
})
export class CreateUserComponent implements OnInit {
	formUser!: FormGroup;
	roles: any = [];

	constructor(
		private formBuilder: FormBuilder,
		private settingsService: SettingsService,
		private toast: ToastService,
		private translate: TranslateService,
		private route: Router
	) {
	}

	errorMessages: ErrorMessagesInterface = {
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirmation: '',
		roles: ''
	};

	resetErrorMessages() {
		this.errorMessages = {
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirmation: '',
			roles: ''
		};
	}

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			type: 'users',
			username: ['', [Validators.required, Validators.minLength(3)]],
			first_name: ['', [Validators.required, Validators.minLength(3)]],
			last_name: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
			roles: [[], [Validators.required]]
		});

		this.getRoles();
	}

	getRoles() {
		this.settingsService.indexRoles().pipe(
			tap((response) => {
				this.roles = response.data;
				this.formUser.patchValue({
					roles: this.roles.length > 0 ? this.roles[0].name : ''
				})
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	onSubmit() {
		this.resetErrorMessages();
		let rolesValue = this.formUser.get('roles')!.value;

		if (!Array.isArray(rolesValue)) {
			rolesValue = [rolesValue];
		}

		const rolesControl = this.formUser.get('roles');
		if (rolesControl) {
			rolesControl.setValue(rolesValue);
		}

		this.settingsService.storeUser(this.formUser.value).pipe(
			tap((response: any) => {
				this.formUser.reset();
				this.route.navigate(['/settings/users']).then(() => {
					this.toast.success(this.translate.instant('recordCreated'));
				});
			}),
			catchError((error) => {
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
