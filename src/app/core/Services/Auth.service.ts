import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInterface } from "../Interfaces/User.interface";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { authUserModel } from '../Interfaces/Token.interface';
import { Handle } from "../Exceptions/Handle";
import {app} from "../../config/App";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _apiUri = app.API_URL + app.API_VERSION;
    private _apiUriLogin = this._apiUri + '/auth/login';
    private _apiUriLogout = this._apiUri + '/auth/logout';
    private _apiUriRefresh = this._apiUri + '/auth/refresh';
    private _apiUriRegister = this._apiUri + '/auth/register';
    private _apiUriForgotPassword = this._apiUri + '/auth/forgot-password';
    private _apiUriResetPassword = this._apiUri + '/auth/reset-password';

    constructor(private httpClient: HttpClient, private handleMessage: Handle) {}

    httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    register(data: UserInterface): Observable<object> {
        return this.httpClient.post(`${this._apiUriRegister}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    login(data: UserInterface): Observable<authUserModel> {
        return this.httpClient.post<authUserModel>(`${this._apiUriLogin}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    logout(): Observable<object> {
        const token: string | null = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        });
        return this.httpClient.post(`${this._apiUriLogout}`, {}, {
            headers: headers,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    refreshToken(): Observable<object> {
        return this.httpClient.post(`${this._apiUriRefresh}`, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    forgotPassword(data: UserInterface): Observable<object> {
        return this.httpClient.post(`${this._apiUriForgotPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }

    resetPassword(token: string, password: string, password_confirmation: string): Observable<object> {
        const data = {
            token: token,
            password: password,
            password_confirmation: password_confirmation,
        };

        return this.httpClient.post(`${this._apiUriResetPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.handleMessage.errorHandle));
    }
}
