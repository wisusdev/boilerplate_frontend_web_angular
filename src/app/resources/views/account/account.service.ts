import {Injectable} from '@angular/core';
import {Api} from "../../../config/Api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "../../../data/Exceptions/Handle";
import {ProfileUpdateInterface} from "../../../data/Interfaces/Requests/ProfileUpdate.interface";
import {profileUpdateResponse} from "../../../data/Interfaces/Responses/ProfileUpdateResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private _apiUri: string = Api.api_url_v1;
	private _apiUriAccount: string = this._apiUri + '/account/profile';
	private _apiUriChangePassword: string = this._apiUri + '/account/change-password';
	private _apiUriDeviceAuth: string = this._apiUri + '/account/devices-auth-list?fields[device_infos]=id,login_at,browser,os,ip,country';
	private _apiUriLogoutDevice: string = this._apiUri + '/account/logout-device';
	private _apiUriDeleteAccount: string = this._apiUri + '/account/delete-account';

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {
	}

	getInfoProfile(): Observable<object> {
		return this.httpClient.get(`${this._apiUriAccount}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateProfile(data: ProfileUpdateInterface): Observable<profileUpdateResponse> {
		return this.httpClient.patch<profileUpdateResponse>(`${this._apiUriAccount}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	changePassword(data: any): Observable<any> {
		return this.httpClient.patch(`${this._apiUriChangePassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	getDeviceAuthList(data: any): Observable<any> {
		let apiUriDeviceAuth: string = `${this._apiUriDeviceAuth}&page[number]=${data.page}`;

		return this.httpClient.get(`${apiUriDeviceAuth}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	logoutDeviceAuth(data: any): Observable<any> {
		return this.httpClient.post(`${this._apiUriLogoutDevice}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	deleteAccount(userId: string): Observable<any> {
		return this.httpClient.delete(`${this._apiUriDeleteAccount}/${userId}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
