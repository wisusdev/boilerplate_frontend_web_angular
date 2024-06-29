import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../settings.service";
import {KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Handle} from "../../../../../data/Exceptions/Handle";
import {ToastService} from "../../../../../data/Services/Toast.service";
import {ErrorMessagesInterface} from "../../../../../data/Interfaces/Errors.interface";

@Component({
	selector: 'app-create-rol',
	standalone: true,
	imports: [
		KeyValuePipe,
		NgForOf,
		RouterLink,
		ReactiveFormsModule,
		NgClass,
		TranslateModule
	],
	templateUrl: './createRol.component.html'
})
export class CreateRolComponent implements OnInit {
	permissions: Array<any> = [];
	permissionsGrouped: { [key: string]: any[] } = {};
	selectedPermissions: string[] = [];

	formRole!: FormGroup;

	constructor(
		private settingsService: SettingsService,
		private formBuilder: FormBuilder,
		private handleMessage: Handle,
		private toast: ToastService,
		private route: Router,
		private translate: TranslateService
	) { }

	errorMessages: ErrorMessagesInterface = {
		name: ''
	}

	resetErrorMessages() {
		this.errorMessages = {
			name: ''
		};
	}

	ngOnInit(): void {
		this.settingsService.indexPermissions().pipe(
			tap((response) => {
				this.permissions = response.data.attributes;
				this.permissions.forEach((permission: any) => {
					const group = permission.name.split(':')[0];
					if (!this.permissionsGrouped[group]) {
						this.permissionsGrouped[group] = [];
					}
					this.permissionsGrouped[group].push(permission);
				});
			}),
			catchError((error: any) => {
				this.handleMessage.handleError(error);
				return of(null);
			})
		).subscribe();

		this.formRole = this.formBuilder.group({
			type: 'roles',
			permissions: [],
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
		});

		if (this.formRole !== undefined) {
			this.formRole.patchValue(this.formRole);
		}
	}

	togglePermission(permission: string) {
		const index = this.selectedPermissions.indexOf(permission);
		if (index > -1) {
			this.selectedPermissions.splice(index, 1);
		} else {
			this.selectedPermissions.push(permission);
		}
	}

	storeRole(){
		this.formRole.patchValue({
			permissions: this.selectedPermissions
		});

		this.resetErrorMessages();

		this.settingsService.storeRole(this.formRole.value).pipe(
			tap((response) => {
				this.formRole.reset();
				this.selectedPermissions = [];
				this.route.navigate(['/settings/roles']).then((response) => {
					this.toast.success(this.translate.instant('recordCreated'));
				})
			}),
			catchError((error: any) => {
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
