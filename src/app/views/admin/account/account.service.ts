import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "@data/Exceptions/Handle";
import {ProfileUpdateRequestInterface} from "@data/Interfaces/Requests/profileUpdateRequest.interface";
import {ChangePasswordRequestInterface} from "@data/Interfaces/Requests/changePasswordRequest.interface";
import {ChangePasswordResponseInterface} from "@data/Interfaces/Responses/changePasswordResponse.interface";
import {GetDeviceAuthListResponseInterface} from "@data/Interfaces/Responses/getDeviceAuthListResponse.interface";
import {LogoutDeviceAuthRequestInterface} from "@data/Interfaces/Requests/logoutDeviceAuthRequest.interface";
import {LogoutDeviceAuthResponseInterface} from "@data/Interfaces/Responses/logoutDeviceAuthResponse.interface";
import {IndexSubscriptionsResponseInterface} from "@data/Interfaces/Responses/indexSubscriptionsResponse.interface";
import {environment} from "@env/environment";
import {ProfileUpdateResponse} from "@data/Interfaces/Responses/profileUpdateResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private _apiUri: string = environment.api_url_v1;
	private _apiUriAccount: string = this._apiUri + '/account/profile';
	private _apiUriChangePassword: string = this._apiUri + '/account/change-password';
	private _apiUriDeviceAuth: string = this._apiUri + '/account/devices-auth-list?fields[device_infos]=id,login_at,browser,os,ip,country';
	private _apiUriLogoutDevice: string = this._apiUri + '/account/logout-device';
	private _apiUriDeleteAccount: string = this._apiUri + '/account/delete-account';

	httpHeaders: HttpHeaders = new HttpHeaders(environment.headers);

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

	updateProfile(data: ProfileUpdateRequestInterface): Observable<ProfileUpdateResponse> {
		return this.httpClient.patch<ProfileUpdateResponse>(`${this._apiUriAccount}`, data, {
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

	getAccountSubscriptions(): Observable<IndexSubscriptionsResponseInterface> {
		return this.httpClient.get<IndexSubscriptionsResponseInterface>(`${this._apiUri}/account/subscriptions`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	downloadInvoice(subscriptionID: string): Observable<any> {
		return this.httpClient.get(`${this._apiUri}/account/subscriptions/invoice/${subscriptionID}`, {
			headers: this.httpHeaders,
			responseType: 'blob',
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	cancelSubscription(subscriptionID: string, data: any): Observable<any> {
		return this.httpClient.patch(`${this._apiUri}/account/subscriptions/cancel/${subscriptionID}`, data,{
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
