import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Handle} from "@data/exceptions/handle";
import {IndexPackageRequestInterface} from "@data/interfaces/requests/indexPackageRequest.interface";
import {StoreUpdatePackageResponseInterface} from "@data/interfaces/responses/storeUpdatePackageResponde.interface";
import {StoreUpdatePackageRequestInterface} from "@data/interfaces/requests/storeUpdatePackageRequest.interface";
import {ShowPackageResponseInterface} from "@data/interfaces/responses/showPackageResponse.interface";
import {IndexSubscriptionsResponseInterface} from "@data/interfaces/responses/indexSubscriptionsResponse.interface";
import {environment} from "@env/environment";
import {ShowInvoiceResponseInterface} from "@data/interfaces/responses/showInvoiceResponse.interface";
import {WompiPaisesResponse} from "@data/interfaces/responses/getWompiRegions.interface";

@Injectable({
	providedIn: 'root'
})
export class ServicesService {
	private _apiUri: string = environment.api_url_v1;
	private _apiUriPackage: string = this._apiUri + '/packages';
	private _apiUriSubscription: string = this._apiUri + '/subscriptions';
	private _apiUriInvoice: string = this._apiUri + '/invoices';

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {}

	/* PACKAGES */
	indexPackage(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'name', filterValue: string = '', order: string = '-', sort: string = 'id'): Observable<IndexPackageRequestInterface> {
		return this.httpClient.get<IndexPackageRequestInterface>(`${this._apiUriPackage}?page[size]=${pageSize}&page[number]=${pageNumber}&filter[${filterType}]=${filterValue}&sort=${order}${sort}`, {
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

	/* INVOICES */
	indexInvoices(): Observable<any> {
		return this.httpClient.get<any>(`${this._apiUriInvoice}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	storeInvoice(data: any): Observable<any> {
		return this.httpClient.post<any>(`${this._apiUriInvoice}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	showInvoice(id: string): Observable<ShowInvoiceResponseInterface> {
		return this.httpClient.get<ShowInvoiceResponseInterface>(`${this._apiUriInvoice}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateInvoice(id: string, data: any): Observable<any> {
		return this.httpClient.put<any>(`${this._apiUriInvoice}/${id}`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	destroyInvoice(id: string): Observable<any> {
		return this.httpClient.delete<any>(`${this._apiUriInvoice}/${id}`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	changeStatusInvoice(id: string, data: object): Observable<ShowInvoiceResponseInterface> {
		return this.httpClient.patch<ShowInvoiceResponseInterface>(`${this._apiUriInvoice}/${id}/status`, data, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	downloadInvoice(id: string): Observable<any> {
		return this.httpClient.get(`${this._apiUriInvoice}/${id}/download`, {
			headers: environment.headers,
			responseType: 'blob',
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	// PUBLIC
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

	getWompiRegions(): Observable<WompiPaisesResponse> {
		return this.httpClient.get<WompiPaisesResponse>(`${this._apiUri}/public/wompi/regions`, {
			headers: environment.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
