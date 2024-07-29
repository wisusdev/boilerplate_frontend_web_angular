import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "@data/Exceptions/Handle";
import {IndexPackageRequestInterface} from "@data/Interfaces/Requests/indexPackageRequest.interface";
import {StoreUpdatePackageResponseInterface} from "@data/Interfaces/Responses/storeUpdatePackageResponde.interface";
import {StoreUpdatePackageRequestInterface} from "@data/Interfaces/Requests/storeUpdatePackageRequest.interface";
import {ShowPackageResponseInterface} from "@data/Interfaces/Responses/showPackageResponse.interface";
import {IndexSubscriptionsResponseInterface} from "@data/Interfaces/Responses/indexSubscriptionsResponse.interface";
import {environment} from "@env/environment";

@Injectable({
	providedIn: 'root'
})
export class ServicesService {
	private _apiUri: string = environment.api_url_v1;
	private _apiUriPackage: string = this._apiUri + '/packages';
	private _apiUriSubscription: string = this._apiUri + '/subscriptions';

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {}

	/* PACKAGES */
	indexPackage(): Observable<IndexPackageRequestInterface> {
		return this.httpClient.get<IndexPackageRequestInterface>(`${this._apiUriPackage}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	createPackage(data: StoreUpdatePackageRequestInterface): Observable<StoreUpdatePackageResponseInterface> {
		return this.httpClient.post<StoreUpdatePackageResponseInterface>(`${this._apiUriPackage}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showPackage(id: string): Observable<ShowPackageResponseInterface> {
		return this.httpClient.get<ShowPackageResponseInterface>(`${this._apiUriPackage}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updatePackage(id: string, data: StoreUpdatePackageRequestInterface): Observable<StoreUpdatePackageResponseInterface> {
		return this.httpClient.put<StoreUpdatePackageResponseInterface>(`${this._apiUriPackage}/${id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	deletePackage(id: string): Observable<any> {
		return this.httpClient.delete(`${this._apiUriPackage}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	/* SUBSCRIPTIONS */
	indexSubscriptions(): Observable<IndexSubscriptionsResponseInterface> {
		return this.httpClient.get<IndexSubscriptionsResponseInterface>(`${this._apiUriSubscription}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
