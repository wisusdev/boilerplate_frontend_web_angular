import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {Handle} from '@data/Exceptions/handle';
import {StoreRoleRequestInterface} from "@data/Interfaces/Requests/storeRoleRequest.interface";
import {UpdateStoreRoleResponseInterface} from "@data/Interfaces/Responses/updateStoreRoleResponse.interface";
import {ShowRoleResponseInterface} from "@data/Interfaces/Responses/showRoleResponse.interface";
import {IndexPermissionsInterface} from "@data/Interfaces/Responses/indexPermissions.interface";
import {IndexUserResponseInterface, UserData} from "@data/Interfaces/Responses/indexUserResponse.interface";
import {StoreUserRequestInterface} from "@data/Interfaces/Requests/storeUserRequest.interface";
import {StoreUserResponseInterface} from "@data/Interfaces/Responses/storeUserResponse.interface";
import {ShowUserResponseInterface} from "@data/Interfaces/Responses/showUserResponse.interface";
import {environment} from "@env/environment";
import {IndexRoleResponseInterface} from "@data/Interfaces/Responses/indexRoleResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private _apiUri: string = environment.api_url_v1;
	private _apiUriRoles: string = this._apiUri + '/roles';
	private _apiUriPermissions: string = this._apiUri + '/permissions';
	private _apiUriUsers: string = this._apiUri + '/users';

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {
	}

	indexRoles(): Observable<IndexRoleResponseInterface> {
		return this.httpClient.get<IndexRoleResponseInterface>(`${this._apiUriRoles}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeRole(data: StoreRoleRequestInterface): Observable<UpdateStoreRoleResponseInterface> {
		return this.httpClient.post<UpdateStoreRoleResponseInterface>(`${this._apiUriRoles}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showRole(id: string): Observable<ShowRoleResponseInterface> {
		return this.httpClient.get<ShowRoleResponseInterface>(`${this._apiUriRoles}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateRole(id: string, data: StoreRoleRequestInterface): Observable<UpdateStoreRoleResponseInterface> {
		return this.httpClient.patch<UpdateStoreRoleResponseInterface>(`${this._apiUriRoles}/${id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyRole(id: string): any {
		return this.httpClient.delete(`${this._apiUriRoles}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexPermissions(): Observable<IndexPermissionsInterface> {
		return this.httpClient.get<IndexPermissionsInterface>(`${this._apiUriPermissions}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexUsers(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'first_name', filterValue: string = '', order: string = '-', sort: string = 'id'): Observable<IndexUserResponseInterface> {
		return this.httpClient.get<IndexUserResponseInterface>(`${this._apiUriUsers}?page[size]=${pageSize}&page[number]=${pageNumber}&filter[${filterType}]=${filterValue}&sort=${order}${sort}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeUser(data: StoreUserRequestInterface): Observable<StoreUserResponseInterface> {
		return this.httpClient.post<StoreUserResponseInterface>(`${this._apiUriUsers}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showUser(id: string): Observable<ShowUserResponseInterface> {
		return this.httpClient.get<ShowUserResponseInterface>(`${this._apiUriUsers}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateUser(id: string, data: UserData): Observable<UserData> {
		return this.httpClient.patch<UserData>(`${this._apiUriUsers}/${id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyUser(id: string): any {
		return this.httpClient.delete(`${this._apiUriUsers}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	// Settings
	getSettings(key: string): Observable<any> {
		return this.httpClient.get<any>(`${this._apiUri}/settings?filter[key]=${key}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateSettings(data: any): Observable<any> {
		return this.httpClient.patch<any>(`${this._apiUri}/settings/${data.id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
