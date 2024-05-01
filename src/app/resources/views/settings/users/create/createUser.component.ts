import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessages} from "../../../../../data/Interfaces/Errors.interface";
import {SettingsService} from "../../settings.service";
import {NgForOf} from "@angular/common";
import {ToastService} from "../../../../../data/Services/Toast.service";

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [
		RouterLink,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		NgForOf
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
	) {}

	errorMessages: ErrorMessages = {
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
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirmation: '',
			roles: []
		});

		this.settingsService.indexRoles().subscribe((response: any) => {
			this.roles = response.data;
			this.formUser.patchValue({
				roles: this.roles.length > 0 ? this.roles[0].name : ''
			})
		});
	}

	onSubmit() {
		let dataUser = this.formatUserRoles(this.formUser.value);

		this.resetErrorMessages();
		this.settingsService.storeUser(dataUser).subscribe(
			(response: any) => {
				this.formUser.reset();
				this.toast.show({message: this.translate.instant('recordCreated')});

			},
			(error: any) => {
				if (error.status === 422) {
					this.resetErrorMessages();
					this.toast.show({message: this.translate.instant('errorAsOccurred')});
				}
			}
		);
	}

	formatUserRoles(dataUser: any) {
		return {
			'data': {
				'type': 'users',
				'attributes': {
					'username': dataUser.username,
					'first_name': dataUser.first_name,
					'last_name': dataUser.last_name,
					'email': dataUser.email,
					'password': dataUser.password,
					'password_confirmation': dataUser.password_confirmation,
					'roles': [dataUser.roles]
				}
			}
		}
	}
}
