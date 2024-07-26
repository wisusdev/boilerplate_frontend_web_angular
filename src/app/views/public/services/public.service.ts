import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {IndexPackageRequestInterface} from "@data/Interfaces/Requests/indexPackageRequest.interface";
import {HttpClient} from "@angular/common/http";
import {Handle} from "@data/Exceptions/Handle";
import {ShowPackageResponseInterface} from "@data/Interfaces/Responses/showPackageResponse.interface";
import {environment} from "@env/environment";

@Injectable({
	providedIn: 'root'
})
export class PublicService {
	private _apiUri: string = environment.api_url_v1;

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {}

	publicIndexPackage(): Observable<IndexPackageRequestInterface> {
		return this.httpClient.get<IndexPackageRequestInterface>(`${this._apiUri}/public/packages`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	publicShowPackage(id: string): Observable<ShowPackageResponseInterface> {
		return this.httpClient.get<ShowPackageResponseInterface>(`${this._apiUri}/public/packages/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	publicStoreSubscription(data: any): Observable<any> {
		return this.httpClient.post<any>(`${this._apiUri}/public/subscriptions`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	publicUpdateSubscription(paymentTransactionId: string, data: object): Observable<any> {
		return this.httpClient.patch<any>(`${this._apiUri}/public/subscriptions/validate/${paymentTransactionId}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
