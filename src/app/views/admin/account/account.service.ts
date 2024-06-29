import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Api} from "../../../config/Api";
import {Handle} from "../../../data/Exceptions/Handle";
import {ProfileUpdateRequestInterface} from "../../../data/Interfaces/Requests/profileUpdateRequest.interface";
import {profileUpdateResponse} from "../../../data/Interfaces/Responses/ProfileUpdateResponse.interface";
import {ChangePasswordRequestInterface} from "../../../data/Interfaces/Requests/changePasswordRequest.interface";
import {ChangePasswordResponseInterface} from "../../../data/Interfaces/Responses/changePasswordResponse.interface";
import {
	GetDeviceAuthListResponseInterface
} from "../../../data/Interfaces/Responses/getDeviceAuthListResponse.interface";
import {LogoutDeviceAuthRequestInterface} from "../../../data/Interfaces/Requests/logoutDeviceAuthRequest.interface";
import {LogoutDeviceAuthResponseInterface} from "../../../data/Interfaces/Responses/logoutDeviceAuthResponse.interface";

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

	updateProfile(data: ProfileUpdateRequestInterface): Observable<profileUpdateResponse> {
		return this.httpClient.patch<profileUpdateResponse>(`${this._apiUriAccount}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	changePassword(data: ChangePasswordRequestInterface): Observable<ChangePasswordResponseInterface> {
		return this.httpClient.patch<ChangePasswordResponseInterface>(`${this._apiUriChangePassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	getDeviceAuthList(data: any): Observable<GetDeviceAuthListResponseInterface> {
		let apiUriDeviceAuth: string = `${this._apiUriDeviceAuth}&page[number]=${data.page}`;
		return this.httpClient.get<GetDeviceAuthListResponseInterface>(`${apiUriDeviceAuth}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	logoutDeviceAuth(data: LogoutDeviceAuthRequestInterface): Observable<LogoutDeviceAuthResponseInterface> {
		return this.httpClient.post<LogoutDeviceAuthResponseInterface>(`${this._apiUriLogoutDevice}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	deleteAccount(userId: string): Observable<any> {
		return this.httpClient.delete(`${this._apiUriDeleteAccount}/${userId}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
