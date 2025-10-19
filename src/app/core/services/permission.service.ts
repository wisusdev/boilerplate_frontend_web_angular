import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PermissionService {
	permissions: string[] = [];

	constructor() {
		this.permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
	}

	hasPermission(permission: string): boolean {
		return this.permissions.includes(permission);
	}
}
