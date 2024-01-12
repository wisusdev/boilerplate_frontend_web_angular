import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { authUserModel } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _apiUri = environment.API_URL + environment.API_VERSION;
    private _apiUriLogin = this._apiUri + '/auth/login';
    private _apiUriLogout = this._apiUri + '/auth/logout';
    private _apiUriRefresh = this._apiUri + '/auth/refresh';
    private _apiUriRegister = this._apiUri + '/auth/register';
    private _apiUriForgotPassword = this._apiUri + '/auth/forgot-password';
    private _apiUriResetPassword = this._apiUri + '/auth/reset-password';

    private isLoggedIn = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) { }

    // Toogle Loggedin
    toggleLogin(state: boolean): void {
        this.isLoggedIn.next(state);
    }

    status() {
        if (typeof localStorage !== 'undefined') {
            const token: string | null = localStorage.getItem('token');
            const expiresAt: string | null = localStorage.getItem('expires_at');

            if (!token || !expiresAt) {
                this.isLoggedIn.next(false);
                console.log('No token or expires_at found');
            } else {
                const expiresAtDate = new Date(expiresAt);
                const currentDate = new Date();

                if (currentDate > expiresAtDate) {
                    this.isLoggedIn.next(false);
                    console.log('Token expired');
                } else {
                    this.isLoggedIn.next(true);
                    console.log('Token valid');
                }
            }
        }

        return this.isLoggedIn.asObservable();
    }

    httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    register(data: UserModel): Observable<object> {
        return this.httpClient.post(`${this._apiUriRegister}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.errorHandle));
    }

    login(data: UserModel): Observable<authUserModel> {
        return this.httpClient.post<authUserModel>(`${this._apiUriLogin}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.errorHandle));
    }

    logout(): Observable<object> {
        const token: string | null = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        });
        return this.httpClient.post(`${this._apiUriLogout}`, {},{headers: headers,}).pipe(catchError(this.errorHandle));
    }

    refreshToken(): Observable<object> {
        return this.httpClient.post(`${this._apiUriRefresh}`, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.errorHandle));
    }

    forgotPassword(data: UserModel): Observable<object> {
        return this.httpClient.post(`${this._apiUriForgotPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.errorHandle));
    }

    resetPassword(token: string, password: string, password_confirmation: string): Observable<object> {
        const data = {
            token: token,
            password: password,
            password_confirmation: password_confirmation,
        };

        return this.httpClient.post(`${this._apiUriResetPassword}`, data, {
            headers: this.httpHeaders,
        }).pipe(catchError(this.errorHandle));
    }

    errorHandle(error: HttpErrorResponse): Observable<never> {
        let errorMessage: string = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error code: ${error.status}. Message: ${error.message}`;
        }

        return throwError(() => {
            errorMessage;
        })
    }
}
