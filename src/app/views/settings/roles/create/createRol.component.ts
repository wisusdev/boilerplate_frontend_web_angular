import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../settings.service";
import {KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, of, tap} from "rxjs";
import {Handle} from "../../../../data/Exceptions/Handle";
import {ToastService} from "../../../../data/Services/Toast.service";
import {ErrorMessagesInterface} from "../../../../data/Interfaces/Errors.interface";

@Component({
	selector: 'app-create-rol',
	standalone: true,
	imports: [
		KeyValuePipe,
		NgForOf,
		RouterLink,
		ReactiveFormsModule,
		NgClass
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
		private toast: ToastService
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

	storeRole(){
		let formRole = this.formatFormRole(this.formRole.value);
		this.resetErrorMessages();
		this.settingsService.storeRole(formRole).pipe(
			tap((response) => {
				this.formRole.reset();
				this.selectedPermissions = [];
				this.toast.show({message: 'Role created successfully'});
			}),
			catchError((error: any) => {
				if (typeof error === 'object') {
					for (let key in error) {
						let keyName = error[key]['title'].split('.')[3];
						this.errorMessages[keyName] = error[key]['detail'];
					}
				}
				this.handleMessage.handleError(error);
				return of(null);
			})
		).subscribe();
	}

	formatFormRole(formRole: any){
		return {
			"data": {
				"type": "roles",
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
