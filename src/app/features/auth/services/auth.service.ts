import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Handle} from "@core/exceptions/handle";
import {environment} from "@env/environment";
import {
    LoginResponse,
    LoginRequest,
    RegisterRequest,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse
} from "@api/interfaces";

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

    constructor(private httpClient: HttpClient, private handleMessage: Handle) {

    }

    httpHeaders: HttpHeaders = new HttpHeaders(environment.headers);

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(`${this._apiUriLogin}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(`${this._apiUriRegister}`, data, {
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

    forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
        return this.httpClient.post<ForgotPasswordResponse>(`${this._apiUriForgotPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
        return this.httpClient.post<ResetPasswordResponse>(`${this._apiUriResetPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }
}
