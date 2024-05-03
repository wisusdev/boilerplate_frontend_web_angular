import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterUserInterface } from "../../../data/Interfaces/Auth/RegisterUser.interface";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Handle } from "../../../data/Exceptions/Handle";
import { Api } from "../../../config/Api";
import { ForgotPassword } from "../../../data/Interfaces/Auth/ForgotPassword.interface";
import { ResetPassword } from '../../../data/Interfaces/Auth/ResetPassword.interface';
import {loginRequestInterface} from "../../../data/Requests/loginRequest.interface";
import {loginResponseInterface} from "../../../data/Responses/loginResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _apiUri = Api.api_url_v1;
	private _apiUriLogin = this._apiUri + '/auth/login';
	private _apiUriLogout = this._apiUri + '/auth/logout';
	private _apiUriRefresh = this._apiUri + '/auth/refresh';
	private _apiUriRegister = this._apiUri + '/auth/register';
	private _apiUriForgotPassword = this._apiUri + '/auth/forgot-password';
	private _apiUriResetPassword = this._apiUri + '/auth/reset-password';

	constructor(private httpClient: HttpClient, private handleMessage: Handle) {
	}

	httpHeaders: HttpHeaders = new HttpHeaders(Api.headers);

	login(data: loginRequestInterface): Observable<loginResponseInterface> {
		return this.httpClient.post<loginResponseInterface>(`${this._apiUriLogin}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	register(data: RegisterUserInterface): Observable<object> {
		return this.httpClient.post(`${this._apiUriRegister}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	logout(): Observable<object> {
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
