import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SettingsService} from "../../settings.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {KeyValuePipe, NgClass, NgForOf} from '@angular/common';
import {ErrorMessagesInterface} from 'src/app/data/Interfaces/Errors.interface';
import {catchError, of, tap} from 'rxjs';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastService} from "@data/Services/toast.service";

@Component({
	selector: 'app-edit-rol',
	standalone: true,
	imports: [
		KeyValuePipe,
		NgForOf,
		ReactiveFormsModule,
		NgClass,
		RouterLink,
		TranslateModule,
	],
	templateUrl: './editRol.component.html'
})
export class EditRolComponent implements OnInit {

	permissions: Array<any> = [];
	permissionsGrouped: { [key: string]: any[] } = {};
	selectedPermissions: string[] = [];

	formRole!: FormGroup;

	roleId: string = '';

	constructor(
		private route: ActivatedRoute,
		private settingsService: SettingsService,
		private formBuilder: FormBuilder,
		private router: Router,
		private toast: ToastService,
		private translate: TranslateService
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

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.roleId = params['id'];
		});

		this.formRole = this.formBuilder.group({
			type: 'roles',
			id: this.roleId,
			permissions: this.selectedPermissions,
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
		});

		this.getRole();
	}

	getRole() {
		this.settingsService.showRole(this.roleId).pipe(
			tap((response) => {
				this.formRole.patchValue({
					name: response.data.name,
				});
				this.selectedPermissions = response.data.permissions.map((permission: any) => permission.name);
				this.getPermissions();
			}),
			catchError(error => {
				if (error[0] && error[0].status === '404') {
					this.router.navigate(['/settings/roles']).then(() => {

					});
				}
				return of(null);
			})
		).subscribe();
	}

	getPermissions() {
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
				return of(null);
			})
		).subscribe();
	}

	togglePermission(permission: string) {
		const index = this.selectedPermissions.indexOf(permission);
		if (index > -1) {
			this.selectedPermissions.splice(index, 1);
		} else {
			this.selectedPermissions.push(permission);
		}
	}

	updateRole() {
		this.formRole.patchValue({
			permissions: this.selectedPermissions
		});

		this.resetErrorMessages();

		this.settingsService.updateRole(this.roleId, this.formRole.value).pipe(
			tap((response) => {
				this.formRole.reset();
				this.selectedPermissions = [];
				this.router.navigate(['/settings/roles']).then(() => {
					this.toast.success(this.translate.instant('recordUpdated'));
				});
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
