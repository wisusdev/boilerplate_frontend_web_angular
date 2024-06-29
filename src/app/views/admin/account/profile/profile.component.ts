import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import { app } from 'src/app/config/App';
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgClass, NgForOf} from "@angular/common";
import {Handle} from "../../../../data/Exceptions/Handle";
import {ToastService} from "../../../../data/Services/Toast.service";
import {Lang} from "../../../../config/Lang";
import {ErrorMessagesInterface} from "../../../../data/Interfaces/Errors.interface";

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
	public allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
	userId: string = '';

	constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private handleMessage: Handle,
		private toast: ToastService,
		private translate: TranslateService
	) {
		this.availableLang = Object.entries(Lang.availableLang).map(([key, value]) => ({ key, ...value }));
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
			this.avatarUrl = dataProfile.avatar || app.placeholderImage;

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
		this.handleFileSelection(event);
	}

	handleFileSelection(event: any) {
		let selectAvatar = <File>event.target.files[0];

		if (!this.allowedTypes.includes(selectAvatar.type)) {
			this.handleMessage.handleError('Invalid file type')
			event.target.value = '';
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			this.selectAvatar = reader.result as string;
			this.selectAvatar = this.selectAvatar.replace(/^data:image\/[a-z]+;base64,/, '');
		}

		reader.readAsDataURL(selectAvatar);
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
