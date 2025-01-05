import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass, NgForOf} from "@angular/common";
import {ToastService} from "@data/services/toast.service";
import {ErrorMessagesInterface} from "@data/interfaces/errors.interface";
import {environment} from "@env/environment";
import {FileHelperService} from "@data/services/file-helper.service";

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [
		AccountMenuListComponent,
		TranslateModule,
		ReactiveFormsModule,
		NgClass,
		NgForOf
	],
	templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
	public availableLang: any[] = [];
	public avatarUrl: string = '';
	public selectAvatar: string = '';
	public allowedTypes = environment.allowImageTypes;
	userId: string = '';

	constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private toast: ToastService,
		private translate: TranslateService,
		private fileHelperService: FileHelperService
	) {
		this.availableLang = Object.entries(environment.availableLang).map(([key, value]) => ({ key, ...value }));
	}

	@ViewChild('avatarFile') avatarFile: any;

	formProfile!: FormGroup;

	errorMessages: ErrorMessagesInterface = {
		first_name: '',
		last_name: '',
		email: '',
		avatar: '',
		language: ''
	}

	resetErrorMessages() {
		this.errorMessages = {
			first_name: '',
			last_name: '',
			email: '',
			avatar: '',
			language: ''
		};
	}

	@Input() profileModel!: any;

	ngOnInit() {
		this.userId = localStorage.getItem('user_key') || '';
		this.initFormProfile();
	}

	initFormProfile() {
		let userData = localStorage.getItem('user');

		if (userData) {
			let dataProfile = JSON.parse(userData);
			this.avatarUrl = dataProfile.avatar || environment.profileImage;

			this.formProfile = this.formBuilder.group({
				type: 'profile',
				id: this.userId,
				first_name: [dataProfile.first_name, Validators.required],
				last_name: [dataProfile.last_name, Validators.required],
				email: [dataProfile.email, Validators.required],
				avatar: [dataProfile.avatar, Validators.required],
				language: [dataProfile.language, Validators.required]
			});
		}
	}

	onFileSelected(event: any) {
		this.fileHelperService.handleFileSelection(event, (base64: string) => {
			this.selectAvatar = base64;
		});
	}

	onSubmit() {
		this.updateUserProfile();
	}

	updateUserProfile() {
		this.resetErrorMessages();
		this.accountService.updateProfile(this.formProfile.value).pipe(
			tap(response => {
				if (response.data) {
					localStorage.setItem('user', JSON.stringify(response.data.attributes));
					this.avatarFile.nativeElement.value = '';
					let uniqueString = new Date().getTime();
					this.avatarUrl = (response.data.attributes.avatar || "/assets/images/profile.png") + "?v=" + uniqueString;
					this.toast.success(this.translate.instant('recordUpdated'));
				}
			}),
			catchError(error => {
				if(typeof error === 'object') {
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
