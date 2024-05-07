import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../settings.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastService} from "../../../../data/Services/Toast.service";
import {ErrorMessagesInterface} from "../../../../data/Interfaces/Errors.interface";

@Component({
	selector: 'app-edit-user',
	standalone: true,
	imports: [
		FormsModule,
		NgForOf,
		ReactiveFormsModule,
		RouterLink,
		TranslateModule
	],
	templateUrl: './editUser.component.html',
})
export class EditUserComponent implements OnInit {

	userId: string = '';
	roles: any = [];
	formUser!: FormGroup;

	constructor(
		private settingsService: SettingsService,
		private formBuilder: FormBuilder,
		private toast: ToastService,
		private route: ActivatedRoute,
		private router: Router,
		private translate: TranslateService
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

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.userId = params['id'];
		});

		this.settingsService.showUser(this.userId).pipe(
			tap((response) => {
				let userData = response.data.attributes;
				let roles = response.data.relationships.roles;

				this.formUser.patchValue({
					username: userData.username,
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					roles: roles
				});

				this.getRoles();
			}),
			catchError((error: any) => {
				if (error && error[0] && error[0].status !== '200') {
					this.router.navigate(['/settings/users']).then(() => {
						this.toast.warning(this.translate.instant('recordNotFound'));
					});
				}
				return of(null);
			})
		).subscribe();

		this.formUser = this.formBuilder.group({
			type: 'users',
			id: this.userId,
			username: ['', [Validators.required, Validators.minLength(3)]],
			first_name: ['', [Validators.required, Validators.minLength(3)]],
			last_name: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.minLength(8)]],
			password_confirmation: ['', [Validators.minLength(8)]],
			roles: [[], [Validators.required]]
		});
	}

	getRoles() {
		this.settingsService.indexRoles().subscribe((response: any) => {
			this.roles = response.data;
			console.log(this.roles);
			console.log(this.formUser.value.roles);
			if (this.formUser.value.roles.length === 0) {
				this.formUser.patchValue({
					roles: this.roles.length > 0 ? [this.roles[0].name] : []
				});
			}
		});
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
		this.settingsService.updateUser(this.userId, this.formUser.value).subscribe((response: any) => {
			this.router.navigate(['/settings/users']).then(() => {
				this.toast.success(this.translate.instant('recordUpdated'));
			});
		});
	}

	formatRoles(dataUser: any) {

		let attributes: any = {
			"username": dataUser.username,
			"first_name": dataUser.first_name,
			"last_name": dataUser.last_name,
			"email": dataUser.email,
			"roles": dataUser.roles
		};

		if (dataUser.password && dataUser.password.length > 8 && dataUser.password === dataUser.password_confirmation) {
			attributes["password"] = dataUser.password;
			attributes["password_confirmation"] = dataUser.password_confirmation;
		}

		return {
			"data": {
				"type": "users",
				"id": this.userId,
				"attributes": attributes
			}
		}
	}
}
