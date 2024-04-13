import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterUserInterface } from "../../../data/Interfaces/Auth/RegisterUser.interface";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { authUserModel } from '../../../data/Interfaces/Token.interface';
import { Handle } from "../../../data/Exceptions/Handle";
import { Api } from "../../../config/Api";
import {LoginUserInterface} from "../../../data/Interfaces/Auth/LoginUser.interface";
import {ForgotPassword} from "../../../data/Interfaces/Auth/ForgotPassword.interface";
import { ResetPassword } from '../../../data/Interfaces/Auth/ResetPassword.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _apiUri = Api.api_url + Api.api_version;
	private _apiUriLogin = this._apiUri + '/auth/login';
	private _apiUriLogout = this._apiUri + '/auth/logout';
	private _apiUriRefresh = this._apiUri + '/auth/refresh';
	private _apiUriRegister = this._apiUri + '/auth/register';
	private _apiUriForgotPassword = this._apiUri + '/auth/forgot-password';
	private _apiUriResetPassword = this._apiUri + '/auth/reset-password';

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {
	}

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	login(data: LoginUserInterface): Observable<authUserModel> {
		return this.httpClient.post<authUserModel>(`${this._apiUriLogin}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	register(data: RegisterUserInterface): Observable<object> {
		return this.httpClient.post(`${this._apiUriRegister}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	logout(): Observable<object> {
		const token: string | null = localStorage.getItem('access_token');
		this.httpHeaders = new HttpHeaders({ ...Api.headers, 'Authorization': `Bearer ${token}` });
		return this.httpClient.post(`${this._apiUriLogout}`, {}, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	refreshToken(): Observable<object> {
		return this.httpClient.post(`${this._apiUriRefresh}`, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	forgotPassword(data: ForgotPassword): Observable<object> {
		return this.httpClient.post(`${this._apiUriForgotPassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	resetPassword(data: ResetPassword): Observable<object> {
		return this.httpClient.post(`${this._apiUriResetPassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
