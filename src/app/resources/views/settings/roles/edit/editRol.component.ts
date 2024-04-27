import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SettingsService } from "../../settings.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe, NgClass, NgForOf } from '@angular/common';
import { ErrorMessages } from 'src/app/data/Interfaces/Errors.interface';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from 'src/app/data/Services/Toast.service';

@Component({
	selector: 'app-edit-rol',
	standalone: true,
	imports: [
		KeyValuePipe,
		NgForOf,
		ReactiveFormsModule,
		NgClass,
		RouterLink
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
		private toast: ToastService
	) {}

	errorMessages: ErrorMessages = {
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

		this.settingsService.showRole(this.roleId).pipe(
			tap((data: any) => {
				this.formRole.setValue({
					name: data.data.name,
				});
				this.selectedPermissions = data.data.permissions.map((permission: any) => permission.name);
			}),
			catchError(error => {
				if(error[0].status === '404'){
					this.router.navigate(['/settings/roles']);
				}
				return of(null);
			})
		).subscribe();

		this.settingsService.indexPermissions().pipe().subscribe((response: any) => {
			this.permissions = response;

			this.permissions.forEach(permission => {
				const prefix = permission.name.split(':')[0];
				if (!this.permissionsGrouped[prefix]) {
					this.permissionsGrouped[prefix] = [];
				}
				this.permissionsGrouped[prefix].push(permission);
			});
		});

		this.formRole = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
		});
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
		let formRole = this.formatFormRole(this.formRole.value);
		this.resetErrorMessages();
		this.settingsService.updateRole(this.roleId, formRole).pipe(
			tap((response) => {
				this.formRole.reset();
				this.selectedPermissions = [];
				this.toast.show({message: 'Role updated successfully'});
				this.router.navigate(['/settings/roles']);
			}),
			catchError((error: any) => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[3];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				return of(null);
			})
		).subscribe();
	}

	formatFormRole(formRole: any) {
		return {
			"data": {
				"type": "roles",
				"id": this.roleId,
				"attributes": {
					"role": {
						"name": formRole.name,
					},
					"permissions": this.selectedPermissions
				}
			}
		}
	}
}
