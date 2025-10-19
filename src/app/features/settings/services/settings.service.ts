import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {Handle} from '@core/exceptions/handle';
import {environment} from "@env/environment";
import {
	IndexRoleResponse,
	StoreRoleRequest,
	UpdateStoreRoleResponse,
	ShowRoleResponse,
	IndexPermissionsResponse,
	IndexUserResponse,
	UserData,
	StoreUserRequest,
	StoreUserResponse,
	ShowUserResponse
} from '@api/interfaces';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private _apiUri: string = environment.api_url_v1;
	private _apiUriRoles: string = this._apiUri + '/roles';
	private _apiUriPermissions: string = this._apiUri + '/permissions';
	private _apiUriUsers: string = this._apiUri + '/users';

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {
	}

	indexRoles(): Observable<IndexRoleResponse> {
		return this.httpClient.get<IndexRoleResponse>(`${this._apiUriRoles}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeRole(data: StoreRoleRequest): Observable<UpdateStoreRoleResponse> {
		return this.httpClient.post<UpdateStoreRoleResponse>(`${this._apiUriRoles}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showRole(id: string): Observable<ShowRoleResponse> {
		return this.httpClient.get<ShowRoleResponse>(`${this._apiUriRoles}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateRole(id: string, data: StoreRoleRequest): Observable<UpdateStoreRoleResponse> {
		return this.httpClient.patch<UpdateStoreRoleResponse>(`${this._apiUriRoles}/${id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyRole(id: string): any {
		return this.httpClient.delete(`${this._apiUriRoles}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexPermissions(): Observable<IndexPermissionsResponse> {
		return this.httpClient.get<IndexPermissionsResponse>(`${this._apiUriPermissions}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	indexUsers(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'first_name', filterValue: string = '', order: string = '-', sort: string = 'id'): Observable<IndexUserResponse> {
		return this.httpClient.get<IndexUserResponse>(`${this._apiUriUsers}?page[size]=${pageSize}&page[number]=${pageNumber}&filter[${filterType}]=${filterValue}&sort=${order}${sort}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeUser(data: StoreUserRequest): Observable<StoreUserResponse> {
		return this.httpClient.post<StoreUserResponse>(`${this._apiUriUsers}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showUser(id: string): Observable<ShowUserResponse> {
		return this.httpClient.get<ShowUserResponse>(`${this._apiUriUsers}/${id}`, {
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
}
