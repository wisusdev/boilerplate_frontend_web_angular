import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Api } from 'src/app/config/Api';
import { Handle } from 'src/app/data/Exceptions/Handle';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private _apiUri: string = Api.api_url_v1;
	private _apiUriRoles: string = this._apiUri + '/roles';
	private _apiUriPermissions: string = this._apiUri + '/permissions';
	private _apiUriUsers: string = this._apiUri + '/users';

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	constructor(private httpClient: HttpClient, private handleMessage: Handle) { }

	indexRoles(): any {
		return this.httpClient.get(`${this._apiUriRoles}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeRole(data: any): any {
		return this.httpClient.post(`${this._apiUriRoles}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showRole(id: string): any {
		return this.httpClient.get(`${this._apiUriRoles}/${id}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateRole(id: string, data: any): any {
		return this.httpClient.patch(`${this._apiUriRoles}/${id}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyRole(id: string): any {
		return this.httpClient.delete(`${this._apiUriRoles}/${id}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexPermissions(): any {
		return this.httpClient.get(`${this._apiUriPermissions}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexUsers(): any {
		return this.httpClient.get(`${this._apiUriUsers}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeUser(data: any): any {
		return this.httpClient.post(`${this._apiUriUsers}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showUser(id: string): any {
		return this.httpClient.get(`${this._apiUriUsers}/${id}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateUser(id: string, data: any): any {
		return this.httpClient.patch(`${this._apiUriUsers}/${id}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyUser(id: string): any {
		return this.httpClient.delete(`${this._apiUriUsers}/${id}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
