import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "@core/exceptions/handle";
import {ProfileUpdateRequest, ProfileUpdateResponse} from "@features/base/models/user.model";
import {ChangePasswordRequest, ChangePasswordResponse} from "@features/auth/models/auth.model";
import {environment} from "@env/environment";

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private _apiUri: string = environment.api_url_v1;
	private _apiUriAccount: string = this._apiUri + '/account/profile';
	private _apiUriChangePassword: string = this._apiUri + '/account/change-password';
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

	deleteAccount(userId: string): Observable<any> {
		return this.httpClient.delete(`${this._apiUriDeleteAccount}/${userId}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
