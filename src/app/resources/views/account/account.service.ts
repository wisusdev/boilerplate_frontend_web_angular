import {Injectable} from '@angular/core';
import {Api} from "../../../config/Api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "../../../data/Exceptions/Handle";
import {ProfileUpdateInterface} from "../../../data/Interfaces/Account/ProfileUpdate.interface";
import {profileUpdateResponse} from "../../../data/Interfaces/Account/ProfileUpdateResponse.interface";
import { Auth } from 'src/app/data/Providers/Auth';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private _apiUri: string = Api.api_url_v1;
	private _apiUriAccount: string = this._apiUri + '/account/profile';
	private _apiUriChangePassword: string = this._apiUri + '/account/change-password';
	private _apiUriDeviceAuth: string = this._apiUri + '/account/devices-auth-list?fields[device_infos]=id,login_at,browser,os,ip,country';

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {}

	getInfoProfile(): Observable<object> {
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${Auth.token()}` });
		return this.httpClient.get(`${this._apiUriAccount}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateProfile(data: ProfileUpdateInterface): Observable<profileUpdateResponse> {
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${Auth.token()}` });
		return this.httpClient.patch<profileUpdateResponse>(`${this._apiUriAccount}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	changePassword(data: any): Observable<any> {
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${Auth.token()}` });
		return this.httpClient.patch(`${this._apiUriChangePassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	getDeviceAuthList(data: any): Observable<any> {
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${Auth.token()}` });
		let apiUriDeviceAuth: string = `${this._apiUriDeviceAuth}&page[number]=${data.page}`;

		return this.httpClient.get(`${apiUriDeviceAuth}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
