import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessages} from "../../../../data/Interfaces/Errors.interface";
import {AccountService} from "../account.service";
import {Lang} from "../../../../config/Lang";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {Handle} from "../../../../data/Exceptions/Handle";
import {ToastService} from "../../../../data/Services/Toast.service";
import { app } from 'src/app/config/App';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
	public availableLang: any[] = [];
	public avatarUrl: string = '';
	public selectAvatar: string = '';
	public allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

	constructor(private formBuilder: FormBuilder, private accountService: AccountService, private handleMessage: Handle, private toast: ToastService) {
		this.availableLang = Object.entries(Lang.availableLang).map(([key, value]) => ({ key, ...value }));
	}

	@ViewChild('avatarFile') avatarFile: any;

	formProfile!: FormGroup;

	errorMessages: ErrorMessages = {
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

	@Input()
	profileModel!: any;

	ngOnInit() {
		this.initFormProfile();
	}

	initFormProfile() {
		let userData = localStorage.getItem('user');

		if (userData) {
			let dataProfile = JSON.parse(userData);
			this.avatarUrl = dataProfile.avatar || app.placeholderImage;

			this.formProfile = this.formBuilder.group({
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
		let formProfile = this.formatFormProfile(this.formProfile.value);
		this.resetErrorMessages();
		this.accountService.updateProfile(formProfile).pipe(
			tap(response => {
				if (response.data) {
					localStorage.setItem('user', JSON.stringify(response.data.attributes));
					this.avatarFile.nativeElement.value = '';
					let uniqueString = new Date().getTime();
					this.avatarUrl = (response.data.attributes.avatar || "/assets/images/profile.png") + "?v=" + uniqueString;
					this.toast.show({ message: 'Successfully update profile'});
				}
			}),
			catchError(error => {
				if(typeof error === 'object') {
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

	formatFormProfile(formProfile: any) {
		return {
			"data": {
				"type": "profiles",
				"id": localStorage.getItem('user_key') || '',
				"attributes": {
					"first_name": formProfile.first_name,
					"last_name": formProfile.last_name,
					"email": formProfile.email,
					"avatar": this.selectAvatar || '',
					"language": formProfile.language
				}
			}
		}
	}

}
