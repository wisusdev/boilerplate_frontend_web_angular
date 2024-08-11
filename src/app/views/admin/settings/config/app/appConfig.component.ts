import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../../settings.service";
import {PermissionService} from "@data/Services/permission.service";
import {catchError, of, tap} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";
import {ToastService} from "@data/Services/Toast.service";

@Component({
	selector: 'app-config',
	standalone: true,
	imports: [
		TranslateModule,
		NgClass,
		ReactiveFormsModule,
		NgForOf,
	],
	templateUrl: './appConfig.component.html'
})
export class AppConfigComponent implements OnInit {
	constructor(
		protected permissions: PermissionService,
		private settings: SettingsService,
		private formBuilder: FormBuilder,
		private toast: ToastService,
		private translate: TranslateService
	) {
	}

	formApp!: FormGroup;
	timezones: string[] = [];

	errorMessages: ErrorMessagesInterface = {
		name: ''
	}

	resetErrorMessages() {
		this.errorMessages = {
			name: ''
		};
	}

	ngOnInit(): void {
		this.formApp = this.formBuilder.group({
			type: 'settings',
			id: '',
			name: ['', [Validators.required]],
			url_api: ['', [Validators.required]],
			url_frontend: ['', [Validators.required]],
			description: '',
			logo: '',
			favicon: '',
			email: [''],
			phone: '',
			address: '',
			timezone: ['', [Validators.required]],
		});

		this.getAppSettings();
	}

	getAppSettings() {
		this.settings.getSettings('app').pipe(
			tap((response) => {
				this.setDataForm(response);
				console.log('Settings loaded');
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	saveAppSettings() {
		this.resetErrorMessages();
		this.settings.updateSettings(this.formApp.value).pipe(
			tap((response) => {
				this.setDataForm(response);
				this.toast.success(this.translate.instant('recordUpdated'));
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	setDataForm(data: any) {
		const formValues = {
			id: data.data.id,
			type: data.data.type,
			...data.data.attributes
		};

		if (formValues.logo) formValues.logo = '';
		if (formValues.favicon) formValues.favicon = '';

		this.formApp.patchValue(formValues);
		this.timezones = data.data.relationships.timezones;
	}
}
