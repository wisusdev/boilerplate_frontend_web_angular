import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Handle} from "@data/exceptions/handle";
import {LoginResponseInterface} from "@data/interfaces/responses/loginResponse.interface";
import {LoginRequestInterface} from "@data/interfaces/requests/loginRequest.interface";
import {RegisterRequestInterface} from "@data/interfaces/requests/registerRequest.interface";
import {RegisterResponseInterface} from "@data/interfaces/responses/registerResponse.interface";
import {ForgotPasswordRequestInterface} from "@data/interfaces/requests/forgotPasswordRequest.interface";
import {ForgotPasswordResponseInterface} from "@data/interfaces/responses/forgotPasswordResponse.interface";
import {ResetPasswordRequestInterface} from "@data/interfaces/requests/resetPasswordRequest.interface";
import {ResetPasswordResponseInterface} from "@data/interfaces/responses/resetPasswordResponse.interface";
import {environment} from "@env/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _apiUri = environment.api_url_v1;
	private _apiUriLogin = this._apiUri + '/auth/login';
	private _apiUriLogout = this._apiUri + '/auth/logout';
	private _apiUriRefresh = this._apiUri + '/auth/refresh';
	private _apiUriRegister = this._apiUri + '/auth/register';
	private _apiUriForgotPassword = this._apiUri + '/auth/forgot-password';
	private _apiUriResetPassword = this._apiUri + '/auth/reset-password';

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {
	}

	httpHeaders: HttpHeaders = new HttpHeaders(environment.headers);

	login(data: LoginRequestInterface): Observable<LoginResponseInterface> {
		return this.httpClient.post<LoginResponseInterface>(`${this._apiUriLogin}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	register(data: RegisterRequestInterface): Observable<RegisterResponseInterface> {
		return this.httpClient.post<RegisterResponseInterface>(`${this._apiUriRegister}`, data, {
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

	forgotPassword(data: ForgotPasswordRequestInterface): Observable<ForgotPasswordResponseInterface> {
		return this.httpClient.post<ForgotPasswordResponseInterface>(`${this._apiUriForgotPassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	resetPassword(data: ResetPasswordRequestInterface): Observable<ResetPasswordResponseInterface> {
		return this.httpClient.post<ResetPasswordResponseInterface>(`${this._apiUriResetPassword}`, data, {
			headers: this.httpHeaders,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
