import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "@core/exceptions/handle";
import {
	ProfileUpdateRequest,
	ChangePasswordRequest,
	LogoutDeviceAuthRequest,
	ChangePasswordResponse,
	GetDeviceAuthListResponse,
	LogoutDeviceAuthResponse,
	IndexSubscriptionsResponse,
	ProfileUpdateResponse
} from "@api/interfaces";
import {environment} from "@env/environment";

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

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {
	}

	getInfoProfile(): Observable<object> {
		return this.httpClient.get(`${this._apiUriAccount}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateProfile(data: ProfileUpdateRequest): Observable<ProfileUpdateResponse> {
		return this.httpClient.patch<ProfileUpdateResponse>(`${this._apiUriAccount}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
		return this.httpClient.patch<ChangePasswordResponse>(`${this._apiUriChangePassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	getDeviceAuthList(data: any): Observable<GetDeviceAuthListResponse> {
		let apiUriDeviceAuth: string = `${this._apiUriDeviceAuth}&page[number]=${data.page}`;
		return this.httpClient.get<GetDeviceAuthListResponse>(`${apiUriDeviceAuth}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	logoutDeviceAuth(data: LogoutDeviceAuthRequest): Observable<LogoutDeviceAuthResponse> {
		return this.httpClient.post<LogoutDeviceAuthResponse>(`${this._apiUriLogoutDevice}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	deleteAccount(userId: string): Observable<any> {
		return this.httpClient.delete(`${this._apiUriDeleteAccount}/${userId}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	getAccountSubscriptions(): Observable<IndexSubscriptionsResponse> {
		return this.httpClient.get<IndexSubscriptionsResponse>(`${this._apiUri}/account/subscriptions`, {
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
