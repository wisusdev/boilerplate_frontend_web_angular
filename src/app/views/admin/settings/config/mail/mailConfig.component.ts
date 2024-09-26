import {Component, OnInit} from '@angular/core';
import {SettingsService} from "@views/admin/settings/settings.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorMessagesInterface} from "@data/Interfaces/Errors.interface";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
	selector: 'app-mail',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		NgClass
	],
	templateUrl: './mailConfig.component.html'
})
export class MailConfigComponent implements OnInit {

	formMail!: FormGroup;

	constructor(
		private settings: SettingsService,
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
	) {
	}

	errorMessages: ErrorMessagesInterface = {
		name: ''
	}

	resetErrorMessages() {
		this.errorMessages = {
			name: ''
		};
	}

	ngOnInit(): void {
		this.formMailInit();
		this.getMailSettings();
	}

	formMailInit() {
		this.formMail = this.formBuilder.group({
			id: '',
			type: 'mail',
			driver: ['', [Validators.required]],
			host: ['', [Validators.required]],
			port: ['', [Validators.required]],
			encryption: '',
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			from_address: ['', [Validators.required]],
			from_name: ['', [Validators.required]]
		});
	}

	getMailSettings() {
		this.settings.getSettings('mail').pipe(
			tap((res) => {
				this.setDataForm(res);
			}),
			catchError((err) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	setDataForm(data: any) {

		const {id, type, attributes} = data.data;
		const {driver, host, port, encryption, username, password, from_address, from_name} = attributes;

		const formValues = {
			id,
			type,
			driver,
			host,
			port,
			encryption,
			username,
			password,
			from_address,
			from_name
		};

		this.formMail.setValue(formValues);
	}

	saveMailSettings() {
		this.resetErrorMessages();
		this.settings.updateSettings(this.formMail.value).pipe(
			tap((response) => {
				this.setDataForm(response);
				this.toast.success(this.translate.instant('recordUpdated'));
			}),
			catchError((err) => {
				console.error(err);
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}
}
