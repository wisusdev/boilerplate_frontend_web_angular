import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {IndexPackageRequestInterface} from "@data/Interfaces/Requests/indexPackageRequest.interface";
import {Api} from "@config/Api";
import {HttpClient} from "@angular/common/http";
import {Handle} from "@data/Exceptions/Handle";
import {ShowPackageResponseInterface} from "@data/Interfaces/Responses/showPackageResponse.interface";

@Injectable({
	providedIn: 'root'
})
export class PublicService {
	private _apiUri: string = Api.api_url_v1;

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {}

	publicIndexPackage(): Observable<IndexPackageRequestInterface> {
		return this.httpClient.get<IndexPackageRequestInterface>(`${this._apiUri}/public/packages`, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	publicShowPackage(id: string): Observable<ShowPackageResponseInterface> {
		return this.httpClient.get<ShowPackageResponseInterface>(`${this._apiUri}/public/packages/${id}`, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	publicStoreSubscription(data: any): Observable<any> {
		return this.httpClient.post<any>(`${this._apiUri}/public/subscriptions`, data, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
