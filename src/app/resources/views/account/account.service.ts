import {Injectable} from '@angular/core';
import {Api} from "../../../config/Api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "../../../data/Exceptions/Handle";
import {ProfileUpdateInterface} from "../../../data/Interfaces/Account/ProfileUpdate.interface";
import {profileUpdateResponse} from "../../../data/Interfaces/Account/ProfileUpdateResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private _apiUri: string = Api.api_url_v1;
	private _apiUriAccount: string = this._apiUri + '/account/profile';

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {
	}

	getInfoProfile(): Observable<object> {
		const token: string | null = localStorage.getItem('access_token');
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${token}` });
		return this.httpClient.get(`${this._apiUriAccount}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateProfile(data: ProfileUpdateInterface): Observable<profileUpdateResponse> {
		const token: string | null = localStorage.getItem('access_token');
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${token}` });
		return this.httpClient.patch<profileUpdateResponse>(`${this._apiUriAccount}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
