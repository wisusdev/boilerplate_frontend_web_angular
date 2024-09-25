import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../../settings.service";
import {catchError, of, tap} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";
import {ToastService} from "@data/Services/toast.service";
import {FileHelperService} from "@data/Services/file-helper.service";
import {environment} from "@env/environment";

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
		private settings: SettingsService,
		private formBuilder: FormBuilder,
		private toast: ToastService,
		private translate: TranslateService,
		private fileHelperService: FileHelperService
	) {
	}

	@ViewChild('logoFile') logoFile: any;
	@ViewChild('faviconFile') faviconFile: any;

	formApp!: FormGroup;
	timezones: string[] = [];
	public allowedTypes = environment.allowImageTypes;
	public logoUrl: string = '';
	public faviconUrl: string = '';

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
		const { id, type, attributes, relationships } = data.data;
		const { name, url_api, url_frontend, description, email, phone, address, timezone, logo, favicon } = attributes;

		const formValues = {
			id,
			type,
			name,
			url_api,
			url_frontend,
			description,
			email,
			phone,
			address,
			timezone,
		};

		this.formApp.patchValue(formValues);
		this.timezones = relationships.timezones;
		this.logoUrl = logo || environment.placeholderImage;
		this.faviconUrl = favicon || environment.placeholderImage;
	}

	onLogoSelected(event: any) {
		this.fileHelperService.handleFileSelection(event, (base64: string) => {
			this.formApp.patchValue({logo: base64});
		});
	}

	onFaviconSelected(event: any) {
		this.fileHelperService.handleFileSelection(event, (base64: string) => {
			this.formApp.patchValue({favicon: base64});
		});
	}
}
